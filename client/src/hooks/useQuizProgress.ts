/**
 * useQuizProgress — client-side glue for real-time progress saving + resume.
 *
 * - On mount, restores saved progress (last completed question + answers) so the
 *   user resumes exactly where they left off.
 * - After every answer, debounced-saves to the server (progress.save).
 * - On tab hide / unload (before finishing), fires progress.markAbandoned which
 *   triggers the server-side re-engagement email schedule.
 * - finishQuiz should call progress.complete to persist the match + cancel emails.
 */
import { useCallback, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import type { QuizAnswers } from "@/data/nicheQuiz";

const SAVE_DEBOUNCE_MS = 800;

export interface SavedProgress {
  lastCompletedQuestionId: string | null;
  answers: QuizAnswers;
  questionsAnswered: number;
  completed: boolean;
}

export function useQuizProgress() {
  const getProgress = trpc.progress.get.useQuery(undefined, { retry: false });
  const saveMut = trpc.progress.save.useMutation();
  const abandonMut = trpc.progress.markAbandoned.useMutation();
  const completeMut = trpc.progress.complete.useMutation();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abandonedRef = useRef(false);

  const saved: SavedProgress | null = getProgress.data
    ? {
        lastCompletedQuestionId: getProgress.data.lastCompletedQuestionId,
        answers: (getProgress.data.answers as QuizAnswers) ?? {},
        questionsAnswered: getProgress.data.questionsAnswered ?? 0,
        completed: getProgress.data.completed === "1",
      }
    : null;

  /** Debounced real-time save. Call after each answer update. */
  const save = useCallback(
    (payload: {
      lastCompletedQuestionId: string | null;
      answers: QuizAnswers;
      questionsAnswered: number;
    }) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveMut.mutate(payload);
      }, SAVE_DEBOUNCE_MS);
    },
    [saveMut]
  );

  /** Cancel the debounce and send the latest save synchronously (used on exit). */
  const flush = useCallback(
    (payload: {
      lastCompletedQuestionId: string | null;
      answers: QuizAnswers;
      questionsAnswered: number;
    }) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      saveMut.mutate(payload);
    },
    [saveMut]
  );

  /** Fire the abandonment hook (idempotent per session). */
  const markAbandoned = useCallback(
    (payload: {
      lastCompletedQuestionId: string | null;
      answers: QuizAnswers;
      questionsAnswered: number;
      contact?: { name?: string; email?: string };
      tags?: string[];
    }) => {
      if (abandonedRef.current) return;
      abandonedRef.current = true;
      abandonMut.mutate(payload);
    },
    [abandonMut]
  );

  /** Persist final result + cancel re-engagement. */
  const complete = useCallback(
    (payload: { answers: QuizAnswers; resultSnapshot: unknown }) => {
      abandonedRef.current = true; // never mark abandoned after completion
      completeMut.mutate(payload);
    },
    [completeMut]
  );

  // On tab hidden / unload while an in-progress quiz exists, mark abandoned.
  const lastSeen = useRef<{
    lastCompletedQuestionId: string | null;
    answers: QuizAnswers;
    questionsAnswered: number;
  } | null>(null);

  const registerExit = useCallback(
    (state: {
      lastCompletedQuestionId: string | null;
      answers: QuizAnswers;
      questionsAnswered: number;
    }) => {
      lastSeen.current = state;
    },
    []
  );

  useEffect(() => {
    const maybeAbandon = () => {
      const s = lastSeen.current;
      if (!s || Object.keys(s.answers).length === 0) return;
      // Persist the latest progress synchronously so nothing is lost on exit.
      flush(s);
      if (!abandonedRef.current) {
        abandonedRef.current = true;
        abandonMut.mutate({
          lastCompletedQuestionId: s.lastCompletedQuestionId,
          answers: s.answers,
          questionsAnswered: s.questionsAnswered,
        });
      }
    };
    // visibilitychange→hidden covers tab-close, tab-switch and mobile backgrounding.
    const onVisibility = () => {
      if (document.visibilityState === "hidden") maybeAbandon();
    };
    // pagehide is the most reliable unload signal across browsers.
    const onPageHide = () => maybeAbandon();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [flush, abandonMut]);

  return { saved, save, flush, markAbandoned, complete, registerExit };
}

