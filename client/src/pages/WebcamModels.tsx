/**
 * Webcam Models Hub Page
 * Dedicated vertical landing page for webcam/cam models.
 * SEO entry point — intentionally not linked from main navigation.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import TestimonialsSection from "@/components/TestimonialsSection";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Video, Gift, HeartHandshake, Clapperboard, EyeOff, CalendarCheck,
  ArrowRight, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const CAM_PILLARS = [
  {
    icon: Video,
    title: "1. Show Strategy & Room Traffic",
    href: "/traffic-strategy",
    description: "Broadcast schedules engineered around platform algorithms and peak-spend hours — plus off-platform funnels that fill your room with buyers, not lurkers.",
    detail: "Cam platforms reward consistency and conversion. We build the schedule and the traffic engine that keeps your room ranked and tipping.",
  },
  {
    icon: Gift,
    title: "2. Tip Menu Engineering",
    href: "/monetization-systems",
    description: "Tip menus, goal shows, and ticket events priced from real spending data — structured to convert casual viewers into paying regulars.",
    detail: "Most models underprice menu items and over-deliver. We engineer menus where every tier has a buyer and every show has a profit target.",
  },
  {
    icon: HeartHandshake,
    title: "3. Regulars & High-Spender Cultivation",
    href: "/services",
    description: "CRM systems for your whales: attention rhythms, exclusive access ladders, and re-engagement sequences that keep big spenders spending.",
    detail: "A small fraction of viewers produce the majority of cam revenue. We systematize the relationships that actually pay your bills.",
  },
  {
    icon: Clapperboard,
    title: "4. Clip Repurposing Engine",
    href: "/monetization",
    description: "Every show becomes inventory: recorded streams edited into clip-store products for ManyVids, Clips4Sale, and OnlyFans PPV — earning while you sleep.",
    detail: "Live income stops when the camera turns off. Repurposed clips turn one broadcast into months of passive catalog revenue.",
  },
  {
    icon: EyeOff,
    title: "5. Privacy & Identity Shielding",
    href: "/privacy-systems",
    description: "Geo-blocking, stage-name operations, DMCA takedown enforcement, and full compartmentalization — cam hard without exposing your real life.",
    detail: "Recorded shows will be screen-captured. Our privacy stack assumes it and protects you anyway: legal, technical, and operational layers.",
  },
  {
    icon: CalendarCheck,
    title: "6. Schedule & Burnout Prevention",
    href: "/posting-and-scheduling",
    description: "Sustainable broadcast calendars, energy management, and revenue-per-hour targets — so camming funds your life instead of consuming it.",
    detail: "Grinding 60-hour cam weeks destroys careers. We optimize for revenue per hour, not hours on camera.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Webcam Model Management",
  "provider": {
    "@type": "Organization",
    "name": "B.N.E. Studio"
  },
  "description": "Full-service webcam model management: show strategy, tip menu engineering, high-spender cultivation, clip repurposing, privacy shielding, and sustainable scheduling.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Webcam Model Management Services",
    "itemListElement": CAM_PILLARS.map(s => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
    }))
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "Does BNE Studio take a percentage of my cam earnings?",
    answer: "No. BNE operates on transparent flat monthly partnership retainers. You keep 100% of your earnings across every cam site and clip store.",
  },
  {
    question: "Which cam sites do you support?",
    answer: "Our systems work across the major cam platforms — Chaturbate, Stripchat, Streamate, BongaCams, MyFreeCams, and others — plus clip repurposing for ManyVids, Clips4Sale, and OnlyFans.",
  },
  {
    question: "Do I have to show my face on cam?",
    answer: "No. Faceless and masked positioning is a legitimate, profitable niche with its own audience. Our privacy systems support whatever level of exposure you choose.",
  },
  {
    question: "How does camming fit with OnlyFans?",
    answer: "They're built to feed each other: cam rooms drive traffic to your fan pages, and recorded shows become PPV clip inventory. We run both as one business instead of two side hustles.",
  },
]);

export default function WebcamModels() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Webcam Model Management — Grow Your Cam Business | BNE Studio"
        description="BNE Studio manages webcam model businesses end-to-end: show strategy, tip menu engineering, high-spender cultivation, clip repurposing, privacy shielding, and sustainable scheduling."
        canonical="/webcam-models"
        schema={[serviceSchema, faqSchema]}
        keywords="webcam model management, cam model agency, camgirl management, chaturbate management, webcam business growth, cam model marketing"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">Webcam Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              Cam Like a <span className="gradient-text-gold">Professional Operation</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              Top cam models aren't lucky — they're systematized. We bring the strategy, traffic,
              pricing, and privacy infrastructure that turns broadcasting into a real business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Apply for Partnership <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3.5 text-sm border border-slate-700 rounded-full text-slate-300 hover:border-slate-500 transition-colors">
                  Compare Partnership Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 PILLARS GRID ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">What We Operate</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">The 6 Systems Behind Every Managed Cam Business</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAM_PILLARS.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div key={sol.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={sol.href}>
                    <div className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl h-full group cursor-pointer hover:border-violet-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                          <Icon className="h-6 w-6 text-violet-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-violet-300 transition-colors font-display">{sol.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{sol.description}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-800/80 mb-4">{sol.detail}</p>
                        <div className="text-xs font-semibold text-violet-400 flex items-center gap-1 group-hover:underline">
                          Explore System →
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CAM + CLIP FLYWHEEL ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">The Cam-to-Clip Flywheel</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Live shows earn once. We make them earn forever — every broadcast is captured, edited,
            and distributed as clip-store inventory across ManyVids, Clips4Sale, and OnlyFans PPV.
            Your cam room becomes a content factory with two revenue streams from every hour on camera.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Managed Models Say"
        subtitle="Real feedback from webcam models running on BNE infrastructure."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Does BNE take a percentage of my earnings?", a: "No. Flat monthly retainers only — you keep 100% of everything you earn, on every platform." },
              { q: "I'm new to camming. Is management overkill?", a: "New models benefit the most — you skip the expensive beginner mistakes (bad pricing, no privacy setup, burnout schedules) and start with professional systems on day one." },
              { q: "Can you help me stay anonymous?", a: "Yes. Geo-blocking, stage-name operations, DMCA enforcement, and compartmentalized tech are core to our privacy stack — including fully faceless positioning strategies." },
              { q: "What do you need from me to start?", a: "Apply for a free confidential consultation. We review your current setup (or your goals if you're new) and propose the exact systems for your situation." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Turn Your Cam Room Into a Business</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and put professional operations behind your broadcasts.</p>
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
