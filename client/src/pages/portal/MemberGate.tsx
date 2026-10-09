/**
 * MemberGate — portal access control for the modular members area.
 *
 * - Requires a signed-in session with members access (trpc.members.me,
 *   backed by memberProcedure server-side).
 * - Optionally requires a specific module key; unassigned modules render
 *   a "not enabled" notice instead of the tool. Nothing leaks by URL.
 */
import { ReactNode } from "react";
import { Link } from "wouter";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";

export default function MemberGate({ module, children }: { module?: string; children: ReactNode }) {
  const me = trpc.members.me.useQuery(undefined, { retry: false });

  if (me.isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-600" />
      </div>
    );
  }

  if (me.isError || !me.data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200 flex items-center justify-center px-6">
        <Seo title="Members" description="Members area." noIndex noFollow />
        <div className="max-w-md text-center border border-zinc-800 rounded-2xl p-10 bg-zinc-950/70">
          <Lock className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Members only</h1>
          <p className="text-sm text-zinc-400 mb-6">
            This area is for BNE clients with an active members login. If you
            believe you should have access, contact your account manager.
          </p>
          <Link href="/" className="text-sm font-semibold text-white underline underline-offset-4">
            Back to the main site
          </Link>
        </div>
      </div>
    );
  }

  if (module && !me.data.modules.includes(module)) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200 flex items-center justify-center px-6">
        <Seo title="Members" description="Members area." noIndex noFollow />
        <div className="max-w-md text-center border border-zinc-800 rounded-2xl p-10 bg-zinc-950/70">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Not enabled for your account</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Your account manager hasn't switched this tool on for you yet. Ask
            them about it — modules can be enabled per client at any time.
          </p>
          <Link href="/portal" className="text-sm font-semibold text-white underline underline-offset-4">
            Back to your portal
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
