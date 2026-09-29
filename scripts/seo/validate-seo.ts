/**
 * SEO Validation Script — hardened.
 * Validates generated SEO assets after build and FAILS the build on regressions:
 * duplicate prerender titles, missing JSON-LD, noindex/sitemap conflicts,
 * sitemap <-> App.tsx route parity, and the / noindex regression.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "dist/public");

type Check = { name: string; status: "✅" | "❌" | "⚠️"; message: string };
const checks: Check[] = [];
const ok = (name: string, message: string) => checks.push({ name, status: "✅", message });
const warn = (name: string, message: string) => checks.push({ name, status: "⚠️", message });
const fail = (name: string, message: string) => checks.push({ name, status: "❌", message });

function prerenderedPages(): { route: string; html: string }[] {
  const pages: { route: string; html: string }[] = [];
  const walk = (dir: string, routePrefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, `${routePrefix}/${entry.name}`);
      } else if (entry.name === "index.html" && routePrefix) {
        pages.push({ route: routePrefix, html: fs.readFileSync(full, "utf-8") });
      }
    }
  };
  if (fs.existsSync(PUBLIC_DIR)) walk(PUBLIC_DIR, "");
  return pages;
}

function titleOf(html: string): string {
  const m = html.match(/<title>(.*?)<\/title>/s);
  return m ? m[1].trim() : "";
}

async function validateSEO() {
  console.log("🔍 Validating SEO assets...\n");

  // ── Sitemap ──────────────────────────────────────────────────────────────
  const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, "utf-8");
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const urlCount = urls.length;
    urlCount >= 100
      ? ok("sitemap.xml", `${urlCount} URLs found`)
      : warn("sitemap.xml", `${urlCount} URLs found (expected 100+)`);

    // noindex/sitemap conflicts: /dashboard and /payment/success must NOT be listed
    const banned = urls.filter((u) => /\/dashboard\/?$|\/payment\/success\/?$/.test(u));
    banned.length === 0
      ? ok("sitemap: no noindex URLs", "/dashboard and /payment/success excluded")
      : fail("sitemap: noindex conflict", `sitemap lists noindex pages: ${banned.join(", ")}`);

    // /home must not appear as a separate indexed URL (alias of /)
    urls.some((u) => /\/home\/?$/.test(u))
      ? fail("sitemap: /home alias", "sitemap lists /home; canonical is /")
      : ok("sitemap: /home alias", "/home excluded, / is canonical");

    // route parity: every static App.tsx route (minus excluded) should be in sitemap
    const appSrc = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf-8");
    const appRoutes = [...new Set(
      [...appSrc.matchAll(/<Route\s+path="([^"]+)"\s+component=/g)].map((m) => m[1])
    )].filter((r) => !r.includes(":") && r !== "*" && r !== "/404"
      && !["/home", "/dashboard", "/payment/success"].includes(r));
    const sitemapPaths = new Set(urls.map((u) => new URL(u).pathname));
    const missingRoutes = appRoutes.filter((r) => !sitemapPaths.has(r) && !sitemapPaths.has(r + "/"));
    missingRoutes.length === 0
      ? ok("sitemap: route parity", `${appRoutes.length} App.tsx routes all present`)
      : fail("sitemap: route parity", `missing from sitemap: ${missingRoutes.join(", ")}`);
  } else {
    fail("sitemap.xml", "Not found");
  }

  // ── RSS ──────────────────────────────────────────────────────────────────
  const rssPath = path.join(PUBLIC_DIR, "rss.xml");
  if (fs.existsSync(rssPath)) {
    const rss = fs.readFileSync(rssPath, "utf-8");
    const itemCount = (rss.match(/<item>/g) || []).length;
    itemCount >= 12
      ? ok("rss.xml", `${itemCount} articles found`)
      : warn("rss.xml", `${itemCount} articles found (expected 12+)`);
  } else {
    fail("rss.xml", "Not found");
  }

  // ── llms.txt (AI bot index) ───────────────────────────────────────────────
  const llmsPath = path.join(PUBLIC_DIR, "llms.txt");
  if (fs.existsSync(llmsPath)) {
    const llms = fs.readFileSync(llmsPath, "utf-8");
    const entries = (llms.match(/^- \[/gm) || []).length;
    entries >= 100
      ? ok("llms.txt", `${entries} page entries for AI bots`)
      : warn("llms.txt", `only ${entries} entries (expected 100+)`);
  } else {
    fail("llms.txt", "Not found — AI bot index missing");
  }

  // ── Prerendered pages ────────────────────────────────────────────────────
  const pages = prerenderedPages();
  pages.length > 0
    ? ok("prerendered pages", `${pages.length} route HTML files`)
    : fail("prerendered pages", "no prerendered route HTML found");

  // / must never carry noindex
  const rootHtml = path.join(PUBLIC_DIR, "index.html");
  if (fs.existsSync(rootHtml)) {
    const html = fs.readFileSync(rootHtml, "utf-8");
    /noindex/i.test(html)
      ? fail("/: noindex regression", "root index.html contains noindex")
      : ok("/: indexable", "no noindex on homepage");
    const canon = html.match(/<link rel="canonical" href="([^"]+)" \/>/);
    canon && canon[1] === "https://blacklisted.studio/"
      ? ok("/: canonical", "canonical is https://blacklisted.studio/")
      : fail("/: canonical", `canonical is ${canon ? canon[1] : "missing"}`);
  }

  // duplicate titles across prerendered pages (crawl-quality killer).
  // Routes sharing one canonical (e.g. /home → /) are aliases, not dupes.
  const canonOf = (html: string) => {
    const m = html.match(/<link rel="canonical" href="([^"]+)" \/>/);
    return m ? m[1] : "";
  };
  const seen = new Map<string, { canon: string; routes: string[] }>();
  for (const p of pages) {
    const t = titleOf(p.html);
    if (!t) continue;
    const entry = seen.get(t) ?? { canon: canonOf(p.html), routes: [] };
    entry.routes.push(p.route);
    seen.set(t, entry);
  }
  const dupes = [...seen.entries()].filter(([, e]) => {
    const canons = new Set(e.routes.map((r) => {
      const p = pages.find((x) => x.route === r);
      return canonOf(p ? p.html : "");
    }));
    return canons.size > 1; // same title on DIFFERENT canonicals = real problem
  });
  dupes.length === 0
    ? ok("prerender: unique titles", "no duplicate <title> across routes")
    : fail("prerender: duplicate titles", dupes.map(([t, e]) => `"${t.slice(0, 50)}" ×${e.routes.length}: ${e.routes.slice(0, 4).join(", ")}`).join(" | "));

  // every prerendered page needs a real description + keywords
  const noDesc = pages.filter((p) => {
    const m = p.html.match(/<meta name="description" content="(.*?)" \/>/);
    return !m || m[1].length < 40;
  });
  noDesc.length === 0
    ? ok("prerender: descriptions", "all pages have substantive meta descriptions")
    : warn("prerender: descriptions", `${noDesc.length} pages with thin/missing descriptions`);

  const noKw = pages.filter((p) => !p.html.includes('name="keywords"'));
  noKw.length === 0
    ? ok("prerender: keywords", "all pages carry meta keywords")
    : warn("prerender: keywords", `${noKw.length} pages missing meta keywords: ${noKw.slice(0, 5).map((p) => p.route).join(", ")}`);

  // AI page briefs present (the chat-interface parse target)
  const noBrief = pages.filter((p) => !p.html.includes("AI-PAGE-BRIEF"));
  noBrief.length === 0
    ? ok("prerender: AI page briefs", "all pages carry AI-PAGE-BRIEF comments")
    : warn("prerender: AI page briefs", `${noBrief.length} pages missing AI brief`);

  // JSON-LD on money/arsenal pages
  const mustHaveJsonLd = ["/free-software", "/onlyfans-management", "/webcam-models", "/in-person-companions"];
  const missingLd = mustHaveJsonLd.filter((r) => {
    const p = pages.find((x) => x.route === r);
    return !p || !p.html.includes('type="application/ld+json"');
  });
  missingLd.length === 0
    ? ok("JSON-LD: key pages", "money + arsenal pages carry structured data")
    : fail("JSON-LD: key pages", `missing JSON-LD: ${missingLd.join(", ")}`);

  // free-software review pages: SoftwareApplication + FAQPage each
  const swPages = pages.filter((p) => /^\/free-software\/[^/]+$/.test(p.route));
  const swBad = swPages.filter((p) => !p.html.includes('"SoftwareApplication"') || !p.html.includes('"FAQPage"'));
  swPages.length >= 40 && swBad.length === 0
    ? ok("software reviews: schema", `${swPages.length} review pages carry SoftwareApplication + FAQPage`)
    : fail("software reviews: schema", `${swPages.length} pages, ${swBad.length} missing schema`);

  // ── index.html baseline ──────────────────────────────────────────────────
  if (fs.existsSync(rootHtml)) {
    const html = fs.readFileSync(rootHtml, "utf-8");
    const hasThemeColor = html.includes("theme-color");
    hasThemeColor ? ok("index.html meta", "theme-color present") : warn("index.html meta", "theme-color missing");
  }

  // ── Results ──────────────────────────────────────────────────────────────
  console.log("📊 Validation Results:\n");
  for (const check of checks) {
    console.log(`${check.status} ${check.name}: ${check.message}`);
  }
  const failed = checks.filter((c) => c.status === "❌").length;
  const warnings = checks.filter((c) => c.status === "⚠️").length;
  console.log(`\n📈 Summary: ${checks.length - failed - warnings} passed, ${warnings} warnings, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

validateSEO().catch(console.error);
