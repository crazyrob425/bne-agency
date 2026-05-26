/**
 * BNE Pricing Page — Stripe-powered checkout
 * Three subscription tiers + two one-time products
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Check, Zap, Crown, Star, ArrowRight, Shield, Lock, Sparkles, CreditCard
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const }
  })
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

const TIER_ICONS = [Zap, Star, Crown];
const TIER_COLORS = [
  { border: "border-zinc-700/50", glow: "", badge: "bg-zinc-800 text-zinc-300", btn: "bg-white/10 border border-white/20 hover:bg-white/15 text-zinc-100" },
  { border: "border-violet-500/50", glow: "shadow-[0_0_40px_oklch(0.627_0.265_303.9/20%)]", badge: "bg-violet-500/20 text-violet-300", btn: "btn-neon" },
  { border: "border-emerald-500/30", glow: "", badge: "bg-emerald-500/15 text-emerald-300", btn: "bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-100" },
];

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const { data: productsData } = trpc.stripe.getProducts.useQuery();
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const subscriptions = productsData?.subscriptions ?? [];
  const oneTime = productsData?.oneTime ?? [];

  async function handlePurchase(productId: string) {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setLoadingProductId(productId);
    toast.info("Redirecting you to secure checkout...", { duration: 3000 });

    try {
      const result = await createCheckout.mutateAsync({
        productId,
        origin: window.location.origin,
      });

      if (result.url) {
        window.open(result.url, "_blank");
      } else {
        toast.error("Couldn't create checkout session. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went sideways. Hit us up if this keeps happening.");
    } finally {
      setLoadingProductId(null);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/15 via-transparent to-emerald-900/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-500/6 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6"
          >
            <CreditCard size={13} className="text-violet-400" />
            <span className="text-violet-300 text-xs font-medium mono-stat">STRAIGHT UP PRICING — NO SNEAKY FEES, NO BS</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Space Grotesk" }}
          >
            <span className="text-zinc-100">Pick Your </span>
            <span className="gradient-text">Bag Level</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "DM Sans" }}
          >
              Whether you're brand new or already stacking, we've got a level built for where you are. No long-term contracts. Cancel whenever. We're only here if we can actually help you make more money.
          </motion.p>
        </div>
      </section>

      {/* ── SUBSCRIPTION TIERS ── */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {subscriptions.map((product, i) => {
              const colors = TIER_COLORS[i] ?? TIER_COLORS[0];
              const Icon = TIER_ICONS[i] ?? Zap;
              const isLoading = loadingProductId === product.id;

              return (
                <motion.div
                  key={product.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`relative glass-card border ${colors.border} ${colors.glow} flex flex-col overflow-hidden`}
                >
                  {/* Popular badge */}
                  {product.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-emerald-400" />
                  )}
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mono-stat ${colors.badge}`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${i === 1 ? "text-violet-400" : i === 2 ? "text-emerald-400" : "text-zinc-400"}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-zinc-100 font-bold text-lg" style={{ fontFamily: "Space Grotesk" }}>
                          {product.name}
                        </h3>
                        <p className="text-zinc-500 text-xs" style={{ fontFamily: "DM Sans" }}>
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold text-zinc-100 mono-stat">{formatPrice(product.price)}</span>
                        <span className="text-zinc-500 text-sm mb-1.5">/month</span>
                      </div>
                      <p className="text-zinc-500 text-xs mt-1" style={{ fontFamily: "DM Sans" }}>
                        {product.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check size={14} className={`mt-0.5 shrink-0 ${i === 1 ? "text-violet-400" : i === 2 ? "text-emerald-400" : "text-zinc-500"}`} />
                          <span className="text-zinc-400 text-sm leading-snug" style={{ fontFamily: "DM Sans" }}>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePurchase(product.id)}
                      disabled={isLoading}
                      className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${colors.btn} disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Opening Checkout...
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          Get Started — {formatPrice(product.price)}/mo
                          <ArrowRight size={14} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {[
              { icon: Shield, label: "Cancel Anytime, No Drama" },
              { icon: Lock, label: "Secure Stripe Checkout" },
              { icon: Check, label: "No Hidden Fees, Ever" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-zinc-500 text-sm" style={{ fontFamily: "DM Sans" }}>
                <Icon size={14} className="text-emerald-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ONE-TIME PRODUCTS ── */}
      <section className="py-16 border-t border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">One-Time Add-Ons</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2" style={{ fontFamily: "Space Grotesk" }}>
              Not Ready to Commit? No Pressure.
            </h2>
            <p className="text-zinc-500 mt-2 max-w-xl mx-auto text-sm" style={{ fontFamily: "DM Sans" }}>
              Grab a single service and see what we're about. One payment, real results, zero strings.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {oneTime.map((product, i) => {
              const isLoading = loadingProductId === product.id;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="glass-card border border-zinc-700/50 p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-zinc-100 font-bold" style={{ fontFamily: "Space Grotesk" }}>{product.name}</h3>
                    <span className="text-zinc-400 text-xs bg-zinc-800 px-2.5 py-1 rounded-full mono-stat">ONE-TIME</span>
                  </div>
                  <p className="text-zinc-500 text-sm mb-4 leading-relaxed" style={{ fontFamily: "DM Sans" }}>{product.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-zinc-400 text-sm" style={{ fontFamily: "DM Sans" }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-zinc-100 mono-stat">{formatPrice(product.price)}</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePurchase(product.id)}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-sm font-semibold hover:bg-white/12 transition-all disabled:opacity-60"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>Buy Now <ArrowRight size={13} /></>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 border-t border-white/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: "Space Grotesk" }}>Real Talk — FAQ</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel whenever I want?",
                a: "Absolutely. No contracts, no cancellation fees, no guilt trips. Cancel from your dashboard anytime and you keep access through the end of your billing period. We're not holding you hostage."
              },
              {
                q: "What cards do y'all take?",
                a: "All major cards through Stripe — Visa, Mastercard, Amex, Discover. Stripe is the same processor Amazon and Google use, so your card info is encrypted and never touches our servers."
              },
              {
                q: "How do I know BNE is legit?",
                a: "Fair question. We're powered by Stripe for payments, and everything we offer is real — no fake tools, no simulated features. You can test the checkout with card 4242 4242 4242 4242 before you commit a single dollar."
              },
              {
                q: "What if it's not working for me?",
                a: "Hit us within the first 7 days and we'll make it right. We're not here to take money from girls we can't actually help. That's not how we operate."
              },
              {
                q: "Do I need an account to buy?",
                a: "Yes — we need an account to connect your purchase to your profile and get everything set up for you. Takes 30 seconds. We don't spam, we don't sell your info."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="glass-card p-5 border border-white/8"
              >
                <h4 className="text-zinc-200 font-semibold mb-2 text-sm" style={{ fontFamily: "Space Grotesk" }}>{item.q}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed" style={{ fontFamily: "DM Sans" }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 border-t border-white/8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-3" style={{ fontFamily: "Space Grotesk" }}>
              Still Thinking About It?
            </h2>
            <p className="text-zinc-500 mb-6" style={{ fontFamily: "DM Sans" }}>
              Start with the free Niche Matcher. Zero commitment, no card required. Find out exactly what lane you should be in before you spend a single dollar.
            </p>
            <Link href="/niche-matcher">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-neon text-sm font-semibold"
              >
                <Zap size={16} />
                Try the Free Niche Matcher
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
