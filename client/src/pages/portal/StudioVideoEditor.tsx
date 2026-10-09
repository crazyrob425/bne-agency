/**
 * StudioVideoEditor — video side of the Studio Editor member module.
 *
 * ffmpeg.wasm (MIT) runs a real FFmpeg in the browser: trim, scale, PNG
 * watermark overlay with the burned-in tracking ID, an optional 2-second BNE
 * splash intro, and H.264/AAC transcode — all client-side, nothing uploaded
 * until the client chooses to send it to review. The finished MP4 is SHA-256
 * hashed (+ a representative frame dHash) and registered with Leak Shield.
 *
 * Honest limits, stated in the UI: software x264 here is single-threaded
 * (this stack doesn't serve COOP/COEP headers), so long clips take a while;
 * the watermark is a PNG overlay because the wasm core ships no fonts.
 */
import { useRef, useState } from "react";
import { Clapperboard, Download, Loader2, Scissors, Send, Upload, Wand2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { dHashFromImage, generateWatermarkId, sha256Hex } from "@/lib/leakshield";
// ffmpeg core (~31 MB wasm) loads from CDN at runtime so it never enters the
// Pages bundle (Cloudflare rejects assets over 25 MiB).
const FFMPEG_CORE_VERSION = "0.12.10";
const coreURL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/umd/ffmpeg-core.js`;
const wasmURL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/umd/ffmpeg-core.wasm`;

interface ExportResult {
  url: string;
  blob: Blob;
  fileName: string;
  fileHash: string;
  frameHash: string;
  sentToReview: boolean;
  trackingId: string;
}

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/** Transparent PNG with brand text + BNE tracking badge, sized to the video. */
function makeWatermarkPng(vw: number, vh: number, brandText: string, bneBadge: boolean, trackingId: string): string {
  const c = document.createElement("canvas");
  c.width = vw; c.height = vh;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const fs = Math.max(18, Math.round(vh * 0.045));
  ctx.font = `700 ${fs}px system-ui, sans-serif`;
  ctx.textAlign = "right"; ctx.textBaseline = "alphabetic";
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = Math.round(fs * 0.3);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.fillText(brandText.trim() || "BNE client", vw - 28, vh - 28);
  if (bneBadge) {
    const fs2 = Math.max(13, Math.round(vh * 0.026));
    ctx.font = `600 ${fs2}px system-ui, sans-serif`;
    ctx.fillStyle = "#f5c518";
    ctx.fillText(`BNE • ${trackingId}`, vw - 28, vh - 28 - fs - 12);
  }
  return c.toDataURL("image/png");
}

/** 2s splash intro frame: black card, brand text, BNE tag, tracking ID. */
function makeSplashPng(landscape: boolean, brandText: string, trackingId: string): string {
  const c = document.createElement("canvas");
  c.width = landscape ? 1920 : 720;
  c.height = landscape ? 1080 : 1280;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.textAlign = "center";
  const cx = c.width / 2, cy = c.height / 2;
  ctx.fillStyle = "#f5c518";
  ctx.font = `700 ${Math.round(c.width * 0.09)}px system-ui, sans-serif`;
  ctx.fillText("BNE", cx, cy - c.height * 0.06);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 ${Math.round(c.width * 0.045)}px system-ui, sans-serif`;
  ctx.fillText(brandText.trim() || "Blacklisted Niche Entertainment", cx, cy + c.height * 0.03);
  ctx.fillStyle = "#8a8a93";
  ctx.font = `400 ${Math.round(c.width * 0.028)}px system-ui, sans-serif`;
  ctx.fillText(trackingId, cx, cy + c.height * 0.09);
  return c.toDataURL("image/png");
}

export default function StudioVideoEditor() {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("video");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [brandText, setBrandText] = useState("");
  const [bneBadge, setBneBadge] = useState(true);
  const [splash, setSplash] = useState(true);
  const [trackingId, setTrackingId] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<ExportResult | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const ffmpegRef = useRef<any>(null);
  const registerFingerprint = trpc.members.registerFingerprint.useMutation();
  const createSubmission = trpc.members.createSubmission.useMutation();

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith("video/")) { setStatus("Please choose a video file."); return; }
    setStatus(null);
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    const url = URL.createObjectURL(f);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(url);
    setFileName(f.name.replace(/\.[^.]+$/, "") || "video");
    setTrackingId(generateWatermarkId());
    setStart(0); setEnd(0); setProgress(0); setPhase("");
  };

  const resetAll = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (result) URL.revokeObjectURL(result.url);
    setObjectUrl(null); setResult(null); setStatus(null); setPhase(""); setProgress(0);
  };

  const setFromPlayhead = (which: "start" | "end") => {
    const v = videoRef.current;
    if (!v) return;
    const t = Math.round(v.currentTime * 10) / 10;
    if (which === "start") setStart(Math.min(t, end > 0 ? end - 0.5 : t));
    else setEnd(Math.max(t, start + 0.5));
  };

  const ensureFfmpeg = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const ff = new FFmpeg();
    ff.on("progress", ({ progress: p }: any) => setProgress(Math.round((p || 0) * 100)));
    ff.on("log", () => { /* noisy; ignore */ });
    await ff.load({ coreURL, wasmURL });
    ffmpegRef.current = ff;
    return ff;
  };

  const captureFrameHash = (url: string, atSec: number): Promise<string> =>
    new Promise((resolve) => {
      const v = document.createElement("video");
      v.muted = true; (v as any).playsInline = true; v.preload = "auto"; v.src = url;
      const done = (h: string) => resolve(h);
      const timer = setTimeout(() => done(""), 15000);
      v.onseeked = () => {
        try {
          const c = document.createElement("canvas");
          c.width = v.videoWidth; c.height = v.videoHeight;
          c.getContext("2d")?.drawImage(v, 0, 0);
          clearTimeout(timer);
          done(dHashFromImage(c));
        } catch { clearTimeout(timer); done(""); }
      };
      v.onerror = () => { clearTimeout(timer); done(""); };
      v.onloadeddata = () => { v.currentTime = Math.min(Math.max(0.1, atSec), Math.max(0.1, v.duration - 0.1)); };
    });

  /**
   * Builds the ffmpeg filter graph. Input layout: 0=input.mp4,
   * 1=splash.png (only when splash is on), N=wm.png where N is 2 with splash else 1.
   * The watermark PNG is rendered at source-video size, so it is scaled with the
   * same expression as the video before overlaying.
   */
  const buildFilter = (
    sw: string, sh: string, s: number, e: number,
    hasTrim: boolean, withSplash: boolean, withAudio: boolean,
  ): { fc: string; audioArgs: string[] } => {
    const vscale = `scale=${sw}:${sh},setsar=1,format=yuv420p,fps=30`;
    const vtrim = hasTrim ? `trim=start=${s}:end=${e},setpts=PTS-STARTPTS,` : "";
    const wmIn = withSplash ? 2 : 1;
    const wmScale = `[${wmIn}:v]scale=${sw}:${sh},setsar=1[wm];`;
    const overlay = `overlay=W-w-28:H-h-28:format=auto,format=yuv420p[outv]`;
    let fc: string;
    let audioArgs: string[];
    if (withAudio) {
      const aPart = hasTrim
        ? `[0:a]atrim=start=${s}:end=${e},asetpts=PTS-STARTPTS[a];`
        : `[0:a]acopy[a];`;
      audioArgs = ["-map", "[a]", "-c:a", "aac", "-ar", "44100", "-ac", "2"];
      fc = withSplash
        ? `[1:v]${vscale}[sv];[0:v]${vtrim}${vscale}[v];${aPart}${wmScale}[sv][v]concat=n=2:v=1:a=0[vcat];[vcat][wm]${overlay}`
        : `[0:v]${vtrim}${vscale}[v];${aPart}${wmScale}[v][wm]${overlay}`;
    } else {
      audioArgs = [];
      fc = withSplash
        ? `[1:v]${vscale}[sv];[0:v]${vtrim}${vscale}[v];${wmScale}[sv][v]concat=n=2:v=1:a=0[vcat];[vcat][wm]${overlay}`
        : `[0:v]${vtrim}${vscale}[v];${wmScale}[v][wm]${overlay}`;
    }
    return { fc, audioArgs };
  };

  const process = async () => {
    if (!objectUrl) return;
    setBusy(true); setStatus(null); setProgress(0); setResult(null);
    // Snapshot the ID for this encode; a fresh one is minted afterwards so
    // re-encodes never collide with the registry's unique tracking IDs.
    const exportId = trackingId || generateWatermarkId();
    try {
      setPhase("Loading video engine (~31 MB, first run only)…");
      const ff = await ensureFfmpeg();
      const { fetchFile } = await import("@ffmpeg/util");

      const v = videoRef.current;
      const vw = v?.videoWidth || 1280;
      const vh = v?.videoHeight || 720;
      const dur = duration || v?.duration || 0;
      const s = Math.max(0, start);
      const e = end > s + 0.5 ? end : dur;
      const hasTrim = s > 0.5 || (dur > 0 && e < dur - 0.5);
      const landscape = vw >= vh;
      const sw = landscape ? "-2" : "720";
      const sh = landscape ? "1080" : "-2";

      setPhase("Preparing assets…");
      await ff.writeFile("input.mp4", await fetchFile(objectUrl));
      const wmPng = makeWatermarkPng(vw, vh, brandText, bneBadge, exportId);
      if (!wmPng) throw new Error("Watermark render failed");
      await ff.writeFile("wm.png", await fetchFile(wmPng));
      if (splash) {
        const spPng = makeSplashPng(landscape, brandText, exportId);
        await ff.writeFile("splash.png", await fetchFile(spPng));
      }

      const runEncode = async (withAudio: boolean) => {
        const args: string[] = ["-i", "input.mp4"];
        if (splash) args.push("-framerate", "30", "-loop", "1", "-t", "2", "-i", "splash.png");
        args.push("-i", "wm.png");
        const { fc, audioArgs } = buildFilter(sw, sh, s, e, hasTrim, splash, withAudio);
        args.push(
          "-filter_complex", fc,
          "-map", "[outv]",
          ...audioArgs,
          "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
          "-map_metadata", "-1", "-movflags", "+faststart",
          "output.mp4",
        );
        await ff.exec(args);
      };

      setPhase(hasTrim ? "Trimming, watermarking, transcoding…" : "Watermarking & transcoding…");
      try {
        await runEncode(true);
      } catch (err) {
        // Source likely has no audio track — retry audio-free.
        setPhase("Retrying without audio track…");
        try { await ff.deleteFile("output.mp4"); } catch { /* ignore */ }
        await runEncode(false);
      }

      setPhase("Hashing & registering…");
      const data = await ff.readFile("output.mp4");
      const bytes = (data as Uint8Array).slice();
      const blob = new Blob([bytes], { type: "video/mp4" });
      const fileHash = await sha256Hex(blob);
      const frameHash = await captureFrameHash(URL.createObjectURL(blob), (e - s) / 2 || 1);
      const outName = `${fileName}-bne-edited.mp4`;
      await registerFingerprint.mutateAsync({
        watermarkId: exportId, fileHash,
        perceptualHash: frameHash || undefined,
        fileName: outName, mimeType: "video/mp4",
      });

      setResult({ url: URL.createObjectURL(blob), blob, fileName: outName, fileHash, frameHash, sentToReview: false, trackingId: exportId });
      setTrackingId(generateWatermarkId()); // fresh ID for the next encode
      setPhase(""); setStatus("Video processed and registered in Leak Shield.");
      for (const f of ["input.mp4", "wm.png", "splash.png", "output.mp4"]) {
        try { await ff.deleteFile(f); } catch { /* best-effort */ }
      }
    } catch (err: any) {
      setPhase("");
      setStatus(err?.message || "Video processing failed. Try a shorter clip.");
    } finally { setBusy(false); }
  };

  const sendToReview = async () => {
    if (!result) return;
    setBusy(true); setStatus(null);
    try {
      const form = new FormData();
      form.append("file", result.blob, result.fileName);
      const up = await fetch("/api/members/upload", { method: "POST", body: form });
      const upJson = await up.json();
      if (!up.ok) throw new Error(upJson.error || "Upload failed");
      await createSubmission.mutateAsync({
        filePath: upJson.filePath, fileName: upJson.fileName, mimeType: upJson.mimeType,
        fileSize: upJson.fileSize,
        title: `Studio video edit — ${result.trackingId}`,
        notes: "Edited in the BNE Studio Editor (trim/watermark/splash). Tracking ID burned in; fingerprint registered.",
      });
      setResult({ ...result, sentToReview: true });
      setStatus("Sent to content review.");
    } catch (err: any) { setStatus(err?.message || "Could not send to review."); }
    finally { setBusy(false); }
  };

  if (!objectUrl) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <Clapperboard className="mx-auto mb-4 h-10 w-10 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Studio Editor — Video</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          Trim, watermark, add a BNE splash intro, and transcode to MP4 — entirely in your browser.
          Tracking ID burned in, fingerprint registered.
        </p>
        <label className="mx-auto mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-black hover:bg-amber-300">
          <Upload className="h-4 w-4" /> Choose video
          <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        {status && <p className="mt-4 text-sm text-red-400">{status}</p>}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          <video ref={videoRef} src={objectUrl} controls playsInline className="max-h-[480px] w-full"
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration;
              setDuration(d);
              setEnd((prev) => (prev === 0 ? Math.round(d * 10) / 10 : prev));
            }} />
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
            <Scissors className="h-4 w-4 text-amber-400" /> Trim
            <span className="ml-auto font-mono text-xs text-zinc-500">
              {fmt(start)} → {fmt(end || duration)} <span className="text-zinc-600">/ {fmt(duration)}</span>
            </span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs text-zinc-400">Start</label>
                <button onClick={() => setFromPlayhead("start")} className="text-[11px] text-amber-300 hover:underline">set from playhead</button>
              </div>
              <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={Math.min(start, duration)}
                onChange={(e) => setStart(Math.min(Number(e.target.value), Math.max(0, (end || duration) - 0.5)))} className="w-full accent-amber-400" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs text-zinc-400">End</label>
                <button onClick={() => setFromPlayhead("end")} className="text-[11px] text-amber-300 hover:underline">set from playhead</button>
              </div>
              <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={Math.min(end || duration, duration)}
                onChange={(e) => setEnd(Math.max(Number(e.target.value), start + 0.5))} className="w-full accent-amber-400" />
            </div>
          </div>
          <button onClick={() => { setStart(0); setEnd(Math.round(duration * 10) / 10); }} className="mt-2 text-[11px] text-zinc-500 hover:text-zinc-300">
            Reset to full length
          </button>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">Watermark text</label>
          <input value={brandText} onChange={(e) => setBrandText(e.target.value)} placeholder="e.g. @yourname"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600" />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={bneBadge} onChange={(e) => setBneBadge(e.target.checked)} className="h-4 w-4 accent-amber-400" />
          Burn BNE badge + tracking ID
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={splash} onChange={(e) => setSplash(e.target.checked)} className="h-4 w-4 accent-amber-400" />
          2-second BNE splash intro
        </label>
        <p className="text-xs text-zinc-500">
          Tracking ID <span className="font-mono text-amber-300">{trackingId || "—"}</span> is burned
          into the watermark overlay and the splash frame.
        </p>

        <button onClick={process} disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-black hover:bg-amber-300 disabled:opacity-50">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          {busy ? "Processing…" : "Process video"}
        </button>
        {busy && (
          <div>
            <p className="mb-1 text-xs text-zinc-400">{phase} {progress > 0 && `${progress}%`}</p>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-zinc-600">Software encode — longer clips take a few minutes. Keep this tab open.</p>
          </div>
        )}

        {result && (
          <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs">
            <p className="font-bold text-emerald-300">Registered in Leak Shield</p>
            <p className="text-zinc-400">Tracking ID: <span className="font-mono text-amber-300">{result.trackingId}</span></p>
            <p className="break-all text-zinc-500">SHA-256: <span className="font-mono">{result.fileHash.slice(0, 32)}…</span></p>
            {result.frameHash && <p className="text-zinc-500">Frame hash: <span className="font-mono">{result.frameHash}</span></p>}
            <a href={result.url} download={result.fileName}
              className="flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 font-bold text-white hover:bg-zinc-700">
              <Download className="h-4 w-4" /> Download {result.fileName}
            </a>
            {!result.sentToReview ? (
              <button onClick={sendToReview} disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/50 px-4 py-2 font-bold text-amber-300 hover:bg-amber-400/10 disabled:opacity-50">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send to content review
              </button>
            ) : (
              <p className="text-emerald-300">In the review queue.</p>
            )}
          </div>
        )}

        <button onClick={resetAll} className="w-full rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-white">
          New video
        </button>
      </div>

      {status && (
        <p className={`rounded-xl border px-4 py-2 text-sm lg:col-span-2 ${/fail/i.test(status) ? "border-red-900 bg-red-950/40 text-red-300" : "border-zinc-800 bg-zinc-900 text-zinc-300"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
