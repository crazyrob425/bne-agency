/**
 * Blacklisted University — Faculty Personas
 * Used as author bios across blog articles, guides, and university content.
 * Each professor is a crafted expert persona aligned with BNE's curriculum areas.
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
  courses: string[];
  socialHandle?: string;
}

export const professors: Professor[] = [
  {
    id: "dr-sinclair",
    name: "Dr. Vivienne Sinclair",
    title: "Dean of Creator Economics & Revenue Architecture",
    shortTitle: "Dean, Creator Economics",
    department: "Revenue Architecture & Monetization",
    bio: `Dr. Vivienne Sinclair holds a dual background in behavioral economics and digital media monetization, with over a decade of experience advising independent creators and adult content professionals on financial architecture and revenue diversification. She spent six years embedded in the subscription platform economy analyzing PPV conversion patterns, fan retention psychology, and pricing elasticity across more than 1,200 creator accounts before joining Blacklisted University as founding Dean of Creator Economics. Her research into "the subscription loyalty curve" — now cited industry-wide — redefined how top-earning creators structure their subscriber tiers. Dr. Sinclair is the author of the BNE Revenue Architecture Playbook and leads our monetization masterclasses. She believes the fastest path to financial sovereignty for adult creators isn't just making more content — it's building the right revenue infrastructure around the content they already produce.`,
    shortBio: "Behavioral economist and adult creator monetization specialist with 10+ years advising subscription-based creators on revenue architecture and fan retention psychology.",
    expertise: ["Subscription Economics", "PPV Strategy", "Fan Retention Psychology", "Revenue Diversification", "Pricing Architecture"],
    avatar: "VS",
    avatarColor: "from-violet-600 to-purple-800",
    courses: ["Advanced Monetization Systems", "Subscription Tier Engineering", "PPV & Custom Content Mastery"],
    socialHandle: "@drsinclair_bnu",
  },
  {
    id: "prof-hayes",
    name: "Professor Marcus Hayes",
    title: "Chair of Privacy Law & Sovereign Identity Architecture",
    shortTitle: "Chair, Privacy & Legal",
    department: "Legal Compliance & Privacy Systems",
    bio: `Professor Marcus Hayes is a paralegal specialist and digital privacy architect with 14 years of hands-on experience navigating the legal landscape of adult content creation, sex work decriminalization advocacy, and platform compliance frameworks. Before joining Blacklisted University, he served as compliance director for two of the largest webcam networks in North America, where he developed the record-keeping and identity segmentation systems now used as industry templates. Professor Hayes is the primary architect of BNE's 18 U.S.C. § 2257 compliance system and has personally guided over 400 creators through federal record-keeping audits without a single failed inspection. His courses cover the full spectrum of legal protection for adult creators: business entity structuring, DMCA enforcement, identity separation, and state-specific licensing requirements. Hayes is a vocal advocate for creator rights and has testified as an expert witness in three landmark adult content legal cases.`,
    shortBio: "Paralegal specialist and compliance architect with 14 years in adult platform legal frameworks. Architect of BNE's 18 U.S.C. § 2257 compliance system.",
    expertise: ["18 U.S.C. § 2257 Compliance", "DMCA Enforcement", "Identity Architecture", "Business Entity Structuring", "Platform Regulatory Frameworks"],
    avatar: "MH",
    avatarColor: "from-emerald-600 to-teal-800",
    courses: ["§ 2257 Compliance Mastery", "Identity Separation & Privacy Architecture", "DMCA Anti-Piracy Enforcement"],
    socialHandle: "@prof_hayes_bnu",
  },
  {
    id: "prof-delacroix",
    name: "Professor Isabelle Delacroix",
    title: "Professor of Niche Psychology & Audience Architecture",
    shortTitle: "Professor, Niche Psychology",
    department: "Audience Intelligence & Market Strategy",
    bio: `Professor Isabelle Delacroix brings a rare combination of clinical psychology training and adult entertainment market analysis to Blacklisted University's niche strategy curriculum. With a master's degree in consumer behavior and seven years embedded in the adult content creator economy — including three years as a market analyst for a top-10 adult platform — she has mapped the psychological drivers behind niche obsession, fan loyalty formation, and purchase motivation for over 800 distinct content categories. Her landmark study, "The Niche Loyalty Index," identified the 12 psychological triggers that separate casual subscribers from lifetime high-value fans, and forms the empirical backbone of BNE's Niche Matcher tool. Professor Delacroix teaches creators how to weaponize audience psychology for organic growth, fan obsession cultivation, and sustained high-ticket revenue without running paid traffic. She is the most requested lecturer at Blacklisted University.`,
    shortBio: "Clinical psychologist turned adult market strategist. Creator of BNE's Niche Loyalty Index and the intellectual backbone behind the Niche Matcher algorithm.",
    expertise: ["Niche Psychology", "Fan Loyalty Formation", "Audience Architecture", "Consumer Behavior", "High-Ticket Fan Cultivation"],
    avatar: "ID",
    avatarColor: "from-rose-600 to-pink-800",
    courses: ["Niche Selection Mastery", "Fan Psychology & Loyalty Engineering", "High-Ticket Subscriber Cultivation"],
    socialHandle: "@prof_delacroix_bnu",
  },
  {
    id: "prof-okafor",
    name: "Professor Ndidi Okafor",
    title: "Professor of Digital Infrastructure & Platform Operations",
    shortTitle: "Professor, Platform Ops",
    department: "Digital Operations & Platform Management",
    bio: `Professor Ndidi Okafor is a platform operations specialist and digital infrastructure architect with over 12 years of experience building backend systems for adult content platforms, creator agencies, and subscription businesses. She began her career as a software engineer at a major adult streaming platform before pivoting to operations consulting, where she designed workflow automation systems for creator agencies managing 50 to 500 models simultaneously. At Blacklisted University, Professor Okafor teaches the operational mechanics of running a creator business at scale — from content scheduling and cross-platform posting automation to fan CRM systems and revenue tracking dashboards. She is the author of BNE's Creator Operations Standard Operating Procedures and has engineered the automation stack that underpins BNE Studio's managed services offering. Her philosophy: the creator's job is to appear effortless. The platform's job is to make that effortlessness possible.`,
    shortBio: "Digital infrastructure architect and platform operations specialist. Author of BNE's Creator Operations SOPs and designer of the automation stack behind BNE's managed services.",
    expertise: ["Platform Operations", "Workflow Automation", "Content Scheduling Systems", "Fan CRM Architecture", "Cross-Platform Management"],
    avatar: "NO",
    avatarColor: "from-amber-600 to-orange-800",
    courses: ["Creator Operations Mastery", "Automation & Platform Sync", "Fan CRM Systems & Retention Automation"],
    socialHandle: "@prof_okafor_bnu",
  },
  {
    id: "prof-sterling",
    name: "Professor Damien Sterling",
    title: "Professor of Brand Architecture & Identity Strategy",
    shortTitle: "Professor, Brand Strategy",
    department: "Creator Brand & Identity Architecture",
    bio: `Professor Damien Sterling has spent 15 years at the intersection of luxury brand psychology and adult creator identity architecture. A former brand director at a boutique agency that rebranded over 200 adult performers into seven-figure independent creators, Sterling joined Blacklisted University to formalize what was previously an art into a repeatable, teachable science. His framework — the "Creator Identity Stack" — is a systematic approach to building a creator persona that feels authentic, attracts obsessive fans, and commands premium pricing across every platform. Professor Sterling's courses cover personal brand architecture from the ground up: choosing and developing a persona, building visual identity, crafting a signature content voice, and positioning against market competitors without ever appearing to try. He is the reason BNE's managed creators consistently achieve 3x to 7x higher per-subscriber revenue than the platform average.`,
    shortBio: "Brand director turned identity architect. Creator of the 'Creator Identity Stack' framework and the strategic mind behind BNE's premium positioning methodology.",
    expertise: ["Creator Brand Architecture", "Persona Development", "Visual Identity", "Premium Positioning", "Market Differentiation"],
    avatar: "DS",
    avatarColor: "from-blue-600 to-indigo-800",
    courses: ["Creator Identity Architecture", "Brand Positioning & Premium Pricing", "Content Voice & Visual Identity"],
    socialHandle: "@prof_sterling_bnu",
  },
  {
    id: "prof-castillo",
    name: "Professor Reina Castillo",
    title: "Professor of Security, Screening & Physical Safety",
    shortTitle: "Professor, Safety & Screening",
    department: "Security, Privacy & Physical Safety",
    bio: `Professor Reina Castillo is a former investigative journalist and security consultant specializing in creator safety, client screening protocols, and the physical security requirements of in-person adult entertainment work. With 10 years of field experience consulting for escort agencies, webcam studios, and independent performers across North America, she has developed the industry's most comprehensive client vetting framework — the one used across BNE Studio's in-person services division. Professor Castillo teaches creators how to build multi-layered security systems that protect their physical safety, digital identity, and financial interests simultaneously. Her curriculum is the only adult entertainment safety program in the industry built entirely from real documented threat intelligence rather than theoretical frameworks. She is particularly recognized for her work on blacklist database systems, two-person safety protocols, and the psychological red flag identification system that has prevented hundreds of dangerous client encounters.`,
    shortBio: "Security consultant and investigative journalist turned creator safety architect. Author of BNE's client screening protocol and the industry's most comprehensive vetting framework.",
    expertise: ["Client Screening Systems", "Physical Safety Protocols", "Digital Identity Protection", "Threat Intelligence", "Blacklist Database Management"],
    avatar: "RC",
    avatarColor: "from-red-600 to-rose-800",
    courses: ["Client Screening & Vetting Mastery", "Physical Safety Protocols for In-Person Work", "Digital Security & Threat Prevention"],
    socialHandle: "@prof_castillo_bnu",
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
