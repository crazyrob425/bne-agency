/**
 * Social account registry — the single source of truth for every
 * Blacklisted social profile linked anywhere on the site.
 *
 * BNE Studio = the creator-services brand (blacklisted.studio).
 * Blacklisted Designs Studio = the web-design brand (design.blacklisted.studio).
 */

export interface SocialAccount {
  name: "Facebook" | "YouTube" | "Bluesky" | "Pinterest";
  href: string;
  handle: string;
}

export interface SocialBrand {
  id: "bne-studio" | "designs-studio";
  label: string;
  tagline: string;
  accounts: SocialAccount[];
}

export const SOCIAL_BRANDS: SocialBrand[] = [
  {
    id: "bne-studio",
    label: "BNE Studio",
    tagline: "Creator growth, daily",
    accounts: [
      { name: "Facebook", href: "https://www.facebook.com/61593894166922", handle: "BNE Studio" },
      { name: "YouTube", href: "https://www.youtube.com/@bnestudio", handle: "@bnestudio" },
      { name: "Bluesky", href: "https://bsky.app/profile/blacklistedstudio.bsky.social", handle: "@blacklistedstudio.bsky.social" },
      { name: "Pinterest", href: "https://www.pinterest.com/bnestudiohq/", handle: "@bnestudiohq" },
    ],
  },
  {
    id: "designs-studio",
    label: "Blacklisted Designs Studio",
    tagline: "Design & dev, daily",
    accounts: [
      { name: "Facebook", href: "https://www.facebook.com/61587593900494", handle: "Blacklisted Designs Studio" },
      { name: "YouTube", href: "https://www.youtube.com/@blacklisted.designs", handle: "@blacklisted.designs" },
      { name: "Bluesky", href: "https://bsky.app/profile/blacklisteddesigns.bsky.social", handle: "@blacklisteddesigns.bsky.social" },
      { name: "Pinterest", href: "https://www.pinterest.com/blacklisteddesigns/", handle: "@blacklisteddesigns" },
    ],
  },
];

export function getSocialBrand(id: SocialBrand["id"]): SocialBrand {
  return SOCIAL_BRANDS.find((b) => b.id === id)!;
}
