/**
 * BNE Creator Positioning Page
 * Niche psychology and 6-figure positioning strategy
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
  Target, TrendingUp, ArrowRight, Zap, Crown, Eye, Lock, Star,
  Users, Heart, Shield, BarChart3
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function CreatorPositioning() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Finding_Your_Freaky__The_Psychology_of_6-Figure_Niches") || getVideoByKeyword("freaky") || getVideoByKeyword("psychology");
  const nicheGuide = getInfographicByKeyword("Niche_Mastery_Guide");
  const [modalOpen, setModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Creator Positioning",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Niche psychology and 6-figure positioning strategy. We analyze your unique traits, audience psychology, and market gaps to position you in a niche where fans PAY a premium for exactly what you offer.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Brand Positioning"
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
        title="Creator Positioning | BNE Agency"
        description="Master niche psychology and position yourself as the go-to creator in a high-value, underserved market segment."
        canonical="/creator-positioning"
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
              <Target className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                STRATEGIC ADVISORY
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Creator</span>
              <br />
              <span className="gradient-text">Positioning</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Stop posting generic content for generic likes. We analyze your unique traits, audience psychology, and market gaps to position you in a niche where fans PAY a premium for exactly what you offer.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Positioning Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Generic Content Gets Generic Results</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              The creator economy is louder than ever, but it is also more crowded. Every day, thousands of new creators go live, post their first set, or launch their first channel. And most of them are making the same mistake: they are trying to appeal to everyone. The result? They appeal to no one.
            </p>
            <p>
              Generic content gets generic engagement. You post a selfie, you get fifty likes. You post another, you get forty. The algorithm does not hate you. It just does not know what to do with you because you have not given it a clear signal. Positioning is not about niching down into obscurity. It is about owning a category so completely that when someone thinks of that specific desire, they think of you.
            </p>
            <p>
              BNE is creator positioning framework starts with psychology, not aesthetics. We probe your subconscious preferences, boundaries, sensory appetite, and relationship energy. We map these against real market data to find the niche that is starving for exactly what you have got. This is not about fitting into a trend. It is about creating a category of one.
            </p>
            <p>
              The creators who command one hundred dollars plus per custom scene, ten thousand dollars plus monthly retainers, and loyal fanbases that follow them across every platform? They did not get there by accident. They got there by positioning. And we are going to help you do the same.
            </p>
            <p>
              There is also the authenticity trap. Many creators believe that being authentic means being generic. They think if they just be themselves, the audience will come. But authenticity without positioning is just anonymity with good intentions. BNE helps you uncover the specific, unconventional, high-value traits that make you unique and then packages them into a position that fans cannot resist.
            </p>
            <p>
              Another overlooked angle is platform authority transfer. You might dominate TikTok but struggle on Twitter/X, or crush on Fansly but get nowhere on Instagram. Positioning is not just about your niche. It is about adapting your core identity to each platform is language and culture while staying unmistakably you. We build cross-platform positioning systems so your brand travels without diluting.
            </p>
            <p>
              And then there is the pricing ceiling. Generic creators charge generic rates because they have never established a premium position. When your positioning is weak, you are forced to compete on price. When it is strong, you compete on exclusivity. BNE positioning unlocks premium pricing by making your offer feel like a category of one that cannot be compared to anything else on the market.
            </p>
            <p>
              Want to see which niches align with your psychology before committing? Our <Link href="/niche-matcher" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">free Niche Matcher</Link> gives you instant clarity on your ideal positioning. For deeper validation, pair it with <Link href="/market-analysis" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">market analysis</Link> to ensure your chosen niche is actually profitable before you invest in full positioning.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Generic Creator to Category of One in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have reverse-engineered the positioning playbook that turns random creators into the undisputed kings and queens of their niche.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Psychology Deep-Dive", desc: "We map your subconscious preferences, boundaries, and unique traits. This is not a quiz. It is a profile.", icon: Target },
              { step: "02", title: "Market Gap Analysis", desc: "We cross-reference your profile against 1,052+ real market segments to find the niche where you are the perfect fit.", icon: BarChart3 },
              { step: "03", title: "Brand Architecture", desc: "We design your visual identity, content pillars, and pricing strategy so you own a category instead of competing in one.", icon: Crown },
              { step: "04", title: "Launch & Dominate", desc: "We deploy your positioning across all platforms with messaging that signals exclusivity and scarcity.", icon: TrendingUp },
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

      {/* Psychology of 6-Figure Niches Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Psychology Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The Psychology of 6-Figure Niches</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Real money lies in the dark, weird corners of the human psyche that fans are too embarrassed to ask their partners for, but will gladly pay a fortune to you for.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/Finding_Your_Freaky__The_Psychology_of_6-Figure_Niches.mp4"}
            title="The Psychology of 6-Figure Niches"
            description="How to position yourself in a niche where fans pay a premium for exactly what you offer."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Are Not Like Other Agencies</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Subconscious Trait Mapping", desc: "We go beyond surface-level quizzes to uncover the subconscious preferences, boundaries, and sensory appetites that make you uniquely monetizable." },
              { icon: Lock, title: "Market Gap Archaeology", desc: "We dig through 1,052+ market segments to find underserved niches where your specific traits command a premium and competition is nonexistent." },
              { icon: Star, title: "Premium Pricing Psychology", desc: "Positioning is worthless if you cannot price for it. We design pricing architectures that make your fans feel like they are buying exclusivity, not content." },
              { icon: TrendingUp, title: "Category-of-One Design", desc: "We do not help you fit into a trend. We help you create a category so distinct that when fans want that specific experience, they think only of you." },
              { icon: Users, title: "Platform Authority Transfer", desc: "Dominating TikTok does not guarantee success on Fansly. We build cross-platform positioning systems that translate your authority without diluting your brand." },
              { icon: Heart, title: "Long-Term Positioning Moat", desc: "Trends fade. Positions endure. We build moats around your brand through proprietary frameworks, exclusive fan relationships, and defensible category ownership." },
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
              { quote: "I was posting generic content to generic audiences. BNE helped me find my true niche and position myself as the go-to creator in that space. My income tripled in 4 months.", name: "Mia R.", revenue: "$30K/mo in 4 months", location: "Texas", stars: 5 },
              { quote: "Positioning sounded like marketing jargon until BNE showed me the psychology behind it. Now I understand exactly why fans pay me and how to attract more of them.", name: "Lexi K.", revenue: "6 figures, positioned", location: "California", stars: 5 },
              { quote: "The niche analysis was mind-blowing. They found a micro-niche I never would have considered that is practically printing money. I am the only big creator in that space.", name: "Sasha M.", revenue: "$15K/mo, zero competition", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Discover Your Ideal Niche in 2 Minutes</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your psychology. No sign-up required, just pure positioning insight. Once you have your match, explore <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">business strategy</Link> to architect the empire around that position.
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Niche Guide</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Niche Mastery Guide</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Download our comprehensive niche mastery guide and start dominating your category today.
            </p>
          </motion.div>
          {nicheGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => setModalOpen(true)}
              className="luxury-card p-8 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Target size={24} />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Niche Mastery Guide</h3>
              <p className="text-zinc-400 text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>Click to view the full guide, includes print and download options.</p>
              <span className="inline-flex items-center gap-2 text-violet-400 text-sm font-semibold">
                View Guide <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          )}
          <InfographicModal url={nicheGuide?.url || "/media-files/Niche_Mastery_Guide.pdf"} title="Niche Mastery Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Creator Positioning</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Tired of Blending Into the Feed?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Let BNE analyze your uniqueness and pair you with a niche that is starving for exactly what you have got. Your category of one is waiting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Claim Your Category
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

