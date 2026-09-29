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
import { FREE_SOFTWARE } from "../../client/src/data/freeSoftware.js";
import {
  softwareAiDescription,
  softwareKeywords,
  softwareFaq,
  softwareAppSchema,
  softwareAiBrief,
  freeSoftwareCollectionSchema,
  stripSentences,
} from "../../client/src/lib/softwareSeo.js";

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
  /** Long-tail keyword list injected as <meta name="keywords"> */
  keywords?: string;
  /** Natural-language page brief for AI parsers, injected as an HTML comment */
  aiBrief?: string;
  /** Emit robots noindex,nofollow (private/transactional pages) */
  noIndex?: boolean;
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

/** Fallback keyword list derived from the page title when a config entry has none. */
function deriveKeywords(title: string): string {
  const stop = new Set(["the", "a", "an", "and", "or", "for", "of", "to", "in", "on", "with", "|", "—", "-", "&"]);
  const words = title
    .replace(/[|—–]/g, " ")
    .split(/[\s,]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 2 && !stop.has(w) && !/b\.?n\.?e/i.test(w) && w !== "studio");
  const phrases = [...new Set(words)].slice(0, 6);
  return [...phrases, "creator business", "BNE Studio"].join(", ");
}

function metaFromConfig(route: string, cfg: SeoMetadata): RouteMeta {
  const canonical = cfg.canonical || route;
  const title = cfg.title || baseMetadata.defaultTitle;
  return {
    route,
    title,
    description: cfg.description || baseMetadata.defaultDescription,
    canonical,
    ogType: cfg.ogType || "website",
    image: toAbsolute(cfg.ogImage || baseMetadata.defaultImage),
    jsonLd: cfg.jsonLd ? [cfg.jsonLd] : [],
    keywords: cfg.keywords || deriveKeywords(title),
    noIndex: cfg.noIndex,
  };
}

/**
 * Build the AI page brief: a natural-language, long-tail keyword rich summary
 * written for AI bots / chat interfaces to parse and quote. Injected as an
 * HTML comment so it never affects the visual page.
 */
function buildAiBrief(m: RouteMeta): string {
  const lines = [
    "AI-PAGE-BRIEF",
    `Page: ${m.title}`,
    `URL: ${toAbsolute(m.canonical)}`,
    `About: ${m.description}`,
  ];
  if (m.keywords) lines.push(`Topics: ${m.keywords}`);
  return lines.join("\n");
}

function injectAiBrief(head: string, m: RouteMeta): string {
  // Idempotency: strip briefs injected by a previous run (the "/" route shares
  // the template file, so re-runs would otherwise stack duplicates).
  head = head.replace(/<!--\s*\nAI-PAGE-BRIEF[\s\S]*?-->\n?/g, "");
  const brief = (m.aiBrief || buildAiBrief(m))
    .replace(/--/g, "—") // HTML comments must not contain "--"
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return head.replace("</head>", `  <!--\n${brief}\n  -->\n  </head>`);
}

