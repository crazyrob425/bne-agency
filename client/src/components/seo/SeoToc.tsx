/**
 * SeoToc — sticky table of contents with active-heading tracking via IntersectionObserver.
 *
 * Usage:
 * <SeoToc headings={[
 *   { id: "overview", label: "Executive Overview", level: 2 },
 *   { id: "architecture", label: "System Architecture", level: 2 },
 *   { id: "deployment", label: "Deployment", level: 3 },
 * ]} />
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface TocHeading {
  id: string;
  label: string;
  level: 2 | 3;
}

export default function SeoToc({
  headings,
  className = "",
}: {
  headings: TocHeading[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className={`sticky top-24 hidden xl:block w-56 shrink-0 ${className}`}
      aria-label="Table of contents"
    >
      <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">
        On this page
      </p>
      <ul className="space-y-1 border-l border-slate-700">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-1 pl-4 text-xs transition-colors ${
                activeId === h.id
                  ? "text-violet-400 border-l-2 border-violet-400 -ml-px"
                  : "text-slate-400 hover:text-slate-200"
              } ${h.level === 3 ? "ml-3" : ""}`}
            >
              {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
