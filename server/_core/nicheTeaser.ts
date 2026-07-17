/**
 * Niche teaser picker — server side.
 *
 * Pulls randomized "Niche Cards" from the real niche database snapshot so each
 * re-engagement email teases two high-performing niches the user might be matched
 * with. Snapshot is generated from client/src/data/nicheDatabase.ts by
 * scripts/genNicheSnapshot.cjs. Kept dependency-free for the email worker.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface TeaserNiche {
  keyword: string;
  category: string;
  earningPotential: string;
}

let _cache: TeaserNiche[] | null = null;
let _topPool: TeaserNiche[] | null = null;

function loadSnapshot(): TeaserNiche[] {
  if (_cache) return _cache;
  try {
    const raw = readFileSync(join(__dirname, "nicheSnapshot.json"), "utf8");
    _cache = JSON.parse(raw) as TeaserNiche[];
  } catch {
    _cache = [];
  }
  return _cache;
}

/** Bias the pool toward high/very-high earning niches when available.
 *  The filtered top-earner pool is computed once and reused for every send. */
export function getTeaserPool(onlyTopEarners = true): TeaserNiche[] {
  const all = loadSnapshot();
  if (!onlyTopEarners) return all;
  if (_topPool) return _topPool;
  const top = all.filter(
    (n) => n.earningPotential === "very-high" || n.earningPotential === "high"
  );
  _topPool = top.length > 0 ? top : all;
  return _topPool;
}

/** Pick `count` distinct random niches (default 2) with optional category exclusion. */
export function pickTeaserNiches(count = 2, exclude: string[] = []): TeaserNiche[] {
  const pool = getTeaserPool().filter((n) => !exclude.includes(n.keyword));
  if (pool.length === 0) return [];
  const picks: TeaserNiche[] = [];
  const used = new Set<number>();
  while (picks.length < count && used.size < pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    if (used.has(i)) continue;
    used.add(i);
    picks.push(pool[i]);
  }
  return picks;
}

