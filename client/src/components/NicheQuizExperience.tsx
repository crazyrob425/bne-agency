/**
 * NicheQuizExperience — Single-screen luxury quiz console.
 *
 * Uses the existing NicheCard component for results so all detailed
 * card data (descriptions, tips, revenue, clipart) displays correctly.
 */

import { useState, useCallback, useEffect, useRef } from "react";
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
  CheckCircle2,
} from "lucide-react";
import { NicheCard } from "@/components/NicheCard";
import type { Niche } from "@/data/nicheDatabase";

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
  users: Users,
  dollar: DollarSign,
  flame: Flame,
  brain: Brain,
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
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

// ─── HELPER: Fluid font sizing ───────────────────────────────────────────────

function fluidSize(min: number, max: number, viewportMax = 1200): string {
  return `clamp(${min}px, ${min + (max - min) * (100 / viewportMax) * 12}vw, ${max}px)`;
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

  const currentQuestion = QUIZ_QUESTIONS[step];
  const progress = ((step + (complete ? 1 : 0)) / TOTAL_QUESTIONS) * 100;

  // Sync selectedValue with answers when step changes
  useEffect(() => {
    setSelectedValue(answers[currentQuestion.id] ?? null);
  }, [step, answers, currentQuestion.id]);

  // Persist progress
  const persistProgress = useCallback((nextAnswers: QuizAnswers, questionId: string) => {
    progressApi?.save({
      lastCompletedQuestionId: questionId,
      answers: nextAnswers,
      questionsAnswered: Object.keys(nextAnswers).length,
    });
    progressApi?.registerExit({
      lastCompletedQuestionId: questionId,
      answers: nextAnswers,
      questionsAnswered: Object.keys(nextAnswers).length,
    });
  }, [progressApi]);

  const answersRef = useRef(answers);
  const selectedValueRef = useRef(selectedValue);
  answersRef.current = answers;
  selectedValueRef.current = selectedValue;

  const handleSelect = useCallback((value: string) => {
    if (currentQuestion.type === "multi") {
      const current = (selectedValueRef.current as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setSelectedValue(updated);
      setAnswers((prev) => {
        const next = { ...prev, [currentQuestion.id]: updated };
        persistProgress(next, currentQuestion.id);
        return next;
      });
    } else {
      const newValue = value;
      setSelectedValue(newValue);
      setAnswers((prev) => {
        const next = { ...prev, [currentQuestion.id]: newValue };
        persistProgress(next, currentQuestion.id);
        return next;
      });
      setTimeout(() => {
        setStep((s) => {
          if (s < TOTAL_QUESTIONS - 1) return s + 1;
          // Final step: compute results
          const finalAnswers = { ...answersRef.current, [currentQuestion.id]: newValue };
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
          progressApi?.complete({ answers: finalAnswers, resultSnapshot: matchResult });
          onComplete?.(matchResult, insightResult, {
            anxiety: attachmentVec.anxiety,
            avoidance: attachmentVec.avoidance,
            quadrant: attachmentVec.quadrant,
          });
          return s;
        });
      }, 250);
    }
  }, [currentQuestion, persistProgress, progressApi, onComplete]);

  const handleNext = useCallback(() => {
    const sv = selectedValueRef.current;
    const ans = answersRef.current;
    const cq = currentQuestion;

    if (cq.type === "multi") {
      const current = (sv as string[]) || [];
      if (current.length === 0) return;
    } else if (!sv) {
      return;
    }

    if (step < TOTAL_QUESTIONS - 1) {
      setStep((s) => s + 1);
    } else {
      const finalAnswers = cq.type === "multi"
        ? { ...ans, [cq.id]: sv as string[] }
        : { ...ans, [cq.id]: sv as string };

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
      progressApi?.complete({ answers: finalAnswers, resultSnapshot: matchResult });
      onComplete?.(matchResult, insightResult, {
        anxiety: attachmentVec.anxiety,
        avoidance: attachmentVec.avoidance,
        quadrant: attachmentVec.quadrant,
      });
    }
  }, [step, currentQuestion, onComplete, progressApi]);

  const handleBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
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

  // ─── RENDER: QUESTION ──────────────────────────────────────────────────────

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
        <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[9px] md:text-[10px] font-black tracking-[0.25em] md:tracking-[0.35em] uppercase"
                style={{ color: "rgba(212,175,55,0.8)", fontSize: fluidSize(9, 11) }}
              >
                Protocol {step + 1} / {TOTAL_QUESTIONS}
              </span>
            </div>
            <h2
              className="text-[#F4F4EE] leading-[1.2] mb-1.5 font-display"
              style={{ fontSize: fluidSize(16, 26) }}
            >
              {currentQuestion.question}
            </h2>
            <p
              className="text-[#777] font-bold uppercase tracking-[0.12em] md:tracking-[0.18em]"
              style={{ fontSize: fluidSize(9, 11) }}
            >
              {currentQuestion.subtitle}
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div
          className="grid gap-2 md:gap-2.5 flex-1 content-start mt-2 md:mt-3"
          style={{
            gridTemplateColumns: isMulti
              ? "repeat(auto-fill, minmax(min(100%, 260px), 1fr))"
              : "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {currentQuestion.options.map((opt) => {
            const isSelected = isMulti
              ? ((selectedValue as string[]) || []).includes(opt.value)
              : selectedValue === opt.value;

            const IconComponent = QUIZ_ICON_MAP[opt.icon?.toLowerCase() || ""];

            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelect(opt.value)}
                className={`
                  relative group text-left overflow-hidden
                  transition-all duration-200 ease-out
                  diamond-cut border
                  ${isSelected
                    ? "border-[#D4AF37]/60 bg-[#D4AF37]/[0.08]"
                    : "border-white/[0.06] bg-[#080808]/80 hover:border-[#D4AF37]/25 hover:bg-[#0C0C0E]"
                  }
                `}
                style={{
                  boxShadow: isSelected
                    ? "0 0 20px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-start gap-2.5 md:gap-3 p-3 md:p-4">
                  {/* Icon */}
                  <div
                    className={`
                      flex-shrink-0 flex items-center justify-center
                      border diamond-cut
                      ${isSelected ? "bg-[#D4AF37] border-[#FFD700]" : "bg-[#0A0A0A] border-white/10"}
                    `}
                    style={{
                      width: fluidSize(26, 34),
                      height: fluidSize(26, 34),
                    }}
                  >
                    {IconComponent ? (
                      <IconComponent
                        className={isSelected ? "text-[#000]" : "text-[#D4AF37]"}
                        style={{ width: fluidSize(12, 16), height: fluidSize(12, 16) }}
                      />
                    ) : (
                      <span className="text-[#D4AF37] font-bold" style={{ fontSize: fluidSize(11, 15) }}>
                        {opt.icon}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      font-bold tracking-wide leading-snug pt-0.5
                      transition-colors duration-200
                      ${isSelected ? "text-[#F4F4EE]" : "text-[#999] group-hover:text-[#BBB]"}
                    `}
                    style={{ fontSize: fluidSize(10, 12.5) }}
                  >
                    {opt.label}
                  </span>

                  {/* Selection indicator */}
                  <div className="ml-auto flex-shrink-0 pt-0.5">
                    {isSelected ? (
                      <div className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.5)] flex items-center justify-center">
                        <CheckCircle2 className="h-2 w-2 text-[#000]" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-white/10" />
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-70" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Multi-select navigation */}
        {isMulti && (
          <div
            className="flex items-center justify-between mt-2.5 md:mt-3 pt-2.5 md:pt-3 border-t border-white/5"
            style={{ minHeight: fluidSize(38, 52) }}
          >
            <span
              className="text-[#666] font-bold uppercase tracking-[0.18em]"
              style={{ fontSize: fluidSize(9, 11) }}
            >
              {selectedCount > 0
                ? `${selectedCount} / ${maxSelect} selected`
                : `Select up to ${maxSelect}`}
            </span>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5
                font-bold uppercase tracking-[0.18em] md:tracking-[0.25em]
                transition-all duration-200 diamond-cut border
                ${canProceed
                  ? "bg-[#D4AF37] text-[#000] border-[#FFD700] shadow-[0_0_16px_rgba(212,175,55,0.25)] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]"
                  : "bg-[#111] text-[#333] border-white/5 cursor-not-allowed"
                }
              `}
              style={{ fontSize: fluidSize(9, 11) }}
            >
              Confirm <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </button>
          </div>
        )}

        {/* Single-select back navigation */}
        {!isMulti && step > 0 && (
          <div className="mt-1.5 md:mt-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-[#444] hover:text-[#D4AF37] transition-colors duration-200 uppercase tracking-[0.18em] font-bold"
              style={{ fontSize: fluidSize(8, 10) }}
            >
              <ChevronLeft className="h-3 w-3 md:h-3.5 md:w-3.5" />
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 md:gap-4 mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h2
              className="text-[#F4F4EE] leading-[1.1] mb-1.5 md:mb-2 font-display"
              style={{ fontSize: fluidSize(18, 32) }}
            >
              <span className="bling-shine inline">Subconscious Decoded</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1.5 text-[#D4AF37]">
                <Dna className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span
                  className="font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]"
                  style={{ fontSize: fluidSize(8, 10) }}
                >
                  Signature: {insight.headline}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555]">
                <Lock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span
                  className="font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]"
                  style={{ fontSize: fluidSize(8, 10) }}
                >
                  Quadrant: {attachment?.quadrant.replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 btn-luxury active h-9 md:h-10 px-3 md:px-4 flex-shrink-0"
            style={{ fontSize: fluidSize(8, 10) }}
          >
            <RotateCcw className="h-3 w-3 md:h-3.5 md:w-3.5" />
            Reset Engine
          </button>
        </div>

        {/* Top 3 Match Cards — using existing NicheCard component */}
        <div className="grid gap-3 md:gap-4 flex-1 content-start overflow-y-auto pb-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          {topMatches.map((match, i) => (
            <motion.div
              key={match.niche.keyword}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <NicheCard niche={match.niche} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // ─── RENDER: CTA ────────────────────────────────────────────────────────────

  const renderCTA = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-3 md:mt-4 text-center flex-shrink-0"
      >
        <div
          className="sapphire-glass diamond-cut border-[#D4AF37]/20 p-4 md:p-6 relative overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.02)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05)_0%,_transparent_55%)] pointer-events-none" />
          <h3
            className="text-[#F4F4EE] font-display mb-1.5 md:mb-2 relative z-10"
            style={{ fontSize: fluidSize(16, 24) }}
          >
            Commence Partnership
          </h3>
          <p
            className="text-[#666] font-bold uppercase tracking-[0.12em] leading-relaxed mb-3 md:mb-4 max-w-xl mx-auto relative z-10"
            style={{ fontSize: fluidSize(8, 10) }}
          >
            BNE architects the complete platform infrastructure around your identified segments.
          </p>
          <button
            onClick={() => window.location.href = "/onboarding"}
            className="btn-luxury active px-5 md:px-8 h-10 md:h-12 text-[9px] md:text-xs relative z-10 inline-flex items-center gap-2"
            style={{ fontSize: fluidSize(9, 11) }}
          >
            Request Private Access
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
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
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,_#D4AF37_0deg,_transparent_360deg)]" />

      {/* Bezel frame */}
      <div
        className="absolute inset-2 md:inset-3 lg:inset-4 pointer-events-none"
        style={{
          border: "1px solid rgba(212,175,55,0.06)",
          borderRadius: "0.5rem",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.7), 0 20px 48px rgba(0,0,0,0.8)",
        }}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] md:h-[2px] bg-white/[0.02] z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
           transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{ boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col relative z-10 px-3 md:px-6 lg:px-8 py-3 md:py-4 min-h-0">
        <AnimatePresence mode="wait">
          {!complete ? (
            <motion.div
              key="quiz-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              {renderQuestion()}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full overflow-hidden"
            >
              {renderResults()}
              {renderCTA()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 flex items-center justify-between px-3 md:px-6 lg:px-8 py-1.5 md:py-2 border-t border-white/[0.03] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 shadow-[0_0_4px_rgba(212,175,55,0.25)]" />
          <span
            className="text-[#1A1A1A] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]"
            style={{ fontSize: fluidSize(7, 9) }}
          >
            {complete ? "Analysis Complete" : "Analysis Engine Active"}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span
            className="text-[#1A1A1A] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hidden sm:block"
            style={{ fontSize: fluidSize(7, 9) }}
          >
            {TOTAL_QUESTIONS} Protocols
          </span>
          <span
            className="text-[#1A1A1A] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]"
            style={{ fontSize: fluidSize(7, 9) }}
          >
            v2.026
          </span>
        </div>
      </div>
    </div>
  );
}
