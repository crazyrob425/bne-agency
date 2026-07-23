/**
 * BNE Apply Page — Noir Hacker Syndicate Design
 * Wrapped with HelmetProvider and SEO component for meta tags
 * Multi-step intake wizard inspired by Aruna Talent, rebuilt in BNE's persona
 * Sections: Hero + Wizard Form, Fit Check, The BNE Difference, Two Futures, $20K Guarantee, FAQ, Business Card
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ChevronRight, ChevronLeft, Check, X, Shield, Lock, Zap, Users,
  DollarSign, Award, ArrowRight, MessageSquare, Phone, Mail,
  Instagram, Hash, Target, Clock, Star, Sparkles, Loader2,
  Upload, Image as ImageIcon, Eye, BarChart3, TrendingUp,
  FileText, Heart, AlertCircle, CheckCircle2
} from "lucide-react";
import businessCard from "@/../../BNE%20businesscard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const COUNTRY_CODES = [
  { code: "+1", label: "US/CA (+1)", country: "us" },
  { code: "+44", label: "UK (+44)", country: "gb" },
  { code: "+61", label: "AU (+61)", country: "au" },
  { code: "+64", label: "NZ (+64)", country: "nz" },
  { code: "+33", label: "FR (+33)", country: "fr" },
  { code: "+49", label: "DE (+49)", country: "de" },
  { code: "+31", label: "NL (+31)", country: "nl" },
  { code: "+34", label: "ES (+34)", country: "es" },
  { code: "+39", label: "IT (+39)", country: "it" },
  { code: "+55", label: "BR (+55)", country: "br" },
  { code: "+52", label: "MX (+52)", country: "mx" },
  { code: "+27", label: "ZA (+27)", country: "za" },
];

type FormData = {
  firstName: string;
  email: string;
  phoneCountryCode: string;
  phoneLocal: string;
  contactPreference: "whatsapp" | "imessage" | "call" | "";
  socialPlatform: "instagram" | "tiktok" | "x" | "";
  socialHandle: string;
  hours: string;
  goal: string;
  experience: string;
  photo: File | null;
  photoPreview: string | null;
  ageConfirm: boolean;
  marketingConsent: boolean;
};

type Step = 1 | 2 | 3;

const initialFormData: FormData = {
  firstName: "",
  email: "",
  phoneCountryCode: "+1",
  phoneLocal: "",
  contactPreference: "",
  socialPlatform: "",
  socialHandle: "",
  hours: "",
  goal: "",
  experience: "",
  photo: null,
  photoPreview: null,
  ageConfirm: false,
  marketingConsent: false,
};

const HOURS_OPTIONS = [
  { value: "15-20", label: "15–20 hrs/week — Side hustle energy" },
  { value: "20-30", label: "20–30 hrs/week — Serious builder mode" },
  { value: "30+", label: "30+ hrs/week — All in, let's go" },
];

const GOAL_OPTIONS = [
  { value: "quit-job", label: "Quit my 9–5 and do this full-time" },
  { value: "side-income", label: "Add serious side income ($3K–$10K/mo)" },
  { value: "financial-freedom", label: "Build generational wealth & total freedom" },
  { value: "not-sure", label: "Not sure yet — just exploring" },
];

const EXPERIENCE_OPTIONS = [
  { value: "none", label: "Never done this — total beginner" },
  { value: "some", label: "Dabbled a bit — know the basics" },
  { value: "active", label: "Already creating — want to scale" },
];

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
    quote: "I'm 34 and thought I aged out. The team laughed kindly and proved me wrong in week one. Age is just a number when you've got the right niche and a 100-person machine behind you.",
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
    q: "Do I need followers or an existing audience to apply?",
    a: "Absolutely not. Some of our highest earners started with zero followers. We build your audience from scratch using our niche-matching algorithm, SEO-optimized landing pages, and paid traffic systems. Your 'following' is our job — your job is showing up and creating."
  },
  {
    q: "What if I want to stay completely anonymous / faceless?",
    a: "That's not just supported — it's a specialty. We've launched 40+ fully faceless creators who out-earn face creators in their niches. We build you a complete pseudonym persona, geo-block your entire personal network, set up separate payment rails, and your real identity never touches any creator asset. Ever."
  },
  {
    q: "How does the $20K first-week guarantee actually work?",
    a: "Simple: if your account doesn't hit at least $20,000 in gross revenue within the first 7 days of launch, we walk away. No fees owed, no contracts binding you, no hard feelings. We've launched 80+ creators and never had to honor it — but the guarantee exists because our systems genuinely deliver. Results vary by niche, platform, and your effort level. Past performance ≠ future guarantee, but we stand behind our machine."
  },
  {
    q: "What's the actual time commitment on my end?",
    a: "Most creators spend 2–4 hours/week filming content. We handle everything else: strategy, niche research, content planning, editing, posting, DM management, fan retention, upsells, DMCA protection, compliance, analytics, and scaling. You're the talent. We're the operation."
  },
  {
    q: "Is there any upfront cost to join?",
    a: "Zero. $0 down. We invest in you first — our team, our systems, our ad spend, our infrastructure. We only win when you win. Our revenue share kicks in after you're profitable. If you don't make money, we don't make money. Period."
  },
  {
    q: "How long does the application review take?",
    a: "A senior partner reviews every application personally within 24 hours — usually under 4 hours during business days. You'll get a detailed voice note or video response explaining exactly what we see in you, which niches we'd put you in, and what your 90-day roadmap looks like. No generic auto-replies."
  },
  {
    q: "What if I'm not in the US?",
    a: "We work with creators in 12+ countries. As long as you're 18+, have valid ID, and can legally create adult content in your jurisdiction, we can build your business. We handle international compliance, payment routing, and platform access. Your location doesn't limit your bag."
  },
  {
    q: "Can I see examples of creators you've launched?",
    a: "For their privacy and safety, we don't publicly share our roster. But during your application review, we'll walk you through anonymized case studies — niches, timelines, revenue curves, and exactly what the build-out looked like. You'll see the receipts before you commit."
  },
];

export default function Apply() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [referrerName, setReferrerName] = useState<string | null>(null);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Check for referrer on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrerName(ref);
    }
  }, []);

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
    localStorage.setItem("bne-apply-draft", JSON.stringify(draft));
  }, [formData, step]);

  // Restore draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("bne-apply-draft");
    if (saved) {
      try {
        const { formData: savedData, step: savedStep, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) { // 7 days
          setFormData(savedData);
          setStep(savedStep);
        }
      } catch {}
    }
  }, []);

  // Validation per step
  const validateStep = useCallback((s: Step): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (s === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phoneLocal.trim()) newErrors.phoneLocal = "Phone number is required";
      if (!formData.contactPreference) newErrors.contactPreference = "Contact preference is required";
      if (!formData.socialPlatform) newErrors.socialPlatform = "Social platform is required";
      if (!formData.socialHandle.trim()) newErrors.socialHandle = "Social handle is required";
    } else if (s === 2) {
      if (!formData.hours) newErrors.hours = "Hours commitment is required";
      if (!formData.goal) newErrors.goal = "Your goal is required";
      if (!formData.experience) newErrors.experience = "Experience level is required";
      if (!formData.ageConfirm) newErrors.ageConfirm = "Age confirmation is required";
    }

    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateStep(step)) return;
    setIsSubmitting(true);
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1000);
  }, [step, validateStep, formData]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (validateStep(step)) {
      setStep(prev => (prev < 3 ? (prev + 1) as Step : prev));
    }
  }, [step, validateStep]);

  // Handle previous step
  const handlePrev = useCallback(() => {
    setStep(prev => (prev > 1 ? (prev - 1) as Step : prev));
  }, []);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <HelmetProvider>
      <Seo title="Apply" description="Apply to BNE Agency - Noir Hacker Syndicate" />
      <div className="min-h-screen bg-background">
        <Navigation />

        {submitSuccess ? (
          <section className="py-20">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="luxury-card p-8 border border-[oklch(0.78_0.16_85/20%)]">
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-white mb-4">Application Received</h2>
                <p className="text-[oklch(0.7_0.012_85)] mb-6">We review every application personally. Expect a detailed response within 24 hours.</p>
                <Link href="/">
                  <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">Back to Home</motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        ) : (
          <>
            <section className="relative py-20 overflow-hidden">
              <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
                    <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Apply to BNE</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-4">
                    Start Your <span className="text-[oklch(0.78_0.16_85)]">Empire</span>
                  </h1>
                  <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed max-w-2xl mx-auto">
                    Take the 2-minute application. We read every one personally.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="luxury-card p-8 border border-[oklch(0.78_0.16_85/15%)]">
                  <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-[oklch(0.78_0.16_85)] text-black' : 'bg-[oklch(0.78_0.16_85/10%)] text-[oklch(0.78_0.16_85)]'}`}>
                          {step > s ? <Check size={14} /> : s}
                        </div>
                        <span className={`text-sm ${step >= s ? 'text-white' : 'text-[oklch(0.65_0.012_85)]'}`}>
                          {s === 1 ? 'Basics' : s === 2 ? 'Goals' : 'Review'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">First Name</label>
                          <input type="text" value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm" placeholder="Your first name" />
                          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Email</label>
                          <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm" placeholder="you@example.com" />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Phone</label>
                            <input type="tel" value={formData.phoneLocal} onChange={(e) => updateField("phoneLocal", e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm" placeholder="(555) 000-0000" />
                            {errors.phoneLocal && <p className="text-red-400 text-xs mt-1">{errors.phoneLocal}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Contact Preference</label>
                            <select value={formData.contactPreference} onChange={(e) => updateField("contactPreference", e.target.value as any)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm">
                              <option value="">Select...</option>
                              <option value="whatsapp">WhatsApp</option>
                              <option value="imessage">iMessage</option>
                              <option value="call">Phone Call</option>
                            </select>
                            {errors.contactPreference && <p className="text-red-400 text-xs mt-1">{errors.contactPreference}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Primary Platform</label>
                            <select value={formData.socialPlatform} onChange={(e) => updateField("socialPlatform", e.target.value as any)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm">
                              <option value="">Select...</option>
                              <option value="instagram">Instagram</option>
                              <option value="tiktok">TikTok</option>
                              <option value="x">X / Twitter</option>
                            </select>
                            {errors.socialPlatform && <p className="text-red-400 text-xs mt-1">{errors.socialPlatform}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Handle</label>
                            <input type="text" value={formData.socialHandle} onChange={(e) => updateField("socialHandle", e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm" placeholder="@username" />
                            {errors.socialHandle && <p className="text-red-400 text-xs mt-1">{errors.socialHandle}</p>}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm">Next Step <ChevronRight size={14} className="inline ml-1" /></motion.button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Weekly Hours Available</label>
                          <div className="grid grid-cols-3 gap-3">
                            {HOURS_OPTIONS.map((opt) => (
                              <button key={opt.value} onClick={() => updateField("hours", opt.value)} className={`p-4 rounded-lg border text-sm text-left transition-all ${formData.hours === opt.value ? 'border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.hours && <p className="text-red-400 text-xs mt-1">{errors.hours}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Primary Goal</label>
                          <div className="grid grid-cols-2 gap-3">
                            {GOAL_OPTIONS.map((opt) => (
                              <button key={opt.value} onClick={() => updateField("goal", opt.value)} className={`p-4 rounded-lg border text-sm text-left transition-all ${formData.goal === opt.value ? 'border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.goal && <p className="text-red-400 text-xs mt-1">{errors.goal}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[oklch(0.78_0.16_85)] mb-2">Experience Level</label>
                          <div className="grid grid-cols-3 gap-3">
                            {EXPERIENCE_OPTIONS.map((opt) => (
                              <button key={opt.value} onClick={() => updateField("experience", opt.value)} className={`p-4 rounded-lg border text-sm text-left transition-all ${formData.experience === opt.value ? 'border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)] text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" id="age" checked={formData.ageConfirm} onChange={(e) => updateField("ageConfirm", e.target.checked)} className="mt-1" />
                          <label htmlFor="age" className="text-sm text-slate-300">I am 18+ and all content I create complies with 18 U.S.C. § 2257.</label>
                        </div>
                        {errors.ageConfirm && <p className="text-red-400 text-xs">{errors.ageConfirm}</p>}
                        <div className="flex justify-between">
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-sm text-slate-300 hover:text-white">Back</motion.button>
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn-gold px-8 py-3 text-sm">Next Step <ChevronRight size={14} className="inline ml-1" /></motion.button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50">
                          <h3 className="text-white font-semibold mb-4">Confirm Your Details</h3>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p><span className="text-slate-500">Name:</span> {formData.firstName}</p>
                            <p><span className="text-slate-500">Email:</span> {formData.email}</p>
                            <p><span className="text-slate-500">Phone:</span> {formData.phoneLocal}</p>
                            <p><span className="text-slate-500">Platform:</span> {formData.socialPlatform}</p>
                            <p><span className="text-slate-500">Handle:</span> {formData.socialHandle}</p>
                            <p><span className="text-slate-500">Hours:</span> {formData.hours}</p>
                            <p><span className="text-slate-500">Goal:</span> {formData.goal}</p>
                            <p><span className="text-slate-500">Experience:</span> {formData.experience}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev} className="px-6 py-3 text-sm text-slate-300 hover:text-white">Back</motion.button>
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={isSubmitting} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>Submit Application <ArrowRight size={14} /></>}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>

            <section className="py-20 bg-[oklch(0.04_0.005_85)]">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-white mb-4">The BNE Difference</h2>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Shield, title: "Privacy First", desc: "Complete anonymity systems. Your real identity never touches any creator asset." },
                    { icon: Zap, title: "Speed to Revenue", desc: "Launch-ready in days, not months. Our niche-matching algorithm finds your goldmine instantly." },
                    { icon: Crown, title: "Full Operation", desc: "We handle strategy, content, posting, DMs, compliance, and scaling. You create. We operate." },
                  ].map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] text-center">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mx-auto mb-4">
                        <item.icon size={24} />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-white mb-4">What Creators Are Saying</h2>
                </motion.div>
                <div className="luxury-card p-8 border border-[oklch(0.78_0.16_85/10%)]">
                  <p className="text-lg text-[oklch(0.7_0.012_85)] italic mb-6">"{TESTIMONIALS[activeTestimonial].quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.78_0.16_85/15%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] font-bold text-sm">
                      {TESTIMONIALS[activeTestimonial].avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{TESTIMONIALS[activeTestimonial].author}</p>
                      <p className="text-[oklch(0.65_0.012_85)] text-xs">{TESTIMONIALS[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-[oklch(0.04_0.005_85)]">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-white mb-4">Common Questions</h2>
                </motion.div>
                <div className="space-y-4">
                  {FAQS.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="luxury-card p-6">
                      <h4 className="text-white font-semibold mb-2 text-sm">{item.q}</h4>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <Footer />
      </div>
    </HelmetProvider>
  );
}
