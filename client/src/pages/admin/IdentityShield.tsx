/**
 * IdentityShield — admin-only anti-facial-recognition & persona-separation toolkit.
 *
 * Four tools:
 *  1. Metadata Stripper — working in-browser EXIF/XMP/IPTC removal.
 *  2. Cloaking & Poisoning — adversarial-cloak guidance (Fawkes-style) that
 *     poisons facial-recognition training data.
 *  3. Exposure Audit — reverse-image / search-engine exposure checklist.
 *  4. Persona Firewall — the full compartmentalization playbook that keeps a
 *     client's adult persona, real identity, family, and day-job life apart.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Fingerprint, ChevronLeft, Eraser, Ghost, Radar, BrickWall,
  Check, ExternalLink, AlertTriangle, Info, RotateCcw,
} from "lucide-react";
import Seo from "@/components/Seo";
import AdminGate, { useAdminStatus } from "./AdminGate";
import ExifStripper from "./ExifStripper";

type Tab = "stripper" | "cloaking" | "audit" | "firewall";

const TABS: { id: Tab; label: string; icon: typeof Eraser; blurb: string }[] = [
  { id: "stripper", label: "Metadata Stripper", icon: Eraser, blurb: "Working tool — destroys EXIF, GPS, edit history in images" },
  { id: "cloaking", label: "Cloaking & Poisoning", icon: Ghost, blurb: "Adversarial cloaks that poison facial-recognition models" },
  { id: "audit", label: "Exposure Audit", icon: Radar, blurb: "Reverse-image & search-engine exposure checklist" },
  { id: "firewall", label: "Persona Firewall", icon: BrickWall, blurb: "Full compartmentalization: persona vs real life vs family vs job" },
];

/* ── Persistent checklist ────────────────────────────────────── */
function useChecklist(key: string, count: number) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const raw = localStorage.getItem(`shield:${key}`);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === count) return arr;
      }
    } catch { /* ignore */ }
    return new Array(count).fill(false);
  });
  useEffect(() => {
    try { localStorage.setItem(`shield:${key}`, JSON.stringify(checked)); } catch { /* ignore */ }
  }, [checked, key]);
  const toggle = (i: number) =>
    setChecked((c) => c.map((v, j) => (j === i ? !v : v)));
  const reset = () => setChecked(new Array(count).fill(false));
  return { checked, toggle, reset, done: checked.filter(Boolean).length };
}

function CheckItem({ done, onToggle, title, body, level }: {
  done: boolean; onToggle: () => void; title: string; body: string; level?: "critical" | "high" | "standard";
}) {
  const lvl = level === "critical"
    ? "border-red-900/70 bg-red-950/25"
    : level === "high"
      ? "border-amber-900/60 bg-amber-950/20"
      : "border-zinc-800 bg-zinc-950/60";
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left border rounded-xl p-4 flex gap-3 transition ${lvl} ${done ? "opacity-60" : "hover:border-zinc-600"}`}
    >
      <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${done ? "bg-emerald-600 border-emerald-600" : "border-zinc-600 bg-zinc-900"}`}>
        {done && <Check className="w-3.5 h-3.5 text-white" />}
      </span>
      <span>
        <span className={`block text-sm font-semibold ${done ? "line-through text-zinc-500" : "text-white"}`}>
          {title}
          {level === "critical" && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-900/70 text-red-200 font-bold no-underline">CRITICAL</span>}
        </span>
        <span className="block text-xs text-zinc-400 mt-1 leading-relaxed">{body}</span>
      </span>
    </button>
  );
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full bg-violet-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-zinc-400 font-medium">{done}/{total} · {pct}%</span>
    </div>
  );
}

