# Niche Quiz Ultimate Enhancement — Implementation Plan
**Goal:** Transform the existing 20-question psychometric quiz into an industry-leading, attachment-aware, adaptive preference engine that reliably maps creators to 2 ultra-specific micro-niches + 1 standard niche — maximizing revenue, fan-base quality, and brand empire growth.
**Status:** Draft-ready. Awaiting implementation by a coding agent.
**Plan file:** `E:\bne-agency\.kilo\plans\1783571865271-niche-quiz-ultimate-enhancement.md`

---

## Phase 0 — Audit & Triage (1–2 hours)

### 0.1 Read all existing quiz/engine files
Files to inspect:
- `client/src/data/psychDimensions.ts`
- `client/src/data/nicheQuiz.ts`
- `client/src/data/nicheMatcherEngine.ts`
- `client/src/data/nicheDatabase.ts`
- `client/src/data/nicheMicroNiches2026.ts`
- `client/src/pages/NicheMatcher.tsx`

### 0.2 Coverage audit
Build a coverage matrix in the plan output (or a temp doc) mapping:
- Each existing question → dimensions it touches (with signal strength: strong 18+/moderate 8-17/weak <8)
- Each existing question → niche categories it discriminates between
- Identify overlap: `creativeModes` and `socialRoles` both sweep 5+ dimensions broadly; `giftStyle` and `valueDrivers` overlap on material+intimacy+sensation; `spotlight` and `hiddenTalent` both measure exhibition via public performance.
- Identify gaps: `submission` (needs 3+ targeted items), `intimacy` (relationship-depth), `taboo` (gradient items), `sensation` (intensity gradient), `exhibition` (voyeur/cuckold crossover).

### 0.3 Retire / reduce redundant items
- Keep 17 of 20 current questions.
- Reduce `creativeModes.maxSelect` from 3 to 2 (already fine).
- Reduce `socialRoles.maxSelect` from 2 to 2 (keep as-is, but flag for potential replacement in Phase 1 if overlap persists).
- No deletions — move retiring questions to `nicheQuiz.archive.ts` so they can be restored if analytics show they were load-bearing.

---

## Phase 1 — New Question Bank (15 questions, ~3 hours)

Add the following 15 questions to `client/src/data/nicheQuiz.ts`, appended before the closing `];` of `QUIZ_QUESTIONS`. Each must include `id`, `question`, `subtitle`, `type: "single"`, `options[]` with `value`, `label`, `icon`, and `weights: Partial<DimensionVector>`.

### Q1: `relationshipEnergy`
**Subtitle:** "Think about the last time you felt truly comfortable — not performing, just being."
**Options:**
- `takeCare` → weights: { nurture: 18, intimacy: 16, submission: 6 }
- `beTakenCareOf` → weights: { submission: 20, intimacy: 14, structure: 8 }
- `takeLead` → weights: { dominance: 20, structure: 12, nurture: -6 }
- `surrender` → weights: { submission: 22, dominance: -12, intimacy: 10 }

### Q2: `morningAfterSelfie`
**Subtitle:** "Honest first impulse — the thought, not the action."
**Options:**
- `capture` → weights: { exhibition: 20, sensation: 12, intimacy: 10 }
- `cherish` → weights: { intimacy: 22, nurture: 14, exhibition: -10 }
- `lurk` → weights: { taboo: 16, exhibition: 16, intimacy: 6, sensation: 8 }
- `leave` → weights: { intimacy: -16, submission: 10, structure: 8, exhibition: -12 }

### Q3: `theWatcher`
**Subtitle:** "No one will ever know. Read the pull."
**Options:**
- `watch` → weights: { taboo: 20, exhibition: 12, sensation: 14, intimacy: 6 }
- `turnAway` → weights: { intimacy: 16, structure: 12, taboo: -14, sensation: -8 }
- `reveal` → weights: { novelty: 18, exhibition: 14, taboo: 14, sensation: 10 }
- `fantasize` → weights: { exhibition: 20, taboo: 10, sensation: 10, intimacy: 8 }

### Q4: `powerHandshake`
**Subtitle:** "The subtle power dance — not the conscious strategy."
**Options:**
- `match` → weights: { dominance: 22, material: 8, structure: 8 }
- `yield` → weights: { submission: 16, structure: 12, intimacy: 6 }
- `outvalue` → weights: { material: 18, dominance: 10, novelty: 6 }
- `redirect` → weights: { novelty: 16, dominance: 12, taboo: 8, sensation: 6 }

