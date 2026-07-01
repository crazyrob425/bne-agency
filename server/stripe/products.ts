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
    tagline: "Build your foundation, start making money",
    description:
      "Everything a new creator needs to launch with confidence — niche strategy, brand setup, SEO, and a clear path to your first sales.",
    price: 49700, // $497/month
    interval: "month",
    features: [
      "Full niche analysis, positioning, training, & education",
      "Anonymous Niche Marketing persona build-out",
      "100% custom designed & coded online web presence including basic website, Google SEO listings, account creation and activation on top 4 platforms for your niche, future product catalog blueprints & implementation guide written specifically for your persona",
      "Webhosting, domain registration, and email instructions, guidance, and troubleshooting",
      "One hour onboarding call/Zoom meeting plus 1hr monthly strategy call — both can be broken up into a total of 4 30-minute sessions",
      "Custom guide on at least 5 new sources of income you can take advantage of and instructions how",
      "Advanced marketing plan using adult classifieds, promos, custom clip advertising, and generating reviews/feedback and using it correctly",
      "Custom Blog integration",
      "4 custom SEO-enriched ~3,000-character blog articles per month written for your specific niche & persona",
      "Monthly SEO roadmap for your website and top 2 platforms to boost views, interactions, and sales",
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
      "Custom content production strategy",
      "Influencer collab brokering",
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
  {
    id: "bne_persona_simulation",
    name: "Persona Online Simulation",
    tagline: "We respond to your fans, you stay free",
    description:
      "We intelligently take on your persona to handle DMs, texts, and social messages — guiding fans to purchases, scheduling prepaid sessions, and posting one custom classified ad each week.",
    price: 20000, // $200/month
    interval: "month",
    popular: false,
    badge: "Add-On",
    features: [
      "Full persona mimicry for fan DMs and social messages",
      "Guided sales conversations and upsell scripting",
      "Prepaid session scheduling and coordination",
      "One custom adult-classified ad posted weekly in persona",
      "Weekly performance notes delivered to you",
    ],
  },
  {
    id: "bne_in_person_classifieds",
    name: "In-Person Entertainer — Classifieds & Scheduling",
    tagline: "More clicks, more appointments, less work",
    description:
      "Up to 4 posts per week on classified and forum sites with content, titles, and photos engineered to drive clicks — plus appointment vetting, optional escrow down-payment management, and review management.",
    price: 11000, // $110/week ≈ $250/month
    interval: "month",
    popular: false,
    badge: "Add-On",
    features: [
      "Up to 4 posts/week on classifieds/forums",
      "Content, titles, and photos optimized for clicks",
      "Appointment scheduling and client vetting",
      "Optional escrow down-payment management",
      "Review monitoring and management",
    ],
  },
  {
    id: "bne_voip_booking",
    name: "Shared VoIP Text Booking",
    tagline: "Add a dedicated phone line to your package",
    description:
      "We handle all incoming appointment requests via a shared VoIP number so your personal number stays completely private. Add this to the Classifieds package.",
    price: 3300, // $75/month equivalent
    interval: "month",
    popular: false,
    badge: "Add-On",
    features: [
      "Dedicated shared VoIP phone number",
      "Text-based booking and appointment requests handled in persona",
      "Complete separation from your personal phone",
      "Call logs and summaries available on request",
    ],
  },
  {
    id: "bne_security_protection",
    name: "On-Call Rapid Response Protection",
    tagline: "Peace of mind, day or night",
    description:
      "24/7 rapid-response assistance via personal security and custom app. Emergency SOS button, GPS sharing, live mic/camera activation, and branded security teams ready to deploy in 45 minutes or less where available.",
    price: 25000, // $250/month
    interval: "month",
    popular: false,
    badge: "Protection",
    features: [
      "Custom app with one-tap SOS emergency button",
      "GPS location sharing and live mic/camera activation in emergencies",
      "2 on-call emergency response deployments per month",
      "Up to 10 virtual security check-ins per month",
      "Response within 45 minutes depending on location and time of day",
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
