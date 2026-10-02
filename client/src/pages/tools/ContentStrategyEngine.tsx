import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Sparkles, ChevronRight, Zap, Copy, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContentStrategyEngine() {
  const [niche, setNiche] = useState("GFE/Companionship");
  const [tone, setTone] = useState("Sensual & Intimate");
  const [goal, setGoal] = useState("Subscriber Retention");
  const [length, setLength] = useState("Short (50-100 words)");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateStrategy = trpc.tools.generateStrategy.useMutation();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedContent(null);
    setCopied(false);

    try {
      const result = await generateStrategy.mutateAsync({
        niche,
        tone,
        goal,
        length,
      });
      setGeneratedContent(result.content);
      toast.success("Script ideas generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the BNE AI Engine. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Content Strategy Engine</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Never Run Out of<br />
              <span className="text-emerald-400">High-Converting Ideas</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Generate script ideas and content prompts using behavioral psychology frameworks. What works on your mind will work on theirs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 space-y-10 max-w-5xl">
        {/* Profile Inputs */}
        <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
          <h2 className="text-xl font-semibold text-white mb-6">Your Content Profile</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Your Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-body text-sm"
              >
                <option>GFE/Companionship</option>
                <option>FemDom/Findom</option>
                <option>ASMR/Audio</option>
                <option>BDSM/Kink</option>
                <option>Cosplay/Fantasy</option>
                <option>Fit/Athletic</option>
                <option>BBW/Curvy</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Content Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-body text-sm"
              >
                <option>Sensual & Intimate</option>
                <option>Playful & Teasing</option>
                <option>Hard Edge/Dominant</option>
                <option>Mysterious/Anonymous</option>
                <option>Educational/Guide Style</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-body text-sm"
              >
                <option>Subscriber Retention</option>
                <option>PPV Sales</option>
                <option>Tip Maximization</option>
                <option>New Subscriber Growth</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Content Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-body text-sm"
              >
                <option>Short (50-100 words)</option>
                <option>Medium (200-400 words)</option>
                <option>Long (500+ words)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <Zap size={16} className="fill-current" />
              {isLoading ? "Analyzing and Structuring..." : "Generate Script Ideas"}
            </motion.button>
          </div>
        </div>

        {/* Results Block */}
        <AnimatePresence mode="wait">
          {(isLoading || generatedContent) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 font-body">BNE AI is mapping hooks and behavioral prompts...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-emerald-400 font-display flex items-center gap-2">
                      <Sparkles size={18} />
                      Your Custom Content Guide
                    </h2>
                    <button
                      onClick={handleCopy}
                      className="p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy Scripts"}
                    </button>
                  </div>
                  
                  <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800/80 max-h-[500px] overflow-y-auto font-sans text-slate-300 whitespace-pre-wrap text-sm leading-relaxed space-y-4">
                    {generatedContent}
                  </div>
                  
                  <div className="mt-4 text-[11px] text-slate-500 font-body text-center">
                    Pro Tip: Record these scripts using premium audio or video, and bundle them into your PPV vault.
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
