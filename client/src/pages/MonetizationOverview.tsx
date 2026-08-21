/**
 * BNE Monetization Overview Page
 * In-depth guide to adult content creator revenue architecture, pricing elasticity,
 * multi-tier monetization streams, PPV dynamics, and flat-rate operational economics.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  DollarSign, TrendingUp, BarChart3, ArrowRight, Zap,
  PieChart, Layers, ShieldCheck, CheckCircle2, Award,
  Sparkles, Flame, Target, Lock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const REVENUE_STREAMS = [
  {
    icon: Layers,
    title: "Primary Subscription Layer (Base Access)",
    share: "25% - 35% of Total Income",
    description: "The recurring baseline foundation. Setting your monthly subscription price requires balancing subscriber acquisition velocity against subscriber retention length.",
    detail: "Many creators assume a low subscription price ($4.99) guarantees high revenue through sheer volume. In reality, low subscription prices often attract high-churn, low-spend subscribers while devaluing your brand. We test $9.99 to $24.99 baseline pricing paired with strategic trial promotions to filter for high-LTV subscribers who convert on PPV.",
  },
  {
    icon: Flame,
    title: "Pay-Per-View (PPV) & Direct Message Sales",
    share: "40% - 55% of Total Income",
    description: "The single largest revenue engine for top adult creators. High-ticket video sets, exclusive vault drops, and personalized messaging campaigns delivered directly to DMs.",
    detail: "Effective PPV monetization is an art based on curiosity, emotional connection, and timing. BNE structures PPV drops around specific narrative arcs, teaser previews, and tiered pricing based on content intensity. Our automated mass-messaging schedules achieve 45%+ open rates and 50%+ purchase conversion.",
  },
  {
    icon: Sparkles,
    title: "Custom Content & Tip Menu Engineering",
    share: "15% - 25% of Total Income",
    description: "Personalized video requests, audio notes, rating services, fetish requests, and interactive live stream tip menus priced at premium commercial rates.",
    detail: "Custom content should carry a massive margin. Most creators severely underprice custom requests, charging $10-$15 per minute when market clearing rates for specialized niches sit at $35-$75+ per minute. We engineer custom rate cards with clear boundaries, rush fees, and strict add-on pricing.",
  },
  {
    icon: Target,
    title: "Secondary Platforms & Clip Stores",
    share: "10% - 15% of Total Income",
    description: "Passive video syndication across platforms like ManyVids, Clips4Sale, and iWANTFC for long-tail search traffic and automated purchases.",
    detail: "Once a master video set is shot and delivered to your primary subscription feed, it should be tagged, categorized, and uploaded to secondary clip store platforms. This creates a passive long-tail income stream that generates sales for years after publication.",
  },
];

const METRICS_LIST = [
  { metric: "Average Revenue Per User (ARPU)", benchmark: "$45 - $85 / subscriber / mo" },
  { metric: "PPV Message Open Rate", benchmark: "65% - 85%" },
  { metric: "Custom Content Gross Margin", benchmark: "85%+" },
  { metric: "90-Day Subscriber Retention", benchmark: "42% - 58%" },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is the most profitable revenue stream for adult creators?",
    answer: "Pay-Per-View (PPV) direct messages and mass messaging campaigns typically account for 40% to 55% of total gross revenue for top creators, out-earning base monthly subscriptions.",
  },
  {
    question: "How should I price custom content requests?",
    answer: "Custom content should be priced at $35 to $75+ per minute depending on your niche specialization, complexity, and boundaries, with mandatory minimum time blocks (e.g. 3-minute minimums) and upfront deposit payment.",
  },
  {
    question: "Does BNE charge a percentage of my earnings?",
    answer: "No. BNE operates strictly on flat-rate monthly partnership tiers. You keep 100% of your gross earnings across all platforms.",
  },
  {
    question: "How do you optimize my subscription tier pricing?",
    answer: "We perform controlled A/B price elasticity tests across cohort groups to determine the exact point where subscriber acquisition rates and lifetime retention yield maximum net monthly income.",
  },
]);

export default function MonetizationOverview() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Content_Creator_Partnership_Percentages_Payments_rates");
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Monetization Architecture & Revenue Strategy | BNE Studio"
        description="Master adult content creator revenue architecture. Learn how to balance subscription pricing, PPV messaging, custom rate cards, and clip store syndication for maximum monthly profit."
        canonical="/monetization"
        schema={faqSchema}
        keywords="adult creator monetization, OnlyFans pricing strategy, PPV conversion rates, creator revenue architecture, custom content rate card"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <DollarSign className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Revenue Architecture</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Monetization Architecture</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Build an Empire, Not Just an Account.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Most independent creators rely on a single revenue stream — usually flat subscription fees. That leaves up to 70% of potential income untouched. Top-earning adult content creators operate an orchestrated multi-tier monetization engine where subscriptions, PPV messaging, custom orders, tip menus, and clip store syndication work in synergy.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio designs, deploys, and optimizes complete revenue architectures tailored to your specific niche, output capacity, and audience psychology. We eliminate underpricing, maximize PPV conversion, and build recurring income stability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Request Monetization Audit <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  View Management Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS_LIST.map((stat, i) => (
              <motion.div key={stat.metric} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[oklch(0.78_0.16_85)] mb-2">{stat.benchmark}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{stat.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Masterclass: Creator Partnerships & Payment Rates
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch our breakdown on how agency economics, flat-rate pricing, platform cuts, and profit-sharing models compare. Understand exactly how BNE protects your bottom line.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">100% Revenue Ownership</h3>
                </div>
                <p className="text-slate-400 text-sm">BNE charges zero percentage of your earnings. You pay a transparent flat monthly rate for operational infrastructure while keeping 100% of gross platform payouts.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Price Elasticity Testing</h3>
                </div>
                <p className="text-slate-400 text-sm">We systematically test paywall prices and custom rates to ensure you are maximizing net income without driving away loyal fans.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 REVENUE STREAMS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The 4 Pillars of Creator Monetization</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">How top 1% creators balance baseline subscriptions with high-margin direct sales and syndication.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVENUE_STREAMS.map((stream, i) => (
              <motion.div key={stream.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <stream.icon size={22} />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">{stream.share}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{stream.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{stream.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{stream.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Economics & Monetization</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Real Monetization Results"
        subtitle="See how BNE creators unlocked 3x to 5x revenue growth by overhauling their monetization architecture."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does a monetization audit take?", a: "Our team completes a thorough revenue audit of your active accounts within 48 hours of intake." },
              { q: "What if my subscribers complain about price increases?", a: "We never roll out abrupt raw price hikes. We use grandfathering, bonus content incentives, and tier restructures that make subscribers feel they are getting superior value." },
              { q: "Can BNE help me set up custom content rate cards?", a: "Yes. We design high-converting tip menus and custom rate cards with clear boundaries and premium pricing tiers." },
              { q: "Do you help with tax optimization for multi-stream income?", a: "Yes. BNE provides categorized monthly income statements and connects you with creator-specialized CPAs." },
            ].map((faq, i) => (
              <div key={faq.q} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Stop Leaving 70% of Your Revenue Uncollected</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Get a custom monetization audit and discover how BNE Studio can optimize your subscription tiers, PPV drops, and custom rate cards.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Request Monetization Audit →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
