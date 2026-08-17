/**
 * Dynamic Sitemap Generator for BNE Studio
 *
 * Parses App.tsx for <Route> definitions and generates a complete sitemap.xml.
 * Run: npx tsx scripts/seo/generate-sitemap.ts
 */

import { readFileSync } from "fs";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { pipeline } from "stream/promises";
import { SitemapStream } from "sitemap";

// Import blog articles for dynamic blog URL inclusion
import { articles } from "../../client/src/data/blogArticles.js";
import { NICHE_DATABASE, getNichePath } from "../../client/src/data/nicheDatabase.js";

const SITE_URL = "https://blacklisted.studio";
const OUTPUT_PATH = resolve(process.cwd(), "dist/public/sitemap.xml");

// Priority/changefreq defaults by route pattern
const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/home": 0.9,
  "/pricing": 0.9,
  "/services": 0.9,
  "/niche-matcher": 0.85,
  "/tools": 0.8,
  "/university": 0.8,
  "/blog": 0.8,
  "/onboarding": 0.7,
  "/apply": 0.7,
};

const ROUTE_CHANGEFREQ: Record<string, string> = {
  "/blog": "daily",
  "/": "weekly",
  "/home": "weekly",
  "/university": "weekly",
  "/niche-matcher": "weekly",
  "/tools": "weekly",
  "/pricing": "weekly",
  "/services": "weekly",
};

function getPriority(path: string): number {
  // Exact match first
  if (ROUTE_PRIORITY[path]) return ROUTE_PRIORITY[path];
  // Pattern matching
  if (path.startsWith("/tools/")) return 0.7;
  if (path.startsWith("/blog/")) return 0.7;
  if (path.startsWith("/niche-matcher/")) return 0.7;
  return 0.6;
}

function getChangefreq(path: string): string {
  if (ROUTE_CHANGEFREQ[path]) return ROUTE_CHANGEFREQ[path];
  if (path.startsWith("/blog/")) return "monthly";
  if (path.startsWith("/tools/")) return "monthly";
  if (path.startsWith("/niche-matcher/")) return "monthly";
  return "monthly";
}

// Extract routes from App.tsx
function extractRoutesFromApp(): string[] {
  const appPath = resolve(process.cwd(), "client/src/App.tsx");
  const content = readFileSync(appPath, "utf-8");

  const routeRegex = /<Route\s+path="([^"]+)"\s+component=/g;
  const routes: string[] = [];
  let match;

  while ((match = routeRegex.exec(content)) !== null) {
    const path = match[1];
    // Skip dynamic slugs that we handle separately
    if (!path.includes(":slug") && path !== "/404") {
      routes.push(path);
    }
  }

  return routes;
}

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });
  const today = new Date().toISOString().split("T")[0];

  // Add all static routes from App.tsx
  const staticRoutes = extractRoutesFromApp();
  for (const route of staticRoutes) {
    sitemapStream.write({
      url: route,
      changefreq: getChangefreq(route),
      priority: getPriority(route),
      lastmod: today,
    });
  }

  // Add blog listing page
  if (!staticRoutes.includes("/blog")) {
    sitemapStream.write({
      url: "/blog",
      changefreq: "daily",
      priority: 0.8,
      lastmod: today,
    });
  }

  // Add dedicated niche detail pages
  for (const niche of NICHE_DATABASE) {
    sitemapStream.write({
      url: getNichePath(niche),
      changefreq: "monthly",
      priority: 0.65,
      lastmod: today,
    });
  }

  // Add all blog articles
  for (const article of articles) {
    sitemapStream.write({
      url: `/blog/${article.slug}`,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: article.publishedAt || today,
      img: article.graphics?.map((g: any) => ({
        url: g.url,
        caption: g.caption,
        title: g.alt,
      })),
    });
  }

  sitemapStream.end();

  const writeStream = createWriteStream(OUTPUT_PATH);
  await pipeline(sitemapStream, writeStream);

  console.log(`✅ Sitemap generated: ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${staticRoutes.length + articles.length + 1 + NICHE_DATABASE.length}`);
  console.log(`   Routes: ${staticRoutes.length}`);
}

generateSitemap().catch(console.error);
