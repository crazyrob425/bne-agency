/**
 * In-Person Companions Hub Page
 * B2B business-infrastructure positioning for independent in-person companions.
 * Strictly business operations: branding, screening & safety systems, client
 * management infrastructure, bookkeeping. No service menus, no booking facilitation.
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
  Gem, ShieldCheck, Users, Globe, Calculator, Star,
  ArrowRight, Layers
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const COMPANION_PILLARS = [
  {
    icon: Gem,
    title: "1. Brand & Premium Positioning",
    href: "/creator-positioning",
    description: "A refined public brand — photography direction, copywriting, and positioning that attracts respectful, high-caliber clientele and supports premium rates.",
    detail: "In-person work is a reputation business. We build brands that signal discretion, professionalism, and exclusivity before first contact.",
  },
  {
    icon: ShieldCheck,
    title: "2. Screening & Safety Systems",
    href: "/screening-systems",
    description: "Verification workflows, safety protocols, and check-in systems engineered to protect you — the operational backbone every independent companion needs.",
    detail: "Safety is infrastructure, not luck. We implement layered screening and real-time safety systems you operate with confidence.",
  },
  {
    icon: Users,
    title: "3. Client Management Infrastructure",
    href: "/booking-management",
    description: "Inquiry handling systems, boundary-setting frameworks, and client records — professional operations that filter time-wasters and protect your energy.",
    detail: "You decide who you see. We build the systems that make that decision informed, efficient, and safe.",
  },
  {
    icon: Globe,
    title: "4. Digital Presence & Discretion",
    href: "/privacy-systems",
    description: "A polished website, search visibility, and advertising presence — built on compartmentalized identity tech that keeps your public brand separate from your private life.",
    detail: "Visibility and privacy aren't opposites when the infrastructure is right. Anonymous entities, encrypted comms, isolated devices.",
  },
  {
    icon: Calculator,
    title: "5. Bookkeeping & Business Admin",
    href: "/backend-management",
    description: "Entity structuring, tax-ready bookkeeping, and financial separation — run your work as a legitimate business with clean records.",
    detail: "The highest earners treat this as a business. We handle the entity, accounting, and admin infrastructure that makes that real.",
  },
  {
    icon: Star,
    title: "6. Reputation Management",
    href: "/services",
    description: "Monitoring and management of your online reputation across directories and review platforms — protecting the brand equity you've built.",
    detail: "One bad listing can cost months of positioning. We watch your digital footprint and respond strategically.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Business Management for In-Person Companions",
  "provider": {
    "@type": "Organization",
    "name": "B.N.E. Studio"
  },
  "description": "Business infrastructure for independent in-person companions: brand positioning, screening and safety systems, client management infrastructure, discreet digital presence, and bookkeeping.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Companion Business Infrastructure",
    "itemListElement": COMPANION_PILLARS.map(s => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
    }))
  }
};

const faqSchema = buildFaqSchema([
  {
    question: "What exactly does BNE Studio do for in-person companions?",
    answer: "We provide business operations infrastructure: branding, screening and safety systems, client management workflows, discreet websites, bookkeeping, and privacy protection. You run your business — we run the business of your business.",
  },
  {
    question: "Does BNE arrange meetings or book clients on my behalf?",
    answer: "No. We build the systems — screening workflows, inquiry handling, scheduling infrastructure — that you or your own staff operate. We never facilitate, arrange, or participate in meetings.",
  },
  {
    question: "How is my identity protected?",
    answer: "Compartmentalized operations: anonymous LLC structures, encrypted communications, isolated devices and accounts, and strict separation between your public brand and private life.",
  },
  {
    question: "Does BNE take a percentage of my earnings?",
    answer: "Our standard management partnership is percentage-based: nothing upfront, and we only earn when you earn. If you'd rather keep 100% of everything you make, flat-rate advisory and marketing packages are available instead.",
  },
]);

export default function InPersonCompanions() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Business Management for In-Person Companions | BNE Studio"
        description="BNE Studio provides business infrastructure for independent in-person companions: brand positioning, screening and safety systems, client management, discreet digital presence, and bookkeeping."
        canonical="/in-person-companions"
        schema={[serviceSchema, faqSchema]}
        keywords="in-person companion business management, companion branding agency, independent companion business support, companion screening systems, escort business consulting"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">Companions Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6 font-display">
              The Business Behind <span className="gradient-text-gold">the Business</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body">
              You run your practice. We run the infrastructure — brand, screening and safety systems,
              client management, discreet digital presence, and clean books. Professional operations
              for independent in-person companions.
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">Infrastructure for Independent Practices</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANION_PILLARS.map((sol, i) => {
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

      {/* ── POSITIONING NOTE ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Operations Partner — Nothing More, Nothing Less</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            BNE Studio is a business infrastructure firm. We build brands, safety systems, and back-office
            operations for independent companions. We do not arrange meetings, facilitate introductions,
            or participate in the delivery of any in-person services — those decisions and activities
            belong entirely to the independent provider, who is responsible for operating within
            applicable local laws.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="What Independent Providers Say"
        subtitle="Real feedback from companions running on BNE infrastructure."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Does BNE take a percentage of my earnings?", a: "Our standard management partnership is percentage-based: nothing upfront, and we only earn when you earn. If you'd rather keep 100% of everything you make, flat-rate advisory and marketing packages are available instead." },
              { q: "I'm established already. What would change?", a: "Most established providers run on improvised systems — spreadsheets, memory, and hope. We replace that with professional infrastructure: real screening, real books, real brand equity." },
              { q: "How discreet is the partnership itself?", a: "Completely. Anonymous entities, encrypted comms, and strict compartmentalization apply to our relationship too — not just your public brand." },
              { q: "What do you need from me to start?", a: "Apply for a free confidential consultation. We review your current operation and propose the exact infrastructure for your situation." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Professionalize Your Practice</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership and put real business infrastructure behind your work.</p>
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