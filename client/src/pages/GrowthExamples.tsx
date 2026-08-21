/**
 * BNE Growth Examples Page
 * Empirical before/after growth case studies detailing revenue transformations,
 * subscriber scaling timelines, retention fixes, and operational turnarounds.
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
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  TrendingUp, ArrowRight, Crown, CheckCircle2, DollarSign,
  Users, BarChart3, Clock, Sparkles, Layers, Shield
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const CASE_STUDIES = [
  {
    code: "CASE-01",
    title: "Solo OnlyFans Creator to $22k/mo Multi-Platform Empire",
    archetype: "Solo Creator (Portland, OR)",
    timeline: "6 Months",
    professor: professors[0], // Dr. Sinclair
    before: {
      income: "$2,100 / mo",
      subs: "47 Subscribers",
      churn: "38% / month",
      hours: "35 hrs/wk admin drag",
    },
    after: {
      income: "$22,400 / mo",
      subs: "312 Subscribers",
      churn: "11% / month",
      hours: "< 3 hrs/wk admin drag",
    },
    strategy: "Shifted from generic lifestyle posting to hyper-focused sub-niche positioning. Implemented 24/7 DM chat sales, cohort PPV drops, clip store syndication on ManyVids, and § 2257 compliance logging.",
  },
  {
    code: "CASE-02",
    title: "Webcam Performer to Top 0.5% Multi-Stream Powerhouse",
    archetype: "Webcam / OF Creator (Seattle, WA)",
    timeline: "9 Months",
    professor: professors[3], // Prof. Okafor
    before: {
      income: "$3,400 / mo",
      subs: "Irregular Stream Income",
      churn: "High tip variance",
      hours: "40 hrs/wk broadcast burnout",
    },
    after: {
      income: "$18,900 / mo",
      subs: "580 Paying Subs",
      churn: "14% / month",
      hours: "18 hrs/wk broadcast + full auto",
    },
    strategy: "Engineered a direct funnel from Chaturbate live broadcasts to OnlyFans paywall. Re-architected tip menus with high-ticket anchor items and automated custom content order queueing.",
  },
  {
    code: "CASE-03",
    title: "Mature Creator Rebrand: From Plateau to 4x Growth",
    archetype: "Mature Creator (Bellevue, WA)",
    timeline: "4 Months",
    professor: professors[2], // Prof. Delacroix
    before: {
      income: "$1,800 / mo",
      subs: "28 Subscribers",
      churn: "42% / month",
      hours: "Unstructured posting",
    },
    after: {
      income: "$8,700 / mo",
      subs: "120 Paying Subs",
      churn: "12% / month",
      hours: "Automated queue & DMs",
    },
    strategy: "Repositioned age and maturity as a high-value competitive advantage rather than hiding it. Built a specialized subscriber welcome sequence and launched custom fetish rate cards.",
  },
  {
    code: "CASE-04",
    title: "In-Person Companion: Safe Booking & Tour Expansion",
    archetype: "Independent Companion (Oakland, CA)",
    timeline: "5 Months",
    professor: professors[5], // Prof. Castillo
    before: {
      income: "$4,500 / mo",
      subs: "Unvetted text inquiries",
      churn: "30% no-show rate",
      hours: "High anxiety & safety risk",
    },
    after: {
      income: "$14,200 / mo",
      subs: "100% Vetted calendar",
      churn: "0% no-shows (deposits)",
      hours: "Zero safety incidents",
    },
    strategy: "Implemented BNE's 3-step corporate screening protocol, VOIP number isolation, mandatory 30% non-refundable deposits, and 2-point real-time safety dispatch tracking.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Are these creator growth examples based on real data?",
    answer: "Yes. All case studies reflect empirical before-and-after metrics from actual creators partnered with BNE Studio. Handle names are anonymized at creator request.",
  },
  {
    question: "How long does a typical creator revenue transformation take?",
    answer: "Most creators see initial subscriber retention and DM conversion gains within 30 days, with 3x to 5x revenue scaling taking between 3 and 9 months.",
  },
  {
    question: "What is the primary driver of rapid creator revenue growth?",
    answer: "The fastest revenue growth comes from replacing single-stream subscription models with multi-tier monetization architecture: cohort PPV messaging, custom rate cards, and automated ops.",
  },
]);

export default function GrowthExamples() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infographic = getInfographicByKeyword("Elite_Path_to_Webcam_Powerhouse");

  const [modalOpen, setModalOpen] = useState(false);
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Growth Case Studies & Transformations | BNE Studio"
        description="Explore real before/after creator growth examples. See how BNE systems transformed small independent creator accounts into 6-figure recurring empires."
        canonical="/growth-examples"
        schema={faqSchema}
        keywords="creator growth case studies, OnlyFans revenue transformation, adult creator before after metrics, companion booking growth, BNE case studies"
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
              Empirical <span className="gradient-text-gold">Growth Examples</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Real numbers. Verified timelines. Documented transformations. Explore before-and-after case studies demonstrating how BNE's agency infrastructure scales creator earnings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <TrendingUp size={16} /> Request Account Audit <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/monetization">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Explore Revenue Systems
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INFOGRAPHIC MODAL SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Growth Blueprint</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Elite Path to Webcam & Content Powerhouse</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive growth roadmap diagram showing step-by-step scaling milestones.</p>
          </div>
          {infographic && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Elite Path to Webcam Powerhouse Diagram</h3>
                  <p className="text-slate-400 text-sm mt-1">High-Resolution Flowchart · Scaling Milestones from $2k to $20k+/mo</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <TrendingUp size={14} /> Open Interactive Diagram
              </button>
            </motion.div>
          )}
          <InfographicModal url={infographic?.url || "/media-files/Elite_Path_to_Webcam_Powerhouse.png"} title="Elite Path to Webcam Powerhouse" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 CASE STUDIES LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Verified Case Studies</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Creator Transformation Studies</h2>
          </div>

          <div className="space-y-10">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div key={cs.code} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{cs.code} · {cs.archetype}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{cs.title}</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">{cs.timeline} Transformation</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* BEFORE */}
                  <div className="p-5 bg-red-950/10 border border-red-900/30 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">Before BNE Partnership</span>
                    <div className="text-xl font-bold text-slate-300">{cs.before.income}</div>
                    <div className="text-xs text-slate-400">{cs.before.subs} · Churn: {cs.before.churn}</div>
                    <div className="text-xs text-slate-500">{cs.before.hours}</div>
                  </div>

                  {/* AFTER */}
                  <div className="p-5 bg-emerald-950/10 border border-emerald-900/30 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">After BNE Managed Ops</span>
                    <div className="text-2xl font-black text-emerald-400">{cs.after.income}</div>
                    <div className="text-xs text-slate-200 font-semibold">{cs.after.subs} · Churn: {cs.after.churn}</div>
                    <div className="text-xs text-slate-400">{cs.after.hours}</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-[oklch(0.78_0.16_85)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[oklch(0.78_0.16_85)] block mb-0.5">Applied Strategy</span>
                    <p className="text-slate-300 text-xs leading-relaxed">{cs.strategy}</p>
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
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Monetization & Growth Analytics</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Real Creator Results"
        subtitle="14 verified reviews from creators who experienced these exact growth transformations."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can BNE replicate these growth results for new creators?", a: "Yes. New creators who start with proper § 2257 compliance, niche positioning, and automated DM funnels avoid initial plateau traps." },
              { q: "What if my account is currently stuck at a revenue ceiling?", a: "Plateaus are usually caused by single-stream monetization or un-segmented DM broadcasts. We audit your revenue funnel to unlock immediate gains." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Start Your Growth Transformation Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and receive a custom revenue growth audit for your creator business.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Growth Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
