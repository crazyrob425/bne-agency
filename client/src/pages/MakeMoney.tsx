/**
 * BNE Make Money Page
 * Income strategy playbook and revenue frameworks
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { DollarSign, TrendingUp, Zap, Crown, ArrowRight, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const strategies = [
  {
    icon: DollarSign,
    title: "Subscription Empire",
    desc: "Build tiered subscription stacks that turn casual fans into recurring revenue. From $9.99 entry tiers to $999/mo VIP experiences — we engineer the ladder that moves fans up automatically.",
    metrics: "Top creators: $80K–$250K/mo",
  },
  {
    icon: TrendingUp,
    title: "PPV & Tip Optimization",
    desc: "Dynamic pricing, unlock schedules, and fan-segment targeting that maximizes lifetime value. Our data models determine the exact price point and timing that converts best for your audience.",
    metrics: "Average lift: 35–60%",
  },
  {
    icon: Zap,
    title: "Mass DMS & Upsells",
    desc: "Automated yet personalized blast campaigns that re-engage lapsed subscribers and upsell existing ones. Scripts, timing, and segmentation calibrated to your niche psychology.",
    metrics: "Reactivate rate: 12–22%",
  },
  {
    icon: Crown,
    title: "Content Licensing & Clip Sales",
    desc: "Package your content for tube sites, custom requests, and licensing deals. We handle the contracts, distribution, and compliance so you collect passive income from content you already own.",
    metrics: "Passive income: 15–30% of total",
  },
  {
    icon: Shield,
    title: "In-Person & Duo Revenue",
    desc: "Structured pricing and booking systems for in-person sessions, tours, and duo partnerships. Verified classifieds, secure scheduling, and premium rate enforcement through the BNE ecosystem.",
    metrics: "Event ROI: 3–8x standard rates",
  },
  {
    icon: ArrowRight,
    title: "Affiliate & Referral Stacking",
    desc: "Cross-promotion networks, creator collabs, and affiliate programs that compound your reach. We build the referral infrastructure so other creators drive traffic to you for a cut.",
    metrics: "Referral revenue: 5–15% of total",
  },
];

export default function MakeMoney() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Make Money | BNE Creator OS"
        description="BNE's complete income-strategy playbook. Subscription stacks, PPV optimization, mass DMs, content licensing, and in-person revenue frameworks for adult creators."
        canonical="/makemoney"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Revenue Playbook</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Make <span className="text-[oklch(0.78_0.16_85)]">Money</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              BNE's complete income-strategy playbook. Subscription stacks, PPV optimization, mass DMs, content licensing, and in-person revenue frameworks — all calibrated for the adult creator economy.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Deploy These Strategies <ArrowRight size={14} className="inline ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Six Revenue Engines</h2>
            <p className="text-[oklch(0.7_0.012_85)] max-w-2xl mx-auto">Every BNE creator runs all six. We build the systems, set the pricing, and optimize the funnels — you just show up and create.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategies.map((strategy, i) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] hover:border-[oklch(0.78_0.16_85/25%)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                  <strategy.icon size={20} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{strategy.title}</h3>
                <p className="text-[oklch(0.65_0.012_85)] text-sm leading-relaxed mb-4">{strategy.desc}</p>
                <span className="text-emerald-400 text-xs font-medium mono-stat">{strategy.metrics}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.04_0.005_85)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Deploy All Six?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto">Apply to BNE and we'll build your custom revenue stack based on your niche, audience, and goals. No cookie-cutter approaches.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply Now <ArrowRight size={14} className="inline ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
