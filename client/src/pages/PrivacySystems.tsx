/**
 * BNE Privacy Systems Page
 * Digital identity protection, anonymity, and financial privacy
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
  Shield, Lock, Eye, ArrowRight, Zap, Users, Star, Heart,
  TrendingUp, BarChart3, UserCheck, FileSearch, Globe
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function PrivacySystems() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("The_Invisible_Identity_Digital_Fortress") || getVideoByKeyword("fortress");
  const guide = getInfographicByKeyword("Banking_Privacy_Guide");
  const [modalOpen, setModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Privacy Systems",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Digital identity protection, anonymity, and financial privacy systems for adult content creators. We build a complete digital fortress so your brand stays zero-linked to your real identity.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Identity Protection"
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
        title="Privacy Systems | BNE Agency"
        description="Lock down your digital identity and financial footprint. BNE builds a complete anonymity fortress around your creator brand."
        canonical="/privacy-systems"
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
              <Lock className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                PROTECTION
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Privacy</span>
              <br />
              <span className="gradient-text">Systems</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Your anonymity is non-negotiable. We build a complete digital fortress — anonymous business structures, encrypted email, geo-blocking, and financial privacy shields so your brand stays zero-linked to your real identity.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Privacy Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>One Data Leak Can Ruin Your Life</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              In the adult industry, privacy isn't paranoia — it's survival. Every year, thousands of creators get outed because they trusted the wrong platform, used their real email, or failed to separate their business from their personal life. The consequences are devastating: ruined relationships, blacklisting, doxxing, and in extreme cases, physical danger. A single data breach at a platform you trusted can expose your real name, address, and payment history to the entire internet in minutes.
            </p>
            <p>
              Most creators think "I'll just be careful." But in the age of data breaches, OSINT investigations, and social media sleuthing, careful isn't enough. You need a systematic approach to privacy that covers every vector — from your business registration to your email provider to your banking setup. One weak link and the whole chain collapses. The most common mistake we see? Creators who nailed their social media anonymity but used their real name on a domain registration or LLC filing that's publicly searchable.
            </p>
            <p>
              Financial privacy is the blind spot most creators miss entirely. Even if your social media presence is perfectly anonymized, a single Venmo transaction, a domain WHOIS record, or an LLC filing in your home state can connect your brand to your real identity. Traditional banks don't protect you here — they report everything. BNE's privacy systems include financial privacy shields that route income through privacy-friendly jurisdictions and structures that leave no paper trail connecting your brand to your real name.
            </p>
            <p>
              And the threat landscape is evolving. Deepfake technology means your likeness can be used without your consent. AI scraping tools harvest content from platforms and republish it with your brand attached. Revenge porn databases are shared privately on Telegram and Discord. Even if you did everything right five years ago, the current threat landscape demands a living, breathing privacy system that evolves with emerging risks. That's why our <Link href="/security-measures" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">Security Measures</Link> service works hand-in-hand with privacy — because anonymity without active threat defense is just a slower leak.
            </p>
            <p>
              BNE's privacy systems are built on the principle of zero-knowledge architecture. We design systems where even if one component is compromised, the rest remain secure. Anonymous LLCs in privacy-friendly jurisdictions, encrypted communication stacks, geo-blocking, and financial privacy shields that make it virtually impossible for anyone to connect your brand to your real identity. We don't just set up anonymous structures — we audit them, stress-test them, and maintain them over time so your protection actually holds up when it matters.
            </p>
            <p>
              This isn't fear-mongering. This is protection. The creators who last in this industry aren't the luckiest — they're the most invisible.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Exposed to Invisible in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We've reverse-engineered the privacy playbook that keeps top creators completely anonymous while building massive brands.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Threat Assessment", desc: "We audit your current digital footprint and identify every vulnerability that could link your brand to your identity.", icon: Eye },
              { step: "02", title: "Anonymity Architecture", desc: "We build your anonymous business structure — LLC, email, VOIP, secure passwords, encrypted storage.", icon: Shield },
              { step: "03", title: "Financial Privacy", desc: "We set up privacy-friendly banking, payment routing, and expense tracking that leaves no paper trail.", icon: Lock },
              { step: "04", title: "Ongoing Protection", desc: "We monitor for data leaks, platform breaches, and OSINT exposure. Your privacy is maintained, not just set up.", icon: TrendingUp },
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

      {/* The Invisible Identity Digital Fortress Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Privacy Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The Invisible Identity Digital Fortress</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>An educational guide on building an anonymous business structure that survives scrutiny.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/The_Invisible_Identity_Digital_Fortress.mp4"}
            title="The Invisible Identity Digital Fortress"
            description="Learn how to build an anonymous business structure that survives scrutiny."
          />
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Privacy Is Our Specialty, Not an Afterthought</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Jurisdiction-Specific Anonymity", desc: "We don't use cookie-cutter LLC setups. We select jurisdictions based on your citizenship, operational footprint, and threat model — Wyoming, New Mexico, international privacy havens — and structure accordingly." },
              { icon: Lock, title: "Zero-Knowledge Financial Architecture", desc: "Your income routing is designed so no single entity can see both your brand and your identity. Privacy-friendly payment processors, layered banking, and expense structures that are legally airtight." },
              { icon: FileSearch, title: "OSINT Stress-Testing Before Launch", desc: "Before we declare you invisible, we run our own OSINT investigation on your setup — checking WHOIS, LLC registries, social graph analysis, and metadata trails. If we can find you, so can anyone else. We close those gaps first." },
              { icon: UserCheck, title: "Compartmentalized Identity Layers", desc: "We build separate, non-linked identities for your business presence, financial accounts, communication channels, and personal life. A breach in one layer never exposes the others. True operational security requires real separation." },
              { icon: TrendingUp, title: "Privacy That Grows With Your Revenue", desc: "As your earnings scale, your privacy architecture needs to scale too. We design systems that handle six-figure months without exposing transaction patterns, income volume, or lifestyle signals that could trigger scrutiny." },
              { icon: Shield, title: "Active Breach Monitoring & Response", desc: "Privacy isn't a one-time setup — it's ongoing vigilance. We monitor for data leaks, platform breaches, OSINT exposure, and deepfake misuse. If a breach occurs, we have a documented response protocol to contain the damage immediately." },
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
              { quote: "I was scared someone would find me. BNE built a complete anonymity fortress — LLC, encrypted email, secure banking. 3 years in, zero leaks, total peace of mind.", name: "Mia R.", revenue: "3 years, zero exposure", location: "Texas", stars: 5 },
              { quote: "The privacy systems are military-grade. I operate under a completely separate identity with zero connection to my real life. My family has no idea what I do.", name: "Lexi K.", revenue: "Fully anonymous, 6 figures", location: "California", stars: 5 },
              { quote: "BNE's financial privacy setup means my income goes to accounts my bank can't see. I sleep soundly knowing no paper trail leads back to me.", name: "Sasha M.", revenue: "Zero paper trail", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Test Your Anonymity Readiness</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your privacy needs. Understanding your audience is the first step to protecting yourself.
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
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Privacy Guide</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Banking Privacy Guide</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Download our comprehensive banking privacy guide and secure your financial footprint today.
            </p>
          </motion.div>
          {guide && (
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
                  <Eye size={24} />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Banking Privacy Guide</h3>
              <p className="text-zinc-400 text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>Click to view the full guide — includes print and download options.</p>
              <span className="inline-flex items-center gap-2 text-violet-400 text-sm font-semibold">
                View Guide <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          )}
          <InfographicModal url={guide?.url || "/media-files/Banking_Privacy_Guide.pdf"} title="Banking Privacy Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Privacy Systems</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Lock It Down Before Someone Finds You</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Your anonymity is your most valuable asset. BNE's privacy systems ensure no paper trail leads back to your real identity.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply for Privacy Protection
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
