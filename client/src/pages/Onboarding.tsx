import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Zap,
  Camera,
  Star,
  ArrowRight,
  Lock,
  FileUp,
  Save,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import UnifiedRegistrationGate, { FlowType } from "@/components/UnifiedRegistrationGate";
import { trpc } from "@/lib/trpc";
import { generateSessionId } from "@/lib/session";

// ─── REVENUE PATHS ────────────────────────────────────────────────────────────
const REVENUE_PATHS = [
  { id: "creator", label: "Digital Content Creation (OnlyFans, Fansly, etc.)" },
  { id: "webcam", label: "Webcam modeling, phone sex, sexting / online adult live interactions" },
  { id: "inperson", label: "In-Person Entertainment / Companion (Escort, Dancer, Fetish, Masseuse, Party Girl)" },
];

const WEBCAM_PLATFORMS = ["Niteflirt", "Sex Panther", "Wewantclips", "Clips4Sale", "Pornhub", "Other"];
const SELL_ITEMS_PLATFORMS = ["ManyVids", "Sniffer", "Reddit", "Adult Auctions", "Other"];

// ─── UTILS ───────────────────────────────────────────────────────────────────

function MultiSelect({ options, value, onChange, maxCols = 2 }: any) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v: string) => v !== opt) : [...value, opt]);
  };
  return (
    <div className={`grid gap-2 grid-cols-1 sm:grid-cols-${maxCols}`}>
      {options.map((opt: any) => {
        const id = typeof opt === "string" ? opt : opt.id;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <button
            key={id} type="button" onClick={() => toggle(id)}
            className={`rounded-lg border px-3 py-3 text-left text-sm transition-all duration-150 ${
              value.includes(id)
                ? "border-violet-500 bg-violet-500/15 text-violet-200"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-300"
            }`}
          >
            {value.includes(id) && <span className="mr-1.5 text-violet-400">✓</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({ options, value, onChange }: any) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt: any) => (
        <button
          key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className={`rounded-lg border p-3 text-left transition-all duration-150 ${
            value === opt.value
              ? "border-violet-500 bg-violet-500/15"
              : "border-slate-700 bg-slate-900 hover:border-slate-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${value === opt.value ? "border-violet-500" : "border-slate-600"}`}>
              {value === opt.value && <div className="h-2 w-2 rounded-full bg-violet-500" />}
            </div>
            <div>
              <p className={`text-sm font-medium ${value === opt.value ? "text-violet-200" : "text-slate-300"}`}>{opt.label}</p>
              {opt.description && <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({
    revenuePaths: [],
    webcamPlatforms: [],
    sellItemsPlatforms: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState<number | null>(null);

  const sessionId = useRef(generateSessionId()).current;
  const saveDraftMutation = trpc.drafts.save.useMutation();
  const getDraftQuery = trpc.drafts.get.useQuery({ sessionId }, { enabled: Boolean(sessionId) });

  const updateField = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const hasPath = (pathId: string) => formData.revenuePaths?.includes(pathId);

  const getSteps = () => {
    const steps = [];
    steps.push({ id: "identity", title: "Identity & Paths", icon: User, subtitle: "Let's get to know you." });

    if (hasPath("webcam")) steps.push({ id: "webcam", title: "Online Live / Webcam", icon: Camera, subtitle: "Tell us about your interactive streams." });
    if (hasPath("inperson")) steps.push({ id: "inperson", title: "In-Person Entertainment", icon: Star, subtitle: "Tell us about your physical services." });

    steps.push({ id: "universal", title: "Business & Growth", icon: Zap, subtitle: "Let's talk business." });
    steps.push({ id: "boundaries", title: "Boundaries & Legal", icon: Lock, subtitle: "Protecting your brand and self." });

    return steps;
  };

  const dynamicSteps = getSteps();
  const step = dynamicSteps[currentStep];

  const validateStep = (): boolean => {
    if (currentStep === 0) {
      if (!formData.stageName) { toast.error("Stage name required"); return false; }
      if (!formData.email) { toast.error("Email required"); return false; }
      if (!formData.revenuePaths?.length) { toast.error("Please select at least one revenue path"); return false; }
      if (!formData.ageVerified) { toast.error("You must confirm you are 18+"); return false; }
    }
    return true;
  };

  // ─── SAVE DRAFT ─────────────────────────────────────────────────────────────

  const saveDraft = useCallback(async (savedForLater = false) => {
    try {
      const result = await saveDraftMutation.mutateAsync({
        sessionId,
        type: "onboarding",
        data: formData,
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
        lastStep: step?.id,
        savedForLater,
      });
      setIsSaved(true);
      toast.success(savedForLater ? "Draft saved — come back anytime." : "Progress saved.");
      return result;
    } catch (e) {
      console.error("Failed to save draft:", e);
      toast.error("Could not save progress. Please try again.");
    }
  }, [sessionId, formData, files, step, saveDraftMutation]);

  // Restore draft on mount if exists
  useEffect(() => {
    if (getDraftQuery.data && Object.keys(formData).length === 3 && formData.revenuePaths.length === 0) {
      const draft = getDraftQuery.data;
      if (draft.type === "onboarding") {
        setFormData(draft.data || {});
        setFiles([]);
        const stepIdx = dynamicSteps.findIndex((s: any) => s.id === draft.lastStep);
        if (stepIdx >= 0) setCurrentStep(stepIdx);
        toast.success("Welcome back — we restored your saved draft.");
      }
    }
  }, [getDraftQuery.data, dynamicSteps]);

  // Auto-save every 30 seconds if there is progress
  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    const interval = setInterval(() => saveDraft(false), 30000);
    return () => clearInterval(interval);
  }, [formData, saveDraft]);

  // Abandonment detection
  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      saveDraft(true);
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData, saveDraft]);

  const handleNext = async () => {
    if (!validateStep()) return;
    await saveDraft(false); // auto-save before advancing
    if (currentStep < dynamicSteps.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key] || "");
        }
      });

      files.forEach((file) => {
        data.append('files', file);
      });

      // Mark draft as completed
      if (savedDraftId) {
        await saveDraftMutation.mutateAsync({
          sessionId,
          type: "onboarding",
          data: formData,
          files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
          lastStep: "submitted",
          savedForLater: false,
        });
      }

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error("Submission failed");
      toast.success("Application submitted! BNE will contact you within 24-48 hours.");
      setSubmitted(true);
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navigation />
        <div className="container flex items-center justify-center py-24">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h1 className="font-display text-3xl font-black text-slate-100 mb-3">You're In, Sis.</h1>
            <p className="text-slate-400 mb-8">We read every single one ourselves. Expect to hear from us within 24–48 hours.</p>
            <a href="/" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors">
              Back to Home <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const StepIcon = step?.icon || User;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Apply for Management & Empire Building"
        description="Apply for BNE Agency's confidential management, silent webcam partnership, or companion safety/booking support. Start stacking cash and reclaim your free time."
        canonical="/onboarding"
      />
      <Navigation />

      {/* Registration gate — shown inline at top of form */}
      <div className="container pt-6">
        <UnifiedRegistrationGate
          flowType="onboarding"
          onRegistered={() => setShowRegistration(true)}
          onDismissed={() => setShowRegistration(false)}
          compact
          defaultEmail={formData.email || ""}
        />
      </div>

      {/* SEO-rich introduction: long-form content to educate visitors and improve organic rankings. */}
      <div className="container py-10">
        <article className="prose prose-invert max-w-4xl mx-auto text-slate-200">
          <h2>Apply to BNE: Your Complete Guide to Getting Started</h2>
          <p>
            BNE Studio helps creators transform genuine talent into sustainable, scalable businesses. Whether you're interested in quiet management, silent webcam partnerships, or support for in-person fields, this application is the first step toward building a professional, protected, and profitable brand. Below is everything applicants need to know — how the review works, what we prioritize, what support looks like, and how to prepare your best application.
          </p>
          <h3>Why Apply?</h3>
          <p>
            Traditional agencies promise the moon. We deliver systems. BNE focuses on creators who want real business outcomes: predictable revenue, legal protection, anonymity when required, and a career that compounds rather than burns out. We invest in creators up front — production, creative direction, ad spend, and compliance infrastructure. Our revenue share aligns incentives: we only win when creators win.
          </p>
          <h3>What We Look For</h3>
          <p>
            Applications are reviewed by a senior partner who looks for signals beyond followers: clarity of niche, willingness to follow guidance, creative consistency, and basic technical readiness. We recruit for scale and long-term value; creators who can reliably create content, follow production plans, and engage with core audiences are the best fit.
          </p>
          <h3>How the Review Works</h3>
          <ol>
            <li><strong>Fast initial screen.</strong> We verify age and eligibility, then check basic fit (niche, presentation, and safety concerns).</li>
            <li><strong>Personal assessment.</strong> A senior partner records a short voice note with candid feedback and next steps — honest and actionable.</li>
            <li><strong>Decision window.</strong> Most creators receive a response within 24–48 hours. If accepted, we schedule an onboarding call and share the 90-day launch roadmap.</li>
          </ol>
          <h3>Preparing a Strong Application</h3>
          <p>
            Speed matters, but detail matters more. Provide clear contact info, a reliable email, accurate availability, and honest answers about your experience and goals. Upload good-quality headshots if possible — but anonymity is fully supported when requested. If privacy is a concern, note it clearly in your application and we'll prioritize email or signal-based communication.
          </p>
          <h3>What To Expect After Submission</h3>
          <p>
            Once submitted, expect a human response. If accepted, the onboarding process includes asset creation, compliance setup (ID verification and record keeping), platform configuration, and a 30/60/90 day growth plan. If declined, we provide constructive feedback so you can reapply with a stronger profile.
          </p>
          <figure>
                      <img src="/media/Building_a_Six-Figure_Content_Empire.png" alt="BNE onboarding" />
            <figcaption>Preparing a standout submission helps speed up the review and improve outcomes.</figcaption>
          </figure>
          <h3>Helpful Resources</h3>
          <p>
            Use our Creator Tools, Compliance Vault, and Calculator pages (links below) to optimize your application. These resources explain technical setup, legal basics, and projected outcomes so you can apply with confidence.
          </p>
          <p>
            Internal links: <a href="/creator-tools">Creator Tools</a> · <a href="/compliance-vault">Compliance Vault</a> · <a href="/creator-calculator">Creator Calculator</a>
          </p>
        </article>
      </div>

      <section className="border-b border-slate-800 py-10">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-2">
              <StepIcon className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Step {currentStep + 1} of {dynamicSteps.length} — {step.title}
              </p>
              <h1 className="font-display text-2xl font-bold text-slate-100">{step.subtitle}</h1>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {dynamicSteps.map((s, i) => (
              <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${i < currentStep ? "bg-emerald-500 flex-1" : i === currentStep ? "bg-violet-500 flex-1" : "bg-slate-800 flex-1"}`} />
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={step.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">

              {/* IDENTITY STEP */}
              {step.id === "identity" && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Creator Name / Stage Alias *</Label>
                      <Input value={formData.stageName || ""} onChange={(e) => updateField("stageName", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 focus:border-violet-500" />
                    </div>
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Creator Email *</Label>
                      <Input type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 focus:border-violet-500" />
                    </div>
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Phone / Signal (Optional)</Label>
                      <Input value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 focus:border-violet-500" />
                    </div>
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Country *</Label>
                      <Input value={formData.country || ""} onChange={(e) => updateField("country", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 focus:border-violet-500" />
                    </div>
                    <div>
                      <Label className="text-slate-300 mb-3 block">What are your current OR desired revenue paths? (Select all that apply) *</Label>
                      <MultiSelect options={REVENUE_PATHS} value={formData.revenuePaths} onChange={(v: any) => updateField("revenuePaths", v)} maxCols={1} />
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Photo / Headshot Uploads (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} className="bg-slate-900 border-slate-700 text-slate-400 file:bg-violet-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-4 file:hover:bg-violet-500 cursor-pointer" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Upload headshots, digitals, or promos (Max 5MB per file)</p>
                    </div>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4 cursor-pointer hover:border-violet-500 transition-colors">
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${formData.ageVerified ? "bg-violet-500 border-violet-500" : "border-slate-500"}`}>
                        {formData.ageVerified && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm text-slate-300">I confirm I am 18 years or older. *</span>
                      <input type="checkbox" className="hidden" checked={!!formData.ageVerified} onChange={(e) => updateField("ageVerified", e.target.checked)} />
                    </label>
                  </div>
                </>
              )}

              {/* WEBCAM STEP */}
              {step.id === "webcam" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">How long have you been doing online live interactions?</Label>
                    <Input value={formData.webcamDuration || ""} onChange={(e) => updateField("webcamDuration", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-3 block">Which platforms do you use?</Label>
                    <MultiSelect options={WEBCAM_PLATFORMS} value={formData.webcamPlatforms} onChange={(v: any) => updateField("webcamPlatforms", v)} />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Do you work from home or a studio?</Label>
                    <RadioGroup options={[{label:"Home", value:"home"}, {label:"Studio", value:"studio"}]} value={formData.webcamLocation || ""} onChange={(v: any) => updateField("webcamLocation", v)} />
                  </div>
                  {formData.webcamLocation === "home" && (
                    <div>
                      <Label className="text-slate-300 mb-1.5 block">Do you have the necessary electronics and performance aids at home?</Label>
                      <Textarea value={formData.webcamEquipment || ""} onChange={(e) => updateField("webcamEquipment", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 min-h-[80px]" placeholder="Lights, toys, 4K camera, etc." />
                    </div>
                  )}
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Do you currently have headshots, digitals, or online content available?</Label>
                    <Textarea value={formData.webcamContent || ""} onChange={(e) => updateField("webcamContent", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" />
                  </div>
                </div>
              )}

              {/* IN PERSON STEP */}
              {step.id === "inperson" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">How long have you been doing in-person work?</Label>
                    <Input value={formData.inpersonDuration || ""} onChange={(e) => updateField("inpersonDuration", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Menu, rates, and current daily business model</Label>
                    <Textarea value={formData.inpersonMenu || ""} onChange={(e) => updateField("inpersonMenu", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 min-h-[100px]" placeholder="Where do you post, advertise, tours, private parties? Only weekends? Weekdays? Morning shift?" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Do you currently have management, security, or a driver?</Label>
                    <Textarea value={formData.inpersonTeam || ""} onChange={(e) => updateField("inpersonTeam", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Are you interested in posting, booking, vetting, card/crypto payments, or security options?</Label>
                    <Textarea value={formData.inpersonInterests || ""} onChange={(e) => updateField("inpersonInterests", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Do you have reviews on established review sites or forums?</Label>
                    <Textarea value={formData.inpersonReviews || ""} onChange={(e) => updateField("inpersonReviews", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="If yes, what's your handle/username and which sites?" />
                  </div>
                </div>
              )}

              {/* UNIVERSAL STEP */}
              {step.id === "universal" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Do you have an established niche, or want to expand/change? Have a current online adult persona?</Label>
                    <Textarea value={formData.nicheInfo || ""} onChange={(e) => updateField("nicheInfo", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 min-h-[80px]" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-3 block">Do you sell personal / worn items?</Label>
                    <MultiSelect options={SELL_ITEMS_PLATFORMS} value={formData.sellItemsPlatforms} onChange={(v: any) => updateField("sellItemsPlatforms", v)} />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Tech Needs</Label>
                    <Textarea value={formData.techNeeds || ""} onChange={(e) => updateField("techNeeds", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="Need a website, domain, members area, social media setup/management?" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">AI & Automations</Label>
                    <Textarea value={formData.aiInterests || ""} onChange={(e) => updateField("aiInterests", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="Are you interested in incorporating AI powered assistance, automations, or Chatter services?" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Business & Legal</Label>
                    <Textarea value={formData.businessLegal || ""} onChange={(e) => updateField("businessLegal", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="Need help with business registration, bank setup, taxes, legal requirements? Are you behind?" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Are you currently under contract or working with another agency?</Label>
                    <Textarea value={formData.contractInfo || ""} onChange={(e) => updateField("contractInfo", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 min-h-[80px]" placeholder="If yes, who, contract end date, and buyout stipulations." />
                  </div>
                </div>
              )}

              {/* BOUNDARIES STEP */}
              {step.id === "boundaries" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Industry Hard No's (We respect all boundaries. List them in detail)</Label>
                    <Textarea value={formData.hardNos || ""} onChange={(e) => updateField("hardNos", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 min-h-[100px]" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Anonymity & Privacy</Label>
                    <Textarea value={formData.privacyNeeds || ""} onChange={(e) => updateField("privacyNeeds", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="How important is staying anonymous? Need geo-blocking, VPN, secondary numbers?" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">Exit Plan</Label>
                    <Textarea value={formData.exitPlan || ""} onChange={(e) => updateField("exitPlan", e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" placeholder="Do you have an exit plan you want to stick to?" />
                  </div>

                  <label className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4 mt-6 cursor-pointer hover:border-violet-500 transition-colors">
                    <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${formData.agreeToNDA ? "bg-violet-500 border-violet-500" : "border-slate-500"}`}>
                      {formData.agreeToNDA && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm text-slate-300">I agree to the <Link href="/nda" className="text-violet-400 hover:underline">Non-Disclosure Agreement</Link></span>
                    <input type="checkbox" className="hidden" checked={!!formData.agreeToNDA} onChange={(e) => updateField("agreeToNDA", e.target.checked)} />
                  </label>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Action bar */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0 || isSubmitting}
              className="text-slate-400 hover:text-slate-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => saveDraft(true)}
                disabled={isSubmitting}
                className="text-slate-500 hover:text-slate-300"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaved ? "Saved" : "Save & Finish Later"}
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting || (step.id === "boundaries" && !formData.agreeToNDA)}
                className="bg-violet-600 text-white hover:bg-violet-500"
              >
                {isSubmitting ? "Saving..." : currentStep === dynamicSteps.length - 1 ? "Submit Application" : "Save & Continue"} 
                {!isSubmitting && currentStep !== dynamicSteps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          {isSaved && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[11px] text-emerald-400 mt-3 font-bold uppercase tracking-widest"
            >
              ✓ Draft auto-saved — return anytime to continue
            </motion.p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

