/**
 * llms.txt generator (https://llmstxt.org) for blacklisted.studio.
 * Gives AI answer engines a plain-text map of the site and every blog article,
 * regenerated from blogArticles.ts on each build so new posts appear automatically.
 * Run: npx tsx scripts/seo/generate-llms.ts   (wired into `pnpm build`)
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { articles } from "../../client/src/data/blogArticles.js";

const SITE_URL = "https://blacklisted.studio";
const OUTPUT_PATH = resolve(process.cwd(), "dist/public/llms.txt");

const oneLine = (s: string) => String(s || "").replace(/\s+/g, " ").trim();

const sorted = [...(articles as any[])].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
const byCategory = new Map<string, any[]>();
for (const a of sorted) {
  const list = byCategory.get(a.category) || [];
  list.push(a);
  byCategory.set(a.category, list);
}

const lines: string[] = [
  "# B.N.E. Studio (Blacklisted Niche Entertainment)",
  "",
  "> B.N.E. Studio is the silent operations partner for adult and independent digital creators: niche intelligence, backend management, compliance (including 18 U.S.C. § 2257), advertising and scaling. Part of Blacklisted Studios (https://corp.blacklisted.studio/).",
  "",
  "## Key pages",
  `- [Home](${SITE_URL}/): What B.N.E. Studio does for creators`,
  `- [Services](${SITE_URL}/services): Operations, compliance, monetization and growth services`,
  `- [Niche Matcher](${SITE_URL}/niche-matcher): Free quiz that matches a creator to a high-earning niche`,
  `- [Free tools](${SITE_URL}/tools): Revenue calculators and creator utilities`,
  `- [University](${SITE_URL}/university): Creator education and masterclasses`,
  `- [Blog](${SITE_URL}/blog): All guides`,
  "",
];
for (const [cat, list] of byCategory) {
  lines.push(`## ${cat}`);
  for (const a of list) lines.push(`- [${oneLine(a.title)}](${SITE_URL}/blog/${a.slug}): ${oneLine(a.seoDescription || a.excerpt)}`);
  lines.push("");
}
lines.push("## Feeds", `- [RSS](${SITE_URL}/rss.xml)`, `- [Sitemap](${SITE_URL}/sitemap.xml)`, "");

writeFileSync(OUTPUT_PATH, lines.join("\n"));
console.log(`✅ llms.txt generated: ${OUTPUT_PATH} (${sorted.length} articles)`);
