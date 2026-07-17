import { z } from "zod";
import { notifyOwner } from "./notification";
import { processDueReminders } from "./reengagement";
import { adminProcedure, publicProcedure, router } from "./trpc";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),

  /**
   * Cron-triggered worker that dispatches all due re-engagement reminder emails.
   * Safe to call repeatedly; only pending rows with sendAt <= now are processed.
   * Guarded by admin so only the scheduler / an admin can invoke it.
   */
  processReminders: adminProcedure
    .mutation(async () => {
      const result = await processDueReminders();
      return { ok: true as const, ...result };
    }),
});
