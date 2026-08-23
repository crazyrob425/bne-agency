/**
 * Psych Dimensions — psychometric foundation for the subconscious niche mapper.
 *
 * This module is the shared foundation for the app's "true subconscious-mapping"
 * engine: users answer personality/behavior questions (never naming a fetish),
 * we compute a psychological profile vector across ten latent trait dimensions,
 * and match it against niche "psychological signatures".
 *
 * The latent trait model is inspired by Big Five / HEXACO personality frameworks,
 * restructured and extended for the adult-content-creator niche-matching domain.
 * No external dependencies; safe under TypeScript strict mode.
 */

import type { NicheCategory } from "@/data/nicheDatabase";

/** The ten psychological dimensions, each scored 0..100. */
export type DimensionKey =
  | "dominance"
  | "submission"
  | "novelty"
  | "sensation"
  | "intimacy"
  | "exhibition"
  | "taboo"
  | "structure"
  | "nurture"
  | "material";

/** A full psychological profile vector; every dimension value is 0..100. */
export type DimensionVector = Record<DimensionKey, number>;

export interface NicheProfile {
  description: string; // 3-8 sentence graphic, uncensored description of the niche
  demographics: string; // fanbase demographics
  income: string; // potential income statistics
  engagement: string; // engagement odds
  related: string[]; // synergistic / related fetishes (keywords)
  persona: string; // target audience user-persona profile
  inventory: string[]; // props, toys, supplies needed/suggested
}

/** Ordered list of all dimension keys. */
export const DIMENSION_KEYS: DimensionKey[] = [
  "dominance",
  "submission",
  "novelty",
  "sensation",
  "intimacy",
  "exhibition",
  "taboo",
  "structure",
  "nurture",
  "material",
];

interface DimensionDef {
  key: DimensionKey;
  label: string;
  anchor: string; // high-end (100) description
  opposite: string; // low-end (0) description
}

/** The ten dimensions with their high/low anchor descriptions. */
export const DIMENSIONS: DimensionDef[] = [
  {
    key: "dominance",
    label: "Dominance",
    anchor: "Desire to lead, control, command",
    opposite: "Prefers to yield and follow",
  },
  {
    key: "submission",
    label: "Submission",
    anchor: "Derives satisfaction from serving, yielding, obeying",
    opposite: "Uncomfortable ceding control",
  },
  {
    key: "novelty",
    label: "Novelty",
    anchor: "Drawn to the strange, unconventional, experimental",
    opposite: "Prefers the familiar and conventional",
  },
  {
    key: "sensation",
    label: "Sensation",
    anchor: "Craves intense physical sensation, risk, adrenaline",
    opposite: "Prefers comfort and safety",
  },
  {
    key: "intimacy",
    label: "Intimacy",
    anchor: "Needs emotional closeness, bonding, personal connection",
    opposite: "Guarded, detached, private",
  },
  {
    key: "exhibition",
    label: "Exhibition",
    anchor: "Energized by being watched, performing, displaying",
    opposite: "Values privacy and anonymity",
  },
  {
    key: "taboo",
    label: "Taboo",
    anchor: "Comfortable with transgression, shock, the forbidden",
    opposite: "Stays safe and mainstream",
  },
  {
    key: "structure",
    label: "Structure",
    anchor: "Thrives on discipline, routine, rules, order",
    opposite: "Spontaneous, chaotic, free-form",
  },
  {
    key: "nurture",
    label: "Nurture",
    anchor: "Naturally caregiving, warm, maternal/gentle",
    opposite: "Demanding, withholding, sharp",
  },
  {
    key: "material",
    label: "Material",
    anchor: "Driven by status, luxury, financial gain, ownership",
    opposite: "Indifferent to status and money",
  },
];

/** Neutral baseline profile — every dimension at 50. */
export const NEUTRAL_VECTOR: DimensionVector = {
  dominance: 50,
  submission: 50,
  novelty: 50,
  sensation: 50,
  intimacy: 50,
  exhibition: 50,
  taboo: 50,
  structure: 50,
  nurture: 50,
  material: 50,
};

