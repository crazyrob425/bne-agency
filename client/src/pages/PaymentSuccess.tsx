/**
 * BNE Payment Success Page
 * Shown after a successful Stripe checkout
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Zap, MessageSquare } from "lucide-react";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] ?? "");
  const sessionId = params.get("session_id") ?? "";

  const { data: session, isLoading } = trpc.stripe.verifySession.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  const productNames: Record<string, string> = {
    bne_starter: "Starter Hustle",
    bne_pro: "Pro Stack",
    bne_elite: "Elite Empire",
    bne_niche_audit: "Niche Deep Dive Audit",
    bne_brand_kit: "Brand Identity Kit",
  };

  const productName = session?.productId ? (productNames[session.productId] ?? "BNE Service") : "BNE Service";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-28 pb-20 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-400" style={{ fontFamily: "DM Sans" }}>Confirming your payment...</p>
            </div>
          ) : session?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-emerald-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Payment Confirmed</span>
                <h1 className="text-4xl font-bold text-zinc-100 mt-2 mb-3" style={{ fontFamily: "Space Grotesk" }}>
                  You're officially in, sis. 🎉
                </h1>
                <p className="text-zinc-400 text-lg mb-2" style={{ fontFamily: "DM Sans" }}>
                  <strong className="text-zinc-200">{productName}</strong> is locked in.
                </p>
                <p className="text-zinc-500 text-sm mb-8" style={{ fontFamily: "DM Sans" }}>
                  A confirmation email is on its way to <strong className="text-zinc-300">{session.customerEmail}</strong>. Our team will reach out within 24 hours to get you set up and running.
                </p>

                <div className="glass-card p-5 border border-emerald-500/20 mb-8 text-left">
                  <h3 className="text-zinc-200 font-semibold mb-3 text-sm" style={{ fontFamily: "Space Grotesk" }}>What happens next?</h3>
                  <ul className="space-y-2.5">
                    {[
                      "Check your email for your receipt and onboarding details",
                      "Our team will DM you within 24 hours to kick things off",
                      "We'll schedule your strategy call and get your profile audit started",
                      "You'll have access to the full Creator Tools vault immediately",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-sm" style={{ fontFamily: "DM Sans" }}>
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center shrink-0 mt-0.5 mono-stat font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/creator-tools">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-neon text-sm font-semibold"
                    >
                      <Zap size={15} />
                      Access Creator Tools
                      <ArrowRight size={13} />
                    </motion.button>
                  </Link>
                  <Link href="/onboarding">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-sm font-semibold hover:bg-white/12 transition-all"
                    >
                      <MessageSquare size={15} />
                      Complete Onboarding
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-zinc-100 mb-3" style={{ fontFamily: "Space Grotesk" }}>
                Hmm, something's off.
              </h1>
              <p className="text-zinc-500 mb-6" style={{ fontFamily: "DM Sans" }}>
                We couldn't verify your payment. If you were charged, don't stress — hit us up and we'll sort it out immediately.
              </p>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-neon text-sm font-semibold"
                >
                  Back to Pricing
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

