export const CLIPART_STYLE_LOCK = `PG-13 clipart style illustration, flat vector art, clean bold outlines, minimalist design, gold and black color palette, no text, no watermark, no NSFW elements, studio lighting, cohesive design system`;

export const CATEGORY_CLIPART_PROMPTS: Record<string, string> = {
  "Sex Acts": "abstract symbolism of intimacy and connection, hearts and soft geometric shapes, elegant minimalist composition",
  "BDSM & Power Exchange": "stylized geometric symbols of balance and trust, elegant minimalist composition, interconnected shapes",
  "Fetish & Kink": "abstract representation of focus and attention, spotlight on central element, elegant minimalist composition",
  "Body Types & Physical": "stylized human silhouette celebrating diversity, elegant minimalist composition, flowing lines",
  "Ethnicity & Identity": "stylized world map with cultural patterns, elegant minimalist composition, interconnected designs",
  "Roleplay & Fantasy": "theatrical mask and stage elements, elegant minimalist composition, dramatic geometric shapes",
  "Content Format": "camera and media symbols, elegant minimalist composition, geometric shapes representing formats",
  "Relationship Dynamic": "interconnected hearts and bonds, elegant minimalist composition, flowing connection lines",
  "Clothing & Aesthetics": "stylized fashion elements, elegant minimalist composition, fabric-like flowing shapes",
  "Sensation & Stimulation": "sound waves and sensory patterns, elegant minimalist composition, flowing abstract lines",
  "Fluid & Bodily": "stylized water and flow patterns, elegant minimalist composition, elegant curves",
  "Toys & Equipment": "stylized geometric shapes representing tools, elegant minimalist composition, clean mechanical forms",
  "Occupation Fantasy": "professional symbols and tools, elegant minimalist composition, authority-inspired geometric shapes",
  "Age & Demographic": "stylized timeline and life stages, elegant minimalist composition, elegant flowing lines",
  "Lifestyle & Subculture": "cultural symbols and lifestyle elements, elegant minimalist composition, community-inspired patterns",
  "Audio & ASMR": "sound waves and audio patterns, elegant minimalist composition, flowing wave forms",
  "Visual Style": "camera lens and light patterns, elegant minimalist composition, geometric framing shapes",
  "Niche Crossover": "interlocking geometric shapes, elegant minimalist composition, hybrid symbol combinations",
};

export const CATEGORY_EMOJI_FALLBACK: Record<string, string> = {
  "Sex Acts": "🔥",
  "BDSM & Power Exchange": "⛓️",
  "Fetish & Kink": "⚡",
  "Body Types & Physical": "💪",
  "Ethnicity & Identity": "🌍",
  "Roleplay & Fantasy": "🎭",
  "Content Format": "📹",
  "Relationship Dynamic": "💕",
  "Clothing & Aesthetics": "👗",
  "Sensation & Stimulation": "🎵",
  "Fluid & Bodily": "💧",
  "Toys & Equipment": "🎮",
  "Occupation Fantasy": "💼",
  "Age & Demographic": "📊",
  "Lifestyle & Subculture": "🎸",
  "Audio & ASMR": "🎧",
  "Visual Style": "🎬",
  "Niche Crossover": "🔀",
};

export function buildNicheClipartUrl(keyword: string, category: string, width = 512, height = 512, seed = 42): string {
  const categoryPrompt = CATEGORY_CLIPART_PROMPTS[category] || "abstract elegant minimalist composition";
  const prompt = `${CLIPART_STYLE_LOCK}, ${categoryPrompt}, representing ${keyword}`;
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

export function buildCategoryClipartUrl(category: string, width = 512, height = 512, seed = 123): string {
  const categoryPrompt = CATEGORY_CLIPART_PROMPTS[category] || "abstract elegant minimalist composition";
  const prompt = `${CLIPART_STYLE_LOCK}, ${categoryPrompt}`;
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}
