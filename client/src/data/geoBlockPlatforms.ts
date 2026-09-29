/**
 * Per-platform geo-blocking capability data for the admin geo-block system.
 *
 * Granularity reflects each platform's native creator-side blocking UI as
 * publicly documented. Confidence is marked honestly — platform UIs change,
 * so every instruction card tells the admin to verify in the live settings.
 */
export type GeoGranularity = "country" | "country+state" | "country+state+city";
export type Confidence = "documented" | "reported" | "verify-in-ui";

export interface GeoPlatform {
  slug: string;
  name: string;
  granularity: GeoGranularity;
  confidence: Confidence;
  where: string;
  steps: string[];
  blockListFormat: string;
  notes: string;
}

export const GEO_PLATFORMS: GeoPlatform[] = [
  {
    slug: "onlyfans",
    name: "OnlyFans",
    granularity: "country+state+city",
    confidence: "documented",
    where: "Settings → Privacy and Safety → Block by country",
    steps: [
      "Log in to the creator's OnlyFans account and open Settings.",
      "Go to Privacy and Safety, then choose “Block by country”.",
      "Search for each blocked state or city and press Block.",
      "Confirm the blocked list shows every requested region.",
      "Re-check after any major OnlyFans settings redesign — the list persists, but the UI path moves.",
    ],
    blockListFormat: "Search-and-block: enter each state name (e.g. “Washington”) and each city name; block individually.",
    notes:
      "OnlyFans supports blocking at country, US-state, and city level — the most granular of the major fan platforms. Blocking a home state costs meaningful traffic; stage it (home state first, evaluate for 2 weeks) unless the client insists on full coverage day one.",
  },
  {
    slug: "chaturbate",
    name: "Chaturbate",
    granularity: "country+state+city",
    confidence: "reported",
    where: "Broadcaster account → Settings & Privacy → region blocking",
    steps: [
      "Log in to the broadcaster account and open Settings & Privacy.",
      "Find the region / country blocking section.",
      "Add each blocked US state (and city, where offered) to the block list.",
      "Save and verify the list persisted — Chaturbate occasionally resets region settings on broadcaster-profile updates.",
      "Note the block applies to the room; logged-out regional visitors see the room as unavailable.",
    ],
    blockListFormat: "Region picker: select each US state by name; add cities where the UI offers them.",
    notes:
      "Cam-site reporting indicates Chaturbate supports state/city-level blocking for broadcasters. Confirm the exact control labels in the live UI before telling a client it's done — this is the step admins most often skip.",
  },
  {
    slug: "stripchat",
    name: "Stripchat",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Model account → Settings → Privacy → geo-blocking",
    steps: [
      "Log in to the model account and open Settings → Privacy.",
      "Open the geo-blocking / blocked-countries section.",
      "Add each blocked country. For US-state granularity, check whether a region picker is present in the current UI.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list. If the UI exposes US states, add them by name.",
    notes:
      "Stripchat's documented blocking is country-level. Do not promise a client state-level blocking here until you've seen the control with your own eyes in the current model dashboard.",
  },
  {
    slug: "fansly",
    name: "Fansly",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Creator dashboard → Settings → Privacy → blocked countries",
    steps: [
      "Open the creator dashboard and go to Settings → Privacy.",
      "Find the blocked-countries list and add each blocked country.",
      "Check for any region/state sub-picker in the current UI before closing the ticket.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list; states only if the live UI exposes them.",
    notes:
      "Fansly is documented at country-level blocking. Treat any state-level claim as unverified until confirmed in the live creator settings.",
  },
  {
    slug: "manyvids",
    name: "ManyVids",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Profile Settings → Privacy → country blocking",
    steps: [
      "Log in and open Profile Settings → Privacy.",
      "Add each blocked country to the block list.",
      "Verify whether the current UI offers US-state granularity; record what you find.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list; states only if the live UI exposes them.",
    notes:
      "ManyVids blocking is country-level in public documentation. Same rule as the others: eyes on the live UI before the status moves to “verified”.",
  },
  {
    slug: "streamate",
    name: "Streamate",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Model account → Settings → regional blocking",
    steps: [
      "Log in to the model account and open Settings.",
      "Find regional / country blocking and add each blocked country.",
      "Check for US-state granularity in the current UI.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list; states only if the live UI exposes them.",
    notes: "Country-level blocking is the documented baseline; confirm state support live.",
  },
  {
    slug: "bongacams",
    name: "BongaCams",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Model account → Settings → privacy / region blocking",
    steps: [
      "Log in to the model account and open Settings → privacy.",
      "Add each blocked country/region the UI offers.",
      "Check for US-state granularity in the current UI.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country/region list as offered by the UI.",
    notes: "Confirm the live control set before marking verified.",
  },
  {
    slug: "mfc",
    name: "MyFreeCams",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Model admin → Settings → country blocking",
    steps: [
      "Log in to the model admin panel and open Settings.",
      "Add each blocked country to the block list.",
      "Check for US-state granularity in the current UI.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list; states only if the live UI exposes them.",
    notes: "Confirm the live control set before marking verified.",
  },
  {
    slug: "clips4sale",
    name: "Clips4Sale",
    granularity: "country",
    confidence: "verify-in-ui",
    where: "Store admin → settings → country blocking",
    steps: [
      "Open the store admin panel and find country-blocking settings.",
      "Add each blocked country.",
      "Save and screenshot the final list for the client's file.",
    ],
    blockListFormat: "Country list.",
    notes: "Clip stores are country-level; pair with the fan-platform blocks for full coverage.",
  },
  {
    slug: "x-twitter",
    name: "X (Twitter)",
    granularity: "country",
    confidence: "documented",
    where: "No native creator geo-blocking",
    steps: [
      "There is no per-region block for profiles or posts on X.",
      "Use a separate promo persona account with no real-name links instead.",
      "Block individual accounts aggressively (ex-partners, coworkers, family).",
      "Set the promo account to not appear in “people you may know” by using a dedicated email/phone never tied to the real identity.",
    ],
    blockListFormat: "N/A — individual account blocks only.",
    notes:
      "X cannot geo-block. The defense here is persona separation, not region lists — see Identity Shield. Never run promo from the account connected to the client's real phone number.",
  },
];

export const GEO_CAVEATS: { title: string; body: string }[] = [
  {
    title: "Geo-blocking is IP-based — VPNs walk through it",
    body: "Every platform on this list enforces blocks by IP geolocation. A viewer on a VPN set to another state sails past the block. Geo-blocking keeps casual local discovery away (the coworker scrolling at lunch); it does not stop a motivated person. Set that expectation with the client in writing.",
  },
  {
    title: "Blocking a home state costs traffic",
    body: "The client's home state is usually also a top traffic source. Stage the rollout: block the home state first, measure the revenue dip for two weeks, then expand. Clients who block five states on day one and panic at the analytics blame the tool — show them the tradeoff before they choose it.",
  },
  {
    title: "Platform UIs drift — verify, screenshot, file",
    body: "Only move a profile to “verified” after an admin has opened the live settings, confirmed each region is listed, and saved a screenshot to the client's file. A platform redesign can silently drop or relocate the control.",
  },
  {
    title: "Country-level platforms need the honest conversation",
    body: "If a client asks for city-level blocking and the platform only does countries, say so plainly and offer the closest real option (block the country, or move that content to a platform with finer controls). Never file a city block as done on a country-only platform.",
  },
];
