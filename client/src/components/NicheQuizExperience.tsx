/**
 * NicheQuizExperience — Single-screen luxury quiz console.
 *
 * Fully contained, viewport-fitting quiz interface with no vertical scrolling.
 * Designed as a "bespoke control console" with luxury tech aesthetics:
 * knurled metal, sapphire glass, diamond-cut edges, depth shadows.
 */

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  computeAttachmentVector,
  type QuizAnswers,
} from "@/data/nicheQuiz";
import {
  matchNicheFinder,
  getSubconsciousInsight,
  type MatchResult,
  type NicheMatch,
  type SubconsciousInsight,
} from "@/data/nicheMatcherEngine";
import {
  Crown,
  Shield,
  Zap,
  Heart,
  Eye,
  Lock,
  Flame,
  Gem,
  Compass,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ArrowRight,
  Dna,
  Activity,
  Target,
  Brain,
  Sparkles,
  Users,
  DollarSign,
  X,
  CheckCircle2,
} from "lucide-react";

// ─── ICON MAP ────────────────────────────────────────────────────────────────

const QUIZ_ICON_MAP: Record<string, React.ElementType> = {
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
  cpu: () => null,
  layers: () => null,
  search: () => null,
  users: Users,
  dollar: DollarSign,
  flame: Flame,
  brain: Brain,
  package: () => null,
  lightbulb: () => null,
  trending: () => null,
  clipboard: () => null,
  briefcase: () => null,
  history: () => null,
  scale: () => null,
  camera: () => null,
  eyeoff: () => null,
  door: () => null,
  sword: () => null,
  crosshair: () => null,
  burn: Flame,
  smartphone: () => null,
  coffee: () => null,
};

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface NicheQuizExperienceProps {
  onComplete?: (result: MatchResult, insight: SubconsciousInsight, attachment: { anxiety: number; avoidance: number; quadrant: string }) => void;
  onReset?: () => void;
  initialAnswers?: QuizAnswers;
  progressApi?: {
    save: (payload: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number }) => void;
    complete: (payload: { answers: QuizAnswers; resultSnapshot: unknown }) => void;
    registerExit: (state: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number }) => void;
    saved: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number; completed: boolean } | null;
  };
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.04 },
  },
};

const staggerItem = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
};

// ─── HELPER: Dynamic clamp-based font sizing ─────────────────────────────────