### Q5: `theList`
**Subtitle:** "Not 'would you make a list' — how does the concept itself land?"
**Options:**
- `detailed` → weights: { structure: 18, nurture: 12, submission: 8 }
- `negotiate` → weights: { intimacy: 16, nurture: 10, structure: 6 }
- `improvise` → weights: { taboo: 18, novelty: 14, structure: -16, sensation: 10 }
- `reverse` → weights: { dominance: 16, taboo: 12, structure: 6 }

### Q6: `dirtyTalkReact`
**Subtitle:** "The word landed. Track your body's honest reaction."
**Options:**
- `fire` → weights: { taboo: 18, sensation: 14, submission: 10 }
- `melt` → weights: { submission: 18, intimacy: 14, nurture: 8 }
- `flip` → weights: { dominance: 14, exhibition: 12, taboo: 10 }
- `cold` → weights: { intimacy: -14, taboo: -8, sensation: -8 }

### Q7: `theMakeover`
**Subtitle:** "Not 'do you like fashion' — the transformation dynamic."
**Options:**
- `submit` → weights: { submission: 16, material: 12, intimacy: 10 }
- `direct` → weights: { dominance: 12, material: 16, exhibition: 10 }
- `observe` → weights: { exhibition: 20, material: 12, sensation: 10 }
- `serve` → weights: { dominance: 14, nurture: 10, material: 8 }

### Q8: `jealousyTrigger`
**Subtitle:** "This isn't hypothetical — it's reading the real visceral pull."
**Options:**
- `protect` → weights: { dominance: 20, taboo: 10, intimacy: 10 }
- `heat` → weights: { taboo: 18, sensation: 14, exhibition: 8 }
- `fade` → weights: { submission: 16, intimacy: -10, nurture: 8 }
- `control` → weights: { dominance: 16, taboo: 14, structure: 8, sensation: 6 }

### Q9: `digitalIntimacy`
**Subtitle:** "Not 'is online dating OK' — the async intimacy preference."
**Options:**
- `thrive` → weights: { intimacy: 16, exhibition: 14, novelty: 10 }
- `adapt` → weights: { structure: 14, intimacy: 12, exhibition: 6 }
- `resist` → weights: { sensation: 14, intimacy: 14, exhibition: -10 }
- `performance` → weights: { exhibition: 20, material: 8, structure: 6 }

### Q10: `physicalChallenge`
**Subtitle:** "Not 'do you like pain' — the threshold reaction."
**Options:**
- `push` → weights: { sensation: 20, taboo: 14, structure: 8, submission: 6 }
- `endure` → weights: { submission: 18, nurture: 14, sensation: 6 }
- `negotiate` → weights: { structure: 20, submission: 6, taboo: -8 }
- `refuse` → weights: { sensation: -14, taboo: -10, structure: 10, submission: -8 }

### Q11: `unspokenRule`
**Subtitle:** "The rule wasn't yours, wasn't spoken, and everyone's complying."
**Options:**
- `obey` → weights: { structure: 18, submission: 10, taboo: -12 }
- `test` → weights: { taboo: 18, novelty: 12, sensation: 8 }
- `flaunt` → weights: { taboo: 20, exhibition: 12, dominance: 8 }
- `question` → weights: { taboo: 10, novelty: 14, structure: -8, dominance: 6 }

### Q12: `memoryPalace`
**Subtitle:** "Not the event itself — the texture that kept it alive."
**Options:**
- `sensory` → weights: { sensation: 20, intimacy: 14, material: 6 }
- `emotional` → weights: { intimacy: 22, nurture: 12, sensation: 6 }
- `power` → weights: { dominance: 14, submission: 14, taboo: 8 }
- `secret` → weights: { taboo: 16, intimacy: 14, exhibition: -10 }

### Q13: `giftOfTime`
**Subtitle:** "Not 'what would you do' — what makes the hours feel like devotion."
**Options:**
- `service` → weights: { submission: 14, nurture: 18, material: -8 }
- `experience` → weights: { dominance: 16, material: 10, sensation: 8 }
- `presence` → weights: { intimacy: 22, nurture: 14, submission: 4 }
- `surprise` → weights: { material: 14, novelty: 14, dominance: 8 }

