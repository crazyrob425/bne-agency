/**
 * BNE Booking Management Page
 * In-person booking, vetting, and calendar optimization
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import InfographicModal from "@/components/InfographicModal";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { Calendar, Users, Shield, ArrowRight, Lock, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function BookingManagement() {
  const { getVideoByKeyword, getInfographicByKeyword } = useMediaCatalog();
  const video = getVideoByKeyword("Transition_to_Inperson_income");
  const checklist = getInfographicByKeyword("Venue_Requirements_Checklist");

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Booking Management | BNE Agency"
        description="Take your income in-person with complete safety. BNE handles vetting, classified advertising, calendar management, and client screening."
        canonical="/booking-management"
      />
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Operations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Booking <span className="text-[oklch(0.78_0.16_85)]">Management</span>
            </h1>
            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
              In-person income is where the real money stacks, but it requires a bulletproof safety firewall. We handle the ads, the vetting, the scheduling, and the VOIP masking so you only meet vetted, high-value clients.
            </p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
                Safe-Book With BNE
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Transition to In-Person Income
              </h2>
              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
                Taking your business in-person is the fastest way to stack massive bags, but it requires a bulletproof firewall. Learn how we screen clients like a secret service agent, mask your phone line, and fill your calendar with vetted high-value clients.
              </p>
              {video && (
                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
                </div>
              )}
              {!video && (
                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
                  Video asset not found. Please add Transition_to_Inperson_income.mp4 to the media folder.
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <Users size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Rigorous Client Vetting</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">Background checks, reference verification, and blacklist screening ensure you only meet legitimate, respectful clients.</p>
              </div>
              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Venue & Logistics</h3>
                </div>
                <p className="text-[oklch(0.65_0.012_85)] text-sm">We manage venue requirements checklist, location security, and scheduling logistics so you show up prepared and protected.</p>
              </div>
              {checklist && (
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
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Venue Requirements Checklist</h3>
                      <p className="text-[oklch(0.65_0.012_85)] text-sm">Click to view the full checklist</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <InfographicModal url={checklist?.url || "/media-files/Venue_Requirements_Checklist.pdf"} title="Venue Requirements Checklist" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Real Safety. Real Luxury. Real Income.</h2>
            <p className="text-[oklch(0.7_0.012_85)] mb-8">Our managed booking service handles the entire lifecycle — from ad posting to client screening to calendar fills. You just show up.</p>
            <Link href="/apply">
              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
                Explore Booking Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

