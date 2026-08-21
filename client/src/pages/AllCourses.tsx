/**
 * BNE All Courses Page
 * Complete Blacklisted University course catalog with full module breakdowns,
 * faculty professor bios, Video Player integration, Course JSON-LD schema, and enrollment pathways.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorById } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Crown, BookOpen, ArrowRight, Zap, Shield, TrendingUp, Users,
  CheckCircle2, Clock, Award, Star, Lock, Sparkles, FileText
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const COURSES_CATALOG = [
  {
    id: "legal-privacy",
    title: "101: Sovereign Privacy & Legal Fortification",
    professor: professors[1], // Prof. Hayes
    duration: "4.5 Hours",
    level: "Essential / All Levels",
    description: "Complete legal protection framework for adult content creators. 18 U.S.C. § 2257 compliance, LLC business entity structuring, DMCA anti-piracy enforcement, and identity separation.",
    modules: [
      "18 U.S.C. § 2257 Record-Keeping Standards & Audit Preparation",
      "Sovereign Identity Architecture & Anonymized Business Entities",
      "DMCA Takedown Dispatch & Piracy Suppression Systems",
      "Performer Contracts, Model Releases, & Co-Star Compliance",
    ],
  },
  {
    id: "niche-psychology",
    title: "201: Niche Psychology & Fan Obsession Cultivation",
    professor: professors[2], // Prof. Delacroix
    duration: "6.0 Hours",
    level: "Intermediate",
    description: "Deep dive into consumer behavior and fan psychology across 1,052 adult sub-niches. Map psychological obsession triggers, price elasticity, and high-ticket subscriber retention.",
    modules: [
      "The Niche Loyalty Index: Mapping 12 Audience Obsession Triggers",
      "Micro-Niche Selection & Sub-Culture Positioning",
      "PPV Sales Psychology: Curiosity Gaps & Narrative Arcs",
      "Subscriber Lifetime Value (LTV) Optimization",
    ],
  },
  {
    id: "monetization-architecture",
    title: "301: Advanced Creator Monetization Systems",
    professor: professors[0], // Dr. Sinclair
    duration: "5.5 Hours",
    level: "Advanced",
    description: "Engineered multi-stream revenue architecture. Subscription paywall tiering, automated PPV message funnels, custom rate card engineering, and clip store syndication.",
    modules: [
      "Subscription Tier Engineering & Price Elasticity Modeling",
      "24/7 DM Sales Funnels & Message Cohort Segmentation",
      "Custom Content Rate Card Design & Boundary Safeguards",
      "Passive Clip Store Syndication (ManyVids, Clips4Sale)",
    ],
  },
  {
    id: "platform-ops",
    title: "401: Digital Operations & Platform Automation",
    professor: professors[3], // Prof. Okafor
    duration: "4.0 Hours",
    level: "Advanced / Agency Level",
    description: "Transitioning from solo creator burnout to automated agency infrastructure. 30-day content calendar queues, cross-platform traffic syndication, and fan CRM systems.",
    modules: [
      "Omni-Platform Content Scheduling & Queueing SOPs",
      "Short-Form Social Funnel Syndication (Reddit, Twitter/X, TikTok)",
      "Media Asset Vaulting & Encrypted Cloud Backup Systems",
      "Delegating Operations & Managing Remote Chat Teams",
    ],
  },
  {
    id: "inperson-mastery",
    title: "501: In-Person Companion Safety & Booking Management",
    professor: professors[5], // Prof. Castillo
    duration: "5.0 Hours",
    level: "Specialized / High-Ticket",
    description: "Comprehensive safety, screening, and logistics framework for high-end companions, escorts, and physical performers operating in major West Coast markets.",
    modules: [
      "3-Step Corporate Screening & Identity Verification",
      "VOIP Call Shielding & Contact Isolation Protocols",
      "Two-Point Safety Check-In & Emergency Dispatch Setup",
      "City Tour Logistics, Classified Ads, & Calendar Fills",
    ],
  },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Blacklisted University Masterclass Series",
  "description": "Comprehensive video lectures, audio studies, and masterclasses covering creator privacy law, § 2257 compliance, niche psychology, monetization architecture, and platform operations.",
  "provider": {
    "@type": "Organization",
    "name": "Blacklisted Niche Entertainment",
    "sameAs": "https://blacklisted.studio"
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "Who can enroll in Blacklisted University courses?",
    answer: "Blacklisted University courses are open to all active and aspiring adult content creators, companions, webcam models, and agency operators seeking professional education.",
  },
  {
    question: "Are Blacklisted University courses self-paced?",
    answer: "Yes. All video lectures, audio podcasts, and downloadable print materials are accessible 24/7 on demand.",
  },
  {
    question: "Who teaches Blacklisted University masterclasses?",
    answer: "Courses are taught by Blacklisted University faculty personas specializing in legal compliance, behavioral psychology, digital infrastructure, and creator economics.",
  },
  {
    question: "Is course access included with BNE Studio management tiers?",
    answer: "Yes. Full access to Blacklisted University's complete vault is included for all managed creators across our Starter, Pro, and Elite tiers.",
  },
]);

export default function AllCourses() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Blacklisted_Niche_Entertainment_University_Course_Study_podcast");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Blacklisted University Course Catalog | Adult Creator Masterclasses"
        description="Explore all Blacklisted University courses: 18 U.S.C. 2257 compliance, niche psychology, monetization architecture, platform operations, and companion safety."
        canonical="/all-courses"
        schema={[courseSchema, faqSchema]}
        keywords="adult creator courses, OnlyFans training masterclass, 2257 compliance course, creator monetization academy, Blacklisted University"
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
              Complete <span className="gradient-text-gold">Course Catalog</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Professional education built exclusively for the adult entertainment industry. Master sovereign legal compliance, § 2257 auditing, niche fan psychology, automated revenue engines, and companion safety.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/university">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <BookOpen size={16} /> Enter Main University <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Enroll in Vault Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED LECTURE VIDEO ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Audio & Video Study</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">University Orientation & Course Study</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Listen to the founding lecture outlining Blacklisted University's core educational philosophy and business framework.</p>
          </div>
          {video && (
            <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-2xl">
              <VideoPlayer src={video.url} title={video.title} description={video.description} />
            </div>
          )}
        </div>
      </section>

      {/* ── COURSE CATALOG LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Core Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Masterclass Series</h2>
          </div>

          <div className="space-y-8">
            {COURSES_CATALOG.map((course, i) => (
              <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">{course.level}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{course.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{course.description}</p>
                    
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Course Modules</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {course.modules.map(mod => (
                        <div key={mod} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Faculty Lead</div>
                      <AuthorBio professor={course.professor} variant="compact" />
                    </div>
                    <Link href="/apply">
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Enroll in Course →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Student & Creator Reviews"
        subtitle="What active creators say about applying Blacklisted University masterclasses to their business."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I access Blacklisted University courses?", a: "Courses are available to all BNE managed partners and individual enrollment subscribers through our learning portal." },
              { q: "Do courses come with downloadable reference documents?", a: "Yes. Every masterclass includes downloadable PDF checklists, § 2257 compliance templates, and rate card workbooks." },
              { q: "Are courses updated as platform policies change?", a: "Yes. Our faculty updates lectures quarterly to reflect new platform algorithms, legal changes, and market trends." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Enroll in Blacklisted University Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Gain immediate access to our complete vault of creator education, legal templates, and monetization masterclasses.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Instant Vault Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
