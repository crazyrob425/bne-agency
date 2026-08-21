/**
 * BNE Revenue Optimization Page
 * Complete quantitative optimization guide for adult creator revenue funnels,
 * subscriber lifetime value (LTV), price elasticity, and PPV conversion dynamics.
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
  DollarSign, TrendingUp, BarChart3, ArrowRight, Zap, Shield, Crown,
  Target, LineChart, PieChart, RefreshCw, Layers, CheckCircle2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const OPTIMIZATION_LEVERS = [
  {
    icon: Target,
    title: "Subscriber Acquisition Cost (SAC) vs. Lifetime Value (LTV)",
    description: "Maximizing LTV-to-SAC ratios across organic traffic channels (Reddit, Twitter, TikTok, Instagram) and paid promotional rotations.",
    detail: "Top-tier accounts maintain an LTV-to-SAC ratio above 8:1. We track cohort survival curves over 30, 60, and 90-day intervals, identifying traffic sources that bring high-retaining spenders versus low-intent casual viewers.",
  },
  {
    icon: LineChart,
    title: "Paywall Price Elasticity Modeling",
    description: "Running scientific pricing experiments to determine the exact equilibrium between subscriber volume and gross monthly revenue.",
    detail: "Dropping subscription price to $3.99 might increase raw sub count by 40%, but reduces baseline revenue by 25%. We use price elasticity modeling to pinpoint your brand's profit-maximizing price point.",
  },
  {
    icon: RefreshCw,
    title: "Subscriber Churn Reduction & Renewal Engineering",
    description: "Automated re-engagement campaigns, custom renewal bonuses, and expired subscriber win-back sequences.",
    detail: "Reducing monthly churn from 35% to 15% doubles your net account growth speed without requiring a single additional new subscriber. We implement automated win-back drops with discounted trial links to reactivate expired fans.",
  },
  {
    icon: PieChart,
    title: "Whale Cultivation & High-Ticket Custom Funnels",
    description: "Identifying top 1% spending fans (whales) and creating private high-touch communication protocols to capture premium custom sales.",
    detail: "In subscription entertainment, 5% of fans generate 60%+ of non-subscription revenue. Our DM monitoring algorithms tag high-ticket buyers instantly, assigning them custom VIP communication sequences.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is revenue optimization for adult creators?",
    answer: "Revenue optimization is the quantitative process of testing pricing, reducing subscriber churn, engineering high-ticket PPV sales, and multi-channel syndication to maximize net monthly creator income.",
  },
  {
    question: "How does BNE reduce subscriber churn?",
    answer: "We deploy automated renewal bonus drops, personalized re-engagement messages, and win-back promotional campaigns targeted specifically at subscribers nearing expiration.",
  },
  {
    question: "What is a 'whale' in adult content monetization?",
    answer: "A 'whale' is a top-tier fan who consistently spends hundreds or thousands of dollars monthly on custom content, tips, and exclusive PPV drops. BNE provides custom VIP handling to retain and monetize these high-value supporters.",
  },
  {
    question: "Does revenue optimization require more content creation hours?",
    answer: "No. Revenue optimization focuses on extracting more revenue from your existing content catalog through better pricing, segmentation, and sales timing.",
  },
]);

export default function RevenueOptimization() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("What_services_should_a_firm_offer_creators_in_2026");
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Revenue Optimization & Growth Science | BNE Studio"
        description="Optimize your creator business revenue. Learn how to increase subscriber LTV, reduce churn, model paywall price elasticity, and cultivate high-ticket whales."
        canonical="/revenue-optimization"
        schema={faqSchema}
        keywords="creator revenue optimization, OnlyFans LTV optimization, subscriber churn reduction, adult creator analytics, whale retention strategy"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Growth Science</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Revenue Optimization</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Turn Data Into Compounding Profits.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Most creator accounts operate far below their financial potential because pricing, messaging, and retention are handled by gut feeling rather than empirical data. Small operational improvements in subscriber retention, PPV open rates, and whale cultivation compound into massive monthly income gains.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio applies quantitative growth science to your creator business. We audit your revenue funnel end-to-end, plug money leaks, optimize price points, and systematically increase subscriber Lifetime Value (LTV).
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Get Your Revenue Audit <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/monetization">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Monetization Strategy
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                The 2026 Modern Creator Firm Checklist
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Understand the shift from old-school agency percentage takes to automated, data-driven creator advisory suites. Watch what modern management must deliver in 2026.
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
                  <h3 className="text-white font-bold">Subscription Architecture</h3>
                </div>
                <p className="text-slate-400 text-sm">Tiered pricing models designed to maximize lifetime subscriber value while keeping churn strictly controlled.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">PPV & Tip Conversion Optimization</h3>
                </div>
                <p className="text-slate-400 text-sm">Targeted pricing, timing, and copy that converts casual viewers into high-value repeat buyers.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 OPTIMIZATION LEVERS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Levers of Creator Revenue Optimization</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">How BNE systematically increases account profitability without increasing creator workload.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OPTIMIZATION_LEVERS.map((lever, i) => (
              <motion.div key={lever.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <lever.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{lever.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{lever.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{lever.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Economics & Growth Science</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Revenue Optimization Case Studies"
        subtitle="See how real creators doubled their net monthly income through data-driven optimization."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What metrics are analyzed during a revenue audit?", a: "We analyze subscriber churn rates, LTV, SAC by traffic source, PPV open and conversion rates, average order value, and whale spending percentages." },
              { q: "Can BNE optimize my revenue without managing full daily operations?", a: "Yes. Our Structured Advisory tier focuses specifically on revenue optimization, pricing strategy, and analytics audits while you run daily operations." },
              { q: "How does price elasticity testing work?", a: "We run controlled cohort pricing tests, offering different introductory or subscription rates to distinct traffic groups to measure maximum net monthly revenue." },
              { q: "Do you help with custom rate cards?", a: "Yes. We re-architect custom content rate cards with psychological pricing anchors and mandatory deposit terms." },
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Stop Leaving Profit to Chance</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Apply for a BNE revenue optimization audit and discover the exact data levers that will compound your monthly creator income.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Your Revenue Audit →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
