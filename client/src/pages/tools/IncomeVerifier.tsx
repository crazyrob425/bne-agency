import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { CreditCard, FileText, Download, Printer, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function IncomeVerifier() {
  const [businessName, setBusinessName] = useState("VibeScale Media LLC");
  const [monthlyIncome, setMonthlyIncome] = useState(6500);
  const [payPeriod, setPayPeriod] = useState("Monthly");
  const [jobTitle, setJobTitle] = useState("Digital Creator & Producer");
  const [businessAddress, setBusinessAddress] = useState("100 Pine St, Suite 1250, San Francisco, CA 94111");
  const [employeeName, setEmployeeName] = useState("Ashley Vance");
  const [employeeAddress, setEmployeeAddress] = useState("452 Oak Ave, Apartment 4B, Oakland, CA 94609");
  
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Math conversions based on pay period
  let grossPay = 0;
  let periodsPerYear = 12;
  let elapsedPeriods = 6; // Assume middle of the year (June 2026) for YTD calculations

  if (payPeriod === "Monthly") {
    grossPay = monthlyIncome;
    periodsPerYear = 12;
    elapsedPeriods = 6;
  } else if (payPeriod === "Biweekly") {
    grossPay = (monthlyIncome * 12) / 26;
    periodsPerYear = 26;
    elapsedPeriods = 13;
  } else if (payPeriod === "Weekly") {
    grossPay = (monthlyIncome * 12) / 52;
    periodsPerYear = 52;
    elapsedPeriods = 26;
  }

  // Deductions percentages
  const fitRate = 0.12; // 12% Federal Income Tax
  const ssRate = 0.062; // 6.2% Social Security
  const medRate = 0.0145; // 1.45% Medicare
  const stateRate = 0.05; // 5.0% State Income Tax

  // Deductions calculations
  const fit = grossPay * fitRate;
  const ss = grossPay * ssRate;
  const med = grossPay * medRate;
  const stateTax = grossPay * stateRate;
  const totalDeductions = fit + ss + med + stateTax;
  const netPay = grossPay - totalDeductions;

  // YTD Calculations
  const ytdGross = grossPay * elapsedPeriods;
  const ytdFit = fit * elapsedPeriods;
  const ytdSs = ss * elapsedPeriods;
  const ytdMed = med * elapsedPeriods;
  const ytdState = stateTax * elapsedPeriods;
  const ytdDeductions = totalDeductions * elapsedPeriods;
  const ytdNet = netPay * elapsedPeriods;

  // Pay period dates (simulated for June 2026)
  const payDate = "June 15, 2026";
  const periodStart = payPeriod === "Monthly" ? "May 01, 2026" : payPeriod === "Biweekly" ? "May 25, 2026" : "June 08, 2026";
  const periodEnd = payPeriod === "Monthly" ? "May 31, 2026" : payPeriod === "Biweekly" ? "June 07, 2026" : "June 14, 2026";

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasGenerated(true);
      toast.success("Pay stub generated successfully!");
    }, 800);
  };

  const handleCopy = () => {
    const text = `
PAY STUB SUMMARY:
Employer: ${businessName}
Employer Address: ${businessAddress}
Employee: ${employeeName}
Employee Address: ${employeeAddress}
Job Title: ${jobTitle}
Pay Period: ${periodStart} to ${periodEnd}
Pay Date: ${payDate}

Gross Pay: $${grossPay.toFixed(2)}
FIT Deduction: -$${fit.toFixed(2)}
Social Security: -$${ss.toFixed(2)}
Medicare: -$${med.toFixed(2)}
State Tax: -$${stateTax.toFixed(2)}
Net Pay: $${netPay.toFixed(2)}

YTD Gross: $${ytdGross.toFixed(2)}
YTD Deductions: $${ytdDeductions.toFixed(2)}
YTD Net Pay: $${ytdNet.toFixed(2)}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Pay stub summary copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Dynamic style tag for clean browser printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-paystub, #printable-paystub * {
            visibility: visible;
          }
          #printable-paystub {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            padding: 20px !important;
          }
        }
      `}</style>
      
      <Navigation />
      
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
              <CreditCard className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">Professional Income Verifier</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Professional<br />
              <span className="text-blue-400">Proof of Income</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Generate bank-ready pay stubs and income verification documents that stand up to scrutiny from lenders, landlords, and financial institutions.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Income Form - 2 Columns */}
          <div className="lg:col-span-2 border border-slate-800 rounded-xl p-6 bg-slate-900/40 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Income Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Legal Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  placeholder="LLC or Corporate Entity"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Business Address</label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Employer physical address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Monthly Income ($)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Pay Period</label>
                  <select
                    value={payPeriod}
                    onChange={(e) => setPayPeriod(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Monthly</option>
                    <option>Biweekly</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Content Producer / Strategy Consultant"
                />
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-300">Employee Details</h3>
                
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Employee Full Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Employee Home Address</label>
                  <input
                    type="text"
                    value={employeeAddress}
                    onChange={(e) => setEmployeeAddress(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <FileText size={16} />
                {isLoading ? "Running calculations..." : "Generate Pay Stub"}
              </motion.button>
            </div>
          </div>

          {/* Document Preview - 3 Columns */}
          <div className="lg:col-span-3">
            <div className="border border-blue-500/30 rounded-xl p-6 bg-blue-500/5 min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-400 font-display">Document Preview</h2>
                  {hasGenerated && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold"
                      >
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={handlePrint}
                        className="p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold"
                      >
                        <Printer size={13} />
                        Print
                      </button>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-24 text-center space-y-3"
                    >
                      <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-slate-400 font-body">Generating compliant financial earnings report...</p>
                    </motion.div>
                  ) : hasGenerated ? (
                    <motion.div
                      key="document"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      id="printable-paystub"
                      className="bg-zinc-100 text-zinc-900 p-6 rounded-lg shadow-inner font-mono text-[10px] leading-relaxed border border-zinc-300"
                    >
                      {/* Employer and Employee Info block */}
                      <div className="grid grid-cols-2 gap-4 border-b-2 border-zinc-800 pb-3 mb-4">
                        <div>
                          <p className="font-bold text-xs">{businessName.toUpperCase()}</p>
                          <p className="text-zinc-600">{businessAddress}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xs">EARNINGS STATEMENT</p>
                          <p className="text-zinc-600">PAY DATE: {payDate.toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-[9px]">
                        <div>
                          <p className="font-bold text-zinc-500">EMPLOYEE NAME & ADDRESS:</p>
                          <p className="font-semibold">{employeeName.toUpperCase()}</p>
                          <p className="text-zinc-600">{employeeAddress}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-right">
                          <div>
                            <p className="text-zinc-500">PERIOD START:</p>
                            <p className="font-semibold">{periodStart}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500">PERIOD END:</p>
                            <p className="font-semibold">{periodEnd}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500">JOB TITLE:</p>
                            <p className="font-semibold">{jobTitle.toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500">PAY FREQUENCY:</p>
                            <p className="font-semibold">{payPeriod.toUpperCase()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Earnings Table */}
                      <div className="border-t-2 border-zinc-800 pt-3">
                        <table className="w-full text-left text-[9px] mb-4">
                          <thead>
                            <tr className="border-b border-zinc-400 font-bold text-zinc-600">
                              <th className="pb-1">INCOME TYPE</th>
                              <th className="pb-1">RATE</th>
                              <th className="pb-1">HOURS</th>
                              <th className="pb-1 text-right">CURRENT GROSS</th>
                              <th className="pb-1 text-right">YTD GROSS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="font-semibold">
                              <td className="py-1">Regular Earnings</td>
                              <td className="py-1">${grossPay.toFixed(2)}</td>
                              <td className="py-1">Salary</td>
                              <td className="py-1 text-right">${grossPay.toFixed(2)}</td>
                              <td className="py-1 text-right">${ytdGross.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Deductions Table */}
                      <div className="border-t border-zinc-400 pt-3">
                        <table className="w-full text-left text-[9px] mb-4">
                          <thead>
                            <tr className="border-b border-zinc-400 font-bold text-zinc-600">
                              <th className="pb-1">TAX DEDUCTION</th>
                              <th className="pb-1 text-right">CURRENT DEd.</th>
                              <th className="pb-1 text-right">YTD DED.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-1">Fed Income Tax (FIT)</td>
                              <td className="py-1 text-right">-${fit.toFixed(2)}</td>
                              <td className="py-1 text-right">-${ytdFit.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="py-1">FICA Social Security</td>
                              <td className="py-1 text-right">-${ss.toFixed(2)}</td>
                              <td className="py-1 text-right">-${ytdSs.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="py-1">FICA Medicare</td>
                              <td className="py-1 text-right">-${med.toFixed(2)}</td>
                              <td className="py-1 text-right">-${ytdMed.toFixed(2)}</td>
                            </tr>
                            <tr className="border-b border-zinc-300">
                              <td className="py-1">State Tax Withholding</td>
                              <td className="py-1 text-right">-${stateTax.toFixed(2)}</td>
                              <td className="py-1 text-right">-${ytdState.toFixed(2)}</td>
                            </tr>
                            <tr className="font-semibold text-zinc-600">
                              <td className="py-1.5">Total Deductions</td>
                              <td className="py-1.5 text-right">-${totalDeductions.toFixed(2)}</td>
                              <td className="py-1.5 text-right">-${ytdDeductions.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Summary Block */}
                      <div className="border-t-2 border-zinc-800 pt-3 flex justify-between items-center bg-zinc-200/60 p-3 rounded font-bold text-xs">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-normal uppercase tracking-wider block">Check No: {1000 + elapsedPeriods}</span>
                          <span>NET PAY STATEMENT</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-500 font-normal uppercase tracking-wider block">CURRENT NET</span>
                          <span className="text-emerald-700 text-sm font-black">${netPay.toFixed(2)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-500 font-normal uppercase tracking-wider block">YTD NET PAY</span>
                          <span className="text-zinc-700 text-sm font-black">${ytdNet.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center py-16"
                    >
                      <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm font-body">Your generated pay stub will appear here</p>
                      <p className="text-slate-600 text-xs mt-2 font-body">Fill out the legal name, job title, monthly income, and click generate to view earnings breakdowns and YTD totals.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hasGenerated && (
                <div className="mt-4 text-[10px] text-slate-500 text-center font-body">
                  Compliance Notice: Pay stubs are generated for professional reference. Ensure calculations align with your state tax rates before submitting to financial institutions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
