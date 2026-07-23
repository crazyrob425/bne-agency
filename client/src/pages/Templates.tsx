/**
 * BNE Templates Page
 * Ready-to-use creator templates, media kits, and brand assets
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { FileText, Download, ArrowRight, Package, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function Templates() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const mediaKit = getInfographicByKeyword("Media_Kit");

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Templates | BNE Creator OS"
        description="Professional templates, media kits, and brand assets for creators. Download ready-to-use files that accelerate your brand growth."
        canonical="/templates"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Resource Vault</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Creator <span className="text-[oklch(0.78_0.16_85)]">Templates</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Stop building from scratch. Download our professionally crafted media kits, brand templates, contract forms, and content frameworks designed specifically for adult content creators.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Unlock Template Library
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-8">Media Kit & Brand Assets</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKit && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-white font-semibold">Media Kit</h3>
                  </div>
                  <p className="text-[oklch(0.65_0.012_85)] text-sm">Professional press and brand assets for creators seeking brand partnerships and sponsorships.</p>
                </motion.div>
              )}
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Package size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Content Templates</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Pre-built post templates, caption frameworks, and content calendars to accelerate your output.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-white font-semibold">DM Scripts</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Proven DM scripts and PPV templates written to convert casual fans into high-spending superfans.</p>
              </div>
            </div>
          </motion.div>
          <InfographicModal url={mediaKit?.url || "/media-files/Media_Kit.pdf"} title="Media Kit" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Reinventing the Wheel</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Our template library is updated monthly with new assets that keep your brand fresh, compliant, and conversion-ready.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Get Full Template Access
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

