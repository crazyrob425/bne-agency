/**
 * BNE Monetization Systems Page
 * Strategic revenue frameworks for elite creators
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { DollarSign, TrendingUp, BarChart3, ArrowRight, Zap, Shield, Users, Crown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
};

export default function MonetizationSystems() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Content_Creator_Partnership_Percentages_Payments_rates");
  const guide = getInfographicByKeyword("Niche_Mastery_Guide");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Monetization Systems | BNE Agency"
        description="Learn how elite creators monetize their content across multiple revenue streams. Get the systems and strategies that work."
        canonical="/monetization-systems"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Revenue Systems</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Your <span className="text-[oklch(0.78_0.16_85)]">Monetization</span> Engine
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Stop leaving money on the table. Learn the exact systems that elite creators use to turn their content into a multi-stream revenue empire.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Build Your System Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Partnership & Payment Systems
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Understand the real economics of creator partnerships. From percentage-based deals to flat-rate retainers, we break down the numbers that matter.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.path} title={video.name} />
                </div>
              )}
              {!video && (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Video asset not found. Please add Content_Creator_Partnership_Percentages_Payments_rates.mp4 to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <DollarSign size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Revenue Streams</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Subscription, PPV, tips, custom content, brand deals, and affiliate income all feed your empire.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Scaling Revenue</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Proven systems to double your income without doubling your workload. Work smarter.</p>
              </div>
              {guide && (
                <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Niche Mastery Guide</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Build Your Monetization Engine?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Join the creators who are already using BNE's systems to scale their income.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply to BNE
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
