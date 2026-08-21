/**
 * BNE Intelligence Hub Page
 * Executive intelligence center for creator market research, platform algorithm audits,
 * pricing trends, and empirical case studies across the adult entertainment economy.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorById } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import { articles, getFeaturedArticles } from "@/data/blogArticles";
import {
  BookOpen, Layers, TrendingUp, Search, ArrowRight, Shield,
  Cpu, BarChart3, LineChart, FileText, Sparkles, Target
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const INTELLIGENCE_PILLARS = [
  {
    icon: LineChart,
    title: "Market Analysis & Search Volume Audits",
    description: "Empirical keyword tracking, search volume trends, and sub-niche saturation index reports updated monthly.",
    detail: "Knowing which sub-niches are expanding versus declining allows creators to pivot content production before platform saturation occurs. Our intelligence desk monitors search queries across 1,000+ adult content sub-categories.",
  },
  {
    icon: BarChart3,
    title: "Platform Algorithm & Paywall Dynamics",
    description: "Reverse-engineering platform ranking algorithms across OnlyFans, Fansly, Reddit, Twitter/X, and ManyVids.",
    detail: "Subscription platforms update recommendation feeds and discoverability metrics constantly. We track feed velocity signals, PPV open rate benchmarks, and account shadowban triggers to keep your funnel operational.",
  },
  {
    icon: Shield,
    title: "Legal & Regulatory Compliance Intelligence",
    description: "Tracking state, federal, and international legal developments affecting adult content creation, payment processing, and § 2257 compliance.",
    detail: "From legislative shifts in state age verification mandates to federal 18 U.S.C. § 2257 record-keeping enforcement, our legal intelligence team ensures your business remains fully compliant ahead of regulatory changes.",
  },
  {
    icon: Cpu,
    title: "Technology & AI Workflow Audits",
    description: "Testing cutting-edge creator tools: AI voice cloning safeguards, automated watermarking, DM chat analytics, and encrypted data vaults.",
    detail: "Technology shifts rapidly. We test new software tools, payment gateways, and security protocols to evaluate real-world utility and security before recommending them to our managed partners.",
  },
];

const intelligenceSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "B.N.E. Intelligence Hub",
  "url": "https://blacklisted.studio/intelligence",
  "description": "The B.N.E. Studio Intelligence Hub. Access our complete library of articles, industry analysis, trend reports, and case studies on the adult creator economy.",
};

const faqSchema = buildFaqSchema([
  {
    question: "What is the BNE Intelligence Hub?",
    answer: "The BNE Intelligence Hub is an open-source brain trust providing empirical market research, algorithm audits, legal compliance reports, and monetization strategies for adult content creators.",
  },
  {
    question: "How often is market research updated in the Intelligence Hub?",
    answer: "Market trend reports, search volume audits, and platform algorithm analyses are updated monthly by BNE Studio strategists and Blacklisted University faculty.",
  },
  {
    question: "Can independent creators access BNE Intelligence reports?",
    answer: "Yes. All articles, market analyses, and trend reports published in the Intelligence Hub are publicly available for independent creators.",
  },
]);

export default function Intelligence() {
  const featured = getFeaturedArticles().slice(0, 3);
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Intelligence Hub | Creator Economy Market Research — BNE Studio"
        description="Access the BNE Intelligence Hub for empirical market research, platform algorithm audits, legal compliance updates, and adult creator revenue playbooks."
        canonical="/intelligence"
        schema={[intelligenceSchema, faqSchema]}
        keywords="adult creator market research, OnlyFans algorithm analysis, 2257 compliance news, creator economy trends, adult entertainment market analysis"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 mb-6">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 mono-stat">Executive Research Desk</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              The Knowledge That Powers <span className="gradient-text-gold">Creator Empires</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              This is BNE Studio's open-source brain trust. Access our complete library of empirical market research, platform algorithm audits, legal compliance updates, and revenue optimization playbooks from the front lines of the adult creator economy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Browse All {articles.length} Research Articles <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/niche-matcher">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3.5 text-sm border border-slate-700 rounded-full text-slate-300 hover:border-slate-500 transition-colors">
                  Run Niche Matcher Engine
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 INTELLIGENCE PILLARS ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">Research Focus Areas</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">4 Pillars of BNE Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INTELLIGENCE_PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                    <pillar.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{pillar.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{pillar.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Releases</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2">Latest Intelligence Reports</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <motion.div key={article.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Link href={`/blog/${article.slug}`}>
                  <div className="bg-slate-900/60 p-6 border border-slate-800 rounded-2xl h-full group cursor-pointer hover:border-blue-500/40 transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mono-stat mb-3 block">{article.category}</span>
                      <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Space Grotesk' }}>{article.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                    </div>
                    <div className="text-xs text-slate-500 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span>{article.readTime}</span>
                      <span className="text-blue-400 group-hover:underline flex items-center gap-1">Read Report →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold-outline px-8 py-3 text-sm">
                Explore All {articles.length} Research Articles →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Research Desk Faculty Director</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Feedback on BNE Intelligence"
        subtitle="Read how independent creators use our market research reports to make data-driven business decisions."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Where does BNE source its market intelligence data?", a: "Data is aggregated from anonymized platform analytics, search volume trends across 1,000+ sub-niches, and empirical performance metrics across our managed creator portfolio." },
              { q: "Can I cite BNE Intelligence reports in research?", a: "Yes. All reports published in the Intelligence Hub may be cited with attribution to BNE Studio." },
              { q: "How do I subscribe to new intelligence reports?", a: "New research articles are published weekly to our main blog at blacklisted.studio/blog." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Leverage Empire-Level Market Intelligence</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get custom market research and sub-niche analysis for your brand.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for BNE Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
