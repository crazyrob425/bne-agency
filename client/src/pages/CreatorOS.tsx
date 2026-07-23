/**
 * B.N.E. Creator OS Page
 * The unified ecosystem for tools, assets, and resources.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  Wrench, Package, Zap, ArrowRight, Calculator, FileText,
  Calendar, BarChart3, Download, Home, Search
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

const toolCategories = [
  {
    name: "Creator Suite",
    description: "Your central command. Planning tools, performance utilities, and your main dashboard.",
    icon: Home,
    href: "/tools",
    tools: [
      { name: "Dashboard", icon: BarChart3, href: "/tools" },
      { name: "Planning Tools", icon: Calendar, href: "/tools/workflow-manager" },
      { name: "Performance Utilities", icon: Zap, href: "/tools" },
    ]
  },
  {
    name: "Resource Vault",
    description: "The complete library of downloadable assets, templates, and guides.",
    icon: Package,
    href: "/downloads",
    tools: [
      { name: "Download Library", icon: Download, href: "/downloads" },
      { name: "Templates", icon: FileText, href: "/downloads" },
      { name: "Resources", icon: Package, href: "/downloads" },
    ]
  },
  {
    name: "Automation",
    description: "Systems that work for you. Calculators, generators, and workflow automations.",
    icon: Zap,
    href: "/tools",
    tools: [
      { name: "Workflow Systems", icon: Zap, href: "/tools/workflow-manager" },
      { name: "Revenue Calculators", icon: Calculator, href: "/tools/calculator" },
      { name: "Content Generators", icon: FileText, href: "/tools/strategy-engine" },
    ]
  },
];

export default function CreatorOS() {
  const osSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "B.N.E. Creator OS",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "The unified system for B.N.E. Studio creators, combining the Creator Suite, Resource Vault, and Automation tools into a single ecosystem.",
    "publisher": {
      "@type": "Organization",
      "name": "B.N.E. Studio"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Creator OS | B.N.E. Studio's Unified Tool Ecosystem"
        description="Access the Creator OS: a unified system combining the Creator Suite, Resource Vault, and Automation tools. Your central command for building a creator business."
        canonical="/creator-os"
        schema={osSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
              <Wrench className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 mono-stat">Creator Operating System</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Your Business, Unified.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              Welcome to the Creator OS, the central nervous system of your business. We've merged the Creator Suite, Asset Vault, and all our utilities into one seamless ecosystem.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {toolCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <motion.div key={category.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100" style={{ fontFamily: 'Space Grotesk' }}>{category.name}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">{category.description}</p>
                  <div className="space-y-2">
                    {category.tools.map(tool => (
                      <Link key={tool.name} href={tool.href}>
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                          <tool.icon className="h-3.5 w-3.5" />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
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