### Q14: `midnightDrive`
**Subtitle:** "The road is empty, the radio is loud, anything could happen."
**Options:**
- `go` → weights: { sensation: 18, novelty: 18, structure: -12 }
- `route` → weights: { sensation: 12, novelty: 12, structure: 6 }
- `if` → weights: { intimacy: 10, structure: 8, sensation: 6 }
- `stay` → weights: { structure: 18, sensation: -10, novelty: -10, intimacy: 6 }

### Q15: `accidentalExposure`
**Subtitle:** "The core split: hide, own it, or escalate."
**Options:**
- `own` → weights: { exhibition: 22, dominance: 12, taboo: 14 }
- `cover` → weights: { exhibition: -16, structure: 12, taboo: -8 }
- `leanIn` → weights: { exhibition: 20, taboo: 18, sensation: 12 }
- `document` → weights: { novelty: 14, exhibition: 16, material: 6 }

---

## Phase 2 — Engine Hardening (2–3 hours)

### 2.1 Add `IRTItemParams` interface to `nicheQuiz.ts`
```typescript
export interface IRTItemParams {
  a: number;   // discrimination 1.0-3.0
  b: number;   // difficulty -3.0 to +3.0
  c: number;   // guessing 0.0-0.3
}
```

### 2.2 Add IRT metadata to every new question's options
For each new option, add:
```typescript
irt: { a: 1.2, b: 0.5, c: 0.05 },  // adjust per question
primaryDimension: "taboo" as DimensionKey,
secondaryDimensions: ["exhibition", "sensation"] as DimensionKey[],
```

### 2.3 Upgrade `scoreAnswers()` in `nicheQuiz.ts`
Current: flat additive weights.
New: information-weighted scoring.

```typescript
export function scoreAnswers(answers: QuizAnswers): DimensionVector {
  const result: DimensionVector = {
    dominance: 50, submission: 50, novelty: 50, sensation: 50,
    intimacy: 50, exhibition: 50, taboo: 50, structure: 50, nurture: 50, material: 50,
  };

  const questionById = new Map(QUIZ_QUESTIONS.map(q => [q.id, q]));
  const dimensionInfo: Record<DimensionKey, number> = {
    dominance: 0, submission: 0, novelty: 0, sensation: 0,
    intimacy: 0, exhibition: 0, taboo: 0, structure: 0, nurture: 0, material: 0,
  };

  for (const [questionId, raw] of Object.entries(answers)) {
    const question = questionById.get(questionId);
    if (!question) continue;
    const chosen: string[] = Array.isArray(raw) ? raw : [raw];

    for (const option of question.options) {
      if (!chosen.includes(option.value)) continue;
      const factor = question.type === "multi" && chosen.length > 0 ? 1 / chosen.length : 1;
      const irt = (option as any).irt;
      const info = irt ? irt.a * (1 - irt.c) : 1.0;

      for (const [key, delta] of Object.entries(option.weights) as [DimensionKey, number][]) {
        const contribution = delta * factor * info;
        result[key] += contribution;
        dimensionInfo[key] += Math.abs(contribution);
      }
    }
  }

  for (const key of DIMENSION_KEYS) {
    result[key] = clamp(result[key], 0, 100);
  }

  return result;
}
```

### 2.4 Add `AttachmentVector` type to `psychDimensions.ts`
```typescript
export interface AttachmentVector {
  anxiety: number;      // 0-100
  avoidance: number;    // 0-100
  quadrant: "secure" | "anxious-preoccupied" | "dismissive-avoidant" | "fearful-avoidant";
}
```

### 2.5 Add `computeAttachmentVector()` to `nicheQuiz.ts`
Item mapping:
- `relationshipEnergy.surrender` → avoidance +12, anxiety +4
- `relationshipEnergy.takeCare` → anxiety +6, avoidance -8
- `morningAfterSelfie.leave` → avoidance +14, anxiety +6
- `morningAfterSelfie.cherish` → anxiety +10, avoidance -10
- `theWatcher.turnAway` → avoidance +12, anxiety +4
- `jealousyTrigger.fade` → avoidance +10, anxiety +10 (fearful-avoidant spike)
- `digitalIntimacy.resist` → avoidance +12, anxiety +4
- `giftOfTime.service` (high intimacy) → anxiety +4, avoidance -6

Clamp to 0-100, derive quadrant.

