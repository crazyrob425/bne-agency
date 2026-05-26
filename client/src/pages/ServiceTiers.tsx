/**
 * BNE Service Tiers Page — Noir Hacker Syndicate Design
 * Three tiers: Genesis Starter, Accelerator Monetization, Sovereign Brand Shield
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Rocket, TrendingUp, Crown, Check, ChevronRight, Zap,
  Shield, DollarSign, Users, Lock, BarChart3, Headphones,
  FileText, Star, ArrowRight
} from "lucide-react";

const tiers = [
  {
    id: "genesis",
    icon: Rocket,
    badge: "STARTER LEVEL",
    name: "The Glow-Up Launch",
    tagline: "For new girls ready to start right — anonymous, protected, and positioned to actually make money.",
    price: "Contact for Pricing",
    targetRevenue: "$0 → $500/mo",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-[0_0_40px_oklch(0.627_0.265_303.9/20%)]",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    features: [
      "Anonymous payment setup so your real info stays private",
      "Geo-blocking so your hometown, coworkers, and family can't find you",
      "Full persona build — your brand identity, completely separate from real you",
      "SEO mapping so fans who are already searching for your type find YOU",
      "Optimized landing page built around your specific niche",
      "§ 2257 compliance docs organized and ready (legally covered, babe)",
      "Model release drafting that actually protects you",
      "30-day social media playbook (teasers, previews, CTAs — all mapped out)",
      "Day-one fan acquisition strategy so you're not starting from zero",
      "Full platform setup and profile optimization",
    ],
    description: `Girl, if you've been thinking about starting but don't know where to begin — or you started and it's not working — this is your tier. Most new creators make less than $180/month because they're doing everything wrong from jump. Generic profiles, no niche, no protection, no strategy.

We fix all of that. We set up your anonymous payment pipeline, lock down your geo-blocking so nobody from your real life can find you, and build you a whole persona that's marketable and completely separate from who you actually are.

Then we position you where the money is. We map your vibe and your comfort zone against what fans are actually searching for, and build you an SEO-optimized page that pulls organic traffic. You don't just launch — you launch right.`,
    cta: "Start My Glow-Up",
  },
  {
    id: "accelerator",
    icon: TrendingUp,
    badge: "GROWTH LEVEL",
    name: "The Scale-Up System",
    tagline: "For girls already making money who are ready to stop doing everything manually and actually scale.",
    price: "Contact for Pricing",
    targetRevenue: "$500 → $10K/mo",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-[0_0_40px_oklch(0.765_0.177_163.2/20%)]",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    featured: true,
    features: [
      "Automated DM funnels — comments turn into subscribers while you sleep",
      "Meta-approved API automation (no bans, no flagging, fully compliant)",
      "Secure landing page buffers so your traffic is protected and trackable",
      "Email list building so a shadowban can't kill your whole business",
      "Multi-platform setup: OnlyFans + Fansly + ManyVids + SextPanther",
      "Revenue per subscriber math — we optimize your pricing to maximize every fan",
      "Affiliate integrations that pay you recurring commissions (35%+)",
      "VOD marketplace listing so your old content keeps making money",
      "Pay-per-minute chat line setup for premium one-on-one interactions",
      "Traffic routing through secure buffer domains for full protection",
    ],
    formula: {
      label: "Net Pay Formula",
      equation: "Net Pay = (T × C) × P_sub × (1 - φ)",
      vars: "T = total followers, C ≈ 1.5% conversion, P_sub = sub price, φ = platform fee (20%)",
    },
    description: `You're already making money — but you're also exhausted. You're manually texting subscribers, posting everywhere, editing your own clips, and still not breaking through. Sis, that's a ceiling, not a strategy.

This tier is about removing you from the grind. We set up automated DM funnels that turn every comment into a subscriber without you lifting a finger. We diversify your income across multiple platforms so you're never dependent on one. We build you an email list so a shadowban doesn't wipe out everything you built.

We also run the math on your revenue per subscriber and optimize your pricing model so every fan is worth more. Less work, more money. That's the whole point.`,
    cta: "Automate My Revenue",
  },
  {
    id: "sovereign",
    icon: Crown,
    badge: "ELITE LEVEL",
    name: "The Empire Package",
    tagline: "Full business management for top-tier creators. You focus on content. We run everything else.",
    price: "Contact for Pricing",
    targetRevenue: "$15K → $100K+/mo",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-[0_0_40px_oklch(0.8_0.15_50/20%)]",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    features: [
      "Dedicated 24/7 native-English chatter team managing your DMs",
      "Fan psychology segmentation — high-ticket sales handled for you",
      "GFE scaling and $300+ custom video upsell management",
      "24/7 automated DMCA web-sweeping and takedown filing",
      "Copyright protection and social network shadowban resolution",
      "Official Custodian of Records under 18 U.S.C. § 2257",
      "Collaborator ID collection, model releases, encrypted digital custody",
      "Premium AV production coordination (3Dio binaural ASMR, cosplay fabrication)",
      "Certified tax accountant coordination and automated bookkeeping",
      "SEP IRA and small business retirement plan establishment",
    ],
    description: `At this level, your creator business is a real company — and it needs to run like one. You're generating serious money, but you're also drowning in DMs, dealing with leaks, managing taxes, and trying to stay creative at the same time. Something has to give.

This is where we take 90% of the daily operations off your plate entirely. Our elite chatter team handles your inbox 24/7 — trained in fan psychology and high-ticket sales so they're not just chatting, they're converting. We're talking GFE scaling, custom video upsells, and high-value microtransactions while you're literally asleep.

We also handle your legal protection, DMCA monitoring, tax coordination, bookkeeping, and even premium content production. You show up and create. We handle the empire.`,
    cta: "Apply for the Empire Package",
  },
];

function TierCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = tier.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`relative glass-card border ${tier.borderColor} ${tier.featured ? tier.glowColor : ""} overflow-hidden`}
    >
      {tier.featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
      )}
      {tier.featured && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs mono-stat">
            <Star size={10} fill="currentColor" />
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${tier.accentColor} flex-shrink-0`}>
            <Icon size={24} />
          </div>
          <div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mono-stat ${tier.badgeColor} mb-2`}>
              {tier.badge}
            </span>
            <h3 className="text-xl font-bold text-zinc-100" style={{ fontFamily: 'Space Grotesk' }}>{tier.name}</h3>
            <p className="text-zinc-400 text-sm mt-1" style={{ fontFamily: 'DM Sans' }}>{tier.tagline}</p>
          </div>
        </div>

        {/* Target Revenue */}
        <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-white/4 border border-white/8">
          <DollarSign size={16} className={tier.accentColor} />
          <div>
            <span className="text-zinc-500 text-xs mono-stat">TARGET REVENUE RANGE</span>
            <div className={`font-bold mono-stat ${tier.accentColor}`}>{tier.targetRevenue}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-6" style={{ fontFamily: 'DM Sans' }}>
          {tier.description.split('\n\n')[0]}
        </p>

        {/* Formula (Accelerator only) */}
        {tier.formula && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
            <p className="text-emerald-400 text-xs mono-stat mb-1">{tier.formula.label.toUpperCase()}</p>
            <div className="text-zinc-200 font-mono text-sm mb-1">{tier.formula.equation}</div>
            <p className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{tier.formula.vars}</p>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-2.5 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300" style={{ fontFamily: 'DM Sans' }}>
              <Check size={14} className={`${tier.accentColor} mt-0.5 flex-shrink-0`} />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/onboarding">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              tier.id === "accelerator"
                ? "btn-emerald"
                : tier.id === "sovereign"
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-900 hover:shadow-[0_0_30px_oklch(0.8_0.15_50/40%)] hover:-translate-y-0.5"
                  : "btn-neon"
            }`}
            style={{ fontFamily: 'Space Grotesk' }}
          >
            {tier.cta}
            <ChevronRight size={16} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServiceTiers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Pick Your Level, Sis</span>
            <h1 className="text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Three Levels. All Leading to the Bag.
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Whether you're just starting out or already stacking serious money, we've got a tier built for exactly where you are right now — and designed to get you to the next level fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: 'Space Grotesk' }}>What's Included at Each Level</h2>
          </motion.div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left p-4 text-zinc-400 font-medium" style={{ fontFamily: 'DM Sans' }}>What You Get</th>
                  <th className="p-4 text-violet-400 font-bold text-center" style={{ fontFamily: 'Space Grotesk' }}>Glow-Up</th>
                  <th className="p-4 text-emerald-400 font-bold text-center" style={{ fontFamily: 'Space Grotesk' }}>Scale-Up</th>
                  <th className="p-4 text-amber-400 font-bold text-center" style={{ fontFamily: 'Space Grotesk' }}>Empire</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Anonymous Identity & Persona Build", true, true, true],
                  ["Geo-Blocking (family/coworkers blocked)", true, true, true],
                  ["§ 2257 Compliance Docs Organized", true, true, true],
                  ["30-Day Social Media Playbook", true, true, true],
                  ["Automated DM & Acquisition Funnels", false, true, true],
                  ["Multi-Platform Revenue Stack", false, true, true],
                  ["Email List Capture (shadowban insurance)", false, true, true],
                  ["24/7 Elite Chatter Team", false, false, true],
                  ["DMCA Web Monitoring & Takedowns", false, false, true],
                  ["Custodian of Records (§ 2257)", false, false, true],
                  ["Tax & Bookkeeping Coordination", false, false, true],
                  ["Premium Audio/Visual Production", false, false, true],
                ].map(([feature, g, a, s], i) => (
                  <tr key={String(feature)} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                    <td className="p-4 text-zinc-300" style={{ fontFamily: 'DM Sans' }}>{feature}</td>
                    {[g, a, s].map((val, j) => (
                      <td key={j} className="p-4 text-center">
                        {val
                          ? <Check size={16} className={j === 0 ? "text-violet-400 mx-auto" : j === 1 ? "text-emerald-400 mx-auto" : "text-amber-400 mx-auto"} />
                          : <span className="text-zinc-700 text-lg">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Not Sure Which Level Is Yours?
            </h2>
            <p className="text-zinc-400 mb-6" style={{ fontFamily: 'DM Sans' }}>
              Run the free Niche Matcher and we'll tell you exactly where you should start based on where you are right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-neon font-semibold"
                >
                  <Zap size={16} />
                  Find My Level — Free
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/8 border border-white/15 text-zinc-100 font-semibold hover:bg-white/12 transition-all"
                >
                  <ArrowRight size={16} />
                  Apply & Let's Talk
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
