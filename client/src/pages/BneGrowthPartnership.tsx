/**
 * B.N.E. Growth Partnership Page
 * Explains the revenue sharing model and value proposition.
 * This is a high-conversion page designed to attract top-tier talent.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Shield, Zap, Users, DollarSign, Lock, BarChart3, Headphones, FileText, Star,
  ArrowRight, Sparkles, Briefcase, Settings, BookOpen, TrendingUp, CheckCircle,
  Heart, Eye, Calendar, MessageSquare, Brain, GitBranch, Award
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

export default function BneGrowthPartnership() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="The B.N.E. Growth Partnership"
        description="We only win when you win. Learn about our alignment-based partnership model for serious creators. We invest our systems, expertise, and infrastructure into your growth."
        canonical="/bne-growth-partnership"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              We Only Win When You Win
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              We believe great partnerships are built on alignment, commitment, performance, and shared success. If B.N.E. Studio chooses to work with you, we are investing time, systems, expertise, labor, support, education, strategy, research, and infrastructure into your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why The Model Exists */}
      <section className="py-20 bg-[oklch(0.05_0.004_85)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Philosophy</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              A Partnership, Not a Paycheck
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Traditional agencies charge retainers, taking your money whether you succeed or not. We rejected that model. A B.N.E. Growth Partnership is a long-term, alignment-based relationship where our success is directly tied to yours.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GitBranch, title: "Shared Incentives", desc: "We only earn when you earn. This ensures our goals are perfectly aligned: maximizing your revenue." },
              { icon: TrendingUp, title: "Long-Term Growth", desc: "This isn't about a single viral moment. It's about building a sustainable, long-term business asset." },
              { icon: Heart, title: "Mutual Commitment", desc: "We invest significant resources into you. In return, we ask for your commitment to the process and the strategy." },
              { icon: DollarSign, title: "Reduced Upfront Risk", desc: "You don't pay thousands upfront. You get access to our entire infrastructure, and we grow together." },
            ].map((item, i) => (
              <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"><item.icon className="h-7 w-7 text-emerald-400" /></div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What B.N.E. Actually Does */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">The Infrastructure</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              What B.N.E. Studio Actually Does
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              We are not a simple management firm. We are your entire operational backend, providing the systems, labor, and expertise required to run a high-performance creator business.
            </motion.p>
          </motion.div>

          {/* AI-Generated Graphic Placeholder */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              [Placeholder for AI-generated graphic from pollination.ai: A complex, glowing, holographic flowchart in the B.N.E. dark/premium style. It should visually connect "Operations," "Growth," "Protection," and "Strategy" nodes, with smaller sub-tasks branching off, illustrating a comprehensive business system.]
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "Operations", icon: Settings,
                points: ["Scheduling & Administration", "Workflow Management", "Client Communications", "Booking & Vetting"]
              },
              {
                category: "Business Development", icon: Briefcase,
                points: ["Strategic Planning", "Creator Positioning", "Brand Growth", "Opportunity Analysis"]
              },
              {
                category: "Revenue Growth", icon: DollarSign,
                points: ["Monetization Systems", "Revenue Optimization", "Fan Retention Planning", "Growth Strategy"]
              },
              {
                category: "Research & Intelligence", icon: Brain,
                points: ["Market Research", "Niche Analysis", "Competitor Analysis", "Audience Behavior Research"]
              },
              {
                category: "Protection", icon: Shield,
                points: ["Privacy Systems", "Risk Reduction", "Security Protocols", "DMCA Takedowns"]
              },
              {
                category: "Compliance", icon: Award,
                points: ["Documentation Support", "Compliance Systems", "Operating Standards", "2257 Custodian Services"]
              },
              {
                category: "Systems", icon: Zap,
                points: ["Process Creation", "Automation Implementation", "Reporting & Analytics", "Performance Tracking"]
              },
              {
                category: "Education", icon: BookOpen,
                points: ["Training Resources", "Learning Systems", "Growth Frameworks", "Blacklisted University Access"]
              },
              {
                category: "Support", icon: Headphones,
                points: ["Ongoing Guidance", "Strategic Reviews", "Execution Support", "24/7 Crisis Line"]
              },
            ].map((cat, i) => (
              <motion.div key={cat.category} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <cat.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100" style={{ fontFamily: 'Space Grotesk' }}>{cat.category}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.points.map(point => (
                    <li key={point} className="flex items-center gap-2 text-sm text-zinc-400" style={{ fontFamily: 'DM Sans' }}>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Sharing & Application Process */}
      <section className="py-20 bg-[oklch(0.05_0.004_85)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-200 mb-4 text-center">Revenue Sharing Explained</motion.h2>
            <motion.div variants={fadeUp} className="prose prose-invert prose-sm mx-auto text-zinc-400" style={{ fontFamily: 'DM Sans' }}>
              <p>Some service providers use fixed retainers, commission structures, or hybrid models. At B.N.E. Studio, we prefer alignment-based relationships when appropriate for a creator's business stage.</p>
              <p>This means we agree on a percentage of the revenue we help generate. It's not a "standard" percentage; it's a custom figure based on the scope of work, your starting point, and your growth potential. This model ensures we are fully invested in your success because it's the only way we succeed.</p>
              <p>This is not a legal or financial promise of earnings. It is a philosophical commitment to shared outcomes.</p>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-200 mb-4 text-center">Our Application Review Process</motion.h2>
            <motion.div variants={fadeUp} className="prose prose-invert prose-sm mx-auto text-zinc-400" style={{ fontFamily: 'DM Sans' }}>
              <p>Acceptance into the B.N.E. Growth Partnership is selective. We are not a volume-based agency; we are a high-touch advisory firm. We look for partners, not just clients.</p>
              <p>Our review process assesses several key factors:</p>
              <ul>
                <li><strong>Growth Potential:</strong> Is there a clear, untapped market for your persona?</li>
                <li><strong>Professionalism:</strong> Do you treat this as a serious business opportunity?</li>
                <li><strong>Consistency & Commitment:</strong> Are you ready to commit to the strategy and do the creative work?</li>
                <li><strong>Business Readiness:</strong> Are you prepared to operate at a high level with our support?</li>
                <li><strong>Long-Term Opportunity:</strong> Is this a partnership that can scale and evolve over years, not months?</li>
              </ul>
              <p>If we see a match, we will reach out to schedule a confidential strategy session to discuss the specifics of a potential partnership.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-100">Frequently Asked Questions</motion.h2>
          </motion.div>
          <FAQAccordion faqs={PARTNERSHIP_FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-violet-900/10 to-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Ready to Build Your Empire?</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 mb-8">If you're serious about turning your content into a high-performance business, we're ready to invest in you. Apply now for a confidential review.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/apply">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold"
                >
                  Apply to B.N.E. Studio
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const PARTNERSHIP_FAQS = [
  { question: "What's the difference between a Growth Partnership and a flat-rate service?", answer: "A Growth Partnership is a long-term, all-inclusive relationship based on revenue sharing. We become your entire operational team. Flat-rate services are for specific, a-la-carte projects like a brand build-out or a compliance audit, where you pay a fixed price and retain 100% of your earnings." },
  { question: "Is there an upfront cost for the Growth Partnership?", answer: "No. For our Growth Partnership, there are zero upfront fees. We invest our time, systems, and resources into your brand first. We only make money after you start making significantly more money." },
  { question: "What are the typical revenue sharing percentages?", answer: "Percentages are customized for each partnership and are not public. They depend on your starting revenue, the scope of work required, and the projected growth. This is discussed in detail during your confidential strategy session if your application is approved." },
  { question: "How long is the partnership agreement?", answer: "Our standard agreements are structured for long-term growth, typically with an initial commitment period and performance-based renewal clauses. We're building a business with you, not just running a campaign." },
  { question: "What if I'm already earning a good income?", answer: "Excellent. We specialize in scaling established creators. We analyze your existing operations to identify efficiency gaps, new monetization opportunities, and automation potential to multiply your income while reducing your workload." },
  { question: "Do I lose control of my accounts?", answer: "You always retain full ownership of your brand and accounts. We act as trusted operators with delegated access, similar to how a CEO delegates tasks to their team. All actions are transparent and aligned with our shared strategy." },
  { question: "What kind of results can I realistically expect?", answer: "While we cannot promise specific earnings, our partners typically see a 200-400% revenue increase within the first 90-120 days. This is a result of implementing our proven systems for niche marketing, monetization, and fan engagement." },
  { question: "How does B.N.E. handle my privacy and data?", answer: "With extreme prejudice. All partnerships operate under a strict NDA from day one. We use encrypted communication channels and build firewalls between your personal identity and your creator persona. Your privacy is our paramount concern." },
  { question: "What if I want to leave the partnership?", answer: "Our agreements include clear terms for dissolution. Our goal is a mutually beneficial partnership, and if it's no longer serving your goals, we have a professional and structured off-boarding process." },
  { question: "Do you work with creators outside the US?", answer: "Yes. We have partners across North America, Europe, and Australia. We handle the complexities of international payment processing, compliance, and platform access." },
  { question: "What if my application isn't accepted?", answer: "If a full Growth Partnership isn't the right fit at this time, we will always explain why and often recommend specific a-la-carte services or provide a clear roadmap of what you need to work on to be ready for a partnership in the future." },
];
