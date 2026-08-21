/**
 * BNE Data Protection Page
 * Comprehensive technical guide to creator data protection, financial privacy,
 * encrypted storage vaults, EXIF scrubbing, and anonymous business entity structures.
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
  Shield, Lock, Eye, ArrowRight, CheckCircle2, Server, Key,
  CreditCard, FileLock2, Award, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const PROTECTION_PILLARS = [
  {
    icon: Lock,
    title: "1. Zero-Knowledge Encrypted Vaults & EXIF Scrubbing",
    description: "Every photo, raw video clip, and document uploaded through BNE's portal is stripped of EXIF metadata (GPS coordinates, camera IDs) and stored in zero-knowledge encrypted vaults.",
    detail: "Prevents accidental location leaks and doxxing. Metadata is automatically sanitized before raw files enter processing pipelines.",
  },
  {
    icon: CreditCard,
    title: "2. Anonymous Holding Company & Entity Shielding",
    description: "Structure legal ownership under anonymous Holding LLCs (Wyoming, Delaware, New Mexico) to decouple your personal legal identity from public corporate registries.",
    detail: "BNE manages registered agent mail forwarding and privacy entity maintenance, insulating your real name from public WHOIS and business filings.",
  },
  {
    icon: Server,
    title: "3. Isolated VOIP Communications & Mail Firewall",
    description: "Decouple personal phone numbers and physical home addresses using encrypted VOIP communication channels and physical mail scanning firewalls.",
    detail: "Clients, platform reps, and fans communicate solely through isolated proxy numbers and virtual business addresses.",
  },
  {
    icon: Key,
    title: "4. Multi-Factor Password & Session Hardening",
    description: "Automated credential management, hardware security key (YubiKey) enforcement, and IP-restricted session monitoring for all creator platform portals.",
    detail: "Protects high-value OnlyFans, Fansly, and banking dashboards against credential stuffing, phishing, and session hijacking.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "How does BNE protect creator data and financial privacy?",
    answer: "We deploy zero-knowledge encrypted cloud storage, automatic EXIF metadata scrubbing, anonymous LLC business structures, and hardware security key authentication.",
  },
  {
    question: "Can someone find my real name through my creator accounts?",
    answer: "Not under BNE's data protection architecture. We decouple your personal identity using registered agent mail forwarding, corporate entity shielding, and proxy contact lines.",
  },
  {
    question: "What is EXIF metadata scrubbing?",
    answer: "EXIF scrubbing removes embedded technical metadata (GPS location coordinates, camera model, timestamp) from image and video files before publication.",
  },
]);

export default function DataProtection() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("The_Invisible_Identity_Digital_Fortress") || getVideoByKeyword("fortress");
  const guide = getInfographicByKeyword("Banking_Privacy_Guide");

  const [modalOpen, setModalOpen] = useState(false);
  const privacyProfessor = getProfessorByExpertise("cybersecurity brand protection privacy");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Data Protection & Financial Privacy Infrastructure | BNE Studio"
        description="BNE Studio provides enterprise data protection for adult creators: zero-knowledge encrypted vaults, EXIF scrubbing, anonymous LLC structures, and financial privacy."
        canonical="/data-protection"
        schema={faqSchema}
        keywords="creator data protection, OnlyFans creator privacy, EXIF scrubbing tool, anonymous LLC creator setup, financial privacy adult creators"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Cybersecurity & Privacy Engine</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Enterprise <span className="text-[oklch(0.78_0.16_85)]">Data Protection</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Make Your Real Identity Bulletproof.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Every digital footprint is a potential liability. Unsanitized metadata, public business filings, and personal phone lines expose high-earning creators to doxxing, harassment, and identity leaks.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio builds a digital fortress around your creator brand: zero-knowledge encrypted vaults, automatic EXIF scrubbing, anonymous LLC legal structures, and financial privacy firewalls.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Secure Your Data Infrastructure <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/privacy-systems">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Explore Privacy Systems
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
                Masterclass: The Invisible Identity Digital Fortress
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Watch Professor Ndidi Okafor detail how BNE constructs an impenetrable privacy firewall around high-earning creators, decoupling legal names from public digital assets.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-2xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Encrypted Vault Storage</h3>
                </div>
                <p className="text-slate-400 text-sm">All raw video content, photo archives, and financial records are encrypted at rest with AES-256 multi-location redundancy.</p>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="text-[oklch(0.78_0.16_85)]" size={20} />
                  <h3 className="text-white font-bold">Banking Privacy Guide</h3>
                </div>
                <p className="text-slate-400 text-sm">Learn how anonymous holding LLCs and corporate banking rails isolate creator revenue from personal accounts.</p>
              </div>

              {guide && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="p-6 bg-slate-900/80 border border-[oklch(0.78_0.16_85/30%)] rounded-xl cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      Banking Privacy Guide <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">Interactive PDF guide to anonymous LLC entity structuring</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Banking_Privacy_Guide.pdf"} title="Banking Privacy Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 PROTECTION PILLARS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">4 Pillars of Data Protection</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Engineered to neutralize doxxing risks and secure high-earning creator operations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROTECTION_PILLARS.map((pil, i) => (
              <motion.div key={pil.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <pil.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{pil.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{pil.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{pil.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Digital Security & Privacy Infrastructure</div>
          <AuthorBio professor={privacyProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Data Protection Reviews"
        subtitle="Read how creators operate with complete privacy using BNE's data protection suite."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I need to form an anonymous LLC myself?", a: "No. BNE's legal operations team handles end-to-end formation of your anonymous Holding LLC in Wyoming or Delaware." },
              { q: "How does BNE strip EXIF data from my uploads?", a: "Our portal automatically parses all incoming media files, stripping GPS coordinates, camera serial numbers, and device timestamps before storing or editing." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Protect Your Identity & Digital Empire Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get zero-knowledge vault storage, EXIF scrubbing, and anonymous LLC setup.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Data Protection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
