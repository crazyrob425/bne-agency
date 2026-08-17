/**
 * BNE Market Analysis Page
 * Data-driven niche and industry analysis
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import InfographicModal from "@/components/InfographicModal";
import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import {
  Layers, TrendingUp, BarChart3, ArrowRight, Zap, Crown, FileText,
  Eye, Lock, Star, Users, Heart, Shield
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function MarketAnalysis() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("What_services_should_a_firm_offer_creators_in_2026") || getVideoByKeyword("services") || getVideoByKeyword("2026");
  const guide = getInfographicByKeyword("Niche_Mastery_Guide");
  const strategyGuide = getInfographicByKeyword("Niche_Quiz_Niche_Content_Creator_Strategy_Guide");
  const [modalOpen, setModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Market Analysis",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Deep market and niche analysis for adult content creators. Identify high-earning segments, competition gaps, and growth opportunities with data-driven projections.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Market Research"
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
        title="Market Analysis | BNE Agency"
        description="Deep market and niche analysis for adult content creators. Identify high-earning segments, competition gaps, and growth opportunities."
        canonical="/market-analysis"
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
              <BarChart3 className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                NICHE INTELLIGENCE
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Market</span>
              <br />
              <span className="gradient-text">Analysis</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Do not guess. We analyze 1,052+ real market segments for earning potential, competition density, and growth trajectory. Find the niche where you can win big.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Market Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Most Creators Pick Niches Based on TikTok Trends</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              Here is how most creators choose their niche: they see someone else making money in a category, they think I could do that, and they jump in without checking the data. Three months later, they are posting into a void wondering why nobody is paying. The problem is not their content. It is that they chose a niche based on vibes instead of validation.
            </p>
            <p>
              The adult creator economy has over 1,052 identifiable market segments, each with different earning potential, competition density, and audience behavior. Some niches are gold mines with high intent and low supply. Others are bloodbaths where the top one percent of creators capture ninety-nine percent of the revenue. Without data, you are essentially gambling.
            </p>
            <p>
              BNE is market analysis framework replaces guesswork with intelligence. We analyze real platform data, subscription rates, PPV averages, tip volumes, and audience demographics, to build an earning potential matrix for every major segment. We then cross-reference this with your unique traits to identify the niches where you have both demand alignment and competitive advantage.
            </p>
            <p>
              The result? You enter markets where you can actually win, not just participate. You avoid the saturated niches where the big creators have already locked down the audience. And you find the micro-niches with hidden profitability that most agencies do not even know exist.
            </p>
            <p>
              The trend-chasing trap is especially vicious on social media. A niche might be booming this quarter and dead the next because of a platform policy change, a celebrity endorsement, or a sudden influx of competition. BNE analyzes trend trajectories, not just snapshots. We show you whether a niche has legs or whether it is a flash in the pan that will leave you holding an irrelevant content library.
            </p>
            <p>
              Then there is the saturation myth. Many creators assume that if they see ten big names in a niche, it is too crowded. But saturation is not about the number of creators. It is about the ratio of supply to high-intent demand. BNE calculates that ratio for you, revealing niches that look crowded to the casual observer but are actually wide open for a well-positioned newcomer.
            </p>
            <p>
              Platform-specific earning variance is another hidden factor. Instagram, Twitter/X, TikTok, Fansly, and YouTube all have wildly different CPMs, audience psychographics, and monetization mechanics. A niche that prints money on one platform might be dead on another. BNE maps these variances so you choose the right battlefield before you deploy your creative army.
            </p>
            <p>
              For creators who want to validate before committing, our <Link href="/niche-matcher" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">free Niche Matcher</Link> gives you a quick read on your best-fit segments. For a full competitive and revenue breakdown, pair it with <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">business strategy</Link> to build an empire around the winning niche.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Market Blindness to Niche Dominance in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have mapped the exact process from I do not know what niche to pick to I own the highest-earning segment in my category.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Market Scan", desc: "We scan 1,052+ real market segments for earning potential, saturation, and growth trajectory.", icon: Layers },
              { step: "02", title: "Competition Audit", desc: "We analyze your target niche is top performers to identify gaps and opportunities you can exploit.", icon: BarChart3 },
              { step: "03", title: "Earning Projection", desc: "We build a data-driven revenue model for your chosen niche with realistic timelines and milestones.", icon: TrendingUp },
              { step: "04", title: "Entry Strategy", desc: "We design your launch plan, content pillars, pricing, positioning, so you enter the market with maximum impact.", icon: Crown },
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
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>What Services Should a Firm Offer Creators in 2026</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>A look inside the future of creator management and the services that will define the next generation of adult entertainment empires.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/What_services_should_a_firm_offer_creators_in_2026.mp4"}
            title="What Services Should a Firm Offer Creators in 2026"
            description="The future of creator management and the services defining the next generation of adult entertainment empires."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Data Beats Vibes Every Single Time</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "1,052-Segment Earning Matrix", desc: "We maintain a proprietary database of earning potential across every major niche. No guesswork, no vibes, just hard numbers on what pays and what does not." },
              { icon: Lock, title: "Competition Gap Mapping", desc: "We do not just count competitors. We map their weaknesses, their pricing gaps, and their audience complaints to find the exact spot where you can enter and dominate." },
              { icon: Star, title: "Platform Revenue Benchmarking", desc: "Every platform has a different CPM, audience psychology, and monetization ceiling. We benchmark each niche across platforms so you deploy on the highest-ROI battlefield." },
              { icon: TrendingUp, title: "Trend Dead-End Detection", desc: "Some niches are trending today and extinct tomorrow. We analyze trend trajectories, not just snapshots, so you avoid the flash-in-the-pan traps that leave creators with dead-end content libraries." },
              { icon: Users, title: "Micro-Niche Profit Calculus", desc: "The biggest profits are often in the smallest niches. We calculate supply-to-demand ratios for micro-segments that look crowded to casual observers but are actually wide open for a well-positioned newcomer." },
              { icon: Heart, title: "Saturation Index Analysis", desc: "Saturation is not about how many creators exist. It is about how many well-positioned creators serve high-intent demand. We build a saturation index that reveals the true opportunity before you commit." },
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
              { quote: "I used to pick niches based on what was trending. BNE showed me the data and I found a micro-niche that is been my goldmine ever since. $32K/month and barely any competition.", name: "Mia R.", revenue: "$32K/mo, zero competition", location: "Texas", stars: 5 },
              { quote: "The competition analysis was eye-opening. I thought my niche was saturated until BNE showed me the gaps. I filled them and now I am the top creator in that segment.", name: "Lexi K.", revenue: "Top 1% in niche", location: "California", stars: 5 },
              { quote: "BNE is market research gave me confidence to pivot at exactly the right time. I avoided a dying niche and jumped into an emerging one. Best decision I ever made.", name: "Sasha M.", revenue: "$18K/mo, emerging niche", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Test Your Niche Potential Before You Commit</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to discover your highest-earning potential. No sign-up, no email, no strings, just clarity on where you should focus. Once you have a shortlist, <Link href="/market-analysis" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">deep market analysis</Link> will validate the real opportunity.
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

      {/* Infographic Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Strategy Guides</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Downloadable Market Analysis Resources</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Click any guide below to open the full infographic with print and download options.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {guide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Niche Mastery Guide</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full breakdown</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Niche_Mastery_Guide.pdf"} title="Niche Mastery Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
            <div>
              {strategyGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setStrategyModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Niche Content Creator Strategy Guide</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full strategy guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={strategyGuide?.url || "/media-files/Niche_Quiz_Niche_Content_Creator_Strategy_Guide.png"} title="Niche Content Creator Strategy Guide" isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Market Analysis</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Stop Picking Niches Like You are Throwing Darts</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>The creators who dominate are not the luckiest. They are the most informed. Let BNE hand you the data-driven niche strategy you need.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply for Niche Strategy
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
