/**
 * UnifiedRegistrationGate — single account system for the entire BNE platform.
 *
 * Handles:
 * - Local account registration (name/email/password)
 * - Login for existing accounts
 * - Account linking (local ↔ Firebase/OAuth)
 * - "Save and Continue" vs "Save for Later" semantics
 * - Draft merging when a user logs in mid-flow
 *
 * Used by:
 * - NicheQuizExperience (quiz flow)
 * - Onboarding page (application flow)
 * - Any page that needs optional-but-encouraged registration
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { X, UserPlus, LogIn, Link2, Shield, ChevronRight, Loader2 } from "lucide-react";
import { generateSessionId } from "@/lib/session";

export type FlowType = "quiz" | "onboarding" | "application";

interface UnifiedRegistrationGateProps {
  /** What flow is this registration embedded in? */
  flowType: FlowType;
  /** Callback when registration/login succeeds */
  onRegistered: (sessionId: string) => void;
  /** Callback when user dismisses the gate */
  onDismissed?: () => void;
  /** Callback when user links an existing account */
  onLinked?: () => void;
  /** Pre-fill email if known (e.g. from application form) */
  defaultEmail?: string;
  /** Show as compact inline banner vs full modal */
  compact?: boolean;
  /** If true, gate is mandatory (no dismiss button) */
  required?: boolean;
}

type Mode = "register" | "login" | "link";

