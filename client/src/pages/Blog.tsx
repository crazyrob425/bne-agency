/**
 * BNE Blog & Resources — Index Page
 * Design: Noir Hacker Syndicate — slate-950 base, violet-500 + emerald-400 neon accents
 * Features: featured hero articles, category filter tabs, article grid, search
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Search,
  Shield,
  Target,
  Lightbulb,
  Monitor,
  DollarSign,
  Lock,
  ChevronRight,
  TrendingUp,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  articles,
  getFeaturedArticles,
  ALL_CATEGORIES,
  type ArticleCategory,
} from "@/data/blogArticles";
import AuthorBio from "@/components/AuthorBio";
import { professors } from "@/data/professors";

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  ArticleCategory | "All",
  { icon: React.ElementType; color: string; border: string; bg: string }
> = {
  All: { icon: BookOpen, color: "text-slate-300", border: "border-slate-600", bg: "bg-slate-800" },
  "Compliance & Legal": { icon: Shield, color: "text-violet-400", border: "border-violet-500/40", bg: "bg-violet-500/10" },
  "Niche Strategy": { icon: Target, color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
  "Creator Guides": { icon: Lightbulb, color: "text-amber-400", border: "border-amber-500/40", bg: "bg-amber-500/10" },
  "Platform Tips": { icon: Monitor, color: "text-cyan-400", border: "border-cyan-500/40", bg: "bg-cyan-500/10" },
  Monetization: { icon: DollarSign, color: "text-green-400", border: "border-green-500/40", bg: "bg-green-500/10" },
  "Privacy & Security": { icon: Lock, color: "text-rose-400", border: "border-rose-500/40", bg: "bg-rose-500/10" },
};

const ACCENT_COLORS: Record<string, string> = {
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  rose: "text-rose-400",
  amber: "text-amber-400",
  teal: "text-teal-400",
  orange: "text-orange-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  cyan: "text-cyan-400",
  green: "text-green-400",
  indigo: "text-indigo-400",
};

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: (typeof articles)[0];
  index: number;
}) {
  const catMeta = CATEGORY_META[article.category];
  const CatIcon = catMeta.icon;
  const accentClass = ACCENT_COLORS[article.accentColor] || "text-violet-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
    >
      <Link href={`/blog/${article.slug}`}>
        <div className="group h-full rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col">
          {/* Gradient header */}
          <div className={`h-1.5 bg-gradient-to-r ${article.coverGradient}`} />

          <div className="p-5 flex flex-col flex-1">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${catMeta.color} ${catMeta.border} ${catMeta.bg}`}
              >
                <CatIcon className="h-3 w-3" />
                {article.category}
              </span>
              {article.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                  <Star className="h-2.5 w-2.5" /> Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={`font-display text-base font-bold text-slate-100 leading-snug mb-2 group-hover:${accentClass} transition-colors line-clamp-2`}
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime} min read
                </span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${accentClass} group-hover:gap-2 transition-all`}>
                Read <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── FEATURED HERO CARD ───────────────────────────────────────────────────────

