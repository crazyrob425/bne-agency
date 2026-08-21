/**
 * BNE Make Money Page
 * Comprehensive income strategy playbook detailing six core revenue engines for adult creators:
 * subscription tiering, PPV conversion, DM upsells, clip store syndication, in-person bookings, and affiliate stacking.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  DollarSign, TrendingUp, Zap, Crown, ArrowRight, Shield,
  CheckCircle2, Layers, Repeat, Compass, Key, Sparkles
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const STRATEGIES = [
  {
    icon: DollarSign,
    title: "1. Subscription Empire Architecture",
    desc: "Build tiered subscription stacks that convert casual social media followers into recurring monthly supporters. From $9.99 entry-level paywalls to $999/mo VIP inner-circle access, we engineer the value ladder that moves fans up automatically.",
    metrics: "Top Creators: $15,000 – $85,000+/mo recurring",
    detail: "Subscription income provides baseline cash flow stability. We test initial subscription pricing, design renewal incentives, and build custom multi-tier paywalls so subscribers self-select into their maximum willingness to pay.",
  },
  {
    icon: TrendingUp,
    title: "2. Pay-Per-View (PPV) & Direct Message Engineering",
    desc: "Dynamic pricing, unlock timing, and subscriber-segment targeting that maximizes lifetime customer value. Our data models determine the exact preview clips, price points, and send schedules that convert best for your niche.",
    metrics: "Average Revenue Lift: +45% – +85%",
    detail: "PPV messaging accounts for over half of total income for top creators. We segment subscribers into spending tiers (new subs, active spenders, dormant subs, VIP whales) and deliver tailored PPV drops timed to peak engagement windows.",
  },
  {
    icon: Zap,
    title: "3. 24/7 DM Chat Operations & Upsell Funnels",
    desc: "Automated yet deeply personalized direct message campaigns that re-engage lapsed subscribers and upsell custom content. Native-English chat managers trained on your specific voice, vocabulary, and personal boundaries.",
    metrics: "Reactivation Rate: 18% – 32% of lapsed subs",
    detail: "Subscribers want human connection and personalized attention. Our 24/7 chat teams build genuine emotional rapport while executing ethical sales scripts that turn casual chats into high-ticket custom sales.",
  },
  {
    icon: Crown,
    title: "4. Content Licensing & Clip Store Syndication",
    desc: "Package your full-length video catalog for long-tail sales across clip store sites (ManyVids, Clips4Sale, iWANTFC). We handle metadata tagging, trailer editing, licensing rights, and § 2257 compliance so you collect passive income.",
    metrics: "Passive Share: 15% – 30% of gross revenue",
    detail: "Every video set you produce is a long-term revenue asset. By syndicating your catalog across global clip stores, we turn past video shoots into passive recurring income streams that pay out for years.",
  },
  {
    icon: Shield,
    title: "5. In-Person & Companion Booking Systems",
    desc: "Structured pricing, vetting, and safety protocols for high-ticket in-person sessions, city tours, and duo partnerships. Verified classified advertising, VOIP phone masking, and real-time safety dispatch through the BNE ecosystem.",
    metrics: "Event ROI: 3x – 8x standard online rates",
    detail: "In-person companion work offers the highest per-hour rates in the industry ($1,000–$2,500+/hr). BNE provides a complete safety firewall: corporate screening, deposit collection, VOIP call handling, and safety tracking.",
  },
  {
    icon: ArrowRight,
    title: "6. Cross-Creator Affiliate & Promo Stacking",
    desc: "Cross-promotion networks, creator collaborations, and affiliate referral engines that compound your organic reach. We build referral infrastructure so complementary creators drive targeted traffic directly to your paywall.",
    metrics: "Referral Income: 8% – 20% of net growth",
    detail: "Collaborating with creators in adjacent sub-niches expands your audience rapidly. We negotiate fair cross-promo drops, set up tracking referral links, and co-market joint content sets.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "How many revenue streams should an adult creator run?",
    answer: "Top creators run all 6 core revenue engines: subscription tiers, PPV messaging, 24/7 DM upsells, clip store syndication, in-person bookings, and cross-creator referrals.",
  },
  {
    question: "How long before these revenue strategies yield results?",
    answer: "Most creators observe a 25% to 50% increase in gross monthly revenue within 30 to 60 days of implementing BNE's structured revenue engines.",
  },
  {
    question: "Does BNE take a percentage of these 6 revenue streams?",
    answer: "No. BNE operates strictly on transparent, flat-rate monthly partnership tiers. You keep 100% of your earnings across all platforms.",
  },
  {
    question: "Can I start with online revenue streams before doing in-person work?",
    answer: "Absolutely. In-person booking is 100% optional. Many of our highest-earning creators operate exclusively online.",
  },
]);

export default function MakeMoney() {
  const econProfessor = getProfessorByExpertise("monetization revenue economics");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Adult Creator Revenue Playbook | How to Make Money with BNE Studio"
        description="Master the 6 core revenue engines for adult content creators: subscription tiering, PPV messaging, 24/7 DM chat sales, clip store syndication, companion booking, and affiliate stacking."
        canonical="/makemoney"
        schema={faqSchema}
        keywords="how to make money on OnlyFans, adult content revenue streams, creator income playbook, PPV messaging optimization, creator business model"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <DollarSign className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">The Revenue Playbook</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Make <span className="text-[oklch(0.78_0.16_85)]">Money</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">The 6 Core Revenue Engines for Adult Creators.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Relying on a single subscription page is like running a business with only one product on the shelf. The creators clearing 5-figure and 6-figure monthly incomes operate an interconnected system of six distinct revenue engines.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio designs, builds, and manages all six engines for your business. We handle the pricing models, paywalls, DM chat sales, clip syndication, and screening firewalls — so you can focus entirely on creating incredible content.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Deploy These Revenue Engines <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/monetization">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  Monetization Architecture
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 REVENUE ENGINES ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The Six BNE Revenue Engines</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every BNE managed creator deploys all six engines to build a resilient, high-profit business empire.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STRATEGIES.map((strategy, i) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <strategy.icon size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{strategy.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{strategy.desc}</p>
                </div>
                <div>
                  <span className="text-emerald-400 text-xs font-semibold block mb-3">{strategy.metrics}</span>
                  <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-800/60">{strategy.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Creator Economics & Monetization</div>
          <AuthorBio professor={econProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Creators Say About BNE Revenue Strategies"
        subtitle="Real stories from independent creators who multiplied their monthly income with BNE's 6 revenue engines."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Which revenue engine should I set up first?", a: "We begin by optimizing your primary subscription paywall and PPV messaging funnel, as these generate the fastest initial cash flow returns." },
              { q: "Do I have to do all 6 revenue engines?", a: "In-person companion booking is 100% optional. The 5 online revenue engines can be deployed for any creator." },
              { q: "How does BNE handle payment splits?", a: "BNE charges zero revenue split. You pay a transparent flat monthly rate for management services while keeping 100% of gross earnings." },
              { q: "How do I get started?", a: "Submit an application at blacklisted.studio/apply for a free confidential consultation and account revenue audit." },
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Build All 6 Revenue Engines?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Apply to BNE Studio today and let our team build your custom multi-stream revenue architecture.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Deploy Revenue Engines Now →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
