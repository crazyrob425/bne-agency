/**
 * Local account auth router — name / email / custom-password registration & login
 * for the Niche Matcher quiz. Coexists with Manus OAuth: a local account claims a
 * `users` row (openId = `local_<email>`), then a session JWT is issued using the
 * same `app_session_id` cookie + secret the rest of the app trusts.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { publicProcedure, router } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import { isStrongPassword, hashPassword, verifyPassword } from "./_core/password";
import { getSessionCookieOptions } from "./_core/cookies";
import { verifyUnsubscribeToken } from "./_core/unsubscribeToken";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getDb } from "./db";
import {
  accountCredentials,
  users,
  subscribers,
  emailReminders,
  type User,
} from "../drizzle/schema";
import { nanoid } from "nanoid";

const emailSchema = z.string().trim().toLowerCase().email().max(320);
const nameSchema = z.string().trim().min(1).max(255);
const passwordSchema = z.string().min(8).max(128);

/** Ensure a `users` row exists keyed by a deterministic local openId. */
async function ensureLocalUser(db: NonNullable<Awaited<ReturnType<typeof getDb>>>, name: string, email: string) {
  const openId = `local_${email}`;
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  if (existing.length > 0) {
    // keep name fresh on each explicit registration
    const u = existing[0];
    await db.update(users).set({ name, lastSignedIn: new Date() }).where(eq(users.id, u.id));
    return u;
  }

  const [inserted] = await db
    .insert(users)
    .values({ openId, name, email, loginMethod: "local", lastSignedIn: new Date() })
    .returning({ id: users.id });
  const created = await db
    .select()
    .from(users)
    .where(eq(users.id, inserted.id))
    .limit(1);
  return created[0] as User;
}

/** Upsert a pending→subscribed contact record for newsletter/site-update use. */
async function upsertSubscriber(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
  userId: number,
  name: string | null,
  email: string,
  source: string,
  tags?: string[]
) {
  const existing = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(subscribers)
      .set({ userId, name: name ?? existing[0].name, source, tags: tags ?? existing[0].tags, updatedAt: new Date() })
      .where(eq(subscribers.id, existing[0].id));
    return existing[0];
  }

  const [inserted] = await db
    .insert(subscribers)
    .values({ userId, name, email, source, status: "subscribed", tags: tags ?? [] })
    .returning({ id: subscribers.id });
  const created = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.id, inserted.id))
    .limit(1);
  return created[0];
}

export const authRouter = router({
  /**
   * Register a local account (name + email + custom password).
   * Creates the users row, account_credentials, and a newsletter subscriber.
   */
  register: publicProcedure
    .input(
      z.object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        /** Accept marketing/newsletter opt-in at registration. */
        subscribe: z.boolean().default(true),
        tags: z.array(z.string()).max(20).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isStrongPassword(input.password)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password must be at least 8 characters and include a letter and a number.",
        });
      }

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      // Reject duplicate local email.
      const dup = await db
        .select({ id: accountCredentials.id })
        .from(accountCredentials)
        .where(eq(accountCredentials.email, input.email))
        .limit(1);
      if (dup.length > 0) {
        throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists." });
      }

      const user = await ensureLocalUser(db, input.name, input.email);
      const passwordHash = await hashPassword(input.password);

      await db.insert(accountCredentials).values({
        userId: user.id,
        name: input.name,
        email: input.email,
        passwordHash,
        emailVerifyToken: nanoid(48),
      });

      if (input.subscribe) {
        await upsertSubscriber(db, user.id, input.name, input.email, "niche-quiz", input.tags);
      }

      issueSession(ctx, user);
      return { ok: true as const, user: publicUser(user) };
    }),

  /** Authenticate a local account via custom password. */
  login: publicProcedure
    .input(z.object({ email: emailSchema, password: passwordSchema }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [cred] = await db
        .select()
        .from(accountCredentials)
        .where(eq(accountCredentials.email, input.email))
        .limit(1);
      if (!cred) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const ok = await verifyPassword(input.password, cred.passwordHash);
      if (!ok) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const [user] = await db.select().from(users).where(eq(users.id, cred.userId)).limit(1);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Account not found." });

      await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
      issueSession(ctx, user);
      return { ok: true as const, user: publicUser(user) };
    }),

  /** Verify a double opt-in email token. */
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string().min(8).max(64) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [cred] = await db
        .select()
        .from(accountCredentials)
        .where(eq(accountCredentials.emailVerifyToken, input.token))
        .limit(1);
      if (!cred) throw new TRPCError({ code: "NOT_FOUND", message: "Invalid or expired token." });

      await db
        .update(accountCredentials)
        .set({ emailVerifiedAt: new Date(), emailVerifyToken: null })
        .where(eq(accountCredentials.id, cred.id));
      return { ok: true as const };
    }),

  /**
   * One-click unsubscribe. Verifies the HMAC-signed token, then marks the
   * subscriber (and any pending reminders) as unsubscribed. Public + idempotent.
   */
  unsubscribe: publicProcedure
    .input(z.object({ token: z.string().min(1).max(512) }))
    .mutation(async ({ input }) => {
      const email = verifyUnsubscribeToken(input.token);
      if (!email) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Invalid or expired unsubscribe link." });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      await db
        .update(subscribers)
        .set({ status: "unsubscribed", unsubscribedAt: new Date(), updatedAt: new Date() })
        .where(eq(subscribers.email, email));
      await db
        .update(emailReminders)
        .set({ status: "cancelled", updatedAt: new Date() })
        .where(and(eq(emailReminders.email, email), eq(emailReminders.status, "pending")));

      return { ok: true as const, email };
    }),
});

function issueSession(ctx: { req: any; res: any }, user: User) {
  const token = sdk.signSession(
    { openId: user.openId, appId: process.env.VITE_APP_ID ?? "", name: user.name ?? "" },
    { expiresInMs: ONE_YEAR_MS }
  );
  ctx.res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(ctx.req), maxAge: ONE_YEAR_MS });
}

function publicUser(u: User) {
  return { id: u.id, name: u.name, email: u.email, loginMethod: u.loginMethod };
}

