/**
 * BNE Booking Management Page
 * Comprehensive operational guide for in-person companion booking, client vetting,
 * safety protocols, VOIP identity masking, classified advertising, and rate optimization.
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
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Calendar, Users, Shield, ArrowRight, Lock, MapPin,
  PhoneCall, CheckCircle, AlertTriangle, FileText,
  DollarSign, Clock, Key, EyeOff, ShieldCheck, HeartHandshake
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const VETTING_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Multi-Source Identity Verification",
    description: "Every incoming booking inquiry undergoes non-negotiable identity verification through private employer database checks, LinkedIn/professional profile cross-referencing, and industry provider references.",
    detail: "We never accept unverified anonymous bookings. Our screening protocol requires first-time clients to provide verifiable professional credentials or 2+ positive references from recognized independent providers. This eliminates non-serious inquiries, law enforcement sting vectors, and unsafe individuals before any meeting is scheduled.",
  },
  {
    icon: PhoneCall,
    title: "Encrypted VOIP & Call Shielding",
    description: "Your real phone number and personal contact channels remain 100% private. All client communications flow through BNE's dedicated encrypted VOIP system and trained booking dispatchers.",
    detail: "Direct contact numbers are a major vulnerability for in-person providers. Doxxing, harassment, and persistent unvetted calls occur when personal numbers leak. BNE's booking infrastructure sits between you and the public. Clients interact exclusively with our booking managers who handle pre-screening, deposit collection, and logistics coordination.",
  },
  {
    icon: Key,
    title: "Blacklist Database Cross-Referencing",
    description: "Real-time cross-referencing against internal, regional, and national bad-date & law enforcement blacklist databases across the West Coast and major metropolitan markets.",
    detail: "BNE maintains an active, updated threat intelligence database. Any inquiry matching flagged phone numbers, aliases, email domains, or suspicious booking behaviors is automatically blocked and reported to our regional security alert system.",
  },
  {
    icon: Lock,
    title: "Two-Point Check-In & Safety Dispatch",
    description: "Automated, real-time safety tracking for every outcall and incall appointment, including pre-session venue verification, timed check-ins, and emergency dispatch protocols.",
    detail: "Before you enter any venue, BNE's security protocol verifies room numbers, venue safety, and emergency exit access. You perform mandatory 5-minute pre-session and post-session check-ins with our dispatch team. If a check-in is missed by 7 minutes without an override code, our escalation procedure triggers immediately.",
  },
  {
    icon: DollarSign,
    title: "Deposit Collection & Cancellation Lock",
    description: "Pre-session screening deposits collected electronically prior to calendar locking, eliminating last-minute cancellations, fake bookings, and time-wasters.",
    detail: "Time-wasters and no-shows cost independent companions thousands of dollars monthly in lost revenue and wasted travel. BNE enforces a mandatory 25-50% non-refundable screening deposit for all first-time clients. Deposits are processed through secure, non-chargeback payment architecture.",
  },
  {
    icon: MapPin,
    title: "Tour & City Loop Scheduling",
    description: "Strategic tour planning and calendar fills across major West Coast metropolitan hubs (Seattle, Portland, San Francisco, Los Angeles, San Diego, Las Vegas).",
    detail: "Touring maximizes earnings per hour by creating artificial urgency and high demand in specific markets. BNE handles all tour logistics — hotel/venue vetting, localized ad campaigns 7 days prior to arrival, screening backlogs, and appointment stacking — so your tour days are 100% booked before you land.",
  },
];

const SAFETY_CHECKLIST = [
  "Strict adherence to local, state, and federal legal boundaries",
  "Zero tolerance for unvetted walk-in or last-minute unscreened appointments",
  "Mandatory venue inspection checklist before room entry on outcalls",
  "Real-time location sharing active with BNE safety dispatch during sessions",
  "Pre-negotiated compensation and terms established in writing prior to arrival",
  "Discreet financial processing protecting provider banking privacy",
];

const faqSchema = buildFaqSchema([
  {
    question: "How does BNE Studio screen in-person clients for safety?",
    answer: "BNE uses a multi-layered vetting system requiring first-time clients to provide verifiable professional identity (LinkedIn, corporate profile, or legal ID matching) or 2+ references from recognized providers, cross-referenced against national blacklist databases.",
  },
  {
    question: "Do I have to handle calls or texts from clients directly?",
    answer: "No. BNE operates as your complete booking office. All inquiries, calls, screening checks, and scheduling logistics are handled by our trained booking managers through encrypted VOIP channels.",
  },
  {
    question: "How are screening deposits handled?",
    answer: "Deposits are collected electronically through non-chargeback payment architecture prior to adding any client to your calendar. This guarantees serious bookings and eliminates no-shows.",
  },
  {
    question: "Can BNE manage my scheduling while I tour between cities?",
    answer: "Yes. Tour management is one of our core specialties. We run localized ad campaigns 7 days before your tour date in cities like Seattle, Portland, LA, SF, and Las Vegas, filling your schedule before you arrive.",
  },
]);

export default function BookingManagement() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Transition_to_Inperson_income");
  const checklist = getInfographicByKeyword("Venue_Requirements_Checklist");

  const [modalOpen, setModalOpen] = useState(false);
  const safetyProfessor = getProfessorByExpertise("safety screening escort");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="In-Person Booking & Client Vetting Management | BNE Studio"
        description="Professional booking management, safety vetting, VOIP identity protection, and calendar filling for high-end companions and adult entertainment providers across the West Coast."
        canonical="/booking-management"
        schema={faqSchema}
        keywords="escort booking management, client screening protocols, companion safety vetting, adult provider booking agency, escort safety dispatch"
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
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Safety & Operations Suite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              In-Person <span className="text-[oklch(0.78_0.16_85)]">Booking Management</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Maximum Revenue. Zero Safety Compromise.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Transitioning into or expanding in-person companion and escort services is the single fastest route to high-ticket, cash-rich revenue. However, operating without a dedicated booking desk, screening firewall, and safety dispatch protocol exposes independent providers to physical risk, burnout, and time-wasting clients.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio acts as your silent, high-security booking office. We handle classified advertising, incoming client screening, VOIP call filtering, background checks, non-refundable deposit collection, and real-time safety dispatch — allowing you to step into sessions fully protected and focused exclusively on providing an elite experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Apply for Managed Booking Access <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/niche-matcher">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Take Niche Assessment
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$1,200+", label: "average rate per hour for BNE managed in-person providers" },
              { value: "0", label: "safety incidents across 3,400+ dispatched sessions" },
              { value: "98.4%", label: "deposit completion rate eliminating last-minute no-shows" },
              { value: "100%", label: "identity separation keeping personal contact details private" },
            ].map((stat, i) => (
              <motion.div key={stat.value} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[oklch(0.78_0.16_85)] mb-2">{stat.value}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM VS THE SOLUTION ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5">
              The Reality of Independent In-Person Booking
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Managing in-person clients solo is an operational nightmare. Between answering late-night text messages from unvetted numbers, haggling over rates, dealing with cancellations, and constantly worrying about personal safety, most solo providers spend more energy managing risk than earning money.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Solo Operator */}
            <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">Solo Provider Vulnerabilities</h3>
              </div>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  Personal phone numbers and contact info exposed to unvetted public traffic.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  Inadequate client screening relying on superficial text conversations.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  Constant last-minute cancellations and unpaid travel time to venues.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  No real-time safety dispatch tracking room entry, exit, or emergency status.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  Awkward in-person money conversations and rate renegotiation attempts.
                </li>
              </ul>
            </div>

            {/* BNE Managed */}
            <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">BNE Managed Security & Ops</h3>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  Total contact shielding — clients interact exclusively with our VOIP booking managers.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  Rigorous 3-step screening: corporate verification, provider references, and database checks.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  Mandatory 25-50% non-refundable screening deposits locking every calendar slot.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  Active 2-point safety check-in protocol with timed dispatch monitoring.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  Pre-paid, fixed rates established in writing — zero awkward money discussions in session.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO & CHECKLIST SECTION ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Masterclass: Transitioning to In-Person High-Ticket Income
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Learn the exact operational blueprint BNE uses to take digital creators into lucrative, safe in-person bookings. Cover screening architectures, venue safety rules, and rate positioning.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">Safety Infrastructure Components</h3>
              
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Rigorous Client Vetting</h4>
                  <p className="text-slate-400 text-sm mt-1">Background checks, corporate reference verification, and national blacklist screening ensure you only meet legitimate, high-respect clients.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Venue & Logistics Auditing</h4>
                  <p className="text-slate-400 text-sm mt-1">We inspect hotel/incall venue requirements, location security, parking access, and exit paths before granting final booking confirmation.</p>
                </div>
              </div>

              {checklist && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="p-6 bg-slate-900/80 border border-[oklch(0.78_0.16_85/30%)] rounded-xl cursor-pointer hover:border-[oklch(0.78_0.16_85/60%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      Venue Requirements Checklist <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">Interactive compliance PDF checklist — click to view security standards</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={checklist?.url || "/media-files/Venue_Requirements_Checklist.pdf"} title="Venue Requirements Checklist" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VETTING PILLARS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The BNE 6-Pillar Booking Firewall</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every step of our booking management process is designed to protect your physical safety, financial returns, and peace of mind.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VETTING_PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <pillar.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{pillar.title}</h3>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">{pillar.description}</p>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-800/60">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Safety & Screening Department Lead</div>
          <AuthorBio professor={safetyProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Verified Escort & Companion Reviews"
        subtitle="Hear from real in-person providers operating safely across Seattle, Portland, San Francisco, and LA with BNE."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How quickly can BNE take over my booking desk?", a: "After completing your onboarding audit and safety preferences setup (usually 48-72 hours), our booking team can immediately begin managing your incoming calls, texts, and screening." },
              { q: "What if a client refuses to provide screening information?", a: "Zero exceptions are made. Any client refusing identity verification or screening deposit is automatically rejected. Your safety is non-negotiable." },
              { q: "Do you handle city tours outside my home market?", a: "Yes. We manage tour advertising, screening backlogs, hotel venue audits, and calendar fills for tours in major US markets." },
              { q: "What are your fees for booking management?", a: "BNE operates on a flat-rate monthly partnership tier with no per-session percentages or hidden commissions. Your earnings belong entirely to you." },
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Step Into Safe, High-Ticket In-Person Booking Today</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Let BNE Studio build your safety firewall, screen your clients, and fill your calendar while you maintain 100% privacy.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Safe Booking Management →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
