/**
 * BNE Legal & Compliance Vault — Noir Hacker Syndicate Design
 * Sections: 18 U.S.C. § 2257, State Age Verification, Paxton Precedent, Downloads
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import Seo from "@/components/Seo";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import {
  Shield, FileText, AlertTriangle, CheckCircle, Download,
  Scale, Lock, Eye, MapPin, DollarSign, ChevronRight, BookOpen,
  PlayCircle, Printer, X
} from "lucide-react";

const COMPLIANCE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663566927712/HKm5FSxgbpSfaSeha3s8A3/bne-compliance-bg-TCpBEYyh8F6avzdBPzuJpv.webp";
const MEDIA_POLL_INTERVAL_MS = 4 * 60 * 60 * 1000;
const PRINT_IMAGE_FORMATS = new Set(["PNG", "JPG", "JPEG", "WEBP", "SVG"]);

type MediaCatalogType = "video" | "print";

interface MediaCatalogItem {
  id: string;
  title: string;
  description: string;
  type: MediaCatalogType;
  url: string;
  format: string;
  sizeBytes: number;
  sizeLabel: string;
  updatedAt: string;
}

interface MediaCatalogResponse {
  videos: MediaCatalogItem[];
  printMaterials: MediaCatalogItem[];
}

function isImagePrintFormat(item: MediaCatalogItem): boolean {
  return PRINT_IMAGE_FORMATS.has(item.format.toUpperCase());
}

function formatDateLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const stateData = [
  { state: "Texas", threshold: "33.3%", penalty: "$10,000/day", method: "Third-party ID or AI facial estimation", notes: "Paxton Precedent state" },
  { state: "Utah", threshold: "33.3%", penalty: "$5,000/day", method: "Government ID verification", notes: "Strict enforcement" },
  { state: "Louisiana", threshold: "33.3%", penalty: "$10,000/day", method: "Third-party age verification", notes: "Anonymous option available" },
  { state: "Virginia", threshold: "33.3%", penalty: "$5,000/day", method: "Third-party verification", notes: "Active enforcement" },
  { state: "Arizona", threshold: "33.3%", penalty: "$10,000/day", method: "Third-party ID verification", notes: "High penalty state" },
  { state: "Florida", threshold: "33.3%", penalty: "$5,000/day", method: "Anonymous verification option", notes: "Privacy-preserving option required" },
  { state: "Kentucky", threshold: "33.3%", penalty: "$5,000/day", method: "Immediate data deletion required", notes: "Data must be deleted after access" },
  { state: "Kansas", threshold: "25%", penalty: "$5,000/day", method: "Third-party verification", notes: "Lower threshold — 25%" },
];

export default function ComplianceVault() {
  const heroRef = useRef(null);
  const section2257Ref = useRef(null);
  const paxtonRef = useRef(null);
  const { getVideoByKeyword } = useMediaCatalog();
  const fortressVideo = getVideoByKeyword("fortress") || getVideoByKeyword("professional") || getVideoByKeyword("compliance");

  const section2257InView = useInView(section2257Ref, { once: true, margin: "-80px" });
  const paxtonInView = useInView(paxtonRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo pageKey="complianceVault" />
      <Navigation />

      {/* Long-form compliance primer for SEO and user education */}
      <div className="container py-8">
        <article className="prose prose-invert max-w-4xl mx-auto text-slate-200">
          <h2>Compliance Vault — Your Legal Readiness Checklist</h2>
          <p>
            The Compliance Vault centralizes critical legal and privacy information for creators: federal record-keeping (2257), state-by-state age verification nuances, DMCA protections, and best practices for privacy-preserving workflows. This primer explains why these systems matter and how to operationalize them without sacrificing brand or income.
          </p>
          <h3>Why Compliance Is Non-Negotiable</h3>
          <p>
            Non-compliance risks fines, account suspensions, compromised payments, and legal exposure. BNE treats compliance as infrastructure — a small recurring investment that protects long-term revenue and creator safety. Our Compliance Vault includes checklists, sample record formats, and recommended vendors for verification and record custody.
          </p>
          <h3>Practical Steps</h3>
          <ol>
            <li>Establish a secure record-keeping folder with limited access and verified backups.</li>
            <li>Use a 2257-ready age verification provider when required for platform or payment provider rules.</li>
            <li>Apply DMCA takedowns proactively and monitor leak detection services.</li>
          </ol>
          <figure>
            <img src="/media/Scaling_and_Securing_Content_Brands.png" alt="Compliance vault" />
            <figcaption>Compliance is insurance — not an optional overhead.</figcaption>
          </figure>
          <p>
            For jurisdiction-specific questions, consult a licensed attorney. Our materials are educational and operational — they're designed to help you get compliant quickly and keep your business running while you grow.
          </p>
        </article>
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${COMPLIANCE_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.01_265/80%)] to-[oklch(0.08_0.01_265)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield size={32} className="text-amber-400" />
            </div>
            <span className="text-amber-400 text-sm font-medium mono-stat uppercase tracking-widest">Legal Intelligence</span>
            <h1 className="text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Know the Law Before It Knows You
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Federal record-keeping, state age verification, the Paxton ruling — it’s a lot. Here’s everything you need to understand the legal landscape and protect your business, your privacy, and your freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert Banner */}
      <div className="bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200 text-sm" style={{ fontFamily: 'DM Sans' }}>
            <strong>HEADS UP:</strong> Everything on this page is for educational purposes only — it is not legal advice. Laws change, situations vary, and we are not your attorney. BNE strongly recommends talking to a licensed lawyer for anything specific to your situation.
          </p>
        </div>
      </div>

      {/* ── Compliance Fortress Video Section ── */}
      <section className="py-16 bg-white/2 border-b border-amber-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider font-body">Legal Intelligence</span>
            <h2 className="text-3xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Building Your Digital Fortress</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>An educational guide on age verification, LLC protection, and federal record custody systems.</p>
          </div>
          <VideoPlayer
            src={fortressVideo?.url || "/media-files/The_Invisible_Identity_Digital_Fortress.mp4"}
            title="The Invisible Identity Digital Fortress"
            description="How BNE protects your anonymity and legal compliance."
          />
        </div>
      </section>

      {/* Scammer Survival Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-rose-400 text-xs font-semibold uppercase tracking-wider font-body">Threat Intelligence</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Surviving the Scammers</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Learn to identify and avoid the most common scams targeting adult entertainers — from fake booking agencies to identity theft rings.</p>
          </div>
          <VideoPlayer
            src="/media-files/Surviving_the_Scammers_in_Adult_Entertainment.mp4"
            title="Surviving the Scammers"
            description="How to protect yourself from the most common scams in the adult entertainment industry."
          />
        </div>
      </section>

      {/* ── Blacklisted University Redirect Callout ── */}
      <section className="py-16 bg-[oklch(0.07_0.008_85)] border-b border-amber-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card-elevated border-amber-500/20 p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-400 text-xs font-semibold mono-stat uppercase tracking-widest">Prestigious Education</span>
              <h3 className="text-3xl font-bold text-zinc-100 mt-2 mb-4 font-display" style={{ fontFamily: 'Space Grotesk' }}>
                Blacklisted University Has Moved
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6 font-body" style={{ fontFamily: 'DM Sans' }}>
                We've upgraded the curriculum and moved the University into its own standalone department. Access structured Course Lectures, downloadable Print Shop assets, and required course literature designed to double your income and eliminate the grind.
              </p>
              <Link href="/university">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold"
                >
                  <BookOpen size={16} />
                  Enter Blacklisted University
                  <ChevronRight size={14} />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 18 U.S.C. § 2257 */}
      <section ref={section2257Ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={section2257InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Federal Law</span>
              <h2 className="text-4xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                18 U.S.C. § 2257
              </h2>
              <h3 className="text-xl text-zinc-300 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                The Federal Record-Keeping Law You Cannot Ignore
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-4" style={{ fontFamily: 'DM Sans' }}>
                The moment you film, photograph, or produce explicit sexual content — yes, even solo content of yourself — federal law classifies you as a <strong className="text-zinc-200">“primary producer.”</strong> That comes with mandatory compliance obligations you cannot skip, delegate, or pretend don’t apply to you.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6" style={{ fontFamily: 'DM Sans' }}>
                Violating § 2257 is a federal criminal offense. Up to 5 years per violation. BNE’s Sovereign Brand Shield tier includes full Custodian of Records services so this liability is completely off your plate.
              </p>

              <div className="space-y-3">
                {[
                  { icon: FileText, title: "Government Photo ID Collection", desc: "Collect and verify a government-issued photo ID for every performer appearing in explicit content, including yourself." },
                  { icon: Lock, title: "Secure Record Storage", desc: "Organize and maintain encrypted digital custody archives of all IDs and model releases for a minimum of 7 years." },
                  { icon: Eye, title: "Custodian of Records Label", desc: "Publish a clear Custodian of Records statement on your personal website with the physical address of your record-keeper." },
                  { icon: Scale, title: "Model Release Drafting", desc: "Execute fully compliant model releases with every performer before filming begins — no exceptions." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-4 rounded-xl glass-card border-violet-500/15">
                    <Icon size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-200 font-semibold text-sm mb-1" style={{ fontFamily: 'Space Grotesk' }}>{title}</p>
                      <p className="text-zinc-500 text-sm" style={{ fontFamily: 'DM Sans' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={section2257InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-6 border-amber-500/20 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-amber-400" />
                  <h4 className="text-zinc-200 font-bold" style={{ fontFamily: 'Space Grotesk' }}>Who Counts as a “Producer” Under § 2257?</h4>
                </div>
                <ul className="space-y-2 text-zinc-400 text-sm" style={{ fontFamily: 'DM Sans' }}>
                  {[
                    "Any person who films or photographs explicit sexual conduct",
                    "Solo content creators filming themselves",
                    "Creators who hire or collaborate with other performers",
                    "Website operators who post explicit content",
                    "Secondary producers who reproduce or distribute content",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 border-emerald-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <h4 className="text-zinc-200 font-bold" style={{ fontFamily: 'Space Grotesk' }}>BNE Custodian of Records Service</h4>
                </div>
                <p className="text-zinc-400 text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>
                  If you shoot with anyone else — guest stars, partners, collabs — BNE steps in as your official Custodian of Records under federal law. We handle all of it so you don’t have to:
                </p>
                <ul className="space-y-2 text-zinc-400 text-sm" style={{ fontFamily: 'DM Sans' }}>
                  {[
                    "Rigorous collection of collaborator government photo IDs",
                    "Facial-match selfie verification",
                    "Custom model release drafting",
                    "Encrypted digital custody archive management",
                    "Federal regulatory liability elimination",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/onboarding">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-neon text-sm font-semibold"
                  >
                    Get § 2257 Protection
                    <ChevronRight size={14} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* State Age Verification */}
      <section ref={paxtonRef} className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={paxtonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Supreme Court Ruling</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              State Age Verification Laws & The Paxton Ruling
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              The Supreme Court’s decision in <em>Free Speech Coalition, Inc. v. Paxton</em> opened the door for states to require strict age verification on adult content websites. If you have a personal site or link page, this affects you directly.
            </p>
          </motion.div>

          {/* Key ruling points */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Scale, title: "The Ruling", desc: "The Supreme Court upheld state authority to require age verification on adult content websites, rejecting First Amendment challenges.", color: "text-violet-400", border: "border-violet-500/20" },
              { icon: MapPin, title: "33.3% Threshold", desc: "Most states apply age-gate requirements to websites where 33.3% or more of content is adult in nature (25% in Kansas).", color: "text-emerald-400", border: "border-emerald-500/20" },
              { icon: DollarSign, title: "Daily Penalties", desc: "Non-compliant websites face daily civil penalties ranging from $5,000 to $10,000 per day in states like Arizona and Louisiana.", color: "text-amber-400", border: "border-amber-500/20" },
              { icon: Eye, title: "Verification Methods", desc: "Accepted methods include government ID upload, AI facial age estimation, and anonymous third-party verification services.", color: "text-violet-400", border: "border-violet-500/20" },
            ].map(({ icon: Icon, title, desc, color, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={paxtonInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`glass-card p-5 border ${border}`}
              >
                <Icon size={20} className={`${color} mb-3`} />
                <h4 className="text-zinc-200 font-bold mb-2 text-sm" style={{ fontFamily: 'Space Grotesk' }}>{title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* State table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={paxtonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-4 border-b border-white/8 flex items-center gap-2">
              <MapPin size={16} className="text-violet-400" />
              <h3 className="text-zinc-200 font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>State-by-State Compliance Requirements</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>State</th>
                    <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>Threshold</th>
                    <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>Daily Penalty</th>
                    <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>Verification Method</th>
                    <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {stateData.map((row, i) => (
                    <tr key={row.state} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                      <td className="p-4 text-zinc-200 font-medium" style={{ fontFamily: 'Space Grotesk' }}>{row.state}</td>
                      <td className="p-4 text-emerald-400 mono-stat">{row.threshold}</td>
                      <td className="p-4 text-amber-400 mono-stat font-bold">{row.penalty}</td>
                      <td className="p-4 text-zinc-400" style={{ fontFamily: 'DM Sans' }}>{row.method}</td>
                      <td className="p-4 text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Free Resources</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2" style={{ fontFamily: 'Space Grotesk' }}>
              Templates & Guides You Can Actually Use
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: "§ 2257 Compliance Checklist", desc: "Complete step-by-step checklist for federal record-keeping compliance.", tag: "FREE DOWNLOAD", file: "2257_Compliance_Checklist.pdf" },
              { icon: Scale, title: "Model Release Template", desc: "Professionally drafted model release covering all federal requirements.", tag: "FREE DOWNLOAD", file: "Model_Release_Template.pdf" },
              { icon: Shield, title: "State Age-Gate Guide", desc: "State-by-state breakdown of age verification requirements and implementation guides.", tag: "FREE DOWNLOAD", file: "State_Age-Gate_Guide.pdf" },
              { icon: Lock, title: "Anonymity Audit Worksheet", desc: "Self-assessment tool to identify and close privacy vulnerabilities in your setup.", tag: "FREE DOWNLOAD", file: "Anonymity_Audit_Worksheet.pdf" },
              { icon: BookOpen, title: "DMCA Takedown Template", desc: "Ready-to-file DMCA notice template for content theft on tube sites.", tag: "FREE DOWNLOAD", file: "DMCA_Takedown_Template.pdf" },
              { icon: DollarSign, title: "Banking Privacy Guide", desc: "Best practices for protecting your financial identity as a creator.", tag: "FREE DOWNLOAD", file: "Banking_Privacy_Guide.pdf" },
            ].map(({ icon: Icon, title, desc, tag, file }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card p-5 border-white/8 hover:border-violet-500/20 transition-all cursor-pointer group flex flex-col justify-between"
                onClick={() => window.open(`/media-files/${file}`, '_blank')}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <Icon size={20} className="text-violet-400" />
                    <span className="text-xs mono-stat text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{tag}</span>
                  </div>
                  <h4 className="text-zinc-200 font-bold mb-2 text-sm" style={{ fontFamily: 'Space Grotesk' }}>{title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4" style={{ fontFamily: 'DM Sans' }}>{desc}</p>
                </div>
                <div className="flex items-center gap-1 text-violet-400 text-xs font-medium group-hover:gap-2 transition-all mt-auto" style={{ fontFamily: 'DM Sans' }}>
                  <Download size={12} />
                  Access Resource
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield size={36} className="text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Stop Navigating This Alone
            </h2>
            <p className="text-zinc-400 mb-6" style={{ fontFamily: 'DM Sans' }}>
              Legal compliance is not optional and it is not simple. BNE’s Sovereign Brand Shield tier handles all of it — federal, state, DMCA, records — so you can create without the anxiety.
            </p>
            <Link href="/onboarding">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon font-semibold mx-auto"
              >
                <Shield size={18} />
                Get Full Compliance Protection
                <ChevronRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

