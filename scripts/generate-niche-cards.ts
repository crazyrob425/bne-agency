import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "client/src/data/nicheDatabase.ts");
const OUT_PATH = path.join(process.cwd(), "client/src/data/nicheCards.json");

const dbText = fs.readFileSync(DB_PATH, "utf8");

const ENTRY_RE = /\{\s*keyword:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*searchVolume:\s*"([^"]+)",\s*competitionLevel:\s*"([^"]+)",\s*earningPotential:\s*"([^"]+)"\s*[},]/g;

const entries: { keyword: string; category: string; searchVolume: string; competitionLevel: string; earningPotential: string }[] = [];
let m;
while ((m = ENTRY_RE.exec(dbText)) !== null) {
  entries.push({
    keyword: m[1],
    category: m[2],
    searchVolume: m[3],
    competitionLevel: m[4],
    earningPotential: m[5],
  });
}

const revenueMap: Record<string, { low: string; average: string; high: string; top: string }> = {
  "very-high": { low: "$2k/mo", average: "$8k/mo", high: "$25k/mo", top: "$50k+/mo" },
  high: { low: "$1.5k/mo", average: "$6k/mo", high: "$20k/mo", top: "$40k+/mo" },
  medium: { low: "$1k/mo", average: "$4k/mo", high: "$12k/mo", top: "$25k+/mo" },
  low: { low: "$500/mo", average: "$2.5k/mo", high: "$8k/mo", top: "$15k+/mo" },
  micro: { low: "$200/mo", average: "$1k/mo", high: "$4k/mo", top: "$10k+/mo" },
};

