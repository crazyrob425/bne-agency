/**
 * BNE Marketing Assets Page
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Download,
  Printer,
  Mail,
  Smartphone,
  Image,
  FileText,
  Monitor,
  QrCode,
  CheckCircle2,
  Palette,
  Layers,
  Ruler,
  Info,
  FileType,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

type AudienceColor = "online" | "inPerson" | "email" | "shared";

interface Asset {
  title: string;
  description: string;
  formats: string[];
  color: AudienceColor;
  icon: React.ElementType;
}

const AUDIENCE_CONFIG: Record<AudienceColor, {
  label: string;
  badge: string;
  iconBg: string;
  iconText: string;
  border: string;
  bgSubtle: string;
}> = {
  online: {
    label: "Online Creators",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    border: "border-violet-500/20",
    bgSubtle: "bg-violet-500/5",
  },
  inPerson: {
    label: "In-Person Entertainers",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    border: "border-emerald-500/20",
    bgSubtle: "bg-emerald-500/5",
  },
  email: {
    label: "Email Templates",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    border: "border-blue-500/20",
    bgSubtle: "bg-blue-500/5",
  },
  shared: {
    label: "Shared / Both Audiences",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    border: "border-amber-500/20",
    bgSubtle: "bg-amber-500/5",
  },
};

const ASSETS: Asset[] = [
  {
    title: "Your Niche Is Your Paycheck — 8.5×11 Flyer",
    description: "Hard-hitting flyer explaining niche selection as the #1 income factor. Features 1,000+ niche database hook, BNE services list, and dual QR codes.",
    formats: ["PDF (Print-Ready)", "PNG 1080×1350 (Instagram)"],
    color: "online",
    icon: Printer,
  },
  {
    title: "The 340% Solution — 5.5×8.5 Postcard Flyer",
    description: "Double-sided postcard showing 340% average revenue increase in 90 days. Front: results hook. Back: service breakdown table.",
    formats: ["PDF (Print-Ready)", "PNG 1080×1080 (Social)"],
    color: "online",
    icon: FileText,
  },
  {
    title: "The Creator's Blueprint — Tri-Fold Pamphlet (6 Panel)",
    description: "Complete creator guide tri-fold. Inside: power law, full BNE service menu, 4-step launch sequence, testimonials.",
    formats: ["PDF (Tri-Fold w/ Bleed)", "PNG (Flat Preview)"],
    color: "online",
    icon: Layers,
  },
  {
    title: "The Niche Matching Cheat Sheet — Bi-Fold Pamphlet",
    description: "Condensed niche strategy guide. Power law, 12 top-earning niches with revenue ranges, and free Niche Matcher QR code.",
    formats: ["PDF (Bi-Fold)", "PNG (Flat Preview)"],
    color: "online",
    icon: FileText,
  },
  {
    title: "BNE Services Overview — 8.5×11 Tri-Fold Brochure",
    description: "Premium sales brochure. Full service menu by category, BNE philosophy statement, social proof section.",
    formats: ["PDF (Tri-Fold w/ Bleed)", "PNG (Flat Preview)"],
    color: "online",
    icon: FileText,
  },
  {
    title: "Welcome Email Sequence — 4 Emails (Online Creators)",
    description: "Automated sequence for Niche Matcher leads. Day 0: niche results. Day 2: education. Day 4: social proof. Day 7: direct pitch.",
    formats: ["HTML", "Plain Text"],
    color: "email",
    icon: Mail,
  },
  {
    title: "Social Media Graphics Pack — 10 Graphics",
    description: "Ready-to-post Instagram and Twitter graphics covering niche selection, income strategy, and BNE value propositions.",
    formats: ["PNG 1080×1080", "PNG 1080×1350", "PNG 1080×1920"],
    color: "online",
    icon: Smartphone,
  },
  {
    title: "Digital Banner Ads — 4 Sizes",
    description: "IAB standard sizes: Leaderboard, Medium Rectangle, Wide Skyscraper, and Billboard with online creator messaging.",
    formats: ["PNG", "JPG", "GIF"],
    color: "online",
    icon: Monitor,
  },
  {
    title: "Business Card — Online Creators Version",
    description: "3.5×2 card. Front: BNE logo + branding. Back: 401-349-1330 TXT/SMS ONLY, website, Niche Matcher QR, tagline.",
    formats: ["PDF (Print-Ready)", "PNG"],
    color: "shared",
    icon: FileText,
  },
  {
    title: "Your Safety Is Our Business — 8.5×11 Flyer",
    description: "Safety-focused flyer highlighting client vetting, scheduling, digital payments, legal compliance, and security measures.",
    formats: ["PDF (Print-Ready)", "PNG 1080×1350"],
    color: "inPerson",
    icon: Printer,
  },
  {
    title: "Discreet. Professional. Protected. — 5.5×8.5 Flyer",
    description: "Upscale, discreet aesthetic. Front: brand statement. Back: service list, QR codes, direct contact information.",
    formats: ["PDF (Print-Ready)", "PNG 1080×1080"],
    color: "inPerson",
    icon: FileText,
  },
  {
    title: "The Professional's Guide — Tri-Fold Pamphlet (6 Panel)",
    description: "Complete in-person professional guide. Addresses safety concerns, full BNE menu, 4-step process, testimonials, and CTA.",
    formats: ["PDF (Tri-Fold)", "PNG (Flat Preview)"],
    color: "inPerson",
    icon: Layers,
  },
  {
    title: "Safety First — Always — Bi-Fold Pamphlet",
    description: "10 non-negotiable safety protocols plus legal compliance checklist for in-person professionals.",
    formats: ["PDF (Bi-Fold)", "PNG (Flat Preview)"],
    color: "inPerson",
    icon: FileText,
  },
  {
    title: "In-Person Services Overview — 8.5×11 Tri-Fold Brochure",
    description: "Complete service brochure covering client acquisition, management, brand development, safety, legal, and partner coordination.",
    formats: ["PDF (Tri-Fold)", "PNG (Flat Preview)"],
    color: "inPerson",
    icon: FileText,
  },
  {
    title: "Outreach Email Sequence — 3 Emails (In-Person)",
    description: "Day 1: safety-focused question. Day 3: 5 common income leaks. Day 5: the BNE difference and direct CTA.",
    formats: ["HTML", "Plain Text"],
    color: "email",
    icon: Mail,
  },
  {
    title: "Social Media Graphics Pack — 10 Graphics",
    description: "Screening Matters, Brand Before Business, Partner Matching, Platform Switching, Digital Payments, Legal Protection, Income Breakdown, June Spots, Comparison Chart, and QR Contact Card.",
    formats: ["PNG 1080×1080", "PNG 1080×1350", "PNG 1080×1920"],
    color: "inPerson",
    icon: Smartphone,
  },
  {
    title: "Digital Banner Ads — 4 Sizes",
    description: "Same 4 IAB standard sizes with discreet, upscale creative tailored for in-person professionals.",
    formats: ["PNG", "JPG", "GIF"],
    color: "inPerson",
    icon: Monitor,
  },
  {
    title: "Business Card — In-Person Version",
    description: "3.5×2 card. Front: BNE logo + In-Person Services Division. Back: 'Discreet. Professional. Protected.', 401-349-1330 TXT/SMS ONLY, and direct SMS QR.",
    formats: ["PDF (Print-Ready)", "PNG"],
    color: "inPerson",
    icon: FileText,
  },
  {
    title: "General Welcome Email Sequence — 3 Emails (All Clients)",
    description: "Day 1: welcome and expectation setting. Day 3: full BNE services breakdown. Day 5: guarantee and urgency CTA.",
    formats: ["HTML", "Plain Text"],
    color: "email",
    icon: Mail,
  },
];

const QR_CODES = [
  {
    name: "Niche Matcher QR",
    url: "bne.agency/niche-matcher",
    description: "Links to the Niche Matcher quiz tool for online creators.",
    color: "violet" as const,
  },
  {
    name: "Apply Now QR",
    url: "bne.agency/onboarding",
    description: "Direct link to the client onboarding application.",
    color: "violet" as const,
  },
  {
    name: "In-Person Services QR",
    url: "bne.agency/services",
    description: "Direct link to the In-Person Services landing page.",
    color: "emerald" as const,
  },
  {
    name: "Direct SMS QR",
    url: "sms:401-349-1330",
    description: "Opens SMS composer pre-addressed to BNE intake line.",
    color: "amber" as const,
  },
];

const PRINT_SPECS = [
  { label: "Bleed", value: "0.125 in (3mm) all sides", icon: Ruler },
  { label: "Safe Zone", value: "0.25 in (6mm) from trim", icon: Ruler },
  { label: "Resolution", value: "300 DPI minimum", icon: Info },
  { label: "Color (Print)", value: "CMYK", icon: Palette },
  { label: "Color (Digital)", value: "RGB", icon: Palette },
  { label: "File Format (Print)", value: "PDF/X-1a", icon: FileType },
  { label: "File Format (Web)", value: "PNG or JPG", icon: FileType },
  { label: "Flyer Paper", value: "100lb gloss text or 14pt cardstock", icon: FileText },
  { label: "Pamphlet Paper", value: "80lb–100lb gloss text, 3 mil", icon: FileText },
  { label: "Brochure Paper", value: "100lb gloss cover + 80lb gloss text", icon: FileText },
  { label: "Business Card Paper", value: "16pt coated, soft-touch or gloss", icon: FileText },
  { label: "Finish", value: "Aqueous coating (flyers), soft-touch (cards)", icon: CheckCircle2 },
];

function SectionHeader({ title, subtitle, accent = "violet" }: { title: string; subtitle?: string; accent?: string }) {
  const accentColors: Record<string, string> = {
    violet: "text-violet-400",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    amber: "text-amber-400",
  };
  return (
    <div className="text-center mb-12">
      <span className={`text-sm font-medium uppercase tracking-widest mono-stat ${accentColors[accent] || accentColors.violet}`}>
        {subtitle || "MARKETING"}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mt-2" style={{ fontFamily: 'Space Grotesk' }}>{title}</h2>
    </div>
  );
}

function FilterBadge({ color, active }: { color: AudienceColor; active: boolean }) {
  const config = AUDIENCE_CONFIG[color];
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
      active ? config.badge + " shadow-lg" : "bg-white/5 text-zinc-500 border-white/10"
    }`} style={{ fontFamily: 'DM Sans' }}>
      <span className={`w-2.5 h-2.5 rounded-full ${
        color === "online" ? "bg-violet-400" :
        color === "inPerson" ? "bg-emerald-400" :
        color === "email" ? "bg-blue-400" :
        "bg-amber-400"
      }`} />
      {config.label}
    </div>
  );
}

function AssetCard({ asset, index }: { asset: Asset; index: number }) {
  const config = AUDIENCE_CONFIG[asset.color];
  const Icon = asset.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`glass-card p-6 border ${config.border} hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg} border ${config.border}`}>
          <Icon className={`h-6 w-6 ${config.iconText}`} />
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badge}`} style={{ fontFamily: 'DM Sans' }}>
          {config.label}
        </span>
      </div>
      <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>{asset.title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow" style={{ fontFamily: 'DM Sans' }}>{asset.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {asset.formats.map((f) => (
          <span key={f} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-300 mono-stat">
            {f}
          </span>
        ))}
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-sm font-semibold hover:bg-white/12 transition-all">
        <Download className="h-4 w-4" />
        Download Now
      </motion.button>
    </motion.div>
  );
}

function QRCard({ qr }: { qr: typeof QR_CODES[0] }) {
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", icon: "bg-violet-500" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", icon: "bg-emerald-500" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", icon: "bg-amber-500" },
  };
  const c = colorMap[qr.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={`glass-card p-5 border ${c.border} flex items-start gap-4`}
    >
      <div className={`w-16 h-16 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
        <QrCode className={`h-8 w-8 ${c.text}`} />
      </div>
      <div>
        <h4 className="text-base font-bold text-zinc-100 mb-1" style={{ fontFamily: 'Space Grotesk' }}>{qr.name}</h4>
        <p className="text-zinc-400 text-xs mb-2" style={{ fontFamily: 'DM Sans' }}>{qr.description}</p>
        <span className="mono-stat text-xs text-zinc-500 break-all">{qr.url}</span>
      </div>
    </motion.div>
  );
}

function SpecRow({ spec }: { spec: typeof PRINT_SPECS[0] }) {
  const Icon = spec.icon;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <Icon className="h-4 w-4 text-zinc-500 mt-0.5 shrink-0" />
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-sm font-semibold text-zinc-300" style={{ fontFamily: 'DM Sans' }}>{spec.label}:</span>
        <span className="text-sm text-zinc-400 mono-stat">{spec.value}</span>
      </div>
    </div>
  );
}

export default function MarketingAssets() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-blue-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-violet-500/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Download className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">MARKETING ASSETS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Print-Ready &</span>
              <br />
              <span className="gradient-text">Digital-First</span>
              <span className="text-zinc-100"> Marketing Materials</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Professional, production-grade assets designed specifically for adult industry professionals. Every piece is crafted to convert, compliant, and ready for immediate deployment across print and digital channels.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <FilterBadge color="online" active />
              <FilterBadge color="inPerson" active />
              <FilterBadge color="email" active />
              <FilterBadge color="shared" active />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ASSETS GRID ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Marketing Asset Library" subtitle="19 PROFESSIONAL ASSETS" accent="violet" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASSETS.map((asset, i) => (
              <AssetCard key={asset.title} asset={asset} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QR CODE REFERENCE ── */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="QR Code Reference" subtitle="FOR MARKETING MATERIALS" accent="emerald" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-zinc-400 mb-10 text-sm" style={{ fontFamily: 'DM Sans' }}>
            The following QR codes are used throughout BNE marketing materials. Each links directly to the corresponding BNE resource.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4">
            {QR_CODES.map((qr) => (
              <QRCard key={qr.name} qr={qr} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINT SPECIFICATIONS ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Print specifications" subtitle="PRODUCTION REFERENCE" accent="blue" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="glass-card p-6 border border-white/8"
          >
            <p className="text-zinc-400 text-sm mb-6" style={{ fontFamily: 'DM Sans' }}>
              All print-ready assets follow these industry-standard production specifications. Share with your print vendor to ensure consistent, high-quality output.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8">
              {PRINT_SPECS.map((spec) => (
                <SpecRow key={spec.label} spec={spec} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOM ASSET CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="glass-card p-8 sm:p-12 border border-violet-500/20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-blue-900/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <Image className="h-8 w-8 text-violet-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Need a Custom Asset?
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
                Our standard library covers most use cases, but we understand every brand is unique. Request custom-designed marketing materials tailored specifically to your niche, audience, and brand voice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onboarding">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                    <FileText className="h-5 w-5" />
                    Request Custom Asset
                  </motion.button>
                </Link>
                <a href="sms:401-349-1330">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                    <Smartphone className="h-5 w-5" />
                    SMS Us Directly
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