function FeaturedCard({ article }: { article: (typeof articles)[0] }) {
  const catMeta = CATEGORY_META[article.category];
  const CatIcon = catMeta.icon;
  const accentClass = ACCENT_COLORS[article.accentColor] || "text-violet-400";

  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="group relative rounded-2xl border border-slate-700 overflow-hidden cursor-pointer bg-slate-900 hover:border-slate-500 transition-all duration-200">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${catMeta.color} ${catMeta.border} ${catMeta.bg}`}
            >
              <CatIcon className="h-3 w-3" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Star className="h-3 w-3" /> Featured
            </span>
          </div>

          <h2 className="font-display text-xl md:text-2xl font-black text-slate-100 leading-tight mb-3 group-hover:text-white transition-colors max-w-2xl">
            {article.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xl line-clamp-2">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min read
              </span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <span
              className={`ml-auto flex items-center gap-1.5 text-sm font-semibold ${accentClass} group-hover:gap-2.5 transition-all`}
            >
              Read Article <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = getFeaturedArticles();

  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const categories: (ArticleCategory | "All")[] = ["All", ...ALL_CATEGORIES];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blacklisted Studio Knowledge Base",
    "description": "Guides, articles, and blueprints covering adult entertainment business strategy, § 2257 record keeping, client safety, and cash flow security.",
    "url": "https://blacklisted.studio/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blacklisted.studio/BNE%20logo2.png"
      }
    },
    "blogPost": articles.slice(0, 10).map(a => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "url": `https://blacklisted.studio/blog/${a.slug}`,
      "datePublished": a.publishedAt,
      "author": {
        "@type": "Person",
        "name": a.author
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Creator Intelligence & Industry Guides"
        description="Guides, articles, and blueprints covering adult entertainment business strategy, § 2257 record keeping, client safety, and cash flow security."
        canonical="/blog"
        schema={blogSchema}
      />
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section className="pt-28 pb-10 border-b border-slate-800">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-2">
                <BookOpen className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mono-stat">
                BNE Knowledge Base
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
              The Guides Nobody Else{" "}
              <span className="text-violet-400">Is Gonna Write For You</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Real strategy, real compliance, real talk — no fluff, no gatekeeping. Written by the BNE team for creators who are serious about building something that actually lasts.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-800">
              {[
                { label: "Guides Dropped", value: `${articles.length}`, icon: BookOpen },
                { label: "Categories", value: `${ALL_CATEGORIES.length}`, icon: Target },
                { label: "Avg. Read Time", value: "11 min", icon: Clock },
                { label: "Updated", value: "Weekly", icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-slate-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-200 mono-stat">{value}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ── */}
      {activeCategory === "All" && !searchQuery && (
        <section className="py-10 border-b border-slate-800/50">
          <div className="container">
            <div className="flex items-center gap-2 mb-5">
              <Star className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mono-stat">
                Must-Reads
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((article) => (
                <FeaturedCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FILTER BAR ── */}
      <section className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 py-3">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat];
                const CatIcon = meta.icon;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? `${meta.color} ${meta.border} ${meta.bg}`
                        : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    <CatIcon className="h-3 w-3" />
                    {cat === "All" ? "All Articles" : cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative sm:ml-auto w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the knowledge base..."
                className="pl-8 h-8 text-xs bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE GRID ── */}
      <section className="py-10">
        <div className="container">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              {filtered.length === articles.length
                ? `All ${articles.length} articles`
                : `${filtered.length} of ${articles.length} articles`}
              {activeCategory !== "All" && (
                <span className="text-slate-400"> in {activeCategory}</span>
              )}
              {searchQuery && (
                <span className="text-slate-400"> matching "{searchQuery}"</span>
              )}
            </p>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="h-10 w-10 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Nothing matched that search</p>
                <p className="text-slate-600 text-sm mt-1">
                  Try different keywords or just browse everything — you might find something better
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Show me everything
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FACULTY AUTHORS ROSTER ── */}
      <section className="py-16 border-t border-slate-800 bg-slate-950/40">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">Expert Authors</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">Blacklisted University Faculty Contributors</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {professors.slice(0, 3).map((prof) => (
              <div key={prof.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <AuthorBio professor={prof} variant="full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-slate-900 to-slate-900 p-8 md:p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
              <BookOpen className="h-7 w-7 text-violet-400" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-slate-100 mb-3">
              Done Reading? Good. Now Let's Get to Work.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Everything in these guides is exactly what BNE does for our creators every single day. Strategy, compliance, branding, monetization — all handled. You just have to say yes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl btn-neon px-6 py-3 font-semibold text-sm"
                >
                  Apply for Management <ChevronRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:border-slate-500 px-6 py-3 font-semibold text-sm text-slate-300"
                >
                  Find Your Niche <ChevronRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

