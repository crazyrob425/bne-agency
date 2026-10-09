/**
 * PortalLeakShield — "Leak Shield" member module.
 *
 * Shows the client's fingerprinted exports (tracking ID + hashes, registered
 * automatically on Studio Editor export) and generates a ready-to-send DMCA
 * takedown notice pre-filled with the asset's identifiers for any URL the
 * client finds their content on.
 *
 * Honest scope: this registers and documents protected assets and makes
 * filing notices fast. There is no automated web crawler in this build —
 * discovery still starts with the client (or staff) spotting a leak.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Copy,
  Check,
  FileWarning,
  Fingerprint,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import MemberGate from "./MemberGate";

const PIRATE_SITES = [
  "Other / not listed",
  "Pornhub",
  "XVideos",
  "xHamster",
  "RedTube",
  "XNXX",
  "SpankBang",
  "Eporner",
  "Telegram channel/group",
  "Discord server",
  "Reddit",
  "Twitter / X",
  "Tube site (other)",
  "Forum / message board",
];

interface Fp {
  id: number;
  watermarkId: string;
  fileHash: string;
  perceptualHash: string | null;
  fileName: string;
  mimeType: string | null;
  createdAt: string | Date;
}

function ShieldInner() {
  const me = trpc.members.me.useQuery();
  const fpsQuery = trpc.members.myFingerprints.useQuery();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [infringingUrl, setInfringingUrl] = useState("");
  const [platform, setPlatform] = useState(PIRATE_SITES[0]);
  const [copied, setCopied] = useState(false);

  const active = (fpsQuery.data ?? []).find((f) => f.id === activeId) ?? null;

  const notice = active
    ? `DMCA TAKEDOWN NOTICE

To the Designated Copyright Agent for ${platform}:

I am the copyright owner (or am authorized to act on behalf of the owner) of the original work identified below. I have a good-faith belief that the material at the following URL infringes my copyright, and I request its prompt removal.

ORIGINAL WORK
- Title / file: ${active.fileName}
- BNE tracking ID (burned into the watermark): ${active.watermarkId}
- SHA-256 of the original file: ${active.fileHash}
${active.perceptualHash ? `- Perceptual hash: ${active.perceptualHash}\n` : ""}- First published by me; distributed through Blacklisted Niche Entertainment

INFRINGING MATERIAL
- URL: ${infringingUrl || "[paste the infringing page URL here]"}
- Platform: ${platform}

CONTACT
- Name (stage): ${me.data?.name ?? "[your stage name]"}
- Email: ${me.data?.email ?? "[your email]"}

I swear, under penalty of perjury, that the information in this notice is accurate and that I am the copyright owner or am authorized to act on the copyright owner's behalf.

Signature: ________________________  Date: ______________`
    : "";

  const copyNotice = async () => {
    try {
      await navigator.clipboard.writeText(notice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const fps = (fpsQuery.data ?? []) as Fp[];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <Seo title="Leak Shield" description="Your protected content assets and takedown tools." noIndex noFollow />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> My portal
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">Leak Shield</p>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Your content, fingerprinted</h1>
        <p className="text-zinc-400 max-w-2xl mb-8">
          Every export from the Studio Editor is stamped with a unique tracking ID in its
          watermark and registered here with its file hashes. If your content shows up
          where it shouldn't, that ID proves it's yours — and the notice generator
          below turns it into a ready-to-send takedown request in seconds.
        </p>

        {/* Protected assets */}
        <h2 className="text-lg font-bold text-white mb-4 inline-flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-emerald-400" /> Protected assets
        </h2>
        <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 overflow-hidden mb-10">
          {fpsQuery.isLoading && (
            <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
          )}
          {fps.length === 0 && !fpsQuery.isLoading && (
            <div className="p-10 text-center">
              <Fingerprint className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                No protected assets yet. Open the <span className="text-zinc-300 font-medium">Studio Editor</span>,
                finish a photo or video, and hit export — it registers here automatically.
              </p>
            </div>
          )}
          {fps.map((f) => (
            <div key={f.id} className="border-b border-zinc-800/60 last:border-0 px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{f.fileName}</p>
                <p className="text-xs text-zinc-500 font-mono">
                  ID <span className="text-emerald-300 font-bold">{f.watermarkId}</span>
                  {" · "}SHA-256 <span className="text-zinc-400">{f.fileHash.slice(0, 16)}…</span>
                  {" · "}{new Date(f.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setActiveId(activeId === f.id ? null : f.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  activeId === f.id
                    ? "bg-red-950/50 border-red-800 text-red-200"
                    : "border-zinc-700 text-zinc-300 hover:border-red-800 hover:text-red-200"
                }`}
              >
                <FileWarning className="w-4 h-4" />
                {activeId === f.id ? "Close notice" : "Report a leak"}
              </button>
            </div>
          ))}
        </div>

        {/* Takedown notice generator */}
        {active && (
          <div className="border border-red-900/60 rounded-2xl bg-red-950/10 p-6">
            <h2 className="text-lg font-bold text-white mb-1">Takedown notice</h2>
            <p className="text-sm text-zinc-400 mb-5">
              For <span className="text-white font-medium">{active.fileName}</span> · tracking ID{" "}
              <span className="font-mono font-bold text-emerald-300">{active.watermarkId}</span>.
              Paste the infringing URL, pick the platform, copy the notice, and send it to that
              site's DMCA / abuse contact. Staff can help if the site ignores you.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Infringing URL
                </label>
                <input
                  value={infringingUrl}
                  onChange={(e) => setInfringingUrl(e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-700"
                >
                  {PIRATE_SITES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-300 mb-4 max-h-96 overflow-y-auto">
              {notice}
            </pre>
            <button
              onClick={copyNotice}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-bold text-white transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy notice"}
            </button>
            <p className="text-[11px] text-zinc-600 mt-3">
              This is a template, not legal advice. Most major tube sites publish a DMCA contact or
              web form — that notice is exactly what their forms ask for.
            </p>
          </div>
        )}

        {!active && fps.length > 0 && (
          <div className="border border-zinc-800/70 rounded-xl p-5 bg-zinc-950/50">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <span className="text-zinc-200 font-semibold">How protection works:</span> your watermark
              carries a tracking ID unique to each export, and the original file's hashes are registered
              above. Watermarks deter casual reposts; the registry lets you (or staff) prove a leaked
              file came from your asset in minutes. Nothing here can stop a determined pirate on its
              own — speed of takedown is what protects revenue, and this page makes you fast.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalLeakShield() {
  return (
    <MemberGate module="leak-shield">
      <ShieldInner />
    </MemberGate>
  );
}
