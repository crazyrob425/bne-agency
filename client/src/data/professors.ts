/**
 * Blacklisted University — Faculty Personas
 *
 * The six professors are the in-character voices of the BNE content team:
 * each one "teaches" (authors) the free guides, articles, and tutorials for
 * their subject area. Write them as vivid hosts of their departments — never
 * claim real-world accreditation, degrees granted, or real credentials
 * (no real PhDs, bar admissions, or faculty appointments). The `fictional`
 * flag marks them as personas in the data model; it is intentionally not
 * rendered in the UI, so the roleplay stays intact on the page.
 *
 * Used as author bios across blog articles, guides, and university content.
 */

export interface Professor {
  id: string;
  name: string;
  title: string;
  shortTitle: string;
  department: string;
  bio: string;
  shortBio: string;
  expertise: string[];
  avatar: string; // initials fallback
  avatarColor: string; // tailwind gradient classes
  /** Yearbook-style portrait used across the University section. */
  headshot: string;
  /** One-liner printed under the portrait in the faculty yearbook. */
  yearbookQuote: string;
  courses: string[];
  socialHandle?: string;
  /** Always true — every professor is a fictional character, never a real person. */
  fictional: boolean;
}

export const professors: Professor[] = [
  {
    id: "dr-sinclair",
    name: "Dr. Vivienne Sinclair",
    title: "Dean of Creator Economics & Revenue Architecture",
    shortTitle: "Dean, Creator Economics",
    department: "Revenue Architecture & Monetization",
    bio: `Dr. Vivienne Sinclair defected from Wall Street the day she realized subscription tiers were more fun than derivatives — and infinitely more profitable. Now she runs the Dean's Desk like a champagne lounge with a Bloomberg terminal, counting other people's money for sport and pricing everything in sight (rumor has it she surge-prices her own dates). Vivienne "teaches" creator economics the way she lives it: allergic to leaving money on the table, fluent in PPV psychology, and convinced your pricing is too low — it is. She authored the free BNE Revenue Architecture guides and grades every creator's funnel with one immaculate red pen. She's here to make learning about money feel like the fun part — pull up a chair at the Dean's Desk.`,
    shortBio: "Dean of Creator Economics — a champagne-lounge Wall Street defector who writes our free monetization guides and thinks your prices are too low.",
    expertise: ["Subscription Economics", "PPV Strategy", "Fan Retention Psychology", "Revenue Diversification", "Pricing Architecture"],
    avatar: "VS",
    avatarColor: "from-violet-600 to-purple-800",
    headshot: "/images/university/prof-sinclair.jpg",
    yearbookQuote: "Your prices are too low. I already checked.",
    courses: ["Advanced Monetization Systems", "Subscription Tier Engineering", "PPV & Custom Content Mastery"],
    socialHandle: "@drsinclair_bnu",
    fictional: true,
  },
  {
    id: "prof-hayes",
    name: "Professor Marcus Hayes",
    title: "Chair of Privacy Law & Sovereign Identity Architecture",
    shortTitle: "Chair, Privacy & Legal",
    department: "Legal Compliance & Privacy Systems",
    bio: `Professor Marcus Hayes is a professional paranoid — and he wears it beautifully. He holds more burner identities than most creators have subscribers, writes every guide from an undisclosed location ("if I told you, I'd have to redact you"), and collects redacted documents the way other men collect watches. His idea of flirting is a properly executed NDA. Marcus "teaches" privacy, 18 U.S.C. § 2257 record-keeping, DMCA takedowns, and identity separation with the tenderness of a man who has personally seen what happens when creators get sloppy — and the mischief of a man who finds compliance weirdly thrilling. His obsession with keeping you safe, on the other hand, is very real.`,
    shortBio: "Privacy-obsessed professor — writes our free legal & 2257 guides from an 'undisclosed location.'",
    expertise: ["18 U.S.C. § 2257 Compliance", "DMCA Enforcement", "Identity Architecture", "Business Entity Structuring", "Platform Regulatory Frameworks"],
    avatar: "MH",
    avatarColor: "from-emerald-600 to-teal-800",
    headshot: "/images/university/prof-hayes.jpg",
    yearbookQuote: "This quote has been redacted for your safety.",
    courses: ["§ 2257 Compliance Mastery", "Identity Separation & Privacy Architecture", "DMCA Anti-Piracy Enforcement"],
    socialHandle: "@prof_hayes_bnu",
    fictional: true,
  },
  {
    id: "prof-delacroix",
    name: "Professor Isabelle Delacroix",
    title: "Professor of Niche Psychology & Audience Architecture",
    shortTitle: "Professor, Niche Psychology",
    department: "Audience Intelligence & Market Strategy",
    bio: `Professor Isabelle Delacroix can diagnose your perfect niche from three photos and a tip menu — and she'll do it with a wink that makes your analytics blush. French, dangerously perceptive, and fluent in the twelve triggers that turn casual subscribers into lifetime obsessives, Isabelle treats fan psychology like seduction. Because it is. Her free guides on niche selection and audience architecture are the most dog-eared in our library, and her lectures allegedly cause spontaneous subscriber growth (results may vary; the wink is guaranteed). When the psychology lessons start feeling like foreplay for your business, that's her doing.`,
    shortBio: "French professor of niche psychology — diagnoses your perfect niche with a wink.",
    expertise: ["Niche Psychology", "Fan Loyalty Formation", "Audience Architecture", "Consumer Behavior", "High-Ticket Fan Cultivation"],
    avatar: "ID",
    avatarColor: "from-rose-600 to-pink-800",
    headshot: "/images/university/prof-delacroix.jpg",
    yearbookQuote: "I diagnosed your niche from your tip menu. You're welcome.",
    courses: ["Niche Selection Mastery", "Fan Psychology & Loyalty Engineering", "High-Ticket Subscriber Cultivation"],
    socialHandle: "@prof_delacroix_bnu",
    fictional: true,
  },
  {
    id: "prof-okafor",
    name: "Professor Ndidi Okafor",
    title: "Professor of Digital Infrastructure & Platform Operations",
    shortTitle: "Professor, Platform Ops",
    department: "Digital Operations & Platform Management",
    bio: `Professor Ndidi Okafor automated her own job years ago and now runs everything from a hammock — which is exactly the energy she brings to her free operations guides. She speaks fluent API, her love language is a well-built content queue, and she has strong opinions about your posting schedule (she's right). Ndidi "teaches" content automation, cross-platform syndication, fan CRMs, and the operational machinery that lets creators look effortless while systems do the sweating. She believes no creator should ever manually post the same video twice, and she will die on that hill — probably while a script posts for her. Zero office hours, infinite automation tips.`,
    shortBio: "Automation-obsessed professor — runs everything from a hammock via scripts. Writes our free ops guides.",
    expertise: ["Platform Operations", "Workflow Automation", "Content Scheduling Systems", "Fan CRM Architecture", "Cross-Platform Management"],
    avatar: "NO",
    avatarColor: "from-amber-600 to-orange-800",
    headshot: "/images/university/prof-okafor.jpg",
    yearbookQuote: "I automated this yearbook entry. You're reading a cron job.",
    courses: ["Creator Operations Mastery", "Automation & Platform Sync", "Fan CRM Systems & Retention Automation"],
    socialHandle: "@prof_okafor_bnu",
    fictional: true,
  },
  {
    id: "prof-sterling",
    name: "Professor Damien Sterling",
    title: "Professor of Brand Architecture & Identity Strategy",
    shortTitle: "Professor, Brand Strategy",
    department: "Creator Brand & Identity Architecture",
    bio: `Professor Damien Sterling defected from luxury branding to the adult industry for better stories — and he's never looked back, darling. He builds creator personas like couture: measured, fitted, and devastating. He will judge your bio harder than your ex did, rewrite your content voice before his morning espresso, and position you against competitors without you ever appearing to try. His free guides on brand architecture and premium positioning are why BNE creators charge more and apologize never. Is the jawline real? Darling, some questions are better left unasked — especially when the lesson is about becoming unforgettable.`,
    shortBio: "Luxury-brand defector — builds creator personas like couture. Writes our free branding guides.",
    expertise: ["Creator Brand Architecture", "Persona Development", "Visual Identity", "Premium Positioning", "Market Differentiation"],
    avatar: "DS",
    avatarColor: "from-blue-600 to-indigo-800",
    headshot: "/images/university/prof-sterling.jpg",
    yearbookQuote: "Voted 'Most Likely to Be His Own Favorite Professor' — unanimously. By me.",
    courses: ["Creator Identity Architecture", "Brand Positioning & Premium Pricing", "Content Voice & Visual Identity"],
    socialHandle: "@prof_sterling_bnu",
    fictional: true,
  },
  {
    id: "prof-castillo",
    name: "Professor Reina Castillo",
    title: "Professor of Security, Screening & Physical Safety",
    shortTitle: "Professor, Safety & Screening",
    department: "Security, Privacy & Physical Safety",
    bio: `Professor Reina Castillo is sweet until you're on her list — and then you're simply done. An ex-investigative journalist turned keeper of the industry's meanest blacklist, Reina has ended more bad client encounters than most bouncers and writes our free safety and screening guides with zero chill, because your safety deserves zero chill. Her "classes" cover client vetting, two-person safety protocols, digital identity lockdowns, and the red-flag radar that has saved more creators than she'll ever brag about (she brags a little). When the lesson might save your life, she's the voice you want reading it.`,
    shortBio: "Ex-journalist turned safety enforcer — keeper of the meanest blacklist in the business. Writes our free safety guides.",
    expertise: ["Client Screening Systems", "Physical Safety Protocols", "Digital Identity Protection", "Threat Intelligence", "Blacklist Database Management"],
    avatar: "RC",
    avatarColor: "from-red-600 to-rose-800",
    headshot: "/images/university/prof-castillo.jpg",
    yearbookQuote: "Read the guides. Or don't. I'll remember either way.",
    courses: ["Client Screening & Vetting Mastery", "Physical Safety Protocols for In-Person Work", "Digital Security & Threat Prevention"],
    socialHandle: "@prof_castillo_bnu",
    fictional: true,
  },
];

