/**
 * BNE Ala Carte Menu — Noir Hacker Syndicate Design
 * Combined Service Tiers & Stripe Checkout page
 * Shows flat-rate pricing, add-ons, one-time packages, and standard partnership CTA
 */
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { buildFaqSchema } from "@/lib/schema/builders";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import {
  Rocket, TrendingUp, Crown, Check, ChevronRight, Zap,
  Shield, DollarSign, Users, Lock, BarChart3, Headphones,
  FileText, Star, ArrowRight, Plus, CreditCard, Sparkles
} from "lucide-react";

function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

export default function ServiceTiers() {
  const { isAuthenticated } = useAuth();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const { data: productsData } = trpc.stripe.getProducts.useQuery();
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const { getVideoByKeyword } = useMediaCatalog();
  const servicesVideo = getVideoByKeyword("2026");

  const subscriptions = productsData?.subscriptions ?? [];
  const oneTime = productsData?.oneTime ?? [];

  // Core tiers matching Stripe ids
  const coreIds = new Set(["bne_starter", "bne_pro", "bne_elite"]);
  const coreTiers = subscriptions.filter(p => coreIds.has(p.id));
  const addOns = subscriptions.filter(p => !coreIds.has(p.id));

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

  // Visual meta for the 3 core packages
  const coreMeta: Record<string, { icon: React.ElementType; badge: string; color: string; border: string; glow: string; text: string; bg: string }> = {
    bne_starter: {
      icon: Rocket,
      badge: "STARTER LEVEL",
      color: "text-violet-400",
      border: "border-violet-500/30",
      glow: "shadow-[0_0_40px_oklch(0.627_0.265_303.9/20%)]",
      text: "text-violet-300",
      bg: "bg-violet-500/10",
    },
    bne_pro: {
      icon: TrendingUp,
      badge: "GROWTH LEVEL",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_40px_oklch(0.765_0.177_163.2/20%)]",
      text: "text-emerald-300",
      bg: "bg-emerald-500/10",
    },
    bne_elite: {
      icon: Crown,
      badge: "ELITE LEVEL",
      color: "text-amber-400",
      border: "border-amber-500/30",
      glow: "shadow-[0_0_40px_oklch(0.8_0.15_50/20%)]",
      text: "text-amber-300",
      bg: "bg-amber-500/10",
    }
  };

  const badgeColor: Record<string, string> = {
    "Most Popular": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Elite": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Add-On": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Protection": "bg-red-500/15 text-red-300 border-red-500/30",
  };

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "BNE Creator Management & Advisory Plans",
    "image": "https://blacklisted.studio/BNE%20logo2.png",
    "description": "Compare BNE's flat-rate packages: Starter, Pro, and Elite levels. We offer transparent, flat-rate creator advisory and operations suites.",
    "brand": {
      "@type": "Brand",
      "name": "Blacklisted Niche Entertainment"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "499",
      "highPrice": "2499",
      "offerCount": "3"
    }
  };

  const faqSchema = buildFaqSchema([
    {
      question: "What does BNE Studio do for creators?",
      answer: "B.N.E. Studio is a silent operations partner for adult content creators. We handle niche intelligence, backend content management, fan engagement, DMCA compliance, 18 U.S.C. 2257 record-keeping, advertising, and revenue scaling — so creators can focus on content.",
    },
    {
      question: "How much does BNE Studio management cost?",
      answer: "BNE Studio offers three tiers starting from $499/month for Starter-level advisory, $999/month for Pro-level full operations, and $2,499/month for Elite multi-platform management. All plans are flat-rate with no hidden commissions.",
    },
    {
      question: "Do you take a percentage of my earnings?",
      answer: "No. BNE Studio charges flat monthly rates, not commissions or percentages. Your earnings are 100% yours — we charge for our operational services separately.",
    },
    {
      question: "What platforms does BNE Studio manage?",
      answer: "We manage operations across OnlyFans, Fansly, ManyVids, webcam platforms, social media (Twitter/X, Reddit, TikTok), and in-person entertainment services for physical performers.",
    },
    {
      question: "How do I apply for BNE Studio management?",
      answer: "Visit our Onboarding page at blacklisted.studio/apply to submit your application. We review all applications and respond within 48-72 hours.",
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Management Plans, Pricing & Service Tiers"
        description="Compare BNE's plans: from Glow-Up Launch and Empire Scale to Elite Multi-Front Management. Choose the perfect tier to automate your backend, secure your privacy, and multiply your revenue."
        canonical="/pricing"
        schema={[pricingSchema, faqSchema]}
      />
      <Navigation />

      {/* Hero / Explanation block */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/8 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-violet-400 text-sm font-semibold tracking-wider font-mono-lux uppercase">
              BNE Flat-Rate Packages
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Ala Carte Menu
            </h1>
            
            <div className="luxury-card p-6 border-violet-500/20 bg-violet-500/5 text-zinc-300 text-base leading-relaxed max-w-3xl mx-auto mb-4 text-center font-body">
              "Sometimes, our standard profit-sharing contracts aren't the right fit for everyone. If you prefer to keep 100% of your earnings rather than signing a percentage-based management agreement, or if you aren't currently approved for our standard profit-sharing partnership, we would still love to work with you. We offer transparent, flat-rate advisory and marketing packages designed to protect your brand, automate your operations, and maximize your revenue at every stage of your career."
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Packages Grid */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-zinc-200 font-display">Core Advisory & Management Tiers</h2>
            <div className="gold-divider max-w-xs mx-auto mt-3" />
          </div>

          {coreTiers.length === 0 ? (
            <div className="glass-card p-12 text-center text-zinc-400 font-body">
              Loading available flat-rate packages...
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {coreTiers.map((product, i) => {
                const meta = coreMeta[product.id] || {
                  icon: Zap,
                  badge: "ADVISORY LEVEL",
                  color: "text-violet-400",
                  border: "border-slate-800",
                  glow: "",
                  text: "text-violet-300",
                  bg: "bg-slate-800/10",
                };
                const Icon = meta.icon;
                const isLoading = loadingProductId === product.id;
                const isPopular = product.popular;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className={`relative luxury-card flex flex-col overflow-hidden ${meta.border} ${isPopular ? `${meta.glow} border-[oklch(0.78_0.16_85/30%)]` : ""}`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                    )}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${badgeColor[product.badge] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${meta.color} flex-shrink-0`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border font-mono-lux ${meta.text} ${meta.bg} border-current/25 mb-1.5`}>
                            {meta.badge}
                          </span>
                          <h3 className="text-xl font-bold text-zinc-100 font-display">{product.name}</h3>
                          <p className="text-zinc-400 text-xs mt-1 font-body">{product.tagline}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-6 p-4 rounded-xl bg-white/3 border border-white/5">
                        <div className="flex items-end gap-1">
                          <span className="text-3xl font-bold text-zinc-100 font-mono-lux">{formatPrice(product.price)}</span>
                          <span className="text-zinc-500 text-sm mb-1 font-body">/month</span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-2 font-body leading-relaxed">{product.description}</p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {product.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-sm text-zinc-300" style={{ fontFamily: 'DM Sans' }}>
                            <Check size={14} className={`${meta.color} mt-0.5 flex-shrink-0`} />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Checkout Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePurchase(product.id)}
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all btn-gold disabled:opacity-60 disabled:cursor-not-allowed`}
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Opening Checkout...
                          </>
                        ) : (
                          <>
                            <CreditCard size={15} />
                            Subscribe — {formatPrice(product.price)}/mo
                            <ArrowRight size={14} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* A-La-Carte Add-Ons Section */}
      {addOns.length > 0 && (
        <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)] bg-[oklch(0.05_0.004_85)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-violet-400 text-xs font-semibold tracking-wider font-mono-lux uppercase">
                Enhance Your Blueprint
              </span>
              <h2 className="text-3xl font-bold text-zinc-100 font-display mt-2">
                A-La-Carte Add-Ons
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-body">
                Tailor your operation by adding specialized workflows. These integrate seamlessly with any core plan.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((product, i) => {
                const isLoading = loadingProductId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="luxury-card p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
                          <Plus size={18} />
                        </div>
                        <div>
                          <h3 className="text-zinc-100 font-bold text-sm font-display leading-tight">{product.name}</h3>
                          {product.badge && (
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor[product.badge] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-body flex-1">{product.description}</p>
                    </div>

                    <div>
                      <div className="flex items-end gap-1 mb-4">
                        <span className="text-2xl font-bold text-zinc-100 font-mono-lux">{formatPrice(product.price)}</span>
                        <span className="text-zinc-500 text-xs mb-0.5 font-body">/month</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePurchase(product.id)}
                        disabled={isLoading}
                        className="w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all btn-gold-outline disabled:opacity-60"
                      >
                        {isLoading ? (
                          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Add to Plan <ArrowRight size={12} /></>
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

      {/* One-Time Services Section */}
      {oneTime.length > 0 && (
        <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-violet-400 text-xs font-semibold tracking-wider font-mono-lux uppercase">Standalone Audits & Kits</span>
              <h2 className="text-3xl font-bold text-zinc-100 font-display mt-2">One-Time Advisory Services</h2>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-body">
                Test the waters with no ongoing subscriptions. Direct consults, roadmap formulations, and custom assets.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {oneTime.map((product, i) => {
                const isLoading = loadingProductId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="luxury-card p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-zinc-100 font-bold font-display text-lg">{product.name}</h3>
                          <p className="text-zinc-500 text-xs font-body mt-0.5">{product.tagline}</p>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">One-Time</span>
                      </div>
                      <p className="text-zinc-400 text-sm mb-5 leading-relaxed font-body">{product.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5 shrink-0 text-violet-400" />
                            <span className="text-zinc-300 text-xs font-body">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-2xl font-bold text-zinc-100 font-mono-lux">{formatPrice(product.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePurchase(product.id)}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full btn-gold text-xs font-bold disabled:opacity-60"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Purchase <ArrowRight size={12} /></>
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

      {/* Services Briefing Video */}
      <section className="py-16 bg-white/2 border-y border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-violet-400 text-xs font-semibold uppercase tracking-wider font-body">Strategy Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>What Services Should a Management Firm Offer in 2026?</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Understand the transition from old-school agency model to modern, automated creator advisory suites.</p>
          </div>
          <VideoPlayer
            src={servicesVideo?.url || "/media-files/What_services_should_a_firm_offer_creators_in_2026.mp4"}
            title="Creator Firm Services in 2026"
            description="The checklist of protections and tools serious creators need to succeed today."
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-100 font-display">Syllabus Breakdown: Compare Plans</h2>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left p-4 text-zinc-400 font-medium font-body">What You Get</th>
                  <th className="p-4 text-violet-400 font-bold text-center font-display">Starter</th>
                  <th className="p-4 text-emerald-400 font-bold text-center font-display">Pro</th>
                  <th className="p-4 text-amber-400 font-bold text-center font-display">Elite</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Anonymous Identity & Persona Build", true, true, true],
                  ["Geo-Blocking (family/coworkers blocked)", true, true, true],
                  ["§ 2257 Compliance Docs Organized", true, true, true],
                  ["30-Day Social Media Playbook", true, true, true],
                  ["Automated DM & Acquisition Funnels", false, true, true],
                  ["Multi-Platform Revenue Stack", false, true, true],
                  ["Email List Capture (shadowban insurance)", false, true, true],
                  ["24/7 Elite Chatter Team", false, false, true],
                  ["DMCA Web Monitoring & Takedowns", false, false, true],
                  ["Custodian of Records (§ 2257)", false, false, true],
                  ["Tax & Bookkeeping Coordination", false, false, true],
                  ["Premium Audio/Visual Production", false, false, true],
                ].map(([feature, g, a, s], i) => (
                  <tr key={String(feature)} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                    <td className="p-4 text-zinc-300 font-body">{feature}</td>
                    {[g, a, s].map((val, j) => (
                      <td key={j} className="p-4 text-center">
                        {val
                          ? <Check size={16} className={j === 0 ? "text-violet-400 mx-auto" : j === 1 ? "text-emerald-400 mx-auto" : "text-amber-400 mx-auto"} />
                          : <span className="text-zinc-700 text-lg">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-100 font-display">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No lock-ins, no cancellation fees, no guilt trips. Cancel from your billing panel anytime and you keep access through the end of your paid cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We process all major cards securely through Stripe — Visa, Mastercard, Amex, and Discover. Your billing details are encrypted and never stored on our servers."
              },
              {
                q: "Do I need an account to purchase?",
                a: "Yes — we require a free creator account to configure your advisory panel and deploy your resources. The onboarding process takes 30 seconds."
              },
              {
                q: "What if a package isn't the right fit?",
                a: "If you contact us within the first 7 days of subscribing, we will happily refund you or assist you in downgrading/upgrading. We want you to see real ROI."
              },
              {
                q: "Are these services legal?",
                a: "Yes. BNE provides strategic business advisory services exclusively for creators operating legally. We assist with model releases, § 2257 custodian requirements, and tax bookkeeping."
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
                <h4 className="text-zinc-100 font-semibold mb-2 text-sm font-display">{item.q}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-body">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — Application for standard profit share */}
      <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="luxury-card p-8 border-violet-500/20 bg-violet-500/5"
          >
            <Crown className="h-8 w-8 text-violet-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4 font-display">
              Looking to Grow without Upfront Payments?
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xl mx-auto font-body">
              If you qualify, our standard management plan operates on a percentage-based profit sharing model. You pay nothing upfront, and we only make money when you make money. We handle your DMs, scheduling, marketing, and operations so you can focus 100% on content creation.
            </p>
            <Link href="/onboarding">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gold text-sm font-bold shadow-lg"
              >
                <Sparkles size={16} />
                Apply for Standard Management Plan
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

