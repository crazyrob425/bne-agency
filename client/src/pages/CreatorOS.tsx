/**
 * BNE Creator OS Page
 * Central command Operating System for adult content creators: Creator Suite,
 * Resource Vault, Automation Engines, and integrated business dashboards.
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
  Wrench, Package, Zap, ArrowRight, Calculator, FileText,
  Calendar, BarChart3, Download, Home, Search, Shield, CheckCircle2, Cpu
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const CATEGORIES = [
  {
    name: "1. Creator Suite (Command Center)",
    description: "Central dashboard for managing your multi-platform content queue, subscriber analytics, revenue projections, and operational tasks.",
    icon: Home,
    href: "/tools",
    tools: [
      { name: "Executive Dashboard", icon: BarChart3, href: "/tools" },
      { name: "Content Queue Manager", icon: Calendar, href: "/tools/workflow-manager" },
      { name: "Performance Analytics", icon: Zap, href: "/tools" },
    ]
  },
  {
    name: "2. Resource Vault (Downloadable SOPs)",
    description: "Complete library of § 2257 legal compliance forms, Brand Playbook PDFs, classified ad templates, and custom rate card calculators.",
    icon: Package,
    href: "/downloads",
    tools: [
      { name: "Download Library", icon: Download, href: "/downloads" },
      { name: "Legal & 2257 Templates", icon: FileText, href: "/downloads" },
      { name: "Brand Playbook Dossiers", icon: Package, href: "/downloads" },
    ]
  },
  {
    name: "3. Automation Engines (AFK Systems)",
    description: "Software utilities that work while you AFK: Income Verifier calculators, automated DM drip funnels, and clip store syndication.",
    icon: Zap,
    href: "/tools",
    tools: [
      { name: "Workflow Manager", icon: Zap, href: "/tools/workflow-manager" },
      { name: "Income Verifier Tool", icon: Calculator, href: "/tools/calculator" },
      { name: "Strategy Engine", icon: FileText, href: "/tools/strategy-engine" },
    ]
  },
];

const osSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "B.N.E. Creator OS",
  "operatingSystem": "Web",
  "applicationCategory": "BusinessApplication",
  "description": "The unified operating system for B.N.E. Studio creators, combining the Creator Suite, Resource Vault, and Automation tools into a single web ecosystem.",
  "publisher": {
    "@type": "Organization",
    "name": "B.N.E. Studio"
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "What is BNE Creator OS?",
    answer: "BNE Creator OS is a web-based operating system that unifies content scheduling, subscriber analytics, legal compliance templates, and revenue calculators in one central hub.",
  },
  {
    question: "How do I get access to Creator OS?",
    answer: "Access is granted to all BNE Studio managed creators and Blacklisted University enrolled members.",
  },
  {
    question: "Does Creator OS run on mobile devices?",
    answer: "Yes. Creator OS is fully responsive and optimized for desktop, tablet, and mobile browsers.",
  },
]);

export default function CreatorOS() {
  const opsProfessor = getProfessorByExpertise("operations platform automation");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator OS | Unified Creator Business Operating System — BNE Studio"
        description="Access BNE Creator OS: the unified web operating system combining Creator Suite dashboards, Resource Vault downloads, and AFK Automation Engines."
        canonical="/creator-os"
        schema={[osSchema, faqSchema]}
        keywords="creator operating system, OnlyFans dashboard OS, creator business software, creator OS BNE, adult creator workflow OS"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
              <Wrench className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 mono-stat">Unified Operating System</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              Your Business, <span className="gradient-text-gold">Unified</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              Welcome to Creator OS: the central operating system for your creator business. We have merged your content calendar, subscriber analytics, § 2257 compliance templates, and revenue calculators into a single web platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Launch Creator OS Dashboard <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3.5 text-sm border border-slate-700 rounded-full text-slate-300 hover:border-slate-500 transition-colors">
                  Apply for Partnership Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 CATEGORIES GRID ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">System Pillars</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Creator OS Core Modules</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 font-display">{cat.name}</h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{cat.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {cat.tools.map(t => (
                        <Link key={t.name} href={t.href}>
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer text-slate-300 hover:text-white transition-all">
                            <t.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span className="text-xs font-medium">{t.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href={cat.href}>
                    <button className="w-full py-2.5 rounded-lg btn-gold text-xs font-semibold">
                      Open Module →
                    </button>
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
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Operating System Architecture</div>
          <AuthorBio professor={opsProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator OS User Feedback"
        subtitle="Read how creators operate their business on autopilot using Creator OS."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is Creator OS secure?", a: "Yes. All data stored in Creator OS uses enterprise-grade encryption with zero public index exposure." },
              { q: "Can I manage multiple accounts in Creator OS?", a: "Yes. Managed accounts support multi-platform synchronization across OnlyFans, Fansly, and clip stores." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Unify Your Creator Business Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get full access to Creator OS.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Creator OS Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