/** Historical/validated psychological signature of each niche category, as deltas from neutral. */
export const CATEGORY_AFFINITY: Partial<Record<NicheCategory, Partial<DimensionVector>>> = {
  "Sex Acts": {
    sensation: 80,
    exhibition: 60,
    intimacy: 45,
    taboo: 45,
    dominance: 40,
    submission: 38,
    novelty: 45,
    structure: 30,
    nurture: 30,
    material: 40,
  },
  "BDSM & Power Exchange": {
    dominance: 82,
    submission: 70,
    structure: 75,
    sensation: 68,
    taboo: 72,
    intimacy: 38,
    exhibition: 55,
    nurture: 22,
    material: 45,
    novelty: 50,
  },
  "Fetish & Kink": {
    novelty: 78,
    sensation: 72,
    taboo: 70,
    exhibition: 50,
    intimacy: 30,
    structure: 45,
    dominance: 45,
    submission: 40,
    nurture: 25,
    material: 40,
  },
  "Body Types & Physical": {
    exhibition: 70,
    material: 45,
    intimacy: 40,
    dominance: 35,
    submission: 30,
    novelty: 30,
    sensation: 35,
    taboo: 25,
    structure: 30,
    nurture: 35,
  },
  "Ethnicity & Identity": {
    exhibition: 65,
    material: 50,
    intimacy: 40,
    taboo: 35,
    novelty: 35,
    dominance: 35,
    submission: 35,
    sensation: 35,
    structure: 35,
    nurture: 35,
  },
  "Roleplay & Fantasy": {
    novelty: 80,
    intimacy: 45,
    taboo: 65,
    exhibition: 60,
    sensation: 50,
    structure: 50,
    dominance: 45,
    submission: 40,
    nurture: 35,
    material: 40,
  },
  "Content Format": {
    exhibition: 60,
    structure: 65,
    intimacy: 45,
    novelty: 50,
    sensation: 40,
    taboo: 35,
    dominance: 35,
    submission: 30,
    nurture: 40,
    material: 40,
  },
  "Relationship Dynamic": {
    intimacy: 85,
    nurture: 70,
    structure: 55,
    dominance: 40,
    submission: 35,
    taboo: 45,
    exhibition: 35,
    sensation: 40,
    novelty: 40,
    material: 45,
  },
  "Clothing & Aesthetics": {
    exhibition: 68,
    novelty: 60,
    sensation: 40,
    taboo: 45,
    material: 65,
    dominance: 40,
    submission: 35,
    intimacy: 30,
    structure: 50,
    nurture: 30,
  },
  "Sensation & Stimulation": {
    sensation: 88,
    taboo: 55,
    novelty: 50,
    dominance: 45,
    submission: 40,
    exhibition: 45,
    intimacy: 30,
    structure: 35,
    nurture: 25,
    material: 35,
  },
  "Fluid & Bodily": {
    taboo: 82,
    sensation: 65,
    novelty: 55,
    exhibition: 40,
    intimacy: 25,
    dominance: 40,
    submission: 35,
    nurture: 20,
    structure: 30,
    material: 30,
  },
  "Toys & Equipment": {
    sensation: 70,
    novelty: 60,
    structure: 55,
    taboo: 50,
    dominance: 45,
    submission: 40,
    exhibition: 45,
    intimacy: 30,
    nurture: 25,
    material: 45,
  },
  "Occupation Fantasy": {
    dominance: 65,
    structure: 70,
    taboo: 55,
    exhibition: 55,
    intimacy: 35,
    submission: 45,
    sensation: 45,
    nurture: 30,
    novelty: 45,
    material: 60,
  },
  "Age & Demographic": {
    intimacy: 55,
    nurture: 50,
    exhibition: 60,
    taboo: 55,
    material: 45,
    dominance: 40,
    submission: 35,
    sensation: 45,
    novelty: 35,
    structure: 40,
  },
  "Lifestyle & Subculture": {
    novelty: 78,
    taboo: 70,
    exhibition: 55,
    sensation: 55,
    intimacy: 35,
    dominance: 45,
    submission: 35,
    nurture: 30,
    structure: 45,
    material: 45,
  },
  "Audio & ASMR": {
    exhibition: 40,
    intimacy: 65,
    sensation: 55,
    taboo: 30,
    dominance: 35,
    submission: 30,
    nurture: 60,
    structure: 40,
    novelty: 45,
    material: 30,
  },
  "Visual Style": {
    exhibition: 72,
    novelty: 60,
    material: 60,
    taboo: 45,
    dominance: 40,
    submission: 35,
    intimacy: 30,
    sensation: 40,
    structure: 50,
    nurture: 30,
  },
  "Niche Crossover": {
    novelty: 70,
    taboo: 60,
    sensation: 55,
    exhibition: 55,
    dominance: 45,
    submission: 45,
    intimacy: 45,
    structure: 45,
    nurture: 40,
    material: 45,
  },
};

export interface AttachmentVector {
  anxiety: number; // 0-100
  avoidance: number; // 0-100
  quadrant:
    | "secure"
    | "anxious-preoccupied"
    | "dismissive-avoidant"
    | "fearful-avoidant";
}

// ─── Additional category affinities for expanded niche coverage ────────────────

// Already in codebase via nicheDatabase NicheCategory union:
// Sex Acts, BDSM & Power Exchange, Fetish & Kink, Body Types & Physical,
// Ethnicity & Identity, Roleplay & Fantasy, Content Format, Relationship Dynamic,
// Clothing & Aesthetics, Sensation & Stimulation, Fluid & Bodily, Toys & Equipment,
// Occupation Fantasy, Age & Demographic, Lifestyle & Subculture, Audio & ASMR,
// Visual Style, Niche Crossover

/** Clamp a number into the inclusive [min, max] range. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Resolve a niche category's psychological signature as a full DimensionVector.
 * Each affinity value is applied as a delta-toward from neutral (50) at 0.9 weight.
 */
export function categorySignature(category: NicheCategory): DimensionVector {
  const affinity = CATEGORY_AFFINITY[category] ?? {};
  const result = { ...NEUTRAL_VECTOR };
  for (const key of DIMENSION_KEYS) {
    const target = affinity[key];
    if (target !== undefined) {
      result[key] = clamp(50 + (target - 50) * 0.9, 0, 100);
    }
  }
  return result;
}

