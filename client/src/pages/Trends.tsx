/**
 * BNE Trends Page
 * Macro trend forecasting for the adult creator economy: platform algorithm evolution,
 * micro-niche expansion, AI tool integration, and direct-to-fan monetization.
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
  TrendingUp, Layers, ArrowRight, Crown, Zap, Shield,
  Compass, Sparkles, Cpu, LineChart, CheckCircle2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const TREND_FORECASTS = [
  {
    code: "TREND-2026-01",
    title: "Rise of Hyper-Specific Micro-Niches",
    professor: professors[2], // Prof. Delacroix
    status: "Active / Accelerating",
    description: "Generic creator accounts face severe price competition. Audiences are flocking to hyper-specific micro-niches with unique aesthetic signatures, specialized fetish themes, and tailored narrative personas.",
    actionable: "Pivot account positioning to own a single micro-niche rather than competing as a generic subscription page.",
  },
  {
    code: "TREND-2026-02",
    title: "24/7 AI-Assisted Fan CRM & Message Personalization",
    professor: professors[3], // Prof. Okafor
    status: "High Growth",
    description: "Top creator firms are replacing manual message blasts with intelligent fan CRM tools that track subscriber birthdays, anniversary dates, and past purchase history to send custom preview drops automatically.",
    actionable: "Implement cohort tagging in direct message tools to segment high-spending fans from casual subscribers.",
  },
  {
    code: "TREND-2026-03",
    title: "Platform Diversification & Direct Paywall Ownership",
    professor: professors[0], // Dr. Sinclair
    status: "Critical Risk Mitigation",
    description: "Over-reliance on a single subscription platform creates massive vulnerability to sudden policy changes or payment processor holds. High-earning creators operate across OnlyFans, Fansly, ManyVids, and private sites.",
    actionable: "Syndicate video content across at least two secondary platforms and build an independent email/SMS back-up list.",
  },
  {
    code: "TREND-2026-04",
    title: "Sovereign Legal Identity Separation",
    professor: professors[1], // Prof. Hayes
    status: "Mandatory Regulatory Standard",
    description: "State-level age verification laws and AI face recognition scraping have made identity separation mandatory. Creators are establishing anonymous LLCs, VOIP phone masking, and strict EXIF metadata removal.",
    actionable: "Audit personal phone, address, and email links to public creator handles to ensure zero doxxing vectors exist.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are the major creator economy trends in 2026?",
    answer: "Key trends include hyper-specific micro-niche positioning, 24/7 AI-assisted fan CRM tools, multi-platform diversification, and sovereign legal identity protection.",
  },
  {
    question: "How does BNE track creator industry trends?",
    answer: "BNE's intelligence desk monitors search volume trends across 1,000+ sub-niches, platform policy updates, and anonymized performance data across our managed creator portfolio.",
  },
]);

export default function Trends() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const brandPlaybook = getInfographicByKeyword("Brand_Playbook");

  const [modalOpen, setModalOpen] = useState(false);
  const delacroixProfessor = getProfessorByExpertise("niche psychology fan");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Economy Trend Intelligence & 2026 Forecasts | BNE Studio"
        description="Stay ahead of adult creator economy trends: micro-niche acceleration, platform algorithm shifts, AI fan CRM tools, and sovereign legal privacy frameworks."
        canonical="/trends"
        schema={faqSchema}
        keywords="adult creator trends 2026, OnlyFans algorithm forecast, micro-niche creator strategy, adult content market trends, Blacklisted University trends"
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
              Creator Economy <span className="gradient-text-gold">Trend Intelligence</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Macro trend forecasting for elite adult content creators. Understand emerging micro-niche movements, platform policy evolutions, AI tool automation, and sovereign legal privacy standards before the market moves.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/intelligence">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <TrendingUp size={16} /> Enter Intelligence Desk <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Get Trend Auditing Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND PLAYBOOK INFOGRAPHIC SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Brand Architecture Playbook</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Creator Brand Positioning Playbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF guide on positioning your account to capture emerging trend momentum.</p>
          </div>
          {brandPlaybook && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Brand Playbook (Interactive Reader)</h3>
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Micro-Niche Differentiation & Visual Identity Framework</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <Layers size={14} /> Open Interactive Reader
              </button>
            </motion.div>
          )}
          <InfographicModal url={brandPlaybook?.url || "/media-files/Brand_Playbook.pdf"} title="Brand Playbook" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 TREND FORECASTS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Macro Intelligence</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Key Trend Forecasts</h2>
          </div>

          <div className="space-y-8">
            {TREND_FORECASTS.map((tf, i) => (
              <motion.div key={tf.code} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{tf.code}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">{tf.status}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{tf.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{tf.description}</p>
                    
                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-3">
                      <Zap className="h-4 w-4 text-[oklch(0.78_0.16_85)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-[oklch(0.78_0.16_85)] block mb-0.5">Strategic Action Step</span>
                        <p className="text-slate-300 text-xs leading-relaxed">{tf.actionable}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Trend Lead Analyst</div>
                      <AuthorBio professor={tf.professor} variant="compact" />
                    </div>
                    <Link href="/apply">
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Apply Trend Strategy →
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
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Audience Psychology & Trend Intelligence</div>
          <AuthorBio professor={delacroixProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Trend Intelligence Feedback"
        subtitle="Read how creators adapted to market trends early to capture new audience surges."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How quickly do creator trends shift?", a: "Micro-niche aesthetics and social media funnel trends shift rapidly every 6 to 12 months. BNE updates trend forecasts continuously." },
              { q: "Can BNE help reposition my existing account for a new trend?", a: "Yes. Our brand team guides creators through seamless account re-positioning without alienating core fans." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ride Market Trends Before the Competition</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership today and get trend forecasting built directly into your strategy.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Trend Forecast Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
