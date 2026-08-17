/**
 * BNE Business Strategy Page
 * Strategic planning and 6-figure brand architecture
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
  Sparkles, ArrowRight, TrendingUp, DollarSign, Target, Zap, FileText,
  Eye, Lock, Star, Users, Heart, Shield, BarChart3, Crown, Compass, Map, Flag
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function BusinessStrategy() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("The_Agency_Scale_Methodology") || getVideoByKeyword("scale") || getVideoByKeyword("methodology");
  const infographic1 = getInfographicByKeyword("Building_a_Six-Figure_Content_Empire");
  const infographic2 = getInfographicByKeyword("Brand_Playbook");
  const intimacyEngine = getInfographicByKeyword("The Intimacy Engine_ Adapting Creator-Economy Engagement for High-Intent B2B Conversion");
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Business Strategy",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Strategic brand architecture and business planning for creators targeting 6-figure annual revenue and sustainable growth. Includes niche positioning, content pillars, pricing architecture, and expansion playbooks.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Business Strategy"
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
        title="Business Strategy | BNE Agency"
        description="Strategic brand architecture and business planning for creators targeting 6-figure annual revenue and sustainable growth."
        canonical="/business-strategy"
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
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                STRATEGIC ADVISORY
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Business</span>
              <br />
              <span className="gradient-text">Strategy</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Your content career is a business. Act like one. We build the strategic roadmap that turns casual creators into disciplined, 6-figure brand empires with measurable milestones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Target className="h-5 w-5" /> Free Niche Matcher
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Strategy Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Most Creators Fly Blind Into a Brick Wall</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              The average creator's strategy is whatever platform they stumbled into last month. They post sporadically, chase every trend, and hope the algorithm smiles on them. Spoiler: it will not. The creator economy has a ninety-five percent failure rate not because creators lack talent, but because they lack strategy. Without a strategic compass, you are not building a brand. You are engaging in digital hopscotch, landing wherever the next trend drops you.
            </p>
            <p>
              Without a business architecture, you are essentially running a restaurant with no menu, no pricing, and no idea who your customers are. You might get lucky with a viral post, but luck runs out faster than your motivation. The creators who last, the ones building real empires, treat every post, every DM, and every pricing decision as part of a larger machine. They are not reacting to the market. They are engineering it.
            </p>
            <p>
              BNE is business strategy framework gives you that machine. We start with niche positioning, not just what should I post, but who am I serving and why will they pay a premium for it. Then we build content pillars that reinforce that position, pricing architecture that maximizes lifetime value, and an expansion playbook that turns one successful niche into a diversified portfolio. Every element is designed to compound your advantage over time.
            </p>
            <p>
              This is not a course you watch and forget. This is a living strategy document that evolves with your brand. We are with you for quarterly business reviews, market shifts, and pivot decisions. Your competition is still guessing. You will have a blueprint. And because strategy without execution is just hallucination, we pair this with our <Link href="/scaling-frameworks" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">scaling frameworks</Link> and <Link href="/creator-positioning" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">creator positioning</Link> services to make sure the plan actually gets built.
            </p>
            <p>
              The biggest mistake we see creators make is treating strategy as a one-time event, a document they write in a weekend and file away. Markets shift. Platforms change. Audience psychology evolves. That is why we embed strategy into your weekly rhythm: KPI reviews, competitive analysis, and pivot recommendations. You are not just getting a map. You are getting a navigation system that updates in real time.
            </p>
            <p>
              There is also the one-page strategy myth. Creators watch a YouTube video on business models, sketch a one-page plan, and call it a strategy. Real strategy is multidimensional: it covers unit economics, customer acquisition cost, platform-specific positioning, and competitive moats. BNE builds documents that span dozens of pages, updated quarterly, and enforced through weekly operational rhythms. Anything less is just a wish list with bullet points.
            </p>
            <p>
              Another blind spot is competitive intelligence. Most creators have no idea what their top competitors are doing, what their pricing weaknesses are, or where their audience is leaking. We run deep competitive audits, mapping competitor strengths and exposing the gaps you can exploit. Your strategy is only as good as your understanding of the battlefield.
            </p>
            <p>
              Finally, strategy must be dressed in execution armor. A flawless plan means nothing if your team does not know how to execute it. That is why BNE pairs strategy with <Link href="/audience-intelligence" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">audience intelligence</Link> and <Link href="/advertising-systems" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">advertising systems</Link>, ensuring your roadmap turns into real revenue, not just a pretty PDF collecting digital dust.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Scattered Posts to Strategic Empire in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have mapped the exact journey from casual poster to 6-figure brand architect. Every step is designed to compound your advantage.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Brand Audit", desc: "We audit your current positioning, content pillars, and revenue streams. Identify gaps and quick wins.", icon: Target },
              { step: "02", title: "Strategic Blueprint", desc: "We design your niche positioning, pricing tiers, and content matrix. No generic advice, your brand, your rules.", icon: FileText },
              { step: "03", title: "Launch & Optimize", desc: "We implement the strategy across all platforms with A/B testing, audience feedback loops, and KPI tracking.", icon: TrendingUp },
              { step: "04", title: "Scale & Diversify", desc: "We expand into adjacent niches, product lines, and revenue streams while protecting your core brand identity.", icon: DollarSign },
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

      {/* Scale Methodology Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Methodology Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The Agency Scale Methodology</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>An in-depth look at our operational scaling frameworks designed to grow your income while reducing labor hours.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/The_Agency_Scale_Methodology.mp4"}
            title="BNE Scale Methodology"
            description="Learn how we transition solo creators into managed business empires."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Think Like CEOs, Not Community Managers</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Compass, title: "Executive-Level Strategic Thinking", desc: "We do not do vibes-based content planning. Every recommendation is grounded in business fundamentals: unit economics, customer acquisition cost, and lifetime value." },
              { icon: BarChart3, title: "Data-Driven Niche Validation", desc: "Before you commit to a positioning, we validate market size, competition density, and price elasticity. No gambling, just calculated bets with favorable odds." },
              { icon: Layers, title: "Content Pillar Architecture", desc: "Every piece of content serves a strategic function: awareness, conversion, retention, or expansion. No orphan posts, every asset pulls its weight in the machine." },
              { icon: DollarSign, title: "Pricing Psychology & Architecture", desc: "We design tier structures that maximize perceived value and minimize discounting. Fans do not buy content. They buy status, access, and identity." },
              { icon: Flag, title: "Expansion Playbooks", desc: "How to enter adjacent niches without cannibalizing your core. We map the sequencing, messaging, and resource allocation for every new market you enter." },
              { icon: Shield, title: "Competitive Moat Building", desc: "We create defensible positioning that competitors cannot copy. Brand equity, proprietary content frameworks, and exclusive fan relationships that are hard to replicate." },
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
              { quote: "I was posting random content with zero direction. BNE gave me a real business plan, niche positioning, content pillars, pricing strategy. In 6 months I hit $35K/month.", name: "Mia R.", revenue: "$35K/mo in 6 months", location: "Texas", stars: 5 },
              { quote: "I thought strategy was boring. Turns out having a plan is the most exciting thing that ever happened to my brand. BNE is roadmap turned my hobby into a real business.", name: "Lexi K.", revenue: "6 figures, structured", location: "California", stars: 5 },
              { quote: "The quarterly reviews alone are worth it. BNE keeps me honest, tracks my KPIs, and pushes me to expand. I make more now than my old corporate job and I work less.", name: "Sasha M.", revenue: "$12K/mo combined", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Test Your Strategy Before You Commit</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to discover your highest-earning potential. No sign-up, no email, no strings, just clarity on where you should focus. Once you have clarity, our <Link href="/market-analysis" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">market analysis</Link> will validate whether your chosen niche is actually a goldmine or a bloodbath.
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
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Downloadable Strategy Resources</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Click any guide below to open the full infographic with print and download options.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              {infographic1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setModal1(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Building a Six-Figure Content Empire</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic1?.url || "/media-files/Building_a_Six-Figure_Content_Empire.png"} title="Building a Six-Figure Content Empire" isOpen={modal1} onClose={() => setModal1(false)} />
            </div>
            <div>
              {infographic2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setModal2(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Brand Playbook</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic2?.url || "/media-files/Brand_Playbook.pdf"} title="Brand Playbook" isOpen={modal2} onClose={() => setModal2(false)} />
            </div>
            <div>
              {intimacyEngine && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setModal3(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Intimacy Engine</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full B2B conversion guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={intimacyEngine?.url || "/media-files/The Intimacy Engine_ Adapting Creator-Economy Engagement for High-Intent B2B Conversion.pdf"} title="The Intimacy Engine" isOpen={modal3} onClose={() => setModal3(false)} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Business Strategy</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Done Flying Blind?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We only work with creators serious about building a real empire. Apply now and let us map your exact growth strategy, quarterly pivots, and competitive moats.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Start Your Strategy Call
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
