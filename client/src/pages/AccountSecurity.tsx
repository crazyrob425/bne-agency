/**
 * BNE Account Security Page
 * Account hardening, access control, and digital security protocols
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Shield, Lock, Eye, ArrowRight, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AccountSecurity() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Account Security | BNE Agency"
        description="Multi-layer account security protocols for creator brands. Protect your platforms, finances, and identity from compromise."
        canonical="/account-security"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Protection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Account <span className="text-[oklch(0.78_0.16_85)]">Security</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Your accounts are the gateway to your income. We implement military-grade security protocols — 2FA, VPN routing, session monitoring, and breach detection — to keep your platforms locked down.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Harden Your Accounts
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Access Control</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Role-based access management ensures only authorized personnel can touch your accounts. Every login is logged and auditable.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Breach Detection</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Real-time monitoring alerts you to suspicious activity before damage is done. We react before you even know there's a threat.</p>
              </div>
            </div>
            <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                  <Shield size={20} />
                </div>
                <h3 className="text-white font-semibold">Safety First Protocol</h3>
              </div>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Our account security protocols are built on the same principles as our in-person safety systems: prevention first, rapid response second, zero tolerance for compromise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Your Accounts Are the Crown Jewels</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Protect them like it. Apply for BNE security protocols and sleep soundly knowing your empire is locked down.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply for Security
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

