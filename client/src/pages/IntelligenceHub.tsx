/**
 * BNE Intelligence Hub Page (Blacklisted University Edition)
 * Comprehensive legal intelligence desk, federal § 2257 regulatory briefs,
 * privacy compliance frameworks, and strategic briefings for elite creators.
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
import { professors, getProfessorById } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  BookOpen, Shield, ArrowRight, Crown, FileText, CheckCircle2,
  Lock, Key, Scale, AlertTriangle, Sparkles
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const BRIEFINGS_LIST = [
  {
    code: "BRIEF-2257",
    title: "18 U.S.C. § 2257 Federal Record-Keeping & Inspection Brief",
    professor: professors[1], // Prof. Hayes
    description: "In-depth briefing detailing mandatory 7-year performer record storage, state photo ID verification SOPs, and federal audit defense preparation.",
    highlights: [
      "Performer identity verification & photo ID copy standards",
      "Co-star and cross-performer model release documentation",
      "Digital vs physical record storage legal compliance rules",
      "Step-by-step federal inspection response protocol",
    ],
  },
  {
    code: "BRIEF-PRIVACY",
    title: "Sovereign Identity Separation & Doxxing Defense",
    professor: professors[1], // Prof. Hayes
    description: "Strategic playbook on erecting an impenetrable firewall between your legal personal identity and public creator persona.",
    highlights: [
      "Anonymized corporate entity (LLC) structuring for creators",
      "VOIP phone number masking & private domain registration",
      "EXIF metadata scrubbing and automated background removal",
      "Handling stalker threats and issuing cease-and-desist notices",
    ],
  },
  {
    code: "BRIEF-DMCA",
    title: "DMCA Anti-Piracy & Content Reclamation Protocol",
    professor: professors[1], // Prof. Hayes
    description: "Operational framework for automated piracy scanning, DMCA takedown filing, and search engine link suppression.",
    highlights: [
      "Automated image & video fingerprinting technology",
      "Filing expedited DMCA notices with tube site hosts & Cloudflare",
      "Google Search indexing de-listing submission procedures",
      "Pursuing commercial pirate aggregators and leak forums",
    ],
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is covered in the BNE Legal & Compliance Handbook?",
    answer: "The Legal & Compliance Handbook provides a comprehensive operational overview of 18 U.S.C. § 2257 record-keeping, DMCA takedown procedures, LLC structuring, and performer safety.",
  },
  {
    question: "How often are legal briefings updated?",
    answer: "Our legal intelligence team updates compliance briefings quarterly or immediately upon passage of relevant state/federal adult entertainment legislation.",
  },
  {
    question: "Is § 2257 compliance mandatory for solo creators?",
    answer: "Yes. Federal law requires anyone producing, hosting, or distributing sexually explicit content to maintain compliant performer age-verification records.",
  },
]);

export default function IntelligenceHub() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Legal & Compliance Intelligence Hub | Blacklisted University"
        description="Access Blacklisted University strategic intelligence briefings on 18 U.S.C. 2257 compliance, privacy law, DMCA enforcement, and identity protection."
        canonical="/intelligence-hub"
        schema={faqSchema}
        keywords="2257 compliance guide, adult creator legal intelligence, OnlyFans privacy protection, DMCA takedown briefing, Blacklisted University intelligence"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              Legal & Compliance <span className="gradient-text-gold">Intelligence Hub</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Stay fully protected with BNE's executive compliance briefings. Master 18 U.S.C. § 2257 record-keeping standards, sovereign privacy separation, DMCA anti-piracy enforcement, and business entity fortification.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/compliance-vault">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <Shield size={16} /> Enter Compliance Vault <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/all-courses">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  View All Masterclasses
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
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Executive Handbook</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF handbook detailing federal record-keeping standards and performer privacy protection.</p>
          </div>
          {handbook && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <Shield size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Legal & Compliance Handbook (Interactive Reader)</h3>
                  <p className="text-slate-400 text-sm mt-1">42 Pages · § 2257 Auditing, Model Releases & DMCA Guidelines</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <BookOpen size={14} /> Open Reader
              </button>
            </motion.div>
          )}
          <InfographicModal url={handbook?.url || "/media-files/Legal_&_Compliance_Handbook.pdf"} title="Legal & Compliance Handbook" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 3 BRIEFINGS LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Executive Briefings</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Core Legal & Compliance Briefs</h2>
          </div>

          <div className="space-y-8">
            {BRIEFINGS_LIST.map((brief, i) => (
              <motion.div key={brief.code} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{brief.code}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 mt-1">{brief.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{brief.description}</p>
                    
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Key Directives</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {brief.highlights.map(h => (
                        <div key={h} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Legal Chair & Lead Author</div>
                      <AuthorBio professor={brief.professor} variant="compact" />
                    </div>
                    <Link href="/apply">
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Read Full Briefing →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Privacy Law & Compliance</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Compliance & Legal Reviews"
        subtitle="Read how BNE creators established airtight 2257 compliance and privacy separation."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is required for 18 U.S.C. § 2257 compliance?", a: "Producers must maintain legibly copied legal IDs for all performers, signed model releases, and clear records indicating the physical custodian of records location." },
              { q: "How does BNE protect my real identity?", a: "We build anonymized corporate structures (LLCs), mask phone channels with encrypted VOIP, scrub image metadata, and route business mail through private registered agents." },
              { q: "What should I do if my content is leaked?", a: "Notify BNE immediately. Our anti-piracy desk dispatches automated DMCA notices to hosts, Cloudflare, and search engines for de-listing." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Fortify Your Legal Privacy Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get complete 2257 compliance auditing and identity separation architecture.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Request Compliance Audit →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
