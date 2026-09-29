/**
 * blindWatermark.ts — watermark-js-plus integration.
 *
 * Used for the *on-screen deterrent* layer: an invisible DOM overlay
 * (alpha 0.005) laid over portal content previews. Anyone who screenshots a
 * preview captures the blind mark; staff can later run `revealBlindMark`
 * (contrast-enhancement decode) to make it visible and read the tracking ID.
 *
 * This is separate from the machine-readable LSB tracking ID in steg.ts,
 * which is burned into exported PNG pixels. Both layers are honest about
 * what they do: the blind overlay deters and reveals visually; the LSB mark
 * is what future automated leak-scanning software will parse.
 */
import { BlindWatermark } from "watermark-js-plus";

/**
 * Attach an invisible blind-watermark overlay to a positioned container.
 * Returns a cleanup function. The container needs `position: relative`.
 */
export function attachPreviewBlindMark(container: HTMLElement, trackingId: string): () => void {
  const wm = new BlindWatermark({
    content: `BNE LEAK-SHIELD ${trackingId}`,
    parent: container,
    fontSize: "20px",
    fontColor: "#ffffff",
    rotate: 24,
    fontWeight: "700",
  });
  wm.create().catch(() => {
    /* overlay is best-effort; never break the preview */
  });
  return () => {
    try {
      wm.destroy();
    } catch {
      /* noop */
    }
  };
}

/**
 * Reveal the blind watermark hidden in an image URL. Resolves with a data URL
 * of the contrast-enhanced image (read the tracking ID visually from it), or
 * "" if decoding produced nothing.
 */
export function revealBlindMark(imageUrl: string, timeoutMs = 20000): Promise<string> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v: string) => {
      if (!done) {
        done = true;
        resolve(v);
      }
    };
    try {
      BlindWatermark.decode({
        url: imageUrl,
        onSuccess: (dataUrl: string) => finish(typeof dataUrl === "string" ? dataUrl : ""),
      });
    } catch {
      finish("");
    }
    setTimeout(() => finish(""), timeoutMs);
  });
}
