/**
 * BNE Blog — Article Detail Page
 * Design: Noir Hacker Syndicate — slate-950 base, violet-500 + emerald-400 neon accents
 * Features: full article rendering, table of contents, related articles, share, CTA
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Shield,
  Target,
  Lightbulb,
  Monitor,
  DollarSign,
  Lock,
  Share2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  getArticleBySlug,
  getRelatedArticles,
  CATEGORY_META_EXPORT,
  type ArticleCategory,
} from "@/data/blogArticles";

// Re-export category meta for use here
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

const ACCENT_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  violet: { text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  blue: { text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  rose: { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10" },
  amber: { text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  teal: { text: "text-teal-400", border: "border-teal-500/30", bg: "bg-teal-500/10" },
  orange: { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  purple: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
  pink: { text: "text-pink-400", border: "border-pink-500/30", bg: "bg-pink-500/10" },
  cyan: { text: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  green: { text: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
  indigo: { text: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-500/10" },
};

// ─── MARKDOWN RENDERER ────────────────────────────────────────────────────────
// Lightweight markdown-to-JSX renderer (no external dep needed for this subset)

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;
  const key = () => keyCounter++;

  const renderInline = (text: string): React.ReactNode => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
    // Italic
    text = text.replace(/\*(.+?)\*/g, (_, t) => `<em>${t}</em>`);
    // Code
    text = text.replace(/`(.+?)`/g, (_, t) => `<code>${t}</code>`);

    if (text.includes("<strong>") || text.includes("<em>") || text.includes("<code>")) {
      return (
        <span
          key={key()}
          dangerouslySetInnerHTML={{
            __html: text
              .replace(/<strong>/g, '<strong class="text-slate-100 font-semibold">')
              .replace(/<code>/g, '<code class="rounded bg-slate-800 px-1.5 py-0.5 text-[0.85em] text-violet-300 font-mono">'),
          }}
        />
      );
    }
    return text;
  };

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      const id = line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push(
        <h2
          key={key()}
          id={id}
          className="font-display text-xl font-bold text-slate-100 mt-10 mb-4 pb-2 border-b border-slate-800 scroll-mt-24"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key()} className="font-display text-base font-bold text-slate-200 mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key()}
          className="my-5 border-l-4 border-violet-500/50 bg-violet-500/5 pl-5 pr-4 py-3 rounded-r-lg"
        >
          <p className="text-slate-300 italic text-sm leading-relaxed">
            {quoteLines.join(" ")}
          </p>
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-| ]+\|$/));
      elements.push(
        <div key={key()} className="my-6 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60">
                {rows[0]
                  .split("|")
                  .filter((_, ci) => ci > 0 && ci < rows[0].split("|").length - 1)
                  .map((cell, ci) => (
                    <th
                      key={ci}
                      className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {cell.trim()}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                  {row
                    .split("|")
                    .filter((_, ci) => ci > 0 && ci < row.split("|").length - 1)
                    .map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-slate-300 text-sm">
                        {renderInline(cell.trim())}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key()} className="my-4 space-y-2 pl-4">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      let num = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
        num++;
      }
      elements.push(
        <ol key={key()} className="my-4 space-y-2 pl-4">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400">
                {li + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bold standalone line (section label)
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
      elements.push(
        <p key={key()} className="mt-5 mb-2 text-sm font-bold text-slate-200">
          {line.slice(2, -2)}
        </p>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key()} className="my-3 text-slate-300 leading-relaxed text-[15px]">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────

function extractHeadings(content: string): { id: string; text: string }[] {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => ({
      id: l.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      text: l.slice(3),
    }));
}

// ─── RELATED ARTICLE CARD ─────────────────────────────────────────────────────

function RelatedCard({ article }: { article: ReturnType<typeof getRelatedArticles>[0] }) {
  const catMeta = CATEGORY_META[article.category];
  const CatIcon = catMeta.icon;
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="group rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-600 p-4 cursor-pointer transition-all duration-200">
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest mb-2 ${catMeta.color} ${catMeta.border} ${catMeta.bg}`}>
          <CatIcon className="h-2.5 w-2.5" />
          {article.category}
        </div>
        <h4 className="text-sm font-bold text-slate-200 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2 mb-1">
          {article.title}
        </h4>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.readTime} min
        </p>
      </div>
    </Link>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ArticleDetail() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || "");

  const related = useMemo(
    () => (article ? getRelatedArticles(article, 3) : []),
    [article]
  );

  const headings = useMemo(
    () => (article ? extractHeadings(article.content) : []),
    [article]
  );

  const renderedContent = useMemo(
    () => (article ? renderMarkdown(article.content) : []),
    [article]
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied. Now go share the knowledge, sis.");
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Seo title="Article Not Found" description="The requested article does not exist or has been moved." noIndex />
        <Navigation />
        <div className="container py-32 text-center">
          <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-slate-300 mb-2">That Article Doesn't Exist (Yet)</h1>
          <p className="text-slate-500 mb-6">This one may have moved or never existed. Either way, we've got 12 others that slap.</p>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to the Knowledge Base
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const catMeta = CATEGORY_META[article.category];
  const CatIcon = catMeta.icon;
  const accent = ACCENT_COLORS[article.accentColor] || ACCENT_COLORS.violet;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blacklisted.studio/BNE%20logo2.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://blacklisted.studio/blog/${article.slug}`
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "wordCount": article.content.split(/\s+/).length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title={article.title}
        description={article.excerpt}
        canonical={`/blog/${article.slug}`}
        schema={articleSchema}
        articlePublishedTime={article.publishedAt}
        articleModifiedTime={article.publishedAt}
        articleAuthor={article.author}
        articleTags={article.tags}
        type="article"
      />
      <Navigation />

      {/* ── ARTICLE HEADER ── */}
      <header className="relative pt-24 pb-10 border-b border-slate-800 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} opacity-10`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/blog">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Knowledge Base</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className={catMeta.color}>{article.category}</span>
          </div>

          <div className="max-w-3xl">
            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${catMeta.color} ${catMeta.border} ${catMeta.bg}`}>
                <CatIcon className="h-3 w-3" />
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" /> {article.readTime} min read
              </span>
              <span className="text-xs text-slate-600">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-black text-slate-100 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Author + share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full border ${accent.border} ${accent.bg} flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${accent.text}`}>
                    {article.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.authorRole}</p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 hover:border-slate-500 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-0.5 text-[11px] text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── ARTICLE BODY ── */}
      <div className="container py-10">
        <div className="flex gap-10 max-w-5xl">
          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 min-w-0"
          >
            <div className="prose-bne">
              {renderedContent}
            </div>

            {/* Article footer */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Dropped by</p>
                  <p className="text-sm font-semibold text-slate-200">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.authorRole} — Blacklisted Niche Entertainment</p>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:border-violet-500/50 hover:bg-violet-500/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all"
                >
                  <Share2 className="h-4 w-4" /> Share this
                </button>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-lg font-bold text-slate-200 mb-4">Keep Reading, Sis</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <RelatedCard key={r.id} article={r} />
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-10">
              <Link href="/blog">
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Back to the knowledge base
                </button>
              </Link>
            </div>
          </motion.article>

          {/* Sidebar — Table of Contents */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-60 shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  In This Article
                </p>
                <nav className="space-y-1">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block rounded-lg px-3 py-2 text-xs text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-all leading-snug"
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>

                {/* CTA */}
                <div className="mt-8 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                  <p className="text-xs font-bold text-violet-300 mb-1">Done reading? Let's get to work.</p>
                  <p className="text-[11px] text-slate-500 mb-3">
                    BNE handles all of this for you — strategy, compliance, monetization, all of it.
                  </p>
                  <Link href="/onboarding">
                    <button className="w-full rounded-lg bg-violet-600 hover:bg-violet-500 px-3 py-2 text-xs font-semibold text-white transition-colors">
                      Apply for Management
                    </button>
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
