/**
 * MarkdownRenderer — renders parsed markdown HTML with SEO-friendly defaults.
 *
 * Features:
 * - Tailwind Typography prose classes for clean long-form styling
 * - Auto-generated heading IDs for anchor linking & TOC
 * - Word count / reading time display toggle
 */

import { useEffect, useRef } from "react";

interface MarkdownRendererProps {
  html: string;
  readingTime?: { text: string; minutes: number; words: number };
  showReadingTime?: boolean;
  className?: string;
}

export default function MarkdownRenderer({
  html,
  readingTime,
  showReadingTime = true,
  className = "",
}: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Auto-generate anchor IDs for h2/h3 headings (for TOC + deep links)
    const headings = el.querySelectorAll("h2, h3, h4");
    headings.forEach((heading) => {
      const text = heading.textContent?.trim() || "";
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);
      heading.id = slug;
      heading.classList.add("scroll-mt-24");
    });
  }, [html]);

  return (
    <div className={`prose prose-invert prose-lg max-w-4xl mx-auto ${className}`}>
      {showReadingTime && readingTime && (
        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
            {readingTime.minutes} min read
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
            {readingTime.words.toLocaleString()} words
          </span>
        </div>
      )}
      <div
        ref={contentRef}
        className="[&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:mb-5 [&_ol]:mb-5 [&_table]:my-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
