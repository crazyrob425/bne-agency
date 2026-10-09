/**
 * MemberModules — admin tool for per-client members-area module assignment.
 *
 * Pick a client, then multi-select which modules (grouped under the three
 * adult-persona categories) appear in their members area. Anything not
 * assigned is never rendered or linked for that client.
 *
 * Role-gated by AdminGate; data mutations go through adminProcedure.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  Inbox,
  LayoutGrid,
  Loader2,
  Save,
  Search,
  ShieldCheck,
  Users,
  Wand2,
  ShieldAlert,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import AdminGate from "./AdminGate";
import {
  MEMBER_MODULES,
  modulesByCategory,
  type MemberModuleDef,
} from "@shared/memberModules";

const ICONS: Record<string, typeof Inbox> = {
  Inbox,
  Wand2,
  ShieldCheck,
};

function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? LayoutGrid;
  return <C className={className} />;
}

interface ClientRow {
  id: number;
  name: string | null;
  email: string | null;
  role: string;
  membersAccessGranted: number | null;
  membersPermissions: unknown;
}

function permsOf(u: ClientRow): { modules: string[]; [k: string]: unknown } {
  const p = (u.membersPermissions ?? {}) as Record<string, unknown>;
  return {
    ...p,
    modules: Array.isArray(p.modules) ? (p.modules as string[]).filter((m) => MEMBER_MODULES.some((d) => d.key === m)) : [],
  };
}

export default function MemberModules() {
  const usersQuery = trpc.adminUsers.list.useQuery();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modules, setModules] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [savedTick, setSavedTick] = useState(0);

  const updateMut = trpc.adminUsers.updatePermissions.useMutation({
    onSuccess: () => {
      setDirty(false);
      setSavedTick((t) => t + 1);
      utils.adminUsers.list.invalidate();
    },
  });
  const accessMut = trpc.adminUsers.grantAccess.useMutation({
    onSuccess: () => utils.adminUsers.list.invalidate(),
  });
  const revokeMut = trpc.adminUsers.revokeAccess.useMutation({
    onSuccess: () => utils.adminUsers.list.invalidate(),
  });

  const clients = useMemo(() => {
    const all = ((usersQuery.data ?? []) as ClientRow[]).filter((u) => u.role !== "admin");
    const q = search.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (u) =>
        (u.name ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q)
    );
  }, [usersQuery.data, search]);

  const selected = useMemo(
    () => ((usersQuery.data ?? []) as ClientRow[]).find((u) => u.id === selectedId) ?? null,
    [usersQuery.data, selectedId]
  );

  const pickClient = (u: ClientRow) => {
    setSelectedId(u.id);
    setModules(permsOf(u).modules);
    setDirty(false);
  };

  const toggleModule = (key: string) => {
    setModules((m) => (m.includes(key) ? m.filter((k) => k !== key) : [...m, key]));
    setDirty(true);
  };

  const save = () => {
    if (!selected) return;
    const base = permsOf(selected);
    updateMut.mutate({
      userId: selected.id,
      membersAccessGranted: (selected.membersAccessGranted ?? 0) === 1,
      permissions: {
        dashboard: base.dashboard !== false,
        vault: base.vault === true,
        tools: base.tools === true,
        admin: false,
        messaging: base.messaging === true,
        billing: base.billing === true,
        modules,
      },
    });
  };

  const grouped = modulesByCategory();

  return (
    <AdminGate>
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
        <Seo title="Member Modules" description="Assign members-area modules per client." noIndex noFollow />
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Operations Console
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <LayoutGrid className="w-6 h-6 text-emerald-400" />
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">Restricted · Administrators only</p>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Member Modules</h1>
          <p className="text-zinc-400 max-w-2xl mb-8">
            Choose exactly which tools each client sees in their members area. Modules are
            organized under the three persona categories — a client only ever sees what
            you assign here.
          </p>

          <div className="grid md:grid-cols-[320px_1fr] gap-6">
            {/* Client list */}
            <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 overflow-hidden h-fit">
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                  <Users className="w-4 h-4" /> Clients
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name or email…"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>
              <div className="max-h-[480px] overflow-y-auto">
                {usersQuery.isLoading && (
                  <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-zinc-500" /></div>
                )}
                {clients.map((u) => {
                  const mods = permsOf(u).modules;
                  const active = u.id === selectedId;
                  return (
                    <button
                      key={u.id}
                      onClick={() => pickClient(u)}
                      className={`w-full text-left px-4 py-3 border-b border-zinc-800/60 hover:bg-zinc-900/60 transition ${active ? "bg-emerald-950/30 border-l-2 border-l-emerald-400" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white truncate">{u.name || "Unnamed"}</p>
                        {(u.membersAccessGranted ?? 0) === 1 ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400 bg-emerald-950/60 border border-emerald-900 rounded px-1.5 py-0.5">Access</span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5">No access</span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 truncate">{u.email}</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">{mods.length} module{mods.length === 1 ? "" : "s"} assigned</p>
                    </button>
                  );
                })}
                {!usersQuery.isLoading && clients.length === 0 && (
                  <p className="p-6 text-sm text-zinc-500">No clients match.</p>
                )}
              </div>
            </div>

            {/* Picker */}
            <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 p-6 h-fit">
              {!selected ? (
                <div className="py-16 text-center">
                  <Users className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400 text-sm">Select a client on the left to manage their modules.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{selected.name || "Unnamed"}</h2>
                      <p className="text-sm text-zinc-500">{selected.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(selected.membersAccessGranted ?? 0) === 1 ? (
                        <button
                          onClick={() => revokeMut.mutate({ userId: selected.id })}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-900 text-red-400 hover:bg-red-950/40"
                        >
                          Revoke access
                        </button>
                      ) : (
                        <button
                          onClick={() => accessMut.mutate({ userId: selected.id })}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-300 hover:bg-emerald-950/40"
                        >
                          Grant access
                        </button>
                      )}
                    </div>
                  </div>

                  {(selected.membersAccessGranted ?? 0) !== 1 && (
                    <div className="flex items-start gap-2.5 mb-6 p-4 rounded-xl border border-amber-900/60 bg-amber-950/20">
                      <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-200/90">
                        This client has no members-area access yet. Module assignments are saved
                        but stay invisible until you grant access.
                      </p>
                    </div>
                  )}

                  {grouped.map(({ category, modules: catModules }) => (
                    <div key={category.key} className="mb-7">
                      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-zinc-600 mb-3">{category.blurb}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {catModules.map((m: MemberModuleDef) => {
                          const on = modules.includes(m.key);
                          return (
                            <button
                              key={m.key}
                              onClick={() => toggleModule(m.key)}
                              className={`text-left border rounded-xl p-4 transition ${
                                on
                                  ? "border-emerald-700 bg-emerald-950/25"
                                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <ModuleIcon name={m.icon} className={`w-5 h-5 ${on ? "text-emerald-400" : "text-zinc-500"}`} />
                                <span
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                    on ? "bg-emerald-500 border-emerald-500" : "border-zinc-700"
                                  }`}
                                >
                                  {on && <Check className="w-3.5 h-3.5 text-black" />}
                                </span>
                              </div>
                              <p className="text-sm font-bold text-white">{m.name}</p>
                              <p className={`text-xs font-medium mb-1 ${on ? "text-emerald-300" : "text-zinc-500"}`}>{m.tagline}</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">{m.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                    <button
                      onClick={save}
                      disabled={!dirty || updateMut.isPending}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold text-black transition"
                    >
                      {updateMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save modules
                    </button>
                    {updateMut.isError && (
                      <p className="text-sm text-red-400">Save failed — try again.</p>
                    )}
                    {!dirty && savedTick > 0 && (
                      <p className="text-sm text-emerald-400 inline-flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Saved — live on the client's next portal visit.
                      </p>
                    )}
                    {dirty && <p className="text-sm text-zinc-500">Unsaved changes.</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