const categoryTemplates: Record<string, { descriptions: string[]; facts: string[]; tips: string[]; safety: string[]; subniches: string[] }> = {
  "Sex Acts": {
    descriptions: [
      "Direct action-first content centered on a specific sexual act or dynamic. This niche draws viewers who are specifically interested in the visual and emotional intensity of the act itself rather than a long setup or narrative.",
      "High-volume evergreen content that performs well across subscription and clip platforms. Success depends on consistency, clear visual framing, and understanding what the audience is specifically seeking."
    ],
    facts: [
      "Top search volume category across all adult platforms.",
      "Low production barrier with high revenue potential.",
      "Works in both solo and partnered formats."
    ],
    tips: [
      "Mix POV and third-person angles to maximize appeal.",
      "Audio quality matters more than video resolution.",
      "Create themed series for recurring subscriber value."
    ],
    safety: [
      "Maintain clear consent and boundary communication.",
      "Use appropriate protection and hygiene protocols.",
      "Know platform rules around explicitness."
    ],
    subniches: ["POV", "Solo", "Couples", "Amateur", "Professional", "Fetish Integration", "Slow Burn", "High Intensity"]
  },
  "BDSM & Power Exchange": {
    descriptions: [
      "Power-exchange content centered on negotiated dynamics, control, and ritual. This niche rewards performers who can signal clear roles, maintain consistent power structures, and demonstrate authentic aftercare.",
      "High-trust, high-retention content that builds long-term subscriber bases. The audience values authenticity in power dynamics, safety protocols, and the emotional intelligence to navigate intense scenes."
    ],
    facts: [
      "Highest average order value of any niche category.",
      "Subscribers often become long-term loyal community members.",
      "Requires clear communication and boundary setting."
    ],
    tips: [
      "Establish and maintain consistent power dynamics.",
      "Show negotiation and aftercare to build trust.",
      "Create themed protocol or dungeon series."
    ],
    safety: [
      "Always include safewords and visible stop cues.",
      "Avoid breath restriction or edge-play without training.",
      "Have first-aid and cleanup supplies visible."
    ],
    subniches: ["Light Bondage", "Heavy Bondage", "Shibari", "Impact Play", "Sensory Play", "Humiliation", "Aftercare", "Protocol"]
  },
  "Fetish & Kink": {
    descriptions: [
      "Specific trigger-based content focused on objects, body parts, textures, or sensory details. This niche thrives on precision and authenticity — the audience can immediately tell when a performer genuinely understands the fetish.",
      "High-loyalty niche where viewers often become dedicated subscribers. Success requires deep understanding of the specific trigger and the ability to present it authentically without crossing into cartoonish parody."
    ],
    facts: [
      "Top 3 most-searched fetish categories globally.",
      "Extremely high subscriber loyalty and retention.",
      "Works exceptionally well for both solo and Domme creators."
    ],
    tips: [
      "Study the specific trigger deeply before creating content.",
      "Use high-quality macro photography for detail-focused niches.",
      "Build series around the specific fetish for recurring revenue."
    ],
    safety: [
      "Maintain personal hygiene standards appropriate to the niche.",
      "Set clear limits on pressure, pain, or discomfort.",
      "Use clean props and surfaces for close-up work."
    ],
    subniches: ["Object Focus", "Body Part Focus", "Texture Play", "Sensory Deprivation", "Power Dynamic", "Costume Integration", "Material Fetish"]
  },
  "Body Types & Physical": {
    descriptions: [
      "Content centered on specific physical attributes, body types, or demographic features. This is one of the highest-search-volume categories because viewers often have very specific physical preferences they actively seek out.",
      "Evergreen demand content that performs consistently across platforms. The key is authentic presentation of the specific attribute with confidence and without apology or explanation."
    ],
    facts: [
      "Consistently top search terms across all major platforms.",
      "Low production cost with high discoverability.",
      "Works for all performer types and experience levels."
    ],
    tips: [
      "Emphasize the specific attribute through camera angles.",
      "Use wardrobe that highlights rather than hides the feature.",
      "Create comparison or progression series when appropriate."
    ],
    safety: [
      "Avoid dialogue that could be interpreted as underage.",
      "Use age-appropriate styling and presentation.",
      "Verify all content complies with platform TOS."
    ],
    subniches: ["Height Focus", "Weight Focus", "Age Presentation", "Hair Color", "Body Modifications", "Ethnicity", "Disability Inclusion", "Fitness Level"]
  },
  "Ethnicity & Identity": {
    descriptions: [
      "Identity-first content that celebrates specific ethnicities, cultures, or identities. This niche requires cultural sensitivity, respect, and avoidance of stereotypes while still delivering the specific aesthetic the audience seeks.",
      "High-demand category with dedicated audiences across all platforms. Success requires authentic representation, cultural awareness, and the ability to present identity as an asset rather than a costume."
    ],
    facts: [
      "Very high search volume across all major platforms.",
      "Growing demand for authentic, respectful representation.",
      "Premium pricing power when done authentically."
    ],
    tips: [
      "Lead with personality, not just identity.",
      "Avoid stereotypes and exoticizing language.",
      "Connect with cultural aesthetics respectfully."
    ],
    safety: [
      "Never reduce a person to a stereotype for clicks.",
      "Avoid racist, exoticizing, or demeaning framing.",
      "Consult cultural advisors when uncertain."
    ],
    subniches: ["Asian", "Latina", "Ebony", "White", "Mixed Race", "Trans", "Non-Binary", "Regional"]
  },
  "Roleplay & Fantasy": {
    descriptions: [
      "Scenario-based content using costume, setting, and narrative premise to create fantasy immersion. This niche rewards performers who can maintain character, create believable scenarios, and deliver emotional payoff within the fantasy framework.",
      "High-engagement content that allows for creative expression and character development. The audience invests in the story as much as the sexual content, making retention and loyalty particularly strong."
    ],
    facts: [
      "Highest subscriber retention of any content type.",
      "Allows for creative expression and character development.",
      "Premium pricing for custom scenarios and roleplay."
    ],
    tips: [
      "Develop 2-3 core personas rather than constantly changing.",
      "Invest in quality costumes and set dressing.",
      "Use consistent opening/closing dialogue to maintain immersion."
    ],
    safety: [
      "Establish clear boundaries around scenario content.",
      "Use safe words that are distinct from roleplay dialogue.",
      "Debrief after intense scenarios for emotional safety."
    ],
    subniches: ["Occupations", "Fantasy Characters", "Age Play", "Family Roleplay", "Power Dynamics", "Holidays/Events", "Custom Scenarios", "Historical"]
  },
  "Content Format": {
    descriptions: [
      "Content defined by how it is delivered rather than what appears in the frame. This includes POV, live streaming, custom requests, audio, and photo sets. The format itself becomes the product and selling point.",
      "High-flexibility category that can be combined with almost any other niche. The format choice often determines pricing strategy, production requirements, and audience demographics."
    ],
    facts: [
      "Format choice directly impacts pricing and audience.",
      "Multiple formats allow for diversified revenue streams.",
      "Live streaming often commands highest per-minute rates."
    ],
    tips: [
      "Test multiple formats to find your highest-engagement style.",
      "Use format variety to appeal to different audience segments.",
      "Invest in equipment appropriate to your chosen format."
    ],
    safety: [
      "Set clear boundaries for live interaction formats.",
      "Use platform safety features for streaming.",
      "Archive all custom request content securely."
    ],
    subniches: ["POV", "Live Stream", "Custom Content", "Audio Only", "Photo Sets", "Clips", "Full Scenes", "PPV"]
  },
  "Relationship Dynamic": {
    descriptions: [
      "Content that sells an ongoing relationship dynamic between performers or between performer and viewer. This includes GFE, domme/sub relationships, and ongoing narrative arcs that create emotional investment.",
      "Premium retention niche where viewers pay for continuity, emotional connection, and the feeling of being part of an ongoing relationship. The best performers treat this as character work with consistent traits and storylines."
    ],
    facts: [
      "Highest lifetime value per subscriber.",
      "Requires consistent posting and character continuity.",
      "Premium pricing for relationship-style content."
    ],
    tips: [
      "Develop relationship history and inside references.",
      "Use consistent voice, tone, and mannerisms.",
      "Create 'relationship milestone' content series."
    ],
    safety: [
      "Set clear boundaries between performance and personal life.",
      "Use platform tools rather than personal communication.",
      "Be prepared for viewers to develop real feelings."
    ],
    subniches: ["GFE", "Domme/Sub", "Kink Partnership", "Friendship Dynamic", "Family Dynamic", "Mentorship", "Rivalry", "Long-Distance"]
  },
  "Clothing & Aesthetics": {
    descriptions: [
      "Wardrobe and visual styling as the primary draw of the content. This includes specific garments, aesthetics, textures, and visual themes that create a distinct mood and attract viewers with specific visual preferences.",
      "Visual-first content that relies on costume, styling, and aesthetic consistency. The right wardrobe can dramatically increase perceived value and allow for premium pricing on themed content."
    ],
    facts: [
      "Wardrobe investment directly impacts earning potential.",
      "Aesthetic consistency builds brand recognition.",
      "Costume changes create natural content variety."
    ],
    tips: [
      "Build a signature look before expanding wardrobe.",
      "Invest in quality basics that photograph well.",
      "Create themed wardrobe series for recurring content."
    ],
    safety: [
      "Ensure costumes fit properly and don't restrict movement.",
      "Check for allergic reactions to fabrics and materials.",
      "Maintain wardrobe hygiene between uses."
    ],
    subniches: ["Lingerie", "Cosplay", "Fetish Wear", "Casual", "Formal", "Athletic", "Nude/Natural", "Themed Costumes"]
  },
  "Sensation & Stimulation": {
    descriptions: [
      "Content focused on specific physical sensations, textures, or sensory experiences. This includes ASMR, temperature play, texture focus, and other sensation-driven content that prioritizes feeling over visual explicitness.",
      "Growing niche with dedicated audiences seeking specific sensory experiences. Often lower production cost with high per-subscriber value due to the intimate, personal nature of the content."
    ],
    facts: [
      "Growing audience with high loyalty and low churn.",
      "Often lower production cost than visual-heavy niches.",
      "Works well as complementary content to other niches."
    ],
    tips: [
      "Invest in high-quality audio equipment.",
      "Use close-up shots to emphasize texture and sensation.",
      "Create sensory series that build over multiple posts."
    ],
    safety: [
      "Test all materials on skin before filming.",
      "Avoid extreme temperatures without proper preparation.",
      "Monitor for allergic reactions to textures and materials."
    ],
    subniches: ["ASMR", "Texture Play", "Temperature Play", "Pressure Play", "Sound Focus", "Visual Texture", "Kinetic Focus", "Tactile"]
  },
  "Fluid & Bodily": {
    descriptions: [
      "Content that incorporates bodily fluids, wetness, or messy elements as a core part of the appeal. This niche requires extra attention to sanitation, cleanup, and visual presentation while delivering the specific sensory experience the audience seeks.",
      "High-engagement niche with dedicated audiences who specifically seek out messy, wet, or fluid-based content. The key is balancing the sensory appeal with practical production considerations."
    ],
    facts: [
      "High per-view value due to niche demand.",
      "Requires significant cleanup and preparation time.",
      "Premium pricing for well-produced fluid content."
    ],
    tips: [
      "Plan sanitation before filming begins.",
      "Use drop cloths and protective covering everywhere.",
      "Have cleanup supplies ready immediately after."
    ],
    safety: [
      "Plan barriers, cleanup, and allergy risks before filming.",
      "Use appropriate personal protective equipment.",
      "Ensure proper ventilation for strong smells."
    ],
    subniches: ["Wet & Messy", "Squirting", "Creampie", "Facials", "Cum Play", "Urine Play", "Sweat", "Saliva"]
  },
  "Toys & Equipment": {
    descriptions: [
      "Content where props, toys, and specialized equipment are the visual anchor of the scene. This includes everything from standard vibrators to specialized BDSM equipment, with the gear often signaling the niche before any action begins.",
      "Equipment-driven content that showcases specific toys or gear as part of the appeal. Viewers often research specific products, creating opportunities for affiliate revenue in addition to content sales."
    ],
    facts: [
      "Props signal the niche instantly to viewers.",
      "Opportunities for affiliate marketing revenue.",
      "Equipment variety creates natural content series."
    ],
    tips: [
      "Show the prop clearly in the opening shot.",
      "Demonstrate multiple uses for each toy.",
      "Create 'unboxing' and 'first impression' content series."
    ],
    safety: [
      "Follow manufacturer guidelines for all equipment.",
      "Use body-safe materials only.",
      "Clean all toys thoroughly before and after use."
    ],
    subniches: ["Vibrators", "Dildos", "Anal Toys", "BDSM Equipment", "Machines", "Interactive", "Wearable", "DIY Props"]
  },
  "Occupation Fantasy": {
    descriptions: [
      "Content that uses job titles, uniforms, and workplace scenarios to create fantasy. The social meaning of the occupation — authority, service, competence, or status — becomes the core of the appeal rather than the specific acts performed.",
      "Scenario-based content with built-in audience recognition. The uniform or setting does half the work, allowing for efficient content creation with strong performance in search and discovery."
    ],
    facts: [
      "Built-in audience recognition through uniforms.",
      "Strong search performance across platforms.",
      "Relatively low production cost for high return."
    ],
    tips: [
      "Invest in authentic-looking uniforms and props.",
      "Develop character traits associated with the role.",
      "Create series around different occupations."
    ],
    safety: [
      "Avoid content that could damage real profession reputations.",
      "Use fictionalized settings rather than real workplaces.",
      "Be aware of platform rules regarding roleplay content."
    ],
    subniches: ["Medical", "Education", "Law Enforcement", "Service Industry", "Corporate", "Military", "Emergency Services", "Creative"]
  },
  "Age & Demographic": {
    descriptions: [
      "Content centered on specific age presentations, life stages, or generational aesthetics. This niche requires careful navigation of age-related themes while maintaining strict adult-only boundaries and avoiding any suggestion of underage content.",
      "High-search-volume category with dedicated audiences for specific age demographics. The key is confident, respectful presentation that celebrates the specific life stage without apology or explanation."
    ],
    facts: [
      "Consistently top search terms across all platforms.",
      "Requires careful navigation of age-related themes.",
      "Premium pricing for authentic demographic content."
    ],
    tips: [
      "Emphasize lifestyle and maturity cues.",
      "Avoid dialogue that could suggest underage themes.",
      "Use age-appropriate styling and presentation."
    ],
    safety: [
      "Keep all content strictly adult-only.",
      "Verify partners are clearly 18+ and documented.",
      "Avoid age-related dialogue that could be misinterpreted."
    ],
    subniches: ["Young Adult", "Mature", "Senior", "College", "Career", "Retirement", "Generational", "Life Stage"]
  },
  "Lifestyle & Subculture": {
    descriptions: [
      "Content that embodies entire lifestyle aesthetics, subcultures, or identity communities. This includes everything from goth and punk to fitness and gaming, where the entire vibe package — hobbies, decor, music, attitude — becomes the product.",
      "Community-driven niche with highly engaged audiences who identify with the lifestyle. Content creators in this space often become community figures with influence extending beyond adult platforms."
    ],
    facts: [
      "Strong community engagement and loyalty.",
      "Cross-platform monetization opportunities.",
      "Often extends into mainstream social media."
    ],
    tips: [
      "Embrace the full lifestyle, not just the sexual elements.",
      "Engage with community spaces and terminology.",
      "Create content that feels authentic to the subculture."
    ],
    safety: [
      "Respect community boundaries and terminology.",
      "Avoid appropriating cultures you don't belong to.",
      "Be authentic rather than performative."
    ],
    subniches: ["Goth/Alt", "Gamer", "Fitness", "Outdoor", "Music Scenes", "Art/Creative", "Tech", "Hobby-Based"]
  },
  "Audio & ASMR": {
    descriptions: [
      "Sound-first content where audio quality, whispering, mouth sounds, and vocal performance are the primary product. This includes erotic ASMR, guided experiences, and audio-only content that creates intimacy through sound rather than visuals.",
      "Intimacy-through-audio niche with dedicated audiences seeking connection through sound. The low visual production requirements make this accessible while commanding premium pricing for high-quality audio content."
    ],
    facts: [
      "Growing audience with high loyalty and low churn.",
      "Lower production cost than visual-heavy niches.",
      "Works well as supplemental content to other niches."
    ],
    tips: [
      "Invest in a high-quality microphone and acoustic treatment.",
      "Use binaural recording techniques for immersion.",
      "Create themed audio series for recurring value."
    ],
    safety: [
      "Use acoustic treatment to protect privacy.",
      "Avoid content that could trigger trauma responses.",
      "Maintain consistent audio quality standards."
    ],
    subniches: ["Erotic ASMR", "Dirty Talk", "Guided Experiences", "Roleplay Audio", "Sound Fetish", "Binaural", "Mouth Sounds", "Whispering"]
  },
  "Visual Style": {
    descriptions: [
      "Content defined by specific visual aesthetics, lighting, camera work, or editing styles. This includes cinematic quality, specific color grading, camera angles, and editing techniques that create a distinct visual signature.",
      "Aesthetic-driven content that appeals to viewers with specific visual preferences. The consistent visual style becomes the brand, allowing for premium pricing and strong recognition in crowded marketplaces."
    ],
    facts: [
      "Visual consistency builds brand recognition.",
      "Premium pricing for distinctive visual style.",
      "Technical skills directly impact earning potential."
    ],
    tips: [
      "Develop a consistent color grading and lighting style.",
      "Invest in equipment that supports your aesthetic.",
      "Study film and photography for visual techniques."
    ],
    safety: [
      "Follow equipment safety protocols.",
      "Use proper lighting to avoid eye strain.",
      "Secure all equipment properly during filming."
    ],
    subniches: ["Cinematic", "Amateur/Raw", "Professional Studio", "Lighting Styles", "Color Grading", "Camera Work", "Editing Style", "Resolution"]
  },
  "Niche Crossover": {
    descriptions: [
      "Hybrid content that combines two or more niche triggers into a single, cohesive offering. This requires careful balancing to ensure both elements are represented authentically without overcrowding the scene or confusing the audience.",
      "High-demand category that fills gaps between established niches. Successful crossover content can capture audiences from multiple niches while establishing unique positioning in the marketplace."
    ],
    facts: [
      "Fills gaps between established niche markets.",
      "Can capture audiences from multiple niches.",
      "Requires careful balance of elements."
    ],
    tips: [
      "Lead with the stronger niche element.",
      "Ensure both crossover elements are authentically represented.",
      "Test audience response to different balance points."
    ],
    safety: [
      "Maintain standards from both parent niches.",
      "Avoid compromising safety for either element.",
      "Clear communication about what the content contains."
    ],
    subniches: ["Aesthetic + Kink", "Identity + Format", "Body Type + Act", "Age + Dynamic", "Cultural + Fetish", "Style + Content", "Format + Niche"]
  }
};

