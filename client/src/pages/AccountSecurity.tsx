/**
 * BNE Account Security Page
 * Comprehensive technical guide to account hardening, 2FA hardware authentication,
 * role-based access management, IP proxy routing, and cyber-threat protection.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AuthorBio from "@/components/AuthorBio";
import TestimonialsSection from "@/components/TestimonialsSection";
import { professors, getProfessorByExpertise } from "@/data/professors";
import { buildFaqSchema } from "@/lib/schema/builders";
import {
  Shield, Lock, Eye, ArrowRight, Zap, Key, Server,
  AlertTriangle, CheckCircle2, UserCheck, Crown
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const SECURITY_STACK = [
  {
    icon: Key,
    title: "1. Hardware Security Key (YubiKey) Mandatory 2FA",
    description: "SMS and authenticator app 2FA can be bypassed via SIM swapping or phishing. BNE enforces hardware security key (YubiKey) authentication across all primary creator platform logins.",
    detail: "Zero vulnerability to SIM swapping or phishing attacks. Physical key required for credential access or payout routing changes.",
  },
  {
    icon: UserCheck,
    title: "2. Role-Based Access Control & Sub-Account Delegation",
    description: "Never share raw master passwords with virtual assistants or chatter teams. BNE deploys isolated sub-account manager access with restricted permissions.",
    detail: "Chatter teams access DM interfaces without viewing banking details, payout settings, or legal identity documentation.",
  },
  {
    icon: Server,
    title: "3. Dedicated Residential IP & Proxy Routing Firewall",
    description: "Logging into creator accounts from varying IP addresses or public Wi-Fi triggers security locks and shadowbans. BNE routes all session traffic through static residential IP proxies.",
    detail: "Eliminates platform security locks caused by IP jumps. Ensures consistent, localized login signals across all managed team activity.",
  },
  {
    icon: Eye,
    title: "4. Automated Breach Monitoring & Emergency Lockout",
    description: "24/7 monitoring scans global dark web databases for leaked credentials, alerting our security desk immediately if any associated email or password appears in a breach.",
    detail: "Triggers instant credential rotation and session termination before unauthorized access can occur.",
  },
];

const faqSchema = buildFaqSchema([
  {
    question: "How does BNE protect creator platform logins?",
    answer: "We enforce YubiKey hardware 2FA, route logins through static residential proxies, and grant staff role-restricted sub-account access without sharing master passwords.",
  },
  {
    question: "Can chatter staff access my banking or payout settings?",
    answer: "Never. Role-based sub-account delegation isolates DM chat access from banking, payout routing, and legal identity settings.",
  },
]);

export default function AccountSecurity() {
  const securityProfessor = getProfessorByExpertise("cybersecurity brand protection privacy");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Account Security & Cybersecurity Protocols | BNE Studio"
        description="Protect your creator accounts with BNE Studio: YubiKey hardware 2FA, role-based sub-account access, static residential IP proxy firewalls, and breach monitoring."
        canonical="/account-security"
        schema={faqSchema}
        keywords="creator account security, OnlyFans security protocols, YubiKey 2FA creators, creator SIM swap protection, sub account management adult creator"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <Shield className="h-3.5 w-3.5 text-[oklch(0.78_0.16_85)]" />
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Cybersecurity Suite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Account <span className="text-[oklch(0.78_0.16_85)]">Security Hardening</span><br />
              <span className="text-3xl md:text-4xl text-slate-400 font-normal">Lock Down Your Platform Assets.</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Your creator accounts are high-value financial assets generating thousands in monthly revenue. A single compromised password, phishing scam, or SIM swap attack can instantly wipe out years of hard-won brand equity.
            </p>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-10 max-w-2xl">
              BNE Studio deploys institutional-grade security architecture: hardware security keys, role-restricted sub-account delegation, residential proxy firewalls, and 24/7 dark web breach monitoring.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm flex items-center gap-2">
                  Harden Account Security <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href="/security-measures">
                <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 text-sm border border-slate-700 rounded-xl text-slate-300 hover:border-slate-500 transition-colors">
                  View Security Measures
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4 SECURITY PILLARS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The BNE Account Security Stack</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">4 layers of protection keeping your accounts, banking, and identity secure.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SECURITY_STACK.map((sec, i) => (
              <motion.div key={sec.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mb-4">
                    <sec.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{sec.title}</h3>
                  <p className="text-slate-300 text-base mb-4 leading-relaxed">{sec.description}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pt-4 border-t border-slate-800/60">{sec.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR BIO ── */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 text-center">Faculty Lead — Cybersecurity & Account Hardening</div>
          <AuthorBio professor={securityProfessor} variant="full" showCourses />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection
        title="Account Security Reviews"
        subtitle="Read how creators protected their high-value accounts with BNE's security stack."
        limit={3}
      />

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What happens if a chatter's device is stolen or compromised?", a: "Sub-account sessions are instantly revoked from BNE's centralized security console with zero access to master account passwords or banking." },
              { q: "How do static residential proxies prevent platform bans?", a: "Proxies simulate consistent local device logins, avoiding triggering platform fraud algorithms triggered by multi-location IP hops." },
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">Lock Down Your Platform Assets Today</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Apply for BNE Studio partnership to get full YubiKey 2FA setup and account hardening.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-4 text-base">
                Get Account Protection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
