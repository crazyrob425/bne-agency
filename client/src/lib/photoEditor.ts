/**
 * photoEditor.ts — client-side photo pipeline for the BNE Studio Editor.
 *
 * Pure canvas helpers (no framework deps):
 *  - rotate-aware cropping (react-easy-crop croppedAreaPixels convention)
 *  - CSS-filter application at export resolution
 *  - auto-enhance (per-channel 1st/99th percentile levels stretch)
 *  - retouch compositing (blurred layer masked by the user's paint strokes)
 *  - visible watermarks (client brand text + BNE badge)
 *
 * EXIF/metadata note: every export re-encodes through canvas, which drops all
 * embedded metadata (EXIF/GPS/XMP) by construction.
 */

export interface CropPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FlipState {
  horizontal: boolean;
  vertical: boolean;
}

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180;

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

/**
 * Crop + rotate + flip the source image.
 * `pixelCrop` follows the react-easy-crop onCropComplete convention:
 * coordinates in the rotated bounding-box space.
 */
export async function cropRotateFlip(
  image: HTMLImageElement,
  pixelCrop: CropPixels | null,
  rotation: number,
  flip: FlipState,
  filter: string = "",
): Promise<HTMLCanvasElement> {
  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.naturalWidth, image.naturalHeight, rotation);

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bBoxWidth);
  canvas.height = Math.round(bBoxHeight);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D not available");

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);
  if (filter) {
    try {
      ctx.filter = filter;
    } catch {
      /* older browsers ignore ctx.filter */
    }
  }
  ctx.drawImage(image, 0, 0);
  try {
    ctx.filter = "none";
  } catch {
    /* noop */
  }

  if (!pixelCrop) return canvas;

  const cropped = document.createElement("canvas");
  cropped.width = Math.round(pixelCrop.width);
  cropped.height = Math.round(pixelCrop.height);
  const cctx = cropped.getContext("2d", { willReadFrequently: true });
  if (!cctx) throw new Error("Canvas 2D not available");
  cctx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    cropped.width,
    cropped.height,
  );
  return cropped;
}

/**
 * Auto-enhance: stretch each channel's 1st–99th percentile to full range.
 * Sampled for speed; operates in place on the passed canvas.
 */
export function autoEnhance(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return canvas;
  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height);
  const d = img.data;

  const step = 16;
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  for (let i = 0; i < d.length; i += 4 * step) {
    rs.push(d[i]);
    gs.push(d[i + 1]);
    bs.push(d[i + 2]);
  }
  const pct = (arr: number[], p: number) => {
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
  };
  const map = (v: number, lo: number, hi: number) => {
    if (hi <= lo) return v;
    const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
    return Math.round(t * 255);
  };
  const rLo = pct(rs, 1);
  const rHi = pct(rs, 99);
  const gLo = pct(gs, 1);
  const gHi = pct(gs, 99);
  const bLo = pct(bs, 1);
  const bHi = pct(bs, 99);

  for (let i = 0; i < d.length; i += 4) {
    d[i] = map(d[i], rLo, rHi);
    d[i + 1] = map(d[i + 1], gLo, gHi);
    d[i + 2] = map(d[i + 2], bLo, bHi);
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const POS_FRACTIONS: Record<WatermarkPosition, [number, number]> = {
  "top-left": [0.04, 0.06],
  "top-center": [0.5, 0.06],
  "top-right": [0.96, 0.06],
  "middle-left": [0.04, 0.5],
  center: [0.5, 0.5],
  "middle-right": [0.96, 0.5],
  "bottom-left": [0.04, 0.94],
  "bottom-center": [0.5, 0.94],
  "bottom-right": [0.96, 0.94],
};

export interface VisibleWatermarkOpts {
  brandText: string;
  position: WatermarkPosition;
  opacity: number; // 0..1
  scale: number; // relative to image width
  bneBadge: boolean;
  trackingId: string;
}

/**
 * Burn visible watermarks into the canvas: client brand text at the chosen
 * position, plus an optional small "BNE • <trackingId>" badge.
 */
export function applyVisibleWatermarks(
  canvas: HTMLCanvasElement,
  opts: VisibleWatermarkOpts,
): HTMLCanvasElement {
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const { width, height } = canvas;
  const base = Math.max(width, height);

  ctx.save();
  ctx.textBaseline = "middle";

  if (opts.brandText.trim()) {
    const [fx, fy] = POS_FRACTIONS[opts.position];
    const fontSize = Math.max(14, Math.round(base * 0.035 * opts.scale));
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.globalAlpha = opts.opacity;
    ctx.textAlign = fx < 0.5 ? "left" : fx > 0.5 ? "right" : "center";
    const x = width * fx;
    const y = height * fy;
    ctx.shadowColor = "rgba(0,0,0,0.65)";
    ctx.shadowBlur = Math.round(fontSize * 0.25);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(opts.brandText.trim(), x, y);
    ctx.shadowBlur = 0;
  }

  if (opts.bneBadge) {
    const label = `BNE • ${opts.trackingId}`;
    const fontSize = Math.max(11, Math.round(base * 0.016));
    ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = "right";
    const pad = Math.round(fontSize * 0.6);
    const tw = ctx.measureText(label).width;
    const bw = tw + pad * 2;
    const bh = fontSize + pad * 1.6;
    const x = width - Math.round(width * 0.02) - bw;
    const y = height - Math.round(height * 0.02) - bh;
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "rgba(10,10,12,0.72)";
    const r = bh / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + bw, y, x + bw, y + bh, r);
    ctx.arcTo(x + bw, y + bh, x, y + bh, r);
    ctx.arcTo(x, y + bh, x, y, r);
    ctx.arcTo(x, y, x + bw, y, r);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#f5c518";
    ctx.fillText(label, x + bw - pad, y + bh / 2);
  }

  ctx.restore();
  return canvas;
}

/**
 * Retouch compositing: blend a blurred copy of `base` through the user's
 * paint mask (white soft dots = smoothed areas). Returns a new canvas.
 */
export function compositeRetouch(
  base: HTMLCanvasElement,
  mask: HTMLCanvasElement | null,
  blurPx = 4,
): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = base.width;
  out.height = base.height;
  const octx = out.getContext("2d");
  if (!octx) return base;
  octx.drawImage(base, 0, 0);
  if (!mask) return out;

  const smooth = document.createElement("canvas");
  smooth.width = base.width;
  smooth.height = base.height;
  const sctx = smooth.getContext("2d");
  if (!sctx) return out;
  try {
    sctx.filter = `blur(${blurPx}px)`;
  } catch {
    /* ignore */
  }
  sctx.drawImage(base, 0, 0);

  const masked = document.createElement("canvas");
  masked.width = base.width;
  masked.height = base.height;
  const mctx = masked.getContext("2d");
  if (!mctx) return out;
  mctx.drawImage(smooth, 0, 0);
  mctx.globalCompositeOperation = "destination-in";
  mctx.drawImage(mask, 0, 0, masked.width, masked.height);

  octx.drawImage(masked, 0, 0);
  return out;
}

/** Paint one soft dot onto the retouch mask canvas (canvas pixel coords). */
export function paintMaskDot(
  mask: HTMLCanvasElement,
  x: number,
  y: number,
  radius: number,
  strength = 0.35,
): void {
  const ctx = mask.getContext("2d");
  if (!ctx) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, `rgba(255,255,255,${strength})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export function canvasToBlob(canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
      "image/jpeg",
      quality,
    );
  });
}
