/**
 * BNE Backend Management Page
 * Full expert guide: how backend operations work in adult creator businesses,
 * what BNE manages, why it matters, and detailed how-to breakdowns.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Settings, Shield, Zap, ArrowRight, Users, Lock,
  Headphones, BarChart3, Calendar, DollarSign, Clock,
  CheckCircle, Target, TrendingUp, Database, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const BACKEND_SYSTEMS = [
  {
    icon: Calendar,
    title: "Content Calendar Architecture",
    description: "A professionally built content calendar is the backbone of consistent creator income. We design posting schedules around platform algorithm windows, your audience's peak activity hours (identified through analytics), and your personal creation capacity — so the calendar is actually sustainable, not just optimistic.",
    detail: "Most creators post reactively — when inspiration strikes or when they feel like it. That approach is the single biggest revenue killer in the industry. Platforms algorithmically reward consistency. Subscribers unsubscribe when content delivery is unpredictable. Our calendar systems use a 4-week rolling structure with content categorized by type (subscriber-facing, traffic-driving, PPV-ready, and evergreen) so every piece of content serves a strategic purpose beyond just existing.",
  },
  {
    icon: Users,
    title: "Fan Communication & DM Management",
    description: "We manage subscriber DMs, mass message campaigns, PPV sends, and upsell sequences using trained communication specialists who understand creator voice, fan psychology, and high-ticket conversion.",
    detail: "The average creator converts 18–22% of DM conversations into paid content sales. Our managed accounts consistently run at 45–65% conversion — not through pressure tactics, but through understanding what different fan archetypes respond to, when to offer what, and how to build the emotional connection that makes fans feel valued rather than sold to. We train every communicator on your specific persona before they touch a single message.",
  },
  {
    icon: BarChart3,
    title: "Analytics Tracking & Reporting",
    description: "Monthly performance reports covering subscriber growth, churn, average revenue per subscriber, content performance by type, traffic source effectiveness, and platform-specific KPIs.",
    detail: "Data you don't understand might as well not exist. We translate raw platform analytics into actionable insight — telling you not just what happened, but why, and exactly what to do about it. Our reporting framework tracks 23 distinct KPIs across all active platforms, with benchmarks drawn from our full managed portfolio so you can see how your numbers compare to industry performance at your tier.",
  },
  {
    icon: Settings,
    title: "Platform Configuration & Optimization",
    description: "Account setup, bio optimization, pricing configuration, paywall structure, and platform-specific settings tuned for maximum discoverability and conversion.",
    detail: "Most creators set up their platform page once and never revisit the configuration. That's a mistake — platform algorithms evolve, keyword optimization matters, and pricing needs to be A/B tested over time. We audit every platform setting quarterly and update based on current algorithm behavior and your audience's demonstrated price sensitivity. Small configuration changes have produced 15–40% revenue improvements without any change in content output.",
  },
  {
    icon: DollarSign,
    title: "Revenue Tracking & Tax Preparation",
    description: "Monthly revenue reconciliation across all platforms, categorized income records for tax purposes, quarterly estimated tax calculations, and referrals to creator-specialized accountants.",
    detail: "Self-employment taxes for adult creators are genuinely complex. Different income types (subscriptions, tips, PPV, referral commissions) have different tax implications. Platform 1099s don't always arrive correctly. Business expenses (equipment, props, lingerie, home studio space, software) are deductible but must be documented properly. We set up the financial tracking infrastructure and work with a network of creator-friendly accountants who understand the industry.",
  },
  {
    icon: Shield,
    title: "Compliance & Legal Record-Keeping",
    description: "18 U.S.C. § 2257 record maintenance, DMCA monitoring and takedown filing, identity documentation management, and platform-specific compliance requirements.",
    detail: "Federal law requires adult content producers to maintain specific performer identity records. These records must be kept for 7 years and must be available for inspection. Non-compliance can result in criminal charges. Most independent creators are either not compliant or are barely compliant. We build and maintain airtight 2257 records from day one, conduct quarterly compliance audits, and have filed over 400 DMCA takedowns against piracy sites on behalf of our creators.",
  },
];

const STATS = [
  { value: "73%", label: "of solo creators report admin work cuts into content creation time weekly" },
  { value: "11hrs", label: "average hours per week creators spend on non-content business tasks" },
  { value: "3.4x", label: "average revenue increase for managed creators vs. solo operators at same experience level" },
  { value: "38%", label: "average subscriber churn reduction after professional backend implementation" },
];

const WHAT_WE_DONT_DO = [
  "We never require exclusivity — you always own your business",
  "We never take a percentage of your earnings — flat rate only",
  "We never make content decisions without your approval",
  "We never contact your platforms pretending to be you without authorization",
  "We never share your identity or location with any third party",
];

const faqSchema = buildFaqSchema([
  {
    question: "What does backend management mean for adult creators?",
    answer: "Backend management refers to all the non-content business operations required to run a successful creator account: scheduling, fan communication, platform configuration, analytics tracking, tax preparation, compliance, and DMCA enforcement. It's everything that isn't the actual content creation.",
  },
  {
    question: "Will I lose control of my account if BNE manages my backend?",
    answer: "No. You retain full ownership and access to all your accounts at all times. BNE operates as a silent partner — we handle the administrative layer but all accounts, income, and creative direction remain entirely yours.",
  },
  {
    question: "How does BNE handle fan DMs without sounding like a bot?",
    answer: "We train human communication specialists on your specific persona, communication style, and boundaries before they manage any of your conversations. Every message goes through quality review against your brand voice standards. Fans overwhelmingly can't distinguish managed DMs from creator-written ones when the process is done correctly.",
  },
  {
    question: "How long before I see results from backend management?",
    answer: "Most creators see measurable improvement in subscriber retention and conversion within 30 days. Revenue increases typically become significant by month 2–3 as platform algorithm improvements and audience growth compound.",
  },
]);

export default function BackendManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator Backend Management | Silent Partner Operations — BNE Studio"
        description="BNE Studio manages the complete backend of your creator business: content scheduling, fan DMs, analytics, tax records, 2257 compliance, and platform optimization. You create. We handle everything else."
        canonical="/backend-management"
        schema={faqSchema}
        keywords="creator backend management, OnlyFans management service, adult creator operations, fan DM management, creator compliance, 2257 record keeping"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Settings className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Silent Partner Operations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Backend <span className="text-[oklch(0.78_0.16_85)]">Management</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">You Create. We Run the Business.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              The average independent adult creator spends 11 hours per week on administrative tasks that have nothing to do with content creation. Scheduling. Fan DMs. Tax records. Platform configuration. Compliance paperwork. Analytics. That's 44+ hours a month of your highest-value time going into work you didn't sign up for.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio takes all of it. Our silent partner model means you operate as a creator while we operate as your complete business infrastructure — invisibly, professionally, and without ever requiring you to give up ownership or control.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Let BNE Handle Your Backend <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/tiers">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  View Management Tiers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.value} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[oklch(0.78_0.16_85)] mb-2">{stat.value}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BACKEND MATTERS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5">
              Why Backend Operations Are the Difference Between a Hustle and a Business
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Content quality gets a creator noticed. Backend infrastructure determines whether they stay profitable for months or years. The creators making $10,000–$50,000/month don't just make better content — they have better business systems behind that content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Target,
                title: "Strategic Content Deployment",
                body: "Great content deployed randomly underperforms mediocre content deployed strategically. Platform algorithms reward consistency, timing, and engagement rate — all of which require operational systems, not just creative talent. The creators who know exactly when to post, what type of content to pair with their PPV campaigns, and how to build anticipation through a content cadence are the ones consistently at the top of platform search results and recommendation feeds.",
              },
              {
                icon: TrendingUp,
                title: "Subscriber Retention Economics",
                body: "Acquiring a new subscriber costs 5–7x more than retaining an existing one. Most solo creators focus obsessively on growth while ignoring the subscriber lifecycle management that determines long-term income stability. Churn reduction, renewal reminders, re-engagement sequences, personalized anniversary messages — these operational systems are what separate $3,000/month creators from $15,000/month creators with the same subscriber count.",
              },
              {
                icon: Lock,
                title: "Legal & Financial Infrastructure",
                body: "The adult content industry operates in a complex legal environment. 18 U.S.C. § 2257 compliance is mandatory and criminal penalties apply for violations. Platform payment processing has specific tax reporting requirements. Business entity structure determines your liability exposure. Without proper infrastructure, creators face retroactive tax bills, compliance violations, and financial fragility. These aren't optional concerns — they're fundamental to operating sustainably.",
              },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT BNE MANAGES ── */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">What BNE Manages For You</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every system below is handled end-to-end by our operations team. You stay informed and in control. You don't do the work.</p>
          </motion.div>

          <div className="space-y-6">
            {BACKEND_SYSTEMS.map((sys, i) => (
              <motion.div key={sys.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0 mt-1">
                    <sys.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{sys.title}</h3>
                    <p className="text-slate-300 text-base mb-3 leading-relaxed">{sys.description}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{sys.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE TRANSITION: SOLO TO MANAGED ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 text-center">
              The Managed Creator Transition: What to Expect
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Moving from solo operation to managed infrastructure is a specific process with predictable outcomes at each stage.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { week: "Week 1–2", title: "Audit & Infrastructure Build", body: "Deep audit of all current platforms, accounts, analytics, pricing, compliance status, and content strategy. We build out the backend infrastructure — calendar systems, compliance records, analytics dashboards, DM templates calibrated to your voice." },
              { week: "Week 3–4", title: "System Activation & Calibration", body: "Backend systems go live. DM management begins. Content calendar activates. Analytics tracking initialized. Initial platform optimizations deployed. We monitor results daily and calibrate based on early data signals." },
              { week: "Month 2", title: "Revenue Optimization Layer", body: "With baseline operations stable, we begin aggressive revenue optimization: PPV campaign design, upsell sequence implementation, traffic source diversification, subscriber retention initiatives, and pricing adjustments based on your specific audience's demonstrated price elasticity." },
              { week: "Month 3+", title: "Scale & Compound", body: "Optimized systems compound. Subscriber retention improvements stack. Traffic from managed reddit/social presence builds organic authority. Monthly revenue reporting identifies the next highest-leverage improvement. This is where creators typically see the most dramatic income increases." },
            ].map((phase, i) => (
              <motion.div key={phase.week} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex gap-5 p-6 bg-slate-900/40 border border-slate-800 rounded-xl">
                <div className="shrink-0 w-24 text-[oklch(0.78_0.16_85)] text-sm font-bold text-right mt-0.5">{phase.week}</div>
                <div className="w-px bg-slate-700 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">{phase.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{phase.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DON'T DO ── */}
      <section className="py-16 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold text-white mb-2">Our Non-Negotiables</h2>
            <p className="text-slate-500">Clear boundaries on what BNE will never do</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WHAT_WE_DONT_DO.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I lose control of my accounts?", a: "Never. You maintain full ownership and access to every account. BNE operates with delegated access at the level you authorize — we can't move money, change payment info, or take any action outside your approved scope." },
              { q: "Can I see what's being sent in my DMs?", a: "Yes. You have full transparency into every conversation. We provide daily summary reports and you can review or override any message at any time. Your approval is required for anything outside your established guidelines." },
              { q: "What's the minimum commitment?", a: "We work with a 3-month initial term to allow enough time for backend systems to be built and optimized. Most creators stay significantly longer once they see the operational difference." },
              { q: "How does BNE make money if they don't take a percentage?", a: "Flat monthly subscription fees based on your selected management tier. Our business model is aligned with yours — we succeed when you retain clients long-term, not when you make a single large transaction." },
            ].map((faq, i) => (
              <motion.div key={faq.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Stop Running the Business and Start Just Being the Creator?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8 max-w-2xl mx-auto text-lg">
              Apply for a free consultation. We'll audit your current setup, identify the highest-leverage improvements, and show you exactly what managed backend infrastructure would look like for your specific situation.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Apply for Silent Partnership →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