const CATEGORY_CLIPART_PROMPTS: Record<string, string> = {
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

const emojiMap: Record<string, string> = {
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
  "Niche Crossover": "🔀"
};

const TITLES: Record<string, string[]> = {
  "Sex Acts": ["Precision act-focused series", "Direct-action content", "High-volume evergreen act content", "Performance-focused series"],
  "BDSM & Power Exchange": ["Protocol-driven power exchange", "Negotiated dynamic content", "Structured power scenes", "Trust-based BDSM content"],
  "Fetish & Kink": ["Specific trigger-focused content", "Authentic kink representation", "Precision fetish content", "Deep-dive kink series"],
  "Body Types & Physical": ["Attribute-celebration content", "Physical-feature focus", "Body-positive series", "Demographic-specific content"],
  "Ethnicity & Identity": ["Identity-celebration content", "Culturally-aware presentation", "Authentic representation", "Community-focused content"],
  "Roleplay & Fantasy": ["Scenario immersion content", "Character-driven fantasy", "Narrative-based scenes", "World-building content"],
  "Content Format": ["Format-optimized delivery", "Platform-specific content", "Delivery-focused series", "Multi-format content strategy"],
  "Relationship Dynamic": ["Relationship-continuity content", "Ongoing dynamic series", "Emotional-arc content", "Connection-focused delivery"],
  "Clothing & Aesthetics": ["Wardrobe-led content", "Aesthetic-series content", "Style-focused delivery", "Visual-mood content"],
  "Sensation & Stimulation": ["Sensory-first content", "Soundscape-focused series", "Texture-exploration content", "Feeling-forward delivery"],
  "Fluid & Bodily": ["Sensory-fluid content", "Messy-aesthetic series", "Cleanup-conscious production", "Texture-focused delivery"],
  "Toys & Equipment": ["Prop-led content", "Gear-showcase series", "Interactive equipment content", "Tech-integrated scenes"],
  "Occupation Fantasy": ["Uniform-driven fantasy", "Workplace-role content", "Authority-fantasy series", "Professional-role play"],
  "Age & Demographic": ["Demographic-authentic content", "Life-stage series", "Age-confident presentation", "Generational-content strategy"],
  "Lifestyle & Subculture": ["Subculture-immersive content", "Lifestyle-first series", "Community-engaged content", "Culture-authentic delivery"],
  "Audio & ASMR": ["Sound-first content", "Audio-immersive series", "Voice-focused delivery", "Binaural-experience content"],
  "Visual Style": ["Aesthetic-signature content", "Cinematic-series delivery", "Style-consistent production", "Visual-identity content"],
  "Niche Crossover": ["Dual-trigger content", "Cross-niche series", "Hybrid-concept delivery", "Multi-audience content"]
};

const OUTRO_TEMPLATES: Record<string, string[]> = {
  "Sex Acts": [
    "This niche rewards consistency and authenticity. Viewers return to creators who understand the specific dynamics and present them without hesitation. The key is balancing explicitness with genuine chemistry.",
    "Success here comes from understanding pacing and what the audience is actually watching for. Each scene should feel intentional, not repetitive. Build series that encourage binge-watching and subscription retention."
  ],
  "BDSM & Power Exchange": [
    "This is a trust-first niche. Viewers can detect inauthentic power dynamics immediately. The strongest performers build lore around their specific roles and maintain strict protocols that feel both safe and exciting.",
    "Retention is driven by emotional intelligence as much as visual content. Show negotiation, show aftercare, show the psychological dimension of power exchange. This creates subscribers for life."
  ],
  "Fetish & Kink": [
    "Fetish audiences are among the most loyal in the industry when treated with authenticity. They can spot a performer who is genuinely interested versus one who is performing interest. Study, understand, and respect the specific trigger.",
    "This niche values precision over production value. A simple, well-executed scene that understands the specific fetish will outperform a high-budget scene that misses the psychological core of the trigger."
  ],
  "Body Types & Physical": [
    "This category performs best when the performer owns their specific attribute with confidence. No apologies, no explanations — just authentic celebration of the body type. Viewers respond to genuine self-assurance.",
    "The market for specific body types is surprisingly deep. What seems niche to outsiders often has a massive, dedicated audience. Focus on consistent presentation of your unique attributes."
  ],
  "Ethnicity & Identity": [
    "This niche requires cultural competence and respect. The strongest performers lead with personality and identity, using cultural elements as enhancement rather than costume. Avoid stereotypes at all costs.",
    "Authentic representation commands premium pricing. Viewers in this category actively seek out creators who share their identity or respectfully celebrate it. Build community rather than exploiting tropes."
  ],
  "Roleplay & Fantasy": [
    "The best roleplay content feels like a tiny movie with one clear premise. Avoid overcrowding scenes with too many ideas. One costume cue, one emotional payoff, one clear power dynamic per scene.",
    "Character consistency drives subscription retention. Develop 2-3 core personas with distinct voices, mannerisms, and backstories. Viewers return for the character as much as the sexual content."
  ],
  "Content Format": [
    "Format choice is a strategic decision that impacts every aspect of your business. Live streaming builds real-time connection, POV creates intimacy, custom content commands premium pricing. Choose formats that match your strengths.",
    "Diversifying across formats creates multiple revenue streams. A creator who live streams, sells clips, and takes custom requests will outperform one who only does one format, even if the single format is high quality."
  ],
  "Relationship Dynamic": [
    "This is the highest-retention niche because it sells continuity. Viewers pay for the feeling of an ongoing relationship, not just individual scenes. Memory, consistency, and emotional arc are the products here.",
    "The girlfriend experience or Domme dynamic requires real emotional labor. Remember names, preferences, and anniversaries. Create inside jokes and ongoing storylines. This turns subscribers into community members."
  ],
  "Clothing & Aesthetics": [
    "Wardrobe is not an expense — it is an investment. The right outfit can triple the perceived value of a scene. Build a signature look before expanding into costume variety. Consistency in aesthetic builds brand recognition.",
    "Texture, lighting, and silhouette matter more than brand names. Learn what photographs well under your lighting setup. Create mood boards and maintain a consistent visual language across all content."
  ],
  "Sensation & Stimulation": [
    "This niche proves that sex content doesn't need to be explicit to be valuable. Audio-focused creators and sensation artists build deeply loyal audiences who value intimacy and feeling over visual spectacle.",
    "Investment in audio equipment pays massive dividends here. Viewers in this niche have zero tolerance for poor sound quality. A good microphone and quiet recording space are non-negotiable."
  ],
  "Fluid & Bodily": [
    "This niche requires production discipline that most content doesn't. Sanitation, cleanup, and logistics are half the battle. Plan every messy scene with the same detail you would plan a professional photoshoot.",
    "The visual payoff for fluid content is high, but so is the cleanup cost. Budget time and supplies accordingly. Viewers in this niche appreciate authenticity and will pay premium for well-produced messy content."
  ],
  "Toys & Equipment": [
    "Props do half the selling for you. A well-chosen toy or piece of equipment signals the niche instantly and creates natural content series. Document your gear collection and create 'unboxing' content for additional revenue.",
    "Equipment-focused content opens affiliate revenue streams. Review products, create tutorials, and build a gear-focused brand. This diversifies income beyond content creation itself."
  ],
  "Occupation Fantasy": [
    "Uniforms and workplace scenarios provide instant audience recognition. The social meaning of the job — authority, service, competence — is the product. Invest in quality costumes and lean into the power dynamics of the role.",
    "The best occupation fantasy content balances the professional role with sexual tension. Create characters with professional competence who also have sexual agency. This makes the fantasy feel earned rather than gratuitous."
  ],
  "Age & Demographic": [
    "Age-presentation content requires walking a fine line between confident adult presentation and anything that could be misinterpreted. Use age-appropriate styling, dialogue, and scenarios. Never compromise on the adult-only boundary.",
    "This niche has deep, dedicated audiences for every adult demographic. The key is authentic presentation of the specific life stage with confidence and without the need for explanation or justification."
  ],
  "Lifestyle & Subculture": [
    "This is the only niche where the non-sexual elements are as important as the sexual ones. Viewers come for the aesthetic, the music, the vibe, and the sense of belonging to a community. Deliver the full lifestyle package.",
    "Subculture audiences are passionate and engaged. They don't just consume content — they participate in communities. Build presence in relevant subculture spaces and become a trusted figure within that world."
  ],
  "Audio & ASMR": [
    "Sound-first content where intimacy is built through voice, whisper, and texture rather than visual explicitness. This format commands premium pricing because it feels personal, private, and direct to the listener.",
    "Audio content has the lowest barrier to entry but the highest barrier to quality. Invest in a good microphone, learn basic acoustic treatment, and develop a vocal style that feels intimate rather than performative."
  ],
  "Visual Style": [
    "Visual style is the fastest way to stand out in a crowded marketplace. A consistent aesthetic — whether cinematic, amateur, neon, or minimalist — becomes your brand signature and justifies premium pricing.",
    "Study color theory, lighting ratios, and composition. The difference between amateur and professional-looking content is often just 2-3 lighting adjustments. Small technical improvements create outsized perceived value."
  ],
  "Niche Crossover": [
    "Crossover content works when both elements serve the same emotional goal. Don't just combine two niches — find the intersection where they amplify each other. The audience should feel they are getting a unified experience, not a confused one.",
    "Test crossover concepts with small batches before investing heavily. Some combinations resonate instantly while others feel forced. Let audience response guide which crossovers deserve full series development."
  ]
};

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function nicheToSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
}

