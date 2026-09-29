/**
 * PortalStudioEditor — the "Studio Editor" member module shell.
 *
 * Module-gated via MemberGate (module key "studio-editor"). Photo and Video
 * tabs; the video side is lazy-loaded so the ffmpeg.wasm engine (~31 MB of
 * wasm, loaded on demand) never touches the initial portal bundle.
 */
import { lazy, Suspense, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Camera, Clapperboard, Loader2, Wand2 } from "lucide-react";
import Seo from "@/components/Seo";
import MemberGate from "./MemberGate";
import StudioPhotoEditor from "./StudioPhotoEditor";

const StudioVideoEditor = lazy(() => import("./StudioVideoEditor"));

export default function PortalStudioEditor() {
  const [tab, setTab] = useState<"photo" | "video">("photo");

  return (
    <MemberGate module="studio-editor">
      <Seo title="Studio Editor" description="Edit photos and video in your browser — watermarked, fingerprinted, review-ready." noIndex noFollow />
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> My portal
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Wand2 className="w-6 h-6 text-amber-400" />
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400/90">Studio Editor</p>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Polish it before you post it</h1>
          <p className="text-zinc-400 max-w-2xl mb-8">
            Crop, retouch, filter, watermark — then export with a tracking ID burned in and a
            Leak Shield fingerprint registered. Send the finished file straight to staff for review.
          </p>

          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setTab("photo")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold ${
                tab === "photo" ? "bg-amber-400 text-black" : "border border-zinc-800 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <Camera className="w-4 h-4" /> Photos
            </button>
            <button
              onClick={() => setTab("video")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold ${
                tab === "video" ? "bg-amber-400 text-black" : "border border-zinc-800 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <Clapperboard className="w-4 h-4" /> Video
            </button>
          </div>

          {tab === "photo" ? (
            <StudioPhotoEditor />
          ) : (
            <Suspense
              fallback={
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-zinc-400">
                  <Loader2 className="w-5 h-5 animate-spin" /> Loading video engine…
                </div>
              }
            >
              <StudioVideoEditor />
            </Suspense>
          )}
        </div>
      </div>
    </MemberGate>
  );
}