function injectHead(html: string, m: RouteMeta): string {
  const canonicalAbs = toAbsolute(m.canonical);
  const title = escapeHtml(m.title);
  const desc = escapeHtml(m.description);

  let head = html;
  // Idempotency: strip tags a previous run injected (the "/" route shares the
  // template file, so re-runs would otherwise stack duplicates).
  head = head.replace(/<meta name="keywords"[^>]*>\n?/g, "");
  head = head.replace(/<meta name="robots"[^>]*>\n?/g, "");
  head = head.replace(/<script type="application\/ld\+json" data-seo-prerender="1">[\s\S]*?<\/script>\n?/g, "");
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

  // Long-tail keywords for classic + AI search parsers
  if (m.keywords) {
    head = head.replace(
      "</head>",
      `    <meta name="keywords" content="${escapeHtml(m.keywords)}" />\n  </head>`
    );
  }

  // Private/transactional pages: keep out of the index in static HTML too
  if (m.noIndex) {
    head = head.replace(
      "</head>",
      `    <meta name="robots" content="noindex, nofollow" />\n  </head>`
    );
  }

  if (m.jsonLd.length > 0) {
    const tags = m.jsonLd
      .map((s) => `<script type="application/ld+json" data-seo-prerender="1">${JSON.stringify(s).replace(/<\//g, "<\\/")}</script>`)
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
    // Alias routes serve another route's meta with that route's canonical:
    // /home -> /, /solutions/niche-intelligence -> /niche-matcher
    const aliasTarget: Record<string, string> = {
      "/home": "/",
      "/solutions/niche-intelligence": "/niche-matcher",
    };
    const lookupRoute = aliasTarget[route] || route;
    const cfg = byCanonical.get(lookupRoute);
    const m = metaFromConfig(route, cfg || {});
    if (lookupRoute === "/") {
      m.canonical = "/";
      m.jsonLd.push(organizationSchema, websiteSchema);
    }
    if (lookupRoute === "/niche-matcher") {
      m.canonical = "/niche-matcher";
    }
    if (route === "/free-software") {
      m.jsonLd.push(freeSoftwareCollectionSchema(FREE_SOFTWARE as any[]));
    }
    metas.push(m);
  }

  // Blog articles — full Article SEO per post
  for (const a of articles as any[]) {
    const route = `/blog/${a.slug}`;
    const url = `${SITE_URL}${route}`;
    const articleKeywords = [
      ...(Array.isArray(a.tags) ? a.tags : []),
      "creator business",
      "BNE Studio",
    ]
      .filter(Boolean)
      .slice(0, 12)
      .join(", ");
    metas.push({
      route,
      title: `${a.title} — B.N.E. Studio`,
      description: a.excerpt || baseMetadata.defaultDescription,
      canonical: route,
      ogType: "article",
      image: toAbsolute(a.graphics?.[0]?.url || baseMetadata.defaultImage),
      keywords: articleKeywords || undefined,
      jsonLd: [
        blogPostSchema(a.title, a.excerpt || "", url, a.publishedAt, a.author || "BNE Studio"),
      ],
    });
  }

  // Niche detail pages — disambiguate repeat niche names (e.g. "-2" variants) by category
  const seenNicheTitles = new Set<string>();
  try {
    for (const niche of NICHE_DATABASE as any[]) {
      const route = getNichePath(niche);
      const name = niche.keyword || niche.name || niche.title || "Creator Niche";
      let title = `${name} — Creator Niche Analysis — B.N.E. Studio`;
      let n = 2;
      while (seenNicheTitles.has(title)) {
        const qualifier = niche.category ? ` (${niche.category})` : ` — Variant ${n}`;
        title = `${name}${qualifier} — Creator Niche Analysis — B.N.E. Studio`;
        n++;
        if (n > 10) break;
      }
      seenNicheTitles.add(title);
      const nicheKeywords = [name, niche.category, "creator niche", "niche analysis", "creator business", "BNE Studio"]
        .filter(Boolean)
        .join(", ");
      metas.push({
        route,
        title,
        description: `Data-driven niche intelligence on ${name}: competition, revenue potential, and positioning strategy from B.N.E. Studio.`,
        canonical: route,
        ogType: "website",
        image: toAbsolute(baseMetadata.defaultImage),
        keywords: nicheKeywords,
        jsonLd: [],
      });
    }
  } catch (e) {
    console.warn("prerender-meta: niche pages skipped:", (e as Error).message);
  }

  // Free software review pages — SoftwareApplication + breadcrumb + FAQ SEO per tool,
  // plus the long-tail AI page brief for chat-interface parsers.
  const softwareMetas: RouteMeta[] = [];
  try {
    for (const tool of FREE_SOFTWARE as any[]) {
      const route = `/free-software/${tool.slug}`;
      const url = `${SITE_URL}${route}`;
      const aiDesc = softwareAiDescription(tool);
      const kw = softwareKeywords(tool);
      const meta: RouteMeta = {
        route,
        title: `${tool.name} Review — Free for Creators — B.N.E. Studio`,
        description: aiDesc,
        canonical: route,
        ogType: "website",
        image: toAbsolute(tool.screenshot || baseMetadata.defaultImage),
        keywords: kw,
        aiBrief: softwareAiBrief(tool),
        jsonLd: [
          softwareAppSchema(tool),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Free Software", item: `${SITE_URL}/free-software` },
              { "@type": "ListItem", position: 3, name: tool.name, item: url },
            ],
          },
          softwareFaq(tool),
        ],
      };
      metas.push(meta);
      softwareMetas.push(meta);
    }
  } catch (e) {
    console.warn("prerender-meta: free-software pages skipped:", (e as Error).message);
  }

  let count = 0;
  for (const m of metas) {
    // Baseline AEO: every public page gets at least a WebPage schema so no
    // page is structured-data naked. (No invented FAQs — WebPage is factual.)
    if (m.jsonLd.length === 0 && !m.noIndex) {
      m.jsonLd.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: m.title,
        url: toAbsolute(m.canonical),
        description: m.description,
        isPartOf: {
          "@type": "WebSite",
          name: "B.N.E. Studio",
          url: SITE_URL,
        },
      });
    }
    // dist/public/<route>/index.html — served automatically by express.static
    const targetDir = m.route === "/" ? DIST : resolve(DIST, m.route.slice(1));
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(resolve(targetDir, "index.html"), injectAiBrief(injectHead(template, m), m));
    count++;
  }

  console.log(`prerender-meta: wrote ${count} route HTML files`);

  // llms.txt — plain-markdown site index written for AI bots / chat interfaces
  writeLlmsTxt(metas, softwareMetas);
}

