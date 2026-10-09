/**
 * BlindPreview — wraps a media preview (img/video) in a positioned container
 * carrying an invisible watermark-js-plus blind-watermark overlay.
 *
 * Anyone who screenshots the preview captures the blind mark; staff can run
 * BlindWatermark.decode on the screenshot to reveal the tracking label.
 * Best-effort: the preview works fine even if the overlay fails to attach.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { attachPreviewBlindMark } from "@/lib/blindWatermark";

export default function BlindPreview({
  trackingLabel,
  children,
  className = "",
}: {
  trackingLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !trackingLabel) return;
    const cleanup = attachPreviewBlindMark(el, trackingLabel);
    return cleanup;
  }, [trackingLabel]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
}
