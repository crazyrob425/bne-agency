/**
 * Markdown Content Pipeline
 *
 * Uses Vite's import.meta.glob to bundle all markdown files at build time,
 * then parses them with gray-matter (frontmatter) + unified (markdown → HTML)
 * + reading-time (readability metrics).
 */

import readingTime from "reading-time/lib/reading-time";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { ContentMap, PageFrontmatter } from "./types";

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

const RAW_GLOB = import.meta.glob("/client/src/content/pages/*.md", {
  query: "?raw",
  import: "default",
});

function slugFromPath(path: string): string {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, "");
}

function parseMarkdown(raw: string): {
  meta: PageFrontmatter;
  html: string;
  readingTime: { text: string; minutes: number; words: number };
} {
  const { data, content } = matter(raw);

  const html = markdownProcessor.processSync(content).toString();

  const stats = readingTime(content);

  return {
    meta: {
      title: (data.title as string) || "",
      description: (data.description as string) || "",
      canonical: data.canonical as string | undefined,
      keywords: data.keywords as string | undefined,
      ogType: data.ogType as "website" | "article" | undefined,
      noIndex: data.noIndex as boolean | undefined,
      lastModified: data.lastModified as string | undefined,
      ...data,
    },
    html,
    readingTime: {
      text: stats.text,
      minutes: Math.ceil(stats.minutes),
      words: stats.words,
    },
  };
}

export function buildContentMap(): ContentMap {
  const map: ContentMap = {};

  for (const [path, loader] of Object.entries(RAW_GLOB)) {
    const raw: string = (loader as any)();
    const slug = slugFromPath(path);
    map[slug] = parseMarkdown(raw);
  }

  return map;
}

export const contentMap: ContentMap = buildContentMap();

export function getPageContent(slug: string): PageContent | undefined {
  return contentMap[slug];
}

export function getAllPageSlugs(): string[] {
  return Object.keys(contentMap);
}
