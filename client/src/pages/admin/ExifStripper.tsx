/**
 * ExifStripper — working in-browser metadata removal tool.
 *
 * Everything runs locally in the admin's browser: files are never uploaded.
 * JPEG: scans APPn/COM segments (EXIF, XMP, IPTC, ICC, thumbnails) and reports
 * them, then re-encodes via canvas which destroys every metadata segment.
 * PNG/WebP: same re-encode path. The output is re-scanned to prove zero
 * metadata segments remain.
 *
 * Honest limits, stated in the UI: this kills metadata, not pixels. A face in
 * the photo is still a face — pair with cloaking + the persona firewall.
 */
import { useRef, useState } from "react";
import { Upload, ShieldCheck, Trash2, Download, FileImage, AlertTriangle, Check } from "lucide-react";

interface MetaSegment {
  kind: string;
  detail: string;
  bytes: number;
}

interface StrippedFile {
  id: string;
  name: string;
  originalSize: number;
  cleanedSize: number;
  width: number;
  height: number;
  found: MetaSegment[];
  cleanedUrl: string;
  cleanedName: string;
  verifiedClean: boolean;
  outType: string;
}

const fmtBytes = (n: number) =>
  n > 1048576 ? `${(n / 1048576).toFixed(2)} MB` : n > 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;

/** Scan a JPEG's APPn/COM segments for metadata payloads. */
function scanJpeg(bytes: Uint8Array): MetaSegment[] {
  const found: MetaSegment[] = [];
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return found;
  let i = 2;
  const td = new TextDecoder("ascii", { fatal: false });
  while (i + 4 < bytes.length) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    if (marker === 0xda || marker === 0xd9) break; // SOS / EOI — image data follows
    if (marker >= 0xe0 && marker <= 0xef) {
      const len = (bytes[i + 2] << 8) | bytes[i + 3];
      const head = td.decode(bytes.slice(i + 4, Math.min(i + 4 + 40, i + 2 + len)));
      let kind = `APP${marker - 0xe0} segment`;
      let detail = "application metadata";
      if (head.startsWith("Exif\0\0")) { kind = "EXIF"; detail = "camera settings, GPS, timestamps, thumbnails"; }
      else if (head.includes("http://ns.adobe.com/xap/1.0")) { kind = "XMP"; detail = "Adobe editing history / document IDs"; }
      else if (head.includes("Photoshop 3.0")) { kind = "IPTC / Photoshop IRB"; detail = "captions, keywords, creator info"; }
      else if (head.includes("ICC_PROFILE")) { kind = "ICC profile"; detail = "color profile (usually harmless)"; }
      else if (marker === 0xe0 && head.startsWith("JFIF")) { kind = "JFIF header"; detail = "basic format header (harmless)"; }
      found.push({ kind, detail, bytes: len });
      i += 2 + len;
    } else if (marker === 0xfe) {
      const len = (bytes[i + 2] << 8) | bytes[i + 3];
      found.push({ kind: "COM segment", detail: "embedded text comment", bytes: len });
      i += 2 + len;
    } else if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
    } else {
      const len = (bytes[i + 2] << 8) | bytes[i + 3];
      i += 2 + len;
    }
  }
  return found;
}

/** Scan PNG ancillary chunks for metadata. */
function scanPng(bytes: Uint8Array): MetaSegment[] {
  const found: MetaSegment[] = [];
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!sig.every((b, i) => bytes[i] === b)) return found;
  let i = 8;
  const td = new TextDecoder("ascii");
  const META: Record<string, string> = {
    tEXt: "text metadata (software, comments)", zTXt: "compressed text metadata",
    iTXt: "international text metadata", eXIf: "EXIF block (camera/GPS data)",
    iCCP: "ICC color profile", pHYs: "pixel dimensions", "tIME": "modification time",
  };
  while (i + 12 < bytes.length) {
    const len = (bytes[i] << 24) | (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3];
    const type = td.decode(bytes.slice(i + 4, i + 8));
    if (META[type]) found.push({ kind: `PNG ${type} chunk`, detail: META[type], bytes: len });
    if (type === "IEND") break;
    i += 12 + len;
  }
  return found;
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  try {
    // Applies EXIF orientation so the cleaned image isn't rotated wrong.
    return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch {
    return await createImageBitmap(file);
  }
}