export function getProfessorById(id: string): Professor | undefined {
  return professors.find(p => p.id === id);
}

export function getProfessorByExpertise(topic: string): Professor {
  const t = topic.toLowerCase();
  if (t.includes("monetiz") || t.includes("revenue") || t.includes("ppv") || t.includes("subscri")) {
    return professors[0]; // Dr. Sinclair
  }
  if (t.includes("legal") || t.includes("compli") || t.includes("2257") || t.includes("dmca") || t.includes("privacy")) {
    return professors[1]; // Prof. Hayes
  }
  if (t.includes("niche") || t.includes("psycho") || t.includes("audience") || t.includes("fan")) {
    return professors[2]; // Prof. Delacroix
  }
  if (t.includes("operat") || t.includes("platform") || t.includes("autom") || t.includes("backend") || t.includes("schedul")) {
    return professors[3]; // Prof. Okafor
  }
  if (t.includes("brand") || t.includes("identity") || t.includes("positi") || t.includes("content strateg")) {
    return professors[4]; // Prof. Sterling
  }
  if (t.includes("secur") || t.includes("screen") || t.includes("safety") || t.includes("vett") || t.includes("escort") || t.includes("person")) {
    return professors[5]; // Prof. Castillo
  }
  return professors[0]; // Default: Dr. Sinclair
}