### 2.6 Add `HardLimit` rule engine to `nicheMatcherEngine.ts`
```typescript
interface HardLimit {
  nicheCategoryId: string;
  severity: "hard" | "soft";
  penalty: number;  // 0.0-1.0 (soft only)
}

const HARD_LIMIT_RULES: Record<string, HardLimit[]> = {
  // physicalChallenge
  "physicalChallenge-refuse": [
    { nicheCategoryId: "BDSM & Power Exchange", severity: "hard", penalty: 0 },
    { nicheCategoryId: "Sensation & Intensity", severity: "hard", penalty: 0 },
    { nicheCategoryId: "Taboo & Forbidden", severity: "soft", penalty: 0.3 },
  ],
  // accidentalExposure
  "accidentalExposure-cover": [
    { nicheCategoryId: "Exhibition & Public", severity: "hard", penalty: 0 },
    { nicheCategoryId: "Public Nudity & Outdoor", severity: "hard", penalty: 0 },
  ],
  // theList
  "theList-improvise": [
    // Soft penalty for structure-heavy niches
    { nicheCategoryId: "BDSM & Power Exchange", severity: "soft", penalty: 0.15 },
  ],
  // unspokenRule
  "unspokenRule-obey": [
    { nicheCategoryId: "Taboo & Forbidden", severity: "soft", penalty: 0.2 },
    { nicheCategoryId: "Fetish & Kink", severity: "soft", penalty: 0.1 },
  ],
};
```

Add `applyHardLimits(matches: NicheMatch[], answers: QuizAnswers): NicheMatch[]` to `nicheMatcherEngine.ts`.

### 2.7 Update `matchNicheFinder` signature
```typescript
export function matchNicheFinder(
  answers: QuizAnswers,
  attachment: AttachmentVector,
  topN: number = 20
): MatchResult
```

Inside `matchNicheFinder`:
1. Build user profile via `scoreAnswers(answers)`
2. Compute effective signatures for all niches
3. Cosine similarity ranking
4. Apply attachment overlay multipliers:
   - Secure → BDSM dom +15%, GFE +10%, Luxury +10%
   - Anxious-preoccupied → submissive niches +15%, GFE +12%, service +10%
   - Dismissive-avoidant → solo-exhibition +12%, luxury +8%, intimacy-heavy -15%
   - Fearful-avoidant → taboo/sensation +15%, intimacy-heavy -10%
5. Apply hard-limit exclusions via `applyHardLimits()`
6. Category-diversify top-3 via `getTop3()`
7. Return `MatchResult`

---

## Phase 3 — UI/UX Enhancements (2 hours)

### 3.1 Update `NicheMatcher.tsx` imports
Add imports for new question constants and `AttachmentVector`.

### 3.2 Add attachment state
```typescript
const [attachment, setAttachment] = useState<AttachmentVector | null>(null);
```

Compute after quiz completion (in `finishQuiz`):
```typescript
const attachmentVec = computeAttachmentVector(quizAnswers);
setAttachment(attachmentVec);
```

### 3.3 Adaptive progress phases
Replace single `<Progress>` with phase-aware display:
- Phase A (questions 0-11): label "Learning your energy style..."
- Phase B (questions 12-19): label "Mapping your edge..."
- Phase C (questions 20-24+): label "Locking your profile..."

### 3.4 Result card: attachment badge
Add below the "Latent signature" headline:
```tsx
{attachment && (
  <div className="flex items-center gap-2 mt-2">
    <Heart className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
    <span className="text-xs font-body text-[oklch(0.78_0.16_85)]">
      Attachment pattern: {attachment.quadrant}
    </span>
  </div>
)}
```

### 3.5 ProfileCard: add confidence meter
Add a visual bar (0-100%) under the match percentage:
```tsx
<div className="mt-3">
  <div className="h-1 bg-[oklch(0.78_0.16_85/12%)] rounded-full overflow-hidden">
    <div className="h-full bg-[oklch(0.78_0.16_85)]" style={{ width: `${match.score}%` }} />
  </div>
  <p className="text-[10px] text-[oklch(0.58_0.015_85)] mt-1 font-body">
    {match.score >= 90 ? "Exceptional alignment" :
     match.score >= 80 ? "Strong alignment" :
     match.score >= 70 ? "Good alignment" : "Moderate alignment"}
  </p>
</div>
```

### 3.6 "Why this matched" tooltip on ProfileCard
Add a small `(?)` next to the match score. On hover/click show:
> "Your [dominance + intimacy] signature aligns with [Niche Name] because [1-sentence behavioral explanation]."

