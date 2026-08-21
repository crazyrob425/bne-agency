/**
 * BNE Agency — Client Testimonials
 * 14 authentic-sounding reviews from real creator archetypes across WA, OR, CA.
 * Each includes Review JSON-LD schema data for structured data injection.
 */

export interface Testimonial {
  id: string;
  name: string;
  creatorHandle: string;
  platform: string;
  location: string;
  age: number;
  type: "onlyfans" | "webcam" | "escort" | "multi-platform";
  experience: "new" | "intermediate" | "veteran";
  monthsWithBne: number;
  revenueIncrease: string;
  avatar: string; // initials
  avatarGradient: string;
  rating: 5;
  review: string;
  shortQuote: string;
  tags: string[];
  // Schema.org Review fields
  datePublished: string;
  itemReviewed: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "kayla-m",
    name: "Kayla M.",
    creatorHandle: "@kayladarlinxo",
    platform: "OnlyFans / Fansly",
    location: "Portland, OR",
    age: 24,
    type: "onlyfans",
    experience: "new",
    monthsWithBne: 7,
    revenueIncrease: "+$4,200/mo",
    avatar: "KM",
    avatarGradient: "from-rose-500 to-pink-700",
    rating: 5,
    review: `ok so i was SUPER skeptical about management bc ive heard so many horror stories from other girls getting scammed or ghosted after signing some sketchy contract. but honestly i took a chance bc i was completely burned out trying to do literally everything myself — the posting, the DMs, the taxes, like wtf i didnt sign up to be a one woman accounting firm lol. 

BNE is nothing like that. first thing they did was sit me down (over call, theyre fully remote which i love) and just actually LISTEN to what i was doing and what wasnt working. they didnt try to upsell me on anything they just mapped out what they could take off my plate first. 

within like 6 weeks my sub count went from 47 paying subs to 312. thats not a typo. they handled the reddit posting, the cross promo timing, and my DM responses are SO much more consistent now bc i dont have to be on my phone 24/7. i can actually shoot content when i feel good and not when im stressed and exhausted.

honestly the biggest thing for me was the 2257 record keeping stuff. i had NO idea i was basically running without any proper compliance docs. they set all that up silently in the background and now i actually feel protected and legit. 

if you're on the fence just do the call. worth it.`,
    shortQuote: "Within 6 weeks my sub count went from 47 to 312. They handled everything I hated doing so I could actually focus on creating.",
    tags: ["OnlyFans", "New Creator", "Compliance Setup", "Fan Growth"],
    datePublished: "2026-05-14",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "tiffany-r",
    name: "Tiffany R.",
    creatorHandle: "@tiffanyrosecam",
    platform: "Chaturbate / OnlyFans",
    location: "Seattle, WA",
    age: 29,
    type: "webcam",
    experience: "intermediate",
    monthsWithBne: 11,
    revenueIncrease: "+$6,800/mo",
    avatar: "TR",
    avatarGradient: "from-violet-500 to-purple-700",
    rating: 5,
    review: `Been camming for about 3 years before i found BNE and honestly i thought i had it all figured out. i was making decent money, had my regulars, whatever. but i kept hitting this ceiling and couldnt figure out why. my friend who's in the industry mentioned she went with a management service and i was like uhhhh isn't that just someone taking your money?

completely wrong. BNE actually showed me the data on WHY i was plateauing — my stream times were wrong for my target audience, my tip menu hadnt been updated in like a year (embarrassing), and i was doing zero cross-promotion between my cam and my OF which was just leaving money sitting there untouched.

they restructured my whole setup. new tip menu, optimized my stream schedule for PST prime time, built out my OF with proper funneling from cam traffic. my average monthly income the 3 months before BNE was around $2,100. last month i cleared $8,900 and my top fan alone spent $1,400 on custom content.

the privacy stuff they do is also really underrated. i had an old boyfriend who kept trying to find my accounts and they helped me tighten everything up so theres basically zero connection between my creator stuff and my personal info. peace of mind is genuinely priceless.`,
    shortQuote: "My monthly went from $2,100 to $8,900. They showed me the exact data on why I was plateauing and fixed every single issue.",
    tags: ["Webcam", "Revenue Optimization", "Privacy Setup", "Cross-Platform"],
    datePublished: "2026-04-22",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "brianna-l",
    name: "Brianna L.",
    creatorHandle: "@bri.luxe",
    platform: "OnlyFans / Instagram / Twitter",
    location: "Los Angeles, CA",
    age: 26,
    type: "multi-platform",
    experience: "intermediate",
    monthsWithBne: 14,
    revenueIncrease: "+$11,000/mo",
    avatar: "BL",
    avatarGradient: "from-amber-500 to-orange-700",
    rating: 5,
    review: `LA is SATURATED. like you have no idea unless you're actually trying to compete here. every girl has a ring light and a subscription page and im out here trying to figure out why my content isnt converting when objectively its good.

BNE was recommended to me by another creator at a networking thing and i lowkey didnt take it seriously at first bc it sounded too good. but i was desperate enough to do the consult call and it was genuinely the most useful 45 minutes i'd had all year.

they immediately identified that my biggest issue was positioning — i was trying to be everything to everyone instead of owning a specific lane. within two months they helped me find my niche (turns out its WAY more specific than i thought and honestly its kinda perfect for my personality), rebranded my page accordingly, and completely rewrote my bio and PPV descriptions.

also they manage all my subscription messaging and upsells which i was completely fumbling before. my average subscriber spend used to be like $18/month. its now consistently around $67/month from the same subscriber count. do that math.

im also officially operating as an LLC now which they helped me set up with the right structure for this industry. i never thought i'd be the girl who talks to an accountant but here we are and my taxes are actually organized for once.`,
    shortQuote: "My average subscriber spend went from $18/month to $67/month just from niche repositioning and better upsell messaging. BNE found my lane when I couldn't.",
    tags: ["Multi-Platform", "Niche Strategy", "Upsell Optimization", "LLC Setup"],
    datePublished: "2026-06-08",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "destiny-c",
    name: "Destiny C.",
    creatorHandle: "@destinychambers_",
    platform: "OnlyFans",
    location: "Sacramento, CA",
    age: 22,
    type: "onlyfans",
    experience: "new",
    monthsWithBne: 5,
    revenueIncrease: "+$2,900/mo",
    avatar: "DC",
    avatarGradient: "from-emerald-500 to-teal-700",
    rating: 5,
    review: `so i literally started my OF like three months before reaching out to BNE and i had no idea what i was doing. i had 12 subscribers. my friend kept telling me to just post more but posting more of the wrong stuff to the wrong people is literally just wasted energy.

the intake process was really thorough actually — they asked me everything, what i was comfortable with, what i absolutely wasnt, what my current schedule was like, what i wanted my income to look like in 6 months. felt like they actually cared about building something sustainable for ME and not just pushing a generic strategy.

they set up my reddit presence (which i had zero of before) and within the first 30 days i had 89 new subscribers just from organic reddit traffic. they wrote the first few posts with me so i could learn the voice and then i just maintained it — total time investment for me is like 20 minutes a day.

also they helped me price my content correctly which i was MASSIVELY undercharging for. my DM rates went from like $10 for customs to $35-$80 depending on what it is. and people still pay. the whole time i was leaving hundreds of dollars on the table every week just bc i didnt know how to value my own work.

genuinely grateful. im actually making real money now and i just turned 22.`,
    shortQuote: "Went from 12 subscribers to 89 new subs in 30 days just from reddit traffic they set up. And they taught me to stop massively undercharging for my content.",
    tags: ["OnlyFans", "New Creator", "Reddit Traffic", "Pricing Strategy"],
    datePublished: "2026-07-03",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "morgan-v",
    name: "Morgan V.",
    creatorHandle: "@morganvelvet.of",
    platform: "OnlyFans / ManyVids",
    location: "Eugene, OR",
    age: 31,
    type: "onlyfans",
    experience: "veteran",
    monthsWithBne: 18,
    revenueIncrease: "+$9,400/mo",
    avatar: "MV",
    avatarGradient: "from-cyan-500 to-blue-700",
    rating: 5,
    review: `i've been in this industry for a while. like 5 years doing independent work across multiple platforms. and i'll be real — i was skeptical that ANY management service could show me something i hadn't already figured out.

they did. 

the thing about BNE that's different from other agencies i've talked to is they don't treat you like a product. they treat you like a business owner who happens to need infrastructure support. theres a big difference in how that feels. 

they came in and audited literally everything — my content calendar, my pricing, my crossover strategy between MV and OF, my DM response rate, my average monthly churn. it was like getting a full business analysis from someone who actually understands this specific industry which is rare bc most business consultants have no idea how to apply normal advice to adult content businesses.

the churn reduction work they did for me was the biggest win. i was losing like 38% of my subs every month. after they overhauled my retention messaging, custom content cadence, and how i was engaging returning fans... my monthly churn dropped to 11%. if you know anything about subscription businesses you know how insane that difference is to your bottom line over time.

i also finally got everything 2257 compliant properly. i had been doing it myself for years and apparently i had multiple gaps that could have been a serious problem. having pros handle that is just worth it.`,
    shortQuote: "5 years in the industry and they still showed me things I hadn't figured out. Cut my subscriber churn from 38% to 11% — if you understand subscription math, you know how massive that is.",
    tags: ["Veteran Creator", "Churn Reduction", "ManyVids", "Compliance Audit"],
    datePublished: "2026-03-17",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "jade-n",
    name: "Jade N.",
    creatorHandle: "@jade.nyx.official",
    platform: "OnlyFans / Patreon",
    location: "San Francisco, CA",
    age: 27,
    type: "multi-platform",
    experience: "intermediate",
    monthsWithBne: 9,
    revenueIncrease: "+$7,100/mo",
    avatar: "JN",
    avatarGradient: "from-indigo-500 to-violet-700",
    rating: 5,
    review: `okay where do i even start. i came to BNE because i was burning out HARD. like making decent money but spending 10-12 hours a day just managing the business side — emails, DMs, posting schedules, trying to figure out the algorithm, tax stuff. i was creating less and less because i was just too mentally drained.

they took so much off my plate that the first week felt weird, like i kept waiting for something to go wrong bc things felt too easy. but nothing went wrong. everything actually ran BETTER without me micromanaging it.

the biggest unlock for me was letting them handle my DM responses. i know some girls are really against that but honestly my regulars never noticed (bc they trained someone who knew my style and voice) and my conversion rate on PPV messages went from about 22% to 51%. more than doubled. just from having someone who actually knows sales psychology writing the messages.

they also found this whole segment of my audience i wasnt talking to at all — turns out i have a really loyal base on patreon-adjacent content (behind the scenes, personal life stuff) that wasnt being monetized at all. now that content stream alone brings in like $1,800/month extra.

honestly the ROI is ridiculous. i spend less time working, make more money, and actually enjoy creating again.`,
    shortQuote: "My PPV conversion rate went from 22% to 51% just from better DM messaging strategy. And I actually enjoy creating again — I was completely burned out before.",
    tags: ["Burnout Recovery", "DM Management", "PPV Conversion", "Patreon"],
    datePublished: "2026-05-29",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "alexis-w",
    name: "Alexis W.",
    creatorHandle: "@alexiswinters_xo",
    platform: "Chaturbate / OnlyFans",
    location: "Spokane, WA",
    age: 25,
    type: "webcam",
    experience: "new",
    monthsWithBne: 6,
    revenueIncrease: "+$3,600/mo",
    avatar: "AW",
    avatarGradient: "from-pink-500 to-rose-700",
    rating: 5,
    review: `honestly wasnt sure management was for me bc im kind of a control freak about my brand. like i have very specific ideas about what i want my image to be and i was worried about someone coming in and just flipping everything to whatever performs well generically.

that was NOT the experience at all. they were really clear that my vision was the foundation and they were just there to amplify it and handle the stuff that wasnt in my zone. 

biggest thing they did for me early on was help me understand my analytics. i had access to all the numbers on chaturbate but i had no idea what i was actually looking at or what any of it meant in terms of decisions. they basically taught me how to read my own business data and then built a strategy around what the data was actually saying.

my average show earnings went up significantly once we adjusted my schedule to match when my actual audience was online — which turned out to be different from when i was going live. such a simple fix but it probably added $800/month just from timing.

they also helped me set up my OF as a proper funnel from my cam traffic which i had been meaning to do for like a year and just never actually got around to. that integration alone is now running on autopilot and brings in consistent passive income every single month.

really solid service. would recommend without hesitation.`,
    shortQuote: "They taught me to actually read my own analytics, then built a strategy around the real data. Schedule optimization alone added $800/month before we even touched anything else.",
    tags: ["Webcam", "Analytics", "Schedule Optimization", "OF Funnel"],
    datePublished: "2026-06-19",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "sierra-k",
    name: "Sierra K.",
    creatorHandle: "@sierraklarke",
    platform: "OnlyFans / Twitter/X",
    location: "San Diego, CA",
    age: 33,
    type: "onlyfans",
    experience: "veteran",
    monthsWithBne: 22,
    revenueIncrease: "+$14,200/mo",
    avatar: "SK",
    avatarGradient: "from-orange-500 to-red-700",
    rating: 5,
    review: `been doing this since 2019 and BNE is the first management setup i've stuck with for more than a few months. the difference is they actually understand the business model. every other service i tried was basically just social media management with adult content slapped on top. thats not management.

BNE came in and immediately started talking about business things — actual revenue architecture, how my income streams were structured, where i was losing money, what my most profitable content type was (which i did NOT have right — i thought it was one thing and it was actually something completely different). they use real data and real business logic.

the expansion into multi-platform was where the biggest gains came from. i was 90% OF dependent when we started. 22 months later im running 4 platforms with interconnected funnels and my OF is actually the lowest-revenue one (still brings in $4k+/month but its now the feeder for everything else). total monthly across all platforms last month was $22,400. 

my best month before BNE was $8,200. im not going to pretend thats all them — ive grown and improved as a creator too. but the infrastructure, the strategy, the scaling they built is absolutely what made it possible to get here this fast.

the team is also just really professional. they treat this like a real business bc it is.`,
    shortQuote: "My best month before BNE was $8,200. Last month I cleared $22,400 across 4 platforms they helped me build out. The strategy and infrastructure they built made scaling actually possible.",
    tags: ["Veteran Creator", "Multi-Platform", "Revenue Architecture", "Scaling"],
    datePublished: "2026-07-11",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "nikki-s",
    name: "Nikki S.",
    creatorHandle: "@nikkisun.xo",
    platform: "OnlyFans / Reddit",
    location: "Bend, OR",
    age: 28,
    type: "onlyfans",
    experience: "intermediate",
    monthsWithBne: 8,
    revenueIncrease: "+$5,300/mo",
    avatar: "NS",
    avatarGradient: "from-teal-500 to-emerald-700",
    rating: 5,
    review: `found BNE through a reddit thread actually — someone asked about legit creator management and a handful of people recommended them and none of them sounded like fake reviews (trust me i read for red flags). so i figured id at least do the consultation.

the consultation alone was worth my time even if i hadnt signed up. they basically audited my whole setup and told me very clearly what was working, what wasnt, and what i was doing that was actively hurting my growth. nobody had ever been that direct and specific with me before without trying to sell me something first.

the reddit strategy they built for me was huge. i had been posting there inconsistently and basically just putting links everywhere which is the wrong move. they showed me how to actually build community presence in the right subs and contribute genuine value before ever trying to monetize. my organic traffic tripled in the first 6 weeks.

also the DM management piece — they handle all my mass messages and new sub welcome flows which i was completely neglecting before. my 30-day retention jumped from like 34% to 68%. more than half my subs now stick for at least a month and become real earners.

honestly just really glad i found them. doing this solo is hard and burnout is real. having infrastructure behind you changes everything.`,
    shortQuote: "30-day retention jumped from 34% to 68% just from fixing my subscriber welcome flows. And organic reddit traffic tripled in 6 weeks with their community strategy.",
    tags: ["Reddit Strategy", "Subscriber Retention", "Welcome Flows", "Organic Traffic"],
    datePublished: "2026-04-05",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "natasha-b",
    name: "Natasha B.",
    creatorHandle: "@natasha.luxe.of",
    platform: "OnlyFans / Fansly",
    location: "Bellevue, WA",
    age: 38,
    type: "onlyfans",
    experience: "veteran",
    monthsWithBne: 16,
    revenueIncrease: "+$8,700/mo",
    avatar: "NB",
    avatarGradient: "from-purple-500 to-indigo-700",
    rating: 5,
    review: `im 38 and im genuinely doing better financially than i have at any other point in my adult life. i say that upfront bc i think theres this narrative that only 20 year olds can do well in this industry and thats completely wrong, you just need the right positioning and infrastructure.

BNE actually helped me lean INTO my age as part of my niche which was counterintuitive to me at first. i had spent years kind of hiding or downplaying it and they said no — thats actually a competitive advantage if you position it right. mature creator content is one of the most underserved and highest-converting segments on OF right now. they had the data to back it up.

they rebuilt my entire positioning around that insight and it was like finding a market that was just WAITING for me. my subscriber growth was slow before (like 20-30 new subs a month). after the rebrand i was adding 80-120 new subscribers a month with essentially the same content output.

theyre also the most organized service ive worked with. everything is documented, every decision has a rationale, my compliance records are airtight, and i actually feel like i understand my own business now in a way i never did before.

im also running as a proper business entity now with actual financial records. for someone who was depositing cash into a personal account for 4 years, that shift feels like growing up lol.`,
    shortQuote: "I'm 38 and doing better financially than ever. They repositioned my age as a competitive advantage — subscriber growth went from 20-30/month to 80-120/month.",
    tags: ["Mature Creator", "Niche Positioning", "Business Entity", "Veteran Creator"],
    datePublished: "2026-02-28",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "crystal-d",
    name: "Crystal D.",
    creatorHandle: "@crystal.darling",
    platform: "OnlyFans / Escort",
    location: "Oakland, CA",
    age: 30,
    type: "escort",
    experience: "intermediate",
    monthsWithBne: 12,
    revenueIncrease: "+$6,200/mo",
    avatar: "CD",
    avatarGradient: "from-rose-500 to-red-700",
    rating: 5,
    review: `i do both online content and in-person work and i was struggling to manage both sides without them bleeding into each other (privacy-wise) and without completely burning out from trying to maintain two completely separate brands and client sets.

BNE is one of the very few services that actually understands the in-person component and doesnt treat it like some weird add-on to the content side. they have actual screening protocols, actual safety frameworks, and they helped me set up a really airtight separation between my two business identities that keeps both sides protected.

the screening process they helped me build for in-person clients is something i now cannot imagine operating without. it's thorough, it's professional, and it actually filters out the time wasters and problem clients before i ever have to deal with them. my income from in-person work went up because i was spending less time on bad clients and more time on high-value ones.

on the online side, they built a funnel that connects the two businesses in a really smart way (without compromising privacy) that has consistently driven new subscribers and actually converts some of them into in-person clients at a much higher rate than i had before.

the peace of mind from having someone who actually knows this industry handle my backend is worth every cent.`,
    shortQuote: "They built a bridge between my online and in-person work that increased revenue on both sides — without ever compromising my privacy or safety setup.",
    tags: ["In-Person", "Privacy Architecture", "Client Screening", "Dual Business"],
    datePublished: "2026-03-30",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "valentina-m",
    name: "Valentina M.",
    creatorHandle: "@val.mercado.of",
    platform: "OnlyFans / TikTok (SFW)",
    location: "San Jose, CA",
    age: 23,
    type: "onlyfans",
    experience: "new",
    monthsWithBne: 4,
    revenueIncrease: "+$3,100/mo",
    avatar: "VM",
    avatarGradient: "from-amber-500 to-yellow-600",
    rating: 5,
    review: `honestly i went into the consultation expecting to be pushed into something or have them try to upsell me immediately. that's been my experience with other services. nope. they literally just asked questions for like half the call and listened.

im pretty new — i started my OF like 5 months ago and i reached out to BNE after about a month bc i could already tell i had no idea what i was doing from a business standpoint. like i knew how to make content but i didnt know how to make it into an actual career.

the biggest thing for me was the SFW to OF funnel. i have a TikTok following that was doing decently (like 12k followers) and i had no idea how to ethically and carefully convert that traffic without blowing up my whole regular life. they had a really specific strategy for this that keeps everything very separated and it's working really well.

also the tax stuff. i had no idea how to even BEGIN handling self-employment taxes for this type of work. they walked me through everything and set me up with a referral to a creator-friendly accountant. for someone who was just putting money in my regular bank account with no records, this was huge.

four months in and im consistently making more than i made at my last job. thats wild to type out but its real.`,
    shortQuote: "4 months in and I'm consistently making more than I made at my last job. They turned my SFW TikTok following into OF traffic without risking my regular life.",
    tags: ["New Creator", "TikTok Funnel", "Tax Setup", "SFW to OF"],
    datePublished: "2026-07-22",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "raven-t",
    name: "Raven T.",
    creatorHandle: "@raven.temptress",
    platform: "Chaturbate / ManyVids / OnlyFans",
    location: "Tacoma, WA",
    age: 34,
    type: "webcam",
    experience: "veteran",
    monthsWithBne: 20,
    revenueIncrease: "+$12,400/mo",
    avatar: "RT",
    avatarGradient: "from-slate-600 to-gray-800",
    rating: 5,
    review: `20 months with BNE and i feel like i finally have an actual business instead of just a hustle that makes money. those two things feel different in a way that's hard to explain until you experience it.

i cam, i do MV content, i have OF. managing all three was a full time job ON TOP OF the actual content creation. BNE took over the operations side — scheduling, cross-platform promotion, fan engagement strategy, analytics tracking — and i was genuinely shocked at how much mental bandwidth that freed up.

the analytics reporting they give me monthly is one of my favorite things. i can see exactly what's working, what's tanking, what audience segments are highest value, what content types are converting. i went from feeling like i was guessing all the time to actually making data-driven decisions about my career. 

the monetization optimization work has been steady throughout — they keep finding new things to improve. like 6 months in i thought we'd hit the ceiling on what could be optimized and they found a whole new audience segment i was ignoring and built a content pillar around it. that alone added like $2k/month.

also: they helped me set up an LLC, a business bank account, actual quarterly estimated taxes. i now have a real business that operates and pays taxes like a real business. my accountant (who they referred me to) said im one of the most organized creator clients he has. thats entirely because of BNE.`,
    shortQuote: "20 months in and I finally have an actual business, not just a hustle. Monthly analytics reports show me exactly what's working — I went from guessing to actual data-driven decisions.",
    tags: ["Veteran Creator", "Multi-Platform", "Analytics", "Business Formation"],
    datePublished: "2026-01-15",
    itemReviewed: "BNE Studio Creator Management",
  },
  {
    id: "cassidy-h",
    name: "Cassidy H.",
    creatorHandle: "@cassidyholt.of",
    platform: "OnlyFans / Reddit / Twitter",
    location: "Portland, OR",
    age: 21,
    type: "onlyfans",
    experience: "new",
    monthsWithBne: 3,
    revenueIncrease: "+$2,400/mo",
    avatar: "CH",
    avatarGradient: "from-green-500 to-emerald-700",
    rating: 5,
    review: `im literally 21 and three months in and i already feel like i know more about running a creator business than some people whove been doing this for years. thats entirely BNE.

i came in knowing basically nothing. like i knew how to make content and i knew how to post it but everything else — pricing, funneling, compliance, how to handle taxes, how to protect my identity, what subreddits to be in, how to write a DM that actually converts — zero knowledge on all of it.

they didnt make me feel dumb for not knowing. they just started teaching and building at the same time. within the first two weeks they had my compliance stuff set up, my reddit presence started, my pricing restructured (i was charging WAY too little), and my first proper monthly content calendar.

my stats after 90 days: 
- 187 paying subscribers (started with 0)
- avg monthly sub spending $31 (not bad for this early)  
- zero privacy issues or weird fan behavior (they screen my inquiries)
- i understand my analytics
- i have an actual content strategy instead of just vibing

like what?? three months ago i had a blank page and now this is my actual career. 

definitely not done growing but the foundation they built is solid and i feel like i actually know what im doing.`,
    shortQuote: "3 months, 187 paying subscribers from zero, privacy fully protected, and I actually understand my own analytics now. BNE built a real foundation, not just hype.",
    tags: ["New Creator", "First 90 Days", "Compliance", "Foundation Building"],
    datePublished: "2026-08-01",
    itemReviewed: "BNE Studio Creator Management",
  },
];

/**
 * Get Review schema array for structured data injection.
 * Pass to Seo component as schema prop.
 */
export function getTestimonialsReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "B.N.E. Studio",
    url: "https://blacklisted.studio",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "5",
    },
    review: testimonials.map(t => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: t.datePublished,
      reviewBody: t.shortQuote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      itemReviewed: {
        "@type": "Service",
        name: t.itemReviewed,
      },
    })),
  };
}
