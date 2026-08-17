import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Calculator, FileText, Calendar, CreditCard, Zap, ChevronRight, Users, Target, Sparkles, BarChart3, Clock, MessageSquare, Shield, Link2, TrendingUp, Workflow, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";

interface ToolCard {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: "violet" | "emerald" | "amber" | "blue" | "rose" | "cyan";
  href: string;
  tags: string[];
  popular?: boolean;
}

const TOOL_CARDS: ToolCard[] = [
  {
    id: "calculator",
    name: "All-in-One Creator Calculator",
    description: "The most sophisticated revenue projection tool in the industry. Calculates earnings across OnlyFans, Fansly, cam sites, and multi-platform revenue.",
    icon: Calculator,
    color: "violet",
    href: "/tools/calculator",
    tags: ["Earnings", "Taxes", "ROI", "PPV"],
    popular: true,
  },
  {
    id: "strategy-engine",
    name: "Content Strategy Engine",
    description: "Generate script ideas and content prompts tailored to your niche. Uses behavioral psychology frameworks.",
    icon: Sparkles,
    color: "emerald",
    href: "/tools/strategy-engine",
    tags: ["Scripts", "Niche", "Psychology"],
  },
  {
    id: "income-verifier",
    name: "Professional Income Verifier",
    description: "Generate bank-ready pay stubs for housing applications, credit approvals, and financial services.",
    icon: CreditCard,
    color: "blue",
    href: "/tools/income-verifier",
    tags: ["Paystub", "Verification", "Banking"],
  },
  {
    id: "workflow-manager",
    name: "Workflow & Burnout Manager",
    description: "Visual work schedule generator revealing the true labor volume of solo creator success.",
    icon: Calendar,
    color: "amber",
    href: "/tools/workflow-manager",
    tags: ["Schedule", "Time", "Productivity"],
  },
  {
    id: "classified-generator",
    name: "Classified Ads Generator",
    description: "Create high-conversion ads for SkipTheGames, TNABoard, and adult service directories.",
    icon: FileText,
    color: "rose",
    href: "/tools/classified-generator",
    tags: ["Ads", "Escort", "Marketing"],
  },
  {
    id: "niche-matcher",
    name: "Niche Intelligence Engine",
    description: "Advanced niche matching using power-law distribution data to identify profitable opportunities.",
    icon: Target,
    color: "cyan",
    href: "/niche-matcher",
    tags: ["Niche", "Market", "Strategy"],
  },
  {
    id: "content-calendar",
    name: "CreatorPush Calendar",
    description: "AI-powered content calendar with optimal posting times, cross-platform scheduling, and automated caption generation.",
    icon: Calendar,
    color: "rose",
    href: "/tools/content-calendar",
    tags: ["AI", "Scheduling", "Automation"],
    popular: true,
  },
  {
    id: "fanbot-builder",
    name: "FanBot Pro",
    description: "Build a custom AI chatbot that mimics your texting style and handles fan inquiries 24/7.",
    icon: MessageSquare,
    color: "violet",
    href: "/tools/fanbot-builder",
    tags: ["AI", "Chatbot", "Automation"],
  },
  {
    id: "brandstamp",
    name: "BrandStamp Watermark",
    description: "Batch watermark hundreds of images and videos with customizable text, opacity, and positioning.",
    icon: Shield,
    color: "amber",
    href: "/tools/brandstamp",
    tags: ["Branding", "Protection", "Batch"],
  },
  {
    id: "creator-link",
    name: "CreatorHub Link-in-Bio",
    description: "Build a customizable, NSFW-friendly landing page with fan gates, tip menus, and deep analytics.",
    icon: Link2,
    color: "emerald",
    href: "/tools/creator-link",
    tags: ["Links", "Bio", "Analytics"],
  },
  {
    id: "creator-pulse",
    name: "CreatorPulse Analytics",
    description: "AI-generated insights from your engagement data. Know what content drives tips and subscriptions.",
    icon: TrendingUp,
    color: "cyan",
    href: "/tools/creator-pulse",
    tags: ["AI", "Analytics", "Insights"],
  },
  {
    id: "autopilot-studio",
    name: "AutoPilot Workflows",
    description: "No-code workflow automation for fan lifecycle management, re-engagement, and VIP tracking.",
    icon: Workflow,
    color: "indigo",
    href: "/tools/autopilot-studio",
    tags: ["Automation", "Workflows", "No-Code"],
  },
  {
    id: "sceneforge",
    name: "SceneForge Storyboard",
    description: "Plan your content shoots with AI-generated scene ideas, pose suggestions, and lighting setups.",
    icon: Camera,
    color: "orange",
    href: "/tools/sceneforge",
    tags: ["AI", "Planning", "Storyboard"],
  },
];

