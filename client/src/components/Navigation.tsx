/**
 * BNE Navigation — Noir Hacker Syndicate
 * Slim top bar on desktop, bottom-drawer on mobile
 * Glassmorphism backdrop, violet neon accents
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Layers, Zap, Wrench, Shield, FileText, Menu, X, ChevronRight, BookOpen, CreditCard
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tiers", label: "Service Tiers", icon: Layers },
  { href: "/niche-matcher", label: "Niche Matcher", icon: Zap },
  { href: "/creator-tools", label: "Creator Tools", icon: Wrench },
  { href: "/compliance", label: "Legal Vault", icon: Shield },
  { href: "/blog", label: "Resources", icon: BookOpen },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/onboarding", label: "Get Started", icon: FileText, cta: true },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Desktop / Tablet Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.08_0.01_265/90%)] backdrop-blur-xl border-b border-white/8 shadow-[0_4px_30px_oklch(0.627_0.265_303.9/15%)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center glow-violet">
                  <span className="text-white font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>B</span>
                </div>
                <div>
                  <span className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
                    BLACKLISTED
                  </span>
                  <span className="text-violet-400 font-bold text-sm tracking-tight ml-1" style={{ fontFamily: 'Space Grotesk' }}>
                    NICHE
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.filter(l => !l.cta).map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location === href
                      ? "text-violet-400 bg-violet-500/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`} style={{ fontFamily: 'DM Sans' }}>
                    <Icon size={14} />
                    {label}
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg btn-neon text-sm"
                >
                  <FileText size={14} />
                  Apply Now
                  <ChevronRight size={12} />
                </motion.button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden glass-card rounded-l-2xl border-r-0 border-white/10"
              style={{ background: "oklch(0.10 0.012 265 / 97%)" }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <span className="text-white font-bold" style={{ fontFamily: 'Space Grotesk' }}>Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="p-4 flex flex-col gap-1">
                {navLinks.map(({ href, label, icon: Icon, cta }) => (
                  <Link key={href} href={href}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      cta
                        ? "btn-neon text-white mt-2"
                        : location === href
                          ? "text-violet-400 bg-violet-500/10"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                    }`} style={{ fontFamily: 'DM Sans' }}>
                      <Icon size={16} />
                      {label}
                      {cta && <ChevronRight size={14} className="ml-auto" />}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-6 left-4 right-4 text-center">
                <p className="text-xs text-zinc-600 mono-stat">BNE — Built for Creators, By Creators</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
