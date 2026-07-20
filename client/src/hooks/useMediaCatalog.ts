import { useState, useEffect, useCallback } from "react";

export type MediaCatalogType = "video" | "print";

export interface MediaCatalogItem {
  id: string;
  title: string;
  description: string;
  type: MediaCatalogType;
  url: string;
  format: string;
  sizeBytes: number;
  sizeLabel: string;
  updatedAt: string;
}

export interface MediaCatalogResponse {
  videos: MediaCatalogItem[];
  printMaterials: MediaCatalogItem[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  tabooPitch: string;
  upsellTitle: string;
  upsellDesc: string;
  upsellLink: string;
  upsellButton: string;
  videos: MediaCatalogItem[];
  printMaterials: MediaCatalogItem[];
  keywords: string[];
}

const COURSES_META = [
  {
    id: "legal-privacy",
    title: "Sovereign Privacy & Legal Fortification",
    description: "Keep the alphabet soup agencies out of your bedroom. Understand federal 18 U.S.C. § 2257 record-keeping, anonymous business structures, and how to operate without leaving a paper trail to your real identity.",
    tabooPitch: "You want the money, not the attention of federal record inspectors or nosey neighbors. We teach you how to lock down your brand so hard that even the NSA couldn't link it to your real mailbox. Welcome to the legal fortress.",
    upsellTitle: "BNE Sovereign Brand Shield",
    upsellDesc: "Tired of tracking IDs, drafting releases, and worrying about compliance audits? BNE acts as your official Custodian of Records under federal law and handles all DMCA sweeps for you. We take the legal liability off your plate entirely.",
    upsellLink: "/onboarding",
    upsellButton: "Get Legal Protection Now",
    keywords: ["compliance", "legal", "2257", "fortress", "privacy", "security", "protection", "handbook", "scammers", "entertainment"]
  },
  {
    id: "niche-psychology",
    title: "Niche Domination & Audience Psychology",
    description: "Skip the generic content trap. Learn the math behind sub-genres, fetish psychology, and how to command $100+ per custom scene by owning a highly specific, starved corner of the market.",
    tabooPitch: "Posting basic selfies gets you nothing but cheap likes. Real money lies in the dark, weird corners of the human psyche that fans are too embarrassed to ask their partners for, but will gladly pay a fortune to you for. Let's find your goldmine.",
    upsellTitle: "BNE Niche Identification Strategy",
    upsellDesc: "Don't guess what makes fans spend. We run real power-law conversion analysis on over 1,000 niches to position your brand where the competition is low and the spending is astronomical.",
    upsellLink: "/niche-matcher",
    upsellButton: "Run Niche Analytics",
    keywords: ["niche", "domination", "survival", "psychology", "matcher", "mastery", "guide", "playbook", "brand", "marketing", "assets", "kit"]
  },
  {
    id: "ops-scaling",
    title: "Automated Operations & Scaling Empires",
    description: "Stop selling your time for pennies. Discover the automation systems, native-English chatting squads, and multi-platform distribution funnels that turn your creator profile into an automated ATM.",
    tabooPitch: "If you're spent 14 hours a day manually sexting fans in your DMs, you're not an empire builder — you're a digital factory worker. Learn how to delegate the talking, automate the upsells, and scale to 6-figures while sleeping.",
    upsellTitle: "The Scale-Up Operations System",
    upsellDesc: "BNE deploys a fully managed native-English chatting team trained in fan psychology and high-ticket sales to handle your inbox 24/7. We turn your audience into passive cash flow.",
    upsellLink: "/tiers",
    upsellButton: "Explore Automation Tiers",
    keywords: ["scale", "methodology", "empire", "automation", "vetting", "agency", "six-figure", "infrastructure", "toolkit", "creators", "creator", "powerhouse", "webcam", "services", "offer", "firm", "bne", "partnership", "payments", "percentages", "rates"]
  },
  {
    id: "inperson-booking",
    title: "In-Person Revenue Expansion",
    description: "Maximize your physical income with absolute safety. Learn the mechanics of creative availability advertising, VoIP text masking, and client screening protocols that filter out time-wasters and bad actors.",
    tabooPitch: "Taking your business in-person is the fastest way to stack massive bags, but it requires a bulletproof firewall. Learn how to screen clients like a secret service agent, mask your phone line, and fill your calendar with vetted clients.",
    upsellTitle: "BNE Managed Booking & Vetting",
    upsellDesc: "We handle the classified ad postings, run all clients through rigorous background and reference screening, and manage your schedule via a shared VOIP line. Real safety. Real luxury.",
    upsellLink: "/posting-and-scheduling",
    upsellButton: "Explore Booking Services",
    keywords: ["inperson", "in-person", "income", "classifieds", "booking", "scheduling", "voip", "safety", "first", "venue", "requirements", "checklist"]
  }
];

export function useMediaCatalog() {
  const [catalog, setCatalog] = useState<MediaCatalogResponse>({ videos: [], printMaterials: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/media-catalog");
      if (!response.ok) {
        throw new Error(`Media catalog API responded with code ${response.status}`);
      }
      const data = (await response.json()) as MediaCatalogResponse;
      setCatalog(data);
    } catch (err: any) {
      console.error("Error fetching media catalog:", err);
      setError("Unable to sync media resources dynamically.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  // Helper to find video by filename keyword — prefers longer/more-specific titles
  const getVideoByKeyword = (keyword: string): MediaCatalogItem | undefined => {
    const kw = keyword.toLowerCase();
    const matches = catalog.videos
      .filter(
        (video) =>
          video.title.toLowerCase().includes(kw) ||
          video.url.toLowerCase().includes(kw) ||
          video.description.toLowerCase().includes(kw)
      )
      .sort((a, b) => b.title.length - a.title.length);
    return matches[0];
  };

  // Dynamically map items to Courses using keywords
  const getCourses = (): CourseData[] => {
    return COURSES_META.map((meta) => {
      // Find matching videos
      const matchedVideos = catalog.videos.filter((video) =>
        meta.keywords.some(
          (kw) =>
            video.title.toLowerCase().includes(kw) ||
            video.url.toLowerCase().includes(kw) ||
            video.description.toLowerCase().includes(kw)
        )
      );

      // Find matching print materials
      const matchedPrint = catalog.printMaterials.filter((item) =>
        meta.keywords.some(
          (kw) =>
            item.title.toLowerCase().includes(kw) ||
            item.url.toLowerCase().includes(kw) ||
            item.description.toLowerCase().includes(kw)
        )
      );

      return {
        ...meta,
        videos: matchedVideos,
        printMaterials: matchedPrint,
      };
    });
  };

  return {
    catalog,
    loading,
    error,
    refetch: fetchCatalog,
    getVideoByKeyword,
    getCourses,
  };
}
