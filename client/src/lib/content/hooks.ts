/**
 * usePageContent — load markdown content for a given page slug.
 *
 * Usage:
 * const { meta, html, readingTime, loading, error } = usePageContent("home");
 */

import { useState, useEffect } from "react";
import { getPageContent, getAllPageSlugs } from "@/lib/content/loader";

export function usePageContent(slug: string) {
  const [data, setData] = useState<ReturnType<typeof getPageContent>>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Use a microtask to avoid hydration/SSR mismatches
    Promise.resolve()
      .then(() => {
        const content = getPageContent(slug);
        if (!content) {
          throw new Error(`No content found for slug: ${slug}`);
        }
        return content;
      })
      .then((content) => {
        if (!cancelled) {
          setData(content);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { ...data, loading, error };
}

export function getAllContentSlugs(): string[] {
  return getAllPageSlugs();
}
