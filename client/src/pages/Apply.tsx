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

  return (
    <HelmetProvider>
      <Seo title="Apply" description="Apply to BNE Agency - Noir Hacker Syndicate" />
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Application Wizard</h1>
            <p className="text-muted-foreground">This page is under construction.</p>
          </div>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
}