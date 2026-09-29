/**
 * Free Creator Tools — every free AI-powered and utility web app on the site,
 * categorized by the creator type each tool matches best. Linked from main nav.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Calculator,
  Sparkles,
  CreditCard,
  CalendarDays,
  Megaphone,
  Target,
  MessageSquare,
  Shield,
  Link2,
  TrendingUp,
  Workflow,
  Camera,
  Search,
  Clapperboard,
  Crown,
  ArrowUpRight,
  Zap,
  Heart,
  Video,
  Globe,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

interface FreeTool {
  name: string;
  pitch: string;
  href: string;
  icon: typeof Calculator;
  ai?: boolean;
  badge?: string;
  alsoFor?: string;
  featured?: boolean;
}

interface CreatorSection {
  id: string;
  icon: typeof Heart;
  label: string;
  title: string;
  description: string;
  tools: FreeTool[];
}

const SECTIONS: CreatorSection[] = [
  {
    id: "onlyfans",
    icon: Heart,
    label: "Fan-platform creators",
    title: "For OnlyFans Creators",
    description:
      "Tools engineered for subscription-platform operators — chatters that never sleep, calendars that post for you, analytics that tell you what prints, and armor for your content.",
    tools: [
      {
        name: "FanBot Pro",
        pitch: "Build a custom AI chatbot trained in your texting style that handles fan inquiries, screening questions, and sales 24/7.",
        href: "/tools/fanbot-builder",
        icon: MessageSquare,
        ai: true,
        badge: "AI",
        alsoFor: "Webcam",
      },
      {
        name: "CreatorPush Calendar",
        pitch: "AI-powered content calendar with optimal posting times, cross-platform scheduling, and auto-generated captions.",
        href: "/tools/content-calendar",
        icon: CalendarDays,
        ai: true,
        badge: "Popular",
        alsoFor: "Webcam",
      },
      {
        name: "CreatorPulse Analytics",
        pitch: "AI-generated insights from your engagement data — know exactly what content drives tips and subscriptions.",
        href: "/tools/creator-pulse",
        icon: TrendingUp,
        ai: true,
        badge: "AI",
        alsoFor: "Webcam",
      },
      {
        name: "BrandStamp Watermark",
        pitch: "Batch-watermark hundreds of images and videos so your content can't be reposted without your name on it.",
        href: "/tools/brandstamp",
        icon: Shield,
        alsoFor: "Webcam",
      },
      {
        name: "TeaserForge",
        pitch: "Upload a full-length video and let AI clip the best moments into 2–10 teaser clips with zoom effects and your watermark.",
        href: "/tools/teaser-forge",
        icon: Clapperboard,
        ai: true,
        badge: "AI",
        alsoFor: "Webcam",
      },
      {
        name: "SilentRank",
        pitch: "Audit your OnlyFans, Fansly, and creator bios for platform compliance and SEO with AI-enhanced keyword suggestions.",
        href: "/tools/silent-rank",
        icon: Search,
        ai: true,
        badge: "AI",
      },
      {
        name: "CreatorHub Link-in-Bio",
        pitch: "Build a customizable, NSFW-friendly landing page with fan gates, tip menus, and deep analytics.",
        href: "/tools/creator-link",
        icon: Link2,
        alsoFor: "Webcam · Companions",
      },
      {
        name: "BlacklistedLinks",
        pitch: "A luxurious black-and-gold link-in-bio page for adult creators, with platform-optimized links and premium styling.",
        href: "/tools/blacklisted-links",
        icon: Crown,
        alsoFor: "Webcam · Companions",
      },
      {
        name: "All-in-One Creator Calculator",
        pitch: "The industry's most sophisticated revenue projector — earnings across OnlyFans, Fansly, cam sites, PPV, taxes, and ROI.",
        href: "/tools/calculator",
        icon: Calculator,
        badge: "Popular",
        alsoFor: "Webcam · Companions",
      },
    ],
  },
  {
    id: "webcam",
    icon: Video,
    label: "Live broadcasters",
    title: "For Webcam Models",
    description:
      "Tools tuned for live broadcasters — show planning, room psychology, and the automation that keeps regulars spending between shows.",
    tools: [
      {
        name: "SceneForge Storyboard",
        pitch: "Plan every broadcast with AI-generated show ideas, pose suggestions, and lighting setups that keep rooms tipping.",
        href: "/tools/sceneforge",
        icon: Camera,
        ai: true,
        badge: "AI",
      },
      {
        name: "Content Strategy Engine",
        pitch: "Generate show scripts and content prompts tailored to your niche using behavioral psychology frameworks.",
        href: "/tools/strategy-engine",
        icon: Sparkles,
        ai: true,
        badge: "AI",
        alsoFor: "OnlyFans",
      },
      {
        name: "AutoPilot Workflows",
        pitch: "No-code workflow automation for fan lifecycle management, re-engagement campaigns, and VIP tracking.",
        href: "/tools/autopilot-studio",
        icon: Workflow,
        alsoFor: "OnlyFans",
      },
    ],
  },
  {
    id: "companions",
    icon: Globe,
    label: "Independent providers",
    title: "For In-Person Companions",
    description:
      "Tools engineered for in-person professionals — advertising that posts itself across cities, verification paperwork, and business infrastructure.",
    tools: [
      {
        name: "Classified Ads Generator",
        pitch:
          "Our AI-powered classified poster with geo-rotation: write one high-conversion ad and rotate it across cities and directories — SkipTheGames, TNABoard, and adult service boards — on autopilot.",
        href: "/tools/classified-generator",
        icon: Megaphone,
        ai: true,
        badge: "Geo-rotator",
        featured: true,
      },
      {
        name: "Professional Income Verifier",
        pitch: "Generate bank-ready pay stubs for housing applications, credit approvals, and financial services.",
        href: "/tools/income-verifier",
        icon: CreditCard,
      },
      {
        name: "Niche Intelligence Engine",
        pitch: "Advanced niche matching using power-law distribution data to find the most profitable positioning for your brand and market.",
        href: "/niche-matcher",
        icon: Target,
        ai: true,
        badge: "AI",
        alsoFor: "OnlyFans · Webcam",
      },
      {
        name: "Workflow & Burnout Manager",
        pitch: "A visual work-schedule generator that reveals the true labor volume of your operation — and where to reclaim your time.",
        href: "/tools/workflow-manager",
        icon: CalendarDays,
        alsoFor: "OnlyFans · Webcam",
      },
    ],
  },
];

function ToolCard({ tool, index }: { tool: FreeTool; index: number }) {
  const Icon = tool.icon;

  if (tool.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="sm:col-span-2 lg:col-span-3"
      >
        <Link href={tool.href}>
          <div className="group relative overflow-hidden rounded-2xl border border-[oklch(0.78_0.16_85/35%)] bg-gradient-to-r from-[oklch(0.78_0.16_85/10%)] via-white/[0.04] to-transparent p-6 sm:p-8 transition-all duration-300 hover:border-[oklch(0.78_0.16_85/60%)] cursor-pointer">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[oklch(0.78_0.16_85/12%)] blur-[80px] pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] border border-[oklch(0.78_0.16_85/35%)] flex items-center justify-center">
                <Icon className="h-7 w-7 text-[oklch(0.78_0.16_85)]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {tool.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[oklch(0.78_0.16_85/20%)] border border-[oklch(0.78_0.16_85/40%)] text-[oklch(0.85_0.14_85)]">
                      {tool.badge}
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                    Free
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-1.5" style={{ fontFamily: "Space Grotesk" }}>
                  {tool.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl" style={{ fontFamily: "DM Sans" }}>
                  {tool.pitch}
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-2 text-[oklch(0.85_0.14_85)] font-semibold text-sm group-hover:gap-3 transition-all">
                Launch free <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link href={tool.href}>
        <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.16_85/45%)] hover:bg-white/[0.05] cursor-pointer flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/12%)] border border-[oklch(0.78_0.16_85/25%)] flex items-center justify-center">
              <Icon className="h-6 w-6 text-[oklch(0.78_0.16_85)]" />
            </div>
            <div className="flex gap-1.5">
              {tool.badge && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[oklch(0.78_0.16_85/20%)] border border-[oklch(0.78_0.16_85/40%)] text-[oklch(0.85_0.14_85)]">
                  {tool.badge}
                </span>
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                Free
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-snug" style={{ fontFamily: "Space Grotesk" }}>
            {tool.name}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "DM Sans" }}>
            {tool.pitch}
          </p>
          {tool.alsoFor && (
            <p className="text-[11px] text-zinc-500 mb-4" style={{ fontFamily: "DM Sans" }}>
              Also great for: <span className="text-zinc-400 font-medium">{tool.alsoFor}</span>
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-[oklch(0.85_0.14_85)] text-sm font-semibold group-hover:gap-2.5 transition-all">
            Launch free <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FreeCreatorTools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Free Creator Tools — AI Apps & Utilities for Adult Creators"
        description="Every free tool on Blacklisted Studio, matched to your creator type: AI-powered classified ad posters with geo-rotation for companions, AI chatters and analytics for OnlyFans creators, show planners for webcam models. No signup, no catch."
        canonical="/free-creator-tools"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.78_0.16_85/7%)] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[oklch(0.78_0.16_85/8%)] blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                100% free — no signup, no catch
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
              <span className="text-zinc-100">Free Creator Tools</span>
              <br />
              <span className="gradient-text">Matched to Your Lane</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: "DM Sans" }}>
              Sixteen web apps, each filed under the creator type it serves best —
              fan-platform creators, webcam models, or in-person companions.
              Find your lane, grab your arsenal.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white/[0.05] border border-white/15 text-zinc-300 hover:border-[oklch(0.78_0.16_85/50%)] hover:text-[oklch(0.85_0.14_85)] transition-colors">
                  <s.icon className="h-3.5 w-3.5" /> {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Creator-type sections */}
      {SECTIONS.map((section, si) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-16 sm:py-20 scroll-mt-24 ${si % 2 === 1 ? "bg-[oklch(0.07_0.008_85)] border-y border-white/[0.06]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <span className="inline-flex items-center gap-2 text-[oklch(0.78_0.16_85)] text-xs font-semibold uppercase tracking-[0.2em]">
                <section.icon className="h-3.5 w-3.5" /> {section.label}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mt-3 mb-3" style={{ fontFamily: "Space Grotesk" }}>
                {section.title}
              </h2>
              <p className="text-zinc-400 max-w-2xl leading-relaxed" style={{ fontFamily: "DM Sans" }}>
                {section.description}
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.tools.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "Space Grotesk" }}>
              Tools Are Free. <span className="gradient-text">The Team Isn't.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: "DM Sans" }}>
              Use every tool above for free, forever. When you're ready for humans to run the whole
              operation — chatters, posting, screening, scaling — that's what BNE management is for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold cursor-pointer">
                  Get Managed <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/university">
                <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all cursor-pointer">
                  Watch Free Courses
                </span>
              </Link>
              <Link href="/free-software">
                <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-200 text-base font-semibold hover:bg-sky-500/15 transition-all cursor-pointer">
                  Browse 40 Free Apps
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
