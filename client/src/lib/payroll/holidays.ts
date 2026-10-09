/**
 * 2026 U.S. federal holidays (OPM schedule — https://www.opm.gov/operating_status_Schedules/fedhol/index.asp).
 * Used for pay-date adjustment (payday on a weekend/holiday rolls back to the
 * preceding business day) and for listing paid holidays inside a pay period.
 */
export interface Holiday {
  month: number; // 1-12
  day: number;
  name: string;
}

export const FEDERAL_HOLIDAYS_2026: Holiday[] = [
  { month: 1, day: 1, name: "New Year's Day" },
  { month: 1, day: 19, name: "Martin Luther King Jr. Day" },
  { month: 2, day: 16, name: "Presidents Day" },
  { month: 5, day: 25, name: "Memorial Day" },
  { month: 6, day: 19, name: "Juneteenth" },
  { month: 7, day: 3, name: "Independence Day (observed)" }, // Jul 4 = Saturday
  { month: 9, day: 7, name: "Labor Day" },
  { month: 10, day: 12, name: "Columbus Day" },
  { month: 11, day: 11, name: "Veterans Day" },
  { month: 11, day: 26, name: "Thanksgiving Day" },
  { month: 12, day: 25, name: "Christmas Day" },
];

const holidaySet = new Set(FEDERAL_HOLIDAYS_2026.map((h) => `${h.month}-${h.day}`));

export function isFederalHoliday(d: Date): boolean {
  return holidaySet.has(`${d.getMonth() + 1}-${d.getDate()}`);
}

export function isWeekend(d: Date): boolean {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

export function isBusinessDay(d: Date): boolean {
  return !isWeekend(d) && !isFederalHoliday(d);
}

/** Roll a date back to the preceding business day (skips weekends + federal holidays). */
export function previousBusinessDay(d: Date): Date {
  const c = new Date(d);
  while (!isBusinessDay(c)) c.setDate(c.getDate() - 1);
  return c;
}

/** Holidays (names) falling within [start, end] inclusive. */
export function holidaysInRange(start: Date, end: Date): string[] {
  const names: string[] = [];
  const c = new Date(start);
  while (c <= end) {
    if (isFederalHoliday(c)) {
      const h = FEDERAL_HOLIDAYS_2026.find(
        (x) => x.month === c.getMonth() + 1 && x.day === c.getDate(),
      );
      if (h) names.push(h.name);
    }
    c.setDate(c.getDate() + 1);
  }
  return names;
}
