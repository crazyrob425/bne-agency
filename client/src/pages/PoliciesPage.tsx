/**
 * BNE Operational Policies Page
 * Detailed governance frameworks, ethics standards, flat-fee transparency policies,
 * performer autonomy guarantees, and DM chat team codes of conduct.
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
  FileText, Shield, ArrowRight, CheckCircle2, DollarSign,
  HeartHandshake, UserCheck, Lock, Award, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const POLICIES_LIST = [
  {
    icon: DollarSign,
    title: "1. Zero-Commission & Flat-Retainer Financial Transparency",
    description: "BNE operates strictly on flat monthly retainers. We never take revenue percentages or equity in your platforms, content, or brand assets.",
    detail: "You retain 100% of your earnings across OnlyFans, Fansly, clip stores, and custom sales. Full financial transparency with zero hidden fees.",
  },
  {
    icon: HeartHandshake,
    title: "2. Absolute Performer Autonomy & Boundary Non-Negotiables",
    description: "You maintain total creative control over your content, pricing, schedule, and personal boundaries. BNE never coerces creators into un-comfortable niches.",
    detail: "Every custom menu, photoshoot, and chat script strictly adheres to your pre-defined personal boundaries and comfort parameters.",
  },
  {
    icon: UserCheck,
    title: "3. 24/7 DM Chat Management Code of Conduct",
    description: "Our dedicated DM chat teams follow strict voice guides and ethical fan relationship management standards calibrated to your brand tone.",
    detail: "Zero deception or un-authorized promises. All chat staff undergo rigorous background checks and training in subscriber LTV optimization.",
  },
  {
    icon: Lock,
    title: "4. Anonymity & Data Protection Policy",
    description: "Strict non-disclosure policy protecting creator real names, location data, banking details, and personal contact lines.",
    detail: "BNE acts as your official Custodian of Records and business shielding agent, insulating your identity from public records.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is BNE Studio's pricing policy?",
    answer: "BNE operates strictly on transparent, flat monthly partnership retainers. We never charge revenue commissions or percentages of your earnings.",
  },
  {
    question: "Does BNE require creators to sign long-term lock-in contracts?",
    answer: "No. Our partnership agreements feature a standard 3-month initial term, after which partnerships convert to flexible month-to-month terms.",
  },
]);

export default function PoliciesPage() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const handbook = getInfographicByKeyword("Legal_&_Compliance_Handbook");

  const [modalOpen, setModalOpen] = useState(false);
  const legalProfessor = getProfessorByExpertise("legal compliance 2257");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Operational Policies & Agency Governance | BNE Studio"
        description="Review BNE Studio's creator partnership policies: flat-fee financial transparency, performer autonomy guarantees, DM team conduct, and anonymity protections."
        canonical="/policies"
        schema={faqSchema}
        keywords="BNE studio policies, creator agency ethics, OnlyFans management policy, flat fee creator agency, performer autonomy policy"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Agency Governance</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Operational Policies</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Ethical Agency Governance & Full Transparency.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Traditional adult creator agencies exploit talent through predatory percentage splits and coercive content demands. BNE Studio operates differently.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              Our operational policies guarantee zero revenue commissions, total performer creative autonomy, strict DM team codes of conduct, and airtight identity protection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Apply for Ethical Partnership <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Review Flat Tiers
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
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Governance Documentation</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Legal & Compliance Handbook</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Interactive PDF handbook detailing agency policies, performer rights, and compliance procedures.</p>
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
                  <p className="text-slate-400 text-sm mt-1">42 Pages · Agency Ethics, Performer Rights & Compliance SOPs</p>
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

      {/* ── 4 POLICIES LIST ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Code of Governance</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">4 Operational Guarantees</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {POLICIES_LIST.map((pol, i) => (
              <motion.div key={pol.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <pol.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{pol.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{pol.description}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-4 border-t border-slate-800/60">{pol.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Chair of Legal Compliance & Ethics</div>
          <AuthorBio professor={legalProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Agency Policy Reviews"
        subtitle="Read how creators thrive in a transparent, zero-commission partnership."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do flat monthly retainers work compared to percentage agencies?", a: "With flat retainers, you pay a set monthly fee for full backend management. As your monthly earnings grow from $10k to $50k+, your agency cost stays completely fixed, saving you thousands." },
              { q: "Can I terminate my partnership if my situation changes?", a: "Yes. Following the initial 3-month setup period, partnerships operate month-to-month with 30-day notice." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Experience Ethical Creator Agency Management</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership today to experience flat-rate pricing and complete creative control.</p>
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
