/**
 * Subconscious Niche-Matching Engine
 *
 * Maps a user's latent psychological profile (derived from a personality quiz that
 * never names a niche) onto real content-creator niches by comparing their
 * DimensionVector against each niche's psychological signature.
 *
 * No external dependencies; safe under TypeScript strict mode.
 */

import { NICHE_DATABASE, type Niche } from "@/data/nicheDatabase";
import {
  type DimensionVector,
  type DimensionKey,
  type AttachmentVector,
  categorySignature,
  similarity,
  weightedSimilarity,
  computeNetworkTraitDensity,
  topDimensions,
} from "@/data/psychDimensions";
import {
  scoreAnswers,
  computeAttachmentVector,
  type QuizAnswers,
} from "@/data/nicheQuiz";

export interface NicheMatchConnectionPoint {
  trait: DimensionKey;
  label: string;
  userScore: number;
  nicheTarget: number;
  delta: number;
  insight: string;
}

export interface NicheMatch {
  niche: Niche;
  score: number; // 0..100 overall fit
  affinity: number; // 0..1 weighted similarity between user vector and niche signature
  drivers: { key: DimensionKey; value: number }[]; // user's top dimensions that drove the match
  reason: string; // 1-2 sentence "subconscious insight" explaining the unexpected fit
  connectionPoints?: NicheMatchConnectionPoint[]; // brain-mapped psychological telemetry points
}

export interface MatchResult {
  userVector: DimensionVector;
  topDimensions: { key: DimensionKey; value: number }[];
  matches: NicheMatch[]; // sorted desc by score
}

export interface SubconsciousInsight {
  headline: string;
  drivers: { key: DimensionKey; value: number }[];
  summary: string;
}

type RankOptions = { limit?: number; onlyElite?: boolean };

const EARNING_RANK: Record<Niche["earningPotential"], number> = {
  "very-high": 0,
  high: 1,
  medium: 2,
  low: 3,
};

/** Per-dimension psychological profiling templates (non-explicit, dynamic-focused). */
const REASON_TEMPLATES: Record<DimensionKey, string> = {
  dominance:
    "Your high Dominance and comfort directing others points to formats where command is the product — niches where you lead and the audience follows.",
  submission:
    "Your submissive lean reveals niches built around yielding and service — where the audience's desire to direct is the hook.",
  novelty:
    "Your appetite for the unconventional surfaces niches most creators never consider — strange, specific, and low-competition.",
  sensation:
    "Your craving for intensity maps to high-stimulation niches where the physical edge IS the content.",
  intimacy:
    "Your need for connection reveals niches built on relationship and closeness, not just visuals.",
  exhibition:
    "Your comfort being watched points to performance-led niches where the gaze is the whole point.",
  taboo:
    "Your ease with the forbidden unlocks edge niches that mainstream creators avoid — high margin, lower crowd.",
  structure:
    "Your love of rules and ritual fits niches built on discipline, protocol, and repeatable role structure.",
  nurture:
    "Your caregiving warmth maps to gentle, nurturing niches where emotional safety sells.",
  material:
    "Your status drive points to luxury and financial-power niches where tribute and ownership are the fantasy.",
};

/** Human-readable label for a dimension, used in insight prose. */
const DIMENSION_LABEL: Record<DimensionKey, string> = {
  dominance: "dominance",
  submission: "submission",
  novelty: "novelty-seeking",
  sensation: "sensation-seeking",
  intimacy: "intimacy",
  exhibition: "exhibition",
  taboo: "edge-seeking",
  structure: "structure",
  nurture: "nurture",
  material: "status and material drive",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Read the optional per-niche signature override without modifying the source type. */
function readNichePsych(niche: Niche): DimensionVector | undefined {
  return (niche as Niche & { psych?: DimensionVector }).psych;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function buildUserProfile(answers: QuizAnswers): DimensionVector {
  const rawVector = scoreAnswers(answers);
  // Apply Exploratory Graph Analysis (EGAnet) partial correlation network smoothing
  return computeNetworkTraitDensity(rawVector);
}

export function effectiveSignature(niche: Niche): DimensionVector {
  return readNichePsych(niche) ?? categorySignature(niche.category);
}

export function rankNiches(
  answers: QuizAnswers,
  opts: RankOptions = {},
): NicheMatch[] {
  const userVector = buildUserProfile(answers);
  const userTop = topDimensions(userVector, 3);

  const pool = opts.onlyElite
    ? NICHE_DATABASE.filter((n) => n.earningPotential === "very-high")
    : NICHE_DATABASE;

  const matches: NicheMatch[] = pool.map((niche) => {
    const signature = effectiveSignature(niche);
    // IRT 2PL Fisher-Weighted Cosine Similarity (mirt model)
    const affinity = weightedSimilarity(userVector, signature);
    const score = Math.round(affinity * 100);

    const primary = userTop[0]?.key;
    const secondary = userTop[1]?.key;

    const base = primary ? REASON_TEMPLATES[primary] : "";
    const secondaryText = secondary
      ? ` Paired with your ${DIMENSION_LABEL[secondary]}, your mindset and lifestyle provide an ideal foundation to build a highly lucrative brand in ${niche.keyword}.`
      : ` Your natural traits give you a strong competitive edge in ${niche.keyword}.`;

    const reason = (base + secondaryText).trim();

    // Brain-mapped psychological telemetry connection points
    const connectionPoints: NicheMatchConnectionPoint[] = userTop.map((driver) => {
      const uScore = Math.round(userVector[driver.key]);
      const nTarget = Math.round(signature[driver.key]);
      const delta = Math.abs(uScore - nTarget);
      return {
        trait: driver.key,
        label: DIMENSION_LABEL[driver.key],
        userScore: uScore,
        nicheTarget: nTarget,
        delta,
        insight: `Your ${DIMENSION_LABEL[driver.key]} score (${uScore}/100) closely matches ${niche.keyword}'s demand curve (${nTarget}/100).`,
      };
    });

    return {
      niche,
      score,
      affinity,
      drivers: userTop,
      reason,
      connectionPoints,
    };
  });

  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      EARNING_RANK[a.niche.earningPotential] -
      EARNING_RANK[b.niche.earningPotential]
    );
  });

  return matches.slice(0, opts.limit ?? 24);
}

