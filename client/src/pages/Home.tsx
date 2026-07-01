/**
 * BNE Home Page — Black & Gold Luxury, Warm & Accessible Tone
 * Sections: Hero, Trust Metrics, Power-Law Reality, Privacy Fortress, How It Works, CTA, Resources
 */
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  ChevronRight, TrendingUp, Shield, Zap, Users, DollarSign,
  Lock, Eye, BarChart3, Award, ArrowRight, Layers, BookOpen, Clock, Crown, Play
} from "lucide-react";
import { getFeaturedArticles } from "@/data/blogArticles";
import { useAuth } from "@/_core/hooks/useAuth";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";

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
      transition={{ duration: 0.6, ease: cubicEase }}
      className="luxury-card p-6 text-center group hover:border-[oklch(0.78_0.16_85/30%)] transition-all duration-300"
    >
      <div className={`font-mono-lux text-4xl font-bold mb-2 ${color}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[oklch(0.88_0.01_85)] font-semibold text-sm mb-1 font-display">{label}</div>
      <div className="text-[oklch(0.58_0.015_85)] text-xs font-body">{sublabel}</div>
    </motion.div>
  );
}

const cubicEase = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: cubicEase }
  })
};

export default function Home() {
  useAuth();

  const { getVideoByKeyword } = useMediaCatalog();
  const bneVideo = getVideoByKeyword("B.N.E");

  const powerLawRef = useRef(null);
  const powerLawInView = useInView(powerLawRef, { once: true, margin: "-100px" });

  // Parallax mouse tracking for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Blacklisted Niche Entertainment",
    "alternateName": "BNE Agency",
    "url": "https://blacklisted.studio",
    "logo": "https://blacklisted.studio/BNE%20logo2.png",
    "description": "Silent operations partner for digital creators (OnlyFans, webcam modeling setups, multi-platform streaming) and high-end physical companions, companions, fetish performers, and erotic dancers. We handle booking, screening, safety vetting, and marketing."
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="B.N.E. Agency | Silent Partners to Elite Creator Empires"
        description="Silent operations partner for digital creators (OnlyFans, webcam modeling setups, multi-platform streaming) and high-end physical companions, companions, fetish performers, and erotic dancers. We handle booking, screening, safety vetting, and marketing."
        canonical="/home"
        schema={orgSchema}
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Cinematic multi-layer background */}
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        {/* Radial gold glow — top center */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none"
        />
        {/* Secondary soft glow — bottom right */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full bg-[oklch(0.72_0.12_85/4%)] blur-[120px] pointer-events-none"
        />
        {/* Gold dust particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="particle-halo"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                top: `${5 + (i * 7) % 90}%`,
                left: `${5 + (i * 11) % 90}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${10 + i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Luxury badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-8"
            >
              <Crown size={13} className="text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.14_85)] text-xs font-semibold tracking-[0.15em] uppercase font-body">
                Blacklisted Niche Entertainment
              </span>
            </motion.div>

            {/* Hero headline — high-energy, direct */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: cubicEase }}
              className="heading-xl text-[oklch(0.94_0.01_85)] mb-6 max-w-3xl font-display"
            >
              Go Make Your Money.<br />
              We'll Handle The <span className="gradient-text-gold">Grind & The Danger.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-[oklch(0.65_0.012_85)] text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 font-body"
            >
              You're the talent. We're your silent partner. Whether you are building an online OnlyFans empire, dominating webcam sites like Chaturbate, or running a luxury in-person companion brand — BNE covers your entire backend. We handle the setups, the screening, the booking, the ad posting, and the safety, leaving you 100% free to stack cash.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-14 font-body"
            >
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full btn-gold text-base font-semibold w-full sm:w-auto magnetic-hover"
                >
                  <Zap size={18} />
                  Find Your Niche & Double Your Earning
                  <ChevronRight size={16} />
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full btn-gold-outline text-base font-semibold w-full sm:w-auto"
                >
                  <ArrowRight size={18} />
                  Outsource Your Backend
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { icon: Shield, label: "Your Privacy Comes First" },
                { icon: Lock, label: "Legally Protected, Always" },
                { icon: TrendingUp, label: "Real Revenue Growth" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-[oklch(0.65_0.012_85)] text-sm font-body">
                  <div className="w-8 h-8 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/15%)] flex items-center justify-center">
                    <Icon size={14} className="text-[oklch(0.78_0.16_85)]" />
                  </div>
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[oklch(0.58_0.015_85/60%)] text-[10px] font-mono-lux tracking-[0.2em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[oklch(0.78_0.16_85/50%)] to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── AUTHORITY METRICS ── */}
      <section className="py-20 bg-[oklch(0.05_0.004_85)] relative">
        {/* Subtle watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[15rem] font-bold text-[oklch(0.78_0.12_85/2%)] font-display leading-none">
            BNE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
              Proven Track Record
            </span>
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3">
              Numbers Don't Lie
            </h2>
            <div className="gold-divider max-w-xs mx-auto mt-5" />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard value={1000} suffix="+" label="Niches Analyzed" sublabel="We know your audience" color="text-[oklch(0.78_0.16_85)]" />
            <StatCard value={340} suffix="%" label="Average Revenue Growth" sublabel="Within 90 days of working together" color="text-[oklch(0.78_0.16_85)]" />
            <StatCard value={2257} suffix="" label="§ 2257 Compliant" sublabel="Full legal protection" color="text-[oklch(0.72_0.12_85)]" />
            <StatCard value={24} suffix="/7" label="Support Active" sublabel="Monetization never sleeps" color="text-[oklch(0.72_0.12_85)]" />
          </div>
        </div>
      </section>

      {/* ── POWER-LAW REALITY ── */}
      <section ref={powerLawRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.06_0.005_85)] via-transparent to-[oklch(0.78_0.12_85/3%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden"
                animate={powerLawInView ? "visible" : "hidden"}
              >
                <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
                  Let's Be Real for a Second
                </span>
                <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-5 leading-tight">
                  Generic Content Doesn't Pay The Bills
                </h2>
              </motion.div>
              <motion.div custom={1} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}>
                <div className="luxury-card-sm p-5 mb-7 border-[oklch(0.78_0.16_85/15%)]">
                  <p className="text-[oklch(0.78_0.14_85)] text-xs font-mono-lux mb-1.5 tracking-wider">THE MATH BEHIND THE MONEY</p>
                  <div className="text-[oklch(0.85_0.12_85)] font-mono-lux text-sm tracking-wide">Revenue ∝ Specificity<sup>α</sup></div>
                  <p className="text-[oklch(0.58_0.015_85)] text-xs mt-1.5 font-body">The more specific your niche, the higher your earning potential.</p>
                </div>
              </motion.div>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}
                className="text-[oklch(0.65_0.012_85)] leading-relaxed mb-5 font-body text-[15px]">
                Here's the thing: posting everything for everybody might get you likes, but it won't get you paid.
                Fans subscribe to something specific — a vibe, a fantasy, a niche that feels made just for them.
              </motion.p>
              <motion.p custom={3} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}
                className="text-[oklch(0.65_0.012_85)] leading-relaxed mb-8 font-body text-[15px]">
                The creators making real money? They picked a lane and owned it. Whether that's findom, ASMR, cosplay, BDSM, BBW, Latina, alt-style, or something entirely unique — they went deep instead of wide.
                That's exactly what we help you do.
              </motion.p>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate={powerLawInView ? "visible" : "hidden"}>
                <Link href="/niche-matcher">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold"
                  >
                    <Zap size={16} />
                    Find Your Niche
                    <ChevronRight size={14} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Power-Law Visual — Luxury Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={powerLawInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: cubicEase }}
              className="luxury-card-elevated p-8"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <BarChart3 size={18} className="text-[oklch(0.78_0.16_85)]" />
                <h3 className="text-[oklch(0.94_0.01_85)] font-bold font-display text-xl">
                  Where The Money Actually Goes
                </h3>
              </div>
              {[
                { tier: "Top 1% of Creators", pct: 33, color: "bg-[oklch(0.78_0.16_85)]", glow: "shadow-[0_0_20px_oklch(0.78_0.16_85/40%)]", label: "33% of all platform revenue" },
                { tier: "Top 10% of Creators", pct: 73, color: "bg-[oklch(0.72_0.12_85/80%)]", glow: "", label: "73% of all platform revenue" },
                { tier: "Bottom 50% of Creators", pct: 1.5, color: "bg-[oklch(0.18_0.006_85)]", glow: "", label: "1.5% of all platform revenue" },
              ].map(({ tier, pct, color, glow, label }, i) => (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, x: -20 }}
                  animate={powerLawInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="mb-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[oklch(0.88_0.01_85)] text-sm font-body">{tier}</span>
                    <span className="text-[oklch(0.78_0.14_85)] text-xs font-mono-lux">{label}</span>
                  </div>
                  <div className="h-2.5 bg-[oklch(0.78_0.16_85/6%)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={powerLawInView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: cubicEase }}
                      className={`h-full rounded-full ${color} ${glow}`}
                    />
                  </div>
                </motion.div>
              ))}
              <div className="gold-divider my-5" />
              <div className="p-4 rounded-xl bg-[oklch(0.78_0.16_85/6%)] border border-[oklch(0.78_0.16_85/12%)]">
                <p className="text-[oklch(0.85_0.01_85)] text-sm text-center font-body">
                  <strong className="font-semibold">The bottom half of creators split just 1.5% of the platform's money.</strong><br />
                  <span className="text-[oklch(0.58_0.015_85)] text-xs mt-1 block">We only work with creators who are serious about getting to the top.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE TWO EMPIRES SHOWCASE ── */}
      <section className="py-24 bg-[oklch(0.05_0.004_85)] relative border-t border-[oklch(0.78_0.16_85/8%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
              Choose Your Path to Power
            </span>
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-5">
              The Two Empires We Build & Back
            </h2>
            <p className="text-[oklch(0.58_0.015_85)] max-w-2xl mx-auto font-body leading-relaxed">
              We aren't a coaching program. We are your active business operators. Whether you operate entirely online from your bedroom or control high-end in-person markets, we manage the grind so you keep the cash.
            </p>
            <div className="gold-divider max-w-xs mx-auto mt-5" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Digital Empire */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="luxury-card-elevated p-8 sm:p-10 border border-[oklch(0.78_0.16_85/15%)] flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6">
                  <Zap size={14} className="text-[oklch(0.78_0.16_85)] animate-pulse" />
                  <span className="text-[oklch(0.78_0.14_85)] text-xs font-semibold tracking-wider uppercase font-body">
                    The Digital Empire
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[oklch(0.94_0.01_85)] mb-4 font-display">
                  Online Creators & Webcam Queens
                </h3>
                <p className="text-[oklch(0.58_0.015_85)] text-sm mb-8 leading-relaxed font-body">
                  For creators ready to scale OnlyFans, fansites, and webcam models looking to build high-converting, fully-optimized digital pipelines. We act as your silent technical and operational partner.
                </p>

                <ul className="space-y-5 mb-8">
                  {[
                    {
                      title: "Silent Webcam Partnership",
                      desc: "We configure and troubleshoot your gear on-site (like Chaturbate), optimize your lighting and audio, and set up multi-platform broadcasting so you're seen everywhere at once."
                    },
                    {
                      title: "Multi-Platform Syndication",
                      desc: "Broadcast on Chaturbate, CamSoda, Stripchat, and more simultaneously. Double your tip streams and audience reach without doubling your hours."
                    },
                    {
                      title: "Online Brand & Fanbase Domination",
                      desc: "Build cult-like, dedicated fanbases that pay a premium for your presence. We manage welcome funnels, profile styling, and up-selling PPVs."
                    },
                    {
                      title: "Diversified Revenue Streams",
                      desc: "Setting up custom digital stores, automated clip stores (ManyVids, Clips4Sale), and wishlists so your brand is monetized 24/7."
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start font-body">
                      <div className="w-5 h-5 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/25%)] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold font-mono-lux">✓</span>
                      </div>
                      <div>
                        <h4 className="text-[oklch(0.88_0.01_85)] font-bold text-sm font-display mb-1">{item.title}</h4>
                        <p className="text-[oklch(0.58_0.015_85)] text-xs leading-relaxed font-body">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/services">
                <button className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-full btn-gold text-sm font-semibold w-full">
                  Explore Digital Management <ArrowRight size={16} />
                </button>
              </Link>
            </motion.div>

            {/* In-Person Empire */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="luxury-card-elevated p-8 sm:p-10 border border-[oklch(0.78_0.16_85/15%)] flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6">
                  <Shield size={14} className="text-[oklch(0.78_0.16_85)]" />
                  <span className="text-[oklch(0.78_0.14_85)] text-xs font-semibold tracking-wider uppercase font-body">
                    The In-Person Empire
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[oklch(0.94_0.01_85)] mb-4 font-display">
                  Elite Companions, Fetish Performers & Dancers
                </h3>
                <p className="text-[oklch(0.58_0.015_85)] text-sm mb-8 leading-relaxed font-body">
                  For high-end companions, fetish models, private dancers, and party girls. We handle the operations, security, and administrative burden so you can work safely and efficiently.
                </p>

                <ul className="space-y-5 mb-8">
                  {[
                    {
                      title: "Ironclad Safety & Vetting",
                      desc: "Advanced client screening protocols, background validation, reference checks, and deposit collection so you never walk into an appointment blind."
                    },
                    {
                      title: "Backend Automation & Classifieds",
                      desc: "We write and post your advertising, manage listing directories, handle initial client outreach, and keep your booking calendar running like clockwork."
                    },
                    {
                      title: "Review & Reputation Control",
                      desc: "We monitor review boards and forums 24/7, scrub spam and false reports, handle feedback loop management, and protect your industry reputation."
                    },
                    {
                      title: "Premium Portfolios & Photoshoots",
                      desc: "Coordination with adult-friendly photographers, set design, styling, and visual asset production to justify premium, four-figure hourly rates."
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start font-body">
                      <div className="w-5 h-5 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/25%)] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold font-mono-lux">✓</span>
                      </div>
                      <div>
                        <h4 className="text-[oklch(0.88_0.01_85)] font-bold text-sm font-display mb-1">{item.title}</h4>
                        <p className="text-[oklch(0.58_0.015_85)] text-xs leading-relaxed font-body">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/services">
                <button className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-full btn-gold-outline text-sm font-semibold w-full">
                  Explore In-Person Support <ArrowRight size={16} />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Hybrid Crossover Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="luxury-card border border-[oklch(0.78_0.16_85/25%)] p-8 sm:p-10 relative overflow-hidden bg-gradient-to-br from-[oklch(0.08_0.008_85)] via-[oklch(0.05_0.004_85)] to-[oklch(0.78_0.16_85/6%)] shadow-[0_0_50px_oklch(0.78_0.16_85/10%)] mb-16"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[oklch(0.78_0.16_85/4%)] blur-[80px] rounded-full pointer-events-none" />
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[oklch(0.78_0.16_85/10%)] border border-[oklch(0.78_0.16_85/20%)] flex items-center justify-center glow-gold-sm">
                    <Crown size={14} className="text-[oklch(0.78_0.16_85)]" />
                  </div>
                  <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.15em] uppercase font-mono-lux">
                    The Ultimate Power Move: Crossover Domination
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[oklch(0.94_0.01_85)] mb-4 font-display">
                  Conquer The Industry On All Fronts
                </h3>
                <p className="text-[oklch(0.65_0.012_85)] text-sm sm:text-base leading-relaxed mb-6 font-body">
                  Our core skillset is building cross-platform synergy that transforms solo entertainers into multi-front conglomerates. By diversifying your business model and combining the power of both digital assets and high-end physical dates, BNE clients experience an <strong className="text-[oklch(0.78_0.16_85)]">average 250% increase in monthly revenue</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 text-[oklch(0.58_0.015_85)] text-xs font-body">
                  <div className="p-4 rounded-xl bg-[oklch(0.04_0.005_85)] border border-[oklch(0.78_0.16_85/10%)]">
                    <strong className="text-[oklch(0.88_0.01_85)] block mb-1">Webcam Models Going Omnichannel:</strong>
                    Transition your cam audience into OnlyFans subscribers, sell private photo packs/custom clips, start phone sex and sexting sessions on NiteFlirt, and book highly-vetted, high-rate physical fetish/date events.
                  </div>
                  <div className="p-4 rounded-xl bg-[oklch(0.04_0.005_85)] border border-[oklch(0.78_0.16_85/10%)]">
                    <strong className="text-[oklch(0.88_0.01_85)] block mb-1">In-Person Escorts Going Digital:</strong>
                    Build a highly profitable, fully anonymous content pipeline and subscription channel directly from the comfort and safety of your bedroom. Double your income without increasing travel.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-center text-center lg:border-l lg:border-[oklch(0.78_0.16_85/15%)] lg:pl-8">
                <div className="text-[60px] font-black text-[oklch(0.78_0.16_85)] font-mono-lux tracking-tighter leading-none mb-1 text-glow-gold">
                  +250%
                </div>
                <div className="text-[oklch(0.88_0.01_85)] text-xs uppercase tracking-widest font-body font-bold mb-6">
                  Average Revenue Growth
                </div>
                <Link href="/onboarding" className="w-full">
                  <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-full btn-gold text-sm font-semibold w-full">
                    Build Your Empire Plan
                  </button>
                </Link>
                <span className="text-[oklch(0.45_0.01_85/70%)] text-[10px] mt-2 block font-body">
                  Complete NDA protection from minute one
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE PRIVACY & SAFETY FIREWALL ── */}
      <section className="py-24 bg-[oklch(0.05_0.004_85)] relative border-t border-[oklch(0.78_0.16_85/8%)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.78_0.14_85/2%)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
              Anonymity, Security & Peace of Mind
            </span>
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-5">
              The BNE Shield: Your Privacy Firewall
            </h2>
            <p className="text-[oklch(0.58_0.015_85)] max-w-2xl mx-auto font-body leading-relaxed">
              In this industry, privacy isn't a luxury — it's your primary defense. We build a literal firewall between your real life and your cash flow, ensuring you stay safe, protected, and completely anonymous.
            </p>
            <div className="gold-divider max-w-xs mx-auto mt-5" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Separate Brand Identity",
                desc: "We construct a complete, bulletproof brand persona unrelated to your legal name, physical location, or social footprint. Your secret is 100% safe with us.",
                accent: "border-[oklch(0.78_0.16_85/18%)]"
              },
              {
                icon: Eye,
                title: "Geographical Firewalls",
                desc: "Block entire cities, states, or regions by default. Restrict access so coworkers, family, and exes never see your advertisements or subscription platforms.",
                accent: "border-[oklch(0.72_0.12_85/15%)]"
              },
              {
                icon: Shield,
                title: "Elite Safety & Screening",
                desc: "Custom booking pipelines that vet physical clients, verify photo IDs, check community blacklist registries, and coordinate secure safety check-ins.",
                accent: "border-[oklch(0.78_0.16_85/18%)]"
              },
              {
                icon: DollarSign,
                title: "Private Banking Pipelines",
                desc: "Get paid without leaving paper trails. We structure secure financial pathways, payment routing, and bookkeeping systems to isolate your income.",
                accent: "border-[oklch(0.72_0.12_85/15%)]"
              },
              {
                icon: Award,
                title: "Leaked Content Annihilation",
                desc: "Our automated monitoring sweeps the internet 24/7. The moment your content leaks onto tubes or forums, we file rapid, aggressive DMCA takedowns.",
                accent: "border-[oklch(0.78_0.16_85/18%)]"
              },
              {
                icon: BarChart3,
                title: "100% Legal Protection",
                desc: "We manage the legal red tape: local entity licensing, LLC setups, model release forms, and § 2257 compliance catalogs so your business is untouchable.",
                accent: "border-[oklch(0.72_0.12_85/15%)]"
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: cubicEase }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`luxury-card p-7 border ${accent} hover:border-[oklch(0.78_0.16_85/30%)] transition-all duration-300 group`}
              >
                <div className="w-11 h-11 rounded-xl bg-[oklch(0.78_0.16_85/8%)] flex items-center justify-center mb-5 group-hover:bg-[oklch(0.78_0.16_85/14%)] transition-colors duration-300">
                  <Icon size={20} className="text-[oklch(0.78_0.16_85)]" />
                </div>
                <h3 className="text-[oklch(0.94_0.01_85)] font-bold mb-3 font-display text-lg">{title}</h3>
                <p className="text-[oklch(0.58_0.015_85)] text-sm leading-relaxed font-body">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-semibold tracking-[0.2em] uppercase font-body">
              How It Works
            </span>
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mt-3 mb-4">
              From Idea to Income, Step by Step
            </h2>
            <p className="text-[oklch(0.58_0.015_85)] mb-10 font-body">
              A clear process that moves you from "I'm interested" to "I'm making money" — no confusion, no guessing.
            </p>
          </motion.div>
          <div className="relative">
            <VideoPlayer
              src={bneVideo?.url || "/media-files/B.N.E.mp4"}
              poster="/banner.png"
              title="BNE Agency Briefing"
              description="Welcome to Blacklisted Niche Entertainment. Learn how we build, scale, and secure your brand."
            />
            {/* Video Cliff Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 p-6 rounded-2xl bg-[oklch(0.78_0.16_85/4%)] border border-[oklch(0.78_0.16_85/10%)]"
            >
              <p className="text-[oklch(0.78_0.14_85)] text-xs font-mono-lux mb-2 tracking-wider uppercase">Key Insights</p>
              <ul className="space-y-2 text-[oklch(0.65_0.012_85)] text-sm font-body leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.78_0.16_85)] font-bold">•</span>
                  Solo creators earn a fraction of their potential due to scattered effort and lack of strategic focus.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.78_0.16_85)] font-bold">•</span>
                  BNE Agency's structured approach multiplies revenue through niche precision and professional systems.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.78_0.16_85)] font-bold">•</span>
                  Top 1% creators capture 33% of platform revenue — specific positioning matters more than content volume.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.78_0.16_85)] font-bold">•</span>
                  Working with BNE bridges the gap from amateur to professional creator in 90 days or less.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.78_0.16_85/6%)] via-transparent to-[oklch(0.72_0.12_85/4%)]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[oklch(0.78_0.16_85/4%)] blur-[120px] rounded-full pointer-events-none aura-pulse"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[oklch(0.78_0.16_85/10%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown size={28} className="text-[oklch(0.78_0.16_85)]" />
            </div>
            <h2 className="heading-lg text-[oklch(0.94_0.01_85)] mb-5">
              Ready to Take This Seriously?
            </h2>
            <p className="text-[oklch(0.65_0.012_85)] text-lg mb-10 max-w-2xl mx-auto font-body leading-relaxed">
              Whether you're just starting out or ready to level up — we meet you where you are.
              No pressure, no games. Just a clear path forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-gold text-base font-semibold"
                >
                  <Zap size={18} />
                  Free Niche Finder
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-gold-outline text-base font-semibold"
                >
                  View Pricing & Packages
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RESOURCES PREVIEW ── */}
      <section className="py-24 border-t border-[oklch(0.78_0.16_85/8%)] bg-[oklch(0.05_0.004_85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: cubicEase }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-5"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <BookOpen size={16} className="text-[oklch(0.78_0.16_85)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.16_85)] font-body">
                  Learn & Grow
                </span>
              </div>
              <h2 className="heading-lg text-[oklch(0.94_0.01_85)]">
                Guides, Tips & Real Talk
              </h2>
              <p className="text-[oklch(0.58_0.015_85)] mt-2 text-sm font-body">
                No fluff, no gatekeeping — just honest advice on niches, compliance, and building something that lasts.
              </p>
            </div>
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full btn-gold-outline text-sm font-semibold shrink-0"
              >
                Read the Blog <ChevronRight size={14} />
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
                transition={{ delay: i * 0.1, duration: 0.4, ease: cubicEase }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="group luxury-card hover:border-[oklch(0.78_0.16_85/30%)] transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
                    <div className={`h-1 bg-gradient-to-r ${article.coverGradient}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[oklch(0.78_0.16_85)] font-body mb-3">
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-[oklch(0.94_0.01_85)] leading-snug mb-3 line-clamp-2 group-hover:text-[oklch(0.78_0.16_85)] transition-colors font-display text-lg">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[oklch(0.58_0.015_85)] leading-relaxed line-clamp-2 flex-1 mb-4 font-body">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.78_0.16_85/8%)]">
                        <span className="flex items-center gap-1.5 text-xs text-[oklch(0.45_0.01_85/70%)] font-mono-lux">
                          <Clock size={11} /> {article.readTime} min
                        </span>
                        <span className="text-xs text-[oklch(0.78_0.16_85)] flex items-center gap-1.5 group-hover:gap-2.5 transition-all font-body font-medium">
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
