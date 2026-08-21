# BNE Agency — Sitewide SEO Implementation Plan

> **Source**: AI-generated plan (Antigravity / Google DeepMind), session `e32612f2`, 2026-08-17.
> **Last updated**: 2026-08-21 — Merged with Phase 2 audit findings. Implementation in progress.

---

## Background

Comprehensive SEO overhaul across the BNE Agency web app (`https://blacklisted.studio`).
The plan covers metadata tag injection, JSON-LD structured schemas, crawlability, Core Web Vitals
signals, E-E-A-T, image sitemaps, breadcrumbs, and automated deploy + indexing pings.

---

## ? Phase 1 — Completed (2026-08-17)

All items below were confirmed complete in the previous session walkthrough.

| Item | Status |
|---|---|
| Fix domain typo `blackisted.studio` ? `blacklisted.studio` in `Seo.tsx` | ? Done |
| Move `<HelmetProvider>` to root `App.tsx` | ? Done |
| Create `robots.txt` with crawler rules + sitemap refs | ? Done |
| Create `sitemap.xml` with 27+ public routes | ? Done |
| Add `<Seo>` + schemas to Home, Splash, AllServices, NicheMatcher, Tools, University | ? Done |
| Add `<Seo>` to Onboarding, Blog, ArticleDetail, ServiceTiers, InPersonServices | ? Done |
| Create `scripts/submit-seo.ts` Render deploy + sitemap ping script | ? Done |
| Commit, push, deploy to production, ping Google & Bing | ? Done |
| `pnpm check` — 0 TypeScript compile errors | ? Done |
| Full `Seo.tsx` component with OG, Twitter Card, canonical, JSON-LD support | ? Done |
| `seo.config.ts` with `pageSeoConfig` + schema builders | ? Done |
| `lib/schema/builders.ts` — typed JSON-LD builders (Organization, WebSite, Breadcrumb, Service, FAQ, HowTo, TechArticle, BlogPosting) | ? Done |

---

## ?? Phase 2 — Audit Findings (2026-08-21)

### 2.1 Technical & Crawl Audit

| Finding | Severity | Status |
|---|---|---|
| `robots.txt` missing `Crawl-delay: 1` | Low | ? Pending |
| No image sitemap (critical for media-heavy creator content) | Medium | ? Pending |
| No video sitemap | Low | ? Pending |
| No `rel="dns-prefetch"` for critical third-party assets | Low | ? Pending |
| No `rel="preload"` for hero fonts/images | Low | ? Pending |
| `sitemap.xml` lastmod dates stale (still June 2026) | Medium | ? Pending |
| No hreflang tags | Medium | ? Pending |
| No canonical tag in static `index.html` (only runtime via React Helmet) | Medium | ? Pending |

### 2.2 Schema / Structured Data Audit

| Finding | Severity | Status |
|---|---|---|
| `organizationSchema` + `websiteSchema` exported but NEVER injected on any page | ?? Critical | ? Pending |
| No BreadcrumbList schema on any page | High | ? Pending |
| `ArticleDetail.tsx` needs dynamic BlogPosting schema from article data | High | ? Pending |
| `NicheMatcher.tsx` uses `pageKey="nicheMatcher"` but config key is `niche-matcher` | High | ? Pending |
| `ComplianceVault.tsx` uses `pageKey="complianceVault"` — key missing from pageSeoConfig | Medium | ? Pending |
| `Dashboard.tsx` uses `pageKey="dashboard"` — key missing from pageSeoConfig | Medium | ? Pending |
| `CreatorTools.tsx` uses `pageKey="creatorTools"` — key missing from pageSeoConfig | Medium | ? Pending |
| Missing Schema types: Course (University), WebApplication (tools), FAQPage (pricing) | High | ? Pending |

### 2.3 On-Page & Metadata Audit

| Finding | Severity | Status |
|---|---|---|
| 40+ secondary pages use broken/missing pageKey ? fall back to default title | ?? Critical | ? Pending |
| No breadcrumb UI nav component exists | Medium | ? Pending |
| No OG image for individual blog articles | High | ? Pending |
| Missing author bios on blog articles | Medium | ? Pending |

### 2.4 E-E-A-T & Trust Signals

| Finding | Severity | Status |
|---|---|---|
| No About page with founder credentials | Medium | ? Pending |
| No client testimonials with schema | Medium | ? Pending |
| No case studies with measurable results | Medium | ? Pending |

### 2.5 Performance / Core Web Vitals

| Finding | Severity | Status |
|---|---|---|
| No `rel="preload"` for LCP hero image/font | Medium | ? Pending |
| No `dns-prefetch` for API domains | Low | ? Pending |
| `maximum-scale=1` viewport (accessibility concern) | Low | ? Pending |

### 2.6 Infrastructure

| Finding | Severity | Status |
|---|---|---|
| No Cloudflare cache purge on deploy | Medium | ? Pending |
| `submit-seo.ts` not integrated into GitHub Actions CI/CD | Medium | ? Pending |
| No automated `sitemap.xml` lastmod update script | Medium | ? Pending |

---

## ?? Priority Implementation Order

### Immediate — Critical
1. Fix mismatched `pageKey` values (NicheMatcher, ComplianceVault, Dashboard, CreatorTools)
2. Inject `organizationSchema` + `websiteSchema` in root `App.tsx` `<Helmet>`
3. Add `BlogPosting` schema dynamically to `ArticleDetail.tsx`
4. Add missing `pageSeoConfig` entries for all broken keys

### Short-Term — High (3 days)
5. Build Breadcrumb UI nav component + BreadcrumbList schema
6. Add Course schema to University.tsx
7. Add WebApplication schema to tools pages
8. Add FAQPage schema to ServiceTiers + ComplianceVault
9. Update index.html with dns-prefetch, preload, static canonical
10. Add Crawl-delay to robots.txt

### Medium-Term (1 week)
11. Image sitemap generation script
12. Automated sitemap lastmod update on build
13. GitHub Actions workflow for cache purge + sitemap ping
14. OG image for top pages + blog articles
15. Author bio component

### Long-Term (2 weeks)
16. hreflang implementation
17. SEO dashboard / Core Web Vitals monitoring
18. Pillar page keyword strategy
19. About page with E-E-A-T signals
20. Testimonials with Review schema

---

## File Map

| File | Role |
|---|---|
| `client/src/components/Seo.tsx` | Core SEO Helmet component |
| `client/src/seo.config.ts` | Page metadata config + schema exports |
| `client/src/lib/schema/builders.ts` | JSON-LD typed schema builders |
| `client/src/App.tsx` | Root — HelmetProvider wraps everything |
| `client/index.html` | Static HTML shell |
| `robots.txt` | Crawler rules |
| `sitemap.xml` | URL catalog (27 pages) |
| `scripts/submit-seo.ts` | Render deploy + Google/Bing ping |
| `docs/seo-plan.md` | This file — living plan |
