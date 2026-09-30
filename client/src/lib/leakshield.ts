/**
 * leakshield — client-side tracking-ID + fingerprint helpers for the
 * Studio Editor and Leak Shield modules.
 *
 * Every export gets:
 *  - a unique watermark ID (BNE-XXXXXXXX), burned into the watermark/splash
 *  - a SHA-256 of the exact export bytes
 *  - a 64-bit dHash perceptual hash (survives re-encode/resize/crop-ish edits)
 *
 * The triple is registered via trpc.members.registerFingerprint so leaks
 * can be matched back to the source asset later.
 */

const ID_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L

export function generateWatermarkId(): string {
  const bytes = new Uint32Array(8);
  crypto.getRandomValues(bytes);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  return `BNE-${s}`;
}

export async function sha256Hex(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function loadImageFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image file."));
    };
    img.src = url;
  });
}

/**
 * 64-bit difference hash. Downsamples to 9x8, grayscales, then records
 * whether each pixel is brighter than its right neighbor. Returned as
 * 16 hex chars. Hamming distance <= ~10 between two hashes strongly
 * suggests the same source image.
 */
export function dHashFromImage(img: CanvasImageSource, w = 9, h = 8): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D unavailable");
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const gray: number[] = new Array(w * h);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  let bits = "";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w - 1; x++) {
      bits += gray[y * w + x] > gray[y * w + x + 1] ? "1" : "0";
    }
  }
  let hex = "";
  for (let i = 0; i < 64; i += 4) {
    hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
  }
  return hex;
}

/** Hamming distance between two hex dHashes (0 = identical). */
export function hashDistance(a: string, b: string): number {
  let d = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) {
      d += x & 1;
      x >>= 1;
    }
  }
  return d;
}
