/**
 * GeoBlockManager — admin-only client geo-blocking request system.
 *
 * Workflow: file a request under the client's stage alias → pick states,
 * counties, and cities from the US location database → generate
 * platform-by-platform blocking instructions with copy-paste region lists →
 * advance requested → configured → verified (verified only after an admin
 * confirms the live platform settings in person).
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  MapPinOff, Plus, Pencil, Trash2, Copy, Check, ChevronLeft,
  ShieldCheck, AlertTriangle, Search, X, Building2, MapPin, Flag,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import AdminGate, { useAdminStatus } from "./AdminGate";
import { US_STATES, stateName, citiesForState, CityEntry } from "@/data/usLocations";
import { GEO_PLATFORMS, GEO_CAVEATS, GeoPlatform } from "@/data/geoBlockPlatforms";

type Status = "requested" | "configured" | "verified" | "on_hold";

interface BlockLocation {
  state: string;
  stateCode: string;
  county?: string;
  city?: string;
}

interface ProfileForm {
  clientAlias: string;
  platforms: string[];
  blockedStates: string[];
  blockedLocations: BlockLocation[];
  status: Status;
  notes: string;
}

const EMPTY_FORM: ProfileForm = {
  clientAlias: "",
  platforms: [],
  blockedStates: [],
  blockedLocations: [],
  status: "requested",
  notes: "",
};

const STATUS_META: Record<Status, { label: string; cls: string }> = {
  requested: { label: "Requested", cls: "bg-amber-950/60 text-amber-300 border-amber-900/60" },
  configured: { label: "Configured", cls: "bg-sky-950/60 text-sky-300 border-sky-900/60" },
  verified: { label: "Verified", cls: "bg-emerald-950/60 text-emerald-300 border-emerald-900/60" },
  on_hold: { label: "On hold", cls: "bg-zinc-800/60 text-zinc-400 border-zinc-700/60" },
};

const NEXT_STATUS: Partial<Record<Status, Status>> = {
  requested: "configured",
  configured: "verified",
};

/* ── Location picker ─────────────────────────────────────────── */
function LocationPicker({
  blockedStates,
  blockedLocations,
  onAddState,
  onAddLocation,
  onRemoveState,
  onRemoveLocation,
}: {
  blockedStates: string[];
  blockedLocations: BlockLocation[];
  onAddState: (code: string) => void;
  onAddLocation: (loc: BlockLocation) => void;
  onRemoveState: (code: string) => void;
  onRemoveLocation: (idx: number) => void;
}) {
  const [stateCode, setStateCode] = useState("WA");
  const [cityQuery, setCityQuery] = useState("");
  const [customCounty, setCustomCounty] = useState("");
  const [customCity, setCustomCity] = useState("");

  const cities = useMemo(() => citiesForState(stateCode), [stateCode]);
  const filtered = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return cities.slice(0, 12);
    return cities.filter(
      (c) => c.city.toLowerCase().includes(q) || c.county.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [cities, cityQuery]);

  const addCustom = () => {
    if (!customCity.trim() && !customCounty.trim()) return;
    onAddLocation({
      state: stateName(stateCode),
      stateCode,
      county: customCounty.trim() || undefined,
      city: customCity.trim() || undefined,
    });
    setCustomCounty("");
    setCustomCity("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-end">
        <label className="block">
          <span className="text-xs text-zinc-400 font-medium">State</span>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="mt-1 block bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => onAddState(stateCode)}
          disabled={blockedStates.includes(stateCode)}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-sky-900/60 border border-sky-800 text-sky-200 hover:bg-sky-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Flag className="w-4 h-4" /> Block entire {stateName(stateCode)}
        </button>
      </div>

      <div>
        <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 mb-1.5">
          <Search className="w-3.5 h-3.5" /> Add city / county in {stateName(stateCode)}
        </span>
        <input
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          placeholder="Type to search 916 cities…"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600"
        />
        <div className="mt-2 max-h-44 overflow-y-auto border border-zinc-800 rounded-lg divide-y divide-zinc-800/70">
          {filtered.map((c: CityEntry) => {
            const exists = blockedLocations.some(
              (l) => l.stateCode === c.stateCode && l.city === c.city
            );
            return (
              <button
                key={`${c.stateCode}-${c.city}`}
                type="button"
                disabled={exists}
                onClick={() => {
                  onAddLocation({ state: c.state, stateCode: c.stateCode, county: c.county, city: c.city });
                  setCityQuery("");
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-900 flex items-center justify-between disabled:opacity-40"
              >
                <span className="text-zinc-200">
                  {c.city} <span className="text-zinc-500">· {c.county} Co.</span>
                </span>
                {exists
                  ? <Check className="w-4 h-4 text-emerald-400" />
                  : <Plus className="w-4 h-4 text-zinc-500" />}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-3 py-3 text-xs text-zinc-500">No matches — use the custom entry below.</p>
          )}
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg p-3">
        <span className="text-xs text-zinc-400 font-medium">Custom county / city (not in database)</span>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            value={customCounty}
            onChange={(e) => setCustomCounty(e.target.value)}
            placeholder="County (optional)"
            className="flex-1 min-w-[120px] bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600"
          />
          <input
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
            placeholder="City (optional)"
            className="flex-1 min-w-[120px] bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600"
          />
          <button
            type="button"
            onClick={addCustom}
            className="text-sm px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition"
          >
            Add
          </button>
        </div>
      </div>

      {(blockedStates.length > 0 || blockedLocations.length > 0) && (
        <div>
          <span className="text-xs text-zinc-400 font-medium">Blocked regions ({blockedStates.length + blockedLocations.length})</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {blockedStates.map((code) => (
              <span key={code} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-sky-950/70 border border-sky-900 text-sky-200">
                <Flag className="w-3 h-3" /> Entire {stateName(code)}
                <button type="button" onClick={() => onRemoveState(code)} aria-label={`Remove ${code}`}>
                  <X className="w-3.5 h-3.5 hover:text-white" />
                </button>
              </span>
            ))}
            {blockedLocations.map((l, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-violet-950/70 border border-violet-900 text-violet-200">
                <MapPin className="w-3 h-3" />
                {l.city ? `${l.city}, ` : ""}{l.county ? `${l.county} Co., ` : ""}{l.stateCode}
                <button type="button" onClick={() => onRemoveLocation(i)} aria-label="Remove location">
                  <X className="w-3.5 h-3.5 hover:text-white" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Instruction generator ───────────────────────────────────── */
function buildRegionListText(form: ProfileForm): string {
  const lines: string[] = [];
  if (form.blockedStates.length > 0) {
    lines.push(`STATES (${form.blockedStates.length}):`);
    form.blockedStates.forEach((c) => lines.push(`- ${stateName(c)}`));
  }
  if (form.blockedLocations.length > 0) {
    if (lines.length) lines.push("");
    lines.push(`CITIES / COUNTIES (${form.blockedLocations.length}):`);
    form.blockedLocations.forEach((l) =>
      lines.push(`- ${l.city ? l.city + ", " : ""}${l.county ? l.county + " County, " : ""}${l.state} (${l.stateCode})`)
    );
  }
  return lines.join("\n");
}

function InstructionPanel({ form }: { form: ProfileForm }) {
  const [copied, setCopied] = useState<string | null>(null);
  const regionText = buildRegionListText(form);
  const selectedPlatforms: GeoPlatform[] = GEO_PLATFORMS.filter((p) =>
    form.platforms.includes(p.slug)
  );

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable — admin can select manually */
    }
  };

  const fullPacket = [
    `GEO-BLOCK PACKET — client alias: ${form.clientAlias}`,
    `Generated for admin use. Verify each platform's live settings before marking verified.`,
    "",
    "BLOCK THESE REGIONS:",
    regionText,
    "",
    ...selectedPlatforms.flatMap((p) => [
      `── ${p.name.toUpperCase()} (${p.granularity}) ──`,
      `Where: ${p.where}`,
      ...p.steps.map((s, i) => `${i + 1}. ${s}`),
      `List format: ${p.blockListFormat}`,
      `Note: ${p.notes}`,
      "",
    ]),
  ].join("\n");

  return (
    <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 p-6 mt-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Platform blocking instructions
        </h3>
        <button
          type="button"
          onClick={() => copy("full", fullPacket)}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-800 text-emerald-200 hover:bg-emerald-900 transition"
        >
          {copied === "full" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied === "full" ? "Copied" : "Copy full packet"}
        </button>
      </div>

      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-amber-300/90 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          No platforms selected yet — tick the platforms this request covers and the per-platform steps will appear here.
        </p>
      )}

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Region list (paste into platform UIs)</span>
          <button
            type="button"
            onClick={() => copy("regions", regionText)}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition"
          >
            {copied === "regions" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied === "regions" ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-xs bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 whitespace-pre-wrap text-zinc-300 max-h-40 overflow-y-auto">
          {regionText || "No regions selected."}
        </pre>
      </div>

      <div className="space-y-4">
        {selectedPlatforms.map((p) => (
          <div key={p.slug} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/40">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-bold text-white">{p.name}</h4>
              <div className="flex gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {p.granularity.replace("+", " + ")}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    p.confidence === "documented"
                      ? "bg-emerald-950/60 text-emerald-300 border-emerald-900"
                      : p.confidence === "reported"
                        ? "bg-amber-950/60 text-amber-300 border-amber-900"
                        : "bg-red-950/60 text-red-300 border-red-900"
                  }`}
                >
                  {p.confidence === "documented" ? "documented" : p.confidence === "reported" ? "reported — verify" : "verify in live UI"}
                </span>
              </div>
            </div>
            <p className="text-xs text-sky-300 mb-2">Where: {p.where}</p>
            <ol className="text-sm text-zinc-300 space-y-1.5 list-decimal list-inside mb-3">
              {p.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <p className="text-xs text-zinc-500 mb-1"><span className="text-zinc-400 font-medium">List format:</span> {p.blockListFormat}</p>
            <p className="text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5">
              <span className="text-amber-300 font-medium">Admin note:</span> {p.notes}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> Hard truths to set with the client
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {GEO_CAVEATS.map((c) => (
            <div key={c.title} className="border border-amber-900/40 bg-amber-950/20 rounded-xl p-3.5">
              <p className="text-sm font-semibold text-amber-200 mb-1">{c.title}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
function ManagerInner() {
  const utils = trpc.useUtils();
  const listQuery = trpc.adminTools.listGeoBlocks.useQuery();
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const invalidate = () => utils.adminTools.listGeoBlocks.invalidate();

  const createMut = trpc.adminTools.createGeoBlock.useMutation({ onSuccess: () => { invalidate(); setEditingId(null); setForm(EMPTY_FORM); } });
  const updateMut = trpc.adminTools.updateGeoBlock.useMutation({ onSuccess: () => { invalidate(); setEditingId(null); setForm(EMPTY_FORM); } });
  const deleteMut = trpc.adminTools.deleteGeoBlock.useMutation({ onSuccess: () => { invalidate(); setConfirmDelete(null); } });
  const advanceMut = trpc.adminTools.updateGeoBlock.useMutation({ onSuccess: invalidate });

  const startNew = () => { setForm(EMPTY_FORM); setEditingId("new"); };
  const startEdit = (p: NonNullable<typeof listQuery.data>[number]) => {
    setForm({
      clientAlias: p.clientAlias,
      platforms: (p.platforms as string[]) ?? [],
      blockedStates: (p.blockedStates as string[]) ?? [],
      blockedLocations: (p.blockedLocations as BlockLocation[]) ?? [],
      status: (p.status as Status) ?? "requested",
      notes: p.notes ?? "",
    });
    setEditingId(p.id);
  };

  const save = () => {
    if (!form.clientAlias.trim()) return;
    if (editingId === "new") createMut.mutate(form);
    else if (typeof editingId === "number") updateMut.mutate({ ...form, id: editingId });
  };

  const advance = (p: NonNullable<typeof listQuery.data>[number]) => {
    const next = NEXT_STATUS[p.status as Status];
    if (!next) return;
    advanceMut.mutate({
      id: p.id,
      clientAlias: p.clientAlias,
      platforms: (p.platforms as string[]) ?? [],
      blockedStates: (p.blockedStates as string[]) ?? [],
      blockedLocations: (p.blockedLocations as BlockLocation[]) ?? [],
      status: next,
      notes: p.notes ?? "",
    });
  };

  const set = <K extends keyof ProfileForm>(k: K, v: ProfileForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const togglePlatform = (slug: string) =>
    set("platforms", form.platforms.includes(slug)
      ? form.platforms.filter((s) => s !== slug)
      : [...form.platforms, slug]);

  const profiles = listQuery.data ?? [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <Seo title="Geo-Block Manager" description="Admin geo-blocking request system." noIndex noFollow />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6 transition">
          <ChevronLeft className="w-4 h-4" /> Operations Console
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <MapPinOff className="w-8 h-8 text-sky-400" /> Geo-Block Manager
            </h1>
            <p className="text-zinc-400 mt-2 max-w-2xl text-sm">
              Client city / county / state blocking requests. Records use stage aliases only.
              Blocking is IP-based and VPN-defeatable — set expectations in writing.
            </p>
          </div>
          {editingId === null && (
            <button
              onClick={startNew}
              className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold transition"
            >
              <Plus className="w-4 h-4" /> New request
            </button>
          )}
        </div>

        {editingId === null ? (
          <div className="border border-zinc-800 rounded-2xl overflow-hidden">
            {listQuery.isLoading ? (
              <p className="p-8 text-sm text-zinc-500">Loading profiles…</p>
            ) : profiles.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 text-sm mb-4">No geo-block requests yet.</p>
                <button
                  onClick={startNew}
                  className="text-sm px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold transition"
                >
                  File the first request
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-zinc-500 border-b border-zinc-800 bg-zinc-950/60">
                    <th className="px-4 py-3">Client alias</th>
                    <th className="px-4 py-3">Platforms</th>
                    <th className="px-4 py-3">Regions</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {profiles.map((p) => {
                    const st = STATUS_META[(p.status as Status) ?? "requested"];
                    const regionCount = ((p.blockedStates as string[])?.length ?? 0) + ((p.blockedLocations as unknown[])?.length ?? 0);
                    return (
                      <tr key={p.id} className="hover:bg-zinc-900/40">
                        <td className="px-4 py-3 font-semibold text-white">{p.clientAlias}</td>
                        <td className="px-4 py-3 text-zinc-400 text-xs">
                          {((p.platforms as string[]) ?? []).map((s) => GEO_PLATFORMS.find((g) => g.slug === s)?.name ?? s).join(", ") || "—"}
                        </td>
                        <td className="px-4 py-3 text-zinc-400">{regionCount}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[11px] px-2 py-1 rounded-full border ${st.cls}`}>{st.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            {NEXT_STATUS[p.status as Status] && (
                              <button
                                onClick={() => advance(p)}
                                title={`Advance to ${NEXT_STATUS[p.status as Status]}`}
                                className="p-1.5 rounded-lg text-emerald-300 hover:bg-emerald-950/60 transition"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => startEdit(p)} title="Edit" className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition">
                              <Pencil className="w-4 h-4" />
                            </button>
                            {confirmDelete === p.id ? (
                              <span className="flex items-center gap-1.5">
                                <button
                                  onClick={() => deleteMut.mutate({ id: p.id })}
                                  className="text-[11px] px-2 py-1 rounded bg-red-900/70 text-red-200 hover:bg-red-900 transition"
                                >
                                  Confirm
                                </button>
                                <button onClick={() => setConfirmDelete(null)} className="text-[11px] px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                                  Keep
                                </button>
                              </span>
                            ) : (
                              <button onClick={() => setConfirmDelete(p.id)} title="Delete" className="p-1.5 rounded-lg text-zinc-500 hover:bg-red-950/60 hover:text-red-300 transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 p-6 space-y-5">
                <h2 className="text-lg font-bold text-white">
                  {editingId === "new" ? "New geo-block request" : `Edit — ${form.clientAlias}`}
                </h2>
                <label className="block">
                  <span className="text-xs text-zinc-400 font-medium">Client stage alias <span className="text-red-400">* never a legal name</span></span>
                  <input
                    value={form.clientAlias}
                    onChange={(e) => set("clientAlias", e.target.value)}
                    placeholder="e.g. VelvetRogue"
                    className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600"
                  />
                </label>
                <div>
                  <span className="text-xs text-zinc-400 font-medium">Platforms covered</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {GEO_PLATFORMS.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => togglePlatform(p.slug)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition ${
                          form.platforms.includes(p.slug)
                            ? "bg-sky-950/70 border-sky-700 text-sky-200"
                            : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                <LocationPicker
                  blockedStates={form.blockedStates}
                  blockedLocations={form.blockedLocations}
                  onAddState={(code) => set("blockedStates", [...form.blockedStates, code])}
                  onAddLocation={(loc) => set("blockedLocations", [...form.blockedLocations, loc])}
                  onRemoveState={(code) => set("blockedStates", form.blockedStates.filter((c) => c !== code))}
                  onRemoveLocation={(idx) => set("blockedLocations", form.blockedLocations.filter((_, i) => i !== idx))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-zinc-400 font-medium">Status</span>
                    <select
                      value={form.status}
                      onChange={(e) => set("status", e.target.value as Status)}
                      className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                    >
                      {(Object.keys(STATUS_META) as Status[]).map((s) => (
                        <option key={s} value={s}>{STATUS_META[s].label}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs text-zinc-400 font-medium">Admin notes (platform UI quirks, screenshots filed, client comms)</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    placeholder="e.g. OnlyFans state picker confirmed live 9/29; screenshot filed."
                    className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600"
                  />
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={save}
                    disabled={!form.clientAlias.trim() || createMut.isPending || updateMut.isPending}
                    className="text-sm px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold transition disabled:opacity-40"
                  >
                    {editingId === "new" ? "File request" : "Save changes"}
                  </button>
                  <button
                    onClick={() => { setEditingId(null); setForm(EMPTY_FORM); }}
                    className="text-sm px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                  >
                    Cancel
                  </button>
                </div>
                {(createMut.isError || updateMut.isError) && (
                  <p className="text-xs text-red-400">Save failed — check the database connection and try again.</p>
                )}
              </div>

              <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 p-6">
                <h2 className="text-lg font-bold text-white mb-4">Live preview — blocking packet</h2>
                <InstructionPanel form={form} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GeoBlockManager() {
  const { loading, isAdmin } = useAdminStatus();
  if (loading || !isAdmin) {
    return (
      <AdminGate>
        <div />
      </AdminGate>
    );
  }
  return <ManagerInner />;
}
