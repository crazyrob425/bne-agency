/**
 * BNE Managed Booking & Vetting Services Page
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Zap, ArrowRight, Shield, Calendar, MessageSquare, Smartphone,
  TrendingUp, Star, Clock, DollarSign, CheckCircle, Target, MapPin, Eye, AlertCircle
} from "lucide-react";
import Seo from "@/components/Seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Managed Booking & Vetting Services for In-Person Entertainers",
  "name": "Managed Booking & Vetting Services",
  "description": "Comprehensive client screening, classified ad support, shared VOIP SMS line, calendar scheduling, real-time reminders with GPS, and post-date safety checks.",
  "provider": {
    "@type": "Organization",
    "name": "Blacklisted Studio",
    "url": "https://blacklisted.studio"
  },
  "areaServed": {
    "@type": "Country",
    "name": "US"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "description": "Custom revenue share and advisory models."
  }
};

export default function PostingAndScheduling() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Managed Booking & Vetting Services for In-Person Entertainers"
        description="We handle the advertisements, vet incoming clients via a shared VOIP SMS line, manage your calendar with live GPS notifications, and perform end-of-date safety checks."
        canonical="/posting-and-scheduling"
        schema={serviceSchema}
      />
      <Navigation />

        {/* Hero */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-violet-900/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
                <Shield className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 mono-stat">TOTAL DISCRETION. ABSOLUTE PROTECTION.</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 font-display" style={{ fontFamily: 'Space Grotesk' }}>
                <span className="text-zinc-100">Your Business. Your Safety.</span>
                <br />
                <span className="text-amber-400">Fully Managed.</span>
              </h1>
              <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-body" style={{ fontFamily: 'DM Sans' }}>
                Endless back-and-forth texts, screening risks, and scheduling stress eat into your earning hours. We handle classified ads, vet clients over a shared VOIP line, coordinate calendar dates with GPS directions, and confirm your safety at the end of every booking.
              </p>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon-amber text-base font-semibold mx-auto">
                  <ArrowRight className="h-5 w-5" /> Access Managed Vetting
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* The Grind vs The Solution */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why Creators Outsource</span>
              <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4 font-display" style={{ fontFamily: 'Space Grotesk' }}>You Are the Talent, Not the Secretary</h2>
              <p className="text-zinc-400 max-w-3xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>
                Handling scheduling, vetting, and security yourself is a constant distraction. It drains your energy, leaves money on the table, and exposes you to unnecessary risks.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Zero Texting Grind", desc: "No more spending hours answering basic questions or filtering out time-wasters. We handle the conversation." },
                { icon: Shield, title: "Vetted Security", desc: "We verify IDs, references, and intent before anyone is placed on your calendar. Only qualified clients get through." },
                { icon: Calendar, title: "Auto-Synced Dates", desc: "Your schedule stays perfectly structured. Dates are mapped out automatically based on your parameters." },
                { icon: Eye, title: "Complete Anonymity", desc: "Your personal phone number and private details never touch clients. Everything runs through our secure system." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 border border-white/8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4"><item.icon className="h-7 w-7 text-amber-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2 font-display" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-body" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Managed Core Features */}
        <section className="py-20 bg-[oklch(0.09_0.01_265)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Core Capabilities</span>
              <h2 className="text-4xl font-bold text-zinc-100 mt-3 font-display" style={{ fontFamily: 'Space Grotesk' }}>Inside BNE's Vetting & Booking Infrastructure</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <FeatureCard icon={Target} title="Classified Advertising Support"
                description="We assist in setting up, optimizing, and rotating high-impact advertisements on top classified directories in your target cities to capture high-value clientele."
                features={["Compelling ad copy structured for premium positioning", "Photo layout and image metadata stripping advice", "Ongoing schedule rotation and visibility management", "Engineered to attract respectful, high-budget customers"]} />

              <FeatureCard icon={MessageSquare} title="Shared VOIP SMS Communications"
                description="All client interactions run through a dedicated VOIP SMS phone line that both you and our booking assistants can access in real-time. Complete privacy, zero exposure."
                features={["Your personal number stays 100% private", "Agile chat management: we qualify and filter inquiries", "You have full real-time visibility into the message stream", "Clear boundaries established before any booking is confirmed"]} />

              <FeatureCard icon={Calendar} title="Vetted Calendar & Smart Reminders"
                description="Once a client passes our screening, they are added to a shared-access calendar. We coordinate all logistics, outcalls, and incalls automatically."
                features={["Upcoming date reminders sent to you with live GPS directions for outcalls", "Incall coordination: final confirmations handled and arrival alerts sent", "Built-in buffer times to prevent overlaps and rushed sessions", "Calendar syncs directly with your private planning dashboard"]} />

              <FeatureCard icon={Shield} title="End-of-Date Safety & Follow-up Checks"
                description="Our safety team stays active. We check in with you at the scheduled end of every booking to verify your status and provide assistance if needed."
                features={["Mandatory safety check call or message at the end of the date", "Assistance in hurrying lingering customers when their session is over", "Real-time support and protocol routing in case of security concerns", "Continuous feedback loop to blacklist problematic customers"]} />
            </div>
          </div>
        </section>

        {/* Vetting Flow */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Our Protocol</span>
              <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4 font-display" style={{ fontFamily: 'Space Grotesk' }}>The Vetting Flow: How We Protect You</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Inquiry Qualify", desc: "A customer reaches out via the VOIP line. We analyze their language, intent, and profile.", icon: MessageSquare },
                { step: "02", title: "ID & Safety Check", desc: "We request and verify references or ID under strict security standards. No verification = no date.", icon: Shield },
                { step: "03", title: "Calendar Sync", desc: "Vetted details are booked on your shared calendar, along with outcall GPS or incall arrival cues.", icon: Calendar },
                { step: "04", title: "Safety Callout", desc: "At the end of the date, we contact you to confirm the booking completed safely and the client departed.", icon: AlertCircle },
              ].map((item, i) => {
                const ProcIcon = item.icon;
                return (
                  <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
                    <div className="text-center mb-4"><span className="text-5xl font-bold text-violet-500/20 mono-stat">{item.step}</span></div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><ProcIcon className="h-7 w-7 text-violet-400" /></div>
                      <h3 className="text-lg font-bold text-zinc-100 mb-2 font-display" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed font-body" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/15 via-transparent to-violet-900/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6 font-display" style={{ fontFamily: 'Space Grotesk' }}>Ready to Reclaim Your Nights?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>
                Stop stressing over the scheduling grind and client screening. Let BNE handle the administration and safety compliance so you can focus entirely on your appointments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onboarding">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon-amber text-base font-semibold">
                    <Zap className="h-5 w-5" /> Apply for Managed Services
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                    <ArrowRight className="h-5 w-5" /> See In-Person Support Tiers
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

function FeatureCard({ icon: Icon, title, description, features }: {
  icon: React.ElementType; title: string; description: string; features: string[];
}) {
  return (
    <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
      className="glass-card p-6 border transition-all duration-300 hover:-translate-y-1 border-emerald-500/20">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-3 font-display" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-body" style={{ fontFamily: 'DM Sans' }}>{description}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
            <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
            <span className="font-body" style={{ fontFamily: 'DM Sans' }}>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
