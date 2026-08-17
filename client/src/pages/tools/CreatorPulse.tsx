import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, TrendingUp, Eye, Clock, MessageCircle, DollarSign, Users, ArrowRight, Vote, Layers } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CreatorPulse() {
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInsights = trpc.tools.generatePulseInsights.useMutation();

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    setAnalysisReport(null);
    
    try {
      const result = await generateInsights.mutateAsync({
        timeRange: "7d",
        topContent: [
          { title: "Morning tease video", platform: "Twitter/X", views: "24.5K", engagement: "8.2%" },
          { title: "PPV preview carousel", platform: "Instagram", views: "18.2K", engagement: "6.7%" },
          { title: "Live stream promo", platform: "TikTok", views: "31.1K", engagement: "9.1%" },
          { title: "Exclusive gallery drop", platform: "OnlyFans", views: "12.8K", engagement: "11.4%" },
        ],
        totalVisitors: 2568,
        totalTips: 8925,
        totalSubs: 89,
      });
      setAnalysisReport(result.insights);
      toast.success("CreatorPulse AI insights generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate insights");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-slate-950 to-blue-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">CreatorPulse AI Insights</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              AI-Generated<br />
              <span className="text-cyan-400">Creator Intelligence</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Get actionable insights from our AI engine analyzing your content performance, visitor behavior, and revenue patterns.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border border-slate-800 rounded-xl p-8 bg-slate-900/40">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                AI-Powered Insights
              </h3>

              <div className="mb-6">
                <span className="text-sm text-slate-400 mb-2 block">We analyze your data to reveal hidden patterns and opportunities:</span>
                <ul className="space-y-2 text-xs text-slate-300 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Revenue per visitor comparisons and growth opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Peak engagement times and optimal posting schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                    <span>Content performance patterns and viral potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Audience retention and engagement drop-offs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Platform-specific optimization strategies</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Quick Action Items</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span className="text-sm text-slate-300">Schedule premium content based on insights</span>
                    <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors">
                      Setup
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span className="text-sm text-slate-300">Optimize posting times across platforms</span>
                    <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors">
                      Setup
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span className="text-sm text-slate-300">Adjust tip menu pricing strategy</span>
                    <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors">
                      Setup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <span className="text-sm text-slate-400">Current Week Growth</span>
                  <span className="text-emerald-400 font-semibold">+12.4%</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <span className="text-sm text-slate-400">Top Performing Platform</span>
                  <span className="text-cyan-400 font-semibold">TikTok</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <span className="text-sm text-slate-400">Revenue per Visitor</span>
                  <span className="text-violet-400 font-semibold">$3.47</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <span className="text-sm text-slate-400">Engagement Rate</span>
                  <span className="text-amber-400 font-semibold">8.2%</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateInsights}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              {isGenerating ? "Generating Insights..." : "Generate AI Insights"}
            </motion.button>

            {analysisReport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-cyan-500/30 rounded-xl p-6 bg-cyan-500/5"
              >
                <h4 className="text-lg font-semibold text-cyan-300 mb-4">Current AI Analysis</h4>
                <div className="text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                  {analysisReport}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
