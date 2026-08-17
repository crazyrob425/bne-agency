/**
 * BNE Audience Intelligence Page
 * Deep audience psychology and niche survival tactics
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
  Users, TrendingUp, BarChart3, ArrowRight, Zap, Shield, Eye, Lock,
  Star, Heart
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AudienceIntelligence() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Niche_Domination___Survival") || getVideoByKeyword("niche") || getVideoByKeyword("domination");

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Audience Intelligence",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Deep audience psychology and niche survival tactics. Learn to decode your audience is hidden motivations, identify your whales, segment by intent, and dominate your niche.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Audience Analytics"
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
        title="Audience Intelligence | BNE Agency"
        description="Understand the hidden psychology behind your audience is spending habits. Learn to read intent, segment superfans, and dominate your niche."
        canonical="/audience-intelligence"
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
              <Users className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                NICHE INTELLIGENCE
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Audience</span>
              <br />
              <span className="gradient-text">Intelligence</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Your audience is not a monolith. Learn to decode their psychology, identify your whales, segment by intent, and build a relationship stack that turns casual scrollers into devoted payers.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Audience Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Your Audience Is Sending You Signals You Are Not Reading</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              Most creators treat their audience like a single blob of indistinguishable followers. They post the same content, send the same DMs, and wonder why conversion rates are abysmal. The truth is your audience is not one group. It is a spectrum of intent, willingness to pay, and engagement depth.
            </p>
            <p>
              At the bottom, you have the scrollers, the ninety-five percent who consume your free content, leave generic comments, and never spend a dime. In the middle, you have the tippers, the ones who throw five dollars here and ten dollars there but are not committed. And at the top, you have your whales, the one to five percent of your audience who account for eighty percent plus of your revenue. The problem? Most creators do not know how to identify, nurture, and retain those whales.
            </p>
            <p>
              BNE is audience intelligence framework teaches you to read between the lines of every DM, comment, and click pattern. We help you build a relationship stack that moves fans up the value ladder, from casual scroller to loyal subscriber to high-spending superfan. It is not manipulation. It is understanding what people already want and giving them a clear, comfortable path to get it from you.
            </p>
            <p>
              The creators who master audience psychology do not just survive platform algorithm changes. They thrive regardless of them. Because when you understand your audience is hidden motivations, you do not need the algorithm to find new fans. Your existing fans bring them.
            </p>
            <p>
              But here is the DM interpretation layer most creators miss. Every message a fan sends is a data point. Some DMs are conversational, some are transactional, and some are test messages to see how quickly you reply. BNE trains you and your team to decode these signals in real time, responding with the right tone, urgency, and offer at the right moment in the relationship.
            </p>
            <p>
              Whale psychology is another blind spot. High-spending fans do not buy because of your content alone. They buy because of status, access, and identity. BNE helps you understand the specific psychology of your top spenders so you can design experiences, tiers, and interactions that trigger their desire to belong, impress, or be recognized. This is where retention turns into legacy revenue.
            </p>
            <p>
              There is also the cross-platform audience migration problem. Fans who follow you on Instagram might behave very differently on Twitter/X or your subscription platform. BNE builds audience intelligence systems that track behavior across platforms, so you can tailor your approach to each ecosystem without losing the thread of the relationship.
            </p>
            <p>
              Finally, the feedback loop. Most creators look at engagement metrics and see numbers. We see conversation. Every comment, poll response, and survey answer feeds back into your content and monetization strategy. Combine this with <Link href="/creator-positioning" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">creator positioning</Link> and <Link href="/advertising-systems" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">advertising systems</Link> and you have a closed-loop engine where audience intelligence directly fuels revenue growth.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Blind Posting to Audience Domination in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have reverse-engineered the psychology behind high-value creator audiences. Every step is designed to maximize your most important asset: your fans.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audience Audit", desc: "We analyze your current audience data, engagement patterns, spending signals, and relationship depth.", icon: Users },
              { step: "02", title: "Segmentation Strategy", desc: "We build your whale, dolphin, minnow framework and design tailored messaging for each segment.", icon: BarChart3 },
              { step: "03", title: "Intent Mapping", desc: "We decode DMs, comments, and click patterns to predict what your audience will pay for next.", icon: TrendingUp },
              { step: "04", title: "Relationship Stack", desc: "We deploy welcome funnels, upsell scripts, and retention systems that turn casual fans into loyal payers.", icon: Heart },
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

      {/* Niche Domination & Survival Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Intelligence Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Niche Domination & Survival</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>The market is saturated with generic content. Survival depends on specialization and audience intelligence.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/Niche_Domination___Survival.mp4"}
            title="Niche Domination & Survival"
            description="Learn how to read niche demand signals, avoid dead-end trends, and build an audience that actively wants to pay you."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Treat Your Fans Like People, Not Pixels</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Whale Identification Protocols", desc: "We do not just look at subscriber counts. We identify behavioral patterns, spending triggers, and engagement depth to surface your top one to five percent before they churn." },
              { icon: Lock, title: "Intent Signal Decoding", desc: "Every DM, comment, and click is a signal. We decode the hidden motivations behind audience behavior so you can respond with offers that feel personal, not pushy." },
              { icon: Star, title: "Relationship Ladder Engineering", desc: "We design the exact journey from casual scroller to loyal subscriber to whale. Each rung has its own messaging, timing, and value proposition." },
              { icon: TrendingUp, title: "DM Psychology Frameworks", desc: "Our chat protocols are built on persuasion psychology and audience intelligence. Every conversation moves fans closer to a purchase without feeling like a sales pitch." },
              { icon: Users, title: "Superfan Psychology Mapping", desc: "We map the emotional drivers behind your highest spenders: status, access, identity, belonging. Then we design experiences that trigger those drivers on purpose." },
              { icon: Heart, title: "Retention Trigger Systems", desc: "Once a fan spends, the work is not done. We build automated and human-powered retention systems that keep whales coming back month after month." },
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
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Do Not Take Our Word For It</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Real creators we have helped build real empires.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I used to post blindly and hope for the best. BNE taught me to read my audience like a book. My whale count went from 2 to 40 in 3 months.", name: "Mia R.", revenue: "$40K/mo, 40 whales", location: "Texas", stars: 5 },
              { quote: "The segmentation strategy alone changed everything. I stopped wasting time on minnows and focused on my high-value fans. Revenue doubled, workload halved.", name: "Lexi K.", revenue: "6 figures, focused", location: "California", stars: 5 },
              { quote: "BNE is intent mapping is like having a crystal ball. I now know what my audience wants before they even ask. It is made the whole creator experience so much easier.", name: "Sasha M.", revenue: "$14K/mo, predictable", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Discover Your Audience is Hidden Motivations</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your psychology. Understanding your audience starts with understanding yourself. Ready to profile your fans? <Link href="/audience-intelligence" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Explore audience intelligence</Link> to decode their hidden spending triggers.
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
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Audience Intelligence</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Stop Guessing What Your Audience Wants</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>BNE is intelligence tools decode your audience is hidden motivations and position you to monetize them ethically and effectively.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Get Audience Insights
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
