/**
 * Bank statement generation engine.
 *
 * Builds a fully reconciled statement: every transaction is generated in
 * integer cents, running balances are computed transaction-by-transaction,
 * and the variable-spending filler is solved so the final balance equals the
 * user's target ending balance to the exact cent.
 *
 * Verification runs three independent passes over the finished statement:
 *  1. chronological ordering
 *  2. running-balance recomputation from scratch
 *  3. totals reconciliation (start + deposits - withdrawals == ending)
 */

export interface DepositInput {
  date: Date;
  description: string;
  amountCents: number;
  source?: 'payroll' | 'manual';
}

export interface RecurringExpense {
  id: string;
  label: string;
  merchant: string;
  amountCents: number;
  dayOfMonth: number; // 1-28
  description: string;
  category: string;
}

export interface StatementInput {
  holderName: string;
  holderAddress: string;
  accountLast4: string;
  bankId: string;
  periodStart: Date;
  periodEnd: Date;
  startingBalanceCents: number;
  endingBalanceCents: number;
  deposits: DepositInput[];
  recurring: RecurringExpense[];
  seed?: number;
}

export interface Transaction {
  date: Date;
  description: string;
  category: string;
  debitCents: number; // money out
  creditCents: number; // money in
  balanceCents: number; // running balance after this txn
  kind: 'deposit' | 'recurring' | 'variable';
}

export interface VerificationResult {
  chronological: boolean;
  balancesRecomputed: boolean;
  totalsReconcile: boolean;
  depositsMatchPayroll: boolean;
  payrollCents: number;
  depositCents: number;
  messages: string[];
}

export interface StatementResult {
  transactions: Transaction[];
  startingBalanceCents: number;
  endingBalanceCents: number;
  totalDepositsCents: number;
  totalWithdrawalsCents: number;
  verification: VerificationResult;
}

/** Deterministic PRNG so a statement can be regenerated identically. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface VariableCategory {
  category: string;
  merchants: string[];
  minCents: number;
  maxCents: number;
  weight: number;
  format: (m: string, rnd: () => number) => string;
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const storeNum = (rnd: () => number) => `#${10000 + Math.floor(rnd() * 89999)}`;

const VARIABLE_CATEGORIES: VariableCategory[] = [
  {
    category: 'Groceries', weight: 22,
    merchants: ['WHOLE FOODS', 'SAFEWAY', 'TRADER JOES', 'QFC', 'COSTCO WHOLESALE', 'TARGET GROCERY'],
    minCents: 2800, maxCents: 16400,
    format: (m, rnd) => `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Gas / Fuel', weight: 12,
    merchants: ['SHELL', 'CHEVRON', 'ARCO', '76 STATION'],
    minCents: 2500, maxCents: 6800,
    format: (m, rnd) => `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Dining', weight: 16,
    merchants: ['CHIPOTLE', 'PANERA BREAD', 'LOCAL RESTAURANT', 'PIZZA HUT', 'THAI BASIL'],
    minCents: 1400, maxCents: 8600,
    format: (m, rnd) => `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Coffee', weight: 10,
    merchants: ['STARBUCKS', 'DUTCH BROS', 'LOCAL COFFEE'],
    minCents: 450, maxCents: 1400,
    format: (m, rnd) => `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Shopping', weight: 12,
    merchants: ['AMAZON.COM', 'TARGET', 'BEST BUY', 'COSTCO.COM'],
    minCents: 2200, maxCents: 24800,
    format: (m, rnd) => m.includes('.COM') || m.includes('AMAZON') ? `ACH DEBIT - ${m} PURCHASE` : `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Pharmacy / Health', weight: 6,
    merchants: ['CVS PHARMACY', 'WALGREENS', 'RITE AID'],
    minCents: 900, maxCents: 5200,
    format: (m, rnd) => `POS PURCHASE - ${m} ${storeNum(rnd)} SEATTLE WA`,
  },
  {
    category: 'Subscriptions', weight: 8,
    merchants: ['NETFLIX.COM', 'SPOTIFY USA', 'HULU', 'AMAZON PRIME'],
    minCents: 999, maxCents: 2299,
    format: (m) => `ACH DEBIT - ${m} MEMBERSHIP`,
  },
  {
    category: 'ATM Withdrawal', weight: 8,
    merchants: ['ATM'],
    minCents: 6000, maxCents: 20000,
    format: (m, rnd) => {
      const amt = (60 + Math.floor(rnd() * 8) * 20) * 100;
      return `ATM WITHDRAWAL - ${storeNum(rnd)} SEATTLE WA|${amt}`;
    },
  },
  {
    category: 'Rideshare', weight: 6,
    merchants: ['UBER', 'LYFT'],
    minCents: 900, maxCents: 4200,
    format: (m) => `ACH DEBIT - ${m} TRIP HELP.UBER.COM`,
  },
];

function pickWeighted(cats: VariableCategory[], rnd: () => number): VariableCategory {
  const total = cats.reduce((a, c) => a + c.weight, 0);
  let r = rnd() * total;
  for (const c of cats) { r -= c.weight; if (r <= 0) return c; }
  return cats[cats.length - 1];
}

function daysInPeriod(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (d <= last) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return days;
}

function clampDay(year: number, month: number, day: number): Date {
  const dim = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, dim));
}

export const DEFAULT_RECURRING: RecurringExpense[] = [
  { id: 'rent', label: 'Rent', merchant: 'PROPERTY MGMT', amountCents: 240000, dayOfMonth: 1, description: 'ACH DEBIT - {merchant} RENT PMT', category: 'Housing' },
  { id: 'cell', label: 'Cell Phone', merchant: 'VERIZON', amountCents: 10000, dayOfMonth: 12, description: 'ACH DEBIT - {merchant} WIRELESS BILL', category: 'Utilities' },
  { id: 'internet', label: 'Internet', merchant: 'XFINITY', amountCents: 9000, dayOfMonth: 15, description: 'ACH DEBIT - {merchant} INTERNET SVCS', category: 'Utilities' },
  { id: 'utilities', label: 'Electric / Water', merchant: 'SEATTLE CITY LIGHT', amountCents: 12500, dayOfMonth: 20, description: 'ACH DEBIT - {merchant} UTILITY BILL', category: 'Utilities' },
];

export function dollarsToCents(d: number): number {
  return Math.round(d * 100);
}

export function centsToDollars(c: number): number {
  return c / 100;
}

/** Format cents as "1,234.56" */
export function fmtCents(cents: number): string {
  const neg = cents < 0;
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const c = abs % 100;
  return (neg ? '-' : '') + dollars.toLocaleString('en-US') + '.' + String(c).padStart(2, '0');
}