function dynClamp(min: number, preferred: number, max: number, viewport: number) {
  // Returns a CSS clamp() string for fluid typography
  return `clamp(${min}px, ${preferred}vw, ${max}px)`;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function NicheQuizExperience({
  onComplete,
  onReset,
  initialAnswers = {},
  progressApi,
}: NicheQuizExperienceProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [complete, setComplete] = useState(false);
  const [results, setResults] = useState<MatchResult | null>(null);
  const [insight, setInsight] = useState<SubconsciousInsight | null>(null);
  const [attachment, setAttachment] = useState<{ anxiety: number; avoidance: number; quadrant: string } | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | string[] | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const currentQuestion = QUIZ_QUESTIONS[step];
  const progress = ((step + (complete ? 1 : 0)) / TOTAL_QUESTIONS) * 100;

  // Sync selectedValue with answers when step changes
  useEffect(() => {
    setSelectedValue(answers[currentQuestion.id] ?? null);
  }, [step, answers, currentQuestion.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentQuestion.type === "single" && selectedValue) {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedValue, currentQuestion.type]);

  const handleNext = useCallback(() => {
    if (currentQuestion.type === "multi") {
      const current = (selectedValue as string[]) || [];
      if (current.length === 0) return;
    } else if (!selectedValue) {
      return;
    }

    if (step < TOTAL_QUESTIONS - 1) {
      setDirection("forward");
      setStep((s) => s + 1);
    } else {
      // Finish quiz
      const finalAnswers = currentQuestion.type === "multi"
        ? { ...answers, [currentQuestion.id]: selectedValue as string[] }
        : { ...answers, [currentQuestion.id]: selectedValue as string };

      const attachmentVec = computeAttachmentVector(finalAnswers);
      const matchResult = matchNicheFinder(finalAnswers, attachmentVec);
      const insightResult = getSubconsciousInsight(finalAnswers);

      setAttachment({
        anxiety: attachmentVec.anxiety,
        avoidance: attachmentVec.avoidance,
        quadrant: attachmentVec.quadrant,
      });
      setResults(matchResult);
      setInsight(insightResult);
      setComplete(true);
      progressApi?.complete({
        answers: finalAnswers,
        resultSnapshot: matchResult,
      });
      onComplete?.(matchResult, insightResult, {
        anxiety: attachmentVec.anxiety,
        avoidance: attachmentVec.avoidance,
        quadrant: attachmentVec.quadrant,
      });
    }
  }, [step, selectedValue, answers, currentQuestion, onComplete, progressApi]);

  const handleSelect = useCallback(
    (value: string) => {
      if (currentQuestion.type === "multi") {
        const current = (selectedValue as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        setSelectedValue(updated);
        setAnswers((prev) => {
          const next = { ...prev, [currentQuestion.id]: updated };
          progressApi?.save({
            lastCompletedQuestionId: currentQuestion.id,
            answers: next,
            questionsAnswered: Object.keys(next).length,
          });
          progressApi?.registerExit({
            lastCompletedQuestionId: currentQuestion.id,
            answers: next,
            questionsAnswered: Object.keys(next).length,
          });
          return next;
        });
      } else {
        setSelectedValue(value);
        setAnswers((prev) => {
          const next = { ...prev, [currentQuestion.id]: value };
          progressApi?.save({
            lastCompletedQuestionId: currentQuestion.id,
            answers: next,
            questionsAnswered: Object.keys(next).length,
          });
          progressApi?.registerExit({
            lastCompletedQuestionId: currentQuestion.id,
            answers: next,
            questionsAnswered: Object.keys(next).length,
          });
          return next;
        });
        // Auto-advance after brief delay for single-select
        setTimeout(() => handleNext(), 280);
      }
    },
    [currentQuestion, selectedValue, handleNext, progressApi]
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setDirection("backward");
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleReset = useCallback(() => {
    setStep(0);
    setAnswers({});
    setComplete(false);
    setResults(null);
    setInsight(null);
    setAttachment(null);
    setSelectedValue(null);
    onReset?.();
  }, [onReset]);

  // ─── RENDER: ACTIVE QUESTION ────────────────────────────────────────────────

  const renderQuestion = () => {
    const isMulti = currentQuestion.type === "multi";
    const maxSelect = currentQuestion.maxSelect || 0;
    const selectedCount = isMulti ? ((selectedValue as string[]) || []).length : 0;
    const canProceed = isMulti ? selectedCount > 0 : !!selectedValue;

    return (
      <motion.div
        key={currentQuestion.id}
        {...fadeIn}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-[#D4AF37] uppercase"
                style={{ fontSize: dynClamp(9, 1.1, 11, 1200) }}
              >
                Protocol {step + 1} / {TOTAL_QUESTIONS}
              </span>
              <div className="hidden sm:flex items-center gap-1.5 text-[#333]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Core Engaged</span>
              </div>
            </div>
            <h2
              className="text-[#F4F4EE] leading-[1.15] mb-2 font-display"
              style={{ fontSize: dynClamp(20, 3.2, 42, 1200) }}
            >
              {currentQuestion.question}
            </h2>
            <p
              className="text-[#555] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]"
              style={{ fontSize: dynClamp(10, 1.1, 12, 1200) }}
            >
              {currentQuestion.subtitle}
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div
          className="grid gap-2.5 md:gap-3 flex-1 content-start mt-2 md:mt-4"
          style={{
            gridTemplateColumns: isMulti
              ? "repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
              : "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          }}
        >
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = isMulti
              ? ((selectedValue as string[]) || []).includes(opt.value)
              : selectedValue === opt.value;

            const IconComponent = QUIZ_ICON_MAP[opt.icon?.toLowerCase() || ""];

            return (
              <motion.button
                key={opt.value}
                variants={staggerItem}
                onClick={() => handleSelect(opt.value)}
                className={`
                  relative group text-left overflow-hidden
                  transition-all duration-300 ease-out
                  diamond-cut border
                  ${isSelected
                    ? "border-[#D4AF37]/70 bg-[#D4AF37]/10 shadow-[0_0_24px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-white/[0.06] bg-[#080808]/80 hover:border-[#D4AF37]/30 hover:bg-[#0C0C0E]"
                  }
                `}
                style={{
                  boxShadow: isSelected
                    ? "0 0 24px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 4px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                {/* Lens flare on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5">
                  {/* Icon */}
                  <div
                    className={`
                      flex-shrink-0 flex items-center justify-center
                      border diamond-cut
                      ${isSelected ? "bg-[#D4AF37] border-[#FFD700]" : "bg-[#0A0A0A] border-white/10"}
                    `}
                    style={{
                      width: dynClamp(28, 3.5, 42, 1200),
                      height: dynClamp(28, 3.5, 42, 1200),
                    }}
                  >
                    {IconComponent ? (
                      <IconComponent
                        className={`
                          ${isSelected ? "text-[#000]" : "text-[#D4AF37]"}
                        `}
                        style={{
                          width: dynClamp(14, 1.6, 20, 1200),
                          height: dynClamp(14, 1.6, 20, 1200),
                        }}
                      />
                    ) : (
                      <span
                        className="text-[#D4AF37] font-bold"
                        style={{ fontSize: dynClamp(12, 1.4, 16, 1200) }}
                      >
                        {opt.icon}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      font-black tracking-wide leading-snug pt-0.5 md:pt-1
                      transition-colors duration-300
                      ${isSelected ? "text-[#F4F4EE]" : "text-[#888] group-hover:text-[#AAA]"}
                    `}
                    style={{ fontSize: dynClamp(11, 1.15, 13.5, 1200) }}
                  >
                    {opt.label}
                  </span>

                  {/* Selection indicator */}
                  <div className="ml-auto flex-shrink-0 pt-1">
                    {isSelected ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)] flex items-center justify-center">
                        <CheckCircle2 className="h-2.5 w-2.5 text-[#000]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors" />
                    )}
                  </div>
                </div>

                {/* Top-edge shine */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Multi-select count & navigation */}
        {isMulti && (
          <div
            className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5"
            style={{ minHeight: dynClamp(40, 6, 64, 1200) }}
          >
            <span
              className="text-[#555] font-black uppercase tracking-[0.2em]"
              style={{ fontSize: dynClamp(10, 1, 12, 1200) }}
            >
              {selectedCount > 0
                ? `${selectedCount} / ${maxSelect} selected`
                : `Select up to ${maxSelect}`}
            </span>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`
                flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-3
                font-black uppercase tracking-[0.2em] md:tracking-[0.3em]
                transition-all duration-300 diamond-cut border
                ${canProceed
                  ? "bg-[#D4AF37] text-[#000] border-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_32px_rgba(212,175,55,0.5)] hover:translate-x-0.5"
                  : "bg-[#111] text-[#333] border-white/5 cursor-not-allowed"
                }
              `}
              style={{ fontSize: dynClamp(10, 1, 12, 1200) }}
            >
              Confirm <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        )}

        {/* Single-select back navigation */}
        {!isMulti && step > 0 && (
          <div className="mt-2 md:mt-3">
            <button
              onClick={handleBack}
              className="
                flex items-center gap-2 text-[#333] hover:text-[#D4AF37]
                transition-colors duration-300 uppercase tracking-[0.2em] font-black
              "
              style={{ fontSize: dynClamp(9, 0.9, 11, 1200) }}
            >
              <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Revert
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  // ─── RENDER: RESULTS ────────────────────────────────────────────────────────

  const renderResults = () => {
    if (!results || !insight) return null;
    const topMatches = results.matches.slice(0, 3);

    return (
      <motion.div
        key="results"
        {...fadeIn}
        className="flex flex-col h-full"
      >
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 md:gap-6 mb-4 md:mb-6">
          <div className="flex-1 min-w-0">
            <h2
              className="text-[#F4F4EE] leading-[1.1] mb-2 md:mb-3 font-display"
              style={{ fontSize: dynClamp(22, 3.5, 44, 1200) }}
            >
              <span className="bling-shine inline">Subconscious Decoded</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Dna className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span
                  className="font-black uppercase tracking-[0.2em] md:tracking-[0.3em]"
                  style={{ fontSize: dynClamp(9, 0.95, 11, 1200) }}
                >
                  Signature: {insight.headline}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#444]">
                <Lock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span
                  className="font-black uppercase tracking-[0.2em] md:tracking-[0.3em]"
                  style={{ fontSize: dynClamp(9, 0.95, 11, 1200) }}
                >
                  Quadrant: {attachment?.quadrant.replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 btn-luxury active h-10 md:h-12 px-4 md:px-6 flex-shrink-0"
            style={{ fontSize: dynClamp(9, 0.9, 11, 1200) }}
          >
            <RotateCcw className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Reset Engine
          </button>
        </div>

        {/* Top 3 Matches */}
        <div className="grid gap-3 md:gap-4 flex-1 content-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          {topMatches.map((match, i) => {
            const { niche } = match;
            const fit = Math.round(match.score);
            return (
              <motion.div
                key={niche.keyword}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="sapphire-glass diamond-cut border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all duration-300 group"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div className="p-4 md:p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[#D4AF37] font-black uppercase tracking-[0.25em] block mb-1"
                        style={{ fontSize: dynClamp(9, 0.8, 10, 1200) }}
                      >
                        Dossier #{i + 1}
                      </span>
                      <h3
                        className="text-[#F4F4EE] font-display leading-tight truncate"
                        style={{ fontSize: dynClamp(18, 2.2, 32, 1200) }}
                      >
                        {niche.keyword}
                      </h3>
                      <span
                        className="text-[#555] font-bold uppercase tracking-[0.15em] block mt-1"
                        style={{ fontSize: dynClamp(9, 0.75, 10, 1200) }}
                      >
                        {niche.category}
                      </span>
                    </div>
                    <div
                      className="bg-[#D4AF37] text-[#000] font-black flex-shrink-0 diamond-cut flex items-center justify-center"
                      style={{
                        padding: dynClamp(4, 0.5, 8, 1200),
                        minWidth: dynClamp(44, 5, 64, 1200),
                        height: dynClamp(28, 3, 40, 1200),
                        fontSize: dynClamp(10, 1, 13, 1200),
                      }}
                    >
                      {fit}%
                    </div>
                  </div>

                  <div
                    className="bg-black/50 border-l-2 border-[#D4AF37] p-3 md:p-4 mb-3 md:mb-4 flex-1"
                    style={{ fontSize: dynClamp(10, 0.95, 12, 1200) }}
                  >
                    <span className="text-[#888] italic leading-relaxed">
                      &ldquo;{match.reason}&rdquo;
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Gem className="h-3 w-3 text-[#D4AF37]" />
                      <span
                        className="text-[#555] font-bold uppercase tracking-widest"
                        style={{ fontSize: dynClamp(8, 0.7, 9, 1200) }}
                      >
                        {niche.earningPotential === "very-high" ? "Elite Yield" :
                         niche.earningPotential === "high" ? "High Yield" :
                         niche.earningPotential === "medium" ? "Mid Yield" : "Base"}
                      </span>
                    </div>
                    <span
                      className="text-[#333] font-black uppercase tracking-[0.2em]"
                      style={{ fontSize: dynClamp(8, 0.7, 9, 1200) }}
                    >
                      Tap to explore
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // ─── RENDER: CTA ────────────────────────────────────────────────────────────

  const renderCTA = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-3 md:mt-4 text-center"
      >
        <div
          className="sapphire-glass diamond-cut border-[#D4AF37]/25 p-5 md:p-8 relative overflow-hidden"
          style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.06)_0%,_transparent_60%)] pointer-events-none" />
          <h3
            className="text-[#F4F4EE] font-display mb-2 md:mb-3 relative z-10"
            style={{ fontSize: dynClamp(18, 2.5, 32, 1200) }}
          >
            Commence Partnership
          </h3>
          <p
            className="text-[#555] font-black uppercase tracking-[0.15em] leading-relaxed mb-4 md:mb-6 max-w-xl mx-auto relative z-10"
            style={{ fontSize: dynClamp(9, 0.9, 11, 1200) }}
          >
            BNE architects the complete platform infrastructure around your identified segments.
          </p>
          <button
            onClick={() => window.location.href = "/onboarding"}
            className="btn-luxury active px-6 md:px-10 h-11 md:h-14 text-[10px] md:text-xs relative z-10 inline-flex items-center gap-2 md:gap-3"
            style={{ fontSize: dynClamp(9, 0.9, 11, 1200) }}
          >
            Request Private Access
            <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
          </button>
        </div>
      </motion.div>
    );
  };

  // ─── MAIN RENDER ───────────────────────────────────────────────────────────

  return (
    <div
      className="quiz-experience w-full h-full flex flex-col relative overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg, #000 0%, #020202 50%, #000 100%)" }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,_#D4AF37_0deg,_transparent_360deg)]" />

      {/* Bezel frame */}
      <div
        className="absolute inset-3 md:inset-4 lg:inset-6 pointer-events-none"
        style={{
          border: "1px solid rgba(212,175,55,0.08)",
          borderRadius: "0.5rem",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.8), 0 24px 64px rgba(0,0,0,0.9)",
        }}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] md:h-[3px] bg-white/[0.02] z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "circOut" }}
          style={{ boxShadow: "0 0 12px rgba(212,175,55,0.6)" }}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col relative z-10 px-4 md:px-8 lg:px-12 py-4 md:py-6 min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          {!complete ? (
            <motion.div
              key="quiz-active"
              custom={direction}
              initial={{ opacity: 0, x: direction === "forward" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forward" ? -20 : 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full"
            >
              {renderQuestion()}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-complete"
              custom={direction}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="flex flex-col h-full overflow-y-auto"
            >
              {renderResults()}
              {renderCTA()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 lg:px-12 py-2 md:py-3 border-t border-white/[0.03]">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4AF37]/60 shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
          <span
            className="text-[#1A1A1A] font-black uppercase tracking-[0.25em] md:tracking-[0.4em]"
            style={{ fontSize: dynClamp(7, 0.65, 9, 1200) }}
          >
            {complete ? "Analysis Complete" : "Analysis Engine Active"}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span
            className="text-[#1A1A1A] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] hidden sm:block"
            style={{ fontSize: dynClamp(7, 0.65, 9, 1200) }}
          >
            {TOTAL_QUESTIONS} Protocols
          </span>
          <span
            className="text-[#1A1A1A] font-black uppercase tracking-[0.25em] md:tracking-[0.4em]"
            style={{ fontSize: dynClamp(7, 0.65, 9, 1200) }}
          >
            v2.026
          </span>
        </div>
      </div>
    </div>
  );
}
