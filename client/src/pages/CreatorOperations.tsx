/**
 * BNE Creator Operations Page
 * Extensive operational guide covering complete backend infrastructure, DM chat operations,
 * automated content syndication, platform optimization, and agency-level workflow delegation.
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
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Wrench, Users, Settings, ArrowRight, Shield, Zap,
  Calendar, Layers, Clock, Cpu, BarChart, CheckCircle2,
  Share2, Repeat, Sparkles, Sliders
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const OPERATIONS_PILLARS = [
  {
    icon: Calendar,
    title: "Omni-Platform Content Scheduling & Queueing",
    description: "End-to-end management of your multi-platform posting calendar across OnlyFans, Fansly, ManyVids, Reddit, Twitter/X, and Instagram.",
    detail: "Posting content manually across 4+ platforms at peak audience engagement windows is an operational drag. Our ops managers build 30-day rolling content calendars, tag assets, format platform-specific captions, and queue posts directly into platform APIs during peak subscriber activity hours.",
  },
  {
    icon: Users,
    title: "High-Ticket DM & Fan Relationship Management",
    description: "24/7 coverage of subscriber direct messages, mass messaging campaigns, custom content orders, and PPV upsell funnels.",
    detail: "Up to 70% of a top creator's revenue comes from direct message interactions. BNE's dedicated chatter teams are trained in your voice, persona, and boundaries. We run optimized sales scripts that build genuine emotional rapport while converting casual subscribers into high-ticket custom content buyers.",
  },
  {
    icon: Share2,
    title: "Automated Content Repurposing & Vaulting",
    description: "Transforming raw video shoots and photosets into 20+ derivative assets formatted for short-form teasers, Reddit teasers, and PPV previews.",
    detail: "Creation is time-consuming; leverage is everything. When you deliver a 10-minute master clip, our digital ops team edits it into SFW TikTok/Reels teasers, NSFW Twitter clips, Reddit watermarked GIFs, high-converting PPV preview thumbnails, and teaser audio clips.",
  },
  {
    icon: Repeat,
    title: "Cross-Platform Traffic Syndication",
    description: "Automated traffic routing from top-of-funnel social channels (Reddit, Twitter, Instagram) straight to high-converting paywalls.",
    detail: "Social channels constantly change algorithm policies regarding adult content. We maintain safe, automated linking architecture using tracking URLs, bio-link engines, and sub-niche Reddit posting rotations that shield your accounts from shadowbans while maintaining steady subscriber flow.",
  },
  {
    icon: Sliders,
    title: "A/B Paywall & Pricing Optimization",
    description: "Continuous testing of subscription prices, PPV bundle thresholds, tip menu structures, and promotional discount strategies.",
    detail: "Setting your subscription price once and forgetting it costs thousands annually. BNE runs controlled A/B price tests across subscriber cohorts, measuring churn rate versus lifetime subscriber value (LTV) to establish your exact revenue-maximizing price point.",
  },
  {
    icon: Cpu,
    title: "Data Vaulting, Backup & 2257 Compliance",
    description: "Secure cloud backup of all raw media assets, 18 U.S.C. § 2257 model releases, state photo IDs, and content release logs.",
    detail: "Platform account suspensions and data loss happen without warning. BNE maintains encrypted, redundant cloud storage for every raw asset and legally mandated model release form, ensuring instant account restoration and complete audit readiness.",
  },
];

const METRICS_COMPARISON = [
  { metric: "Weekly Hours Spent on Admin", solo: "18 - 25 Hours", managed: "< 3 Hours" },
  { metric: "DM Response Time", solo: "4 - 12 Hours", managed: "< 15 Minutes (24/7)" },
  { metric: "PPV Message Conversion Rate", solo: "14% - 22%", managed: "42% - 68%" },
  { metric: "Monthly Subscriber Churn Rate", solo: "32% - 45%", managed: "11% - 18%" },
  { metric: "Average Monthly Revenue Growth", solo: "+3% MoM", managed: "+24% MoM" },
];

const faqSchema = buildFaqSchema([
  {
    question: "What does BNE Creator Operations cover?",
    answer: "BNE Creator Operations handles all non-creative day-to-day tasks: content scheduling, 24/7 DM chat management, paywall price testing, social media traffic syndication, asset vaulting, and § 2257 compliance logging.",
  },
  {
    question: "Will I lose creative control of my content or brand?",
    answer: "Never. You retain 100% ownership of your creative direction, accounts, and content. BNE executes the operational layer based on your approved boundaries and brand guidelines.",
  },
  {
    question: "How do your DM chat managers learn my voice?",
    answer: "Before handling live messages, our ops team conducts a comprehensive voice and boundary audit. We create a custom Persona Playbook covering your vocabulary, emojis, boundaries, and sales thresholds.",
  },
  {
    question: "Can I choose which operational services to delegate?",
    answer: "Yes. BNE offers modular operations support. You can delegate full 24/7 operations or select specific focus areas like DM management or Reddit traffic syndication.",
  },
]);

export default function CreatorOperations() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infographic = getInfographicByKeyword("Professional_Creator_Management_Services");

  const [modalOpen, setModalOpen] = useState(false);
  const opsProfessor = getProfessorByExpertise("operations platform automation");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Full-Service Creator Operations & Management | BNE Studio"
        description="Outsource your creator business operations to BNE Studio. We handle 24/7 DM management, content scheduling, paywall testing, asset syndication, and 2257 compliance."
        canonical="/creator-operations"
        schema={faqSchema}
        keywords="creator operations management, OnlyFans account manager, adult content scheduling, DM chat team, creator automation agency"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Agency Infrastructure</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Full-Service <span className="text-[oklch(0.78_0.16_85)]">Creator Operations</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Stop Trading Time for Admin Work.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Running a multi-platform creator business solo is an exhausting balance of creation, customer support, marketing, asset management, and legal compliance. As subscriber counts grow, operational drag eats away at the very creative energy that built your brand.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio provides full-service agency infrastructure. We take over the day-to-day operational mechanics — from 24/7 direct message sales to automated cross-platform distribution — letting you reclaim 20+ hours per week while compounding your monthly earnings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Outsource Your Operations <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Explore Management Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS / COMPARISON TABLE ── */}
      <section className="py-16 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Solo Operations vs. BNE Managed Operations</h2>
            <p className="text-slate-400 text-sm">Empirical metrics across our managed creator portfolio</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Performance Metric</th>
                  <th className="py-3 px-4 text-red-400">Solo Creator Average</th>
                  <th className="py-3 px-4 text-[oklch(0.78_0.16_85)]">BNE Managed Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {METRICS_COMPARISON.map((row) => (
                  <tr key={row.metric} className="hover:bg-slate-900/30">
                    <td className="py-4 px-4 text-slate-200 font-medium">{row.metric}</td>
                    <td className="py-4 px-4 text-slate-400">{row.solo}</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">{row.managed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INFOGRAPHIC & SERVICES ── */}
      <section className="py-20 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Enterprise Creator Management Blueprint
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                When you partner with BNE Studio, your account gains an entire dedicated department: account director, communication specialists, asset editors, and compliance managers.
              </p>

              {infographic && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="p-6 bg-slate-900/80 border border-[oklch(0.78_0.16_85/30%)] rounded-xl cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      Professional Creator Management Services <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">View our high-resolution operational framework chart</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic?.url || "/media-files/Professional_Creator_Management_Services.png"} title="Professional Creator Management Services" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-1">Dedicated Account Management</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Single point of contact overseeing weekly deliverables, strategy calls, and cross-platform synchronization.</p>
              </div>
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-1">24/7 Trained DM Chat Specialists</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Native-English chat managers converting incoming messages into high-ticket custom sales around the clock.</p>
              </div>
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-1">Asset Vaulting & Media Editing</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Professional watermarking, trailer creation, thumbnail design, and encrypted cloud backups.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 OPERATIONAL PILLARS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Core Operational Pillars</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our modular operational architecture handles every friction point in the adult creator business lifecycle.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATIONS_PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <pillar.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{pillar.title}</h3>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">{pillar.description}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-800/60">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Operations & Platform Infrastructure</div>
          <AuthorBio professor={opsProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Creators Say About BNE Operations"
        subtitle="Real stories from creators who reclaimed 20+ hours a week and multiplied their revenue."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How quickly can BNE take over my daily operations?", a: "After completing your initial account audit and voice playbook setup (usually 3 to 5 business days), BNE ops can assume full scheduling, DM management, and platform syndication." },
              { q: "What if I want to answer DMs myself sometimes?", a: "You retain full access to all your accounts. Our team monitors and responds seamlessly, stepping back whenever you want to engage directly with fans." },
              { q: "Are your DM chatters native English speakers?", a: "Yes. All BNE communication managers are native English speakers trained specifically in US/West Coast creator dialect, sales psychology, and boundary management." },
              { q: "Do you take commissions on DM sales?", a: "No. BNE charges a flat monthly management fee. You keep 100% of your earnings across all platforms." },
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Reclaim Your Time & Scale Your Business</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Let BNE Studio operate your business backend so you can focus 100% on creative output.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Operations Support →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
