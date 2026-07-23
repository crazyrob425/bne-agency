/**
 * B.N.E. Academy Page
 * The unified educational ecosystem for Blacklisted University and Intelligence content.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  Crown, BookOpen, Video, TrendingUp, Layers, Sparkles,
  ArrowRight, BarChart3, FileText, Brain, Target
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

const learningTracks = [
  {
    title: "Beginner Track: The Launchpad",
    description: "From zero to earning. Learn niche selection, brand creation, and your first monetization systems.",
    icon: Sparkles,
    color: "text-violet-400",
    href: "/university"
  },
  {
    title: "Growth Track: The Multiplier",
    description: "Scale your income. Master multi-platform strategy, audience development, and advanced monetization.",
    icon: TrendingUp,
    color: "text-emerald-400",
    href: "/university"
  },
  {
    title: "Operations Track: The CEO",
    description: "Build a real business. Automate workflows, manage finances, and implement systems for long-term success.",
    icon: Brain,
    color: "text-amber-400",
    href: "/university"
  },
];

export default function Academy() {
  const academySchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "B.N.E. Academy (Blacklisted University)",
    "url": "https://www.blacklisted.studio/academy",
    "description": "The premium educational ecosystem for creators, merging Blacklisted University and the Intelligence Hub. Access learning paths, training modules, and industry analysis.",
    "provider": {
      "@type": "Organization",
      "name": "B.N.E. Studio"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="B.N.E. Academy | Blacklisted University & Intelligence Hub"
        description="The premium educational ecosystem for creators. Access learning paths, training modules, and industry analysis to build a dominant creator business."
        canonical="/academy"
        schema={academySchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 mono-stat">B.N.E. Academy</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              The Ivy League for Internet Infamy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Welcome to the new B.N.E. Academy, the unified home of Blacklisted University and our Intelligence Hub. This is where creators become CEOs. Access structured learning paths, deep-dive training modules, and real-time industry analysis.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-100">Structured Learning Paths</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 mt-2">Follow a clear path from beginner to expert.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {learningTracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div key={track.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={track.href}>
                    <div className="glass-card p-6 border border-white/8 h-full group cursor-pointer hover:border-violet-500/30 transition-colors">
                      <div className={`w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${track.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-violet-400" style={{ fontFamily: 'Space Grotesk' }}>{track.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{track.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Hubs */}
      <section className="py-20 bg-[oklch(0.05_0.004_85)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-100 mb-4">Explore the Content Hubs</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 mb-6">Dive into our core content pillars, built from years of industry experience and data.</motion.p>
            <div className="space-y-4">
              {[
                { title: "Blacklisted University", description: "The complete collection of our cornerstone video courses and training modules.", href: "/university", icon: Crown },
                { title: "Intelligence Hub", description: "In-depth articles, industry analysis, and trend reports from the front lines.", href: "/intelligence", icon: Layers },
                { title: "Case Studies & Playbooks", description: "Real-world examples of creator growth, with actionable strategies you can steal.", href: "/intelligence", icon: FileText },
              ].map((hub, i) => (
                <motion.div key={hub.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={hub.href}>
                    <div className="glass-card p-4 border border-white/8 flex items-center gap-4 group cursor-pointer hover:bg-zinc-800/50">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center"><hub.icon className="h-5 w-5 text-zinc-400" /></div>
                      <div>
                        <h4 className="font-semibold text-zinc-200 group-hover:text-violet-400">{hub.title}</h4>
                        <p className="text-xs text-zinc-500">{hub.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 ml-auto group-hover:text-violet-400" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              [Placeholder for AI-generated graphic from pollination.ai: An abstract, sophisticated image representing a 'brain' or 'network' of knowledge. It should use glowing gold and violet lines on a dark background to connect icons for 'video', 'articles', and 'data charts', symbolizing the interconnected knowledge within the Academy.]
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
