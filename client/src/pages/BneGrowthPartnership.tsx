/**
 * B.N.E. Growth Partnership Page
 * Explains the revenue sharing model and value proposition.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  Shield, Zap, Users, DollarSign, Lock, BarChart3,
  Headphones, FileText, Star, ArrowRight, Sparkles,
  Briefcase, Settings, BookOpen, TrendingUp, CheckCircle
} from "lucide-react";

export default function BneGrowthPartnership() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="The B.N.E. Growth Partnership"
        description="We only win when you win. Learn about our alignment-based partnership model for serious creators. We invest our systems, expertise, and infrastructure into your growth."
        canonical="/bne-growth-partnership"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mt-3 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              We Only Win When You Win
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'DM Sans' }}>
              We believe great partnerships are built on alignment, commitment, performance, and shared success. If B.N.E. Studio chooses to work with you, we are investing time, systems, expertise, labor, support, education, strategy, research, and infrastructure into your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Placeholder for detailed sections */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-zinc-200 mb-4">Why The Model Exists</h2>
          <p className="text-zinc-400 mb-8">Content for this section will be populated by repurposing existing assets...</p>

          <h2 className="text-3xl font-bold text-zinc-200 mb-4">What B.N.E. Actually Does</h2>
          <p className="text-zinc-400 mb-8">A detailed breakdown of our comprehensive services is being developed here...</p>

          <h2 className="text-3xl font-bold text-zinc-200 mb-4">Revenue Sharing</h2>
          <p className="text-zinc-400 mb-8">An explanation of our alignment-based financial models is under construction...</p>

          <h2 className="text-3xl font-bold text-zinc-200 mb-4">Application Review Process</h2>
          <p className="text-zinc-400 mb-8">Details on our selective partnership criteria are being drafted...</p>

          <h2 className="text-3xl font-bold text-zinc-200 mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400 mb-8">A comprehensive FAQ section with over 25 questions is being built here...</p>

          <Link href="/apply">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold"
            >
              Apply to B.N.E.
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}