/**
 * NicheQuizExperience — Single-screen luxury quiz console.
 *
 * Uses the existing NicheCard component for results so all detailed
 * card data (descriptions, tips, revenue, clipart) displays correctly.
 *
 * Registration is optional: unauthenticated users get localStorage progress
 * saving plus subtle reminders to create a free account.
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
  X,
  UserPlus,
  Mail,
  FileText,
  Send,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { NicheCard } from "@/components/NicheCard";
import UnifiedRegistrationGate from "@/components/UnifiedRegistrationGate";
import type { Niche } from "@/data/nicheDatabase";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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

interface ProgressApi {
  save: (payload: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number }) => void;
  complete: (payload: { answers: QuizAnswers; resultSnapshot: unknown }) => void;
  registerExit: (state: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number }) => void;
  saved: { lastCompletedQuestionId: string | null; answers: QuizAnswers; questionsAnswered: number; completed: boolean } | null;
  isAuthenticated: boolean;
}

interface NicheQuizExperienceProps {
  onComplete?: (result: MatchResult, insight: SubconsciousInsight, attachment: { anxiety: number; avoidance: number; quadrant: string }) => void;
  onReset?: () => void;
  initialAnswers?: QuizAnswers;
  progressApi?: ProgressApi;
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
const REMINDER_AT = [10, 20, 30, 40]; // questions at which to show subtle reminders

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
  const [showReminder, setShowReminder] = useState(false);
  const [showAbandonPopup, setShowAbandonPopup] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showRegistrationGate, setShowRegistrationGate] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState<number | null>(null);

  // Email report state
  const [emailReportAddress, setEmailReportAddress] = useState("");
  const [emailReportName, setEmailReportName] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showDeepDiveModal, setShowDeepDiveModal] = useState(false);

  const sendEmailReportMut = trpc.progress.sendResultsEmail.useMutation();

  const handleSendEmailReport = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailReportAddress || !emailReportAddress.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmailSending(true);
    try {
      await sendEmailReportMut.mutateAsync({
        email: emailReportAddress,
        name: emailReportName || undefined,
        answers,
        resultSnapshot: results,
      });
      setEmailSent(true);
      toast.success("Blueprint dispatched! Check your inbox for your strategic psych report.");
    } catch (err) {
      console.error("Failed to send email report:", err);
      toast.error("Could not send email report. Please try again.");
    } finally {
      setEmailSending(false);
    }
  }, [emailReportAddress, emailReportName, answers, results, sendEmailReportMut]);

  // Stable session ID for anonymous draft saves
  const sessionId = useRef(() => {
    let sid = sessionStorage.getItem("bne_quiz_session_id");
    if (!sid) {
      sid = `quiz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("bne_quiz_session_id", sid);
    }
    return sid;
  }).current();

  const saveDraftMutation = trpc.drafts.save.useMutation();
  const getDraftQuery = trpc.drafts.get.useQuery({ sessionId }, { enabled: Boolean(sessionId) });

  const currentQuestion = QUIZ_QUESTIONS[step];
  const questionsAnswered = Object.keys(answers).length;
  const progress = ((step + (complete ? 1 : 0)) / TOTAL_QUESTIONS) * 100;
  const isAuthenticated = progressApi?.isAuthenticated ?? false;

  // Show subtle reminder at checkpoints if not authenticated
  const shouldShowReminder = !isAuthenticated && !complete && REMINDER_AT.includes(questionsAnswered) && !showReminder;

  // Restore saved progress (auth or localStorage) on mount if answers are empty
  useEffect(() => {
    if (Object.keys(answers).length === 0 && progressApi?.saved?.answers && Object.keys(progressApi.saved.answers).length > 0) {
      setAnswers(progressApi.saved.answers);
      const savedId = progressApi.saved.lastCompletedQuestionId;
      if (savedId) {
        const idx = QUIZ_QUESTIONS.findIndex(q => q.id === savedId);
        if (idx >= 0) setStep(idx + 1);
      }
    }
  }, [progressApi?.saved, answers]);

  // Restore draft from server if exists
  useEffect(() => {
    if (getDraftQuery.data && Object.keys(answers).length === 0) {
      const draft = getDraftQuery.data;
      if (draft.type === "quiz" && Object.keys((draft.data as any) || {}).length > 0) {
        setAnswers(draft.data as QuizAnswers);
        const stepIdx = QUIZ_QUESTIONS.findIndex(q => q.id === draft.lastStep);
        if (stepIdx >= 0) setStep(stepIdx);
        toast.success("Welcome back — we restored your saved quiz progress.");
      }
    }
  }, [getDraftQuery.data, answers]);

  // ─── DRAFT SAVING ────────────────────────────────────────────────────────────

  const saveDraft = useCallback(async (savedForLater = false) => {
    try {
      const result = await saveDraftMutation.mutateAsync({
        sessionId,
        type: "quiz",
        data: answers,
        lastStep: currentQuestion.id,
        savedForLater,
      });
      setIsSaved(true);
      return result;
    } catch (e) {
      console.error("Failed to save quiz draft:", e);
    }
  }, [sessionId, answers, currentQuestion.id, saveDraftMutation]);

  // Auto-save every 20 seconds if there is progress
  useEffect(() => {
    if (questionsAnswered === 0 || complete) return;
    const interval = setInterval(() => saveDraft(false), 20000);
    return () => clearInterval(interval);
  }, [questionsAnswered, complete, saveDraft]);

  // Save draft on abandonment
  useEffect(() => {
    if (complete || questionsAnswered === 0) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      saveDraft(true);
      // Original abandonment popup logic
      if (!isLeaving) {
        setIsLeaving(true);
        setShowAbandonPopup(true);
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [complete, questionsAnswered, answers, isLeaving, saveDraft]);

  // Track questions answered and show reminders
  useEffect(() => {
    if (shouldShowReminder) {
      setShowReminder(true);
    }
  }, [questionsAnswered, shouldShowReminder]);

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
  const finalAnswersRef = useRef<QuizAnswers>({});
  answersRef.current = answers;
  selectedValueRef.current = selectedValue;

  const [isShaking, setIsShaking] = useState(false);

  const handleSelect = useCallback((value: string) => {
    if (currentQuestion.type === "multi") {
      const current = (selectedValueRef.current as string[]) || [];
      const maxSelect = currentQuestion.maxSelect || 999;
      const isAtMax = current.length >= maxSelect && !current.includes(value);

      if (isAtMax) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
        return;
      }

      let updated: string[];

      if (current.includes(value)) {
        updated = current.filter((v: string) => v !== value);
      } else if (current.length < maxSelect) {
        updated = [...current, value];
      } else {
        return;
      }

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
        finalAnswersRef.current = next;
        persistProgress(next, currentQuestion.id);
        return next;
      });
      setTimeout(() => {
        if (step < TOTAL_QUESTIONS - 1) {
          setStep((s) => s + 1);
        } else {
          const finalAnswers = finalAnswersRef.current;
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
      }, 250);
    }
  }, [currentQuestion, step, persistProgress, progressApi, onComplete]);

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

    // Save draft before advancing
    const nextAnswers: QuizAnswers = { ...ans, [cq.id]: sv as string | string[] };
    saveDraft(false);

    if (step < TOTAL_QUESTIONS - 1) {
      setStep((s) => s + 1);
    } else {
      const attachmentVec = computeAttachmentVector(nextAnswers);
      const matchResult = matchNicheFinder(nextAnswers, attachmentVec);
      const insightResult = getSubconsciousInsight(nextAnswers);

      setAttachment({
        anxiety: attachmentVec.anxiety,
        avoidance: attachmentVec.avoidance,
        quadrant: attachmentVec.quadrant,
      });
      setResults(matchResult);
      setInsight(insightResult);
      setComplete(true);
      progressApi?.complete({ answers: nextAnswers, resultSnapshot: matchResult });
      onComplete?.(matchResult, insightResult, {
        anxiety: attachmentVec.anxiety,
        avoidance: attachmentVec.avoidance,
        quadrant: attachmentVec.quadrant,
      });
    }
  }, [step, currentQuestion, saveDraft, progressApi, onComplete]);

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
    setShowReminder(false);
    setShowAbandonPopup(false);
    setIsLeaving(false);
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
          className={`
            grid gap-2 md:gap-2.5 flex-1 content-start mt-2 md:mt-3
            ${isShaking ? "animate-shake" : ""}
          `}
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

      const isAtMax = isMulti && selectedCount >= maxSelect && !isSelected;

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
                    : isAtMax
                      ? "border-white/[0.03] bg-[#080808]/50 opacity-40"
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
                  : "bg-[#1A1A1A] text-[#666] border-white/10 cursor-not-allowed"
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

        {/* Top 3 Header Banner */}
        <div className="mb-3 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/[0.12] via-[#FFD700]/[0.05] to-transparent p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37] block mb-1">
              Top 3 Adult Fetish Matches
            </span>
            <p className="text-xs text-[#EAE6D9] font-semibold">
              Based on your answers, your psychology and lifestyle make you uniquely equipped to dominate these top 3 sub-genres as a content creator.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37]">0% Retainer Commission</span>
          </div>
        </div>

        {/* Top 3 Match Cards — using NicheCard component */}
        <div className="grid gap-4 md:gap-5 flex-1 content-start overflow-y-auto pb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          {topMatches.map((match, i) => (
            <motion.div
              key={match.niche.keyword}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
            >
              <NicheCard
                niche={match.niche}
                matchScore={match.score}
                rank={i + 1}
                drivers={match.drivers}
                matchReason={match.reason}
              />
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
        className="mt-3 md:mt-4 text-center flex-shrink-0 space-y-4 pb-4"
      >
        {/* Email Dispatch Card */}
        <div className="sapphire-glass diamond-cut border-[#D4AF37]/30 p-4 md:p-6 relative overflow-hidden text-left">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-[#D4AF37]" />
            <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">
              Email My Full Strategic Psych & Niche Blueprint
            </h4>
          </div>
          <p className="text-[10px] md:text-xs text-[#AAA] mb-3 leading-relaxed">
            Get an instant executive email report containing your 10-dimension psychometric breakdown, market analysis, competitor matrix, and platform execution playbook for your Top 3 Matches.
          </p>

          {emailSent ? (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-lg p-3 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#F4F4EE]">Blueprint Dispatched!</p>
                <p className="text-[10px] text-[#AAA]">Check <span className="text-[#D4AF37]">{emailReportAddress}</span> for your deep-dive report.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendEmailReport} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Stage Name (Optional)"
                value={emailReportName}
                onChange={(e) => setEmailReportName(e.target.value)}
                className="bg-[#0B0B0D] border border-[#2A2A35] rounded-lg px-3 py-2 text-xs text-[#F4F4EE] focus:border-[#D4AF37] outline-none sm:w-1/3"
              />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailReportAddress}
                onChange={(e) => setEmailReportAddress(e.target.value)}
                className="bg-[#0B0B0D] border border-[#2A2A35] rounded-lg px-3 py-2 text-xs text-[#F4F4EE] focus:border-[#D4AF37] outline-none flex-1"
              />
              <button
                type="submit"
                disabled={emailSending}
                className="btn-luxury active px-4 py-2 text-xs flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                {emailSending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Report</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Dual Actions: View On-Screen Full Report OR Request Private Access */}
        <div className="sapphire-glass diamond-cut border-[#D4AF37]/20 p-4 md:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05)_0%,_transparent_55%)] pointer-events-none" />
          <h3
            className="text-[#F4F4EE] font-display mb-1.5 md:mb-2 relative z-10"
            style={{ fontSize: fluidSize(16, 24) }}
          >
            Commence Partnership
          </h3>
          <p
            className="text-[#666] font-bold uppercase tracking-[0.12em] leading-relaxed mb-4 max-w-xl mx-auto relative z-10"
            style={{ fontSize: fluidSize(8, 10) }}
          >
            BNE operates as your silent partner backend handling 2257 records custodian compliance, holding LLC shielding, and 24/7 DM monetization — taking 0% revenue commission so you keep 100% of your earnings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => setShowDeepDiveModal(true)}
              className="px-5 md:px-6 h-10 md:h-12 text-[9px] md:text-xs font-bold uppercase tracking-wider rounded-lg border border-[#D4AF37]/40 bg-[#121217] hover:bg-[#D4AF37]/10 text-[#D4AF37] transition-all inline-flex items-center gap-2"
            >
              <FileText className="h-3.5 w-3.5" />
              View Full Strategic Report
            </button>

            <button
              onClick={() => (window.location.href = "/onboarding")}
              className="btn-luxury active px-5 md:px-8 h-10 md:h-12 text-[9px] md:text-xs inline-flex items-center gap-2"
            >
              Request Private Access
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // ─── RENDER: REMINDER BANNER ───────────────────────────────────────────────

  const renderReminder = () => {
    if (!showReminder) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-3 md:mb-4"
      >
        <div className="sapphire-glass diamond-cut border-[#D4AF37]/25 p-3 md:p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <UserPlus className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
            <p className="text-[10px] md:text-xs text-[#AAA] font-bold">
              Save your progress and pick up where you left off — create a free account.
            </p>
          </div>
          <button
            onClick={() => setShowReminder(false)}
            className="text-[#555] hover:text-[#D4AF37] transition-colors flex-shrink-0"
          >
            <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  // ─── RENDER: ABANDONMENT POPUP ─────────────────────────────────────────────

  const renderAbandonPopup = () => {
    if (!showAbandonPopup) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-[#0A0A0C] p-6 md:p-8 shadow-2xl"
        >
          <h3 className="text-xl md:text-2xl font-display text-[#F4F4EE] mb-2">
            Wait — don't lose your progress
          </h3>
          <p className="text-sm text-[#888] mb-6 leading-relaxed">
            You've answered {questionsAnswered} questions. Save your progress to resume later or create an account to keep your results.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={async () => {
                setShowAbandonPopup(false);
                setIsLeaving(false);
                await saveDraft(true);
                toast.success("Progress saved — come back anytime.");
              }}
              className="w-full h-12 rounded-lg bg-[#D4AF37] text-[#000] text-sm font-black uppercase tracking-widest hover:bg-[#FFD700] transition-colors"
            >
              Save & Finish Later
            </button>
            <button
              onClick={() => {
                setShowAbandonPopup(false);
                setIsLeaving(false);
                setShowRegistrationGate(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full h-12 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-colors"
            >
              Create Account & Save
            </button>
            <button
              onClick={() => {
                setShowAbandonPopup(false);
                setIsLeaving(false);
              }}
              className="w-full h-12 rounded-lg border border-white/10 text-[#666] text-sm font-bold uppercase tracking-widest hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
            >
              Continue Without Saving
            </button>
          </div>
        </motion.div>
      </div>
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
        {/* Unified registration gate — compact banner */}
        {!isAuthenticated && !complete && (
          <UnifiedRegistrationGate
            flowType="quiz"
            onRegistered={(sessionId) => {
              setShowRegistrationGate(true);
              progressApi?.save({
                lastCompletedQuestionId: currentQuestion.id,
                answers,
                questionsAnswered,
              });
            }}
            onDismissed={() => setShowRegistrationGate(false)}
            compact
            defaultEmail=""
          />
        )}

        {/* Subtle registration reminder */}
        {renderReminder()}

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

      {/* Interactive Deep-Dive Report Modal */}
      <AnimatePresence>
        {showDeepDiveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0B0B0E] border border-[#D4AF37]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 md:p-8 relative text-left shadow-[0_0_50px_rgba(212,175,55,0.15)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDeepDiveModal(false)}
                className="absolute top-4 right-4 text-[#888] hover:text-[#D4AF37] p-2 transition-colors rounded-lg bg-[#14141A]"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-[#22222D] pb-6 mb-6">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Executive Strategic Blueprint</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#F4F4EE]">
                  Subconscious Psychometric &amp; Market Deep Dive
                </h2>
                <p className="text-xs md:text-sm text-[#888] mt-1">
                  Full 10-dimension psychological profile, attachment quadrant, and platform expansion playbook for your Top 3 Matches.
                </p>
              </div>

              {/* Archetype & Attachment Overview */}
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div className="bg-[#121218] border border-[#262635] rounded-xl p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                    Subconscious Archetype
                  </span>
                  <h3 className="text-lg font-bold text-[#F4F4EE] mb-2">
                    {insight?.headline || "Strategic Creator Profile"}
                  </h3>
                  <p className="text-xs text-[#AAA] leading-relaxed">
                    {insight?.summary || "Your psychometric responses reveal strong baseline alignment with high-yield adult content niches."}
                  </p>
                </div>

                <div className="bg-[#121218] border border-[#262635] rounded-xl p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                    Attachment Quadrant
                  </span>
                  <h3 className="text-lg font-bold text-[#F4F4EE] capitalize mb-2">
                    {attachment?.quadrant?.replace(/-/g, " ") || "Secure"}
                  </h3>
                  <p className="text-xs text-[#AAA] leading-relaxed">
                    Dictates your ideal fan interaction model: whether you thrive with high-touch GFE intimacy, structured FemDom authority, or elusive mystery.
                  </p>
                </div>
              </div>

              {/* 10-Dimension Visual Profile */}
              {results?.userVector && (
                <div className="bg-[#121218] border border-[#262635] rounded-xl p-5 mb-8">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    10-Dimension Psychological Score Breakdown
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(results.userVector).map(([dim, val]) => {
                      const score = Math.round(val);
                      return (
                        <div key={dim} className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#DDD] capitalize font-medium">{dim}</span>
                            <span className="text-[#D4AF37] font-mono font-bold">{score}/100</span>
                          </div>
                          <div className="h-2 bg-[#1A1A24] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Top 3 Niche Deep-Dive Cards */}
              <div className="space-y-6 mb-8">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Top 3 Fetish Niche Execution Playbooks
                </h4>

                {results?.matches.slice(0, 3).map((match, i) => (
                  <div
                    key={match.niche.keyword}
                    className="bg-[#121218] border border-[#D4AF37]/40 rounded-xl p-5 relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22222D] pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">
                          #{i + 1} MATCH &middot; {match.score}% FIT &middot; {match.niche.category}
                        </span>
                        <h3 className="text-xl font-bold text-[#F4F4EE]">{match.niche.keyword}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                          {match.niche.earningPotential} EARNING POTENTIAL
                        </span>
                        <p className="text-[10px] text-[#888]">
                          Comp: {match.niche.competitionLevel} &middot; Vol: {match.niche.searchVolume}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-[#0A0A0E] p-3 rounded-lg border-l-2 border-[#D4AF37]">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] block mb-1">
                          Mindset &amp; Lifestyle Fit
                        </span>
                        <p className="text-[#CCC] leading-relaxed">{match.reason}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 pt-1">
                        <div className="bg-[#0A0A0E] p-3 rounded-lg">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#AAA] block mb-1">
                            Primary Platform Channels
                          </span>
                          <p className="text-[#DDD]">
                            OnlyFans, Fansly, Reddit Niche Communities, Custom Clip Stores, ASMR Audio
                          </p>
                        </div>
                        <div className="bg-[#0A0A0E] p-3 rounded-lg">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#AAA] block mb-1">
                            Monetization Strategy
                          </span>
                          <p className="text-[#DDD]">
                            $15–$35/mo Sub, $50–$150 PPV Unlocks, $200+ Custom Requests, 24/7 Vault Retainers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* B.N.E. Partnership Pitch & 0% Retainer Conversion */}
              <div className="bg-[#121218] border border-[#D4AF37]/40 rounded-xl p-6 mb-6 text-left">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-2">
                  <Crown className="h-4 w-4" />
                  <span>B.N.E. Studio &middot; Silent Partner Backend</span>
                </div>
                <h3 className="text-xl font-bold text-[#F4F4EE] mb-2">
                  You Focus 100% On Creating Content. We Handle The Empire.
                </h3>
                <p className="text-xs text-[#AAA] leading-relaxed mb-4">
                  Traditional agencies take 20%–50% of your earnings and demand control. B.N.E. Studio operates on a flat monthly retainer with **0% revenue commission** — keeping 100% of your money, accounts, and IP in your hands.
                </p>

                <div className="grid gap-2 sm:grid-cols-2 text-xs text-[#DDD] mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                    <span>18 U.S.C. § 2257 Custodian of Records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                    <span>Anonymous Holding LLC Identity Shielding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                    <span>24/7 DM Monetization &amp; Subscriber Funnels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                    <span>0% Revenue Commission (Flat Retainer)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#22222D]">
                  <button
                    onClick={() => (window.location.href = "/onboarding")}
                    className="btn-luxury active px-6 py-3 text-xs flex items-center gap-2"
                  >
                    <span>Request Private Access &amp; Launch Empire</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setShowDeepDiveModal(false)}
                    className="text-xs text-[#888] hover:text-[#F4F4EE] transition-colors"
                  >
                    Close Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Abandonment popup */}
      {renderAbandonPopup()}
    </div>
  );
}
