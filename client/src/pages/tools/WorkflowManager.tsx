import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, ChevronRight, Zap, Users, Camera, MessageSquare, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function WorkflowManager() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Workflow & Burnout Manager
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              The Hidden Labor<br />
              <span className="text-amber-400">Nobody Warns You About</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              20+ hours per week of admin work separate successful creators from dreamers. See exactly what
              goes into running a profitable operation — and how BNE eliminates 85% of it.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 space-y-16">
        {/* Weekly Breakdown */}
        <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
          <h2 className="text-xl font-semibold text-white mb-6">Weekly Time Investment</h2>
          <div className="space-y-3">
            {[
              { task: "Content Creation", hours: 10, icon: Camera },
              { task: "DM Management & PPV", hours: 8, icon: MessageSquare },
              { task: "Social Media Posting", hours: 4, icon: Calendar },
              { task: "Analytics & Strategy", hours: 3, icon: BarChart3 },
              { task: "Customer Service", hours: 5, icon: Users },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-slate-300">{item.task}</span>
                  </div>
                  <span className="text-amber-400 font-semibold">{item.hours} hrs/week</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-slate-700 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">Total Weekly Investment</span>
              <span className="text-amber-400 font-bold text-xl">30 hrs/week</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-slate-900 p-8 md:p-12 text-center"
        >
<h2 className="font-display text-2xl font-bold text-slate-100 mb-3">
             That's 30 Hours Every Week<br />
             <span className="text-violet-400">Just to Stay Even</span>
           </h2>
           <p className="text-slate-400 max-w-xl mx-auto mb-6">
             BNE handles everything except content creation: DMs, scheduling, fan retention, marketing,
             analytics, and compliance. That's 25+ hours per week you get back.
           </p>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors"
            >
              Apply for Management <ChevronRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}