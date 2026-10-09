import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, type ReactElement } from "react";
import { CreditCard, FileText, Printer, Copy, Check, CalendarDays, Layers, Palette } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { computeStubs, PERIODS_PER_YEAR, type PayFrequency, type PayStub, fmtDate, fmtMoney } from "@/lib/payroll/engine";
import { STATE_CODES, STATE_PROFILES } from "@/lib/payroll/states";
import type { StubRenderProps } from "@/components/paystub/themeUtils";
import AdpTheme from "@/components/paystub/themes/AdpTheme";
import GustoTheme from "@/components/paystub/themes/GustoTheme";
import QuickBooksTheme from "@/components/paystub/themes/QuickBooksTheme";
import PaychexTheme from "@/components/paystub/themes/PaychexTheme";
import RipplingTheme from "@/components/paystub/themes/RipplingTheme";

type ThemeId = 'adp' | 'gusto' | 'quickbooks' | 'paychex' | 'rippling';

const THEMES: Array<{ id: ThemeId; name: string; blurb: string; swatch: string }> = [
  { id: 'adp', name: 'ADP Classic', blurb: 'The iconic American check stub — typewriter mono, earnings statement + check voucher', swatch: '#111111' },
  { id: 'gusto', name: 'Gusto Modern', blurb: 'Clean modern earnings statement — coral accents, employee/employer tax columns', swatch: '#F45D48' },
  { id: 'quickbooks', name: 'QuickBooks Voucher', blurb: 'Dense utilitarian accounting voucher — company info top and bottom', swatch: '#2CA01C' },
  { id: 'paychex', name: 'Paychex Flex', blurb: 'Corporate blue header band, crisp tables, net-pay summary band', swatch: '#005EB8' },
  { id: 'rippling', name: 'Rippling Minimal', blurb: 'Stark black-on-white digital pay statement, ultra-clean', swatch: '#000000' },
];

const THEME_COMPONENTS: Record<ThemeId, (p: StubRenderProps) => ReactElement> = {
  adp: AdpTheme,
  gusto: GustoTheme,
  quickbooks: QuickBooksTheme,
  paychex: PaychexTheme,
  rippling: RipplingTheme,
};

const FREQUENCIES: PayFrequency[] = ['Monthly', 'Semimonthly', 'Biweekly', 'Weekly'];

const inputCls = "w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500";
const labelCls = "text-sm text-slate-300 mb-1 block";