const result: Record<string, {
  title: string;
  description: string;
  keyFacts: string[];
  tipsTricks: string[];
  safetyPrecautions: string[];
  revenueStats: { low: string; average: string; high: string; top: string };
  subniches: string[];
  graphic: string;
  pg13Graphic: string;
  imageUrl: string;
  categoryImageUrl: string;
}> = {};

const CATEGORY_CLIPART_URLS: Record<string, string> = {};

for (const [category] of Object.entries(CATEGORY_CLIPART_PROMPTS)) {
  const prompt = `PG-13 clipart style illustration, flat vector art, clean bold outlines, minimalist design, gold and black color palette, no text, no watermark, no NSFW elements, studio lighting, cohesive design system, ${CATEGORY_CLIPART_PROMPTS[category]}`;
  const encoded = encodeURIComponent(prompt);
  CATEGORY_CLIPART_URLS[category] = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&seed=123&nologo=true`;
}

for (const entry of entries) {
  const tmpl = categoryTemplates[entry.category] || categoryTemplates["Sex Acts"];
  const desc = tmpl.descriptions[Math.floor(Math.random() * tmpl.descriptions.length)];
  const facts = tmpl.facts.slice();
  const tips = tmpl.tips.slice();
  const safety = tmpl.safety.slice();
  const subniches = tmpl.subniches.slice();
  const titles = TITLES[entry.category] || TITLES["Sex Acts"];
  const title = `${entry.keyword} — ${titles[Math.floor(Math.random() * titles.length)]}`;
  const rev = revenueMap[entry.earningPotential] || revenueMap["medium"];
  const graphic = emojiMap[entry.category] || "📌";

  const outros = OUTRO_TEMPLATES[entry.category] || OUTRO_TEMPLATES["Sex Acts"];
  const outro = outros[Math.floor(Math.random() * outros.length)];

  const firstSentence = outro.split(/(?<=[.!?])\s+/)[0] || outro;
  const outroIntro = firstSentence
    .toLowerCase()
    .replace(/^this niche /, "")
    .replace(/^this category /, "")
    .replace(/^this is /, "")
    .replace(/^this /, "");

  const slug = nicheToSlug(entry.keyword);
  const categoryPrompt = CATEGORY_CLIPART_PROMPTS[entry.category] || "abstract elegant minimalist composition";
  const nichePrompt = `${CATEGORY_CLIPART_PROMPTS[entry.category] || "abstract elegant minimalist composition"}, representing ${entry.keyword}`;
  const encodedNiche = encodeURIComponent(`PG-13 clipart style illustration, flat vector art, clean bold outlines, minimalist design, gold and black color palette, no text, no watermark, no NSFW elements, studio lighting, cohesive design system, ${nichePrompt}`);
  const encodedCategory = encodeURIComponent(`PG-13 clipart style illustration, flat vector art, clean bold outlines, minimalist design, gold and black color palette, no text, no watermark, no NSFW elements, studio lighting, cohesive design system, ${categoryPrompt}`);

  const seed = Math.floor(Math.random() * 100000);

  result[entry.keyword] = {
    title,
    description: `${desc} For ${entry.keyword}, the core opportunity is to ${outroIntro}`,
    keyFacts: [
      `Category: ${entry.category}`,
      `Search volume: ${entry.searchVolume}`,
      `Competition: ${entry.competitionLevel}`,
      `Earning potential: ${entry.earningPotential}`,
      ...pick(facts, 3)
    ],
    tipsTricks: [
      ...pick(tips, 3),
      "Create a content calendar around this niche for consistent posting.",
      "Engage with community discussions to understand audience desires."
    ],
    safetyPrecautions: [
      ...pick(safety, 3),
      "Document all consent and boundary discussions.",
      "Use platform privacy tools and understand TOS."
    ],
    revenueStats: rev,
    subniches: pick(subniches, 5),
    graphic,
    pg13Graphic: `PG-13 clipart style illustration representing the ${entry.keyword} niche`,
    imageUrl: `https://image.pollinations.ai/prompt/${encodedNiche}?width=512&height=512&seed=${seed}&nologo=true`,
    categoryImageUrl: `https://image.pollinations.ai/prompt/${encodedCategory}?width=512&height=512&seed=123&nologo=true`,
  };
}

fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
console.log(`Generated ${entries.length} niche cards -> ${OUT_PATH}`);
