/**
 * Mandatory paid sick-leave rules by work state (as of 2026).
 * Researched 2026-10-09 from official state labor pages and 2026 law updates.
 * Conventions: rate = leave hours accrued per hour WORKED; cap = max accrual
 * bank; waitingDays = days of employment before accrued time may be USED
 * (accrual itself starts day one unless noted).
 *
 * The generator assumes a 15+ employee employer and a 40 h/week salaried
 * schedule (2080 h/yr) where the statute keys off employer size.
 */
export interface SickLeaveRule {
  /** Leave hours accrued per hour worked. */
  rate: number;
  /** Max hours that may sit in the bank (null = no cap). */
  accrualCap: number | null;
  /** Max hours usable per year (null = same as accrual). */
  usageCapPerYear: number | null;
  /** Days of employment before accrued time may be used. */
  waitingDays: number;
  /** Short label for stub footnotes. */
  law: string;
}

export const SICK_LEAVE_RULES: Record<string, SickLeaveRule> = {
  AK: { rate: 1 / 30, accrualCap: 56, usageCapPerYear: 56, waitingDays: 0, law: 'AK paid sick leave (eff. 7/1/2025)' },
  AZ: { rate: 1 / 30, accrualCap: 40, usageCapPerYear: 40, waitingDays: 90, law: 'AZ paid sick time' },
  CA: { rate: 1 / 30, accrualCap: 80, usageCapPerYear: 40, waitingDays: 90, law: 'CA SB 616 paid sick leave' },
  CO: { rate: 1 / 30, accrualCap: 48, usageCapPerYear: 48, waitingDays: 0, law: 'CO Healthy Families & Workplaces Act' },
  CT: { rate: 1 / 30, accrualCap: 40, usageCapPerYear: 40, waitingDays: 120, law: 'CT paid sick leave (11+ emp. 2026)' },
  DC: { rate: 1 / 37, accrualCap: 56, usageCapPerYear: 56, waitingDays: 90, law: 'DC Accrued Sick and Safe Leave Act' },
  IL: { rate: 1 / 40, accrualCap: 40, usageCapPerYear: 40, waitingDays: 90, law: 'IL Paid Leave for All Workers Act' },
  ME: { rate: 1 / 40, accrualCap: 40, usageCapPerYear: 40, waitingDays: 120, law: 'ME earned paid leave' },
  MD: { rate: 1 / 30, accrualCap: 64, usageCapPerYear: 64, waitingDays: 106, law: 'MD Healthy Working Families Act' },
  MA: { rate: 1 / 30, accrualCap: 40, usageCapPerYear: 40, waitingDays: 90, law: 'MA earned sick time' },
  MI: { rate: 1 / 30, accrualCap: 72, usageCapPerYear: 72, waitingDays: 120, law: 'MI Earned Sick Time Act' },
  MN: { rate: 1 / 30, accrualCap: 80, usageCapPerYear: 48, waitingDays: 0, law: 'MN earned sick and safe time' },
  NE: { rate: 1 / 30, accrualCap: 56, usageCapPerYear: 56, waitingDays: 0, law: 'NE Initiative 436 (accrual after 80 h)' },
  NV: { rate: 0.01923, accrualCap: null, usageCapPerYear: 40, waitingDays: 90, law: 'NV paid leave (NRS 608.0197)' },
  NJ: { rate: 1 / 30, accrualCap: 40, usageCapPerYear: 40, waitingDays: 120, law: 'NJ earned sick leave' },
  NM: { rate: 1 / 30, accrualCap: null, usageCapPerYear: 64, waitingDays: 0, law: 'NM Healthy Workplaces Act' },
  NY: { rate: 1 / 30, accrualCap: 56, usageCapPerYear: 56, waitingDays: 0, law: 'NY paid sick leave' },
  OR: { rate: 1 / 30, accrualCap: 80, usageCapPerYear: 40, waitingDays: 90, law: 'OR sick time' },
  RI: { rate: 1 / 35, accrualCap: 40, usageCapPerYear: 40, waitingDays: 90, law: 'RI paid sick and safe leave' },
  VT: { rate: 1 / 52, accrualCap: 40, usageCapPerYear: 40, waitingDays: 90, law: 'VT earned sick time' },
  WA: { rate: 1 / 40, accrualCap: null, usageCapPerYear: null, waitingDays: 90, law: 'WA paid sick leave' },
  // No statewide mandate (shown for completeness — generator omits the sick line):
  // TX, FL, MO (repealed 2025), PA (Philadelphia/Pittsburgh city rules not modeled),
  // VA (2026: home-health workers only), WI, and all others not listed above.
};

/** Hours assumed worked per pay period for a 40 h/week salaried schedule. */
export function hoursPerPeriod(periodsPerYear: number): number {
  return 2080 / periodsPerYear;
}
