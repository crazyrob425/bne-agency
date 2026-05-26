/**
 * BNE Agency — Stripe Products & Prices
 * Three service tiers: Starter, Pro, Elite
 * These are created on-demand in Stripe via the checkout session.
 * Prices are monthly subscriptions.
 */

export interface BNEProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in cents
  priceId?: string; // set after Stripe price is created
  interval: "month" | "one_time";
  features: string[];
  badge?: string;
  popular?: boolean;
}

export const BNE_PRODUCTS: BNEProduct[] = [
  {
    id: "bne_starter",
    name: "Starter Hustle",
    tagline: "Get your bag right from day one",
    description:
      "Perfect for new creators who need a solid foundation — niche strategy, brand setup, and the tools to start stacking.",
    price: 49700, // $497/month
    interval: "month",
    features: [
      "Full niche analysis & positioning",
      "Anonymous persona build-out",
      "Platform setup & optimization",
      "Content calendar (30 days)",
      "Basic fan engagement scripts",
      "Monthly strategy call (1hr)",
      "Access to Creator Tools vault",
      "Email support",
    ],
  },
  {
    id: "bne_pro",
    name: "Pro Stack",
    tagline: "For creators ready to go full-time",
    description:
      "Full management package — we handle the grind so you can focus on creating. This is where the real money starts.",
    price: 149700, // $1,497/month
    interval: "month",
    popular: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter Hustle",
      "24/7 DM chatter team",
      "PPV campaign management",
      "Cross-platform growth strategy",
      "Weekly analytics reports",
      "DMCA monitoring & takedowns",
      "Geo-blocking configuration",
      "Bi-weekly strategy calls (2hr)",
      "Priority support (24hr response)",
      "Revenue share optimization",
    ],
  },
  {
    id: "bne_elite",
    name: "Elite Empire",
    tagline: "Top 1% or nothing",
    description:
      "Full white-glove management for creators serious about building a 6-figure brand. We go all in — you collect.",
    price: 349700, // $3,497/month
    interval: "month",
    badge: "Elite",
    features: [
      "Everything in Pro Stack",
      "Dedicated account manager",
      "Custom content production strategy",
      "Influencer collab brokering",
      "Advanced findom/PPV funnels",
      "Multi-platform empire build-out",
      "Legal compliance audit",
      "Custom NDA & contract drafting",
      "Daily performance reports",
      "Direct line to BNE leadership",
      "Revenue guarantee program",
      "Exit strategy & brand valuation",
    ],
  },
];

export const ONE_TIME_PRODUCTS: BNEProduct[] = [
  {
    id: "bne_niche_audit",
    name: "Niche Deep Dive Audit",
    tagline: "One-time strategy session",
    description:
      "A 2-hour deep-dive audit of your current setup, niche positioning, and a custom 90-day roadmap. No ongoing commitment.",
    price: 29700, // $297 one-time
    interval: "one_time",
    features: [
      "2-hour strategy session",
      "Full niche analysis report",
      "Competitor landscape review",
      "Custom 90-day roadmap",
      "Platform optimization checklist",
      "Follow-up email Q&A (30 days)",
    ],
  },
  {
    id: "bne_brand_kit",
    name: "Brand Identity Kit",
    tagline: "Your persona, built from scratch",
    description:
      "Complete anonymous persona creation — name, backstory, aesthetic, bio copy, and platform-ready brand assets.",
    price: 49700, // $497 one-time
    interval: "one_time",
    features: [
      "Custom persona development",
      "Anonymous backstory creation",
      "Platform bio copywriting",
      "Aesthetic mood board",
      "Content theme guide",
      "Hashtag & keyword strategy",
    ],
  },
];
