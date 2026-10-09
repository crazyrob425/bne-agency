import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, type ReactElement } from "react";
import { Landmark, FileText, Printer, Copy, Check, Plus, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import {
  generateStatement, DEFAULT_RECURRING, dollarsToCents, fmtCents, stubsToDeposits,
  type DepositInput, type RecurringExpense, type StatementResult, type StubHandoff,
  StatementError,
} from "@/lib/bankStatement/engine";
import { BANKS, getBank } from "@/lib/bankStatement/banks";
import type { StatementRenderProps } from "@/components/bankstatement/themeUtils";
import MeridianTheme from "@/components/bankstatement/themes/MeridianTheme";
import LibertyTheme from "@/components/bankstatement/themes/LibertyTheme";
import FrontierTheme from "@/components/bankstatement/themes/FrontierTheme";
import ApexTheme from "@/components/bankstatement/themes/ApexTheme";
import EvergreenTheme from "@/components/bankstatement/themes/EvergreenTheme";

const THEME_COMPONENTS: Record<string, (p: StatementRenderProps) => ReactElement> = {
  meridian: MeridianTheme,
  liberty: LibertyTheme,
  frontier: FrontierTheme,
  apex: ApexTheme,
  evergreen: EvergreenTheme,
};

const inputCls = "w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-blue-500";
const labelCls = "text-sm text-slate-300 mb-1 block";
const smallInput = "p-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-xs focus:outline-none focus:border-blue-500 w-full";

function parseDateInput(v: string): Date {
  const [y, m, d] = v.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function BankStatementGenerator() {
  const [holderName, setHolderName] = useState("Ashley Vance");
  const [holderAddress, setHolderAddress] = useState("452 Oak Ave, Apartment 4B, Oakland, CA 94609");
  const [accountLast4, setAccountLast4] = useState("4821");
  const [bankId, setBankId] = useState("meridian");
  const [periodStart, setPeriodStart] = useState("2026-01-01");
  const [periodEnd, setPeriodEnd] = useState("2026-01-31");
  const [startingBal, setStartingBal] = useState(3200);
  const [endingBal, setEndingBal] = useState(5100);

  const [deposits, setDeposits] = useState<DepositInput[]>([]);
  const [recurring, setRecurring] = useState<RecurringExpense[]>(DEFAULT_RECURRING);
  const [newDepDate, setNewDepDate] = useState("2026-01-15");
  const [newDepDesc, setNewDepDesc] = useState("");
  const [newDepAmt, setNewDepAmt] = useState(500);

  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [copied, setCopied] = useState(false);

  const bank = getBank(bankId);
  const ThemeComponent = THEME_COMPONENTS[bankId];

  const importFromStubs = () => {
    try {
      const raw = localStorage.getItem('paystub-handoff');
      if (!raw) { toast.error("No pay stubs found — generate stubs in the Income Verifier first."); return; }
      const stubs = JSON.parse(raw) as StubHandoff[];
      if (!stubs.length) { toast.error("No pay stubs found."); return; }
      const deps = stubsToDeposits(stubs);
      setDeposits((d) => [...d.filter((x) => x.source !== 'payroll'), ...deps]);
      toast.success(`Imported ${deps.length} payroll deposit(s) totaling $${fmtCents(deps.reduce((a, x) => a + x.amountCents, 0))}.`);
    } catch {
      toast.error("Couldn't read saved pay stubs.");
    }
  };

  const addDeposit = () => {
    if (!newDepDesc.trim() || newDepAmt <= 0) { toast.error("Give the deposit a description and amount."); return; }
    setDeposits((d) => [...d, {
      date: parseDateInput(newDepDate),
      description: newDepDesc.trim().toUpperCase(),
      amountCents: dollarsToCents(newDepAmt),
      source: 'manual',
    }]);
    setNewDepDesc("");
  };

  const updateRecurring = (id: string, patch: Partial<RecurringExpense>) => {
    setRecurring((r) => r.map((x) => x.id === id ? { ...x, ...patch } : x));
  };

  const result: StatementResult | null = useMemo(() => {
    if (!hasGenerated) return null;
    try {
      return generateStatement({
        holderName, holderAddress, accountLast4, bankId,
        periodStart: parseDateInput(periodStart),
        periodEnd: parseDateInput(periodEnd),
        startingBalanceCents: dollarsToCents(startingBal),
        endingBalanceCents: dollarsToCents(endingBal),
        deposits, recurring,
        seed: 42,
      });
    } catch {
      return null;
    }
  }, [hasGenerated, holderName, holderAddress, accountLast4, bankId, periodStart, periodEnd, startingBal, endingBal, deposits, recurring]);

  const handleGenerate = () => {
    setGenError("");
    if (!periodStart || !periodEnd) { setGenError("Pick a statement period."); return; }
    if (parseDateInput(periodEnd) < parseDateInput(periodStart)) { setGenError("End date is before start date."); return; }
    setIsLoading(true);
    setTimeout(() => {
      try {
        generateStatement({
          holderName, holderAddress, accountLast4, bankId,
          periodStart: parseDateInput(periodStart),
          periodEnd: parseDateInput(periodEnd),
          startingBalanceCents: dollarsToCents(startingBal),
          endingBalanceCents: dollarsToCents(endingBal),
          deposits, recurring, seed: 42,
        });
        setHasGenerated(true);
        toast.success("Statement generated and triple-checked.");
      } catch (e) {
        setGenError(e instanceof StatementError ? e.message : "Generation failed.");
      } finally {
        setIsLoading(false);
      }
    }, 700);
  };

  const handleCopy = () => {
    if (!result) return;
    const lines = [
      `BANK STATEMENT (SAMPLE) — ${bank.name}`,
      `${holderName} | ${holderAddress} | Acct ••••${accountLast4}`,
      `Period: ${periodStart} to ${periodEnd}`,
      `Beginning: $${fmtCents(result.startingBalanceCents)} | Deposits: $${fmtCents(result.totalDepositsCents)} | Withdrawals: $${fmtCents(result.totalWithdrawalsCents)} | Ending: $${fmtCents(result.endingBalanceCents)}`,
      ...result.verification.messages,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    toast.success("Statement summary copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderProps: StatementRenderProps | null = result ? {
    bank, statement: result, holderName, holderAddress, accountLast4,
    periodStart: parseDateInput(periodStart), periodEnd: parseDateInput(periodEnd),
  } : null;

  const totalDeposits = deposits.reduce((a, d) => a + d.amountCents, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo pageKey="tools-bank-statement-generator" />
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-stmt, #printable-stmt * { visibility: visible; }
          #printable-stmt { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
      <Navigation />

      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-blue-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <Landmark className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Bank Statement Generator</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Matching<br /><span className="text-emerald-400">Bank Statements</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Generate a fully reconciled sample bank statement. Import your pay-stub deposits so the
              payroll credits match to the cent, set your starting and ending balances, and the engine
              builds realistic transactions — rent, phone, internet, utilities, everyday spending —
              that land on your ending balance <em>exactly</em>, triple-checked.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-2 border border-slate-800 rounded-xl p-6 bg-slate-900/40 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Statement Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Account Holder</label>
                <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Acct Last 4</label>
                <input type="text" maxLength={4} value={accountLast4} onChange={(e) => setAccountLast4(e.target.value.replace(/\D/g, ''))} className={`${inputCls} font-mono`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Holder Address</label>
              <input type="text" value={holderAddress} onChange={(e) => setHolderAddress(e.target.value)} className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Period Start</label>
                <input type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Period End</label>
                <input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Starting Balance ($)</label>
                <input type="number" value={startingBal} onChange={(e) => setStartingBal(Number(e.target.value))} className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>Ending Balance ($)</label>
                <input type="number" value={endingBal} onChange={(e) => setEndingBal(Number(e.target.value))} className={`${inputCls} font-mono`} />
              </div>
            </div>

            {/* Deposits */}
            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-300">Deposits (${fmtCents(totalDeposits)})</h3>
                <button onClick={importFromStubs} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                  <Download size={13} /> Import pay-stub deposits
                </button>
              </div>
              <div className="space-y-1.5 mb-2 max-h-36 overflow-y-auto">
                {deposits.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-slate-800/60 rounded-lg px-2.5 py-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${d.source === 'payroll' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
                      {d.source === 'payroll' ? 'PAYROLL' : 'OTHER'}
                    </span>
                    <span className="text-slate-300 truncate flex-1">{d.description}</span>
                    <span className="font-mono text-emerald-300">${fmtCents(d.amountCents)}</span>
                    <button onClick={() => setDeposits((x) => x.filter((_, j) => j !== i))} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={12} /></button>
                  </div>
                ))}
                {deposits.length === 0 && <p className="text-xs text-slate-500">No deposits yet — import from pay stubs or add one below.</p>}
              </div>
              <div className="grid grid-cols-12 gap-1.5">
                <input type="date" value={newDepDate} onChange={(e) => setNewDepDate(e.target.value)} className={`col-span-4 ${smallInput}`} />
                <input type="text" placeholder="Description" value={newDepDesc} onChange={(e) => setNewDepDesc(e.target.value)} className={`col-span-5 ${smallInput}`} />
                <input type="number" placeholder="$" value={newDepAmt} onChange={(e) => setNewDepAmt(Number(e.target.value))} className={`col-span-2 ${smallInput} font-mono`} />
                <button onClick={addDeposit} className="col-span-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center cursor-pointer"><Plus size={14} /></button>
              </div>
            </div>

            {/* Recurring expenses */}
            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Recurring Expenses</h3>
              <div className="space-y-2">
                {recurring.map((r) => (
                  <div key={r.id} className="grid grid-cols-12 gap-1.5 items-center bg-slate-800/40 rounded-lg p-2">
                    <div className="col-span-3 text-xs text-slate-300 font-semibold">{r.label}</div>
                    <input type="text" value={r.merchant} onChange={(e) => updateRecurring(r.id, { merchant: e.target.value.toUpperCase() })} className={`col-span-4 ${smallInput}`} title="Merchant" />
                    <input type="number" value={r.amountCents / 100} onChange={(e) => updateRecurring(r.id, { amountCents: dollarsToCents(Number(e.target.value)) })} className={`col-span-3 ${smallInput} font-mono`} title="Amount $" />
                    <input type="number" min={1} max={28} value={r.dayOfMonth} onChange={(e) => updateRecurring(r.id, { dayOfMonth: Math.min(28, Math.max(1, Number(e.target.value))) })} className={`col-span-2 ${smallInput} font-mono`} title="Day of month" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">Rent, cell, internet, and utilities post on their day each month. Everyday spending is auto-generated to reconcile exactly.</p>
            </div>

            {/* Bank theme */}
            <div>
              <label className={labelCls}>Bank Style Theme</label>
              <div className="space-y-2">
                {BANKS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBankId(b.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${bankId === b.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-800/60 hover:border-slate-600'}`}
                  >
                    <span className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center text-white text-sm font-black" style={{ background: b.primary }}>{b.code.slice(0, 1)}</span>
                    <span>
                      <span className="block text-sm font-bold text-white">{b.name}</span>
                      <span className="block text-xs text-slate-400">{b.tagline}</span>
                    </span>
                    {bankId === b.id && <Check size={16} className="ml-auto text-emerald-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {genError && <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">{genError}</div>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <FileText size={16} />
              {isLoading ? "Reconciling to the penny..." : "Generate Statement"}
            </motion.button>
          </div>

          {/* Preview */}
          <div className="lg:col-span-3">
            <div className="border border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5 min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-emerald-400 font-display">Statement Preview</h2>
                {hasGenerated && result && (
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
                    <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-slate-400 font-body">Generating transactions and reconciling balances...</p>
                  </motion.div>
                ) : hasGenerated && result && renderProps ? (
                  <motion.div key="document" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} id="printable-stmt">
                    <div className="rounded-lg overflow-hidden shadow-2xl border border-zinc-300">
                      <ThemeComponent {...renderProps} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center py-16">
                    <Landmark className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm font-body">Your reconciled bank statement will appear here</p>
                    <p className="text-slate-600 text-xs mt-2 font-body">Import pay-stub deposits, set balances, pick a bank style — then generate.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 text-[10px] text-slate-500 text-center font-body">
              Sample statements are computer-generated for demonstration and testing — not issued by any bank.
              Figures always reconcile: starting + deposits − withdrawals = ending, verified three ways.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
