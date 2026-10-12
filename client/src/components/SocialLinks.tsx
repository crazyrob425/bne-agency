/**
 * SocialLinks — reusable social icon rows for both Blacklisted brands.
 * Used in the footer, mobile nav drawer, article pages, and contact sections.
 */
import { Facebook, Youtube } from "lucide-react";
import { SOCIAL_BRANDS, type SocialBrand } from "@/data/socialLinks";

/** Stylized Bluesky butterfly (lucide has no brand icon for it). */
function BlueskyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="7.2" cy="9" rx="4.2" ry="5.2" transform="rotate(-18 7.2 9)" />
      <ellipse cx="16.8" cy="9" rx="4.2" ry="5.2" transform="rotate(18 16.8 9)" />
      <ellipse cx="8.4" cy="16.4" rx="2.7" ry="3.2" transform="rotate(-14 8.4 16.4)" />
      <ellipse cx="15.6" cy="16.4" rx="2.7" ry="3.2" transform="rotate(14 15.6 16.4)" />
      <rect x="11" y="6.5" width="2" height="11" rx="1" />
    </svg>
  );
}

/** Pinterest "P" medallion (lucide has no brand icon for it). */
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="Georgia, serif"
        fill="currentColor"
      >
        P
      </text>
    </svg>
  );
}

function BrandIcon({ name, size = 18 }: { name: string; size?: number }) {
  switch (name) {
    case "Facebook":
      return <Facebook size={size} />;
    case "YouTube":
      return <Youtube size={size} />;
    case "Bluesky":
      return <BlueskyIcon size={size} />;
    case "Pinterest":
      return <PinterestIcon size={size} />;
    default:
      return null;
  }
}

interface SocialLinksProps {
  /** Which brand(s) to show. Defaults to "all". */
  brand?: SocialBrand["id"] | "all";
  /** Show the handle text under each icon. */
  showLabels?: boolean;
  /** Icon pixel size. */
  iconSize?: number;
  className?: string;
}

export default function SocialLinks({ brand = "all", showLabels = false, iconSize = 18, className = "" }: SocialLinksProps) {
  const brands = brand === "all" ? SOCIAL_BRANDS : SOCIAL_BRANDS.filter((b) => b.id === brand);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {brands.map((b) => (
        <div key={b.id}>
          {brand === "all" && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono-lux mb-2.5">
              {b.label}
            </p>
          )}
          <div className="flex items-center gap-2.5">
            {b.accounts.map((a) => (
              <a
                key={a.name}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${b.label} on ${a.name} (${a.handle})`}
                title={`${a.name} — ${a.handle}`}
                className="group flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-[oklch(0.78_0.16_85)] hover:border-[oklch(0.78_0.16_85/40%)] hover:bg-[oklch(0.78_0.16_85/8%)] transition-all duration-200"
              >
                <BrandIcon name={a.name} size={iconSize} />
                {showLabels && (
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300 pr-1">{a.handle}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
