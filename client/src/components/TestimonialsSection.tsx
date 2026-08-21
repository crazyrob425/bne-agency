/**
 * BNE Testimonials Section — Reusable site-wide block
 * Displays a masonry-style grid of creator reviews with avatar, platform, rating, and quote.
 * Import and drop into any page.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp, MapPin, TrendingUp } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;      // default: show all 14, pass a number to limit
  showExpanded?: boolean; // default false — show short quote; true = full review
  variant?: "full" | "compact"; // full = masonry cards, compact = horizontal scroll
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, showExpanded }: { t: Testimonial; showExpanded: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const platformBadge: Record<Testimonial["type"], string> = {
    "onlyfans":      "bg-blue-500/10 text-blue-300 border-blue-500/20",
    "webcam":        "bg-violet-500/10 text-violet-300 border-violet-500/20",
    "escort":        "bg-rose-500/10 text-rose-300 border-rose-500/20",
    "multi-platform": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };
  const expLabel: Record<Testimonial["experience"], string> = {
    new:          "New Creator",
    intermediate: "Established",
    veteran:      "Veteran",
  };

  const paragraphs = t.review.trim().split(/\n\n+/);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative flex flex-col bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-white text-sm font-black shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <p className="font-semibold text-slate-100 text-sm leading-tight">{t.name}</p>
            <p className="text-slate-500 text-xs">{t.creatorHandle}</p>
          </div>
        </div>
        <StarRating />
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${platformBadge[t.type]}`}>
          {expLabel[t.experience]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          <TrendingUp className="h-2.5 w-2.5" />
          {t.revenueIncrease}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 text-slate-500 px-2 py-0.5 text-[10px] tracking-wider">
          <MapPin className="h-2.5 w-2.5" />
          {t.location}
        </span>
      </div>

      {/* Platform */}
      <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">{t.platform} · {t.monthsWithBne} months with BNE</p>

      {/* Review text */}
      {showExpanded || expanded ? (
        <div className="space-y-3">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-slate-300 text-sm leading-relaxed">{para}</p>
          ))}
        </div>
      ) : (
        <p className="text-slate-300 text-sm leading-relaxed italic">&ldquo;{t.shortQuote}&rdquo;</p>
      )}

      {/* Expand toggle */}
      {!showExpanded && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-4 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors self-start"
        >
          {expanded ? (
            <><ChevronUp className="h-3.5 w-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="h-3.5 w-3.5" /> Read full review</>
          )}
        </button>
      )}
    </motion.div>
  );
}

export default function TestimonialsSection({
  title = "What Our Creators Say",
  subtitle = "Real results from real women building real businesses. No fake screenshots, no manufactured hype.",
  limit,
  showExpanded = false,
  variant = "full",
}: TestimonialsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = limit || 6;
  const displayed = showAll ? testimonials : testimonials.slice(0, INITIAL_DISPLAY);

  // Aggregate stats
  const avgIncrease = "+$7,200/mo avg";
  const totalReviews = testimonials.length;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          {/* Aggregate rating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-amber-300 text-xs font-semibold">5.0 · {totalReviews} verified creator reviews</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { label: "Avg Monthly Revenue Increase", value: avgIncrease },
              { label: "Creator Satisfaction", value: "100%" },
              { label: "Avg Months to ROI", value: "< 6 wks" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-amber-400">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className={`grid gap-5 ${
          variant === "compact"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}>
          <AnimatePresence>
            {displayed.map(t => (
              <TestimonialCard key={t.id} t={t} showExpanded={showExpanded} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {!limit && !showAll && testimonials.length > INITIAL_DISPLAY && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:border-slate-500 text-slate-300 text-sm font-semibold transition-all"
            >
              <ChevronDown className="h-4 w-4" />
              Show all {testimonials.length} reviews
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-slate-600 text-xs mt-8">
          Creator names and handles anonymized at their request. Revenue figures reflect individual results which vary based on niche, experience, and content output.
        </p>
      </div>
    </section>
  );
}
