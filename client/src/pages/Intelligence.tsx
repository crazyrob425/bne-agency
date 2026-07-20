/**
 * B.N.E. Intelligence Hub Page
 * The central place for all articles, analysis, and industry trends.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { BookOpen, Layers, TrendingUp, Search, ArrowRight } from "lucide-react";
import { articles, getFeaturedArticles } from "@/data/blogArticles";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

export default function Intelligence() {
  const featured = getFeaturedArticles(3);

  const intelligenceSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "B.N.E. Intelligence Hub",
    "url": "https://www.blacklisted.studio/intelligence",
    "description": "The B.N.E. Studio Intelligence Hub. Access our complete library of articles, industry analysis, trend reports, and case studies on the creator economy.",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Intelligence Hub | B.N.E. Studio"
        description="Access the B.N.E. Intelligence Hub for articles, industry analysis, trend reports, and case studies on the creator economy."
        canonical="/intelligence"
        schema={intelligenceSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 mb-6">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 mono-stat">Intelligence Hub</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              The Knowledge That Powers Empires
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              This is our open-source brain trust. A curated library of industry analysis, strategic playbooks, and trend reports from the front lines of the creator economy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-zinc-100">Featured Intelligence</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <motion.div key={article.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Link href={`/blog/${article.slug}`}>
                  <div className="glass-card p-6 border border-white/8 h-full group cursor-pointer hover:border-blue-500/30 transition-colors">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mono-stat mb-2 block">{article.category}</span>
                    <h3 className="text-md font-bold text-zinc-100 mb-2 group-hover:text-blue-300" style={{ fontFamily: 'Space Grotesk' }}>{article.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-12">
            <Link href="/blog">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold-outline px-6 py-3 text-sm">
                Explore All {articles.length} Articles
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Graphic Placeholder */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              [Placeholder for AI-generated graphic from pollination.ai: A futuristic, dark-themed image of a 'war room' or 'command center'. It should feature holographic displays showing data visualizations, market trends, and network graphs, all in the B.N.E. gold and violet color scheme, representing the 'Intelligence Hub'.]
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}