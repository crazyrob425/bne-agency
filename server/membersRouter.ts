/**
 * Members portal router — the modular client members area.
 *
 * - memberProcedure: signed-in user with membersAccessGranted === 1 (admins always pass)
 * - adminProcedure: site admins (review queue, all fingerprints)
 *
 * File bytes are handled by the Express upload/download endpoints in
 * server/_core/index.ts; this router deals in metadata + review workflow.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { adminProcedure, memberProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { contentFingerprints, contentSubmissions, users } from "../drizzle/schema";
import { MEMBER_MODULE_KEYS } from "@shared/memberModules";

const REVIEW_INBOX_PREFIX = "uploads/review-inbox/";

const submissionInput = z.object({
  /** Server-relative path returned by POST /api/members/upload */
  filePath: z.string().min(1).max(300).refine(
    (p) => p.startsWith(REVIEW_INBOX_PREFIX) && !p.includes(".."),
    { message: "Invalid file path" }
  ),
  fileName: z.string().min(1).max(200),
  mimeType: z.string().min(1).max(100),
  fileSize: z.number().int().positive().max(500 * 1024 * 1024),
  title: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
});

export const membersRouter = router({
  /** Current member's portal profile: assigned modules + legacy flags. */
  me: memberProcedure.query(async ({ ctx }) => {
    const u = ctx.user as any;
    const perms = (u.membersPermissions ?? {}) as Record<string, unknown>;
    const modules = Array.isArray(perms.modules)
      ? (perms.modules as string[]).filter((m) => MEMBER_MODULE_KEYS.includes(m))
      : [];
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      isAdmin: u.role === "admin",
      membersAccessGranted: u.membersAccessGranted === 1,
      modules,
      permissions: perms,
    };
  }),

  /** My content-review submissions, newest first. */
  mySubmissions: memberProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
    return db
      .select()
      .from(contentSubmissions)
      .where(eq(contentSubmissions.userId, (ctx.user as any).id))
      .orderBy(desc(contentSubmissions.submittedAt));
  }),

  /** Register a submission after uploading bytes to POST /api/members/upload. */
  createSubmission: memberProcedure
    .input(submissionInput)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const [row] = await db
        .insert(contentSubmissions)
        .values({
          userId: (ctx.user as any).id,
          fileName: input.fileName,
          filePath: input.filePath,
          mimeType: input.mimeType,
          fileSize: input.fileSize,
          title: input.title ?? null,
          notes: input.notes ?? null,
          status: "pending_review",
        })
        .returning();
      return row;
    }),

  /** Admin: full review queue with submitter identity. */
  listSubmissions: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
    return db
      .select({
        id: contentSubmissions.id,
        fileName: contentSubmissions.fileName,
        filePath: contentSubmissions.filePath,
        mimeType: contentSubmissions.mimeType,
        fileSize: contentSubmissions.fileSize,
        title: contentSubmissions.title,
        notes: contentSubmissions.notes,
        status: contentSubmissions.status,
        staffFeedback: contentSubmissions.staffFeedback,
        submittedAt: contentSubmissions.submittedAt,
        reviewedAt: contentSubmissions.reviewedAt,
        submitterName: users.name,
        submitterEmail: users.email,
      })
      .from(contentSubmissions)
      .leftJoin(users, eq(contentSubmissions.userId, users.id))
      .orderBy(desc(contentSubmissions.submittedAt));
  }),

  /** Admin: approve or request changes with written feedback. */
  reviewSubmission: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(["approved", "needs_changes", "pending_review"]),
        staffFeedback: z.string().max(5000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const [row] = await db
        .update(contentSubmissions)
        .set({
          status: input.status,
          staffFeedback: input.staffFeedback ?? null,
          reviewedBy: (ctx.user as any).id,
          reviewedAt: new Date(),
        })
        .where(eq(contentSubmissions.id, input.id))
        .returning();
      if (!row) throw new TRPCError({ code: "NOT_FOUND", message: "Submission not found." });
      return row;
    }),

  /** Register a Studio Editor export fingerprint (called automatically on export). */
  registerFingerprint: memberProcedure
    .input(
      z.object({
        watermarkId: z.string().min(3).max(32),
        fileHash: z.string().min(16).max(128),
        perceptualHash: z.string().max(64).optional(),
        fileName: z.string().min(1).max(200),
        mimeType: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      try {
        const [row] = await db
          .insert(contentFingerprints)
          .values({
            userId: (ctx.user as any).id,
            watermarkId: input.watermarkId,
            fileHash: input.fileHash,
            perceptualHash: input.perceptualHash ?? null,
            fileName: input.fileName,
            mimeType: input.mimeType ?? null,
          })
          .returning();
        return row;
      } catch (e: any) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That tracking ID is already registered. Export again for a fresh ID.",
        });
      }
    }),

  /** My protected assets. */
  myFingerprints: memberProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
    return db
      .select()
      .from(contentFingerprints)
      .where(eq(contentFingerprints.userId, (ctx.user as any).id))
      .orderBy(desc(contentFingerprints.createdAt));
  }),

  /** Admin: every registered fingerprint across clients. */
  allFingerprints: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
    return db
      .select({
        id: contentFingerprints.id,
        watermarkId: contentFingerprints.watermarkId,
        fileHash: contentFingerprints.fileHash,
        perceptualHash: contentFingerprints.perceptualHash,
        fileName: contentFingerprints.fileName,
        mimeType: contentFingerprints.mimeType,
        createdAt: contentFingerprints.createdAt,
        ownerName: users.name,
        ownerEmail: users.email,
      })
      .from(contentFingerprints)
      .leftJoin(users, eq(contentFingerprints.userId, users.id))
      .orderBy(desc(contentFingerprints.createdAt));
  }),
});
