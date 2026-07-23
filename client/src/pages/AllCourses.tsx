/**
 * BNE All Courses Page
 * Blacklisted University complete course catalog landing
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Crown, BookOpen, ArrowRight, Zap, Shield, TrendingUp, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AllCourses() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Blacklisted_Niche_Entertainment_University_Course_Study_podcast");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="All Courses | Blacklisted University"
        description="Access the full Blacklisted University course catalog. Deep-dive masterclasses on niche psychology, privacy law, compliance, and scaling."
        canonical="/all-courses"
      />
      <Navigation />

      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              All <span className="gradient-text-gold">Courses</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              The complete curriculum. Master audience psychology, sovereign legal privacy, agency scaling, and in-person mastery — engineered to maximize your income while minimizing your labor.
            </p>
            <Link href="/university">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                <BookOpen size={16} /> Enter Full University <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold font-mono-lux tracking-widest uppercase">
              Core Curriculum
            </span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-4 font-display">
              Course Lectures & Masterclasses
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold text-zinc-100 font-display mb-4">Featured Lecture</h3>
              {video ? (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Course podcast now loading. Add Blacklisted_Niche_Entertainment_University_Course_Study_podcast.m4a to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "Sovereign Privacy & Legal Fortification", desc: "§ 2257, LLC protection, and anonymous business architecture." },
                { icon: Zap, title: "Niche Domination & Audience Psychology", desc: "1,052 niches analyzed. Find your goldmine." },
                { icon: TrendingUp, title: "Automated Operations & Scaling Empires", desc: "From solo creator to managed empire." },
                { icon: Users, title: "In-Person Revenue Expansion", desc: "Safe booking, client screening, and VOIC masking." },
              ].map((c, i) => (
                <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="luxury-card p-5 border border-[oklch(0.78_0.16_85/10%)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] flex-shrink-0">
                      <c.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm font-display">{c.title}</h4>
                      <p className="text-[oklch(0.65_0.012_85)] text-xs mt-1 font-body">{c.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Start Learning?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Join Blacklisted University and access every course, lecture, and print resource in our vault.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Enroll Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

