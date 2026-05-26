/**
 * BNE Creator Onboarding / Intake Form
 * Design: Noir Hacker Syndicate — slate-950 base, violet-500 + emerald-400 neon accents
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Globe,
  DollarSign,
  Shield,
  Zap,
  Camera,
  MessageSquare,
  Star,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ─── FORM SCHEMA ──────────────────────────────────────────────────────────────

const onboardingSchema = z.object({
  // Step 1 — Identity
  stageName: z.string().min(2, "Stage name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().min(2, "Country required"),
  ageVerified: z.boolean().refine((v) => v === true, "You must confirm you are 18+"),

  // Step 2 — Creator Profile
  experienceLevel: z.enum(["brand-new", "under-6-months", "6-12-months", "1-3-years", "3-plus-years"]),
  currentPlatforms: z.array(z.string()).min(1, "Select at least one platform"),
  monthlyRevenue: z.enum(["$0", "$1-$500", "$500-$2k", "$2k-$5k", "$5k-$10k", "$10k+"]),
  contentCategories: z.array(z.string()).min(1, "Select at least one category"),

  // Step 3 — Goals & Niche
  primaryGoal: z.enum(["grow-revenue", "build-brand", "legal-protection", "content-strategy", "full-management"]),
  targetNiches: z.string().min(3, "Describe your niche(s)"),
  uniqueSellingPoint: z.string().min(10, "Tell us what makes you different"),

  // Step 4 — Services Interest
  servicesInterested: z.array(z.string()).min(1, "Select at least one service"),
  budget: z.enum(["under-$500", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k+"]),
  timeline: z.enum(["asap", "1-2-weeks", "1-month", "flexible"]),

  // Step 5 — Additional
  referralSource: z.string().optional(),
  additionalNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, "You must agree to the terms"),
  agreeToNDA: z.boolean().refine((v) => v === true, "NDA agreement required"),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

// ─── STEP DEFINITIONS ─────────────────────────────────────────────────────────

const STEPS = [
  { id: "identity", title: "Identity", icon: User, subtitle: "Let's keep you protected from the jump." },
  { id: "profile", title: "Creator Profile", icon: Camera, subtitle: "Where are you at right now?" },
  { id: "goals", title: "Goals & Niche", icon: Star, subtitle: "What are we actually building here?" },
  { id: "services", title: "Services", icon: Zap, subtitle: "What do you need from us?" },
  { id: "final", title: "Final Details", icon: Shield, subtitle: "Almost there, sis." },
];

const PLATFORMS = ["OnlyFans", "Fansly", "LoyalFans", "ManyVids", "Clips4Sale", "NiteFlirt", "Fanvue", "AVN Stars", "Patreon", "Other"];
const CONTENT_CATEGORIES = [
  "Solo / Masturbation", "BDSM / Kink", "FemDom", "Foot Fetish", "Cosplay", "Roleplay",
  "GFE / Girlfriend Experience", "Squirting", "Anal", "Lesbian / Girl-Girl", "Trans",
  "Fetish (Specific)", "ASMR / Audio", "Outdoor / Public", "BBW / Plus Size", "Fitness / Athletic",
  "Mature / MILF", "Couples", "Interracial", "Findom",
];
const SERVICES = [
  "Brand Identity & Persona Development",
  "Niche Strategy & Market Positioning",
  "Platform Setup & Optimization",
  "Content Calendar & Strategy",
  "Legal Compliance & 2257 Setup",
  "DMCA & Anti-Piracy Protection",
  "Fan Engagement & CRM",
  "Revenue Optimization",
  "Full Agency Management",
  "One-Time Consultation",
];

// ─── MULTI-SELECT COMPONENT ───────────────────────────────────────────────────

function MultiSelect({
  options,
  value,
  onChange,
  maxCols = 3,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  maxCols?: number;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div className={`grid gap-2 grid-cols-2 sm:grid-cols-${maxCols}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`rounded-lg border px-3 py-2 text-left text-sm transition-all duration-150
            ${
              value.includes(opt)
                ? "border-violet-500 bg-violet-500/15 text-violet-200"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-300"
            }`}
        >
          {value.includes(opt) && <span className="mr-1.5 text-violet-400">✓</span>}
          {opt}
        </button>
      ))}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string; description?: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg border p-3 text-left transition-all duration-150
            ${
              value === opt.value
                ? "border-violet-500 bg-violet-500/15"
                : "border-slate-700 bg-slate-900 hover:border-slate-500"
            }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0
                ${value === opt.value ? "border-violet-500" : "border-slate-600"}`}
            >
              {value === opt.value && <div className="h-2 w-2 rounded-full bg-violet-500" />}
            </div>
            <div>
              <p className={`text-sm font-medium ${value === opt.value ? "text-violet-200" : "text-slate-300"}`}>
                {opt.label}
              </p>
              {opt.description && (
                <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    currentPlatforms: [],
    contentCategories: [],
    servicesInterested: [],
    ageVerified: false,
    agreeToTerms: false,
    agreeToNDA: false,
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const step = STEPS[currentStep];
  const StepIcon = step.icon;

  const updateField = (field: keyof OnboardingData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (!formData.stageName || formData.stageName.length < 2) {
          toast.error("Stage name is required (min 2 characters)");
          return false;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Valid email address required");
          return false;
        }
        if (!formData.country) {
          toast.error("Country is required");
          return false;
        }
        if (!formData.ageVerified) {
          toast.error("You must confirm you are 18 or older");
          return false;
        }
        return true;
      case 1:
        if (!formData.experienceLevel) {
          toast.error("Select your experience level");
          return false;
        }
        if (!formData.currentPlatforms?.length) {
          toast.error("Select at least one platform");
          return false;
        }
        if (!formData.monthlyRevenue) {
          toast.error("Select your current monthly revenue range");
          return false;
        }
        if (!formData.contentCategories?.length) {
          toast.error("Select at least one content category");
          return false;
        }
        return true;
      case 2:
        if (!formData.primaryGoal) {
          toast.error("Select your primary goal");
          return false;
        }
        if (!formData.targetNiches || formData.targetNiches.length < 3) {
          toast.error("Describe your target niche(s)");
          return false;
        }
        if (!formData.uniqueSellingPoint || formData.uniqueSellingPoint.length < 10) {
          toast.error("Tell us what makes you different (min 10 characters)");
          return false;
        }
        return true;
      case 3:
        if (!formData.servicesInterested?.length) {
          toast.error("Select at least one service");
          return false;
        }
        if (!formData.budget) {
          toast.error("Select your budget range");
          return false;
        }
        if (!formData.timeline) {
          toast.error("Select your timeline");
          return false;
        }
        return true;
      case 4:
        if (!formData.agreeToTerms) {
          toast.error("You must agree to the terms of service");
          return false;
        }
        if (!formData.agreeToNDA) {
          toast.error("NDA agreement is required to protect your information");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // In production this would POST to an API endpoint
    // For now, simulate submission
    toast.success("Application submitted! BNE will contact you within 24 hours.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navigation />
        <div className="container flex items-center justify-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h1 className="font-display text-3xl font-black text-slate-100 mb-3">
              You're In, Sis.
            </h1>
            <p className="text-slate-400 mb-2">
              Your application just landed with the BNE team.
            </p>
            <p className="text-slate-400 mb-8">
              We read every single one ourselves — no bots, no auto-replies. Expect to hear from us within{" "}
              <span className="text-violet-400 font-semibold">24–48 hours</span> at the email you gave us.
            </p>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-left mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Here's what happens next</p>
              <div className="space-y-3">
                {[
                  "We review your application (real humans, not bots)",
                  "You get a strategy call invite — 30 to 60 minutes, no pressure",
                  "We send you a custom proposal within 48 hours of the call",
                  "You say yes, we get to work. Simple.",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors"
            >
              Back to Home <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Header */}
      <section className="border-b border-slate-800 py-10">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-2">
              <StepIcon className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Step {currentStep + 1} of {STEPS.length} — {step.title}
              </p>
              <h1 className="font-display text-2xl font-bold text-slate-100">{step.subtitle}</h1>
            </div>
          </div>

          {/* Step indicators */}
          <div className="mt-4 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentStep
                    ? "bg-emerald-500 flex-1"
                    : i === currentStep
                    ? "bg-violet-500 flex-1"
                    : "bg-slate-800 flex-1"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="container py-10">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* ── STEP 1: IDENTITY ── */}
              {currentStep === 0 && (
                <>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
                    <Lock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-300">
                      Everything you share here is locked under NDA. Your real name, your identity, your situation — none of it leaves this room. Ever.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Your Creator Name / Stage Alias *</Label>
                      <Input
                        value={formData.stageName || ""}
                        onChange={(e) => updateField("stageName", e.target.value)}
                        placeholder="The name your fans know you by (not your real name)"
                        className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Creator Email *</Label>
                      <Input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Use a creator-only email — not your personal one, babe"
                        className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Phone / Signal (Optional — but we love Signal)</Label>
                      <Input
                        value={formData.phone || ""}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000 — Signal preferred"
                        className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Country of Residence *</Label>
                      <Input
                        value={formData.country || ""}
                        onChange={(e) => updateField("country", e.target.value)}
                        placeholder="United States, UK, Canada, etc."
                        className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div
                        onClick={() => updateField("ageVerified", !formData.ageVerified)}
                        className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
                          ${formData.ageVerified ? "border-violet-500 bg-violet-500" : "border-slate-600 group-hover:border-slate-400"}`}
                      >
                        {formData.ageVerified && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <p className="text-sm text-slate-400">
                        I confirm that I am <span className="text-slate-200 font-semibold">18 years of age or older</span> and that all performers in my content are verified adults. *
                      </p>
                    </label>
                  </div>
                </>
              )}

              {/* ── STEP 2: CREATOR PROFILE ── */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 mb-3 block">How long have you been in the game? *</Label>
                    <RadioGroup
                      value={formData.experienceLevel || ""}
                      onChange={(v) => updateField("experienceLevel", v)}
                      options={[
                        { label: "Brand New", value: "brand-new", description: "Haven't posted a thing yet" },
                        { label: "Under 6 Months", value: "under-6-months", description: "Just getting started, figuring it out" },
                        { label: "6–12 Months", value: "6-12-months", description: "Getting traction, ready to grow" },
                        { label: "1–3 Years", value: "1-3-years", description: "Established, ready to scale" },
                        { label: "3+ Years", value: "3-plus-years", description: "Seasoned creator, here to level up" },
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-3 block">Where are you currently posting? (select all) *</Label>
                    <MultiSelect
                      options={PLATFORMS}
                      value={formData.currentPlatforms || []}
                      onChange={(v) => updateField("currentPlatforms", v)}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-3 block">What are you making right now? (be honest, no judgment) *</Label>
                    <RadioGroup
                      value={formData.monthlyRevenue || ""}
                      onChange={(v) => updateField("monthlyRevenue", v)}
                      options={[
                        { label: "$0 — Not yet monetized", value: "$0" },
                        { label: "$1 – $500", value: "$1-$500" },
                        { label: "$500 – $2,000", value: "$500-$2k" },
                        { label: "$2,000 – $5,000", value: "$2k-$5k" },
                        { label: "$5,000 – $10,000", value: "$5k-$10k" },
                        { label: "$10,000+", value: "$10k+" },
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-3 block">What kind of content do you make? (select all that apply) *</Label>
                    <MultiSelect
                      options={CONTENT_CATEGORIES}
                      value={formData.contentCategories || []}
                      onChange={(v) => updateField("contentCategories", v)}
                      maxCols={2}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: GOALS & NICHE ── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 mb-3 block">What's the main thing you need from us? *</Label>
                    <RadioGroup
                      value={formData.primaryGoal || ""}
                      onChange={(v) => updateField("primaryGoal", v)}
                      options={[
                        { label: "Make More Money", value: "grow-revenue", description: "Increase monthly earnings, period" },
                        { label: "Build My Brand", value: "build-brand", description: "Create a real, recognizable identity" },
                        { label: "Get Protected", value: "legal-protection", description: "Compliance, DMCA, legal setup" },
                        { label: "Content Strategy", value: "content-strategy", description: "Plan, calendar, niche direction" },
                        { label: "Full Management", value: "full-management", description: "Hand it over — let BNE run it" },
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-1.5 block">What's your niche? *</Label>
                    <p className="text-xs text-slate-500 mb-2">
                      The more specific, the better. "FemDom foot fetish with ASMR audio" is infinitely more useful than "adult content."
                    </p>
                    <Textarea
                      value={formData.targetNiches || ""}
                      onChange={(e) => updateField("targetNiches", e.target.value)}
                      placeholder="e.g. Petite Latina FemDom with foot fetish and JOI content targeting findom audience..."
                      className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-1.5 block">What makes you different from every other creator? *</Label>
                    <p className="text-xs text-slate-500 mb-2">
                      Your angle, your personality, your vibe — the thing that makes fans pick you over anyone else.
                    </p>
                    <Textarea
                      value={formData.uniqueSellingPoint || ""}
                      onChange={(e) => updateField("uniqueSellingPoint", e.target.value)}
                      placeholder="e.g. I'm a real-life nurse who creates medical roleplay content with authentic props and settings..."
                      className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 4: SERVICES ── */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 mb-3 block">What do you need help with? (grab everything that applies) *</Label>
                    <MultiSelect
                      options={SERVICES}
                      value={formData.servicesInterested || []}
                      onChange={(v) => updateField("servicesInterested", v)}
                      maxCols={1}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-3 block">What's your monthly budget for agency support? *</Label>
                    <RadioGroup
                      value={formData.budget || ""}
                      onChange={(v) => updateField("budget", v)}
                      options={[
                        { label: "Under $500/mo", value: "under-$500" },
                        { label: "$500 – $1,000/mo", value: "$500-$1k" },
                        { label: "$1,000 – $2,500/mo", value: "$1k-$2.5k" },
                        { label: "$2,500 – $5,000/mo", value: "$2.5k-$5k" },
                        { label: "$5,000+/mo", value: "$5k+" },
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-3 block">When do you want to get started? *</Label>
                    <RadioGroup
                      value={formData.timeline || ""}
                      onChange={(v) => updateField("timeline", v)}
                      options={[
                        { label: "Yesterday", value: "asap", description: "I'm ready right now, let's go" },
                        { label: "1–2 Weeks", value: "1-2-weeks", description: "Need a little time to get ready" },
                        { label: "Within 1 Month", value: "1-month", description: "Planning ahead, not rushing" },
                        { label: "Just Exploring", value: "flexible", description: "No timeline yet, seeing what's out there" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 5: FINAL ── */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">How'd you find us? (Optional)</Label>
                    <Input
                      value={formData.referralSource || ""}
                      onChange={(e) => updateField("referralSource", e.target.value)}
                      placeholder="Twitter, Reddit, referral from another creator, etc."
                      className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Anything else we should know? (Optional)</Label>
                    <Textarea
                      value={formData.additionalNotes || ""}
                      onChange={(e) => updateField("additionalNotes", e.target.value)}
                      placeholder="Anything you want us to know before the call — the more context, the better we can help you..."
                      className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 min-h-[100px]"
                    />
                  </div>

                  {/* Legal agreements */}
                  <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Legal Agreements</p>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div
                        onClick={() => updateField("agreeToNDA", !formData.agreeToNDA)}
                        className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
                          ${formData.agreeToNDA ? "border-violet-500 bg-violet-500" : "border-slate-600 group-hover:border-slate-400"}`}
                      >
                        {formData.agreeToNDA && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <p className="text-sm text-slate-400">
                        I agree to the <span className="text-violet-400 underline cursor-pointer">Non-Disclosure Agreement</span>. All information shared with BNE is confidential and will never be disclosed to third parties. *
                      </p>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div
                        onClick={() => updateField("agreeToTerms", !formData.agreeToTerms)}
                        className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
                          ${formData.agreeToTerms ? "border-violet-500 bg-violet-500" : "border-slate-600 group-hover:border-slate-400"}`}
                      >
                        {formData.agreeToTerms && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <p className="text-sm text-slate-400">
                        I agree to the <span className="text-violet-400 underline cursor-pointer">Terms of Service</span> and confirm that I am 18+ and all content I create complies with applicable laws including 18 U.S.C. § 2257. *
                      </p>
                    </label>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <p className="text-sm text-emerald-300">
                      <span className="font-semibold">🔒 Your privacy is guaranteed.</span> BNE operates under strict NDA. Your real identity, personal details, and content information are never shared, sold, or disclosed.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              {currentStep < STEPS.length - 1 ? (
                <>Next Step <ChevronRight className="ml-1 h-4 w-4" /></>
              ) : (
                <>Submit Application <ArrowRight className="ml-1 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