export default function UnifiedRegistrationGate({
  flowType,
  onRegistered,
  onDismissed,
  onLinked,
  defaultEmail = "",
  compact = false,
  required = false,
}: UnifiedRegistrationGateProps) {
  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  // Generate a stable session ID for this visitor (used for anonymous draft saves)
  const [sessionId] = useState(() => {
    let sid = sessionStorage.getItem("bne_session_id");
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem("bne_session_id", sid);
    }
    return sid;
  });

  const register = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Account created — your progress is now saved.");
      onRegistered(sessionId);
    },
    onError: (e) => setError(e.message),
  });

  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Welcome back — restoring your progress.");
      onRegistered(sessionId);
    },
    onError: (e) => setError(e.message),
  });

  const meQuery = trpc.auth.me.useQuery(undefined, { retry: false });
  const isAuthed = Boolean(meQuery.data);

  // Auto-skip if already authenticated
  useEffect(() => {
    if (isAuthed) {
      onRegistered(sessionId);
    }
  }, [isAuthed, onRegistered, sessionId]);

  // Auto-dismiss if user explicitly closed
  useEffect(() => {
    if (dismissed && !required) {
      onDismissed?.();
    }
  }, [dismissed, onDismissed, required]);

  if (isAuthed || dismissed) return null;

  const flowLabel =
    flowType === "quiz" ? "Save your quiz results" :
    flowType === "onboarding" ? "Save your application" :
    "Save your progress";

  const flowDescription =
    flowType === "quiz" ? "Create an account to save your niche match results and pick up where you left off on any device." :
    flowType === "onboarding" ? "Create an account to save your application draft and continue later from any device." :
    "Create an account to save your progress.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      if (!name.trim()) { setError("Name is required."); return; }
      if (password !== confirmPassword) { setError("Passwords do not match."); return; }
      register.mutate({ name, email, password, subscribe });
    } else if (mode === "login") {
      if (!email || !password) { setError("Email and password are required."); return; }
      login.mutate({ email, password });
    } else if (mode === "link") {
      setIsLinking(true);
      // Trigger OAuth flow which will auto-link to existing local account
      window.location.href = `/api/oauth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  };

  // ─── COMPACT BANNER MODE ────────────────────────────────────────────────────

  if (compact) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-3 md:mb-4">
        <div className="relative rounded-xl border border-[#D4AF37]/20 bg-[#0A0A0C] p-3 md:p-4 shadow-lg">
          {!required && (
            <button
              onClick={() => { setDismissed(true); }}
              className="absolute top-2 right-2 text-[#555] hover:text-[#D4AF37] transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black tracking-[0.3em] text-[#D4AF37] uppercase mb-1">
                {flowLabel}
              </p>
              <p className="text-[11px] text-[#888] leading-relaxed">
                {flowDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {mode === "register" ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-40 h-8 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-[11px] text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); if (!email) { setError("Email required"); return; } register.mutate({ name: email.split("@")[0], email, password: "temp1234!", subscribe }); }}
                    disabled={register.isPending}
                    className="h-8 px-4 rounded-lg bg-[#D4AF37] text-[#000] text-[10px] font-black uppercase tracking-widest disabled:opacity-60 hover:bg-[#FFD700] transition-colors flex items-center gap-1"
                  >
                    {register.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <><UserPlus className="h-3 w-3" /> Save</>}
                  </button>
                  <button
                    onClick={() => switchMode("login")}
                    className="text-[#555] hover:text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest transition-colors"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-40 h-8 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-[11px] text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-32 h-8 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-[11px] text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); login.mutate({ email, password }); }}
                    disabled={login.isPending}
                    className="h-8 px-4 rounded-lg bg-[#D4AF37] text-[#000] text-[10px] font-black uppercase tracking-widest disabled:opacity-60 hover:bg-[#FFD700] transition-colors flex items-center gap-1"
                  >
                    {login.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <><LogIn className="h-3 w-3" /> Login</>}
                  </button>
                  <button
                    onClick={() => switchMode("register")}
                    className="text-[#555] hover:text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {error && <p className="text-[10px] text-red-400 mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  // ─── FULL MODAL MODE ────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-[#2A2A30] bg-[#0B0B0D] p-6 md:p-8 shadow-2xl relative"
      >
        {!required && (
          <button
            onClick={() => { setDismissed(true); }}
            className="absolute top-4 right-4 text-[#555] hover:text-[#D4AF37] transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <p className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] mb-2 uppercase">
          {flowLabel}
        </p>
        <h2 className="text-2xl font-display text-[#F4F4EE] leading-tight mb-2">
          {mode === "register" ? "Create Your Account" : mode === "login" ? "Welcome Back" : "Link Account"}
        </h2>
        <p className="text-sm text-[#9FA6B2] mb-6">
          {flowDescription}
        </p>

        {/* Mode tabs */}
        <div className="flex items-center gap-1 mb-6 bg-[#111] p-1 rounded-lg">
          <button
            onClick={() => switchMode("register")}
            className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors ${mode === "register" ? "bg-[#D4AF37] text-[#000]" : "text-[#666] hover:text-[#AAA]"}`}
          >
            <UserPlus className="h-3 w-3 inline mr-1" /> Sign Up
          </button>
          <button
            onClick={() => switchMode("login")}
            className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors ${mode === "login" ? "bg-[#D4AF37] text-[#000]" : "text-[#666] hover:text-[#AAA]"}`}
          >
            <LogIn className="h-3 w-3 inline mr-1" /> Login
          </button>
          <button
            onClick={() => switchMode("link")}
            className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors ${mode === "link" ? "bg-[#D4AF37] text-[#000]" : "text-[#666] hover:text-[#AAA]"}`}
          >
            <Link2 className="h-3 w-3 inline mr-1" /> Link
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Name</label>
                <input
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Email</label>
                <input
                  type="email"
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Password</label>
                <input
                  type="password"
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, with a letter and number"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Confirm Password</label>
                <input
                  type="password"
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  minLength={8}
                />
              </div>
              <label className="flex items-center gap-3 text-sm text-[#9FA6B2]">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="accent-[#D4AF37]"
                />
                Send me updates & re-engagement emails (unsubscribe anytime)
              </label>
            </>
          )}

          {mode === "login" && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Email</label>
                <input
                  type="email"
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2 font-bold">Password</label>
                <input
                  type="password"
                  className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  minLength={8}
                />
              </div>
            </>
          )}

          {mode === "link" && (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                <Link2 className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <p className="text-sm text-[#AAA] mb-2">
                Already have a Google / OAuth account?
              </p>
              <p className="text-xs text-[#666] mb-4">
                Link it to your local account to access the members portal with either method.
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={register.isPending || login.isPending || isLinking}
            className="w-full h-14 rounded-full bg-gradient-to-r from-[#F4E3A1] via-[#D4AF37] to-[#B8902A] text-[#0B0B0D] font-extrabold tracking-wide disabled:opacity-60 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {(register.isPending || login.isPending || isLinking) ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
            ) : (
              <>{mode === "register" ? "Create Account" : mode === "login" ? "Login" : "Link Account"} <ChevronRight className="h-5 w-5" /></>
            )}
          </button>
        </form>

        <p className="text-[10px] text-[#555] text-center mt-4">
          By continuing you agree to our Terms. We never share your data.
        </p>
      </motion.div>
    </div>
  );
}