Generate this string in `getSubconsciousInsight()`:
```typescript
function getMatchReason(match: NicheMatch, profile: DimensionVector): string {
  const topUser = topDimensions(profile, 3).map(d => d.key);
  const topNiche = topDimensions(match.signature, 3).map(d => d.key);
  const overlap = topUser.filter(d => topNiche.includes(d));
  const unique = topNiche.filter(d => !topUser.includes(d));
  // e.g., "Your dominance and structure drove this match; the niche also expects high taboo, which your profile hasn't fully expressed yet — that gap is growth potential."
}
```

### 3.7 CTA: "Claim This Blueprint"
After results render, add:
```tsx
<div className="mt-8 p-6 rounded-2xl bg-[oklch(0.78_0.16_85/6%)] border border-[oklch(0.78_0.16_85/18%)]">
  <h3 className="heading-sm text-[oklch(0.94_0.01_85)] mb-2">Claim This Blueprint</h3>
  <p className="text-sm text-[oklch(0.65_0.012_85)] font-body mb-4">
    Get a custom launch plan for your top 3 niches, including first-content prompts, pricing strategy, and week-by-week growth calendar.
  </p>
  <Button className="bg-[oklch(0.78_0.16_85)] text-[oklch(0.04_0.005_85)] font-body">
    Get My Blueprint <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</div>
```

### 3.8 CTA: "Retake for Deeper Signal"
Below the Recalibrate button, add a subtle link:
> "Want more precision? Add 15 deep-signal questions → [Deep Dive]"

Clicking switches to extended quiz module. For now, this is a placeholder that re-routes to the same quiz with a flag. In Phase 4, it can show the Module B/C questions.

---

## Phase 4 — Database Expansion (1–2 hours)

### 4.1 Expand `nicheMicroNiches2026.ts`
Add 15 additional micro-niches targeting the gaps identified in the audit. Each needs full `NicheProfile` + optional `psych` vector.

Target categories for expansion:
- Service-Oriented & ASMR: add 3 (foot massage ASMR already exists, add: "Silent caretaker JOI", "Worship bathing ritual", "Therapist roleplay audio")
- Taboo & Forbidden: add 3 ("Taboo family roleplay scripted", "Forbidden age-gap fantasy", "Religious corruption roleplay")
- Sensation & Intensity: add 2 ("Impact play tutorial", "Breath play sensation ASMR")
- Cuckold & Hotwife: add 2 ("Cuckold cleanup instruction", "Hotwife bodyguard fantasy")
- luxury: add 2 ("Private jet companion GFE", "Penthouse worship reveal")
- Body Types & Physical: add 2 ("Plus-size worship ASMR", "Athletic muscle worship POV")

### 4.2 Add `psych` vectors to existing micro-niches lacking them
Currently 7 of 22 lack explicit `psych` vectors. Add reasonable `DimensionVector` defaults based on category affinity + description analysis.

### 4.3 Expand `CATEGORY_AFFINITY` in `psychDimensions.ts`
Add the 6 new categories from Phase 4.1 if not already present:
- Service-Oriented & ASMR → { submission: 50, intimacy: 60, nurture: 55, sensation: 30, ... }
- Taboo & Forbidden → { taboo: 85, novelty: 70, sensation: 50, exhibition: 45, ... }
- Sensation & Intensity → { sensation: 85, taboo: 60, novelty: 40, ... }
- Cuckold & Hotwife → { taboo: 65, exhibition: 55, sensation: 50, intimacy: 35, ... }

---

## Phase 5 — Testing & Validation (1–2 hours)

### 5.1 TypeCheck
Run `pnpm check` (or `tsc --noEmit`). Fix all type errors.

### 5.2 Unit tests for new scoring logic
Create `client/src/data/__tests__/nicheQuiz.test.ts`:
- `scoreAnswers()` returns all values in [0, 100]
- Multi-select averaging works correctly (3 chosen options → each weight divided by 3)
- IRT-weighted scoring: option with higher `a` contributes more
- `computeAttachmentVector()` returns valid quadrant for each extreme case
- `applyHardLimits()` excludes correct categories for each trigger option

### 5.3 Integration test: full quiz flow
In `NicheMatcher.tsx`, confirm:
- All 35 questions render without type errors
- Multi-select questions enforce maxSelect
- Results render with top 3 diversified across categories
- ProfileCard displays all NicheProfile fields
- Attachment badge appears
- Recalibrate resets all state

