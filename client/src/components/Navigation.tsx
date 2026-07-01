/**
 * BNE Navigation — Black & Gold Luxury
 * Slim top bar on desktop, spring-physics glassmorphism sidebar on mobile
 * Gold accents, premium motion, luxury insignia logo
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Home, Layers, Zap, Wrench, Shield, FileText, Menu, X, ChevronRight, BookOpen, CreditCard,
  Heart, Monitor, Download, Crown
} from "lucide-react";

const MEMBER_APP_URL = "/members";
const openMemberApp = () => {
  window.location.href = MEMBER_APP_URL;
};

const desktopActionButtonClass = "btn-gold px-5 py-2.5 text-sm inline-flex w-[13rem] items-center justify-center gap-2 hidden sm:block";
const mobileActionButtonClass = "btn-gold mt-3 w-full inline-flex items-center justify-center gap-2";

const navLinks: { href: string; label: string; icon: React.ElementType; cta?: boolean }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tiers", label: "Ala Carte Menu", icon: CreditCard },
  { href: "/niche-matcher", label: "Niche Intelligence", icon: Zap },
  { href: "/tools", label: "Creator Suite", icon: Wrench },
  { href: "/services", label: "All Services", icon: Monitor },
  { href: "/downloads", label: "Asset Vault", icon: Download },
  { href: "/compliance", label: "Legal Framework", icon: Shield },
  { href: "/university", label: "Blacklisted University", icon: Crown },
  { href: "/blog", label: "Intelligence", icon: BookOpen },
  { href: "/onboarding", label: "Apply for Access", icon: FileText, cta: true },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Magnetic cursor for CTA button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.2);
    mouseY.set((e.clientY - centerY) * 0.2);
  };

  const handleMagneticLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      {/* Desktop / Tablet Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.04_0.005_85/96%)] backdrop-blur-2xl border-b border-[oklch(0.78_0.16_85/12%)] shadow-[0_4px_40px_oklch(0_0_0/40%),0_0_60px_oklch(0.78_0.16_85/5%)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Luxury Insignia Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="insignia-mark group-hover:scale-105 transition-transform duration-300">
                  <Crown size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[oklch(0.94_0.01_85)] font-semibold text-sm tracking-wide font-body">
                    BLACKLISTED
                  </span>
                  <span className="text-[oklch(0.78_0.16_85)] font-medium text-xs tracking-widest font-body uppercase">
                    Niche Entertainment
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.filter(l => !l.cta).map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <motion.div
                    whileHover={{ y: -1 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      location === href
                        ? "text-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/10%)]"
                        : "text-[oklch(0.65_0.012_85)] hover:text-[oklch(0.88_0.014_85)] hover:bg-[oklch(0.78_0.16_85/6%)]"
                    }`}
                    style={{ fontFamily: 'Outfit' }}
                  >
                    <Icon size={14} className="opacity-70" />
                    {label}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-xl text-[oklch(0.65_0.012_85)] hover:text-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.78_0.16_85/8%)] transition-all duration-300"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Centered Row 2 for screens >= sm */}
          <div className="hidden sm:flex justify-center items-center gap-4 pb-4 pt-1 border-t border-[oklch(0.78_0.16_85/8%)]">
            <Link href="/onboarding">
              <motion.button
                style={{ x: magneticX, y: magneticY }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-5 py-2.5 text-sm inline-flex w-[13rem] items-center justify-center gap-2"
              >
                <Crown size={14} />
                Apply for Access
                <ChevronRight size={12} />
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openMemberApp}
              className="btn-gold px-5 py-2.5 text-sm inline-flex w-[13rem] items-center justify-center gap-2"
            >
              <Crown size={14} />
              Login Member's Portal
              <ChevronRight size={12} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer — Glassmorphism Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[oklch(0_0_0/70%)] backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 lg:hidden luxury-card-elevated rounded-l-3xl border-r-0 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center gap-3">
                  <div className="insignia-mark" style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', fontSize: '1rem' }}>
                    <Crown size={14} />
                  </div>
                  <span className="text-[oklch(0.94_0.01_85)] font-semibold text-sm tracking-wide font-body">
                    Navigation
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-[oklch(0.65_0.012_85)] hover:text-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.78_0.16_85/8%)] transition-all"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Drawer Nav Links */}
              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
                {navLinks.map(({ href, label, icon: Icon, cta }, i) => (
                  <Link key={href} href={href}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        cta
                          ? mobileActionButtonClass
                          : location === href
                            ? "text-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/12%)]"
                            : "text-[oklch(0.65_0.012_85)] hover:text-[oklch(0.88_0.014_85)] hover:bg-[oklch(0.78_0.16_85/6%)]"
                      }`}
                      style={{ fontFamily: 'Outfit' }}
                    >
                      <Icon size={17} className={cta ? "" : "opacity-65"} />
                      {label}
                      {cta && <ChevronRight size={14} className="ml-auto opacity-70" />}
                    </motion.div>
                  </Link>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={openMemberApp}
                  className={mobileActionButtonClass}
                >
                  <Crown size={14} />
                  Login Member's Portal
                  <ChevronRight size={12} />
                </motion.button>
              </nav>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-[oklch(0.78_0.16_85/10%)]">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.16_85/50%)]" />
                  <p className="text-xs text-[oklch(0.58_0.015_85)] font-body tracking-wide">
                    BNE — Engineered for Excellence
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}