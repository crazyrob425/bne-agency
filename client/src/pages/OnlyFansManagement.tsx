/**
 * OnlyFans Management Hub Page
 * Dedicated vertical landing page for OnlyFans (and fan-platform) creators.
 * SEO entry point — intentionally not linked from main navigation.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import TestimonialsSection from "@/components/TestimonialsSection";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Crown, MessagesSquare, CalendarClock, DollarSign, ShieldCheck, TrendingUp,
  ArrowRight, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const OF_PILLARS = [
  {
    icon: Crown,
    title: "1. Niche Positioning & Brand Architecture",
    href: "/niche-matcher",
    description: "We place your OnlyFans in a profitable sub-niche using our 1,052-segment market database — so you stop competing on price and start commanding premium subscriptions.",
    detail: "Sub-niche creators see 4.2x higher subscriber retention than generic accounts. Positioning is the highest-leverage move on the platform.",
  },
  {
    icon: MessagesSquare,
    title: "2. 24/7 DM & Chat Operations",
    href: "/services",
    description: "Trained chatters run your inbox around the clock: welcome sequences, PPV drops, upsell ladders, and expired-subscriber win-back campaigns — in your voice.",
    detail: "DMs drive 55%+ of gross revenue for managed creators. An unmanned inbox is the single biggest leak on OnlyFans.",
  },
  {
    icon: CalendarClock,
    title: "3. Content Systems & Release Calendars",
    href: "/posting-and-scheduling",
    description: "A 30-day content queue built in weekly batch sessions. Scheduled PPV drops, teaser funnels, and vault repurposing keep the page active while you live your life.",
    detail: "Consistency beats intensity. Our creators publish on rails — no more 2 AM 'I should post something' panic.",
  },
  {
    icon: DollarSign,
    title: "4. Pricing & Monetization Engineering",
    href: "/monetization-systems",
    description: "Subscription tiers, PPV price ladders, tip menus, and custom-content rate cards engineered from spending-cohort data — not guesswork.",
    detail: "Most creators underprice by 30-50%. We test price elasticity and build offers for every spending tier, from casual fans to whales.",
  },
  {
    icon: ShieldCheck,
    title: "5. 2257 Compliance & Privacy Shield",
    href: "/2257-compliance",
    description: "Federal record-keeping handled properly, anonymous LLC structures, DMCA takedown operations, and full compartmentalization of your real identity.",
    detail: "Compliance failures and leaks end careers. We run the unsexy legal infrastructure so one mistake can't erase your business.",
  },
  {
    icon: TrendingUp,
    title: "6. Traffic & Audience Growth",
    href: "/traffic-strategy",
    description: "Reddit, X, TikTok, and Instagram funnel systems engineered to convert scrollers into paying subscribers — with tracking on every channel.",
    detail: "Traffic without conversion tracking is gambling. We know exactly which posts produce subscribers and double down on what works.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "OnlyFans Management",
  "provider": {
    "@type": "Organization",
    "name": "B.N.E. Studio"
  },
  "description": "Full-service OnlyFans management: niche positioning, 24/7 DM operations, content systems, pricing engineering, 2257 compliance, and traffic growth for fan-platform creators.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "OnlyFans Management Services",
    "itemListElement": OF_PILLARS.map(s => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
    }))
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "Does BNE Studio take a percentage of my OnlyFans earnings?",
    answer: "Our standard management partnership is percentage-based: nothing upfront, and we only earn when you earn. If you'd rather keep 100% of everything you make, flat-rate advisory and marketing packages are available instead.",
  },
  {
    question: "Which fan platforms do you manage besides OnlyFans?",
    answer: "OnlyFans is our core platform, and the same systems extend to Fansly, ManyVids, Clips4Sale, and other fan platforms. One backend runs your entire fan business.",
  },
  {
    question: "Do I keep control of my OnlyFans account?",
    answer: "Yes — full ownership, always. We operate under your direction with transparent reporting. You can see everything we do and revoke access at any time.",
  },
  {
    question: "How fast will I see results from OnlyFans management?",
    answer: "Management systems are typically live within 14 days of onboarding. Revenue ramp varies by starting point, but most partners see meaningful lift within 60–90 days as positioning, DMs, and traffic systems compound.",
  },
]);

export default function OnlyFansManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="OnlyFans Management Agency — Scale Your Fan Business | BNE Studio"
        description="BNE Studio is the silent operations partner for OnlyFans creators: niche positioning, 24/7 DM operations, content systems, pricing engineering, 2257 compliance, and traffic growth."
        canonical="/onlyfans-management"
        schema={[serviceSchema, faqSchema]}
        keywords="onlyfans management agency, onlyfans manager, onlyfans growth agency, fan platform management, onlyfans chatters, onlyfans marketing"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">OnlyFans Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              OnlyFans, Run Like <span className="gradient-text-gold">a Business</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              You create the content. We run everything else — positioning, 24/7 DMs, content calendars,
              pricing, compliance, and traffic. The silent operations team behind serious OnlyFans empires.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Apply for Partnership <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3.5 text-sm border border-slate-700 rounded-full text-slate-300 hover:border-slate-500 transition-colors">
                  Compare Partnership Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 PILLARS GRID ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">What We Operate</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">The 6 Systems Behind Every Managed Account</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OF_PILLARS.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div key={sol.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={sol.href}>
                    <div className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl h-full group cursor-pointer hover:border-violet-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                          <Icon className="h-6 w-6 text-violet-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-violet-300 transition-colors font-display">{sol.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{sol.description}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-800/80 mb-4">{sol.detail}</p>
                        <div className="text-xs font-semibold text-violet-400 flex items-center gap-1 group-hover:underline">
                          Explore System →
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLATFORM NOTE ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">OnlyFans-First. Not OnlyFans-Only.</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Our systems are engineered around OnlyFans because that's where the revenue is —
            but the same backend runs your Fansly, ManyVids, and clip-store presence.
            One operations team, every fan platform, zero extra headcount for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["OnlyFans", "Fansly", "ManyVids", "Clips4Sale", "AVN Stars"].map(p => (
              <span key={p} className="px-4 py-1.5 text-xs font-semibold rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Managed Creators Say"
        subtitle="Real feedback from fan-platform creators running on BNE infrastructure."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Does BNE take a percentage of my earnings?", a: "Our standard management partnership is percentage-based: nothing upfront, and we only earn when you earn. If you'd rather keep 100% of everything you make, flat-rate advisory and marketing packages are available instead." },
              { q: "I'm already doing okay solo. Why would I need management?", a: "Solo creators hit a ceiling around the hours they can work. Management removes the ceiling: 24/7 inbox coverage, systematic traffic, and pricing built on data instead of instinct." },
              { q: "Will my subscribers know I have a team?", a: "No. Chatters are trained in your voice, on your boundaries, with your approval workflows. To your fans, it's always you." },
              { q: "What do you need from me to start?", a: "Apply for a free confidential consultation. We audit your accounts, identify the leaks, and propose the exact systems for your situation." },
            ].map((faq, i) => (
              <div key={faq.q} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Running Your Business Alone</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and put a silent operations team behind your OnlyFans.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}