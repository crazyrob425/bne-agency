import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Users, Clock, Shield, ChevronRight, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function CreatorCalculator() {
  const [subscribers, setSubscribers] = useState(500);
  const [subPrice, setSubPrice] = useState(9.99);
  const [ppvRevenue, setPpvRevenue] = useState(2500);
  const [tipsRevenue, setTipsRevenue] = useState(500);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [expenses, setExpenses] = useState(200);

  // Real-time calculations
  const grossSubRevenue = subscribers * subPrice;
  const grossRevenue = grossSubRevenue + ppvRevenue + tipsRevenue;
  const platformFee = grossRevenue * 0.20;
  const netPlatform = grossRevenue - platformFee;
  const netExpenses = netPlatform - expenses;
  const taxes = Math.max(0, netExpenses * 0.25);
  const takeHome = Math.max(0, netExpenses - taxes);
  
  const monthlyWorkHours = hoursPerWeek * 4;
  const hourlyRate = monthlyWorkHours > 0 ? Math.round(takeHome / monthlyWorkHours) : 0;

  // BNE projection: increase PPV/Tips by 50%, reduce hours to 3 hours/week (only content creation)
  const bneGrossRevenue = grossSubRevenue + (ppvRevenue + tipsRevenue) * 1.5;
  const bnePlatformFee = bneGrossRevenue * 0.20;
  // BNE management fee is 20%
  const bneManagementFee = bneGrossRevenue * 0.20;
  const bneNet = bneGrossRevenue - bnePlatformFee - bneManagementFee - expenses;
  const bneTaxes = Math.max(0, bneNet * 0.25);
  const bneTakeHome = Math.max(0, bneNet - bneTaxes);
  const bneHourlyRate = Math.round(bneTakeHome / (3 * 4)); // 3 hours/week with BNE

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo title="Creator Revenue Calculator — BNE Studio" description="Estimate your creator earnings across subscriptions, PPV, tips, and after-BNE projections with our all-in-one calculator." canonical="/creator-calculator" />
      <Navigation />
      
      {/* SEO intro: explain the calculator and how to use it */}
      <div className="container py-8">
        <article className="prose prose-invert max-w-3xl mx-auto text-slate-200">
          <h2>Creator Revenue Calculator — Realistic Projections & BNE Outcomes</h2>
          <p>
            This calculator helps creators forecast monthly revenue across subscriptions, PPV, tips, and estimated platform fees. Toggle the sliders to simulate real-world scenarios: conservative growth, current baseline, and the BNE-managed outcome. Use it to set realistic goals, plan content cadence, and compare the efficiency of self-managed versus professionally-managed operations.
          </p>
          <h3>What This Tool Includes</h3>
          <ul>
            <li>Subscription revenue (subscribers × price)</li>
            <li>One-time PPV & custom sales</li>
            <li>Tips & fan contributions</li>
            <li>Platform fees and management splits</li>
            <li>Estimated taxes and monthly expenses</li>
          </ul>
          <p>
            The calculator also shows a BNE projection where we model the effect of optimized PPV/pricing, improved funneling, and management-driven monetization. These projections are hypothetical but grounded in our operational data and case studies.
          </p>
        </article>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-slate-950 to-emerald-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
              <Calculator className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">All-in-One Calculator</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Stop <span className="text-violet-400">Guessing</span>.<br />
              Start <span className="text-emerald-400">Knowing</span>.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              The most sophisticated revenue projection tool in the industry. Calculates earnings across all platforms with taxes, expenses, and time investment factored in.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 space-y-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Your Numbers</h2>
              <p className="text-xs text-slate-500 mb-4">Adjust the values to see your potential earnings in real-time</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>OnlyFans Subscribers</span>
                  <span className="font-mono text-emerald-400 font-bold">{subscribers}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  value={subscribers}
                  onChange={(e) => setSubscribers(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>OF Subscription Price ($)</span>
                  <span className="font-mono text-emerald-400 font-bold">${subPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="49.99"
                  step="1"
                  value={subPrice}
                  onChange={(e) => setSubPrice(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>Monthly PPV Revenue ($)</span>
                  <span className="font-mono text-emerald-400 font-bold">${ppvRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="250"
                  value={ppvRevenue}
                  onChange={(e) => setPpvRevenue(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>Tips Revenue ($)</span>
                  <span className="font-mono text-emerald-400 font-bold">${tipsRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="100"
                  value={tipsRevenue}
                  onChange={(e) => setTipsRevenue(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>Hours/Week Managing Account</span>
                  <span className="font-mono text-emerald-400 font-bold">{hoursPerWeek} hrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="80"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1.5">
                  <span>Monthly Expenses ($)</span>
                  <span className="font-mono text-emerald-400 font-bold">${expenses.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer bg-slate-800 h-1.5 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Results Display Section */}
          <div className="space-y-6">
            <div className="border border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5 space-y-6">
              <h2 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                <TrendingUp size={20} />
                Your Estimated Earnings
              </h2>
              
              <div className="space-y-3.5">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Gross Revenue</span>
                  <span className="text-white font-bold font-mono">${Math.round(grossRevenue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>After 20% Platform Fee</span>
                  <span className="text-white font-bold font-mono">${Math.round(netPlatform).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>After Expenses</span>
                  <span className="text-white font-bold font-mono">${Math.round(netExpenses).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Estimated Taxes (25%)</span>
                  <span className="text-red-400 font-semibold font-mono">-${Math.round(taxes).toLocaleString()}</span>
                </div>
                
                <div className="border-t border-slate-700/60 pt-4 flex justify-between items-baseline">
                  <span className="text-slate-200 font-semibold">Take-Home Income</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-emerald-400 font-mono">${Math.round(takeHome).toLocaleString()}</span>
                    <span className="text-xs text-slate-500 block">/month</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-4 flex justify-between items-center text-sm text-slate-400">
                <span>Your Real Hourly Rate</span>
                <span className="text-white font-bold font-mono">${hourlyRate}/hr</span>
              </div>
            </div>

            {/* BNE Comparison Card */}
            <div className="border border-violet-500/30 rounded-xl p-6 bg-violet-500/5 space-y-4">
              <div className="flex items-center gap-2 text-violet-400 font-bold">
                <Zap className="h-5 w-5 fill-current" />
                <span>The BNE Advantage</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-body">
                Predatory agencies take a huge split and don't do the work. BNE automates your funnels, runs your chatters 24/7, and increases your PPV/tips conversion while reclaiming 90% of your labor.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">BNE Take-Home</span>
                  <span className="text-lg font-bold text-white font-mono">${Math.round(bneTakeHome).toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">BNE Hourly Rate</span>
                  <span className="text-lg font-bold text-violet-400 font-mono">${bneHourlyRate}/hr</span>
                </div>
              </div>
              
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>Estimated labor with BNE:</span>
                <span className="font-semibold text-slate-300">3 hrs/week (creative only)</span>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-slate-900 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">
            The Calculator Shows the Number.<br />
            <span className="text-violet-400">We Change It.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6 font-body text-sm">
            Every creator we work with ran the same calculation — then saw what those numbers look like 90 days into managed operations. Let BNE automate the admin work.
          </p>
          <Link href="/onboarding"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors" style={{ fontFamily: 'Space Grotesk' }}>Apply Now <ChevronRight className="h-4 w-4" /></motion.button></Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