function parseDateInput(v: string): Date {
  const [y, m, d] = v.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function IncomeVerifier() {
  const [businessName, setBusinessName] = useState("VibeScale Media LLC");
  const [businessAddress, setBusinessAddress] = useState("100 Pine St, Suite 1250, San Francisco, CA 94111");
  const [employeeName, setEmployeeName] = useState("Ashley Vance");
  const [employeeAddress, setEmployeeAddress] = useState("452 Oak Ave, Apartment 4B, Oakland, CA 94609");
  const [jobTitle, setJobTitle] = useState("Digital Creator & Producer");
  const [monthlyIncome, setMonthlyIncome] = useState(6500);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("Monthly");
  const [workState, setWorkState] = useState("CA");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [stubCount, setStubCount] = useState(3);
  const [vacationPerPeriod, setVacationPerPeriod] = useState(0);
  const [themeId, setThemeId] = useState<ThemeId>('gusto');

  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const stubs: PayStub[] = useMemo(() => {
    if (!hasGenerated) return [];
    try {
      return computeStubs({
        startDate: parseDateInput(startDate),
        frequency: payFrequency,
        stubCount,
        monthlyGross: Math.max(0, monthlyIncome),
        state: workState,
        vacationHoursPerPeriod: Math.max(0, vacationPerPeriod),
      });
    } catch {
      return [];
    }
  }, [hasGenerated, startDate, payFrequency, stubCount, monthlyIncome, workState, vacationPerPeriod]);

  const stateName = STATE_PROFILES[workState]?.name ?? workState;
  const ThemeComponent = THEME_COMPONENTS[themeId];

  const handleGenerate = () => {
    if (!startDate) { toast.error("Pick a start date first."); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasGenerated(true);
      toast.success(`${stubCount} pay stub${stubCount > 1 ? 's' : ''} generated with 2026 tax tables.`);
    }, 800);
  };

  const handleCopy = () => {
    const text = stubs.map((s) => {
      const lines = [
        `PAY STUB ${s.index}/${stubs.length} — ${businessName}`,
        `Employee: ${employeeName} | ${employeeAddress}`,
        `Period: ${fmtDate(s.periodStart)} to ${fmtDate(s.periodEnd)} | Pay Date: ${fmtDate(s.payDate)} | Check #${s.checkNumber}`,
        `Gross: $${fmtMoney(s.gross)} (YTD $${fmtMoney(s.ytdGross)})`,
        ...s.deductions.map((d) => `  ${d.label}: -$${fmtMoney(d.current)} (YTD -$${fmtMoney(d.ytd)})`),
        `Net Pay: $${fmtMoney(s.net)} (YTD $${fmtMoney(s.ytdNet)})`,
        ...s.leave.map((l) => `  ${l.label}: accrued ${l.accruedThisPeriod.toFixed(2)}h, balance ${l.balance.toFixed(2)}h`),
      ];
      return lines.join('\n');
    }).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Pay stub summaries copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderProps = (s: PayStub): StubRenderProps => ({
    stub: s,
    businessName,
    businessAddress,
    employeeName,
    employeeAddress,
    jobTitle,
    frequency: payFrequency,
    stateName,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo pageKey="tools-income-verifier" />
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-stubs, #printable-stubs * { visibility: visible; }
          #printable-stubs { position: absolute; left: 0; top: 0; width: 100%; }
          .paystub-page { box-shadow: none !important; border: none !important; margin: 0 !important; page-break-after: always; }
          .paystub-page:last-child { page-break-after: auto; }
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
              Generate bank-ready pay stubs with real 2026 payroll math — IRS withholding tables,
              FICA wage-base tracking, all 50 states' tax rates, correct month lengths, federal
              holidays, and state sick-leave accruals. One stub or a chained set of 3 or 6.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-2 border border-slate-800 rounded-xl p-6 bg-slate-900/40 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Income Details</h2>

            <div>
              <label className={labelCls}>Legal Business Name</label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={inputCls} placeholder="LLC or Corporate Entity" />
            </div>
            <div>
              <label className={labelCls}>Business Address</label>
              <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className={inputCls} placeholder="Employer physical address" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Monthly Salary ($)</label>
                <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>Pay Frequency</label>
                <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value as PayFrequency)} className={inputCls}>
                  {FREQUENCIES.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Work State</label>
                <select value={workState} onChange={(e) => setWorkState(e.target.value)} className={inputCls}>
                  {STATE_CODES.map((c) => <option key={c} value={c}>{c} — {STATE_PROFILES[c].name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}><CalendarDays size={13} className="inline mr-1" />Start Date (YTD day one)</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}><Layers size={13} className="inline mr-1" />How many stubs?</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStubCount(n)}
                    className={`py-2.5 rounded-lg border text-sm font-bold transition-all cursor-pointer ${stubCount === n ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'}`}
                  >
                    {n} stub{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1.5">Multi-stub sets chain correctly — each stub's YTD builds on the last, taxes increasing period to period.</p>
            </div>

            <div>
              <label className={labelCls}>Job Title</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputCls} placeholder="e.g. Content Producer / Strategy Consultant" />
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300">Employee Details</h3>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Employee Full Name</label>
                <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Employee Home Address</label>
                <input type="text" value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Vacation Accrual (hours per pay period, 0 = none)</label>
                <input type="number" min={0} step={0.5} value={vacationPerPeriod} onChange={(e) => setVacationPerPeriod(Number(e.target.value))} className={`${inputCls} font-mono`} />
                <p className="text-xs text-slate-500 mt-1.5">Sick leave accrues automatically per {stateName} law. Vacation is employer policy.</p>
              </div>
            </div>

            <div>
              <label className={labelCls}><Palette size={13} className="inline mr-1" />Stub Design Theme</label>
              <div className="space-y-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${themeId === t.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800/60 hover:border-slate-600'}`}
                  >
                    <span className="w-8 h-8 rounded-md shrink-0 border border-white/10" style={{ background: t.swatch }} />
                    <span>
                      <span className="block text-sm font-bold text-white">{t.name}</span>
                      <span className="block text-xs text-slate-400">{t.blurb}</span>
                    </span>
                    {themeId === t.id && <Check size={16} className="ml-auto text-blue-400 shrink-0" />}
                  </button>
                ))}
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
              {isLoading ? "Running 2026 payroll calculations..." : `Generate ${stubCount} Pay Stub${stubCount > 1 ? 's' : ''}`}
            </motion.button>
            <p className="text-[11px] text-slate-500 text-center">
              {PERIODS_PER_YEAR[payFrequency]} pay periods/year · Federal: IRS Pub. 15-T (2026), single · FICA: SS wage base $184,500
            </p>
          </div>

          {/* Preview */}
          <div className="lg:col-span-3">
            <div className="border border-blue-500/30 rounded-xl p-6 bg-blue-500/5 min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400 font-display">Document Preview</h2>
                {hasGenerated && stubs.length > 0 && (
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer">
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button onClick={() => window.print()} className="p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer">
                      <Printer size={13} />
                      Print
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 text-center space-y-3">
                    <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-slate-400 font-body">Running 2026 federal, FICA, and {stateName} payroll calculations...</p>
                  </motion.div>
                ) : hasGenerated && stubs.length > 0 ? (
                  <motion.div key="document" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} id="printable-stubs" className="space-y-6">
                    {stubs.map((s) => (
                      <div key={s.index} className="paystub-page rounded-lg overflow-hidden shadow-2xl border border-zinc-300">
                        <ThemeComponent {...renderProps(s)} />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center py-16">
                    <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm font-body">Your generated pay stubs will appear here</p>
                    <p className="text-slate-600 text-xs mt-2 font-body">Pick a start date, stub count, work state, and theme — then generate.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {hasGenerated && (
              <div className="mt-4 text-[10px] text-slate-500 text-center font-body">
                Calculations use verified 2026 rates: IRS Pub. 15-T withholding (single), FICA (SS $184,500 × 6.2%, Medicare 1.45%), {stateName} 2026 brackets, and {stateName} sick-leave accrual law.
                Figures are estimates for reference — confirm with a payroll professional before filing.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
