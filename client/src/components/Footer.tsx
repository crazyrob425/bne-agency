/**
 * BNE Footer — Noir Hacker Syndicate
 * Dark, minimal, with legal disclaimers and nav links
 */
import { Link } from "wouter";
import { Shield, Zap, Layers, Wrench, FileText, Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[oklch(0.07_0.01_265)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>B</span>
              </div>
              <span className="text-white font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                BLACKLISTED NICHE ENTERTAINMENT
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm" style={{ fontFamily: 'DM Sans' }}>
              BNE is the digital agency for independent adult content creators who are done leaving money on the table. We handle the business side — privacy, compliance, scaling, monetization — so you can stay focused on creating.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs mono-stat">SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-zinc-300 font-semibold text-sm mb-3" style={{ fontFamily: 'Space Grotesk' }}>NAVIGATION</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home", icon: Home },
                { href: "/tiers", label: "Service Tiers", icon: Layers },
                { href: "/niche-matcher", label: "Niche Matcher", icon: Zap },
                { href: "/creator-tools", label: "Creator Tools", icon: Wrench },
                { href: "/compliance", label: "Legal Vault", icon: Shield },
                { href: "/onboarding", label: "Apply Now", icon: FileText },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <div className="flex items-center gap-2 text-zinc-500 hover:text-violet-400 text-sm transition-colors" style={{ fontFamily: 'DM Sans' }}>
                      <Icon size={12} />
                      {label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-zinc-300 font-semibold text-sm mb-3" style={{ fontFamily: 'Space Grotesk' }}>LEGAL</h4>
            <ul className="space-y-2 text-zinc-500 text-sm" style={{ fontFamily: 'DM Sans' }}>
              <li><span className="hover:text-violet-400 cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-violet-400 cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-violet-400 cursor-pointer transition-colors">18 U.S.C. § 2257</span></li>
              <li><span className="hover:text-violet-400 cursor-pointer transition-colors">DMCA Policy</span></li>
              <li><span className="hover:text-violet-400 cursor-pointer transition-colors">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs mono-stat">
            © 2025 BLACKLISTED NICHE ENTERTAINMENT — ALL RIGHTS RESERVED
          </p>
          <p className="text-zinc-700 text-xs mono-stat">
            DEVELOPED BY BLACKLISTED BINARY LABS · CHIEF ARCHITECT: ROB BRANTING
          </p>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-4 p-4 rounded-lg bg-white/3 border border-white/5">
          <p className="text-zinc-600 text-xs leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
            <strong className="text-zinc-500">LEGAL DISCLAIMER:</strong> Blacklisted Niche Entertainment provides digital marketing, branding, compliance education, and business management consulting services exclusively for adult content creators operating legally on licensed platforms in the United States. All services are provided in strict compliance with applicable federal and state laws. BNE does not facilitate, promote, or engage in any illegal activities. All creators are required to comply with 18 U.S.C. § 2257 record-keeping requirements. This website is intended for adults aged 18 and older only.
          </p>
        </div>
      </div>
    </footer>
  );
}
