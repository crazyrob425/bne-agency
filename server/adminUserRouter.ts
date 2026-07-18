/**
 * Admin user management router — manage members portal access and permissions.
 *
 * Only accessible to users with role === 'admin'.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq, sql, desc } from "drizzle-orm";
import { adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { users, applicationDrafts, subscribers, quizProgress } from "../drizzle/schema";

const permissionSchema = z.object({
  dashboard: z.boolean().default(true),
  vault: z.boolean().default(false),
  tools: z.boolean().default(false),
  admin: z.boolean().default(false),
  messaging: z.boolean().default(false),
  billing: z.boolean().default(false),
});

export const adminUserRouter = router({
  /** List all users with their permission summary. */
  list: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

    const allUsers = await db
      .select({
        id: users.id,
        openId: users.openId,
        name: users.name,
        email: users.email,
        loginMethod: users.loginMethod,
        role: users.role,
        membersAccessGranted: users.membersAccessGranted,
        membersPermissions: users.membersPermissions,
        firebaseUid: users.firebaseUid,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return allUsers;
  }),

  /** Update a specific user's members access and permissions. */
  updatePermissions: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        membersAccessGranted: z.boolean(),
        permissions: permissionSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [updated] = await db
        .update(users)
        .set({
          membersAccessGranted: input.membersAccessGranted ? 1 : 0,
          membersPermissions: input.permissions,
          updatedAt: new Date(),
        })
        .where(eq(users.id, input.userId))
        .returning();

      return updated;
    }),

  /** Grant full members access to a user. */
  grantAccess: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [updated] = await db
        .update(users)
        .set({ membersAccessGranted: 1, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning();

      return updated;
    }),

  /** Revoke members access from a user. */
  revokeAccess: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [updated] = await db
        .update(users)
        .set({ membersAccessGranted: 0, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning();

      return updated;
    }),

  /** Get detailed user profile including drafts and progress. */
  getDetail: adminProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const [user] = await db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      const drafts = await db.select().from(applicationDrafts).where(eq(applicationDrafts.userId, input.userId)).orderBy(desc(applicationDrafts.updatedAt)).limit(10);
      const [quiz] = await db.select().from(quizProgress).where(eq(quizProgress.userId, input.userId)).limit(1);
      const subs = await db.select().from(subscribers).where(eq(subscribers.userId, input.userId)).limit(5);

      return { user, drafts, quiz, subscribers: subs };
    }),
});
