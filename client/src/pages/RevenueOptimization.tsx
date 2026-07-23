/**
 * BNE Revenue Optimization Page
 * Multi-stream revenue architecture for elite creators
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { DollarSign, TrendingUp, BarChart3, ArrowRight, Zap, Shield, Crown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function RevenueOptimization() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("What_services_should_a_firm_offer_creators_in_2026");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Revenue Optimization | BNE Agency"
        description="Maximize every revenue stream. Learn how elite creators optimize subscriptions, PPV, tips, and brand deals into a unified income engine."
        canonical="/revenue-optimization"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Revenue Systems</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Revenue <span className="text-[oklch(0.78_0.16_85)]">Optimization</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              From subscription funnels to custom content pricing, we engineer every revenue touchpoint to extract maximum value from your audience — without alienating your fans or burning out.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Optimize Your Revenue Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                The 2026 Creator Firm Checklist
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Understand the transition from old-school agency models to modern, automated creator advisory suites. Here is every service a serious management firm should offer creators in 2026 — and how BNE delivers on every single one.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <DollarSign size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Subscription Architecture</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Tiered subscription models that maximize lifetime value while keeping churn below industry averages.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-white font-semibold">PPV & Tip Optimization</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Strategic pricing, timing, and scripting that converts casual fans into high-value repeat buyers.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Brand Deal Pipelines</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Connect with premium adult-friendly brands for sponsorships that diversify your income beyond platform revenue.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Optimization Is Not Optional</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Most creators leave 60-70% of their potential revenue on the table. BNE's frameworks ensure every click, view, and subscriber converts to maximum value.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Get Your Revenue Audit
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

