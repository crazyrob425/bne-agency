import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaCatalog, CourseData, MediaCatalogItem } from "@/hooks/useMediaCatalog";
import { articles, Article } from "@/data/blogArticles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import { Link } from "wouter";
import {
  Crown, Shield, BookOpen, Printer, Download, Sparkles,
  ChevronRight, Play, FileText, ArrowRight, ExternalLink,
  ChevronDown, HelpCircle, CheckCircle
} from "lucide-react";

export default function University() {
  const { getCourses, loading, error } = useMediaCatalog();
  const courses = getCourses();

  const [activeCourseId, setActiveCourseId] = useState<string>("legal-privacy");
  const [selectedPrintItem, setSelectedPrintItem] = useState<MediaCatalogItem | null>(null);

  // Filter blog articles for courses dynamically based on keywords
  const getCourseArticles = (keywords: string[]): Article[] => {
    return articles.filter((article) => {
      const matchText = (article.title + " " + article.subtitle + " " + article.content + " " + article.category).toLowerCase();
      return keywords.some((kw) => matchText.includes(kw.toLowerCase()));
    }).slice(0, 3); // Limit to top 3 relevant articles
  };

  const handlePrint = (itemUrl: string, title: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print - ${title}</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: white;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            @media print {
              body { margin: 0; }
              img {
                max-width: 100%;
                max-height: 100%;
                page-break-after: avoid;
              }
            }
          </style>
        </head>
        <body>
          <img src="${itemUrl}" />
          <script>
            // Wait for image to load before printing
            const img = document.querySelector('img');
            if (img.complete) {
              window.print();
              setTimeout(() => window.close(), 500);
            } else {
              img.onload = () => {
                window.print();
                setTimeout(() => window.close(), 500);
              };
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const activeCourse = courses.find((c) => c.id === activeCourseId);

  const universitySchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Blacklisted University Masterclass",
    "description": "Video lectures and guides covering audience psychology, sovereign legal privacy, § 2257 compliance guidelines, and operations scaling.",
    "provider": {
      "@type": "Organization",
      "name": "Blacklisted Niche Entertainment",
      "sameAs": "https://blacklisted.studio"
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.04_0.005_85)] text-foreground">
      <Seo pageKey="university" schema={universitySchema} />
      <Navigation />

      {/* Hero / Ivy League Welcome */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-[oklch(0.78_0.16_85/10%)]">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.16_85/4%)] via-transparent to-[oklch(0.72_0.12_85/3%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[oklch(0.78_0.16_85/5%)] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[oklch(0.78_0.16_85/8%)] border border-[oklch(0.78_0.16_85/20%)] mb-6 glow-gold-sm">
              <Crown className="h-4 w-4 text-[oklch(0.78_0.16_85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_85)] font-body">
                Blacklisted University (B.U.)
              </span>
            </div>
            
            <h1 className="heading-xl text-[oklch(0.94_0.01_85)] mb-4 max-w-4xl mx-auto">
              The Only Ivy League Where <br />
              <span className="gradient-text-gold">Misbehaving Pays the Bills</span>
            </h1>

            <p className="text-[oklch(0.65_0.012_85)] text-lg max-w-3xl mx-auto mb-8 font-body leading-relaxed">
              Welcome to the Dean's Desk. We don't do useless theory or grade-inflated homework here. 
              Our curriculum is engineered around one standard: **maximizing your income while minimizing your labor.** 
              Learn the business, master the psychology, lock down your privacy, and let BNE build your empire.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[oklch(0.58_0.015_85)] font-mono-lux">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[oklch(0.78_0.16_85)]" />
                <span>4 Core Specializations</span>
              </div>
              <span className="text-zinc-800">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[oklch(0.78_0.16_85)]" />
                <span>Dynamic Media & Lectures</span>
              </div>
              <span className="text-zinc-800">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[oklch(0.78_0.16_85)]" />
                <span>CPA-Approved Tax Blueprints</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Course Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="space-y-3 lg:sticky lg:top-24">
            <h3 className="text-[oklch(0.58_0.015_85)] text-xs font-bold tracking-widest uppercase mb-4 px-3 font-body">
              Course Catalog
            </h3>
            <div className="flex flex-col gap-2">
              {courses.map((course) => {
                const isActive = course.id === activeCourseId;
                return (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourseId(course.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                      isActive
                        ? "bg-[oklch(0.78_0.16_85/8%)] border-[oklch(0.78_0.16_85/30%)] text-[oklch(0.78_0.16_85)]"
                        : "bg-[oklch(0.06_0.005_85)] border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-mono-lux tracking-wider opacity-65 uppercase">
                      {course.id.replace("-", " ")}
                    </span>
                    <span className="font-bold font-display text-sm leading-tight">
                      {course.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* General Advice Banner */}
            <div className="rounded-xl border border-white/5 bg-[oklch(0.78_0.16_85/2%)] p-4 mt-6 hidden lg:block">
              <HelpCircle size={16} className="text-[oklch(0.78_0.16_85)] mb-2" />
              <h4 className="text-xs font-bold text-zinc-300 font-display">Need Custom Guidance?</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-body">
                Our managers are on call to run custom revenue math and private setups for qualified partners.
              </p>
              <Link href="/onboarding">
                <span className="text-xs text-[oklch(0.78_0.16_85)] font-semibold flex items-center gap-1 mt-3 cursor-pointer hover:underline">
                  Apply for Consult <ArrowRight size={10} />
                </span>
              </Link>
            </div>
          </aside>

          {/* Active Course Details */}
          <main className="space-y-10">
            {loading ? (
              <div className="glass-card p-12 text-center text-zinc-400 font-body">
                Sychronizing Course syllabus...
              </div>
            ) : error ? (
              <div className="glass-card p-12 text-center text-red-400 font-body">
                {error}
              </div>
            ) : activeCourse ? (
              <motion.div
                key={activeCourse.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Course Intro Card */}
                <div className="luxury-card p-8 border-[oklch(0.78_0.16_85/15%)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-[oklch(0.78_0.16_85/3%)] blur-2xl rounded-full pointer-events-none" />
                  
                  <span className="text-[oklch(0.78_0.16_85)] text-xs font-bold font-mono-lux tracking-widest uppercase">
                    Core Specialization Syllabus
                  </span>
                  
                  <h2 className="text-3xl font-black text-zinc-100 font-display mt-2 mb-4">
                    {activeCourse.title}
                  </h2>
                  
                  <p className="text-zinc-400 font-body leading-relaxed mb-6">
                    {activeCourse.description}
                  </p>

                  <div className="p-5 rounded-xl bg-[oklch(0.78_0.16_85/4%)] border border-[oklch(0.78_0.16_85/10%)]">
                    <p className="text-zinc-300 italic font-body text-sm leading-relaxed">
                      "BU Syllabus: {activeCourse.tabooPitch}"
                    </p>
                  </div>
                </div>

                {/* Course Lectures (Videos) */}
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-zinc-200 font-display flex items-center gap-2 border-b border-white/5 pb-2">
                    <Play size={18} className="text-[oklch(0.78_0.16_85)]" />
                    Course Lectures
                  </h3>

                  {activeCourse.videos.length === 0 ? (
                    <div className="glass-card p-8 text-center text-zinc-500 font-body text-sm">
                      No video lectures dynamically indexed for this course yet.
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                      {activeCourse.videos.map((video) => (
                        <div key={video.id} className="space-y-3">
                          <VideoPlayer
                            src={video.url}
                            title={video.title}
                            description={video.description}
                          />
                          <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-zinc-500 font-mono-lux">{video.format} &bull; {video.sizeLabel}</span>
                            <a
                              href={video.url}
                              download
                              className="text-[oklch(0.78_0.16_85)] hover:underline flex items-center gap-1"
                            >
                              <Download size={12} /> Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Library (Required Reading / Blog Posts) */}
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-zinc-200 font-display flex items-center gap-2 border-b border-white/5 pb-2">
                    <BookOpen size={18} className="text-[oklch(0.78_0.16_85)]" />
                    Library (Required Reading)
                  </h3>

                  {getCourseArticles(activeCourse.keywords).length === 0 ? (
                    <div className="glass-card p-8 text-center text-zinc-500 font-body text-sm">
                      No library materials indexed for this course yet.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {getCourseArticles(activeCourse.keywords).map((article) => (
                        <Link key={article.id} href={`/blog/${article.slug}`}>
                          <div className="luxury-card-sm p-5 hover:border-[oklch(0.78_0.16_85/30%)] transition-all cursor-pointer flex flex-col justify-between h-full group">
                            <div>
                              <span className="text-[10px] font-bold text-[oklch(0.78_0.16_85)] uppercase tracking-wider block mb-2 font-mono-lux">
                                {article.category}
                              </span>
                              <h4 className="text-zinc-200 font-bold font-display text-sm group-hover:text-zinc-100 line-clamp-2">
                                {article.title}
                              </h4>
                              <p className="text-zinc-500 text-xs mt-2 line-clamp-3 font-body">
                                {article.excerpt}
                              </p>
                            </div>
                            <div className="text-xs text-[oklch(0.78_0.16_85)] font-semibold mt-4 flex items-center gap-1 group-hover:underline">
                              Read Chapter <ExternalLink size={10} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Print Shop (Flyers & Marketing assets) */}
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-zinc-200 font-display flex items-center gap-2 border-b border-white/5 pb-2">
                    <Printer size={18} className="text-[oklch(0.78_0.16_85)]" />
                    Print Shop (Course Flyers & Guides)
                  </h3>

                  {activeCourse.printMaterials.length === 0 ? (
                    <div className="glass-card p-8 text-center text-zinc-500 font-body text-sm">
                      No print materials dynamically indexed for this course yet.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {activeCourse.printMaterials.map((item) => (
                        <div
                          key={item.id}
                          className="luxury-card-sm p-4 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="aspect-[4/3] rounded-xl bg-black/60 border border-white/5 flex items-center justify-center mb-3 overflow-hidden">
                              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-zinc-200 font-bold font-display text-xs line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-zinc-500 text-[11px] mt-1.5 line-clamp-2 font-body">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handlePrint(item.url, item.title)}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[oklch(0.78_0.16_85)] text-slate-950 text-xs font-semibold hover:bg-[oklch(0.72_0.12_85)] transition-colors"
                            >
                              <Printer size={12} /> Print Flyer
                            </button>
                            <a
                              href={item.url}
                              download
                              className="px-3 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all flex items-center justify-center"
                              title="Download Asset"
                            >
                              <Download size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exclusive Upsell Callout */}
                <div className="luxury-card p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-between relative z-10">
                    <div className="space-y-2 text-left">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono-lux tracking-wider uppercase">
                        Associated Advisory Service
                      </span>
                      <h4 className="text-zinc-200 font-bold font-display text-lg">
                        {activeCourse.upsellTitle}
                      </h4>
                      <p className="text-zinc-500 text-xs font-body max-w-xl leading-relaxed">
                        {activeCourse.upsellDesc}
                      </p>
                    </div>

                    <Link href={activeCourse.upsellLink}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-gold px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap"
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {activeCourse.upsellButton}
                        <ChevronRight size={14} />
                      </motion.button>
                    </Link>
                  </div>
                </div>

              </motion.div>
            ) : null}
          </main>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
