import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, X } from "lucide-react";
import bneLogo from "../../../BNE logo2.png";
import Seo from "@/components/Seo";

function AgeGate() {
  const [confirmed, setConfirmed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [_, navigate] = useLocation();
  const [isEntering, setIsEntering] = useState(false);
  const [introSequence, setIntroSequence] = useState<"playing" | "done">("playing");

  useEffect(() => {
    if (confirmed && !isEntering) {
      // If already confirmed in a previous session, skip the gate instantly
      navigate("/home");
    }
  }, [confirmed, isEntering, navigate]);

  useEffect(() => {
    const stored = localStorage.getItem("bne-age-confirmed");
    if (stored === "true") setConfirmed(true);
    if (stored === "blocked") setBlocked(true);
  }, []);

  const confirm = () => {
    localStorage.setItem("bne-age-confirmed", "true");
    setIsEntering(true);
    
    // Play a brief entry animation, then navigate
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };

  const deny = () => {
    localStorage.setItem("bne-age-confirmed", "blocked");
    setBlocked(true);
  };

  if (blocked) {
    return (
      <div className="min-h-screen bg-[oklch(0.05_0.004_85)] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <Seo title="Verification Required" description="BNE Studio operations gate. Verification required to view adult content creator operations." noIndex={true} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md w-full"
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-black font-display text-zinc-100 tracking-tight">Access Restricted</h1>
          <p className="mt-4 text-zinc-400 font-body leading-relaxed">
            BNE Studio materials are strictly reserved for individuals 18 years of age or older.
          </p>
        </motion.div>
      </div>
    );
  }

  // If confirmed and not playing entry animation, render nothing while redirecting
  if (confirmed && !isEntering) return null;

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden selection:bg-violet-500/30 p-4">
      <Seo title="Verification Required" description="BNE Studio operations gate. Verification required to view adult content creator operations." noIndex={true} />
      
      {/* Cinematic Intro Overlay */}
      <AnimatePresence>
        {introSequence === "playing" && !confirmed && !blocked && (
          <motion.div
            key="intro-sequence"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
          >
            {/* Cinematic Background Glows */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/5 via-[oklch(0.78_0.16_85/10%)] to-violet-500/5 blur-[100px] rounded-full"
            />
            
            {/* Flying Logo */}
            <div className="relative">
              <motion.img
                src={bneLogo}
                alt="BNE Studio"
                className="w-64 sm:w-80 h-auto relative z-10"
                initial={{ scale: 0, x: 400, y: -400, rotate: 45, filter: "brightness(0.5) blur(20px)" }}
                animate={{ scale: 1, x: 0, y: 0, rotate: 0, filter: "brightness(1.5) blur(0px) drop-shadow(0 0 50px rgba(212,175,55,0.7))" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Red Stamp */}
              <motion.div
                initial={{ scale: 5, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: -5 }}
                transition={{ delay: 1.4, duration: 0.3, type: "spring", stiffness: 200, damping: 12 }}
                onAnimationComplete={() => {
                  setTimeout(() => setIntroSequence("done"), 1200);
                }}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              >
                <div 
                  className="border-4 sm:border-8 border-red-600 px-6 py-2 rounded-xl text-red-600 font-black font-display text-5xl sm:text-7xl tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(220,38,38,0.9)] bg-black/40 backdrop-blur-md" 
                  style={{ textShadow: "0 0 25px rgba(220,38,38,0.9)" }}
                >
                  ADULTS ONLY
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI fades in after intro is done */}
      {introSequence === "done" && (
        <>
          {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[150px] rounded-[100%]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isEntering ? 0 : 1, 
          scale: isEntering ? 1.05 : 1,
          filter: isEntering ? "blur(10px)" : "blur(0px)",
          y: isEntering ? -20 : 0
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[560px]"
      >
        <div className="luxury-card border-[oklch(0.78_0.16_85/20%)] bg-zinc-950/60 backdrop-blur-2xl p-8 sm:p-12 overflow-hidden relative shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.78_0.16_85)] to-transparent opacity-50" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <img
                src={bneLogo}
                alt="B.N.E. Studio"
                className="w-40 sm:w-48 h-auto drop-shadow-2xl"
              />
            </motion.div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-violet-300 font-mono-lux">
                Verification Required
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-display text-zinc-100 tracking-tight leading-tight">
              Adults (18+) Only Permitted
            </h1>
            
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-300 font-body max-w-[400px] mx-auto">
              BNE Studio operates exclusively in the adult entertainment and erotic content creator industries. By entering, you confirm you are 18+ and consent to viewing explicit, uncensored business materials.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3.5 mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={confirm}
              className="group relative w-full h-14 rounded-xl flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-[oklch(0.78_0.16_85)] via-[oklch(0.85_0.15_90)] to-[oklch(0.78_0.16_85)] text-zinc-950 font-bold text-sm tracking-wide shadow-[0_0_30px_oklch(0.78_0.16_85/30%)] transition-all hover:shadow-[0_0_40px_oklch(0.78_0.16_85/50%)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                I Confirm I Am 18+
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>

            <motion.button
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              onClick={deny}
              className="w-full h-14 rounded-xl border border-white/10 bg-transparent flex items-center justify-center text-zinc-400 font-semibold text-sm transition-colors hover:text-zinc-200"
            >
              I Am Under 18 — Exit
            </motion.button>
          </div>

          {/* Footer Security Note */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-zinc-600 font-mono-lux tracking-wider uppercase">
              100% Encrypted • § 2257 Compliant Platform
            </p>
          </div>

        </div>
      </motion.div>
      </>
      )}
    </div>
  );
}

export default AgeGate;

