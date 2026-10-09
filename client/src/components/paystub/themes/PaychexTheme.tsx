/** THEME 4 — Paychex "Flex Check Stub". Corporate blue header band, clean sans. */
import type { StubRenderProps } from '../themeUtils';
import { fmtDate, fmtMoney, maskedSsn, freqLabel } from '../themeUtils';

const BLUE = '#005EB8';

export default function PaychexTheme(p: StubRenderProps) {
  const { stub } = p;
  const sans = { fontFamily: "'Helvetica Neue', Arial, sans-serif" } as const;
  const th: React.CSSProperties = { ...sans, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#fff', background: BLUE, padding: '7px 8px', textAlign: 'left' };
  const td: React.CSSProperties = { ...sans, fontSize: 12, padding: '6px 8px', borderBottom: '1px solid #e2e8f0' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

  const vac = stub.leave.find((l) => l.label === 'Vacation');
  const sick = stub.leave.find((l) => l.label === 'Sick Leave');

  return (
    <div style={{ ...sans, background: '#fff', color: '#0f172a' }}>
      {/* Blue header band */}
      <div style={{ background: BLUE, color: '#fff', padding: '18px 28px' }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{p.businessName}</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>{p.businessAddress}</div>
      </div>

      <div style={{ padding: '20px 28px' }}>
        {/* Employee block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 12 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{p.employeeName}</div>
            <div style={{ color: '#475569' }}>{p.employeeAddress}</div>
            <div style={{ color: '#475569' }}>SSN: {maskedSsn(p.employeeName)} &nbsp;·&nbsp; Filing Status: Single</div>
            <div style={{ color: '#475569' }}>{p.jobTitle}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div><b>Pay period:</b> {fmtDate(stub.periodStart)} – {fmtDate(stub.periodEnd)}</div>
            <div><b>Check date:</b> {fmtDate(stub.payDate)}</div>
            <div><b>Check no:</b> {stub.checkNumber}</div>
            <div><b>Frequency:</b> {freqLabel(p.frequency)}</div>
          </div>
        </div>

        {/* Earnings */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <thead><tr>
            <th style={th}>Earnings</th><th style={th}>Rate</th><th style={th}>Hours</th>
            <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
          </tr></thead>
          <tbody>
            <tr>
              <td style={td}>Regular</td><td style={td}>{fmtMoney(stub.gross)}</td><td style={td}>Salary</td>
              <td style={num}>{fmtMoney(stub.gross)}</td><td style={num}>{fmtMoney(stub.ytdGross)}</td>
            </tr>
            <tr>
              <td style={{ ...td, fontWeight: 700 }} colSpan={3}>Gross Pay</td>
              <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.gross)}</td>
              <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.ytdGross)}</td>
            </tr>
          </tbody>
        </table>

        {/* Deductions */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <thead><tr>
            <th style={th}>Deductions</th>
            <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
          </tr></thead>
          <tbody>
            {stub.deductions.map((d) => (
              <tr key={d.label}><td style={td}>{d.label}</td><td style={num}>{fmtMoney(d.current)}</td><td style={num}>{fmtMoney(d.ytd)}</td></tr>
            ))}
            <tr>
              <td style={{ ...td, fontWeight: 700 }}>Total Deductions</td>
              <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.totalDeductions)}</td>
              <td style={{ ...num, fontWeight: 700 }}>{fmtMoney(stub.ytdDeductions)}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary band */}
        <div style={{ background: '#eff6ff', border: `1px solid ${BLUE}`, borderRadius: 6, padding: 14, display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#475569' }}>Net Pay</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: BLUE }}>${fmtMoney(stub.net)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#475569' }}>YTD Net Pay</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>${fmtMoney(stub.ytdNet)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#475569' }}>YTD Gross</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>${fmtMoney(stub.ytdGross)}</div>
          </div>
        </div>

        {/* Leave */}
        {(vac || sick) && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={th}>Leave Balances</th>
              <th style={{ ...th, textAlign: 'right' }}>Accrued</th><th style={{ ...th, textAlign: 'right' }}>Balance</th>
            </tr></thead>
            <tbody>
              {vac && <tr><td style={td}>Vacation</td><td style={num}>{vac.accruedThisPeriod.toFixed(2)}</td><td style={num}>{vac.balance.toFixed(2)}</td></tr>}
              {sick && <tr><td style={td}>Sick Leave</td><td style={num}>{sick.accruedThisPeriod.toFixed(2)}</td><td style={num}>{sick.balance.toFixed(2)}</td></tr>}
            </tbody>
          </table>
        )}
        {stub.holidays.length > 0 && (
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 10 }}>Paid holidays in this period: {stub.holidays.join(', ')}</div>
        )}
      </div>
    </div>
  );
}
