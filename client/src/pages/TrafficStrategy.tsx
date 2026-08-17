/**
 * BNE Traffic Strategy Page
 * Multi-platform traffic acquisition and monetization
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import {
  TrendingUp, Target, ArrowRight, Zap, BarChart3, Eye, Lock, Star,
  Users, Heart, Shield, Globe, Crosshair
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function TrafficStrategy() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("What_services_should_a_firm_offer_creators_in_2026") || getVideoByKeyword("services") || getVideoByKeyword("2026");

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Traffic Strategy",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Multi-platform traffic systems that turn platform algorithms into your personal audience pipeline. Scale views, subscribers, and revenue simultaneously with compliant growth strategies.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Traffic Growth"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": SERVICE_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [servicesSchema, faqSchema]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Traffic Strategy | BNE Agency"
        description="Multi-platform traffic systems that turn platform algorithms into your personal audience pipeline. Scale views, subscribers, and revenue simultaneously."
        canonical="/traffic-strategy"
        schema={combinedSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-emerald-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                GROWTH
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Traffic</span>
              <br />
              <span className="gradient-text">Strategy</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Traffic is the lifeblood of every creator business. Our multi-platform acquisition systems feed your channels with high-intent followers who convert to paying fans at industry-leading rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Context / Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Traffic Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Most Creators Are One Algorithm Update Away From Zero</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              Build your entire creator business on a single platform and you're renting. One terms-of-service update, one shadowban, one account takedown — and your income vanishes overnight. We've seen it happen to thousands of creators who thought they were "safe" because they had 100K followers. Followers don't pay bills. Traffic does. And traffic without diversification is a house of cards.
            </p>
            <p>
              The creators who survive and thrive aren't the ones with the biggest following on one platform — they're the ones with distribution across five, six, seven channels. TikTok brings the eyes. Twitter/X closes the subs. Reddit drives the niche traffic. OnlyFans retains the revenue. Cross-platform isn't optional anymore — it's survival.
            </p>
            <p>
              But here's what nobody talks about: diversification without strategy is just chaos. You can't simply repost the same content everywhere and expect results. Each platform has its own algorithm, its own audience behavior, its own rules about what gets promoted and what gets buried. Posting TikTok clips to YouTube Shorts without adaptation isn't diversification — it's content cannibalism. And creators who try to "hack" every algorithm simultaneously end up spreading themselves too thin, burning out, and ultimately seeing diminishing returns across every channel.
            </p>
            <p>
              The real winners are the ones who understand each platform's unique mechanics and build channel-specific strategies that feed into one another. This is where BNE's traffic strategy framework comes in. We don't just distribute your content — we engineer a synchronized ecosystem where each platform amplifies the others. High-engagement TikTok clips become Twitter threads that drive newsletter signups that convert to paid subscriptions on your monetization hub. Every platform has a job, and every job feeds the next.
            </p>
            <p>
              And if you're worried about maintaining anonymity while growing across so many platforms, our <Link href="/privacy-systems" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">Privacy Systems</Link> service ensures each channel stays compartmentalized — so a breach on one doesn't expose your entire operation. Your traffic grows, but your identity stays protected.
            </p>
            <p>
              BNE's traffic strategy framework gives you a multi-platform acquisition system that works in harmony, not competition. We optimize each channel for its unique strengths and feed high-intent traffic from one platform to another. The result? Your audience grows on autopilot while you sleep, and your revenue becomes less dependent on any single platform's whims.
            </p>
            <p>
              We've built traffic systems for creators in every major niche, and the pattern is always the same: diversify or die. Let us build your distribution empire.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Platform Dependency to Traffic Empire in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We've mapped the exact system that turns random clicks into predictable, compounding audience growth.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Channel Audit", desc: "We audit your current traffic sources, identify gaps, and map the highest-intent channels for your niche.", icon: Target },
              { step: "02", title: "Content Strategy", desc: "We design platform-specific content strategies that satisfy each algorithm while driving traffic to your revenue channels.", icon: BarChart3 },
              { step: "03", title: "Cross-Platform Funnels", desc: "We build traffic routing systems that move fans from discovery platforms to your monetization hubs.", icon: TrendingUp },
              { step: "04", title: "Scale & Diversify", desc: "We monitor performance weekly, pivot underperforming channels, and expand into new platforms as opportunities emerge.", icon: Zap },
            ].map((item, i) => {
              const StepIcon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
                  <div className="text-center mb-4"><span className="text-5xl font-bold text-violet-500/20 mono-stat">{item.step}</span></div>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><StepIcon className="h-7 w-7 text-violet-400" /></div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2026 Traffic Playbook Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Industry Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The 2026 Traffic Playbook</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>From TikTok viral mechanics to Twitter/X algorithm hacks, we deploy compliant advertising and organic growth systems.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/What_services_should_a_firm_offer_creators_in_2026.mp4"}
            title="The 2026 Traffic Playbook"
            description="Platform-compliant advertising and organic growth systems for creator traffic acquisition."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Traffic Strategy Built By Operators, Not Theorists</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Multi-Platform Native Expertise", desc: "We don't repost content across channels and call it a strategy. Each platform gets a tailored approach — TikTok hooks, Twitter threads, Reddit community plays, OF subscription flows — engineered for that specific algorithm and audience behavior." },
              { icon: Crosshair, title: "Algorithm-First Content Engineering", desc: "We reverse-engineer platform algorithms before we write a single content brief. Our team tracks ranking signals, watch-time triggers, and engagement patterns to build content that platforms actually want to promote — not just tolerate." },
              { icon: TrendingUp, title: "Revenue-Aligned Traffic Funnels", desc: "Vanity metrics are a trap. We build traffic systems designed from day one to move fans from discovery to paid conversion. Every platform in your stack has a defined role in the funnel, and we measure success by revenue, not just views." },
              { icon: Shield, title: "Platform Risk Mitigation Built In", desc: "Algorithm changes, TOS updates, and mass demonetization waves hit creators without diversified strategies hardest. Our multi-channel approach means a hit on any single platform is absorbed by the rest — your income stays stable while competitors panic." },
              { icon: BarChart3, title: "Proprietary Analytics & Weekly Pivots", desc: "We track performance across all your channels in a unified dashboard and pivot aggressively when a platform underperforms. No ego, no sunk-cost fallacy — just data-driven decisions that keep your traffic growing quarter over quarter." },
              { icon: Users, title: "Traffic That Grows While You Sleep", desc: "Our systems are built for compounding growth, not one-off viral hits. Evergreen content strategies, automated cross-promotion sequences, and audience-retention loops mean your channels keep pulling in new fans even when you're not actively posting." },
            ].map((item, i) => {
              const WhyIcon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass-card p-6 border">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4"><WhyIcon className="h-5 w-5 text-violet-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Real Results</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Don't Take Our Word For It</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Real creators we've helped build real empires.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I was doing TikTok live sessions and getting maybe 50 viewers. BNE built me a cross-platform funnel and now I'm pulling 5K+ viewers per session consistently.", name: "Mia R.", revenue: "5K+ viewers/session", location: "Texas", stars: 5 },
              { quote: "The diversification strategy changed my life. I used to panic every time Twitter changed its algorithm. Now I have traffic flowing from 6 different platforms.", name: "Lexi K.", revenue: "6-channel traffic stack", location: "California", stars: 5 },
              { quote: "BNE's traffic strategy is the best investment I ever made. My subscriber count grew 300% in 4 months and it's still accelerating. They just keep stacking wins.", name: "Sasha M.", revenue: "300% growth in 4 months", location: "Florida", stars: 5 },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 border border-white/8">
                <div className="flex items-center gap-1 mb-4">{[...Array(t.stars)].map((_, j) => <Star key={j} className="h-4 w-4 text-violet-400 fill-violet-400" />)}</div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: 'DM Sans' }}>"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-100 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk' }}>{t.name}</p>
                    <p className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{t.location}</p>
                  </div>
                  <div className="text-right px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <p className="text-violet-400 text-xs font-bold mono-stat">{t.revenue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Teaser */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Free Tool</span>
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Find Your Highest-Traffic Niche</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to discover which niches have the highest traffic potential. No sign-up required.
            </p>
            <Link href="/niche-matcher">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-sm font-semibold hover:bg-white/12 transition-all mx-auto">
                <Zap className="h-4 w-4" /> Take the Free Niche Matcher
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Traffic Strategy</h2>
          </motion.div>
          <FAQAccordion faqs={SERVICE_FAQS} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-transparent to-emerald-900/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Traffic Is a System, Not a Gamble</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>BNE's traffic strategy turns random clicks into predictable revenue growth month after month.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply for Traffic Strategy
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
