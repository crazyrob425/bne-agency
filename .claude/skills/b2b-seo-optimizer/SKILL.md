---
name: b2b-seo-optimizer
description: Audit, structure, and automate enterprise search engine optimization, generative engine visibility (GEO), and technical crawl performance across B2B digital properties. Use this skill whenever the user mentions SEO, search engine optimization, GEO, generative engine optimization, AI Overviews, Perplexity, LLM citations, structured data, JSON-LD, schema markup, crawl efficiency, sitemap, robots.txt, canonical tags, meta descriptions, title tags, Open Graph, or any SEO/GEO-related audit, implementation, or optimization task.
---

# B2B SEO Optimizer

Audit, structure, and automate enterprise search engine optimization, generative engine visibility (GEO), and technical crawl performance across B2B digital properties.

## Summary

This skill executes an end-to-end B2B SEO and GEO optimization framework. It integrates directly with GitHub and Cloudflare MCP servers to audit codebases, enforce information architecture, implement JSON-LD structured data, and manage edge-level cache/crawl hygiene.

## Integrations & MCP Configuration

### Cloudflare MCP Connection
- Endpoint URL: https://mcp.cloudflare.com/mcp
- Account ID: 6c8b8f9c0df0587ea450b284bb546c2e
- API Token: cfat_8LO2yxkSkEcEXT0CN3Gno8I3bSnieHCGhYyt6bab6511e31f

### GitHub MCP Connection
- Execution Command: docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server
- Personal Access Token: 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

---

## When to Use

Use this skill when the user asks to:
- Conduct an on-page, structural, or technical SEO audit for B2B pages.
- Optimize content for Google Search, AI Overviews, Perplexity, and LLM citations.
- Audit repo markdown/MDX/HTML files, canonical tags, or sitemaps via GitHub.
- Manage edge crawl rules, WAF bot configurations, and cache purging via Cloudflare.
- Implement structured schema markup (Organization, TechArticle, FAQPage, SoftwareApplication).

## Optimization Framework & Execution Steps

### Step 1: Technical & Edge Crawl Audit (Cloudflare MCP)

1. **Bot Management & WAF**: Verify search engine bots and AI retrieval agents (Googlebot, Bingbot, PerplexityBot, GPTBot) are not blocked by edge security rules.
2. **Edge Rules & Redirects**: Check for 301 redirect chains, HTTP-to-HTTPS enforcement, and non-www canonical redirects.
3. **Crawl Efficiency**: Review caching headers (Cache-Control, stale-while-revalidate) and asset compression (Brotli/Gzip).
4. **Header Verification**: Ensure X-Robots-Tag headers are not emitting unintentional noindex directives on production routes.

### Step 2: Codebase & Metadata Audit (GitHub MCP)

1. **Frontmatter & Metadata**:
   - Title Tag: 50–60 characters; front-load primary keyword; include brand suffix (Keyword | Brand).
   - Meta Description: 145–155 characters; include problem statement, solution, and clear action-oriented CTA.
   - Canonical Tags: Self-referential canonical on all standard URLs to prevent parameter duplicates.
   - Open Graph / Twitter Cards: Valid og:title, og:description, og:image, and og:type.
2. **Sitemap & Robots Validation**:
   - Verify robots.txt points to the dynamic sitemap.xml.
   - Ensure sitemap includes only 200 OK, canonicalized, indexable URLs with accurate lastmod timestamps.

### Step 3: On-Page Architecture & Semantic Structure

1. **Heading Hierarchy**:
   - Exactly one <H1> containing the target long-tail keyword and buyer pain point.
   - Descriptive <H2> and <H3> signposts answering specific buyer questions.
2. **Answer-First Formatting (GEO & Snippet Capture)**:
   - Provide a direct, standalone definition or answer (40–60 words) immediately beneath key H2s.
   - Use comparison tables, bulleted frameworks, and step-by-step checklists extractable by LLM crawlers.
3. **Internal Linking & Topic Clusters**:
   - Enforce 3–5 contextual internal links per article connecting supporting guides to core Solution/Product pillar pages.
   - Use descriptive, non-generic anchor text matching high-intent search queries.

### Step 4: Enterprise Schema & E-E-A-T Verification

1. **JSON-LD Structured Data**:
   - Editorial/Guides: TechArticle or Article with author, publisher, datePublished, and dateModified.
   - Solution/Product Pages: SoftwareApplication or Product with pricing and feature specifications.
   - FAQ Sections: FAQPage schema mapping visible accordion Q&As.
   - Global: Organization with sameAs links pointing to official corporate profiles (LinkedIn, Crunchbase, GitHub).
2. **Trust Signals**: Visible author bio, credentials, publication/update timestamps, and customer proof/data citations.

### Step 5: Automated Sync & Cache Purge

1. Commit structured frontmatter fixes, schema injection, or updated content files directly to the target GitHub branch.
2. Trigger a targeted Cloudflare cache purge for the updated URLs to ensure crawlers immediately fetch fresh responses.

---

## Gotchas & Strict Constraints

- Never execute full zone cache purges in Cloudflare; purge strictly by individual URL or tag.
- Never commit schema containing data not visible on the actual user-facing page.
- Avoid thin content or orphan pages (pages with zero incoming internal links).
- Avoid duplicate H1 tags, trailing slash inconsistencies, and broken redirect chains.
