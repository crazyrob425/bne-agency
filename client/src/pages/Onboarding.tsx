import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

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

  const handleNext = () => {
    if (!validateStep()) return;
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

          <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0 || isSubmitting}
              className="text-slate-400 hover:text-slate-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isSubmitting || (step.id === "boundaries" && !formData.agreeToNDA)}
              className="bg-violet-600 text-white hover:bg-violet-500"
            >
              {isSubmitting ? "Submitting..." : currentStep === dynamicSteps.length - 1 ? "Submit Application" : "Continue"} 
              {!isSubmitting && currentStep !== dynamicSteps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
