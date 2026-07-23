/**
 * BNE Market Analysis Page
 * Data-driven niche and industry analysis
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Layers, TrendingUp, BarChart3, ArrowRight, Zap, Crown, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function MarketAnalysis() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const guide = getInfographicByKeyword("Niche_Mastery_Guide");
  const strategyGuide = getInfographicByKeyword("Niche_Quiz_Niche_Content_Creator_Strategy_Guide");

  const [modalOpen, setModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Market Analysis | BNE Agency"
        description="Deep market and niche analysis for adult content creators. Identify high-earning segments, competition gaps, and growth opportunities."
        canonical="/market-analysis"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Niche Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Market <span className="text-[oklch(0.78_0.16_85)]">Analysis</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Don't guess. We analyze 1,052+ real market segments for earning potential, competition density, and growth trajectory. Find the niche where you can win big.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Run Market Analysis
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Niche Mastery Guide</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Our proprietary Niche Matcher quiz analyzes your unique traits against 1,052 market segments. We look beyond surface-level metrics to find niches with high spending intent and minimal saturation.
              </p>
              {guide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Niche Mastery Guide</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full breakdown</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Niche_Mastery_Guide.pdf"} title="Niche Mastery Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
              {strategyGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setStrategyModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Niche Content Creator Strategy Guide</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full strategy guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={strategyGuide?.url || "/media-files/Niche_Quiz_Niche_Content_Creator_Strategy_Guide.png"} title="Niche Content Creator Strategy Guide" isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)} />
            </motion.div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Competition Analysis</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">See exactly how saturated your target niche is and determine if the ROI justifies entry before you invest time or resources.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Earning Potential Matrix</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Data-driven projections for subscription rates, PPV averages, and tip volumes across different niche categories.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Find Your Goldmine Before Anyone Else Does</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">The creators who dominate aren't the luckiest — they're the most informed. Let BNE hand you the data you need.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply for Niche Strategy
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

