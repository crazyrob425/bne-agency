/**
 * BNE Niche Matcher Engine — Diamond & Dashboard Edition
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Filter,
  Star,
  Eye,
  DollarSign,
  Layers,
  X,
  CheckCircle2,
  ArrowRight,
  Flame,
  Diamond,
  Crown,
  Brain,
  Sparkles,
  Users,
  Package,
  Lightbulb,
  Heart,
  Activity,
  Gem,
  Compass,
  Gauge,
  Lock,
  Shield,
  Dna,
  Workflow,
  Cpu,
  HelpCircle,
  Briefcase,
  History,
  Scale,
  Camera,
  EyeOff,
  DoorOpen,
  Sword,
  Target as Crosshair,
  ClipboardList,
  Flame as Burn,
  Smartphone,
  Coffee,
} from "lucide-react";
import {
  NICHE_DATABASE,
  NICHE_CATEGORIES,
  searchNiches,
  getNichesByCategory,
  getTopNiches,
  getHiddenGems,
  TOTAL_NICHE_COUNT,
  type Niche,
  type NicheCategory,
} from "@/data/nicheDatabase";
import { QUIZ_QUESTIONS, computeAttachmentVector, type QuizAnswers } from "@/data/nicheQuiz";
import {
  matchNicheFinder,
  getSubconsciousInsight,
  type MatchResult,
  type NicheMatch,
  type SubconsciousInsight,
} from "@/data/nicheMatcherEngine";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const EP_COLORS: Record<string, string> = {
  "very-high": "text-[#D4AF37]",
  high: "text-[#C0C0C0]",
  medium: "text-[#B08D57]",
  low: "text-[#808080]",
};

const COMP_LABELS: Record<string, string> = {
  micro: "Minimal",
  low: "Low",
  medium: "Moderate",
  high: "High",
  "very-high": "Saturated",
};

const EP_LABELS: Record<string, string> = {
  "very-high": "Elite",
  high: "High",
  medium: "Mid",
  low: "Base",
};

const DIM_LABEL: Record<string, string> = {
  dominance: "Dominance",
  submission: "Submission",
  novelty: "Novelty",
  sensation: "Sensation",
  intimacy: "Intimacy",
  exhibition: "Exhibition",
  taboo: "Edge / Taboo",
  structure: "Structure",
  nurture: "Nurture",
  material: "Status / Material",
};

// ─── LUXURY HELPER COMPONENTS ──────────────────────────────────────────────────

function QuizIcon({ icon }: { icon: string }) {
  const ICON_MAP: Record<string, any> = {
    crown: Crown,
    compass: Compass,
    heart: Heart,
    zap: Zap,
    lock: Lock,
    shield: Shield,
    sparkles: Sparkles,
    dna: Dna,
    gem: Gem,
    eye: Eye,
    activity: Activity,
    target: Target,
    cpu: Cpu,
    layers: Layers,
    search: Search,
    users: Users,
    dollar: DollarSign,
    flame: Flame,
    brain: Brain,
    package: Package,
    lightbulb: Lightbulb,
    trending: TrendingUp,
    clipboard: ClipboardList,
    briefcase: Briefcase,
    history: History,
    scale: Scale,
    camera: Camera,
    eyeoff: EyeOff,
    door: DoorOpen,
    sword: Sword,
    crosshair: Crosshair,
    burn: Burn,
    smartphone: Smartphone,
    coffee: Coffee,
  };

  const Icon = ICON_MAP[icon.toLowerCase()] || HelpCircle;
  return <Icon className="h-5 w-5 text-[#D4AF37]" />;
}

function Speedometer({ progress }: { progress: number }) {
  const rotation = (progress / 100) * 240 - 120;
  return (
    <div className="speedo-dial">
      <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#1A1A1A" strokeWidth="1" />
        <path d="M 20 80 A 42 42 0 1 1 80 80" className="gauge-track" strokeLinecap="square" />
        <motion.path
          d="M 20 80 A 42 42 0 1 1 80 80"
          className="gauge-fill"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 1, ease: "circOut" }}
        />
        {[...Array(11)].map((_, i) => {
          const angle = (i * 24 - 120) * (Math.PI / 180);
          return (
            <line 
              key={i} 
              x1={50 + 38 * Math.cos(angle)} y1={50 + 38 * Math.sin(angle)} 
              x2={50 + 42 * Math.cos(angle)} y2={50 + 42 * Math.sin(angle)} 
              stroke={i * 10 <= progress ? "#D4AF37" : "#333"} 
              strokeWidth="0.5" 
            />
          );
        })}
      </svg>
      <motion.div 
        className="absolute bottom-1/2 left-1/2 w-0.5 h-16 bg-[#FF0000] origin-bottom -translate-x-1/2"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 40, damping: 12 }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full knurled-gold border-none shadow-xl" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[8px] uppercase tracking-[0.3em] text-[#666] font-bold">Analysis Engine</p>
        <p className="text-xl font-mono-lux text-[#D4AF37] tracking-tighter tabular-nums">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

function StatPlaque({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="relative group overflow-hidden diamond-cut">
      <div className="bg-[#0A0A0A] border-l border-[#D4AF37] p-5 min-w-[180px]">
        <Icon className="h-3 w-3 text-[#D4AF37] mb-2 opacity-40" />
        <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-bold">{label}</p>
        <p className="text-sm font-bold text-[#F4F4EE] tracking-tight">{value}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}

function NicheArtifact({ niche, index, highlight }: { niche: Niche, index: number, highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`sapphire-glass lens-flare-hover group p-5 diamond-cut ${highlight ? 'border-[#D4AF37]/50 ring-1 ring-[#D4AF37]/20' : 'border-white/5'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-sm font-bold text-[#F4F4EE] leading-tight mb-1">{niche.keyword}</h4>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold">{niche.category}</span>
        </div>
        <div className="knurled-gold w-6 h-6 flex items-center justify-center diamond-cut border-none">
          <Gem className="h-3 w-3 text-[#000000]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-[#444] mb-1 font-bold">Yield</p>
          <p className={`text-[10px] font-bold ${EP_COLORS[niche.earningPotential]}`}>{EP_LABELS[niche.earningPotential]}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-[#444] mb-1 font-bold">Density</p>
          <p className="text-[10px] font-bold text-[#F4F4EE]">{COMP_LABELS[niche.competitionLevel]}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileCase({ match, index }: { match: NicheMatch; index: number }) {
  const { niche } = match;
  const profile = niche.profile;
  const fit = Math.round(match.score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="sapphire-glass bling-shine p-8 diamond-cut border-[#D4AF37]/30"
    >
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Matched Dossier #{index + 1}</span>
        <div className="bg-[#D4AF37] px-3 py-1 diamond-cut">
          <span className="text-[10px] font-black text-black">{fit}% ALIGNMENT</span>
        </div>
      </div>

      <h3 className="text-4xl md:text-5xl font-display text-[#F4F4EE] mb-2">{niche.keyword}</h3>
      <p className="text-xs uppercase tracking-widest text-[#555] font-bold mb-6">{niche.category}</p>

      <div className="bg-black/40 border border-white/5 p-4 mb-6 italic text-sm text-[#888] border-l-2 border-l-[#D4AF37]">
        “{match.reason}”
      </div>

      {profile && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2">
                <Users className="h-3 w-3" /> Targeted Fanbase
              </p>
              <p className="text-xs text-[#F4F4EE] leading-relaxed">{profile.demographics}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2">
                <DollarSign className="h-3 w-3" /> Income Projection
              </p>
              <p className="text-xs text-[#F4F4EE] leading-relaxed">{profile.income}</p>
            </div>
          </div>
          <div className="space-y-4">
             <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2">
                <Brain className="h-3 w-3" /> Psychological Persona
              </p>
              <p className="text-xs text-[#F4F4EE] leading-relaxed">{profile.persona}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Related Verticals
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.related.map((r) => (
                  <span key={r} className="text-[10px] border border-white/10 px-2 py-1 uppercase font-bold text-[#666]">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NicheMatcher() {
  const { getVideoByKeyword } = useMediaCatalog();
  const nicheVideo = getVideoByKeyword("niche");
  const [activeTab, setActiveTab] = useState<"quiz" | "browse" | "search">("quiz");

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [quizResults, setQuizResults] = useState<MatchResult | null>(null);
  const [quizInsight, setQuizInsight] = useState<SubconsciousInsight | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [attachment, setAttachment] = useState<{
    anxiety: number;
    avoidance: number;
    quadrant: string;
  } | null>(null);

  const [browseCategory, setBrowseCategory] = useState<NicheCategory | "all" | "gems" | "top">("top");
  const [browseFilter, setBrowseFilter] = useState<{ ep?: Niche["earningPotential"]; comp?: Niche["competitionLevel"]; }>({});

  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useMemo(() => (searchQuery.length >= 2 ? searchNiches(searchQuery) : []), [searchQuery]);

  const currentStep = QUIZ_QUESTIONS[quizStep];
  const progress = ((quizStep + (quizComplete ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const handleQuizAnswer = useCallback((value: string) => {
    if (currentStep.type === "multi") {
      const current = (quizAnswers[currentStep.id] as string[]) || [];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setQuizAnswers((prev) => ({ ...prev, [currentStep.id]: updated }));
    } else {
      setQuizAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
      setTimeout(() => {
        if (quizStep < QUIZ_QUESTIONS.length - 1) setQuizStep((s) => s + 1);
        else finishQuiz({ ...quizAnswers, [currentStep.id]: value });
      }, 300);
    }
  }, [quizStep, quizAnswers, currentStep]);

  const handleMultiNext = useCallback(() => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) setQuizStep((s) => s + 1);
    else finishQuiz(quizAnswers);
  }, [quizStep, quizAnswers]);

  const finishQuiz = useCallback((answers: QuizAnswers) => {
    const attachmentVec = computeAttachmentVector(answers);
    setAttachment({
      anxiety: attachmentVec.anxiety,
      avoidance: attachmentVec.avoidance,
      quadrant: attachmentVec.quadrant,
    });
    setQuizResults(matchNicheFinder(answers, attachmentVec));
    setQuizInsight(getSubconsciousInsight(answers));
    setQuizComplete(true);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResults(null);
    setQuizInsight(null);
    setQuizComplete(false);
    setAttachment(null);
  }, []);

  const browseNiches = useMemo(() => {
    let niches: Niche[];
    if (browseCategory === "top") niches = getTopNiches(60, browseFilter.ep ? { earningPotential: browseFilter.ep } : undefined);
    else if (browseCategory === "gems") niches = getHiddenGems(60);
    else if (browseCategory === "all") niches = [...NICHE_DATABASE];
    else niches = getNichesByCategory(browseCategory);
    if (browseFilter.ep) niches = niches.filter((n) => n.earningPotential === browseFilter.ep);
    if (browseFilter.comp) niches = niches.filter((n) => n.competitionLevel === browseFilter.comp);
    return niches.slice(0, 80);
  }, [browseCategory, browseFilter]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BNE Niche Matcher Engine",
    url: "https://blacklisted.studio/niche-matcher",
    description: "Proprietary database of 1,000+ segments. Maps user profile to elite verticals in under 2 minutes.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
  };

  return (
    <div className="min-h-screen bg-black text-[#F4F4EE] selection:bg-[#D4AF37]/30 selection:text-white">
      <Seo title="Elite Niche Matcher | Strategic Inventory" description="Advanced psychometric matching engine for high-yield content segments." schema={webAppSchema} />
      <Navigation />

      {/* ── DRAMATIC HERO ── */}
      <section className="relative pt-48 pb-32 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 knurled-gold border-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-15 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-7xl md:text-9xl font-display leading-[0.8] mb-8 bling-shine">
                Elite <br />
                <span className="text-[#D4AF37]">Strategic</span> <br />
                Inventory
              </h1>
              <p className="text-xl text-[#666] max-w-lg leading-relaxed font-bold uppercase tracking-[0.2em]">
                System v2.026 // Clinical Psychometric Analysis
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-1 justify-center md:justify-end">
            <StatPlaque icon={Cpu} label="Engine Logic" value="Subconscious Map" />
            <StatPlaque icon={Target} label="Search Volume" value="1.2M+ Indexed" />
            <StatPlaque icon={Activity} label="Index Count" value="1,052 Sectors" />
          </div>
        </div>
      </section>

      {/* ── EXCLUSIVE BRIEFING ── */}
      <section className="py-24 bg-black border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.8em] text-[#D4AF37] uppercase mb-4 block">Classified Strategic Briefing</span>
            <h2 className="text-6xl font-display text-[#F4F4EE] mb-4">Niche Domination</h2>
            <p className="text-sm text-[#444] uppercase tracking-widest font-bold">Watch to understand how we target high-value sub-genres.</p>
          </div>
          <div className="dashboard-bezel p-1 sapphire-glass diamond-cut">
            <VideoPlayer
              src={nicheVideo?.url || "/media-files/Niche_Domination___Survival.mp4"}
              title="Strategic Dominance"
              description="Engineering market control in high-yield segments."
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,_#D4AF37_0deg,_transparent_360deg)]" />
      </section>

      {/* ── THE CONTROL DASHBOARD ── */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="dashboard-bezel">
          <div className="bg-[#050505] p-1 flex flex-col lg:flex-row gap-1">
            <div className="w-full lg:w-64 bg-black p-8 flex flex-row lg:flex-col gap-4 border-r border-white/5">
              <p className="hidden lg:block text-[10px] font-black tracking-[0.5em] text-[#222] uppercase mb-6">Console Modules</p>
              <button onClick={() => setActiveTab('quiz')} className={`btn-luxury w-full ${activeTab === 'quiz' ? 'active' : ''}`}>
                <Compass className="h-4 w-4 mr-3" /> Analysis
              </button>
              <button onClick={() => setActiveTab('browse')} className={`btn-luxury w-full ${activeTab === 'browse' ? 'active' : ''}`}>
                <Layers className="h-4 w-4 mr-3" /> Archive
              </button>
              <button onClick={() => setActiveTab('search')} className={`btn-luxury w-full ${activeTab === 'search' ? 'active' : ''}`}>
                <Search className="h-4 w-4 mr-3" /> Query
              </button>
              <div className="mt-auto hidden lg:block pt-12 border-t border-white/5">
                 <div className="flex items-center gap-4 text-[#1A1A1A]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.1)]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Identity Verified</span>
                 </div>
              </div>
            </div>

            <div className="flex-1 bg-black p-12 min-h-[750px] relative overflow-hidden">
               <div className="absolute top-8 right-10 flex gap-8 text-[9px] font-black text-[#1A1A1A] uppercase tracking-[0.5em]">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" /> Core Engaged</span>
                  <span>Region: Global</span>
               </div>

               <AnimatePresence mode="wait">
                  {activeTab === 'quiz' && (
                    <motion.div key="quiz-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                       {!quizComplete ? (
                         <div className="grid lg:grid-cols-[1fr_300px] gap-20 h-full items-center">
                            <div>
                               <div className="mb-16">
                                  <span className="text-[11px] font-black tracking-[0.6em] text-[#333] mb-6 block uppercase">Protocol {quizStep + 1} / {QUIZ_QUESTIONS.length}</span>
                                  <h2 className="text-6xl font-display text-[#F4F4EE] leading-[1.1] mb-6">{currentStep.question}</h2>
                                  <p className="text-sm text-[#444] uppercase tracking-[0.2em] font-black">{currentStep.subtitle}</p>
                               </div>

                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {currentStep.options.map((opt) => {
                                    const isSelected = currentStep.type === "multi" 
                                      ? ((quizAnswers[currentStep.id] as string[]) || []).includes(opt.value)
                                      : quizAnswers[currentStep.id] === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        onClick={() => handleQuizAnswer(opt.value)}
                                        className={`btn-luxury justify-start text-left h-24 px-10 ${isSelected ? 'active' : ''}`}
                                      >
                                        <div className="flex items-center gap-6">
                                           <QuizIcon icon={opt.icon || ''} />
                                           <span className="text-xs font-black tracking-widest">{opt.label}</span>
                                        </div>
                                        {isSelected && <div className="ml-auto w-3 h-3 rounded-full bg-black shadow-inner border border-white/5" />}
                                      </button>
                                    );
                                  })}
                               </div>

                               {currentStep.type === "multi" && (
                                 <div className="mt-16 flex gap-6">
                                    <button onClick={handleMultiNext} className="btn-luxury active px-20 text-[11px]">Confirm Selection <ArrowRight className="ml-3 h-5 w-5" /></button>
                                 </div>
                               )}
                               
                               {quizStep > 0 && (
                                 <button onClick={() => setQuizStep(s => s - 1)} className="mt-10 text-[10px] font-black tracking-[0.4em] text-[#333] hover:text-[#D4AF37] transition-colors flex items-center gap-3 uppercase">
                                    <ChevronLeft className="h-4 w-4" /> Revert Protocol
                                 </button>
                               )}
                            </div>

                            <div className="hidden lg:flex flex-col items-center justify-center border-l border-white/5 pl-20">
                               <Speedometer progress={progress} />
                               <div className="mt-16 space-y-8 w-full">
                                  <div className="text-center px-4">
                                     <p className="text-[10px] font-black text-[#222] uppercase tracking-[0.5em] mb-3">Sync Depth</p>
                                     <div className="h-1 bg-white/5 w-full relative diamond-cut overflow-hidden">
                                        <motion.div className="absolute inset-0 bg-[#D4AF37]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} />
                                     </div>
                                  </div>
                                  <div className="p-6 bg-[#080808] diamond-cut text-center border border-white/5 shadow-2xl">
                                     <p className="text-[8px] font-black text-[#444] uppercase mb-2 tracking-[0.6em]">Biometric Link</p>
                                     <p className="text-xs font-mono-lux text-[#D4AF37] tracking-[0.1em]">ENCRYPTED / ACTIVE</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-16">
                            <div className="flex flex-wrap items-end justify-between gap-12 border-b border-white/5 pb-12">
                               <div>
                                  <h2 className="text-7xl font-display text-[#F4F4EE] mb-6 bling-shine">Subconscious Decoded</h2>
                                  <div className="flex items-center gap-10">
                                     <div className="flex items-center gap-3 text-[#D4AF37]">
                                        <Dna className="h-5 w-5" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Signature: {quizInsight?.headline}</span>
                                     </div>
                                     <div className="flex items-center gap-3 text-[#444]">
                                        <Lock className="h-5 w-5" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Quadrant: {attachment?.quadrant.replace(/-/g, " ")}</span>
                                     </div>
                                  </div>
                               </div>
                               <button onClick={resetQuiz} className="btn-luxury px-10"><RotateCcw className="h-4 w-4 mr-3" /> Reset Engine</button>
                            </div>

                            <div className="grid gap-8 lg:grid-cols-3">
                               {quizResults?.matches.slice(0, 3).map((match, i) => (
                                 <ProfileCase key={match.niche.keyword} match={match} index={i} />
                               ))}
                            </div>

                            {quizResults && quizResults.matches.length > 3 && (
                               <div className="pt-16 border-t border-white/5">
                                 <p className="text-[11px] font-black uppercase tracking-[0.6em] text-[#222] mb-10">Adjacent Strategic Opportunities</p>
                                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                   {quizResults.matches.slice(3, 11).map((match, i) => (
                                     <NicheArtifact key={match.niche.keyword} niche={match.niche} index={i + 3} />
                                   ))}
                                 </div>
                               </div>
                            )}

                            <div className="sapphire-glass p-20 text-center border-[#D4AF37]/30 diamond-cut relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
                               <h3 className="text-5xl font-display mb-6 relative z-10">Commence Partnership</h3>
                               <p className="text-[#555] max-w-2xl mx-auto mb-12 uppercase tracking-[0.2em] text-[11px] font-black leading-relaxed relative z-10">
                                  BNE architects the complete platform infrastructure around your identified segments. Engineering Market Dominance.
                               </p>
                               <button className="btn-luxury active px-24 h-16 text-xs relative z-10" onClick={() => window.location.href = "/onboarding"}>Request Private Access <ArrowRight className="ml-4 h-6 w-6" /></button>
                            </div>
                         </div>
                       )}
                    </motion.div>
                  )}

                  {activeTab === 'browse' && (
                    <motion.div key="browse-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-10">
                          {(["top", "gems", "all", ...NICHE_CATEGORIES] as const).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setBrowseCategory(cat)}
                              className={`btn-luxury px-6 h-12 text-[9px] ${browseCategory === cat ? 'active' : ''}`}
                            >
                              {cat === "top" ? "Elite Performance" : cat === "gems" ? "High Yield Gems" : cat === "all" ? "Master Index" : cat}
                            </button>
                          ))}
                       </div>

                       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {browseNiches.map((niche, i) => (
                            <NicheArtifact key={`${niche.keyword}-${i}`} niche={niche} index={i} />
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'search' && (
                    <motion.div key="search-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto pt-32">
                       <div className="relative mb-16">
                          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-[#222]" />
                          <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="INPUT QUERY PARAMETERS..."
                            className="w-full bg-[#050505] border border-white/5 focus:border-[#D4AF37]/40 h-20 pl-20 pr-10 text-xs font-black uppercase tracking-[0.5em] diamond-cut transition-all outline-none text-[#D4AF37]"
                          />
                          {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#222] hover:text-[#D4AF37]">
                               <X className="h-6 w-6" />
                            </button>
                          )}
                       </div>

                       {searchResults.length > 0 ? (
                         <div className="grid gap-6 sm:grid-cols-2">
                            {searchResults.slice(0, 24).map((niche, i) => (
                              <NicheArtifact key={`${niche.keyword}-${i}`} niche={niche} index={i} />
                            ))}
                         </div>
                       ) : (
                         <div className="text-center py-32 opacity-10">
                            <Workflow className="h-24 w-24 mx-auto mb-10 text-[#D4AF37]" />
                            <p className="text-[11px] font-black tracking-[0.8em] uppercase">Awaiting Strategic Input</p>
                         </div>
                       )}
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
