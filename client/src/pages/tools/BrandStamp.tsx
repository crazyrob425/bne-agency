import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Shield, Upload, Download, Copy, Check, Image as ImageIcon, Type, Sliders, Grid3X3, Lock, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POSITIONS = ["Top-Left", "Top-Center", "Top-Right", "Center-Left", "Center", "Center-Right", "Bottom-Left", "Bottom-Center", "Bottom-Right"] as const;
const WATERMARK_STYLES = ["Diagonal Tile", "Single Corner", "Center Bold", "Edge Repeat"] as const;

const SAMPLE_IMAGES = [
  { id: "1", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", name: "IMG_2847.jpg" },
  { id: "2", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop", name: "studio_02.jpg" },
  { id: "3", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop", name: "set_promo.jpg" },
  { id: "4", url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop", name: "campaign_01.jpg" },
  { id: "5", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", name: "lifestyle_05.jpg" },
  { id: "6", url: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop", name: "editorial_09.jpg" },
];

export default function BrandStamp() {
  const [watermarkText, setWatermarkText] = useState("@YourHandle");
  const [opacity, setOpacity] = useState(40);
  const [position, setPosition] = useState<typeof POSITIONS[number]>("Bottom-Right");
  const [style, setStyle] = useState<typeof WATERMARK_STYLES[number]>("Single Corner");
  const [selectedImages, setSelectedImages] = useState<string[]>(SAMPLE_IMAGES.map(i => i.id));
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const toggleImage = (id: string) => {
    setSelectedImages(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleProcess = () => {
    setProcessing(true);
    setProgress(0);
    setShowResults(false);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getPreviewPosition = () => {
    switch (position) {
      case "Top-Left": return "top-4 left-4";
      case "Top-Center": return "top-4 left-1/2 -translate-x-1/2";
      case "Top-Right": return "top-4 right-4";
      case "Center-Left": return "top-1/2 left-4 -translate-y-1/2";
      case "Center": return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      case "Center-Right": return "top-1/2 right-4 -translate-y-1/2";
      case "Bottom-Left": return "bottom-4 left-4";
      case "Bottom-Center": return "bottom-4 left-1/2 -translate-x-1/2";
      case "Bottom-Right": return "bottom-4 right-4";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-slate-950 to-yellow-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">BrandStamp</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Batch Media<br />
              <span className="text-amber-400">Branding Engine</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Watermark hundreds of photos and videos in seconds. Protect your intellectual property and reinforce your brand across every asset.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-amber-400" />
                Watermark Text
              </h3>
              <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-amber-500" placeholder="@username or URL" />
            </div>

            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-400" />
                Opacity & Style
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Opacity: {opacity}%</label>
                  <input type="range" min="5" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Pattern Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WATERMARK_STYLES.map(s => (
                      <button key={s} onClick={() => setStyle(s)} className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${style === s ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Position</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {POSITIONS.map(p => (
                      <button key={p} onClick={() => setPosition(p)} className={`p-1.5 rounded border text-[9px] transition-all ${position === p ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : "border-slate-800 bg-slate-950/50 text-slate-500 hover:text-slate-300"}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-3">Selection</h3>
              <p className="text-xs text-slate-400 mb-3">{selectedImages.length} of {SAMPLE_IMAGES.length} images selected</p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleProcess} disabled={processing || selectedImages.length === 0} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Sparkles size={16} /> {processing ? "Processing..." : `Apply to ${selectedImages.length} Images`}
              </motion.button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-amber-400" />
                  Preview Grid
                </h3>
                <div className="flex gap-2">
                  {processing && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${progress}%` }} className="h-full bg-amber-500 rounded-full" />
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">{progress}%</span>
                    </div>
                  )}
                  {showResults && (
                    <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                      <Download size={14} /> Export ZIP
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SAMPLE_IMAGES.map((img) => {
                  const isSelected = selectedImages.includes(img.id);
                  const isProcessed = showResults && isSelected;
                  return (
                    <motion.div key={img.id} whileHover={{ scale: 1.02 }} onClick={() => toggleImage(img.id)} className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${isSelected ? "border-amber-500/50" : "border-slate-800 opacity-60"}`}>
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="text-center">
                          <p className="text-[10px] text-slate-300 mb-1">{img.name}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400"}`}>
                            {isSelected ? (isProcessed ? "Watermarked" : "Selected") : "Click to select"}
                          </span>
                        </div>
                      </div>
                      {isProcessed && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                      {isSelected && !isProcessed && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/80 border border-slate-700 rounded text-[10px] text-slate-300">
                          {watermarkText}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Platform Presets */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Platform Presets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: "Instagram", opacity: 25, pos: "Bottom-Center" },
                  { name: "Twitter/X", opacity: 35, pos: "Center" },
                  { name: "OnlyFans", opacity: 50, pos: "Bottom-Right" },
                  { name: "TikTok", opacity: 30, pos: "Bottom-Center" },
                ].map((preset) => (
                  <button key={preset.name} onClick={() => { setOpacity(preset.opacity); setPosition(preset.pos as any); }} className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 hover:border-amber-500/30 text-left transition-all">
                    <p className="text-xs font-semibold text-slate-200">{preset.name}</p>
                    <p className="text-[10px] text-slate-500">{preset.opacity}% • {preset.pos}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
