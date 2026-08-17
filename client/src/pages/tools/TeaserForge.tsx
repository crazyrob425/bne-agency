/**
 * TeaserForge — AI Content Teaser Clip Generator
 *
 * Tool #6: Upload full-length video → AI generates 2-10 teaser clips
 * with zoom in/out effects, configurable watermark, and BNE logo default.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { Link } from "wouter";
import {
  Play,
  Upload,
  Video,
  Image as ImageIcon,
  Download,
  Settings2,
  Zap,
  Crown,
  Lock,
  ChevronRight,
  Film,
  Maximize,
  Minimize,
  CornerDownLeft,
  CornerDownRight,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const BNE_LOGO_URL = "/BNE_logo2.png";

export default function TeaserForge() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [clipCount, setClipCount] = useState(5);
  const [watermarkMode, setWatermarkMode] = useState<"bne" | "custom" | "none">("bne");
  const [customWatermarkUrl, setCustomWatermarkUrl] = useState("");
  const [customWatermarkFile, setCustomWatermarkFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedClips, setGeneratedClips] = useState<
    { id: number; start: number; duration: number; label: string }[]
  >([]);
  const [zoomMode, setZoomMode] = useState<"zoom-in" | "zoom-out" | "none">("zoom-in");
  const [watermarkPosition, setWatermarkPosition] = useState<"top" | "bottom" | "corner">("corner");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    toast.success("Video loaded: " + file.name);
  }, []);

  const handleWatermarkUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomWatermarkFile(file);
    const url = URL.createObjectURL(file);
    setCustomWatermarkUrl(url);
  }, []);

  const generateTeasers = useCallback(() => {
    if (!uploadedFile) {
      toast.error("Upload a video first.");
      return;
    }

    setIsGenerating(true);

    // Simulate AI clip analysis — in production this would use FFmpeg + AI detection
    const totalDuration = 60; // simulated 60s video
    const clipDuration = Math.max(8, Math.floor(totalDuration / clipCount));
    const clips: { id: number; start: number; duration: number; label: string }[] = [];

    const labels = [
      "Hook — Opening Shot",
      "Peak Moment",
      "Climax Reveal",
      "Behind-the-Scenes",
      "Closing Call-to-Action",
      "Best Angle Shot",
      "Emotional Beat",
      "Signature Move",
      "Fashion/Outfit Reveal",
      "Final Frame",
    ];

    let startTime = 2;
    for (let i = 0; i < clipCount; i++) {
      const label = labels[i] || `Clip ${i + 1}`;
      clips.push({
        id: i,
        start: startTime,
        duration: Math.min(clipDuration, totalDuration - startTime - 2),
        label,
      });
      startTime += clipDuration + 1;
    }

    setTimeout(() => {
      setGeneratedClips(clips);
      setIsGenerating(false);
      toast.success(`Generated ${clips.length} teaser clips!`);
    }, 1500);
  }, [uploadedFile, clipCount]);

  const downloadClip = (clip: { id: number; label: string }) => {
    // In production, this would serve the processed clip
    toast.info(`Downloading "${clip.label}" — (simulated — backend processing required)`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece4]">
      <Seo
        title="TeaserForge — AI Video Teaser Generator | BNE Studio"
        description="Upload your full-length video and let TeaserForge AI automatically clip the best moments into 2-10 teaser clips with zoom effects and watermark branding."
        canonical="/tools/teaser-forge"
      />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/[0.03] blur-[160px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-6">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">TeaserForge</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-[#f0ece4] leading-[1.05] mb-6">
              One Video.<br />Ten Trailers.
            </h1>
            <p className="text-[#9a9488] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body">
              Upload your full-length content. TeaserForge AI clips the most compelling moments into scroll-stopping teaser trailers — with zoom effects, watermark branding, and a non-removable BNE identity frame that turns every clip into a billboard for your page.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Tool ── */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Upload */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                  <h3 className="font-display text-lg text-[#f0ece4] mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#D4AF37]" /> Video Upload
                  </h3>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#D4AF37]/20 rounded-xl cursor-pointer bg-[#080808] hover:border-[#D4AF37]/40 transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                      <p className="mb-1 text-sm text-[#9a9488] font-body">
                        <span className="font-semibold text-[#D4AF37]">Click to upload</span> or drag & drop
                      </p>
                      <p className="text-xs text-[#6a6560] font-body">MP4, MOV (max 2GB)</p>
                    </div>
                    <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
                  </label>

                  {uploadedFile && filePreview && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-[#D4AF37]/10">
                      <video ref={videoRef} src={filePreview} className="w-full h-40 object-cover" controls />
                      <div className="p-3 bg-[#080808] flex items-center justify-between">
                        <span className="text-xs font-body text-[#9a9488] truncate flex-1 mr-3">{uploadedFile.name}</span>
                        <span className="text-xs font-display text-[#D4AF37]">
                          {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Clip Settings */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <div className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                  <h3 className="font-display text-lg text-[#f0ece4] mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-[#D4AF37]" /> Clip Settings
                  </h3>

                  {/* Clip Count */}
                  <div className="mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-3 block">
                      Number of Clips: <span className="text-[#D4AF37] font-display">{clipCount}</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={clipCount}
                      onChange={(e) => setClipCount(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] h-2 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#6a6560] mt-1 font-body">
                      <span>2 clips</span><span>10 clips</span>
                    </div>
                  </div>

                  {/* Zoom Mode */}
                  <div className="mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-3 block">Begin/End Effect</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "zoom-in", icon: Maximize, label: "Zoom In" },
                        { value: "zoom-out", icon: Minimize, label: "Zoom Out" },
                        { value: "none", icon: CornerDownLeft, label: "None" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setZoomMode(opt.value as typeof zoomMode)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-body transition-all ${
                            zoomMode === opt.value
                              ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]"
                              : "border-[#D4AF37]/10 bg-[#080808] text-[#9a9488] hover:border-[#D4AF37]/30"
                          }`}
                        >
                          <opt.icon className="w-5 h-5" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Watermark */}
                  <div className="mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-3 block">Watermark</label>
                    <div className="space-y-2">
                      {[
                        { value: "bne", label: "BNE Studio Logo (default)", desc: "Blacklisted Studio brand mark — bottom corner" },
                        { value: "custom", label: "Upload Your Own", desc: "Custom watermark image" },
                        { value: "none", label: "No Watermark", desc: "Clean clips, no branding overlay" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setWatermarkMode(opt.value as typeof watermarkMode)}
                          className={`w-full text-left p-3 rounded-xl border transition-all ${
                            watermarkMode === opt.value
                              ? "border-[#D4AF37]/40 bg-[#D4AF37]/10"
                              : "border-[#D4AF37]/10 bg-[#080808] hover:border-[#D4AF37]/30"
                          }`}
                        >
                          <span className="text-xs font-display text-[#f0ece4]">{opt.label}</span>
                          <p className="text-[10px] text-[#6a6560] mt-0.5 font-body">{opt.desc}</p>
                        </button>
                      ))}
                    </div>

                    {watermarkMode === "custom" && (
                      <label className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080808] border border-[#D4AF37]/10 cursor-pointer hover:border-[#D4AF37]/30 transition-colors">
                        <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs font-body text-[#9a9488]">Upload watermark image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleWatermarkUpload} />
                      </label>
                    )}

                    {watermarkMode === "bne" && (
                      <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-display font-bold text-sm">
                          BNE
                        </div>
                        <div>
                          <p className="text-xs font-display text-[#f0ece4]">BNE Studio</p>
                          <p className="text-[10px] text-[#6a6560] font-body">Default watermark applied</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Generate */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={generateTeasers}
                    disabled={isGenerating || !uploadedFile}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#b8962e] to-[#D4AF37] text-[#0a0a0a] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Crown className="w-4 h-4 animate-pulse" /> AI is Clipping...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" /> Generate Teasers
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              {/* Generated Clips */}
              <AnimatePresence>
                {generatedClips.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
                    <h3 className="font-display text-xl text-[#f0ece4] flex items-center gap-2 mb-2">
                      <Film className="w-5 h-5 text-[#D4AF37]" /> Generated Teaser Clips
                    </h3>
                    <div className="grid gap-4">
                      {generatedClips.map((clip, i) => (
                        <motion.div
                          key={clip.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-4 flex items-center gap-4"
                        >
                          {/* Clip Preview Placeholder */}
                          <div className="relative w-32 h-20 bg-[#080808] rounded-xl border border-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Play className="w-8 h-8 text-[#D4AF37]/60" />
                            {watermarkMode === "bne" && (
                              <div className="absolute bottom-1 right-1 bg-[#0a0a0a]/80 px-2 py-0.5 rounded text-[8px] font-display text-[#D4AF37] tracking-wider">
                                BNE
                              </div>
                            )}
                            {zoomMode === "zoom-in" && (
                              <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-xl" />
                            )}
                            {zoomMode === "zoom-out" && (
                              <div className="absolute inset-2 rounded-xl border border-[#D4AF37]/10" />
                            )}
                          </div>

                          {/* Clip Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-display text-[#f0ece4] truncate">{clip.label}</p>
                            <p className="text-xs text-[#6a6560] font-body">
                              Start: {clip.start}s — Duration: {clip.duration}s
                              {zoomMode !== "none" && (
                                <span className="ml-2 text-[#D4AF37]">• {zoomMode === "zoom-in" ? "🔍 Zoom In" : "🔙 Zoom Out"}</span>
                              )}
                            </p>
                            {watermarkPosition === "corner" && (
                              <p className="text-[10px] text-[#D4AF37]/60 font-body mt-1">Watermark: bottom-right corner</p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => downloadClip(clip)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-display hover:bg-[#D4AF37]/20 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" /> Export
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Watermark Preview Note */}
                    <div className="p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
                      <div className="flex items-start gap-3">
                        <Lock className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-display text-[#f0ece4] mb-1">Non-Removable BND Branding</p>
                          <p className="text-[10px] text-[#9a9488] font-body leading-relaxed">
                            {watermarkMode === "bne"
                              ? "Every teaser clip includes the BNE Studio mark at the bottom-right corner and a branded bumper at the start and end. This is intentional — it drives traffic to your profile and cannot be removed from exported clips."
                              : watermarkMode === "custom"
                              ? "Your custom watermark will be overlaid at the " + watermarkPosition + " of each clip, with BNE branding bumpers at start and end."
                              : "No watermark is applied. BNE branding bumpers at start and end are non-removable."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl p-8 text-center mt-8">
                <h3 className="font-display text-2xl text-[#f0ece4] mb-3">Need Professional Teasers?</h3>
                <p className="text-[#9a9488] font-body mb-6 max-w-lg mx-auto">
                  Upload unlimited videos, generate 2-10 clips per video, with full watermark branding — included in every BNE Pro tier membership.
                </p>
                <Link href="/apply">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#b8962e] to-[#D4AF37] text-[#0a0a0a] font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    Upgrade to Pro
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
