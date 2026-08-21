/**
 * BNE Screening Systems Page
 * Client vetting, reference checks, and blacklist screening
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
  Users, Shield, CheckCircle, ArrowRight, Lock, Eye, Star, Heart,
  TrendingUp, AlertTriangle, BadgeCheck, Network, Gauge, Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function ScreeningSystems() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Vetting_OFM_Agencies") || getVideoByKeyword("screening");

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Screening Systems",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Rigorous client vetting and reference checking systems that filter out time-wasters, bad actors, and dangerous clients before they reach your calendar.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Client Vetting"
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
        title="Screening Systems | BNE Agency"
        description="Rigorous client vetting and reference checking systems that filter out time-wasters, bad actors, and dangerous clients before they reach your calendar."
        canonical="/screening-systems"
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
              <Shield className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                PROTECTION
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Screening</span>
              <br />
              <span className="gradient-text">Systems</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Your safety is the bottom line. We deploy military-grade vetting protocols — background checks, reference verification, and blacklist screening — to ensure every client who books is legitimate and respectful.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Screening Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Not All Clients Are Created Equal</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              The adult industry attracts a certain type of client. Some are respectful, generous, and exactly who they say they are. Others are not. We are talking about undercover law enforcement, serial harassers, time-wasters who never show, payment fraudsters, and people who get off on pushing boundaries. Without screening, you are rolling the dice every time you confirm a booking.
            </p>
            <p>
              The consequences of bad clients go beyond a wasted evening. We have seen creators arrested because they did not verify a client's identity. We have seen blackmail attempts from clients who recorded sessions without consent. We have seen payment disputes that cost thousands in legal fees. One bad client can destroy your business, your reputation, and your peace of mind. And because the adult industry carries stigma, many creators hesitate to involve law enforcement — making them even more vulnerable to repeat offenses.
            </p>
            <p>
              The screening tools that exist for mainstream industries are almost useless here. Standard background checks miss the subtleties of this industry — the fake references, the burner emails, the clients who have been banned from other platforms under different names. A simple Google search does not reveal a client who has been operating under multiple aliases across different cities. Standard reference checks are easily faked with burner phone numbers and friend accounts. The people you are trying to screen know the system and know how to beat it.
            </p>
            <p>
              BNE's screening systems are military-grade, but they are not generic. We have built a vetting framework specifically for adult industry creators, informed by years of real-world data on who actually shows up, who pays, and who causes problems. Our internal blacklist is continuously updated with verified bad actors — not just from our own clients, but from cross-industry intelligence sharing. If you want the kind of client screening that actually works in this industry, you need a system built by people who understand the specific threats. Pair that with our <Link href="/privacy-systems" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">Privacy Systems</Link> and you have a complete defense: your identity is protected, and the people who reach you have already been verified.
            </p>
            <p>
              BNE's screening systems are military-grade. We verify identity through multiple reference channels, cross-check against our internal blacklist of known bad actors, and flag suspicious behavior patterns before they become problems. Our vetting does not just protect you from the obvious threats — it catches the subtle ones that most screening systems miss.
            </p>
            <p>
              When you work with BNE, every client who reaches your calendar has already passed through our gauntlet. You focus on delivering exceptional experiences. We handle the trust and safety.
            </p>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Uncertain Client to Verified Booking in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have mapped the exact vetting workflow that filters out 99% of bad actors before they ever reach your calendar.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Intake and ID Check", desc: "Every client submits verification documents and references. We cross-check against our blacklist before proceeding.", icon: CheckCircle },
              { step: "02", title: "Reference Verification", desc: "We contact 2-3 professional references provided by the client to confirm legitimacy and behavior history.", icon: Users },
              { step: "03", title: "Behavioral Analysis", desc: "We flag suspicious communication patterns, unrealistic requests, and red flags that most screening systems miss.", icon: Eye },
              { step: "04", title: "Approval and Monitoring", desc: "Approved clients get a verified badge. We continue monitoring for new complaints or behavior changes.", icon: Shield },
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

      {/* Vetting OFM Agencies Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Vetting Intelligence</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Vetting OFM Agencies and Dangerous Clients</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Not all clients are created equal. Our vetting system filters out time-wasters, undercover LE, and suspicious characters.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/Vetting_OFM_Agencies.mp4"}
            title="Vetting OFM Agencies and Dangerous Clients"
            description="How BNE's screening systems filter out time-wasters and dangerous clients."
          />
        </div>
      </section>
      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Screening That Actually Catches the Bad Actors</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BadgeCheck, title: "Living Blacklist Database", desc: "We maintain a continuously updated internal blacklist of verified bad actors — not just from our own vetting, but from cross-industry intelligence sharing. If a client has been flagged anywhere, we know about it before they book." },
              { icon: Network, title: "Multi-Source Reference Verification", desc: "Standard vetting calls two phone numbers and calls it a day. We cross-reference across social profiles, professional history, platform records, and behavioral databases. We catch the fake references that slip past generic screening systems." },
              { icon: Gauge, title: "Behavioral Red Flag Detection", desc: "Our system does not just check documents — it analyzes communication patterns. Unusual urgency, requests for off-platform payments, evasiveness about references, and other subtle signals get flagged for human review before approval." },
              { icon: TrendingUp, title: "Post-Approval Client Monitoring", desc: "Screening does not end at the approval badge. We monitor approved clients for new complaints, behavior pattern shifts, and emerging risk signals. A client who was fine six months ago can become a liability — we catch that before it affects you." },
              { icon: Shield, title: "Cross-Industry Threat Intelligence", desc: "Our screening data spans the full adult industry spectrum — from content creation to in-person services. We apply threat intelligence from every vertical, so your screening benefits from patterns and bad actors identified across the entire ecosystem." },
              { icon: Eye, title: "Rapid Response to New Threat Vectors", desc: "Scammers evolve their methods constantly. Our vetting protocols are updated in real time based on emerging scam patterns, new fake ID tactics, and novel social engineering approaches. Your screening stays ahead of the curve." },
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
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Real creators we have helped build real empires.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I used to meet clients blindly and hope for the best. BNE's vetting caught a scammer who had been operating for years. They would have ruined me.", name: "Mia R.", revenue: "Scammer caught", location: "Texas", stars: 5 },
              { quote: "The blacklist monitoring alone is worth it. BNE maintains an internal database of bad actors and cross-checks every new client. I have never had a bad experience since.", name: "Lexi K.", revenue: "Zero bad clients", location: "California", stars: 5 },
              { quote: "I feel so much safer now. The reference checks are thorough, the behavioral analysis is smart, and the team is always available if something feels off.", name: "Sasha M.", revenue: "Complete peace of mind", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Discover Your Safe Niche</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your safety needs. Understanding your audience is the first step to protecting yourself.
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
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Screening Systems</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Only Meet Clients Worth Meeting</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Our screening systems mean no more wasted time, no more sketchy vibes, and no more risk. Apply for managed booking and vetting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply for Vetting Services
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