/**
 * BNE Find Your Niche — long-form overview of the niche discovery methodology.
 * Explains why niche selection matters, how the analysis works, and what
 * creators get from the Niche Matcher engine.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Zap, Target, TrendingUp, Users, BarChart3, Compass,
  ArrowRight, Crown, CheckCircle2, Search, DollarSign, Layers,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SeoFaq from "@/components/seo/SeoFaq";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const DIMENSIONS = [
  {
    icon: Users,
    title: "Competition Density",
    description:
      "How crowded is the segment? We measure active creators, content saturation, and the difficulty of breaking into the top tier — so you don't spend two years fighting for scraps in an oversaturated market.",
  },
  {
    icon: DollarSign,
    title: "Spending Power",
    description:
      "How much does the audience actually spend? Some niches have ten times the fans with a tenth of the spending power. We score each segment on average revenue per fan, tip frequency, and custom-content demand.",
  },
  {
    icon: TrendingUp,
    title: "Growth Trajectory",
    description:
      "Where is the segment heading? We track search interest curves, platform algorithm shifts, and emerging sub-niches — positioning you ahead of the wave instead of chasing it after it crests.",
  },
  {
    icon: Target,
    title: "Personal Fit",
    description:
      "Can you sustain this for years? The best niche on paper is worthless if performing in it drains you. We map your traits, boundaries, skills, and energy against each segment's demands.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "The Assessment",
    description:
      "A structured questionnaire covering your traits, skills, boundaries, content preferences, and business goals. Not a personality quiz — a data intake engineered to capture the variables that actually predict niche success.",
  },
  {
    step: "02",
    title: "The Analysis",
    description:
      "Your profile is scored against 1,052 distinct creator market segments across four dimensions: competition, spending power, growth, and fit. Each segment gets a composite score weighted to your specific situation.",
  },
  {
    step: "03",
    title: "Your Matches",
    description:
      "You receive ranked matches with detailed breakdowns: why each niche fits, what the competition looks like, what the audience spends, and the specific positioning angle that gives you an edge.",
  },
  {
    step: "04",
    title: "The Roadmap",
    description:
      "Matches include actionable next steps — content pillars for the niche, pricing benchmarks, platform recommendations, and the 90-day launch sequence to establish your position.",
  },
];

const FAQS = [
  {
    question: "Why does niche selection matter so much?",
    answer:
      "Niche selection is the highest-leverage decision a creator makes. The right niche means less competition, higher-paying fans, and algorithmic tailwinds. The wrong niche means years of grinding in an oversaturated market where even great content struggles. Sub-niche creators see 4.2x higher subscriber retention than generic accounts.",
  },
  {
    question: "How is this different from a 'find your passion' quiz?",
    answer:
      "Passion quizzes ask what you like. The Niche Matcher asks what the market rewards and where you specifically can win. It evaluates 1,052 market segments on competition density, audience spending power, growth trajectory, and personal fit — then ranks them by expected return for your profile.",
  },
  {
    question: "What if I'm already in a niche?",
    answer:
      "Run the analysis anyway. Many creators discover they're in a adjacent-but-suboptimal segment — close enough to feel right, far enough to cap their earnings. The Matcher often reveals a pivot of just a few degrees that unlocks dramatically better economics.",
  },
  {
    question: "Is the Niche Matcher free?",
    answer:
      "Yes. The core Niche Matcher analysis is free — it's the entry point to BNE's ecosystem. Deeper intelligence (audience profiles, market timing analysis) is available through the Solutions division.",
  },
];

export default function FindYourNiche() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://blacklisted.studio/find-your-niche",
        name: "Find Your Niche — Data-Driven Creator Market Matching",
        description:
          "Discover your most profitable creator niche with BNE's Niche Matcher: 1,052 market segments analyzed across competition, spending power, growth, and fit.",
        url: "https://blacklisted.studio/find-your-niche",
        isPartOf: { "@type": "WebSite", name: "Blacklisted Niche Entertainment", url: "https://blacklisted.studio" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo pageKey="find-your-niche" schema={schema} />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.16_85/8%),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[oklch(0.78_0.16_85)] mb-6">
              <Compass size={14} /> Niche Intelligence
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Your Niche Is a Business Decision, Not a Vibe
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg text-[oklch(0.7_0.012_85)] leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Most creators pick their niche by accident — whatever they stumbled into, whatever
            seemed popular, whatever everyone else was doing. Then they spend years wondering
            why the money doesn't match the effort. The Niche Matcher replaces accident with
            analysis: your profile, scored against 1,052 market segments, ranked by where
            you can actually win.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <Link href="/niche-matcher">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn-gold px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
              >
                <Zap size={18} /> Run the Niche Analysis
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              The Most Expensive Decision You'll Make Quietly
            </h2>
            <div className="space-y-5 text-[oklch(0.7_0.012_85)] leading-relaxed text-lg">
              <p>
                Here's what nobody tells new creators: the niche you choose determines your
                ceiling before you post a single piece of content. A creator with average content
                in a high-spending, underserved niche will out-earn a brilliant creator grinding
                in an oversaturated one. Every time. The market doesn't reward effort — it
                rewards positioning.
              </p>
              <p>
                The data backs this up. Creators in well-chosen sub-niches see{" "}
                <strong className="text-white">4.2x higher subscriber retention</strong> than
                generic accounts. They charge premium prices because they're not interchangeable.
                They grow faster because the algorithm can actually figure out who to show them to.
                And they burn out less, because they're working with market demand instead of
                against it.
              </p>
              <p>
                The flip side is brutal. Pick wrong and you get the worst of all worlds: fierce
                competition driving prices down, an audience that consumes but doesn't pay, and
                the slow realization that two years of grinding built equity in a market that
                was never going to reward you. Most creators who quit didn't fail at creating —
                they failed at choosing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four dimensions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Four Dimensions, One Score
            </h2>
            <p className="text-lg text-[oklch(0.7_0.012_85)] max-w-2xl mx-auto">
              Every market segment is evaluated across the four variables that determine
              whether a niche will make you money — or cost you years.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIMENSIONS.map((dim, i) => {
              const Icon = dim.icon;
              return (
                <motion.div
                  key={dim.title}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i}
                  className="rounded-2xl p-6 bg-[oklch(0.08_0.005_85/80%)] border border-[oklch(0.78_0.16_85/12%)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.78_0.16_85/10%)] text-[oklch(0.78_0.16_85)] mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{dim.title}</h3>
                  <p className="text-sm text-[oklch(0.65_0.012_85)] leading-relaxed">
                    {dim.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-[oklch(0.7_0.012_85)]">
              Four steps from "I don't know where I fit" to a ranked, actionable market position.
            </p>
          </motion.div>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-60px" }} custom={i}
                className="flex gap-6 rounded-2xl p-6 bg-[oklch(0.08_0.005_85/80%)] border border-[oklch(0.78_0.16_85/12%)]"
              >
                <div className="flex-shrink-0">
                  <span className="text-3xl font-bold text-[oklch(0.78_0.16_85/40%)] font-mono">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[oklch(0.7_0.012_85)] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0}
            className="rounded-2xl p-8 sm:p-12 text-center bg-[oklch(0.78_0.16_85/6%)] border border-[oklch(0.78_0.16_85/20%)]"
          >
            <Crown size={32} className="mx-auto mb-4 text-[oklch(0.78_0.16_85)]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="text-[oklch(0.7_0.012_85)] leading-relaxed max-w-2xl mx-auto mb-8">
              The analysis takes minutes. The clarity lasts for your entire career.
              Find out where the market wants you — and what it's willing to pay.
            </p>
            <Link href="/niche-matcher">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn-gold px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
              >
                Find My Niche <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Questions, Answered
          </h2>
          <SeoFaq faqs={FAQS} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
