/** Shared helpers for pay-stub themes. */
import type { PayStub, PayFrequency } from '@/lib/payroll/engine';
import { fmtDate, fmtMoney } from '@/lib/payroll/engine';

export interface StubRenderProps {
  stub: PayStub;
  businessName: string;
  businessAddress: string;
  employeeName: string;
  employeeAddress: string;
  jobTitle: string;
  frequency: PayFrequency;
  stateName: string;
}

export { fmtDate, fmtMoney };

/** Deterministic fake SSN last-4 derived from the employee name (stable across stubs). */
export function maskedSsn(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const last4 = String(1000 + (h % 9000));
  return `XXX-XX-${last4}`;
}

const ONES = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
  'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN',
  'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

function threeDigits(n: number): string {
  let s = '';
  if (n >= 100) { s += ONES[Math.floor(n / 100)] + ' HUNDRED '; n %= 100; }
  if (n >= 20) { s += TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : ''); }
  else if (n > 0) { s += ONES[n]; }
  return s.trim();
}

function intToWords(n: number): string {
  if (n === 0) return 'ZERO';
  const parts: string[] = [];
  const scales: Array<[number, string]> = [[1e9, 'BILLION'], [1e6, 'MILLION'], [1e3, 'THOUSAND']];
  for (const [v, label] of scales) {
    if (n >= v) { parts.push(threeDigits(Math.floor(n / v)) + ' ' + label); n %= v; }
  }
  if (n > 0) parts.push(threeDigits(n));
  return parts.join(' ');
}

/** "5215.88" -> "FIVE THOUSAND TWO HUNDRED FIFTEEN AND 88/100 DOLLARS" (check style). */
export function amountInWords(amount: number): string {
  const dollars = Math.floor(amount);
  const cents = Math.round((amount - dollars) * 100);
  return `${intToWords(dollars)} AND ${String(cents).padStart(2, '0')}/100 DOLLARS`;
}

/** Short frequency label for stubs. */
export function freqLabel(f: PayFrequency): string {
  return { Monthly: 'Monthly', Semimonthly: 'Semimonthly', Biweekly: 'Bi-Weekly', Weekly: 'Weekly' }[f];
}
