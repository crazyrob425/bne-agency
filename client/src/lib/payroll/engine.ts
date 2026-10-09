/**
 * Pay-stub computation engine.
 *
 * Given a start date (day one of YTD), a pay frequency, and a stub count,
 * builds consecutive pay periods with correct calendar-month lengths, federal
 * holidays, and pay dates rolled back off weekends/holidays. Each period's
 * taxes are computed with the real 2026 methods (IRS Pub. 15-T percentage
 * method for FIT, FICA wage-base tracking, state annualized-bracket method,
 * state employee payroll taxes with wage-base caps), and every line item
 * chains into YTD exactly (round per line, per period).
 */
import { federalWithholdingSingle, ficaForPeriod } from './federal';
import { stateWithholding, employeeStateTaxesForPeriod, STATE_PROFILES } from './states';
import { holidaysInRange, previousBusinessDay } from './holidays';
import { SICK_LEAVE_RULES, hoursPerPeriod } from './sickLeave';

export type PayFrequency = 'Monthly' | 'Semimonthly' | 'Biweekly' | 'Weekly';

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  Monthly: 12,
  Semimonthly: 24,
  Biweekly: 26,
  Weekly: 52,
};

export interface DeductionLine {
  label: string;
  current: number;
  ytd: number;
}

export interface LeaveBank {
  label: string;
  accruedThisPeriod: number;
  balance: number;
  ytdUsed: number;
}

export interface PayStub {
  index: number; // 1-based
  periodStart: Date;
  periodEnd: Date;
  payDate: Date;
  daysInPeriod: number;
  holidays: string[];
  checkNumber: number;
  gross: number;
  ytdGross: number;
  deductions: DeductionLine[]; // FIT, FICA x2-3, state tax, state payroll taxes
  totalDeductions: number;
  ytdDeductions: number;
  net: number;
  ytdNet: number;
  leave: LeaveBank[];
}

export interface EngineInput {
  startDate: Date; // day one: first period starts here, YTD starts at zero
  frequency: PayFrequency;
  stubCount: number; // 1 | 3 | 6
  monthlyGross: number; // contracted monthly salary
  state: string; // work-state code, e.g. 'CA'
  vacationHoursPerPeriod: number; // employer-policy vacation accrual (0 = none)
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const daysBetween = (a: Date, b: Date) =>
  Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000) + 1;
const lastDayOfMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

interface RawPeriod {
  start: Date;
  end: Date;
  /** 1.0 for a full period; <1 for a prorated first monthly period. */
  grossFactor: number;
}

