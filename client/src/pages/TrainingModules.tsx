/**
 * BNE Training Modules Page
 * Structured training modules and automation playbooks
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Video, BookOpen, ArrowRight, Zap, Crown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function TrainingModules() {
  const { getInfographicByKeyword } = useMediaCatalog();
  const guide = getInfographicByKeyword("Online_Automation_Course_for_Creators");

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Training Modules | Blacklisted University"
        description="Structured training modules and automation playbooks for creators. Step-by-step systems to build, grow, and scale your brand."
        canonical="/training-modules"
      />
      <Navigation />

      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              Training <span className="gradient-text-gold">Modules</span>
            </h1>
            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              From zero to empire in structured, actionable modules. Each module includes video lectures, worksheets, and real-world assignments.
            </p>
            <Link href="/university">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold text-sm font-semibold">
                <Video size={16} /> View Full University <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold font-mono-lux tracking-widest uppercase">Automation Course</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-4 font-display">Online Automation Course for Creators</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {guide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setModalOpen(true)}
                  className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)] cursor-pointer hover:border-[oklch(0.78_0.16_85/30%)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Online Automation Course</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full module</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={guide?.url || "/media-files/Online_Automation_Course_for_Creators.png"} title="Online Automation Course for Creators" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 font-display mb-4">Module Breakdown</h3>
              <ul className="space-y-3">
                {[
                  "Content automation workflows",
                  "Fan relationship management systems",
                  "Passive income stream architecture",
                  "Platform diversification tactics",
                  "Revenue tracking and goal modeling",
                ].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Zap size={14} className="text-[oklch(0.78_0.16_85)]" /> {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Learning Random Hacks. Start Mastering Systems.</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Enroll in Blacklisted University and get structured, repeatable training that transforms your creator business.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Enroll Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

