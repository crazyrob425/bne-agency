/**
 * Types for the markdown content pipeline.
 */

export interface PageFrontmatter {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  lastModified?: string;
  readingTime?: number;
  wordCount?: number;
  [key: string]: any;
}

export interface PageContent {
  meta: PageFrontmatter;
  html: string;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
}

export type ContentMap = Record<string, PageContent>;
