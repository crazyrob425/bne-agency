/**
 * Niche Quiz — subconscious psychometric question bank (50-Question Edition).
 *
 * Covers past relationships, sex life, personality traits, job/career, fears,
 * boundaries, and erotic instincts. Designed to build a complete psychological
 * and lifestyle profile to match creators with their top 3 adult fetish niches
 * without explicitly asking "what are your favorite fetishes?".
 *
 * Includes 16+ spicy/naughty PG-13 provocative scenarios (dirty talk, lingerie,
 * power surrender, teasing, public risk, body detail focus, tribute energy).
 *
 * Safe under TypeScript strict mode with no external dependencies.
 */

import type { DimensionKey, DimensionVector, AttachmentVector } from "@/data/psychDimensions";

export interface QuizOption {
  value: string;
  label: string;
  icon?: string;
  /** Deltas added to the user's vector when this option is chosen (may be negative). */
  weights: Partial<DimensionVector>;
  /** IRT discrimination/difficulty/guessing parameters (optional; defaults to neutral 1.0/0.0/0.0). */
  irt?: { a: number; b: number; c: number };
  /** Primary dimension this option targets (used for attachment inference). */
  primaryDimension?: DimensionKey;
  /** Secondary signal dimensions. */
  secondaryDimensions?: DimensionKey[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multi";
  maxSelect?: number;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string | string[]>;

const DIMENSION_KEYS: DimensionKey[] = [
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── DOMAIN 1: PERSONALITY TRAITS & SOCIAL INSTINCTS (Q1 - Q8) ───
  {
    id: "saturdayNight",
    question: "It's a Saturday night and you have no plans. What pulls you in?",
    subtitle: "Answer honestly — there are no wrong responses, only signal.",
    type: "single",
    options: [
      {
        value: "host",
        label: "Throw something together and get people to come over",
        icon: "crown",
        weights: { dominance: 18, exhibition: 16, intimacy: 10 },
      },
      {
        value: "wander",
        label: "Wander somewhere new with no itinerary",
        icon: "compass",
        weights: { novelty: 22, sensation: 14, structure: -16 },
      },
      {
        value: "cozy",
        label: "A quiet night with one person or a book",
        icon: "heart",
        weights: { intimacy: 22, nurture: 12, exhibition: -14 },
      },
      {
        value: "stage",
        label: "Go somewhere you'll be seen — a show, a crowd, a spotlight",
        icon: "zap",
        weights: { exhibition: 24, sensation: 12, material: 8 },
      },
    ],
  },
  {
    id: "embarrassingSecret",
    question: "A friend trusts you with an embarrassing secret. Your instinct?",
    subtitle: "There are no wrong responses, only signal.",
    type: "single",
    options: [
      {
        value: "hold",
        label: "Lock it away; it's theirs to share",
        icon: "lock",
        weights: { intimacy: 20, structure: 12, exhibition: -12 },
      },
      {
        value: "protect",
        label: "Comfort them and make them feel safe",
        icon: "shield",
        weights: { nurture: 24, intimacy: 14, dominance: -8 },
      },
      {
        value: "tease",
        label: "Playfully rib them about it later",
        icon: "sparkles",
        weights: { taboo: 16, intimacy: 8, structure: -10 },
      },
      {
        value: "direct",
        label: "Tell them what they should do about it",
        icon: "crown",
        weights: { dominance: 22, intimacy: -10, nurture: -8 },
      },
    ],
  },
  {
    id: "shortFilm",
    question: "You're given total creative control of a short film. The vibe?",
    subtitle: "Pick the world you'd build.",
    type: "single",
    options: [
      {
        value: "surreal",
        label: "Surreal and unsettling, rules don't apply",
        icon: "dna",
        weights: { novelty: 24, taboo: 18, structure: -14 },
      },
      {
        value: "intimate",
        label: "Tender, two people, a single quiet room",
        icon: "heart",
        weights: { intimacy: 22, nurture: 12, sensation: -10 },
      },
      {
        value: "thrill",
        label: "High-stakes, fast, adrenaline rush",
        icon: "zap",
        weights: { sensation: 24, novelty: 10, structure: -12 },
      },
      {
        value: "feast",
        label: "Lush, beautiful, things you'd want to own",
        icon: "gem",
        weights: { material: 24, exhibition: 12, sensation: 8 },
      },
    ],
  },
  {
    id: "classroomRole",
    question: "Which classroom role were you?",
    subtitle: "Think back to who you naturally were.",
    type: "single",
    options: [
      {
        value: "leader",
        label: "The one who organized the group project",
        icon: "crown",
        weights: { dominance: 20, structure: 14, submission: -10 },
      },
      {
        value: "helper",
        label: "The one who helped everyone catch up",
        icon: "users",
        weights: { nurture: 22, intimacy: 12, dominance: -8 },
      },
      {
        value: "rulebreaker",
        label: "The one who questioned the rules",
        icon: "zap",
        weights: { taboo: 18, novelty: 14, structure: -14 },
      },
      {
        value: "observer",
        label: "The quiet one who watched it all",
        icon: "eye",
        weights: { intimacy: -12, exhibition: -14, structure: 10 },
      },
    ],
  },
  {
    id: "secretCompliment",
    question: "Pick the compliment that secretly means the most.",
    subtitle: "Be honest about what lands.",
    type: "single",
    options: [
      {
        value: "powerful",
        label: "\"You're impossible to say no to.\"",
        icon: "crown",
        weights: { dominance: 24, exhibition: 8, material: -8 },
      },
      {
        value: "safe",
        label: "\"I can tell you anything.\"",
        icon: "shield",
        weights: { intimacy: 22, nurture: 14, exhibition: -10 },
      },
      {
        value: "bold",
        label: "\"You're braver than you look.\"",
        icon: "zap",
        weights: { sensation: 18, taboo: 14, novelty: 10 },
      },
      {
        value: "rare",
        label: "\"You notice things no one else does.\"",
        icon: "sparkles",
        weights: { novelty: 20, structure: 10, intimacy: 8 },
      },
    ],
  },
  {
    id: "disagreement",
    question: "When someone strongly disagrees with you, you...",
    subtitle: "Your reflex, not your aspiration.",
    type: "single",
    options: [
      {
        value: "win",
        label: "Make your case until they concede",
        icon: "crown",
        weights: { dominance: 22, structure: 10, submission: -10 },
      },
      {
        value: "yield",
        label: "Back down to keep the peace",
        icon: "heart",
        weights: { submission: 20, nurture: 12, dominance: -12 },
      },
      {
        value: "probe",
        label: "Push the argument somewhere stranger, just to see",
        icon: "sparkles",
        weights: { novelty: 18, taboo: 14, sensation: 8 },
      },
      {
        value: "connect",
        label: "Get curious about why they feel that way",
        icon: "heart",
        weights: { intimacy: 20, nurture: 12, dominance: -8 },
      },
    ],
  },
  {
    id: "aesthetic",
    question: "Which aesthetic do you keep coming back to?",
    subtitle: "The one your eye returns to.",
    type: "single",
    options: [
      {
        value: "dark",
        label: "Dark, moody, a little dangerous",
        icon: "flame",
        weights: { taboo: 20, novelty: 12, sensation: 10 },
      },
      {
        value: "lux",
        label: "Sleek, expensive, perfectly styled",
        icon: "gem",
        weights: { material: 22, exhibition: 12, structure: 8 },
      },
      {
        value: "soft",
        label: "Soft, warm, lived-in and cozy",
        icon: "heart",
        weights: { nurture: 22, intimacy: 12, taboo: -10 },
      },
      {
        value: "raw",
        label: "Raw, unfinished, experimental",
        icon: "sparkles",
        weights: { novelty: 22, taboo: 10, structure: -12 },
      },
    ],
  },
  {
    id: "unfamiliarInvite",
    question: "You're invited to an event where you'll know no one and the customs are unclear.",
    subtitle: "Read the pull, not the fear.",
    type: "single",
    options: [
      {
        value: "thrill",
        label: "Exciting — I love being the unknown factor",
        icon: "zap",
        weights: { novelty: 22, sensation: 14, exhibition: 10 },
      },
      {
        value: "observe",
        label: "I'll hang back and read the room first",
        icon: "eye",
        weights: { structure: 12, intimacy: -10, taboo: -8 },
      },
      {
        value: "companion",
        label: "Only goes if someone I trust comes too",
        icon: "users",
        weights: { intimacy: 20, nurture: 8, novelty: -10 },
      },
      {
        value: "decline",
        label: "I'd rather be where I understand the rules",
        icon: "lock",
        weights: { structure: 20, novelty: -16, taboo: -10 },
      },
    ],
  },

  // ─── DOMAIN 2: CAREER, MONEY, STATUS & WORK HABITS (Q9 - Q16) ───
  {
    id: "recklessCamera",
    question: "A stranger offers you $500 to do something slightly reckless on camera (clothed). You...",
    subtitle: "No judgment — just read your reflex.",
    type: "single",
    options: [
      {
        value: "yes",
        label: "Say yes immediately, this is fun money",
        icon: "dollar",
        weights: { sensation: 18, material: 20, exhibition: 14 },
      },
      {
        value: "negotiate",
        label: "Negotiate the terms first, then perform",
        icon: "crown",
        weights: { dominance: 18, material: 16, structure: 10 },
      },
      {
        value: "withfriend",
        label: "Only if a friend is there to do it with you",
        icon: "users",
        weights: { intimacy: 16, nurture: 8, sensation: 10 },
      },
      {
        value: "no",
        label: "Decline; some lines aren't for sale",
        icon: "shield",
        weights: { taboo: -16, structure: 14, intimacy: 8 },
      },
    ],
  },
  {
    id: "hiddenTalent",
    question: "You discover a hidden talent. Do you show everyone or keep it close?",
    subtitle: "First instinct wins.",
    type: "single",
    options: [
      {
        value: "showcase",
        label: "Post it, perform it, let them watch",
        icon: "sparkles",
        weights: { exhibition: 24, sensation: 10, intimacy: -8 },
      },
      {
        value: "shareclose",
        label: "Share it only with a few trusted people",
        icon: "heart",
        weights: { intimacy: 18, nurture: 10, exhibition: -10 },
      },
      {
        value: "private",
        label: "Keep it yours; the privacy is the pleasure",
        icon: "lock",
        weights: { exhibition: -18, intimacy: -10, structure: 8 },
      },
      {
        value: "monetize",
        label: "Figure out how to turn it into income",
        icon: "dollar",
        weights: { material: 24, dominance: 10, novelty: 6 },
      },
    ],
  },
  {
    id: "perfectDay",
    question: "Describe your ideal work day's pacing.",
    subtitle: "Texture over agenda.",
    type: "single",
    options: [
      {
        value: "disciplined",
        label: "Early start, checklist, everything in its place",
        icon: "structure",
        weights: { structure: 24, dominance: 10, novelty: -12 },
      },
      {
        value: "flow",
        label: "No clock, follows whatever feels right",
        icon: "compass",
        weights: { novelty: 18, sensation: 12, structure: -16 },
      },
      {
        value: "care",
        label: "Slow, caring for people or a project you love",
        icon: "heart",
        weights: { nurture: 22, intimacy: 12, material: -8 },
      },
      {
        value: "peak",
        label: "Built around one intense, high-yield moment",
        icon: "flame",
        weights: { sensation: 22, exhibition: 12, taboo: 8 },
      },
    ],
  },
  {
    id: "giftStyle",
    question: "The gift you most enjoy giving says you are...",
    subtitle: "Generosity is a tell.",
    type: "single",
    options: [
      {
        value: "grand",
        label: "Something impressive they'll show others",
        icon: "gem",
        weights: { material: 20, exhibition: 14, dominance: 10 },
      },
      {
        value: "thoughtful",
        label: "Something only you would have noticed they needed",
        icon: "heart",
        weights: { intimacy: 20, nurture: 14, novelty: 8 },
      },
      {
        value: "experience",
        label: "An experience that pushes their comfort zone",
        icon: "zap",
        weights: { sensation: 18, novelty: 14, taboo: 8 },
      },
      {
        value: "service",
        label: "Your time and help, no object required",
        icon: "users",
        weights: { nurture: 22, submission: 10, material: -12 },
      },
    ],
  },
  {
    id: "creativeModes",
    question: "Which modes of creating feel most like you? (pick up to 3)",
    subtitle: "Select all that resonate — signal compounds.",
    type: "multi",
    maxSelect: 3,
    options: [
      {
        value: "provoke",
        label: "Provoking a reaction, even discomfort",
        icon: "flame",
        weights: { taboo: 16, sensation: 10, novelty: 8 },
      },
      {
        value: "adorn",
        label: "Adorning things until they feel luxurious",
        icon: "gem",
        weights: { material: 16, exhibition: 10, structure: 6 },
      },
      {
        value: "tend",
        label: "Tending something small and alive",
        icon: "heart",
        weights: { nurture: 16, intimacy: 10, taboo: -8 },
      },
      {
        value: "stage",
        label: "Staging a scene for others to watch",
        icon: "sparkles",
        weights: { exhibition: 16, dominance: 8, sensation: 6 },
      },
      {
        value: "order",
        label: "Building systems and tidy routines",
        icon: "lock",
        weights: { structure: 16, dominance: 6, novelty: -8 },
      },
      {
        value: "wander",
        label: "Wandering into ideas no one has named",
        icon: "compass",
        weights: { novelty: 16, sensation: 8, structure: -8 },
      },
    ],
  },
  {
    id: "valueDrivers",
    question: "What quietly motivates you most days? (pick up to 3)",
    subtitle: "The engine under the surface.",
    type: "multi",
    maxSelect: 3,
    options: [
      {
        value: "status",
        label: "Being recognized and a step ahead",
        icon: "gem",
        weights: { material: 16, dominance: 10, exhibition: 8 },
      },
      {
        value: "bond",
        label: "Deep bonds with a few people",
        icon: "heart",
        weights: { intimacy: 16, nurture: 10, exhibition: -8 },
      },
      {
        value: "thrill",
        label: "The next new, intense experience",
        icon: "flame",
        weights: { sensation: 16, novelty: 10, taboo: 6 },
      },
      {
        value: "order",
        label: "Mastery, discipline, doing it right",
        icon: "crown",
        weights: { structure: 16, dominance: 8, novelty: -8 },
      },
      {
        value: "edge",
        label: "Skirting the line of what's allowed",
        icon: "zap",
        weights: { taboo: 16, novelty: 10, sensation: 6 },
      },
      {
        value: "ease",
        label: "Comfort, calm, and being cared for",
        icon: "heart",
        weights: { nurture: 14, submission: 10, sensation: -8 },
      },
    ],
  },
  {
    id: "powerHandshake",
    question: "In a negotiation, someone tries to subtly assert authority over you. You...",
    subtitle: "The subtle power dance — not the conscious strategy.",
    type: "single",
    options: [
      {
        value: "match",
        label: "Match their energy and raise it — they need to know who is in charge",
        icon: "crown",
        weights: { dominance: 22, material: 8, structure: 8 },
        irt: { a: 1.4, b: 0.6, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["structure"],
      },
      {
        value: "yield",
        label: "Let them have this one — strategic yielding is its own power",
        icon: "heart",
        weights: { submission: 16, structure: 12, intimacy: 6 },
        irt: { a: 1.2, b: -0.2, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["structure"],
      },
      {
        value: "outvalue",
        label: "Pivot to what you uniquely control — make yourself indispensable",
        icon: "gem",
        weights: { material: 18, dominance: 10, novelty: 6 },
        irt: { a: 1.3, b: 0.5, c: 0.04 },
        primaryDimension: "material",
        secondaryDimensions: ["dominance", "novelty"],
      },
      {
        value: "redirect",
        label: "Reframe the conversation — make them forget they challenged you",
        icon: "sparkles",
        weights: { novelty: 16, dominance: 12, taboo: 8, sensation: 6 },
        irt: { a: 1.6, b: 0.9, c: 0.04 },
        primaryDimension: "novelty",
        secondaryDimensions: ["dominance", "taboo"],
      },
    ],
  },
  {
    id: "tributeEnergy",
    question: "A stranger sends you $200 with no request attached, just a note saying 'You deserve this.' You...",
    subtitle: "Financial tribute and status dynamics.",
    type: "single",
    options: [
      {
        value: "acceptDominant",
        label: "Accept it calmly — of course they feel that way",
        icon: "crown",
        weights: { dominance: 22, material: 20, exhibition: 12 },
        primaryDimension: "dominance",
        secondaryDimensions: ["material"],
      },
      {
        value: "thankSweet",
        label: "Send a warm, appreciative voice note in return",
        icon: "heart",
        weights: { nurture: 18, intimacy: 16, material: 8 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "teaseMore",
        label: "Post a teaser hinting at what $500 would unlock",
        icon: "flame",
        weights: { material: 22, taboo: 14, exhibition: 14 },
        primaryDimension: "material",
        secondaryDimensions: ["taboo"],
      },
      {
        value: "uneasy",
        label: "Feel uneasy accepting money without a clear exchange",
        icon: "shield",
        weights: { structure: 16, material: -10, intimacy: 8 },
        primaryDimension: "structure",
      },
    ],
  },

  // ─── DOMAIN 3: PAST RELATIONSHIPS & ATTACHMENT REFLEXES (Q17 - Q24) ───
  {
    id: "relationshipEnergy",
    question: "When you're most relaxed with someone you trust, what do you naturally default to?",
    subtitle: "Think about the last time you felt truly comfortable.",
    type: "single",
    options: [
      {
        value: "takeCare",
        label: "Taking care of them — making sure they're fed, rested, happy",
        icon: "heart",
        weights: { nurture: 18, intimacy: 16, submission: 6 },
        irt: { a: 1.4, b: -0.2, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "nurture"],
      },
      {
        value: "beTakenCareOf",
        label: "Being taken care of — they handle details while you relax",
        icon: "heart",
        weights: { submission: 20, intimacy: 14, structure: 8 },
        irt: { a: 1.5, b: 0.3, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "structure"],
      },
      {
        value: "takeLead",
        label: "Taking the lead on plans and decisions — it feels natural",
        icon: "crown",
        weights: { dominance: 20, structure: 12, nurture: -6 },
        irt: { a: 1.3, b: 0.6, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["structure"],
      },
      {
        value: "surrender",
        label: "Surrendering control completely — someone else deciding is a relief",
        icon: "sparkles",
        weights: { submission: 22, dominance: -12, intimacy: 10 },
        irt: { a: 1.6, b: 0.2, c: 0.03 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy"],
      },
    ],
  },
  {
    id: "jealousyTrigger",
    question: "Your partner is genuinely desired by someone else. Watching it happen from the outside, your main feeling is...",
    subtitle: "Reading the visceral emotional pull.",
    type: "single",
    options: [
      {
        value: "protect",
        label: "Step in and claim what's mine — reminds me I have something precious",
        icon: "shield",
        weights: { dominance: 20, taboo: 10, intimacy: 10 },
        irt: { a: 1.5, b: 0.5, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo", "intimacy"],
      },
      {
        value: "heat",
        label: "A sudden thrill — seeing them wanted turns me on",
        icon: "flame",
        weights: { taboo: 18, sensation: 14, exhibition: 8 },
        irt: { a: 1.8, b: 1.0, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "exhibition"],
      },
      {
        value: "fade",
        label: "Step back quietly — if they want someone else, they can go",
        icon: "lock",
        weights: { submission: 16, intimacy: -10, nurture: 8 },
        irt: { a: 1.3, b: -0.4, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "control",
        label: "Turn it into something we decide together — their gaze becomes ours",
        icon: "crown",
        weights: { dominance: 16, taboo: 14, structure: 8, sensation: 6 },
        irt: { a: 1.5, b: 0.7, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo", "structure"],
      },
    ],
  },
  {
    id: "digitalIntimacy",
    question: "Someone wants to move your relationship almost entirely into private text/voice. Your reaction...",
    subtitle: "Async emotional intimacy preference.",
    type: "single",
    options: [
      {
        value: "thrive",
        label: "Love it — distance makes intimacy feel safer and more intense",
        icon: "heart",
        weights: { intimacy: 16, exhibition: 14, novelty: 10 },
        irt: { a: 1.4, b: 0.3, c: 0.04 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["exhibition", "novelty"],
      },
      {
        value: "adapt",
        label: "Fine with it as long as we eventually meet in person",
        icon: "users",
        weights: { structure: 14, intimacy: 12, exhibition: 6 },
        irt: { a: 1.1, b: -0.1, c: 0.06 },
        primaryDimension: "structure",
        secondaryDimensions: ["intimacy"],
      },
      {
        value: "resist",
        label: "Prefer in-person — digital feels thin or unsatisfying",
        icon: "shield",
        weights: { sensation: 14, intimacy: 14, exhibition: -10 },
        irt: { a: 1.2, b: -0.3, c: 0.05 },
        primaryDimension: "sensation",
        secondaryDimensions: ["intimacy"],
      },
      {
        value: "performance",
        label: "Prefer it because I craft the ideal fantasy version of myself",
        icon: "sparkles",
        weights: { exhibition: 20, material: 8, structure: 6 },
        irt: { a: 1.5, b: 0.6, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["material"],
      },
    ],
  },
  {
    id: "exPartnerDynamic",
    question: "Looking back at your past relationships, what pattern kept repeating?",
    subtitle: "Patterns reveal core attachment drivers.",
    type: "single",
    options: [
      {
        value: "tookCharge",
        label: "I ended up directing everything while they followed",
        icon: "crown",
        weights: { dominance: 20, structure: 12, submission: -10 },
        primaryDimension: "dominance",
      },
      {
        value: "overGave",
        label: "I over-gave and nurtured until I felt drained",
        icon: "heart",
        weights: { nurture: 22, intimacy: 14, dominance: -8 },
        primaryDimension: "nurture",
      },
      {
        value: "soughtThrill",
        label: "I got bored as soon as things became routine",
        icon: "flame",
        weights: { novelty: 22, sensation: 16, structure: -14 },
        primaryDimension: "novelty",
      },
      {
        value: "builtWalls",
        label: "I kept emotional distance even while being close",
        icon: "lock",
        weights: { intimacy: -14, structure: 14, taboo: 8 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "breakupClosure",
    question: "When a relationship ends, how do you handle closure?",
    subtitle: "Boundary enforcement style.",
    type: "single",
    options: [
      {
        value: "cleanCut",
        label: "Clean break, block everywhere, complete reset",
        icon: "lock",
        weights: { structure: 20, dominance: 12, intimacy: -12 },
        primaryDimension: "structure",
      },
      {
        value: "stayFriends",
        label: "Keep a lingering connection — hard to let go completely",
        icon: "heart",
        weights: { nurture: 18, intimacy: 16, submission: 8 },
        primaryDimension: "intimacy",
      },
      {
        value: "reinvent",
        label: "Reinvent your look and post your best photos immediately",
        icon: "sparkles",
        weights: { exhibition: 22, material: 10, novelty: 10 },
        primaryDimension: "exhibition",
      },
      {
        value: "channelWork",
        label: "Channel the energy into work and making money",
        icon: "dollar",
        weights: { material: 22, dominance: 10, structure: 10 },
        primaryDimension: "material",
      },
    ],
  },
  {
    id: "gfeWarmth",
    question: "How do you feel about someone remembering tiny details about your day and checking on you every morning?",
    subtitle: "Nurture & GFE warmth receptivity.",
    type: "single",
    options: [
      {
        value: "loveIt",
        label: "It makes me feel deeply safe and cherished",
        icon: "heart",
        weights: { intimacy: 22, nurture: 18, submission: 8 },
        primaryDimension: "intimacy",
      },
      {
        value: "doItBack",
        label: "I love being the one who sends those texts and cares for them",
        icon: "users",
        weights: { nurture: 24, intimacy: 16, dominance: 6 },
        primaryDimension: "nurture",
      },
      {
        value: "suffocating",
        label: "Feels a bit smothering — I need space and mystery",
        icon: "compass",
        weights: { novelty: 18, intimacy: -12, structure: -8 },
        primaryDimension: "novelty",
      },
      {
        value: "transactional",
        label: "Nice, but action speaks louder than check-in texts",
        icon: "gem",
        weights: { material: 16, structure: 12, intimacy: 6 },
        primaryDimension: "material",
      },
    ],
  },
  {
    id: "idealPartnerVibe",
    question: "Pick the energy you find most irresistible in a partner.",
    subtitle: "The magnet pull.",
    type: "single",
    options: [
      {
        value: "unshakableDom",
        label: "Quiet, calm authority — someone who takes total charge",
        icon: "crown",
        weights: { submission: 22, structure: 14, intimacy: 10 },
        primaryDimension: "submission",
      },
      {
        value: "devotedSub",
        label: "Eager devotion — someone who lives to make you happy",
        icon: "heart",
        weights: { dominance: 22, nurture: 14, material: 8 },
        primaryDimension: "dominance",
      },
      {
        value: "wildUnpredictable",
        label: "Wild, dangerous, unpredictable energy",
        icon: "flame",
        weights: { novelty: 22, taboo: 18, sensation: 14 },
        primaryDimension: "taboo",
      },
      {
        value: "sleekHighStatus",
        label: "Sleek, high-status, immaculate taste and success",
        icon: "gem",
        weights: { material: 24, exhibition: 12, structure: 10 },
        primaryDimension: "material",
      },
    ],
  },
  {
    id: "attachmentVulnerability",
    question: "When you feel emotionally vulnerable with someone, your body's reflex is to...",
    subtitle: "Subconscious defense mechanism.",
    type: "single",
    options: [
      {
        value: "leanIn",
        label: "Lean in closer — vulnerability is where deep heat lives",
        icon: "heart",
        weights: { intimacy: 22, nurture: 12, sensation: 10 },
        primaryDimension: "intimacy",
      },
      {
        value: "humor",
        label: "Deflect with humor or teasing",
        icon: "sparkles",
        weights: { taboo: 14, novelty: 12, intimacy: -8 },
        primaryDimension: "novelty",
      },
      {
        value: "takeControl",
        label: "Take control of the conversation so you don't feel exposed",
        icon: "shield",
        weights: { dominance: 18, structure: 12, intimacy: -10 },
        primaryDimension: "dominance",
      },
      {
        value: "freeze",
        label: "Quiet down and let them direct what happens next",
        icon: "lock",
        weights: { submission: 20, structure: 10, dominance: -10 },
        primaryDimension: "submission",
      },
    ],
  },

  // ─── DOMAIN 4: SECRET FEARS, STRESS RESPONSES & BOUNDARIES (Q25 - Q32) ───
  {
    id: "stressResponses",
    question: "Under real stress, what actually steadies you? (pick up to 2)",
    subtitle: "The genuine coping instinct.",
    type: "multi",
    maxSelect: 2,
    options: [
      {
        value: "control",
        label: "Taking charge of the situation",
        icon: "crown",
        weights: { dominance: 18, structure: 10, submission: -10 },
      },
      {
        value: "comfort",
        label: "Being cared for by someone steady",
        icon: "heart",
        weights: { submission: 16, intimacy: 12, nurture: 8 },
      },
      {
        value: "release",
        label: "A jolt — movement, speed, something physical",
        icon: "flame",
        weights: { sensation: 18, novelty: 8, structure: -10 },
      },
      {
        value: "solitude",
        label: "Quiet alone time to reset",
        icon: "lock",
        weights: { intimacy: -12, exhibition: -12, structure: 8 },
      },
      {
        value: "ritual",
        label: "A familiar routine, done exactly the same",
        icon: "structure",
        weights: { structure: 18, novelty: -12, nurture: 6 },
      },
    ],
  },
  {
    id: "socialRoles",
    question: "In your closest circles, which roles fit you best? (pick up to 2)",
    subtitle: "The parts you naturally play.",
    type: "multi",
    maxSelect: 2,
    options: [
      {
        value: "protector",
        label: "The one who protects and decides",
        icon: "shield",
        weights: { dominance: 16, nurture: 10, submission: -8 },
      },
      {
        value: "caretaker",
        label: "The one who remembers and soothes",
        icon: "heart",
        weights: { nurture: 18, intimacy: 12, dominance: -8 },
      },
      {
        value: "wildcard",
        label: "The one who suggests the wild idea",
        icon: "sparkles",
        weights: { novelty: 16, taboo: 12, structure: -10 },
      },
      {
        value: "anchor",
        label: "The one who keeps everyone organized",
        icon: "lock",
        weights: { structure: 16, dominance: 8, novelty: -8 },
      },
      {
        value: "muse",
        label: "The one others watch and admire",
        icon: "gem",
        weights: { exhibition: 16, intimacy: 8, material: 6 },
      },
    ],
  },
  {
    id: "riskTaste",
    question: "Which flavor of risk tempts you most? (pick up to 2)",
    subtitle: "Risk appetite is a strong signal.",
    type: "multi",
    maxSelect: 2,
    options: [
      {
        value: "physical",
        label: "Physical — speed, height, the body at its limit",
        icon: "flame",
        weights: { sensation: 18, novelty: 8, structure: -8 },
      },
      {
        value: "social",
        label: "Social — being seen, judged, watched",
        icon: "sparkles",
        weights: { exhibition: 18, dominance: 8, intimacy: -8 },
      },
      {
        value: "moral",
        label: "Moral — bending a rule everyone accepts",
        icon: "zap",
        weights: { taboo: 18, novelty: 8, structure: -10 },
      },
      {
        value: "financial",
        label: "Financial — a bold bet with real stakes",
        icon: "dollar",
        weights: { material: 18, dominance: 8, structure: 6 },
      },
      {
        value: "none",
        label: "None — I sleep better with the safe choice",
        icon: "shield",
        weights: { structure: 14, taboo: -12, sensation: -10 },
      },
    ],
  },
  {
    id: "boundary",
    question: "A game has one rule everyone obeys except you could break it unnoticed. You...",
    subtitle: "The unobserved choice reveals the driver.",
    type: "single",
    options: [
      {
        value: "break",
        label: "Break it — the edge is the point",
        icon: "flame",
        weights: { taboo: 22, sensation: 12, structure: -14 },
      },
      {
        value: "obey",
        label: "Keep it — rules have a reason",
        icon: "lock",
        weights: { structure: 22, submission: 12, taboo: -12 },
      },
      {
        value: "lead",
        label: "Set a new rule others follow instead",
        icon: "crown",
        weights: { dominance: 22, structure: 10, submission: -10 },
      },
      {
        value: "share",
        label: "Whisper about it to someone you trust",
        icon: "heart",
        weights: { intimacy: 18, novelty: 10, taboo: 6 },
      },
    ],
  },
  {
    id: "spotlight",
    question: "You're handed a mic in front of a crowd. Internally you...",
    subtitle: "The honest body reaction.",
    type: "single",
    options: [
      {
        value: "shine",
        label: "Light up; this is where you live",
        icon: "sparkles",
        weights: { exhibition: 24, dominance: 12, sensation: 10 },
      },
      {
        value: "nervous",
        label: "Go nervous but push through for them",
        icon: "heart",
        weights: { nurture: 14, intimacy: 10, exhibition: -8 },
      },
      {
        value: "handoff",
        label: "Pass it to someone else gladly",
        icon: "users",
        weights: { submission: 18, exhibition: -16, intimacy: 8 },
      },
      {
        value: "command",
        label: "Take over and run the room",
        icon: "crown",
        weights: { dominance: 22, exhibition: 12, structure: 8 },
      },
    ],
  },
  {
    id: "theList",
    question: "A partner asks for a list of your hard limits before trying something new. Your reaction?",
    subtitle: "How does the concept of written boundaries land?",
    type: "single",
    options: [
      {
        value: "detailed",
        label: "Write it immediately — clarity is safety",
        icon: "lock",
        weights: { structure: 18, nurture: 12, submission: 8 },
        irt: { a: 1.2, b: -0.3, c: 0.05 },
        primaryDimension: "structure",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "negotiate",
        label: "Discuss it together naturally rather than listing it",
        icon: "users",
        weights: { intimacy: 16, nurture: 10, structure: 6 },
        irt: { a: 1.1, b: 0.0, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "improvise",
        label: "I don't want strict limits — the unknown is the point",
        icon: "flame",
        weights: { taboo: 18, novelty: 14, structure: -16, sensation: 10 },
        irt: { a: 1.8, b: 1.1, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["novelty", "sensation"],
      },
      {
        value: "reverse",
        label: "Ask for theirs first — knowing theirs gives me control",
        icon: "crown",
        weights: { dominance: 16, taboo: 12, structure: 6 },
        irt: { a: 1.4, b: 0.7, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo"],
      },
    ],
  },
  {
    id: "theMakeover",
    question: "Someone offers to completely restyle you head to toe and showcase the transformation. You...",
    subtitle: "The transformation dynamic.",
    type: "single",
    options: [
      {
        value: "submit",
        label: "Let them do it completely — I trust their vision",
        icon: "sparkles",
        weights: { submission: 16, material: 12, intimacy: 10 },
        irt: { a: 1.3, b: 0.1, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["material"],
      },
      {
        value: "direct",
        label: "Collaborate but make the final calls — it's my look",
        icon: "crown",
        weights: { dominance: 12, material: 16, exhibition: 10 },
        irt: { a: 1.2, b: 0.4, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["material", "exhibition"],
      },
      {
        value: "observe",
        label: "Have them do it and watch myself in the mirror — the reveal is magic",
        icon: "gem",
        weights: { exhibition: 20, material: 12, sensation: 10 },
        irt: { a: 1.6, b: 0.5, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["material", "sensation"],
      },
      {
        value: "serve",
        label: "Reverse it — I'd rather be the one styling them",
        icon: "users",
        weights: { dominance: 14, nurture: 10, material: 8 },
        irt: { a: 1.2, b: 0.3, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["nurture"],
      },
    ],
  },
  {
    id: "unspokenRule",
    question: "At an event, an unspoken rule forms that everyone obeys. Your reaction...",
    subtitle: "The unwritten rule compliance reflex.",
    type: "single",
    options: [
      {
        value: "obey",
        label: "Obey it smoothly — keeping harmony feels good",
        icon: "shield",
        weights: { structure: 16, submission: 12, taboo: -10 },
        primaryDimension: "structure",
      },
      {
        value: "test",
        label: "Test the boundary subtly to see who notices",
        icon: "flame",
        weights: { taboo: 18, novelty: 12, sensation: 10 },
        primaryDimension: "taboo",
      },
      {
        value: "flaunt",
        label: "Break it openly and make them watch",
        icon: "sparkles",
        weights: { exhibition: 22, dominance: 14, taboo: 12 },
        primaryDimension: "exhibition",
      },
      {
        value: "question",
        label: "Ask who made the rule in the first place",
        icon: "crown",
        weights: { dominance: 18, structure: -8, novelty: 10 },
        primaryDimension: "dominance",
      },
    ],
  },

  // ─── DOMAIN 5: SEX LIFE, INTIMACY & NAUGHTY PG-13 EROTIC INSTINCTS (Q33 - Q50) ───
  // 18 Explicitly spicy/naughty scenarios probing fetish signatures without vulgarness!
  {
    id: "dirtyTalkReact",
    question: "During a vulnerable moment in bed, your partner whispers something explicitly commanding or dirty. You feel...",
    subtitle: "The word landed. Track your body's honest reaction.",
    type: "single",
    options: [
      {
        value: "fire",
        label: "A rush — dirty words and authoritative commands are arousing",
        icon: "flame",
        weights: { taboo: 20, sensation: 16, submission: 10 },
        irt: { a: 1.7, b: 0.8, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "submission"],
      },
      {
        value: "melt",
        label: "Softened and obedient — I want to surrender and please them more",
        icon: "heart",
        weights: { submission: 20, intimacy: 14, nurture: 8 },
        irt: { a: 1.4, b: 0.1, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "nurture"],
      },
      {
        value: "flip",
        label: "Instinctively want to say it back harder or take control",
        icon: "crown",
        weights: { dominance: 18, exhibition: 14, taboo: 12 },
        irt: { a: 1.5, b: 0.6, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["exhibition", "taboo"],
      },
      {
        value: "cold",
        label: "A disconnect — I prefer gentle romance over dirty talk",
        icon: "shield",
        weights: { intimacy: 16, taboo: -14, sensation: -8 },
        irt: { a: 1.1, b: -0.8, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["taboo"],
      },
    ],
  },
  {
    id: "morningAfterSelfie",
    question: "You wake up after a deeply intimate, naughty night. They're asleep next to you. Your phone is within reach. You...",
    subtitle: "Honest impulse right after passion.",
    type: "single",
    options: [
      {
        value: "capture",
        label: "Snap a quick provocative selfie in bed — proof of the mood",
        icon: "sparkles",
        weights: { exhibition: 22, sensation: 12, intimacy: 10 },
        irt: { a: 1.5, b: 0.4, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["sensation", "intimacy"],
      },
      {
        value: "cherish",
        label: "Lie there and cuddle closer — the physical warmth is everything",
        icon: "heart",
        weights: { intimacy: 24, nurture: 16, exhibition: -10 },
        irt: { a: 1.3, b: -0.3, c: 0.05 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "lurk",
        label: "Take a cheeky photo of them asleep to tease them with later",
        icon: "flame",
        weights: { taboo: 18, exhibition: 16, intimacy: 6 },
        irt: { a: 1.7, b: 0.8, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["exhibition"],
      },
      {
        value: "leave",
        label: "Get up quietly and slip into silk — morning light calls for style",
        icon: "gem",
        weights: { material: 18, structure: 10, exhibition: 10 },
        irt: { a: 1.2, b: -0.6, c: 0.06 },
        primaryDimension: "material",
      },
    ],
  },
  {
    id: "theWatcher",
    question: "You find a private keyhole or mirror looking into an intense, adult scene. You...",
    subtitle: "No one will ever know. Read the pull.",
    type: "single",
    options: [
      {
        value: "watch",
        label: "Lean in and watch — voyeurism and secrecy amplify the heat",
        icon: "eye",
        weights: { taboo: 22, exhibition: 12, sensation: 16 },
        irt: { a: 1.6, b: 0.7, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "exhibition"],
      },
      {
        value: "turnAway",
        label: "Step back immediately — privacy must be respected",
        icon: "shield",
        weights: { intimacy: 16, structure: 14, taboo: -16 },
        irt: { a: 1.3, b: -0.5, c: 0.05 },
        primaryDimension: "intimacy",
      },
      {
        value: "reveal",
        label: "Make a sound so they know someone is watching them",
        icon: "flame",
        weights: { novelty: 20, exhibition: 16, taboo: 14 },
        irt: { a: 1.8, b: 1.0, c: 0.04 },
        primaryDimension: "novelty",
        secondaryDimensions: ["exhibition", "taboo"],
      },
      {
        value: "fantasize",
        label: "Imagine being the one performing on camera while someone watches",
        icon: "sparkles",
        weights: { exhibition: 24, taboo: 12, sensation: 12 },
        irt: { a: 1.7, b: 0.5, c: 0.03 },
        primaryDimension: "exhibition",
      },
    ],
  },
  {
    id: "physicalChallenge",
    question: "Your partner holds your wrists above your head or puts physical pressure on your body during sex. You...",
    subtitle: "Restraints and physical power exchange.",
    type: "single",
    options: [
      {
        value: "push",
        label: "Melt into it — being held down and commanded turns me on",
        icon: "heart",
        weights: { submission: 24, sensation: 18, taboo: 12 },
        irt: { a: 1.7, b: 0.9, c: 0.03 },
        primaryDimension: "submission",
        secondaryDimensions: ["sensation", "taboo"],
      },
      {
        value: "endure",
        label: "Take control and flip them over onto their back instead",
        icon: "crown",
        weights: { dominance: 24, sensation: 16, structure: 8 },
        irt: { a: 1.5, b: 0.5, c: 0.04 },
        primaryDimension: "dominance",
      },
      {
        value: "negotiate",
        label: "Enjoy it only if safewords and clear limits are set beforehand",
        icon: "lock",
        weights: { structure: 22, submission: 10, taboo: -6 },
        primaryDimension: "structure",
      },
      {
        value: "refuse",
        label: "Dislike restraint — I prefer total freedom of movement",
        icon: "shield",
        weights: { sensation: -12, taboo: -10, structure: 12 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "lingerieReflex",
    question: "Putting on high-end leather, latex, or sheer lace lingerie. What's the main thrill?",
    subtitle: "Wardrobe & aesthetic fetish cue.",
    type: "single",
    options: [
      {
        value: "ownGaze",
        label: "Looking at myself in the mirror — the sheer visual power",
        icon: "gem",
        weights: { exhibition: 24, material: 14, sensation: 10 },
        primaryDimension: "exhibition",
      },
      {
        value: "partnerGasp",
        label: "The gasp when my partner first sees me wearing it",
        icon: "sparkles",
        weights: { exhibition: 18, intimacy: 16, nurture: 8 },
        primaryDimension: "exhibition",
      },
      {
        value: "textureSensory",
        label: "The feeling against my skin — shine, tightness, sensory heat",
        icon: "flame",
        weights: { sensation: 24, taboo: 14, material: 10 },
        primaryDimension: "sensation",
      },
      {
        value: "cameraReady",
        label: "Taking photos that look like a professional magazine spread",
        icon: "crown",
        weights: { material: 22, exhibition: 16, structure: 10 },
        primaryDimension: "material",
      },
    ],
  },
  {
    id: "accidentalExposure",
    question: "You realize a thin curtain or doorway left you partially visible while dressing or in bed. You...",
    subtitle: "Exhibition vs privacy reflex.",
    type: "single",
    options: [
      {
        value: "own",
        label: "Slow down deliberately — if they're watching, give them a view",
        icon: "sparkles",
        weights: { exhibition: 26, taboo: 18, sensation: 12 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["taboo"],
      },
      {
        value: "cover",
        label: "Cover up instantly and close the blind",
        icon: "shield",
        weights: { structure: 16, intimacy: 12, exhibition: -18 },
        primaryDimension: "structure",
      },
      {
        value: "leanIn",
        label: "Smile at them through the glass — turn it into a playful tease",
        icon: "flame",
        weights: { exhibition: 22, taboo: 16, novelty: 12 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "document",
        label: "Take a photo from your angle — 'caught in the act' energy",
        icon: "gem",
        weights: { novelty: 16, exhibition: 16, material: 8 },
        primaryDimension: "exhibition",
      },
    ],
  },
  {
    id: "blindfoldTrust",
    question: "Having your eyes blindfolded while your partner uses different textures (ice, feather, warm oil, leather) on your skin. You...",
    subtitle: "Sensory deprivation & surrender.",
    type: "single",
    options: [
      {
        value: "pureSurrender",
        label: "Love it — losing sight heightens every physical sensation tenfold",
        icon: "flame",
        weights: { sensation: 24, submission: 20, taboo: 10 },
        primaryDimension: "sensation",
        secondaryDimensions: ["submission"],
      },
      {
        value: "wantToBlindfold",
        label: "Prefer to be the one holding the blindfold and applying the oil",
        icon: "crown",
        weights: { dominance: 24, sensation: 16, structure: 10 },
        primaryDimension: "dominance",
      },
      {
        value: "sweetSensual",
        label: "Enjoy gentle warmth, but skip the cold ice or rough leather",
        icon: "heart",
        weights: { intimacy: 20, nurture: 16, sensation: 8 },
        primaryDimension: "intimacy",
      },
      {
        value: "controlAnxiety",
        label: "Feel anxious not seeing what's coming next",
        icon: "lock",
        weights: { structure: 20, submission: -14, sensation: -8 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "roleplayIdentity",
    question: "Dressing in a high-authority roleplay costume (Boss, Maid, Officer, Nurse, Teacher). What role do you step into?",
    subtitle: "Fantasy roleplay archetype.",
    type: "single",
    options: [
      {
        value: "commandingBoss",
        label: "The Strict Boss / Authority — ordering them to obey",
        icon: "crown",
        weights: { dominance: 26, structure: 14, material: 12 },
        primaryDimension: "dominance",
      },
      {
        value: "obedientServant",
        label: "The Devoted Maid / Servant — eager to serve their every desire",
        icon: "heart",
        weights: { submission: 24, nurture: 16, intimacy: 10 },
        primaryDimension: "submission",
      },
      {
        value: "nurturingNurse",
        label: "The Caregiver / Nurse — soothing, inspecting, and tending to them",
        icon: "shield",
        weights: { nurture: 24, intimacy: 14, submission: 8 },
        primaryDimension: "nurture",
      },
      {
        value: "glamourStar",
        label: "The Hollywood Starlet — purely here to be adored and filmed",
        icon: "sparkles",
        weights: { exhibition: 24, material: 16, sensation: 10 },
        primaryDimension: "exhibition",
      },
    ],
  },
  {
    id: "teaseVsDenial",
    question: "In bed, your partner is begging for release. You...",
    subtitle: "Tease & denial power dynamic.",
    type: "single",
    options: [
      {
        value: "makeThemWait",
        label: "Make them wait and beg longer — controlling their pleasure is thrilling",
        icon: "crown",
        weights: { dominance: 26, taboo: 16, sensation: 12 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo"],
      },
      {
        value: "giveInSweetly",
        label: "Give in sweetly — seeing them happy is my reward",
        icon: "heart",
        weights: { nurture: 22, intimacy: 18, dominance: -10 },
        primaryDimension: "nurture",
      },
      {
        value: "wantToBeTeased",
        label: "I'd rather be the one forced to wait and beg",
        icon: "flame",
        weights: { submission: 24, sensation: 16, taboo: 12 },
        primaryDimension: "submission",
      },
      {
        value: "keepRhythm",
        label: "Keep a smooth, rhythmic pace until we climax together",
        icon: "structure",
        weights: { intimacy: 20, structure: 14, sensation: 10 },
        primaryDimension: "intimacy",
      },
    ],
  },
  {
    id: "bodyDetailFocus",
    question: "Someone fixates on a specific part of your body (your feet, legs, waist, hands, or lips) with intense, worshipful focus. You...",
    subtitle: "Body-part fetish & tribute cue.",
    type: "single",
    options: [
      {
        value: "loveWorship",
        label: "Love it — having a body part worshiped feels incredible",
        icon: "sparkles",
        weights: { exhibition: 22, sensation: 16, material: 12 },
        primaryDimension: "exhibition",
      },
      {
        value: "chargeTribute",
        label: "Make them pay tribute or earn the right to look/touch",
        icon: "crown",
        weights: { dominance: 24, material: 20, taboo: 12 },
        primaryDimension: "dominance",
        secondaryDimensions: ["material"],
      },
      {
        value: "sensualTouch",
        label: "Enjoy the gentle tactile touch and close intimacy",
        icon: "heart",
        weights: { intimacy: 22, nurture: 14, sensation: 12 },
        primaryDimension: "intimacy",
      },
      {
        value: "confused",
        label: "Find niche body fixation a bit strange",
        icon: "shield",
        weights: { structure: 14, taboo: -12, exhibition: -10 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "publicRiskFlirt",
    question: "Under a restaurant table or in a dimly lit VIP booth, your partner reaches their hand up your leg. You...",
    subtitle: "Public risk & spicy thrill.",
    type: "single",
    options: [
      {
        value: "pushHigher",
        label: "Bite your lip and guide their hand higher — risk makes it hotter",
        icon: "flame",
        weights: { taboo: 24, sensation: 18, exhibition: 16 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "exhibition"],
      },
      {
        value: "whisperInstruction",
        label: "Whisper exact instructions on how and where to touch you",
        icon: "crown",
        weights: { dominance: 20, sensation: 16, intimacy: 10 },
        primaryDimension: "dominance",
      },
      {
        value: "blushQuietly",
        label: "Blush and lean into their shoulder, trying not to make a sound",
        icon: "heart",
        weights: { submission: 20, intimacy: 16, exhibition: 8 },
        primaryDimension: "submission",
      },
      {
        value: "stopPublic",
        label: "Remove their hand — save explicit touch for private behind closed doors",
        icon: "lock",
        weights: { structure: 20, taboo: -16, exhibition: -14 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "customRequestPull",
    question: "A fan offers $1,000 for a custom 3-minute video of you wearing high heels while crushing fruit or stepping on a velvet pillow. You...",
    subtitle: "Custom fetish content willingness.",
    type: "single",
    options: [
      {
        value: "doItGladly",
        label: "Film it gladly — it's fun, creative, and easy money",
        icon: "dollar",
        weights: { material: 24, novelty: 20, exhibition: 16 },
        primaryDimension: "material",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "addMyStyle",
        label: "Do it, but direct the lighting and outfit to make it look high-fashion",
        icon: "gem",
        weights: { dominance: 18, material: 20, structure: 14 },
        primaryDimension: "material",
        secondaryDimensions: ["dominance"],
      },
      {
        value: "laughAndPass",
        label: "Laugh, but pass unless it's a standard sensual video",
        icon: "shield",
        weights: { structure: 16, novelty: -14, taboo: -12 },
        primaryDimension: "structure",
      },
      {
        value: "exploreNiche",
        label: "Get curious and research what other strange niches pay top dollar",
        icon: "sparkles",
        weights: { novelty: 24, material: 18, taboo: 14 },
        primaryDimension: "novelty",
      },
    ],
  },
  {
    id: "audioProximity",
    question: "Whispering extremely close into a high-sensitivity microphone — soft breathing, lip smacks, and explicit commands. How do you feel?",
    subtitle: "ASMR & audio intimacy cue.",
    type: "single",
    options: [
      {
        value: "loveAudio",
        label: "Love it — voice and breath control are my secret superpowers",
        icon: "sparkles",
        weights: { intimacy: 22, sensation: 18, exhibition: 14 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["sensation"],
      },
      {
        value: "commandVoice",
        label: "Use my voice to dominate and give strict orders",
        icon: "crown",
        weights: { dominance: 24, intimacy: 12, structure: 10 },
        primaryDimension: "dominance",
      },
      {
        value: "listenToIt",
        label: "Prefer listening to someone else whisper dirty things to me",
        icon: "flame",
        weights: { submission: 20, sensation: 16, intimacy: 14 },
        primaryDimension: "submission",
      },
      {
        value: "tooAwkward",
        label: "Feel awkward making close mouth sounds on mic",
        icon: "shield",
        weights: { exhibition: -14, intimacy: -10, structure: 10 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "spankSensory",
    question: "During intense passion, a firm spank or rhythmic slap across your backside. Your body's reaction...",
    subtitle: "Impact & sensation play.",
    type: "single",
    options: [
      {
        value: "stingThrills",
        label: "The sting ignites immediate heat and arousal",
        icon: "flame",
        weights: { sensation: 24, taboo: 18, submission: 14 },
        primaryDimension: "sensation",
        secondaryDimensions: ["taboo"],
      },
      {
        value: "giveSpank",
        label: "I prefer to be the one doing the spanking and marking their skin",
        icon: "crown",
        weights: { dominance: 26, sensation: 16, taboo: 14 },
        primaryDimension: "dominance",
      },
      {
        value: "gentlePat",
        label: "Prefer soft caresses over sharp impact play",
        icon: "heart",
        weights: { intimacy: 20, nurture: 16, sensation: -8 },
        primaryDimension: "intimacy",
      },
      {
        value: "hardNo",
        label: "Hard no — impact or pain turns me off instantly",
        icon: "shield",
        weights: { sensation: -16, taboo: -14, structure: 12 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "showerMessyPlay",
    question: "Intimacy involving warm oils, wet clothes, whipped cream, or mess in the shower. Your instinct...",
    subtitle: "Fluid & sensory texture play.",
    type: "single",
    options: [
      {
        value: "messyFun",
        label: "Love sensory messy play — textures on bare skin are erotic",
        icon: "flame",
        weights: { sensation: 24, novelty: 18, taboo: 14 },
        primaryDimension: "sensation",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "showerSleek",
        label: "Love warm water and soap suds, but keep it sleek and clean",
        icon: "sparkles",
        weights: { intimacy: 18, sensation: 16, structure: 12 },
        primaryDimension: "intimacy",
      },
      {
        value: "filmIt",
        label: "Water glinting off oiled skin looks incredible on camera",
        icon: "gem",
        weights: { exhibition: 24, material: 12, sensation: 14 },
        primaryDimension: "exhibition",
      },
      {
        value: "hateMess",
        label: "Hate sticky mess — clean sheets beat messy oil anytime",
        icon: "lock",
        weights: { structure: 20, sensation: -12, novelty: -10 },
        primaryDimension: "structure",
      },
    ],
  },
  {
    id: "fetishCuriosity",
    question: "When you hear about a subculture or niche fantasy you've never tried, your private thought is...",
    subtitle: "Latent erotic curiosity.",
    type: "single",
    options: [
      {
        value: "howToMonetize",
        label: "\"How much do creators make fulfilling that exact fantasy?\"",
        icon: "dollar",
        weights: { material: 26, dominance: 14, novelty: 14 },
        primaryDimension: "material",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "wantToTry",
        label: "\"I secretly want to try that behind closed doors\"",
        icon: "flame",
        weights: { taboo: 22, novelty: 20, sensation: 16 },
        primaryDimension: "taboo",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "understandMind",
        label: "\"I want to understand the psychology of what turns them on\"",
        icon: "sparkles",
        weights: { intimacy: 18, nurture: 14, novelty: 14 },
        primaryDimension: "intimacy",
      },
      {
        value: "notForMe",
        label: "\"Good for them, but I stick to what I know\"",
        icon: "shield",
        weights: { structure: 18, novelty: -14, taboo: -14 },
        primaryDimension: "structure",
      },
    ],
  },
];

/**
 * Aggregate a set of quiz answers into a full DimensionVector (0..100).
 *
 * - Starts from neutral 50 on every dimension.
 * - Single-select answers add the option's full weights.
 * - Multi-select answers add the *average* of the chosen options' weights.
 * - IRT weighting applies Fisher information when present.
 * - Every result is clamped to [0, 100].
 */
export function scoreAnswers(answers: QuizAnswers): DimensionVector {
  const result: DimensionVector = {
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

  const questionById = new Map(QUIZ_QUESTIONS.map((q) => [q.id, q]));

  for (const [questionId, raw] of Object.entries(answers)) {
    const question = questionById.get(questionId);
    if (!question) continue;

    const chosen: string[] = Array.isArray(raw) ? raw : [raw];

    for (const option of question.options) {
      const isChosen = chosen.includes(option.value);
      if (!isChosen) continue;

      if (question.type === "multi" && chosen.length > 0) {
        const factor = 1 / chosen.length;
        const info = option.irt ? option.irt.a * (1 - option.irt.c) : 1.0;
        for (const [key, delta] of Object.entries(option.weights) as [
          DimensionKey,
          number,
        ][]) {
          result[key] += delta * factor * info;
        }
      } else {
        const info = option.irt ? option.irt.a * (1 - option.irt.c) : 1.0;
        for (const [key, delta] of Object.entries(option.weights) as [
          DimensionKey,
          number,
        ][]) {
          result[key] += delta * info;
        }
      }
    }
  }

  for (const key of DIMENSION_KEYS) {
    result[key] = clamp(result[key], 0, 100);
  }

  return result;
}

/**
 * Lightweight adult-attachment inference from quiz responses.
 */
export function computeAttachmentVector(
  answers: QuizAnswers,
): AttachmentVector {
  let anxiety = 45; // population baseline
  let avoidance = 40;

  const apply = (map: Record<string, { anx: number; avo: number }>) => {
    for (const [qId, raw] of Object.entries(answers)) {
      const values: string[] = Array.isArray(raw) ? raw : [raw];
      for (const optVal of values) {
        const entry = map[`${qId}-${optVal}`];
        if (entry) {
          anxiety = clamp(anxiety + entry.anx, 0, 100);
          avoidance = clamp(avoidance + entry.avo, 0, 100);
        }
      }
    }
  };

  apply({
    "relationshipEnergy-takeCare": { anx: 4, avo: -8 },
    "relationshipEnergy-beTakenCareOf": { anx: 4, avo: 12 },
    "relationshipEnergy-takeLead": { anx: -4, avo: -6 },
    "relationshipEnergy-surrender": { anx: 4, avo: 14 },

    "morningAfterSelfie-capture": { anx: -2, avo: -4 },
    "morningAfterSelfie-cherish": { anx: 8, avo: -10 },
    "morningAfterSelfie-lurk": { anx: 2, avo: 10 },
    "morningAfterSelfie-leave": { anx: 6, avo: 14 },

    "theWatcher-watch": { anx: -2, avo: -4 },
    "theWatcher-turnAway": { anx: 4, avo: 12 },
    "theWatcher-reveal": { anx: -4, avo: -8 },
    "theWatcher-fantasize": { anx: 4, avo: 4 },

    "jealousyTrigger-protect": { anx: -4, avo: -6 },
    "jealousyTrigger-heat": { anx: 10, avo: -2 },
    "jealousyTrigger-fade": { anx: 10, avo: 10 },
    "jealousyTrigger-control": { anx: -2, avo: -4 },

    "digitalIntimacy-thrive": { anx: 4, avo: -8 },
    "digitalIntimacy-adapt": { anx: 0, avo: -4 },
    "digitalIntimacy-resist": { anx: 4, avo: 12 },
    "digitalIntimacy-performance": { anx: -4, avo: -4 },

    "accidentalExposure-own": { anx: -4, avo: -8 },
    "accidentalExposure-cover": { anx: 2, avo: 12 },
    "accidentalExposure-leanIn": { anx: -2, avo: -6 },
    "accidentalExposure-document": { anx: 0, avo: -2 },

    "hiddenTalent-showcase": { anx: -4, avo: -8 },
    "hiddenTalent-shareclose": { anx: 4, avo: -6 },
    "hiddenTalent-private": { anx: 2, avo: 10 },
    "hiddenTalent-monetize": { anx: -2, avo: -4 },

    "stressResponses-control": { anx: -4, avo: -6 },
    "stressResponses-comfort": { anx: 6, avo: -4 },
    "stressResponses-release": { anx: -2, avo: -4 },
    "stressResponses-solitude": { anx: 2, avo: 10 },
    "stressResponses-ritual": { anx: -2, avo: -4 },

    "exPartnerDynamic-tookCharge": { anx: -6, avo: -4 },
    "exPartnerDynamic-overGave": { anx: 12, avo: -6 },
    "exPartnerDynamic-soughtThrill": { anx: -2, avo: 8 },
    "exPartnerDynamic-builtWalls": { anx: 4, avo: 14 },

    "blindfoldTrust-pureSurrender": { anx: -4, avo: -6 },
    "blindfoldTrust-controlAnxiety": { anx: 12, avo: 8 },
  });

  const quadrant =
    anxiety < 50 && avoidance < 50
      ? "secure"
      : anxiety >= 50 && avoidance < 50
        ? "anxious-preoccupied"
        : anxiety < 50 && avoidance >= 50
          ? "dismissive-avoidant"
          : "fearful-avoidant";

  return { anxiety: Math.round(anxiety), avoidance: Math.round(avoidance), quadrant };
}
