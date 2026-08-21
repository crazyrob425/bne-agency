/**
 * BNE Terms of Service Page
 * Master Agency Service Agreement terms: scope of advisory services, flat retainer terms,
 * 100% creator IP retention, non-disclosure & privacy clauses, and termination protocols.
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
  FileText, Shield, ArrowRight, CheckCircle2, Scale,
  Lock, Key, FileCheck, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const TERMS_CLAUSES = [
  {
    icon: Scale,
    title: "1. Scope of Services & Operational Deliverables",
    description: "Defines the exact services delivered under your selected BNE partnership tier: 24/7 DM chat management, § 2257 custodian representation, content queue scheduling, and revenue optimization.",
    detail: "All deliverables are documented in clear Service Level Agreements (SLAs) with zero ambiguity.",
  },
  {
    icon: FileCheck,
    title: "2. 100% Intellectual Property & Content Ownership",
    description: "The creator retains 100% sole ownership of all videos, photos, brand names, social accounts, and subscriber lists created before or during the partnership.",
    detail: "BNE holds zero copyright or equity claim over your content. If you leave, your entire digital empire remains 100% yours.",
  },
  {
    icon: Lock,
    title: "3. Mutual Non-Disclosure & Identity Confidentiality",
    description: "Strict non-disclosure binding BNE to protect all creator personal identities, real names, legal business entities, and financial metrics in perpetuity.",
    detail: "Confidentiality obligations survive agreement termination, ensuring your real name is never disclosed.",
  },
  {
    icon: Shield,
    title: "4. Flat Retainer Payment & Termination Terms",
    description: "Partnerships operate on flat monthly retainers billed on the 1st of each month. Initial 3-month setup period followed by flexible month-to-month terms with 30-day notice.",
    detail: "No percentage commissions, revenue shares, or surprise billing adjustments.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Does BNE own any part of my content or OnlyFans account?",
    answer: "No. Under our Master Service Agreement, you retain 100% ownership of your content, brand assets, social media accounts, and platform logins.",
  },
  {
    question: "What happens to my data if I terminate my BNE partnership?",
    answer: "Upon contract completion, all platform credentials, 2257 archives, and operational files are securely transferred back to you, and BNE staff access is immediately revoked.",
  },
]);

export default function TermsPage() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Terms of Service & Agency Master Agreement | BNE Studio"
        description="Review BNE Studio's transparent Terms of Service: 100% creator content ownership, flat retainer terms, non-disclosure guarantees, and legal agreement terms."
        canonical="/terms"
        schema={faqSchema}
        keywords="BNE terms of service, adult creator agency contract, OnlyFans management agreement, creator IP ownership terms, BNE legal terms"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Scale className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Master Service Agreement</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Terms of <span className="text-[oklch(0.78_0.16_85)]">Service</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">100% Content Ownership. Zero Surprises.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              We believe in transparent, straightforward contracts. Our Master Agency Service Agreement is written in plain language to ensure you understand your rights, deliverables, and protections.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              Most importantly, you retain 100% sole ownership of all content, accounts, and intellectual property. BNE provides the infrastructure; you build and own your empire.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Apply for Partnership <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/policies">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Review Operational Policies
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
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Legal Handbook</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF manual detailing Master Agreement terms, legal disclaimers, and 2257 compliance guidelines.</p>
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
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Full Contractual Framework, Legal Rights & Custodian Rules</p>
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

      {/* ── 4 TERMS CLAUSES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Contract Framework</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Core Service Terms</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TERMS_CLAUSES.map((term, i) => (
              <motion.div key={term.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <term.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{term.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{term.description}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-4 border-t border-slate-800/60">{term.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Legal Compliance & Contractual Law</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Terms & Agreement Feedback"
        subtitle="Read how creators feel empowered by our creator-first service terms."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can BNE modify my agreement terms without consent?", a: "No. Any modifications to Master Agreement terms require written bilateral consent from both parties." },
              { q: "Are there termination penalties if I end my partnership early?", a: "No termination penalties exist following the initial 3-month setup term with standard 30-day written notice." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Partner With a Creator-First Agency</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to receive our Master Agency Service Agreement for review.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
