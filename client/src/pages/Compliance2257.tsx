/**
 * BNE 2257 Compliance Page
 * In-depth legal guide to federal 18 U.S.C. § 2257 record-keeping compliance,
 * AgeGate shielding, Custodian of Records representation, and performer liability protection.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import InfographicModal from "@/components/InfographicModal";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Shield, FileText, Lock, Eye, Scale, ArrowRight, ChevronRight,
  CheckCircle2, AlertTriangle, Key, BookOpen, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const REQUIREMENTS_LIST = [
  {
    title: "1. Performer Identity Verification & Photo ID Archiving",
    description: "Federal law mandates collecting legibly copied legal government-issued photo IDs (driver's license or passport) for every individual appearing in adult content prior to publication.",
    detail: "Copies must clearly display legal full name, date of birth, and picture. These records must be cross-referenced against signed performer release forms and stored for a mandatory 7-year retention period.",
  },
  {
    title: "2. Official Custodian of Records Designation & Statement",
    description: "Every published piece of adult content must feature a visible legal compliance statement naming the designated Custodian of Records and the physical address where records are maintained.",
    detail: "Publishing without a compliant 2257 statement is a federal violation punishable by criminal penalties. BNE acts as your official Custodian of Records, insulating your personal address from public disclosures.",
  },
  {
    title: "3. Co-Star & Multi-Performer Release Documentation",
    description: "Any content depicting multiple individuals requires signed co-star model releases and independent age verification for all participants.",
    detail: "Incomplete co-star documentation is the single largest vulnerability during federal audits. BNE provides legally vetted digital release forms with automated identity verification.",
  },
  {
    title: "4. Audit Inspection Readiness & Redundant Storage",
    description: "Records must be organized alphabetically and chronologically, available for federal inspection during normal business hours.",
    detail: "BNE maintains encrypted digital vaults and physical backup archives across redundant secure locations, guaranteeing 100% audit readiness 365 days a year.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is 18 U.S.C. § 2257?",
    answer: "18 U.S.C. § 2257 is a United States federal law requiring producers and distributors of sexually explicit content to maintain detailed records proving all performers were at least 18 years of age at the time of creation.",
  },
  {
    question: "Do solo OnlyFans creators need § 2257 compliance?",
    answer: "Yes. Federal § 2257 regulations apply to independent producers, webcam models, and solo creators who produce or distribute sexually explicit media.",
  },
  {
    question: "How does BNE act as Custodian of Records?",
    answer: "BNE assumes official Custodian of Records responsibility for your brand. We store and maintain all performer ID records and legal statements, shielding your personal home address from public records.",
  },
  {
    question: "What are the penalties for non-compliance with § 2257?",
    answer: "Penalties for failure to maintain compliant records include federal criminal charges, fines, and up to 5 years imprisonment per violation.",
  },
]);

export default function Compliance2257() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("2257_Compliance_AgeGate_Shielding_Your_Empire_from_the_law");
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="18 U.S.C. § 2257 Federal Compliance & Custodian Services | BNE Studio"
        description="BNE Studio provides official Custodian of Records representation, 18 U.S.C. 2257 record-keeping compliance, model releases, and performer liability protection."
        canonical="/2257-compliance"
        schema={faqSchema}
        keywords="2257 compliance services, Custodian of Records adult creator, 18 USC 2257 record keeping, OnlyFans 2257 legal compliance, adult performer model release"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Federal Legal Defense</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              18 U.S.C. § <span className="text-[oklch(0.78_0.16_85)]">2257 Compliance</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Official Custodian of Records Representation.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Federal 18 U.S.C. § 2257 record-keeping is the single most critical legal requirement in the adult content industry. Failure to maintain compliant performer identity records, model releases, and custodian disclosures carries criminal penalties of up to 5 years imprisonment per violation.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio acts as your official Custodian of Records. We manage performer identity verification, archive physical and digital documentation, and maintain public compliance statements — taking 100% of this federal liability off your shoulders.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Get Official § 2257 Protection <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/compliance-vault">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Explore Compliance Vault
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Masterclass: AgeGate & § 2257 Legal Shielding
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch Professor Marcus Hayes break down how federal 2257 regulations operate, how to insulate your business from audits, and why designating a professional Custodian of Records is vital.
              </p>
              <VideoPlayer
                src={video?.url || "/media-files/2257_Compliance_AgeGate_Shielding_Your_Empire_from_the_law.mp4"}
                title="2257 Compliance: Shielding Your Empire"
                description="How BNE protects you from federal record-keeping liability."
              />
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Official Custodian Representation</h3>
                </div>
                <p className="text-slate-400 text-sm">BNE maintains your official custodian address on all public disclosures, shielding your home address from public records searches.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Encrypted 7-Year Archiving</h3>
                </div>
                <p className="text-slate-400 text-sm">All performer IDs and signed model releases are stored in encrypted digital vaults and physical backup facilities for mandatory 7-year terms.</p>
              </div>

              {handbook && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="p-6 bg-slate-900/80 border border-[oklch(0.78_0.16_85/30%)] rounded-xl cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      Legal & Compliance Handbook <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">Interactive PDF reader detailing federal compliance rules</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={handbook?.url || "/media-files/Legal_&_Compliance_Handbook.pdf"} title="Legal & Compliance Handbook" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 REQUIREMENTS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Mandatory Pillars of § 2257 Compliance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every BNE managed partner account adheres strictly to federal record-keeping standards.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REQUIREMENTS_LIST.map((req, i) => (
              <motion.div key={req.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <Shield size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{req.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{req.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{req.detail}</p>
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
        title="Creator Legal Compliance Reviews"
        subtitle="Read how creators protected their identity and eliminated legal liability with BNE."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I add BNE's 2257 compliance statement to my OnlyFans or website?", a: "We provide ready-to-paste HTML compliance blocks and text statements designating BNE as your official Custodian of Records." },
              { q: "What happens if federal inspectors request an audit?", a: "BNE responds directly as your Custodian of Records, producing archived performer IDs and model releases from our secure vaults." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Eliminate § 2257 Legal Liability Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get official Custodian of Records representation and 2257 compliance auditing.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Custodian Protection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
