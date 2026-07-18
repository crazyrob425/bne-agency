/**
 * BNE Navigation — v2.0 "Syndicate" Architecture
 * A premium, hierarchical navigation system with mega menus, designed for clarity,
 * discoverability, and conversion.
 *
 * Features:
 * - Glassmorphism sticky header with scroll-based transformations.
 * - Multi-column mega menus with featured CTA cards.
 * - Fully redesigned, accordion-based mobile navigation panel.
 * - Integrated micro-interactions, hover effects, and smooth transitions.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Layers, Zap, Wrench, Shield, FileText, Menu, X, ChevronRight, BookOpen,
  Crown, TrendingUp, DollarSign, Users, BarChart3, Sparkles, Package,
  ArrowRight, Briefcase, Target, Video, Settings, MessageSquare,
  Heart, Monitor, Download, Calculator, Award, Lock, Calendar
} from "lucide-react";

const MEMBER_APP_URL = "/members";
const openMemberApp = () => {
  window.location.href = MEMBER_APP_URL;
};

//#region Navigation Data Structure
const navConfig = [
  { id: "home", label: "Home", href: "/home" },
  {
    id: "solutions",
    label: "Solutions",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Revenue Growth",
          links: [
            { label: "Monetization Systems", href: "/services", icon: DollarSign },
            { label: "Scaling Frameworks", href: "/services", icon: TrendingUp },
            { label: "Revenue Optimization", href: "/services", icon: BarChart3 },
          ],
        },
        {
          heading: "Strategic Advisory",
          links: [
            { label: "Structured Advisory", href: "/tiers", icon: Briefcase },
            { label: "Business Strategy", href: "/services", icon: Sparkles },
            { label: "Creator Positioning", href: "/services", icon: Target },
          ],
        },
        {
          heading: "Niche Intelligence",
          links: [
            { label: "Niche Matcher", href: "/niche-matcher", icon: Zap },
            { label: "Audience Intelligence", href: "/niche-matcher", icon: Users },
            { label: "Market Analysis", href: "/niche-matcher", icon: Layers },
          ],
        },
      ],
      featured: {
        title: "Find Your Niche & Double Your Earnings",
        description: "Our proprietary quiz analyzes your unique traits against 1,052 market segments to find your most profitable niche.",
        href: "/niche-matcher",
        cta: "Run Analysis",
        icon: Zap,
      },
    },
  },
  {
    id: "services",
    label: "Services",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Operations",
          links: [
            { label: "Backend Management", href: "/services", icon: Settings },
            { label: "Booking Management", href: "/posting-and-scheduling", icon: Calendar },
            { label: "Creator Operations", href: "/services", icon: Wrench },
          ],
        },
        {
          heading: "Growth",
          links: [
            { label: "Advertising Systems", href: "/services", icon: MessageSquare },
            { label: "Traffic Strategy", href: "/services", icon: TrendingUp },
            { label: "Monetization", href: "/services", icon: DollarSign },
          ],
        },
        {
          heading: "Protection",
          links: [
            { label: "Privacy Systems", href: "/compliance", icon: Shield },
            { label: "Security Measures", href: "/compliance", icon: Lock },
            { label: "Screening Systems", href: "/posting-and-scheduling", icon: Users },
          ],
        },
      ],
      featured: {
        title: "We Handle The Grind & The Danger",
        description: "Full-service management for your entire business backend, from client vetting to legal compliance.",
        href: "/services",
        cta: "Explore All Services",
        icon: Shield,
      },
    },
  },
  {
    id: "creator-os",
    label: "Creator OS",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Creator Suite",
          links: [
            { label: "Dashboard", href: "/tools", icon: Home },
            { label: "Planning Tools", href: "/tools/workflow-manager", icon: Calendar },
            { label: "Performance Utilities", href: "/tools", icon: BarChart3 },
          ],
        },
        {
          heading: "Resource Vault",
          links: [
            { label: "Download Library", href: "/downloads", icon: Download },
            { label: "Templates", href: "/downloads", icon: FileText },
            { label: "Resources", href: "/downloads", icon: Package },
          ],
        },
        {
          heading: "Automation",
          links: [
            { label: "Workflow Systems", href: "/tools/workflow-manager", icon: Zap },
            { label: "Revenue Calculators", href: "/tools/calculator", icon: Calculator },
            { label: "Creator Utilities", href: "/tools", icon: Wrench },
          ],
        },
      ],
    },
  },
  {
    id: "academy",
    label: "Academy",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Blacklisted University",
          links: [
            { label: "All Courses", href: "/university", icon: Crown },
            { label: "Training Modules", href: "/university", icon: Video },
            { label: "Guides", href: "/blog", icon: BookOpen },
          ],
        },
        {
          heading: "Intelligence Hub",
          links: [
            { label: "Intel", href: "/blog", icon: BookOpen },
            { label: "Industry Analysis", href: "/blog", icon: Layers },
            { label: "Trends", href: "/blog", icon: TrendingUp },
          ],
        },
        {
          heading: "Case Studies",
          links: [
            { label: "Success Stories", href: "/blog", icon: Sparkles },
            { label: "Growth Examples", href: "/blog", icon: BarChart3 },
            { label: "Playbooks", href: "/blog", icon: FileText },
          ],
        },
      ],
    },
  },
  {
    id: "compliance",
    label: "Compliance",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Compliance Center",
          links: [
            { label: "Compliance Standards", href: "/compliance", icon: Shield },
            { label: "Terms", href: "/compliance", icon: FileText },
            { label: "Policies", href: "/compliance", icon: FileText },
          ],
        },
        {
          heading: "Protection",
          links: [
            { label: "Privacy Systems", href: "/compliance", icon: Lock },
            { label: "Data Protection", href: "/compliance", icon: Shield },
            { label: "Account Security", href: "/compliance", icon: Shield },
          ],
        },
        {
          heading: "Requirements",
          links: [
            { label: "2257 Compliance", href: "/compliance", icon: Award },
            { label: "Documentation", href: "/compliance", icon: FileText },
            { label: "Compliance Resources", href: "/compliance", icon: BookOpen },
          ],
        },
      ],
      featured: {
        title: "Your Legal & Privacy Fortress",
        description: "Navigate the complex legal landscape of the adult industry with confidence. We keep you protected and compliant.",
        href: "/compliance",
        cta: "Enter The Vault",
        icon: Shield,
      },
    },
  },
];
//#endregion

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

  return (
    <>
      {/* Desktop / Tablet Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-[oklch(0.04_0.005_85/96%)] backdrop-blur-2xl border-b border-[oklch(0.78_0.16_85/12%)] shadow-[0_4px_40px_oklch(0_0_0/40%),0_0_60px_oklch(0.78_0.16_85/5%)]"
            : "h-20 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
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
            <div className="hidden lg:flex items-center gap-2">
              {navConfig.map((item) => (
                <div key={item.id} onMouseEnter={() => setActiveMenu(item.id)}>
                  {item.href ? (
                    <Link href={item.href}>
                      <NavItem item={item} location={location} />
                    </Link>
                  ) : (
                    <NavItem item={item} location={location} />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/niche-matcher">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold-outline px-5 py-2 text-sm">
                  Find Your Niche
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-5 py-2 text-sm">
                  Apply to B.N.E.
                </motion.button>
              </Link>
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

          {/* Mega Menu Container */}
          <MegaMenu activeMenu={activeMenu} />
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
              initial={{ x: "100%" }}
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
              <nav className="flex-1 overflow-y-auto p-4 flex flex-col">
                {/* Main Links */}
                <div className="flex flex-col gap-1.5">
                  {navConfig.map((item, i) => (
                    <MobileNavItem key={item.id} item={item} i={i} />
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-[oklch(0.78_0.16_85/10%)]" />

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Link href="/niche-matcher">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="btn-gold-outline w-full text-sm"
                    >
                      Find Your Niche
                    </motion.div>
                  </Link>
                  <Link href="/apply">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.3 }}
                      className="btn-gold w-full text-sm"
                    >
                      Apply to B.N.E.
                    </motion.div>
                  </Link>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    onClick={openMemberApp}
                    className="w-full text-sm font-medium text-[oklch(0.65_0.012_85)] hover:text-[oklch(0.88_0.014_85)] py-3"
                  >
                    Member Access
                  </motion.button>
                </div>

                {/* Footer Links */}
                <div className="mt-auto pt-6 text-center text-xs text-[oklch(0.58_0.015_85)] space-x-4">
                  <Link href="/compliance"><span className="hover:text-white">Privacy</span></Link>
                  <Link href="/compliance"><span className="hover:text-white">Terms</span></Link>
                  <Link href="/compliance"><span className="hover:text-white">2257</span></Link>
                </div>
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

//#region Sub-components
function NavItem({ item, location }: { item: any; location: string }) {
  const isActive = item.href === location;
  return (
    <div className="relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer text-[oklch(0.8_0.012_85)] hover:text-white hover:bg-[oklch(0.78_0.16_85/6%)]">
      {item.label}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[oklch(0.78_0.16_85)]"
        />
      )}
    </div>
  );
}

