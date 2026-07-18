/**
 * useQuizProgress — client-side glue for real-time progress saving + resume.
 *
 * Supports both authenticated (server) and anonymous (localStorage) modes.
 *
 * - On mount, restores saved progress (last completed question + answers) so the
 *   user resumes exactly where they left off.
 * - After every answer, debounced-saves to the server (if authenticated) or
 *   localStorage (if anonymous).
 * - On tab hide / unload (before finishing), fires progress.markAbandoned which
 *   triggers the server-side re-engagement email schedule (auth only).
 * - finishQuiz should call progress.complete to persist the match + cancel emails.
 */
import { useCallback, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import type { QuizAnswers } from "@/data/nicheQuiz";

const SAVE_DEBOUNCE_MS = 800;
const LOCAL_STORAGE_KEY = "niche-quiz-anon-progress";

export interface SavedProgress {
  lastCompletedQuestionId: string | null;
  answers: QuizAnswers;
  questionsAnswered: number;
  completed: boolean;
}

function loadLocalProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedProgress;
  } catch {
    return null;
  }
}

function saveLocalProgress(progress: SavedProgress) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

function clearLocalProgress() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useQuizProgress() {
  const getProgress = trpc.progress.get.useQuery(undefined, { retry: false });
  const saveMut = trpc.progress.save.useMutation();
  const abandonMut = trpc.progress.markAbandoned.useMutation();
  const completeMut = trpc.progress.complete.useMutation();
  const meQuery = trpc.auth.me.useQuery(undefined, { retry: false });

  const isAuthenticated = Boolean(meQuery.data);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abandonedRef = useRef(false);

  // Server progress (auth only)
  const serverSaved = getProgress.data
    ? {
        lastCompletedQuestionId: getProgress.data.lastCompletedQuestionId,
        answers: (getProgress.data.answers as QuizAnswers) ?? {},
        questionsAnswered: getProgress.data.questionsAnswered ?? 0,
        completed: getProgress.data.completed === "1",
      }
    : null;

  // Local progress (anonymous fallback)
  const localSaved = loadLocalProgress();

  // Effective saved progress: prefer server if authenticated, else local
  const saved: SavedProgress | null = isAuthenticated ? serverSaved : localSaved;

  /** Debounced real-time save. Call after each answer update. */
  const save = useCallback(
    (payload: {
      lastCompletedQuestionId: string | null;
      answers: QuizAnswers;
      questionsAnswered: number;
    }) => {
      if (isAuthenticated) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          saveMut.mutate(payload);
        }, SAVE_DEBOUNCE_MS);
      } else {
        // Anonymous: save immediately to localStorage
        saveLocalProgress({
          lastCompletedQuestionId: payload.lastCompletedQuestionId,
          answers: payload.answers,
          questionsAnswered: payload.questionsAnswered,
          completed: false,
        });
      }
    },
    [isAuthenticated, saveMut]
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
      if (isAuthenticated) {
        saveMut.mutate(payload);
      } else {
        saveLocalProgress({
          lastCompletedQuestionId: payload.lastCompletedQuestionId,
          answers: payload.answers,
          questionsAnswered: payload.questionsAnswered,
          completed: false,
        });
      }
    },
    [isAuthenticated, saveMut]
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
      if (isAuthenticated) {
        abandonMut.mutate(payload);
      }
      // For anonymous users, we keep the localStorage progress for resume
    },
    [isAuthenticated, abandonMut]
  );

  /** Persist final result + cancel re-engagement. */
  const complete = useCallback(
    (payload: { answers: QuizAnswers; resultSnapshot: unknown }) => {
      abandonedRef.current = true;
      if (isAuthenticated) {
        completeMut.mutate(payload);
      }
      clearLocalProgress();
    },
    [isAuthenticated, completeMut]
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
        if (isAuthenticated) {
          abandonMut.mutate({
            lastCompletedQuestionId: s.lastCompletedQuestionId,
            answers: s.answers,
            questionsAnswered: s.questionsAnswered,
          });
        }
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") maybeAbandon();
    };
    const onPageHide = () => maybeAbandon();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [flush, isAuthenticated, abandonMut]);

  return {
    saved,
    isAuthenticated,
    save,
    flush,
    markAbandoned,
    complete,
    registerExit,
  };
}
