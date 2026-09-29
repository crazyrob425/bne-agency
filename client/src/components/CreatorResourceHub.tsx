/**
 * CreatorResourceHub — matched free-tool mini menu cards + curated intel
 * collections (articles + video course) for the three creator landing pages.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Calculator,
  MessageSquare,
  CalendarDays,
  TrendingUp,
  Shield,
  Clapperboard,
  Camera,
  Sparkles,
  Megaphone,
  CreditCard,
  Target,
  Workflow,
  ArrowUpRight,
  ArrowRight,
  PlayCircle,
  BookOpen,
  BadgeCheck,
} from "lucide-react";
import { getArticleBySlug } from "@/data/blogArticles";
import type { CreatorResourceConfig, ToolEntry } from "@/data/creatorResources";

const TOOL_ICONS: Record<string, typeof Calculator> = {
  calculator: Calculator,
  chat: MessageSquare,
  calendar: CalendarDays,
  trending: TrendingUp,
  shield: Shield,
  clapper: Clapperboard,
  camera: Camera,
  sparkles: Sparkles,
  megaphone: Megaphone,
  card: CreditCard,
  target: Target,
  workflow: Workflow,
};

function ToolCard({ tool, index }: { tool: ToolEntry; index: number }) {
  const Icon = TOOL_ICONS[tool.icon] ?? Sparkles;
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
          <div className="group relative overflow-hidden rounded-2xl border border-[oklch(0.78_0.16_85/35%)] bg-gradient-to-r from-[oklch(0.78_0.16_85/10%)] via-white/[0.04] to-transparent p-6 sm:p-8 transition-all duration-300 hover:border-[oklch(0.78_0.16_85/60%)] hover:from-[oklch(0.78_0.16_85/16%)] cursor-pointer">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[oklch(0.78_0.16_85/12%)] blur-[80px] pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] border border-[oklch(0.78_0.16_85/35%)] flex items-center justify-center">
                <Icon className="h-7 w-7 text-[oklch(0.78_0.16_85)]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[oklch(0.78_0.16_85/20%)] border border-[oklch(0.78_0.16_85/40%)] text-[oklch(0.85_0.14_85)]">
                    Most used
                  </span>
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
              <div className="shrink-0 flex items-center gap-2 text-[oklch(0.85_0.14_85)] font-semibold text-sm group-hover:gap-3 transition-all">
                Open free tool <ArrowUpRight className="h-4 w-4" />
              </div>
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
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link href={tool.href}>
        <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.16_85/45%)] hover:bg-white/[0.05] cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-[oklch(0.78_0.16_85/12%)] border border-[oklch(0.78_0.16_85/25%)] flex items-center justify-center">
              <Icon className="h-5 w-5 text-[oklch(0.78_0.16_85)]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
              Free
            </span>
          </div>
          <h3 className="text-base font-bold text-zinc-100 mb-1.5 leading-snug" style={{ fontFamily: "Space Grotesk" }}>
            {tool.name}
          </h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed mb-4" style={{ fontFamily: "DM Sans" }}>
            {tool.pitch}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[oklch(0.85_0.14_85)] text-[13px] font-semibold group-hover:gap-2.5 transition-all">
            Open tool <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function ToolMenuCards({ config }: { config: CreatorResourceConfig }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold uppercase tracking-[0.2em]">
            {config.toolsEyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: "Space Grotesk" }}>
            {config.toolsTitle}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            {config.toolsSubtitle}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/free-creator-tools">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[oklch(0.85_0.14_85)] transition-colors cursor-pointer">
              Browse all 16 free creator tools <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function IntelCollection({ config }: { config: CreatorResourceConfig }) {
  const articles = config.articles
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section className="py-20 sm:py-24 bg-[oklch(0.07_0.008_85)] border-y border-white/[0.06] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-[oklch(0.72_0.12_85/4%)] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[oklch(0.78_0.16_85)] text-xs font-semibold uppercase tracking-[0.2em]">
            <BookOpen className="h-3.5 w-3.5" /> {config.intelEyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: "Space Grotesk" }}>
            {config.intelTitle}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            {config.intelSubtitle}
          </p>
        </motion.div>

        {/* Video course spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link href={`/university?course=${config.course.id}`}>
            <div className="group relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-950/40 via-white/[0.03] to-transparent p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-violet-400/50">
              <div className="absolute -top-24 left-1/4 w-96 h-48 bg-violet-600/15 blur-[90px] rounded-full pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-violet-500/15 border border-violet-500/35 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PlayCircle className="h-7 w-7 text-violet-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-200">
                      Video course + printables
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-1.5" style={{ fontFamily: "Space Grotesk" }}>
                    {config.course.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl" style={{ fontFamily: "DM Sans" }}>
                    {config.course.description}
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-2 text-violet-200 font-semibold text-sm group-hover:gap-3 transition-all">
                  Watch free <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Article cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.16_85/40%)] hover:bg-white/[0.05] cursor-pointer flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/15 text-zinc-300">
                      {article.category}
                    </span>
                    <BadgeCheck className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-snug group-hover:text-[oklch(0.9_0.12_85)] transition-colors" style={{ fontFamily: "Space Grotesk" }}>
                    {article.title}
                  </h3>
                  <p className="text-zinc-400 text-[13px] leading-relaxed mb-5 flex-1" style={{ fontFamily: "DM Sans" }}>
                    {article.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[oklch(0.85_0.14_85)] text-[13px] font-semibold group-hover:gap-2.5 transition-all">
                    Read the guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[oklch(0.85_0.14_85)] transition-colors cursor-pointer">
              Browse the full intel library <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
