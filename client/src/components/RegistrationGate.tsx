/**
 * RegistrationGate — luxury name/email/custom-password capture shown before the
 * Niche Matcher quiz. On submit it calls auth.register (which also opts the user
 * into the structured contact list) and reveals the quiz.
 *
 * If the user is already authenticated, the gate is skipped automatically.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function RegistrationGate({
  onRegistered,
}: {
  onRegistered: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const register = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Welcome — your progress will auto-save.");
      onRegistered();
    },
    onError: (e) => setError(e.message),
  });

  const me = trpc.auth.me.useQuery();
  if (me.data) {
    // Already logged in; skip the gate.
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    register.mutate({ name, email, password, subscribe });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-[#2A2A30] bg-[#0B0B0D] p-8 shadow-2xl"
      >
        <p className="text-[11px] font-black tracking-[0.4em] uppercase text-[#D4AF37] mb-2">
          Blacklisted Studio
        </p>
        <h2 className="text-3xl font-display text-[#F4F4EE] leading-tight mb-1">
          Unlock your Niche Match
        </h2>
        <p className="text-sm text-[#9FA6B2] mb-6">
          Create a free account and we'll save your progress automatically — pick up
          exactly where you left off, on any device.
        </p>

        <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2">
          Name
        </label>
        <input
          className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] mb-4 outline-none focus:border-[#D4AF37]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] mb-4 outline-none focus:border-[#D4AF37]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label className="block text-[10px] uppercase tracking-[0.3em] text-[#666] mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full h-12 rounded-lg bg-[#15151A] border border-[#2A2A30] px-4 text-[#F4F4EE] mb-4 outline-none focus:border-[#D4AF37]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 chars, with a number"
          required
          minLength={8}
        />

        <label className="flex items-center gap-3 mb-5 text-sm text-[#9FA6B2]">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="accent-[#D4AF37]"
          />
          Send me niche insights &amp; re-engagement emails (unsubscribe anytime)
        </label>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={register.isPending}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#F4E3A1] via-[#D4AF37] to-[#B8902A] text-[#0B0B0D] font-extrabold tracking-wide disabled:opacity-60"
        >
          {register.isPending ? "Creating account…" : "Begin My Match →"}
        </button>
      </form>
    </div>
  );
}