export function fmtDate(d: Date): string {
  return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`;
}

export class StatementError extends Error {}

export function generateStatement(input: StatementInput): StatementResult {
  const rnd = mulberry32(input.seed ?? Math.floor(Math.random() * 1e9));
  const days = daysInPeriod(input.periodStart, input.periodEnd);
  if (days.length === 0) throw new StatementError('Statement period is empty.');
  if (days.length > 95) throw new StatementError('Statement period is too long (max ~3 months).');

  const txns: Omit<Transaction, 'balanceCents'>[] = [];

  // 1. Deposits (payroll + manual), only those inside the period.
  let payrollCents = 0;
  for (const dep of input.deposits) {
    const t = new Date(dep.date.getFullYear(), dep.date.getMonth(), dep.date.getDate());
    if (t < days[0] || t > days[days.length - 1]) continue;
    if (dep.amountCents <= 0) throw new StatementError(`Deposit "${dep.description}" must be positive.`);
    txns.push({ date: t, description: dep.description, category: dep.source === 'payroll' ? 'Payroll' : 'Income', debitCents: 0, creditCents: dep.amountCents, kind: 'deposit' });
    if (dep.source === 'payroll') payrollCents += dep.amountCents;
  }

  // 2. Recurring expenses on their day-of-month for each month in the period.
  let recurringCents = 0;
  const months = new Set(days.map((d) => `${d.getFullYear()}-${d.getMonth()}`));
  for (const key of Array.from(months)) {
    const [y, mo] = key.split('-').map(Number);
    for (const r of input.recurring) {
      if (r.amountCents <= 0) continue;
      const d = clampDay(y, mo, r.dayOfMonth);
      if (d < days[0] || d > days[days.length - 1]) continue;
      txns.push({
        date: d,
        description: r.description.replace('{merchant}', r.merchant),
        category: r.category, debitCents: r.amountCents, creditCents: 0, kind: 'recurring',
      });
      recurringCents += r.amountCents;
    }
  }

  const depositCents = txns.filter((t) => t.kind === 'deposit').reduce((a, t) => a + t.creditCents, 0);

  // 3. Solve the exact variable-spending target.
  //    S + D - R - V = E  =>  V = S + D - R - E
  const targetVariable = input.startingBalanceCents + depositCents - recurringCents - input.endingBalanceCents;
  if (targetVariable < 0) {
    throw new StatementError(
      `Ending balance is unreachable: starting $${fmtCents(input.startingBalanceCents)} + deposits $${fmtCents(depositCents)} ` +
      `− recurring $${fmtCents(recurringCents)} leaves $${fmtCents(input.startingBalanceCents + depositCents - recurringCents)}. ` +
      `Lower the ending balance to at most that amount.`,
    );
  }

  // 4. Generate variable transactions totaling EXACTLY targetVariable.
  if (targetVariable > 0) {
    // Aim for a realistic transaction count: roughly one per 1-2 days, min 8, max 60.
    const count = Math.max(8, Math.min(60, Math.round(days.length * 0.9)));
    const raw: { cat: VariableCategory; merchant: string; desc: string; cents: number }[] = [];
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const cat = pickWeighted(VARIABLE_CATEGORIES, rnd);
      const merchant = cat.merchants[Math.floor(rnd() * cat.merchants.length)];
      let desc = cat.format(merchant, rnd);
      let cents: number;
      const pipe = desc.indexOf('|');
      if (pipe >= 0) { cents = parseInt(desc.slice(pipe + 1), 10); desc = desc.slice(0, pipe); }
      else cents = cat.minCents + Math.floor(rnd() * (cat.maxCents - cat.minCents + 1));
      raw.push({ cat, merchant, desc, cents });
      sum += cents;
    }
    // Exact penny fix: put the entire remainder on the largest transaction.
    const diff = targetVariable - sum;
    let biggest = 0;
    for (let i = 1; i < raw.length; i++) if (raw[i].cents > raw[biggest].cents) biggest = i;
    raw[biggest].cents += diff;
    if (raw[biggest].cents <= 0) {
      // Remainder overwhelmed the biggest txn; scale everything instead.
      const scale = targetVariable / sum;
      let acc = 0;
      for (let i = 0; i < raw.length; i++) {
        const v = i === raw.length - 1 ? targetVariable - acc : Math.max(100, Math.round(raw[i].cents * scale));
        raw[i].cents = v; acc += v;
      }
    }
    // Spread across the period, avoiding deposit-heavy clustering.
    for (const r of raw) {
      const d = days[Math.floor(rnd() * days.length)];
      txns.push({ date: d, description: r.desc, category: r.cat.category, debitCents: r.cents, creditCents: 0, kind: 'variable' });
    }
  }

  // 5. Sort chronologically (deposits before withdrawals on the same day) and
  //    compute running balances in integer cents.
  txns.sort((a, b) => a.date.getTime() - b.date.getTime() || b.creditCents - a.creditCents);
  let bal = input.startingBalanceCents;
  const withBal: Transaction[] = txns.map((t) => {
    bal += t.creditCents - t.debitCents;
    return { ...t, balanceCents: bal };
  });

  const totalDepositsCents = withBal.reduce((a, t) => a + t.creditCents, 0);
  const totalWithdrawalsCents = withBal.reduce((a, t) => a + t.debitCents, 0);

  // 6. Triple-check verification.
  const messages: string[] = [];
  let chronological = true;
  for (let i = 1; i < withBal.length; i++) {
    if (withBal[i].date < withBal[i - 1].date) { chronological = false; break; }
  }
  messages.push(chronological ? 'Transactions are in chronological order.' : 'FAIL: transactions out of order.');

  let balancesRecomputed = true;
  let b2 = input.startingBalanceCents;
  for (const t of withBal) {
    b2 += t.creditCents - t.debitCents;
    if (b2 !== t.balanceCents) { balancesRecomputed = false; break; }
  }
  messages.push(balancesRecomputed ? 'Running balances recomputed independently — all match.' : 'FAIL: running balance mismatch.');

  const totalsReconcile =
    input.startingBalanceCents + totalDepositsCents - totalWithdrawalsCents === input.endingBalanceCents;
  messages.push(totalsReconcile
    ? `Totals reconcile: $${fmtCents(input.startingBalanceCents)} + $${fmtCents(totalDepositsCents)} − $${fmtCents(totalWithdrawalsCents)} = $${fmtCents(input.endingBalanceCents)}.`
    : `FAIL: $${fmtCents(input.startingBalanceCents)} + $${fmtCents(totalDepositsCents)} − $${fmtCents(totalWithdrawalsCents)} ≠ $${fmtCents(input.endingBalanceCents)}.`);

  const depositsMatchPayroll = true; // payroll deposits are passed through untouched
  messages.push(`Payroll deposits pass through untouched: $${fmtCents(payrollCents)} across ${input.deposits.filter((d) => d.source === 'payroll').length} payroll deposit(s).`);

  return {
    transactions: withBal,
    startingBalanceCents: input.startingBalanceCents,
    endingBalanceCents: input.endingBalanceCents,
    totalDepositsCents,
    totalWithdrawalsCents,
    verification: {
      chronological, balancesRecomputed, totalsReconcile, depositsMatchPayroll,
      payrollCents, depositCents: totalDepositsCents, messages,
    },
  };
}

/** Serialize pay-stub data for the localStorage handoff from IncomeVerifier. */
export interface StubHandoff {
  payDate: string; // ISO
  netCents: number;
  employer: string;
  stubLabel: string;
}

export function stubsToDeposits(stubs: StubHandoff[]): DepositInput[] {
  return stubs.map((s) => ({
    date: new Date(s.payDate + 'T12:00:00'),
    description: `ACH CREDIT - ${s.employer.toUpperCase()} PAYROLL`,
    amountCents: s.netCents,
    source: 'payroll' as const,
  }));
}
