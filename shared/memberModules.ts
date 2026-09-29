/**
 * Member module registry — the catalog of tools/features an admin can assign
 * to an individual client's members area.
 *
 * Modules are organized under the three adult-persona categories plus a shared
 * core shelf. A client's `membersPermissions.modules` (string array of keys)
 * decides which modules render in their portal. Anything not assigned is
 * invisible — never rendered, never linked.
 *
 * This file is shared between server and client. Keep it dependency-free.
 */

export type PersonaCategoryKey = "onlyfans" | "webcam" | "inperson";

export interface PersonaCategory {
  key: PersonaCategoryKey;
  name: string;
  blurb: string;
}

export const PERSONA_CATEGORIES: PersonaCategory[] = [
  {
    key: "onlyfans",
    name: "Fan Platforms",
    blurb: "OnlyFans, Fansly, ManyVids and other fan-platform creators.",
  },
  {
    key: "webcam",
    name: "Webcam",
    blurb: "Live cam models streaming across cam networks.",
  },
  {
    key: "inperson",
    name: "In-Person",
    blurb: "Companions running a discreet in-person business.",
  },
];

export interface MemberModuleDef {
  /** Stable key stored in membersPermissions.modules */
  key: string;
  name: string;
  tagline: string;
  description: string;
  /** Which persona shelves this module appears on in the admin picker */
  categories: PersonaCategoryKey[];
  /** Portal route (under /portal) */
  route: string;
  /** Lucide icon name used by portal/admin UI */
  icon: string;
}

export const MEMBER_MODULES: MemberModuleDef[] = [
  {
    key: "content-sharing",
    name: "Content Review",
    tagline: "Get staff eyes on it before you sell it",
    description:
      "Upload photos or video to share privately with BNE staff for fair, honest opinions and suggestions before the content goes up for sale. Staff can approve it or send it back with notes.",
    categories: ["onlyfans", "webcam", "inperson"],
    route: "/portal/content-review",
    icon: "Inbox",
  },
  {
    key: "studio-editor",
    name: "Studio Editor",
    tagline: "Crop, retouch, watermark — right in the browser",
    description:
      "Built-in editing for photos and video: crop, rotate, filter packs, auto-enhance, manual retouch brush, brand watermark and the BNE watermark, plus an optional branded splash intro. Exports are metadata-stripped.",
    categories: ["onlyfans", "webcam", "inperson"],
    route: "/portal/studio-editor",
    icon: "Wand2",
  },
  {
    key: "leak-shield",
    name: "Leak Shield",
    tagline: "Fingerprint your content, track leaks",
    description:
      "Every export from the Studio Editor is fingerprinted (file hash + perceptual hash) and stamped with a unique tracking ID in its watermark and splash screen. Your protected assets are registered here; file a DMCA takedown request when you spot a leak.",
    categories: ["onlyfans", "webcam", "inperson"],
    route: "/portal/leak-shield",
    icon: "ShieldCheck",
  },
];

/** All valid module keys — used for input validation. */
export const MEMBER_MODULE_KEYS = MEMBER_MODULES.map((m) => m.key);

/** Modules grouped for the admin multi-select picker. */
export function modulesByCategory(): { category: PersonaCategory; modules: MemberModuleDef[] }[] {
  return PERSONA_CATEGORIES.map((category) => ({
    category,
    modules: MEMBER_MODULES.filter((m) => m.categories.includes(category.key)),
  }));
}

/** True when `modules` (the client's assigned keys) includes `key`. */
export function hasModule(modules: string[] | undefined | null, key: string): boolean {
  return Array.isArray(modules) && modules.includes(key);
}
