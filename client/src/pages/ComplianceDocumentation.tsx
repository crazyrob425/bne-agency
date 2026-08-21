/**
 * BNE Compliance Documentation Page
 * Comprehensive legal repository of downloadable performer release forms, § 2257 model agreements,
 * co-star consent documentation, custodian statements, and privacy audit checklists.
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
  FileText, Download, ArrowRight, Shield, CheckCircle2,
  Lock, Scale, Key, FileCheck, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const DOCUMENTATION_SUITES = [
  {
    title: "18 U.S.C. § 2257 Performer Model Release Form",
    icon: FileCheck,
    professor: professors[1], // Prof. Hayes
    desc: "Standard federal model release agreement establishing 18+ age verification, performer identity consent, photo ID archiving, and Custodian of Records authorization.",
    format: "Printable PDF & Fillable Word Document",
    details: "Required for every individual appearing in paid or promotional adult media. Includes legal indemnification clauses and custodian designation.",
  },
  {
    title: "Co-Star & Duo Performance Consent Agreement",
    icon: Scale,
    professor: professors[1], // Prof. Hayes
    desc: "Bilateral performance agreement defining revenue splits, content ownership, licensing rights, and independent § 2257 age verification for both performers.",
    format: "Digital E-Sign Template & PDF",
    details: "Protects both creators against future copyright disputes, unauthorized re-distribution, and non-compliant co-star documentation.",
  },
  {
    title: "Official Custodian of Records Public Statement",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Pre-formatted legal compliance text block designating BNE Studio as your official Custodian of Records for publication on OnlyFans, Fansly, and personal sites.",
    format: "HTML Code & Text Block",
    details: "Shields your personal home address from public records while fulfilling federal 2257 website disclosure requirements.",
  },
  {
    title: "EXIF Metadata & Privacy Audit Checklist",
    icon: Lock,
    professor: professors[1], // Prof. Hayes
    desc: "Step-by-step technical checklist for scrubbing GPS location metadata, device serial numbers, and camera information from photo and video uploads.",
    format: "Interactive PDF Checklist",
    details: "Prevents accidental location leaks and doxxing through image file EXIF headers.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What compliance documents do I need before publishing adult content?",
    answer: "You need a legibly copied government-issued photo ID for every performer, a signed § 2257 model release form, and a visible Custodian of Records statement.",
  },
  {
    question: "Are BNE compliance document templates legally binding?",
    answer: "Yes. All templates are drafted by legal specialists to comply with federal 18 U.S.C. § 2257 regulations across all U.S. states.",
  },
]);

export default function ComplianceDocumentation() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Performer Compliance Documentation & Model Release Forms | BNE Studio"
        description="Download federal 18 U.S.C. 2257 performer model releases, co-star consent contracts, custodian statements, and EXIF metadata privacy checklists."
        canonical="/compliance-documentation"
        schema={faqSchema}
        keywords="2257 model release form, adult performer contract, co star consent agreement, Custodian of Records statement, creator legal documentation"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Shield className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Legal Documentation Vault</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Compliance <span className="text-[oklch(0.78_0.16_85)]">Documentation</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Airtight Contracts. Zero Federal Risk.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Operating an adult content business without legally vetted performer release forms, co-star consent agreements, and custodian statements exposes creators to catastrophic legal liability.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio provides a complete, downloadable compliance documentation kit. Every form is drafted by legal specialists to meet federal 18 U.S.C. § 2257 standards while shielding your personal identity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Request Full Documentation Pack <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/2257-compliance">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Learn § 2257 Rules
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HANDBOOK MODAL SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Legal Handbook Release</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF manual detailing performer release forms, custodian statements, and privacy audits.</p>
          </div>
          {handbook && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Legal & Compliance Handbook (Interactive PDF)</h3>
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Full Performer Release Templates & Auditing SOPs</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <FileText size={14} /> Open Interactive Handbook
              </button>
            </motion.div>
          )}
          <InfographicModal url={handbook?.url || "/media-files/Legal_&_Compliance_Handbook.pdf"} title="Legal & Compliance Handbook" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 DOCUMENTATION SUITES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Legal Vault</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Compliance Document Kits</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {DOCUMENTATION_SUITES.map((doc, i) => (
              <motion.div key={doc.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <doc.icon size={22} />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{doc.format}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{doc.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{doc.desc}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-4 border-t border-slate-800/60">{doc.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Legal Compliance & Performer Rights</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Documentation Reviews"
        subtitle="Read how creators protected their accounts with BNE's legal compliance kits."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do co-stars need separate 2257 release forms?", a: "Yes. Every individual appearing in published content must execute an independent § 2257 performer release and provide a legibly copied government ID." },
              { q: "Are digital e-signatures valid for § 2257 releases?", a: "Yes, provided the e-signature system captures audit trail metadata, timestamping, and verified identity matching." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Get Your Custom Legal Documentation Kit</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to receive legally vetted model release forms and custodian representation.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Request Documentation Pack →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
