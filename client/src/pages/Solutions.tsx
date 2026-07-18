/**
 * B.N.E. Solutions Page
 * A high-level overview of the core problems B.N.E. Studio solves.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  Layers, Zap, Briefcase, DollarSign, TrendingUp, Shield,
  ArrowRight, Brain, Settings, Users
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

const solutions = [
  {
    icon: Zap,
    title: "Niche Intelligence",
    description: "Stop guessing. We use a proprietary database of 1,052+ market segments to find your most profitable, authentic niche, ensuring you compete where you can win.",
    href: "/niche-matcher"
  },
  {
    icon: Briefcase,
    title: "Strategic Advisory",
    description: "Go from creator to CEO. We provide the high-level business strategy, positioning, and decision-making support that builds sustainable, long-term empires.",
    href: "/bne-growth-partnership"
  },
  {
    icon: DollarSign,
    title: "Revenue Growth",
    description: "Unlock your true earning potential. We implement advanced monetization systems, optimize pricing, and build fan-retention funnels that multiply your income.",
    href: "/services"
  },
  {
    icon: Settings,
    title: "Business Infrastructure",
    description: "We build your entire backend: privacy systems, legal compliance frameworks, payment processing pipelines, and automated workflows. You focus on creating.",
    href: "/services"
  },
  {
    icon: TrendingUp,
    title: "Monetization Systems",
    description: "Move beyond simple subscriptions. We build and manage a diverse portfolio of income streams, from custom content and PPV to automated digital products.",
    href: "/services"
  },
  {
    icon: Users,
    title: "Creator Development",
    description: "Access the B.N.E. Academy for exclusive training, playbooks, and one-on-one guidance to master your craft and the business behind it.",
    href: "/academy"
  },
];

export default function Solutions() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Creator Business Infrastructure",
    "provider": {
      "@type": "Organization",
      "name": "B.N.E. Studio"
    },
    "description": "B.N.E. Studio provides comprehensive solutions for creators, including Niche Intelligence, Strategic Advisory, Revenue Growth systems, and complete Business Infrastructure.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "B.N.E. Solutions",
      "itemListElement": solutions.map(s => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Solutions | Creator Business Infrastructure by B.N.E. Studio"
        description="Explore B.N.E. Studio's core solutions: Niche Intelligence, Strategic Advisory, Revenue Growth, and complete Business Infrastructure for serious creators."
        canonical="/solutions"
        schema={solutionsSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">B.N.E. Solutions</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Architects of Creator Empires
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              We don't offer services; we provide integrated solutions. Each pillar of our operation is designed to solve the core problems that prevent talented creators from building sustainable, high-revenue businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <motion.div key={solution.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={solution.href}>
                    <div className="glass-card p-6 border border-white/8 h-full group cursor-pointer hover:border-violet-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-violet-400" style={{ fontFamily: 'Space Grotesk' }}>{solution.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{solution.description}</p>
                      <div className="mt-4 text-xs font-semibold text-violet-500 flex items-center gap-1 group-hover:text-violet-400">
                        Learn More <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
