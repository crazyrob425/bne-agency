/**
 * BNE Advertising Systems Page
 * Strategic advertising and promotional campaigns for creators
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { MessageSquare, TrendingUp, Target, ArrowRight, Zap, Crown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AdvertisingSystems() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("BNE_Studio_Home_Page_landing_advertisment") || getVideoByKeyword("advertising");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Advertising Systems | BNE Agency"
        description="Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue."
        canonical="/advertising-systems"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Growth</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Advertising <span className="text-[oklch(0.78_0.16_85)]">Systems</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Paid traffic doesn't have to be a black hole. We build compliant, high-converting ad campaigns and creative assets that put your brand in front of audiences ready to spend.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Launch Your Campaign
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
                BNE Studio Home Page Landing Advertisement
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                A look inside our studio's ad production pipeline. Every campaign is built with platform safety, audience psychology, and conversion rate optimization in mind.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
              {!video && (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Video asset not found. Please add BNE_Studio_Home_Page_landing_advertisment.mp4 to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Target size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Audience Targeting</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">We build custom audience segments based on intent, spending history, and niche affinity to maximize ROAS.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Creative Strategy</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Our creative team produces thumb-stopping ad creative, landing pages, and funnel sequences designed for the adult industry.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Burning Ad Budget. Start Scaling.</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">BNE's advertising systems turn paid traffic into predictable, compounding revenue streams. Apply for a free campaign audit.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Get a Free Ad Audit
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

