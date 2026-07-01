/**
 * BNE Footer — Noir Hacker Syndicate
 * Dark, minimal, with legal disclaimers and nav links
 */
import { Link } from "wouter";
import { Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(0.78_0.16_85/10%)] bg-[oklch(0.03_0.004_85)] relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute -right-20 -bottom-32 text-[20rem] font-bold text-[oklch(0.78_0.12_85/2%)] font-display leading-none pointer-events-none select-none">
        BNE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="insignia-mark" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem' }}>
                <Crown size={18} />
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
            <p className="text-[oklch(0.58_0.015_85)] text-sm leading-relaxed max-w-md font-body">
              BNE is the strategic partner for independent adult content creators who demand excellence. We architect privacy, compliance, growth, and monetization — so you can operate at the highest level.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.16_85/50%)] animate-pulse" />
              <span className="text-[oklch(0.78_0.14_85/70%)] text-xs font-mono-lux tracking-wider">SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[oklch(0.78_0.16_85)] font-semibold text-xs mb-5 tracking-widest font-body uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/tiers", label: "Structured Advisory" },
                { href: "/niche-matcher", label: "Niche Intelligence" },
                { href: "/services", label: "All Services" },
                { href: "/tools", label: "Creator Suite" },
                { href: "/compliance", label: "Legal Framework" },
                { href: "/onboarding", label: "Apply for Access" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-[oklch(0.58_0.015_85)] hover:text-[oklch(0.78_0.16_85)] text-sm transition-all duration-300 font-body cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[oklch(0.78_0.16_85)] font-semibold text-xs mb-5 tracking-widest font-body uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[oklch(0.58_0.015_85)] text-sm font-body">
              <li><span className="hover:text-[oklch(0.78_0.16_85)] cursor-pointer transition-all duration-300">Privacy Policy</span></li>
              <li><span className="hover:text-[oklch(0.78_0.16_85)] cursor-pointer transition-all duration-300">Terms of Service</span></li>
              <li><span className="hover:text-[oklch(0.78_0.16_85)] cursor-pointer transition-all duration-300">18 U.S.C. § 2257</span></li>
              <li><span className="hover:text-[oklch(0.78_0.16_85)] cursor-pointer transition-all duration-300">DMCA Policy</span></li>
              <li><span className="hover:text-[oklch(0.78_0.16_85)] cursor-pointer transition-all duration-300">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[oklch(0.45_0.01_85/70%)] text-xs font-mono-lux tracking-wide">
            © 2025 BLACKLISTED NICHE ENTERTAINMENT — ALL RIGHTS RESERVED
          </p>
          <p className="text-[oklch(0.40_0.008_85/60%)] text-xs font-mono-lux tracking-wide">
            ENGINEERED BY BLACKLISTED BINARY LABS · CHIEF ARCHITECT: ROB BRANTING
          </p>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-6 p-5 rounded-2xl bg-[oklch(0.78_0.16_85/3%)] border border-[oklch(0.78_0.16_85/8%)]">
          <p className="text-[oklch(0.50_0.012_85/80%)] text-xs leading-relaxed font-body">
            <strong className="text-[oklch(0.65_0.014_85)] font-semibold tracking-wide uppercase text-[10px]">Legal Framework</strong><br />
            Blacklisted Niche Entertainment provides digital marketing, brand architecture, compliance education, and strategic advisory services exclusively for adult content creators operating legally on licensed platforms within the United States. All engagements are conducted in strict adherence to applicable federal and state regulations. BNE does not facilitate, promote, or engage in any unlawful activities. All creators are required to maintain 18 U.S.C. § 2257 record-keeping compliance. This platform is intended exclusively for adults aged 18 and older.
          </p>
        </div>
      </div>
    </footer>
  );
}
