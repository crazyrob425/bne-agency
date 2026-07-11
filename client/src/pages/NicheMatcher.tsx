/**
 * BNE Niche Matcher Engine — Black & Gold Luxury Edition
 * Real 1,000+ niche database + 22 curated 2026 micro-niches. No simulated results.
 *
 * Subconscious mapping: users answer 20 psychometric questions that NEVER name a
 * fetish. Their answers become a 10-dimension psychological profile, which is matched
 * (cosine similarity) against each niche's psychological signature to surface the 3
 * perfect niches they would NOT have consciously named.
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
  Crown,
  Brain,
  Sparkles,
  Users,
  Package,
  Lightbulb,
  Heart,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";

// ─── COLOR MAPS (kept from legacy design) ─────────────────────────────────────

const EP_COLORS: Record<string, string> = {
  "very-high": "text-[oklch(0.78_0.16_85)] border-[oklch(0.78_0.16_85/30%)] bg-[oklch(0.78_0.16_85/10%)]",
  high: "text-[oklch(0.72_0.12_85)] border-[oklch(0.72_0.12_85/30%)] bg-[oklch(0.72_0.12_85/10%)]",
  medium: "text-[oklch(0.65_0.10_85)] border-[oklch(0.65_0.10_85/30%)] bg-[oklch(0.65_0.10_85/10%)]",
  low: "text-[oklch(0.55_0.08_85)] border-[oklch(0.55_0.08_85/30%)] bg-[oklch(0.55_0.08_85/10%)]",
};

const COMP_COLORS: Record<string, string> = {
  micro: "text-[oklch(0.78_0.16_85)]",
  low: "text-[oklch(0.72_0.12_85)]",
  medium: "text-[oklch(0.65_0.10_85)]",
  high: "text-[oklch(0.58_0.08_85)]",
  "very-high": "text-[oklch(0.50_0.06_85)]",
};

const EP_LABELS: Record<string, string> = {
  "very-high": "Elite",
  high: "High",
  medium: "Mid",
  low: "Base",
};

const COMP_LABELS: Record<string, string> = {
  micro: "Minimal",
  low: "Low",
  medium: "Moderate",
  high: "High",
  "very-high": "Saturated",
};

const SV_LABELS: Record<string, string> = {
  "very-high": "Massive",
  high: "High",
  medium: "Medium",
  low: "Low",
  micro: "Exclusive",
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

// ─── COMPACT CARD (for secondary matches / directory) ─────────────────────────

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
      className={`relative group rounded-xl border p-4 transition-all duration-200 cursor-default luxury-card
        ${
          highlight
            ? "border-[oklch(0.78_0.16_85/40%)] hover:border-[oklch(0.78_0.16_85/60%)]"
            : "border-[oklch(0.78_0.16_85/8%)] hover:border-[oklch(0.78_0.16_85/18%)]"
        }`}
    >
      {highlight && (
        <div className="absolute -top-2 -right-2">
          <span className="flex items-center gap-1 rounded-full bg-[oklch(0.78_0.16_85)] px-2 py-0.5 text-[10px] font-bold text-[oklch(0.04_0.005_85)]">
            <Star className="h-2.5 w-2.5 fill-current" /> TOP MATCH
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[oklch(0.94_0.01_85)] text-sm leading-tight truncate font-display">
            {niche.keyword}
          </p>
          <p className="text-[11px] text-[oklch(0.58_0.015_85)] mt-0.5 font-body">{niche.category}</p>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-bold font-mono-lux ${EP_COLORS[niche.earningPotential]}`}
        >
          {EP_LABELS[niche.earningPotential]}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 text-[oklch(0.58_0.015_85)]">
          <Eye className="h-3 w-3" />
          <span>{SV_LABELS[niche.searchVolume]}</span>
        </span>
        <span className="text-[oklch(0.78_0.16_85/15%)]">·</span>
        <span className={`flex items-center gap-1 ${COMP_COLORS[niche.competitionLevel]}`}>
          <Target className="h-3 w-3" />
          <span>{COMP_LABELS[niche.competitionLevel]} Competition</span>
        </span>
      </div>
    </motion.div>
  );
}

// ─── NICHE PROFILE CARD (full intelligence for the 3 perfect matches) ──────────

function InfoBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-[oklch(0.78_0.16_85/12%)] bg-[oklch(0.78_0.16_85/3%)] p-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[oklch(0.78_0.16_85)] font-body mb-1">
        <Icon className="h-3 w-3" /> {title}
      </p>
      <p className="text-xs text-[oklch(0.82_0.01_85)] font-body leading-relaxed">{text}</p>
    </div>
  );
}

function ProfileCard({ match, index }: { match: NicheMatch; index: number }) {
  const { niche } = match;
  const profile = niche.profile;
  const fit = Math.round(match.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="relative rounded-2xl border border-[oklch(0.78_0.16_85/35%)] bg-[oklch(0.78_0.16_85/4%)] p-5 luxury-card"
    >
      <div className="absolute -top-2 -right-2">
        <span className="flex items-center gap-1 rounded-full bg-[oklch(0.78_0.16_85)] px-2.5 py-0.5 text-[10px] font-bold text-[oklch(0.04_0.005_85)]">
          <Star className="h-2.5 w-2.5 fill-current" /> {fit}% FIT
        </span>
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] text-[oklch(0.78_0.16_85)] font-body">
        Perfect Match #{index + 1}
      </p>
      <h3 className="heading-md text-[oklch(0.94_0.01_85)] mt-1 font-display">{niche.keyword}</h3>
      <p className="text-[11px] text-[oklch(0.58_0.015_85)] font-body">{niche.category}</p>

      <p className="mt-3 text-sm text-[oklch(0.72_0.012_85)] font-body italic border-l-2 border-[oklch(0.78_0.16_85/40%)] pl-3">
        “{match.reason}”
      </p>

      {/* Confidence meter */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] font-body text-[oklch(0.58_0.015_85)] mb-1">
          <span>Alignment confidence</span>
          <span className="font-mono-lux">
            {fit >= 90
              ? "Exceptional"
              : fit >= 80
                ? "Strong"
                : fit >= 70
                  ? "Good"
                  : "Moderate"}
          </span>
        </div>
        <div className="h-1 rounded-full bg-[oklch(0.78_0.16_85/12%)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[oklch(0.78_0.16_85)]"
            style={{ width: `${fit}%` }}
          />
        </div>
      </div>

      {profile ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-[oklch(0.85_0.01_85)] font-body leading-relaxed">
            {profile.description}
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBlock icon={Users} title="Fanbase" text={profile.demographics} />
            <InfoBlock icon={DollarSign} title="Income" text={profile.income} />
            <InfoBlock icon={Flame} title="Engagement" text={profile.engagement} />
            <InfoBlock icon={Brain} title="Persona" text={profile.persona} />
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[oklch(0.78_0.16_85)] font-body mb-1.5">
              <Sparkles className="h-3 w-3" /> Related Niches
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.related.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-[oklch(0.78_0.16_85/20%)] px-2 py-0.5 text-[11px] text-[oklch(0.78_0.14_85)] font-body"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[oklch(0.78_0.16_85)] font-body mb-1.5">
              <Package className="h-3 w-3" /> Recommended Kit / Inventory
            </p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {profile.inventory.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs text-[oklch(0.82_0.01_85)] font-body"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.78_0.16_85)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[oklch(0.7_0.012_85)] font-body">
          Full niche-intelligence brief (demographics, income model, persona, kit) is unlocked on
          partnership. Core subconscious drivers:{" "}
          {match.drivers.map((d) => DIM_LABEL[d.key]).join(", ")}.
        </p>
      )}
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
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${color}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <p className="text-[10px] opacity-70 uppercase tracking-wider font-body">Strategic Index</p>
        <p className="text-xs font-bold font-mono-lux">{value}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NicheMatcher() {
  const { getVideoByKeyword } = useMediaCatalog();
  const nicheVideo = getVideoByKeyword("niche");
  const [activeTab, setActiveTab] = useState<"quiz" | "browse" | "search">("quiz");

  // Quiz state
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
  const currentStep = QUIZ_QUESTIONS[quizStep];
  const progress = ((quizStep + (quizComplete ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const handleQuizAnswer = useCallback(
    (value: string) => {
      const step = QUIZ_QUESTIONS[quizStep];
      if (step.type === "multi") {
        const current = (quizAnswers[step.id] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        setQuizAnswers((prev) => ({ ...prev, [step.id]: updated }));
      } else {
        setQuizAnswers((prev) => ({ ...prev, [step.id]: value }));
        setTimeout(() => {
          if (quizStep < QUIZ_QUESTIONS.length - 1) {
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
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep((s) => s + 1);
    } else {
      finishQuiz(quizAnswers);
    }
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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BNE Niche Matcher Quiz Engine",
    url: "https://blacklisted.studio/niche-matcher",
    description:
      "Proprietary database of 1,000+ adult industry sub-genres plus 22 curated 2026 micro-niches. Maps a creator's subconscious psychological profile to their 3 perfect, high-income niches in under 2 minutes.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Niche Matcher Quiz | Find Your High-Earning Niche"
        description="Answer 20 psychometric questions — never naming a fetish — and we map your subconscious profile to your 3 perfect, high-income adult content niches."
        canonical="/niche-matcher"
        schema={webAppSchema}
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)] py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/6%)] via-[oklch(0.04_0.005_85)] to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[oklch(0.78_0.16_85/4%)] blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)]">
              <Crown className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.78_0.14_85)] font-body">
                Complimentary Strategic Analysis
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-5">
              Decode Your{" "}
              <span className="gradient-text-gold">Subconscious Niche</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-body">
              We never ask you to pick a fetish. Answer{" "}
              <span className="font-semibold text-[oklch(0.78_0.16_85)]">20 quick personality questions</span>{" "}
              and our psychometric engine maps your latent profile onto{" "}
              <span className="font-semibold text-[oklch(0.78_0.16_85)]">{TOTAL_NICHE_COUNT.toLocaleString()} analyzed market segments</span>{" "}
              — surfacing the 3 high-income niches you'd never have named yourself.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <StatPill
                icon={Brain}
                label="Psych Dimensions"
                value="10 latent traits"
                color="border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/6%)] text-[oklch(0.78_0.16_85)]"
              />
              <StatPill
                icon={Diamond}
                label="Hidden Opportunities"
                value={`${getHiddenGems(999).length} identified`}
                color="border-[oklch(0.72_0.12_85/20%)] bg-[oklch(0.72_0.12_85/6%)] text-[oklch(0.72_0.12_85)]"
              />
              <StatPill
                icon={Flame}
                label="Elite-Tier Niches"
                value={`${NICHE_DATABASE.filter((n) => n.earningPotential === "very-high").length} sectors`}
                color="border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/6%)] text-[oklch(0.78_0.16_85)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Niche Domination Video Briefing ── */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold uppercase tracking-wider font-body">Exclusive Lecture</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Niche Domination & Market Survival</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Watch this brief guide to understand how we target high-value sub-genres and skip saturated content sectors.</p>
          </div>
          <VideoPlayer
            src={nicheVideo?.url || "/media-files/Niche_Domination___Survival.mp4"}
            title="Niche Domination & Survival"
            description="How to own a highly profitable, low-competition adult entertainment vertical."
          />
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-3 bg-[oklch(0.08_0.008_85)] border border-[oklch(0.78_0.16_85/12%)]">
            <TabsTrigger value="quiz" className="data-[state=active]:bg-[oklch(0.78_0.16_85)] data-[state=active]:text-[oklch(0.04_0.005_85)] font-body">
              <Zap className="mr-2 h-4 w-4" /> Analysis
            </TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-[oklch(0.78_0.16_85)] data-[state=active]:text-[oklch(0.04_0.005_85)] font-body">
              <Layers className="mr-2 h-4 w-4" /> Directory
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-[oklch(0.78_0.16_85)] data-[state=active]:text-[oklch(0.04_0.005_85)] font-body">
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
                    <div className="flex items-center justify-between text-xs text-[oklch(0.58_0.015_85)] mb-2 font-body">
                      <span>
                        {quizStep < 12
                          ? "Discovering your energy style..."
                          : quizStep < QUIZ_QUESTIONS.length - 5
                            ? "Mapping your edge..."
                            : "Locking your profile..."}
                      </span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-[oklch(0.78_0.16_85/8%)] [&>div]:bg-[oklch(0.78_0.16_85)]" />
                  </div>

                  {/* Question */}
                  <h2 className="heading-md text-[oklch(0.94_0.01_85)] mb-2">
                    {currentStep.question}
                  </h2>
                  <p className="text-sm text-[oklch(0.58_0.015_85)] mb-7 font-body">{currentStep.subtitle}</p>

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
                          className={`relative rounded-xl border p-4 text-left transition-all duration-150 luxury-card
                            ${
                              isSelected
                                ? "border-[oklch(0.78_0.16_85/40%)] bg-[oklch(0.78_0.16_85/8%)]"
                                : "border-[oklch(0.78_0.16_85/8%)] hover:border-[oklch(0.78_0.16_85/18%)]"
                            }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="absolute top-2.5 right-2.5 h-4 w-4 text-[oklch(0.78_0.16_85)]" />
                          )}
                          <span className="text-xl">{opt.icon}</span>
                          <p className="mt-2.5 text-sm font-medium leading-tight font-body text-[oklch(0.88_0.01_85)]">{opt.label}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Multi-select next button */}
                  {currentStep.type === "multi" && (
                    <div className="mt-7 flex items-center gap-3">
                      <Button
                        onClick={handleMultiNext}
                        disabled={!((quizAnswers[currentStep.id] as string[])?.length > 0)}
                        className="bg-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.72_0.12_85)] text-[oklch(0.04_0.005_85)] font-body"
                      >
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? (
                          <>Continue <ChevronRight className="ml-1.5 h-4 w-4" /></>
                        ) : (
                          <>Generate Analysis <Zap className="ml-1.5 h-4 w-4" /></>
                        )}
                      </Button>
                      {quizStep > 0 && (
                        <Button
                          variant="ghost"
                          onClick={() => setQuizStep((s) => s - 1)}
                          className="text-[oklch(0.58_0.015_85)] hover:text-[oklch(0.78_0.16_85)] font-body"
                        >
                          <ChevronLeft className="mr-1.5 h-4 w-4" /> Return
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Single-select back button */}
                  {currentStep.type === "single" && quizStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => setQuizStep((s) => s - 1)}
                      className="mt-5 text-[oklch(0.58_0.015_85)] hover:text-[oklch(0.78_0.16_85)] font-body"
                    >
                      <ChevronLeft className="mr-1.5 h-4 w-4" /> Return
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
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <CheckCircle2 className="h-5 w-5 text-[oklch(0.78_0.16_85)]" />
                        <h2 className="heading-md text-[oklch(0.94_0.01_85)]">
                          Subconscious Profile Decoded
                        </h2>
                      </div>
                      {quizInsight && (
                        <div className="flex items-center gap-2 mb-1.5">
                          <Brain className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
                          <span className="text-sm font-semibold text-[oklch(0.78_0.16_85)] font-body">
                            Latent signature: {quizInsight.headline}
                          </span>
                        </div>
                      )}
                      {attachment && (
                        <div className="flex items-center gap-2 mb-1.5">
                          <Heart className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
                          <span className="text-xs font-semibold text-[oklch(0.78_0.16_85)] font-body">
                            Attachment pattern: {attachment.quadrant.replace(/-/g, " ")}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-[oklch(0.65_0.012_85)] font-body">
                        {quizResults?.matches.length} niche segments ranked by psychological affinity vs. market saturation — your elite opportunity zones.
                      </p>
                      {quizInsight && (
                        <p className="mt-2 text-sm text-[oklch(0.7_0.012_85)] font-body max-w-3xl leading-relaxed">
                          {quizInsight.summary}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={resetQuiz}
                      className="border-[oklch(0.78_0.16_85/20%)] text-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.78_0.16_85/8%)] font-body"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> Recalibrate
                    </Button>
                  </div>

                  {/* Top 3 featured — full profile cards */}
                  {quizResults && quizResults.matches.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.16_85)] mb-4 font-body flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5" /> Your 3 Perfect Niche Matches
                      </p>
                      <div className="grid gap-4 lg:grid-cols-3">
                        {quizResults.matches.slice(0, 3).map((match, i) => (
                          <ProfileCard key={match.niche.keyword} match={match} index={i} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Secondary matches */}
                  {quizResults && quizResults.matches.length > 3 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.58_0.015_85)] mb-4 font-body">
                        Secondary Matches
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {quizResults.matches.slice(3).map((match, i) => (
                          <NicheCard key={match.niche.keyword} niche={match.niche} index={i + 3} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-10 rounded-2xl border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/4%)] p-7">
                    <h3 className="heading-md text-[oklch(0.94_0.01_85)] mb-2">
                      Ready to Execute?
                    </h3>
                    <p className="text-sm text-[oklch(0.65_0.012_85)] mb-5 font-body">
                      BNE architects your complete brand strategy around these identified segments — content calendar, platform infrastructure, pricing architecture, legal compliance. You provide the vision. We engineer the enterprise.
                    </p>
                    <Button
                      className="bg-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.72_0.12_85)] text-[oklch(0.04_0.005_85)] font-body"
                      onClick={() => (window.location.href = "/onboarding")}
                    >
                      Apply for Strategic Partnership <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Secondary CTAs */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[oklch(0.78_0.16_85/12%)] bg-[oklch(0.78_0.16_85/2%)] p-5">
                      <h4 className="text-sm font-semibold text-[oklch(0.94_0.01_85)] font-body mb-1">
                        Claim This Blueprint
                      </h4>
                      <p className="text-xs text-[oklch(0.65_0.012_85)] font-body mb-3">
                        Get a custom launch plan for your top 3 niches — first-content prompts, pricing strategy, and week-by-week growth calendar.
                      </p>
                      <Button
                        variant="outline"
                        className="border-[oklch(0.78_0.16_85/25%)] text-[oklch(0.78_0.14_85)] hover:bg-[oklch(0.78_0.16_85/8%)] font-body text-xs"
                      >
                        Get My Blueprint <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="rounded-xl border border-[oklch(0.78_0.16_85/12%)] bg-[oklch(0.78_0.16_85/2%)] p-5">
                      <h4 className="text-sm font-semibold text-[oklch(0.94_0.01_85)] font-body mb-1">
                        Deeper Signal Available
                      </h4>
                      <p className="text-xs text-[oklch(0.65_0.012_85)] font-body mb-3">
                        15 additional deep-signal questions refine your match precision to near-clinical accuracy. Takes ~4 minutes.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={resetQuiz}
                        className="text-[oklch(0.78_0.14_85)] hover:text-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.78_0.16_85/6%)] font-body text-xs"
                      >
                        <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Deep Dive Mode
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* ── BROWSE TAB ── */}
          <TabsContent value="browse">
            <div className="flex flex-wrap gap-2 mb-6">
              {(["top", "gems", "all", ...NICHE_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBrowseCategory(cat as typeof browseCategory)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 font-body
                    ${
                      browseCategory === cat
                        ? "border-[oklch(0.78_0.16_85/40%)] bg-[oklch(0.78_0.16_85/12%)] text-[oklch(0.78_0.16_85)]"
                        : "border-[oklch(0.78_0.16_85/10%)] bg-[oklch(0.78_0.16_85/3%)] text-[oklch(0.58_0.015_85)] hover:border-[oklch(0.78_0.16_85/18%)] hover:text-[oklch(0.78_0.16_85)]"
                    }`}
                >
                  {cat === "top" ? "Elite Performers" : cat === "gems" ? "Hidden Gems" : cat === "all" ? "Full Index" : cat}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs text-[oklch(0.58_0.015_85)] mr-1 font-body">
                <Filter className="h-3.5 w-3.5" /> Refine:
              </span>
              {(["very-high", "high", "medium"] as const).map((ep) => (
                <button
                  key={ep}
                  onClick={() =>
                    setBrowseFilter((f) => ({ ...f, ep: f.ep === ep ? undefined : ep }))
                  }
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold transition-all duration-150 font-mono-lux
                    ${
                      browseFilter.ep === ep
                        ? EP_COLORS[ep]
                        : "border-[oklch(0.78_0.16_85/10%)] text-[oklch(0.58_0.015_85)] hover:border-[oklch(0.78_0.16_85/18%)]"
                    }`}
                >
                  {EP_LABELS[ep]} Tier
                </button>
              ))}
              {(["micro", "low", "medium"] as const).map((comp) => (
                <button
                  key={comp}
                  onClick={() =>
                    setBrowseFilter((f) => ({ ...f, comp: f.comp === comp ? undefined : comp }))
                  }
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-150 font-body
                    ${
                      browseFilter.comp === comp
                        ? `${COMP_COLORS[comp]} border-current bg-current/10`
                        : "border-[oklch(0.78_0.16_85/10%)] text-[oklch(0.58_0.015_85)] hover:border-[oklch(0.78_0.16_85/18%)]"
                    }`}
                >
                  {COMP_LABELS[comp]} Competition
                </button>
              ))}
              {(browseFilter.ep || browseFilter.comp) && (
                <button
                  onClick={() => setBrowseFilter({})}
                  className="flex items-center gap-1.5 rounded-full border border-[oklch(0.78_0.16_85/20%)] px-3 py-1 text-[11px] text-[oklch(0.78_0.16_85)] hover:border-[oklch(0.78_0.16_85/35%)] font-body"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
            </div>

            <div className="mb-3 text-xs text-[oklch(0.58_0.015_85)] font-body">
              Displaying {browseNiches.length} of {TOTAL_NICHE_COUNT.toLocaleString()} indexed segments
              {browseCategory === "gems" && (
                <span className="ml-2 text-[oklch(0.78_0.16_85)]">
                  — High potential, low competition = immediate opportunity
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
                <Search className="absolute left-3.5 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-[oklch(0.58_0.015_85)]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search strategic segments... (e.g. femdom, findom, cosplay)"
                  className="pl-10 bg-[oklch(0.08_0.008_85)] border-[oklch(0.78_0.16_85/12%)] text-[oklch(0.94_0.01_85)] placeholder:text-[oklch(0.58_0.015_85)] focus:border-[oklch(0.78_0.16_85/30%)] h-12 font-body"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.58_0.015_85)] hover:text-[oklch(0.78_0.16_85)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {searchQuery.length < 2 && (
                <div className="text-center py-14 text-[oklch(0.58_0.015_85)]">
                  <Search className="h-14 w-14 mx-auto mb-4 opacity-20" />
                  <p className="font-body">Enter a minimum of 2 characters to query the index</p>
                  <p className="text-xs mt-1.5 font-mono-lux text-[oklch(0.45_0.01_85/70%)]">
                    Searching {TOTAL_NICHE_COUNT.toLocaleString()} strategic segments in real-time
                  </p>
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-14 text-[oklch(0.58_0.015_85)]">
                  <p className="font-body">No segments match "{searchQuery}"</p>
                  <p className="text-xs mt-1.5 font-body">Refine your query or explore the full directory</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <>
                  <p className="text-xs text-[oklch(0.58_0.015_85)] mb-5 font-mono-lux">
                    {searchResults.length} segments match "{searchQuery}"
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {searchResults.slice(0, 40).map((niche, i) => (
                      <NicheCard key={`${niche.keyword}-${i}`} niche={niche} index={i} />
                    ))}
                  </div>
                  {searchResults.length > 40 && (
                    <p className="mt-5 text-center text-xs text-[oklch(0.45_0.01_85/70%)] font-body">
                      Displaying top 40 of {searchResults.length} results. Refine for precision.
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