function MegaMenu({ activeMenu }: { activeMenu: string | null }) {
  const menuData = navConfig.find(item => item.id === activeMenu)?.menu;

  if (!menuData || menuData.type !== 'mega') return null;

  return (
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2"
        >
          <div className="mt-2 w-[720px] rounded-2xl border border-[oklch(0.78_0.16_85/15%)] bg-[oklch(0.06_0.005_85/98%)] p-6 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-4 gap-6">
              {/* Link Columns */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                {menuData.columns.map((col) => (
                  <div key={col.heading}>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.58_0.015_85)] mb-4">
                      {col.heading}
                    </h3>
                    <ul className="space-y-3">
                      {col.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.label}>
                            <Link href={link.href}>
                              <div className="group flex items-center gap-3 cursor-pointer">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/15%)] text-[oklch(0.78_0.16_85)] transition-colors group-hover:bg-[oklch(0.78_0.16_85/15%)]">
                                  <Icon size={16} />
                                </div>
                                <span className="text-sm font-medium text-[oklch(0.8_0.012_85)] transition-colors group-hover:text-white">
                                  {link.label}
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Card */}
              {menuData.featured && (
                <div className="col-span-1">
                  <Link href={menuData.featured.href}>
                    <div className="h-full rounded-xl p-5 flex flex-col justify-between bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] hover:border-[oklch(0.78_0.16_85/40%)] transition-all cursor-pointer">
                      <div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.78_0.16_85/15%)] text-[oklch(0.78_0.16_85)] mb-3">
                          <menuData.featured.icon size={16} />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{menuData.featured.title}</h4>
                        <p className="text-xs text-[oklch(0.65_0.012_85)] leading-relaxed">{menuData.featured.description}</p>
                      </div>
                      <div className="text-sm font-semibold text-[oklch(0.78_0.16_85)] flex items-center gap-1 mt-4">
                        {menuData.featured.cta} <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavItem({ item, i }: { item: any; i: number }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.href) {
    return (
      <Link href={item.href}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-[oklch(0.8_0.012_85)] hover:text-white hover:bg-[oklch(0.78_0.16_85/6%)]"
        >
          {item.label}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.04, duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-[oklch(0.8_0.012_85)] hover:text-white hover:bg-[oklch(0.78_0.16_85/6%)]"
      >
        {item.label}
        <ChevronRight size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && item.menu?.columns && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden pl-6"
          >
            <div className="py-2 space-y-1 border-l border-[oklch(0.78_0.16_85/10%)]">
              {item.menu.columns.flatMap((col: any) => col.links).map((link: any) => {
                const Icon = link.icon;
                return (
                  <Link key={link.label} href={link.href}>
                    <div className="group flex items-center gap-3 pl-4 pr-2 py-2 rounded-r-lg cursor-pointer hover:bg-[oklch(0.78_0.16_85/6%)]">
                      <Icon size={15} className="text-[oklch(0.65_0.012_85)] group-hover:text-[oklch(0.78_0.16_85)]" />
                      <span className="text-sm text-[oklch(0.65_0.012_85)] group-hover:text-white">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
//#endregion