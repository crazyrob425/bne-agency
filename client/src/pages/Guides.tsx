/**
 * BNE Creator Guides Page
 * Complete repository of downloadable adult creator guides, toolkits, § 2257 compliance workbooks,
 * and strategic branding playbooks.
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
import { professors, getProfessorById, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  BookOpen, Download, ArrowRight, Crown, Shield, FileText,
  Zap, CheckCircle2, Sparkles, Compass
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const GUIDES_LIST = [
  {
    title: "Toolkit for Online Creators (Master PDF)",
    icon: Download,
    professor: professors[3], // Prof. Okafor
    desc: "The definitive operational handbook for adult content creators. Covers software tools, hardware studio setups, lighting configurations, content queueing templates, and platform analytics tracking.",
    pages: "48 Pages · PDF",
    fileKeyword: "Toolkit_for_Online_Creators",
  },
  {
    title: "18 U.S.C. § 2257 Compliance & Audit Manual",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Complete legal manual covering federal performer record-keeping standards, 7-year storage protocols, model release form templates, and federal inspection readiness checklists.",
    pages: "36 Pages · PDF & Templates",
    fileKeyword: "Compliance",
  },
  {
    title: "Adult Creator Brand Playbook & Positioning Dossier",
    icon: FileText,
    professor: professors[4], // Prof. Sterling
    desc: "Step-by-step brand strategy guide detailing persona development, sub-niche differentiation, visual style guide creation, and premium paywall pricing frameworks.",
    pages: "42 Pages · PDF",
    fileKeyword: "Brand_Playbook",
  },
  {
    title: "Niche Mastery & Audience Psychology Guide",
    icon: Compass,
    professor: professors[2], // Prof. Delacroix
    desc: "Market research dossier mapping 1,052 adult sub-niches. Explores consumer behavior, obsession triggers, PPV open rate benchmarks, and custom content rate card engineering.",
    pages: "54 Pages · PDF",
    fileKeyword: "Niche_Mastery_Guide",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "Are Blacklisted University guides free to download?",
    answer: "Guides are available for instant download to all enrolled Blacklisted University students and BNE Studio managed creators.",
  },
  {
    question: "What formats do BNE creator guides come in?",
    answer: "All guides are provided as high-resolution interactive PDFs, complete with fillable worksheets, legal templates, and checklists.",
  },
  {
    question: "How often are the legal and compliance guides updated?",
    answer: "Legal and compliance guides are updated quarterly by our legal faculty lead, Professor Marcus Hayes, to reflect changes in federal regulations and platform policies.",
  },
]);

export default function Guides() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const primaryToolkit = getInfographicByKeyword("Toolkit_for_Online_Creators");

  const [activeModal, setActiveModal] = useState<{ url: string; title: string } | null>(null);
  const brandProfessor = getProfessorByExpertise("brand identity positioning");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Guides & Downloadable Toolkits | Blacklisted University"
        description="Download Blacklisted University creator guides, § 2257 compliance workbooks, brand playbooks, and niche psychology toolkits."
        canonical="/guides"
        schema={faqSchema}
        keywords="adult creator guides, 2257 compliance manual PDF, OnlyFans creator toolkit, adult brand playbook PDF, Blacklisted University guides"
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
              Downloadable <span className="gradient-text-gold">Creator Guides</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Essential reading and operational manuals for adult creators. Access comprehensive PDF toolkits, § 2257 compliance forms, brand playbooks, and niche research dossiers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/all-courses">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <BookOpen size={16} /> Explore Masterclasses <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Unlock Vault Downloads
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED GUIDE HIGHLIGHT ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Release</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Toolkit for Online Creators</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">The definitive 48-page manual covering hardware setups, software automation, and platform analytics tracking.</p>
          </div>
          {primaryToolkit && (
            <motion.div
              onClick={() => setActiveModal({ url: primaryToolkit.url, title: "Toolkit for Online Creators" })}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <Download size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Toolkit for Online Creators (Interactive PDF)</h3>
                  <p className="text-slate-400 text-sm mt-1">48 Pages · Complete Hardware, Software & Automation Framework</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <Download size={14} /> Open Interactive Reader
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── GUIDES CATALOG LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Library Archive</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Required Reading & Toolkits</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GUIDES_LIST.map((g, i) => {
              const fileObj = getInfographicByKeyword(g.fileKeyword);
              return (
                <motion.div
                  key={g.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                        <g.icon size={22} />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{g.pages}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{g.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{g.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <AuthorBio professor={g.professor} variant="compact" />
                    {fileObj && (
                      <button
                        onClick={() => setActiveModal({ url: fileObj.url, title: g.title })}
                        className="px-4 py-2 rounded-lg btn-gold text-xs font-semibold shrink-0"
                      >
                        Read Guide →
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INFOGRAPHIC MODAL ── */}
      {activeModal && (
        <InfographicModal
          url={activeModal.url}
          title={activeModal.title}
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Director of Curriculum & Brand Strategy</div>
          <AuthorBio professor={brandProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Creators Say About BNE Guides"
        subtitle="Real feedback from creators who transformed their legal compliance and brand strategy using our downloadable toolkits."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I get full access to all PDF guides?", a: "Full access is provided to all enrolled Blacklisted University students and BNE Studio managed creators." },
              { q: "Can I print these guides for offline reference?", a: "Yes. All PDFs are print-formatted with clean vector layouts and high-resolution typography." },
              { q: "Are § 2257 release form templates legally binding?", a: "Our templates are drafted by legal specialists to meet 18 U.S.C. § 2257 federal requirements across all US jurisdictions." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Unlock the Complete B.U. Guide Library</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Get immediate download access to every guide, legal manual, and brand playbook in our vault.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Vault Access →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
