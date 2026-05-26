import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    // express.raw is applied per-route here — must come BEFORE express.json() in index.ts
    (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        console.error("[Stripe Webhook] Missing signature or secret");
        return res.status(400).send("Missing signature");
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err) {
        console.error("[Stripe Webhook] Signature verification failed:", err);
        return res.status(400).send("Webhook signature verification failed");
      }

      // Handle test events — required for webhook verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Event: ${event.type} | ID: ${event.id}`);

      // Handle events asynchronously
      handleWebhookEvent(event).catch((err) => {
        console.error("[Stripe Webhook] Handler error:", err);
      });

      return res.json({ received: true });
    }
  );
}

async function handleWebhookEvent(event: Stripe.Event) {
  const db = await getDb();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const productId = session.metadata?.product_id;
      const customerEmail = session.metadata?.customer_email;
      const customerName = session.metadata?.customer_name;
      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null;

      console.log(
        `[Stripe] Checkout completed — user: ${userId}, product: ${productId}, customer: ${stripeCustomerId}`
      );

      // Save Stripe customer ID to user record
      if (db && userId && stripeCustomerId) {
        try {
          await db
            .update(users)
            .set({ stripeCustomerId })
            .where(eq(users.id, parseInt(userId)));
        } catch (err) {
          console.error("[Stripe] Failed to update stripeCustomerId:", err);
        }
      }

      // Notify owner
      await notifyOwner({
        title: `💰 New BNE Purchase — ${productId}`,
        content: `New checkout completed!\n\nCustomer: ${customerName} (${customerEmail})\nProduct: ${productId}\nAmount: $${((session.amount_total ?? 0) / 100).toFixed(2)}\nMode: ${session.mode}\nSession: ${session.id}`,
      });

      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(
        `[Stripe] Subscription ${event.type} — ID: ${subscription.id}, status: ${subscription.status}`
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(
        `[Stripe] Subscription cancelled — ID: ${subscription.id}`
      );
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(
        `[Stripe] Invoice paid — ID: ${invoice.id}, amount: ${invoice.amount_paid}`
      );
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[Stripe] Payment succeeded — ID: ${paymentIntent.id}, amount: ${paymentIntent.amount}`
      );
      break;
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }
}
