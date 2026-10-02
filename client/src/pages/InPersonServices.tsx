/**
 * BNE In-Person Services Page
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceBlock } from "./ServiceBlock";
import VideoPlayer from "@/components/VideoPlayer";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import Seo from "@/components/Seo";
import {
  Heart,
  Shield,
  Camera,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  Zap,
  ArrowRight,
  Lock,
  Eye,
  Globe,
  FileText,
  DollarSign,
  Briefcase,
  ShoppingBag,
  Video,
  Smartphone,
  Settings,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const faqs = [
  { q: "Do I need experience to start?", a: "Nope. Whether you're brand new or already established, we meet you where you are. If starting fresh, we build everything from the ground up." },
  { q: "How much does it cost?", a: "It depends on where you're starting and what you need. Our tiered pricing starts at Glow-Up Launch and scales up to full empire management." },
  { q: "Is my information safe?", a: "100%. Every client works under a strict NDA from day one. Your real name, identity, personal details — nothing leaves our office." },
  { q: "Do you only work with certain types of services?", a: "We work with professional adults across the spectrum — escorts, mistresses, party entertainers, cam performers expanding to in-person, and more." },
  { q: "How fast will I see results?", a: "Most clients see measurable improvement within the first 30 days. Your brand launches, your ads go live, and your calendar starts filling." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function InPersonServices() {
  const { getVideoByKeyword } = useMediaCatalog();
  const inpersonVideo = getVideoByKeyword("in-person") || getVideoByKeyword("inperson") || getVideoByKeyword("physical");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="In-Person Services Management for Escorts & Entertainers"
        description="Full-service management for in-person entertainers. We handle client screening, booking, safety, marketing, and legal so you can focus on your craft."
        canonical="/inperson-services"
        schema={faqSchema}
      />
      <Navigation />

        {/* Hero */}
        <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-emerald-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Heart className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">IN-PERSON SERVICES — FULL SUPPORT</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">Your In-Person Empire,</span>
              <br />
              <span className="gradient-text">Fully Supported</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              From escort services and BDSM mistress work to private events, casting, photography, and everything in between — we handle the business side so you can focus on being the best in your field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <ArrowRight className="h-5 w-5" /> Let's Build Your Brand
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <Heart className="h-5 w-5" /> View Online Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Who This Is For</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Every Type of In-Person Professional</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Whether you're starting fresh or already established, we meet you where you are.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Escorts & Companions", desc: "Full branding, advertising, screening systems, and client acquisition." },
              { icon: Zap, title: "BDSM Mistresses", desc: "Niche positioning, session scripting, client management for dominatrices." },
              { icon: Users, title: "Party Girls & Private Events", desc: "Event promotion, client booking, themed party planning support." },
              { icon: Video, title: "Cam Girls Going In-Person", desc: "Transition support for online creators branching into in-person." },
            ].map((item, i) => {
              const WhoIcon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 border border-white/8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><WhoIcon className="h-7 w-7 text-violet-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* In-Person Transition Video */}
      <section className="py-12 bg-[oklch(0.08_0.008_85)] border-y border-[oklch(0.78_0.16_85/10%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-pink-400 text-xs font-semibold uppercase tracking-wider font-body">Income Strategy</span>
            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>Transitioning to In-Person Income</h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>Learn the safety mechanics, screening protocols, and brand building secrets required to go in-person.</p>
          </div>
          <VideoPlayer
            src={inpersonVideo?.url || "/media-files/Transition_to_Inperson_income.mp4"}
            title="Transitioning to In-Person Revenue"
            description="The tactical blueprint for digital creators expanding into physical events and sessions."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Complete Services</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3" style={{ fontFamily: 'Space Grotesk' }}>Everything We Handle For You</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceBlock icon={MessageSquare} title="Creative Availability Advertising"
              link="/posting-and-scheduling"
              description="Attention-grabbing ads posted to the top sites and directories — designed to get you seen by the right clients and fill your book fast."
              features={["Professional ad copywriting that highlights your appeal", "Premium directory placement on high-traffic platforms", "Ongoing ad rotation and optimization", "Aesthetic ad design with photography integration", "Multi-platform posting strategy"]} />

            <ServiceBlock icon={FileText} title="Account Creation & Verification"
              description="We handle the tedious technical stuff — creating and verifying your profiles on 1-on-1 advertisement and classified sites so you look legitimate and get approved fast."
              features={["Profile setup on major verification-required platforms", "Photo verification submission and approval coordination", "Profile optimization with keyword-rich descriptions", "Account recovery and maintenance for existing profiles", "Guidance on platform rules"]} />

            <ServiceBlock icon={Shield} title="Client Screening & Appointment Booking"
              link="/posting-and-scheduling"
              description="Keep yourself safe while staying efficient. We set up professional screening systems and manage bookings so you only see clients who are verified, respectful, and worth your time."
              features={["Custom screening questionnaire templates", "Booking calendar setup with your availability rules", "Client communication templates for clear expectations", "Deposit and payment collection systems", "No-show and cancellation policy enforcement"]} />

            <ServiceBlock icon={Camera} title="Photography & Portfolio Creation"
              description="Your photos ARE your brand. We connect you with photographers or guide your self-shoots to create a portfolio that commands top rates and attracts the clients you want."
              features={["Pinterest-style portfolio curation and organization", "Photo shoot planning — locations, outfits, poses, lighting", "Professional photographer referrals and coordination", "Portfolio website design showcasing your best work", "Ongoing portfolio updates and seasonal refresh"]} />

            <ServiceBlock icon={FileText} title="Online & Print Media Management"
              description="From your website to business cards to promotional materials — we make sure every piece of media representing you looks professional and attracts the right crowd."
              features={["Personal website design and maintenance", "Business card and promotional flyer design", "Social media content calendars and posting schedules", "Brand consistency across all printed and digital materials", "Marketing material updates and seasonal promotions"]} />

            <ServiceBlock icon={Briefcase} title="Casting Services"
              description="Whether you're booking shoots, events, or collaborations — we help you find and vet opportunities that match your brand and pay what you're worth."
              features={["Opportunity sourcing from reputable production companies", "Contract review before you sign anything", "Rate negotiation support so you never undercharge", "Scheduling coordination that respects your boundaries", "Post-event follow-up and relationship building"]} />

            <ServiceBlock icon={Globe} title="Web Design for In-Person Services"
              description="A professional website is your most powerful marketing tool. We design and maintain sites that showcase your services, establish trust, and convert visitors into booked clients."
              features={["Custom website design tailored to your services and brand", "SEO optimization so local clients find you", "Online booking integration and contact forms", "Gallery and portfolio showcase with fast-loading images", "Mobile-responsive design"]} />

            <ServiceBlock icon={Smartphone} title="Custom Adult App Design (iOS & Android)"
              description="Your own branded app puts you in complete control. We design and develop custom applications that let you manage bookings, share exclusive content, and build your own platform."
              features={["Native iOS and Android app development", "Custom features: booking system, content gallery, fan messaging", "Branded UI/UX design that matches your identity", "Push notifications for bookings and promotions", "App store guidance and deployment support"]} />

            <ServiceBlock icon={Video} title="Video & Media Production"
              description="Professional-looking content doesn't require a Hollywood budget. We help you produce, edit, and distribute video content that builds your brand and fills your schedule."
              features={["Promotional video production for your website and social media", "Video editing and post-production services", "Content distribution strategy across platforms", "Behind-the-scenes content creation for social engagement", "Testimonial and review video collection"]} />

            <ServiceBlock icon={Settings} title="Training: Camera, Lighting, Costume, Set"
              description="Looking like a pro is half the battle. We train you on everything from camera settings to set design so you can produce content that commands premium rates."
              features={["Camera and lighting setup tutorials for your space", "Set design and backdrop creation on any budget", "Costume and wardrobe planning for maximum impact", "Editing workshop — learn to edit your own content", "Equipment recommendations for every price point"]} />

            <ServiceBlock icon={ShoppingBag} title="Shopping Assistance & Rentals"
              description="Need specific items for shoots, events, or client meetings? We handle shopping, sourcing, and even rentals so you always have exactly what you need."
              features={["Costume and prop shopping coordination", "Equipment rental management (cameras, lighting, audio)", "Venue and location scouting for shoots and events", "Vendor management and relationship building", "Budget planning for production expenses"]} />

            <ServiceBlock icon={Shield} title="Legal & Safety Education"
              description="Knowledge is power — and safety is everything. We make sure you understand your rights, your obligations, and how to stay protected in every situation."
              features={["Legal rights education specific to your services and location", "Safety protocol development for in-person meetings", "Incident response planning and crisis management", "Understanding of local regulations and licensing", "Working with law enforcement safely"]} />

            <ServiceBlock icon={Briefcase} title="Business Licensing & Startup Assistance"
              description="Running a legitimate business means doing things by the book. We guide you through licensing, permits, and business setup so you're protected and professional from day one."
              features={["Business entity formation (LLC, sole proprietorship guidance)", "Local licensing and permit research for your area", "Tax ID and business bank account setup", "Contract templates for services and client agreements", "Ongoing compliance monitoring for legal requirements"]} />

            <ServiceBlock icon={Shield} title="Legal Compliance"
              description="A clean legal foundation protects your income, your identity, and your future. We help you organize the essential compliance systems so your business can operate with confidence."
              features={["Business entity formation guidance, with LLC structure recommended when appropriate", "Age verification documentation system for all relevant bookings and content", "Model release and consent form preparation", "Local regulation review for your service area", "Professional insurance considerations and referrals", "Tax ID and business banking setup coordination", "BNE legal consultation review meeting"]} />

            <ServiceBlock icon={DollarSign} title="Tax Help & Business Management"
              description="Taxes don't have to be a nightmare. We connect you with the right financial professionals and set up systems that make running your business smooth and profitable."
              features={["Adult-industry experienced CPA referrals", "Expense tracking and deduction optimization", "Quarterly tax planning and payment reminders", "Financial goal setting and revenue tracking", "Business expense categorization and record-keeping"]} />

            <ServiceBlock icon={Heart} title="Confidential Advice & Ongoing Support"
              description="This industry comes with unique challenges — we get it. Access confidential guidance on everything from pricing to boundaries to burnout."
              features={["One-on-one strategy sessions with experienced managers", "Emotional support and industry-specific mental health resources", "Boundary setting and client management coaching", "Industry insider connections and networking", "Crisis support and problem-solving"]} />
          </div>
        </div>
      </section>

      {/* Safety First */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Safety Is Non-Negotiable</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Protect You While You Prosper</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Client Screening Systems", desc: "Professional verification processes that ensure only legitimate, respectful clients book with you. ID checks, reference verification, deposit requirements — we set it all up." },
              { icon: Lock, title: "Physical Safety Protocols", desc: "From meet-and-greet locations to safety check-ins to emergency response plans — we help you build systems that keep you safe." },
              { icon: Eye, title: "Identity & Privacy Protection", desc: "Your real life and your professional life stay completely separate. We build and maintain the firewall between your two worlds." },
              { icon: Briefcase, title: "Legal Compliance", desc: "Understand local regulations, tax obligations, business licensing, and your rights. We connect you with legal resources and keep you compliant." },
              { icon: Heart, title: "Mental Health Support", desc: "This industry comes with unique stressors. We provide confidential support, industry-specific mental health resources, and a judgment-free space." },
              { icon: DollarSign, title: "Financial Protection", desc: "Secure payment systems, income tracking, tax planning, and financial goal setting. We make sure you're keeping more of what you earn." },
            ].map((item, i) => {
              const SafeIcon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 border">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4"><SafeIcon className="h-5 w-5 text-emerald-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Together */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">Our Process</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>How We Launch Your In-Person Brand</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery Call", desc: "We hop on a completely confidential call to understand your goals, comfort zones, and what success looks like.", icon: MessageSquare },
              { step: "02", title: "Brand Strategy", desc: "We build your complete brand identity — persona, visual style, pricing structure, target client profile.", icon: Star },
              { step: "03", title: "Launch & Promote", desc: "We set up your ads, profiles, booking systems, and marketing channels. Your brand goes live.", icon: TrendingUp },
              { step: "04", title: "Manage & Grow", desc: "Ongoing management, optimization, and support. We handle day-to-day while you deliver incredible experiences.", icon: Zap },
            ].map((item, i) => {
              const ProcIcon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
                  <div className="text-center mb-4"><span className="text-5xl font-bold text-violet-500/20 mono-stat">{item.step}</span></div>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"><ProcIcon className="h-7 w-7 text-emerald-400" /></div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Questions?</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3" style={{ fontFamily: 'Space Grotesk' }}>Real Answers, No BS</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }} className="glass-card p-6 border border-white/8">
                <h4 className="text-zinc-200 font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.q}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-transparent to-emerald-900/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Let's Build Something That Actually Works</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Stop struggling on your own. We've built the systems, networks, and expertise to help you succeed in every area of the adult industry.</p>
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
