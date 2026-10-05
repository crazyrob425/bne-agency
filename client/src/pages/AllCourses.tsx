/**
 * BNE Free Class Catalog (formerly "All Courses")
 * Blacklisted University is NOT a real school — it's a free educational resource
 * roleplaying as a cheeky adult creator university. No enrollment, no tuition,
 * no degrees, no real professors. Every "class" below is a free, in-depth
 * guide (articles, how-tos, tutorials) that actually exists on this site.
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
import { professors, getProfessorById, FACULTY_FICTION_NOTE } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Crown, BookOpen, ArrowRight, Zap, Shield, TrendingUp, Users,
  CheckCircle2, Clock, Award, Star, Lock, Sparkles, FileText, Gift, Heart
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

interface ClassRead {
  title: string;
  href: string;
}

const COURSES_CATALOG: {
  id: string;
  title: string;
  professor: (typeof professors)[number];
  tagline: string;
  description: string;
  modules: string[];
  reads: ClassRead[];
}[] = [
  {
    id: "legal-privacy",
    title: "Class 101: Sovereign Privacy & Legal Fortification",
    professor: professors[1], // Prof. Hayes
    tagline: "Taught in character by Professor Marcus Hayes",
    description: "The free legal-protection shelf: federal 18 U.S.C. § 2257 record-keeping, anonymous business structures, DMCA anti-piracy enforcement, and keeping your real identity sealed tighter than a redacted file. Read at your own pace — no timers, no homework, no pop quizzes.",
    modules: [
      "18 U.S.C. § 2257 Record-Keeping Standards & Audit Preparation",
      "Sovereign Identity Architecture & Anonymized Business Entities",
      "DMCA Takedown Dispatch & Piracy Suppression Systems",
      "Performer Contracts, Model Releases, & Co-Star Compliance",
    ],
    reads: [
      { title: "18 U.S.C. § 2257: The Compliance Guide You Can't Afford to Skip", href: "/blog/18-usc-2257-complete-guide-adult-creators" },
      { title: "The Anonymous Creator Playbook: Six Figures, Zero Paper Trail", href: "/blog/anonymous-creator-identity-protection-guide" },
      { title: "Your Content Is Being Stolen Right Now. Here's What to Do About It.", href: "/blog/dmca-anti-piracy-guide-adult-creators" },
      { title: "Creator Business 101: LLC, Tax & Money Setup", href: "/blog/creator-llc-taxes-business-structure-guide" },
    ],
  },
  {
    id: "niche-psychology",
    title: "Class 201: Niche Psychology & Fan Obsession",
    professor: professors[2], // Prof. Delacroix
    tagline: "Taught in character by Professor Isabelle Delacroix",
    description: "The free deep-dive shelf on what makes fans obsessed: niche selection, the psychology of loyalty, and turning casual subscribers into lifetime high-value fans. Pour something nice — this is the fun part of the library.",
    modules: [
      "The Niche Loyalty Index: Mapping 12 Audience Obsession Triggers",
      "Micro-Niche Selection & Sub-Culture Positioning",
      "PPV Sales Psychology: Curiosity Gaps & Narrative Arcs",
      "Subscriber Lifetime Value (LTV) Optimization",
    ],
    reads: [
      { title: "Why 1% of Creators Take Home 90% of the Money (And How to Be One of Them)", href: "/blog/power-law-niche-selection-adult-creator-economy" },
      { title: "The Kink Creator's Business Guide: The Most Loyal Audience in Adult", href: "/blog/bdsm-kink-niche-creator-guide" },
      { title: "Stop Obsessing Over New Subscribers. Your Money Is in the Ones You Already Have.", href: "/blog/fan-engagement-crm-subscriber-retention" },
    ],
  },
  {
    id: "monetization-architecture",
    title: "Class 301: Advanced Creator Monetization",
    professor: professors[0], // Dr. Sinclair
    tagline: "Taught in character by Dean Vivienne Sinclair",
    description: "The Dean's free master shelf on money: subscription tier engineering, PPV funnels, custom content rate cards, and stacking revenue streams so your income doesn't depend on a single platform's mood. The Dean insists your prices are too low. She's usually right.",
    modules: [
      "Subscription Tier Engineering & Price Elasticity Modeling",
      "24/7 DM Sales Funnels & Message Cohort Segmentation",
      "Custom Content Rate Card Design & Boundary Safeguards",
      "Passive Clip Store Syndication (ManyVids, Clips4Sale)",
    ],
    reads: [
      { title: "Beyond Subscriptions: The Advanced Monetization Stack", href: "/blog/ppv-custom-content-findom-advanced-monetization" },
      { title: "OnlyFans vs. Fansly vs. LoyalFans: Which Platform Deserves You", href: "/blog/onlyfans-vs-fansly-platform-comparison-2025" },
      { title: "From Content to Calls to Companionship: Portfolio Diversification", href: "/blog/adult-creator-portfolio-diversification-phone-sex-sexting-escort-2026" },
    ],
  },
  {
    id: "platform-ops",
    title: "Class 401: Platform Operations & Automation",
    professor: professors[3], // Prof. Okafor
    tagline: "Taught in character by Professor Ndidi Okafor",
    description: "The free operations shelf for creators who'd rather be creating: content calendars, cross-platform syndication, AI-assisted production, and the automation systems that let you look effortless. Manual reposting is a choice, and it's the wrong one.",
    modules: [
      "Omni-Platform Content Scheduling & Queueing SOPs",
      "Short-Form Social Funnel Syndication (Reddit, Twitter/X, TikTok)",
      "AI-Assisted Content Production Systems",
      "Delegating Operations & Managing Remote Chat Teams",
    ],
    reads: [
      { title: "The 90-Day Content Calendar That Keeps You Consistent", href: "/blog/content-calendar-strategy-adult-creators" },
      { title: "Earn More While Working Less: BNE Studio Managed Operations", href: "/blog/adult-creator-time-leverage-bne-studio-managed-operations-2026" },
      { title: "The Algorithm Playbook: Crack TikTok, Twitter/X & Reddit in 2026", href: "/blog/2026-platform-algorithm-adult-creator-ultimate-guide" },
      { title: "AI That Actually Pays You: Content Production Systems", href: "/blog/ai-content-production-augmentation-for-creators-2026" },
    ],
  },
  {
    id: "inperson-mastery",
    title: "Class 501: In-Person Companion Safety & Booking",
    professor: professors[5], // Prof. Castillo
    tagline: "Taught in character by Professor Reina Castillo",
    description: "The free safety-first shelf for in-person companions and escorts: client screening, safety protocols, and diversifying into cam and content income. Reina's rule: no booking is worth your safety, and she'll fight anyone who disagrees.",
    modules: [
      "3-Step Corporate Screening & Identity Verification",
      "VOIP Call Shielding & Contact Isolation Protocols",
      "Two-Point Safety Check-In & Emergency Dispatch Setup",
      "Diversifying In-Person Income Into Cam & Content",
    ],
    reads: [
      { title: "From Companion Dates to Cam Room: Building Sustainable Income", href: "/blog/escort-to-cam-model-content-creator-diversification-bne-studio" },
      { title: "From In-Person to Indoors: Passive Income with Webcam & OnlyFans/Fansly", href: "/blog/in-person-companion-webcam-onlyfans-fansly-passive-income-guide" },
      { title: "From Content to Calls to Companionship: Portfolio Diversification", href: "/blog/adult-creator-portfolio-diversification-phone-sex-sexting-escort-2026" },
    ],
  },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Blacklisted University Free Class Catalog",
  "description": "Free in-depth creator education guides covering 18 U.S.C. 2257 compliance, niche psychology, monetization architecture, platform operations, and companion safety. Not a real school — a playful free educational resource.",
  "isAccessibleForFree": true,
  "learningResourceType": "Guide",
  "provider": {
    "@type": "Organization",
    "name": "Blacklisted Niche Entertainment",
    "sameAs": "https://blacklisted.studio"
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "Do I need to enroll in Blacklisted University?",
    answer: "No — there's nothing to enroll in. Blacklisted University isn't a real school; it's our free educational library dressed up in a sexy mortarboard. Every guide is free, no account or signup needed.",
  },
  {
    question: "How long does each class take?",
    answer: "They're in-depth guides and articles, not timed courses — read at your own pace. No durations, no deadlines, no homework, no pop quizzes. We promise.",
  },
  {
    question: "Are the professors real?",
    answer: "Nope — our professors are fictional characters, playful personas our content team writes in. Zero real professors were hired in the making of this university.",
  },
  {
    question: "Is everything really free?",
    answer: "Yes. Every guide, article, and tutorial in the Blacklisted University library is 100% free, forever. (Our done-for-you management services are a separate, very optional thing.)",
  },
]);

export default function AllCourses() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Blacklisted_Niche_Entertainment_University_Course_Study_podcast");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Blacklisted University Free Class Catalog | Creator Guides"
        description="Browse Blacklisted University's free class guides: 2257 compliance, niche psychology, monetization, platform automation, and companion safety. No enrollment, no tuition — just free in-depth creator education."
        canonical="/all-courses"
        schema={[courseSchema, faqSchema]}
        keywords="free creator guides, OnlyFans education free, 2257 compliance guide, creator monetization guide, Blacklisted University"
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
              The Free <span className="gradient-text-gold">Class Catalog</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-6 font-body leading-relaxed">
              Every "class" below is a free, in-depth guide we actually wrote — deep dives on legal protection, niche psychology, monetization, automation, and companion safety. Pick a shelf, grab your favorite professor (they're fictional, they're fabulous), and learn at your own pace.
            </p>
            {/* Honesty banner: not a real school */}
            <div className="max-w-2xl mx-auto mb-8 px-5 py-3.5 rounded-2xl border border-[oklch(0.78_0.16_85/25%)] bg-[oklch(0.78_0.16_85/5%)] flex items-start gap-3 text-left">
              <Gift size={18} className="text-[oklch(0.78_0.16_85)] shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-300 font-body leading-relaxed">
                <span className="font-semibold text-[oklch(0.78_0.16_85)]">Not a real school, just a fun theme.</span>{" "}
                No enrollment, no tuition, no degrees, no real professors — Blacklisted University is our free educational library roleplaying as a cheeky creator university. Everything here is free, forever.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/university">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <BookOpen size={16} /> Enter Main University <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/guides">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Browse Free Guides
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

      {/* ── CLASS CATALOG LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">The Shelves</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Five Classes, Zero Tuition</h2>
            <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">Each class is a bundle of our free in-depth guides on that subject — the actual articles and tutorials, written in character by that class's professor.</p>
          </div>

          <div className="space-y-8">
            {COURSES_CATALOG.map((course, i) => (
              <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold flex items-center gap-1">
                        <Gift size={12} /> Free Forever
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{course.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{course.description}</p>

                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Deep-Dive Topics Inside</h4>
                    <div className="grid sm:grid-cols-2 gap-2 mb-6">
                      {course.modules.map(mod => (
                        <div key={mod} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold flex items-center gap-1.5">
                      <FileText size={12} /> Read the actual free guides
                    </h4>
                    <div className="space-y-2">
                      {course.reads.map(read => (
                        <Link key={read.href} href={read.href}>
                          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[oklch(0.78_0.16_85/40%)] transition-all cursor-pointer group">
                            <span className="text-sm text-slate-300 group-hover:text-white leading-snug">{read.title}</span>
                            <ArrowRight size={14} className="text-[oklch(0.78_0.16_85)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Class Character</div>
                      <AuthorBio professor={course.professor} variant="compact" />
                      <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-body italic">
                        Fictional character — a playful persona our content team writes in.
                      </p>
                    </div>
                    <Link href={course.reads[0].href}>
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Start Reading Free →
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
        title="Creator Reviews"
        subtitle="What creators say about applying Blacklisted University's free guides to their business."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do the guides come with downloadable reference documents?", a: "Yes. Our guides link to downloadable PDF checklists, § 2257 compliance templates, and rate card workbooks — all free." },
              { q: "Are guides updated as platform policies change?", a: "Yes. Our content team updates the guides as platform algorithms, legal requirements, and market trends shift." },
              { q: "Can I share these guides with other creators?", a: "Please do. They're free for everyone — send the link, not the homework (there is none)." },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-5">
              <Heart size={14} className="text-emerald-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Free forever · No enrollment · No tuition</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Start Learning — It's All Free</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Dive into the full free library of creator guides, tutorials, and deep-dives. No signup, no student ID, no dean's office.</p>
            <Link href="/university">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Browse the Free Library →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
