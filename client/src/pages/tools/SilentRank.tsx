/**
 * SilentRank — Blacklisted Studio SEO Optimizer for Adult Content Creators
 *
 * Tool #5: Platform-compliant SEO optimizer for OnlyFans, Fansly, and
 * creator-owned sites. Checks bio text against platform blocklists,
 * suggests SEO-optimized rewrites, and uses pollination.ai (api-keyless)
 * to auto-generate compliant preview images.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Link } from "wouter";
import {
  Search,
  Shield,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  X,
  Zap,
  Wand2,
  Eye,
  TrendingUp,
  Hash,
  Target,
  FileText,
  Image as ImageIcon,
  Download,
  RefreshCw,
  Lock,
  LockOpen,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

// ── OnlyFans / Fansly / Platform Blocklists ────────────────────────────
const PLATFORM_BLOCKLISTS: Record<string, string[]> = {
  "OnlyFans": [
    "free", "free trial", "nude", "porn", "sexy", "NSFW", "nsfw",
    "cock", "pussy", "tit", "breast", "ass", "xxx", "sex", "fuck",
    "cum", "dick", "pornstar", "hardcore", "bare", "exposed",
  ],
  "Fansly": [
    "free", "free trial", "nude", "porn", "NSFW", "nsfw", "sex",
    "xxx", "fuck", "cum", "pussy", "cock", "dick", "tit", "breast",
  ],
  "Twitter / X": [
    "porn", "nude", "NSFW", "nsfw", "xxx", "sex", "fuck",
  ],
  "Instagram": [
    "porn", "nude", "NSFW", "nsfw", "xxx", "sex", "fuck", "cock",
    "pussy", "dick", "tits", "breasts", "bare",
  ],
  "TikTok": [
    "porn", "nude", "NSFW", "nsfw", "xxx", "sex", "fuck",
  ],
};

const SEO_SUGGEST = [
  { keyword: "exclusive content", why: "High search volume, signals premium access", boost: "+18%" },
  { keyword: "private creator", why: "Captures search intent for personal-brand searches", boost: "+15%" },
  { keyword: "member-exclusive", why: "Drives membership conversion, ranks long-tail", boost: "+12%" },
  { keyword: "behind the scenes", why: "High engagement signal, viral potential", boost: "+10%" },
  { keyword: "daily updates", why: "Matches platform algo freshness signals", boost: "+8%" },
  { keyword: "verified creator", why: "Trust signal that improves click-through", boost: "+7%" },
  { keyword: "personal page", why: "Captures discovery searches for individual creators", boost: "+6%" },
  { keyword: "18+ creator", why: "Age-verification keyword that platforms require", boost: "+5%" },
];

// ── Pollination.ai (api-keyless) Image Generation ──────────────────────
async function generatePollinationImage(prompt: string): Promise<string> {
  const encoded = encodeURIComponent(prompt);
  // pollination.ai public API — no key required for demo/generation
  return `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=630&nologo=true&private=true`;
}

export default function SilentRank() {
  const [rawText, setRawText] = useState("");
  const [platform, setPlatform] = useState("OnlyFans");
  const [complianceResult, setComplianceResult] = useState<{
    blocked: string[];
    clean: string;
    score: number;
  } | null>(null);
  const [seoResult, setSeoResult] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeContent = useCallback(async () => {
    if (!rawText.trim()) {
      toast.error("Paste your bio or content text first.");
      return;
    }

    setIsAnalyzing(true);
    setComplianceResult(null);
    setSeoResult([]);
    setPreviewImageUrl(null);

    // ── Step 1: Platform Compliance Check ──────────────────────────
    const blocklist = PLATFORM_BLOCKLISTS[platform] || PLATFORM_BLOCKLISTS["OnlyFans"];
    const textLower = rawText.toLowerCase();
    const foundBlocked = blocklist.filter((word) => textLower.includes(word.toLowerCase()));

    // Build cleaned text by replacing flagged words
    let cleanText = rawText;
    for (const word of foundBlocked) {
      const regex = new RegExp(word, "gi");
      cleanText = cleanText.replace(regex, "[REDACTED]");
    }

    const score = Math.max(0, Math.round(100 - foundBlocked.length * 8));

    setComplianceResult({ blocked: foundBlocked, clean: cleanText, score });

    // ── Step 2: SEO Suggestions ────────────────────────────────────
    const suggestions: string[] = [];
    for (const s of SEO_SUGGEST) {
      if (!textLower.includes(s.keyword.toLowerCase())) {
        suggestions.push(`${s.keyword} — ${s.why} (boost: ${s.boost})`);
      }
    }
    // Always add some suggestions even if text is clean
    if (suggestions.length === 0) {
      suggestions.push("Your text looks clean! Consider adding more long-tail keywords for better discoverability.");
      suggestions.push('"exclusive content" — signals premium access, drives subscriber conversion.');
      suggestions.push('"private creator" — high-search-intent phrase for your niche.');
    }
    setSeoResult(suggestions.slice(0, 6));

    // ── Step 3: Generate Preview Image via pollination.ai ──────────
    try {
      const imgPrompt = `elegant, dark, luxurious, adult creator profile banner, black and gold aesthetic, ${platform} bio preview, professional, cinematic, high-end`;
      const imgUrl = await generatePollinationImage(imgPrompt);
      setPreviewImageUrl(imgUrl);
    } catch {
      // pollination.ai may fail silently — that's fine
    }

    setIsAnalyzing(false);
    toast.success("Analysis complete!");
  }, [rawText, platform]);

  const handleCopyClean = () => {
    if (!complianceResult) return;
    navigator.clipboard.writeText(complianceResult.clean);
    setCopied(true);
    toast.success("Clean text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece4]">
      <Seo
        title="SilentRank — Adult Content SEO Optimizer | BNE Studio"
        description="Audit your OnlyFans, Fansly, and creator bios for platform compliance and SEO optimization. AI-enhanced filters, keyword suggestions, and preview image generation — all api-keyless."
        canonical="/tools/silent-rank"
      />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#D4AF37]/[0.04] blur-[180px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-6">
              <LockOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">SilentRank</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-[#f0ece4] leading-[1.05] mb-6">
              Your Bio,<br />Optimized in Silence
            </h1>
            <p className="text-[#9a9488] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body">
              Paste your profile text. SilentRank audits it for platform compliance against OnlyFans, Fansly, and major social media blocklists — then suggests SEO-optimized rewrites and generates clean preview images, all without an API key.
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
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                  <h3 className="font-display text-xl text-[#f0ece4] mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D4AF37]" /> Content Input
                  </h3>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your OnlyFans bio, Fansly description, or any creator profile text here..."
                    className="w-full h-48 bg-[#080808] border border-[#D4AF37]/10 rounded-xl p-4 text-[#f0ece4] placeholder:text-[#5a5650] focus:outline-none focus:border-[#D4AF37]/30 font-body text-sm leading-relaxed resize-none"
                  />

                  <div className="mt-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-2 block">
                      Target Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-[#080808] border border-[#D4AF37]/10 rounded-xl px-4 py-3 text-[#f0ece4] focus:outline-none focus:border-[#D4AF37]/30 font-body"
                    >
                      <option value="OnlyFans">OnlyFans</option>
                      <option value="Fansly">Fansly</option>
                      <option value="Twitter / X">Twitter / X</option>
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={analyzeContent}
                    disabled={isAnalyzing}
                    className="mt-4 w-full h-12 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#b8962e] to-[#D4AF37] text-[#0a0a0a] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Silent Scan...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" /> Run Silent Audit
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Compliance Score */}
              <AnimatePresence>
                {complianceResult && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg text-[#f0ece4] flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400" /> Compliance Score
                      </h3>
                      <span className={`font-display font-bold text-2xl ${complianceResult.score > 80 ? 'text-emerald-400' : complianceResult.score > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {complianceResult.score}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#1a1a1a] overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${complianceResult.score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${complianceResult.score > 80 ? 'bg-emerald-500' : complianceResult.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                      />
                    </div>
                    {complianceResult.blocked.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
                          {complianceResult.blocked.length} Blocked Word(s) Detected
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {complianceResult.blocked.map((w) => (
                            <span key={w} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-bold">
                              <X className="w-3 h-3" /> {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {complianceResult.blocked.length === 0 && (
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                        <Check className="w-4 h-4" /> All clear — no blocked words detected for {platform}.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3 space-y-6">
              {/* Clean Text */}
              <AnimatePresence>
                {complianceResult && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg text-[#f0ece4] flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#D4AF37]" /> Platform-Safe Text
                      </h3>
                      <button onClick={handleCopyClean} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#f0ece4] transition-colors">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-[#080808] rounded-xl p-4 border border-[#D4AF37]/5 font-body text-sm leading-relaxed text-[#d4cec2] max-h-64 overflow-y-auto whitespace-pre-wrap">
                      {complianceResult.clean}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SEO Suggestions */}
              <AnimatePresence>
                {seoResult.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                    <h3 className="font-display text-lg text-[#f0ece4] flex items-center gap-2 mb-5">
                      <TrendingUp className="w-5 h-5 text-[#D4AF37]" /> SEO & Discoverability Boosters
                    </h3>
                    <div className="space-y-3">
                      {seoResult.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#080808] border border-[#D4AF37]/5 group hover:border-[#D4AF37]/20 transition-all cursor-pointer">
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-display font-bold text-xs">
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-[#d4cec2] font-body group-hover:text-[#f0ece4] transition-colors">{s}</p>
                          </div>
                          <TrendingUp className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview Image */}
              <AnimatePresence>
                {previewImageUrl && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                    <h3 className="font-display text-lg text-[#f0ece4] flex items-center gap-2 mb-4">
                      <ImageIcon className="w-5 h-5 text-[#D4AF37]" /> AI-Generated Preview Image
                    </h3>
                    <div className="rounded-xl overflow-hidden border border-[#D4AF37]/10 bg-[#080808]">
                      <img src={previewImageUrl} alt="SEO preview" className="w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <p className="text-xs text-[#6a6560] mt-3 font-body">
                      Generated via <span className="text-[#D4AF37]">pollination.ai</span> (api-keyless). 1200×630 — optimized for social card previews and Open Graph.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl p-8 text-center">
                <h3 className="font-display text-2xl text-[#f0ece4] mb-3">Ready to Go Silent?</h3>
                <p className="text-[#9a9488] font-body mb-6 max-w-lg mx-auto">
                  SilentRank is free for all BNE clients in the members portal. Upgrade your tier for unlimited audits, batch processing, and automated compliance monitoring across all platforms.
                </p>
                <Link href="/apply">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#b8962e] to-[#D4AF37] text-[#0a0a0a] font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    Apply for BNE Partnership
                    <Zap className="w-4 h-4" />
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
