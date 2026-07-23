/**
 * BNE Structured Advisory Page
 * Flat-rate advisory and brand management tiers
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Briefcase, TrendingUp, Crown, ArrowRight, Zap, Shield, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function StructuredAdvisory() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const infographic1 = getInfographicByKeyword("Professional_Creator_Management_Services");
  const infographic2 = getInfographicByKeyword("Brand_Playbook");

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Structured Advisory | BNE Agency"
        description="BNE's flat-rate advisory and brand management packages designed for creators who prefer transparent pricing over profit-sharing."
        canonical="/structured-advisory"
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
              Structured <span className="text-[oklch(0.78_0.16_85)]">Advisory</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              Transparent, flat-rate advisory and marketing packages designed to protect your brand, automate your operations, and maximize your revenue at every stage of your career. No profit sharing. No surprises.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Explore Advisory Packages
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Professional Creator Management Services</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                From identity architecture to revenue automation, our advisory suites cover every pillar of a successful creator business. Choose the level of involvement that fits your goals.
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
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Management Services Overview</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view full service matrix</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic1?.url || "/media-files/Professional_Creator_Management_Services.png"} title="Professional Creator Management Services" isOpen={modal1} onClose={() => setModal1(false)} />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Brand Playbook</h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Your brand is your most valuable asset. Our brand playbook covers positioning, visual identity, voice, and growth strategy so you stand out in a saturated market.
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
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Brand Playbook</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full guide</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={infographic2?.url || "/media-files/Brand_Playbook.pdf"} title="Brand Playbook" isOpen={modal2} onClose={() => setModal2(false)} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready for a Different Kind of Partnership?</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Whether you want flat-rate advisory or a full management partnership, we have a seat at the table for you.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Apply to BNE
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

