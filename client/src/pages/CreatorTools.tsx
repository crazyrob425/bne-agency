/**
 * BNE Creator Tools Page
 * Design: Noir Hacker Syndicate — slate-950 base, violet-500 + emerald-400 neon accents
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Camera,
  DollarSign,
  Shield,
  BarChart3,
  MessageSquare,
  Smartphone,
  Globe,
  Zap,
  ExternalLink,
  Star,
  TrendingUp,
  Lock,
  Users,
  Video,
  Mic,
  Image,
  FileText,
  Calendar,
  Hash,
  Mail,
  CreditCard,
  Eye,
  Package,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

interface Tool {
  name: string;
  description: string;
  url: string;
  tags: string[];
  recommended?: boolean;
  free?: boolean;
  bneVerified?: boolean;
}

interface ToolCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  tools: Tool[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "platforms",
    icon: Globe,
    title: "Content Platforms",
    subtitle: "Where to host, sell, and monetize your content",
    color: "violet",
    tools: [
      {
        name: "OnlyFans",
        description: "The dominant subscription platform. Highest creator payout rate (80%). Best for subscription + PPV hybrid model.",
        url: "https://onlyfans.com",
        tags: ["Subscription", "PPV", "DMs", "Live"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "Fansly",
        description: "Best OnlyFans alternative with tiered subscriptions, better discovery, and no payout delays.",
        url: "https://fansly.com",
        tags: ["Subscription", "Tiers", "Discovery"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "LoyalFans",
        description: "Strong for BDSM/kink creators. Allows more explicit content categories than OF. Good for niche audiences.",
        url: "https://loyalfans.com",
        tags: ["BDSM-Friendly", "Kink", "Subscription"],
        bneVerified: true,
      },
      {
        name: "Fanvue",
        description: "AI-powered platform with automated messaging and content scheduling. Great for scaling without burnout.",
        url: "https://fanvue.com",
        tags: ["AI Tools", "Automation", "Subscription"],
        bneVerified: true,
      },
      {
        name: "ManyVids",
        description: "Best for clip sales. Huge built-in audience for custom videos, fetish content, and one-time purchases.",
        url: "https://manyvids.com",
        tags: ["Clip Sales", "Custom", "Fetish"],
        bneVerified: true,
      },
      {
        name: "Clips4Sale",
        description: "The OG fetish clip store. Massive existing fetish audience. Best for niche/extreme content categories.",
        url: "https://clips4sale.com",
        tags: ["Fetish", "Clips", "Niche"],
      },
      {
        name: "NiteFlirt",
        description: "Phone sex and audio content platform. High per-minute rates. Perfect for ASMR, JOI, and audio creators.",
        url: "https://niteflirt.com",
        tags: ["Audio", "Phone", "JOI", "ASMR"],
      },
      {
        name: "AVN Stars",
        description: "Industry-backed platform with strong brand credibility. Good for creators wanting mainstream adult industry exposure.",
        url: "https://stars.avn.com",
        tags: ["Industry", "Subscription", "Clips"],
      },
      {
        name: "Patreon (Adult)",
        description: "For creators who want tiered memberships with broader content mix. Less explicit but better for brand building.",
        url: "https://patreon.com",
        tags: ["Tiers", "Community", "Brand"],
      },
      {
        name: "Throne",
        description: "Wishlist platform for creators. Fans buy gifts directly — no cash exchange. Great for supplemental income.",
        url: "https://throne.com",
        tags: ["Wishlist", "Gifts", "Passive"],
        free: true,
      },
    ],
  },
  {
    id: "production",
    icon: Camera,
    title: "Production & Editing",
    subtitle: "Gear, software, and tools for high-quality content",
    color: "emerald",
    tools: [
      {
        name: "DaVinci Resolve",
        description: "Professional-grade video editing. Free version is more powerful than most paid editors. Industry standard for color grading.",
        url: "https://blackmagicdesign.com/products/davinciresolve",
        tags: ["Video Editing", "Color Grade", "Professional"],
        recommended: true,
        free: true,
      },
      {
        name: "CapCut",
        description: "Best mobile video editor for short-form content. One-click enhancements, trending effects, and easy export.",
        url: "https://capcut.com",
        tags: ["Mobile", "Short-Form", "Easy"],
        free: true,
      },
      {
        name: "Lightroom Mobile",
        description: "Best photo editing app for consistent aesthetic. Preset packs let you batch-edit hundreds of photos in minutes.",
        url: "https://lightroom.adobe.com",
        tags: ["Photo Editing", "Presets", "Consistency"],
      },
      {
        name: "VSCO",
        description: "Film-style photo filters and editing. Great for building a consistent visual brand across your feed.",
        url: "https://vsco.co",
        tags: ["Filters", "Aesthetic", "Mobile"],
        free: true,
      },
      {
        name: "OBS Studio",
        description: "Free, open-source streaming software. Best for live streams, screen recording, and multi-camera setups.",
        url: "https://obsproject.com",
        tags: ["Streaming", "Live", "Recording"],
        recommended: true,
        free: true,
      },
      {
        name: "Canva Pro",
        description: "Design promotional graphics, thumbnails, watermarks, and social media assets without a designer.",
        url: "https://canva.com",
        tags: ["Design", "Graphics", "Marketing"],
        bneVerified: true,
      },
      {
        name: "Remove.bg",
        description: "Instant background removal for photos. Essential for creating clean promotional graphics and thumbnails.",
        url: "https://remove.bg",
        tags: ["Background Remove", "Photo", "Quick"],
        free: true,
      },
      {
        name: "Descript",
        description: "AI-powered audio/video editing. Edit video by editing the transcript. Perfect for podcasts and talking-head content.",
        url: "https://descript.com",
        tags: ["AI Editing", "Audio", "Transcript"],
      },
      {
        name: "Audacity",
        description: "Free, powerful audio editor. Essential for ASMR creators, audio-only content, and cleaning up audio tracks.",
        url: "https://audacityteam.org",
        tags: ["Audio", "ASMR", "Free"],
        free: true,
      },
      {
        name: "ElevenLabs",
        description: "AI voice synthesis. Clone your own voice for automated audio content, or create custom voice personas.",
        url: "https://elevenlabs.io",
        tags: ["AI Voice", "Audio", "Automation"],
        bneVerified: true,
      },
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing & Growth",
    subtitle: "Drive traffic, build audience, and convert fans",
    color: "amber",
    tools: [
      {
        name: "Reddit (r/OnlyFansAdvice, r/CreatorServices)",
        description: "Organic traffic goldmine. Post in relevant NSFW subreddits with your link. Free and highly targeted.",
        url: "https://reddit.com",
        tags: ["Organic", "Free", "Targeted"],
        recommended: true,
        free: true,
      },
      {
        name: "Twitter/X",
        description: "The #1 adult creator traffic source. NSFW content allowed. Build a following and funnel to your paid platforms.",
        url: "https://x.com",
        tags: ["NSFW Allowed", "Traffic", "Community"],
        recommended: true,
        free: true,
      },
      {
        name: "Linktree",
        description: "Single link hub for all your platforms. Essential for Instagram/TikTok bio where direct adult links are banned.",
        url: "https://linktr.ee",
        tags: ["Link Hub", "Bio Link", "Multi-Platform"],
        free: true,
        bneVerified: true,
      },
      {
        name: "Beacons.ai",
        description: "Advanced link-in-bio with built-in store, email capture, and analytics. Better than Linktree for monetization.",
        url: "https://beacons.ai",
        tags: ["Link Hub", "Store", "Analytics"],
        recommended: true,
        free: true,
      },
      {
        name: "Fanfix",
        description: "SFW teaser platform that funnels fans to your paid content. Good for building audience on mainstream platforms.",
        url: "https://fanfix.io",
        tags: ["SFW Funnel", "Tease", "Discovery"],
      },
      {
        name: "Scrile Connect",
        description: "Build your own white-label fan platform. Own your audience data and avoid platform bans.",
        url: "https://scrile.com",
        tags: ["White Label", "Own Platform", "Independence"],
        bneVerified: true,
      },
      {
        name: "Mailchimp",
        description: "Email list building. Your email list is the only audience you truly own — essential for platform independence.",
        url: "https://mailchimp.com",
        tags: ["Email", "List Building", "Owned Audience"],
        free: true,
      },
      {
        name: "Buffer",
        description: "Schedule and manage social media posts across platforms. Batch-create content and auto-post on schedule.",
        url: "https://buffer.com",
        tags: ["Scheduling", "Social Media", "Automation"],
      },
      {
        name: "Later",
        description: "Visual social media scheduler with Instagram-first design. Best for planning your feed aesthetic.",
        url: "https://later.com",
        tags: ["Instagram", "Visual", "Scheduling"],
      },
      {
        name: "Hashtag Expert",
        description: "Research optimal hashtags for your content niche. Maximize organic reach on Instagram and TikTok.",
        url: "https://hashtagexpert.com",
        tags: ["Hashtags", "SEO", "Reach"],
      },
    ],
  },
  {
    id: "finance",
    icon: DollarSign,
    title: "Finance & Payments",
    subtitle: "Get paid, manage money, and minimize taxes",
    color: "green",
    tools: [
      {
        name: "Wise (TransferWise)",
        description: "Best international money transfers. Low fees, real exchange rates. Essential for non-US creators receiving USD payouts.",
        url: "https://wise.com",
        tags: ["International", "Low Fees", "Transfer"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "Payoneer",
        description: "Accepted by most adult platforms for payouts. Good for creators in countries where PayPal doesn't work.",
        url: "https://payoneer.com",
        tags: ["Payouts", "International", "Platforms"],
        bneVerified: true,
      },
      {
        name: "Paxum",
        description: "Adult industry's preferred payment processor. Accepted by virtually every adult platform. Fast payouts.",
        url: "https://paxum.com",
        tags: ["Adult Industry", "Fast Payouts", "Trusted"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "QuickBooks Self-Employed",
        description: "Track income, expenses, and mileage. Automatically estimates quarterly taxes. Essential for self-employed creators.",
        url: "https://quickbooks.intuit.com/self-employed",
        tags: ["Taxes", "Bookkeeping", "Self-Employed"],
        bneVerified: true,
      },
      {
        name: "Wave Accounting",
        description: "Free accounting software for small businesses. Invoice clients, track expenses, and run basic financial reports.",
        url: "https://waveapps.com",
        tags: ["Accounting", "Free", "Invoicing"],
        free: true,
      },
      {
        name: "Stripe (via Scrile/White Label)",
        description: "Process payments on your own platform. Requires adult-friendly setup — use through compliant intermediaries.",
        url: "https://stripe.com",
        tags: ["Payments", "White Label", "Own Platform"],
      },
      {
        name: "Venmo / Cash App",
        description: "For tips and small transactions from fans. Keep separate from personal accounts. Not for large volumes.",
        url: "https://venmo.com",
        tags: ["Tips", "Casual", "Small Transactions"],
        free: true,
      },
      {
        name: "Crypto (Bitcoin/Monero)",
        description: "Privacy-first payment option. Some fans prefer crypto for discretion. Monero for maximum anonymity.",
        url: "https://getmonero.org",
        tags: ["Privacy", "Crypto", "Anonymous"],
        free: true,
      },
    ],
  },
  {
    id: "legal",
    icon: Shield,
    title: "Legal & Compliance",
    subtitle: "Protect yourself, verify age, and stay compliant",
    color: "red",
    tools: [
      {
        name: "Veratad Age Verification",
        description: "2257-compliant age verification service. Required if you operate your own platform or shoot with performers.",
        url: "https://veratad.com",
        tags: ["Age Verification", "2257", "Compliance"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "DMCA.com",
        description: "Protect your content from piracy. Automated DMCA takedown service for leaked content across the web.",
        url: "https://dmca.com",
        tags: ["DMCA", "Anti-Piracy", "Protection"],
        bneVerified: true,
      },
      {
        name: "Rulta",
        description: "Content protection and leak detection specifically for adult creators. Scans tube sites and piracy networks.",
        url: "https://rulta.com",
        tags: ["Leak Detection", "Anti-Piracy", "Adult"],
        bneVerified: true,
      },
      {
        name: "StopNCII",
        description: "Free tool to prevent non-consensual intimate image sharing. Creates a hash of your images to block uploads.",
        url: "https://stopncii.org",
        tags: ["NCII Protection", "Free", "Safety"],
        recommended: true,
        free: true,
        bneVerified: true,
      },
      {
        name: "Rocket Lawyer",
        description: "Affordable legal contracts for collaborations, NDAs, and model releases. Essential for shooting with others.",
        url: "https://rocketlawyer.com",
        tags: ["Contracts", "NDA", "Model Release"],
        bneVerified: true,
      },
      {
        name: "LegalZoom",
        description: "Form an LLC to separate personal and business liability. Every serious creator should have an LLC.",
        url: "https://legalzoom.com",
        tags: ["LLC", "Business Formation", "Liability"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "Incogni",
        description: "Remove your personal data from data broker sites. Protect your real identity from being linked to your creator persona.",
        url: "https://incogni.com",
        tags: ["Privacy", "Data Removal", "Identity"],
        bneVerified: true,
      },
      {
        name: "NordVPN",
        description: "VPN for privacy when accessing platforms and communicating with fans. Protects your IP and location.",
        url: "https://nordvpn.com",
        tags: ["VPN", "Privacy", "Security"],
        bneVerified: true,
      },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Intelligence",
    subtitle: "Data-driven decisions for your creator business",
    color: "blue",
    tools: [
      {
        name: "OnlyFans Analytics (Built-in)",
        description: "Native analytics dashboard. Track subscriber count, revenue, PPV open rates, and fan retention metrics.",
        url: "https://onlyfans.com",
        tags: ["Native", "Revenue", "Subscribers"],
        free: true,
      },
      {
        name: "Fansmetrics",
        description: "Third-party analytics for OnlyFans. Track competitor performance, niche trends, and optimal posting times.",
        url: "https://fansmetrics.com",
        tags: ["Competitor Intel", "Trends", "Timing"],
        bneVerified: true,
      },
      {
        name: "Google Analytics",
        description: "Track traffic to your link-in-bio and personal website. Understand where your fans are coming from.",
        url: "https://analytics.google.com",
        tags: ["Traffic", "Sources", "Free"],
        free: true,
      },
      {
        name: "Bitly",
        description: "Shorten and track links. See exactly how many clicks each promotional post generates.",
        url: "https://bitly.com",
        tags: ["Link Tracking", "Analytics", "Clicks"],
        free: true,
      },
      {
        name: "SocialBlade",
        description: "Track social media growth statistics for yourself and competitors. See follower growth trends over time.",
        url: "https://socialblade.com",
        tags: ["Social Stats", "Growth", "Competitor"],
        free: true,
      },
      {
        name: "Semrush",
        description: "SEO and keyword research. Find what your target audience is searching for and optimize your content accordingly.",
        url: "https://semrush.com",
        tags: ["SEO", "Keywords", "Research"],
      },
    ],
  },
  {
    id: "messaging",
    icon: MessageSquare,
    title: "Fan Engagement & CRM",
    subtitle: "Manage fan relationships and maximize LTV",
    color: "pink",
    tools: [
      {
        name: "SuperCreator",
        description: "AI-powered OnlyFans messaging assistant. Auto-responds to fans, suggests upsells, and manages mass DMs.",
        url: "https://supercreator.ai",
        tags: ["AI Messaging", "Automation", "Upsells"],
        recommended: true,
        bneVerified: true,
      },
      {
        name: "OFsuite",
        description: "OnlyFans CRM and automation tool. Track fan spending, send targeted mass messages, and manage renewals.",
        url: "https://ofsuite.com",
        tags: ["CRM", "Mass DM", "Retention"],
        bneVerified: true,
      },
      {
        name: "Infloww",
        description: "Creator management platform with fan CRM, revenue tracking, and team collaboration tools.",
        url: "https://infloww.com",
        tags: ["CRM", "Team", "Revenue"],
        bneVerified: true,
      },
      {
        name: "Telegram",
        description: "Build a private fan community. Free VIP groups, broadcast channels, and direct messaging without platform fees.",
        url: "https://telegram.org",
        tags: ["Community", "Free", "Private Groups"],
        free: true,
        bneVerified: true,
      },
      {
        name: "Discord",
        description: "Build a tiered fan community with voice, video, and text channels. Great for gaming/cosplay crossover creators.",
        url: "https://discord.com",
        tags: ["Community", "Tiers", "Voice/Video"],
        free: true,
      },
      {
        name: "Subtext",
        description: "Text message fan club. Fans pay to text you directly. High open rates vs email.",
        url: "https://subtext.com",
        tags: ["SMS", "Direct", "High Open Rate"],
      },
    ],
  },
  {
    id: "ai",
    icon: Zap,
    title: "AI & Automation",
    subtitle: "Scale your output without burning out",
    color: "cyan",
    tools: [
      {
        name: "ChatGPT / Claude",
        description: "Write captions, DM scripts, PPV descriptions, bio copy, and marketing content in seconds.",
        url: "https://chat.openai.com",
        tags: ["Copywriting", "Scripts", "Captions"],
        recommended: true,
        free: true,
        bneVerified: true,
      },
      {
        name: "Midjourney",
        description: "Generate promotional artwork, banner images, and brand assets. Great for creating a unique visual identity.",
        url: "https://midjourney.com",
        tags: ["AI Art", "Branding", "Visuals"],
        bneVerified: true,
      },
      {
        name: "Stable Diffusion",
        description: "Open-source AI image generation. Run locally for complete privacy. Best for adult-themed AI art.",
        url: "https://stability.ai",
        tags: ["AI Art", "Privacy", "Open Source"],
        free: true,
        bneVerified: true,
      },
      {
        name: "Runway ML",
        description: "AI video generation and editing. Create B-roll, transitions, and visual effects without a production crew.",
        url: "https://runwayml.com",
        tags: ["AI Video", "Effects", "Generation"],
        bneVerified: true,
      },
      {
        name: "Zapier",
        description: "Automate workflows between apps. Auto-post to Twitter when you upload to OF, send welcome DMs, and more.",
        url: "https://zapier.com",
        tags: ["Automation", "Workflows", "Integration"],
        bneVerified: true,
      },
      {
        name: "Make (Integromat)",
        description: "More powerful than Zapier for complex automations. Build multi-step workflows for your entire creator business.",
        url: "https://make.com",
        tags: ["Automation", "Complex Workflows", "Advanced"],
        bneVerified: true,
      },
    ],
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
};

export default function CreatorTools() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo pageKey="creatorTools" />
      <Navigation />

      {/* SEO long-form intro: Creator tools explained */}
      <div className="container py-8">
        <article className="prose prose-invert max-w-4xl mx-auto text-slate-200">
          <h2>The Creator Stack — Tools We Actually Use</h2>
          <p>
            This page is a curated, tested list of platforms and services that help creators scale. Unlike generic lists, every item here has been evaluated by our operations team or creators in our network. The stack covers production, distribution, monetization, marketing, finance, and legal protections.
          </p>
          <h3>How to Choose Tools for Your Niche</h3>
          <p>
            Start by identifying your primary revenue model: subscriptions, PPV, clips, or in-person services. Then choose tools optimized for that model — for example, ManyVids and Clips4Sale for clip revenue, OnlyFans for subscriptions, and Paxum/Wise for payouts. Use lightweight, proven tools at first and add automation as volume grows.
          </p>
          <h3>Our Recommendations</h3>
          <p>
            Follow the 'one-thing' rule: choose one best-in-class tool per function and learn it deeply. We mark recommended and BNE-verified tools in the list so you can start with what actually works.
          </p>
          <figure>
            <img src="/media/Online_Automation_Course_for_Creators.png" alt="Creator tools overview" />
            <figcaption>Use this stack as your baseline and customize as your business grows.</figcaption>
          </figure>
          <p>
            Internal links: <a href="/creator-calculator">Calculator</a> · <a href="/all-services">All Services</a> · <a href="/compliance-vault">Compliance Vault</a>
          </p>
        </article>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <Package className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                BNE-Vetted Creator Stack
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">
              The Actual Stack You Need to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Run This Thing
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              Every tool across platforms, production, marketing, finance, legal, analytics, and AI — tested by real creators.
              No affiliate garbage, no filler. Just what actually works.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Star className="h-4 w-4 text-violet-400 fill-violet-400" />
                BNE Verified = actually tested by our creators, not just listed
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-400">FREE</span>
                Free tier available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Categories */}
      <div className="container py-12 space-y-16">
        {TOOL_CATEGORIES.map((category, catIdx) => {
          const colors = COLOR_MAP[category.color];
          const Icon = category.icon;
          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.05 }}
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`rounded-xl p-3 ${colors.bg} ${colors.border} border`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-100">{category.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{category.subtitle}</p>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool, toolIdx) => (
                  <motion.a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: toolIdx * 0.05 }}
                    whileHover={{ y: -2 }}
                    className={`group relative rounded-xl border p-5 transition-all duration-200
                      ${tool.recommended
                        ? `${colors.border} ${colors.bg} hover:border-opacity-70`
                        : "border-slate-700/60 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60"
                      }`}
                  >
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {tool.recommended && (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}>
                          ★ RECOMMENDED
                        </span>
                      )}
                      {tool.bneVerified && (
                        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold text-violet-300">
                          BNE VERIFIED
                        </span>
                      )}
                      {tool.free && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          FREE
                        </span>
                      )}
                    </div>

                    {/* Tool Name */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-100 leading-tight">{tool.name}</h3>
                      <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{tool.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-slate-900 p-8 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">
            Rather have us handle all of this for you?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            We set up your platforms, configure your tools, build your brand identity, and drop your first content calendar — you just show up and create.
          </p>
          <a
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors duration-150"
          >
            Apply to Work With BNE <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

