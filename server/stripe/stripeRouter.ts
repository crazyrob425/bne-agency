import Stripe from "stripe";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { BNE_PRODUCTS, ONE_TIME_PRODUCTS } from "./products";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const createStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.warn("[stripeRouter] STRIPE_SECRET_KEY missing; billing routes will be unavailable until configured.");
    return null;
  }
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
};

const stripe = createStripe();
let onStripeReady: (() => void) | null = null;
if (stripe) {
  stripe.customers.list({ limit: 1 }).catch(() => {});
}

export const stripeRouter = router({
  /** List all available products */
  getProducts: publicProcedure.query(() => {
    return {
      subscriptions: BNE_PRODUCTS,
      oneTime: ONE_TIME_PRODUCTS,
      stripeActive: !!stripe,
    };
  }),

  /** Create a Stripe Checkout Session for a subscription or one-time payment */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const allProducts = [...BNE_PRODUCTS, ...ONE_TIME_PRODUCTS];
      const product = allProducts.find((p) => p.id === input.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      const isSubscription = product.interval === "month";

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          product_id: product.id,
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
        },
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                metadata: {
                  bne_product_id: product.id,
                },
              },
              unit_amount: product.price,
              ...(isSubscription
                ? { recurring: { interval: "month" } }
                : {}),
            },
            quantity: 1,
          },
        ],
        mode: isSubscription ? "subscription" : "payment",
        allow_promotion_codes: true,
        success_url: `${input.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/pricing`,
      };

      const session = await stripe
        ?.checkout.sessions.create(sessionParams);

      if (!session) {
        throw new Error(
          "Stripe is not configured. Please set STRIPE_SECRET_KEY on the server."
        );
      }

      return { url: session.url };
    }),

  /** Get payment history for the current user */
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { payments: [] };

    // Get user's stripe customer id from DB if stored
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);

    const user = userRecord[0];
    if (!user?.stripeCustomerId) return { payments: [] };

try {
      const sessions = await stripe
        ?.checkout.sessions.list({
        customer: user.stripeCustomerId,
        limit: 20,
        expand: ["data.line_items"],
      });

      if (!sessions?.data) return { payments: [] };

      const payments = sessions.data
        .filter((s) => s.payment_status === "paid")
        .map((s) => ({
          id: s.id,
          amount: s.amount_total ?? 0,
          currency: s.currency ?? "usd",
          status: s.payment_status,
          createdAt: s.created * 1000,
          productName:
            (s.line_items?.data[0]?.description as string) ?? "BNE Service",
          mode: s.mode,
        }));

      return { payments };
    } catch {
      return { payments: [] };
    }
  }),

  /** Verify a checkout session after redirect */
  verifySession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await stripe?.checkout.sessions.retrieve(
          input.sessionId
        );
        if (!session) return { success: false, productId: "", customerEmail: "", amountTotal: 0, currency: "usd", mode: "payment" as const };
        return {
          success: session.payment_status === "paid",
          productId: session.metadata?.product_id ?? "",
          customerEmail: session.customer_details?.email ?? "",
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          mode: session.mode,
        };
      } catch {
        return { success: false, productId: "", customerEmail: "", amountTotal: 0, currency: "usd", mode: "payment" as const };
      }
    }),
});
