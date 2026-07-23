/**
 * BNE Niche Matcher Engine — Diamond & Dashboard Edition
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { useState, useMemo, useCallback, useEffect } from "react";
import { NicheCard } from "@/components/NicheCard";
import { useNicheCardData } from "@/data/nicheCardData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Filter,
  Star,
  Eye,
  DollarSign,
  Layers,
  X,
  CheckCircle2,
  ArrowRight,
  Flame,
  Diamond,
  Crown,
  Brain,
  Sparkles,
  Users,
  Package,
  Lightbulb,
  Heart,
  Activity,
  Gem,
  Compass,
  Gauge,
  Lock,
  Shield,
  Dna,
  Workflow,
  Cpu,
  HelpCircle,
  Briefcase,
  History,
  Scale,
  Camera,
  EyeOff,
  DoorOpen,
  Sword,
  Target as Crosshair,
  ClipboardList,
  Flame as Burn,
  Smartphone,
  Coffee,
} from "lucide-react";
import {
  NICHE_DATABASE,
  NICHE_CATEGORIES,
  searchNiches,
  getNichesByCategory,
  getTopNiches,
  getHiddenGems,
  getNicheBySlug,
  getNichePath,
  TOTAL_NICHE_COUNT,
  type Niche,
  type NicheCategory,
} from "@/data/nicheDatabase";
import { QUIZ_QUESTIONS, computeAttachmentVector, type QuizAnswers } from "@/data/nicheQuiz";
import {
  matchNicheFinder,
  getSubconsciousInsight,
  type MatchResult,
  type NicheMatch,
  type SubconsciousInsight,
} from "@/data/nicheMatcherEngine";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { trpc } from "@/lib/trpc";
import { RegistrationGate } from "@/components/RegistrationGate";
import UnifiedRegistrationGate from "@/components/UnifiedRegistrationGate";
import { useQuizProgress } from "@/hooks/useQuizProgress";
import { Link, useLocation } from "wouter";
import NicheQuizExperience from "@/components/NicheQuizExperience";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const EP_COLORS: Record<string, string> = {
  "very-high": "text-[#D4AF37]",
  high: "text-[#C0C0C0]",
  medium: "text-[#B08D57]",
  low: "text-[#808080]",
};

const COMP_LABELS: Record<string, string> = {
  micro: "Minimal",
  low: "Low",
  medium: "Moderate",
  high: "High",
  "very-high": "Saturated",
};

const EP_LABELS: Record<string, string> = {
  "very-high": "Elite",
  high: "High",
  medium: "Mid",
  low: "Base",
};

const DIM_LABEL: Record<string, string> = {
  dominance: "Dominance",
  submission: "Submission",
  novelty: "Novelty",
  sensation: "Sensation",
  intimacy: "Intimacy",
  exhibition: "Exhibition",
  taboo: "Edge / Taboo",
  structure: "Structure",
  nurture: "Nurture",
  material: "Status / Material",
};

interface SelectedNicheCard {
  niche: Niche;
  sourceLabel: string;
  reason?: string;
}

interface NicheDeepDive {
  intro: string;
  whatItInvolves: string;
  fetishized: string;
  creatorApproach: string;
  safety: string;
  tips: string;
  diagramTitle: string;
  diagramPoints: string[];
}

interface SeoSnippet {
  question: string;
  answer: string;
  path: string;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function sanitizeFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(value: string, maxChars: number): string[] {
  const words = stripTags(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.length ? lines : [stripTags(value)];
}

function buildNicheDeepDive(niche: Niche): NicheDeepDive {
  const lower = niche.keyword.toLowerCase();
  const categoryNotes: Record<NicheCategory, string> = {
    "Sex Acts": "This is the direct, action-first version of the niche, where the draw comes from the thing itself rather than a long setup.",
    "BDSM & Power Exchange": "This niche is about negotiated power, ritual, control, and the feeling that one person is directing the scene while the other yields.",
    "Fetish & Kink": "This niche focuses on a specific trigger such as a body part, object, texture, or sensory detail that becomes the entire point of attention.",
    "Body Types & Physical": "This niche is about the body as the headline — shape, features, age presentation, or physical traits that viewers are specifically seeking.",
    "Ethnicity & Identity": "This niche is identity-first and should stay respectful; the performer is a person, not a stereotype or costume.",
    "Roleplay & Fantasy": "This niche uses costume, setting, and a tiny story premise to create the fantasy.",
    "Content Format": "This niche is driven by how the content is delivered — POV, live, clips, custom requests, audio, or photos — not just what appears in the frame.",
    "Relationship Dynamic": "This niche sells an ongoing vibe between people: devotion, jealousy, exclusivity, service, or emotional closeness.",
    "Clothing & Aesthetics": "This niche is all about wardrobe, texture, silhouette, and the visual mood created by the outfit and styling.",
    "Sensation & Stimulation": "This niche is about a specific sensation or physical feeling, usually built through rhythm, repetition, temperature, or pressure.",
    "Fluid & Bodily": "This niche leans into bodily or messy themes, so the visual effect matters as much as the concept and the cleanup matters more than people think.",
    "Toys & Equipment": "This niche uses props and gear as the visual anchor, which makes the scene feel structured and intentional.",
    "Occupation Fantasy": "This niche borrows the social meaning of a job title or uniform — authority, service, competence, or status.",
    "Age & Demographic": "This niche is about adult life-stage or age-coded presentation and must stay firmly adult-only.",
    "Lifestyle & Subculture": "This niche is the whole vibe package: hobbies, room decor, music taste, routine, attitude, and subculture identity.",
    "Audio & ASMR": "This niche is driven by sound and proximity, so clean audio and a controlled tone are the main product.",
    "Visual Style": "This niche is about lighting, camera language, editing, and the overall look of the scene.",
    "Niche Crossover": "This niche blends two or more triggers together, so the pitch needs to stay readable instead of overcrowded.",
  };

  const triggerHints = (() => {
    if (lower.includes("foot")) return "The trigger is usually a very specific visual focus on feet, footwear, or posture.";
    if (lower.includes("femdom") || lower.includes("dom")) return "The appeal comes from control and tone: who is in charge, who is following, and how obvious the hierarchy feels.";
    if (lower.includes("gfe") || lower.includes("bfe") || lower.includes("relationship")) return "The appeal is emotional continuity, so the scene should feel remembered, personal, and direct.";
    if (lower.includes("asmr") || lower.includes("audio")) return "The trigger lives in the soundscape, so small sonic details matter more than big visual moves.";
    if (lower.includes("cosplay") || lower.includes("roleplay")) return "The hook is the character illusion, which lives or dies on costume, setting, and one clear premise.";
    if (lower.includes("latex") || lower.includes("leather") || lower.includes("lingerie")) return "The visual draw is texture, shine, fit, and silhouette before anything else happens.";
    if (lower.includes("fluids") || lower.includes("wet") || lower.includes("messy")) return "The trigger is often taboo texture or a messy boundary-crossing effect, so sanitation matters a lot.";
    if (lower.includes("feet") || lower.includes("heels")) return "The appeal often comes from posture, footwear, and a close-up visual language that isolates the detail.";
    return `For ${niche.keyword}, the main hook is a very specific fantasy cue that the audience can recognize immediately.`;
  })();

  const safetyNotes = (() => {
    if (niche.category === "BDSM & Power Exchange") return "Use safewords, negotiate boundaries before the scene, and avoid dangerous practices like breath restriction or anything you cannot stop instantly.";
    if (niche.category === "Sex Acts") return "Keep consent explicit, use protection and hygiene practices that match the activity, and stop immediately if there is pain, numbness, or discomfort.";
    if (niche.category === "Fluid & Bodily") return "Plan sanitation first: barriers, cleanup, skin protection, and any allergy or infection risks should be handled before the camera turns on.";
    if (niche.category === "Ethnicity & Identity") return "Avoid racist, exoticizing, or demeaning framing, and never reduce a real person to a stereotype for clicks.";
    if (niche.category === "Age & Demographic") return "Keep the presentation strictly adult-only; never use anything that could be mistaken for minors or age play involving minors.";
    return "Keep the scene consensual, readable, and within platform rules, with a stop plan if anything feels off.";
  })();

  const creatorApproach = (() => {
    if (niche.category === "Roleplay & Fantasy") return "Treat the scene like a tiny movie: one premise, one costume cue, one emotional payoff.";
    if (niche.category === "Content Format") return "Optimize the delivery style itself — framing, pacing, aspect ratio, and intimacy level are the product here.";
    if (niche.category === "Audio & ASMR") return "Use a clean mic, controlled room tone, and deliberate pacing so the sound design feels premium.";
    if (niche.category === "Visual Style") return "Lock the aesthetic first, then keep every lighting and editing decision consistent with that look.";
    if (niche.category === "Relationship Dynamic") return "Build recurring language and continuity so the audience feels they are stepping into an ongoing connection.";
    if (niche.category === "Toys & Equipment") return "Show the prop clearly and let it signal the niche in a single shot before the scene develops.";
    return categoryNotes[niche.category];
  })();

  const intro = `${niche.keyword} sits in the ${niche.category} lane, where people usually respond to a very specific mood, visual cue, or power dynamic instead of a generic scene.`;

  return {
    intro,
    whatItInvolves: `${categoryNotes[niche.category]} For ${niche.keyword}, the core idea is usually to ${triggerHints.toLowerCase().replace(/^the trigger is /, "")}`,
    fetishized: `${triggerHints} People often fetishize it because it compresses a very specific fantasy into one instantly recognizable visual or emotional signal.`,
    creatorApproach,
    safety: safetyNotes,
    tips: "The strongest results usually come from clear framing, a consistent tone, and not trying to cram too many ideas into one scene.",
    diagramTitle: `${niche.keyword} at a glance`,
    diagramPoints: [
      `Core hook: ${niche.keyword}`,
      `Category: ${niche.category}`,
      `Market signal: ${EP_LABELS[niche.earningPotential]} earning / ${COMP_LABELS[niche.competitionLevel]} competition`,
      `Scene focus: ${stripTags(creatorApproach).split(".")[0]}`,
    ],
  };
}

function buildNicheCardSvg(niche: Niche, detail: NicheDeepDive): string {
  const width = 1400;
  const height = 2000;
  const titleLines = wrapText(niche.keyword, 24);
  const introLines = wrapText(detail.intro, 56);
  const involveLines = wrapText(detail.whatItInvolves, 56);
  const fetishLines = wrapText(detail.fetishized, 56);
  const creatorLines = wrapText(detail.creatorApproach, 56);
  const safetyLines = wrapText(detail.safety, 56);
  const tipsLines = wrapText(detail.tips, 56);

  const section = (x: number, y: number, label: string, lines: string[]) => {
    const text = lines
      .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`)
      .join("");
    return `
      <text x="${x}" y="${y}" fill="#F4F4EE" font-size="24" font-family="Arial, Helvetica, sans-serif" letter-spacing="0.02em">
        <tspan x="${x}" dy="0" fill="#D4AF37" font-size="18" font-weight="700" text-transform="uppercase">${escapeXml(label)}</tspan>
        <tspan x="${x}" dy="34">${text}</tspan>
      </text>`;
  };

  const titleBlock = titleLines
    .map((line, index) => `<tspan x="100" dy="${index === 0 ? 0 : 90}">${escapeXml(line)}</tspan>`)
    .join("");

  const footerUrl = "www.blacklisted.studio";
  const safetyShort = safetyLines.slice(0, 3);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0E1420" />
        <stop offset="55%" stop-color="#080808" />
        <stop offset="100%" stop-color="#120F08" />
      </linearGradient>
      <linearGradient id="gold" x1="0" x2="1">
        <stop offset="0%" stop-color="#F7E08A" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#8C6A14" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="34" y="34" width="1332" height="1932" rx="36" fill="none" stroke="url(#gold)" stroke-width="4" />
    <rect x="60" y="60" width="1280" height="120" rx="24" fill="#121212" stroke="#D4AF37" stroke-opacity="0.35" />
    <text x="100" y="112" fill="#D4AF37" font-size="26" font-family="Arial, Helvetica, sans-serif" letter-spacing="0.5em" font-weight="700">BLACKLISTED STUDIO NICHE CARD</text>
    <text x="100" y="186" fill="#F4F4EE" font-size="92" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="0.04em">${titleBlock}</text>
    <text x="100" y="350" fill="#9FA6B2" font-size="26" font-family="Arial, Helvetica, sans-serif" letter-spacing="0.28em">${escapeXml(niche.category)} • ${escapeXml(EP_LABELS[niche.earningPotential])} EARNING • ${escapeXml(COMP_LABELS[niche.competitionLevel])} COMPETITION</text>
    <rect x="100" y="410" width="1200" height="260" rx="28" fill="#111111" stroke="#D4AF37" stroke-opacity="0.18" />
    ${section(130, 470, "LAYMAN SUMMARY", introLines)}
    ${section(130, 705, "WHAT IT INVOLVES", involveLines)}
    <rect x="100" y="805" width="1200" height="280" rx="28" fill="#111111" stroke="#D4AF37" stroke-opacity="0.18" />
    ${section(130, 865, "HOW IT GETS FETISHIZED", fetishLines)}
    ${section(130, 1000, "CREATOR APPROACH", creatorLines)}
    <rect x="100" y="1140" width="1200" height="280" rx="28" fill="#111111" stroke="#D4AF37" stroke-opacity="0.18" />
    ${section(130, 1200, "SAFETY / HEALTH / RISK", safetyShort)}
    ${section(130, 1335, "TIPS & TRICKS", tipsLines)}
    <rect x="100" y="1495" width="1200" height="320" rx="28" fill="#111111" stroke="#D4AF37" stroke-opacity="0.18" />
    <text x="130" y="1560" fill="#D4AF37" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="0.4em">GRAPHIC DIAGRAM</text>
    <text x="130" y="1618" fill="#F4F4EE" font-size="42" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeXml(detail.diagramTitle)}</text>
    <g transform="translate(130 1660)">
      <rect x="0" y="0" width="245" height="86" rx="18" fill="#0E0E0E" stroke="#D4AF37" stroke-opacity="0.55" />
      <rect x="270" y="0" width="245" height="86" rx="18" fill="#0E0E0E" stroke="#D4AF37" stroke-opacity="0.35" />
      <rect x="540" y="0" width="245" height="86" rx="18" fill="#0E0E0E" stroke="#D4AF37" stroke-opacity="0.35" />
      <rect x="810" y="0" width="245" height="86" rx="18" fill="#0E0E0E" stroke="#D4AF37" stroke-opacity="0.35" />
      <text x="24" y="36" fill="#F4F4EE" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(detail.diagramPoints[0])}</text>
      <text x="294" y="36" fill="#F4F4EE" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(detail.diagramPoints[1])}</text>
      <text x="564" y="36" fill="#F4F4EE" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(detail.diagramPoints[2])}</text>
      <text x="834" y="36" fill="#F4F4EE" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(detail.diagramPoints[3])}</text>
      <path d="M245 43 H270 M515 43 H540 M785 43 H810" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
    </g>
    <text x="100" y="1905" fill="#D4AF37" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700">${footerUrl}</text>
    <text x="1300" y="1905" fill="#8A8A8A" font-size="22" text-anchor="end" font-family="Arial, Helvetica, sans-serif">${escapeXml(niche.keyword)}</text>
  </svg>`;
}

function downloadSvgAsPng(svg: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 2000;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to create canvas context"));
        return;
      }
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          URL.revokeObjectURL(url);
          reject(new Error("Unable to create PNG blob"));
          return;
        }
        const downloadUrl = URL.createObjectURL(pngBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
          URL.revokeObjectURL(downloadUrl);
          resolve();
        }, 0);
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to load SVG for export"));
    };
    img.src = url;
  });
}

function openPrintWindow(niche: Niche, detail: NicheDeepDive) {
  const svg = buildNicheCardSvg(niche, detail);
  const html = `<!doctype html>
  <html>
    <head>
      <title>${escapeXml(niche.keyword)} | Blacklisted Studio</title>
      <style>
        html, body { margin: 0; background: #000; color: #F4F4EE; font-family: Arial, Helvetica, sans-serif; }
        body { padding: 32px; }
        .card { max-width: 1400px; margin: 0 auto; }
        .notes { margin-top: 24px; display: grid; gap: 12px; font-size: 18px; line-height: 1.5; }
        .notes h2 { color: #D4AF37; font-size: 18px; letter-spacing: 0.35em; text-transform: uppercase; }
        .notes p { margin: 0; color: #EAE6D9; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="card">${svg}</div>
      <div class="notes">
        <h2>Layman Summary</h2><p>${escapeXml(detail.intro)}</p>
        <h2>What It Involves</h2><p>${escapeXml(detail.whatItInvolves)}</p>
        <h2>How It Gets Fetishized</h2><p>${escapeXml(detail.fetishized)}</p>
        <h2>Creator Approach</h2><p>${escapeXml(detail.creatorApproach)}</p>
        <h2>Safety / Health / Risk</h2><p>${escapeXml(detail.safety)}</p>
        <h2>Tips & Tricks</h2><p>${escapeXml(detail.tips)}</p>
        <p style="margin-top: 24px; color: #D4AF37; letter-spacing: 0.35em;">www.blacklisted.studio</p>
      </div>
      <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 250); };</script>
    </body>
  </html>`;
  const win = window.open("", "_blank", "noopener,noreferrer,width=1600,height=2200");
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}

function NicheDetailRoutePage({ niche }: { niche: Niche }) {
  const detail = buildNicheDeepDive(niche);
  const relatedNiches = useMemo(
    () => getNichesByCategory(niche.category).filter((item) => item.keyword !== niche.keyword).slice(0, 8),
    [niche],
  );

  const routePath = getNichePath(niche);
  const searchTerms = [
    niche.keyword,
    niche.category,
    `${niche.keyword} meaning`,
    `${niche.keyword} guide`,
    `${niche.keyword} safety`,
    `${niche.keyword} tips`,
  ];

  const routeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${niche.keyword} Niche Guide`,
        url: `https://blacklisted.studio${routePath}`,
        description: `${detail.intro} ${detail.whatItInvolves}`,
        keywords: searchTerms,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Niche Matcher",
            item: "https://blacklisted.studio/niche-matcher",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: niche.keyword,
            item: `https://blacklisted.studio${routePath}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is ${niche.keyword}?`,
            acceptedAnswer: { "@type": "Answer", text: detail.intro },
          },
          {
            "@type": "Question",
            name: `How do you create content for ${niche.keyword}?`,
            acceptedAnswer: { "@type": "Answer", text: detail.creatorApproach },
          },
          {
            "@type": "Question",
            name: `What safety notes matter for ${niche.keyword}?`,
            acceptedAnswer: { "@type": "Answer", text: detail.safety },
          },
        ],
      },
    ],
  };

  const handlePrint = () => openPrintWindow(niche, detail);

  const handleDownload = async () => {
    const svg = buildNicheCardSvg(niche, detail);
    const filename = `${sanitizeFileName(niche.keyword)}-blacklisted-studio.png`;
    await downloadSvgAsPng(svg, filename);
  };

  return (
    <div className="min-h-screen bg-black text-[#F4F4EE] selection:bg-[#D4AF37]/30 selection:text-white">
      <Seo
        title={`${niche.keyword} Niche Guide`}
        description={`${detail.intro} ${detail.whatItInvolves}`}
        canonical={routePath}
        keywords={searchTerms}
        schema={routeSchema}
      />
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37] mb-2">Dedicated SEO route</p>
            <h1 className="text-5xl md:text-7xl font-display text-[#F4F4EE] leading-[0.95]">{niche.keyword}</h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#666] font-bold mt-4">
              {niche.category} · {EP_LABELS[niche.earningPotential]} earning · {COMP_LABELS[niche.competitionLevel]} competition
            </p>
          </div>
          <Link href="/niche-matcher" className="btn-luxury h-12 px-6">
            Back to matcher
          </Link>
        </div>

        <section className="sapphire-glass diamond-cut border-[#D4AF37]/40 shadow-[0_0_80px_rgba(212,175,55,0.12)] overflow-hidden">
          <div className="border-b border-white/5 bg-[#050505]/90 px-6 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37] mb-2">Indexable niche page</p>
                <p className="text-sm uppercase tracking-[0.25em] text-[#666] font-bold">Built for search, AI retrieval, and direct linking.</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black">
                www.blacklisted.studio
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] p-6 md:p-8">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-[#D4AF37]/25 bg-black/30 p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Layman summary</p>
                <p className="text-sm md:text-base leading-8 text-[#F4F4EE]">{detail.intro}</p>
                <p className="text-sm md:text-base leading-8 text-[#EAE6D9] mt-4">{detail.whatItInvolves}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["How it gets fetishized", detail.fetishized],
                  ["Creator approach", detail.creatorApproach],
                  ["Safety / health / risk", detail.safety],
                  ["Tips & tricks", detail.tips],
                ].map(([title, body]) => (
                  <div key={title} className="sapphire-glass p-5 diamond-cut border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">{title}</p>
                    <p className="text-xs md:text-sm leading-7 text-[#EAE6D9]">{body}</p>
                  </div>
                ))}
              </div>

              <div className="sapphire-glass p-5 diamond-cut border-white/5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Search microquote</p>
                <blockquote className="text-sm leading-7 text-[#F4F4EE]">{detail.intro}</blockquote>
              </div>
            </div>

            <div className="space-y-6">
              <div className="sapphire-glass p-6 diamond-cut border-[#D4AF37]/30">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Card diagram</p>
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#101010] via-[#080808] to-[#111111] p-5">
                  <div className="aspect-[4/5] rounded-[1.25rem] border border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_55%)] p-5 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.6em] text-[#D4AF37] mb-3">Blacklisted Studio</p>
                      <h2 className="text-3xl font-display text-[#F4F4EE] leading-tight">{niche.keyword}</h2>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[#666] font-bold mt-2">{niche.category}</p>
                    </div>
                    <div className="space-y-3">
                      {detail.diagramPoints.map((point) => (
                        <div key={point} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs leading-6 text-[#EAE6D9]">
                          {point}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.55em] text-[#D4AF37] font-black">www.blacklisted.studio</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={handlePrint} className="btn-luxury active h-14 px-4">
                  Print niche
                </button>
                <button type="button" onClick={handleDownload} className="btn-luxury active h-14 px-4">
                  Download niche
                </button>
              </div>

              <div className="sapphire-glass p-5 diamond-cut border-white/5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Related niches</p>
                <div className="flex flex-wrap gap-2">
                  {relatedNiches.map((related) => (
                    <Link
                      key={related.keyword}
                      href={getNichePath(related)}
                      className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-[#EAE6D9] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors"
                    >
                      {related.keyword}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ─── LUXURY HELPER COMPONENTS ──────────────────────────────────────────────────

function StatPlaque({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="relative group overflow-hidden diamond-cut">
      <div className="bg-[#0A0A0A] border-l border-[#D4AF37] p-5 min-w-[180px]">
        <Icon className="h-3 w-3 text-[#D4AF37] mb-2 opacity-40" />
        <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-bold">{label}</p>
        <p className="text-sm font-bold text-[#F4F4EE] tracking-tight">{value}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NicheMatcher() {
  const [pathname, setLocation] = useLocation();
  const { getVideoByKeyword } = useMediaCatalog();
  const nicheVideo = getVideoByKeyword("niche");
  const [activeTab, setActiveTab] = useState<"quiz" | "browse" | "search">("quiz");

  const quizProgressApi = useQuizProgress();
  const alreadyAuthed = trpc.auth.me.useQuery().data != null;



  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>(quizProgressApi.saved?.answers ?? {});
  const [quizResults, setQuizResults] = useState<MatchResult | null>(null);
  const [quizInsight, setQuizInsight] = useState<SubconsciousInsight | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [attachment, setAttachment] = useState<{
    anxiety: number;
    avoidance: number;
    quadrant: string;
  } | null>(null);

  const [browseCategory, setBrowseCategory] = useState<NicheCategory | "all" | "gems" | "top">("top");
  const [browseFilter, setBrowseFilter] = useState<{ ep?: Niche["earningPotential"]; comp?: Niche["competitionLevel"]; }>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<SelectedNicheCard | null>(null);
  const searchResults = useMemo(() => (searchQuery.length >= 2 ? searchNiches(searchQuery) : []), [searchQuery]);
  const routeSlug = useMemo(() => {
    const match = pathname.match(/^\/niche-matcher\/([^/]+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  }, [pathname]);
  const routeNiche = useMemo(() => (routeSlug ? getNicheBySlug(routeSlug) : null), [routeSlug]);

  if (routeSlug && routeNiche) {
    return <NicheDetailRoutePage niche={routeNiche} />;
  }

  if (routeSlug && !routeNiche) {
    return (
      <div className="min-h-screen bg-black text-[#F4F4EE]">
        <Seo
          title="Niche not found"
          description="The niche URL could not be resolved. Return to the main niche matcher to browse the full index."
          canonical="/niche-matcher"
          noIndex
        />
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-32 text-center">
          <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37] mb-4">Invalid niche route</p>
          <h1 className="text-5xl md:text-7xl font-display mb-6">That niche page does not exist.</h1>
          <p className="text-sm uppercase tracking-[0.25em] text-[#666] font-bold mb-10">
            Return to the main matcher and open one of the dedicated niche pages instead.
          </p>
          <Link href="/niche-matcher" className="btn-luxury active px-10 h-14 inline-flex">
            Back to matcher
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStep = QUIZ_QUESTIONS[quizStep];
  const progress = ((quizStep + (quizComplete ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const handleQuizAnswer = useCallback((value: string) => {
    if (currentStep.type === "multi") {
      const current = (quizAnswers[currentStep.id] as string[]) || [];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setQuizAnswers((prev) => ({ ...prev, [currentStep.id]: updated }));
    } else {
      setQuizAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
      quizProgressApi.save({ lastCompletedQuestionId: currentStep.id, answers: { ...quizAnswers, [currentStep.id]: value }, questionsAnswered: Object.keys(quizAnswers).length + 1 });
      quizProgressApi.registerExit({ lastCompletedQuestionId: currentStep.id, answers: { ...quizAnswers, [currentStep.id]: value }, questionsAnswered: Object.keys(quizAnswers).length + 1 });
      setTimeout(() => {
        if (quizStep < QUIZ_QUESTIONS.length - 1) setQuizStep((s) => s + 1);
        else finishQuiz({ ...quizAnswers, [currentStep.id]: value });
      }, 300);
    }
  }, [quizStep, quizAnswers, currentStep]);

  const handleMultiNext = useCallback(() => {
    quizProgressApi.save({ lastCompletedQuestionId: currentStep?.id ?? null, answers: quizAnswers, questionsAnswered: Object.keys(quizAnswers).length });
    quizProgressApi.registerExit({ lastCompletedQuestionId: currentStep?.id ?? null, answers: quizAnswers, questionsAnswered: Object.keys(quizAnswers).length });
    if (quizStep < QUIZ_QUESTIONS.length - 1) setQuizStep((s) => s + 1);
    else finishQuiz(quizAnswers);
  }, [quizStep, quizAnswers]);

  const finishQuiz = useCallback((answers: QuizAnswers) => {
    const attachmentVec = computeAttachmentVector(answers);
    setAttachment({
      anxiety: attachmentVec.anxiety,
      avoidance: attachmentVec.avoidance,
      quadrant: attachmentVec.quadrant,
    });
    setQuizResults(matchNicheFinder(answers, attachmentVec));
    setQuizInsight(getSubconsciousInsight(answers));
    setQuizComplete(true);
    quizProgressApi.complete({ answers, resultSnapshot: matchNicheFinder(answers, attachmentVec) });
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResults(null);
    setQuizInsight(null);
    setQuizComplete(false);
    setAttachment(null);
  }, []);

  const browseNiches = useMemo(() => {
    let niches: Niche[];
    if (browseCategory === "top") niches = getTopNiches(60, browseFilter.ep ? { earningPotential: browseFilter.ep } : undefined);
    else if (browseCategory === "gems") niches = getHiddenGems(60);
    else if (browseCategory === "all") niches = [...NICHE_DATABASE];
    else niches = getNichesByCategory(browseCategory);
    if (browseFilter.ep) niches = niches.filter((n) => n.earningPotential === browseFilter.ep);
    if (browseFilter.comp) niches = niches.filter((n) => n.competitionLevel === browseFilter.comp);
    return niches.slice(0, 80);
  }, [browseCategory, browseFilter]);

  const selectedDetail = useMemo(
    () => (selectedNiche ? buildNicheDeepDive(selectedNiche.niche) : null),
    [selectedNiche],
  );

  const seoSnippets = useMemo<SeoSnippet[]>(() => {
    const source = [
      ...browseNiches.slice(0, 4),
      ...searchResults.slice(0, 2),
      ...(quizResults?.matches.slice(0, 2).map((m) => m.niche) ?? []),
    ];
    const unique = source.filter((niche, index, arr) => arr.findIndex((item) => item.keyword === niche.keyword) === index);
    return unique.slice(0, 6).map((niche) => {
      const detail = buildNicheDeepDive(niche);
      return {
        question: `What is ${niche.keyword}?`,
        answer: `${detail.intro} ${detail.whatItInvolves}`,
        path: getNichePath(niche),
      };
    });
  }, [browseNiches, quizResults?.matches, searchResults]);

  useEffect(() => {
    if (!selectedNiche) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedNiche(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedNiche]);

  const openNicheCard = useCallback((niche: Niche) => {
    setSelectedNiche(null);
    setLocation(getNichePath(niche));
  }, [setLocation]);

  const handlePrintSelected = useCallback(() => {
    if (!selectedNiche || !selectedDetail) return;
    openPrintWindow(selectedNiche.niche, selectedDetail);
  }, [selectedNiche, selectedDetail]);

  const handleDownloadSelected = useCallback(async () => {
    if (!selectedNiche || !selectedDetail) return;
    const svg = buildNicheCardSvg(selectedNiche.niche, selectedDetail);
    const filename = `${sanitizeFileName(selectedNiche.niche.keyword)}-blacklisted-studio.png`;
    await downloadSvgAsPng(svg, filename);
  }, [selectedNiche, selectedDetail]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "BNE Niche Matcher Engine",
        url: "https://blacklisted.studio/niche-matcher",
        description: "Strategic niche database, quiz engine, and detailed niche card explorer for content-market research.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        keywords: seoSnippets.map((snippet) => snippet.question),
      },
      {
        "@type": "FAQPage",
        mainEntity: seoSnippets.map((snippet) => ({
          "@type": "Question",
          name: snippet.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: snippet.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        name: "Niche SEO spotlight list",
        itemListElement: seoSnippets.map((snippet, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: snippet.question,
          description: snippet.answer,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-[#F4F4EE] selection:bg-[#D4AF37]/30 selection:text-white">
      <Seo
        title="Elite Niche Matcher | Strategic Inventory"
        description="Explore, compare, and decode niche categories with detailed cards, adult content market context, and crawlable FAQ answers for niche topic questions."
        keywords={[
          "niche matcher",
          "niche SEO",
          "content niche research",
          "adult niche database",
          "niche topic questions",
          ...seoSnippets.map((snippet) => snippet.question.replace(/\?$/, "")),
        ]}
        schema={webAppSchema}
      />
      <Navigation />

      {/* ── DRAMATIC HERO ── */}
      <section className="relative pt-48 pb-32 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 knurled-gold border-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-15 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-7xl md:text-9xl font-display leading-[0.8] mb-8 bling-shine">
                Elite <br />
                <span className="text-[#D4AF37]">Strategic</span> <br />
                Inventory
              </h1>
              <p className="text-xl text-[#666] max-w-lg leading-relaxed font-bold uppercase tracking-[0.2em]">
                System v2.026 // Clinical Psychometric Analysis
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-1 justify-center md:justify-end">
            <StatPlaque icon={Cpu} label="Engine Logic" value="Subconscious Map" />
            <StatPlaque icon={Target} label="Search Volume" value="1.2M+ Indexed" />
            <StatPlaque icon={Activity} label="Index Count" value="1,052 Sectors" />
          </div>
        </div>
      </section>

      {/* ── EXCLUSIVE BRIEFING ── */}
      <section className="py-24 bg-black border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.8em] text-[#D4AF37] uppercase mb-4 block">Classified Strategic Briefing</span>
            <h2 className="text-6xl font-display text-[#F4F4EE] mb-4">Niche Domination</h2>
            <p className="text-sm text-[#444] uppercase tracking-widest font-bold">Watch to understand how we target high-value sub-genres.</p>
          </div>
          <div className="dashboard-bezel p-1 sapphire-glass diamond-cut">
            <VideoPlayer
              src={nicheVideo?.url || "/media-files/Niche_Quiz_Supremacy_–_The_Strategic_Economics_of_Adult_Niche.mp4"}
              title="Strategic Dominance"
              description="Engineering market control in high-yield segments."
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,_#D4AF37_0deg,_transparent_360deg)]" />
      </section>

      {/* ── THE CONTROL DASHBOARD ── */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="dashboard-bezel">
          <div className="bg-[#050505] p-1 flex flex-col lg:flex-row gap-1">
            <div className="w-full lg:w-64 bg-black p-8 flex flex-row lg:flex-col gap-4 border-r border-white/5">
              <p className="hidden lg:block text-[10px] font-black tracking-[0.5em] text-[#222] uppercase mb-6">Console Modules</p>
              <button onClick={() => setActiveTab('quiz')} className={`btn-luxury w-full ${activeTab === 'quiz' ? 'active' : ''}`}>
                <Compass className="h-4 w-4 mr-3" /> Analysis
              </button>
              <button onClick={() => setActiveTab('browse')} className={`btn-luxury w-full ${activeTab === 'browse' ? 'active' : ''}`}>
                <Layers className="h-4 w-4 mr-3" /> Archive
              </button>
              <button onClick={() => setActiveTab('search')} className={`btn-luxury w-full ${activeTab === 'search' ? 'active' : ''}`}>
                <Search className="h-4 w-4 mr-3" /> Query
              </button>
              <div className="mt-auto hidden lg:block pt-12 border-t border-white/5">
                 <div className="flex items-center gap-4 text-[#1A1A1A]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.1)]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Identity Verified</span>
                 </div>
              </div>
            </div>

                        <div className="flex-1 bg-black p-12 min-h-[750px] relative overflow-hidden">
                {!alreadyAuthed && (
                  <UnifiedRegistrationGate
                    flowType="quiz"
                    onRegistered={(sessionId) => {
                      quizProgressApi.save({
                        lastCompletedQuestionId: quizStep > 0 ? QUIZ_QUESTIONS[quizStep - 1]?.id ?? null : null,
                        answers: quizAnswers,
                        questionsAnswered: Object.keys(quizAnswers).length,
                      });
                    }}
                    onDismissed={() => {}}
                    compact
                    defaultEmail=""
                  />
                )}
                {quizProgressApi.saved && !quizProgressApi.saved.completed && Object.keys(quizProgressApi.saved.answers).length > 0 && (
                  <div className="mb-6 rounded-xl border border-[#2A2A30] bg-[#0B0B0D] px-5 py-3 text-sm text-[#9FA6B2] flex items-center justify-between">
                    <span>Welcome back — we restored your saved progress ({quizProgressApi.saved.questionsAnswered} answers).</span>
                    <button onClick={resetQuiz} className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold">Start over</button>
                  </div>
                )}
                <div className="absolute top-8 right-10 flex gap-8 text-[9px] font-black text-[#1A1A1A] uppercase tracking-[0.5em]">
                   <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" /> Core Engaged</span>
                   <span>Region: Global</span>
                </div>

                 <AnimatePresence mode="wait">
                    {activeTab === 'quiz' && (
                      <motion.div key="quiz-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <NicheQuizExperience
                          progressApi={quizProgressApi}
                          initialAnswers={quizAnswers}
                          onComplete={(matchResult, insightResult, attachmentVec) => {
                            setQuizResults(matchResult);
                            setQuizInsight(insightResult);
                            setAttachment(attachmentVec);
                            setQuizComplete(true);
                          }}
                          onReset={() => {
                            setQuizStep(0);
                            setQuizAnswers({});
                            setQuizResults(null);
                            setQuizInsight(null);
                            setQuizComplete(false);
                            setAttachment(null);
                          }}
                        />
                      </motion.div>
                    )}

                  {activeTab === 'browse' && (
                    <motion.div key="browse-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-10">
                          {(["top", "gems", "all", ...NICHE_CATEGORIES] as const).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setBrowseCategory(cat)}
                              className={`btn-luxury px-6 h-12 text-[9px] ${browseCategory === cat ? 'active' : ''}`}
                            >
                              {cat === "top" ? "Elite Performance" : cat === "gems" ? "High Yield Gems" : cat === "all" ? "Master Index" : cat}
                            </button>
                          ))}
                       </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                           {browseNiches.map((niche, i) => (
                             <NicheCard key={`${niche.keyword}-${i}`} niche={niche} />
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {activeTab === 'search' && (
                    <motion.div key="search-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto pt-32">
                       <div className="relative mb-16">
                          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-[#222]" />
                          <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="INPUT QUERY PARAMETERS..."
                            className="w-full bg-[#050505] border border-white/5 focus:border-[#D4AF37]/40 h-20 pl-20 pr-10 text-xs font-black uppercase tracking-[0.5em] diamond-cut transition-all outline-none text-[#D4AF37]"
                          />
                          {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#222] hover:text-[#D4AF37]">
                               <X className="h-6 w-6" />
                            </button>
                          )}
                       </div>

                        {searchResults.length > 0 ? (
                          <div className="grid gap-6 sm:grid-cols-2">
                             {searchResults.slice(0, 24).map((niche, i) => (
                               <NicheCard key={`${niche.keyword}-${i}`} niche={niche} />
                             ))}
                          </div>
                        ) : (
                         <div className="text-center py-32 opacity-10">
                            <Workflow className="h-24 w-24 mx-auto mb-10 text-[#D4AF37]" />
                            <p className="text-[11px] font-black tracking-[0.8em] uppercase">Awaiting Strategic Input</p>
                         </div>
                       )}
                    </motion.div>
                  )}
               </AnimatePresence>

               <section className="mt-20 pt-16 border-t border-white/5">
                 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                   <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#D4AF37] block mb-3">Niche SEO Microquotes</span>
                     <h3 className="text-4xl font-display text-[#F4F4EE]">Search-Friendly Answers People Actually Ask</h3>
                   </div>
                   <p className="max-w-2xl text-xs uppercase tracking-[0.25em] text-[#555] font-black leading-relaxed">
                     These short answers are designed to be crawled, quoted, and reused by search engines and AI assistants when people ask what a niche means.
                   </p>
                 </div>
                 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                   {seoSnippets.map((snippet) => (
                     <Link key={snippet.question} href={snippet.path} className="sapphire-glass p-6 diamond-cut border-white/5 block transition-all hover:border-[#D4AF37]/40 hover:-translate-y-0.5">
                       <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37] mb-3">{snippet.question}</p>
                       <blockquote className="text-sm text-[#F4F4EE] leading-relaxed">{snippet.answer}</blockquote>
                     </Link>
                   ))}
                 </div>
               </section>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedNiche && selectedDetail && (
          <motion.div
            key="niche-detail-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNiche(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto sapphire-glass diamond-cut border-[#D4AF37]/40 shadow-[0_0_80px_rgba(212,175,55,0.18)]"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/5 bg-[#050505]/95 px-6 py-5 backdrop-blur">
                <div>
                  <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#D4AF37] mb-2">{selectedNiche.sourceLabel}</p>
                  <h3 className="text-4xl md:text-5xl font-display text-[#F4F4EE]">{selectedNiche.niche.keyword}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold mt-2">{selectedNiche.niche.category} · {EP_LABELS[selectedNiche.niche.earningPotential]} earning · {COMP_LABELS[selectedNiche.niche.competitionLevel]} competition</p>
                </div>
                <button type="button" onClick={() => setSelectedNiche(null)} className="btn-luxury h-12 w-12 !px-0" aria-label="Close niche detail">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] p-6 md:p-8">
                <div className="space-y-6">
                  <div className="rounded-[1.5rem] border border-[#D4AF37]/25 bg-black/30 p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Layman summary</p>
                    <p className="text-sm md:text-base leading-8 text-[#F4F4EE]">{selectedDetail.intro}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["What it involves", selectedDetail.whatItInvolves],
                      ["How it gets fetishized", selectedDetail.fetishized],
                      ["Creator approach", selectedDetail.creatorApproach],
                      ["Safety / health / risk", selectedDetail.safety],
                      ["Tips & tricks", selectedDetail.tips],
                    ].map(([title, body]) => (
                      <div key={title} className="sapphire-glass p-5 diamond-cut border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">{title}</p>
                        <p className="text-xs md:text-sm leading-7 text-[#EAE6D9]">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="sapphire-glass p-6 diamond-cut border-[#D4AF37]/30">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">Card diagram</p>
                    <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#101010] via-[#080808] to-[#111111] p-5">
                      <div className="aspect-[4/5] rounded-[1.25rem] border border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_55%)] p-5 flex flex-col justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.6em] text-[#D4AF37] mb-3">Blacklisted Studio</p>
                          <h4 className="text-3xl font-display text-[#F4F4EE] leading-tight">{selectedNiche.niche.keyword}</h4>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-[#666] font-bold mt-2">{selectedNiche.niche.category}</p>
                        </div>
                        <div className="space-y-3">
                          {selectedDetail.diagramPoints.map((point) => (
                            <div key={point} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs leading-6 text-[#EAE6D9]">{point}</div>
                          ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.55em] text-[#D4AF37] font-black">www.blacklisted.studio</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <button type="button" onClick={handlePrintSelected} className="btn-luxury active h-14 px-4">
                      Print niche
                    </button>
                    <button type="button" onClick={handleDownloadSelected} className="btn-luxury active h-14 px-4">
                      Download niche
                    </button>
                    <button type="button" onClick={() => setSelectedNiche(null)} className="btn-luxury h-14 px-4">
                      Close
                    </button>
                  </div>

                  <div className="sapphire-glass p-5 diamond-cut border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-3">SEO micro quote</p>
                    <blockquote className="text-sm leading-7 text-[#F4F4EE]">{selectedDetail.intro}</blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}









