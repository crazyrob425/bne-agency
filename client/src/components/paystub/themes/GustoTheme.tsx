/** THEME 2 — Gusto "Modern Earnings Statement". Coral wordmark, teal rules, humanist sans. */
import type { StubRenderProps } from '../themeUtils';
import { fmtDate, fmtMoney, maskedSsn, freqLabel } from '../themeUtils';

const CORAL = '#F45D48';
const TEAL = '#14A3A3';
const INK = '#1a1a2e';
const GRAY = '#6b7280';

export default function GustoTheme(p: StubRenderProps) {
  const { stub } = p;
  const sans = { fontFamily: "'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif" } as const;

  const th: React.CSSProperties = { ...sans, fontSize: 11, fontWeight: 700, color: INK, textAlign: 'left', padding: '8px 4px', borderBottom: `2px solid ${TEAL}` };
  const td: React.CSSProperties = { ...sans, fontSize: 12, color: INK, padding: '7px 4px', borderBottom: '1px solid #e5e7eb' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };
  const section: React.CSSProperties = { ...sans, fontSize: 15, fontWeight: 700, color: INK, margin: '22px 0 6px', paddingBottom: 4, borderBottom: `2px solid ${TEAL}` };

  // Employer-paid taxes (informational, right column)
  const ssWagesYtd = Math.min(stub.ytdGross, 184500);
  const empSsYtd = ssWagesYtd * 0.062;
  const empMedYtd = stub.ytdGross * 0.0145;
  const futaWagesYtd = Math.min(stub.ytdGross, 7000);
  const empSsCur = Math.min(stub.gross, Math.max(0, 184500 - (stub.ytdGross - stub.gross))) * 0.062;
  const empMedCur = stub.gross * 0.0145;
  const empFutaCur = Math.min(stub.gross, Math.max(0, 7000 - (stub.ytdGross - stub.gross))) * 0.006;

  const vac = stub.leave.find((l) => l.label === 'Vacation');
  const sick = stub.leave.find((l) => l.label === 'Sick Leave');

  return (
    <div style={{ ...sans, background: '#fff', color: INK, padding: '32px 36px' }}>
      {/* Wordmark */}
      <div style={{ ...sans, color: CORAL, fontWeight: 800, fontSize: 26, letterSpacing: -1, marginBottom: 18 }}>gusto</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <div style={{ ...sans, fontSize: 30, fontWeight: 800, color: INK, marginBottom: 4 }}>Earnings Statement</div>
          <div style={{ ...sans, fontSize: 13, color: GRAY }}>
            Pay period: {fmtDate(stub.periodStart)} - {fmtDate(stub.periodEnd)} &nbsp;&nbsp; Pay Day: {fmtDate(stub.payDate)}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700 }}>Company</div>
          <div>{p.businessName}</div>
          <div style={{ color: GRAY }}>{p.businessAddress}</div>
          <div style={{ fontWeight: 700, marginTop: 10 }}>Employee</div>
          <div>{p.employeeName}</div>
          <div style={{ color: GRAY }}>{maskedSsn(p.employeeName)}</div>
          <div style={{ color: GRAY }}>{p.employeeAddress}</div>
        </div>
      </div>

      {/* Earnings */}
      <div style={section}>Employee Earnings</div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr>
          <th style={th}>Description</th><th style={th}>Rate</th><th style={th}>Hours</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>Year To Date</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style={td}>Regular Earnings — {p.jobTitle}</td>
            <td style={td}>{fmtMoney(stub.gross)}</td>
            <td style={td}>Salary</td>
            <td style={num}>{fmtMoney(stub.gross)}</td>
            <td style={num}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
          <tr>
            <td style={{ ...td, fontWeight: 700 }} colSpan={3}>Gross Earnings</td>
            <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.gross)}</td>
            <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
        </tbody>
      </table>

      {/* Taxes side by side */}
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={section}>Employee Taxes Withheld</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={th}>Employee Tax</th>
              <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>Year To Date</th>
            </tr></thead>
            <tbody>
              {stub.deductions.map((d) => (
                <tr key={d.label}><td style={td}>{d.label}</td><td style={num}>{fmtMoney(d.current)}</td><td style={num}>{fmtMoney(d.ytd)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <div style={section}>Company Tax</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={th}>Company Tax</th>
              <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>Year To Date</th>
            </tr></thead>
            <tbody>
              <tr><td style={td}>Social Security</td><td style={num}>{fmtMoney(empSsCur)}</td><td style={num}>{fmtMoney(empSsYtd)}</td></tr>
              <tr><td style={td}>Medicare</td><td style={num}>{fmtMoney(empMedCur)}</td><td style={num}>{fmtMoney(empMedYtd)}</td></tr>
              <tr><td style={td}>FUTA</td><td style={num}>{fmtMoney(empFutaCur)}</td><td style={num}>{fmtMoney(futaWagesYtd * 0.006)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div style={section}>Summary</div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr>
          <th style={th}>Description</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>Year To Date</th>
        </tr></thead>
        <tbody>
          <tr><td style={td}>Gross Earnings</td><td style={num}>{fmtMoney(stub.gross)}</td><td style={num}>{fmtMoney(stub.ytdGross)}</td></tr>
          <tr><td style={td}>Taxes</td><td style={num}>{fmtMoney(stub.totalDeductions)}</td><td style={num}>{fmtMoney(stub.ytdDeductions)}</td></tr>
          <tr><td style={{ ...td, fontWeight: 800, fontSize: 14 }}>Net Pay</td><td style={{ ...num, fontWeight: 800, fontSize: 14 }}>{fmtMoney(stub.net)}</td><td style={{ ...num, fontWeight: 800, fontSize: 14 }}>{fmtMoney(stub.ytdNet)}</td></tr>
          <tr><td style={td}>Check Amount</td><td style={num}>{fmtMoney(stub.net)}</td><td style={num}>{fmtMoney(stub.ytdNet)}</td></tr>
        </tbody>
      </table>

      {/* PTO + Sick */}
      <div style={{ display: 'flex', gap: 32 }}>
        {vac && (
          <div style={{ flex: 1 }}>
            <div style={section}>Paid Time Off Policy</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th style={th}>Description</th><th style={{ ...th, textAlign: 'right' }}>Hours</th></tr></thead>
              <tbody>
                <tr><td style={td}>Hours used this period</td><td style={num}>{vac.ytdUsed.toFixed(2)}</td></tr>
                <tr><td style={td}>Hours accrued this period</td><td style={num}>{vac.accruedThisPeriod.toFixed(2)}</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Remaining balance</td><td style={{ ...num, fontWeight: 700 }}>{vac.balance.toFixed(2)}</td></tr>
              </tbody>
            </table>
          </div>
        )}
        {sick && (
          <div style={{ flex: 1 }}>
            <div style={section}>Sick Policy</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th style={th}>Description</th><th style={{ ...th, textAlign: 'right' }}>Hours</th></tr></thead>
              <tbody>
                <tr><td style={td}>Hours used this period</td><td style={num}>{sick.ytdUsed.toFixed(2)}</td></tr>
                <tr><td style={td}>Hours accrued this period</td><td style={num}>{sick.accruedThisPeriod.toFixed(2)}</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Remaining balance</td><td style={{ ...num, fontWeight: 700 }}>{sick.balance.toFixed(2)}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ ...sans, fontSize: 11, color: GRAY, marginTop: 20 }}>
        Filing Status: Single &nbsp;·&nbsp; Pay Frequency: {freqLabel(p.frequency)} &nbsp;·&nbsp; Check/Advice #: {stub.checkNumber}
        {stub.holidays.length > 0 && <> &nbsp;·&nbsp; Paid holidays in period: {stub.holidays.join(', ')}</>}
      </div>
    </div>
  );
}
