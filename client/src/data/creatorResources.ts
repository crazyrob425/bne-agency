/**
 * Per-creator-page resource curation: matched free tools, specialized articles,
 * and the video course that fits each creator lane best.
 */

export interface ToolEntry {
  id: string;
  name: string;
  pitch: string;
  href: string;
  icon: string;
  featured?: boolean;
}

export interface CourseSpotlight {
  id: string;
  title: string;
  description: string;
}

export interface CreatorResourceConfig {
  toolsEyebrow: string;
  toolsTitle: string;
  toolsSubtitle: string;
  tools: ToolEntry[];
  intelEyebrow: string;
  intelTitle: string;
  intelSubtitle: string;
  articles: string[]; // blog slugs, resolved via getArticleBySlug
  course: CourseSpotlight;
}

export const CREATOR_RESOURCES: Record<"onlyfans" | "webcam" | "companions", CreatorResourceConfig> = {
  onlyfans: {
    toolsEyebrow: "Free Arsenal",
    toolsTitle: "Tools Built for Fan-Platform Creators",
    toolsSubtitle:
      "The same free utilities our managed OnlyFans creators use every day — calculators, chatters, schedulers, and protection. No signup, no catch.",
    tools: [
      {
        id: "calculator",
        name: "All-in-One Creator Calculator",
        pitch: "Project earnings across OnlyFans, Fansly, PPV, and multi-platform revenue — the industry's most sophisticated revenue projector.",
        href: "/tools/calculator",
        icon: "calculator",
      },
      {
        id: "fanbot",
        name: "FanBot Pro",
        pitch: "An AI chatter trained in your texting style that handles fan inquiries 24/7 — never miss a sale while you sleep.",
        href: "/tools/fanbot-builder",
        icon: "chat",
      },
      {
        id: "calendar",
        name: "CreatorPush Calendar",
        pitch: "AI-powered content calendar with optimal posting times, cross-platform scheduling, and auto-generated captions.",
        href: "/tools/content-calendar",
        icon: "calendar",
      },
      {
        id: "pulse",
        name: "CreatorPulse Analytics",
        pitch: "AI insights from your engagement data — know exactly which content drives tips and subscriptions.",
        href: "/tools/creator-pulse",
        icon: "trending",
      },
      {
        id: "brandstamp",
        name: "BrandStamp Watermark",
        pitch: "Batch-watermark hundreds of photos and videos so your content can't be reposted without your name on it.",
        href: "/tools/brandstamp",
        icon: "shield",
      },
      {
        id: "teaser",
        name: "TeaserForge",
        pitch: "Upload a full-length video and get 2–10 AI-cut teaser clips with zoom effects and your watermark baked in.",
        href: "/tools/teaser-forge",
        icon: "clapper",
      },
    ],
    intelEyebrow: "From the Vault",
    intelTitle: "Intel Worth More Than the Tools",
    intelSubtitle:
      "Deep-dive guides written for fan-platform operators — monetization stacks, traffic engines, retention systems, and piracy defense.",
    articles: [
      "onlyfans-vs-fansly-platform-comparison-2025",
      "ppv-custom-content-findom-advanced-monetization",
      "twitter-x-reddit-adult-creator-marketing-guide",
      "fan-engagement-crm-subscriber-retention",
      "dmca-anti-piracy-guide-adult-creators",
      "content-calendar-strategy-adult-creators",
    ],
    course: {
      id: "ops-scaling",
      title: "Automated Operations & Scaling Empires",
      description:
        "The automation systems, chatting squads, and multi-platform distribution funnels that turn a creator profile into an automated ATM — taught as video lessons with printable playbooks.",
    },
  },

  webcam: {
    toolsEyebrow: "Free Arsenal",
    toolsTitle: "Tools Built for Cam Models",
    toolsSubtitle:
      "Show planners, earnings projectors, and fan-automation utilities tuned for live broadcasters — free, no signup.",
    tools: [
      {
        id: "sceneforge",
        name: "SceneForge Storyboard",
        pitch: "Plan every broadcast with AI-generated show ideas, pose suggestions, and lighting setups that keep rooms tipping.",
        href: "/tools/sceneforge",
        icon: "camera",
      },
      {
        id: "calculator",
        name: "All-in-One Creator Calculator",
        pitch: "Project cam-site earnings, token goals, and multi-platform revenue in one sophisticated calculator.",
        href: "/tools/calculator",
        icon: "calculator",
      },
      {
        id: "strategy",
        name: "Content Strategy Engine",
        pitch: "Generate show scripts and content prompts tailored to your niche with behavioral psychology frameworks.",
        href: "/tools/strategy-engine",
        icon: "sparkles",
      },
      {
        id: "fanbot",
        name: "FanBot Pro",
        pitch: "An AI chatter in your voice that keeps regulars engaged and converts lurkers between shows.",
        href: "/tools/fanbot-builder",
        icon: "chat",
      },
      {
        id: "pulse",
        name: "CreatorPulse Analytics",
        pitch: "Learn which show formats, schedules, and content drive the most tips and private-show bookings.",
        href: "/tools/creator-pulse",
        icon: "trending",
      },
    ],
    intelEyebrow: "From the Vault",
    intelTitle: "Intel Worth More Than the Tools",
    intelSubtitle:
      "Broadcast-specific strategy — algorithm playbooks, niche domination, AI production systems, and brand-building for cam careers.",
    articles: [
      "2026-platform-algorithm-adult-creator-ultimate-guide",
      "ai-content-production-augmentation-for-creators-2026",
      "bdsm-kink-niche-creator-guide",
      "power-law-niche-selection-adult-creator-economy",
      "personal-brand-identity-adult-creator-guide",
      "geo-generative-engine-optimization-ai-discovery-2026",
    ],
    course: {
      id: "niche-psychology",
      title: "Niche Domination & Audience Psychology",
      description:
        "The math behind sub-genres and fetish psychology — how to own a starved corner of the market and command premium rates. Video lessons plus printable worksheets.",
    },
  },

  companions: {
    toolsEyebrow: "Free Arsenal",
    toolsTitle: "Tools Built for Independent Providers",
    toolsSubtitle:
      "Advertising, verification, and business utilities engineered for in-person professionals — free, no signup.",
    tools: [
      {
        id: "classified",
        name: "Classified Ads Generator",
        pitch:
          "Our AI-powered classified poster with geo-rotation: write one high-conversion ad and rotate it across cities and directories — SkipTheGames, TNABoard, and adult service boards — on autopilot.",
        href: "/tools/classified-generator",
        icon: "megaphone",
        featured: true,
      },
      {
        id: "income",
        name: "Professional Income Verifier",
        pitch: "Generate bank-ready pay stubs for housing applications, credit approvals, and financial services.",
        href: "/tools/income-verifier",
        icon: "card",
      },
      {
        id: "niche",
        name: "Niche Intelligence Engine",
        pitch: "Power-law niche matching that identifies the most profitable positioning for your brand and market.",
        href: "/niche-matcher",
        icon: "target",
      },
      {
        id: "workflow",
        name: "Workflow & Burnout Manager",
        pitch: "A visual schedule generator that maps the true labor volume of your operation — and where to reclaim your time.",
        href: "/tools/workflow-manager",
        icon: "workflow",
      },
    ],
    intelEyebrow: "From the Vault",
    intelTitle: "Intel Worth More Than the Tools",
    intelSubtitle:
      "Guides written for independent in-person professionals — diversification, safety-first operations, anonymity, and business structure.",
    articles: [
      "adult-creator-portfolio-diversification-phone-sex-sexting-escort-2026",
      "escort-to-cam-model-content-creator-diversification-bne-studio",
      "anonymous-creator-identity-protection-guide",
      "creator-llc-taxes-business-structure-guide",
    ],
    course: {
      id: "inperson-booking",
      title: "In-Person Revenue Expansion",
      description:
        "Creative availability advertising, VoIP text masking, and client-screening protocols that fill your calendar with vetted clients — video lessons with printable safety checklists.",
    },
  },
};
