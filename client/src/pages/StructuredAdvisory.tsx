/**
 * BNE Structured Advisory Page
 * Detailed breakdown of BNE's flat-rate strategic advisory tiers, brand playbook,
 * compliance consulting, and enterprise management matrix for adult creators.
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
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Briefcase, TrendingUp, Crown, ArrowRight, Zap, Shield, Users,
  CheckCircle2, Compass, Layers, FileText, Lock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const ADVISORY_PILLARS = [
  {
    icon: Compass,
    title: "Niche Positioning & Brand Architecture",
    description: "Bi-weekly 1-on-1 strategic calls mapping your persona, sub-niche positioning, visual aesthetic, and competitive differentiation.",
    detail: "Saturated markets destroy generic accounts. Our brand directors analyze consumer search trends, platform saturation rates, and your unique personality traits to build a distinctive persona that commands premium pricing.",
  },
  {
    icon: Shield,
    title: "Sovereign Legal Privacy & § 2257 Auditing",
    description: "Quarterly legal compliance reviews, 18 U.S.C. § 2257 record-keeping verification, DMCA takedown dispatch, and identity protection auditing.",
    detail: "Protecting your real identity and maintaining legal compliance is essential for long-term survival. We audit your public digital footprint and manage model release documentation so you remain 100% compliant.",
  },
  {
    icon: Layers,
    title: "Revenue Funnel & Paywall Optimization",
    description: "Monthly audits of your subscription pricing, PPV mass message performance, custom rate cards, and secondary clip store syndication.",
    detail: "We inspect your conversion analytics monthly, identifying specific drop-offs in your sales funnel and prescribing exact pricing, copy, and promotional adjustments.",
  },
  {
    icon: Briefcase,
    title: "Business Entity & Tax Infrastructure",
    description: "Guidance on LLC entity formation, business banking setup, quarterly estimated tax preparation, and referral to creator-specialized CPAs.",
    detail: "Treating your creator income as casual personal cash leads to massive tax shocks and personal liability. We guide you through creating an independent business entity that protects your assets and minimizes tax exposure.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What is BNE Structured Advisory?",
    answer: "BNE Structured Advisory is a flat-rate strategic consulting service for independent creators who prefer 1-on-1 expert guidance, brand playbooks, and compliance audits while maintaining day-to-day operational control.",
  },
  {
    question: "How does Structured Advisory differ from full management?",
    answer: "Structured Advisory provides executive-level strategy, weekly/bi-weekly advisory calls, brand playbooks, and audits while you handle daily DM chats and posting. Full management includes 24/7 DM chat teams and automated operations.",
  },
  {
    question: "Are there any percentage revenue cuts in Structured Advisory?",
    answer: "No. BNE Structured Advisory operates strictly on a transparent, flat monthly retainer with zero percentage cuts.",
  },
  {
    question: "What is included in the Brand Playbook?",
    answer: "The Brand Playbook is a custom 40+ page strategic dossier covering your brand positioning, visual style guide, content voice, pricing tiers, and platform expansion roadmap.",
  },
]);

export default function StructuredAdvisory() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infographic1 = getInfographicByKeyword("Professional_Creator_Management_Services");
  const infographic2 = getInfographicByKeyword("Brand_Playbook");

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const brandProfessor = getProfessorByExpertise("brand identity positioning");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Structured Creator Advisory Tiers & Brand Strategy | BNE Studio"
        description="Flat-rate strategic advisory for adult creators. Get bi-weekly 1-on-1 brand positioning calls, compliance auditing, revenue funnel optimization, and custom Brand Playbooks."
        canonical="/structured-advisory"
        schema={faqSchema}
        keywords="structured creator advisory, OnlyFans consultant, adult creator brand playbook, creator advisory firm, flat rate creator management"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Briefcase className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Executive Consulting</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Structured <span className="text-[oklch(0.78_0.16_85)]">Advisory Suites</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Executive Guidance. Transparent Flat Rates.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Not every creator wants to outsource daily operations. Many high-earning independent creators prefer running their own accounts while having access to senior agency strategists, legal compliance architects, and custom brand playbooks.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Structured Advisory delivers C-suite level consulting, bi-weekly strategic roadmap calls, brand playbooks, and revenue auditing for a single, transparent flat monthly fee. Zero percentage cuts. Zero long-term contracts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Apply for Strategic Advisory <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Compare Service Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INFOGRAPHICS SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Management Services Matrix</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Inspect our complete advisory service matrix detailing core deliverables, brand playbooks, and compliance protocols across all tiers.
              </p>
              {infographic1 && (
                <motion.div
                  onClick={() => setModal1(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/20%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/40%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      Management Services Overview <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h3>
                    <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to open full service matrix breakdown</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic1?.url || "/media-files/Professional_Creator_Management_Services.png"} title="Professional Creator Management Services" isOpen={modal1} onClose={() => setModal1(false)} />
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Brand Playbook Blueprint</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Your Brand Playbook is a customized 40+ page strategic master plan built specifically for your persona, target audience, and niche.
              </p>
              {infographic2 && (
                <motion.div
                  onClick={() => setModal2(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/20%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/40%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      Brand Playbook Guide <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h3>
                    <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to preview sample Brand Playbook PDF</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic2?.url || "/media-files/Brand_Playbook.pdf"} title="Brand Playbook" isOpen={modal2} onClose={() => setModal2(false)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 ADVISORY PILLARS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Pillars of BNE Advisory</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Complete strategic coverage designed to protect your brand while maximizing monthly profit.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ADVISORY_PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <pillar.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{pillar.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{pillar.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Brand & Identity Strategy</div>
          <AuthorBio professor={brandProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Advisory Client Reviews"
        subtitle="Hear how independent creators leveled up their branding and monetization with BNE Advisory."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What happens during advisory calls?", a: "Calls are structured 1-on-1 strategy sessions reviewing monthly analytics, content calendars, pricing adjustments, and upcoming marketing initiatives." },
              { q: "How long does it take to build my Brand Playbook?", a: "Your custom Brand Playbook is delivered within 10 business days of intake completing." },
              { q: "Can I upgrade from Structured Advisory to Full Management later?", a: "Yes. Many creators start with Advisory to build their strategy and upgrade to full operational management when their account volume warrants it." },
              { q: "Is there a minimum contract length?", a: "Advisory operates on a 3-month initial term, converting to month-to-month flexibility thereafter." },
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Get C-Suite Advisory for Your Creator Business</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Apply for BNE Structured Advisory today and gain senior strategists, brand playbooks, and compliance protection.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Advisory Tier →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