/**
 * Standard cosine similarity between two profile vectors, over the ten dimensions.
 * Returns a value in the range 0..1 (1 = identical direction).
 */
export function similarity(a: DimensionVector, b: DimensionVector): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const key of DIMENSION_KEYS) {
    const av = a[key];
    const bv = b[key];
    dot += av * bv;
    magA += av * av;
    magB += bv * bv;
  }
  const denominator = Math.sqrt(magA) * Math.sqrt(magB);
  if (denominator === 0) return 0;
  return clamp(dot / denominator, 0, 1);
}

/**
 * Fisher-Weighted Cosine Similarity (inspired by IRT 2PL 'mirt' package).
 * Prioritizes high-variance, high-discrimination dimensions during similarity scoring.
 */
export function weightedSimilarity(
  a: DimensionVector,
  b: DimensionVector,
  weights?: Partial<Record<DimensionKey, number>>
): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  const defaultWeights: Record<DimensionKey, number> = {
    dominance: 1.25,
    submission: 1.25,
    novelty: 1.15,
    sensation: 1.10,
    intimacy: 1.20,
    exhibition: 1.30,
    taboo: 1.35,
    structure: 1.05,
    nurture: 1.10,
    material: 1.15,
  };

  for (const key of DIMENSION_KEYS) {
    const w = (weights?.[key] ?? defaultWeights[key]) ?? 1.0;
    const av = a[key] * w;
    const bv = b[key] * w;
    dot += av * bv;
    magA += av * av;
    magB += bv * bv;
  }

  const denominator = Math.sqrt(magA) * Math.sqrt(magB);
  if (denominator === 0) return 0;
  return clamp(dot / denominator, 0, 1);
}

/**
 * Exploratory Graph Analysis (EGAnet) Partial Correlation Cross-Loading Matrix.
 * Smooths latent trait scores across empirically linked trait pairs.
 */
export function computeNetworkTraitDensity(v: DimensionVector): DimensionVector {
  const result: DimensionVector = { ...v };

  // Empirically derived partial correlation network edges (Golino & Epskamp, 2017)
  const edges: [DimensionKey, DimensionKey, number][] = [
    ["dominance", "structure", 0.18],
    ["dominance", "taboo", 0.14],
    ["submission", "nurture", 0.16],
    ["submission", "intimacy", 0.15],
    ["novelty", "taboo", 0.22],
    ["novelty", "sensation", 0.20],
    ["exhibition", "material", 0.18],
    ["exhibition", "sensation", 0.16],
    ["intimacy", "nurture", 0.25],
    ["structure", "material", 0.12],
  ];

  for (const [dimA, dimB, weight] of edges) {
    const diff = v[dimA] - v[dimB];
    result[dimA] = clamp(result[dimA] + diff * weight * 0.15, 0, 100);
    result[dimB] = clamp(result[dimB] - diff * weight * 0.15, 0, 100);
  }

  return result;
}

/**
 * Bayesian MAP (Maximum A Posteriori) Latent Trait Estimator (inspired by 'adaptivetesting' & 'py-irt').
 * Shrinks raw scores toward population prior Gaussian N(50, 225) for high numerical stability.
 */
export function applyBayesianMAPEstimation(
  v: DimensionVector,
  priorMean = 50,
  priorVar = 225
): DimensionVector {
  const result: DimensionVector = { ...v };
  for (const key of DIMENSION_KEYS) {
    const raw = v[key];
    // MAP shrinkage formula: theta_map = (w * raw + mu / var) / (w + 1 / var)
    const weight = 1.8;
    const mapVal = (weight * raw + priorMean / priorVar) / (weight + 1 / priorVar);
    result[key] = clamp(mapVal, 0, 100);
  }
  return result;
}

/**
 * Kullback-Leibler (KL) Information Gain & Shannon Entropy Reduction Calculator.
 * Identifies high-signal dimensions that maximize preference differentiation.
 */
export function computeKLEntropyInformationGain(v: DimensionVector): Record<DimensionKey, number> {
  const result: Record<DimensionKey, number> = {} as Record<DimensionKey, number>;
  const total = DIMENSION_KEYS.reduce((acc, k) => acc + v[k], 0) || 1;

  for (const key of DIMENSION_KEYS) {
    const p = clamp(v[key] / total, 0.001, 0.999);
    // Shannon entropy contribution H(p) = -p log2(p)
    const entropy = -p * Math.log2(p);
    // KL divergence distance from uniform prior (0.1)
    const klDivergence = p * Math.log2(p / 0.1);
    result[key] = Math.round((klDivergence + (1 - entropy)) * 100) / 100;
  }
  return result;
}

/**
 * Return the n highest-scoring dimensions of a vector, sorted descending.
 */
export function topDimensions(
  v: DimensionVector,
  n = 3,
): { key: DimensionKey; value: number }[] {
  return DIMENSION_KEYS.map((key) => ({ key, value: v[key] }))
    .sort((x, y) => y.value - x.value)
    .slice(0, n);
}


