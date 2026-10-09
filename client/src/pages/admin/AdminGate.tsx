/**
 * AdminGate — hard gate for the admin operations area.
 *
 * Only users whose session role is exactly 'admin' (verified server-side via
 * trpc.auth.me) ever see the children. Everyone else — signed-out visitors,
 * regular members, search crawlers — gets a locked screen and a noindex
 * robots directive. These routes are also excluded from the sitemap and
 * from prerendering, and are linked from nowhere on the public site.
 */
import { ReactNode } from "react";
import { Link } from "wouter";
import { ShieldAlert, Loader2, Lock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";

export function useAdminStatus() {
  const me = trpc.auth.me.useQuery();
  return {
    loading: me.isLoading,
    isAdmin: !!me.data && (me.data as { role?: string }).role === "admin",
    user: me.data ?? null,
  };
}

function LockedScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200 flex items-center justify-center px-6">
      <Seo
        title="Restricted"
        description="Restricted area."
        noIndex
        noFollow
      />
      <div className="max-w-md w-full text-center border border-zinc-800 rounded-2xl p-10 bg-zinc-950/80">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-950/60 border border-red-900/60 flex items-center justify-center mb-5">
          <Lock className="w-6 h-6 text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Restricted area</h1>
        <p className="text-sm text-zinc-400 mb-6">
          This operations console is limited to site administrators. If you
          believe you should have access, sign in with an admin account.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition"
          >
            Back to site
          </Link>
        </div>
        <p className="mt-6 text-[11px] text-zinc-600 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          Access attempts to this console are limited to authorized staff.
        </p>
      </div>
    </div>
  );
}

export default function AdminGate({ children }: { children: ReactNode }) {
  const { loading, isAdmin } = useAdminStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return <LockedScreen />;
  return <>{children}</>;
}
