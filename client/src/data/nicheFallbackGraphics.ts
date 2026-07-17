/**
 * Fallback PG-13 clipart for niche cards when external images are unavailable.
 * Each fallback is a simple inline SVG data URI matching the site gold/black aesthetic.
 */

const SVG_XML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0%" stop-color="#F7E08A"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8C6A14"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <rect x="24" y="24" width="464" height="464" rx="48" fill="none" stroke="url(#gold)" stroke-width="4"/>
  <circle cx="256" cy="220" r="90" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.6"/>
  <path d="M256 130 L256 310" stroke="url(#gold)" stroke-width="2" opacity="0.4"/>
  <path d="M166 220 L346 220" stroke="url(#gold)" stroke-width="2" opacity="0.4"/>
  <text x="256" y="380" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" letter-spacing="0.15em">NICHE</text>
  <text x="256" y="430" text-anchor="middle" fill="#9FA6B2" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="0.35em">CLIPART</text>
</svg>`;

const CATEGORY_SVG_MARK: Record<string, string> = {
  "Sex Acts": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <circle cx="256" cy="256" r="140" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.35"/>
    <circle cx="256" cy="256" r="90" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.55"/>
    <circle cx="256" cy="256" r="36" fill="#D4AF37" opacity="0.15"/>
    <path d="M256 116 L256 396" stroke="#D4AF37" stroke-width="2" opacity="0.35"/>
    <path d="M116 256 L396 256" stroke="#D4AF37" stroke-width="2" opacity="0.35"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" letter-spacing="0.18em">INTIMACY</text>
  </svg>`,
  "BDSM & Power Exchange": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <rect x="156" y="96" width="200" height="320" rx="24" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <rect x="196" y="136" width="120" height="240" rx="16" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="226" r="36" fill="#D4AF37" opacity="0.12"/>
    <path d="M226 226 L286 226 M256 196 L256 256" stroke="#D4AF37" stroke-width="3" opacity="0.6"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">POWER</text>
  </svg>`,
  "Fetish & Kink": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <polygon points="256,116 396,396 116,396" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <polygon points="256,176 346,356 166,356" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.65"/>
    <circle cx="256" cy="286" r="40" fill="#D4AF37" opacity="0.15"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">FOCUS</text>
  </svg>`,
  "Body Types & Physical": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <circle cx="256" cy="160" r="52" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M176 240 C176 240 136 340 136 420 L376 420 C376 420 336 340 336 240" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M220 420 L220 460 M292 420 L292 460" stroke="#D4AF37" stroke-width="4" opacity="0.6"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">PHYSICAL</text>
  </svg>`,
  "Ethnicity & Identity": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <circle cx="256" cy="226" r="110" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M146 226 A110 110 0 0 1 366 226" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <path d="M256 116 L256 336" stroke="#D4AF37" stroke-width="2" opacity="0.35"/>
    <path d="M146 226 L366 226" stroke="#D4AF37" stroke-width="2" opacity="0.35"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">IDENTITY</text>
  </svg>`,
  "Roleplay & Fantasy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M136 396 L256 116 L376 396 Z" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M176 396 L256 176 L336 396" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.65"/>
    <circle cx="256" cy="246" r="42" fill="#D4AF37" opacity="0.12"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">FANTASY</text>
  </svg>`,
  "Content Format": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <rect x="116" y="146" width="280" height="220" rx="18" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <circle cx="256" cy="256" r="64" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="256" r="14" fill="#D4AF37" opacity="0.25"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="0.18em">FORMAT</text>
  </svg>`,
  "Relationship Dynamic": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M186 286 C186 200 326 200 326 286 C326 372 186 372 186 286 Z" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M256 226 L256 346" stroke="#D4AF37" stroke-width="3" opacity="0.65"/>
    <circle cx="256" cy="196" r="28" fill="#D4AF37" opacity="0.15"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">CONNECTION</text>
  </svg>`,
  "Clothing & Aesthetics": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M176 136 L336 136 L356 396 L156 396 Z" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M196 156 L316 156 L332 356 L180 356 Z" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <path d="M236 136 L236 100 M276 136 L276 100" stroke="#D4AF37" stroke-width="4" opacity="0.6"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">AESTHETIC</text>
  </svg>`,
  "Sensation & Stimulation": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M116 256 Q176 116 256 256 Q336 396 396 256" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M116 296 Q176 156 256 296 Q336 436 396 296" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="256" r="36" fill="#D4AF37" opacity="0.12"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">SENSATION</text>
  </svg>`,
  "Fluid & Bodily": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M256 116 C356 116 396 216 396 286 C396 386 326 436 256 436 C186 436 116 386 116 286 C116 216 156 116 256 116 Z" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M256 176 C316 176 346 226 346 276 C346 346 296 386 256 386 C216 386 166 346 166 276 C166 226 196 176 256 176 Z" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">FLUID</text>
  </svg>`,
  "Toys & Equipment": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <rect x="136" y="196" width="240" height="120" rx="28" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <rect x="176" y="236" width="160" height="40" rx="12" fill="#D4AF37" opacity="0.12"/>
    <circle cx="256" cy="256" r="18" fill="#D4AF37" opacity="0.25"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">GEAR</text>
  </svg>`,
  "Occupation Fantasy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <rect x="156" y="116" width="200" height="160" rx="16" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M196 286 L196 396 M316 286 L316 396" stroke="#D4AF37" stroke-width="4" opacity="0.6"/>
    <path d="M196 396 L316 396" stroke="#D4AF37" stroke-width="4" opacity="0.6"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">CAREER</text>
  </svg>`,
  "Age & Demographic": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M136 396 L256 116 L376 396" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <path d="M176 356 L336 356" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="236" r="48" fill="#D4AF37" opacity="0.12"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">STAGE</text>
  </svg>`,
  "Lifestyle & Subculture": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <circle cx="186" cy="236" r="52" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <circle cx="326" cy="236" r="52" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M238 236 L274 236" stroke="#D4AF37" stroke-width="4" opacity="0.7"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">CULTURE</text>
  </svg>`,
  "Audio & ASMR": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <path d="M176 276 Q226 176 256 276 Q286 376 336 276" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.45"/>
    <path d="M196 276 Q246 196 256 276 Q266 356 316 276" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="276" r="10" fill="#D4AF37" opacity="0.25"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">AUDIO</text>
  </svg>`,
  "Visual Style": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <rect x="126" y="146" width="260"="180" rx="14" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <circle cx="256" cy="236" r="48" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.7"/>
    <circle cx="256" cy="236" r="14" fill="#D4AF37" opacity="0.25"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">VISION</text>
  </svg>`,
  "Niche Crossover": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0F172A"/>
    <circle cx="196" cy="236" r="66" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <circle cx="316" cy="236" r="66" fill="none" stroke="#D4AF37" stroke-width="4" opacity="0.4"/>
    <rect x="236" y="216" width="40" height="40" rx="10" fill="#D4AF37" opacity="0.18"/>
    <text x="256" y="460" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="0.18em">HYBRID</text>
  </svg>`,
};

const DEFAULT_FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0F172A"/>
  <rect x="24" y="24" width="464" height="464" rx="48" fill="none" stroke="#D4AF37" stroke-width="4"/>
  <circle cx="256" cy="220" r="90" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.6"/>
  <path d="M256 130 L256 310" stroke="#D4AF37" stroke-width="2" opacity="0.4"/>
  <path d="M166 220 L346 220" stroke="#D4AF37" stroke-width="2" opacity="0.4"/>
  <text x="256" y="380" text-anchor="middle" fill="#D4AF37" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" letter-spacing="0.15em">NICHE</text>
  <text x="256" y="430" text-anchor="middle" fill="#9FA6B2" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="0.35em">CLIPART</text>
</svg>`;

function toDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FALLBACK_CATEGORY_GRAPHICS: Record<string, string> = {
  "Sex Acts": toDataUri(CATEGORY_SVG_MARK["Sex Acts"] || DEFAULT_FALLBACK_SVG),
  "BDSM & Power Exchange": toDataUri(CATEGORY_SVG_MARK["BDSM & Power Exchange"] || DEFAULT_FALLBACK_SVG),
  "Fetish & Kink": toDataUri(CATEGORY_SVG_MARK["Fetish & Kink"] || DEFAULT_FALLBACK_SVG),
  "Body Types & Physical": toDataUri(CATEGORY_SVG_MARK["Body Types & Physical"] || DEFAULT_FALLBACK_SVG),
  "Ethnicity & Identity": toDataUri(CATEGORY_SVG_MARK["Ethnicity & Identity"] || DEFAULT_FALLBACK_SVG),
  "Roleplay & Fantasy": toDataUri(CATEGORY_SVG_MARK["Roleplay & Fantasy"] || DEFAULT_FALLBACK_SVG),
  "Content Format": toDataUri(CATEGORY_SVG_MARK["Content Format"] || DEFAULT_FALLBACK_SVG),
  "Relationship Dynamic": toDataUri(CATEGORY_SVG_MARK["Relationship Dynamic"] || DEFAULT_FALLBACK_SVG),
  "Clothing & Aesthetics": toDataUri(CATEGORY_SVG_MARK["Clothing & Aesthetics"] || DEFAULT_FALLBACK_SVG),
  "Sensation & Stimulation": toDataUri(CATEGORY_SVG_MARK["Sensation & Stimulation"] || DEFAULT_FALLBACK_SVG),
  "Fluid & Bodily": toDataUri(CATEGORY_SVG_MARK["Fluid & Bodily"] || DEFAULT_FALLBACK_SVG),
  "Toys & Equipment": toDataUri(CATEGORY_SVG_MARK["Toys & Equipment"] || DEFAULT_FALLBACK_SVG),
  "Occupation Fantasy": toDataUri(CATEGORY_SVG_MARK["Occupation Fantasy"] || DEFAULT_FALLBACK_SVG),
  "Age & Demographic": toDataUri(CATEGORY_SVG_MARK["Age & Demographic"] || DEFAULT_FALLBACK_SVG),
  "Lifestyle & Subculture": toDataUri(CATEGORY_SVG_MARK["Lifestyle & Subculture"] || DEFAULT_FALLBACK_SVG),
  "Audio & ASMR": toDataUri(CATEGORY_SVG_MARK["Audio & ASMR"] || DEFAULT_FALLBACK_SVG),
  "Visual Style": toDataUri(CATEGORY_SVG_MARK["Visual Style"] || DEFAULT_FALLBACK_SVG),
  "Niche Crossover": toDataUri(CATEGORY_SVG_MARK["Niche Crossover"] || DEFAULT_FALLBACK_SVG),
};

export function getFallbackGraphic(category: string): string {
  return FALLBACK_CATEGORY_GRAPHICS[category] || toDataUri(DEFAULT_FALLBACK_SVG);
}
