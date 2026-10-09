/**
 * SoftwareReview — the long-form honest review page for one free/open-source tool.
 * Route: /free-software/:slug
 */
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import {
  ArrowUpRight,
  ArrowLeft,
  Download,
  ExternalLink,
  Star,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Github,
  ShieldCheck,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  getToolBySlug,
  getToolsByGroup,
  type FreeSoftwareTool,
} from "@/data/freeSoftware";
import {
  softwareAiDescription,
  softwareKeywords,
  softwareFaq,
  softwareAppSchema,
} from "@/lib/softwareSeo";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? "text-[oklch(0.78_0.16_85)] fill-[oklch(0.78_0.16_85)]" : "text-zinc-600"}`}
        />
      ))}
    </span>
  );
}

function licenseLabel(tool: FreeSoftwareTool) {
  if (tool.licenseType === "open-source") return tool.licenseName ? `Open Source · ${tool.licenseName}` : "Open Source";
  if (tool.licenseType === "free") return "100% Free";
  return "Freemium";
}

export default function SoftwareReview() {
  const [, params] = useRoute("/free-software/:slug");
  const tool = params ? getToolBySlug(params.slug) : undefined;

  if (!tool) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 pt-40 pb-32 text-center">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Tool not found
          </h1>
          <p className="text-zinc-400 mb-8">That review doesn't exist — yet.</p>
          <Link href="/free-software">
            <span className="inline-flex items-center gap-2 text-[oklch(0.85_0.14_85)] font-semibold cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Back to the arsenal
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getToolsByGroup(tool.group).filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${tool.name} Review — Free ${tool.category} Tool for Creators`}
        description={softwareAiDescription(tool)}
        canonical={`/free-software/${tool.slug}`}
        keywords={softwareKeywords(tool)}
        ogImage={tool.screenshot}
        schema={[
          softwareAppSchema(tool),
          softwareFaq(tool),
        ]}
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Free Software", url: "/free-software" },
          { name: tool.name, url: `/free-software/${tool.slug}` },
        ]}
      />
      <Navigation />

      <article className="relative pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.78_0.16_85/6%)] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/free-software">
              <span className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[oklch(0.85_0.14_85)] transition-colors cursor-pointer mb-8">
                <ArrowLeft className="h-4 w-4" /> All free software
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[oklch(0.78_0.16_85/15%)] border border-[oklch(0.78_0.16_85/35%)] text-[oklch(0.85_0.14_85)]">
                {licenseLabel(tool)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-zinc-300">
                {tool.category}
              </span>
              <Stars rating={tool.rating} />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 leading-tight mb-4" style={{ fontFamily: "Space Grotesk" }}>
              {tool.name}
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed mb-8" style={{ fontFamily: "DM Sans" }}>
              {tool.tagline}
            </p>

            <div className="rounded-2xl overflow-hidden border border-white/10 mb-10 bg-black/40">
              <img
                src={tool.screenshot}
                alt={`${tool.name} screenshot`}
                className="w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).closest("div")!.style.display = "none"; }}
              />
            </div>
          </motion.div>

          {/* The review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-zinc-100 mb-6" style={{ fontFamily: "Space Grotesk" }}>
              The honest review
            </h2>
            <div className="space-y-5">
              {tool.review.map((para, i) => (
                <p key={i} className="text-zinc-300 leading-[1.85] text-[17px]" style={{ fontFamily: "DM Sans" }}>
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[oklch(0.78_0.16_85/25%)] bg-[oklch(0.78_0.16_85/6%)] p-6">
              <p className="text-zinc-200 font-semibold mb-1" style={{ fontFamily: "Space Grotesk" }}>Verdict</p>
              <p className="text-zinc-300 leading-relaxed" style={{ fontFamily: "DM Sans" }}>{tool.verdict}</p>
            </div>
          </motion.div>

          {/* Best way to use it */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-zinc-100 mb-6" style={{ fontFamily: "Space Grotesk" }}>
              Best way to use it
            </h2>
            <ul className="space-y-3">
              {tool.bestFor.map((tip, i) => (
                <li key={i} className="flex gap-3 items-start rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 leading-relaxed" style={{ fontFamily: "DM Sans" }}>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* License / free-tier facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2" style={{ fontFamily: "Space Grotesk" }}>
              <ShieldCheck className="h-6 w-6 text-[oklch(0.78_0.16_85)]" /> What "free" actually means here
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed" style={{ fontFamily: "DM Sans" }}>
              <p className="text-zinc-300"><span className="text-zinc-100 font-semibold">License: </span>{licenseLabel(tool)}</p>
              <p className="text-zinc-300"><span className="text-zinc-100 font-semibold">Free tier: </span>{tool.freeTier}</p>
              {tool.paywall && (
                <p className="text-zinc-300"><span className="text-amber-300 font-semibold">Watch out: </span>{tool.paywall}</p>
              )}
              <p className="text-zinc-400 flex items-start gap-2">
                <Monitor className="h-4 w-4 shrink-0 mt-1 text-zinc-500" />
                <span><span className="text-zinc-200 font-medium">Platforms: </span>{tool.platforms.join(" · ")}</span>
              </p>
              {tool.flags && tool.flags.length > 0 && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-4 space-y-2">
                  {tool.flags.map((flag, i) => (
                    <p key={i} className="text-amber-200/90 text-sm flex gap-2 items-start">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> {flag}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center rounded-2xl border border-[oklch(0.78_0.16_85/25%)] bg-gradient-to-b from-[oklch(0.78_0.16_85/8%)] to-transparent p-8 sm:p-10"
          >
            <h2 className="text-2xl font-bold text-zinc-100 mb-3" style={{ fontFamily: "Space Grotesk" }}>
              Get {tool.name}
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto" style={{ fontFamily: "DM Sans" }}>
              Download from the official source — never a sketchy mirror. We link the real thing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={tool.downloadUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
                <Download className="h-5 w-5" /> Download free
              </a>
              <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                Official site <ExternalLink className="h-4 w-4" />
              </a>
              {tool.githubUrl && (
                <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </motion.div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6" style={{ fontFamily: "Space Grotesk" }}>
                More for your lane
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link key={r.slug} href={`/free-software/${r.slug}`}>
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[oklch(0.78_0.16_85/45%)] transition-all cursor-pointer">
                      <div className="aspect-video bg-black/40 overflow-hidden">
                        <img src={r.screenshot} alt={`${r.name} screenshot`} loading="lazy"
                             className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                             onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-zinc-100 mb-1" style={{ fontFamily: "Space Grotesk" }}>{r.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[oklch(0.85_0.14_85)] text-[13px] font-semibold">
                          Read review <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
