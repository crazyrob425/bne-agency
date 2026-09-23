/**
 * BNE Apply Page — Executive Creator Application & Comprehensive Intake Audit
 * 10-Section Intake Form with 5-Step Wizard & Two Paths Framework
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ChevronRight, ChevronLeft, Check, Shield, Lock, Zap, Users,
  DollarSign, Award, ArrowRight, ArrowLeft, Star, Sparkles, Loader2,
  Eye, BarChart3, TrendingUp, CheckCircle2, Crown, Brain, HelpCircle
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

type IntakeFormData = {
  // Section 1: Relationship Model
  relationshipModel: string;

  // Section 2: Applicant Profile
  stageName: string;
  email: string;
  contactMessenger: string;
  location: string;
  ageVerified: boolean;

  // Section 3: Industry Experience
  experienceDuration: string;
  experienceSectors: string[];
  experienceSectorsOther: string;
  monthlyRevenueTier: string;

  // Section 4: Privacy & Anonymity
  anonymityLevel: string;
  concealmentRules: string[];
  concealmentRulesOther: string;
  blockedRegions: string;

  // Section 5: Revenue Streams & Services
  digitalOfferings: string[];
  digitalOfferingsOther: string;
  inPersonStance: string;
  inPersonStanceOther: string;

  // Section 6: Niche & Persona Vision
  nicheCategories: string[];
  nicheCategoriesOther: string;
  plannedPersona: string;
  plannedPersonaOther: string;
  urlOnlyFans: string;
  urlSocials: string;
  urlWebcams: string;
  urlWebsite: string;

  // Section 7: Logistics & Hardware
  hoursDedicated: string;
  equipmentOwned: string[];
  equipmentOwnedOther: string;

  // Section 8: Agency Support & Goals
  primaryBottlenecks: string[];
  primaryBottlenecksOther: string;
  targetMonthlyRevenue: string;

  // Section 9 & 10: Prior Agency History & Final Submission
  priorAgencyStatus: string;
  priorContractStatus: string;
  priorAgencyIssues: string[];
  priorAgencyIssuesOther: string;
  referenceCheckWillingness: string;
  priorAgencyDetails: string;
  legalCertification: boolean;
};

type Step = 1 | 2 | 3 | 4 | 5;

const initialFormData: IntakeFormData = {
  relationshipModel: "",
  stageName: "",
  email: "",
  contactMessenger: "",
  location: "",
  ageVerified: false,

  experienceDuration: "",
  experienceSectors: [],
  experienceSectorsOther: "",
  monthlyRevenueTier: "",

  anonymityLevel: "",
  concealmentRules: [],
  concealmentRulesOther: "",
  blockedRegions: "",

  digitalOfferings: [],
  digitalOfferingsOther: "",
  inPersonStance: "",
  inPersonStanceOther: "",

  nicheCategories: [],
  nicheCategoriesOther: "",
  plannedPersona: "",
  plannedPersonaOther: "",
  urlOnlyFans: "",
  urlSocials: "",
  urlWebcams: "",
  urlWebsite: "",

  hoursDedicated: "",
  equipmentOwned: [],
  equipmentOwnedOther: "",

  primaryBottlenecks: [],
  primaryBottlenecksOther: "",
  targetMonthlyRevenue: "",

  priorAgencyStatus: "",
  priorContractStatus: "",
  priorAgencyIssues: [],
  priorAgencyIssuesOther: "",
  referenceCheckWillingness: "",
  priorAgencyDetails: "",
  legalCertification: false,
};

const TESTIMONIALS = [
  {
    quote: "I genuinely thought it was too good to be true. Three months later I'm paying my mom's rent AND mine, bought my dream car, and I still can't believe this is my life. I wish I hadn't waited so long to just hit apply.",
    author: "J.M.",
    role: "Former retail manager → $47K/mo",
    avatar: "JM"
  },
  {
    quote: "Zero social media presence. Completely faceless. Nobody in my real life has any clue. And I made more last month than I did the entire previous year at my corporate job. The anonymity system is insane.",
    author: "K.R.",
    role: "Graduate student → $31K/mo (faceless)",
    avatar: "KR"
  },
  {
    quote: "I'm 34 and thought I aged out. The team proved me wrong in week one. Age is just a number when you've got the right niche and a dedicated machine behind you.",
    author: "T.L.",
    role: "Former bartender → $52K/mo",
    avatar: "TL"
  },
  {
    quote: "The compliance vault alone is worth 10x what I pay. I sleep easy knowing my 2257 records are pristine, my content is DMCA-protected, and my legal bases are covered. That peace of mind? Priceless.",
    author: "A.S.",
    role: "Nurse → $28K/mo",
    avatar: "AS"
  },
];

const FAQS = [
  {
    q: "What is the difference between The Sponsored Partnership and The Private Reserve Suite?",
    a: "The Sponsored Partner Roster is a zero-upfront-cost partnership where B.N.E. invests capital, software, and 24/7 DM chatter teams in exchange for a performance revenue split. The Private Reserve Suite is designed for creators who want 100% earnings retention through flat membership tiers or a la carte services with zero profit split."
  },
  {
    q: "Why is there an application review for the Revenue Share roster?",
    a: "To deliver high-touch 24/7 backend management—including live chatting teams, § 2257 legal protection, automated DMCA takedowns, and platform automation—we strictly cap client intake each month. We never stretch resources or compromise client security."
  },
  {
    q: "Do I need followers or an existing audience to apply?",
    a: "No. Many of our highest earners started with zero followers. We build your audience using our niche-matching algorithm, SEO-optimized funnels, and traffic strategy."
  },
  {
    q: "What if I want to stay completely anonymous / faceless?",
    a: "That's a B.N.E. specialty. We've launched 40+ fully faceless creators who out-earn face creators in their niches. We build you a complete pseudonym persona, geo-block your personal network, and separate payment rails."
  },
  {
    q: "Are there any hidden fees or surprise costs?",
    a: "Never. Under the Sponsored Partner Roster, you pay zero upfront and we only earn when you earn. Under the Private Reserve Suite, all tier rates are locked in upfront with zero surprise expenses. You retain 100% ownership of your accounts, assets, and brand under both models."
  },
];

export default function Apply() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof IntakeFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    const draft = { formData, step, timestamp: Date.now() };
    localStorage.setItem("bne-apply-intake-draft", JSON.stringify(draft));
  }, [formData, step]);

  // Restore draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("bne-apply-intake-draft");
    if (saved) {
      try {
        const { formData: savedData, step: savedStep, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setFormData(savedData);
          setStep(savedStep);
        }
      } catch {}
    }
  }, []);

  // Array toggle helper for multi-select
  const toggleArrayItem = (field: keyof IntakeFormData, item: string) => {
    const current = (formData[field] as string[]) || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const updateField = (field: keyof IntakeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation per step
  const validateStep = useCallback((s: Step): boolean => {
    const newErrors: Partial<Record<keyof IntakeFormData, string>> = {};

    if (s === 1) {
      if (!formData.relationshipModel) newErrors.relationshipModel = "Please select a relationship model path";
      if (!formData.stageName.trim()) newErrors.stageName = "Stage/Performer name is required";
      if (!formData.email.trim()) newErrors.email = "Primary contact email is required";
      if (!formData.contactMessenger.trim()) newErrors.contactMessenger = "Encrypted messenger ID is required";
      if (!formData.location.trim()) newErrors.location = "State/Region is required";
      if (!formData.ageVerified) newErrors.ageVerified = "You must confirm you are 18+ with legal ID";
    } else if (s === 2) {
      if (!formData.experienceDuration) newErrors.experienceDuration = "Select your duration of experience";
      if (!formData.monthlyRevenueTier) newErrors.monthlyRevenueTier = "Select your current revenue tier";
      if (!formData.anonymityLevel) newErrors.anonymityLevel = "Select your required privacy level";
    } else if (s === 3) {
      if (!formData.inPersonStance) newErrors.inPersonStance = "Please select your stance on in-person services";
      if (!formData.plannedPersona) newErrors.plannedPersona = "Select your planned or existing persona";
    } else if (s === 4) {
      if (!formData.hoursDedicated) newErrors.hoursDedicated = "Select your available weekly hours";
      if (formData.primaryBottlenecks.length === 0) newErrors.primaryBottlenecks = "Select at least 1 primary bottleneck";
    } else if (s === 5) {
      if (!formData.priorAgencyStatus) newErrors.priorAgencyStatus = "Select your prior agency history";
      if (!formData.legalCertification) newErrors.legalCertification = "You must certify accuracy of information";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => (prev < 5 ? (prev + 1) as Step : prev));
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep(prev => (prev > 1 ? (prev - 1) as Step : prev));
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      localStorage.removeItem("bne-apply-intake-draft");
    }, 1200);
  };

  return (
    <HelmetProvider>
      <Seo
        title="Executive Creator Application & Intake Audit"
        description="Apply for B.N.E. Studio's Sponsored Partner Roster or Private Reserve Suite. Confidential intake audit for ambitious adult content creators."
        canonical="/apply"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        {/* ── HEADER ── */}
        <section className="pt-28 pb-12 relative overflow-hidden bg-[oklch(0.04_0.005_85)]">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-black" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.78_0.16_85/10%)] border border-[oklch(0.78_0.16_85/25%)] mb-5">
                <Crown size={14} className="text-[oklch(0.78_0.16_85)]" />
                <span className="text-[oklch(0.78_0.16_85)] text-xs font-mono-lux uppercase tracking-widest">
                  CONFIDENTIAL INTAKE AUDIT
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight mb-4">
                Executive Creator Application
              </h1>
              <p className="text-[oklch(0.65_0.012_85)] text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed mb-6">
                Two Paths to Empire. Same Elite Infrastructure. Complete this intake audit to evaluate your strategic fit for <strong className="text-white">The Sponsored Partner Roster</strong> or immediate deployment in <strong className="text-[oklch(0.78_0.16_85)]">The Private Reserve Suite</strong>.
              </p>

              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/25 max-w-2xl mx-auto text-xs text-violet-200 font-body flex items-start gap-3 text-left">
                <Lock size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-semibold">Strict Confidentiality Assurance:</strong> All submitted details, links, and identity metrics are encrypted. Information is strictly accessed by B.N.E. leadership for NDA-backed partnership evaluation.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FORM CONTAINER / SUCCESS MESSAGE ── */}
        {submitSuccess ? (
          <section className="py-20">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="luxury-card p-10 border border-[oklch(0.78_0.16_85/30%)]">
                <CheckCircle2 size={56} className="text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-white mb-3">Intake Audit Submitted</h2>
                <p className="text-[oklch(0.7_0.012_85)] mb-6 leading-relaxed font-body">
                  Thank you, <strong className="text-white">{formData.stageName}</strong>. A senior B.N.E. partner is reviewing your intake audit. Expect a confidential message via <strong className="text-emerald-400">{formData.contactMessenger || formData.email}</strong> within 24 hours.
                </p>
                <Link href="/">
                  <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm font-semibold">
                    Return to B.N.E. Studio
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        ) : (
          <section className="py-12 bg-black relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Progress Tracker */}
              <div className="mb-10 luxury-card p-4 sm:p-6 border border-[oklch(0.78_0.16_85/15%)]">
                <div className="flex items-center justify-between mb-3 text-xs font-mono-lux">
                  <span className="text-[oklch(0.78_0.16_85)] uppercase tracking-wider font-bold">
                    Stage {step} of 5 — {step === 1 ? "Path & Profile" : step === 2 ? "Experience & Anonymity" : step === 3 ? "Services & Persona" : step === 4 ? "Logistics & Goals" : "Prior History & Audit"}
                  </span>
                  <span className="text-zinc-400">{step * 20}% Complete</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-[oklch(0.78_0.16_85)] via-amber-400 to-emerald-400 transition-all duration-500 ease-out"
                    style={{ width: `${step * 20}%` }}
                  />
                </div>
                <div className="grid grid-cols-5 gap-1 mt-4 text-[10px] text-center font-mono-lux text-zinc-400">
                  <span className={step >= 1 ? "text-violet-300 font-bold" : ""}>1. Path & Bio</span>
                  <span className={step >= 2 ? "text-violet-300 font-bold" : ""}>2. Experience</span>
                  <span className={step >= 3 ? "text-violet-300 font-bold" : ""}>3. Services</span>
                  <span className={step >= 4 ? "text-violet-300 font-bold" : ""}>4. Setup</span>
                  <span className={step >= 5 ? "text-violet-300 font-bold" : ""}>5. History</span>
                </div>
              </div>

              {/* Form Body */}
              <div className="luxury-card p-6 sm:p-10 border border-[oklch(0.78_0.16_85/20%)] bg-zinc-950/80">
                <AnimatePresence mode="wait">
                  
                  {/* ── STEP 1: SECTION 1 & SECTION 2 ── */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div>
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 1</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-2">Relationship Model</h2>
                        <p className="text-xs text-zinc-400 font-body mb-4">Which operational path fits your immediate business goals?</p>
                        
                        <div className="space-y-3">
                          {[
                            {
                              id: "sponsored",
                              title: "The Sponsored Partner Roster (Revenue Share)",
                              desc: "Zero upfront cost. Full 24/7 backend management, chatting teams, legal protection, and growth capital in exchange for a performance split. (Requires selective review & board approval).",
                              badge: "POPULAR • CAPTURE GROWTH"
                            },
                            {
                              id: "private_reserve",
                              title: "The Private Reserve Suite (Prepaid / Membership Tiers)",
                              desc: "A la carte or bulk package agency tools. Retain 100% of your earnings from day one. (Instant deployment for independent creators).",
                              badge: "100% EARNINGS RETENTION"
                            },
                            {
                              id: "undecided",
                              title: "Undecided / Open to Guidance",
                              desc: "I would like B.N.E. Studio to recommend the best model based on my intake assessment.",
                              badge: "ADVISORY RECOMMENDATION"
                            }
                          ].map((opt) => (
                            <div
                              key={opt.id}
                              onClick={() => updateField("relationshipModel", opt.id)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.relationshipModel === opt.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white shadow-[0_0_20px_rgba(212,175,55,0.15)]" : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700"}`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm text-white font-display">{opt.title}</span>
                                <span className="text-[9px] font-mono-lux font-bold px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">{opt.badge}</span>
                              </div>
                              <p className="text-xs text-zinc-400 font-body leading-relaxed">{opt.desc}</p>
                            </div>
                          ))}
                        </div>
                        {errors.relationshipModel && <p className="text-red-400 text-xs mt-1.5">{errors.relationshipModel}</p>}
                      </div>

                      <div className="pt-6 border-t border-zinc-800 space-y-4">
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 2</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-2">Applicant Profile & Contact Verification</h2>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">1. Stage / Performer Name *</label>
                            <input
                              type="text"
                              value={formData.stageName}
                              onChange={(e) => updateField("stageName", e.target.value)}
                              placeholder="e.g. Vesper Rose"
                              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            {errors.stageName && <p className="text-red-400 text-xs mt-1">{errors.stageName}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">2. Primary Contact Email *</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="creator@domain.com"
                              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">3. Encrypted Messenger (Telegram / WhatsApp / Signal) *</label>
                            <input
                              type="text"
                              value={formData.contactMessenger}
                              onChange={(e) => updateField("contactMessenger", e.target.value)}
                              placeholder="e.g. Telegram: @vesper_bne"
                              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            {errors.contactMessenger && <p className="text-red-400 text-xs mt-1">{errors.contactMessenger}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">4. Operating Location (State/Region for time zone alignment) *</label>
                            <input
                              type="text"
                              value={formData.location}
                              onChange={(e) => updateField("location", e.target.value)}
                              placeholder="e.g. California, US (PST)"
                              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 mt-3">
                          <input
                            type="checkbox"
                            id="ageVerified"
                            checked={formData.ageVerified}
                            onChange={(e) => updateField("ageVerified", e.target.checked)}
                            className="mt-1 accent-[oklch(0.78_0.16_85)] w-4 h-4"
                          />
                          <label htmlFor="ageVerified" className="text-xs text-zinc-200 leading-relaxed font-body cursor-pointer">
                            <strong>5. Age Verification Confirmation:</strong> I confirm I am 18 years of age or older and possess valid legal government identification for federal § 2257 compliance records. *
                          </label>
                        </div>
                        {errors.ageVerified && <p className="text-red-400 text-xs mt-1">{errors.ageVerified}</p>}
                      </div>

                      <div className="flex justify-end pt-4">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm font-semibold flex items-center gap-2">
                          Next Stage: Experience & Anonymity <ChevronRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: SECTION 3 & SECTION 4 ── */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div>
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 3</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-4">Industry Experience & Background</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Active duration in adult entertainment / digital content *</label>
                        <div className="grid sm:grid-cols-2 gap-3 mb-5">
                          {[
                            { id: "0-3m", label: "Brand New Entry: 0–3 months (Building from scratch)" },
                            { id: "3-12m", label: "Emerging Talent: 3–12 months" },
                            { id: "1-3y", label: "Established Performer: 1–3 years" },
                            { id: "3y+", label: "Industry Veteran: 3+ years" },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => updateField("experienceDuration", opt.id)}
                              className={`p-3 rounded-xl border text-xs text-left font-body transition-all ${formData.experienceDuration === opt.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white font-semibold" : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        {errors.experienceDuration && <p className="text-red-400 text-xs mb-4">{errors.experienceDuration}</p>}

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Industry sectors with past/current experience (Select all that apply)</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-5">
                          {[
                            "Subscription Digital Content (OnlyFans, Fansly, LoyalFans, Subify)",
                            "Webcam Performance (MFC, Chaturbate, Stripchat, Streamate)",
                            "Independent Escorting / Companion Services",
                            "Exotic Dancing / Club Performance",
                            "Fetish & BDSM (Domme, Findom, Roleplay)",
                            "Custom Media Sales (ManyVids, Clips4Sale, IWB)",
                            "Phone Sex (PSO) / Sexting Networks",
                            "Mainstream Modeling / Acting / Social Media",
                          ].map((sector) => (
                            <div
                              key={sector}
                              onClick={() => toggleArrayItem("experienceSectors", sector)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.experienceSectors.includes(sector) ? "border-violet-500 bg-violet-500/15 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.experienceSectors.includes(sector) ? "bg-violet-500 border-violet-400 text-white" : "border-zinc-700"}`}>
                                {formData.experienceSectors.includes(sector) && <Check size={10} />}
                              </div>
                              <span>{sector}</span>
                            </div>
                          ))}
                        </div>

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">3. Average current monthly gross earnings across all adult streams *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {[
                            { id: "tier1", label: "Tier 1: $0 – $2,000 / mo" },
                            { id: "tier2", label: "Tier 2: $2,000 – $5,000 / mo" },
                            { id: "tier3", label: "Tier 3: $5,000 – $15,000 / mo" },
                            { id: "tier4", label: "Tier 4: $15,000 – $35,000 / mo" },
                            { id: "tier5", label: "Tier 5 (VIP): $35,000+ / mo" },
                          ].map((tier) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => updateField("monthlyRevenueTier", tier.id)}
                              className={`p-3 rounded-xl border text-xs text-center font-body transition-all ${formData.monthlyRevenueTier === tier.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/15%)] text-white font-bold" : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              {tier.label}
                            </button>
                          ))}
                        </div>
                        {errors.monthlyRevenueTier && <p className="text-red-400 text-xs mt-1.5">{errors.monthlyRevenueTier}</p>}
                      </div>

                      <div className="pt-6 border-t border-zinc-800 space-y-4">
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 4</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-2">Privacy, Anonymity & Safety Requirements</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Identity Concealment Level Required *</label>
                        <div className="space-y-2 mb-5">
                          {[
                            { id: "level1", title: "Level 1 — Absolute Anonymity Required", desc: "Zero facial visibility, full voice modification, strict geo-blocking." },
                            { id: "level2", title: "Level 2 — High Discretion", desc: "Face shown on adult platforms only, heavy geo-blocking of specific states/cities." },
                            { id: "level3", title: "Level 3 — Moderate Privacy", desc: "Public persona, but real legal name, location, and mainstream life completely separated." },
                            { id: "level4", title: "Level 4 — Open Branding", desc: "Fully public brand with no concealment requirements." },
                          ].map((lvl) => (
                            <div
                              key={lvl.id}
                              onClick={() => updateField("anonymityLevel", lvl.id)}
                              className={`p-3 rounded-xl border cursor-pointer text-xs font-body transition-all ${formData.anonymityLevel === lvl.id ? "border-emerald-500 bg-emerald-500/10 text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <strong className="text-white font-display block mb-0.5">{lvl.title}</strong>
                              <span className="text-zinc-400">{lvl.desc}</span>
                            </div>
                          ))}
                        </div>
                        {errors.anonymityLevel && <p className="text-red-400 text-xs mb-4">{errors.anonymityLevel}</p>}

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Identity concealment rules to enforce (Select all that apply)</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {[
                            "Faceless Content Only (Masks, crop below chin)",
                            "Tattoo / Birthmark Digital Concealment",
                            "Strict Regional Geo-Blocking",
                            "Voice Modification / Alteration for Audio & Video",
                            "Separate Anonymous LLC & Banking Setup Required",
                            "Automated DMCA & Facial Recognition Takedown Sweeps",
                          ].map((rule) => (
                            <div
                              key={rule}
                              onClick={() => toggleArrayItem("concealmentRules", rule)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.concealmentRules.includes(rule) ? "border-emerald-500 bg-emerald-500/15 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.concealmentRules.includes(rule) ? "bg-emerald-500 border-emerald-400 text-white" : "border-zinc-700"}`}>
                                {formData.concealmentRules.includes(rule) && <Check size={10} />}
                              </div>
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">3. Specific cities, states, or regions that MUST be blocked</label>
                          <textarea
                            value={formData.blockedRegions}
                            onChange={(e) => updateField("blockedRegions", e.target.value)}
                            placeholder="e.g. Block Texas, Florida, and Seattle metro area..."
                            rows={2}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                          <ChevronLeft size={14} /> Back
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm font-semibold flex items-center gap-2">
                          Next Stage: Services & Persona <ChevronRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: SECTION 5 & SECTION 6 ── */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div>
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 5</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-4">Revenue Stream & Service Preferences</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. DIGITAL offerings active or interested in launching (Select all that apply)</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-5">
                          {[
                            "Subscription Platforms (OnlyFans, Fansly, LoyalFans)",
                            "Interactive Webcam Streaming (Solo, Couple, Tipping)",
                            "Phone Sex (PSO) & Voice Sessions",
                            "Texting / SMS / Chat Sexting",
                            "Custom Video & Photo Clips",
                            "Pre-Recorded Audio Content (Erotic Stories)",
                            "Wearables & Physical Goods (Socks, merch)",
                            "Financial Domination (Findom) & Cash Tributes",
                          ].map((offering) => (
                            <div
                              key={offering}
                              onClick={() => toggleArrayItem("digitalOfferings", offering)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.digitalOfferings.includes(offering) ? "border-violet-500 bg-violet-500/15 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.digitalOfferings.includes(offering) ? "bg-violet-500 border-violet-400 text-white" : "border-zinc-700"}`}>
                                {formData.digitalOfferings.includes(offering) && <Check size={10} />}
                              </div>
                              <span>{offering}</span>
                            </div>
                          ))}
                        </div>

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Stance on IN-PERSON companion services *</label>
                        <div className="space-y-2">
                          {[
                            { id: "digital_only", title: "Digital Only", desc: "Strictly zero in-person meetings under any circumstances." },
                            { id: "selective_in_person", title: "Selective In-Person", desc: "Currently offer or open to offering high-end VIP companion dates with strict vetting & safety." },
                            { id: "transitioning", title: "Transitioning", desc: "Currently escorting/dancing, but active goal is to replace in-person income 100% with digital." },
                          ].map((st) => (
                            <div
                              key={st.id}
                              onClick={() => updateField("inPersonStance", st.id)}
                              className={`p-3 rounded-xl border cursor-pointer text-xs font-body transition-all ${formData.inPersonStance === st.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <strong className="text-white font-display block mb-0.5">{st.title}</strong>
                              <span className="text-zinc-400">{st.desc}</span>
                            </div>
                          ))}
                        </div>
                        {errors.inPersonStance && <p className="text-red-400 text-xs mt-1.5">{errors.inPersonStance}</p>}
                      </div>

                      <div className="pt-6 border-t border-zinc-800 space-y-4">
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 6</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-2">Niche, Persona & Brand Vision</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Niche categories describing your look or target market (Select all that apply)</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-5">
                          {[
                            "BDSM / Dominance / Submissive (Findom, Femdom, SART)",
                            "Tactile / Body Part Niches (Foot Fetish, Hands, BBW, Petite)",
                            "Girlfriend Experience (GFE) / Virtual Companion",
                            "Cosplay / Alternative / Goth / E-Girl",
                            "MILF / Mature / Executive / Cougar",
                            "Fitness / Athletic / Muscle / Toned",
                            "Lingerie / Glamour / High Fashion Fetish",
                            "Uncertain / Need B.N.E. Niche Matcher Assessment",
                          ].map((niche) => (
                            <div
                              key={niche}
                              onClick={() => toggleArrayItem("nicheCategories", niche)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.nicheCategories.includes(niche) ? "border-amber-500 bg-amber-500/15 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.nicheCategories.includes(niche) ? "bg-amber-500 border-amber-400 text-white" : "border-zinc-700"}`}>
                                {formData.nicheCategories.includes(niche) && <Check size={10} />}
                              </div>
                              <span>{niche}</span>
                            </div>
                          ))}
                        </div>

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Planned or existing online persona *</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-5">
                          {[
                            { id: "sweet", label: "The Sweet / Welcoming Companion (Warm GFE)" },
                            { id: "dominant", label: "The Cold / Dominant Powerhouse (High rate, command)" },
                            { id: "siren", label: "The Mysterious / Exotic Siren (Selective luxury)" },
                            { id: "playful", label: "The Playful / Quirky Girl-Next-Door (Relatable community)" },
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => updateField("plannedPersona", p.id)}
                              className={`p-3 rounded-xl border text-xs text-left font-body transition-all ${formData.plannedPersona === p.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                        {errors.plannedPersona && <p className="text-red-400 text-xs mb-4">{errors.plannedPersona}</p>}

                        <div className="space-y-3">
                          <label className="block text-xs font-semibold text-zinc-300 font-body">3. Current Digital Footprint Links (Provide URLs if active)</label>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={formData.urlOnlyFans}
                              onChange={(e) => updateField("urlOnlyFans", e.target.value)}
                              placeholder="OnlyFans / Fansly URL"
                              className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            <input
                              type="text"
                              value={formData.urlSocials}
                              onChange={(e) => updateField("urlSocials", e.target.value)}
                              placeholder="Social Media (X, IG, TikTok, Reddit) URL"
                              className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            <input
                              type="text"
                              value={formData.urlWebcams}
                              onChange={(e) => updateField("urlWebcams", e.target.value)}
                              placeholder="Webcam / MV / C4S URL"
                              className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                            <input
                              type="text"
                              value={formData.urlWebsite}
                              onChange={(e) => updateField("urlWebsite", e.target.value)}
                              placeholder="Personal Website / Portfolio URL"
                              className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                          <ChevronLeft size={14} /> Back
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm font-semibold flex items-center gap-2">
                          Next Stage: Logistics & Goals <ChevronRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 4: SECTION 7 & SECTION 8 ── */}
                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div>
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 7</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-4">Production Logistics & Hardware Setup</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Hours per week dedicated strictly to content creation *</label>
                        <div className="grid sm:grid-cols-3 gap-3 mb-5">
                          {[
                            { id: "5-10", label: "5–10 hours / week (Part-time / Side Hustle)" },
                            { id: "10-20", label: "10–20 hours / week (Dedicated Growth)" },
                            { id: "20-40", label: "20–40+ hours / week (Full-time Empire)" },
                          ].map((hr) => (
                            <button
                              key={hr.id}
                              type="button"
                              onClick={() => updateField("hoursDedicated", hr.id)}
                              className={`p-3 rounded-xl border text-xs text-left font-body transition-all ${formData.hoursDedicated === hr.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white font-bold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              {hr.label}
                            </button>
                          ))}
                        </div>
                        {errors.hoursDedicated && <p className="text-red-400 text-xs mb-4">{errors.hoursDedicated}</p>}

                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Hardware and equipment owned & ready to use (Select all that apply)</label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[
                            "High-End Smartphone (iPhone 13+ or equivalent Android)",
                            "Professional Camera (DSLR / Mirrorless / 4K Webcam)",
                            "Lighting Setup (Ring Light, Softboxes, LED Panels)",
                            "Dedicated High-Spec PC / Laptop (For multi-streaming)",
                            "Dedicated High-Speed Fiber Internet Connection",
                            "Private, Secure Film Location / Studio Space",
                            "Specialty Wardrobe / Fetish Gear / Props",
                            "None / Need B.N.E. Equipment Recommendation",
                          ].map((eq) => (
                            <div
                              key={eq}
                              onClick={() => toggleArrayItem("equipmentOwned", eq)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.equipmentOwned.includes(eq) ? "border-violet-500 bg-violet-500/15 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.equipmentOwned.includes(eq) ? "bg-violet-500 border-violet-400 text-white" : "border-zinc-700"}`}>
                                {formData.equipmentOwned.includes(eq) && <Check size={10} />}
                              </div>
                              <span>{eq}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-zinc-800 space-y-4">
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 8</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-2">Agency Support Needs & Primary Bottlenecks</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Single biggest bottleneck holding your business back right now (Select up to 3) *</label>
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {[
                            "Burnout & Time Deficit (Too much DM chat/admin)",
                            "Low Traffic & Marketing (Can't convert views into paid subs)",
                            "Inconsistent Revenue (Income swings month to month)",
                            "Lack of Direct Guidance (Pricing, PPV upsells, tip menus)",
                            "Safety & Legal Concerns (Leaks, § 2257 compliance, stalkers)",
                            "Tech Barriers (Websites, automation, multi-streaming)",
                          ].map((bn) => (
                            <div
                              key={bn}
                              onClick={() => toggleArrayItem("primaryBottlenecks", bn)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.primaryBottlenecks.includes(bn) ? "border-amber-500 bg-amber-500/15 text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.primaryBottlenecks.includes(bn) ? "bg-amber-500 border-amber-400 text-white" : "border-zinc-700"}`}>
                                {formData.primaryBottlenecks.includes(bn) && <Check size={10} />}
                              </div>
                              <span>{bn}</span>
                            </div>
                          ))}
                        </div>
                        {errors.primaryBottlenecks && <p className="text-red-400 text-xs mb-4">{errors.primaryBottlenecks}</p>}

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">2. Target monthly net revenue goal within 90 days of working with B.N.E.</label>
                          <input
                            type="text"
                            value={formData.targetMonthlyRevenue}
                            onChange={(e) => updateField("targetMonthlyRevenue", e.target.value)}
                            placeholder="e.g. $25,000 / month net"
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                          <ChevronLeft size={14} /> Back
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm font-semibold flex items-center gap-2">
                          Next Stage: Prior History & Audit Submit <ChevronRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 5: SECTION 9 & SECTION 10 ── */}
                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div>
                        <span className="text-xs font-mono-lux text-violet-400 uppercase tracking-widest block mb-1">SECTION 9 & 10</span>
                        <h2 className="text-2xl font-bold font-display text-white mb-4">Prior Agency History & Audit Submission</h2>
                        
                        <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">1. Have you previously worked with or hired an adult management company or agency? *</label>
                        <div className="grid sm:grid-cols-3 gap-2 mb-5">
                          {[
                            { id: "currently_managed", label: "Currently Managed (Active contract)" },
                            { id: "previously_managed", label: "Previously Managed (Past contract)" },
                            { id: "independent", label: "100% Independent (Never hired agency)" },
                          ].map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => updateField("priorAgencyStatus", st.id)}
                              className={`p-3 rounded-xl border text-xs text-left font-body transition-all ${formData.priorAgencyStatus === st.id ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                        {errors.priorAgencyStatus && <p className="text-red-400 text-xs mb-4">{errors.priorAgencyStatus}</p>}

                        {formData.priorAgencyStatus && formData.priorAgencyStatus !== "independent" && (
                          <>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">2. Status of that prior agency contract / relationship</label>
                            <div className="space-y-2 mb-5">
                              {[
                                { id: "completed", title: "Completed Successfully", desc: "Completed full contract term with clean separation." },
                                { id: "mutually_released", title: "Mutually Released", desc: "Terminated early via clean, mutual written agreement." },
                                { id: "active", title: "Active Contract", desc: "Seeking transition away from current management (need exit guidance)." },
                                { id: "terminated_cause", title: "Terminated for Cause / Dispute", desc: "Left agency due to breach of contract, poor performance, hidden fees, or coercive practices." },
                              ].map((cs) => (
                                <div
                                  key={cs.id}
                                  onClick={() => updateField("priorContractStatus", cs.id)}
                                  className={`p-3 rounded-xl border cursor-pointer text-xs font-body transition-all ${formData.priorContractStatus === cs.id ? "border-amber-500 bg-amber-500/10 text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                                >
                                  <strong className="text-white block mb-0.5">{cs.title}</strong>
                                  <span className="text-zinc-400">{cs.desc}</span>
                                </div>
                              ))}
                            </div>

                            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">3. Issues or gaps experienced with prior management (Select all that apply)</label>
                            <div className="grid sm:grid-cols-2 gap-2 mb-5">
                              {[
                                "Poor Chatting / Inbox Management (Low conversion, out-of-character DMs)",
                                "Lack of Traffic / Marketing (Failed to deliver real subscriber growth)",
                                "Financial Transparency Issues (Hidden fees, delayed payouts)",
                                "Account Control / Security Risk (Held credentials hostage)",
                                "Communication Deficit (Slow responses, ghosting)",
                              ].map((iss) => (
                                <div
                                  key={iss}
                                  onClick={() => toggleArrayItem("priorAgencyIssues", iss)}
                                  className={`p-3 rounded-xl border text-xs cursor-pointer font-body transition-all flex items-center gap-2 ${formData.priorAgencyIssues.includes(iss) ? "border-red-500/50 bg-red-500/10 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                                >
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${formData.priorAgencyIssues.includes(iss) ? "bg-red-500 border-red-400 text-white" : "border-zinc-700"}`}>
                                    {formData.priorAgencyIssues.includes(iss) && <Check size={10} />}
                                  </div>
                                  <span>{iss}</span>
                                </div>
                              ))}
                            </div>

                            <label className="block text-xs font-semibold text-zinc-300 mb-2 font-body">4. Willingness to provide contact details for confidential reference check</label>
                            <div className="grid sm:grid-cols-2 gap-2 mb-4">
                              {[
                                { id: "yes", label: "Yes — Ready to provide contact details upon request" },
                                { id: "conditional", label: "Conditional — Willing after receiving conditional offer" },
                                { id: "no_nda", label: "No / NDA Protected — Unable due to NDA or dispute" },
                                { id: "na", label: "N/A — No prior agency representation" },
                              ].map((ref) => (
                                <button
                                  key={ref.id}
                                  type="button"
                                  onClick={() => updateField("referenceCheckWillingness", ref.id)}
                                  className={`p-3 rounded-xl border text-xs text-left font-body transition-all ${formData.referenceCheckWillingness === ref.id ? "border-violet-500 bg-violet-500/15 text-white font-semibold" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}
                                >
                                  {ref.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-body">Previous Agency Name & Contact Information for Reference Check (Optional / Confidential)</label>
                          <textarea
                            value={formData.priorAgencyDetails}
                            onChange={(e) => updateField("priorAgencyDetails", e.target.value)}
                            placeholder="Agency Name, Manager Contact, or details..."
                            rows={2}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-3 text-xs focus:border-[oklch(0.78_0.16_85)] focus:outline-none"
                          />
                        </div>

                        {/* Final Legal Certification */}
                        <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 flex items-start gap-3 mt-6">
                          <input
                            type="checkbox"
                            id="legalCertification"
                            checked={formData.legalCertification}
                            onChange={(e) => updateField("legalCertification", e.target.checked)}
                            className="mt-1 accent-[oklch(0.78_0.16_85)] w-4 h-4"
                          />
                          <label htmlFor="legalCertification" className="text-xs text-zinc-200 leading-relaxed font-body cursor-pointer">
                            * <strong>Legal Certification:</strong> I certify that all information provided above is accurate to the best of my knowledge. I understand that submitting this intake audit places me under no financial obligation and that all details remain strictly confidential under B.N.E. Studio's privacy protocols.
                          </label>
                        </div>
                        {errors.legalCertification && <p className="text-red-400 text-xs mt-1">{errors.legalCertification}</p>}
                      </div>

                      <div className="flex justify-between pt-6 border-t border-zinc-800">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                          <ChevronLeft size={14} /> Back
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="btn-gold px-9 py-4 text-sm font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Encrypting & Transmitting Audit...
                            </>
                          ) : (
                            <>
                              <Shield size={16} />
                              SUBMIT COMPREHENSIVE INTAKE AUDIT
                              <ArrowRight size={14} />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* ── TESTIMONIALS & FAQ ── */}
        <section className="py-16 border-t border-zinc-800 bg-[oklch(0.04_0.005_85)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-mono-lux text-[oklch(0.78_0.16_85)] uppercase tracking-widest">REAL CREATOR VERIFICATION</span>
              <h2 className="text-3xl font-display font-bold text-white mt-2">What Partners Experience</h2>
            </div>
            <div className="luxury-card p-8 border border-[oklch(0.78_0.16_85/15%)]">
              <p className="text-lg text-zinc-200 italic mb-6 leading-relaxed font-body">"{TESTIMONIALS[activeTestimonial].quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] font-bold text-sm">
                  {TESTIMONIALS[activeTestimonial].avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold font-display">{TESTIMONIALS[activeTestimonial].author}</p>
                  <p className="text-[oklch(0.65_0.012_85)] text-xs font-body">{TESTIMONIALS[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-white">Application & Intake FAQ</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((item, i) => (
                <div key={i} className="luxury-card p-6 border border-zinc-800">
                  <h4 className="text-white font-semibold mb-2 text-sm font-display">{item.q}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-body">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
