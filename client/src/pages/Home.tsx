/**
 * BNE Home Page — Noir Hacker Syndicate Design
 * Sections: Hero, Authority Stats, Power-Law Reality, Anonymity Fortress, CTA
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ChevronRight, TrendingUp, Shield, Zap, Users, DollarSign,
  Lock, Eye, BarChart3, Award, ArrowRight, Play, Layers, BookOpen, Clock
} from "lucide-react";
import { getFeaturedArticles } from "@/data/blogArticles";
import { useAuth } from "@/_core/hooks/useAuth";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663566927712/HKm5FSxgbpSfaSeha3s8A3/bne-hero-bg-JR4zqEbDVtnLCfSuzien4a.webp";

// Animated counter hook
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, sublabel, color }: {
  value: number; suffix: string; label: string; sublabel: string; color: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, 2000, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card p-6 text-center group hover:border-violet-500/30 transition-all duration-300"
    >
      <div className={`mono-stat text-4xl font-bold mb-1 ${color}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-zinc-200 font-semibold text-sm mb-1" style={{ fontFamily: 'Space Grotesk' }}>{label}</div>
      <div className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{sublabel}</div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }
  })
};

export default function Home() {
  // Auth state available if needed
  useAuth();

  const powerLawRef = useRef(null);
  const powerLawInView = useInView(powerLawRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden scanlines">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.01_265/70%)] via-[oklch(0.08_0.01_265/50%)] to-[oklch(0.08_0.01_265/95%)]" />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-violet-300 text-xs font-medium mono-stat">BLACKLISTED NICHE ENTERTAINMENT — WHERE BAD B*TCHES GET PAID</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <span className="text-zinc-100">Sis, You're Out Here</span>
              <br />
              <span className="gradient-text">Leaving Bags</span>
              <br />
              <span className="text-zinc-100">On The Table.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-zinc-300 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8"
              style={{ fontFamily: 'DM Sans' }}
            >
              We're BNE — the agency that actually shows up for creators like you. No judgment, no gatekeeping. We handle everything from your anonymous launch to getting your bag right, while you stay safe, private, and unbothered. Your real life stays yours. Your money? That's ours to grow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-neon text-base font-semibold w-full sm:w-auto"
                >
                  <Zap size={18} />
                  Find Your Niche — It's Free, Boo
                  <ChevronRight size={16} />
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all w-full sm:w-auto"
                >
                  <ArrowRight size={18} />
                  Apply — Let's Get You Paid
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, label: "Nobody Finds Out. Period." },
                { icon: Lock, label: "Legally Protected, Always" },
                { icon: TrendingUp, label: "Avg. 340% Revenue Glow-Up" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-zinc-400 text-sm" style={{ fontFamily: 'DM Sans' }}>
                  <Icon size={14} className="text-emerald-400" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-zinc-600 text-xs mono-stat">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── AUTHORITY STATS ── */}
      <section className="py-16 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Real Talk</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2" style={{ fontFamily: 'Space Grotesk' }}>
              The Receipts Don't Lie, Babe
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={1000} suffix="+" label="Niches in the Index" sublabel="We know your lane before you do" color="text-violet-400" />
            <StatCard value={340} suffix="%" label="Avg Bag Increase" sublabel="Within 90 days of joining us" color="text-emerald-400" />
            <StatCard value={2257} suffix="" label="§ 2257 Covered" sublabel="Legally protected, no stress" color="text-violet-400" />
            <StatCard value={24} suffix="/7" label="DM Team On Deck" sublabel="Selling for you while you sleep" color="text-emerald-400" />
          </div>
        </div>
      </section>

      {/* ── POWER-LAW REALITY ── */}
      <section ref={powerLawRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-emerald-900/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden"
                animate={powerLawInView ? "visible" : "hidden"}
              >
                <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Real Talk, No Cap</span>
                <h2 className="text-4xl font-bold text-zinc-100 mt-2 mb-4 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                  Why "Posting Everything" Is Keeping You Broke
                </h2>
              </motion.div>
              <motion.div custom={1} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}>
                <div className="glass-card p-4 mb-6 border-violet-500/20">
                  <p className="text-zinc-400 text-xs mono-stat mb-1">THE MATH BEHIND THE MONEY</p>
                  <div className="text-violet-300 font-mono text-sm">P(x) = C · x<sup>1-α</sup></div>
                  <p className="text-zinc-500 text-xs mt-1" style={{ fontFamily: 'DM Sans' }}>Translation: niche creators eat. Generalists get crumbs.</p>
                </div>
              </motion.div>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}
                className="text-zinc-300 leading-relaxed mb-4" style={{ fontFamily: 'DM Sans' }}>
                Okay, real talk? The creator economy is not fair. The girls who are out here posting everything for everybody are burning out and making pennies. Fans don't subscribe to "just a girl" — they subscribe to a whole vibe, a fantasy, something specific that hits different for them.
              </motion.p>
              <motion.p custom={3} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}
                className="text-zinc-300 leading-relaxed mb-6" style={{ fontFamily: 'DM Sans' }}>
                The girls stacking real money? They picked a lane and owned it. Whether that's findom, ASMR, cosplay, BDSM, BBW, Latina, alt-girl, whatever — they went deep, not wide. That's what we do for you. We find your lane, build your brand, and get you to the bag.
              </motion.p>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}>
                <Link href="/niche-matcher">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl btn-neon text-sm font-semibold"
                  >
                    <Zap size={16} />
                    Find Your Lane, Sis
                    <ChevronRight size={14} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Power-Law Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={powerLawInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card p-6"
            >
              <h3 className="text-zinc-200 font-bold mb-6 text-center" style={{ fontFamily: 'Space Grotesk' }}>
                Where the Money Actually Goes on These Platforms
              </h3>
              {[
                { tier: "Top 1% of Creators", pct: 33, color: "bg-violet-500", glow: "shadow-[0_0_20px_oklch(0.627_0.265_303.9/50%)]", label: "33% of all revenue" },
                { tier: "Top 10% of Creators", pct: 73, color: "bg-violet-400/70", glow: "", label: "73% of all revenue" },
                { tier: "Bottom 50% of Creators", pct: 1.5, color: "bg-zinc-700", glow: "", label: "1.5% of all revenue" },
              ].map(({ tier, pct, color, glow, label }, i) => (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, x: -20 }}
                  animate={powerLawInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="mb-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-300 text-sm" style={{ fontFamily: 'DM Sans' }}>{tier}</span>
                    <span className="text-zinc-400 text-sm mono-stat">{label}</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={powerLawInView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      className={`h-full rounded-full ${color} ${glow}`}
                    />
                  </div>
                </motion.div>
              ))}
              <div className="mt-6 p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <p className="text-violet-300 text-sm text-center" style={{ fontFamily: 'DM Sans' }}>
                  <strong>The bottom half of creators split 1.5% of the money.</strong> We only work with girls we can get to the top — period.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ANONYMITY FORTRESS ── */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Your Safety Is Non-Negotiable</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Nobody Finds Out. That's the Whole Point.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Your real name, your city, your job, your family — none of that ever touches your creator life. And here's the bonus? Keeping that mystery actually makes fans spend more. They're obsessed with what they can't fully figure out. Your privacy is literally a money move.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Your Real Identity Stays Yours",
                desc: "We build you a whole separate persona — a brand that's marketable, magnetic, and has zero connection to your real name, city, job, or personal life. Your business, your rules.",
                color: "text-violet-400",
                border: "border-violet-500/20",
              },
              {
                icon: Eye,
                title: "Geo-Block Your Whole Circle",
                desc: "We set up platform geo-blocking so nobody from your hometown, your job, or your family's zip code can find your accounts. Your coworkers, your cousins, your ex — blocked by default.",
                color: "text-emerald-400",
                border: "border-emerald-500/20",
              },
              {
                icon: Shield,
                title: "Mystery = Money, Babe",
                desc: "The less fans can fully figure you out, the more they spend trying. We engineer that curiosity gap into your brand on purpose. Your anonymity isn't just protection — it's a marketing strategy.",
                color: "text-violet-400",
                border: "border-violet-500/20",
              },
              {
                icon: BarChart3,
                title: "Your Look, Mapped to What Sells",
                desc: "We match your vibe, your features, and what you're comfortable with to the niches that are actually searching for you. Then we build SEO-optimized pages that bring those fans straight to your door.",
                color: "text-emerald-400",
                border: "border-emerald-500/20",
              },
              {
                icon: Users,
                title: "Get Paid Without the Paper Trail",
                desc: "Your real bank info never touches your creator accounts. We set up payment pipelines that keep your financial life completely separate from your content business. Clean, private, secure.",
                color: "text-violet-400",
                border: "border-violet-500/20",
              },
              {
                icon: DollarSign,
                title: "Content Leaked? We Go to War.",
                desc: "We're watching the internet 24/7. The second your premium content shows up somewhere it shouldn't, we file DMCA takedowns immediately. Your content, your money — protected aggressively.",
                color: "text-emerald-400",
                border: "border-emerald-500/20",
              },
            ].map(({ icon: Icon, title, desc, color, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass-card p-6 border ${border} hover:bg-white/6 transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-zinc-100 font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLAINER VIDEO PLACEHOLDER ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Watch Us Turn "Just Starting" Into "Bag Secured"
            </h2>
            <p className="text-zinc-400 mb-8" style={{ fontFamily: 'DM Sans' }}>
              From zero to a full brand in 30 days. Watch how we do it.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden glass-card border-violet-500/20 border aspect-video flex items-center justify-center cursor-pointer group"
              style={{ background: "oklch(0.10 0.012 265)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-emerald-900/10" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-violet-500/20 border-2 border-violet-500/50 flex items-center justify-center glow-violet"
                >
                  <Play size={32} className="text-violet-400 ml-1" />
                </motion.div>
                <div>
                  <p className="text-zinc-200 font-semibold" style={{ fontFamily: 'Space Grotesk' }}>BNE Agency — How We Get You Paid</p>
                  <p className="text-zinc-500 text-sm mono-stat">VIDEO DROPPING SOON — 4:32</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-emerald-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Award size={40} className="text-violet-400 mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              You Ready to Stop Playing Small?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              We only take a limited number of new girls each month — because we actually work with you, not just for you. If you're serious about your bag, your spot is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold"
                >
                  <Zap size={18} />
                  Find My Niche — Free
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all"
                >
                  <Layers size={18} />
                  See What We Offer
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BLOG PREVIEW SECTION ── */}
      <section className="py-20 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-violet-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mono-stat">The Tea, Served Hot</span>
              </div>
              <h2 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: 'Space Grotesk' }}>
                Guides, Tips & Receipts for Real Creators
              </h2>
              <p className="text-zinc-500 mt-1 text-sm" style={{ fontFamily: 'DM Sans' }}>
                No fluff, no gatekeeping. Real talk on compliance, niches, money moves, and platform strategy.
              </p>
            </div>
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-semibold transition-all shrink-0"
              >
                Read All the Tea <ChevronRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getFeaturedArticles().slice(0, 3).map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="group glass-card hover:border-violet-500/30 transition-all duration-200 overflow-hidden cursor-pointer h-full flex flex-col">
                    <div className={`h-1 bg-gradient-to-r ${article.coverGradient}`} />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 mono-stat mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-100 leading-snug mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
                        {article.title}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1 mb-3" style={{ fontFamily: 'DM Sans' }}>
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/8">
                        <span className="flex items-center gap-1 text-xs text-zinc-600">
                          <Clock size={11} /> {article.readTime} min
                        </span>
                        <span className="text-xs text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ChevronRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