export function getTop3(answers: QuizAnswers): NicheMatch[] {
  const ranked = rankNiches(answers, { limit: 60 });
  const seen = new Set<string>();
  const out: NicheMatch[] = [];
  for (const m of ranked) {
    if (!seen.has(m.niche.category)) {
      seen.add(m.niche.category);
      out.push(m);
    }
    if (out.length === 3) break;
  }
  for (const m of ranked) {
    if (out.length >= 3) break;
    if (!out.includes(m)) out.push(m);
  }
  return out.slice(0, 3);
}

export function getSubconsciousInsight(
  answers: QuizAnswers,
): SubconsciousInsight {
  const userVector = buildUserProfile(answers);
  const drivers = topDimensions(userVector, 3);

  const headlineWords = drivers
    .slice(0, 2)
    .map((d) => DIMENSION_LABEL[d.key]);
  const headline =
    headlineWords.length > 1
      ? `${capitalize(headlineWords[0])} + ${headlineWords[1]}`
      : capitalize(headlineWords[0] ?? "a balanced profile");

  const summary = buildSummary(drivers);

  return { headline, drivers, summary };
}

// ─── Internals ─────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
}

function buildSummary(drivers: { key: DimensionKey; value: number }[]): string {
  const parts = drivers.map((d) => REASON_TEMPLATES[d.key].replace(/\.$/, ""));
  if (parts.length === 0) {
    return "Your responses describe a balanced, low-signal profile — no single dynamic dominates your latent preferences.";
  }
  const lead = parts[0];
  const rest = parts.slice(1);
  const tail = rest.length
    ? " " + rest.join(" ") + "."
    : ".";
  return `${lead}${tail} Together these point to content dynamics you'd probably describe as 'not me' — until the numbers said otherwise.`;
}

// ─── Attachment Overlay ────────────────────────────────────────────────────────

/**
 * Attachment-style → niche-boost mapping.
 *
 * Based on Ten Brink et al. (2021):
 *   - Secure attachment → dominance, BDSM dom roles, GFE, Luxury
 *   - Anxious-preoccupied → submissive niches, GFE, service content, nurture
 *   - Dismissive-avoidant → solo-exhibition, luxury, reduced intimacy-heavy
 *   - Fearful-avoidant → taboo/sensation niches, reduced intimacy-heavy
 */
const ATTACHMENT_BOOST: Record<
  AttachmentVector["quadrant"],
  Record<string, number>
> = {
  secure: {
    "BDSM & Power Exchange": 0.15,
    "Relationship Dynamic": 0.10,
    "Roleplay & Fantasy": 0.05,
    "Occupation Fantasy": 0.08,
    "Audio & ASMR": 0.05,
  },
  "anxious-preoccupied": {
    "Relationship Dynamic": 0.12,
    "Audio & ASMR": 0.10,
    "Body Types & Physical": 0.05,
    "Sensation & Stimulation": 0.05,
    "Content Format": 0.05,
  },
  "dismissive-avoidant": {
    "Content Format": 0.12,
    "Clothing & Aesthetics": 0.08,
    "Visual Style": 0.08,
    "Body Types & Physical": 0.05,
    "Occupation Fantasy": 0.05,
    "Relationship Dynamic": -0.15,
  },
  "fearful-avoidant": {
    "BDSM & Power Exchange": 0.10,
    "Fetish & Kink": 0.10,
    "Sensation & Stimulation": 0.10,
    "Lifestyle & Subculture": 0.08,
    "Relationship Dynamic": -0.10,
  },
};