### 5.4 Analytics instrumentation
Add tracking events (if analytics SDK exists):
- `quiz_phase_complete` (phase: "a"|"b"|"c")
- `quiz_question_answered` (questionId, optionValue, timeMs)
- `quiz_results_viewed` (top3Niches, attachmentQuadrant, dominantDimensions)
- `cta_clicked` (cta: "blueprint"|"deepdive"|"recalibrate")

---

## Phase 6 — Performance & Polish (1 hour)

### 6.1 Lazy-load quiz questions
Split `QUIZ_QUESTIONS` into 3 chunks (Module A/B/C) loaded on demand to reduce initial bundle. This also enables true adaptive branching without shipping all 35 questions upfront.

### 6.2 Add estimated time remaining
Show "~2 min left" that updates based on current phase and answered count.

### 6.3 Accessibility
- Ensure all buttons have `aria-label`
- Ensure progress ring has `aria-valuenow`
- Ensure color contrast meets WCAG AA on all text

---

## File Change Summary

| File | Action |
|---|---|
| `client/src/data/nicheQuiz.ts` | **Edit**: Add 15 new questions, add IRT interfaces, upgrade `scoreAnswers()`, add `computeAttachmentVector()`, add archived questions file |
| `client/src/data/psychDimensions.ts` | **Edit**: Add `AttachmentVector` interface |
| `client/src/data/nicheMatcherEngine.ts` | **Edit**: Add `HardLimit` type, `HARD_LIMIT_RULES`, `applyHardLimits()`, update `matchNicheFinder` signature |
| `client/src/data/nicheMicroNiches2026.ts` | **Edit**: Add ~15 new micro-niches, backfill `psych` vectors |
| `client/src/pages/NicheMatcher.tsx` | **Edit**: Add attachment state, phase-aware progress, attachment badge, confidence meter, match reason tooltip, CTAs |
| `client/src/data/nicheQuiz.archive.ts` | **New**: Archived retired questions |
| `client/src/data/__tests__/nicheQuiz.test.ts` | **New**: Unit tests |

---

## Success Criteria

1. Quiz covers all 10 dimensions with ≥3 strong-signal items per dimension.
2. Zero redundant question pairs remaining.
3. Top-3 matches span ≥3 distinct niche categories.
4. Attachment vector computed for every quiz taker.
5. Hard-limit rules silently exclude inappropriate niches.
6. All new TypeScript compiles with zero errors under `tsc --noEmit`.
7. UI renders all three result tiers with confidence meters and match-reason tooltips.
8. CTAs visible and functional (blueprint, deep dive).
9. Analytics events fire on key milestones.
10. Bundle size increase ≤15% (lazy-loading keeps this in check).

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| IRT weights feel "uncharted" without real data | High | Medium | Calibrate `a`/`b` using heuristics from published big-five item banks; validate with 50+ user A/B test |
| Attachment inference from 8 items is noisy | Medium | Medium | Use only for ±15% booster/penalty, not hard exclusion; do not surface quadrant label to user without confidence > 70% |
| 35 questions feels too long | Medium | High | Keep Phase A at 12 questions (under 2 min). Phase B/C only trigger for engaged users. Estimated completion: 5–6 min total, but most users drop off after Phase A. |
| Hard-limit rules over-exclude | Medium | High | Start with narrow rules; log every exclusion in analytics; review weekly. |
| Micro-niche descriptions too explicit for platform | Low | High | Keep all descriptions in the codebase but wrap UI rendering in a `SHOW_EXPLICIT` feature flag. |

---

## Repo Research Repurposing Summary

| Repo / Paper | Core Concept | Repurposed For |
|---|---|---|
| IPIP-NEO (item-level facet weights) | Facet-level dimension calibration | IRT `a`/`b` parameter heuristics for new questions |
| YouTube DNN RecSys (Cheng et al.) | Multi-task ranking with shared representation | `matchNicheFinder` shared embedding + category-specific heads |
| DeepPersonality (MMSD) | Multimodal personality signals | Future: add behavioral signals (time-per-question, backtrack count) |
| CAT (Computerized Adaptive Testing) | Item selection by maximum Fisher information | Module B adaptive question selection |
| Ten Brink kink/attachment study | Secure→dominance, anxious-avoidant→submissive | Attachment overlay multipliers |
| Big Five + Sexual Fantasies (Cannoot 2026) | Conscientiousness/agreeableness → fewer fantasies | Niche-matching penalty for high-structure/low-sensation users |
| Revealed vs stated preference | Behavioral truth > survey response | Hard-limit options treated as revealed-preference signals, not stated |
