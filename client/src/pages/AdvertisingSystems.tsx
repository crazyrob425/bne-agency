/**
 * BNE Advertising Systems Page
 * Strategic advertising and promotional campaigns for creators
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
  MessageSquare, TrendingUp, Target, ArrowRight, Zap, Crown,
  Eye, Lock, Star, Users, Heart, Shield, BarChart3
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AdvertisingSystems() {
  const { getVideoByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("BNE_Studio_Home_Page_landing_advertisment") || getVideoByKeyword("advertising") || getVideoByKeyword("studio");

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Advertising Systems",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue with compliant, high-converting campaigns.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Advertising & Media Buying"
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
        title="Advertising Systems | BNE Agency"
        description="Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue."
        canonical="/advertising-systems"
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
              <span className="text-zinc-100">Advertising</span>
              <br />
              <span className="gradient-text">Systems</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Paid traffic does not have to be a black hole. We build compliant, high-converting ad campaigns and creative assets that put your brand in front of audiences ready to spend.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Advertising Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Most Creators Burn Ad Budget Like It Is Free Money</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              The adult industry has a dirty little secret: most creators who try paid advertising end up burning thousands of dollars with nothing to show for it. They hire a media buyer who promises results, runs generic campaigns, and blames the platform when the ROAS does not materialize. Meanwhile, their competition is quietly dominating the same ad channels with precision-targeted creative and funnels that convert at three to five times the rate.
            </p>
            <p>
              The difference is not budget. It is strategy. BNE is advertising systems are built from the ground up for adult creators. We understand platform safety, audience psychology, and the specific creative formats that move the needle in this industry. We do not run generic Shopify dropshipping ads and hope for the best. We build campaigns that are compliant, compelling, and mathematically designed to turn clicks into subscribers.
            </p>
            <p>
              From thumb-stopping creative to landing pages that pre-sell your offer before they even land on your profile, every element of our advertising system is optimized for conversion. We test, iterate, and scale what works. And because we understand the adult industry is unique challenges, from ad bans to payment processor restrictions, we build redundancies into every campaign so your traffic keeps flowing even when platforms get unpredictable.
            </p>
            <p>
              Then there is the compliance minefield. Adult advertising lives in a constant cat-and-mouse game with ad platforms. One wrong creative, one aggressive claim, one poorly optimized landing page, and your entire ad account gets banned. BNE builds compliance into every layer of your campaigns, from copy to creative to destination URLs, so you can scale without the Sword of Damocles hanging over your account.
            </p>
            <p>
              Creative fatigue is another silent killer. Even the best ad creative loses potency after a few weeks as the same audience sees it over and over. BNE runs systematic creative testing, producing multiple variants and rotating them before fatigue sets in. We treat creative as a production pipeline, not a one-time task, so your campaigns stay fresh and your CTR stays high.
            </p>
            <p>
              Landing page psychology is where most creators hemorrhage money. They send expensive traffic to a profile page that does not pre-sell, does not address objections, and does not guide the visitor toward a specific action. BNE builds custom landing pages with proven conversion frameworks, pre-framing your offer so visitors are ready to subscribe before they even reach your profile.
            </p>
            <p>
              Traffic diversification is non-negotiable. Relying on a single platform for paid traffic is a recipe for disaster. BNE builds redundant traffic channels across Twitter/X, Reddit, traffic partners, and display networks, so if one channel gets restricted, your revenue keeps flowing. We architect your paid traffic so it is antifragile, not fragile.
            </p>
            <p>
              For creators ready to validate their offer before spending, our <Link href="/niche-matcher" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">free Niche Matcher</Link> ensures you are targeting the right audience. And once you know your niche, <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">business strategy</Link> locks in the pricing and positioning so your converts stick around.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Ad Budget Burn to Predictable Revenue in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have reverse-engineered the advertising playbook that turns random clicks into compounding revenue streams.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit & Strategy", desc: "We audit your current ad accounts, creative, and funnels. Identify leaks and quick wins.", icon: Target },
              { step: "02", title: "Creative Production", desc: "We produce thumb-stopping ad creative, landing pages, and funnel sequences designed for adult audiences.", icon: MessageSquare },
              { step: "03", title: "Campaign Launch", desc: "We deploy compliant campaigns across Twitter/X, Reddit, and traffic partners with real-time optimization.", icon: TrendingUp },
              { step: "04", title: "Scale & Optimize", desc: "We monitor ROAS daily, kill underperformers, and double down on what converts. Your budget compounds.", icon: Zap },
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

      {/* BNE Studio Home Page Landing Advertisement Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Production Pipeline</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>BNE Studio Home Page Landing Advertisement</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>A look inside our studio is ad production pipeline. Every campaign is built with platform safety, audience psychology, and conversion rate optimization in mind.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/BNE_Studio_Home_Page_landing_advertisment.mp4"}
            title="BNE Studio Home Page Landing Advertisement"
            description="How BNE produces compliant, high-converting ad campaigns for adult creators."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Run Ads That Actually Convert</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Adult-Industry Compliance Protocols", desc: "We know the exact rules, shadowbans, and account-killing mistakes that generic media buyers stumble into. Every campaign is pre-vetted for platform safety before it goes live." },
              { icon: Lock, title: "Platform Account Architecture", desc: "We design your ad account structure for longevity. Proper campaigns, ad sets, and creative segregation mean one bad apple does not spoil the barrel." },
              { icon: Star, title: "Thumb-Stopping Creative Systems", desc: "We produce scroll-stopping visuals and copy tested specifically on adult audiences. No generic dropshipping creatives. Every asset is engineered to grab attention and hold it." },
              { icon: TrendingUp, title: "Funnel Redundancy Engineering", desc: "If your landing page goes down or your link gets flagged, we have backups. BNE builds redundant funnels so your traffic always has a place to convert, no matter what breaks." },
              { icon: Users, title: "ROAS Optimization Loops", desc: "We do not set and forget. Daily monitoring, A/B creative swaps, audience refinement, and budget reallocation based on real data. We turn your ad spend into a compounding machine." },
              { icon: Heart, title: "Traffic Diversification Strategy", desc: "Relying on one platform is a hostage situation. We diversify across Twitter/X, Reddit, traffic partners, and more so you are never at the mercy of a single algorithm or policy change." },
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
              { quote: "I was wasting $3K/month on ads with zero return. BNE rebuilt my entire funnel and creative strategy. Within 60 days I was getting $8 back for every $1 spent.", name: "Mia R.", revenue: "4:1 ROAS in 60 days", location: "Texas", stars: 5 },
              { quote: "The platform compliance alone is worth it. BNE knows exactly what works on Twitter/X, Reddit, and traffic partners without getting banned or restricted.", name: "Lexi K.", revenue: "$50K/mo paid traffic", location: "California", stars: 5 },
              { quote: "I thought ads were too complicated for adult. BNE proved me wrong. They handle everything, creative, copy, targeting, optimization. I just watch the revenue grow.", name: "Sasha M.", revenue: "$22K/mo ad-driven", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Discover Your Highest-Converting Audience</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your brand. Understanding your audience is the first step to advertising success.
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
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Advertising Systems</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Ready to Turn Ad Spend Into Ad Revenue?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>BNE is advertising systems turn paid traffic into predictable, compounding revenue streams. Apply for a free campaign audit and let us show you the leaks in your current funnel.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Get a Free Ad Audit
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
