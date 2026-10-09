/**
 * 2026 U.S. FEDERAL payroll figures.
 * Sources: IRS Publication 15-T (2026) Percentage Method Tables for Manual Payroll
 * Systems (Forms W-4 from 2020 or later), MONTHLY payroll period, Single or Married
 * Filing Separately, STANDARD withholding; IRS Pub. 15 (2026); SSA 2026 COLA fact
 * sheet (announced Oct 24, 2025); IRS IR-2025-103 / Rev. Proc. 2025-32.
 *
 * Method: for any pay frequency, annualize the period wage, subtract the 2026
 * standard deduction ($16,100 single), apply the ANNUAL percentage-method table
 * (the monthly table x12, exactly how Pub. 15-T Worksheet 2 works), then divide
 * the annual tentative withholding by the number of periods per year.
 */

// 2026 standard deduction, single (IR-2025-103)
export const FED_STD_DED_SINGLE_2026 = 16100;

// Pub. 15-T (2026), MONTHLY, Single/MFS, STANDARD withholding.
// [atLeast, lessThan, baseWithholding, rate, excessOver]
const MONTHLY_SINGLE_TABLE: Array<[number, number, number, number, number]> = [
  [0, 1342, 0.0, 0.0, 0],
  [1342, 2375, 0.0, 0.1, 1342],
  [2375, 5542, 103.3, 0.12, 2375],
  [5542, 10150, 483.34, 0.22, 5542],
  [10150, 18156, 1497.1, 0.24, 10150],
  [18156, 22694, 3418.54, 0.32, 18156],
  [22694, 54725, 4870.7, 0.35, 22694],
  [54725, Infinity, 16081.55, 0.37, 54725],
];

// Annualized version of the table (x12) — used for every pay frequency.
const ANNUAL_SINGLE_TABLE = MONTHLY_SINGLE_TABLE.map(
  ([lo, hi, base, rate, excess]) =>
    [lo * 12, hi === Infinity ? Infinity : hi * 12, base * 12, rate, excess * 12] as const,
);

function applyTable(annualAdjustedWage: number): number {
  if (annualAdjustedWage <= 0) return 0;
  for (const [lo, hi, base, rate, excess] of ANNUAL_SINGLE_TABLE) {
    if (annualAdjustedWage >= lo && annualAdjustedWage < hi) {
      return base + rate * (annualAdjustedWage - excess);
    }
  }
  return 0;
}

/** 2026 federal income tax withholding, single, standard W-4 (no extra adjustments). */
export function federalWithholdingSingle(periodGross: number, periodsPerYear: number): number {
  const annualized = periodGross * periodsPerYear;
  const adjusted = annualized - FED_STD_DED_SINGLE_2026;
  const annualTax = applyTable(adjusted);
  return annualTax / periodsPerYear;
}

// --- FICA 2026 ---
export const SS_WAGE_BASE_2026 = 184500;
export const SS_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD = 200000; // single; wages YTD

export interface FicaResult {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
}

/**
 * Employee FICA for one period.
 * @param periodGross gross wages this period
 * @param ytdWagesBefore total wages paid YTD before this period (for caps)
 */
export function ficaForPeriod(periodGross: number, ytdWagesBefore: number): FicaResult {
  const ssRoom = Math.max(0, SS_WAGE_BASE_2026 - ytdWagesBefore);
  const ssWages = Math.min(periodGross, ssRoom);
  const socialSecurity = ssWages * SS_RATE;
  const medicare = periodGross * MEDICARE_RATE;
  const ytdAfter = ytdWagesBefore + periodGross;
  const addlWages = Math.max(0, Math.min(periodGross, ytdAfter - ADDITIONAL_MEDICARE_THRESHOLD));
  const additionalMedicare = addlWages * ADDITIONAL_MEDICARE_RATE;
  return { socialSecurity, medicare, additionalMedicare };
}

/** Flat 22% supplemental-wage withholding rate (2026; 37% past $1M — not modeled). */
export const SUPPLEMENTAL_RATE_2026 = 0.22;
