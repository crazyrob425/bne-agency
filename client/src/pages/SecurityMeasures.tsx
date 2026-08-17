/**
 * BNE Security Measures Page
 * Threat protection, scam defense, and operational security
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
  Shield, Lock, AlertTriangle, ArrowRight, Eye, Zap, Building2,
  TrendingUp, Star, Users, Heart, BarChart3, Siren, ScanSearch,
  PhoneCall
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function SecurityMeasures() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Surviving_the_Scammers_in_Adult_Entertainment") || getVideoByKeyword("scammers");
  const fortressVideo = getVideoByKeyword("The_Professional_Fortress");
  const guide = getInfographicByKeyword("Safety_First_—_In-Person_Guide");
  const [modalOpen, setModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Security Measures",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Threat protection, scam defense, and operational security for adult content creators. We build multi-layer security protocols so you can operate fearlessly.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Security & Threat Protection"
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
        title="Security Measures | BNE Agency"
        description="Protect your creator business from scams, doxxing, and bad actors. BNE builds multi-layer security protocols so you can operate fearlessly."
        canonical="/security-measures"
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
              <AlertTriangle className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                PROTECTION
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Security</span>
              <br />
              <span className="gradient-text">Measures</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              The adult industry is filled with scammers, bad actors, and digital predators. We build a multi-layer security protocol around your brand so you can create with confidence, not fear.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Security Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>The Adult Industry Is a Minefield of Scams and Predators</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              If you're a creator in the adult industry, you're a target. Not because you're doing anything wrong, but because predators know you're vulnerable. you're vulnerable because you need clients, fans, or collaborators — and that need makes you susceptible to manipulation, fraud, and worse. The adult industry has no shortage of people willing to exploit that vulnerability for financial gain, personal gratification, or both.
            </p>
            <p>
              Every year, we hear horror stories: creators getting scammed out of thousands by fake booking agencies, doxxed by jealous exes or disgruntled fans, blackmailed with deepfakes, or worse. The industry doesn't talk about it enough because there's stigma, but the threat is very real. What makes these stories even more painful is that most of them were preventable. The scammer used a fake ID. The deepfake was traceable to a specific source. The "client" had a documented history of the same behavior with other creators.
            </p>
            <p>
              The problem isn't that creators are careless — it's that the tools to protect themselves are scattered, expensive, or nonexistent. Basic antivirus software won't catch a social engineering attack. A VPN won't stop a determined doxxer. Instagram's report button doesn't prevent a deepfake from being shared on Telegram before it's taken down. Most security advice online is written for corporate IT departments, not independent creators navigating a uniquely hostile environment.
            </p>
            <p>
              This is where BNE's security measures come in. We''ve built a multi-layer security protocol specifically for adult content creators — covering digital identity protection, financial transaction security, client vetting integration, and physical safety planning. We combine proactive threat intelligence with reactive incident response, so you're not just protected against known threats but prepared for emerging ones. And because security and vetting are inseparable, our system works hand-in-hand with our <Link href="/screening-systems" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">Screening Systems</Link> — because the best defense is preventing the wrong people from ever reaching you in the first place.
            </p>
            <p>
              BNE's security measures go beyond basic antivirus and "don't share personal info." We build multi-layer security protocols that cover digital identity, financial transactions, client vetting, and physical safety. We teach you to recognize red flags before they become threats. We build systems that make you a hard target — the kind of creator that scammers move past because the ROI isn't worth the effort.
            </p>
            <p>
              Your safety is the bottom line. We don't just talk about security — we live it, every single day, for every single client.
            </p>
          </div>
        </div>
      </section>
      {/* Context / Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Security Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>The Adult Industry Is a Minefield of Scams and Predators</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              If you are a creator in the adult industry, you are a target. Not because you are doing anything wrong, but because predators know you are vulnerable. You are vulnerable because you need clients, fans, or collaborators — and that need makes you susceptible to manipulation, fraud, and worse. The adult industry has no shortage of people willing to exploit that vulnerability for financial gain, personal gratification, or both.
            </p>
            <p>
              Every year, we hear horror stories: creators getting scammed out of thousands by fake booking agencies, doxxed by jealous exes or disgruntled fans, blackmailed with deepfakes, or worse. The industry does not talk about it enough because there is stigma, but the threat is very real. What makes these stories even more painful is that most of them were preventable. The scammer used a fake ID. The deepfake was traceable to a specific source. The "client" had a documented history of the same behavior with other creators.
            </p>
            <p>
              The problem is not that creators are careless — it is that the tools to protect themselves are scattered, expensive, or nonexistent. Basic antivirus software will not catch a social engineering attack. A VPN will not stop a determined doxxer. Instagram's report button does not prevent a deepfake from being shared on Telegram before it is taken down. Most security advice online is written for corporate IT departments, not independent creators navigating a uniquely hostile environment.
            </p>
            <p>
              This is where BNE's security measures come in. We have built a multi-layer security protocol specifically for adult content creators — covering digital identity protection, financial transaction security, client vetting integration, and physical safety planning. We combine proactive threat intelligence with reactive incident response, so you are not just protected against known threats but prepared for emerging ones. And because security and vetting are inseparable, our system works hand-in-hand with our <Link href="/screening-systems" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">Screening Systems</Link> — because the best defense is preventing the wrong people from ever reaching you in the first place.
            </p>
            <p>
              BNE's security measures go beyond basic antivirus and "do not share personal info." We build multi-layer security protocols that cover digital identity, financial transactions, client vetting, and physical safety. We teach you to recognize red flags before they become threats. We build systems that make you a hard target — the kind of creator that scammers move past because the ROI is not worth the effort.
            </p>
            <p>
              Your safety is the bottom line. We do not just talk about security — we live it, every single day, for every single client.
            </p>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Fear-Based to Fearless in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have mapped the exact security framework that turns vulnerable creators into impenetrable brands.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Threat Assessment", desc: "We audit your current security posture and identify every vulnerability — digital, financial, and physical.", icon: AlertTriangle },
              { step: "02", title: "Protocol Deployment", desc: "We implement multi-layer security: identity protection, financial shields, and scam detection systems.", icon: Shield },
              { step: "03", title: "Vetting Systems", desc: "We build client screening workflows that filter out bad actors before they ever reach your calendar.", icon: Eye },
              { step: "04", title: "Ongoing Monitoring", desc: "We monitor for new threats, platform breaches, and scam trends. Your security evolves, it does not stagnate.", icon: Lock },
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

      {/* Surviving the Scammers Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Threat Intelligence</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Surviving the Scammers in Adult Entertainment</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Learn to identify and avoid the most common scams targeting adult entertainers.</p>
          </div>
          <VideoPlayer
            src={video?.url || "/media-files/Surviving_the_Scammers_in_Adult_Entertainment.mp4"}
            title="Surviving the Scammers in Adult Entertainment"
            description="How to identify and avoid the most common scams targeting adult entertainers."
          />
        </div>
      </section>

      {/* Professional Fortress Video */}
      {fortressVideo && (
        <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Brand Protection</span>
              <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The Professional Fortress</h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Build an impenetrable professional identity that withstands scrutiny and protects your brand at every level.</p>
            </div>
            <VideoPlayer
              src={fortressVideo.url}
              title={fortressVideo.title}
              description={fortressVideo.description}
            />
          </div>
        </section>
      )}
      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Security Built By People Who Know the Threats</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Siren, title: "Real-Time Threat Intelligence", desc: "We do not wait for news stories to tell you about new scams. Our team monitors underground forums, Telegram channels, and industry networks to identify emerging threats before they reach mainstream awareness." },
              { icon: ScanSearch, title: "Proprietary Scam Pattern Library", desc: "We have documented hundreds of scam variations specific to the adult industry — fake booking agencies, payment fraud rings, deepfake blackmail networks, and social engineering playbooks. Your protection draws from this live intelligence database." },
              { icon: PhoneCall, title: "Law Enforcement Interaction Protocol", desc: "If you are ever approached by law enforcement, the wrong move can destroy your business or your freedom. We train you on how to handle these encounters legally and safely — including what to say, what not to say, and when to contact us immediately." },
              { icon: Shield, title: "Multi-Layer Digital and Physical Security", desc: "Most security providers cover one or the other. We cover both. From encrypted digital infrastructure to physical safety planning for in-person meetings, your protection is holistic and coordinated — not a collection of disconnected tools." },
              { icon: TrendingUp, title: "Scam ROI Threshholding", desc: "We make you a hard target. Scammers operate on ROI — if the effort to scam you exceeds the expected payout, they move on. Our security protocols raise your scam cost so high that bad actors rationally choose easier targets elsewhere." },
              { icon: Eye, title: "Active Monitoring, Not Just Setup", desc: "A firewall installed today is useless against tomorrow''s threat. We continuously monitor for new scam vectors, platform vulnerabilities, and behavioral red flags. Your security posture adapts to the threat landscape in real time." },
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
              { quote: "I was scammed out of $2,000 by a fake booking agency before I found BNE. Now I have vetting systems that would have caught them immediately. Never again.", name: "Mia R.", revenue: "Zero scams since BNE", location: "Texas", stars: 5 },
              { quote: "The security protocols BNE built around my brand are insane. Multi-factor, encrypted everything, vetted clients only. I feel invincible.", name: "Lexi K.", revenue: "Fully protected, 6 figures", location: "California", stars: 5 },
              { quote: "BNE's threat monitoring caught a doxxing attempt before it went public. They have my back in ways I did not even know I needed. Worth every penny.", name: "Sasha M.", revenue: "Doxxing prevented", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Test Your Security Readiness</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Take our free Niche Matcher quiz to see which niches align with your security needs. Understanding your audience is the first step to staying safe.
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
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Safety Guide</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Safety First: In-Person Guide</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Download our comprehensive in-person safety guide for creators who meet clients or collaborators face-to-face.
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
                  <Shield size={24} />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Safety First: In-Person Guide</h3>
              <p className="text-zinc-400 text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>Click to view the full guide — includes print and download options.</p>
              <span className="inline-flex items-center gap-2 text-violet-400 text-sm font-semibold">
                View Guide <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          )}
          <InfographicModal url={guide?.url || "/media-files/Safety_First_—_In-Person_Guide.pdf"} title="Safety First: In-Person Guide" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Security Measures</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Your Safety Is Non-Negotiable</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>BNE's security protocols protect your identity, your income, and your peace of mind. Apply to get protected today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Get Security Protection
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