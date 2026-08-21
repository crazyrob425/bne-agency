/**
 * BNE Success Stories Page
 * In-depth creator success dossiers, case study video walkthroughs,
 * verified growth metrics, and full testimonial directory.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import InfographicModal from "@/components/InfographicModal";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Sparkles, Star, ArrowRight, Crown, CheckCircle2,
  TrendingUp, Shield, DollarSign, Award, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const SUCCESS_DOSSIERS = [
  {
    title: "The $100k Net Annual Milestone Blueprint",
    metric: "$8,300+ Net Monthly",
    timeframe: "First 6 Months",
    summary: "How solo creators achieve predictable 6-figure net earnings through multi-channel paywalls, 24/7 DM chat teams, and § 2257 compliance.",
  },
  {
    title: "The 70% Subscriber Retention Architecture",
    metric: "11% Monthly Churn Rate",
    timeframe: "Sustained 12+ Months",
    summary: "Re-engineering subscriber welcome drips, milestone anniversary drops, and VIP inner-circle tiers to cut churn by 3x.",
  },
  {
    title: "Safe In-Person Booking & City Tour Protocol",
    metric: "Zero Safety Incidents",
    timeframe: "3,400+ Sessions Dispatched",
    summary: "Enforcing mandatory 3-step corporate screening, VOIP number isolation, and 2-point safety check-ins for high-end companions.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Are BNE success stories verified?",
    answer: "Yes. All featured success stories and client reviews are verified against empirical payout data across our managed creator portfolio.",
  },
  {
    question: "How long does it take for a creator to achieve 6-figure net income?",
    answer: "Creators implementing BNE's full operational suite typically reach 6-figure annualized run rates ($8,333+/mo) within 4 to 8 months.",
  },
  {
    question: "Can I remain completely anonymous while achieving these results?",
    answer: "Yes. Complete identity protection and anonymized business entity (LLC) structuring are core components of every BNE management plan.",
  },
]);

export default function SuccessStories() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Case_Study_Success_From_Performer_to_Powerhouse");
  const dossier = getInfographicByKeyword("Studio_Case_Study_Results_Briefing_Dossier");

  const [modalOpen, setModalOpen] = useState(false);
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Success Stories & Verified Case Studies | BNE Studio"
        description="Explore verified creator success stories. See how BNE Studio partners transformed from struggling performers into 6-figure powerhouse brands."
        canonical="/success-stories"
        schema={faqSchema}
        keywords="creator success stories, OnlyFans case studies, adult creator income proofs, BNE studio reviews, creator business transformations"
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
              Verified <span className="gradient-text-gold">Success Stories</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              These are not casual testimonials. These are verified case studies of independent creators who implemented BNE's agency infrastructure and built multi-six-figure empires.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <Sparkles size={16} /> Apply for Partnership <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/growth-examples">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  View Growth Examples
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO & DOSSIER SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Masterclass: From Performer to Powerhouse
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch the complete video case study detailing how an independent creator scaled from $2,100/mo to $22,400/mo by delegating daily backend operations to BNE Studio.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-2xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>

            <div>
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase mb-2 block">Results Briefing</span>
              <h3 className="text-2xl font-bold text-white mb-4">Studio Case Study Results Dossier</h3>
              <p className="text-slate-400 text-sm mb-6">Explore the high-resolution infographic briefing detailing empirical growth metrics and operational SOPs.</p>
              {dossier && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                      <Star size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Case Study Results Dossier</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Click to view full interactive PDF dossier</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-1.5">
                    <Star size={14} /> Open Dossier
                  </button>
                </motion.div>
              )}
              <InfographicModal url={dossier?.url || "/media-files/Studio_Case_Study_Results_Briefing_Dossier.png"} title="Studio Case Study Results Briefing Dossier" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 SUCCESS DOSSIERS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Verified Benchmarks</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">BNE Milestone Blueprints</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUCCESS_DOSSIERS.map((d, i) => (
              <motion.div key={d.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-amber-400 mb-1">{d.metric}</div>
                  <div className="text-xs text-slate-500 font-mono mb-4">{d.timeframe}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{d.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{d.summary}</p>
                </div>
                <Link href="/apply">
                  <span className="text-xs text-[oklch(0.78_0.16_85)] font-semibold flex items-center gap-1 hover:underline">
                    Target This Milestone →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL TESTIMONIALS SECTION ── */}
      <TestimonialsSection
        title="Complete Verified Creator Testimonial Directory"
        subtitle="All 14 creator reviews from real women operating across Washington, Oregon, and California."
        showExpanded={false}
      />

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Creator Economics</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do creators need a large initial following to achieve these success results?", a: "No. Many of our highest-earning case studies began with fewer than 50 paying subscribers and zero social media following." },
              { q: "Does BNE require equity or ownership in my creator brand?", a: "Never. You maintain 100% ownership of your business, accounts, and content at all times." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Become Our Next Success Case Study</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership today and let us build your 6-figure creator empire.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
