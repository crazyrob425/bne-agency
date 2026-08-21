/**
 * BNE Performance Utilities Page
 * Business intelligence, income verification, price elasticity modeling,
 * and growth trajectory tools for quantitative creator management.
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
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  BarChart3, Calculator, TrendingUp, ArrowRight, Zap, Crown,
  LineChart, PieChart, CheckCircle2, Shield, Sliders
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const PERFORMANCE_TOOLS = [
  {
    icon: Calculator,
    title: "1. OnlyFans & Paywall Income Verifier Engine",
    description: "Input your subscriber count, monthly subscription fee, PPV open rate, and average custom order value to receive instant net income projections and ARPU breakdowns.",
    detail: "Provides real-time validation of your revenue potential. Models cohort survival curves across 30, 60, and 90-day retention windows.",
  },
  {
    icon: LineChart,
    title: "2. Subscriber Churn & Cohort Analytics Tool",
    description: "Track subscriber attrition rates across cohorts, evaluate organic traffic channel quality, and identify exact expiration windows to trigger win-back drops.",
    detail: "Reducing monthly churn from 35% to 15% doubles net account growth. Our utility tracks where subscribers drop off and recommends re-engagement offers.",
  },
  {
    icon: Sliders,
    title: "3. Paywall Price Elasticity Modeling Calculator",
    description: "Simulate how changing your monthly subscription price ($4.99 vs $14.99 vs $24.99) affects subscriber acquisition velocity and total gross revenue.",
    detail: "Helps you avoid underpricing traps. Demonstrates how higher paywall prices filter for high-intent spenders who purchase 3x more PPV content over their lifetime.",
  },
  {
    icon: PieChart,
    title: "4. Custom Content & Tip Menu Margin Auditor",
    description: "Audit profit margins across video calls, custom sets, ratings, and physical items, ensuring your rate card captures maximum consumer surplus.",
    detail: "Structures psychological price anchors and establishes strict 3-minute minimums, rush fees, and non-refundable deposit terms.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are Performance Utilities?",
    answer: "Performance Utilities are quantitative business intelligence tools designed to model subscriber LTV, price elasticity, cohort retention, and income projections.",
  },
  {
    question: "How does the Income Verifier tool work?",
    answer: "The Income Verifier takes your primary account metrics and applies empirical ARPU models derived from BNE's managed creator portfolio to project net 30, 60, and 90-day earnings.",
  },
  {
    question: "Can I test pricing changes before launching them live?",
    answer: "Yes. Our price elasticity modeling calculator simulates the impact of price changes on subscriber volume and net monthly revenue before you make live paywall edits.",
  },
]);

export default function PerformanceUtilities() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Niche_Domination___Survival");
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Performance Utilities & Creator Business Intelligence | BNE Studio"
        description="Transform raw creator metrics into growth strategies. Use BNE Performance Utilities: Income Verifier calculators, cohort analytics, and price elasticity modeling tools."
        canonical="/performance-utilities"
        schema={faqSchema}
        keywords="creator performance utilities, OnlyFans analytics calculator, subscriber LTV calculator, creator income verifier, price elasticity modeling tool"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <BarChart3 className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Business Intelligence Desk</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Performance <span className="text-[oklch(0.78_0.16_85)]">Utilities</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Turn Raw Data Into Compounding Growth.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Data is only valuable when translated into clear operational decisions. Our performance utilities equip numbers-driven creators with Fortune-500 level business intelligence: income verification calculators, price elasticity simulators, and cohort churn models.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              Stop guessing what your account should be earning. Use our performance utility suite to pinpoint exact revenue leaks in your sales funnel and model your growth trajectory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/calculator">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Launch Income Verifier Engine <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Request Performance Audit
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
                Masterclass: Niche Domination & Survival Data
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch our data briefing on how micro-niche selection and quantitative price elasticity modeling protect creator accounts from market saturation and subscriber churn.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-2xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Quantitative Income Verification</h3>
                </div>
                <p className="text-slate-400 text-sm">Model your account's exact 30, 60, and 90-day gross and net monthly revenue based on active subscriber cohort data.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Price Elasticity Simulation</h3>
                </div>
                <p className="text-slate-400 text-sm">Test potential paywall and custom rate edits virtually before making live platform updates.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 PERFORMANCE TOOLS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Core Performance Utility Engines</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Built to convert raw account metrics into actionable revenue growth strategies.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PERFORMANCE_TOOLS.map((tool, i) => (
              <motion.div key={tool.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <tool.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{tool.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{tool.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{tool.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Economics & Business Intelligence</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Performance Analytics Feedback"
        subtitle="Read how numbers-driven creators unlocked 3x revenue gains using BNE Performance Utilities."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I access the Income Verifier calculator?", a: "Launch the free tool at blacklisted.studio/tools/calculator or apply for full managed access." },
              { q: "Can BNE run a complete performance audit on my account?", a: "Yes. Our analytics team performs end-to-end audits identifying churn triggers and DM conversion leaks." },
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Know Your Numbers. Grow Your Empire.</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get complete performance audits and growth modeling.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Performance Audit →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
