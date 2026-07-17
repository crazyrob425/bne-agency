import { useState } from "react";
import type { Niche } from "@/data/nicheDatabase";
import nicheCardsJson from "@/data/nicheCards.json" with { type: "json" };
import { buildNicheClipartUrl, buildCategoryClipartUrl, CATEGORY_EMOJI_FALLBACK } from "@/data/nicheClipartMap";

export type NicheCardData = {
  title: string;
  description: string;
  keyFacts: string[];
  tipsTricks: string[];
  safetyPrecautions: string[];
  revenueStats: { low: string; average: string; high: string; top: string };
  subniches: string[];
  graphic: string;
  pg13Graphic: string;
  imageUrl: string;
  categoryImageUrl: string;
};

const nicheCards = nicheCardsJson as Record<string, NicheCardData>;

export function getNicheCardData(keyword: string): NicheCardData | undefined {
  return nicheCards[keyword];
}

export function useNicheCardData(niche: Niche): NicheCardData {
  const [data] = useState<NicheCardData | undefined>(() => getNicheCardData(niche.keyword));
  const nicheImageUrl = buildNicheClipartUrl(niche.keyword, niche.category);
  const categoryImageUrl = buildCategoryClipartUrl(niche.category);

  return (
    data ?? {
      title: `${niche.keyword} — Niche content series`,
      description: `${niche.keyword} sits in the ${niche.category} lane, where viewers respond to a very specific mood, visual cue, or dynamic. For this niche, the core opportunity is to build consistent, high-signal content that matches what the audience is already searching for.`,
      keyFacts: [
        `Category: ${niche.category}`,
        `Search volume: ${niche.searchVolume}`,
        `Competition: ${niche.competitionLevel}`,
        `Earning potential: ${niche.earningPotential}`,
      ],
      tipsTricks: [
        "Create a content calendar around this niche for consistent posting.",
        "Engage with community discussions to understand audience desires.",
        "Test multiple formats to find your highest-engagement style.",
      ],
      safetyPrecautions: [
        "Document all consent and boundary discussions.",
        "Use platform privacy tools and understand TOS.",
        "Know platform rules around explicitness.",
      ],
      revenueStats: {
        low: "$1k/mo",
        average: "$4k/mo",
        high: "$12k/mo",
        top: "$25k+/mo",
      },
      subniches: ["General", "Amateur", "Professional", "POV", "Custom"],
      graphic: CATEGORY_EMOJI_FALLBACK[niche.category] || "📌",
      pg13Graphic: `PG-13 clipart style illustration representing the ${niche.keyword} niche`,
      imageUrl: nicheImageUrl,
      categoryImageUrl,
    }
  );
}
