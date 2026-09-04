/**
 * BNE Pricing & Partnership Structures Page
 * Noir Hacker Syndicate / Gold Luxury Design
 * Displays Both Partnership Structures via Side-by-Side 2-Column Comparison Layout:
 * 1. Zero-Commission Management (Flat Fee) — Open to all creators
 * 2. Full Sponsored Management (25% Profit-Share) — Application based
 */
import { motion } from "framer-motion";
import { useState } from "react";
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
  Shield, DollarSign, Lock, CreditCard, ArrowRight, Plus, Sparkles, AlertCircle
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
    "name": "BNE Creator Management & Partnership Plans",
    "image": "https://blacklisted.studio/BNE%20logo2.png",
    "description": "Compare BNE's two creator partnership structures: Zero-Commission Management (Flat Fee) where creator retains 100% earnings, and Full Sponsored Management (25% Profit-Share) where creator retains 75%.",
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
      question: "What are the two partnership models at B.N.E. Studio?",
      answer: "B.N.E. Studio offers two partnership structures: Zero-Commission Management (Flat Fee), where you pay a fixed retainer and keep 100% of your earnings; and Full Sponsored Management (25% Profit-Share), where BNE absorbs all backend overhead and ad spend for a 25% revenue split (allowing you to retain 75%).",
    },
    {
      question: "Who is Zero-Commission Flat Fee management designed for?",
      answer: "Zero-Commission Flat Fee management is open and available to all legal content creators, adult entertainers, webcam broadcasters, and companions looking for a immediate, professional upgrade to their brand while retaining 100% of their earnings.",
    },
    {
      question: "What does Full Sponsored Management include?",
      answer: "Full Sponsored Management provides a complete, fully funded silent partnership covering 90-day 6-figure incubation, OnlyFans page management (PPV conversion 22% -> 51%), webcam multi-streaming, fan collectibles storefronts, companion crossover, and § 2257 legal protection.",
    },
    {
      question: "What does Sponsored Management fine print clarify?",
      answer: "Sponsored Management means B.N.E. charges $0 upfront fees for operational backend services, receiving payment solely from a 25% revenue share. It does not cover third-party physical expenses like hardware equipment, personal wardrobe, web hosting/domains, or official state filing fees.",
    },
  ]);

  const sponsoredBullets = [
    "0 Upfront Overhead: $0 initial cost for BNE operational labor, custom web builds, and marketing funnels.",
    "Creator Retains 75%: Industry-low 25% agency split—slashing conventional agency demands (which extract 40%–60% of earnings) while delivering 10x the technical backend execution.",
    "Newcomer 90-Day 6-Figure Incubation: Fast-tracked setup to reach six-figure run rates within 90 days.",
    "Webcam Multi-Platform Syndication: OBS engineering, lighting/studio setup, and simultaneous live streaming across Chaturbate, CamSoda, and Stripchat.",
    "OnlyFans & Fansly Full Account Operations: Daily PPV messaging architectures (increasing conversion rates from 22% to 51%).",
    "Subscriber Retention Workflows: Churn reduction strategies slashing subscriber attrition from 38% down to 11%.",
    "Companion Crossover Operations: Safely transitioning escorts/dancers into high-margin anonymous digital creators, or coordinating vetted superfan dates.",
    "Fan Collectibles & Niche Merch Storefronts: Fully automated anonymous stores for worn items, autographed prints, polaroids, and video commissions.",
    "18 U.S.C. § 2257 Custodian of Records Representation: Official legal Custodian designation and AES-256 encrypted performer release storage.",
    "Identity Firewalls & Geoblocking: Complete detachment of real identity, city/state IP geofencing, and anonymous Holding LLC registration.",
    "24/7 Automated DMCA Anti-Piracy Engine: Continuous scanning of tube sites and leak forums with instant takedown dispatch.",
    "Custom Persona Engineering: Tailored branding for Findom, Cosplay, Luxury Companion, ASMR, and Fetish niches.",
    "Dedicated Operational Squad: Assigned Account Manager, DM Operators, § 2257 Legal Counsel, and Media Buyer.",
    "100% Creator IP & Account Ownership: You maintain 100% legal ownership of your accounts, domains, and content vaults with zero credential lock-in."
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Partnership Structures & Pricing Menu — B.N.E. Studio"
        description="Compare B.N.E. Studio's partnership structures: Zero-Commission Management (Flat Fee) where creator retains 100%, and Full Sponsored Management (25% Profit Share) where creator retains 75%."
        canonical="/pricing"
        schema={[pricingSchema, faqSchema]}
      />
      <Navigation />

      {/* Hero Header */}
      <section className="pt-36 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-violet-400 text-xs font-semibold tracking-widest font-mono-lux uppercase">
              Partnership Architecture
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Choose Your Partnership Structure
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto font-body leading-relaxed">
              We offer two distinct, creator-first operational frameworks: 100% Flat-Fee Independence OR Fully Funded 25% Sponsored Incubation. Select the path that aligns with your brand goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TWO-COLUMN SIDE-BY-SIDE PARTNERSHIP COMPARISON ── */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* ── LEFT COLUMN: Zero-Commission Management (Flat Fee) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="luxury-card p-8 border-violet-500/30 bg-gradient-to-b from-violet-950/20 to-black/80 relative flex flex-col justify-between"
            >
              <div>
                {/* Column Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-widest font-mono-lux mb-4">
                  <Shield size={13} />
                  100% EARNINGS RETENTION — OPEN TO ALL CREATORS
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4 font-display">
                  Zero-Commission Management (Flat Fee)
                </h2>

                {/* Expanded Description with Keywords & Welcoming Message */}
                <div className="p-4 rounded-xl bg-violet-500/8 border border-violet-500/20 text-zinc-300 text-sm leading-relaxed mb-6 font-body">
                  <p className="mb-3">
                    Fixed-cost operational execution where the creator retains <strong className="text-violet-300">100% of their earnings</strong> while B.N.E. powers all backend infrastructure, sales funnels, and technical setups.
                  </p>
                  <p className="mb-3">
                    This structure provides premier <strong className="text-violet-300">zero-commission adult creator management</strong> and <strong className="text-violet-300">flat-rate OnlyFans infrastructure management</strong> without giving up a single percentage point of your income growth.
                  </p>
                  <p className="text-xs text-violet-300/90 font-medium">
                    ✨ <strong>Welcome & Open Access:</strong> B.N.E. Studio proudly makes this partnership structure open and available to <em>all legal content creators, adult entertainers, webcam broadcasters, and companions</em> looking for an immediate, massive upgrade to their brand infrastructure.
                  </p>
                </div>

                {/* Core Flat-Rate Packages Grid */}
                <div className="space-y-6 mb-8">
                  <h3 className="text-xs font-mono-lux font-bold uppercase tracking-widest text-violet-400">
                    Flat-Rate Advisory & Management Plans
                  </h3>

                  {coreTiers.map((product) => {
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

                    return (
                      <div
                        key={product.id}
                        className={`p-5 rounded-xl border ${meta.border} bg-white/3 flex flex-col justify-between`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${meta.color}`}>
                              <Icon size={18} />
                            </div>
                            <div>
                              <h4 className="text-zinc-100 font-bold text-base font-display">{product.name}</h4>
                              <span className={`text-[9px] font-bold uppercase tracking-wider font-mono-lux ${meta.text}`}>
                                {meta.badge}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-zinc-100 font-mono-lux">{formatPrice(product.price)}</span>
                            <span className="text-zinc-500 text-xs font-body block">/month</span>
                          </div>
                        </div>

                        <p className="text-zinc-400 text-xs mb-3 font-body">{product.description}</p>

                        <ul className="space-y-1.5 mb-4">
                          {product.features.slice(0, 4).map((feat) => (
                            <li key={feat} className="flex items-center gap-2 text-xs text-zinc-300 font-body">
                              <Check size={12} className={meta.color} />
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handlePurchase(product.id)}
                          disabled={isLoading}
                          className="w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all btn-gold disabled:opacity-60"
                        >
                          {isLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <CreditCard size={13} />
                              Subscribe — {formatPrice(product.price)}/mo
                              <ArrowRight size={12} />
                            </>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-violet-500/20 text-center">
                <p className="text-xs text-zinc-400 font-body">
                  Keep 100% of your revenue. Cancel or upgrade anytime with zero lock-in contracts.
                </p>
              </div>
            </motion.div>


            {/* ── RIGHT COLUMN: Full Sponsored Management (25% Profit-Share) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="luxury-card p-8 border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-black/90 relative flex flex-col justify-between"
            >
              <div>
                {/* Column Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest font-mono-lux mb-4">
                  <Crown size={13} />
                  FULLY FUNDED SILENT PARTNERSHIP — 25% REVENUE SHARE
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4 font-display">
                  Full Sponsored Management (25% Profit-Share)
                </h2>

                {/* Top Bold Asterisk Note */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed mb-5 font-body">
                  <p className="font-bold">
                    *B.N.E. Studio makes it a strict priority to ensure we have enough dedicated time, energy, and high-touch operational support available to fully give our sponsored partners the attention they deserve. Because of this, we limit available sponsored spots to the partners we believe are the best strategic fit with our team. To see if you are the type of partner we are eager to work with,{" "}
                    <Link href="/apply">
                      <span className="underline font-extrabold text-amber-300 hover:text-white cursor-pointer">Apply Now</span>
                    </Link>.*
                  </p>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-body">
                  Complete, fully funded silent partnership where B.N.E. absorbs operational overhead and backend management in exchange for an industry-low 25% revenue split (allowing creator to retain 75%).
                </p>

                {/* Unfair Industry Standard vs. BNE Benchmark Callout */}
                <div className="p-4.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-violet-950/30 to-black border border-emerald-500/35 mb-6 text-xs leading-relaxed font-body shadow-[0_0_25px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider font-mono-lux text-[11px] mb-2">
                    <Zap size={14} className="text-emerald-400" />
                    The Unfair Agency Standard vs. The B.N.E. Benchmark
                  </div>
                  <p className="text-zinc-200 mb-2">
                    <strong className="text-emerald-300">Why settle for legacy agency contracts?</strong> Most traditional adult content creator management agencies aggressively demand <span className="text-amber-300 font-bold">40% to 60% of your total income</span>—often doing little more than basic social media reposting and generic advice while locking creators into predatory contracts.
                  </p>
                  <p className="text-zinc-300">
                    B.N.E. Studio fundamentally dismantles this outdated model. We cap our revenue split at an <strong className="text-emerald-300 font-bold">industry-low 25%</strong> (allowing you to retain <strong className="text-emerald-300 font-bold">75% of your earnings</strong>) while deploying <strong className="text-emerald-300">10x the operational infrastructure</strong>—including 24/7 dedicated DM chatter teams, live-cam studio tuning, automated DMCA anti-piracy, custom merch storefronts, and official 18 U.S.C. § 2257 legal representation.
                  </p>
                </div>

                {/* Extended Bulleted Feature List */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono-lux font-bold uppercase tracking-widest text-emerald-400 mb-4">
                    Full Sponsored Infrastructure Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {sponsoredBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200 font-body leading-relaxed">
                        <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-emerald-300">{bullet.split(":")[0]}:</strong>
                          {bullet.split(":")[1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Bold Asterisk Note & Apply CTA */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-6">
                  <p className="text-xs font-bold text-emerald-300 mb-3 font-body">
                    *Limited Sponsored Spots Available — Apply Now to Lock In Your Partnership*
                  </p>
                  <Link href="/apply">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-bold text-sm btn-gold flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      <Sparkles size={16} />
                      Apply for 25% Sponsored Partnership
                      <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Fine Print Box */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed font-body">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px] mb-1">
                  <AlertCircle size={12} />
                  Fine Print & Scope Clarity
                </div>
                By Sponsored Management, B.N.E. Studio refers solely to charging $0 upfront fees for our operational backend services, funnels, web development, and daily account management, receiving payment strictly from a 25% revenue share of earnings generated. Sponsored Management does not mean B.N.E. covers third-party physical expenses, such as camera/hardware equipment costs, personal wardrobe/outfits, direct third-party web hosting/domain registration fees, or official state business registration filing fees.
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* A-La-Carte Add-Ons Section */}
      {addOns.length > 0 && (
        <section className="py-16 border-t border-[oklch(0.78_0.16_85/10%)] bg-[oklch(0.05_0.004_85)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-violet-400 text-xs font-semibold tracking-wider font-mono-lux uppercase">
                Enhance Your Operations
              </span>
              <h2 className="text-3xl font-bold text-zinc-100 font-display mt-2">
                A-La-Carte Add-On Modules
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-body">
                Add specialized workflows to any core plan to customize your exact operational stack.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((product, i) => {
                const isLoading = loadingProductId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
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

      {/* Final Application Banner */}
      <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="luxury-card p-8 border-emerald-500/20 bg-emerald-500/5"
          >
            <Crown className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4 font-display">
              Ready to Partner with B.N.E. Studio?
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xl mx-auto font-body">
              Whether you choose our 100% Flat-Fee Management OR 25% Sponsored Profit-Share Partnership, B.N.E. Studio fast-tracks your brand to six figures in 90 days.
            </p>
            <Link href="/apply">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full btn-gold text-sm font-bold shadow-lg"
              >
                <Sparkles size={16} />
                Apply for Creator Partnership
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