function applyAttachmentOverlay(
  matches: NicheMatch[],
  attachment: AttachmentVector,
): NicheMatch[] {
  const boosts = ATTACHMENT_BOOST[attachment.quadrant] ?? {};
  return matches.map((m) => {
    const cat = m.niche.category;
    const boost = boosts[cat] ?? 0;
    if (boost === 0) return m;
    const adjusted = Math.round(m.score + boost * 100);
    return {
      ...m,
      score: clamp(adjusted, 0, 100),
      affinity: clamp(m.affinity + boost, 0, 1),
    };
  });
}

// ─── Hard-Limit Engine ────────────────────────────────────────────────────────

interface HardLimit {
  category: string;
  severity: "hard" | "soft";
  penalty: number; // 0.0-1.0 (soft only)
}

const HARD_LIMIT_RULES: Record<string, HardLimit[]> = {
  // physicalChallenge
  "physicalChallenge-push": [],
  "physicalChallenge-endure": [],
  "physicalChallenge-negotiate": [
    { category: "BDSM & Power Exchange", severity: "soft", penalty: 0.15 },
  ],
  "physicalChallenge-refuse": [
    { category: "BDSM & Power Exchange", severity: "hard", penalty: 0 },
    { category: "Sensual & Intense", severity: "hard", penalty: 0 },
    { category: "Taboo & Forbidden", severity: "soft", penalty: 0.3 },
  ],
  // accidentalExposure
  "accidentalExposure-own": [],
  "accidentalExposure-cover": [
    { category: "Exhibition & Public", severity: "hard", penalty: 0 },
    { category: "Public Nudity & Outdoor", severity: "hard", penalty: 0 },
  ],
  "accidentalExposure-leanIn": [],
  "accidentalExposure-document": [],
  // theList
  "theList-detailed": [],
  "theList-negotiate": [],
  "theList-improvise": [
    { category: "BDSM & Power Exchange", severity: "soft", penalty: 0.15 },
  ],
  "theList-reverse": [],
  // unspokenRule
  "unspokenRule-obey": [
    { category: "Taboo & Forbidden", severity: "soft", penalty: 0.2 },
  ],
  "unspokenRule-test": [],
  "unspokenRule-flaunt": [],
  "unspokenRule-question": [],
};

function applyHardLimits(
  matches: NicheMatch[],
  answers: QuizAnswers,
): NicheMatch[] {
  const hardExclusions = new Set<string>();
  const softPenalties = new Map<string, number>();

  for (const [qId, raw] of Object.entries(answers)) {
    const values = Array.isArray(raw) ? raw : [raw];
    for (const val of values) {
      const key = `${qId}-${val}`;
      const rules = HARD_LIMIT_RULES[key];
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.severity === "hard") {
          hardExclusions.add(rule.category);
        } else {
          const current = softPenalties.get(rule.category) ?? 0;
          softPenalties.set(rule.category, Math.max(current, rule.penalty));
        }
      }
    }
  }

  return matches
    .map((m) => {
      if (hardExclusions.has(m.niche.category)) {
        return { ...m, score: 0, affinity: 0 };
      }
      const penalty = softPenalties.get(m.niche.category) ?? 0;
      if (penalty > 0) {
        const adjusted = Math.round(m.score * (1 - penalty));
        return {
          ...m,
          score: clamp(adjusted, 0, 100),
          affinity: clamp(m.affinity * (1 - penalty), 0, 1),
        };
      }
      return m;
    })
    .sort((a, b) => b.score - a.score);
}

// ─── Enhanced Match Finder ────────────────────────────────────────────────────

export function matchNicheFinder(
  answers: QuizAnswers,
  attachment: AttachmentVector,
  limit = 24,
): MatchResult {
  const userVector = buildUserProfile(answers);
  const ranked = rankNiches(answers, { limit: limit * 2 });
  const limited = applyHardLimits(ranked, answers);
  const boosted = applyAttachmentOverlay(limited, attachment);
  boosted.sort((a, b) => b.score - a.score);

  // Enforce category diversity for the top 3 spots
  const top3: NicheMatch[] = [];
  const seenCategories = new Set<string>();

  for (const match of boosted) {
    if (!seenCategories.has(match.niche.category)) {
      seenCategories.add(match.niche.category);
      top3.push(match);
    }
    if (top3.length === 3) break;
  }

  const remaining = boosted.filter((m) => !top3.includes(m));
  const finalMatches = [...top3, ...remaining].slice(0, limit);

  return {
    userVector,
    topDimensions: topDimensions(userVector, 3),
    matches: finalMatches,
  };
}

export { applyHardLimits };