/* ── Tab: Cloaking ───────────────────────────────────────────── */
const CLOAK_SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What cloaking actually does",
    body: [
      "Adversarial cloaking (the Fawkes technique from UChicago's SAND Lab) makes pixel-level changes to a photo that are invisible to human eyes but scramble what a facial-recognition model learns. If a scraper feeds your cloaked photos into a recognition model, the model learns the WRONG face — your real face won't match later.",
      "This is poisoning, not hiding: it protects against FUTURE model training on scraped photos. It does nothing against a human looking at the picture, reverse image search, or photos that were already scraped uncloaked.",
    ],
  },
  {
    title: "The tools",
    body: [
      "Fawkes (free, Windows/Mac, from UChicago SAND Lab — sandlab.cs.uchicago.edu/fawkes, source on GitHub under Shawn-Shan/fawkes): the original. Run every face-forward promo photo through it before posting. Takes ~a minute per image on a normal laptop.",
      "LowKey (web-based, same research lineage): no install, useful when you're on a machine you don't own. Upload, cloak, download, then strip metadata.",
      "Nightshade (same lab): poisons image-generation models rather than face recognition — relevant if the client's likeness is being used to train lookalike generators.",
    ],
  },
  {
    title: "The workflow that actually works",
    body: [
      "Order matters: CLOAK first, then STRIP metadata with the tool on the first tab, then post. Cloaking after stripping is fine too — but never post the uncloaked original anywhere, not even privately, because private leaks happen.",
      "Cloak EVERY version: the full-size, the crop, the thumbnail, the teaser. One uncloaked copy floating around gives scrapers clean training data and undoes the rest.",
      "Re-cloak on repost: if a photo gets re-uploaded months later, cloak the file you're actually uploading, not the memory of having cloaked it once.",
      "Keep an uncloaked master archive OFFLINE (encrypted drive, not cloud) for the client's own records — never in Google Photos or iCloud where it can be indexed or shared.",
    ],
  },
  {
    title: "Honest limits — say these out loud to the client",
    body: [
      "Cloaking does NOT defeat reverse image search (TinEye, Google Lens, Yandex). If the same photo exists elsewhere uncloaked, it will match. Photo-reuse discipline matters more than cloaking.",
      "Cloaking does NOT defeat a human recognizing the client. Masks, angles, and keeping the face out of risky shots are still the primary defense.",
      "Photos scraped BEFORE cloaking existed can't be retroactively poisoned. The audit tab exists to find out what's already out there.",
    ],
  },
];

function CloakingTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 text-xs text-sky-300/90 bg-sky-950/20 border border-sky-900/40 rounded-xl p-3">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>Rule of thumb for clients: <strong>cloak the face, strip the file, separate the life.</strong> The three tabs of this console are those three jobs, in order.</p>
      </div>
      {CLOAK_SECTIONS.map((s) => (
        <div key={s.title} className="border border-zinc-800 rounded-xl bg-zinc-950/60 p-5">
          <h3 className="text-white font-bold mb-3">{s.title}</h3>
          <div className="space-y-2.5">
            {s.body.map((p, i) => (
              <p key={i} className="text-sm text-zinc-400 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      ))}
      <a
        href="https://sandlab.cs.uchicago.edu/fawkes/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200 transition"
      >
        Fawkes — UChicago SAND Lab <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

/* ── Tab: Exposure audit ─────────────────────────────────────── */
const AUDIT_ITEMS: { title: string; body: string; level: "critical" | "high" | "standard" }[] = [
  {
    title: "PimEyes — face-search the client's 3 most public promo shots",
    body: "PimEyes is the consumer face-search engine most likely to link a stage persona to a real identity. Run the client's clearest face-forward promo photos. Note every match: which site, which photo, whether it bridges to a real name. File PimEyes removal requests for any match that links outward.",
    level: "critical",
  },
  {
    title: "Google Lens + TinEye + Yandex Images — reverse-search every promo batch",
    body: "Before any batch of promo content goes live, reverse-search 2–3 representative shots on all three. You're looking for prior leaks, reposts on aggregator/“leak” sites, and any copy of the photo tied to a real identity. Yandex is unusually strong on faces — don't skip it.",
    level: "critical",
  },
  {
    title: "Search the stage name AND real-name variants on Google/Bing",
    body: "Stage name, stage name + city, real first+last name, real name + employer, known usernames. Check image results specifically — that's where the bridges hide. Record what page each hit is on; anything on page 1–2 needs action.",
    level: "high",
  },
  {
    title: "View the persona as a stranger — check “people you may know” leakage",
    body: "Logged out (or in a clean browser profile), open the persona's public profiles. Check suggested/related accounts: if the client's real account, family, or coworkers appear as suggestions, the social graph is already bridged. Kill the bridge (see Persona Firewall) and re-check in 2 weeks.",
    level: "high",
  },
  {
    title: "Sweep aggregator and “leak” sites for the stage name",
    body: "Search the stage name on known repost/aggregator and piracy-adjacent sites. Where content appears, start DMCA takedowns immediately and log each request with dates — repeat infringers lose safe harbor faster when you have a paper trail.",
    level: "high",
  },
  {
    title: "Check old pre-persona posts for face matches",
    body: "The client's OLD public photos (pre-persona, real accounts) are the training data that links everything. Audit the real accounts' public photos: anything with the same face, tattoos, rooms, or pets that also appear in persona content is a bridge. Delete or privatize.",
    level: "standard",
  },
  {
    title: "Schedule the next audit — quarterly, plus after every incident",
    body: "Exposure isn't a one-time check. Put the client on a quarterly re-audit and run a fresh audit within 48 hours of any suspected leak, doxxing attempt, or “someone recognized me” report.",
    level: "standard",
  },
];

function AuditTab() {
  const { checked, toggle, reset, done } = useChecklist("audit", AUDIT_ITEMS.length);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-zinc-400 max-w-xl">
          Run this for every new client at onboarding, then quarterly. Check items off as you complete them — progress is saved in this browser.
        </p>
        <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
      <ProgressBar done={done} total={AUDIT_ITEMS.length} />
      {AUDIT_ITEMS.map((item, i) => (
        <CheckItem key={item.title} done={checked[i]} onToggle={() => toggle(i)} title={item.title} body={item.body} level={item.level} />
      ))}
      <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 border border-amber-900/40 rounded-xl p-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>If the audit finds a bridge between persona and real identity, stop and contain FIRST (takedown, privatize, delete) before continuing the checklist. Log everything with dates.</p>
      </div>
    </div>
  );
}

/* ── Tab: Persona firewall ───────────────────────────────────── */
const FIREWALL_LAYERS: { title: string; why: string; items: { title: string; body: string; level: "critical" | "high" | "standard" }[] }[] = [
  {
    title: "Layer 1 — Face, body & image discipline",
    why: "The face is the single highest-risk identifier. Everything in this layer reduces what recognition systems and humans have to work with.",
    items: [
      { title: "Cloak every face-forward photo before it exists publicly", body: "Fawkes/LowKey on every version, every crop, every repost. No uncloaked face-forward shot leaves the building — not even in “private” DMs.", level: "critical" },
      { title: "Cover or edit out identifying marks", body: "Tattoos, birthmarks, scars, distinctive moles — cover with makeup/tape during shoots or remove in post. These defeat cloaking because they're not faces; recognition systems and humans both key on them.", level: "critical" },
      { title: "Sterilize backgrounds", body: "No street signs, house numbers, mail, diplomas, family photos on walls, distinctive views from windows, or license plates. Shoot against blank walls or seamless backdrops. Check reflections in mirrors, glasses, and windows.", level: "high" },
      { title: "Vary presentation between persona and real life", body: "Different hairstyle/color, different glasses, different signature clothing. The goal: a side-by-side comparison shouldn't be instant.", level: "standard" },
      { title: "Never reuse a photo across personas or contexts", body: "One photo, one persona, one platform context. A reused photo is a reverse-image-search bridge that no cloaking can fix.", level: "critical" },
    ],
  },
  {
    title: "Layer 2 — Device & account separation",
    why: "Platforms link accounts through devices, phone numbers, and contact sync. Separation here is what stops “people you may know” from outing a client.",
    items: [
      { title: "Separate device or separate OS user profile for persona work", body: "Best: a dedicated phone. Minimum: a separate user profile on the computer + a work-profile/dual-space setup on the phone. Never mix iCloud/Google Photos libraries — persona photos must never enter the personal camera roll's cloud backup.", level: "critical" },
      { title: "Dedicated phone number for the persona", body: "A second number (e.g. a free VoIP second line) used ONLY for persona 2FA and account recovery. The persona number must never appear in the client's real contacts or vice versa.", level: "high" },
      { title: "Dedicated email, never cross-logged", body: "Persona email used only for persona accounts. Never open persona and real accounts in the same browser profile — use separate browser profiles or containers so cookies and sessions can't cross-link.", level: "high" },
      { title: "Disable contact syncing on every persona account", body: "TikTok, Instagram, X, Snapchat — all of them slurp contacts to build suggestion graphs. On the persona device/profile: deny contacts permission, and never import the real contact list.", level: "critical" },
    ],
  },
  {
    title: "Layer 3 — Social graph isolation",
    why: "The social graph outs more creators than faces do. One shared follower between the persona and real life is a thread anyone can pull.",
    items: [
      { title: "Zero shared followers/friends between persona and real accounts", body: "Audit both directions. The client's real friends must not follow the persona “to support,” and persona followers must not be real-life contacts. One exception becomes the map.", level: "critical" },
      { title: "Family and coworkers never appear — not even in the background", body: "No tagging, no cameos, no “my sister took this photo” captions. Family social media must not follow, mention, or share persona content.", level: "critical" },
      { title: "Separate the promo network from the personal network", body: "Shoutouts, collabs, and promo swaps happen only between persona accounts. A promo post from a real-life friend's account is a signed confession.", level: "high" },
    ],
  },
  {
    title: "Layer 4 — Real-life link severing",
    why: "Job, location, and routine are the doxxing trifecta. This layer keeps the persona unmoored from the client's physical life.",
    items: [
      { title: "No real name, employer, school, or neighborhood anywhere in persona context", body: "Not in bios, not in captions, not in DMs with fans, not in “get to know me” content. Roleplay characters get fictional hometowns.", level: "critical" },
      { title: "Strip geotags and delay location-tied posts", body: "No live location posting. Travel content posts after the client has left. EXIF strip every upload (tab 1) — phone photos carry GPS by default.", level: "high" },
      { title: "Keep the day job off the persona's internet", body: "No LinkedIn-style details, no uniform/worksite backgrounds, no “off to my shift” posts with identifiable timing. If the persona does “work” content, it's fictional.", level: "high" },
      { title: "Scrub pre-persona history that bridges", body: "Old public posts from before the persona existed — same face, same rooms, same pets — get deleted or privatized. The audit tab finds them; this layer kills them.", level: "standard" },
    ],
  },
  {
    title: "Layer 5 — Money & comms separation",
    why: "Payment rails and message metadata are subpoena-grade identifiers. Keep them persona-native.",
    items: [
      { title: "Separate payout path for persona income", body: "Dedicated bank account or payout instrument for persona earnings. Platform payout names that leak (some show legal names to fans on receipts) must be checked per platform at onboarding.", level: "high" },
      { title: "Persona-only communication channels", body: "Fans, collaborators, and the agency reach the persona through persona channels only. Real phone/SMS/email never touch persona business.", level: "high" },
    ],
  },
  {
    title: "Layer 6 — Ongoing defense",
    why: "Compartmentalization rots without maintenance. This layer is the schedule that keeps the other five true.",
    items: [
      { title: "Quarterly exposure audit (tab 3) without exception", body: "Calendar it. The internet adds new face-search and aggregation tools constantly; last quarter's clean bill means nothing.", level: "high" },
      { title: "Incident protocol: contain, log, takedown, review", body: "Suspected recognition or leak → contain (privatize/delete) → log with timestamps → DMCA/report → post-mortem on which layer failed. Never skip the post-mortem.", level: "standard" },
    ],
  },
];

function FirewallTab() {
  const flat = FIREWALL_LAYERS.flatMap((l) => l.items);
  const { checked, toggle, reset, done } = useChecklist("firewall", flat.length);
  let idx = -1;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-zinc-400 max-w-xl">
          Six layers between the client's adult persona and everything else: their face, their devices, their social graph, their job, their money, and time itself. Work top to bottom at onboarding.
        </p>
        <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
      <ProgressBar done={done} total={flat.length} />
      {FIREWALL_LAYERS.map((layer) => (
        <div key={layer.title}>
          <h3 className="text-white font-bold mb-1">{layer.title}</h3>
          <p className="text-xs text-zinc-500 mb-3">{layer.why}</p>
          <div className="space-y-2.5">
            {layer.items.map((item) => {
              idx += 1;
              const i = idx;
              return (
                <CheckItem key={item.title} done={checked[i]} onToggle={() => toggle(i)} title={item.title} body={item.body} level={item.level} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
function ShieldInner() {
  const [tab, setTab] = useState<Tab>("stripper");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <Seo title="Identity Shield" description="Admin anti-facial-recognition and persona-separation toolkit." noIndex noFollow />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6 transition">
          <ChevronLeft className="w-4 h-4" /> Operations Console
        </Link>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2">
          <Fingerprint className="w-8 h-8 text-violet-400" /> Identity Shield
        </h1>
        <p className="text-zinc-400 text-sm max-w-3xl mb-8">
          Keep a client's adult persona — stage name, niche characters, content — unlinkable from their real identity,
          family, friends, and day-job life. Work the tabs in order: strip the file, cloak the face, audit exposure, firewall the life.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-left border rounded-xl p-4 transition ${
                tab === t.id
                  ? "border-violet-700 bg-violet-950/30"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600"
              }`}
            >
              <t.icon className={`w-6 h-6 mb-2 ${tab === t.id ? "text-violet-300" : "text-zinc-500"}`} />
              <p className={`text-sm font-bold ${tab === t.id ? "text-white" : "text-zinc-300"}`}>{t.label}</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{t.blurb}</p>
            </button>
          ))}
        </div>

        <div className="border border-zinc-800 rounded-2xl bg-zinc-950/40 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <active.icon className="w-5 h-5 text-violet-400" /> {active.label}
          </h2>
          {tab === "stripper" && <ExifStripper />}
          {tab === "cloaking" && <CloakingTab />}
          {tab === "audit" && <AuditTab />}
          {tab === "firewall" && <FirewallTab />}
        </div>
      </div>
    </div>
  );
}

export default function IdentityShield() {
  const { loading, isAdmin } = useAdminStatus();
  if (loading || !isAdmin) {
    return (
      <AdminGate>
        <div />
      </AdminGate>
    );
  }
  return <ShieldInner />;
}
