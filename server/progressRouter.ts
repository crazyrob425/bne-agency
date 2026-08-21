/**
 * Quiz progress router — real-time persistence + resume + abandonment hook.
 *
 * Every answer is saved immediately (debounced by the client). On "pause/exit"
 * the client calls `markAbandoned`, which computes the re-engagement schedule.
 * On `complete`, any pending reminders are cancelled.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { quizProgress, subscribers, emailReminders } from "../drizzle/schema";
import { scheduleReengagement } from "./_core/reengagement";

const answersSchema = z
  .record(z.string(), z.union([z.string(), z.array(z.string())]))
  .refine((v) => Object.keys(v).length <= 200, "Too many answers");

export const progressRouter = router({
  /** Returns the current saved progress for the authed user (or null). */
  get: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const [row] = await db
      .select()
      .from(quizProgress)
      .where(eq(quizProgress.userId, ctx.user.id))
      .limit(1);
    return row ?? null;
  }),

  /**
   * Upsert real-time progress. The client sends the full answers map plus the
   * last completed question id. Called on every answer and on visibilitychange.
   */
  save: protectedProcedure
    .input(
      z.object({
        lastCompletedQuestionId: z.string().max(128).nullable().optional(),
        answers: answersSchema,
        questionsAnswered: z.number().int().min(0).max(200),
        completed: z.boolean().optional(),
        resultSnapshot: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [existing] = await db
        .select({ id: quizProgress.id })
        .from(quizProgress)
        .where(eq(quizProgress.userId, ctx.user.id))
        .limit(1);

      const values = {
        lastCompletedQuestionId: input.lastCompletedQuestionId ?? null,
        answers: input.answers,
        questionsAnswered: input.questionsAnswered,
        completed: input.completed ? ("1" as const) : ("0" as const),
        resultSnapshot: input.resultSnapshot ?? null,
        updatedAt: new Date(),
      };

      let progressId: number;
      if (existing) {
        await db.update(quizProgress).set(values).where(eq(quizProgress.id, existing.id));
        progressId = existing.id;
      } else {
        const [inserted] = await db
          .insert(quizProgress)
          .values({ userId: ctx.user.id, ...values })
          .returning({ id: quizProgress.id });
        progressId = inserted.id;
      }
      return { ok: true as const, progressId };
    }),

  /**
   * Client signals the user left before finishing. Triggers re-engagement
   * scheduling (24h initial + 3-day cadence + weekly tail) and records a
   * structured subscriber from captured contact info (if not already present).
   */
  markAbandoned: protectedProcedure
    .input(
      z.object({
        lastCompletedQuestionId: z.string().max(128).nullable(),
        answers: answersSchema,
        questionsAnswered: z.number().int().min(0).max(200),
        contact: z
          .object({ name: z.string().max(255).optional(), email: z.string().email().optional() })
          .optional(),
        tags: z.array(z.string()).max(20).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [existing] = await db
        .select({ id: quizProgress.id })
        .from(quizProgress)
        .where(eq(quizProgress.userId, ctx.user.id))
        .limit(1);

      const values = {
        lastCompletedQuestionId: input.lastCompletedQuestionId,
        answers: input.answers,
        questionsAnswered: input.questionsAnswered,
        completed: "0" as const,
        updatedAt: new Date(),
      };

      if (existing) {
        await db.update(quizProgress).set(values).where(eq(quizProgress.id, existing.id));
      } else {
        await db.insert(quizProgress).values({ userId: ctx.user.id, ...values });
      }

      if (input.contact?.email) {
        await db
          .insert(subscribers)
          .values({
            userId: ctx.user.id,
            name: input.contact.name ?? null,
            email: input.contact.email.toLowerCase(),
            source: "niche-quiz",
            status: "subscribed",
            tags: input.tags ?? [],
          })
          .onConflictDoUpdate({
            target: subscribers.email,
            set: {
              userId: ctx.user.id,
              name: input.contact.name ?? null,
              source: "niche-quiz",
              tags: input.tags ?? [],
              updatedAt: new Date(),
            },
          });
      }

      await scheduleReengagement({
        userId: ctx.user.id,
        email: input.contact?.email ?? ctx.user.email ?? "",
        name: input.contact?.name ?? ctx.user.name ?? "",
        lastCompletedQuestionId: input.lastCompletedQuestionId,
        questionsAnswered: input.questionsAnswered,
      });

      return { ok: true as const };
    }),

  /** Finalize: record match result and cancel any pending reminders. */
  complete: protectedProcedure
    .input(z.object({ answers: answersSchema, resultSnapshot: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [existing] = await db
        .select({ id: quizProgress.id })
        .from(quizProgress)
        .where(eq(quizProgress.userId, ctx.user.id))
        .limit(1);

      const values = {
        lastCompletedQuestionId: null,
        answers: input.answers,
        questionsAnswered: Object.keys(input.answers).length,
        completed: "1" as const,
        resultSnapshot: input.resultSnapshot,
        updatedAt: new Date(),
      };

      if (existing) {
        await db.update(quizProgress).set(values).where(eq(quizProgress.id, existing.id));
      } else {
        await db.insert(quizProgress).values({ userId: ctx.user.id, ...values });
      }

      await db
        .update(emailReminders)
        .set({ status: "cancelled", updatedAt: new Date() })
        .where(and(eq(emailReminders.userId, ctx.user.id), eq(emailReminders.status, "pending")));

      return { ok: true as const };
    }),

  /** User-facing: inspect their own reminder queue. */
  reminderStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(emailReminders)
      .where(eq(emailReminders.userId, ctx.user.id))
      .orderBy(sql`${emailReminders.sequenceIndex} asc`);
  }),

  /** Email detailed strategic psych report & top 3 fetish matches to user. */
  sendResultsEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        answers: answersSchema,
        resultSnapshot: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (db) {
        await db
          .insert(subscribers)
          .values({
            userId: ctx.user?.id ?? null,
            name: input.name ?? null,
            email: input.email.toLowerCase(),
            source: "niche-quiz-report",
            status: "subscribed",
            tags: ["quiz-report-sent"],
          })
          .onConflictDoUpdate({
            target: subscribers.email,
            set: {
              userId: ctx.user?.id ?? null,
              name: input.name ?? null,
              source: "niche-quiz-report",
              tags: ["quiz-report-sent"],
              updatedAt: new Date(),
            },
          });
      }

      const { computeAttachmentVector } = await import("../client/src/data/nicheQuiz");
      const { matchNicheFinder, getSubconsciousInsight } = await import("../client/src/data/nicheMatcherEngine");
      const { buildQuizResultsReportEmailHtml } = await import("./_core/emailTemplates");
      const { sendEmail } = await import("./_core/mailer");

      const attachmentVec = computeAttachmentVector(input.answers as any);
      const matchResult = matchNicheFinder(input.answers as any, attachmentVec);
      const insightResult = getSubconsciousInsight(input.answers as any);

      const top3Matches = matchResult.matches.slice(0, 3).map((m, i) => ({
        rank: i + 1,
        score: m.score,
        keyword: m.niche.keyword,
        category: m.niche.category,
        earningPotential: m.niche.earningPotential,
        competitionLevel: m.niche.competitionLevel,
        searchVolume: m.niche.searchVolume,
        reason: m.reason,
      }));

      const html = buildQuizResultsReportEmailHtml({
        name: input.name,
        email: input.email,
        headline: insightResult.headline,
        quadrant: attachmentVec.quadrant,
        userVector: matchResult.userVector as Record<string, number>,
        topMatches: top3Matches,
        siteUrl: process.env.VITE_APP_URL || "https://blacklisted.studio",
      });

      const sendRes = await sendEmail({
        to: input.email,
        subject: "Your Executive Strategic Niche & Psych Blueprint | B.N.E. Studio",
        html,
        tags: ["quiz-report"],
      });

      return { ok: sendRes.ok, messageId: sendRes.messageId };
    }),
});
