/**
 * BNE Niche Matcher Engine
 * Design: Noir Hacker Syndicate — slate-950 base, violet-500 + emerald-400 neon accents
 * Real 1,053-niche database. No simulated results.
 *
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
} from "lucide-react";
import {
  NICHE_DATABASE,
  NICHE_CATEGORIES,
  searchNiches,
  getNichesByCategory,
  getTopNiches,
  getHiddenGems,
  matchNichesByQuiz,
  TOTAL_NICHE_COUNT,
  type Niche,
  type NicheCategory,
} from "@/data/nicheDatabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ─── QUIZ STEPS ───────────────────────────────────────────────────────────────

interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multi";
  options: { label: string; value: string; icon?: string }[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "dynamic",
    question: "What power dynamic are you working with?",
    subtitle: "This is the foundation of your whole brand identity — be real",
    type: "single",
    options: [
      { label: "Dominant / FemDom", value: "femdom", icon: "👑" },
      { label: "Submissive", value: "submissive", icon: "🔗" },
      { label: "Switch (Both)", value: "switch", icon: "⚡" },
      { label: "Vanilla / Neutral", value: "vanilla", icon: "🌸" },
      { label: "GFE / Relationship", value: "gfe", icon: "💌" },
      { label: "Taboo / Roleplay", value: "roleplay", icon: "🎭" },
    ],
  },
  {
    id: "contentType",
    question: "What kind of content do you actually want to make?",
    subtitle: "Pick everything that fits — more selections = better matches for you",
    type: "multi",
    options: [
      { label: "Solo Play", value: "solo", icon: "🔥" },
      { label: "BDSM / Kink", value: "bdsm", icon: "⛓️" },
      { label: "Fetish Content", value: "fetish", icon: "👠" },
      { label: "Roleplay / Fantasy", value: "roleplay", icon: "🎭" },
      { label: "Couples / Collab", value: "couples", icon: "💞" },
      { label: "Audio / ASMR", value: "asmr", icon: "🎙️" },
      { label: "Cosplay / Costume", value: "cosplay", icon: "🦸" },
      { label: "Outdoor / Public", value: "outdoor", icon: "🌿" },
    ],
  },
  {
    id: "bodyType",
    question: "What's your physical brand?",
    subtitle: "Be honest — your body type is literally a niche category and that's your power",
    type: "single",
    options: [
      { label: "Petite / Small Frame", value: "petite", icon: "🌸" },
      { label: "Athletic / Fit", value: "athletic", icon: "💪" },
      { label: "Curvy / Thick", value: "curvy", icon: "🍑" },
      { label: "BBW / Plus Size", value: "bbw", icon: "✨" },
      { label: "MILF / Mature", value: "milf", icon: "🔥" },
      { label: "Alt / Goth / Tatted", value: "goth", icon: "🖤" },
      { label: "Trans / Non-Binary", value: "trans", icon: "🏳️‍⚧️" },
      { label: "Femboy / Crossdresser", value: "femboy", icon: "🌈" },
    ],
  },
  {
    id: "audience",
    question: "Who are you making content for?",
    subtitle: "Knowing your buyer is everything — this shapes your whole strategy",
    type: "single",
    options: [
      { label: "Foot / Fetish Fans", value: "foot fetish", icon: "👣" },
      { label: "BDSM / Kink Community", value: "bdsm", icon: "⛓️" },
      { label: "Vanilla / Mainstream", value: "vanilla", icon: "🌸" },
      { label: "Cuckolds / Hotwife Fans", value: "cuckold", icon: "♠️" },
      { label: "FinDom / Paypigs", value: "findom", icon: "💸" },
      { label: "Anime / Cosplay Fans", value: "cosplay anime", icon: "🎌" },
      { label: "Gay / Queer Audience", value: "gay lesbian", icon: "🏳️‍🌈" },
      { label: "General Adult Fans", value: "amateur", icon: "🎬" },
    ],
  },
  {
    id: "format",
    question: "How do you actually want to create?",
    subtitle: "Match your workflow to your niche so you don't burn out in month two",
    type: "single",
    options: [
      { label: "Short Clips / Reels", value: "short clips", icon: "📱" },
      { label: "Long Full Scenes", value: "long videos full scene", icon: "🎬" },
      { label: "Photo Sets", value: "photo sets", icon: "📸" },
      { label: "Live Streaming", value: "live streaming", icon: "📡" },
      { label: "Custom Videos", value: "custom videos", icon: "🎯" },
      { label: "Audio Only", value: "audio only", icon: "🎙️" },
      { label: "Sexting / DMs", value: "sexting", icon: "💬" },
      { label: "Try-On / Tease", value: "tease strip", icon: "👗" },
    ],
  },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

const EP_COLORS: Record<string, string> = {
  "very-high": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  high: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  low: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

const COMP_COLORS: Record<string, string> = {
  micro: "text-emerald-400",
  low: "text-teal-400",
  medium: "text-amber-400",
  high: "text-orange-400",
  "very-high": "text-red-400",
};

const EP_LABELS: Record<string, string> = {
  "very-high": "$$$$",
  high: "$$$",
  medium: "$$",
  low: "$",
};

const COMP_LABELS: Record<string, string> = {
  micro: "Micro",
  low: "Low",
  medium: "Medium",
  high: "High",
  "very-high": "Saturated",
};

const SV_LABELS: Record<string, string> = {
  "very-high": "Massive",
  high: "High",
  medium: "Medium",
  low: "Low",
  micro: "Niche",
};

function NicheCard({
  niche,
  index,
  highlight,
}: {
  niche: Niche;
  index: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`relative group rounded-xl border p-4 transition-all duration-200 cursor-default
        ${
          highlight
            ? "border-violet-500/50 bg-violet-500/5 hover:border-violet-400/70 hover:bg-violet-500/10"
            : "border-slate-700/60 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60"
        }`}
    >
      {highlight && (
        <div className="absolute -top-2 -right-2">
          <span className="flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-bold text-white">
            <Star className="h-2.5 w-2.5 fill-current" /> TOP MATCH
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-100 text-sm leading-tight truncate">
            {niche.keyword}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{niche.category}</p>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-bold font-mono ${EP_COLORS[niche.earningPotential]}`}
        >
          {EP_LABELS[niche.earningPotential]}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 text-slate-400">
          <Eye className="h-3 w-3" />
          <span>{SV_LABELS[niche.searchVolume]}</span>
        </span>
        <span className="text-slate-700">·</span>
        <span className={`flex items-center gap-1 ${COMP_COLORS[niche.competitionLevel]}`}>
          <Target className="h-3 w-3" />
          <span>{COMP_LABELS[niche.competitionLevel]} Competition</span>
        </span>
      </div>
    </motion.div>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${color}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <p className="text-[10px] opacity-70 uppercase tracking-wider">{label}</p>
        <p className="text-xs font-bold">{value}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NicheMatcher() {
  const [activeTab, setActiveTab] = useState<"quiz" | "browse" | "search">("quiz");

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | string[]>>({});
  const [quizResults, setQuizResults] = useState<Niche[] | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Browse state
  const [browseCategory, setBrowseCategory] = useState<NicheCategory | "all" | "gems" | "top">(
    "top"
  );
  const [browseFilter, setBrowseFilter] = useState<{
    ep?: Niche["earningPotential"];
    comp?: Niche["competitionLevel"];
  }>({});

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useMemo(
    () => (searchQuery.length >= 2 ? searchNiches(searchQuery) : []),
    [searchQuery]
  );

  // Quiz logic
  const currentStep = QUIZ_STEPS[quizStep];
  const progress = ((quizStep + (quizComplete ? 1 : 0)) / QUIZ_STEPS.length) * 100;

  const handleQuizAnswer = useCallback(
    (value: string) => {
      const step = QUIZ_STEPS[quizStep];
      if (step.type === "multi") {
        const current = (quizAnswers[step.id] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        setQuizAnswers((prev) => ({ ...prev, [step.id]: updated }));
      } else {
        setQuizAnswers((prev) => ({ ...prev, [step.id]: value }));
        // Auto-advance for single select
        setTimeout(() => {
          if (quizStep < QUIZ_STEPS.length - 1) {
            setQuizStep((s) => s + 1);
          } else {
            finishQuiz({ ...quizAnswers, [step.id]: value });
          }
        }, 300);
      }
    },
    [quizStep, quizAnswers]
  );

  const handleMultiNext = useCallback(() => {
    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep((s) => s + 1);
    } else {
      finishQuiz(quizAnswers);
    }
  }, [quizStep, quizAnswers]);

  const finishQuiz = useCallback((answers: Record<string, string | string[]>) => {
    const contentType = answers.contentType as string[] | undefined;
    const bodyType = answers.bodyType as string | undefined;
    const dynamic = answers.dynamic as string | undefined;
    const format = answers.format as string | undefined;
    const audience = answers.audience as string | undefined;

    const results = matchNichesByQuiz({
      contentType,
      bodyType,
      dynamic,
      format,
      audience,
    });
    setQuizResults(results);
    setQuizComplete(true);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResults(null);
    setQuizComplete(false);
  }, []);

  // Browse niches
  const browseNiches = useMemo(() => {
    let niches: Niche[];
    if (browseCategory === "top") {
      niches = getTopNiches(60, browseFilter.ep ? { earningPotential: browseFilter.ep } : undefined);
    } else if (browseCategory === "gems") {
      niches = getHiddenGems(60);
    } else if (browseCategory === "all") {
      niches = [...NICHE_DATABASE];
    } else {
      niches = getNichesByCategory(browseCategory);
    }

    if (browseFilter.ep) niches = niches.filter((n) => n.earningPotential === browseFilter.ep);
    if (browseFilter.comp)
      niches = niches.filter((n) => n.competitionLevel === browseFilter.comp);

    return niches.slice(0, 80);
  }, [browseCategory, browseFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-slate-950 to-emerald-950/20" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139,92,246,0.3) 30px, rgba(139,92,246,0.3) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(139,92,246,0.3) 30px, rgba(139,92,246,0.3) 31px)",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
                Free Niche Finder — No Sign-Up Required
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Money Niche
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              We've got{" "}
              <span className="font-bold text-violet-400">{TOTAL_NICHE_COUNT.toLocaleString()} real niches</span>{" "}
              in here — kinks, fetishes, body types, archetypes, BDSM sub-niches, all of it.
              No fluff, no SFW filler. Just the categories that actually make money.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <StatPill
                icon={Layers}
                label="Total Niches"
                value={`${TOTAL_NICHE_COUNT.toLocaleString()}+`}
                color="border-violet-500/30 bg-violet-500/10 text-violet-300"
              />
              <StatPill
                icon={Diamond}
                label="Hidden Gems"
                value={`${getHiddenGems(999).length} found`}
                color="border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              />
              <StatPill
                icon={Flame}
                label="Very-High Earners"
                value={`${NICHE_DATABASE.filter((n) => n.earningPotential === "very-high").length} niches`}
                color="border-amber-500/30 bg-amber-500/10 text-amber-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="container py-10">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-3 bg-slate-900 border border-slate-800">
            <TabsTrigger value="quiz" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              <Zap className="mr-2 h-4 w-4" /> Quiz
            </TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              <Layers className="mr-2 h-4 w-4" /> Browse
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              <Search className="mr-2 h-4 w-4" /> Search
            </TabsTrigger>
          </TabsList>

          {/* ── QUIZ TAB ── */}
          <TabsContent value="quiz">
            <AnimatePresence mode="wait">
              {!quizComplete ? (
                <motion.div
                  key={`step-${quizStep}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-2xl"
                >
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Step {quizStep + 1} of {QUIZ_STEPS.length}</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-slate-800 [&>div]:bg-violet-500" />
                  </div>

                  {/* Question */}
                  <h2 className="font-display text-2xl font-bold text-slate-100 mb-1">
                    {currentStep.question}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">{currentStep.subtitle}</p>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {currentStep.options.map((opt) => {
                      const isSelected =
                        currentStep.type === "multi"
                          ? ((quizAnswers[currentStep.id] as string[]) || []).includes(opt.value)
                          : quizAnswers[currentStep.id] === opt.value;

                      return (
                        <motion.button
                          key={opt.value}
                          onClick={() => handleQuizAnswer(opt.value)}
                          whileTap={{ scale: 0.97 }}
                          className={`relative rounded-xl border p-4 text-left transition-all duration-150
                            ${
                              isSelected
                                ? "border-violet-500 bg-violet-500/15 text-violet-200"
                                : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                            }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-violet-400" />
                          )}
                          <span className="text-xl">{opt.icon}</span>
                          <p className="mt-2 text-sm font-medium leading-tight">{opt.label}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Multi-select next button */}
                  {currentStep.type === "multi" && (
                    <div className="mt-6 flex items-center gap-3">
                      <Button
                        onClick={handleMultiNext}
                        disabled={!((quizAnswers[currentStep.id] as string[])?.length > 0)}
                        className="bg-violet-600 hover:bg-violet-500 text-white"
                      >
                        {quizStep < QUIZ_STEPS.length - 1 ? (
                          <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                        ) : (
                          <>Find My Niches <Zap className="ml-1 h-4 w-4" /></>
                        )}
                      </Button>
                      {quizStep > 0 && (
                        <Button
                          variant="ghost"
                          onClick={() => setQuizStep((s) => s - 1)}
                          className="text-slate-400 hover:text-slate-200"
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" /> Back
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Single-select back button */}
                  {currentStep.type === "single" && quizStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => setQuizStep((s) => s - 1)}
                      className="mt-4 text-slate-400 hover:text-slate-200"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" /> Back
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Results header */}
                  <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <h2 className="font-display text-2xl font-bold text-slate-100">
                          Here Are Your Niches, Sis
                        </h2>
                      </div>
                      <p className="text-sm text-slate-400">
                        {quizResults?.length} niches ranked by earning potential vs. competition — these are your real opportunity zones.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={resetQuiz}
                      className="border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
                    </Button>
                  </div>

                  {/* Top 3 featured */}
                  {quizResults && quizResults.length > 0 && (
                    <div className="mb-8">
                      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        🏆 Your Best Matches
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {quizResults.slice(0, 3).map((niche, i) => (
                          <NicheCard key={niche.keyword} niche={niche} index={i} highlight />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining results */}
                  {quizResults && quizResults.length > 3 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                        More Matches Worth Looking At
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {quizResults.slice(3).map((niche, i) => (
                          <NicheCard key={niche.keyword} niche={niche} index={i + 3} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-10 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6">
                    <h3 className="font-display text-lg font-bold text-slate-100 mb-2">
                      Ready to actually build this?
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      BNE builds your whole brand strategy around these niches — content calendar, platform setup, pricing, legal compliance, all of it. You just have to say yes.
                    </p>
                    <Button
                      className="bg-violet-600 hover:bg-violet-500 text-white"
                      onClick={() => window.location.href = "/onboarding"}
                    >
                      Apply to Work With BNE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* ── BROWSE TAB ── */}
          <TabsContent value="browse">
            <div className="flex flex-wrap gap-2 mb-6">
              {/* Category pills */}
              {(["top", "gems", "all", ...NICHE_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBrowseCategory(cat as typeof browseCategory)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150
                    ${
                      browseCategory === cat
                        ? "border-violet-500 bg-violet-500/20 text-violet-300"
                        : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                    }`}
                >
                  {cat === "top" ? "🔥 Top Earners" : cat === "gems" ? "💎 Hidden Gems" : cat === "all" ? "All Niches" : cat}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500 mr-1">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {(["very-high", "high", "medium"] as const).map((ep) => (
                <button
                  key={ep}
                  onClick={() =>
                    setBrowseFilter((f) => ({ ...f, ep: f.ep === ep ? undefined : ep }))
                  }
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold transition-all duration-150
                    ${
                      browseFilter.ep === ep
                        ? EP_COLORS[ep]
                        : "border-slate-700 text-slate-500 hover:border-slate-500"
                    }`}
                >
                  {EP_LABELS[ep]} Earning
                </button>
              ))}
              {(["micro", "low", "medium"] as const).map((comp) => (
                <button
                  key={comp}
                  onClick={() =>
                    setBrowseFilter((f) => ({ ...f, comp: f.comp === comp ? undefined : comp }))
                  }
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all duration-150
                    ${
                      browseFilter.comp === comp
                        ? `${COMP_COLORS[comp]} border-current bg-current/10`
                        : "border-slate-700 text-slate-500 hover:border-slate-500"
                    }`}
                >
                  {COMP_LABELS[comp]} Competition
                </button>
              ))}
              {(browseFilter.ep || browseFilter.comp) && (
                <button
                  onClick={() => setBrowseFilter({})}
                  className="flex items-center gap-1 rounded-full border border-red-500/30 px-2.5 py-0.5 text-[11px] text-red-400 hover:border-red-400"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
            </div>

            <div className="mb-3 text-xs text-slate-500">
              Showing {browseNiches.length} niches
              {browseCategory === "gems" && (
                <span className="ml-2 text-emerald-400">
                  — High earning potential + low competition = the bag is right there
                </span>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {browseNiches.map((niche, i) => (
                <NicheCard key={`${niche.keyword}-${i}`} niche={niche} index={i} />
              ))}
            </div>
          </TabsContent>

          {/* ── SEARCH TAB ── */}
          <TabsContent value="search">
            <div className="max-w-xl">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 1,053+ niches... (e.g. femdom, foot, MILF, cosplay)"
                  className="pl-10 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 h-12"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {searchQuery.length < 2 && (
                <div className="text-center py-12 text-slate-600">
                  <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Type at least 2 characters to search</p>
                  <p className="text-xs mt-1">Searching across all {TOTAL_NICHE_COUNT} niches in real-time</p>
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-12 text-slate-600">
                  <p>No niches found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">Try a different term or browse by category</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <>
                  <p className="text-xs text-slate-500 mb-4">
                    {searchResults.length} results for "{searchQuery}"
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {searchResults.slice(0, 40).map((niche, i) => (
                      <NicheCard key={`${niche.keyword}-${i}`} niche={niche} index={i} />
                    ))}
                  </div>
                  {searchResults.length > 40 && (
                    <p className="mt-4 text-center text-xs text-slate-600">
                      Showing top 40 of {searchResults.length} results. Refine your search for more precision.
                    </p>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
