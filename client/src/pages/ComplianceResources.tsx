/**
 * BNE Compliance Resources Page
 * Free and premium compliance resource directory for adult creators:
 * § 2257 federal audit checklists, legal handbooks, free DMCA takedown generators, and privacy guides.
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
  FileText, Download, BookOpen, ArrowRight, Shield, CheckCircle2,
  Lock, Scale, Key, Sparkles, Award
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const RESOURCE_PACKS = [
  {
    title: "18 U.S.C. § 2257 Federal Audit Survival Guide",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Comprehensive 28-page survival guide covering federal inspector protocols, physical vs digital record organization, and custodian statement placement.",
    type: "Downloadable PDF Guide",
  },
  {
    title: "Free DMCA Anti-Piracy Notice Generator",
    icon: FileText,
    professor: professors[1], // Prof. Hayes
    desc: "Interactive web tool that formats legally binding DMCA takedown notices for submission to tube site hosts, Cloudflare, and Google Search indexers.",
    type: "Web Utility & Copy-Paste Tool",
  },
  {
    title: "Creator Sovereign Privacy & LLC Setup Manual",
    icon: Lock,
    professor: professors[1], // Prof. Hayes
    desc: "Step-by-step guide to setting up an anonymized holding company, registered agent mail forwarding, and VOIP contact isolation to protect your legal name.",
    type: "Manual & State Filing Checklist",
  },
  {
    title: "Co-Star Age Verification & Consent Toolkit",
    icon: Scale,
    professor: professors[1], // Prof. Hayes
    desc: "Complete documentation kit for multi-performer shoots, including government ID verification standards and bilateral revenue split contracts.",
    type: "Printable Forms & E-Sign SOP",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Are BNE compliance resources free for independent creators?",
    answer: "Yes. Core compliance guides, DMCA takedown tools, and § 2257 checklists are publicly accessible in our resource library.",
  },
  {
    question: "How do I know if my current record-keeping complies with § 2257?",
    answer: "Download our free § 2257 Audit Survival Guide to inspect your performer ID copies, model releases, and custodian disclosures against federal standards.",
  },
]);

export default function ComplianceResources() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Legal Compliance Resources & Survival Kits | BNE Studio"
        description="Access free adult creator legal resources: 18 U.S.C. 2257 federal audit survival guides, DMCA takedown tools, model releases, and privacy manuals."
        canonical="/compliance-resources"
        schema={faqSchema}
        keywords="adult creator compliance resources, 2257 audit guide, free DMCA takedown generator, OnlyFans legal resources, BNE legal library"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Open Legal Library</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Compliance Resources</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Your Open Legal Defense Library.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Legal compliance should not be a secret kept behind expensive lawyer retainers. BNE Studio provides an open legal defense library containing § 2257 audit checklists, DMCA takedown notice generators, and sovereign privacy manuals.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              Bookmark this page — it is your open legal survival kit for navigating federal regulations, platform policies, and performer identity protection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/free-legal-tools">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Access Free Legal Tools <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Apply for Full Protection
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
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Compliance Pack</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF handbook detailing federal 2257 rules, model releases, and custodian of records setup.</p>
          </div>
          {handbook && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Legal & Compliance Handbook (Interactive Reader)</h3>
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Full Legal Framework, Model Releases & Custodian SOPs</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <BookOpen size={14} /> Open Interactive Handbook
              </button>
            </motion.div>
          )}
          <InfographicModal url={handbook?.url || "/media-files/Legal_&_Compliance_Handbook.pdf"} title="Legal & Compliance Handbook" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 RESOURCE PACKS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Open Resources</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Compliance Toolkits & Manuals</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {RESOURCE_PACKS.map((res, i) => (
              <motion.div key={res.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <res.icon size={22} />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{res.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{res.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{res.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <AuthorBio professor={res.professor} variant="compact" />
                  <Link href="/free-legal-tools">
                    <button className="px-4 py-2 rounded-lg btn-gold text-xs font-semibold shrink-0">
                      Open Tool →
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
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Legal Compliance & Performer Privacy</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Compliance Resource Reviews"
        subtitle="Read how independent creators used BNE resources to secure their business."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I use BNE compliance resources without a paid plan?", a: "Yes. All guides, DMCA generators, and checklists in our open legal library are free to use." },
              { q: "What is the difference between free resources and Custodian representation?", a: "Free resources provide self-serve legal education and templates, while Custodian representation designates BNE Studio as your official legal record custodian, shielding your personal address." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Resources Are Free. Full Protection Is Priceless.</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Use our free legal library, then apply for BNE Studio Custodian representation to eliminate risk entirely.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Protection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
