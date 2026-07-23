/**
 * BNE Free Legal Tools
 * Public-access legal frameworks, contract templates, release forms, and compliance checklists.
 * No login required.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { FileText, Scale, Shield, BookOpen, Download, ArrowRight, Lock, DollarSign } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const freeTools = [
  {
    icon: FileText,
    title: "§ 2257 Compliance Checklist",
    desc: "Complete step-by-step checklist for federal record-keeping compliance under 18 U.S.C. § 2257. Keep your business protected with this battle-tested list.",
    file: "2257_Compliance_Checklist.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Scale,
    title: "Model Release Template",
    desc: "Professionally drafted model release covering all federal requirements. Keep this on file for every performer before filming begins.",
    file: "Model_Release_Template.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Shield,
    title: "State Age-Gate Guide",
    desc: "State-by-state breakdown of age verification requirements and implementation guides for platforms and personal sites.",
    file: "State_Age-Gate_Guide.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Lock,
    title: "Anonymity Audit Worksheet",
    desc: "Self-assessment tool to identify and close privacy vulnerabilities in your setup. From metadata to payment rails.",
    file: "Anonymity_Audit_Worksheet.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: BookOpen,
    title: "DMCA Takedown Template",
    desc: "Ready-to-file DMCA notice template for reporting content theft and copyright infringement on tube sites and social platforms.",
    file: "DMCA_Takedown_Template.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: DollarSign,
    title: "Banking Privacy Guide",
    desc: "Best practices for protecting your financial identity as a creator. From anonymous banking to tax-efficient structures.",
    file: "Banking_Privacy_Guide.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: FileText,
    title: "Venue Requirements Checklist",
    desc: "Comprehensive checklist for venue setup, equipment needs, accessibility standards, and local compliance for in-person events.",
    file: "Venue_Requirements_Checklist.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Shield,
    title: "Safety First — In-Person Guide",
    desc: "10 non-negotiable safety protocols plus legal compliance checklist for in-person professionals. Stay safe, stay legal.",
    file: "Safety_First_—_In-Person_Guide.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: BookOpen,
    title: "Toolkit for Online Creators",
    desc: "Complete toolkit including content calendars, rate sheets, brand identity templates, and technical checklists for digital entertainers.",
    file: "Toolkit_for_Online_Creators.pdf",
    tag: "FREE",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export default function FreeLegalTools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Free Legal Tools & Templates | BNE Creator OS"
        description="Download free legal templates, release forms, compliance checklists, and contract frameworks for adult content creators. No sign-up required."
        canonical="/free-tools"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Open Access</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Free Legal <span className="text-[oklch(0.78_0.16_85)]">Frameworks</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Compliant contract templates, release forms, and legal checklists for adult creators. All forms are created, vetted, and available for free download — no login, no sign-up, no gatekeeping.
            </p>
            <div className="flex items-center gap-4 text-sm text-[oklch(0.65_0.012_85)]">
              <div className="flex items-center gap-2">
                <Download size={16} className="text-emerald-400" />
                <span>Instant PDF downloads</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[oklch(0.78_0.16_85/30%)]" />
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" />
                <span>No account required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Downloadable Legal Tools</h2>
            <p className="text-[oklch(0.7_0.012_85)] max-w-2xl mx-auto">Everything below is free. Click any card to download the PDF directly to your device.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTools.map((tool, i) => (
              <motion.a
                key={tool.title}
                href={`/media-files/${tool.file}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`luxury-card p-6 border ${tool.border} cursor-pointer group flex flex-col justify-between hover:border-[oklch(0.78_0.16_85/30%)] transition-all`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center ${tool.color}`}>
                      <tool.icon size={20} />
                    </div>
                    <span className={`text-xs font-medium mono-stat ${tool.color} ${tool.bg} border ${tool.border} px-2 py-0.5 rounded-full`}>
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-lg">{tool.title}</h3>
                  <p className="text-[oklch(0.65_0.012_85)] text-sm leading-relaxed">{tool.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-[oklch(0.78_0.16_85)] text-sm font-medium group-hover:gap-3 transition-all mt-4">
                  <Download size={14} />
                  Download PDF
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.04_0.005_85)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">How to Use These Tools</h2>
            <p className="text-[oklch(0.7_0.012_85)] max-w-2xl mx-auto">These documents are designed to be starting points, not final legal advice. Always have a licensed attorney review your contracts and compliance procedures.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-white font-semibold mb-2">Download</h3>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Click any card above to download the PDF directly. No email, no account, no waiting.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-white font-semibold mb-2">Customize</h3>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Fill in your business details, review with your attorney, and tailor the documents to your specific situation.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)] mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-white font-semibold mb-2">Implement</h3>
              <p className="text-[oklch(0.65_0.012_85)] text-sm">Store signed copies in a secure archive, set reminders for renewals, and stay audit-ready at all times.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Need Full Legal Coverage?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">The free tools above are a starting point. BNE's full management includes executed model releases, 2257 custodian services, DMCA response teams, and attorney-reviewed contracts — all handled for you.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply for Full Legal Protection <ArrowRight size={16} className="inline ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
