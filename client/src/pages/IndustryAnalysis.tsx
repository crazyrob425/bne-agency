/**
 * BNE Industry Analysis Page
 * Comprehensive quantitative analysis of the adult creator economy: platform revenue distribution,
 * market saturation, search trends, consumer price elasticity, and competitive positioning.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorById } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Layers, TrendingUp, BarChart3, ArrowRight, Crown,
  LineChart, PieChart, CheckCircle2, Shield, DollarSign
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const MARKET_REPORTS = [
  {
    code: "REPORT-01",
    title: "Platform Revenue Concentration & Creator Income Distribution",
    professor: professors[0], // Dr. Sinclair
    description: "Quantitative analysis of earnings across OnlyFans, Fansly, and ManyVids. Evaluates top 1% income thresholds, subscriber LTV averages, and power-law distribution curves.",
    keyTakeaway: "Top 1% accounts generate 73% of total platform revenue by mastering multi-tier monetization rather than relying solely on base subscriptions.",
  },
  {
    code: "REPORT-02",
    title: "Macro Search Trends & Sub-Niche Demand Velocity",
    professor: professors[2], // Prof. Delacroix
    description: "Tracking search volume shifts across 1,052 adult sub-categories. Identifies high-growth micro-niches with low creator saturation.",
    keyTakeaway: "Micro-niche creators experience 4.2x higher subscriber retention than generic lifestyle creators due to intense fan obsession triggers.",
  },
  {
    code: "REPORT-03",
    title: "Paywall Price Elasticity & Consumer Willingness-to-Pay",
    professor: professors[0], // Dr. Sinclair
    description: "Empirical pricing data analyzing how introductory discounts, subscription price points ($4.99 vs $14.99 vs $29.99), and PPV message pricing impact net monthly income.",
    keyTakeaway: "Higher subscription price points ($14.99+) filter for high-LTV subscribers who purchase 3x more PPV content over their lifetime.",
  },
  {
    code: "REPORT-04",
    title: "In-Person Companion Market Economics & Tour Yields",
    professor: professors[5], // Prof. Castillo
    description: "Financial analysis of in-person companion booking rates, tour yields across West Coast hubs (Seattle, Portland, LA, SF, SD), and safety screening efficiency.",
    keyTakeaway: "Touring with advance localized ad placements yields 3.5x higher hourly net income than static home-market scheduling.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is the average income for adult content creators?",
    answer: "Platform income follows a steep power-law distribution. While the median solo creator earns around $180/month, top 10% creators clear $5,000+/month, and managed accounts with complete monetization architecture average $15,000 to $50,000+/month.",
  },
  {
    question: "How does BNE conduct industry analysis?",
    answer: "BNE's research desk combines anonymized performance data across our managed portfolio, search volume tracking across 1,000+ sub-niches, and consumer price elasticity modeling.",
  },
  {
    question: "How do sub-niches impact creator profitability?",
    answer: "Specialized micro-niches enjoy significantly lower creator saturation and higher subscriber price tolerance, allowing creators to charge premium rates for custom content and PPV drops.",
  },
]);

export default function IndustryAnalysis() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const assets = getInfographicByKeyword("Marketing_Assets_Pack");

  const [modalOpen, setModalOpen] = useState(false);
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Adult Creator Industry Analysis & Market Intelligence | BNE Studio"
        description="Access empirical research on creator economy earnings, platform revenue distribution, search trend velocity, and paywall price elasticity."
        canonical="/industry-analysis"
        schema={faqSchema}
        keywords="adult creator industry analysis, OnlyFans market report, creator earnings stats, adult entertainment market size, BNE market research"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              Industry <span className="gradient-text-gold">Market Analysis</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Empirical market intelligence on platform economics, creator revenue distribution, sub-niche search velocity, and paywall price elasticity — engineered to give BNE partners an unfair competitive advantage.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/intelligence">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <Layers size={16} /> Enter Main Intelligence Hub <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Request Market Audit
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARKETING ASSETS PACK SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Asset Pack Release</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Marketing Assets & Report Pack</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Downloadable graphics, data visualizers, and marketing templates for adult creator accounts.</p>
          </div>
          {assets && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <BarChart3 size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Marketing Assets & Data Pack (Interactive PDF)</h3>
                  <p className="text-slate-400 text-sm mt-1">High-Resolution Data Charts, Niche Maps & Promotional Templates</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <BarChart3 size={14} /> Open Interactive Reader
              </button>
            </motion.div>
          )}
          <InfographicModal url={assets?.url || "/media-files/Marketing_Assets_Pack.pdf"} title="Marketing Assets Pack" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 MARKET REPORTS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Empirical Studies</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Core Industry Reports</h2>
          </div>

          <div className="space-y-8">
            {MARKET_REPORTS.map((report, i) => (
              <motion.div key={report.code} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{report.code}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 mt-1">{report.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{report.description}</p>
                    
                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-3">
                      <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-emerald-400 block mb-0.5">Key Insight</span>
                        <p className="text-slate-300 text-xs leading-relaxed">{report.keyTakeaway}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Lead Analyst</div>
                      <AuthorBio professor={report.professor} variant="compact" />
                    </div>
                    <Link href="/apply">
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Request Full Report →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Market Research & Creator Economics</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Market Analysis Reviews"
        subtitle="Read how creators applied BNE market research to reposition their accounts and double monthly revenue."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How does BNE calculate creator revenue distribution statistics?", a: "We aggregate anonymized earnings data across our managed creator portfolio and cross-reference with public platform metrics." },
              { q: "Can I request custom market analysis for a specific micro-niche?", a: "Yes. BNE managed partners receive custom sub-niche search volume and competition reports during intake." },
              { q: "How often are industry reports published?", a: "New market analysis reports are published monthly to Blacklisted University." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Know the Market Before You Compete</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and receive custom market analysis for your creator brand.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Market Intelligence →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
