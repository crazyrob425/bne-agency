/**
 * StudioPhotoEditor — photo side of the Studio Editor member module.
 *
 * Step flow: Upload → Crop (react-easy-crop) → Adjust (rotate/flip/filter
 * packs/auto-enhance) → Retouch (skin-smoothing brush) → Watermark (client
 * brand + BNE badge with tracking ID) → Export (JPEG/PNG, EXIF-stripped,
 * invisible LSB tracking ID on PNG, SHA-256 + dHash registered to Leak Shield).
 *
 * Editing is a pure re-render pipeline: every step derives from the source
 * image + current settings, so "undo" is just changing a setting back.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import {
  ArrowLeft, ArrowRight, Brush, Check, Download, FlipHorizontal2, FlipVertical2,
  Loader2, RotateCcw, RotateCw, Send, Sparkles, Upload, Wand2, X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import {
  applyVisibleWatermarks, autoEnhance, canvasToBlob, compositeRetouch,
  cropRotateFlip, loadImage, paintMaskDot,
  type CropPixels, type FlipState, type WatermarkPosition,
} from "@/lib/photoEditor";
import { embedTrackingId } from "@/lib/steg";
import { dHashFromImage, generateWatermarkId, sha256Hex } from "@/lib/leakshield";

const FILTERS: Record<string, { label: string; css: string; hint: string }> = {
  none:   { label: "None",   css: "", hint: "No filter" },
  vivid:  { label: "Vivid",  css: "saturate(1.45) contrast(1.12)", hint: "Punchy color" },
  warm:   { label: "Warm",   css: "sepia(0.28) saturate(1.35) contrast(1.06)", hint: "Golden skin tones" },
  golden: { label: "Golden", css: "sepia(0.5) saturate(1.6) contrast(1.06) brightness(1.03)", hint: "Sunset glow" },
  cool:   { label: "Cool",   css: "hue-rotate(12deg) saturate(1.15) brightness(1.02)", hint: "Clean daylight" },
  soft:   { label: "Soft",   css: "saturate(0.85) brightness(1.06) contrast(0.94)", hint: "Gentle, airy" },
  noir:   { label: "Noir",   css: "grayscale(1) contrast(1.22) brightness(1.02)", hint: "High-contrast B&W" },
  fade:   { label: "Fade",   css: "saturate(0.7) contrast(0.9) brightness(1.08)", hint: "Muted film look" },
};

const ASPECTS: { label: string; value: number | null }[] = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

const WM_POSITIONS: { id: WatermarkPosition; label: string }[] = [
  { id: "top-left", label: "Top left" }, { id: "top-center", label: "Top center" }, { id: "top-right", label: "Top right" },
  { id: "middle-left", label: "Middle left" }, { id: "center", label: "Center" }, { id: "middle-right", label: "Middle right" },
  { id: "bottom-left", label: "Bottom left" }, { id: "bottom-center", label: "Bottom center" }, { id: "bottom-right", label: "Bottom right" },
];

type Step = "crop" | "adjust" | "retouch" | "watermark" | "export";
const STEP_ORDER: Step[] = ["crop", "adjust", "retouch", "watermark", "export"];
const STEP_LABEL: Record<Step, string> = {
  crop: "Crop", adjust: "Adjust", retouch: "Retouch", watermark: "Watermark", export: "Export",
};

interface ExportResult {
  url: string;
  fileName: string;
  fileHash: string;
  perceptualHash: string;
  metaNote: string;
  blob: Blob;
  sentToReview: boolean;
  trackingId: string;
}

export default function StudioPhotoEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("photo");
  const [step, setStep] = useState<Step>("crop");

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | null>(null);
  const [cropPixels, setCropPixels] = useState<CropPixels | null>(null);

  // Adjust state
  const [flip, setFlip] = useState<FlipState>({ horizontal: false, vertical: false });
  const [filterKey, setFilterKey] = useState("none");
  const [enhance, setEnhance] = useState(false);

  // Retouch state
  const [mask, setMask] = useState<HTMLCanvasElement | null>(null);
  const [brushSize, setBrushSize] = useState(60);
  const painting = useRef(false);

  // Watermark state
  const [brandText, setBrandText] = useState("");
  const [wmPos, setWmPos] = useState<WatermarkPosition>("bottom-right");
  const [wmOpacity, setWmOpacity] = useState(0.85);
  const [wmScale, setWmScale] = useState(1);
  const [bneBadge, setBneBadge] = useState(true);

  // Export state
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [quality, setQuality] = useState(0.92);
  const [trackingId, setTrackingId] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<ExportResult | null>(null);

  const previewRef = useRef<HTMLCanvasElement>(null);
  const registerFingerprint = trpc.members.registerFingerprint.useMutation();
  const createSubmission = trpc.members.createSubmission.useMutation();

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCropPixels({ x: pixels.x, y: pixels.y, width: pixels.width, height: pixels.height });
  }, []);

  const resetAll = useCallback(() => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (result) URL.revokeObjectURL(result.url);
    setImage(null); setObjectUrl(null); setFileName("photo"); setStep("crop");
    setCrop({ x: 0, y: 0 }); setZoom(1); setRotation(0); setAspect(null); setCropPixels(null);
    setFlip({ horizontal: false, vertical: false }); setFilterKey("none"); setEnhance(false);
    setMask(null); setTrackingId(""); setResult(null); setStatus(null);
  }, [objectUrl, result]);

  const handleFile = useCallback(async (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) { setStatus("Please choose an image file."); return; }
    setStatus(null); setResult(null);
    const url = URL.createObjectURL(f);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(url);
    setFileName(f.name.replace(/\.[^.]+$/, "") || "photo");
    try {
      const img = await loadImage(url);
      setImage(img);
      setCrop({ x: 0, y: 0 }); setZoom(1); setRotation(0); setCropPixels(null);
      setFlip({ horizontal: false, vertical: false }); setMask(null);
      setTrackingId(generateWatermarkId());
      setStep("crop");
    } catch { setStatus("Could not load that image."); }
  }, [objectUrl]);

  /** Full pipeline render at export resolution. */
  const renderPipeline = useCallback(async (idOverride?: string): Promise<HTMLCanvasElement> => {
    if (!image) throw new Error("No image loaded");
    let canvas = await cropRotateFlip(image, cropPixels, rotation, flip, FILTERS[filterKey].css);
    if (enhance) canvas = autoEnhance(canvas);
    canvas = compositeRetouch(canvas, mask);
    canvas = applyVisibleWatermarks(canvas, {
      brandText, position: wmPos, opacity: wmOpacity, scale: wmScale, bneBadge, trackingId: idOverride ?? trackingId,
    });
    return canvas;
  }, [image, cropPixels, rotation, flip, filterKey, enhance, mask, brandText, wmPos, wmOpacity, wmScale, bneBadge, trackingId]);

  // Live preview for every step except crop (which uses the Cropper UI).
  useEffect(() => {
    if (!image || step === "crop") return;
    let cancelled = false;
    (async () => {
      try {
        const canvas = await renderPipeline();
        if (cancelled) return;
        const el = previewRef.current;
        if (el) {
          el.width = canvas.width; el.height = canvas.height;
          el.getContext("2d")?.drawImage(canvas, 0, 0);
        }
      } catch { /* preview is best-effort */ }
    })();
    return () => { cancelled = true; };
  }, [image, step, renderPipeline]);

  // Crop/rotation changes invalidate the retouch mask (geometry changed).
  const maskKey = `${cropPixels?.x ?? 0},${cropPixels?.y ?? 0},${cropPixels?.width ?? 0},${cropPixels?.height ?? 0},${rotation}`;
  useEffect(() => { setMask(null); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [maskKey]);

  const ensureMask = useCallback(async (): Promise<HTMLCanvasElement> => {
    if (mask) return mask;
    if (!image) throw new Error("No image");
    let base = await cropRotateFlip(image, cropPixels, rotation, flip, FILTERS[filterKey].css);
    if (enhance) base = autoEnhance(base);
    const m = document.createElement("canvas");
    m.width = base.width; m.height = base.height;
    setMask(m);
    return m;
  }, [mask, image, cropPixels, rotation, flip, filterKey, enhance]);

  const paintAt = useCallback(async (e: React.PointerEvent<HTMLCanvasElement>) => {
    const el = previewRef.current;
    if (!el || !image) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * el.width;
    const y = ((e.clientY - rect.top) / rect.height) * el.height;
    const m = await ensureMask();
    const scale = el.width / Math.max(1, rect.width);
    paintMaskDot(m, x, y, Math.max(4, brushSize * scale * 0.5));
    // Re-render preview with updated mask.
    try {
      const canvas = await renderPipeline();
      const ctx = el.getContext("2d");
      if (ctx) { el.width = canvas.width; el.height = canvas.height; ctx.drawImage(canvas, 0, 0); }
    } catch { /* best-effort */ }
  }, [ensureMask, brushSize, image, renderPipeline]);

  const doExport = useCallback(async () => {
    setBusy(true); setStatus(null);
    // Snapshot the ID for this export; a fresh one is minted afterwards so
    // re-exports never collide with the registry's unique tracking IDs.
    const exportId = trackingId || generateWatermarkId();
    try {
      const canvas = await renderPipeline(exportId);
      if (format === "png") embedTrackingId(canvas, exportId);
      const blob = format === "png"
        ? await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("PNG encode failed"))), "image/png"))
        : await canvasToBlob(canvas, quality);
      const fileHash = await sha256Hex(blob);
      const perceptualHash = dHashFromImage(canvas);
      const outName = `${fileName}-bne-edited.${format === "png" ? "png" : "jpg"}`;
      await registerFingerprint.mutateAsync({
        watermarkId: exportId, fileHash, perceptualHash, fileName: outName, mimeType: blob.type,
      });
      let metaNote = "metadata check unavailable";
      try {
        const { default: ExifReader } = await import("exifreader");
        const tags = ExifReader.load(await blob.arrayBuffer());
        const n = Object.keys(tags).length;
        metaNote = n === 0 ? "clean — 0 metadata tags in export" : `warning: ${n} metadata tags survived`;
      } catch { /* keep fallback */ }
      setResult({ url: URL.createObjectURL(blob), fileName: outName, fileHash, perceptualHash, metaNote, blob, sentToReview: false, trackingId: exportId });
      setTrackingId(generateWatermarkId()); // fresh ID for the next export
      setStatus("Exported and registered in Leak Shield.");
    } catch (err: any) {
      setStatus(err?.message || "Export failed.");
    } finally { setBusy(false); }
  }, [renderPipeline, format, quality, trackingId, fileName, registerFingerprint]);

  const sendToReview = useCallback(async () => {
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
        title: `Studio edit — ${result.trackingId}`,
        notes: "Edited in the BNE Studio Editor. Tracking ID burned in; fingerprint registered.",
      });
      setResult({ ...result, sentToReview: true });
      setStatus("Sent to content review — staff will see it in the review queue.");
    } catch (err: any) { setStatus(err?.message || "Could not send to review."); }
    finally { setBusy(false); }
  }, [result, createSubmission]);

  const rotate = (dir: 1 | -1) => setRotation((r) => (((r + dir * 90) % 360) + 360) % 360);
  const stepIdx = STEP_ORDER.indexOf(step);

  if (!image || !objectUrl) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <Upload className="mx-auto mb-4 h-10 w-10 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Studio Editor — Photos</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          Crop, retouch, filter, watermark, and export. Every export gets a unique
          tracking ID burned in and registered with Leak Shield.
        </p>
        <label className="mx-auto mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-black hover:bg-amber-300">
          <Upload className="h-4 w-4" /> Choose photo
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        {status && <p className="mt-4 text-sm text-red-400">{status}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="flex flex-wrap items-center gap-2">
        {STEP_ORDER.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => setStep(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                s === step ? "bg-amber-400 text-black" : i < stepIdx ? "bg-zinc-800 text-zinc-300" : "bg-zinc-900 text-zinc-500"
              }`}
            >
              {i + 1}. {STEP_LABEL[s]}
            </button>
            {i < STEP_ORDER.length - 1 && <span className="text-zinc-700">→</span>}
          </div>
        ))}
        <button onClick={resetAll} className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300">
          <X className="h-3.5 w-3.5" /> New photo
        </button>
      </div>

      {step === "crop" && (
        <div className="space-y-3">
          <div className="relative h-[440px] overflow-hidden rounded-2xl border border-zinc-800 bg-black">
            <Cropper
              image={objectUrl} crop={crop} zoom={zoom} rotation={rotation}
              aspect={aspect ?? undefined}
              onCropChange={setCrop} onCropComplete={onCropComplete}
              onZoomChange={setZoom} onRotationChange={setRotation}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ASPECTS.map((a) => (
              <button key={a.label} onClick={() => setAspect(a.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${aspect === a.value ? "bg-amber-400 text-black" : "border border-zinc-800 text-zinc-300"}`}>
                {a.label}
              </button>
            ))}
            <span className="ml-2 text-xs text-zinc-500">Zoom</span>
            <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-32 accent-amber-400" />
            <span className="text-xs text-zinc-500">Rotate</span>
            <button onClick={() => rotate(-1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 hover:border-amber-400" title="Rotate left"><RotateCcw className="h-4 w-4" /></button>
            <button onClick={() => rotate(1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 hover:border-amber-400" title="Rotate right"><RotateCw className="h-4 w-4" /></button>
          </div>
          <p className="text-xs text-zinc-500">Drag to frame, scroll to zoom. Cropping re-renders the photo, which strips all EXIF metadata.</p>
        </div>
      )}

      {step !== "crop" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
            {step === "retouch" ? (
              <canvas
                ref={previewRef}
                className="max-h-[560px] w-full cursor-crosshair touch-none object-contain"
                onPointerDown={(e) => { painting.current = true; (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId); paintAt(e); }}
                onPointerMove={(e) => painting.current && paintAt(e)}
                onPointerUp={() => (painting.current = false)}
                onPointerCancel={() => (painting.current = false)}
              />
            ) : (
              <canvas ref={previewRef} className="max-h-[560px] w-full object-contain" />
            )}
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            {step === "adjust" && (
              <>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Rotate & flip</p>
                  <div className="flex gap-2">
                    <button onClick={() => rotate(-1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 hover:border-amber-400" title="Rotate left"><RotateCcw className="h-4 w-4" /></button>
                    <button onClick={() => rotate(1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 hover:border-amber-400" title="Rotate right"><RotateCw className="h-4 w-4" /></button>
                    <button onClick={() => setFlip((f) => ({ ...f, horizontal: !f.horizontal }))} className={`rounded-lg border p-2 ${flip.horizontal ? "border-amber-400 text-amber-300" : "border-zinc-800 text-zinc-300"}`} title="Flip horizontal"><FlipHorizontal2 className="h-4 w-4" /></button>
                    <button onClick={() => setFlip((f) => ({ ...f, vertical: !f.vertical }))} className={`rounded-lg border p-2 ${flip.vertical ? "border-amber-400 text-amber-300" : "border-zinc-800 text-zinc-300"}`} title="Flip vertical"><FlipVertical2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Filter packs</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(FILTERS).map(([key, f]) => (
                      <button key={key} onClick={() => setFilterKey(key)} title={f.hint}
                        className={`rounded-lg border px-3 py-2 text-left ${filterKey === key ? "border-amber-400 bg-amber-400/10" : "border-zinc-800"}`}>
                        <span className={`block text-xs font-bold ${filterKey === key ? "text-amber-300" : "text-zinc-200"}`}>{f.label}</span>
                        <span className="block text-[10px] text-zinc-500">{f.hint}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setEnhance((v) => !v)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${enhance ? "bg-amber-400 text-black" : "border border-zinc-700 text-zinc-200 hover:border-amber-400"}`}>
                  <Sparkles className="h-4 w-4" /> Auto-enhance {enhance ? "on" : "off"}
                </button>
                <p className="text-xs text-zinc-500">Auto-enhance stretches levels per channel — recovers flat lighting in one tap.</p>
              </>
            )}

            {step === "retouch" && (
              <>
                <p className="flex items-center gap-2 text-sm font-bold text-white"><Brush className="h-4 w-4 text-amber-400" /> Smart airbrush</p>
                <p className="text-xs text-zinc-500">Paint over skin to smooth it. The brush blends a softened layer only where you paint — eyes, hair, and background stay untouched.</p>
                <div>
                  <p className="mb-1 text-xs text-zinc-400">Brush size: {brushSize}px</p>
                  <input type="range" min={10} max={200} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full accent-amber-400" />
                </div>
                <button onClick={() => setMask(null)} className="w-full rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-red-400 hover:text-red-300">
                  Clear retouching
                </button>
              </>
            )}

            {step === "watermark" && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">Your brand text</label>
                  <input value={brandText} onChange={(e) => setBrandText(e.target.value)} placeholder="e.g. @yourname or onlyfans.com/you"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Position</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {WM_POSITIONS.map((p) => (
                      <button key={p.id} onClick={() => setWmPos(p.id)} title={p.label}
                        className={`h-8 rounded-md border ${wmPos === p.id ? "border-amber-400 bg-amber-400/20" : "border-zinc-800"}`} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs text-zinc-400">Opacity: {Math.round(wmOpacity * 100)}%</p>
                  <input type="range" min={0.2} max={1} step={0.05} value={wmOpacity} onChange={(e) => setWmOpacity(Number(e.target.value))} className="w-full accent-amber-400" />
                </div>
                <div>
                  <p className="mb-1 text-xs text-zinc-400">Size: {Math.round(wmScale * 100)}%</p>
                  <input type="range" min={0.5} max={2.5} step={0.1} value={wmScale} onChange={(e) => setWmScale(Number(e.target.value))} className="w-full accent-amber-400" />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" checked={bneBadge} onChange={(e) => setBneBadge(e.target.checked)} className="h-4 w-4 accent-amber-400" />
                  BNE badge + tracking ID
                </label>
                <p className="text-xs text-zinc-500">
                  Tracking ID <span className="font-mono text-amber-300">{trackingId || "—"}</span> is
                  burned into the BNE badge and hidden invisibly in PNG exports.
                </p>
              </>
            )}

            {step === "export" && (
              <>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Format</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setFormat("jpeg")}
                      className={`rounded-lg border px-3 py-2 text-sm font-bold ${format === "jpeg" ? "border-amber-400 bg-amber-400/10 text-amber-300" : "border-zinc-800 text-zinc-300"}`}>
                      JPEG <span className="block text-[10px] font-normal text-zinc-500">small, for posting</span>
                    </button>
                    <button onClick={() => setFormat("png")}
                      className={`rounded-lg border px-3 py-2 text-sm font-bold ${format === "png" ? "border-amber-400 bg-amber-400/10 text-amber-300" : "border-zinc-800 text-zinc-300"}`}>
                      PNG <span className="block text-[10px] font-normal text-zinc-500">keeps invisible tracking ID</span>
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    {format === "png"
                      ? "PNG is lossless, so the invisible LSB tracking mark survives and stays machine-readable for leak scanning."
                      : "JPEG recompression destroys invisible LSB marks — the visible watermark and the Leak Shield fingerprint still protect this file."}
                  </p>
                </div>
                {format === "jpeg" && (
                  <div>
                    <p className="mb-1 text-xs text-zinc-400">Quality: {Math.round(quality * 100)}%</p>
                    <input type="range" min={0.6} max={1} step={0.01} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-amber-400" />
                  </div>
                )}
                <button onClick={doExport} disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-black hover:bg-amber-300 disabled:opacity-50">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  Export & register
                </button>
                {result && (
                  <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs">
                    <p className="flex items-center gap-1.5 font-bold text-emerald-300"><Check className="h-4 w-4" /> Registered in Leak Shield</p>
                    <p className="text-zinc-400">Tracking ID: <span className="font-mono text-amber-300">{result.trackingId}</span></p>
                    <p className="break-all text-zinc-500">SHA-256: <span className="font-mono">{result.fileHash.slice(0, 32)}…</span></p>
                    <p className="text-zinc-500">Perceptual hash: <span className="font-mono">{result.perceptualHash}</span></p>
                    <p className="text-zinc-500">Metadata: {result.metaNote}</p>
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
                      <p className="text-emerald-300">In the review queue — staff feedback will appear under Content Review.</p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Step nav */}
            <div className="flex gap-2 border-t border-zinc-800 pt-4">
              {stepIdx > 0 && (
                <button onClick={() => setStep(STEP_ORDER[stepIdx - 1])}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-200 hover:border-zinc-500">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              {stepIdx < STEP_ORDER.length - 1 && (
                <button onClick={() => setStep(STEP_ORDER[stepIdx + 1])}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black hover:bg-amber-300">
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {status && (
        <p className={`rounded-xl border px-4 py-2 text-sm ${/fail|Could not|warning/i.test(status) ? "border-red-900 bg-red-950/40 text-red-300" : "border-zinc-800 bg-zinc-900 text-zinc-300"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
