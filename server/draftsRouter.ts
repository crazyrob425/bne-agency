/**
 * Drafts router — save/continue/abandon for onboarding and quiz flows.
 *
 * Supports both authenticated users (tied to userId) and anonymous sessions
 * (tied to sessionId cookie). Drafts are auto-purged after 90 days.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq, isNull, sql, desc } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { applicationDrafts } from "../drizzle/schema";

const draftTypeSchema = z.enum(["onboarding", "quiz", "application"]);

export const draftsRouter = router({
  /**
   * Save or update a draft. Works for both auth and anon users.
   * For anon users, sessionId is required. For auth users, userId is used.
   */
  save: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(8).max(128),
        type: draftTypeSchema,
        data: z.record(z.any()),
        files: z.array(z.any()).optional().default([]),
        lastStep: z.string().max(128).optional(),
        savedForLater: z.boolean().optional().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const userId = ctx.user?.id ?? null;
      const now = new Date();

      // If user just logged in, try to merge any anonymous drafts
      if (userId && input.sessionId) {
        const [anonDraft] = await db
          .select()
          .from(applicationDrafts)
          .where(and(eq(applicationDrafts.sessionId, input.sessionId), isNull(applicationDrafts.userId)))
          .limit(1);

        if (anonDraft) {
          // Merge: update anon draft to belong to user
          await db
            .update(applicationDrafts)
            .set({ userId, updatedAt: now })
            .where(eq(applicationDrafts.id, anonDraft.id));
          return { ok: true as const, merged: true };
        }
      }

      const [existing] = await db
        .select()
        .from(applicationDrafts)
        .where(and(eq(applicationDrafts.sessionId, input.sessionId), userId ? eq(applicationDrafts.userId, userId) : isNull(applicationDrafts.userId)))
        .limit(1);

      if (existing) {
        await db
          .update(applicationDrafts)
          .set({
            data: input.data,
            files: input.files ?? existing.files,
            lastStep: input.lastStep ?? existing.lastStep,
            savedForLater: input.savedForLater ? 1 : 0,
            updatedAt: now,
            abandonedAt: input.savedForLater ? now : existing.abandonedAt,
          })
          .where(eq(applicationDrafts.id, existing.id));
      } else {
        await db.insert(applicationDrafts).values({
          userId,
          sessionId: input.sessionId,
          type: input.type,
          data: input.data,
          files: input.files ?? [],
          lastStep: input.lastStep ?? null,
          savedForLater: input.savedForLater ? 1 : 0,
          abandonedAt: input.savedForLater ? now : null,
        });
      }

      return { ok: true as const };
    }),

  /**
   * Get the latest draft for a given session (or user if authenticated).
   */
  get: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(8).max(128),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const userId = ctx.user?.id ?? null;

      const [draft] = await db
        .select()
        .from(applicationDrafts)
        .where(and(eq(applicationDrafts.sessionId, input.sessionId), userId ? eq(applicationDrafts.userId, userId) : isNull(applicationDrafts.userId)))
        .orderBy(desc(applicationDrafts.updatedAt))
        .limit(1);

      if (!draft) return null;

      return {
        id: draft.id,
        type: draft.type,
        data: draft.data,
        files: draft.files,
        lastStep: draft.lastStep,
        savedForLater: draft.savedForLater === 1,
        updatedAt: draft.updatedAt,
      };
    }),

  /**
   * List all drafts for the authenticated user.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(applicationDrafts)
      .where(eq(applicationDrafts.userId, ctx.user.id))
      .orderBy(desc(applicationDrafts.updatedAt));
  }),

  /**
   * Mark a draft as abandoned (triggers re-engagement scheduling).
   */
  abandon: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(8).max(128),
        type: draftTypeSchema,
        lastStep: z.string().max(128).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      const userId = ctx.user?.id ?? null;

      const [existing] = await db
        .select()
        .from(applicationDrafts)
        .where(and(eq(applicationDrafts.sessionId, input.sessionId), userId ? eq(applicationDrafts.userId, userId) : isNull(applicationDrafts.userId)))
        .limit(1);

      if (existing) {
        await db
          .update(applicationDrafts)
          .set({ abandonedAt: new Date(), savedForLater: 1, updatedAt: new Date() })
          .where(eq(applicationDrafts.id, existing.id));
      } else {
        await db.insert(applicationDrafts).values({
          userId,
          sessionId: input.sessionId,
          type: input.type,
          data: {},
          files: [],
          lastStep: input.lastStep ?? null,
          savedForLater: 1,
          abandonedAt: new Date(),
        });
      }

      return { ok: true as const };
    }),

  /**
   * Delete a draft (after explicit user action or cleanup).
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });

      await db.delete(applicationDrafts).where(and(eq(applicationDrafts.id, input.id), eq(applicationDrafts.userId, ctx.user.id)));
      return { ok: true as const };
    }),
});
