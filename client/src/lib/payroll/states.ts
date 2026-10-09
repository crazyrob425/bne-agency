/**
 * 2026 STATE payroll profiles — single filer.
 *
 * Bracket rates/thresholds and standard deductions: Tax Foundation, "2026 State
 * Individual Income Tax Rates and Brackets" (as of Jan 1, 2026; published Feb 11,
 * 2026) — https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/
 * Withholding-method overrides and employee-paid payroll taxes verified against
 * official 2026 sources (see per-state notes): EDD (CA), NJ Division of Taxation,
 * NY Dept. of Taxation & Finance Pub. NYS-50-T-NYS, OR DOR, IL-700-T, ESD (WA),
 * CO FAMLI, CT PFML, MA PFML, ME PFML, MN Paid Leave, RI TDI, PA UC, AK DOL,
 * HI DLIR, plus EY 2026 payroll-tax alerts.
 *
 * Method: annualized wage -> subtract state standard deduction (+ one withholding
 * allowance where the state uses them) -> apply marginal brackets -> divide by
 * periods per year. This is the annualized-installment method accepted for
 * withholding in most states; exact state withholding tables are built from the
 * same brackets, so results track official tables within cents.
 */

export interface StateBracket {
  over: number; // this rate applies to taxable income above this amount
  rate: number; // e.g. 0.05 for 5%
}

export interface StateProfile {
  code: string;
  name: string;
  wageTax: boolean;
  /** Single standard deduction (or exemption equivalent) subtracted before brackets. */
  stdDed: number;
  /** One withholding allowance amount subtracted (states that use allowances). */
  allowance: number;
  brackets: StateBracket[];
}

const B = (over: number, rate: number): StateBracket => ({ over, rate });

