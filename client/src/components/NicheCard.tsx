import { useState } from "react";
import { ChevronDown, ChevronUp, DollarSign, Shield, Lightbulb, ListTodo, Tag, Sparkles } from "lucide-react";
import type { Niche } from "@/data/nicheDatabase";
import { useNicheCardData } from "@/data/nicheCardData";

function Section({ icon, title, children, accent = "#D4AF37" }: { icon: React.ReactNode; title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs" style={{ color: accent }}>{icon}</span>
        <h3 className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: accent }}>{title}</h3>
      </div>
      <div className="text-xs leading-7 text-[#EAE6D9]">{children}</div>
    </div>
  );
}

function Pills({ items, color = "#D4AF37" }: { items: string[]; color?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ borderColor: `${color}33`, color, backgroundColor: `${color}0d` }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function RevenueMeter({ stats }: { stats: { low: string; average: string; high: string; top: string } }) {
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {[
        ["Low", stats.low],
        ["Average", stats.average],
        ["High", stats.high],
        ["Top", stats.top],
      ].map(([label, value]) => (
        <div key={label as string} className="rounded-xl border border-[#D4AF37]/20 bg-black/40 p-2">
          <div className="text-[9px] uppercase tracking-widest text-[#666] font-bold">{label}</div>
          <div className="text-sm font-bold text-[#D4AF37] mt-1">{value}</div>
        </div>
      ))}
    </div>
  );
}

function NicheImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black/40 ${className ?? ""}`}>
        <span className="text-4xl opacity-40">📌</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="h-6 w-6 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export interface NicheCardProps {
  niche: Niche;
  matchScore?: number;
  rank?: number;
  drivers?: { key: string; value: number }[];
  matchReason?: string;
}

export function NicheCard({ niche, matchScore, rank, drivers, matchReason }: NicheCardProps) {
  const [expanded, setExpanded] = useState(false);
  const data = useNicheCardData(niche);
  const epColor = niche.earningPotential === "very-high" ? "#10B981" : niche.earningPotential === "high" ? "#D4AF37" : "#F59E0B";
  const compColor = niche.competitionLevel === "micro" ? "#10B981" : niche.competitionLevel === "low" ? "#D4AF37" : niche.competitionLevel === "medium" ? "#F59E0B" : "#EF4444";

  return (
    <div
      className="group relative h-full"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full transition-all duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: expanded ? "rotateX(0deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front Face */}
        <div
          className={`relative h-full overflow-hidden rounded-3xl border bg-[#0A0A0A] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_25px_80px_rgba(212,175,55,0.08)] cursor-pointer ${
            matchScore ? "border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.12)]" : "border-white/10"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Holographic foil border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          {/* Graphic Header */}
          <div className="relative h-44 overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#111111] via-[#0A0A0A] to-[#141414]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_60%)]" />
            <div className="absolute inset-0">
              <NicheImage
                src={data.imageUrl}
                alt={`${niche.keyword} clipart`}
                className="w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            </div>
            
            {rank && matchScore && (
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] px-3.5 py-1 text-[10px] font-black tracking-[0.2em] uppercase text-black shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                  <Sparkles className="w-3 h-3 text-black" />
                  #{rank} MATCH • {matchScore}% FIT
                </span>
              </div>
            )}

            {!rank && (
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-black/60 px-3 py-1 text-[9px] font-black tracking-[0.35em] uppercase text-[#D4AF37] backdrop-blur-sm">
                  {niche.category}
                </span>
              </div>
            )}

            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center rounded-full border bg-black/60 px-3 py-1 text-[9px] font-black tracking-[0.35em] uppercase backdrop-blur-sm" style={{ borderColor: `${epColor}44`, color: epColor }}>
                {niche.earningPotential.toUpperCase()} EARNING
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="relative p-5 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#F4F4EE] leading-tight group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                <span>{niche.keyword}</span>
              </h3>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mt-1">
                {niche.category}
              </p>
            </div>

            {matchReason && (
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Mindset & Lifestyle Fit</span>
                </div>
                <p className="text-xs leading-6 text-[#F4F4EE] font-medium">{matchReason}</p>
              </div>
            )}

            <p className="text-xs leading-7 text-[#EAE6D9] line-clamp-3">
              {data.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                <div className="text-[9px] uppercase tracking-widest text-[#666] font-bold mb-1">Competition</div>
                <div className="text-sm font-bold" style={{ color: compColor }}>{niche.competitionLevel.toUpperCase()}</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                <div className="text-[9px] uppercase tracking-widest text-[#666] font-bold mb-1">Search Volume</div>
                <div className="text-sm font-bold text-[#F4F4EE]">{niche.searchVolume.toUpperCase()}</div>
              </div>
            </div>

            {/* Revenue Preview */}
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#666] font-bold mb-2">Revenue Range</div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-sm font-bold text-[#D4AF37]">{data.revenueStats.average}</span>
                <span className="text-[10px] text-[#666] ml-auto">avg</span>
              </div>
            </div>

            {/* Expand Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#666] font-bold">
                {expanded ? "Collapse" : "Tap to expand"}
              </span>
              {expanded ? <ChevronUp className="w-3 h-3 text-[#D4AF37]" /> : <ChevronDown className="w-3 h-3 text-[#D4AF37]" />}
            </div>
          </div>
        </div>

        {/* Expanded Detail Panel */}
        <div
          className={`absolute inset-0 z-20 overflow-y-auto rounded-3xl border border-[#D4AF37]/20 bg-[#080808] transition-all duration-500 ease-out ${
            expanded ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
          }`}
        >
          <div className="p-6 space-y-5">
            {/* Close button */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/60 p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Title Graphic */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <NicheImage
                  src={data.imageUrl}
                  alt={`${niche.keyword} clipart`}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F4F4EE] leading-tight">{niche.keyword}</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mt-1">{niche.category}</p>
              </div>
            </div>

            {/* Description */}
            <Section icon={<Sparkles className="w-3 h-3" />} title="About this niche">
              <p className="leading-8">{data.description}</p>
            </Section>

            {/* Key Facts */}
            <Section icon={<ListTodo className="w-3 h-3" />} title="Key Facts" accent="#D4AF37">
              <ul className="space-y-2">
                {data.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Tips & Tricks */}
            <Section icon={<Lightbulb className="w-3 h-3" />} title="Tips & Tricks" accent="#F59E0B">
              <ul className="space-y-2">
                {data.tipsTricks.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#F59E0B]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Safety Precautions */}
            <Section icon={<Shield className="w-3 h-3" />} title="Safety Precautions" accent="#EF4444">
              <ul className="space-y-2">
                {data.safetyPrecautions.map((safety, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#EF4444]" />
                    <span>{safety}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Revenue Stats */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-3 h-3 text-[#D4AF37]" />
                <h3 className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37]">Average Revenue Stats</h3>
              </div>
              <RevenueMeter stats={data.revenueStats} />
            </div>

            {/* Subniches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3 h-3 text-[#D4AF37]" />
                <h3 className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37]">Related Subniches</h3>
              </div>
              <Pills items={data.subniches} />
            </div>

            {/* PG-13 Graphic Note */}
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <NicheImage
                    src={data.categoryImageUrl}
                    alt={`${niche.category} category clipart`}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#666] font-bold">Category Clipart</p>
                  <p className="text-xs text-[#999] mt-1 italic">{niche.category} — {data.pg13Graphic}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
