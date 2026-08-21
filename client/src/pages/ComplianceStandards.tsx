/**
 * BNE Compliance Standards Page
 * Comprehensive operational guide to federal 18 U.S.C. § 2257 regulations,
 * state age verification mandates, credit card processor compliance (Visa/Mastercard VAM),
 * and platform terms of service for adult content creators.
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
  Shield, FileText, Lock, Eye, Scale, ArrowRight, ChevronRight,
  CheckCircle2, AlertTriangle, Key, BookOpen, Crown, Award
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const STANDARDS_PILLARS = [
  {
    title: "1. Federal 18 U.S.C. § 2257 Record-Keeping Standards",
    description: "Mandatory federal requirement to collect, verify, and archive government-issued photo IDs and model releases for every individual depicted in adult content prior to publication.",
    detail: "Requires 7-year records retention and a visible Custodian of Records public compliance statement. BNE acts as official Custodian of Records for all managed creators.",
  },
  {
    title: "2. Payment Processor Compliance (Visa & Mastercard VAM Rules)",
    description: "Credit card networks enforce strict Content Standards & Brand Risk Management (VAM) rules requiring pre-publication consent verification and age-gating.",
    detail: "Non-compliance with processor rules leads to account freezes and blacklisting. BNE audit protocols ensure 100% compliance with Visa/Mastercard processing standards.",
  },
  {
    title: "3. State-Level Age Verification & Privacy Regulations",
    description: "Evolving state legislation requires commercial adult websites to implement age verification checks and strict user data privacy safeguards.",
    detail: "BNE monitors state-by-state legislative updates and deploys compliant age-gating architecture across all creator digital properties.",
  },
  {
    title: "4. Co-Star Consent & Intellectual Property Rights",
    description: "Bilateral consent agreements establishing revenue ownership, co-star release verification, and distribution rights for multi-performer content.",
    detail: "Protects creators against retroactive takedown demands, co-star disputes, and un-authorized third-party re-distribution.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are the core compliance standards for adult content creators?",
    answer: "Core standards include 18 U.S.C. § 2257 performer age verification, Visa/Mastercard payment processor content rules, state age-gating mandates, and co-star release agreements.",
  },
  {
    question: "Why are compliance standards essential for creator brand value?",
    answer: "A fully compliant business cannot be de-platformed or sued for technical record failures. Compliance turns an informal creator account into a valuable, audit-ready commercial asset.",
  },
  {
    question: "Does BNE handle compliance audits for creators?",
    answer: "Yes. BNE Studio conducts quarterly compliance audits covering § 2257 records, EXIF metadata, and processor rules for all managed creator partners.",
  },
]);

export default function ComplianceStandards() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Adult Creator Compliance Standards & Legal Frameworks | BNE Studio"
        description="Master federal 18 U.S.C. 2257 standards, Visa/Mastercard payment processor content rules, state age-gating mandates, and co-star release contracts with BNE Studio."
        canonical="/compliance-standards"
        schema={faqSchema}
        keywords="adult creator compliance standards, 2257 legal standards, Visa Mastercard adult content rules, creator age verification compliance, BNE legal standards"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Award className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Regulatory Excellence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Industry <span className="text-[oklch(0.78_0.16_85)]">Compliance Standards</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Turn Legal Compliance Into a Competitive Shield.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              The adult entertainment industry operates in a complex legal and regulatory environment. Federal 18 U.S.C. § 2257 record-keeping, credit card processor content rules, and state age-gating laws are non-negotiable.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio ensures every creator we partner with meets or exceeds all regulatory compliance standards — insulating your business from account bans, processor freezes, and federal audits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Get Compliance Protected <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/2257-compliance">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  View § 2257 Directives
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
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Compliance Manual</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF manual detailing federal 2257 standards, payment processor content rules, and custodian procedures.</p>
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
                  <h3 className="text-white font-bold text-xl">Legal & Compliance Handbook (Interactive Reader)</h3>
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Performer Age Verification, Processor Rules & Model Releases</p>
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

      {/* ── 4 STANDARDS PILLARS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Compliance Framework</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">4 Core Compliance Standards</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {STANDARDS_PILLARS.map((std, i) => (
              <motion.div key={std.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <Shield size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{std.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{std.description}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-4 border-t border-slate-800/60">{std.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Privacy Law & Federal Compliance</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Compliance Reviews"
        subtitle="Read how creators protected their brand with BNE's compliance standards."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do credit card processor rules affect my OnlyFans or website?", a: "Visa and Mastercard enforce strict VAM standards requiring pre-publication performer consent and age-gating. Violations cause merchant account terminations." },
              { q: "What does BNE do during a compliance audit?", a: "We audit your performer ID copies, model releases, custodian statements, and EXIF metadata to ensure 100% federal and processor compliance." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Turn Compliance Into Your Greatest Competitive Asset</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get full compliance audits and Custodian representation.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Compliance Protection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
