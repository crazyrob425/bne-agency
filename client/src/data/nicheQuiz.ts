/**
 * Niche Quiz — subconscious psychometric question bank.
 *
 * Everyday/personality questions that never name a fetish, kink, or adult niche.
 * Each answer contributes weighted deltas to ten latent psychological dimensions
 * (see "@/data/psychDimensions"). Designed after behavioral-economics / personality
 * inventories: quick multiple-choice, mentally stimulating, signal-revealing.
 *
 * No external dependencies; safe under TypeScript strict mode.
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
        icon: "clipboard",
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
        icon: "search",
        weights: { novelty: 20, structure: 10, intimacy: 8 },
      },
    ],
  },
  {
    id: "recklessCamera",
    question: "A stranger offers you $500 to do something slightly reckless on camera (clothed). You...",
    subtitle: "No judgment — just read your reflex.",
    type: "single",
    options: [
      {
        value: "yes",
        label: "Say yes immediately, this is fun money",
        icon: "🤑",
        weights: { sensation: 18, material: 20, exhibition: 14 },
      },
      {
        value: "negotiate",
        label: "Negotiate the terms first, then perform",
        icon: "💼",
        weights: { dominance: 18, material: 16, structure: 10 },
      },
      {
        value: "withfriend",
        label: "Only if a friend is there to do it with you",
        icon: "🤝",
        weights: { intimacy: 16, nurture: 8, sensation: 10 },
      },
      {
        value: "no",
        label: "Decline; some lines aren't for sale",
        icon: "🚫",
        weights: { taboo: -16, structure: 14, intimacy: 8 },
      },
    ],
  },
  {
    id: "eveningStructure",
    question: "Your ideal evening leans toward...",
    subtitle: "Schedule vs. surrender.",
    type: "single",
    options: [
      {
        value: "ritual",
        label: "A structured ritual you do the same way each time",
        icon: "🕰️",
        weights: { structure: 24, intimacy: 8, novelty: -14 },
      },
      {
        value: "spontaneuos",
        label: "A spontaneous adventure that appears last-minute",
        icon: "🎲",
        weights: { novelty: 20, sensation: 14, structure: -16 },
      },
      {
        value: "together",
        label: "Something planned with someone you care about",
        icon: "💞",
        weights: { intimacy: 22, nurture: 10, exhibition: -8 },
      },
      {
        value: "spectacle",
        label: "Something big and public and a little loud",
        icon: "🎆",
        weights: { exhibition: 22, sensation: 12, material: 8 },
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
        icon: "🎭",
        weights: { exhibition: 24, sensation: 10, intimacy: -8 },
      },
      {
        value: "shareclose",
        label: "Share it only with a few trusted people",
        icon: "🌿",
        weights: { intimacy: 18, nurture: 10, exhibition: -10 },
      },
      {
        value: "private",
        label: "Keep it yours; the privacy is the pleasure",
        icon: "🔒",
        weights: { exhibition: -18, intimacy: -10, structure: 8 },
      },
      {
        value: "monetize",
        label: "Figure out how to turn it into income",
        icon: "💰",
        weights: { material: 24, dominance: 10, novelty: 6 },
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
        icon: "🌑",
        weights: { taboo: 20, novelty: 12, sensation: 10 },
      },
      {
        value: "lux",
        label: "Sleek, expensive, perfectly styled",
        icon: "💎",
        weights: { material: 22, exhibition: 12, structure: 8 },
      },
      {
        value: "soft",
        label: "Soft, warm, lived-in and cozy",
        icon: "🧸",
        weights: { nurture: 22, intimacy: 12, taboo: -10 },
      },
      {
        value: "raw",
        label: "Raw, unfinished, experimental",
        icon: "🎨",
        weights: { novelty: 22, taboo: 10, structure: -12 },
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
        icon: "👑",
        weights: { dominance: 22, structure: 10, submission: -10 },
      },
      {
        value: "yield",
        label: "Back down to keep the peace",
        icon: "🕊️",
        weights: { submission: 20, nurture: 12, dominance: -12 },
      },
      {
        value: "probe",
        label: "Push the argument somewhere stranger, just to see",
        icon: "🌀",
        weights: { novelty: 18, taboo: 14, sensation: 8 },
      },
      {
        value: "connect",
        label: "Get curious about why they feel that way",
        icon: "💗",
        weights: { intimacy: 20, nurture: 12, dominance: -8 },
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
        icon: "⚡",
        weights: { novelty: 22, sensation: 14, exhibition: 10 },
      },
      {
        value: "observe",
        label: "I'll hang back and read the room first",
        icon: "👁️",
        weights: { structure: 12, intimacy: -10, taboo: -8 },
      },
      {
        value: "companion",
        label: "Only goes if someone I trust comes too",
        icon: "🤝",
        weights: { intimacy: 20, nurture: 8, novelty: -10 },
      },
      {
        value: "decline",
        label: "I'd rather be where I understand the rules",
        icon: "📜",
        weights: { structure: 20, novelty: -16, taboo: -10 },
      },
    ],
  },
  {
    id: "perfectDay",
    question: "Describe your perfect day's pacing.",
    subtitle: "Texture over agenda.",
    type: "single",
    options: [
      {
        value: "disciplined",
        label: "Early start, checklist, everything in its place",
        icon: "✅",
        weights: { structure: 24, dominance: 10, novelty: -12 },
      },
      {
        value: "flow",
        label: "No clock, follows whatever feels right",
        icon: "🌊",
        weights: { novelty: 18, sensation: 12, structure: -16 },
      },
      {
        value: "care",
        label: "Slow, caring for people or a project you love",
        icon: "🌿",
        weights: { nurture: 22, intimacy: 12, material: -8 },
      },
      {
        value: "peak",
        label: "Built around one intense, unforgettable moment",
        icon: "🔥",
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
        icon: "🎁",
        weights: { material: 20, exhibition: 14, dominance: 10 },
      },
      {
        value: "thoughtful",
        label: "Something only you would have noticed they needed",
        icon: "💌",
        weights: { intimacy: 20, nurture: 14, novelty: 8 },
      },
      {
        value: "experience",
        label: "An experience that pushes their comfort zone",
        icon: "🎢",
        weights: { sensation: 18, novelty: 14, taboo: 8 },
      },
      {
        value: "service",
        label: "Your time and help, no object required",
        icon: "🤲",
        weights: { nurture: 22, submission: 10, material: -12 },
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
        icon: "🌶️",
        weights: { taboo: 22, sensation: 12, structure: -14 },
      },
      {
        value: "obey",
        label: "Keep it — rules have a reason",
        icon: "📏",
        weights: { structure: 22, submission: 12, taboo: -12 },
      },
      {
        value: "lead",
        label: "Set a new rule others follow instead",
        icon: "👑",
        weights: { dominance: 22, structure: 10, submission: -10 },
      },
      {
        value: "share",
        label: "Whisper about it to someone you trust",
        icon: "🤫",
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
        icon: "🌟",
        weights: { exhibition: 24, dominance: 12, sensation: 10 },
      },
      {
        value: "nervous",
        label: "Go nervous but push through for them",
        icon: "😅",
        weights: { nurture: 14, intimacy: 10, exhibition: -8 },
      },
      {
        value: "handoff",
        label: "Pass it to someone else gladly",
        icon: "🙌",
        weights: { submission: 18, exhibition: -16, intimacy: 8 },
      },
      {
        value: "command",
        label: "Take over and run the room",
        icon: "🎤",
        weights: { dominance: 22, exhibition: 12, structure: 8 },
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
        icon: "🌶️",
        weights: { taboo: 16, sensation: 10, novelty: 8 },
      },
      {
        value: "adorn",
        label: "Adorning things until they feel luxurious",
        icon: "💎",
        weights: { material: 16, exhibition: 10, structure: 6 },
      },
      {
        value: "tend",
        label: "Tending something small and alive",
        icon: "🌿",
        weights: { nurture: 16, intimacy: 10, taboo: -8 },
      },
      {
        value: "stage",
        label: "Staging a scene for others to watch",
        icon: "🎭",
        weights: { exhibition: 16, dominance: 8, sensation: 6 },
      },
      {
        value: "order",
        label: "Building systems and tidy routines",
        icon: "🗂️",
        weights: { structure: 16, dominance: 6, novelty: -8 },
      },
      {
        value: "wander",
        label: "Wandering into ideas no one has named",
        icon: "🧭",
        weights: { novelty: 16, sensation: 8, structure: -8 },
      },
    ],
  },
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
        icon: "👑",
        weights: { dominance: 18, structure: 10, submission: -10 },
      },
      {
        value: "comfort",
        label: "Being cared for by someone steady",
        icon: "🤗",
        weights: { submission: 16, intimacy: 12, nurture: 8 },
      },
      {
        value: "release",
        label: "A jolt — movement, speed, something physical",
        icon: "⚡",
        weights: { sensation: 18, novelty: 8, structure: -10 },
      },
      {
        value: "solitude",
        label: "Quiet alone time to reset",
        icon: "🌙",
        weights: { intimacy: -12, exhibition: -12, structure: 8 },
      },
      {
        value: "ritual",
        label: "A familiar routine, done exactly the same",
        icon: "🕰️",
        weights: { structure: 18, novelty: -12, nurture: 6 },
      },
    ],
  },
  {
    id: "socialRoles",
    question: "In your closest friendships, which roles fit you? (pick up to 2)",
    subtitle: "The parts you naturally play.",
    type: "multi",
    maxSelect: 2,
    options: [
      {
        value: "protector",
        label: "The one who protects and decides",
        icon: "🛡️",
        weights: { dominance: 16, nurture: 10, submission: -8 },
      },
      {
        value: "caretaker",
        label: "The one who remembers and soothes",
        icon: "💗",
        weights: { nurture: 18, intimacy: 12, dominance: -8 },
      },
      {
        value: "wildcard",
        label: "The one who suggests the wild idea",
        icon: "🎲",
        weights: { novelty: 16, taboo: 12, structure: -10 },
      },
      {
        value: "anchor",
        label: "The one who keeps everyone organized",
        icon: "📋",
        weights: { structure: 16, dominance: 8, novelty: -8 },
      },
      {
        value: "muse",
        label: "The one others watch and admire",
        icon: "🌟",
        weights: { exhibition: 16, intimacy: 8, material: 6 },
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
        icon: "💎",
        weights: { material: 16, dominance: 10, exhibition: 8 },
      },
      {
        value: "bond",
        label: "Deep bonds with a few people",
        icon: "💞",
        weights: { intimacy: 16, nurture: 10, exhibition: -8 },
      },
      {
        value: "thrill",
        label: "The next new, intense experience",
        icon: "🔥",
        weights: { sensation: 16, novelty: 10, taboo: 6 },
      },
      {
        value: "order",
        label: "Mastery, discipline, doing it right",
        icon: "🏛️",
        weights: { structure: 16, dominance: 8, novelty: -8 },
      },
      {
        value: "edge",
        label: "Skirting the line of what's allowed",
        icon: "🌀",
        weights: { taboo: 16, novelty: 10, sensation: 6 },
      },
      {
        value: "ease",
        label: "Comfort, calm, and being cared for",
        icon: "🛋️",
        weights: { nurture: 14, submission: 10, sensation: -8 },
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
        icon: "⚡",
        weights: { sensation: 18, novelty: 8, structure: -8 },
      },
      {
        value: "social",
        label: "Social — being seen, judged, watched",
        icon: "🎭",
        weights: { exhibition: 18, dominance: 8, intimacy: -8 },
      },
      {
        value: "moral",
        label: "Moral — bending a rule everyone accepts",
        icon: "🌶️",
        weights: { taboo: 18, novelty: 8, structure: -10 },
      },
      {
        value: "financial",
        label: "Financial — a bold bet with real stakes",
        icon: "💰",
        weights: { material: 18, dominance: 8, structure: 6 },
      },
      {
        value: "none",
        label: "None — I sleep better with the safe choice",
        icon: "🛡️",
        weights: { structure: 14, taboo: -12, sensation: -10 },
      },
    ],
  },
  // ─── PHASE 2: DEEP-SIGNAL QUESTIONS (15 new) ────────────────────────────────
  {
    id: "relationshipEnergy",
    question:
      "When you're most relaxed with someone you trust, what do you naturally default to?",
    subtitle:
      "Think about the last time you felt truly comfortable — not performing, just being.",
    type: "single",
    options: [
      {
        value: "takeCare",
        label: "Taking care of them — making sure they're fed, rested, happy",
        icon: "🫂",
        weights: { nurture: 18, intimacy: 16, submission: 6 },
        irt: { a: 1.4, b: -0.2, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "nurture"],
      },
      {
        value: "beTakenCareOf",
        label: "Being taken care of — they handle the details and you just enjoy it",
        icon: "🛋️",
        weights: { submission: 20, intimacy: 14, structure: 8 },
        irt: { a: 1.5, b: 0.3, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "structure"],
      },
      {
        value: "takeLead",
        label: "Taking the lead on plans and decisions — it feels natural",
        icon: "🧭",
        weights: { dominance: 20, structure: 12, nurture: -6 },
        irt: { a: 1.3, b: 0.6, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["structure"],
      },
      {
        value: "surrender",
        label: "Surrendering control completely — someone else deciding is a relief",
        icon: "🕊️",
        weights: { submission: 22, dominance: -12, intimacy: 10 },
        irt: { a: 1.6, b: 0.2, c: 0.03 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy"],
      },
    ],
  },
  {
    id: "morningAfterSelfie",
    question:
      "You wake up after a deeply intimate night. They fall asleep. Your phone is across the room. You...",
    subtitle: "Honest first impulse — the thought, not the action.",
    type: "single",
    options: [
      {
        value: "capture",
        label: "Grab it and take a photo — proof it happened, for both of you",
        icon: "📸",
        weights: { exhibition: 20, sensation: 12, intimacy: 10 },
        irt: { a: 1.5, b: 0.4, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["sensation", "intimacy"],
      },
      {
        value: "cherish",
        label: "Lie there and watch them sleep — this moment is private",
        icon: "🌅",
        weights: { intimacy: 22, nurture: 14, exhibition: -10 },
        irt: { a: 1.3, b: -0.3, c: 0.05 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "lurk",
        label: "Take one from across the room without them knowing",
        icon: "👀",
        weights: { taboo: 16, exhibition: 16, intimacy: 6, sensation: 8 },
        irt: { a: 1.7, b: 0.8, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["exhibition", "sensation"],
      },
      {
        value: "leave",
        label: "Get up quietly — morning light makes you uneasy",
        icon: "🚪",
        weights: { intimacy: -16, submission: 10, structure: 8, exhibition: -12 },
        irt: { a: 1.2, b: -0.6, c: 0.06 },
        primaryDimension: "submission",
        secondaryDimensions: ["structure"],
      },
    ],
  },
  {
    id: "theWatcher",
    question:
      "You discover a private viewing room you weren't supposed to find. A one-way mirror looks into someone else's most intimate moment. You...",
    subtitle: "No one will ever know. Read the pull.",
    type: "single",
    options: [
      {
        value: "watch",
        label: "Lean in and watch — the secrecy amplifies everything",
        icon: "👁️",
        weights: { taboo: 20, exhibition: 12, sensation: 14, intimacy: 6 },
        irt: { a: 1.6, b: 0.7, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "exhibition"],
      },
      {
        value: "turnAway",
        label: "Step back immediately — this feels like a violation",
        icon: "🙈",
        weights: { intimacy: 16, structure: 12, taboo: -14, sensation: -8 },
        irt: { a: 1.3, b: -0.5, c: 0.05 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["structure"],
      },
      {
        value: "reveal",
        label: "Tap on the mirror and introduce yourself",
        icon: "👋",
        weights: { novelty: 18, exhibition: 14, taboo: 14, sensation: 10 },
        irt: { a: 1.8, b: 1.0, c: 0.04 },
        primaryDimension: "novelty",
        secondaryDimensions: ["exhibition", "taboo"],
      },
      {
        value: "fantasize",
        label: "Imagine being watched like that yourself — the mirror becomes a screen",
        icon: "🪞",
        weights: { exhibition: 20, taboo: 10, sensation: 10, intimacy: 8 },
        irt: { a: 1.7, b: 0.5, c: 0.03 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["taboo", "sensation"],
      },
    ],
  },
  {
    id: "powerHandshake",
    question:
      "In a negotiation, you notice the other person is trying to subtly assert dominance over you. Your instinct is to...",
    subtitle: "The subtle power dance — not the conscious strategy.",
    type: "single",
    options: [
      {
        value: "match",
        label: "Match their energy and raise it — they need to know who they're dealing with",
        icon: "⚔️",
        weights: { dominance: 22, material: 8, structure: 8 },
        irt: { a: 1.4, b: 0.6, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["structure"],
      },
      {
        value: "yield",
        label: "Let them have this one — strategic yielding is its own power",
        icon: "🀄",
        weights: { submission: 16, structure: 12, intimacy: 6 },
        irt: { a: 1.2, b: -0.2, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["structure"],
      },
      {
        value: "outvalue",
        label: "Pivot to what you uniquely control — make yourself indispensable",
        icon: "💎",
        weights: { material: 18, dominance: 10, novelty: 6 },
        irt: { a: 1.3, b: 0.5, c: 0.04 },
        primaryDimension: "material",
        secondaryDimensions: ["dominance", "novelty"],
      },
      {
        value: "redirect",
        label: "Reframe the whole frame — make them forget they were challenging you",
        icon: "🎯",
        weights: { novelty: 16, dominance: 12, taboo: 8, sensation: 6 },
        irt: { a: 1.6, b: 0.9, c: 0.04 },
        primaryDimension: "novelty",
        secondaryDimensions: ["dominance", "taboo"],
      },
    ],
  },
  {
    id: "theList",
    question:
      "A partner asks for a list of your hard limits before trying something new. Your reaction?",
    subtitle: "Not 'would you make a list' — how does the concept itself land?",
    type: "single",
    options: [
      {
        value: "detailed",
        label: "Write it immediately — clarity is kindness",
        icon: "📝",
        weights: { structure: 18, nurture: 12, submission: 8 },
        irt: { a: 1.2, b: -0.3, c: 0.05 },
        primaryDimension: "structure",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "negotiate",
        label: "Discuss it together rather than stating it unilaterally",
        icon: "🤝",
        weights: { intimacy: 16, nurture: 10, structure: 6 },
        irt: { a: 1.1, b: 0.0, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "improvise",
        label: "I don't want boundaries — the unknown is the point",
        icon: "🎲",
        weights: { taboo: 18, novelty: 14, structure: -16, sensation: 10 },
        irt: { a: 1.8, b: 1.1, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["novelty", "sensation"],
      },
      {
        value: "reverse",
        label: "Ask for theirs first — power is knowing theirs before they know mine",
        icon: "👁️",
        weights: { dominance: 16, taboo: 12, structure: 6 },
        irt: { a: 1.4, b: 0.7, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo"],
      },
    ],
  },
  {
    id: "dirtyTalkReact",
    question:
      "During a vulnerable moment, your partner whispers something explicitly commanding or degrading. You feel...",
    subtitle: "The word landed. Track your body's honest reaction.",
    type: "single",
    options: [
      {
        value: "fire",
        label: "A rush — the words themselves are arousing",
        icon: "🔥",
        weights: { taboo: 18, sensation: 14, submission: 10 },
        irt: { a: 1.7, b: 0.8, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "submission"],
      },
      {
        value: "melt",
        label: "Softened and obedient — I want to please them more now",
        icon: "🕯️",
        weights: { submission: 18, intimacy: 14, nurture: 8 },
        irt: { a: 1.4, b: 0.1, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["intimacy", "nurture"],
      },
      {
        value: "flip",
        label: "Instinctively want to say it back or push further",
        icon: "↩️",
        weights: { dominance: 14, exhibition: 12, taboo: 10 },
        irt: { a: 1.5, b: 0.6, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["exhibition", "taboo"],
      },
      {
        value: "cold",
        label: "A disconnect — it doesn't land for me",
        icon: "❄️",
        weights: { intimacy: -14, taboo: -8, sensation: -8 },
        irt: { a: 1.1, b: -0.8, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["taboo", "sensation"],
      },
    ],
  },
  {
    id: "theMakeover",
    question:
      "Someone offers to completely restyle you head to toe — clothes, hair, everything — and you'll be the showcase. You...",
    subtitle: "Not 'do you like fashion' — the transformation dynamic.",
    type: "single",
    options: [
      {
        value: "submit",
        label: "Let them do it completely — I trust their vision",
        icon: "💇",
        weights: { submission: 16, material: 12, intimacy: 10 },
        irt: { a: 1.3, b: 0.1, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["material"],
      },
      {
        value: "direct",
        label: "Collaborate but make the final calls — it's my body",
        icon: "✨",
        weights: { dominance: 12, material: 16, exhibition: 10 },
        irt: { a: 1.2, b: 0.4, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["material", "exhibition"],
      },
      {
        value: "observe",
        label: "Have them do it and watch myself in the mirror — the reveal is the moment",
        icon: "🪞",
        weights: { exhibition: 20, material: 12, sensation: 10 },
        irt: { a: 1.6, b: 0.5, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["material", "sensation"],
      },
      {
        value: "serve",
        label: "Reverse it — I'd rather be the one doing the makeover",
        icon: "💅",
        weights: { dominance: 14, nurture: 10, material: 8 },
        irt: { a: 1.2, b: 0.3, c: 0.05 },
        primaryDimension: "dominance",
        secondaryDimensions: ["nurture"],
      },
    ],
  },
  {
    id: "jealousyTrigger",
    question:
      "Your partner is genuinely desired by someone else — attractive, available, into them. Watching it happen from the outside, your dominant feeling is...",
    subtitle: "This isn't hypothetical — it's reading the real visceral pull.",
    type: "single",
    options: [
      {
        value: "protect",
        label: "Step in and claim what's mine — they just reminded me I have something worth fighting for",
        icon: "🛡️",
        weights: { dominance: 20, taboo: 10, intimacy: 10 },
        irt: { a: 1.5, b: 0.5, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo", "intimacy"],
      },
      {
        value: "heat",
        label: "A confusing arousal — watching them wanted turns me on",
        icon: "🌶️",
        weights: { taboo: 18, sensation: 14, exhibition: 8 },
        irt: { a: 1.8, b: 1.0, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["sensation", "exhibition"],
      },
      {
        value: "fade",
        label: "Step back quietly — if they want someone else, they should have them",
        icon: "🌫️",
        weights: { submission: 16, intimacy: -10, nurture: 8 },
        irt: { a: 1.3, b: -0.4, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "control",
        label: "Turn it into something we decide together — their attention becomes ours",
        icon: "🎭",
        weights: { dominance: 16, taboo: 14, structure: 8, sensation: 6 },
        irt: { a: 1.5, b: 0.7, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["taboo", "structure"],
      },
    ],
  },
  {
    id: "digitalIntimacy",
    question:
      "Someone you've never met in person wants to move your relationship almost entirely into text/voice. Your honest reaction...",
    subtitle: "Not 'is online dating OK' — the async intimacy preference.",
    type: "single",
    options: [
      {
        value: "thrive",
        label: "Love it — the distance makes the intimacy feel safer and more intense",
        icon: "📱",
        weights: { intimacy: 16, exhibition: 14, novelty: 10 },
        irt: { a: 1.4, b: 0.3, c: 0.04 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["exhibition", "novelty"],
      },
      {
        value: "adapt",
        label: "Fine with it as long as we eventually meet in person",
        icon: "☕",
        weights: { structure: 14, intimacy: 12, exhibition: 6 },
        irt: { a: 1.1, b: -0.1, c: 0.06 },
        primaryDimension: "structure",
        secondaryDimensions: ["intimacy"],
      },
      {
        value: "resist",
        label: "Prefer in-person — digital feels thin or unsatisfying",
        icon: "🤝",
        weights: { sensation: 14, intimacy: 14, exhibition: -10 },
        irt: { a: 1.2, b: -0.3, c: 0.05 },
        primaryDimension: "sensation",
        secondaryDimensions: ["intimacy"],
      },
      {
        value: "performance",
        label: "Prefer it because I can craft the perfect version of myself",
        icon: "🎭",
        weights: { exhibition: 20, material: 8, structure: 6 },
        irt: { a: 1.5, b: 0.6, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["material"],
      },
    ],
  },
  {
    id: "physicalChallenge",
    question:
      "Someone you trust asks you to hold an uncomfortable position or sensation for an uncomfortably long time — the edge where it starts crossing into pain. You...",
    subtitle: "Not 'do you like pain' — the threshold reaction.",
    type: "single",
    options: [
      {
        value: "push",
        label: "Push past it — that's where the interesting part starts",
        icon: "⚡",
        weights: { sensation: 20, taboo: 14, structure: 8, submission: 6 },
        irt: { a: 1.7, b: 0.9, c: 0.03 },
        primaryDimension: "sensation",
        secondaryDimensions: ["taboo", "submission"],
      },
      {
        value: "endure",
        label: "Endure faithfully because it matters to them",
        icon: "🛡️",
        weights: { submission: 18, nurture: 14, sensation: 6 },
        irt: { a: 1.3, b: 0.2, c: 0.04 },
        primaryDimension: "submission",
        secondaryDimensions: ["nurture", "sensation"],
      },
      {
        value: "negotiate",
        label: "Negotiate a clear limit beforehand — consent is everything",
        icon: "📋",
        weights: { structure: 20, submission: 6, taboo: -8 },
        irt: { a: 1.1, b: -0.4, c: 0.05 },
        primaryDimension: "structure",
        secondaryDimensions: ["submission"],
      },
      {
        value: "refuse",
        label: "Hard pass — physical discomfort isn't a turn-on for me",
        icon: "🚧",
        weights: { sensation: -14, taboo: -10, structure: 10, submission: -8 },
        irt: { a: 1.2, b: -0.9, c: 0.05 },
        primaryDimension: "sensation",
        secondaryDimensions: ["structure"],
      },
    ],
  },
  {
    id: "unspokenRule",
    question:
      "At a dinner party, an unspoken but obvious rule forms: no phones at the table. You...",
    subtitle: "The rule wasn't yours, wasn't spoken, and everyone's complying.",
    type: "single",
    options: [
      {
        value: "obey",
        label: "Put it away without a second thought — norms have a function",
        icon: "📵",
        weights: { structure: 18, submission: 10, taboo: -12 },
        irt: { a: 1.1, b: -0.4, c: 0.05 },
        primaryDimension: "structure",
        secondaryDimensions: ["submission"],
      },
      {
        value: "test",
        label: "Check one message discreetly — just to see what happens",
        icon: "📱",
        weights: { taboo: 18, novelty: 12, sensation: 8 },
        irt: { a: 1.4, b: 0.6, c: 0.04 },
        primaryDimension: "taboo",
        secondaryDimensions: ["novelty", "sensation"],
      },
      {
        value: "flaunt",
        label: "Leave it visible and check it openly — the tension is interesting",
        icon: "😈",
        weights: { taboo: 20, exhibition: 12, dominance: 8 },
        irt: { a: 1.7, b: 0.9, c: 0.03 },
        primaryDimension: "taboo",
        secondaryDimensions: ["exhibition", "dominance"],
      },
      {
        value: "question",
        label: "Ask out loud why we're doing this — rules should earn their place",
        icon: "❓",
        weights: { taboo: 10, novelty: 14, structure: -8, dominance: 6 },
        irt: { a: 1.3, b: 0.4, c: 0.05 },
        primaryDimension: "novelty",
        secondaryDimensions: ["taboo", "dominance"],
      },
    ],
  },
  {
    id: "memoryPalace",
    question:
      "Think back to an experience that's stayed vivid in your memory. What made it unforgettable?",
    subtitle: "Not the event itself — the texture that kept it alive.",
    type: "single",
    options: [
      {
        value: "sensory",
        label: "The physical sensations — temperature, weight, sounds — they're still in my body",
        icon: "🌊",
        weights: { sensation: 20, intimacy: 14, material: 6 },
        irt: { a: 1.3, b: 0.3, c: 0.04 },
        primaryDimension: "sensation",
        secondaryDimensions: ["intimacy"],
      },
      {
        value: "emotional",
        label: "The emotional weight — feeling seen or changed in a lasting way",
        icon: "💫",
        weights: { intimacy: 22, nurture: 12, sensation: 6 },
        irt: { a: 1.2, b: -0.2, c: 0.05 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "power",
        label: "The power dynamic — who led, who followed, who took what they wanted",
        icon: "⚖️",
        weights: { dominance: 14, submission: 14, taboo: 8 },
        irt: { a: 1.4, b: 0.5, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["submission", "taboo"],
      },
      {
        value: "secret",
        label: "That it was ours alone — the secrecy is part of the memory",
        icon: "🤫",
        weights: { taboo: 16, intimacy: 14, exhibition: -10 },
        irt: { a: 1.5, b: 0.6, c: 0.04 },
        primaryDimension: "taboo",
        secondaryDimensions: ["intimacy"],
      },
    ],
  },
  {
    id: "giftOfTime",
    question:
      "You have 4 hours completely free to spend on someone you care about. What feels most like love?",
    subtitle: "Not 'what would you do' — what makes the hours feel like devotion.",
    type: "single",
    options: [
      {
        value: "service",
        label: "Making their life easier — chores, errands, taking things off their plate",
        icon: "🧹",
        weights: { submission: 14, nurture: 18, material: -8 },
        irt: { a: 1.2, b: -0.2, c: 0.05 },
        primaryDimension: "submission",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "experience",
        label: "Planning something unforgettable and executing it perfectly",
        icon: "🎪",
        weights: { dominance: 16, material: 10, sensation: 8 },
        irt: { a: 1.2, b: 0.5, c: 0.04 },
        primaryDimension: "dominance",
        secondaryDimensions: ["material", "sensation"],
      },
      {
        value: "presence",
        label: "Just being there — phones off, no agenda, them talking or us resting",
        icon: "🌿",
        weights: { intimacy: 22, nurture: 14, submission: 4 },
        irt: { a: 1.1, b: -0.4, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["nurture"],
      },
      {
        value: "surprise",
        label: "Something they didn't know they needed — a gift, an insight, a door opened",
        icon: "🎁",
        weights: { material: 14, novelty: 14, dominance: 8 },
        irt: { a: 1.3, b: 0.5, c: 0.04 },
        primaryDimension: "novelty",
        secondaryDimensions: ["material", "dominance"],
      },
    ],
  },
  {
    id: "midnightDrive",
    question:
      "It's 1am. A friend suggests driving out to nowhere with no plan. You...",
    subtitle: "The road is empty, the radio is loud, anything could happen.",
    type: "single",
    options: [
      {
        value: "go",
        label: "Grab the keys immediately — being somewhere unexpected is the whole point",
        icon: "🚗",
        weights: { sensation: 18, novelty: 18, structure: -12 },
        irt: { a: 1.5, b: 0.8, c: 0.04 },
        primaryDimension: "sensation",
        secondaryDimensions: ["novelty"],
      },
      {
        value: "route",
        label: "Go — but I need to know we're not truly lost, just off-path",
        icon: "🗺️",
        weights: { sensation: 12, novelty: 12, structure: 6 },
        irt: { a: 1.1, b: 0.2, c: 0.06 },
        primaryDimension: "sensation",
        secondaryDimensions: ["novelty", "structure"],
      },
      {
        value: "if",
        label: "Only if it's not just us — a group, a destination, a reason",
        icon: "👥",
        weights: { intimacy: 10, structure: 8, sensation: 6 },
        irt: { a: 1.0, b: -0.2, c: 0.06 },
        primaryDimension: "intimacy",
        secondaryDimensions: ["structure"],
      },
      {
        value: "stay",
        label: "I'm in bed — tomorrow has an early start",
        icon: "🛏️",
        weights: { structure: 18, sensation: -10, novelty: -10, intimacy: 6 },
        irt: { a: 1.2, b: -0.7, c: 0.05 },
        primaryDimension: "structure",
        secondaryDimensions: ["intimacy"],
      },
    ],
  },
  {
    id: "accidentalExposure",
    question:
      "You're somewhere semi-public and realize you're exposed more than intended. People are starting to notice. You...",
    subtitle: "The core split: hide, own it, or escalate.",
    type: "single",
    options: [
      {
        value: "own",
        label: "Own it immediately — act like it was intentional and read the room",
        icon: "😎",
        weights: { exhibition: 22, dominance: 12, taboo: 14 },
        irt: { a: 1.6, b: 0.7, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["dominance", "taboo"],
      },
      {
        value: "cover",
        label: "Cover up fast — privacy has a time and place",
        icon: "🙈",
        weights: { exhibition: -16, structure: 12, taboo: -8 },
        irt: { a: 1.2, b: -0.5, c: 0.05 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["structure"],
      },
      {
        value: "leanIn",
        label: "Push the boundary further — if they're looking, give them more",
        icon: "🔥",
        weights: { exhibition: 20, taboo: 18, sensation: 12 },
        irt: { a: 1.8, b: 1.1, c: 0.03 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["taboo", "sensation"],
      },
      {
        value: "document",
        label: "Whisper to a friend 'this is going in the story later' and lean into the narrative",
        icon: "📖",
        weights: { novelty: 14, exhibition: 16, material: 6 },
        irt: { a: 1.4, b: 0.5, c: 0.04 },
        primaryDimension: "exhibition",
        secondaryDimensions: ["novelty", "material"],
      },
    ],
  },
];

/**
 * Aggregate a set of quiz answers into a full DimensionVector (0..100).
 *
 * - Starts from neutral 50 on every dimension.
 * - Single-select answers add the option's full weights.
 * - Multi-select answers add the *average* of the chosen options' weights,
 *   so selecting many options can't overweight the dimension.
 * - If an option carries IRT parameters, the contribution is weighted by
 *   Fisher information (a * (1 - c)), making high-discrimination items
 *   count more toward the final vector.
 * - Every result is clamped to the inclusive [0, 100] range.
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

// ─── Attachment Vector Computation ────────────────────────────────────────────

/**
 * Lightweight adult-attachment inference from quiz responses.
 *
 * Maps selected option values to anxiety/avoidance deltas, then clamps
 * to 0..100 and classifies into one of four quadrants.
 *
 * Based on Ten Brink et al. (2021) — secure attachment → dominance,
 * anxious-avoidant → submissiveness — and Ainsworth/Main adult-attachment
 * two-axis model (anxiety × avoidance).
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

  // relationshipEnergy: surrender/beTakenCareOf → higher avoidance
  apply({
    "relationshipEnergy-takeCare": { anx: 4, avo: -8 },
    "relationshipEnergy-beTakenCareOf": { anx: 4, avo: 12 },
    "relationshipEnergy-takeLead": { anx: -4, avo: -6 },
    "relationshipEnergy-surrender": { anx: 4, avo: 14 },
  });

  // morningAfterSelfie: leave/cherish patterns
  apply({
    "morningAfterSelfie-capture": { anx: -2, avo: -4 },
    "morningAfterSelfie-cherish": { anx: 8, avo: -10 },
    "morningAfterSelfie-lurk": { anx: 2, avo: 10 },
    "morningAfterSelfie-leave": { anx: 6, avo: 14 },
  });

  // theWatcher: turnAway = avoidant signal
  apply({
    "theWatcher-watch": { anx: -2, avo: -4 },
    "theWatcher-turnAway": { anx: 4, avo: 12 },
    "theWatcher-reveal": { anx: -4, avo: -8 },
    "theWatcher-fantasize": { anx: 4, avo: 4 },
  });

  // jealousyTrigger: fade = avoidant, heat = anxious
  apply({
    "jealousyTrigger-protect": { anx: -4, avo: -6 },
    "jealousyTrigger-heat": { anx: 10, avo: -2 },
    "jealousyTrigger-fade": { anx: 10, avo: 10 },
    "jealousyTrigger-control": { anx: -2, avo: -4 },
  });

  // digitalIntimacy: resist = avoidant
  apply({
    "digitalIntimacy-thrive": { anx: 4, avo: -8 },
    "digitalIntimacy-adapt": { anx: 0, avo: -4 },
    "digitalIntimacy-resist": { anx: 4, avo: 12 },
    "digitalIntimacy-performance": { anx: -4, avo: -4 },
  });

  // accidentalExposure: cover = avoidant, own/leanIn = secure-ish exhibition
  apply({
    "accidentalExposure-own": { anx: -4, avo: -8 },
    "accidentalExposure-cover": { anx: 2, avo: 12 },
    "accidentalExposure-leanIn": { anx: -2, avo: -6 },
    "accidentalExposure-document": { anx: 0, avo: -2 },
  });

  // Existing questions contribute too:
  // hiddenTalent.private → avoidance +8
  apply({
    "hiddenTalent-showcase": { anx: -4, avo: -8 },
    "hiddenTalent-shareclose": { anx: 4, avo: -6 },
    "hiddenTalent-private": { anx: 2, avo: 10 },
    "hiddenTalent-monetize": { anx: -2, avo: -4 },
  });

  // stressResponses: solitude → avoidance
  apply({
    "stressResponses-control": { anx: -4, avo: -6 },
    "stressResponses-comfort": { anx: 6, avo: -4 },
    "stressResponses-release": { anx: -2, avo: -4 },
    "stressResponses-solitude": { anx: 2, avo: 10 },
    "stressResponses-ritual": { anx: -2, avo: -4 },
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
