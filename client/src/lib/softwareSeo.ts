/**
 * softwareSeo — shared AI/SEO builders for the Free Software Arsenal.
 *
 * Generates long-tail keyword enhanced descriptions, keyword lists, FAQPage
 * JSON-LD, and natural-language AI page briefs from the honest data fields in
 * freeSoftware.ts — so AI chat interfaces and search parsers can understand
 * and quote each review page accurately.
 *
 * Used by the SoftwareReview page (SPA meta) and by scripts/seo/prerender-meta.ts
 * (static HTML for crawlers). Keep this file dependency-free.
 */
import type { FreeSoftwareTool } from "@/data/freeSoftware";

const SITE_URL = "https://blacklisted.studio";

const GROUP_NOUN: Record<string, string> = {
  onlyfans: "OnlyFans and fan-platform creators",
  webcam: "webcam models and live streamers",
  companions: "independent in-person companions",
};

export function licenseLabelShort(tool: FreeSoftwareTool): string {
  if (tool.licenseType === "open-source")
    return tool.licenseName ? `open-source (${tool.licenseName})` : "open-source";
  if (tool.licenseType === "free") return "100% free";
  return "freemium with a free tier";
}

export function stripSentences(s: string, maxChars: number): string {
  const clean = (s || "").replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  const cut = clean.slice(0, maxChars);
  const lastStop = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf("? ")
  );
  return (lastStop > maxChars * 0.4 ? cut.slice(0, lastStop + 1) : cut).trim();
}

/** Long-tail keyword enhanced description — meta description + AI parsing. */
export function softwareAiDescription(tool: FreeSoftwareTool): string {
  const noun = GROUP_NOUN[tool.group] || "digital creators";
  const lic = licenseLabelShort(tool);
  const article = /^[aeiou]/i.test(lic) ? "an" : "a";
  const desc =
    `${tool.name} is ${article} ${lic} ${tool.category || "software"} tool for ${noun}. ` +
    `${tool.tagline || ""} ` +
    `Free tier: ${stripSentences(tool.freeTier || "free", 220)} ` +
    `Platforms: ${(tool.platforms || []).join(", ") || "see review"}. ` +
    `Rated ${tool.rating || 4}/5 for creators. ` +
    `Verdict: ${tool.verdict || ""}`;
  return stripSentences(desc, 420);
}

/** Long-tail keyword list for the meta keywords tag. */
export function softwareKeywords(tool: FreeSoftwareTool): string {
  const noun = GROUP_NOUN[tool.group] || "digital creators";
  const bits = [
    `${tool.name} review`,
    `free ${tool.name}`,
    `${tool.name} for ${noun}`,
    `free ${(tool.category || "software").toLowerCase()} for creators`,
    tool.licenseType === "open-source"
      ? `${tool.name} open source alternative`
      : `${tool.name} free tier`,
    "free software for creators",
    "open source creator tools",
    "no watermark free tools",
    ...(tool.platforms || []).map((p: string) => `${tool.name} ${p}`.toLowerCase()),
  ];
  return [...new Set(bits)].join(", ");
}

type Faq = { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } };

/** FAQPage JSON-LD built from the review's honest data fields. */
export function softwareFaq(tool: FreeSoftwareTool): Record<string, unknown> {
  const q = (name: string, text: string): Faq => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text: stripSentences(text, 500) },
  });
  const faqs: Faq[] = [
    q(
      `Is ${tool.name} really free?`,
      tool.licenseType === "open-source"
        ? `Yes — ${tool.name} is open source${tool.licenseName ? ` (${tool.licenseName})` : ""}, free to download and use. ${tool.freeTier || ""}`
        : tool.licenseType === "free"
          ? `Yes — ${tool.name} is completely free. ${tool.freeTier || ""}`
          : `${tool.name} has a free tier. ${tool.freeTier || ""} ${tool.paywall ? "Paid tiers: " + tool.paywall : ""}`
    ),
    q(
      `What's the catch with ${tool.name}'s free tier?`,
      tool.paywall
        ? stripSentences(tool.paywall, 400)
        : "No paywall — this one is genuinely free with no paid tier gating the core features."
    ),
    q(
      `Who is ${tool.name} best for?`,
      (tool.bestFor || []).join(" ") || `Creators looking for a free ${tool.category || "tool"}.`
    ),
    q(
      `What platforms does ${tool.name} run on?`,
      (tool.platforms || []).length
        ? `${tool.name} runs on ${(tool.platforms || []).join(", ")}.`
        : "Check the official site for current platform support."
    ),
  ];
  // Flags are honest caveats — publishable ones go in the FAQ; internal
  // research notes (phrased as instructions to the author) stay out.
  const publicFlags = (tool.flags || []).filter(
    (f) => !/captured verbatim|not directly observed|do not present|before recommending/i.test(f)
  );
  if (publicFlags.length) {
    faqs.push(q(`Anything to watch out for with ${tool.name}?`, publicFlags.join(" ")));
  }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs,
  };
}

/** SoftwareApplication JSON-LD with the long-tail description. */
export function softwareAppSchema(tool: FreeSoftwareTool): Record<string, unknown> {
  const url = `${SITE_URL}/free-software/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url,
    description: softwareAiDescription(tool),
    applicationCategory: tool.category || "MultimediaApplication",
    operatingSystem: (tool.platforms || []).join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(tool.rating || 4),
      bestRating: "5",
    },
  };
}

/** CollectionPage + ItemList JSON-LD for the /free-software index. */
export function freeSoftwareCollectionSchema(tools: FreeSoftwareTool[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Software Arsenal — 40 Free & Open-Source Tools for Creators",
    url: `${SITE_URL}/free-software`,
    description:
      "40 genuinely free and open-source apps for OnlyFans creators, webcam models, and in-person companions — streaming, editing, scheduling, bookkeeping, and safety. Honest free-tier details, no trials masquerading as free.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/free-software/${tool.slug}`,
        name: `${tool.name} — ${tool.tagline}`,
      })),
    },
  };
}
/** Natural-language page brief for AI parsers (injected as an HTML comment). */
export function softwareAiBrief(tool: FreeSoftwareTool): string {
  const url = `${SITE_URL}/free-software/${tool.slug}`;
  const lines = [
    "AI-PAGE-BRIEF",
    `Page: ${tool.name} Review — Free for Creators — B.N.E. Studio`,
    `URL: ${url}`,
    `About: ${softwareAiDescription(tool)}`,
    `Answers this page covers: Is ${tool.name} really free? | What's the catch with the free tier? | Who is it best for? | What platforms does it run on?${(tool.flags || []).length ? " | Anything to watch out for?" : ""}`,
    `Key facts: License: ${licenseLabelShort(tool)}; Platforms: ${(tool.platforms || []).join(", ")}; Rating: ${tool.rating || 4}/5; Category: ${tool.category}; Official site: ${tool.officialUrl || "see page"}`,
    `Topics: ${softwareKeywords(tool)}`,
  ];
  return lines.join("\n");
}
