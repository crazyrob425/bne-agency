/**
 * BNE Templates Page
 * Comprehensive library of downloadable adult creator templates: Media Kits,
 * § 2257 Model Release forms, DM sales scripts, and custom rate card designs.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  FileText, Download, ArrowRight, Package, Zap, CheckCircle2,
  Shield, Layers, Crown, Sparkles
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const TEMPLATE_SUITES = [
  {
    title: "1. Adult Creator Media Kit & Sponsorship Dossier",
    icon: FileText,
    professor: professors[4], // Prof. Sterling
    desc: "Professional press kit and brand sponsorship proposal template formatted for adult entertainment creators seeking commercial brand partnerships.",
    format: "Interactive PDF & Editable Canva Template",
    fileKeyword: "Media_Kit",
  },
  {
    title: "2. 18 U.S.C. § 2257 Performer Release & Audit Forms",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Legally compliant model release forms, co-star photo ID verification logs, and custodian of records notices built to federal 2257 audit standards.",
    format: "Printable PDF & Fillable Word Docs",
    fileKeyword: "Compliance",
  },
  {
    title: "3. High-Ticket DM Sales Scripts & PPV Teaser Copy",
    icon: Zap,
    professor: professors[0], // Dr. Sinclair
    desc: "Conversion-tested direct message script templates, mass broadcast teaser copy, and custom order upsell sequences for OnlyFans & Fansly.",
    format: "Copy-Paste Text & Notion Database",
    fileKeyword: "Playbook",
  },
  {
    title: "4. Custom Content Tip Menu & Service Rate Cards",
    icon: Package,
    professor: professors[2], // Prof. Delacroix
    desc: "Psychologically anchored tip menu templates with clear boundary add-ons, rush fees, and non-refundable deposit terms.",
    format: "High-Res PNG Graphics & Photoshop Vector",
    fileKeyword: "Toolkit",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Are BNE templates legally compliant?",
    answer: "Yes. All legal and § 2257 templates are drafted by legal specialists to satisfy federal performer age-verification requirements.",
  },
  {
    question: "How do I download the creator Media Kit template?",
    answer: "The Media Kit template is accessible directly in our interactive reader on page or downloadable for enrolled Blacklisted University members.",
  },
]);

export default function Templates() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const mediaKit = getInfographicByKeyword("Media_Kit");

  const [modalOpen, setModalOpen] = useState(false);
  const brandProfessor = getProfessorByExpertise("brand identity positioning");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Templates & Media Kits | Blacklisted University"
        description="Download ready-to-use adult creator templates: Media Kits, 2257 performer release forms, DM sales scripts, and custom tip menu designs."
        canonical="/templates"
        schema={faqSchema}
        keywords="adult creator templates, OnlyFans media kit PDF, 2257 release form template, creator DM sales scripts, adult creator brand templates"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Package className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Template Library</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Template Vault</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Stop Reinventing the Wheel.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Stop building business assets from scratch. Download our professionally crafted media kits, legal release forms, DM sales scripts, and custom rate card graphics designed specifically for the adult creator economy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/downloads">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Browse Download Vault <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Get Full Template Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED MEDIA KIT SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Template</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Creator Media Kit & Brand Dossier</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF media kit template formatted for creator brand deals and sponsorships.</p>
          </div>
          {mediaKit && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Creator Media Kit (Interactive Reader)</h3>
                  <p className="text-slate-400 text-sm mt-1">Press Assets, Audience Demographics & Rate Card Layout</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <FileText size={14} /> Open Interactive Reader
              </button>
            </motion.div>
          )}
          <InfographicModal url={mediaKit?.url || "/media-files/Media_Kit.pdf"} title="Media Kit" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 TEMPLATE SUITES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Asset Vault</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Downloadable Template Suites</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TEMPLATE_SUITES.map((ts, i) => (
              <motion.div key={ts.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <ts.icon size={22} />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{ts.format}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{ts.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{ts.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <AuthorBio professor={ts.professor} variant="compact" />
                  <Link href="/apply">
                    <button className="px-4 py-2 rounded-lg btn-gold text-xs font-semibold shrink-0">
                      Download Suite →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Brand Strategy & Template Design</div>
          <AuthorBio professor={brandProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Template User Reviews"
        subtitle="Read how creators saved hours using BNE's pre-built templates."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I customize these templates with my brand logo and colors?", a: "Yes. All templates are delivered in fully editable formats (Canva, Word, Photoshop, Notion)." },
              { q: "Are new templates added to the vault?", a: "Yes. Our design and legal teams release new templates monthly." },
            ].map((faq, i) => (
              <div key={faq.q} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Unlock the Full Template Vault</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get immediate access to every template and media kit.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Template Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