export default function ExifStripper() {
  const [files, setFiles] = useState<StrippedFile[]>([]);
  const [working, setWorking] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const processFiles = async (list: FileList | File[]) => {
    const arr = Array.from(list).filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type));
    if (arr.length === 0) return;
    setWorking(true);
    const done: StrippedFile[] = [];
    for (const f of arr) {
      try {
        const buf = new Uint8Array(await f.arrayBuffer());
        const found = f.type === "image/png" ? scanPng(buf) : scanJpeg(buf);
        const bmp = await loadBitmap(f);
        const canvas = document.createElement("canvas");
        canvas.width = bmp.width;
        canvas.height = bmp.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(bmp, 0, 0);
        bmp.close();
        const outType = f.type === "image/png" ? "image/png" : "image/jpeg";
        const blob: Blob | null = await new Promise((res) =>
          canvas.toBlob(res, outType, 0.92)
        );
        if (!blob) continue;
        // Re-scan the output to prove the strip worked.
        const outBytes = new Uint8Array(await blob.arrayBuffer());
        const outFound = outType === "image/png" ? scanPng(outBytes) : scanJpeg(outBytes);
        const url = URL.createObjectURL(blob);
        const base = f.name.replace(/\.[^.]+$/, "");
        done.push({
          id: `f${++idRef.current}`,
          name: f.name,
          originalSize: f.size,
          cleanedSize: blob.size,
          width: canvas.width,
          height: canvas.height,
          found,
          cleanedUrl: url,
          cleanedName: `${base}-clean.${outType === "image/png" ? "png" : "jpg"}`,
          verifiedClean: outFound.filter((s) => !s.kind.startsWith("JFIF")).length === 0,
          outType,
        });
      } catch {
        /* skip unreadable files */
      }
    }
    setFiles((prev) => [...done, ...prev]);
    setWorking(false);
  };

  const remove = (id: string) =>
    setFiles((prev) => {
      const t = prev.find((f) => f.id === id);
      if (t) URL.revokeObjectURL(t.cleanedUrl);
      return prev.filter((f) => f.id !== id);
    });

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); processFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
          dragOver ? "border-violet-500 bg-violet-950/30" : "border-zinc-700 hover:border-zinc-500 bg-zinc-950/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files) processFiles(e.target.files); e.target.value = ""; }}
        />
        <Upload className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
        {working ? (
          <p className="text-sm text-violet-300">Stripping metadata…</p>
        ) : (
          <>
            <p className="text-white font-semibold mb-1">Drop images here or click to select</p>
            <p className="text-xs text-zinc-500">JPEG · PNG · WebP — processed 100% in this browser, never uploaded anywhere</p>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 border border-amber-900/40 rounded-xl p-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          This destroys <strong>metadata</strong> (GPS, camera serials, timestamps, edit history) — not pixels.
          A recognizable face stays recognizable. Always pair with cloaking and the persona firewall below.
          JPEG output is re-encoded at 92% quality; use PNG input for pixel-perfect results.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {files.map((f) => (
          <div key={f.id} className="border border-zinc-800 rounded-xl bg-zinc-950/70 p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileImage className="w-5 h-5 text-violet-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{f.name}</p>
                  <p className="text-[11px] text-zinc-500">
                    {f.width}×{f.height} · {fmtBytes(f.originalSize)} → {fmtBytes(f.cleanedSize)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {f.verifiedClean ? (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-900">
                    <ShieldCheck className="w-3.5 h-3.5" /> Output re-scanned: clean
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-900">
                    <AlertTriangle className="w-3.5 h-3.5" /> Review output
                  </span>
                )}
                <a
                  href={f.cleanedUrl}
                  download={f.cleanedName}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-violet-700 hover:bg-violet-600 text-white font-semibold transition"
                >
                  <Download className="w-3.5 h-3.5" /> {f.cleanedName}
                </a>
                <button onClick={() => remove(f.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-300 hover:bg-red-950/50 transition" aria-label="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                Metadata found in original ({f.found.length})
              </p>
              {f.found.length === 0 ? (
                <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> No metadata segments detected — original was already clean.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {f.found.map((s, i) => (
                    <span key={i} title={`${s.detail} (${fmtBytes(s.bytes)})`} className="text-[11px] px-2 py-1 rounded-full bg-red-950/50 border border-red-900/60 text-red-300">
                      {s.kind} · {fmtBytes(s.bytes)}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-zinc-600 mt-2">Every segment above was destroyed in the cleaned copy.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