export const STATE_PROFILES: Record<string, StateProfile> = {
  AL: { code: 'AL', name: 'Alabama', wageTax: true, stdDed: 3000, allowance: 0, brackets: [B(0, 0.02), B(500, 0.04), B(3000, 0.05)] },
  AK: { code: 'AK', name: 'Alaska', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  AZ: { code: 'AZ', name: 'Arizona', wageTax: true, stdDed: 8350, allowance: 0, brackets: [B(0, 0.025)] },
  AR: { code: 'AR', name: 'Arkansas', wageTax: true, stdDed: 2470, allowance: 0, brackets: [B(0, 0.02), B(4600, 0.039)] },
  CA: { code: 'CA', name: 'California', wageTax: true, stdDed: 5540, allowance: 0, brackets: [B(0, 0.01), B(11079, 0.02), B(26264, 0.04), B(41452, 0.06), B(57542, 0.08), B(72724, 0.093), B(371479, 0.103), B(445771, 0.113), B(742953, 0.123), B(1000000, 0.133)] },
  CO: { code: 'CO', name: 'Colorado', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0.044)] }, // 4.4% of federal taxable income
  CT: { code: 'CT', name: 'Connecticut', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.02), B(10000, 0.045), B(50000, 0.055), B(100000, 0.06), B(200000, 0.065), B(250000, 0.069), B(500000, 0.0699)] },
  DE: { code: 'DE', name: 'Delaware', wageTax: true, stdDed: 3250, allowance: 0, brackets: [B(2000, 0.022), B(5000, 0.039), B(10000, 0.048), B(20000, 0.052), B(25000, 0.0555), B(60000, 0.066)] },
  DC: { code: 'DC', name: 'District of Columbia', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0.04), B(10000, 0.06), B(40000, 0.065), B(60000, 0.085), B(250000, 0.0925), B(500000, 0.0975), B(1000000, 0.1075)] },
  FL: { code: 'FL', name: 'Florida', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  GA: { code: 'GA', name: 'Georgia', wageTax: true, stdDed: 15000, allowance: 0, brackets: [B(0, 0.0499)] }, // HB 463 withholding rate
  HI: { code: 'HI', name: 'Hawaii', wageTax: true, stdDed: 4400, allowance: 0, brackets: [B(0, 0.014), B(9600, 0.032), B(14400, 0.055), B(19200, 0.064), B(24000, 0.068), B(36000, 0.072), B(48000, 0.076), B(125000, 0.079), B(175000, 0.0825), B(225000, 0.09), B(275000, 0.10), B(325000, 0.11)] },
  ID: { code: 'ID', name: 'Idaho', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0), B(4811, 0.053)] },
  IL: { code: 'IL', name: 'Illinois', wageTax: true, stdDed: 0, allowance: 2925, brackets: [B(0, 0.0495)] },
  IN: { code: 'IN', name: 'Indiana', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.0295)] },
  IA: { code: 'IA', name: 'Iowa', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0.038)] },
  KS: { code: 'KS', name: 'Kansas', wageTax: true, stdDed: 3605, allowance: 0, brackets: [B(0, 0.052), B(23000, 0.0558)] },
  KY: { code: 'KY', name: 'Kentucky', wageTax: true, stdDed: 3360, allowance: 0, brackets: [B(0, 0.035)] },
  LA: { code: 'LA', name: 'Louisiana', wageTax: true, stdDed: 12875, allowance: 0, brackets: [B(0, 0.03)] },
  ME: { code: 'ME', name: 'Maine', wageTax: true, stdDed: 8350, allowance: 0, brackets: [B(0, 0.058), B(27399, 0.0675), B(64849, 0.0715)] },
  MD: { code: 'MD', name: 'Maryland', wageTax: true, stdDed: 3350, allowance: 0, brackets: [B(0, 0.02), B(1000, 0.03), B(2000, 0.04), B(3000, 0.0475), B(100000, 0.05), B(125000, 0.0525), B(150000, 0.055), B(250000, 0.0575), B(500000, 0.0625), B(1000000, 0.065)] }, // county piggyback tax excluded
  MA: { code: 'MA', name: 'Massachusetts', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.05), B(1083150, 0.09)] }, // 5% + 4% surtax over $1,083,150
  MI: { code: 'MI', name: 'Michigan', wageTax: true, stdDed: 0, allowance: 5900, brackets: [B(0, 0.0425)] },
  MN: { code: 'MN', name: 'Minnesota', wageTax: true, stdDed: 15300, allowance: 0, brackets: [B(0, 0.0535), B(33310, 0.068), B(109430, 0.0785), B(203150, 0.0985)] },
  MS: { code: 'MS', name: 'Mississippi', wageTax: true, stdDed: 2300, allowance: 0, brackets: [B(0, 0), B(10000, 0.04)] },
  MO: { code: 'MO', name: 'Missouri', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0), B(1348, 0.02), B(2696, 0.025), B(4044, 0.03), B(5392, 0.035), B(6740, 0.04), B(8088, 0.045), B(9436, 0.047)] },
  MT: { code: 'MT', name: 'Montana', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0.047), B(47500, 0.0565)] },
  NE: { code: 'NE', name: 'Nebraska', wageTax: true, stdDed: 8850, allowance: 0, brackets: [B(0, 0.0246), B(4130, 0.0351), B(24760, 0.0455)] },
  NV: { code: 'NV', name: 'Nevada', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  NH: { code: 'NH', name: 'New Hampshire', wageTax: false, stdDed: 0, allowance: 0, brackets: [] }, // interest & dividends tax repealed 1/1/2025
  NJ: { code: 'NJ', name: 'New Jersey', wageTax: true, stdDed: 0, allowance: 1000, brackets: [B(0, 0.014), B(20000, 0.0175), B(35000, 0.035), B(40000, 0.0553), B(75000, 0.0637), B(500000, 0.0897), B(1000000, 0.1075)] },
  NM: { code: 'NM', name: 'New Mexico', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0.015), B(5500, 0.032), B(16500, 0.043), B(33500, 0.047), B(66500, 0.049), B(210000, 0.059)] },
  NY: { code: 'NY', name: 'New York', wageTax: true, stdDed: 7400, allowance: 1000, brackets: [B(0, 0.039), B(8500, 0.044), B(11700, 0.0515), B(13900, 0.054), B(80650, 0.059), B(215400, 0.0685), B(1077550, 0.0965), B(5000000, 0.103), B(25000000, 0.109)] },
  NC: { code: 'NC', name: 'North Carolina', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.0399)] },
  ND: { code: 'ND', name: 'North Dakota', wageTax: true, stdDed: 16100, allowance: 0, brackets: [B(0, 0), B(48475, 0.0195), B(244825, 0.025)] },
  OH: { code: 'OH', name: 'Ohio', wageTax: true, stdDed: 0, allowance: 2400, brackets: [B(0, 0), B(26050, 0.0275)] },
  OK: { code: 'OK', name: 'Oklahoma', wageTax: true, stdDed: 6350, allowance: 1000, brackets: [B(3750, 0.025), B(4900, 0.035), B(7200, 0.045)] },
  OR: { code: 'OR', name: 'Oregon', wageTax: true, stdDed: 2910, allowance: 0, brackets: [B(0, 0.0475), B(4550, 0.0675), B(11400, 0.0875), B(125000, 0.099)] },
  PA: { code: 'PA', name: 'Pennsylvania', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.0307)] },
  RI: { code: 'RI', name: 'Rhode Island', wageTax: true, stdDed: 11200, allowance: 0, brackets: [B(0, 0.0375), B(82050, 0.0475), B(186450, 0.0599)] },
  SC: { code: 'SC', name: 'South Carolina', wageTax: true, stdDed: 8350, allowance: 0, brackets: [B(0, 0), B(3640, 0.03), B(18230, 0.06)] },
  SD: { code: 'SD', name: 'South Dakota', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  TN: { code: 'TN', name: 'Tennessee', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  TX: { code: 'TX', name: 'Texas', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
  UT: { code: 'UT', name: 'Utah', wageTax: true, stdDed: 0, allowance: 0, brackets: [B(0, 0.045)] },
  VT: { code: 'VT', name: 'Vermont', wageTax: true, stdDed: 7650, allowance: 0, brackets: [B(0, 0.0335), B(49400, 0.066), B(119700, 0.076), B(249700, 0.0875)] },
  VA: { code: 'VA', name: 'Virginia', wageTax: true, stdDed: 8750, allowance: 930, brackets: [B(0, 0.02), B(3000, 0.03), B(5000, 0.05), B(17000, 0.0575)] },
  WA: { code: 'WA', name: 'Washington', wageTax: false, stdDed: 0, allowance: 0, brackets: [] }, // no wage income tax (capital-gains tax excluded)
  WV: { code: 'WV', name: 'West Virginia', wageTax: true, stdDed: 0, allowance: 2000, brackets: [B(0, 0.0222), B(10000, 0.0296), B(25000, 0.0333), B(40000, 0.0444), B(60000, 0.0482)] },
  WI: { code: 'WI', name: 'Wisconsin', wageTax: true, stdDed: 13960, allowance: 0, brackets: [B(0, 0.035), B(15110, 0.044), B(51950, 0.053), B(332720, 0.0765)] },
  WY: { code: 'WY', name: 'Wyoming', wageTax: false, stdDed: 0, allowance: 0, brackets: [] },
};

export const STATE_CODES = Object.keys(STATE_PROFILES);

function applyBrackets(taxableAnnual: number, brackets: StateBracket[]): number {
  if (taxableAnnual <= 0 || brackets.length === 0) return 0;
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const lo = brackets[i].over;
    const hi = i + 1 < brackets.length ? brackets[i + 1].over : Infinity;
    if (taxableAnnual > lo) {
      tax += (Math.min(taxableAnnual, hi) - lo) * brackets[i].rate;
    }
  }
  return tax;
}

/** 2026 state income-tax withholding for one period (single, one allowance). */
export function stateWithholding(state: string, periodGross: number, periodsPerYear: number): number {
  const p = STATE_PROFILES[state];
  if (!p || !p.wageTax) return 0;
  const annualized = periodGross * periodsPerYear;
  const taxable = Math.max(0, annualized - p.stdDed - p.allowance);
  return applyBrackets(taxable, p.brackets) / periodsPerYear;
}

// --- Employee-paid state payroll taxes (appear as stub deductions) ---

export interface EmployeePayrollTaxDef {
  label: string;
  rate: number;
  /** Annual wage base cap; null = no cap. */
  wageBase: number | null;
  /** Max deduction per week (e.g., NY DBL $0.60/wk, HI TDI $7.50/wk). */
  weeklyMax?: number;
}

/** 2026 employee-paid state payroll taxes, verified against 2026 agency sources. */
export const EMPLOYEE_PAYROLL_TAXES: Record<string, EmployeePayrollTaxDef[]> = {
  CA: [{ label: 'CA SDI', rate: 0.013, wageBase: null }], // EDD: 1.3%, no wage cap since 1/1/2024
  NJ: [
    { label: 'NJ SUI', rate: 0.00425, wageBase: 44800 },
    { label: 'NJ TDI', rate: 0.0019, wageBase: 171100 },
    { label: 'NJ FLI', rate: 0.0023, wageBase: 171100 },
  ],
  NY: [
    { label: 'NY DBL', rate: 0.005, wageBase: null, weeklyMax: 0.6 },
    { label: 'NY PFL', rate: 0.00432, wageBase: 95347.22 },
  ],
  WA: [
    { label: 'WA Paid Family & Medical Leave', rate: 0.008071, wageBase: 184500 }, // 71.43% of 1.13%
    { label: 'WA Cares', rate: 0.0058, wageBase: null },
  ],
  OR: [
    { label: 'OR Statewide Transit Tax', rate: 0.001, wageBase: null },
    { label: 'OR Paid Leave', rate: 0.006, wageBase: 184500 }, // 60% of 1.0%
  ],
  CO: [{ label: 'CO FAMLI', rate: 0.0044, wageBase: 184500 }],
  CT: [{ label: 'CT PFML', rate: 0.005, wageBase: 184500 }],
  MA: [{ label: 'MA PFML', rate: 0.0046, wageBase: 184500 }],
  ME: [{ label: 'ME PFML', rate: 0.005, wageBase: 184500 }],
  MN: [{ label: 'MN Paid Leave', rate: 0.0044, wageBase: 185000 }],
  RI: [{ label: 'RI TDI', rate: 0.011, wageBase: 100000 }],
  PA: [{ label: 'PA UC', rate: 0.0007, wageBase: null }],
  AK: [{ label: 'AK SUI', rate: 0.005, wageBase: 54200 }],
  HI: [{ label: 'HI TDI', rate: 0.005, wageBase: null, weeklyMax: 7.5 }],
};

export interface EmployeeTaxLine {
  label: string;
  amount: number;
}

/**
 * Employee-paid state payroll taxes for one period.
 * @param ytdWagesBefore wages paid YTD before this period (for wage-base caps)
 * @param weeksInPeriod length of the pay period in weeks (for weekly maxes)
 */
export function employeeStateTaxesForPeriod(
  state: string,
  periodGross: number,
  ytdWagesBefore: number,
  weeksInPeriod: number,
): EmployeeTaxLine[] {
  const defs = EMPLOYEE_PAYROLL_TAXES[state];
  if (!defs) return [];
  return defs.map((d) => {
    let taxable = periodGross;
    if (d.wageBase !== null) {
      const room = Math.max(0, d.wageBase - ytdWagesBefore);
      taxable = Math.min(periodGross, room);
    }
    let amount = taxable * d.rate;
    if (d.weeklyMax !== undefined) {
      amount = Math.min(amount, d.weeklyMax * weeksInPeriod);
    }
    return { label: d.label, amount };
  });
}
