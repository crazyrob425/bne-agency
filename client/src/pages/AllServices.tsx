/**
 * BNE All Services Page
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import { ServiceBlock } from "./ServiceBlock";
import {
  User, Video, Monitor, TrendingUp, DollarSign, Layers,
  Smartphone, Settings, Gamepad2, Camera, ShoppingBag, Shield,
  Briefcase, CreditCard, Heart, Zap, ArrowRight, Star,
  MessageSquare, Eye, Users, Lock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function AllServices() {
  const { getVideoByKeyword } = useMediaCatalog();
  const scaleVideo = getVideoByKeyword("scale") || getVideoByKeyword("methodology") || getVideoByKeyword("agency");
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BNE Creator Operations & Brand Management",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "url": "https://blacklisted.studio"
    },
    "description": "Full business, operations, safety vetting, and marketing automation services for online creators (OnlyFans, webcam models) and high-end in-person companions.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "BNE Creator Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Online Identity & Persona Building",
            "description": "Create a completely secure, anonymous brand profile to protect your real-life identity."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Webcam Setup & Training",
            "description": "OBS configuration, camera/lighting setups, and multi-platform broadcasting support."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Client Vetting & Safety Screening",
            "description": "Vetting reference checkers and checking blacklists for in-person companions."
          }
        }
      ]
    }
  };

  // FAQ Schema for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": SERVICE_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Combine schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [servicesSchema, faqSchema]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Complete Operations & Brand Management Services"
        description="Explore BNE's full operational suite: identity design, webcam setups, fan chat management, passive stream creation, legal compliance, and tax assistance."
        canonical="/services"
        schema={combinedSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-emerald-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
                EVERYTHING YOU NEED, NOTHING YOU DON'T
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Every Service You Need to</span>
              <br />
              <span className="gradient-text">Build Your Empire</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              From launching your anonymous online identity to managing multi-platform operations, handling legal compliance, and supporting your in-person work — we're your complete management firm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <ArrowRight className="h-5 w-5" /> Get Started — Apply Now
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <Heart className="h-5 w-5" /> In-Person Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scale Methodology Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Methodology Briefing</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>The Agency Scale Methodology</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>An in-depth look at our operational scaling frameworks designed to grow your income while reducing labor hours.</p>
          </div>
          <VideoPlayer
            src={scaleVideo?.url || "/media-files/The_Agency_Scale_Methodology.mp4"}
            title="BNE Scale Methodology"
            description="Learn how we transition solo creators into managed business empires."
          />
        </div>
      </section>

      {/* Partnership & Payment Rates Video */}
      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Partnership Economics</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Content Creator Partnership Percentages & Payment Rates</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Understand how BNE structures revenue splits, payment schedules, and partnership models to maximize your earnings while maintaining full control.</p>
          </div>
          <VideoPlayer
            src="/media-files/Content_Creator_Partnership_Percentages_Payments_rates.mp4"
            title="Partnership & Payment Rates"
            description="How BNE structures revenue splits and payment schedules for creator partnerships."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceBlock icon={User} title="Online Identity & Persona Building"
              description="We build you a complete separate identity — marketable, magnetic, and ZERO connection to your real name, city, job, or personal life. Your business, your rules, your secret."
              features={[
                "Full persona development — name, backstory, visual identity, brand voice",
                "Anonymous email setup, social accounts, and platform profiles",
                "Geo-blocking so nobody from your hometown or workplace can find you",
                "Cross-platform identity consistency while keeping real you protected",
                "Persona documentation and brand guidelines for long-term consistency",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />

            <ServiceBlock icon={Video} title="Video & Audio Content Creation"
              description="From scripting to final edit — content that stops scrollers and opens wallets. Professional quality without the professional headache."
              features={[
                "Content strategy and shot-by-shot scripting for maximum engagement",
                "Professional editing — color grading, audio cleanup, intro/outro branding",
                "Thumbnail and cover design that gets clicks and converts",
                "Batch production planning so you shoot once and post for weeks",
                "Content repurposing — one shoot becomes clips, photos, teasers, promos",
              ]}
              iconBg="bg-emerald-500/10 border-emerald-500/20" iconText="text-emerald-400"
              checkText="text-emerald-400" border="border-emerald-500/20" />

            <ServiceBlock icon={Monitor} title="Webcam & Live Streaming Setup"
              description="Turn your webcam sessions into a serious revenue stream. We set up your stream, train you on what makes fans spend, and help you build a loyal live audience."
              features={[
                "Streaming platform setup (Chaturbate, CamSoda, StripChat, etc.)",
                "Camera, lighting, and audio optimization so you look and sound amazing",
                "Interactive tip menu design with triggers that maximize spending",
                "Stream schedule planning and promotion strategy",
                "Live chat engagement training and audience retention tactics",
              ]}
              iconBg="bg-blue-500/10 border-blue-500/20" iconText="text-blue-400"
              checkText="text-blue-400" border="border-blue-500/20" />

            <ServiceBlock icon={TrendingUp} title="Niche & Fetish Strategy"
              description="We don't just find you a niche — we find you the niche that's starving for exactly what you've got. 1,053 niches analyzed for earning potential."
              features={[
                "Free Niche Matcher quiz — 1,053 real niches analyzed for earning potential",
                "Competition analysis so you enter markets where you can actually win",
                "Micro-niche positioning to dominate a specific audience segment",
                "Content pillar strategy tailored to your niche's demand patterns",
                "Ongoing niche optimization as markets shift and new opportunities emerge",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />

            <ServiceBlock icon={DollarSign} title="Passive & Creative Income Streams"
              description="Why sell time when you can sell once and earn forever? We build you multiple income streams that keep paying you while you sleep."
              features={[
                "Digital product creation (e-books, photo packs, audio sessions)",
                "Custom content store setup with automated delivery",
                "Wishlist and gift registry optimization for passive merchandise income",
                "Clip store optimization (Clips4Sale, ManyVids) for evergreen sales",
                "Affiliate program setup and management for recurring commissions",
              ]}
              iconBg="bg-emerald-500/10 border-emerald-500/20" iconText="text-emerald-400"
              checkText="text-emerald-400" border="border-emerald-500/20" />

            <ServiceBlock icon={Layers} title="Multi-Platform Revenue Management"
              description="Stop putting all your eggs in one platform basket. We set up and manage your presence across every major platform so you're diversified and protected."
              features={[
                "Account setup and optimization on OnlyFans, Fansly, LoyalFans, ManyVids, and more",
                "Cross-platform content repurposing strategy (one shoot, five platforms)",
                "Platform-specific pricing and content strategy",
                "Traffic routing between platforms to build your strongest channel first",
                "Platform migration and backup strategies if accounts get restricted",
              ]}
              iconBg="bg-blue-500/10 border-blue-500/20" iconText="text-blue-400"
              checkText="text-blue-400" border="border-blue-500/20" />

            <ServiceBlock icon={MessageSquare} title="Fan Engagement & DM Management"
              description="Your DMs are where the real money lives. We help you automate, optimize, and systematize fan communication so you convert more subscribers into high-spending superfans."
              features={[
                "Welcome message funnels that immediately start the monetization relationship",
                "PPV (pay-per-view) message templates and send strategies",
                "Automated DM funnels that respond to comments while you sleep",
                "Fan segmentation — identify your whales and treat them accordingly",
                "Upsell scripting for custom content, tips, and premium interactions",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />

            <ServiceBlock icon={Smartphone} title="Adult App Development"
              description="Want your own app? We design and develop custom adult applications for Android and iOS — your brand, your rules, your audience data. No platform cuts, no restrictions."
              features={[
                "Custom iOS and Android app design for adult content creators",
                "Subscription management and in-app purchase integration",
                "Secure payment processing with adult-friendly providers",
                "Push notifications and fan engagement features",
                "App store compliance and deployment guidance",
              ]}
              iconBg="bg-emerald-500/10 border-emerald-500/20" iconText="text-emerald-400"
              checkText="text-emerald-400" border="border-emerald-500/20" />

            <ServiceBlock icon={Settings} title="Advanced Fetish Scripting & Setup"
              description="From MailTime video drops to full PC/smartphone takeover experiences — we build the interactive tech that makes your fans feel like they're really there with you."
              features={[
                "MailTime and video drop scheduling for automated content delivery",
                "PC/smartphone takeover software setup for consensual roleplay sessions",
                "Interactive web app development for custom fan experiences",
                "Script writing for fetish scenarios, JOI sessions, and roleplay content",
                "Technical setup and testing so everything works flawlessly",
              ]}
              iconBg="bg-blue-500/10 border-blue-500/20" iconText="text-blue-400"
              checkText="text-blue-400" border="border-blue-500/20" />

            <ServiceBlock icon={Gamepad2} title="Interactive Sex Toy Setup & Training"
              description="The future of camming is interactive. We set up and train you on teledildonics and interactive toys so your fans can control your pleasure in real time — and pay a premium for it."
              features={[
                "Device setup for Lovense, OhMiBod, and interactive toy ecosystems",
                "Platform integration (many platforms have built-in toy control now)",
                "Training on using interactive features to maximize tips and engagement",
                "Long-distance interactive session planning and scripting",
                "Troubleshooting and ongoing technical support",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />

            <ServiceBlock icon={Camera} title="Production Training & Equipment"
              description="You don't need a Hollywood budget to look like a million bucks. We teach you how to get professional results with whatever gear you've got."
              features={[
                "Camera, lighting, and audio setup for any budget",
                "Set design and backdrop creation for professional-looking scenes",
                "Costume and wardrobe planning for maximum visual impact",
                "Editing workshop — learn to edit your own content like a pro",
                "Equipment recommendations and shopping guidance",
              ]}
              iconBg="bg-emerald-500/10 border-emerald-500/20" iconText="text-emerald-400"
              checkText="text-emerald-400" border="border-emerald-500/20" />

            <ServiceBlock icon={ShoppingBag} title="Shopping Assistance & Rentals"
              description="Need something specific for a shoot but don't want to buy it? We handle shopping, sourcing, and even equipment/costume rentals."
              features={[
                "Personal shopping for costumes, props, and production equipment",
                "Equipment rental coordination (cameras, lighting, audio gear)",
                "Costume and wardrobe sourcing for specific content themes",
                "Vendor relationships with adult-friendly suppliers",
                "Budget-conscious recommendations that maximize your spend",
              ]}
              iconBg="bg-blue-500/10 border-blue-500/20" iconText="text-blue-400"
              checkText="text-blue-400" border="border-blue-500/20" />

            <ServiceBlock icon={Shield} title="Legal, Safety & Compliance"
              description="The adult industry has rules — real legal rules that can wreck you if you ignore them. We keep you protected, compliant, and stress-free."
              features={[
                "18 U.S.C. § 2257 compliance setup and record management",
                "Model release drafting and collaborator ID verification",
                "State age verification law navigation (Paxton ruling, etc.)",
                "DMCA monitoring and automatic takedown filing",
                "Business licensing guidance and LLC formation support",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />

            <ServiceBlock icon={Briefcase} title="Business Startup & Management"
              description="Your creator career is a business — act like one. We handle the boring administrative stuff so you can focus on being the star."
              features={[
                "Business registration, LLC formation, and entity structuring",
                "Bookkeeping setup and expense tracking systems",
                "Invoicing and contract templates for custom content clients",
                "Business banking setup and payment pipeline management",
                "Quarterly business reviews and growth planning",
              ]}
              iconBg="bg-emerald-500/10 border-emerald-500/20" iconText="text-emerald-400"
              checkText="text-emerald-400" border="border-emerald-500/20" />

            <ServiceBlock icon={CreditCard} title="Tax Help & Financial Planning"
              description="Taxes don't have to be terrifying. We connect you with adult-industry-savvy CPAs and set up systems that make tax season a breeze."
              features={[
                "Adult-industry-experienced CPA referrals",
                "Quarterly estimated tax planning and reminders",
                "Expense categorization for maximum deductions",
                "Retirement planning (SEP IRA, Solo 401k) for self-employed creators",
                "Financial goal setting and revenue projection modeling",
              ]}
              iconBg="bg-blue-500/10 border-blue-500/20" iconText="text-blue-400"
              checkText="text-blue-400" border="border-blue-500/20" />

            <ServiceBlock icon={Heart} title="Confidential Guidance & Support"
              description="Nobody gets it like we get it. We're not here to judge you — we're here to help you navigate every challenge, fear, and question that comes with building an adult career."
              features={[
                "One-on-one strategy sessions with experienced creator managers",
                "Mental health resources and burnout prevention coaching",
                "Physical safety planning for shoots, meets, and in-person work",
                "Industry insider advice on avoiding scams, bad deals, and toxic people",
                "Complete confidentiality — what you share stays with us, always",
              ]}
              iconBg="bg-violet-500/10 border-violet-500/20" iconText="text-violet-400"
              checkText="text-violet-400" border="border-violet-500/20" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Zero to Empire in 4 Steps</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We've streamlined the entire process so you can go from "I'm interested" to "I'm making money" without the headache.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Free Niche Matcher", desc: "Take our 2-minute quiz to discover your highest-earning niche. No sign-up, no email, no strings.", icon: Zap },
              { step: "02", title: "Apply & Strategy Call", desc: "Submit your application and hop on a 30-minute strategy call. We'll map out your exact roadmap.", icon: MessageSquare },
              { step: "03", title: "We Build Everything", desc: "From your persona to your platforms, legal setup to content strategy — we handle every detail.", icon: Settings },
              { step: "04", title: "You Grow & Earn", desc: "Launch your brand, grow your audience, and watch the revenue climb. We're with you every step.", icon: TrendingUp },
            ].map((item, i) => {
              const StepIcon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
                  <div className="text-center mb-4"><span className="text-5xl font-bold text-violet-500/20 mono-stat">{item.step}</span></div>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><StepIcon className="h-7 w-7 text-violet-400" /></div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Real Results</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Don't Take Our Word For It</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Real creators we've helped build real careers.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I was sleeping on my couch posting random pics making $200/month. BNE found my niche, built my brand, and 90 days later I was hitting $8K.", name: "Mia R.", revenue: "$8K/mo in 90 days", location: "Texas", stars: 5 },
              { quote: "I was scared someone would find me. BNE built a whole separate identity — completely anonymous — and I make more now than my old corporate job.", name: "Lexi K.", revenue: "6 figures, fully anonymous", location: "California", stars: 5 },
              { quote: "The in-person services they set up? They handled EVERYTHING — the ads, the screening, the bookings. I make more in a weekend than most people make in a month.", name: "Sasha M.", revenue: "$12K/mo combined", location: "Florida", stars: 5 },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 border border-white/8">
                <div className="flex items-center gap-1 mb-4">{[...Array(t.stars)].map((_, j) => <Star key={j} className="h-4 w-4 text-violet-400 fill-violet-400" />)}</div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: 'DM Sans' }}>"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-100 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk' }}>{t.name}</p>
                    <p className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{t.location}</p>
                  </div>
                  <div className="text-right px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <p className="text-violet-400 text-xs font-bold mono-stat">{t.revenue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BNE */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We're Not Like Other "Agencies"</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Zero Judgment, Ever", desc: "We don't care what your kinks are, what your past is, or what you're comfortable with. Your choices are your business." },
              { icon: Lock, title: "Your Secrets Stay Secret", desc: "Complete NDA from day one. Your real name, identity, situation — nothing leaves this room unless you want it to." },
              { icon: Star, title: "We Actually Know This Industry", desc: "Years of real experience in adult content, camming, escort services, and online branding. We've been where you are." },
              { icon: TrendingUp, title: "Results or We're Not Earning", desc: "Our success is tied to yours. If you're not making more money, we're not doing our job. Period." },
              { icon: Users, title: "You Get a Full Team", desc: "Brand strategists, legal experts, content coaches, tech support, business advisors — the full squad has your back." },
              { icon: Heart, title: "We Support Your Whole Journey", desc: "From brand new to industry veteran, online-only to in-person services — we adapt to YOU." },
            ].map((item, i) => {
              const WhyIcon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass-card p-6 border">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4"><WhyIcon className="h-5 w-5 text-violet-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - for rich snippets */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={SERVICE_FAQS} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-transparent to-emerald-900/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Ready to Stop Leaving Money on the Table?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Every day you wait is another day of lost revenue. We only work with a limited number of new clients each month. Your spot is waiting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Free Niche Matcher
                </motion.button>
              </Link>
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <ArrowRight className="h-5 w-5" /> Apply Now — Let's Talk
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

