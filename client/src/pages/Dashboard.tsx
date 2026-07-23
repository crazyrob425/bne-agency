/**
 * BNE Dashboard Page
 * Creator command center and brand overview
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Home, BarChart3, Users, ArrowRight, Crown, Zap, Shield, FileText, MessageCircle, Users2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function Dashboard() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("B.N.E") || getVideoByKeyword("brand");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Dashboard | BNE Creator OS"
        description="Your creator command center. Monitor revenue, track growth, manage operations, and access your BNE toolkit from one powerful dashboard."
        canonical="/dashboard"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Creator Suite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Dashboard</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              One command center to rule your empire. Monitor daily revenue, track fan engagement, manage your team, and deploy BNE tools — all from a single unified dashboard.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Access Your Dashboard
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
                Your Empire at a Glance
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Real-time analytics, revenue tracking, and operational alerts all in one place. No more spreadsheets, no more guessing games.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
              {!video && (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Video asset not found. Please add B.N.E.mp4 to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Revenue Intelligence</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Real-time revenue tracking across all platforms with visualized growth trends and goal projections.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Users size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Team Command</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Manage your chatters, editors, and advisors from one interface. Assign tasks, review performance, and approve content.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.04_0.005_85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Members-Only Dashboard Features</h2>
            <p className="text-[oklch(0.7_0.012_85)] max-w-2xl mx-auto">Once you're in, you get access to a full operations suite built for high-performance creators who value privacy, security, and leverage.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                  <Shield size={20} />
                </div>
                <h3 className="text-white font-semibold">Secure Photo & Video Sharing</h3>
              </div>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Share content with your team through encrypted, access-controlled channels. Set expiration dates, watermark previews, and track who viewed what — without exposing your raw files to untrusted platforms.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                  <FileText size={20} />
                </div>
                <h3 className="text-white font-semibold">Secure Document Archive</h3>
              </div>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Store 2257 compliance records, ID verifications, model releases, and contracts in a private encrypted vault. Everything is audit-ready and accessible only to you and your BNE liaison.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                  <MessageCircle size={20} />
                </div>
                <h3 className="text-white font-semibold">24/7 Tech Support Chat</h3>
              </div>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Something breaks at 2AM? Our ops team is online. Get instant help with platform outages, content scheduling failures, payment issues, or emergency takedowns — directly from your dashboard.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                  <Users2 size={20} />
                </div>
                <h3 className="text-white font-semibold">Trusted Classifieds & Duo Partnerships</h3>
              </div>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Connect with other verified BNE clients for collaboration. Whether you need a content creation partner or an escort duo date, our private classifieds board lets you vet, negotiate, and schedule — all within the BNE ecosystem.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Inside the Dashboard</h2>
            <p className="text-[oklch(0.7_0.012_85)]">A preview of the command center our creators use every day.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-2xl">
            <img src="/media-files/bnestudio_dashboard_peek.png" alt="BNE Dashboard Preview" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Command Your Empire From One Screen</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Apply to BNE and get access to the most powerful creator operations dashboard in the industry.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply for Dashboard Access
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
