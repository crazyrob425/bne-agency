/**
 * steg.ts — BNE invisible tracking-ID codec (LSB steganography).
 *
 * Purpose: embed the Leak Shield tracking ID (e.g. "BNE-X7K2P9QA") invisibly
 * inside exported PNGs so a leaked file can be traced back to the exact
 * client asset and fingerprint-registry entry.
 *
 * WIRE FORMAT (documented for the future leak-scanner / DMCA subsystem):
 *   - 136 bits total = 17 bytes, embedded in the LSB of R,G,B channels
 *     (channel = bitIndex % 3) at pseudo-random pixel positions.
 *   - Pixel positions come from a deterministic LCG (seed 0x9E3779B9) with
 *     rejection sampling, so encoder and decoder agree without a key file.
 *   - Byte layout: [0x42,0x4E,0x45,0x31] ("BNE1" magic) ++ 12 ASCII bytes of
 *     the tracking ID (exactly "BNE-" + 8 chars) ++ 1 checksum byte
 *     (XOR of the 12 ID bytes).
 *
 * SURVIVAL: LSB data survives lossless PNG round-trips exactly. It does NOT
 * survive JPEG recompression, resizing, or heavy filtering. The Studio Editor
 * therefore only offers the invisible mark on PNG export and says so in the
 * UI. Visible watermarks + the SHA-256/dHash fingerprint registry cover JPEG.
 */

const MAGIC = [0x42, 0x4e, 0x45, 0x31]; // "BNE1"
const SEED = 0x9e3779b9;
const ID_LEN = 12; // "BNE-" + 8 chars
const PAYLOAD_BYTES = 4 + ID_LEN + 1; // 17

function lcg(state: number): number {
  // 32-bit LCG, unsigned arithmetic
  return (Math.imul(state, 1664525) + 1013904223) >>> 0;
}

/** Deterministic unique pixel indices for the payload bits. */
function payloadPositions(pixelCount: number, bits: number): number[] {
  const out: number[] = [];
  const seen = new Set<number>();
  let s = SEED;
  let guard = 0;
  while (out.length < bits && guard < bits * 50) {
    guard++;
    s = lcg(s);
    const idx = s % pixelCount;
    if (seen.has(idx)) continue;
    seen.add(idx);
    out.push(idx);
  }
  if (out.length < bits) throw new Error("Image too small to hold tracking ID");
  return out;
}

function buildPayload(trackingId: string): number[] {
  if (!/^BNE-[A-Za-z0-9]{8}$/.test(trackingId)) {
    throw new Error("Tracking ID must look like BNE-XXXXXXXX");
  }
  const idBytes = Array.from(trackingId).map((c) => c.charCodeAt(0));
  let chk = 0;
  for (const b of idBytes) chk ^= b;
  return [...MAGIC, ...idBytes, chk & 0xff];
}

/**
 * Embed `trackingId` into `canvas` in place. Returns the canvas.
 * Call BEFORE toBlob('image/png') — never before a JPEG export.
 */
export function embedTrackingId(canvas: HTMLCanvasElement, trackingId: string): HTMLCanvasElement {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D not available");
  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height);
  const d = img.data;
  const payload = buildPayload(trackingId);
  const positions = payloadPositions(width * height, PAYLOAD_BYTES * 8);

  let bit = 0;
  for (const byte of payload) {
    for (let b = 7; b >= 0; b--) {
      const bitVal = (byte >> b) & 1;
      const px = positions[bit];
      const ch = bit % 3; // 0=R, 1=G, 2=B
      const o = px * 4 + ch;
      d[o] = (d[o] & 0xfe) | bitVal;
      bit++;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

/**
 * Extract a tracking ID from an image element/canvas. Returns the ID string
 * or null when no valid BNE mark is present.
 */
export async function extractTrackingId(src: CanvasImageSource): Promise<string | null> {
  const canvas = document.createElement("canvas");
  const w = (src as HTMLImageElement).naturalWidth || (src as HTMLCanvasElement).width || (src as HTMLVideoElement).videoWidth;
  const h = (src as HTMLImageElement).naturalHeight || (src as HTMLCanvasElement).height || (src as HTMLVideoElement).videoHeight;
  if (!w || !h) return null;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(src, 0, 0);
  let img: ImageData;
  try {
    img = ctx.getImageData(0, 0, w, h);
  } catch {
    return null; // tainted canvas (cross-origin)
  }
  const d = img.data;
  const positions = payloadPositions(w * h, PAYLOAD_BYTES * 8);

  const bytes: number[] = [];
  for (let i = 0; i < PAYLOAD_BYTES; i++) {
    let byte = 0;
    for (let b = 7; b >= 0; b--) {
      const bit = i * 8 + (7 - b);
      const px = positions[bit];
      const ch = bit % 3;
      byte |= (d[px * 4 + ch] & 1) << b;
    }
    bytes.push(byte);
  }
  for (let i = 0; i < 4; i++) if (bytes[i] !== MAGIC[i]) return null;
  const idBytes = bytes.slice(4, 16);
  const chk = bytes[16];
  let calc = 0;
  for (const x of idBytes) calc ^= x;
  if ((calc & 0xff) !== chk) return null;
  const id = String.fromCharCode(...idBytes);
  return /^BNE-[A-Za-z0-9]{8}$/.test(id) ? id : null;
}
