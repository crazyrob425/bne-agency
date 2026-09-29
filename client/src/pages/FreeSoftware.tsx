/**
 * Free Software — categorized index of every free/open-source tool
 * in the arsenal, grouped by the creator type each serves best.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Zap, Heart, Video, Globe, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  FREE_SOFTWARE,
  FREE_SOFTWARE_GROUPS,
  type CreatorGroup,
  type FreeSoftwareTool,
} from "@/data/freeSoftware";

const GROUP_ICONS: Record<CreatorGroup, typeof Heart> = {
  onlyfans: Heart,
  webcam: Video,
  companions: Globe,
};

function licenseBadge(tool: FreeSoftwareTool) {
  if (tool.licenseType === "open-source")
    return { label: "Open Source", cls: "bg-sky-500/15 border-sky-500/40 text-sky-300" };
  if (tool.licenseType === "free")
    return { label: "100% Free", cls: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" };
  return { label: "Freemium", cls: "bg-amber-500/15 border-amber-500/40 text-amber-300" };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= rating ? "text-[oklch(0.78_0.16_85)] fill-[oklch(0.78_0.16_85)]" : "text-zinc-600"}`}
        />
      ))}
    </span>
  );
}

function ToolCard({ tool, index }: { tool: FreeSoftwareTool; index: number }) {
  const badge = licenseBadge(tool);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link href={`/free-software/${tool.slug}`}>
        <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.16_85/45%)] hover:bg-white/[0.05] cursor-pointer flex flex-col">
          <div className="relative aspect-video bg-black/40 overflow-hidden">
            <img
              src={tool.screenshot}
              alt={`${tool.name} screenshot`}
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{tool.category}</span>
              <Stars rating={tool.rating} />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-1 leading-snug" style={{ fontFamily: "Space Grotesk" }}>
              {tool.name}
            </h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed mb-4 flex-1" style={{ fontFamily: "DM Sans" }}>
              {tool.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[oklch(0.85_0.14_85)] text-[13px] font-semibold group-hover:gap-2.5 transition-all">
              Read the full review <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FreeSoftware() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Free Software Arsenal — 40 Free & Open-Source Tools for Creators"
        description="The free software arsenal for adult creators: OBS streaming setups, free video and photo editors, audio tools, schedulers, Reddit marketing, CRMs, booking systems, and safety apps — each with a full honest review and safe download link."
        canonical="/free-software"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.78_0.16_85/7%)] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[oklch(0.78_0.16_85/8%)] blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 mb-6">
              <Zap className="h-3.5 w-3.5 text-sky-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                {FREE_SOFTWARE.length} tools · reviewed by humans · $0 required
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
              <span className="text-zinc-100">Free Software</span>
              <br />
              <span className="gradient-text">Arsenal</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: "DM Sans" }}>
              Every tool below is genuinely free or open source — researched across the web and GitHub,
              honestly reviewed, with the freemium traps called out by name. Pick your lane.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {FREE_SOFTWARE_GROUPS.map((g) => {
                const Icon = GROUP_ICONS[g.id as CreatorGroup];
                return (
                  <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white/[0.05] border border-white/15 text-zinc-300 hover:border-[oklch(0.78_0.16_85/50%)] hover:text-[oklch(0.85_0.14_85)] transition-colors">
                    <Icon className="h-3.5 w-3.5" /> {g.title}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Group sections */}
      {FREE_SOFTWARE_GROUPS.map((g, gi) => {
        const Icon = GROUP_ICONS[g.id as CreatorGroup];
        const tools = FREE_SOFTWARE.filter((t) => t.group === g.id);
        return (
          <section key={g.id} id={g.id} className={`py-16 sm:py-20 scroll-mt-24 ${gi % 2 === 1 ? "bg-[oklch(0.07_0.008_85)] border-y border-white/[0.06]" : ""}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                <span className="inline-flex items-center gap-2 text-[oklch(0.78_0.16_85)] text-xs font-semibold uppercase tracking-[0.2em]">
                  <Icon className="h-3.5 w-3.5" /> {tools.length} tools
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mt-3 mb-3" style={{ fontFamily: "Space Grotesk" }}>
                  {g.title}
                </h2>
                <p className="text-zinc-400 max-w-2xl leading-relaxed" style={{ fontFamily: "DM Sans" }}>
                  {g.description}
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "Space Grotesk" }}>
              Free Tools Get You Started. <span className="gradient-text">We Get You Paid.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: "DM Sans" }}>
              Download everything above for $0. When you want a team running your content, traffic,
              and fan revenue full-time, that's the BNE management lane.
            </p>
            <Link href="/onboarding">
              <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold cursor-pointer">
                Get Managed <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
