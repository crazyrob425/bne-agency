/**
 * RegistrationGate — optional name/email/custom-password capture.
 *
 * Rendered as a dismissible banner at the top of the Niche Matcher quiz.
 * The quiz remains fully usable without signing up; progress is saved to
 * localStorage for anonymous users and synced to the server once they register.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { X } from "lucide-react";

export function RegistrationGate({
  onRegistered,
  onDismissed,
}: {
  onRegistered: () => void;
  onDismissed?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const register = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Welcome — your progress will auto-save.");
      onRegistered();
    },
    onError: (e) => setError(e.message),
  });

  const me = trpc.auth.me.useQuery();
  if (me.data || dismissed) {
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    register.mutate(
      { name, email, password, subscribe },
      {
        onSuccess: () => {
          onDismissed?.();
        },
      }
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-3 md:mb-4">
      <div className="relative rounded-xl border border-[#D4AF37]/20 bg-[#0A0A0C] p-4 md:p-5 shadow-lg">
        <button
          onClick={() => {
            setDismissed(true);
            onDismissed?.();
          }}
          className="absolute top-3 right-3 text-[#555] hover:text-[#D4AF37] transition-colors"
          aria-label="Dismiss registration"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase mb-1">
              Free Account — Optional
            </p>
            <h3 className="text-base md:text-lg font-display text-[#F4F4EE] leading-tight mb-1">
              Save your match &amp; resume anywhere
            </h3>
            <p className="text-xs text-[#777] leading-relaxed">
              Create an account to sync progress across devices and get your full
              dossier. Or skip it — you can always register later.
            </p>
          </div>

          <form onSubmit={submit} className="flex-shrink-0 flex flex-col gap-2 sm:min-w-[260px]">
            <input
              className="w-full h-9 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-xs text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              className="w-full h-9 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-xs text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <input
              type="password"
              className="w-full h-9 rounded-lg bg-[#111] border border-[#2A2A30] px-3 text-xs text-[#F4F4EE] outline-none focus:border-[#D4AF37]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (8+ chars)"
              required
              minLength={8}
            />
            {error && <p className="text-[11px] text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={register.isPending}
              className="w-full h-9 rounded-lg bg-[#D4AF37] text-[#000] text-[11px] font-black uppercase tracking-widest disabled:opacity-60 hover:bg-[#FFD700] transition-colors"
            >
              {register.isPending ? "Creating…" : "Save Progress →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


