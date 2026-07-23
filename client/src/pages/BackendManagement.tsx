/**
 * BNE Backend Management Page
 * Business operations, identity, and backend automation
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Settings, Shield, Zap, ArrowRight, Users, Lock, Headphones } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function BackendManagement() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Creator_Playbook_Niche_SilentParter_Business_Managment") || getVideoByKeyword("playbook");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Backend Management | BNE Agency"
        description="BNE's silent partner model handles business operations, identity architecture, and backend automation so you can focus exclusively on content creation."
        canonical="/backend-management"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Operations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Backend <span className="text-[oklch(0.78_0.16_85)]">Management</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              You create. We handle everything else. BNE operates as your silent business partner — managing scheduling, compliance, fan communications, content distribution, and revenue tracking so you can stay in your zone of genius.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Let BNE Handle Your Backend
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
                Creator Playbook: Silent Partner Business Management
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                This is your behind-the-scenes playbook for running a creator business that runs itself. Learn exactly what we automate, what we delegate, and how we maintain complete anonymity while maximizing your earnings.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
              {!video && (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Video asset not found. Please add Creator_Playbook_Niche_SilentParter_Business_Managment.mp4 to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Settings size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Automated Scheduling</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Content calendars, post queues, and platform sync managed entirely by our ops team. You never touch a scheduler again.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Users size={20} />
                  </div>
                  <h3 className="text-white font-semibold">24/7 Fan Management</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Native-English chatters trained in high-ticket fan psychology handle DMs, PPV sends, and upsells around the clock.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Headphones size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Scaling Through Agency Infrastructure</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Our scaling audio course outlines exactly how to transition from solo creator to fully managed empire using agency infrastructure.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Trading Time for Money</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Your backend should run on autopilot while you create. Apply for our silent partnership model today.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply for Silent Partnership
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

