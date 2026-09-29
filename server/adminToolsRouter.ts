/**
 * Admin privacy-tools router — geo-block profile management.
 *
 * Every procedure here is admin-only (role === 'admin'), enforced by
 * adminProcedure. Geo-block profiles store a stage ALIAS only — never a
 * legal name — and live outside the public site entirely.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { geoBlockProfiles } from "../drizzle/schema";

const STATUS_VALUES = ["requested", "configured", "verified", "on_hold"] as const;

const locationSchema = z.object({
  state: z.string().min(1).max(64),
  stateCode: z.string().length(2),
  county: z.string().max(64).optional(),
  city: z.string().max(64).optional(),
});

const profileInput = z.object({
  clientAlias: z.string().trim().min(1).max(120),
  platforms: z.array(z.string().min(1).max(64)).default([]),
  blockedStates: z.array(z.string().length(2)).default([]),
  blockedLocations: z.array(locationSchema).default([]),
  status: z.enum(STATUS_VALUES).default("requested"),
  notes: z.string().max(4000).default(""),
});

async function requireDb() {
  const db = await getDb();
  if (!db) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
  }
  return db;
}

export const adminToolsRouter = router({
  /** All geo-block profiles, newest first. */
  listGeoBlocks: adminProcedure.query(async () => {
    const db = await requireDb();
    return db
      .select()
      .from(geoBlockProfiles)
      .orderBy(desc(geoBlockProfiles.updatedAt));
  }),

  /** Single profile by id. */
  getGeoBlock: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const rows = await db
        .select()
        .from(geoBlockProfiles)
        .where(eq(geoBlockProfiles.id, input.id))
        .limit(1);
      if (rows.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Geo-block profile not found." });
      }
      return rows[0];
    }),

  /** Create a new client geo-block request. */
  createGeoBlock: adminProcedure
    .input(profileInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const [row] = await db
        .insert(geoBlockProfiles)
        .values({
          clientAlias: input.clientAlias,
          platforms: input.platforms,
          blockedStates: [...new Set(input.blockedStates)],
          blockedLocations: input.blockedLocations,
          status: input.status,
          notes: input.notes || null,
          createdBy: ctx.user.id,
        })
        .returning();
      return row;
    }),

  /** Update an existing profile. */
  updateGeoBlock: adminProcedure
    .input(profileInput.extend({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [row] = await db
        .update(geoBlockProfiles)
        .set({
          clientAlias: input.clientAlias,
          platforms: input.platforms,
          blockedStates: [...new Set(input.blockedStates)],
          blockedLocations: input.blockedLocations,
          status: input.status,
          notes: input.notes || null,
        })
        .where(eq(geoBlockProfiles.id, input.id))
        .returning();
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Geo-block profile not found." });
      }
      return row;
    }),

  /** Delete a profile (e.g. client churned or request withdrawn). */
  deleteGeoBlock: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(geoBlockProfiles).where(eq(geoBlockProfiles.id, input.id));
      return { success: true } as const;
    }),
});