/**
 * Generate dist/public/llms.txt: a markdown index of every page, each with a
 * one-line AI-readable description, so LLM chat interfaces can discover,
 * understand, and cite site content.
 */
function writeLlmsTxt(all: RouteMeta[], software: RouteMeta[]) {
  const lines: string[] = [];
  lines.push(`# ${baseMetadata.siteName}`);
  lines.push(`> ${baseMetadata.defaultDescription}`);
  lines.push(`> Site: ${SITE_URL}`);
  lines.push("");

  const nonSoftware = all.filter((m) => !m.route.startsWith("/free-software/"));
  const staticRoutes = nonSoftware.filter(
    (m) => !m.route.startsWith("/blog/") && !m.route.startsWith("/niche-matcher/")
  );
  const blogRoutes = nonSoftware.filter((m) => m.route.startsWith("/blog/") && m.route !== "/blog");
  const nicheRoutes = nonSoftware.filter((m) => m.route.startsWith("/niche-matcher/"));

  const seenLlms = new Set<string>();
  lines.push("## Pages");
  for (const m of staticRoutes) {
    const canon = toAbsolute(m.canonical);
    if (seenLlms.has(canon)) continue; // dedupe canonical aliases (e.g. /home → /)
    seenLlms.add(canon);
    lines.push(`- [${m.title}](${canon}): ${stripSentences(m.description, 200)}`);
  }
  lines.push("");

  if (software.length) {
    lines.push("## Free Software Reviews (40 honest, long-form reviews of free & open-source creator tools)");
    for (const m of software) {
      lines.push(`- [${m.title}](${toAbsolute(m.canonical)}): ${stripSentences(m.description, 220)}`);
    }
    lines.push("");
  }

  if (blogRoutes.length) {
    lines.push("## Guides & Articles");
    for (const m of blogRoutes.slice(0, 60)) {
      lines.push(`- [${m.title}](${toAbsolute(m.canonical)}): ${stripSentences(m.description, 180)}`);
    }
    lines.push("");
  }

  if (nicheRoutes.length) {
    lines.push("## Creator Niche Intelligence");
    lines.push(`- [Niche Matcher](${SITE_URL}/niche-matcher): data-driven niche analysis across 1,052 market segments.`);
    lines.push(`- Individual niche reports: ${nicheRoutes.length} pages, e.g. ${nicheRoutes.slice(0, 3).map((m) => `[${m.title}](${toAbsolute(m.canonical)})`).join(", ")}`);
    lines.push("");
  }

  writeFileSync(resolve(DIST, "llms.txt"), lines.join("\n"));
  console.log(`prerender-meta: wrote llms.txt (${lines.length} lines)`);
}

main();