/** Lay out consecutive pay periods starting at `start`. */
function buildPeriods(start: Date, frequency: PayFrequency, count: number): RawPeriod[] {
  const periods: RawPeriod[] = [];
  const s = startOfDay(start);

  if (frequency === 'Monthly') {
    let y = s.getFullYear();
    let m = s.getMonth();
    for (let i = 0; i < count; i++) {
      const dim = lastDayOfMonth(y, m);
      const pStart = i === 0 ? new Date(y, m, s.getDate()) : new Date(y, m, 1);
      const pEnd = new Date(y, m, dim);
      const factor = i === 0 ? (dim - s.getDate() + 1) / dim : 1;
      periods.push({ start: pStart, end: pEnd, grossFactor: factor });
      m++;
      if (m > 11) { m = 0; y++; }
    }
  } else if (frequency === 'Semimonthly') {
    // Periods are 1st-15th and 16th-end of month; the first may be partial.
    let cursor = new Date(s);
    for (let i = 0; i < count; i++) {
      const y = cursor.getFullYear();
      const m = cursor.getMonth();
      const dim = lastDayOfMonth(y, m);
      let pStart: Date, pEnd: Date, fullDays: number;
      if (cursor.getDate() <= 15) {
        pStart = new Date(y, m, cursor.getDate());
        pEnd = new Date(y, m, 15);
        fullDays = 15;
      } else {
        pStart = new Date(y, m, cursor.getDate());
        pEnd = new Date(y, m, dim);
        fullDays = dim - 15;
      }
      const actualDays = daysBetween(pStart, pEnd);
      periods.push({ start: pStart, end: pEnd, grossFactor: actualDays / fullDays });
      cursor = new Date(pEnd);
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    const len = frequency === 'Biweekly' ? 14 : 7;
    let cursor = new Date(s);
    for (let i = 0; i < count; i++) {
      const pEnd = new Date(cursor);
      pEnd.setDate(pEnd.getDate() + len - 1);
      periods.push({ start: new Date(cursor), end: pEnd, grossFactor: 1 });
      cursor = new Date(pEnd);
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  return periods;
}

export function computeStubs(input: EngineInput): PayStub[] {
  const { startDate, frequency, stubCount, monthlyGross, state, vacationHoursPerPeriod } = input;
  const ppy = PERIODS_PER_YEAR[frequency];
  const raw = buildPeriods(startDate, frequency, stubCount);
  const annualGross = monthlyGross * 12;
  const fullPeriodGross = annualGross / ppy;

  const sickRule = SICK_LEAVE_RULES[state];
  const hrsPerPeriod = hoursPerPeriod(ppy);

  let ytdGross = 0;
  let ytdFit = 0, ytdSs = 0, ytdMed = 0, ytdAddlMed = 0, ytdState = 0;
  const ytdEmpTaxes = new Map<string, number>();
  let sickBalance = 0;
  const sickYtdUsed = 0;
  let vacBalance = 0;
  const vacYtdUsed = 0;

  const stubs: PayStub[] = [];

  raw.forEach((rp, i) => {
    const gross = round2(fullPeriodGross * rp.grossFactor);
    const weeksInPeriod = daysBetween(rp.start, rp.end) / 7;

    const fit = round2(federalWithholdingSingle(gross, ppy));
    const fica = ficaForPeriod(gross, ytdGross);
    const ss = round2(fica.socialSecurity);
    const med = round2(fica.medicare);
    const addlMed = round2(fica.additionalMedicare);
    const st = round2(stateWithholding(state, gross, ppy));
    const empTaxes = employeeStateTaxesForPeriod(state, gross, ytdGross, weeksInPeriod).map((t) => ({
      label: t.label,
      amount: round2(t.amount),
    }));

    const periodDedTotal = round2(
      fit + ss + med + addlMed + st + empTaxes.reduce((a, t) => a + t.amount, 0),
    );
    const net = round2(gross - periodDedTotal);

    ytdGross = round2(ytdGross + gross);
    ytdFit = round2(ytdFit + fit);
    ytdSs = round2(ytdSs + ss);
    ytdMed = round2(ytdMed + med);
    ytdAddlMed = round2(ytdAddlMed + addlMed);
    ytdState = round2(ytdState + st);
    empTaxes.forEach((t) => ytdEmpTaxes.set(t.label, round2((ytdEmpTaxes.get(t.label) ?? 0) + t.amount)));
    const ytdDed = round2(
      ytdFit + ytdSs + ytdMed + ytdAddlMed + ytdState +
      Array.from(ytdEmpTaxes.values()).reduce((a, v) => a + v, 0),
    );
    const ytdNet = round2(ytdGross - ytdDed);

    // --- leave banks chain ---
    const leave: LeaveBank[] = [];
    if (sickRule) {
      const accrued = sickRule.rate * hrsPerPeriod * rp.grossFactor;
      sickBalance = sickRule.accrualCap !== null
        ? Math.min(sickBalance + accrued, sickRule.accrualCap)
        : sickBalance + accrued;
      // waiting period: balance shows as accrued but not yet usable
      leave.push({
        label: 'Sick Leave',
        accruedThisPeriod: round2(accrued),
        balance: round2(sickBalance),
        ytdUsed: round2(sickYtdUsed),
      });
    }
    if (vacationHoursPerPeriod > 0) {
      const accrued = vacationHoursPerPeriod * rp.grossFactor;
      vacBalance = round2(vacBalance + accrued);
      leave.push({
        label: 'Vacation',
        accruedThisPeriod: round2(accrued),
        balance: vacBalance,
        ytdUsed: round2(vacYtdUsed),
      });
    }

    const deductions: DeductionLine[] = [
      { label: 'Federal Income Tax', current: fit, ytd: ytdFit },
      { label: 'Social Security', current: ss, ytd: ytdSs },
      { label: 'Medicare', current: med, ytd: ytdMed },
    ];
    if (addlMed > 0 || ytdAddlMed > 0) {
      deductions.push({ label: 'Additional Medicare Tax', current: addlMed, ytd: ytdAddlMed });
    }
    if (STATE_PROFILES[state]?.wageTax) {
      const stateName = STATE_PROFILES[state]?.name ?? state;
      deductions.push({ label: `${stateName} Income Tax`, current: st, ytd: ytdState });
    }
    empTaxes.forEach((t) => {
      deductions.push({ label: t.label, current: t.amount, ytd: ytdEmpTaxes.get(t.label) ?? t.amount });
    });

    const payDate = previousBusinessDay(rp.end);

    stubs.push({
      index: i + 1,
      periodStart: rp.start,
      periodEnd: rp.end,
      payDate,
      daysInPeriod: daysBetween(rp.start, rp.end),
      holidays: holidaysInRange(rp.start, rp.end),
      checkNumber: 1000 + i + 1,
      gross,
      ytdGross,
      deductions,
      totalDeductions: periodDedTotal,
      ytdDeductions: ytdDed,
      net,
      ytdNet,
      leave,
    });
  });

  return stubs;
}

/** 'Jan 5, 2026' style formatting for stubs. */
export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function fmtMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
