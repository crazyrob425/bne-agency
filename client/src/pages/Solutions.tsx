/**
 * BNE Solutions Page
 * Comprehensive overview of BNE Studio's integrated solution pillars: Niche Intelligence,
 * Strategic Advisory, Revenue Growth, Business Infrastructure, Monetization Systems, and Creator Development.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Layers, Zap, Briefcase, DollarSign, TrendingUp, Shield,
  ArrowRight, Brain, Settings, Users, CheckCircle2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const SOLUTIONS_PILLARS = [
  {
    icon: Zap,
    title: "1. Niche Intelligence & Market Positioning",
    href: "/niche-matcher",
    description: "Stop guessing. We deploy our proprietary database of 1,052+ market segments to find your most profitable, authentic sub-niche, ensuring you compete where you command high pricing.",
    detail: "Sub-niche creators experience 4.2x higher subscriber retention than generic accounts. Our intelligence desk analyzes search volume, competition density, and consumer price elasticity.",
  },
  {
    icon: Briefcase,
    title: "2. Strategic Executive Advisory",
    href: "/bne-growth-partnership",
    description: "Transition from solo creator to CEO. We provide C-suite business strategy, brand playbooks, legal privacy audits, and decision-making support to build a sustainable 6-figure business.",
    detail: "Bi-weekly 1-on-1 strategy sessions with senior agency partners reviewing analytics, pricing elasticity, and multi-channel expansion roadmaps.",
  },
  {
    icon: DollarSign,
    title: "3. Multi-Stream Revenue Acceleration",
    href: "/monetization",
    description: "Unlock your true earning potential. We implement advanced multi-tier paywalls, cohort PPV funnels, custom rate cards, and clip store syndication that multiply net income.",
    detail: "Move beyond single subscription fees. Our managed creators average 55%+ of gross revenue from direct messaging and secondary clip store sales.",
  },
  {
    icon: Settings,
    title: "4. Full Backend Business Infrastructure",
    href: "/backend-management",
    description: "We build and operate your entire backend: 18 U.S.C. § 2257 compliance logs, anonymous LLC business entities, encrypted VOIP shielding, and automated 30-day content queueing.",
    detail: "Delegating daily administrative operations reclaims 20+ hours per week while protecting your real identity and maintaining federal compliance.",
  },
  {
    icon: TrendingUp,
    title: "5. Monetization Systems Engineering",
    href: "/monetization-systems",
    description: "Algorithmic mass messaging sequences, subscriber welcome funnels, expired subscriber win-back drops, and automated tip menu calculators.",
    detail: "Engineered sales systems segment subscribers into spending cohorts, delivering tailored offers that maximize purchase conversion across budget and VIP fans.",
  },
  {
    icon: Users,
    title: "6. Creator Development & Education",
    href: "/university",
    description: "Access Blacklisted University for exclusive masterclasses, § 2257 compliance manuals, brand playbooks, and 1-on-1 faculty guidance.",
    detail: "On-demand access to video lectures, downloadable SOP templates, legal forms, and market research dossiers.",
  },
];

const solutionsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Creator Business Infrastructure",
  "provider": {
    "@type": "Organization",
    "name": "B.N.E. Studio"
  },
  "description": "B.N.E. Studio provides comprehensive integrated solutions for adult creators, including Niche Intelligence, Strategic Advisory, Revenue Growth systems, and complete Business Infrastructure.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "B.N.E. Solutions",
    "itemListElement": SOLUTIONS_PILLARS.map(s => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
    }))
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "What is BNE Studio's integrated solutions model?",
    answer: "Rather than offering isolated services, BNE provides end-to-end business infrastructure: niche positioning, strategic advisory, 24/7 DM operations, § 2257 compliance, and revenue optimization.",
  },
  {
    question: "Can I choose specific solutions or do I need full management?",
    answer: "BNE offers flexible partnership tiers. You can select modular solutions like Strategic Advisory or delegate complete 24/7 operations.",
  },
  {
    question: "Does BNE charge a percentage of my earnings?",
    answer: "No. BNE operates strictly on transparent, flat monthly partnership retainers. You keep 100% of your earnings across all platforms.",
  },
]);

export default function Solutions() {
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Business Solutions & Agency Infrastructure | BNE Studio"
        description="Explore BNE Studio's core integrated solutions: Niche Intelligence, Strategic Advisory, Revenue Growth, and complete Business Infrastructure for adult creators."
        canonical="/solutions"
        schema={[solutionsSchema, faqSchema]}
        keywords="adult creator agency solutions, OnlyFans management solutions, creator business infrastructure, BNE studio services, creator monetization solutions"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">Integrated Agency Infrastructure</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              Architects of <span className="gradient-text-gold">Creator Empires</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              We do not sell fragmented services; we engineer complete business solutions. Each pillar of our agency infrastructure is designed to solve the exact friction points that prevent talented adult creators from scaling sustainable, 6-figure empires.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Apply for Partnership <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3.5 text-sm border border-slate-700 rounded-full text-slate-300 hover:border-slate-500 transition-colors">
                  Compare Solution Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 SOLUTIONS GRID ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">Pillars of Excellence</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">6 Integrated Solution Pillars</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_PILLARS.map((sol, i) => {
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
                          Explore Solution →
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

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Business Architecture</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Feedback on BNE Solutions"
        subtitle="Read how creators scaled their earnings using our integrated solution pillars."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I determine which solution pillar I need?", a: "Apply for a free confidential consultation. We audit your accounts and recommend the exact solution tier for your situation." },
              { q: "Do BNE solutions require long-term contracts?", a: "No. All BNE solutions operate on a 3-month initial term, converting to flexible month-to-month terms." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Deploy Integrated Solutions Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and let our agency build your complete business infrastructure.</p>
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
