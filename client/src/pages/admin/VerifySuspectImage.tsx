/**
 * VerifySuspectImage — admin leak-tracing tool.
 *
 * Drop in a suspect image (a leak found in the wild, a screenshot of a
 * preview). The tool:
 *  1. tries to extract the invisible LSB tracking ID (steg.ts) — works on
 *     PNG exports that kept their hidden mark;
 *  2. offers a blind-watermark reveal (watermark-js-plus decode) for
 *     screenshots of portal previews, which carry the invisible DOM overlay.
 * A found ID is matched against the fingerprint registry passed in as props.
 */
import { useState } from "react";
import { Fingerprint, Loader2, ScanSearch, ShieldCheck, Upload, XCircle } from "lucide-react";
import { extractTrackingId } from "@/lib/steg";
import { revealBlindMark } from "@/lib/blindWatermark";

interface RegistryRow {
  watermarkId: string;
  fileName: string | null;
  ownerName: string | null;
  ownerEmail: string | null;
}

export default function VerifySuspectImage({ registry }: { registry: RegistryRow[] }) {
  const [busy, setBusy] = useState(false);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [foundId, setFoundId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [revealAttempted, setRevealAttempted] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const reset = () => {
    setBusy(false);
    setFileLabel(null);
    setFoundId(null);
    setChecked(false);
    setRevealed(null);
    setRevealAttempted(false);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
  };

  const handleFile = async (f: File | undefined) => {
    if (!f || !f.type.startsWith("image/")) return;
    reset();
    setBusy(true);
    setFileLabel(f.name);
    try {
      const url = URL.createObjectURL(f);
      setObjectUrl(url);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("unreadable"));
        img.src = url;
      });
      const id = await extractTrackingId(img);
      setFoundId(id);
    } catch {
      setFoundId(null);
    } finally {
      setChecked(true);
      setBusy(false);
    }
  };

  const handleReveal = async () => {
    if (!objectUrl) return;
    setRevealing(true);
    setRevealAttempted(true);
    try {
      const out = await revealBlindMark(objectUrl);
      setRevealed(out || null);
    } finally {
      setRevealing(false);
    }
  };

  const match = foundId ? registry.find((r) => r.watermarkId === foundId) : undefined;

  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-white">
        <ScanSearch className="h-4 w-4 text-amber-400" /> Verify a suspect image
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        Found a leaked file or a screenshot? Drop it here — the tool reads the hidden tracking ID
        and matches it against the registry.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-amber-400">
          <Upload className="h-4 w-4" /> Choose image
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        {fileLabel && (
          <span className="text-xs text-zinc-400">{fileLabel}</span>
        )}
        {busy && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
      </div>

      {checked && !busy && (
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm">
          {foundId ? (
            <>
              <p className="flex items-center gap-2 font-semibold text-emerald-300">
                <ShieldCheck className="h-4 w-4" /> Hidden tracking ID found
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-amber-300">{foundId}</p>
              {match ? (
                <p className="mt-2 text-xs text-zinc-300">
                  Registry match: <span className="text-white">{match.fileName}</span> — owner{" "}
                  <span className="text-white">{match.ownerName || match.ownerEmail || "unknown"}</span>.
                  Use the DMCA template on the client's Leak Shield page to file the takedown.
                </p>
              ) : (
                <p className="mt-2 text-xs text-amber-200/80">
                  No registry entry for this ID — it may predate the registry or come from another studio export.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="flex items-center gap-2 font-semibold text-zinc-300">
                <XCircle className="h-4 w-4 text-zinc-500" /> No hidden tracking ID in this file
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                JPEG recompression, resizing, or heavy filtering destroys the invisible mark. If this is a
                screenshot of a portal preview, try the blind-watermark reveal — previews carry an invisible
                overlay that survives screenshots.
              </p>
              <button
                onClick={handleReveal}
                disabled={revealing}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-amber-400 disabled:opacity-50"
              >
                {revealing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Fingerprint className="h-3.5 w-3.5" />}
                Reveal blind watermark
              </button>
              {revealed && (
                <div className="mt-3">
                  <p className="mb-1 text-xs text-zinc-500">Enhanced — read the tracking label visually:</p>
                  <img src={revealed} alt="Blind watermark revealed" className="max-h-64 rounded-lg border border-zinc-700" />
                </div>
              )}
              {revealed === null && !revealing && revealAttempted && (
                <p className="mt-2 text-xs text-zinc-600">Reveal produced nothing — this image likely has no blind overlay.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
