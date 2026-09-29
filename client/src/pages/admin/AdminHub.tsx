/**
 * AdminHub — the admin operations console home.
 * Not linked from any public page; reachable only by direct URL + admin role.
 */
import { Link } from "wouter";
import { MapPinOff, Fingerprint, ArrowRight, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import AdminGate from "./AdminGate";

const TOOLS = [
  {
    href: "/admin/geo-blocking",
    icon: MapPinOff,
    title: "Geo-Block Manager",
    tagline: "Client city / county / state blocking requests",
    body: "File and track per-client geo-blocking requests: pick states, counties, and cities from the US location database, generate platform-by-platform blocking instructions with copy-paste region lists, and move each profile from requested → configured → verified.",
    accent: "text-sky-400",
    ring: "hover:border-sky-800",
  },
  {
    href: "/admin/identity-shield",
    icon: Fingerprint,
    title: "Identity Shield",
    tagline: "Anti-facial-recognition & persona-separation toolkit",
    body: "Operational privacy tools for protecting a client's adult persona from identification: a working in-browser EXIF/metadata stripper, adversarial cloaking guidance (Fawkes-style poisoning), reverse-image exposure audits, and the full persona-firewall playbook that keeps stage identity, real identity, family, and day-job life in separate airtight compartments.",
    accent: "text-violet-400",
    ring: "hover:border-violet-800",
  },
];

export default function AdminHub() {
  return (
    <AdminGate>
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
        <Seo title="Admin Console" description="Site administration console." noIndex noFollow />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400/90">
              Restricted · Administrators only
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Operations Console
          </h1>
          <p className="text-zinc-400 max-w-2xl mb-10">
            Internal privacy and safety tooling for client work. Nothing here is
            linked from the public site, indexed by search engines, or visible
            to members. Client records use stage aliases only — never legal names.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`group block border border-zinc-800 rounded-2xl p-7 bg-zinc-950/70 transition ${t.ring} hover:bg-zinc-950`}
              >
                <t.icon className={`w-9 h-9 ${t.accent} mb-4`} />
                <h2 className="text-xl font-bold text-white mb-1">{t.title}</h2>
                <p className={`text-sm font-medium ${t.accent} mb-3`}>{t.tagline}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{t.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
                  Open tool <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 border border-zinc-800/80 rounded-xl p-5 bg-zinc-950/50">
            <h3 className="text-sm font-bold text-white mb-2">Handling rules</h3>
            <ul className="text-sm text-zinc-400 space-y-1.5 list-disc list-inside">
              <li>Stage aliases only in every record — no legal names, no real phone numbers, no home addresses.</li>
              <li>Screenshots of configured block lists go in the client's private file, never in chat logs.</li>
              <li>A profile moves to “verified” only after an admin confirms the live platform settings in person.</li>
              <li>Geo-blocking is IP-based and VPN-defeatable — set that expectation with every client, in writing.</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
