/**
 * BNE Business Strategy Page
 * Strategic planning and 6-figure brand architecture
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Sparkles, ArrowRight, TrendingUp, DollarSign, Target, Zap, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function BusinessStrategy() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infographic1 = getInfographicByKeyword("Building_a_Six-Figure_Content_Empire");
  const infographic2 = getInfographicByKeyword("Brand_Playbook");
  const intimacyEngine = getInfographicByKeyword("The Intimacy Engine_ Adapting Creator-Economy Engagement for High-Intent B2B Conversion");

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Business Strategy | BNE Agency"
        description="Strategic brand architecture and business planning for creators targeting 6-figure annual revenue and sustainable growth."
        canonical="/business-strategy"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Strategic Advisory</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Business <span className="text-[oklch(0.78_0.16_85)]">Strategy</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Your content career is a business — act like one. We build the strategic roadmap that turns casual creators into disciplined, 6-figure brand empires with measurable milestones.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Build Your Roadmap
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Building a Six-Figure Content Empire</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Most creators plateau at $2,000-$5,000/month because they lack a business structure. We give you the exact blueprint — niche positioning, content pillars, pricing architecture, and expansion playbook — to break through that ceiling.
              </p>
              {infographic1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setModal1(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Empire Blueprint</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic1?.url || "/media-files/Building_a_Six-Figure_Content_Empire.png"} title="Building a Six-Figure Content Empire" isOpen={modal1} onClose={() => setModal1(false)} />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Brand Playbook</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Your brand is your most valuable asset. We define your visual identity, content pillars, pricing strategy, and audience positioning so you own a category instead of competing in one.
              </p>
              {infographic2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setModal2(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Brand Playbook</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic2?.url || "/media-files/Brand_Playbook.pdf"} title="Brand Playbook" isOpen={modal2} onClose={() => setModal2(false)} />
              {intimacyEngine && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setModal3(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Intimacy Engine</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full B2B conversion guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={intimacyEngine?.url || "/media-files/The Intimacy Engine_ Adapting Creator-Economy Engagement for High-Intent B2B Conversion.pdf"} title="The Intimacy Engine" isOpen={modal3} onClose={() => setModal3(false)} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Treat This Like a Business?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">We only work with creators serious about building a real empire. Apply now and let's map your exact growth strategy.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Start Your Strategy Call
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

