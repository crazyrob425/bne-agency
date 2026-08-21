/**
 * BNE Pricing Page — Stripe-powered checkout
 * Core tiers + a-la-carte add-ons
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
import Seo from "@/components/Seo";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  Check, Zap, Crown, Star, ArrowRight, Shield, Lock, Sparkles, CreditCard, Plus
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

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const { data: productsData } = trpc.stripe.getProducts.useQuery();
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const subscriptions = productsData?.subscriptions ?? [];
  const oneTime = productsData?.oneTime ?? [];

  // Split subscriptions into core tiers vs add-ons
  const coreIds = new Set(["bne_starter", "bne_pro", "bne_elite"]);
  const coreTiers = subscriptions.filter(p => coreIds.has(p.id));
  const addOns = subscriptions.filter(p => !coreIds.has(p.id));

  const badgeColor: Record<string, string> = {
    "Most Popular": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Elite": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Add-On": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Protection": "bg-red-500/15 text-red-300 border-red-500/30",
  };

  async function handlePurchase(productId: string) {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (productsData && productsData.stripeActive === false) {
      toast.warning("Payments are temporarily paused. Please apply for access or contact us directly to purchase.", {
        duration: 5000,
        id: "stripe-hold-warning"
      });
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
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/8%)] via-transparent to-[oklch(0.72_0.12_85/4%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[oklch(0.78_0.16_85/4%)] blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6"
          >
            <CreditCard size={13} className="text-[oklch(0.78_0.16_85)]" />
            <span className="text-[oklch(0.78_0.14_85)] text-xs font-semibold tracking-[0.15em] uppercase font-body">
              Straightforward Pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="heading-xl text-[oklch(0.94_0.01_85)] mb-5"
          >
            Pick Your <span className="gradient-text-gold">Growth Level</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-[oklch(0.65_0.012_85)] text-lg max-w-2xl mx-auto font-body"
          >
            Whether you're just getting started or ready to scale to six figures — we have a package that fits.
            No fine print, no long-term contracts, cancel anytime.
          </motion.p>
        </div>
      </section>

      {/* ── CORE TIERS ── */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {coreTiers.map((product, i) => {
              const isLoading = loadingProductId === product.id;
              const isPopular = product.popular;
              return (
                <motion.div
                  key={product.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`relative luxury-card flex flex-col overflow-hidden ${isPopular ? "border-[oklch(0.78_0.16_85/35%)] glow-gold-sm" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[oklch(0.78_0.16_85)] via-[oklch(0.72_0.12_85)] to-[oklch(0.80_0.14_85)]" />
                  )}
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${badgeColor[product.badge] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                        {i === 0 && <Zap size={20} />}
                        {i === 1 && <Star size={20} />}
                        {i === 2 && <Crown size={20} />}
                      </div>
                      <div>
                        <h3 className="text-[oklch(0.94_0.01_85)] font-bold text-lg font-display">{product.name}</h3>
                        <p className="text-[oklch(0.58_0.015_85)] text-xs font-body">{product.tagline}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold text-[oklch(0.94_0.01_85)] font-mono-lux">{formatPrice(product.price)}</span>
                        <span className="text-[oklch(0.58_0.015_85)] text-sm mb-1.5 font-body">/month</span>
                      </div>
                      <p className="text-[oklch(0.58_0.015_85)] text-xs mt-1.5 font-body">{product.description}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check size={14} className="mt-0.5 shrink-0 text-[oklch(0.78_0.16_85)]" />
                          <span className="text-[oklch(0.65_0.012_85)] text-sm leading-snug font-body">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePurchase(product.id)}
                      disabled={isLoading}
                      className={`w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all btn-gold disabled:opacity-60 disabled:cursor-not-allowed`}
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
        </div>
      </section>

      {/* ── A-LA-CARTE ADD-ONS ── */}
      {addOns.length > 0 && (
        <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)] bg-[oklch(0.05_0.004_85)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
                A-La-Carte Add-Ons
              </span>
              <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-4">
                Mix & Match What You Need
              </h2>
              <p className="text-[oklch(0.58_0.015_85)] max-w-2xl mx-auto font-body">
                Not everything fits in a package? Add exactly what you want. All add-ons work with any core tier or standalone.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-5" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {addOns.map((product, i) => {
                const isLoading = loadingProductId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="luxury-card p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                        <Plus size={18} />
                      </div>
                      <div>
                        <h3 className="text-[oklch(0.94_0.01_85)] font-bold text-sm font-display leading-tight">{product.name}</h3>
                        {product.badge && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor[product.badge] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[oklch(0.58_0.015_85)] text-xs leading-relaxed mb-5 font-body flex-1">{product.description}</p>

                    <div className="flex items-end gap-1.5 mb-4">
                      <span className="text-2xl font-bold text-[oklch(0.94_0.01_85)] font-mono-lux">{formatPrice(product.price)}</span>
                      <span className="text-[oklch(0.58_0.015_85)] text-xs mb-0.5 font-body">/{product.interval === "one_time" ? "one-time" : "month"}</span>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {product.features.slice(0, 4).map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 shrink-0 text-[oklch(0.78_0.16_85)]" />
                          <span className="text-[oklch(0.65_0.012_85)] text-xs leading-snug font-body">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePurchase(product.id)}
                      disabled={isLoading}
                      className="w-full py-3 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all btn-gold-outline disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>Add to Plan <ArrowRight size={12} /></>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ONE-TIME PRODUCTS ── */}
      {oneTime.length > 0 && (
        <section className="py-16 border-t border-[oklch(0.78_0.16_85/8%)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">One-Time Services</span>
              <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-3">Single Services, No Commitment</h2>
              <p className="text-[oklch(0.58_0.015_85)] max-w-xl mx-auto text-sm font-body">
                Want to test the waters? Grab a single service and see what we're about. One payment, real results, zero strings.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {oneTime.map((product, i) => {
                const isLoading = loadingProductId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="luxury-card p-6 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[oklch(0.94_0.01_85)] font-bold font-display">{product.name}</h3>
                        <p className="text-[oklch(0.58_0.015_85)] text-xs font-body mt-0.5">{product.tagline}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[oklch(0.78_0.16_85/15%)] bg-[oklch(0.78_0.16_85/6%)] text-[oklch(0.78_0.16_85)]">One-Time</span>
                    </div>
                    <p className="text-[oklch(0.58_0.015_85)] text-xs mb-4 leading-relaxed font-body">{product.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check size={13} className="mt-0.5 shrink-0 text-[oklch(0.78_0.16_85)]" />
                          <span className="text-[oklch(0.65_0.012_85)] text-sm font-body">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[oklch(0.94_0.01_85)] font-mono-lux">{formatPrice(product.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePurchase(product.id)}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold-outline text-sm font-semibold disabled:opacity-60"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
      )}

      {/* ── FAQ ── */}
      <section className="py-16 border-t border-[oklch(0.78_0.16_85/8%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)]">Common Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, no cancellation fees, no guilt trips. Cancel from your account anytime and you keep access through the end of your billing period."
              },
              {
                q: "What payment methods do you accept?",
                a: "All major cards through Stripe — Visa, Mastercard, Amex, Discover. Your payment info is encrypted and never touches our servers."
              },
              {
                q: "Do I need an account to purchase?",
                a: "Yes — we need an account to connect your purchase to your profile and get everything set up for you. It takes about 30 seconds. No spam, no data sharing."
              },
              {
                q: "What if a package isn't the right fit?",
                a: "Contact us within the first 7 days of any subscription and we'll make it right or refund you. We're not here to take money from people we can't help."
              },
              {
                q: "Are these services legal?",
                a: "Yes. BNE provides business advisory services exclusively for creators operating legally on licensed platforms within the United States. We support full § 2257 compliance and all applicable regulations."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="luxury-card p-6"
              >
                <h4 className="text-[oklch(0.94_0.01_85)] font-semibold mb-2 text-sm font-display">{item.q}</h4>
                <p className="text-[oklch(0.58_0.015_85)] text-sm leading-relaxed font-body">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection
        title="Creator Feedback on Pricing & Value"
        subtitle="Read real reviews from managed creators on their return on investment with BNE."
        limit={6}
      />

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 border-t border-[oklch(0.78_0.16_85/8%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mb-3">
              Still Have Questions?
            </h2>
            <p className="text-[oklch(0.58_0.015_85)] mb-6 font-body">
              Start with the free Niche Matcher. Zero commitment, no card required. See exactly where you should focus before you spend a dollar.
            </p>
            <Link href="/niche-matcher">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold"
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
