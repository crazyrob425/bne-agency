/**
 * BNE Training Modules Page
 * Free step-by-step creator playbooks: automation workflows, DM sales systems,
 * § 2257 compliance, passive income syndication, and niche positioning.
 * Not a real school — free guides roleplaying as a cheeky university.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { professors, getProfessorById } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Video, BookOpen, ArrowRight, Zap, Crown, CheckCircle2,
  Cpu, Layers, Shield, DollarSign, Compass, Sliders
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const MODULES_LIST = [
  {
    num: "Module 01",
    title: "Omni-Channel Content Automation & Scheduling",
    icon: Cpu,
    professor: professors[3], // Prof. Okafor
    desc: "Set up rolling 30-day content queues, automated cross-posting scripts, and trailer creation pipelines that eliminate daily administrative posting drag.",
    topics: [
      "Building a 4-week rolling content calendar matrix",
      "Automating NSFW trailer clipping and thumbnail generation",
      "Platform API queueing and prime engagement window timing",
      "Multi-platform asset vaulting and encrypted backup SOPs",
    ],
    reads: [
      { title: "The 90-Day Content Calendar That Keeps You Consistent", href: "/blog/content-calendar-strategy-adult-creators" },
      { title: "AI That Actually Pays You: Content Production Systems", href: "/blog/ai-content-production-augmentation-for-creators-2026" },
    ],
  },
  {
    num: "Module 02",
    title: "High-Ticket DM Sales & Fan Retention Systems",
    icon: DollarSign,
    professor: professors[0], // Dr. Sinclair
    desc: "Master sales psychology in direct messages. Segment subscribers into spending cohorts, script custom content upsells, and automate re-engagement drops.",
    topics: [
      "Subscriber cohort segmentation (whales vs budget subs)",
      "Curiosity-gap PPV messaging copy & preview triggers",
      "Custom content rate cards and non-refundable deposit rules",
      "Win-back automated drops for expired subscribers",
    ],
    reads: [
      { title: "Stop Obsessing Over New Subscribers. Your Money Is in the Ones You Already Have.", href: "/blog/fan-engagement-crm-subscriber-retention" },
      { title: "Beyond Subscriptions: The Advanced Monetization Stack", href: "/blog/ppv-custom-content-findom-advanced-monetization" },
    ],
  },
  {
    num: "Module 03",
    title: "Sovereign Legal Compliance & § 2257 Record-Keeping",
    icon: Shield,
    professor: professors[1], // Prof. Hayes
    desc: "Build an airtight legal compliance firewall. Maintain mandatory 18 U.S.C. § 2257 records, state photo IDs, model releases, and automated DMCA takedowns.",
    topics: [
      "Federal § 2257 record auditing & 7-year storage compliance",
      "Performer identification verification and co-star releases",
      "DMCA anti-piracy scanning and automated search removal",
      "Identity separation and anonymized corporate entity setup",
    ],
    reads: [
      { title: "18 U.S.C. § 2257: The Compliance Guide You Can't Afford to Skip", href: "/blog/18-usc-2257-complete-guide-adult-creators" },
      { title: "Your Content Is Being Stolen Right Now. Here's What to Do About It.", href: "/blog/dmca-anti-piracy-guide-adult-creators" },
    ],
  },
  {
    num: "Module 04",
    title: "Passive Syndication & Secondary Clip Stores",
    icon: Layers,
    professor: professors[3], // Prof. Okafor
    desc: "Monetize full-length video sets long-tail by syndicating across secondary clip store platforms like ManyVids, Clips4Sale, and iWANTFC.",
    topics: [
      "Metadata tagging for search optimization on clip sites",
      "Setting up passive revenue payouts and automated uploads",
      "Pricing strategy for full video sets vs short custom clips",
      "Licensing agreements and reseller protection frameworks",
    ],
    reads: [
      { title: "From Content to Calls to Companionship: Portfolio Diversification", href: "/blog/adult-creator-portfolio-diversification-phone-sex-sexting-escort-2026" },
      { title: "OnlyFans vs. Fansly vs. LoyalFans: Which Platform Deserves You", href: "/blog/onlyfans-vs-fansly-platform-comparison-2025" },
    ],
  },
  {
    num: "Module 05",
    title: "Niche Psychology & Sub-Culture Positioning",
    icon: Compass,
    professor: professors[2], // Prof. Delacroix
    desc: "Identify your highest-converting micro-niche across 1,052 sub-categories. Build a distinct creator brand persona that commands premium rates.",
    topics: [
      "Analyzing micro-niche saturation vs demand elasticity",
      "Cultivating fan obsession through brand voice & aesthetic",
      "Positioning against market competitors without price wars",
      "High-ticket sub-niche tip menu architecture",
    ],
    reads: [
      { title: "Why 1% of Creators Take Home 90% of the Money (And How to Be One of Them)", href: "/blog/power-law-niche-selection-adult-creator-economy" },
      { title: "The Kink Creator's Business Guide: The Most Loyal Audience in Adult", href: "/blog/bdsm-kink-niche-creator-guide" },
    ],
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "What are Blacklisted University training modules?",
    answer: "Training modules are free, step-by-step playbook guides covering automation workflows, DM sales, legal compliance, clip store syndication, and niche positioning. No enrollment needed — just read.",
  },
  {
    question: "How long does each training module take to complete?",
    answer: "They're in-depth written guides, not timed courses — read at your own pace. No durations, no deadlines, no homework.",
  },
  {
    question: "Do modules include downloadable templates and checklists?",
    answer: "Yes. The guides link to free downloadable PDF SOPs, § 2257 compliance forms, rate cards, and content calendar worksheets.",
  },
  {
    question: "Are the professors real?",
    answer: "No — our professors are fictional characters, playful personas our content team writes in. The guides are real and free; the faculty is fabulously fake.",
  },
]);

export default function TrainingModules() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const guide = getInfographicByKeyword("Online_Automation_Course_for_Creators");

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Free Creator Training Playbooks | Blacklisted University"
        description="Free step-by-step creator playbooks: automation workflows, DM sales systems, 2257 compliance, and clip store syndication. No enrollment, no tuition — just free guides."
        canonical="/training-modules"
        schema={faqSchema}
        keywords="free creator training, OnlyFans automation guide, 2257 compliance guide, creator DM sales scripts, Blacklisted University"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              Free <span className="gradient-text-gold">Training Playbooks</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-6 font-body leading-relaxed">
              Stop relying on random social media hacks. These free step-by-step playbooks — video walkthroughs, SOPs, and legal templates — help you automate and scale your creator business. No enrollment, no tuition. Just read.
            </p>
            <div className="max-w-2xl mx-auto mb-8 px-5 py-3.5 rounded-2xl border border-[oklch(0.78_0.16_85/25%)] bg-[oklch(0.78_0.16_85/5%)] text-left">
              <p className="text-sm text-zinc-300 font-body leading-relaxed">
                <span className="font-semibold text-[oklch(0.78_0.16_85)]">Not a real school, just a fun theme.</span>{" "}
                Blacklisted University is our free educational library roleplaying as a cheeky creator university. Every playbook here is free, forever.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/all-courses">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                  <Video size={16} /> Browse Free Class Catalog <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link href="/guides">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold">
                  Read Free Guides
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INFOGRAPHIC MODAL SECTION ── */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Automation Blueprint</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4 font-display">Online Creator Automation Playbook</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Inspect our high-resolution automation flowchart illustrating how content queueing, DM chat teams, and platform syndication integrate into a single unified business pipeline.
              </p>
              {guide && (
                <motion.div
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/20%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/40%)] transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      Online Automation Course Blueprint <ArrowRight size={16} className="text-[oklch(0.78_0.16_85)]" />
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">Click to open full high-resolution diagram</p>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Online_Automation_Course_for_Creators.png"} title="Online Automation Course for Creators" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>

            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">What Every Module Delivers</h3>
              {[
                "Step-by-step video & audio walkthroughs",
                "Free downloadable PDF worksheets & legal compliance SOPs",
                "Real-world account case studies & metric benchmarks",
                "Written in character by our (fictional) faculty",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 MODULES SYLLABUS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold tracking-widest uppercase">Training Syllabus</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">5 Core Operational Modules</h2>
          </div>

          <div className="space-y-8">
            {MODULES_LIST.map((mod, i) => (
              <motion.div key={mod.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider">{mod.num}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{mod.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{mod.desc}</p>
                    
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Key Topics Covered</h4>
                    <div className="grid sm:grid-cols-2 gap-2 mb-5">
                      {mod.topics.map(topic => (
                        <div key={topic} className="flex items-start gap-2 text-xs text-slate-400">
                          <Zap className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Read the free guides</h4>
                    <div className="space-y-2">
                      {mod.reads.map(read => (
                        <Link key={read.href} href={read.href}>
                          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[oklch(0.78_0.16_85/40%)] transition-all cursor-pointer group">
                            <span className="text-xs text-slate-300 group-hover:text-white leading-snug">{read.title}</span>
                            <ArrowRight size={13} className="text-[oklch(0.78_0.16_85)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Module Character</div>
                      <AuthorBio professor={mod.professor} variant="compact" />
                      <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-body italic">
                        Fictional character — a playful persona our content team writes in.
                      </p>
                    </div>
                    <Link href={mod.reads[0].href}>
                      <button className="w-full mt-6 py-2.5 rounded-lg btn-gold text-xs font-semibold">
                        Read Free Guides →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Creator Module Feedback"
        subtitle="Read how creators applied these exact modules to transform their daily workflow."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I need to enroll to read the playbooks?", a: "No. There's nothing to enroll in — every playbook is free for everyone, no account needed." },
              { q: "Are templates included in the legal playbook?", a: "Yes. The legal playbook links to free 18 U.S.C. § 2257 model release forms, performer identification logs, and DMCA takedown templates." },
              { q: "How often are playbooks updated?", a: "Our content team updates them as platform policies, algorithms, and search trends change." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Start Reading — It's All Free</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Five free training playbooks. No enrollment, no tuition, no student ID. Just pick a shelf and start learning.</p>
            <Link href="/all-courses">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Browse the Free Class Catalog →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
