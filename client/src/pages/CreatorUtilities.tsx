/**
 * BNE Creator Utilities Page
 * In-depth guide to BNE's creator utility stack: Income Verifier engine,
 * AFK content planning, classified ad generators, and automated DM workflows.
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
  Wrench, Calculator, Users, ArrowRight, Zap, BarChart3,
  CheckCircle2, Cpu, FileText, Sliders, Shield, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const UTILITIES_SUITE = [
  {
    icon: Calculator,
    title: "1. OnlyFans & Platform Income Verifier",
    description: "Input your active subscriber count, average monthly churn, PPV message open rates, and custom orders to receive real-time income gap analysis and net projections.",
    detail: "Most creators guess their monthly revenue potential. The Income Verifier calculates your exact Average Revenue Per User (ARPU) and identifies revenue leaks in your DM conversion funnel.",
  },
  {
    icon: Cpu,
    title: "2. AFK Content Calendar & Queueing Engine",
    description: "Automated 30-day content queue planner that formats captions, schedules platform-specific teaser drops, and syncs across OnlyFans, Fansly, and Reddit.",
    detail: "Eliminates daily posting friction. Build your monthly content queue in a single weekend shoot and let our utility engine handle scheduled releases while you AFK.",
  },
  {
    icon: FileText,
    title: "3. Classified Ad Generator & Tour Copy Tool",
    description: "Automated classified ad copy generator tailored for escort directories, webcam promotional feeds, and city tour announcements.",
    detail: "Generates high-converting, policy-compliant ad headlines and body copy calibrated for West Coast metropolitan markets (Seattle, Portland, LA, SF, San Diego, Las Vegas).",
  },
  {
    icon: Sliders,
    title: "4. Custom Content & Tip Menu Calculator",
    description: "Interactive rate card designer that calculates profit margins, minimum minute thresholds, rush-fee pricing, and boundary add-ons.",
    detail: "Stop undercharging for custom requests. Our tip menu calculator structures psychological price anchors that make premium custom sets effortlessly sellable.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are BNE Creator Utilities?",
    answer: "Creator Utilities are specialized tools including the Income Verifier calculator, AFK content calendar engines, classified ad copy generators, and custom tip menu calculators.",
  },
  {
    question: "Are BNE Utilities free to use?",
    answer: "Core utilities are available on the BNE site at blacklisted.studio/tools, while advanced automation engines are unlocked for BNE managed partners.",
  },
  {
    question: "How does the Income Verifier tool calculate projections?",
    answer: "The verifier uses empirical ARPU data and price elasticity models derived from BNE's managed creator portfolio to project realistic 30, 60, and 90-day earnings.",
  },
]);

export default function CreatorUtilities() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Creator_Playbook_Niche_SilentParter_Business_Managment") || getVideoByKeyword("playbook");
  const opsProfessor = getProfessorByExpertise("operations platform automation");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Utility Stack & AFK Automation Tools | BNE Studio"
        description="Access BNE Creator Utilities: Income Verifier calculators, AFK content queue tools, classified ad generators, and custom rate card designers."
        canonical="/creator-utilities"
        schema={faqSchema}
        keywords="creator utilities, OnlyFans income verifier, creator AFK tools, custom tip menu calculator, adult creator software tools"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Wrench className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">AFK Automation Suite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Utility Stack</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Tools That Work While You AFK.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Stop performing repetitive manual tasks. BNE's creator utility stack replaces manual content queueing, rate card calculations, ad writing, and income auditing with automated software engines.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              From our empirical Income Verifier calculator to classified ad copy generators, our utilities streamline your creator business operations so you can earn passively.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Access Free Creator Tools <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Unlock Full Utility Access
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
                Creator Playbook: Automation Utilities
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch how BNE's silent partnership infrastructure automates content scheduling, DM management, and income tracking across multi-platform networks.
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
                  <h3 className="text-white font-bold">Empirical Revenue Projections</h3>
                </div>
                <p className="text-slate-400 text-sm">Calculate your exact Average Revenue Per User (ARPU) and discover hidden revenue gaps in your current setup.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">AFK Workflow Managers</h3>
                </div>
                <p className="text-slate-400 text-sm">Set up repeatable 30-day content calendar queues that run automatically through BNE's admin infrastructure.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 UTILITIES SUITE ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The BNE Creator Utility Stack</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Four core software engines built specifically for the adult creator economy.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UTILITIES_SUITE.map((util, i) => (
              <motion.div key={util.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <util.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{util.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{util.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{util.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Digital Operations & Automation</div>
          <AuthorBio professor={opsProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Utility Reviews"
        subtitle="Read how creators saved 15+ hours weekly using BNE's utility stack."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Where can I access the free creator tools?", a: "Visit blacklisted.studio/tools to access the OnlyFans Revenue Calculator, Classified Generator, and Niche Matcher." },
              { q: "Do these utilities require software downloads?", a: "No. All BNE utilities are web-based cloud tools accessible directly in your browser." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Start Automating Your Creator Business Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to unlock full AFK automation engines and utility tools.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Utility Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
