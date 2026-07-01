import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calculator, FileText, Calendar, CreditCard, Zap, ChevronRight, Users, Target, Sparkles, BarChart3, Clock } from "lucide-react";
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
        title="Free Creator Tools & Revenue Calculators"
        description="Access free tools for creators and entertainers: OnlyFans revenue calculator, content strategy engines, classified ad generators, and income verification checkers."
        canonical="/tools"
        schema={toolsSchema}
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
          </motion.div>
        </div>
      </section>

      <div className="container py-16 space-y-20">
        {/* Primary Tools */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_CARDS.map((tool, idx) => {
            const colors = COLOR_STYLES[tool.color];
            const Icon = tool.icon;
            return (
              <motion.div key={tool.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }}>
                <Link href={tool.href}>
                  <div className={`group relative rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer ${tool.popular ? `${colors.border} ${colors.bg}` : "border-slate-700/60 bg-slate-900/60 hover:border-slate-600"}`}>
                    {tool.popular && (
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${colors.badge} mb-3 inline-block`}>★ MOST POPULAR</span>
                    )}
                    <div className={`mb-4 rounded-xl p-3 inline-block ${colors.bg} ${colors.border} border`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="font-semibold text-slate-100 text-lg leading-tight mb-2">{tool.name}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-500">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-xs font-semibold text-slate-500 group-hover:text-violet-400 transition-all">
                      Launch Tool <ChevronRight className="h-3 w-3 ml-1 group-hover:ml-2 transition-all" />
                    </div>
                  </div>
                </Link>
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
