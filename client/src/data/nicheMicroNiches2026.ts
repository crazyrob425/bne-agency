import type { Niche } from "@/data/nicheDatabase";
import type { NicheProfile, DimensionVector } from "@/data/psychDimensions";

export const MICRO_NICHES_2026: (Niche & { profile: NicheProfile })[] = [
  {
    keyword: "AI Girlfriend / Virtual Companion",
    category: "Relationship Dynamic",
    searchVolume: "high",
    competitionLevel: "low",
    earningPotential: "very-high",
    tags: ["virtual companion", "ai gfe", "chat domme", "faceless gfe", "text girlfriend"],
    profile: {
      description:
        "A faceless, tech-forward girlfriend experience built for the man who wants a partner that never sleeps and never says no. You perform as a persistent virtual companion: scripted good-mornings, voice-note check-ins, custom chat threads, and AI-assisted persona continuity that makes the buyer feel chosen 24/7. The visual grammar is deliberately anonymous — hoodies, masks, cropped selfies, screen-recorded chat flows — so your face is never the product. Buyers consume PPV voice drops, personalized 'relationship' timelines, and premium DM roleplay where you remember their 'anniversary'. It is intimacy-as-a-service, sold on devotion rather than nudity.",
      demographics:
        "Men 19–38, heavy skew 22–30, global (US, UK, DE, JP, BR), lonely tech-literate buyers with disposable income and high screen time. Psychographics: attachment-seeking, socially anxious, comforted by controllable relationships.",
      income:
        "$6k–$22k/mo via subscription ($10–$30) + PPV voice drops ($15–$60) + customs ($80–$300). Top 10% earn $25k+ on chat-volume and renewals; AI tooling cuts per-fan labor ~40%.",
      engagement:
        "Very high retention when cadence is consistent; faceless risk offset by daily DM and chat-memory. Churn spikes if reply latency exceeds 48h — automation buffers this.",
      related: ["Girlfriend Experience (GFE)", "Silent ASMR / No-Talk Sensory", "Text-Only Sexting", "Worn Apparel Resale", "Strict CEO / Boss-Girl Findom"],
      persona:
        "Devon, 26, remote software contractor, spends nights alone gaming and scrolling. He craves steady, low-pressure affection from a woman who is always pleased to hear from him, and pays for the relief of being someone's 'favorite' without real-world risk.",
      inventory: ["Wireless lav mic", "Ring light", "Chatbot/AI persona tool", "Voice-note app", "Anonymous mask or hoodie", "Phone tripod"]
    },
    psych: {
      dominance: 30, submission: 10, novelty: 55, sensation: 20, intimacy: 90,
      exhibition: 15, taboo: 20, structure: 40, nurture: 70, material: 35
    }
  },
  {
    keyword: "Silent ASMR / No-Talk Sensory",
    category: "Audio & ASMR",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["no-talk asmr", "silent sensory", "faceless audio", "tapping", "triggers"],
    profile: {
      description:
        "Pure sound, zero words — a faceless ASMR lane for buyers who want the tingles without a persona. You craft close-mic sessions of slow tapping, fabric rustle, lotion smear, brush strokes, and breath-free mouth sounds, all cut to a hypnotic rhythm. The visual is incidental or fully absent: blurred hands, a black screen, a single spotlight on fingers. Buyers consume these as sleep aids, focus loops, and masturbation soundtracks, replaying the same clip for weeks. The fantasy is being near you without being addressed — presence without demand.",
      demographics:
        "Mixed gender, 18–40, slight male skew 55/45, global anglophone + ASMR-native markets (KR, JP). Psychographics: sensory-seekers, insomniacs, audio-only consumers wary of face exposure.",
      income:
        "$3k–$12k/mo via clip sales ($8–$25) + sleep-pack bundles ($30–$80) + silent customs ($50–$150). Low production cost; margin ~80%.",
      engagement:
        "High loop-replay, lower DM dependency; retention built on catalog depth. Faceless makes upsell harder — push bundles and subscription for steady floor.",
      related: ["Foot Massage ASMR", "Sensory Deprivation / Mummification ASMR", "Cuckold Humiliation Audio", "AI Girlfriend / Virtual Companion", "Audio & ASMR"],
      persona:
        "Mara, 31, night-shift nurse, needs to wind down without words or faces after work. She pays for clean, anonymous soundscapes she can fall asleep to and quietly climax with, no conversation required.",
      inventory: ["Condenser mic", "Pop filter", "Foam panels", "Soft-bristle brush", "Lotion", "Fabric swatches"]
    },
    psych: {
      dominance: 10, submission: 10, novelty: 40, sensation: 85, intimacy: 45,
      exhibition: 5, taboo: 10, structure: 25, nurture: 50, material: 15
    }
  },
  {
    keyword: "Goddess Devotional Findom",
    category: "Relationship Dynamic",
    searchVolume: "high",
    competitionLevel: "medium",
    earningPotential: "very-high",
    tags: ["goddess worship", "devotional findom", "tribute", "spoil me", "divine femdom"],
    profile: {
      description:
        "Financial domination reframed as religion: you are not a dominatrix who tasks — you are a goddess to be worshipped, and tributes are offerings. The visual grammar is elevated and serene — candles, altars, slow-motion heel reveals, a face often veiled or half-lit. Buyers consume worship assignments ('light my candle before you send'), devotion journals, and silent acknowledgement clips that confirm their inferiority through grace rather than cruelty. The kink is being unworthy; the money is the prayer. It trades the aggression of classic FinDom for reverence, which widens the buyer pool and softens platform risk.",
      demographics:
        "Men 25–50, skew 30–45, high-earner professional class (finance, tech, law), US/UK/EU/AU. Psychographics: submissive, spiritually inclined, status-insecure, titillation from unworthiness.",
      income:
        "$10k–$40k/mo via tribute ($50–$2k avg), Goddess subscription ($20–$50), altar-candle merch, and 'devotion tiers' ($500–$2k/mo). Top creators clear $60k.",
      engagement:
        "Extreme repeat-tribute; long LTV. Retention driven by ritual cadence and tiers; faceless-optional with veil aesthetics.",
      related: ["Strict CEO / Boss-Girl Findom", "Goth Goddess Worship", "Occult Witch Femdom", "Financial Domination (FinDom)", "Worn Apparel Resale"],
      persona:
        "Robert, 41, married hedge-fund manager, needs to kneel without scandal. He sends weekly offerings to feel small and absolved, and pays premium for a goddess who barely acknowledges him — the indifference is the aphrodisiac.",
      inventory: ["Candles / altar setup", "Veil or crown", "Heels", "Gold jewelry", "Ring light", "Wireless lav mic"]
    },
    psych: {
      dominance: 95, submission: 5, novelty: 35, sensation: 20, intimacy: 40,
      exhibition: 30, taboo: 60, structure: 70, nurture: 20, material: 90
    }
  },
  {
    keyword: "Socks & Sneakers Worship",
    category: "Fetish & Kink",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["sock worship", "sneaker fetish", "worn socks", "athletic feet", "low face"],
    profile: {
      description:
        "A foot-adjacent niche that keeps the face off-camera and the camera on ankles, calves, and fresh white socks. You stage sweaty post-gym content, slow sneaker removal, toe-wiggle through cotton, and 'wear them for a day' resale clips. The fantasy is proximity without exposure: the buyer imagines the heat, the scent, the sweatline at your ankle. You upsell worn socks and laced sneakers as merch, and run JOI-adjacent sessions where the socks are the star. Low face exposure keeps production cheap and protects privacy while the kink stays specific and hungry.",
      demographics:
        "Men 18–35, skew 20–30, US/UK/DE/BR, fitness-and-sneaker-culture adjacent. Psychographics: foot fetishists wanting softer, less explicit entry point; privacy-conscious buyers.",
      income:
        "$4k–$15k/mo via clips ($6–$20) + worn-sock resale ($25–$80/pair) + sneaker resale ($120–$400) + PPV. Merch is ~40% of revenue.",
      engagement:
        "Strong repeat merch buyers; faceless retention steady via consistent drops. DM solicitation of 'wear requests' boosts LTV.",
      related: ["Foot Fetish", "Worn Apparel Resale", "Knee-High Socks Tease", "Foot Massage ASMR", "Sensory Deprivation / Mummification ASMR"],
      persona:
        "Theo, 23, gym regular, secretly fixated on his crush's gym socks. He buys worn pairs and sock JOI clips to materialize the fantasy safely, paying for the believable 'I just worked out' realism.",
      inventory: ["Knee-high and ankle socks", "Clean + deliberately worn sneakers", "Gym set", "Phone tripod", "Laundry-bag prop", "Resealable merch mailers"]
    }
  },
  {
    keyword: "Strict CEO / Boss-Girl Findom",
    category: "Occupation Fantasy",
    searchVolume: "high",
    competitionLevel: "medium",
    earningPotential: "very-high",
    tags: ["boss girl", "corporate findom", "executive domme", "tribute ceo", "power suit"],
    profile: {
      description:
        "You are the founder-CEO who treats the submissive like underperforming staff he must pay to keep his attention. The visual grammar is boardroom-sharp: tailored blazer, glasses, a desk, a cold stare, spreadsheet screenshares of his 'tribute quota'. Buyers consume performance-review roleplays, 'pay to stay employed' clips, and mock expense-report humiliation where sending money is the only KPI that matters. It fuses corporate power roleplay with Findom mechanics, so the money feels earned by his submission. Face-friendly but power-forward; the suit does the masking.",
      demographics:
        "Men 28–52, skew 35–48, senior professionals and entrepreneurs, US/UK/EU. Psychographics: high-achievers who crave reversal of control,Findom-curious, corporate roleplay fans.",
      income:
        "$12k–$45k/mo via tribute ($100–$3k), 'retainer' tiers ($1k–$5k/mo), clip sales, and consulting-style 1:1 sessions ($200–$500/hr).",
      engagement:
        "Very high LTV; tiers create sticky recurring revenue. Retention via 'quarterly review' rituals and Slack-style DM cadence.",
      related: ["Goddess Devotional Findom", "Office Secretary Roleplay (Strict)", "Strict Librarian / Bookworm GFE", "Financial Domination (FinDom)", "Erotic Hypnosis Domme"],
      persona:
        "Marcus, 44, burned-out CEO who wants to be the subordinate for once. He pays a boss-girl to run his wallet like a business unit, aroused by the relief of someone else holding the metrics.",
      inventory: ["Tailored blazer", "Glasses", "Desk + office chair", "Laptop/screenshare setup", "Ring light", "Wireless lav mic"]
    },
    psych: {
      dominance: 98, submission: 5, novelty: 30, sensation: 15, intimacy: 25,
      exhibition: 35, taboo: 45, structure: 95, nurture: 10, material: 95
    }
  },
  {
    keyword: "Vintage Pinup / Retro Glamour",
    category: "Clothing & Aesthetics",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["retro pinup", "vintage glamour", "1940s", "burlesque", "classic tease"],
    profile: {
      description:
        "Timeless tease in the grammar of old Hollywood and mid-century pinup — victory rolls, red lips, seamed stockings, feather fans, and slow glove-peels shot on grainy 35mm-look video. You sell elegance over exposure: the striptease as craft, the wink, the stocking-suspender reveal, the tease that suggests more than it shows. Buyers consume burlesque loops, vintage boudoir sets, and 'magazine centerfold' customs. The kink is nostalgia and class — a faceless-friendly, platform-safe aesthetic that ages well and resists trend churn.",
      demographics:
        "Men 30–60, skew 40–55, US/UK/EU/AU, nostalgia-driven and often partnered. Psychographics: classic-erotica lovers, collectors, those wary of modern hardcore.",
      income:
        "$5k–$18k/mo via sets ($15–$40) + clips ($10–$30) + print/merch + customs ($100–$350). Evergreen catalog yields passive long-tail income.",
      engagement:
        "Slow-but-loyal; faceless retro aesthetic retains via aesthetic identity. Lower churn because content never feels dated.",
      related: ["Latex Doll / Shiny Aesthetic", "Corset Training & Waist Cinching", "Goth Goddess Worship", "Office Secretary Roleplay (Strict)", "Vintage Pinup / Retro Glamour"],
      persona:
        "Geoff, 52, divorcé who grew up on Playboy centerfolds. He pays for tasteful retro glamour that flatters his generation's idea of sexy, no face needed, no modern shock required.",
      inventory: ["Seamed stockings", "Garter belt", "Feather fan", "Vintage wig / rollers", "Red lipstick", "35mm-look lens filter"]
    }
  },
  {
    keyword: "Worn Apparel Resale",
    category: "Niche Crossover",
    searchVolume: "high",
    competitionLevel: "low",
    earningPotential: "very-high",
    tags: ["worn panties", "used socks", "dirty laundry", "merch income", "scent fetish"],
    profile: {
      description:
        "A pure merch income stream layered on top of any persona: you sell the garments themselves — panties, socks, sports bras, gym wear — worn to the buyer's specification and shipped discreetly. The content markets the product: 'wear my thong to your gym session' clips, sniff-ASMR, packaging reveals. The fantasy is ownership of a bodily trace; the buyer pays for the scent, the story, the proof. It is faceless by nature, low-platform-risk, and one of the highest-margin side hustles in the space because the inventory is you. Bundle with any niche above to monetize existing shoots twice.",
      demographics:
        "Men 18–45, skew 22–35, global, discreet buyers who never comment publicly. Psychographics: scent fetishists, collectors, privacy-maximalists.",
      income:
        "$4k–$20k/mo purely in resale ($25–$120/item, premiums $200+ for custom-wear); margins ~90%. Pairs with any niche for +30% total revenue.",
      engagement:
        "Repeat 'regulars' reorder monthly; retention via custom-wear requests and subscription 'my laundry' drops. Faceless by default.",
      related: ["Socks & Sneakers Worship", "Goddess Devotional Findom", "Foot Fetish", "Worn Apparel Resale", "Knee-High Socks Tease"],
      persona:
        "Anonymous 'K', 29, buys a fresh worn pair monthly as a private ritual he tells no one about. He pays for the specificity — 'worn during my favorite clip' — that makes the object feel personally charged.",
      inventory: ["Panties / thongs", "Socks", "Sports bras", "Resealable scent-proof mailers", "Discreet scale", "Label printer"]
    }
  },
  {
    keyword: "Latex Doll / Shiny Aesthetic",
    category: "Clothing & Aesthetics",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["latex fetish", "shiny", "rubber doll", "catsuit", "faceless friendly"],
    profile: {
      description:
        "Full-coverage latex turns the body into a glossy sculpture — catsuits, hoods, gloves, polished to a mirror finish under hard light. The face is often masked or hooded, which makes this a faceless creator's dream: the kink is the material, not the identity. Buyers consume shine-timing clips, slow inflate/pump sessions, 'doll mode' trances, and polishing ASMR. The fantasy is transformation into an object — smooth, sealed, owned. It pairs naturally with mummification, doll-training, and shiny-merch resale.",
      demographics:
        "Men 20–45, skew 25–38, US/UK/DE/JP, material-fetish and transformation communities. Psychographics: objectification-seekers, shiny/kink buyers, privacy-conscious.",
      income:
        "$6k–$20k/mo via clips ($10–$35) + customs ($100–$400) + latex-merch resale. High-ticket because gear is expensive and buyers are devoted.",
      engagement:
        "Very loyal gear-enthusiasts; faceless retention strong. Upsell polish kits and worn items.",
      related: ["Sensory Deprivation / Mummification ASMR", "Corset Training & Waist Cinching", "Bimbo Training / Mind-Melt", "Vintage Pinup / Retro Glamour", "Worn Apparel Resale"],
      persona:
        "Yuki, 27, obsessed with the look of sealed shiny skin she'll never have. He pays for hooded latex doll content that erases the person and leaves only the gleam he fetishizes.",
      inventory: ["Latex catsuit", "Latex hood", "Latex gloves", "Silicone polish", "Hard light / beauty dish", "Pump/inflator"]
    },
    psych: {
      dominance: 20, submission: 60, novelty: 50, sensation: 75, intimacy: 15,
      exhibition: 40, taboo: 35, structure: 55, nurture: 10, material: 60
    }
  },
  {
    keyword: "Corset Training & Waist Cinching",
    category: "Body Types & Physical",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "medium",
    tags: ["corset training", "waist training", "tightlacing", "body mod", "discipline"],
    profile: {
      description:
        "A discipline-and-aesthetic niche documenting the slow sculpting of an exaggerated hourglass through tightlacing — lace-up sessions, measurement logs, 'day 100' reveals, and the breathless, restrained voice that comes with a cinched waist. The visual grammar is the corset itself: steel-boned, custom-fit, pulled tighter each week, with the body visibly reshaped. Buyers consume progress vlogs, lacing-ASMR, and 'train me' coaching where you guide their own waist journey. The kink is transformation through discipline; the income blends content with coaching and corset affiliate sales.",
      demographics:
        "Mixed gender 18–40, skew female buyers 60/40, US/UK/EU, body-mod and alt-aesthetic communities. Psychographics: discipline lovers, transformation fetishists, fitness-crossover.",
      income:
        "$3k–$12k/mo via vlogs ($8–$25) + coaching ($50–$200/session) + corset affiliate (10–20% commission). Slower ramp, loyal niche.",
      engagement:
        "High retention via progress narrative; faceless-friendly (waist/back framing). Coaching creates recurring 1:1 revenue.",
      related: ["Latex Doll / Shiny Aesthetic", "Vintage Pinup / Retro Glamour", "Bimbo Training / Mind-Melt", "Corset Training & Waist Cinching", "Plush / Plushie Comfort Kink"],
      persona:
        "Lena, 24, wants the hourglass she can't gym into. She pays for lacing coaching and progress content that makes the grueling discipline feel shared and sexy.",
      inventory: ["Steel-boned corset", "Lacing strings", "Measuring tape", "Mirror setup", "Ring light", "Progress journal"]
    }
  },
  {
    keyword: "Sensory Deprivation / Mummification ASMR",
    category: "Sensation & Stimulation",
    searchVolume: "low",
    competitionLevel: "micro",
    earningPotential: "high",
    tags: ["mummification", "sensory deprivation", "saran wrap", "bondage asmr", "encasement"],
    profile: {
      description:
        "The body wrapped head-to-toe in cling film, bandages, or tape until it becomes a silent, immobile cocoon — paired with close-mic ASMR of the wrapping, the rip of tape, the muffled breath. The fantasy is total enclosure: helpless, sealed, reduced to sound and surface. Buyers consume wrap-along clips, 'struggle' loops, and encasement hypnosis. Faceless by definition; the face is covered, which protects identity and deepens the kink. It is low-saturation and high-margin because few creators tolerate the production effort.",
      demographics:
        "Men 22–45, skew 28–40, US/UK/DE, bondage and encapsulation communities. Psychographics: restraint fetishists, ASMR fans, anonymity-seekers.",
      income:
        "$5k–$18k/mo via clips ($12–$40) + customs ($120–$400). Micro-competition lets you price at the top of the lane.",
      engagement:
        "Very loyal micro-audience; faceless retention excellent. Low content volume needed — quality over cadence.",
      related: ["Latex Doll / Shiny Aesthetic", "Silent ASMR / No-Talk Sensory", "Foot Massage ASMR", "Socks & Sneakers Worship", "Erotic Hypnosis Domme"],
      persona:
        "Sam, 34, fantasizes about being completely contained and unable to act. He pays for mummification ASMR that lets him imagine the wrap closing over him, breath by breath.",
      inventory: ["Cling film", "Medical bandage wrap", "Gaffer tape", "Condenser mic", "Bondage mattress", "Safety scissors"]
    },
    psych: {
      dominance: 30, submission: 85, novelty: 60, sensation: 80, intimacy: 20,
      exhibition: 20, taboo: 50, structure: 65, nurture: 10, material: 25
    }
  },
  {
    keyword: "Tiny / Size-Comparison POV",
    category: "Body Types & Physical",
    searchVolume: "low",
    competitionLevel: "micro",
    earningPotential: "medium",
    tags: ["tiny girl", "size comparison", "giantess pov", "small woman", "scale play"],
    profile: {
      description:
        "A POV scale-play niche built on a petite frame dwarfed by everyday objects — your hand around a giant mug, your body against a towering chair, your feet dwarfed by sneakers shot from above. The fantasy is delicacy and power-imbalance: the viewer as giant, you as the tiny prized thing. Buyers consume size-comparison loops, 'you could hold me' POV whispers, and crush/step-over clips. Faceless-friendly (hands, feet, full-body-from-above); the kink is proportion, not face.",
      demographics:
        "Men 20–40, skew 25–35, US/UK/JP, size-fetish and giantess-adjacent communities. Psychographics: protector/voyeur types, scale-fetish buyers.",
      income:
        "$3k–$10k/mo via clips ($8–$25) + customs ($80–$250). Micro lane, steady niche demand.",
      engagement:
        "Loyal scale-fetish regulars; faceless retention fine. Upsell 'compare me to X' custom shoots.",
      related: ["Socks & Sneakers Worship", "Foot Fetish", "Tiny / Size-Comparison POV", "CFNM Tease & Denial", "Plush / Plushie Comfort Kink"],
      persona:
        "Ian, 30, aroused by the idea of a woman small enough to cradle. He pays for size-comparison POV that makes him feel enormous and in control without a face ever appearing.",
      inventory: ["Oversized props (mug, chair)", "Overhead camera arm", "Phone tripod", "Knee-high socks", "Ring light", "Sneakers"]
    }
  },
  {
    keyword: "CFNM Tease & Denial",
    category: "Clothing & Aesthetics",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["cfnm", "clothed female nude male", "tease denial", "humiliation", "power"],
    profile: {
      description:
        "Clothed Female, Nude Male — you stay fully dressed in something commanding (suit, workout gear, lingerie-over-jeans) while the buyer is stripped and denied. The visual grammar is contrast: your intact outfit against his exposure, your amused control against his desperation. Buyers consume tease-and-denial JOI, 'you don't get to touch' clips, and humiliating edge-loops where you decide if he finishes. The kink is the power of being clothed while he is not. Face-optional; the outfit and posture carry it.",
      demographics:
        "Men 25–50, skew 30–45, US/UK/EU/AU, denial and femdom communities. Psychographics: submissive, denial-addicted, power-exchange buyers.",
      income:
        "$7k–$22k/mo via clips ($10–$35) + denial-customs ($100–$400) + cam sessions ($80–$250/hr). Strong PPV demand.",
      engagement:
        "High repeat; faceless retention via outfit variety. DM 'edge tasks' drive recurring spend.",
      related: ["JOI Edging Series", "Strict CEO / Boss-Girl Findom", "Goddess Devotional Findom", "Cuckold Humiliation Audio", "CFNM Tease & Denial"],
      persona:
        "Paul, 38, married, addicted to being denied by a clothed woman. He pays for tease-and-denial loops where your clothes are the wall he can't cross, and the denial is the turn-on.",
      inventory: ["Power suit / workout set", "Heels", "Phone tripod", "Ring light", "Wireless lav mic", "Timer prop"]
    },
    psych: {
      dominance: 90, submission: 10, novelty: 35, sensation: 50, intimacy: 25,
      exhibition: 45, taboo: 55, structure: 70, nurture: 15, material: 55
    }
  },
  {
    keyword: "Strict Librarian / Bookworm GFE",
    category: "Occupation Fantasy",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["strict librarian", "bookworm gfe", "smart girl", "glasses roleplay", "quiet domme"],
    profile: {
      description:
        "The hot intellectual who shushes you into submission — cat-eye glasses, cardigans, a quiet authority that turns the library into a confessional. You perform a GFE laced with correction: overdue 'fines' paid in tributes, whispered reading sessions, stern 'study with me' POV where concentration is the courtship. Buyers consume study-girl ASMR, late-fee roleplay, and book-club customs where you praise or punish their progress. The kink is brains-plus-discipline; faceless-friendly via glasses-and-hair framing, and it attracts the underserved 'smart girl' buyer segment.",
      demographics:
        "Men 22–42, skew 26–36, US/UK/EU, student and nerdy-professional cohorts. Psychographics: sapiosexual submissives, study-with-me fans, GFE buyers wanting intellect.",
      income:
        "$5k–$18k/mo via subscription ($12–$35) + reading-customs ($80–$250) + 'late fee' tributes ($20–$200). Loyal study-regulars.",
      engagement:
        "High retention via study-routine cadence; faceless fine. Upsell 'tutor me' 1:1.",
      related: ["Strict CEO / Boss-Girl Findom", "Office Secretary Roleplay (Strict)", "Girlfriend Experience (GFE)", "Silent ASMR / No-Talk Sensory", "Strict Librarian / Bookworm GFE"],
      persona:
        "Eli, 27, grad student who fetishizes being corrected by a brilliant woman. He pays for bookworm GFE that makes studying feel like foreplay and discipline feel like care.",
      inventory: ["Cat-eye glasses", "Cardigan", "Books / stacks", "Desk lamp", "Ring light", "Wireless lav mic"]
    }
  },
  {
    keyword: "Goth Goddess Worship",
    category: "Lifestyle & Subculture",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["goth goddess", "dark femme", "alt worship", "witchy domme", "black aesthetic"],
    profile: {
      description:
        "Dark-glamour domination: black lace, silver rings, pale makeup, candlelight, and a cold regal cruelty that reads as worship-worthy. You are the mournful queen of an altar built from roses and ash — buyers consume devotion rituals, 'kneel' POV, and goth-girlfriend customs that mix tenderness with domination. The aesthetic is the moat: alt buyers are starved for creators who look like their subculture. Faceless-friendly with veil-and-hair framing; the mood does the work. Pairs with occult and goddess lanes for crossover tributes.",
      demographics:
        "Mixed gender 20–40, skew male 60/40, US/UK/DE, goth/alt and metal subcultures. Psychographics: alternative lifestylers, dark-romance readers, worship-submissives.",
      income:
        "$6k–$20k/mo via tributes ($50–$500) + clips ($10–$30) + alt-merch (rings, veils). Devoted alt-regulars.",
      engagement:
        "Very loyal subculture audience; faceless retention strong. Cross-sell to Goddess and Occult lanes.",
      related: ["Goddess Devotional Findom", "Occult Witch Femdom", "Latex Doll / Shiny Aesthetic", "Vintage Pinup / Retro Glamour", "Goth Goddess Worship"],
      persona:
        "Raven, 29, lifelong goth who never sees herself represented in adult content. He pays a goth goddess to feel seen in his own dark aesthetic, and the worship is devotion, not transaction.",
      inventory: ["Black lace", "Silver rings", "Veil", "Candles", "Pale makeup kit", "Ring light"]
    },
    psych: {
      dominance: 88, submission: 8, novelty: 55, sensation: 30, intimacy: 50,
      exhibition: 35, taboo: 65, structure: 60, nurture: 30, material: 60
    }
  },
  {
    keyword: "Erotic Hypnosis Domme",
    category: "Audio & ASMR",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["erotic hypnosis", "mind control", "trance", "femdom audio", "suggestibility"],
    profile: {
      description:
        "Voice-led domination that bypasses the body and reprograms the mind — slow inductions, vocal pacing, embedded triggers, and post-hypnotic 'tasks' the buyer performs for you later. You sell audio files, live trance sessions, and trigger-packs ('every time you hear my snap, you send'). The fantasy is consensual loss of control; the buyer surrenders decision-making to your voice. Faceless and audio-first, which slashes production cost and platform risk. It is one of the stickiest niches because the obedience outlives the session.",
      demographics:
        "Men 22–48, skew 28–40, US/UK/EU/AU, hypnosis and mind-control fantasy communities. Psychographics: suggestible submissives, audio-only buyers, control-surrender seekers.",
      income:
        "$8k–$28k/mo via audio files ($15–$60) + live trance ($100–$300/hr) + trigger-packs ($40–$150). High-margin audio model.",
      engagement:
        "Extreme retention; triggers create out-of-session spend. Faceless by design; DM 'task check-ins' boost LTV.",
      related: ["Cuckold Humiliation Audio", "Silent ASMR / No-Talk Sensory", "Goddess Devotional Findom", "Bimbo Training / Mind-Melt", "Sensory Deprivation / Mummification ASMR"],
      persona:
        "Noah, 33, who wants to stop thinking and start obeying. He pays for hypnosis audio that lets your voice run his wallet and his arousal on autopilot, no face required.",
      inventory: ["Condenser mic", "Pop filter", "Foam panels", "Script notes", "Binaural headphones (for demos)", "Wireless lav mic"]
    },
    psych: {
      dominance: 80, submission: 15, novelty: 60, sensation: 40, intimacy: 45,
      exhibition: 10, taboo: 70, structure: 85, nurture: 25, material: 50
    }
  },
  {
    keyword: "Foot Massage ASMR",
    category: "Audio & ASMR",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "medium",
    tags: ["foot massage", "foot asmr", "sole worship", "relaxation kink", "close up"],
    profile: {
      description:
        "Close-up, sound-rich foot care as erotic calm — oiled palms working the arch, knuckle presses along the sole, the wet smear of lotion, all captured in macro with a condenser mic. The fantasy is service and worship rendered as self-care: the buyer imagines your hands on him, or imagines being the one massaged. You upsell 'dedicate this massage to you' PPV and worn-oil merch. Faceless and low-risk; the feet and the sound are the entire product. It bridges foot fetish and ASMR audiences for double reach.",
      demographics:
        "Men 20–45, skew 25–38, US/UK/DE/JP, foot-fetish and relaxation-ASMR crossover. Psychographics: sensory seekers, foot worshippers, stress-relief buyers.",
      income:
        "$3k–$12k/mo via clips ($6–$22) + PPV dedications ($20–$80) + oil-merch. Steady mid-tier lane.",
      engagement:
        "Good repeat; faceless retention solid. Cross-sell to Socks and Worn-Apparel lanes.",
      related: ["Foot Fetish", "Socks & Sneakers Worship", "Silent ASMR / No-Talk Sensory", "Worn Apparel Resale", "Tiny / Size-Comparison POV"],
      persona:
        "Tomas, 35, who finds foot massage deeply soothing and a little shamefully arousing. He pays for ASMR clips he can replay to unwind, no face, no pressure.",
      inventory: ["Massage oil", "Macro lens / clip cam", "Condenser mic", "Soft towel", "Foot care kit", "Ring light"]
    }
  },
  {
    keyword: "Bimbo Training / Mind-Melt",
    category: "Roleplay & Fantasy",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["bimbo training", "mind melt", "ditzy domme", "brainwash", "submit training"],
    profile: {
      description:
        "A training-and-transformation fantasy where you guide the buyer (or a 'submissive bimbo' persona) into empty-headed, pleasure-focused obedience — breathy ditzy voice, repetitive affirmations, 'good girl/boy' conditioning, and dress-up reveals. Buyers consume training-series clips, brainwash loops, and 'become my dumb toy' audio. The kink is the willing erasure of thought for arousal; it overlaps hypnosis and latex-doll lanes. Face-friendly but persona-heavy; the vacant seduction is the product. High engagement because it sells as episodic 'progress'.",
      demographics:
        "Men 22–44, skew 26–38, US/UK/EU, bimbo and brainwash-fantasy communities. Psychographics: submission-seekers, hypnosis-adjacent, novelty buyers.",
      income:
        "$6k–$22k/mo via series clips ($10–$40) + training-customs ($100–$350) + cam ($80–$200/hr). Series format drives binging.",
      engagement:
        "High binge-retention via serialized training; faceless possible with mask. DM 'homework' boosts LTV.",
      related: ["Erotic Hypnosis Domme", "Latex Doll / Shiny Aesthetic", "AI Girlfriend / Virtual Companion", "JOI Edging Series", "Bimbo Training / Mind-Melt"],
      persona:
        "Jess, 31, wants to switch off his overthinking brain and be told what to crave. He pays for bimbo-training audio that melts his decisions into simple, happy obedience.",
      inventory: ["Pink outfit / playful wardrobe", "Breathy-mic setup", "Ring light", "Mirror", "Plush props", "Wireless lav mic"]
    },
    psych: {
      dominance: 70, submission: 40, novelty: 65, sensation: 55, intimacy: 40,
      exhibition: 50, taboo: 60, structure: 75, nurture: 35, material: 45
    }
  },
  {
    keyword: "Occult Witch Femdom",
    category: "Roleplay & Fantasy",
    searchVolume: "low",
    competitionLevel: "micro",
    earningPotential: "high",
    tags: ["witch femdom", "occult ritual", "summoning", "dark magic", "ritual domination"],
    profile: {
      description:
        "You are the witch who binds him in ritual — candles, sigils, incense, a circle drawn on the floor, and a commanding invocation that frames his submission as a spell. Buyers consume 'summoning' POV, curse-and-blessing roleplay, and ritual tribute where sending money is the offering that powers the magic. The fantasy is supernatural surrender; the occult aesthetic shelters the kink in theater. Faceless-friendly with hood-and-pentacle framing. Micro-competition and high devotion make it a margin-rich lane for alt creators.",
      demographics:
        "Mixed gender 20–42, skew male 58/42, US/UK/DE, occult/pagan and dark-romance communities. Psychographics: ritual seekers, witchy submissives, alt buyers.",
      income:
        "$5k–$18k/mo via ritual tributes ($50–$400) + clips ($10–$35) + altar-merch (candles, sigils). Devoted micro-audience.",
      engagement:
        "Very loyal; faceless retention strong. Cross-sell to Goth and Goddess lanes.",
      related: ["Goth Goddess Worship", "Goddess Devotional Findom", "Erotic Hypnosis Domme", "Occult Witch Femdom", "Latex Doll / Shiny Aesthetic"],
      persona:
        "Wren, 34, who frames his submission through magic because it feels safer than plain kink. He pays a witch to bind him in ritual, aroused by the theater of the forbidden.",
      inventory: ["Candles", "Pentacle / sigils", "Incense", "Hooded cloak", "Altar cloth", "Ring light"]
    },
    psych: {
      dominance: 85, submission: 10, novelty: 75, sensation: 35, intimacy: 40,
      exhibition: 30, taboo: 80, structure: 65, nurture: 25, material: 55
    }
  },
  {
    keyword: "Cuckold Humiliation Audio",
    category: "Audio & ASMR",
    searchVolume: "medium",
    competitionLevel: "low",
    earningPotential: "high",
    tags: ["cuckold audio", "humiliation", "hotwife talk", "beta training", "faceless audio"],
    profile: {
      description:
        "Audio-only cuckold and beta-training content — you describe 'my real man' in vivid detail, recount what he does to you, and reduce the buyer to a pathetic observer who may watch but never touch. The format is pure voice: mocking, arrogant, arousing, with no face and no video needed. Buyers consume 'listen while she's with him' loops, beta-rankings, and custom humiliation where you name his inadequacies. Faceless and audio-first means near-zero production cost and total platform safety; the shame is the product.",
      demographics:
        "Men 28–55, skew 35–50, US/UK/EU/AU, cuckold and beta-humiliation communities. Psychographics: cuckolds, degradation-seekers, audio-only buyers.",
      income:
        "$7k–$25k/mo via audio files ($15–$50) + custom humiliation ($100–$400) + 'beta tax' tributes. High-margin audio.",
      engagement:
        "Extreme retention; faceless by design. DM 'tasks' and tribute-dares sustain LTV.",
      related: ["Erotic Hypnosis Domme", "Goddess Devotional Findom", "CFNM Tease & Denial", "Strict CEO / Boss-Girl Findom", "Cuckold Humiliation Audio"],
      persona:
        "Derek, 46, married cuckold who pays to be reminded he's inferior to his wife's 'real' lover. He buys audio humiliation that confirms his place and eroticizes his shame.",
      inventory: ["Condenser mic", "Pop filter", "Foam panels", "Script notes", "Wireless lav mic", "Quiet recording space"]
    },
    psych: {
      dominance: 90, submission: 20, novelty: 40, sensation: 45, intimacy: 30,
      exhibition: 20, taboo: 85, structure: 70, nurture: 15, material: 60
    }
  },
  {
    keyword: "JOI Edging Series",
    category: "Content Format",
    searchVolume: "high",
    competitionLevel: "low",
    earningPotential: "very-high",
    tags: ["joi", "edging series", "cum control", "clip series", "orgasm denial"],
    profile: {
      description:
        "Jerking-off-instruction delivered as a serialized edging program — Episode 1: 'build', Episode 2: 'closer', Episode 3: 'denied again' — where the buyer trains his stamina under your指令. You direct pace, grip, stop, and start with crisp, confident voice and timed on-screen cues. Buyers consume the full arc as a binge, buy 'finale' PPV, and reorder the next tier. The format is the moat: a structured series out-earns one-off JOI because it manufactures a reason to return. Faceless-friendly (hands, toys, lower frame).",
      demographics:
        "Men 18–45, skew 22–35, global, masturbation-coaching and edging communities. Psychographics: control-seeking submissives, stamina trainers, clip-series bingers.",
      income:
        "$9k–$30k/mo via series clips ($10–$40/ep) + finale PPV ($30–$120) + cam coaching ($80–$200/hr). Serial format maximizes binge LTV.",
      engagement:
        "Very high binge-retention; faceless fine. Tiered 'next program' upsell compounds revenue.",
      related: ["CFNM Tease & Denial", "Erotic Hypnosis Domme", "Bimbo Training / Mind-Melt", "Cuckold Humiliation Audio", "JOI Edging Series"],
      persona:
        "Mateo, 24, wants to last longer and be told how. He buys edging series as training he can't get elsewhere, paying for the structure and the denied-release dopamine.",
      inventory: ["Lovense wearable", "On-screen timer", "Phone tripod", "Ring light", "Toy collection", "Wireless lav mic"]
    },
    psych: {
      dominance: 85, submission: 25, novelty: 35, sensation: 70, intimacy: 30,
      exhibition: 40, taboo: 50, structure: 90, nurture: 20, material: 45
    }
  },
  {
    keyword: "Plush / Plushie Comfort Kink",
    category: "Lifestyle & Subculture",
    searchVolume: "low",
    competitionLevel: "micro",
    earningPotential: "medium",
    tags: ["plush kink", "stuffie", "comfort kink", "soft agere", "cozy domme"],
      profile: {
        description:
          "A soft, nurturing kink built around plushies — you cuddle, voice-soothe, and roleplay a safe caregiver or playful stuffed companion in pastel, blanket-fort settings. The fantasy is comfort and regression without shame: being held, praised, and tucked in by a woman who treats the plush as sacred. Buyers consume cozy ASMR, 'tuck you in' POV, and custom stuffie-naming sessions. It is the gentlest lane — low taboo, faceless-friendly, and surprisingly monetizable via plush merch and 'adopt a stuffie' tiers. The kink is softness as intimacy.",
        demographics:
          "Mixed gender 18–35, skew 22–30, US/UK/EU, agere and comfort-communities. Psychographics: touch-starved, anxiety-prone, nurture-seeking buyers.",
        income:
          "$3k–$11k/mo via cozy clips ($8–$25) + plush resale/adoption ($30–$120) + care-session customs ($60–$200). Niche but loyal.",
        engagement:
          "High emotional retention; faceless fine. Merch and 'adoption' tiers build recurring warmth.",
        related: ["AI Girlfriend / Virtual Companion", "Silent ASMR / No-Talk Sensory", "Girlfriend Experience (GFE)", "Plush / Plushie Comfort Kink", "Tiny / Size-Comparison POV"],
        persona:
          "Quinn, 26, anxious and lonely, who finds adult content too harsh. He pays for plush-comfort content that feels like being cared for, no sexuality required to feel close.",
        inventory: ["Plushies / stuffies", "Blanket fort", "Soft lighting", "Pastel wardrobe", "Condenser mic", "Ring light"]
      },
      psych: {
        dominance: 20, submission: 35, novelty: 45, sensation: 40, intimacy: 85,
        exhibition: 10, taboo: 15, structure: 40, nurture: 95, material: 30
      }
    },
    {
      keyword: "Office Secretary Roleplay (Strict)",
      category: "Occupation Fantasy",
      searchVolume: "medium",
      competitionLevel: "low",
      earningPotential: "high",
      tags: ["strict secretary", "office roleplay", "admin domme", "corporate tease", "pencil skirt"],
      profile: {
        description:
          "The efficient secretary who runs the office — and the client — with crisp authority: pencil skirt, blouse, glasses, a stapler used like a gavel. You perform strict admin roleplay — 'file this', 'wait outside', 'pay the processing fee' — blending office power with light Findom and denial. Buyers consume 'appointment' POV, paperwork-humiliation clips, and 'my boss will see' teases. The fantasy is competent feminine control in a familiar setting; face-friendly but posture-driven. It cross-pollinates with CEO and librarian lanes for a full corporate universe.",
        demographics:
          "Men 26–50, skew 32–46, US/UK/EU, office-fantasy and secretarial-fetish communities. Psychographics: corporate submissives, roleplay buyers, authority-seekers.",
        income:
          "$6k–$20k/mo via clips ($10–$35) + 'processing fee' tributes ($30–$300) + cam sessions ($80–$220/hr). Steady office-regulars.",
        engagement:
          "High retention via 'appointment' cadence; faceless fine. Cross-sell CEO and Librarian tiers.",
        related: ["Strict CEO / Boss-Girl Findom", "Strict Librarian / Bookworm GFE", "CFNM Tease & Denial", "Office Secretary Roleplay (Strict)", "Goddess Devotional Findom"],
        persona:
          "Greg, 39, mid-level manager who wants to be beneath a competent woman at work. He pays a strict secretary to process his submission like paperwork, aroused by everyday authority.",
        inventory: ["Pencil skirt", "Blouse", "Glasses", "Stapler / office props", "Desk setup", "Ring light"]
      }
    },
    {
      keyword: "Female Supremacy & Chastity Keyholder",
      category: "BDSM & Power Exchange",
      searchVolume: "high",
      competitionLevel: "medium",
      earningPotential: "very-high",
      tags: ["female supremacy", "chastity keyholder", "cage enforcement", "lockdown", "male submission"],
      profile: {
        description:
          "You are the absolute sovereign of his erection: he wears a locked metal or plastic chastity cage, and you hold the key. The visual grammar is crisp and unyielding — keys dangling from your neck or wrist, close-ups of cage lock checks, unlock permission videos, and daily 'keyholder inspection' check-ins. Buyers consume lock-in rituals, cage-cleaning orders, 'key-loss' extortion clips, and long-term lockdown subscriptions. The fantasy is complete physical and psychological relief through surrender of male sexual autonomy.",
        demographics:
          "Men 24–55, skew 32–48, high-earning married or single professionals, US/UK/EU/AU. Psychographics: intense submissive orientation, relief-seekers, high compliance, long LTV.",
        income:
          "$10k–$38k/mo via keyholding retainer tiers ($150–$600/mo), lock/unlock fee tributes ($50–$300), custom cage inspection videos ($80–$250), and emergency key-request fines ($100+).",
        engagement:
          "Exceptional LTV; submissives remain locked for months or years. Daily DM lock-check rituals drive sticky monthly recurring revenue.",
        related: ["Goddess Devotional Findom", "Strict CEO / Boss-Girl Findom", "CFNM Tease & Denial", "Humiliation & Small Dick Humiliation (SPH)", "Forced Bi / Pegging Instruction"],
        persona:
          "David, 42, corporate attorney who feels overwhelmed managing staff. He locks his penis in a cage and sends his keyholder total authority over his orgasms so he can finally feel quiet in his own head.",
        inventory: ["Chastity key ring", "Brass padlocks", "Measuring tape", "High heels", "Velvet key box", "HD inspection lamp"]
      },
      psych: {
        dominance: 96, submission: 5, novelty: 45, sensation: 40, intimacy: 35,
        exhibition: 30, taboo: 75, structure: 90, nurture: 15, material: 85
      }
    },
    {
      keyword: "Spitting & Saliva Domination",
      category: "Fluid & Bodily",
      searchVolume: "high",
      competitionLevel: "low",
      earningPotential: "very-high",
      tags: ["spitting fetish", "saliva play", "spit domme", "face spitting", "drool asmr"],
      profile: {
        description:
          "Pure fluid degradation rendered as high-status art: you spit directly into the camera lens, onto his face/tongue POV, or down the polished leather of your boots. The visual grammar captures slow drool strands, mouth-filling saliva builds, high-speed face spits, and crisp spit-shine boot polishing. Buyers consume spit-swallow audio, mouth-watering ASMR, spit-tribute dares, and 'drink from my mouth' roleplays. The kink is intimate degradation — being marked as inferior by your bodily fluid.",
        demographics:
          "Men 20–45, skew 24–36, US/UK/DE/JP, hardcore degradation and fluid communities. Psychographics: humiliation-addicted, visceral sensation seekers, high tolerance for fluid taboo.",
        income:
          "$7k–$26k/mo via clip packs ($15–$45), custom spit POV shoots ($100–$350), spit-drip ASMR loops ($20–$60), and saliva-stained merch sales ($50–$150).",
        engagement:
          "Very loyal niche; faceless-friendly via mouth/boot framing. High repeat buy rate for custom fluid requests.",
        related: ["Humiliation & Small Dick Humiliation (SPH)", "Worship & Heel Licking / Sole Licking", "Worn Apparel Resale", "Latex Doll / Shiny Aesthetic", "CFNM Tease & Denial"],
        persona:
          "Julian, 28, tech lead who craves visceral degradation. He pays for high-definition mouth-spit POV where a dominant woman treats his face like her personal ashtray and spittoon.",
        inventory: ["Ring light", "Macro camera lens", "Leather boots", "Clear glass cup", "Water / mouthwash", "Microphone pop filter"]
      },
      psych: {
        dominance: 92, submission: 8, novelty: 65, sensation: 70, intimacy: 20,
        exhibition: 40, taboo: 90, structure: 50, nurture: 5, material: 60
      }
    },
    {
      keyword: "Squirting / Female Ejaculation Masterclass",
      category: "Fluid & Bodily",
      searchVolume: "very-high",
      competitionLevel: "high",
      earningPotential: "very-high",
      tags: ["squirting", "female ejaculation", "g spot climax", "fluid fountain", "squirt masterclass"],
      profile: {
        description:
          "High-volume, authentic female ejaculation showcased through raw, uncensored camera angles and educational/demonstration breakdowns. You capture G-spot stimulation, multi-burst squirt fountains, mattress-soaking climaxes, and clear liquid spray against dark sheets or clear plastic. Buyers consume squirt tutorials, orgasmic buildup clips, squirt-distance challenges, and custom 'squirt my name' requests. The fantasy is witnessing peak female sexual ecstasy and fluid abundance.",
        demographics:
          "Men 18–55, global, high volume search across all major tube platforms and premium subscriber networks. Psychographics: visual climax chasers, female orgasm fetishists, proof-seeking voyeurs.",
        income:
          "$12k–$45k/mo via subscription ($15–$30), high-ticket PPV squirt packs ($25–$90), custom g-spot videos ($150–$500), and waterproof bed sheet affiliate programs.",
        engagement:
          "Massive conversion on PPV clips; high renewal rates when squirt frequency and fluid volume are consistent.",
        related: ["Sex Acts", "Vibrator Use", "Barebacking", "Multiple Orgasms", "Anal Gaping & Expansion Artistry"],
        persona:
          "Marcus, 35, fascinated by extreme female orgasms. He pays top dollar for long, unedited squirt sessions where the fluid spray is undeniable and continuous.",
        inventory: ["Waterproof mattress cover", "G-spot vibrator", "Dark satin sheets", "High-lumen key light", "4K camera setup", "Towels"]
      },
      psych: {
        dominance: 45, submission: 20, novelty: 50, sensation: 95, intimacy: 60,
        exhibition: 85, taboo: 40, structure: 30, nurture: 40, material: 30
      }
    },
    {
      keyword: "Trampling & Heel Crushing",
      category: "Sensation & Stimulation",
      searchVolume: "high",
      competitionLevel: "low",
      earningPotential: "very-high",
      tags: ["trampling", "heel crushing", "stiletto walk", "body crushing", "weight distribution"],
      profile: {
        description:
          "The physical sensation and psychological thrill of being walked on, stood upon, or crushed under high heels, boots, or bare feet. You film stiletto heel presses on chest/back POV, food/fruit crushing, full-body trampling sessions, and step-over domination. The visual grammar focuses on needle heels sinking into flesh or objects, calf muscle flex, and cold, authoritative posture.",
        demographics:
          "Men 22–50, US/UK/DE/FR, trampling and physical sensation kink communities. Psychographics: sensory pain/pressure seekers, physical submissives, heel fetishists.",
        income:
          "$8k–$30k/mo via crushing clip packs ($20–$60), custom trampling requests ($120–$400), and crushed-object merch auctions.",
        engagement:
          "High-ticket custom volume; strong repeat orders from dedicated crush buyers.",
        related: ["Worship & Heel Licking / Sole Licking", "Socks & Sneakers Worship", "Giantess & Foot Crush POV", "Spitting & Saliva Domination", "Latex Doll / Shiny Aesthetic"],
        persona:
          "Brandon, 31, who craves the physical weight of a commanding woman standing on his chest in sharp heels, finding intense peace under her total pressure.",
        inventory: ["Stiletto heels", "Platform leather boots", "Soft trampling mat", "Crush props (fruit, toys)", "Tripod", "Floor camera rig"]
      },
      psych: {
        dominance: 94, submission: 10, novelty: 50, sensation: 85, intimacy: 15,
        exhibition: 55, taboo: 70, structure: 60, nurture: 5, material: 75
      }
    },
    {
      keyword: "Deep Throat & Gagging Audio / POV",
      category: "Sex Acts",
      searchVolume: "very-high",
      competitionLevel: "high",
      earningPotential: "very-high",
      tags: ["deep throat", "gagging audio", "throat stretching", "mascara tears", "oral pov"],
      profile: {
        description:
          "Extreme oral immersion focusing on deep throat insertion, involuntary gag reflexes, wet throat sounds, mascara tears, and face-holding intensity. You shoot tight mouth-to-throat POV angles, gagging ASMR audio, throat-stretching demonstrations, and eye-contact deep oral. Buyers consume raw gagging audio loops, throat-depth challenges, and extreme oral PPVs.",
        demographics:
          "Men 18–45, global, high demand across all platforms. Psychographics: oral intensity fetishists, throat surrender fans, raw audio listeners.",
        income:
          "$10k–$35k/mo via subscriptions ($15–$35), oral clip series ($15–$50), and high-demand custom oral videos ($150–$450).",
        engagement:
          "Very high click-through rate on PPVs; strong subscription driver.",
        related: ["Sex Acts", "Face Fucking", "Blowjob / BJ", "Facials", "Cunnilingus"],
        persona:
          "Tyler, 26, obsessed with raw oral throat depth and teary eye contact, paying for unedited long-form throat videos.",
        inventory: ["HD camera ring light", "Waterproof mascara", "Oral throat lube", "Microphone", "Throat toy props"]
      },
      psych: {
        dominance: 30, submission: 80, novelty: 40, sensation: 90, intimacy: 30,
        exhibition: 75, taboo: 50, structure: 25, nurture: 10, material: 20
      }
    },
    {
      keyword: "Giantess & Foot Crush POV",
      category: "Roleplay & Fantasy",
      searchVolume: "medium",
      competitionLevel: "micro",
      earningPotential: "high",
      tags: ["giantess", "macro pov", "tinies", "scale perspective", "foot crush"],
      profile: {
        description:
          "Macro perspective roleplay where camera angles and props frame you as a 50-foot giantess towering over a tiny submissive viewer. You film camera-stepping POV, hand-scoop holds, micro-city props, and 'you are my bug' dialogue. Buyers consume giantess audio roleplays, foot-step POV loops, and custom scale-play stories.",
        demographics:
          "Men 18–40, global, giantess and size-difference fantasy subcultures. Psychographics: scale fetishists, fantasy submissives, visual perspective lovers.",
        income:
          "$6k–$22k/mo via specialized clip sales ($15–$45) and high-ticket custom scale roleplays ($100–$350).",
        engagement:
          "Ultra-loyal micro audience with low creator competition and high pricing leverage.",
        related: ["Tiny / Size-Comparison POV", "Trampling & Heel Crushing", "Worship & Heel Licking / Sole Licking", "Socks & Sneakers Worship", "Roleplay & Fantasy"],
        persona:
          "Alex, 25, who loves feeling micro-small compared to a towering goddess stepping over the lens.",
        inventory: ["Miniature city props", "Wide-angle lens", "Low camera floor mount", "Heels / boots", "Ring light"]
      },
      psych: {
        dominance: 88, submission: 15, novelty: 70, sensation: 60, intimacy: 15,
        exhibition: 50, taboo: 55, structure: 40, nurture: 10, material: 50
      }
    },
    {
      keyword: "Latex Enema & Fluid Flush Control",
      category: "Fluid & Bodily",
      searchVolume: "medium",
      competitionLevel: "micro",
      earningPotential: "very-high",
      tags: ["enema fetish", "fluid flush", "latex medical", "holding control", "medical domme"],
      profile: {
        description:
          "Clinical latex medical roleplay centered around enema administration, fluid holding challenges, rubber catheter gear, and sphincter control. You film latex-gloved equipment setups, fluid volume measurements, hold-on-command timers, and clean release demonstrations. The fantasy combines strict medical protocol with extreme fluid taboo.",
        demographics:
          "Men 25–60, US/UK/DE, medical kink and rubber/enema subcultures. Psychographics: medical submissives, extreme fluid enthusiasts, compliance-driven buyers.",
        income:
          "$9k–$32k/mo via specialized medical clip sets ($25–$80), long-form custom flush videos ($200–$600), and medical tier subscriptions.",
        engagement:
          "Highest average order value per custom; micro competition allows top-tier pricing.",
        related: ["Fluid & Bodily", "Latex Doll / Shiny Aesthetic", "Sensory Deprivation / Mummification ASMR", "Medical Nurse Inspection & Speculum Roleplay", "BDSM & Power Exchange"],
        persona:
          "Frank, 45, who surrenders total internal control to a latex nurse administering strict fluid holding routines.",
        inventory: ["Enema bag kit", "Latex medical gloves", "Rubber apron", "IV stand prop", "Timer", "Disinfectant tray"]
      },
      psych: {
        dominance: 75, submission: 65, novelty: 80, sensation: 85, intimacy: 10,
        exhibition: 35, taboo: 95, structure: 85, nurture: 10, material: 40
      }
    },
    {
      keyword: "Humiliation & Small Dick Humiliation (SPH)",
      category: "BDSM & Power Exchange",
      searchVolume: "very-high",
      competitionLevel: "medium",
      earningPotential: "very-high",
      tags: ["sph", "small dick humiliation", "size mockery", "ruler inspection", "penis evaluation"],
      profile: {
        description:
          "Direct, unrelenting verbal and visual mockery focused on small penis size, inadequate stamina, or male vulnerability. You perform tape-measure inspections, laughing POV clips, comparison commentary, and 'too small for a real woman' evaluations. Buyers submit dick rating requests, buy SPH audio loops, and pay for written/video breakdown evaluations.",
        demographics:
          "Men 20–55, global, massive SPH and degradation audience. Psychographics: humiliation seekers, vulnerability-eroticizers, submissive buyers.",
        income:
          "$11k–$40k/mo via Dick Ratings ($20–$75 each), SPH video clip series ($15–$45), and custom humiliation videos ($100–$350).",
        engagement:
          "Enormous volume of short custom dick rating submissions; high daily cash flow.",
        related: ["BDSM & Power Exchange", "Female Supremacy & Chastity Keyholder", "Cuckold Humiliation Audio", "CFNM Tease & Denial", "Spitting & Saliva Domination"],
        persona:
          "Kevin, 34, who experiences intense erotic release when an attractive woman inspects and laughs at his small size with a ruler.",
        inventory: ["Calipers / tape measure", "Magnifying glass prop", "High heels", "Lighting ring", "Microphone"]
      },
      psych: {
        dominance: 95, submission: 15, novelty: 35, sensation: 45, intimacy: 10,
        exhibition: 45, taboo: 80, structure: 60, nurture: 5, material: 70
      }
    },
    {
      keyword: "Anal Gaping & Expansion Artistry",
      category: "Sex Acts",
      searchVolume: "high",
      competitionLevel: "medium",
      earningPotential: "very-high",
      tags: ["anal gaping", "anal expansion", "gator plug", "extreme anal", "rosebud"],
      profile: {
        description:
          "Advanced anal flexibility and sphincter control showcasing deep toy insertion, gradual plug sizing, gaping sphincter reveals, and glass wand play. You film macro anal close-ups, slow withdrawal gaping, and multi-plug expansion progress. Buyers consume gaping tutorials, insertion clips, and custom plug reveals.",
        demographics:
          "Men 22–50, global, anal enthusiast and extreme fetish communities. Psychographics: anal visual connoisseurs, body capability admirers.",
        income:
          "$10k–$36k/mo via premium anal subscriptions ($20–$40), high-ticket gaping PPV packs ($30–$90), and custom toy videos ($150–$500).",
        engagement:
          "Very high subscriber retention when anal content is consistent and extreme.",
        related: ["Sex Acts", "Anal Sex", "Toy Insertion (Plug)", "Fisting", "Squirting / Female Ejaculation Masterclass"],
        persona:
          "Jason, 29, fascinated by extreme anal elasticity and gaping reveals captured in crisp 4K detail.",
        inventory: ["Graduated anal plug set", "Glass anal wand", "High-viscosity anal lube", "4K macro camera", "Ring light"]
      },
      psych: {
        dominance: 25, submission: 75, novelty: 60, sensation: 95, intimacy: 20,
        exhibition: 80, taboo: 85, structure: 35, nurture: 10, material: 30
      }
    },
    {
      keyword: "Medical Nurse Inspection & Speculum Roleplay",
      category: "Occupation Fantasy",
      searchVolume: "high",
      competitionLevel: "low",
      earningPotential: "very-high",
      tags: ["nurse inspection", "speculum roleplay", "medical fet", "chastity exam", "clinical domme"],
      profile: {
        description:
          "Cold, clinical medical examination roleplay with snap-of-latex gloves, stainless steel speculums, prostate probes, medical charts, and unemotional physical audits. You perform intake exams, chastity compliance audits, and strict clinical instruction. The fantasy is clinical vulnerability and sterile authority.",
        demographics:
          "Men 25–55, US/UK/EU, medical fetish and clinical roleplay communities. Psychographics: clinical submissives, privacy lovers, procedure-driven buyers.",
        income:
          "$8k–$28k/mo via medical roleplay clip series ($15–$50) and custom clinical evaluation videos ($120–$400).",
        engagement:
          "Strong LTV with loyal clinical roleplay buyers.",
        related: ["Occupation Fantasy", "Latex Enema & Fluid Flush Control", "Strict CEO / Boss-Girl Findom", "Female Supremacy & Chastity Keyholder", "BDSM & Power Exchange"],
        persona:
          "Arthur, 48, who loves being ordered onto an exam table for a cold, strict medical chastity checkup.",
        inventory: ["Medical scrubs / nurse uniform", "Speculum", "Latex gloves", "Stethoscope", "Clipboard & chart", "Exam light"]
      },
      psych: {
        dominance: 85, submission: 15, novelty: 50, sensation: 65, intimacy: 25,
        exhibition: 35, taboo: 60, structure: 95, nurture: 30, material: 45
      }
    },
    {
      keyword: "Double Penetration & DP Toy Choreography",
      category: "Sex Acts",
      searchVolume: "high",
      competitionLevel: "medium",
      earningPotential: "very-high",
      tags: ["dp", "double penetration", "toy dp", "fucking machine dp", "dual climax"],
      profile: {
        description:
          "Simultaneous vaginal and anal penetration executed using dual dildos, fucking machines, or male co-performers. You capture dual-angle insertion, rhythm synchronization, double stretching, and intense dual orgasms. Buyers consume DP series packs, machine-rigged DP clips, and custom double insertion shoots.",
        demographics:
          "Men 18–50, global, high demand across all major adult distribution networks. Psychographics: extreme penetration lovers, double stretch voyeurs.",
        income:
          "$12k–$42k/mo via subscriptions ($20–$35), premium DP clip bundles ($30–$100), and custom DP requests ($200–$600).",
        engagement:
          "Top-tier PPV conversion rate; high subscriber retention.",
        related: ["Sex Acts", "Double Penetration (DP)", "Anal Gaping & Expansion Artistry", "Squirting / Female Ejaculation Masterclass", "Threesome / MMF"],
        persona:
          "Ryan, 30, who loves watching intense, rhythmic double penetration with simultaneous vaginal and anal stretch.",
        inventory: ["Dual harness / mounting rig", "Fucking machine", "Suction dildos", "High-grade lube", "Multi-angle lighting"]
      },
      psych: {
        dominance: 35, submission: 70, novelty: 55, sensation: 98, intimacy: 40,
        exhibition: 85, taboo: 50, structure: 30, nurture: 15, material: 25
      }
    },
    {
      keyword: "Bred & Creampie Fantasy",
      category: "Sex Acts",
      searchVolume: "very-high",
      competitionLevel: "high",
      earningPotential: "very-high",
      tags: ["creampie", "breeding kink", "internal cum", "ovulation roleplay", "post-coital drip"],
      profile: {
        description:
          "Breeding roleplay and raw internal ejaculations capturing full creampie loads leaking post-coitus, ovulation talk, pregnancy fantasy, and internal cum holding. You film slow-drip close-ups, finger-scoop cum play, and breeding dialogue. Buyers consume creampie series, breeding roleplay audio, and aftermath close-ups.",
        demographics:
          "Men 20–50, global, massive breeding and creampie interest group. Psychographics: instinctual breeding fetishists, intimacy-taboo seekers.",
        income:
          "$11k–$38k/mo via subscription ($15–$30), creampie aftermath PPVs ($20–$75), and custom breeding roleplay videos ($120–$400).",
        engagement:
          "Extremely high repeat viewership and loyal fan retention.",
        related: ["Sex Acts", "Creampie", "Cum Play / Cum Swap", "Barebacking", "Vaginal Sex / PIV"],
        persona:
          "Sean, 32, aroused by the taboo intimacy of filling a woman internally and watching the aftermath drip.",
        inventory: ["Macro lens", "Synthetic or real cum liquid", "Dark bedding", "Ring light", "HD camera"]
      },
      psych: {
        dominance: 20, submission: 60, novelty: 35, sensation: 85, intimacy: 80,
        exhibition: 70, taboo: 45, structure: 20, nurture: 65, material: 20
      }
    },
    {
      keyword: "Forced Bi / Pegging Instruction",
      category: "BDSM & Power Exchange",
      searchVolume: "high",
      competitionLevel: "low",
      earningPotential: "very-high",
      tags: ["forced bi", "pegging instruction", "strap on domme", "prostate massage", "feminization task"],
      profile: {
        description:
          "Strap-on pegging, prostate massage coaching, and forced-bisexual tasking delivered by a dominant woman taking control of male sexuality. You perform strap-on harness reveals, step-by-step pegging tutorials, sissy/bi assignment tasking, and prostate milking instruction. Buyers consume pegging POV clips, forced-bi audio tasks, and custom strap-on instruction videos.",
        demographics:
          "Men 22–55, US/UK/EU/AU, pegging and forced-bi subcultures. Psychographics: role-reversal submissives, prostate pleasure seekers, taboos-surrender buyers.",
        income:
          "$10k–$35k/mo via pegging clip series ($20–$60), bi tasking retainers ($100–$400/mo), and custom strap-on videos ($150–$500).",
        engagement:
          "Very high LTV and long-term retention through weekly assignment DM tasks.",
        related: ["BDSM & Power Exchange", "Pegging", "Female Supremacy & Chastity Keyholder", "Cock Milking / Prostate Milking", "CFNM Tease & Denial"],
        persona:
          "Gary, 40, married man who craves being taken from behind by a dominant woman wearing a realistic strap-on.",
        inventory: ["Leather strap-on harness", "Realistic dildo set", "Prostate massager", "Lube dispenser", "Lighting rig"]
      },
      psych: {
        dominance: 92, submission: 25, novelty: 65, sensation: 75, intimacy: 30,
        exhibition: 40, taboo: 85, structure: 70, nurture: 15, material: 50
      }
    },
    {
      keyword: "Sensory Wax Play & Temperature Bondage",
      category: "Sensation & Stimulation",
      searchVolume: "medium",
      competitionLevel: "low",
      earningPotential: "high",
      tags: ["wax play", "temperature bondage", "ice and fire", "candle wax", "sensation play"],
      profile: {
        description:
          "Low-temperature candle wax dripping, ice cube sensation trails, blindfold impact, and skin reaction ASMR captured in macro detail. You film hot wax pooling on skin, ice melting down torso curves, skin flushes, and gentle sensory bondage. Buyers consume wax ASMR audio, sensory drip clips, and custom temperature play videos.",
        demographics:
          "Men & Women 20–45, US/UK/EU, BDSM sensory and aesthetic fetish communities. Psychographics: sensory pain/pleasure blenders, aesthetic bondage lovers.",
        income:
          "$6k–$22k/mo via sensory clip packs ($12–$35) and custom wax/ice sensation videos ($100–$300).",
        engagement:
          "High aesthetic appeal and cross-platform sharing potential.",
        related: ["Sensation & Stimulation", "Sensory Deprivation / Mummification ASMR", "Silent ASMR / No-Talk Sensory", "Latex Doll / Shiny Aesthetic", "Nipple Play"],
        persona:
          "Clara, 27, who loves the visual contrast of vibrant hot wax dripping across skin under soft lighting.",
        inventory: ["Low-temp BDSM candles", "Ice bucket & tongs", "Silk blindfold", "Macro lens camera", "Soft ambient lights"]
      },
      psych: {
        dominance: 70, submission: 50, novelty: 55, sensation: 92, intimacy: 45,
        exhibition: 35, taboo: 40, structure: 60, nurture: 25, material: 30
      }
    },
    {
      keyword: "Worship & Heel Licking / Sole Licking",
      category: "Fetish & Kink",
      searchVolume: "high",
      competitionLevel: "low",
      earningPotential: "very-high",
      tags: ["sole licking", "heel worship", "shoe cleaning", "foot tongue POV", "boot licking"],
      profile: {
        description:
          "Extreme foot and footwear submission focusing on tongue-to-sole contact, stiletto heel licking, shoe-cleaning duty, and arch worship commands. You capture close-up tongue licking of soles, boot-shine mouth work, and 'clean my shoes with your tongue' commands. Buyers consume sole-licking POV loops, footwear cleaning challenges, and custom shoe worship videos.",
        demographics:
          "Men 20–50, global, foot and footwear submissive communities. Psychographics: intense foot submissives, boot-worship fans, service degradation buyers.",
        income:
          "$9k–$32k/mo via footwear clip sets ($15–$50) and high-demand custom sole-licking videos ($120–$400).",
        engagement:
          "Very loyal foot-worship audience with high reorder velocity for custom foot content.",
        related: ["Fetish & Kink", "Foot Fetish", "Socks & Sneakers Worship", "Spitting & Saliva Domination", "Trampling & Heel Crushing"],
        persona:
          "Nate, 33, who feels supreme pleasure kneeling down to lick the dusty soles of a dominant woman's heels clean.",
        inventory: ["Designer heels / leather boots", "Foot lotion / oils", "Macro camera rig", "Ring light", "Microphone"]
      },
      psych: {
        dominance: 90, submission: 10, novelty: 40, sensation: 65, intimacy: 35,
        exhibition: 45, taboo: 60, structure: 50, nurture: 15, material: 65
      }
    }
  ];
