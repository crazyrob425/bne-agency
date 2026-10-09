/**
 * PortalHome — the client's modular members area home.
 * Renders ONLY the modules the admin assigned to this client.
 */
import { Link } from "wouter";
import { Inbox, LayoutGrid, ShieldCheck, Wand2, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import MemberGate from "./MemberGate";
import { MEMBER_MODULES } from "@shared/memberModules";

const ICONS: Record<string, typeof Inbox> = { Inbox, Wand2, ShieldCheck };

function PortalInner() {
  const me = trpc.members.me.useQuery();
  const mine = MEMBER_MODULES.filter((m) => me.data?.modules.includes(m.key));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <Seo title="My Portal" description="Your BNE members portal." noIndex noFollow />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">Members area</p>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Welcome{me.data?.name ? `, ${me.data.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="text-zinc-400 max-w-2xl mb-10">
          Your studio toolkit — everything your account manager has switched on
          for you, in one place.
        </p>

        {mine.length === 0 ? (
          <div className="border border-zinc-800 rounded-2xl p-10 bg-zinc-950/70 text-center">
            <LayoutGrid className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              No tools enabled yet. Your account manager is setting up your
              workspace — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mine.map((m) => {
              const Icon = ICONS[m.icon] ?? LayoutGrid;
              return (
                <Link
                  key={m.key}
                  href={m.route}
                  className="group block border border-zinc-800 rounded-2xl p-7 bg-zinc-950/70 transition hover:border-emerald-800 hover:bg-zinc-950"
                >
                  <Icon className="w-9 h-9 text-emerald-400 mb-4" />
                  <h2 className="text-xl font-bold text-white mb-1">{m.name}</h2>
                  <p className="text-sm font-medium text-emerald-300 mb-3">{m.tagline}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{m.description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalHome() {
  return (
    <MemberGate>
      <PortalInner />
    </MemberGate>
  );
}
