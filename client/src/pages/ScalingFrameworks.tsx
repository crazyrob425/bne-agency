/**
 * BNE Scaling Frameworks Page
 * Operational scaling methodologies for elite creator empires
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
  TrendingUp, BarChart3, ArrowRight, Zap, Shield, Users, Crown,
  Eye, Lock, Star, MessageSquare, Settings, Target, Heart,
  Smartphone, Layers, Monitor, Video, DollarSign, ShoppingBag,
  Briefcase, CreditCard, Gamepad2, Camera, HelpCircle, Gauge, Network, Workflow
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function ScalingFrameworks() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const scaleVideo = getVideoByKeyword("The_Agency_Scale_Methodology") || getVideoByKeyword("scale") || getVideoByKeyword("methodology") || getVideoByKeyword("agency");
  const infographic = getInfographicByKeyword("Scaling_and_Securing_Content_Brands");
  const [modalOpen, setModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Scaling Frameworks",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Operational scaling frameworks that turn solo creator profiles into managed business empires with automated revenue systems, native-English chatting squads, and multi-platform distribution funnels.",
    "areaServed": "Worldwide",
    "serviceType": "Creator Business Scaling"
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
        title="Scaling Frameworks | BNE Agency"
        description="Discover BNE operational scaling frameworks designed to grow creator empires while reducing labor and maximizing passive revenue."
        canonical="/scaling-frameworks"
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
                EMPIRE ARCHITECTURE
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Scaling</span>
              <br />
              <span className="gradient-text">Frameworks</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              Stop selling your time for pennies. Discover the automation systems, native-English chatting squads, and multi-platform distribution funnels that turn your creator profile into an automated ATM.
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
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Scaling Problem</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Why Most Creators Hit a Ceiling and Stay There</h2>
          </motion.div>
          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <p>
              Here is the brutal truth most gurus will not tell you: the creator economy is designed to keep you trading hours for dollars. You post more, you chat more, you edit more, and somehow you are still making the same two to five thousand dollars a month that barely covers your bills. The math does not scale because you are the bottleneck. Every message you answer personally is a message that should be handled by a trained squad. Every post you schedule manually is a post that should run on autopilot. You are not building a business. You are building a prison where you are both the warden and the inmate.
            </p>
            <p>
              The agencies that promise to grow your account are usually just hiring more cheap labor and taking a bigger cut of your revenue. They do not build systems. They add headcount. And when you are paying thirty to fifty percent of your income for the privilege of having someone else post your content, you have not scaled. You have just outsourced your prison. The real question is at what point does the marginal cost of another hire exceed the marginal revenue they bring in. For most creators working with traditional agencies, that break-even point never arrives.
            </p>
            <p>
              BNE's scaling frameworks are fundamentally different. We do not hire more people to do what you could do. We build the infrastructure, automated revenue streams, native-English chatting squads, content repurposing workflows, and multi-platform distribution funnels that make your brand operate like a business, not a hobby. Your time becomes your most valuable asset instead of your most exploited one. We engineer the business so that removing you from daily operations actually increases performance, not decreases it.
            </p>
            <p>
              Think about it. The top one percent of creators are not working eighty-hour weeks. They have built engines that run while they sleep. Subscription renewals, PPV drops, tip menus, and fan engagement all happen on autopilot. The difference between a five thousand dollar per month creator and a fifty thousand dollar per month creator is not talent. It is architecture. It is the difference between a guy selling lemonade on the sidewalk and a franchise with a supply chain, distribution network, and brand recognition. One is a job. The other is an empire.
            </p>
            <p>
              But here is what they do not tell you in the success porn: scaling without strategy is just faster failure. You can automate a broken funnel, but it will still be broken, just faster. That is why our scaling frameworks are always paired with <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">strategic brand architecture</Link> and <Link href="/revenue-optimization" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">revenue optimization</Link>. We make sure the machine you are building is actually pointed in the right direction before we hand you the keys.
            </p>
            <p>
              The automation paradox is real: most creators who try to scale simply automate a broken system. They buy chatbots, schedule posts, and hire chatters, but none of it works because the underlying strategy is flawed. BNE never automates first. We diagnose the entire revenue architecture, fix the leaks, and only then layer automation on top of a solid foundation. This is why our clients see compounding returns instead of the same broken funnel on a bigger budget.
            </p>
            <p>
              There is also the team composition trap. Generic agencies throw a handful of underpaid chatters at your account and call it a team. Real scaling requires a proper org chart: strategists who understand market shifts, ops managers who keep the trains running, chatters trained on your exact voice, and analytics specialists who spot trends before they become obvious. BNE builds that squad for you, not as an afterthought, but as the core of the operation.
            </p>
            <p>
              Finally, consider the opportunity cost. Every hour you spend on manual posting, replying to DMs, or editing content is an hour you are not spending on strategy, partnerships, or brand evolution. The creators who treat time as their most precious resource are the ones who build lasting empires. BNE frameworks give you back that time by design. We build the engine so you can stop being the fuel.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Solo Creator to Automated Empire in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have reverse-engineered the exact playbook that turns $5K/month creators into $50K+ empires. No fluff, no theory, just battle-tested systems.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Revenue Audit", desc: "We map every income stream, identify leaks, and quantify your scaling potential. No guesswork, just data.", icon: BarChart3 },
              { step: "02", title: "System Deployment", desc: "We deploy automated DM funnels, PPV schedulers, and content repurposing workflows tailored to your niche.", icon: Settings },
              { step: "03", title: "Team Assembly", desc: "We recruit, train, and manage native-English chatters and ops staff so you never have to lift a finger.", icon: Users },
              { step: "04", title: "Scale & Optimize", desc: "We monitor KPIs weekly, pivot underperforming channels, and compound wins until your revenue runs on autopilot.", icon: TrendingUp },
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
            src={scaleVideo?.url || "/media-files/The_Agency_Scale_Methodology.mp4"}
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
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Build Engines, Not Just Hire Hands</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Workflow, title: "Automation After Strategy", desc: "We never automate a broken funnel. Every system we deploy is built on a solid strategic foundation so automation compounds your results instead of accelerating your failure." },
              { icon: Network, title: "Platform Algorithm Immunity", desc: "Multi-platform distribution funnels mean you are never hostage to a single algorithm change. We build ecosystems that survive the next Twitter rename, TikTok ban, or Instagram shadowban." },
              { icon: Users, title: "Squad Economics", desc: "Our chat and ops teams are trained on your brand voice, conversion psychology, and escalation protocols. They do not just post. They pre-sell, qualify, and retain on your behalf." },
              { icon: Gauge, title: "Real-Time KPI Dashboards", desc: "Weekly metric reviews with transparent dashboards tracking revenue-per-hour, churn rate, and engagement velocity. No vanity metrics, no fluff, no surprises." },
              { icon: Settings, title: "Revenue Compound Architecture", desc: "We design income streams that feed each other: subs, PPV, tips, affiliates. Each stream compounds the others into a flywheel that grows without proportional labor." },
              { icon: Shield, title: "Irrelevance Guarantee", desc: "Our north star metric is your irrelevance to daily operations. If removing you from the day-to-day tanked performance, we have not finished the job. Your empire should run while you sleep." },
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
              { quote: "I was sleeping on my couch posting random pics making $200/month. BNE found my niche, built my brand, and 90 days later I was hitting $8K. Now I make $45K/month on autopilot.", name: "Mia R.", revenue: "$45K/mo in 90 days", location: "Texas", stars: 5 },
              { quote: "I thought scaling meant working harder. BNE proved it means working smarter. They built the systems, hired the team, and my income doubled while my hours dropped by 60%.", name: "Lexi K.", revenue: "6 figures, 10 hrs/week", location: "California", stars: 5 },
              { quote: "The automation they set up is insane. I post once a week, the team handles everything else, and I make more than my old corporate job combined. BNE did not just scale my brand. They gave me my life back.", name: "Sasha M.", revenue: "$12K/mo combined", location: "Florida", stars: 5 },
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
            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Test Your Scaling Potential First</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              Before you invest in full implementation, take our free Niche Matcher quiz. It will show you exactly which scaling path makes sense for your current situation and whether you are ready to level up. For deeper insights on whether your current revenue streams are structured correctly, check out our <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">business strategy frameworks</Link>.
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
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Framework Guide</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Scaling & Securing Content Brands</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Download our comprehensive framework guide that walks through the exact systems we deploy for creator scaling, from automation stacks to team management playbooks.
            </p>
          </motion.div>
          {infographic && (
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
                  <BarChart3 size={24} />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Scaling & Securing Content Brands</h3>
              <p className="text-zinc-400 text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>Click to view the full framework guide, includes print and download options.</p>
              <span className="inline-flex items-center gap-2 text-violet-400 text-sm font-semibold">
                View Guide <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          )}
          <InfographicModal url={infographic?.url || "/media-files/Scaling_and_Securing_Content_Brands.pdf"} title="Scaling & Securing Content Brands" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Scaling</h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Ready to Fire Your Worst Employee?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Your worst employee is you, working twelve-hour days on tasks that should be automated. BNE builds the engine so you can stop being the fuel. Spots are limited this quarter.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Build Your Empire Engine
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
