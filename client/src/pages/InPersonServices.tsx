/**
 * BNE In-Person Services Page — high-energy sales page for in-person providers.
 * Deep dives: the Guardian safety app + posting/scheduling/chatter via shared number.
 */
import { motion } from "framer-motion";
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
  FileText,
  DollarSign,
  Briefcase,
  Smartphone,
  CreditCard,
  MapPin,
  Bell,
  CheckCircle2,
  Flag,
  Siren,
  Satellite,
  Video,
  Fingerprint,
  MoonStar,
  Phone,
  CalendarCheck,
  BadgeCheck,
  Wallet,
  Scale,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

const faqs = [
  { q: "How does the Guardian safety app actually protect me?", a: "It's a full safety system in your pocket: mandatory check-in when a date starts and check-out when it ends (miss a check-out and your safety circle is alerted automatically), live GPS tracking for the whole date, a one-tap panic button that pings your circle with your live location, remote video/audio monitoring that your trusted circle can tune into during an emergency, an ear-splitting siren alarm, and a duress PIN that looks like an 'all clear' but secretly triggers an alert. You control who your circle is — our team, a friend, or both." },
  { q: "How do clients pay me through the app?", a: "The Guardian app has a built-in payment processor that takes both crypto and credit cards. Clients can pay deposits, tributes, and full rates right from their phone — no awkward cash counting, no paper trail on your personal accounts, no 'the ATM ate my card' excuses. You get paid before the date even starts if you want." },
  { q: "What is the shared number system?", a: "One business number for everything. Every call and text flows through a single line that you AND our chatter team both see in real time. Our team answers, screens, negotiates, and books in your voice while you live your life — and you can watch every message land as it happens. Total transparency, zero missed bookings, and you never have to touch the time-wasters." },
  { q: "Do I have to talk to time-wasters and lowballers myself?", a: "Never again. Our chatter team filters every inquiry — the hagglers, the explicit-photo collectors, the 2am 'u up?' crowd — before they ever reach you. You only see verified, deposit-paid, ready-to-book clients. Your energy stays where it earns: with real clients." },
  { q: "Do I need experience to start?", a: "Nope. Whether you're brand new or already established, we meet you where you are. If starting fresh, we build everything from the ground up — brand, ads, screening, booking systems, the works." },
  { q: "How much does it cost?", a: "It depends on where you're starting and what you need. Our tiered pricing starts at Glow-Up Launch and scales up to full empire management. The application call is free and we'll map the exact numbers to your goals." },
  { q: "Is my information safe?", a: "100%. Every client works under a strict NDA from day one. Your real name, identity, personal details — nothing leaves our office. The Guardian app keeps your professional life and real life in completely separate worlds." },
  { q: "How fast will I see results?", a: "Most clients see measurable improvement within the first 30 days. Your brand launches, your ads go live, the chatter team starts booking — and your calendar starts filling." },
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

const appFeatures = [
  { icon: CreditCard, title: "Crypto + Credit Card Payments", desc: "Deposits, tributes, and full rates paid straight through the app. No awkward cash handoffs, no paper trail on your personal accounts, no 'my card declined' games. Get paid before the date starts." },
  { icon: MapPin, title: "Client GPS + Incall Arrival Alerts", desc: "Watch them approach in real time and get pinged the second they arrive. No more waiting around the lobby wondering if they're lost, lying, or never coming." },
  { icon: CheckCircle2, title: "Mandatory Start-of-Date Check-In", desc: "The date doesn't officially begin until you tap in. Your safety circle instantly knows you're with a client, where you are, and when it started. Non-negotiable." },
  { icon: Flag, title: "Mandatory End-of-Date Check-Out", desc: "Tap out when it's over. Miss your check-out and your safety circle gets alerted automatically — no 'I forgot,' no silence, no exceptions." },
  { icon: Siren, title: "One-Tap Panic Button", desc: "One tap and your safety circle plus our monitoring team instantly get your live location and an emergency alert. Big, thumb-sized, impossible to miss — even in the dark." },
  { icon: Satellite, title: "Live GPS Tracking", desc: "Your trusted circle can see exactly where you are for the entire duration of the date. If you move, they see it. If you stop moving, they know." },
  { icon: Video, title: "Emergency Video/Audio Monitoring", desc: "Hit panic and your circle can tune into live video and audio from your phone. Someone who cares about you is watching your back in real time — the ultimate deterrent." },
  { icon: Bell, title: "App Siren Alarm", desc: "A deafening alarm straight from your phone's speaker. Deter a threat, draw every eye in the building, buy yourself the seconds that matter." },
  { icon: Fingerprint, title: "Duress PIN", desc: "A secret code that looks like an 'all clear' check-in but silently triggers a full emergency alert. For the moment you need help but can't show it." },
  { icon: MoonStar, title: "Discreet Mode", desc: "The app looks like an ordinary utility on your home screen. No logos, no labels, nothing that outs you if someone glances at your phone." },
];

const chatterFeatures = [
  { icon: Phone, title: "One Shared Number", desc: "A single business line for every call and text. You and our team both see everything in real time — total transparency, nothing hidden, nothing missed." },
  { icon: MessageSquare, title: "We Talk, You Earn", desc: "Our professional chatter team responds in your voice — screening, negotiating, booking — while you're living your life, sleeping, or already with a client." },
  { icon: Eye, title: "Watch Every Message Land", desc: "Every inquiry, every reply, every booking hits your screen as it happens. You always know exactly what's being said in your name." },
  { icon: Shield, title: "Time-Wasters Never Reach You", desc: "Hagglers, photo collectors, explicit-pic demanders, the 2am crowd — filtered out before they ever touch your energy. You only meet verified, deposit-paid clients." },
  { icon: CalendarCheck, title: "Calendar + Deposits Handled", desc: "Bookings slotted into your availability, deposits collected up front, no-show and cancellation policies enforced. Your calendar fills itself." },
  { icon: BadgeCheck, title: "Screening Baked In", desc: "Every booking runs through our verification flow — ID checks, reference verification, blacklist cross-checks — before a time or place is ever confirmed." },
];

export default function InPersonServices() {
  const { getVideoByKeyword } = useMediaCatalog();
  const inpersonVideo = getVideoByKeyword("in-person") || getVideoByKeyword("inperson") || getVideoByKeyword("physical");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="In-Person Services — Safety App, Booking Team & Full Management"
        description="The complete in-person empire package: Guardian safety app with panic button, GPS tracking & crypto/CC payments, plus our posting, scheduling & chatter team booking clients through one shared number."
        canonical="/in-person-services"
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
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">IN-PERSON SERVICES — THE REAL MONEY</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-zinc-100">In-Person Is Where</span>
              <br />
              <span className="gradient-text">the Real Money Lives</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
              One unforgettable night can out-earn a month of content. We run the entire operation — the ads that fill your book, the screening that keeps you safe, the chatter team that closes the bookings, and the Guardian app watching your back on every date. You bring the magic. We handle literally everything else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Claim Your Territory — Apply Now
                </motion.button>
              </Link>
              <a href="#guardian-app">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <Smartphone className="h-5 w-5" /> Meet the Guardian App
                </motion.button>
              </a>
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
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Whether you're starting fresh or already established, we meet you where you are — and take you where the money is.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Escorts & Companions", desc: "Full branding, high-converting ads, ruthless screening, and a booking team that keeps your calendar full of premium clients." },
              { icon: Zap, title: "BDSM Mistresses", desc: "Niche positioning, session scripting, tribute systems, and client management built for dominatrices who charge what they're worth." },
              { icon: Users, title: "Party Girls & Private Events", desc: "Event promotion, group bookings, and private party pipelines — turn every weekend into a payday." },
              { icon: Video, title: "Cam Girls Going In-Person", desc: "Transition support for online creators branching into in-person — we port your brand, your fans, and your pricing power." },
            ].map((item, i) => {
              const WhoIcon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><WhoIcon className="h-7 w-7 text-violet-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GUARDIAN APP DEEP DIVE ── */}
      <section id="guardian-app" className="py-20 bg-[oklch(0.09_0.01_265)] border-y border-[oklch(0.78_0.16_85/10%)] relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-emerald-500/5 blur-[110px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
              <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 mono-stat">THE GUARDIAN APP — YOUR BODYGUARD IN YOUR POCKET</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Never Walk Into a Date <span className="gradient-text">Unprotected Again</span>
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
              This is the part nobody else offers. A dedicated smartphone app built exclusively for in-person providers — payments, client tracking, and a full emergency safety system, all in one place. Your clients get a seamless, professional experience. You get a guardian angel with a panic button.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {appFeatures.map((item, i) => {
              const AppIcon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4"><AppIcon className="h-6 w-6 text-emerald-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
              <span className="text-emerald-400 font-semibold">The bottom line:</span> you should never have to choose between big money and your safety. With the Guardian app, you get both — every single date.
            </p>
            <Link href="/onboarding">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                <Shield className="h-5 w-5" /> Get Protected — Apply Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── POSTING / SCHEDULING / CHATTER DEEP DIVE ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[300px] bg-violet-500/5 blur-[110px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
              <Phone className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">POSTING · SCHEDULING · CHATTER — DONE FOR YOU</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              One Number. Total Transparency. <span className="gradient-text">Zero Missed Bookings.</span>
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
              Here's how the top earners actually operate: they never touch their own inbox. Our professional chatter team runs your posting, your scheduling, and every single conversation — through <span className="text-zinc-200 font-semibold">one shared number that you can see in real time</span>. Every call, every text, every booking, right on your screen as it happens.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {chatterFeatures.map((item, i) => {
              const ChatIcon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border border-white/8">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4"><ChatIcon className="h-6 w-6 text-violet-400" /></div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 max-w-3xl mx-auto">
            <div className="glass-card p-8 border border-violet-500/20 text-center">
              <Wallet className="h-8 w-8 text-violet-400 mx-auto mb-4" />
              <p className="text-zinc-200 text-lg leading-relaxed mb-2" style={{ fontFamily: 'DM Sans' }}>
                Think about it: while you're on a date earning, our team is already booking your <span className="text-violet-300 font-semibold">next three</span>.
              </p>
              <p className="text-zinc-400 text-sm" style={{ fontFamily: 'DM Sans' }}>That's the difference between a hustle and an empire. The phone never stops — and neither does the money.</p>
              <div className="mt-6">
                <Link href="/posting-and-scheduling">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                    <ArrowRight className="h-5 w-5" /> See Posting & Scheduling Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
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

      {/* Services Grid — in-person specific */}
      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Complete Services</span>
            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Everything We Handle For You</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Every service below is built specifically for in-person providers. Pick what you need — or hand us the whole operation.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceBlock icon={MessageSquare} title="Creative Availability Advertising"
              link="/posting-and-scheduling"
              description="Attention-grabbing ads posted to the top sites and directories — engineered to get you seen by the right clients and fill your book fast."
              features={["Professional ad copywriting that highlights your appeal", "Premium directory placement on high-traffic platforms", "Ongoing ad rotation and optimization", "Aesthetic ad design with photography integration", "Multi-platform posting strategy"]} />

            <ServiceBlock icon={FileText} title="Account Creation & Verification"
              description="We handle the tedious technical stuff — creating and verifying your profiles on 1-on-1 advertisement and classified sites so you look legitimate and get approved fast."
              features={["Profile setup on major verification-required platforms", "Photo verification submission and approval coordination", "Profile optimization with keyword-rich descriptions", "Account recovery and maintenance for existing profiles", "Guidance on platform rules"]} />

            <ServiceBlock icon={Shield} title="Client Screening & Appointment Booking"
              link="/posting-and-scheduling"
              description="Keep yourself safe while staying efficient. Professional screening systems plus managed bookings — you only see clients who are verified, respectful, and worth your time."
              features={["Custom screening questionnaire templates", "ID checks, reference verification & blacklist cross-checks", "Booking calendar setup with your availability rules", "Deposit and payment collection systems", "No-show and cancellation policy enforcement"]} />

            <ServiceBlock icon={Phone} title="Posting, Scheduling & Chatter Team"
              link="/posting-and-scheduling"
              description="Our team runs your entire inbox through one shared number you can watch in real time. We answer, screen, negotiate, and book in your voice — you just show up and shine."
              features={["Every call and text visible to you as it happens", "Professional responses in your voice, 24/7", "Time-wasters and lowballers filtered before they reach you", "Calendar management with your availability rules", "Deposits collected before a date is ever confirmed"]} />

            <ServiceBlock icon={Smartphone} title="The Guardian Safety App"
              link="#guardian-app"
              description="Your bodyguard in your pocket: crypto/CC payments, client GPS with arrival alerts, mandatory check-ins, panic button, live GPS tracking, emergency video/audio monitoring, siren alarm, and more."
              features={["Crypto + credit card payment processor", "Mandatory start & end-of-date check-ins", "One-tap panic button with live location alert", "Remote video/audio monitoring during emergencies", "App siren alarm + duress PIN + discreet mode"]} />

            <ServiceBlock icon={Camera} title="Photography & Portfolio Creation"
              description="Your photos ARE your brand. We connect you with photographers or guide your self-shoots to create a portfolio that commands top rates and attracts the clients you want."
              features={["Pinterest-style portfolio curation and organization", "Photo shoot planning — locations, outfits, poses, lighting", "Professional photographer referrals and coordination", "Portfolio website design showcasing your best work", "Ongoing portfolio updates and seasonal refresh"]} />

            <ServiceBlock icon={Scale} title="Legal Compliance & Safety Education"
              description="A clean legal foundation protects your income, your identity, and your future — and real safety knowledge protects everything else."
              features={["Business entity formation guidance (LLC structure when appropriate)", "Age verification documentation systems", "Model release and consent form preparation", "Local regulation review for your service area", "Safety protocol development for in-person meetings", "Incident response planning and crisis management"]} />

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
            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Systems, screening, and the Guardian app — layered protection on every single date.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Client Screening Systems", desc: "Professional verification that ensures only legitimate, respectful clients book with you. ID checks, reference verification, deposit requirements — set up and enforced." },
              { icon: Lock, title: "The Guardian Safety Net", desc: "Mandatory check-ins, live GPS, panic button, emergency monitoring, siren alarm. The app watches your back from the first text to the final check-out." },
              { icon: Eye, title: "Identity & Privacy Protection", desc: "Your real life and your professional life stay completely separate. We build and maintain the firewall between your two worlds." },
              { icon: Briefcase, title: "Legal Compliance", desc: "Understand local regulations, tax obligations, business licensing, and your rights. We connect you with legal resources and keep you compliant." },
              { icon: Heart, title: "Mental Health Support", desc: "This industry comes with unique stressors. Confidential support, industry-specific resources, and a judgment-free space — always." },
              { icon: DollarSign, title: "Financial Protection", desc: "Secure payment systems, income tracking, tax planning, and financial goal setting. We make sure you're keeping more of what you earn." },
            ].map((item, i) => {
              const SafeIcon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 border">
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
              { step: "01", title: "Discovery Call", desc: "A completely confidential call to understand your goals, comfort zones, and what success looks like for you.", icon: MessageSquare },
              { step: "02", title: "Brand Strategy", desc: "We build your complete brand identity — persona, visual style, pricing structure, target client profile.", icon: Star },
              { step: "03", title: "Launch & Promote", desc: "Ads go live, profiles verified, Guardian app activated, chatter team briefed. Your brand hits the market loaded.", icon: TrendingUp },
              { step: "04", title: "Manage & Grow", desc: "Ongoing management and optimization. The team books, the app protects, and you deliver unforgettable experiences.", icon: Zap },
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
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Your Empire Is One Application Away</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>The ads. The screening. The bookings. The Guardian app watching your back. Everything handled — you just bring the magic and collect the money.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                  <Zap className="h-5 w-5" /> Apply Now — Let's Talk
                </motion.button>
              </Link>
              <Link href="/niche-matcher">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <Star className="h-5 w-5" /> Free Niche Matcher
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
