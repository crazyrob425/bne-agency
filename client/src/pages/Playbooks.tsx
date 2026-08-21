/**
 * BNE Creator Playbooks Page
 * Actionable operational blueprints for adult content creators: Business Infrastructure,
 * Brand Positioning, DM Sales Scripts, and § 2257 Compliance Audits.
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
  FileText, ArrowRight, Crown, Shield, Zap, CheckCircle2,
  Briefcase, Layers, Cpu, Compass
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const PLAYBOOKS_LIST = [
  {
    code: "PLAYBOOK-01",
    title: "Elite Entertainer Business Infrastructure Playbook",
    icon: Briefcase,
    professor: professors[3], // Prof. Okafor
    desc: "Complete operational architecture for high-earning creators. Covers bank account separation, LLC corporate formation, content scheduling queues, and team delegation.",
    steps: [
      "Establishing independent business banking & accounting",
      "Forming an anonymized holding company & operating LLC",
      "Building a 30-day content pipeline with automated queueing",
      "Hiring and managing dedicated native DM chat specialists",
    ],
  },
  {
    code: "PLAYBOOK-02",
    title: "Creator Brand Positioning & Visual Identity Playbook",
    icon: Compass,
    professor: professors[4], // Prof. Sterling
    desc: "Step-by-step branding blueprint for establishing a distinct persona, visual aesthetic signature, sub-niche authority, and high-ticket pricing power.",
    steps: [
      "Auditing sub-niche search volume & competitor saturation",
      "Crafting your signature creator voice & vocabulary guide",
      "Designing a high-converting profile bio & paywall header",
      "Structuring multi-tiered subscription price points",
    ],
  },
  {
    code: "PLAYBOOK-03",
    title: "High-Ticket DM Sales & PPV Conversion Playbook",
    icon: Zap,
    professor: professors[0], // Dr. Sinclair
    desc: "Sales psychology scripts and cohort messaging funnels designed to convert casual subscribers into high-spend custom content buyers.",
    steps: [
      "Segmenting subscribers into spending cohorts (whales vs casuals)",
      "Deploying curiosity-gap PPV previews & teaser video drops",
      "Structuring custom rate cards with rush-fee add-ons",
      "Automating expired subscriber win-back promotional drops",
    ],
  },
  {
    code: "PLAYBOOK-04",
    title: "18 U.S.C. § 2257 Sovereign Compliance Playbook",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Airtight legal audit and record-keeping playbook ensuring complete compliance with federal performer identification laws and privacy protection standards.",
    steps: [
      "Maintaining mandatory 7-year performer identification records",
      "Securing signed co-star model release documentation",
      "Scrubbing EXIF metadata & setting up VOIP contact isolation",
      "Filing automated DMCA search engine link removals",
    ],
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are BNE Creator Playbooks?",
    answer: "Playbooks are actionable, step-by-step operational blueprints designed to guide adult creators through business infrastructure, brand positioning, DM sales, and legal compliance.",
  },
  {
    question: "How do playbooks differ from general courses?",
    answer: "Courses provide foundational education, while Playbooks are step-by-step tactical execution guides with specific checklists, scripts, and workflows.",
  },
  {
    question: "Are playbooks included with BNE management tiers?",
    answer: "Yes. All BNE managed partners receive full access to our complete library of operational playbooks.",
  },
]);

export default function Playbooks() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infra = getInfographicByKeyword("Elite_Entertainer_Business_Infrastructure");

  const [modalOpen, setModalOpen] = useState(false);
  const opsProfessor = getProfessorByExpertise("operations platform automation");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Operational Playbooks | Blacklisted University"
        description="Access BNE Studio operational playbooks: business infrastructure, brand positioning, high-ticket DM sales scripts, and 2257 legal compliance blueprints."
        canonical="/playbooks"
        schema={faqSchema}
        keywords="creator operational playbooks, OnlyFans business playbook, 2257 compliance playbook, DM sales scripts for creators, Blacklisted University playbooks"
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
              Strategic Creator <span className="gradient-text-gold">Playbooks</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Step-by-step tactical execution blueprints for scaling your brand, automating backend operations, maximizing DM conversion, and securing legal compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/all-courses">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <FileText size={16} /> View Full Course Catalog <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Get Playbook Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INFOGRAPHIC MODAL SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Featured Blueprint</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Elite Entertainer Business Infrastructure</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive diagram detailing the complete operational setup behind multi-six-figure creator empires.</p>
          </div>
          {infra && (
            <motion.div
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/30%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Elite Entertainer Business Infrastructure</h3>
                  <p className="text-slate-400 text-sm mt-1">High-Resolution Diagram · Account Operations, Legal & Banking Infrastructure</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full btn-gold text-xs font-semibold shrink-0 flex items-center gap-2">
                <FileText size={14} /> Open Interactive Reader
              </button>
            </motion.div>
          )}
          <InfographicModal url={infra?.url || "/media-files/Elite_Entertainer_Business_Infrastructure.png"} title="Elite Entertainer Business Infrastructure" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* ── 4 PLAYBOOKS LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Execution Library</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Operational Playbooks</h2>
          </div>

          <div className="space-y-8">
            {PLAYBOOKS_LIST.map((pb, i) => (
              <motion.div key={pb.code} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{pb.code}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 mt-1">{pb.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{pb.desc}</p>
                    
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Execution Steps</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {pb.steps.map(step => (
                        <div key={step} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Playbook Author</div>
                      <AuthorBio professor={pb.professor} variant="compact" />
                    </div>
                    <Link href="/apply">
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Deploy Playbook →
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
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Operations & Platform Infrastructure</div>
          <AuthorBio professor={opsProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Playbook Case Studies"
        subtitle="Read how creators executed these exact playbooks to transform their account structure."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How are BNE Playbooks structured?", a: "Each Playbook contains clear step-by-step execution phases, exact scripts, compliance checklists, and metric benchmarks." },
              { q: "Can I implement these playbooks on my own?", a: "Yes. Playbooks are designed for both solo creators looking for clear direction and creators partnering with BNE for managed execution." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Execute Proven Systems, Stop Guessing</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership today and receive custom roadmap playbooks for your business.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Playbook Roadmap →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