const COLOR_STYLES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
};

export default function Tools() {
  const { getVideoByKeyword } = useMediaCatalog();
  const vettingVideo = getVideoByKeyword("vetting") || getVideoByKeyword("agency");
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BNE Creator Utility Suite",
    "url": "https://blacklisted.studio/tools",
    "description": "Access free tools for creators and entertainers: OnlyFans revenue calculator, content strategy engines, classified ad generators, and income verification checkers.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Free Creator Tools & Revenue Calculators | BNE Studio"
        description="Access free tools for creators and entertainers: OnlyFans revenue calculator, content strategy engines, classified ad generators, and income verification checkers. Backed by $10M+ in creator revenue data."
        canonical="/tools"
        schema={toolsSchema}
        keywords="creator tools, revenue calculator, OnlyFans calculator, content strategy, income verification, creator analytics, BNE Studio"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-slate-950 to-emerald-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">BNE Utility Suite</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">
              Stop <span className="text-violet-400">Guessing</span>.<br />
              Start <span className="text-emerald-400">Knowing</span>.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              Tools built from real data across $10M+ in creator revenue. No affiliate garbage, no filler.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">✓ Free to use</span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">✓ Pro upgrades available</span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">✓ Members-only access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Educational Overview — Why These Tools Matter */}
      <section className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Why Every Creator Needs a Data-Driven Toolkit</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            The creator economy is <strong>$250 billion strong</strong> and growing at <strong>12% annually</strong> (Goldman Sachs, 2024). 
            Yet <strong>87% of creators</strong> don't track their unit economics — they don't know their cost-per-fan, 
            their optimal posting cadence, or which content types actually drive revenue.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            The BNE Utility Suite exists to change that. Every tool in this suite was built using anonymized data from 
            <strong> 60+ creators generating $10M+ annually</strong>. We know what works because we've seen the numbers.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <h4 className="text-emerald-400 font-semibold text-sm">Free Tools</h4>
              <p className="text-xs text-slate-500 mt-1">Start calculating, planning, and optimizing immediately — no sign-up required.</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="text-amber-400 font-semibold text-sm">Pro Upgrade</h4>
              <p className="text-xs text-slate-500 mt-1">Unlock advanced analytics, batch processing, and AI-powered recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-20">
        {/* Tools Introduction */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-100 font-display mb-3">The Creator's Toolbox</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Each tool below is a standalone utility designed to solve a specific problem in your creator business. 
            Use them individually or as a complete suite.
          </p>
        </div>

        {/* Primary Tools */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_CARDS.map((tool, idx) => {
            const colors = COLOR_STYLES[tool.color];
            const Icon = tool.icon;
            // Define upgrade benefits for each tool
            const proFeatures: Record<string, string[]> = {
              calculator: ["Advanced tax modeling", "Multi-platform revenue attribution", "Custom ROI scenarios", "Export to PDF/Excel"],
              "strategy-engine": ["AI-powered script generation", "Trend prediction", "Competitor analysis", "Content calendar integration"],
              "income-verifier": ["Custom pay stub design", "Direct bank integration", "Credit inquiry simulation", "Verification API access"],
              "workflow-manager": ["Team collaboration", "Automated task assignment", "Time-tracking integration", "Burnout prediction AI"],
              "classified-generator": ["Multi-platform posting", "A/B testing suite", "Performance tracking", "Automated reposting"],
              "niche-matcher": ["Full database access", "Advanced filtering", "Download as CSV", "Real-time market data"],
              "content-calendar": ["AI-powered caption generation", "Optimal posting times", "Cross-platform scheduling", "Analytics dashboard"],
              "fanbot-builder": ["Custom personality training", "Multi-platform support", "Analytics dashboard", "Team collaboration"],
              brandstamp: ["Batch processing 500+ files", "Brand kit presets", "Automated overlay", "Export in all formats"],
              "creator-link": ["Custom domain", "Fan gate analytics", "Tip menu builder", "Deep engagement tracking"],
              "creator-pulse": ["Predictive analytics", "Content recommendation engine", "Real-time alerts", "Custom reports"],
              "autopilot-studio": ["Unlimited workflows", "Custom triggers", "API access", "Team collaboration"],
              sceneforge: ["AI-generated mood boards", "Lighting setup recommendations", "Style consistency checker", "Location scouting"],
            };
            const features = proFeatures[tool.id] || proFeatures.brandstamp;

            return (
              <motion.div key={tool.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }}>
                <div className={`group relative rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 ${tool.popular ? `${colors.border} ${colors.bg}` : "border-slate-700/60 bg-slate-900/60 hover:border-slate-600"}`}>
                  {tool.popular && (
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${colors.badge} mb-3 inline-block`}>★ MOST POPULAR</span>
                  )}
                  <div className={`mb-4 rounded-xl p-3 inline-block ${colors.bg} ${colors.border} border`}>
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-slate-100 text-lg leading-tight mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{tool.description}</p>

                  {/* Pro Badge & Features */}
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">Pro upgrade available</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-500">{tag}</span>
                    ))}
                  </div>

                  {/* Pro Features List */}
                  <div className="mb-3 bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Pro Features</p>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                      {features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span className="text-amber-400 text-[8px]">◆</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href={tool.href}>
                      <span className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-all cursor-pointer flex items-center">
                        Launch Tool <ChevronRight className="h-3 w-3 ml-1 group-hover:ml-2 transition-all" />
                      </span>
                    </Link>
                    <Link href="/onboarding">
                      <span className="text-[10px] font-semibold text-amber-400 hover:text-amber-300 transition-all cursor-pointer border border-amber-500/30 px-2 py-0.5 rounded">
                        Upgrade Pro
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Agency Vetting Video */}
        <div className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-800">
          <div className="text-center mb-8">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider font-body">Operator Due Diligence</span>
            <h2 className="text-2xl font-bold text-slate-100 font-display mt-2">How to Vet OFM Agencies</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto font-body">Don't get scammed. Learn how to audit, vet, and verify any adult management agency before signing a contract.</p>
          </div>
          <VideoPlayer
            src={vettingVideo?.url || "/media-files/Vetting_OFM_Agencies.mp4"}
            title="Vetting OFM Agencies"
            description="The definitive checklist for identifying predatory agencies and verifying real operations."
          />
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">Numbers Don't Lie</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Tools applied daily across 60+ creators earning eight figures.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { value: "18", label: "Calculators", icon: Calculator },
              { value: "60+", label: "Creators Tracked", icon: Users },
              { value: "$10M+", label: "Revenue Analyzed", icon: BarChart3 },
            ].map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 mb-3">
                    <StatIcon className="h-5 w-5 text-violet-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-slate-900 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">
            The Tools Show You the Numbers.<br />
            <span className="text-violet-400">We Change Them.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            Every creator we work with ran these same calculations — then saw what those numbers look like 90 days into a managed operation.
          </p>
          <Link href="/onboarding">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors">
              See If You Qualify <ChevronRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

