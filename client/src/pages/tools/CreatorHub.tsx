import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link2, Lock, Globe, Users, TrendingUp, Copy, Check, Share2, Eye, Heart, MessageCircle, Crown, Unlock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Block {
  id: string;
  type: "link" | "image" | "video" | "tip" | "age-gate" | "text";
  title: string;
  value: string;
}

const THEMES = [
  { id: "midnight", name: "Midnight", bg: "bg-slate-950", accent: "text-violet-400", border: "border-violet-500/30" },
  { id: "rose", name: "Rose Gold", bg: "bg-rose-950", accent: "text-rose-400", border: "border-rose-500/30" },
  { id: "emerald", name: "Emerald", bg: "bg-emerald-950", accent: "text-emerald-400", border: "border-emerald-500/30" },
  { id: "amber", name: "Amber", bg: "bg-amber-950", accent: "text-amber-400", border: "border-amber-500/30" },
  { id: "cyan", name: "Cyan", bg: "bg-cyan-950", accent: "text-cyan-400", border: "border-cyan-500/30" },
  { id: "slate", name: "Pure Slate", bg: "bg-slate-900", accent: "text-slate-400", border: "border-slate-500/30" },
] as const;

const PLATFORM_ICONS: Record<string, string> = {
  "Twitter/X": "𝕏",
  "Instagram": "📷",
  "TikTok": "🎵",
  "Fansly": "💎",
  "OnlyFans": "🔒",
  "ManyVids": "🎬",
  "Patreon": "🎨",
  "YouTube": "▶",
};

export default function CreatorHub() {
  const [pageName, setPageName] = useState("YourName");
  const [theme, setTheme] = useState<typeof THEMES[number]>(THEMES[0]);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "link", title: "Main Platform", value: "https://onlyfans.com/yourname" },
    { id: "2", type: "tip", title: "Tip Jar", value: "https://paypal.me/yourname" },
    { id: "3", type: "age-gate", title: "Age Verification", value: "18+ Only" },
  ]);
  const [analytics, setAnalytics] = useState({ visitors: 1247, clicks: 389, conversion: "31%" });
  const [copied, setCopied] = useState(false);

  const addBlock = (type: Block["type"]) => {
    const titles: Record<Block["type"], string> = { link: "New Link", image: "Image", video: "Video", tip: "Tip Menu", "age-gate": "Age Gate", text: "Text Block" };
    setBlocks([...blocks, { id: Date.now().toString(), type, title: titles[type], value: "" }]);
  };

  const updateBlock = (id: string, field: keyof Block, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));

  const pageUrl = `https://bl.studio/@${pageName.toLowerCase().replace(/\s/g, "")}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-teal-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <Link2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">CreatorHub</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Your Link in Bio,<br />
              <span className="text-emerald-400">Supercharged</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Build a customizable, NSFW-friendly landing page with fan gates, tip menus, and deep analytics. The last link you'll ever need.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Editor */}
          <div className="space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Page Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Page Name</label>
                  <input type="text" value={pageName} onChange={(e) => setPageName(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {THEMES.map((t) => (
                      <button key={t.id} onClick={() => setTheme(t)} className={`p-3 rounded-lg border text-xs font-semibold transition-all ${theme.id === t.id ? `${t.border} ${t.accent} bg-slate-900` : "border-slate-800 bg-slate-950/50 text-slate-500 hover:text-slate-300"}`}>
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Add Block</label>
                  <div className="flex flex-wrap gap-2">
                    {[["link", "Link"], ["image", "Image"], ["video", "Video"], ["tip", "Tip Menu"], ["age-gate", "Age Gate"], ["text", "Text"]].map(([type, label]) => (
                      <button key={type} onClick={() => addBlock(type as Block["type"])} className="px-3 py-1.5 border border-slate-800 rounded-lg bg-slate-950/50 hover:border-emerald-500/30 text-[11px] text-slate-400 hover:text-slate-200 transition-all">
                        + {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Content Blocks</h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {blocks.map((block) => (
                    <motion.div key={block.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 border border-slate-800 rounded-lg bg-slate-950/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{block.type} Block</span>
                        <button onClick={() => removeBlock(block.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                          <Unlock size={12} />
                        </button>
                      </div>
                      <input type="text" value={block.title} onChange={(e) => updateBlock(block.id, "title", e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body focus:outline-none focus:border-emerald-500" placeholder="Block title..." />
                      <input type="text" value={block.value} onChange={(e) => updateBlock(block.id, "value", e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body focus:outline-none focus:border-emerald-500" placeholder={block.type === "age-gate" ? "18+ Only" : "URL or content..."} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Preview + Analytics */}
          <div className="space-y-6">
            {/* Phone Preview */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Eye className="h-4 w-4" /> Live Preview
              </h3>
              <div className="mx-auto w-[280px] border-4 border-slate-800 rounded-[2rem] overflow-hidden bg-slate-950 shadow-2xl">
                <div className={`p-4 ${theme.bg} min-h-[500px]`}>
                  <div className="text-center mb-6 pt-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mb-3">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{pageName}</h4>
                    <p className="text-[10px] text-slate-400">Creator • Verified</p>
                  </div>
                  <div className="space-y-2">
                    {blocks.map((block) => (
                      <div key={block.id} className={`p-3 rounded-lg border ${theme.border} ${theme.accent} bg-slate-900/60 text-center`}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{block.title}</p>
                        {block.type === "age-gate" ? (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Lock size={10} />
                            <span className="text-[10px]">{block.value || "18+"}</span>
                          </div>
                        ) : (
                          <p className="text-[10px] mt-1 opacity-80 truncate">{block.value || "..."}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                    <p className="text-[9px] text-slate-600">Powered by CreatorHub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Page Analytics
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Visitors", value: analytics.visitors.toLocaleString(), icon: Eye },
                  { label: "Clicks", value: analytics.clicks.toLocaleString(), icon: Heart },
                  { label: "Conversion", value: analytics.conversion, icon: TrendingUp },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                      <Icon className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">Top Performing Link</span>
                  <span className="text-[10px] text-emerald-400">42% CTR</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-3">Your Public URL</h3>
              <div className="flex gap-2">
                <input type="text" readOnly value={pageUrl} className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-mono" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { navigator.clipboard.writeText(pageUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.button>
              </div>
              <button className="w-full mt-3 py-2.5 border border-slate-700 rounded-lg text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Share2 size={14} /> Share Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
