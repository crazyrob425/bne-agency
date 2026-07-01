import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Download, FileText, Printer, Mail, QrCode, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import Navigation from "@/components/Navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

interface Asset {
  id: string;
  title: string;
  description: string;
  formats: string[];
  icon: React.ElementType;
  audience: "online" | "inperson" | "both";
  color: string;
}

const assets: Asset[] = [
  {
    id: "six-figure-content-empire",
    title: "Building a Six-Figure Content Empire",
    description: "A highly detailed blueprint and visual guide to structuring your content operations for maximum revenue scale without the burnout.",
    formats: ["PNG (Infographic)", "PDF (Guide)"],
    icon: FileText,
    audience: "online",
    color: "violet",
  },
  {
    id: "elite-entertainer-business-infrastructure",
    title: "Elite Entertainer Business Infrastructure",
    description: "The complete organizational flow and structural blueprint for treating your adult entertainment career as a full-scale corporate enterprise.",
    formats: ["PNG (Infographic)", "PDF (Guide)"],
    icon: Printer,
    audience: "both",
    color: "emerald",
  },
  {
    id: "niche-mastery-guide",
    title: "Niche Mastery Guide",
    description:
      "Comprehensive 24-page guide covering niche discovery, audience analysis, content differentiation, and competitive positioning for online creators.",
    formats: ["PDF (Print)", "Digital (Interactive)"],
    icon: FileText,
    audience: "online",
    color: "violet",
  },
  {
    id: "toolkit-for-online-creators",
    title: "Toolkit for Online Creators",
    description:
      "Complete toolkit including content calendars, rate sheets, brand identity templates, and technical checklists for digital entertainers.",
    formats: ["PDF (Print)", "DOCX (Editable)"],
    icon: Printer,
    audience: "online",
    color: "violet",
  },
  {
    id: "legal-compliance-handbook",
    title: "Legal & Compliance Handbook",
    description:
      "Essential legal reference covering 2257 compliance, record-keeping requirements, platform terms of service, and privacy best practices.",
    formats: ["PDF (Print)", "PDF (Digital)"],
    icon: FileText,
    audience: "both",
    color: "emerald",
  },
  {
    id: "brand-playbook",
    title: "Brand Playbook",
    description:
      "Visual brand guidelines, logo usage rules, color palettes, typography standards, and do's and don'ts for representing the BNE brand.",
    formats: ["PDF (Print)", "Figma (Editable)"],
    icon: Mail,
    audience: "both",
    color: "amber",
  },
  {
    id: "safety-first-inperson",
    title: "Safety First — In-Person Guide",
    description:
      "Practical safety protocols, screening procedures, venue guidelines, and emergency protocols for in-person entertainment professionals.",
    formats: ["PDF (Print)", "PDF (Laminated)"],
    icon: FileText,
    audience: "inperson",
    color: "rose",
  },
  {
    id: "venue-requirements",
    title: "Venue Requirements Checklist",
    description:
      "Comprehensive checklist for venue setup, equipment needs, accessibility standards, and local compliance requirements for events.",
    formats: ["PDF (Print)", "DOCX (Editable)"],
    icon: Printer,
    audience: "inperson",
    color: "rose",
  },
  {
    id: "media-kit",
    title: "Media Kit",
    description:
      "Official media kit with company background, executive profiles, press coverage logos, high-resolution brand assets, and contact information.",
    formats: ["PDF (Print)", "ZIP (Assets)"],
    icon: QrCode,
    audience: "both",
    color: "blue",
  },
  {
    id: "marketing-assets-pack",
    title: "Marketing Assets Pack",
    description:
      "Ready-to-use marketing materials including social media templates, email campaigns, event flyers, and promotional graphics.",
    formats: ["PDF (Print)", "PNG (Social)", "PSD (Editable)"],
    icon: ExternalLink,
    audience: "both",
    color: "violet",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", light: "bg-violet-500/5" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", light: "bg-emerald-500/5" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", light: "bg-amber-500/5" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", light: "bg-rose-500/5" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", light: "bg-blue-500/5" },
};

const audienceLabels: Record<string, string> = {
  online: "Online Creators",
  inperson: "In-Person Services",
  both: "Both Divisions",
};

export default function MediaDownloads() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredAssets =
    activeFilter === "all"
      ? assets
      : activeFilter === "inperson"
        ? assets.filter((a) => a.audience === "inperson")
        : assets.filter((a) => a.audience === activeFilter || a.audience === "both");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
                <Download className="h-3.5 w-3.5" />
                Download Center
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
                <span className="text-zinc-100">Marketing</span>{" "}
                <span className="gradient-text">Asset Library</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
                Professional-grade flyers, brochures, marketing documents, and promotional materials designed for print and digital distribution.
              </p>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mb-16"
            >
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl btn-neon text-base font-semibold mx-auto">
                  <FileText className="h-5 w-5" />
                  Apply for Custom Assets
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <p className="text-sm text-zinc-500 mt-3">
                Need custom materials?{" "}
                <a href="sms:401-349-1330" className="text-violet-400 hover:text-violet-300 mono-stat">
                  401-349-1330 TXT/SMS ONLY
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {[
                { key: "all", label: "All Assets" },
                { key: "online", label: "Online Creators" },
                { key: "inperson", label: "In-Person Services" },
                { key: "both", label: "Shared Materials" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-zinc-200"
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Assets Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map((asset, index) => {
                const Icon = asset.icon;
                const colors = colorMap[asset.color];
                return (
                  <motion.div
                    key={asset.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_oklch(0.627_0.265_303.9/10%)]"
                  >
                    <div className={`p-6 ${colors.light} h-full flex flex-col`}>
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-5 border ${colors.border}`}>
                        <Icon className={`h-7 w-7 ${colors.text}`} />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-violet-300 transition-colors"
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {asset.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-grow" style={{ fontFamily: 'DM Sans' }}>
                        {asset.description}
                      </p>

                      {/* Formats */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {asset.formats.map((format) => (
                          <span
                            key={format}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-400 mono-stat"
                          >
                            {format}
                          </span>
                        ))}
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => {
                          const extension = asset.formats[0].includes("PNG") ? "png" : "pdf";
                          const filename = asset.title.replace(/ /g, "_") + "." + extension;
                          window.open("/media-files/" + filename, "_blank");
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl border ${colors.border} ${colors.bg} ${colors.text} hover:opacity-90 transition-opacity`}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* QR Reference */}
        <section className="py-20 px-4 bg-[oklch(0.09_0.01_265)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-100 mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                Quick Links for Printed Materials
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
                When designing or printing marketing materials, use the official BNE QR codes to drive direct engagement.
              </p>
              <p className="text-sm text-zinc-500 mt-2 mono-stat">
                Niche Matcher — <span className="text-violet-400">https://bne.agency/niche-matcher</span>
                &nbsp;&bull;&nbsp; Onboarding — <span className="text-violet-400">https://bne.agency/onboarding</span>
                &nbsp;&bull;&nbsp; All Services — <span className="text-violet-400">https://bne.agency/services</span>
              </p>
            </div>
          </div>
        </section>

        {/* Print Preview CTA */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-emerald-900/5" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Printer className="h-12 w-12 text-violet-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-5" style={{ fontFamily: 'Space Grotesk' }}>
                Print-Ready,<br />
                <span className="gradient-text">Brand Consistent.</span>
              </h2>
              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
                All materials are produced in CMYK at 300 DPI with proper bleed and safe zones — ready to send directly to your preferred print vendor.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500 mono-stat">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400" /> CMYK Color</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> 300 DPI</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /> 0.125in Bleed</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400" /> 0.25in Safe Zone</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}