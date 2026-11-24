/**
 * Prerender SEO meta tags into static HTML per public route.
 *
 * Vite builds a single dist/public/index.html (empty shell). This script
 * clones it per route and injects route-specific <title>, meta description,
 * absolute canonical, Open Graph / Twitter tags, and JSON-LD — so crawlers,
 * link unfurlers, and Googlebot see real metadata without executing JS.
 *
 * It also writes a static, crawlable body into <div id="root"> (article text
 * for blog posts, a link list for the blog index and home) so AI crawlers that
 * don't run JavaScript can read the content. React's createRoot() replaces it
 * on mount. Head tags carry data-rh="true" so react-helmet-async replaces them
 * instead of adding a second canonical/description.
 *
 * Run: npx tsx scripts/seo/prerender-meta.ts   (wired into `pnpm build`)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

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
  bodyHtml?: string;
  publishedTime?: string;
}

const mdProcessor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify);
function markdownToHtml(md: string): string {
  return String(mdProcessor.processSync(md || ""));
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
  const RH = 'data-rh="true" ';

  // Idempotent: strip anything a previous prerender run added, so re-running
  // seo:prerender without a fresh `vite build` doesn't duplicate tags.
  let head = html
    .replace(/\s*<script data-rh="true" type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace(/\s*<meta property="article:published_time" content=".*?" \/>/g, "")
    .replace(/ data-rh="true"/g, "")
    .replace(/<div id="root"><!--prerender-->[\s\S]*?<!--\/prerender--><\/div>/, '<div id="root"></div>');
  head = head.replace(/<title[^>]*>.*?<\/title>/s, `<title ${RH.trim()}>${title}</title>`);
  head = head.replace(/<meta name="description" content=".*?" \/>/, `<meta ${RH}name="description" content="${desc}" />`);
  head = head.replace(/<link rel="canonical" href=".*?" \/>/, `<link ${RH}rel="canonical" href="${canonicalAbs}" />`);
  // Open Graph
  head = head.replace(/<meta property="og:url" content=".*?" \/>/, `<meta ${RH}property="og:url" content="${canonicalAbs}" />`);
  head = head.replace(/<meta property="og:title" content=".*?" \/>/, `<meta ${RH}property="og:title" content="${title}" />`);
  head = head.replace(/<meta property="og:description" content=".*?" \/>/, `<meta ${RH}property="og:description" content="${desc}" />`);
  head = head.replace(/<meta property="og:image" content=".*?" \/>/, `<meta ${RH}property="og:image" content="${m.image}" />`);
  head = head.replace(/<meta property="og:type" content=".*?" \/>/, `<meta ${RH}property="og:type" content="${m.ogType}" />`);
  // Twitter
  head = head.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta ${RH}name="twitter:title" content="${title}" />`);
  head = head.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta ${RH}name="twitter:description" content="${desc}" />`);
  head = head.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta ${RH}name="twitter:image" content="${m.image}" />`);

  // NOTE: the previous version injected `noindex, nofollow` on "/". "/" is the
  // canonical homepage (seo.config home.canonical = "/") and the page that ranks,
  // and dist/public/index.html is also Pages' SPA fallback — so that tag would
  // have de-indexed the homepage. Removed on purpose.

  const extra: string[] = [];
  if (m.publishedTime) extra.push(`<meta property="article:published_time" content="${escapeHtml(m.publishedTime)}" />`);
  for (const s of m.jsonLd) {
    extra.push(`<script ${RH}type="application/ld+json">${JSON.stringify(s).replace(/<\//g, "<\\/")}</script>`);
  }
  if (extra.length) head = head.replace("</head>", `    ${extra.join("\n    ")}\n  </head>`);

  if (m.bodyHtml) {
    head = head.replace('<div id="root"></div>', `<div id="root"><!--prerender--><div data-prerender="true" style="max-width:760px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.6">${m.bodyHtml}</div><!--/prerender--></div>`);
  }
  return head;
}

function linkList(items: { href: string; text: string }[]): string {
  return `<ul>${items.map((i) => `<li><a href="${i.href}">${escapeHtml(i.text)}</a></li>`).join("")}</ul>`;
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

  const sortedArticles = [...(articles as any[])].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
  const articleLinks = sortedArticles.map((a) => ({ href: `/blog/${a.slug}`, text: a.title }));

  for (const route of extractRoutes()) {
    const cfg = byCanonical.get(route) || (route === "/home" ? byCanonical.get("/") : undefined);
    const m = metaFromConfig(route, cfg || {});
    // "/" and "/home" render the same page; "/" is canonical (and /home 301s via _redirects).
    if (route === "/home") m.canonical = "/";
    if (route === "/" || route === "/home") {
      m.jsonLd.push(organizationSchema, websiteSchema);
      m.bodyHtml = `<h1>${escapeHtml(m.title)}</h1><p>${escapeHtml(m.description)}</p><h2>Latest guides</h2>${linkList(articleLinks.slice(0, 12))}<p><a href="/blog">All articles</a> · <a href="/services">Services</a> · <a href="/niche-matcher">Niche Matcher</a> · <a href="/tools">Free tools</a></p>`;
    } else if (route === "/blog") {
      m.bodyHtml = `<h1>${escapeHtml(m.title)}</h1><p>${escapeHtml(m.description)}</p>${linkList(articleLinks)}`;
    } else {
      m.bodyHtml = `<h1>${escapeHtml(m.title)}</h1><p>${escapeHtml(m.description)}</p><p><a href="/">Home</a> · <a href="/blog">Blog</a></p>`;
    }
    metas.push(m);
  }

  // Blog articles — full Article SEO per post
  for (const a of articles as any[]) {
    const route = `/blog/${a.slug}`;
    const url = `${SITE_URL}${route}`;
    metas.push({
      route,
      title: `${a.title} — B.N.E. Studio`,
      description: a.seoDescription || a.excerpt || baseMetadata.defaultDescription,
      canonical: route,
      ogType: "article",
      image: toAbsolute(a.graphics?.[0]?.url || baseMetadata.defaultImage),
      publishedTime: a.publishedAt,
      jsonLd: [
        {
          ...blogPostSchema(a.title, a.seoDescription || a.excerpt || "", url, a.publishedAt, a.author || "BNE Studio"),
          image: toAbsolute(a.graphics?.[0]?.url || baseMetadata.defaultImage),
          mainEntityOfPage: url,
          articleSection: a.category,
          keywords: (a.tags || []).join(", "),
          publisher: { "@type": "Organization", name: baseMetadata.siteName, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` } },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: a.title, item: url },
          ],
        },
      ],
      bodyHtml: `<article><p><a href="/blog">← All articles</a></p><h1>${escapeHtml(a.title)}</h1>${a.subtitle ? `<p><em>${escapeHtml(a.subtitle)}</em></p>` : ""}<p>By ${escapeHtml(a.author || "BNE Studio")} · ${escapeHtml(a.publishedAt || "")}</p>${markdownToHtml(a.content)}</article>`,
    });
  }

  // Niche detail pages
  try {
    for (const niche of NICHE_DATABASE as any[]) {
      const route = getNichePath(niche);
      const name = niche.keyword || niche.name || niche.title || "Creator Niche";
      metas.push({
        route,
        title: `${name} — Creator Niche Analysis — B.N.E. Studio`,
        description: `Data-driven niche intelligence on ${name}: competition, revenue potential, and positioning strategy from B.N.E. Studio.`,
        canonical: route,
        ogType: "website",
        image: toAbsolute(baseMetadata.defaultImage),
        jsonLd: [],
        bodyHtml: `<h1>${escapeHtml(name)} — creator niche analysis</h1><p>Data-driven niche intelligence on ${escapeHtml(name)}: competition, revenue potential, and positioning strategy from B.N.E. Studio.</p><p><a href="/niche-matcher">Take the Niche Matcher quiz</a> · <a href="/blog">Creator guides</a></p>`,
      });
    }
  } catch (e) {
    console.warn("prerender-meta: niche pages skipped:", (e as Error).message);
  }

  let count = 0;
  for (const m of metas) {
    // dist/public/<route>/index.html — served automatically by express.static
    const html = injectHead(template, m);
    if (m.route === "/") {
      writeFileSync(resolve(DIST, "index.html"), html);
    } else {
      // <route>.html: Cloudflare Pages serves /blog/x from blog/x.html with no
      // redirect, so the URL matches the canonical (no trailing slash).
      // <route>/index.html: kept for express.static (server/_core) deployments.
      const flat = resolve(DIST, m.route.slice(1) + ".html");
      mkdirSync(resolve(flat, ".."), { recursive: true });
      writeFileSync(flat, html);
      const dir = resolve(DIST, m.route.slice(1));
      mkdirSync(dir, { recursive: true });
      writeFileSync(resolve(dir, "index.html"), html);
    }
    count++;
  }

  console.log(`prerender-meta: wrote ${count} route HTML files`);
}

main();
