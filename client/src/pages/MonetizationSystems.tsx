/**
 * BNE Monetization Systems Page
 * High-performance monetization frameworks, subscription funnel automation,
 * price testing algorithms, and multi-channel revenue engines for adult creators.
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
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  DollarSign, TrendingUp, BarChart3, ArrowRight, Zap, Shield,
  Users, Crown, Key, Cpu, Compass, Layers, CheckCircle2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const SYSTEM_FRAMEWORKS = [
  {
    icon: Layers,
    title: "Dynamic Subscriber Tiering & Upsell Architecture",
    description: "Structuring primary, VIP, and elite tier offerings that convert casual subscribers into high-ticket recurring monthly supporters.",
    detail: "A single subscription price creates a ceiling on your revenue. By introducing multi-tiered subscriber access (e.g. baseline access, VIP inner-circle tiers, and custom request priority tiers), creators capture additional consumer surplus from super-fans willing to pay 3x to 10x the standard rate.",
  },
  {
    icon: Cpu,
    title: "Automated PPV Drip Funnels & Cohort Messaging",
    description: "Algorithmic mass-messaging sequences that deliver targeted video previews based on subscriber tenure, past purchase history, and activity levels.",
    detail: "Blasting the same PPV message to your entire email or inbox list burns out subscribers and tanks conversion. BNE segments subscribers into spending cohorts (new subs, active spenders, dormant subs, VIP whales) and sends customized pricing drops timed to each segment's behavioral profile.",
  },
  {
    icon: Compass,
    title: "Niche-Specific Tip Menu & Custom Service Rate Cards",
    description: "Customized service menus designed with psychological pricing anchors, clear boundaries, add-on upsells, and non-refundable deposit terms.",
    detail: "Tip menus serve two functions: establishing clear boundaries and maximizing transaction size. We structure tip menus with high-priced anchor items ($500+ video calls or custom sets) that make mid-tier items ($75-$150) feel remarkably accessible.",
  },
  {
    icon: Key,
    title: "Clip Store Vaulting & Syndication Systems",
    description: "Automated tagging, formatting, and distribution of full-length video sets to secondary clip markets (ManyVids, Clips4Sale, iWANTFC).",
    detail: "Every video set you produce is a long-term digital asset. Our clip store syndication engine formats trailers, tags metadata according to search trends, and lists your catalog across global clip markets, creating passive passive recurring sales.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is a monetization system for adult creators?",
    answer: "A monetization system is an automated, multi-channel sales architecture that converts social traffic into subscribers, segments subscribers by spending behavior, and optimizes PPV and custom content sales without requiring manual effort for every transaction.",
  },
  {
    question: "How does subscriber cohort messaging increase earnings?",
    answer: "Instead of sending the same PPV price to everyone, cohort messaging segments subscribers by past spending habits, delivering tailored offers that maximize purchase conversion across both budget and high-spend subscribers.",
  },
  {
    question: "What is the difference between flat-rate partnership and percentage split?",
    answer: "Percentage splits take 20% to 50% of your gross earnings forever. BNE's flat-rate model charges a fixed monthly management fee, ensuring 100% of your earnings growth stays in your pocket.",
  },
  {
    question: "Can BNE integrate with my existing platforms?",
    answer: "Yes. We operate across OnlyFans, Fansly, ManyVids, Chaturbate, Reddit, Twitter/X, Instagram, and custom independent websites.",
  },
]);

export default function MonetizationSystems() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Content_Creator_Partnership_Percentages_Payments_rates");
  const guide = getInfographicByKeyword("Niche_Mastery_Guide");

  const [modalOpen, setModalOpen] = useState(false);
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Monetization Systems & Revenue Engine | BNE Studio"
        description="Build a high-performance monetization engine. Implement dynamic subscription tiering, cohort PPV funnels, custom rate cards, and clip store syndication with BNE Studio."
        canonical="/monetization-systems"
        schema={faqSchema}
        keywords="monetization systems for creators, OnlyFans revenue engine, creator pricing strategy, PPV funnel automation, custom rate card design"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Zap className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">High-Performance Frameworks</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Your <span className="text-[oklch(0.78_0.16_85)]">Monetization</span> Engine
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Stop guessing on price points, mass message timing, and custom rates. BNE Studio equips independent creators with engineered monetization systems that turn content into predictable, multi-stream recurring cash flow.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              From dynamic subscriber tiering and PPV cohort automation to secondary clip store syndication, our systems operate silently in the background while you focus on creative production.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Build Your System Now <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/monetization">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Monetization Overview
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO & GUIDE SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Partnership & Payment Systems Breakdown
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Understand the economics of creator partnerships. Compare percentage-based agency splits against BNE's transparent flat-rate model.
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
                  <h3 className="text-white font-semibold">Multi-Channel Synchronization</h3>
                </div>
                <p className="text-slate-400 text-sm">Synchronize subscriptions, PPV messaging, tips, and custom orders into a unified monthly revenue report.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-semibold">Revenue Acceleration</h3>
                </div>
                <p className="text-slate-400 text-sm">Systematic optimization that increases gross income without forcing you to double your content creation hours.</p>
              </div>

              {guide && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="p-6 bg-slate-900/80 border border-[oklch(0.78_0.16_85/30%)] rounded-xl cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      Niche Mastery Guide <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">Interactive guide detailing niche selection and pricing elasticity</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Niche_Mastery_Guide.png"} title="Niche Mastery Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 SYSTEM FRAMEWORKS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Pillars of BNE Monetization Systems</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Engineered frameworks designed to extract maximum value from every subscriber while respecting creator boundaries.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SYSTEM_FRAMEWORKS.map((sys, i) => (
              <motion.div key={sys.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <sys.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{sys.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{sys.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{sys.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Monetization Architecture</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Results from BNE Systems"
        subtitle="Empirical proof from independent creators scaling to 5 and 6 figures with BNE's monetization frameworks."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How are Monetization Systems implemented on my existing account?", a: "After conducting a full account audit, BNE configures your tier structures, DM messaging funnels, and clip store syndication without disturbing ongoing operations." },
              { q: "Do I need technical skills to run these systems?", a: "No. BNE manages the entire technical and operational setup for you." },
              { q: "How often are pricing structures audited?", a: "We conduct monthly price elasticity reviews and quarterly full system audits." },
              { q: "What is the typical timeframe to see revenue increases?", a: "Most creators observe initial revenue improvements within 30 days of implementing cohort messaging and custom rate card restructuring." },
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Deploy Your Custom Monetization Engine?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Apply for BNE Studio partnership today and let our experts build your multi-stream revenue architecture.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply to BNE Studio →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
