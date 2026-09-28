/**
 * Prerender SEO meta tags into static HTML per public route.
 *
 * Vite builds a single dist/public/index.html (empty shell). This script
 * clones it per route and injects route-specific <title>, meta description,
 * absolute canonical, Open Graph / Twitter tags, and JSON-LD — so crawlers,
 * link unfurlers, and Googlebot see real metadata without executing JS.
 *
 * Run: npx tsx scripts/seo/prerender-meta.ts   (wired into `pnpm build`)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

import {
  pageSeoConfig,
  baseMetadata,
  organizationSchema,
  websiteSchema,
  blogPostSchema,
  type SeoMetadata,
} from "../../client/src/seo.config.js";
import { articles } from "../../client/src/data/blogArticles.js";
import { NICHE_DATABASE, getNichePath } from "../../client/src/data/nicheDatabase.js";

const SITE_URL = baseMetadata.siteUrl;
const DIST = resolve(process.cwd(), "dist/public");

// Routes that must never get a prerendered file (redirects, private, or app-only)
const SKIP_ROUTES = new Set(["/404", "/dashboard", "/admin", "/members"]);

interface RouteMeta {
  route: string;
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  image: string;
  jsonLd: Record<string, unknown>[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : "/" + pathOrUrl}`;
}

function metaFromConfig(route: string, cfg: SeoMetadata): RouteMeta {
  const canonical = cfg.canonical || route;
  return {
    route,
    title: cfg.title || baseMetadata.defaultTitle,
    description: cfg.description || baseMetadata.defaultDescription,
    canonical,
    ogType: cfg.ogType || "website",
    image: toAbsolute(cfg.ogImage || baseMetadata.defaultImage),
    jsonLd: cfg.jsonLd ? [cfg.jsonLd] : [],
  };
}

function injectHead(html: string, m: RouteMeta): string {
  const canonicalAbs = toAbsolute(m.canonical);
  const title = escapeHtml(m.title);
  const desc = escapeHtml(m.description);

  let head = html;
  head = head.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  head = head.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${desc}" />`
  );
  head = head.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalAbs}" />`
  );
  // Open Graph
  head = head.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalAbs}" />`);
  head = head.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  head = head.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`);
  head = head.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${m.image}" />`);
  head = head.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${m.ogType}" />`);
  // Twitter
  head = head.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  head = head.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`);
  head = head.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${m.image}" />`);

  if (m.route === "/") {
    head = head.replace(
      "</head>",
      '    <meta name="robots" content="noindex, nofollow" />\n  </head>'
    );
  }

  if (m.jsonLd.length > 0) {
    const tags = m.jsonLd
      .map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/<\//g, "<\\/")}</script>`)
      .join("\n    ");
    head = head.replace("</head>", `    ${tags}\n  </head>`);
  }
  return head;
}

// Extract static routes from App.tsx (same approach as generate-sitemap.ts)
function extractRoutes(): string[] {
  const appPath = resolve(process.cwd(), "client/src/App.tsx");
  const content = readFileSync(appPath, "utf-8");
  const routeRegex = /<Route\s+path="([^"]+)"\s+component=/g;
  const routes: string[] = [];
  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    const p = match[1];
    if (!p.includes(":") && !SKIP_ROUTES.has(p) && p !== "*") routes.push(p);
  }
  return [...new Set(routes)];
}

function main() {
  const templatePath = resolve(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.error(`prerender-meta: ${templatePath} not found — run vite build first`);
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf-8");

  // canonical path -> config entry
  const byCanonical = new Map<string, SeoMetadata>();
  for (const cfg of Object.values(pageSeoConfig)) {
    if (cfg.canonical) byCanonical.set(cfg.canonical, cfg);
  }

  const metas: RouteMeta[] = [];

  for (const route of extractRoutes()) {
    const cfg = byCanonical.get(route);
    const m = metaFromConfig(route, cfg || {});
    if (route === "/home") m.jsonLd.push(organizationSchema, websiteSchema);
    metas.push(m);
  }

  // Blog articles — full Article SEO per post
  for (const a of articles as any[]) {
    const route = `/blog/${a.slug}`;
    const url = `${SITE_URL}${route}`;
    metas.push({
      route,
      title: `${a.title} — B.N.E. Studio`,
      description: a.excerpt || baseMetadata.defaultDescription,
      canonical: route,
      ogType: "article",
      image: toAbsolute(a.graphics?.[0]?.url || baseMetadata.defaultImage),
      jsonLd: [
        blogPostSchema(a.title, a.excerpt || "", url, a.publishedAt, a.author || "BNE Studio"),
      ],
    });
  }

  // Niche detail pages
  try {
    for (const niche of NICHE_DATABASE as any[]) {
      const route = getNichePath(niche);
      const name = niche.name || niche.title || "Creator Niche";
      metas.push({
        route,
        title: `${name} — Creator Niche Analysis — B.N.E. Studio`,
        description: `Data-driven niche intelligence on ${name}: competition, revenue potential, and positioning strategy from B.N.E. Studio.`,
        canonical: route,
        ogType: "website",
        image: toAbsolute(baseMetadata.defaultImage),
        jsonLd: [],
      });
    }
  } catch (e) {
    console.warn("prerender-meta: niche pages skipped:", (e as Error).message);
  }

  let count = 0;
  for (const m of metas) {
    // dist/public/<route>/index.html — served automatically by express.static
    const targetDir = m.route === "/" ? DIST : resolve(DIST, m.route.slice(1));
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(resolve(targetDir, "index.html"), injectHead(template, m));
    count++;
  }

  console.log(`prerender-meta: wrote ${count} route HTML files`);
}

main();
