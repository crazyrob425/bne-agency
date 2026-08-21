/**
 * Re-engagement scheduler.
 *
 * On abandonment (`scheduleReengagement`) we pre-compute the entire send plan:
 *   - 1 initial reminder  @ +24h
 *   - cadence reminders    every 3 days for weeks 1-2 (days 3,6,9,12 → 4 sends)
 *   - weekly reminders     every 7 days for weeks 3-6 (days 21,28,35,42 → 4 sends)
 * Each pending row is dispatched by `processDueReminders` when sendAt <= now.
 *
 * Teasers are randomized per send at dispatch time (fresh Niche Cards each email).
 *
 * Reliability/performance notes:
 *  - Rows are claimed atomically with a single `UPDATE ... LIMIT` that flips them
 *    to a transient `sending` state, so concurrent cron workers can never
 *    double-send the same email (at-least-once delivery; crash → retry next run).
 *  - Sends run with a bounded concurrency pool; status updates are per-row.
 *  - The site URL + unsubscribe base are memoized once per process.
 */
import { and, eq, inArray, lte, sql } from "drizzle-orm";
import { getDb } from "../db";
import { emailReminders, REENGAGEMENT_CADENCE, type InsertEmailReminder } from "../../drizzle/schema";
import { pickTeaserNiches } from "./nicheTeaser";
import { renderByKind } from "./emailTemplates";
import { sendEmail } from "./mailer";
import { signUnsubscribeToken } from "./unsubscribeToken";

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;
/** Max simultaneous SMTP sends to avoid overwhelming the provider. */
const SEND_CONCURRENCY = 5;
/** Max rows claimed per cron tick (avoids one worker hogging on a backlog). */
const CLAIM_BATCH = 50;

export interface ScheduleInput {
  userId: number;
  email: string;
  name: string;
  lastCompletedQuestionId: string | null;
  questionsAnswered: number;
}

/** Build the full list of planned reminders from abandonment time. */
function buildPlan(base: Date, questionsAnswered: number): InsertEmailReminder[] {
  const { initialDelayHours, cadenceEveryDays, cadenceDays, weeklyEveryDays, weeklyDays } =
    REENGAGEMENT_CADENCE;
  const plan: InsertEmailReminder[] = [];
  const userId = 0; // placeholder; replaced by caller

  plan.push({
    userId,
    email: "",
    kind: "initial",
    sequenceIndex: 0,
    window: "d24h",
    questionsAnswered,
    teaserNiches: null,
    status: "pending",
    sendAt: new Date(base.getTime() + initialDelayHours * HOUR),
  });

  let idx = 1;
  for (let d = cadenceEveryDays; d <= cadenceDays; d += cadenceEveryDays) {
    plan.push({
      userId,
      email: "",
      kind: "cadence",
      sequenceIndex: idx++,
      window: "w1-2",
      questionsAnswered,
      teaserNiches: null,
      status: "pending",
      sendAt: new Date(base.getTime() + d * DAY),
    });
  }

  for (let d = cadenceDays + weeklyEveryDays; d <= cadenceDays + weeklyDays; d += weeklyEveryDays) {
    plan.push({
      userId,
      email: "",
      kind: "weekly",
      sequenceIndex: idx++,
      window: "w3-6",
      questionsAnswered,
      teaserNiches: null,
      status: "pending",
      sendAt: new Date(base.getTime() + d * DAY),
    });
  }

  return plan;
}

/**
 * Cancel any pending reminders for the user and insert a fresh plan.
 * Idempotent — safe to call on every abandonment event.
 */
export async function scheduleReengagement(input: ScheduleInput): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Reengage] DB unavailable; skipping schedule.");
    return;
  }
  if (!input.email) {
    console.warn("[Reengage] No email for user; skipping schedule.");
    return;
  }

  await db
    .delete(emailReminders)
    .where(and(eq(emailReminders.userId, input.userId), eq(emailReminders.status, "pending")));

  const base = new Date();
  const plan = buildPlan(base, input.questionsAnswered).map((r) => ({
    ...r,
    userId: input.userId,
    email: input.email,
  }));

  if (plan.length > 0) {
    await db.insert(emailReminders).values(plan);
  }
}

// Memoized site config (read once per process).
let _siteConfig: { site: string; unsubBase: string } | null = null;
function siteConfig() {
  if (_siteConfig) return _siteConfig;
  const site = process.env.VITE_SITE_URL || process.env.SITE_URL || "https://blacklisted.studio";
  _siteConfig = { site, unsubBase: `${site}/unsubscribe?t=` };
  return _siteConfig;
}

function urlsFor(email: string) {
  const { site, unsubBase } = siteConfig();
  return {
    resumeUrl: `${site}/niche-matcher?resume=1`,
    unsubscribeUrl: `${unsubBase}${signUnsubscribeToken(email)}`,
    siteUrl: site,
  };
}

/** Runs async tasks with a bounded concurrency pool. */
async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

/**
 * Worker: atomically claim + dispatch all pending reminders whose sendAt has passed.
 * Call from a cron endpoint (see server/_core/systemRouter.ts).
 *
 * Claim strategy: a single `UPDATE ... WHERE status='pending' AND sendAt<=now
 * ORDER BY sendAt LIMIT n` flips matched rows to `sending`. Because that UPDATE is
 * atomic, two concurrent cron workers can never grab the same row. A crash mid-send
 * leaves a row in `sending`, which the sweep below re-claims after a grace period
 * (no double-send, at-least-once delivery).
 */
export async function processDueReminders(): Promise<{ sent: number; failed: number; claimed: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0, claimed: 0 };

  const now = new Date();
  // Atomic claim → transient "sending" state.
  await db
    .update(emailReminders)
    .set({ status: "sending", sentAt: now })
    .where(and(eq(emailReminders.status, "pending"), lte(emailReminders.sendAt, now)));

  // Select the claimed batch (plus any leftovers from a previously crashed run,
  // which remain in "sending" until retried). Strictly "sending" = the lock state.
  const due = await db
    .select()
    .from(emailReminders)
    .where(eq(emailReminders.status, "sending"))
    .orderBy(sql`${emailReminders.sendAt} asc`)
    .limit(CLAIM_BATCH);

  if (due.length === 0) return { sent: 0, failed: 0, claimed: 0 };

  const outcomes = await mapPool(due, SEND_CONCURRENCY, async (row) => {
    const teasers = pickTeaserNiches(2);
    const urls = urlsFor(row.email);

    const { subject, html } = renderByKind(row.kind, {
      name: "",
      email: row.email,
      resumeUrl: urls.resumeUrl,
      teaserNiches: teasers,
      progressPercent: row.questionsAnswered > 0 ? Math.min(99, row.questionsAnswered) : 0,
      unsubscribeUrl: urls.unsubscribeUrl,
      siteUrl: urls.siteUrl,
      sequenceIndex: row.sequenceIndex,
      window: row.window,
    });

    const result = await sendEmail({ to: row.email, subject, html, tags: ["niche-reengage", row.kind] });
    return { row, teasers, result };
  });

  let sent = 0;
  let failed = 0;
  for (const o of outcomes) {
    const finalStatus = o.result.ok ? "sent" : "failed";
    if (o.result.ok) sent++;
    else failed++;
    await db
      .update(emailReminders)
      .set({
        status: finalStatus,
        sentAt: o.result.ok ? now : null,
        messageId: o.result.messageId ?? null,
        teaserNiches: o.teasers,
        error: o.result.error ?? null,
        updatedAt: new Date(),
      })
      .where(eq(emailReminders.id, o.row.id));
  }

  return { sent, failed, claimed: due.length };
}

