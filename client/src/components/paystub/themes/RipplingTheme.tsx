/** THEME 5 — Rippling "Minimalist Digital Pay Statement". Stark black-on-white, geometric sans. */
import type { StubRenderProps } from '../themeUtils';
import { fmtDate, fmtMoney, maskedSsn, freqLabel } from '../themeUtils';

export default function RipplingTheme(p: StubRenderProps) {
  const { stub } = p;
  const geo = { fontFamily: "'Inter','SF Pro Display','Helvetica Neue',Arial,sans-serif" } as const;
  const th: React.CSSProperties = { ...geo, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: '#888', textAlign: 'left', padding: '10px 0', borderBottom: '1px solid #111' };
  const td: React.CSSProperties = { ...geo, fontSize: 13, padding: '9px 0', borderBottom: '1px solid #eee' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

  const vac = stub.leave.find((l) => l.label === 'Vacation');
  const sick = stub.leave.find((l) => l.label === 'Sick Leave');

  return (
    <div style={{ ...geo, background: '#fff', color: '#111', padding: '40px 44px' }}>
      {/* Stark header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 3 }}>RIPPLING</div>
          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{p.businessName}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#555', lineHeight: 1.7 }}>
          <div>{p.businessAddress}</div>
        </div>
      </div>

      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>Pay Statement</div>
      <div style={{ fontSize: 13, color: '#555', marginBottom: 24 }}>
        {fmtDate(stub.periodStart)} – {fmtDate(stub.periodEnd)} &nbsp;·&nbsp; Paid {fmtDate(stub.payDate)}
      </div>

      {/* Employee */}
      <div style={{ display: 'flex', gap: 48, fontSize: 13, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Employee</div>
          <div style={{ fontWeight: 600 }}>{p.employeeName}</div>
          <div style={{ color: '#555' }}>{p.employeeAddress}</div>
          <div style={{ color: '#555' }}>{maskedSsn(p.employeeName)}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Details</div>
          <div>{p.jobTitle}</div>
          <div style={{ color: '#555' }}>{freqLabel(p.frequency)} · Single</div>
          <div style={{ color: '#555' }}>Statement #{stub.checkNumber}</div>
        </div>
      </div>

      {/* Earnings */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <thead><tr>
          <th style={th}>Earnings</th><th style={th}>Rate</th><th style={th}>Hours</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style={td}>Salary</td><td style={td}>{fmtMoney(stub.gross)}</td><td style={td}>—</td>
            <td style={num}>{fmtMoney(stub.gross)}</td><td style={num}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
        </tbody>
      </table>

      {/* Deductions */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <thead><tr>
          <th style={th}>Deductions</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
        </tr></thead>
        <tbody>
          {stub.deductions.map((d) => (
            <tr key={d.label}><td style={td}>{d.label}</td><td style={num}>{fmtMoney(d.current)}</td><td style={num}>{fmtMoney(d.ytd)}</td></tr>
          ))}
        </tbody>
      </table>

      {/* Net */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '2px solid #111', marginTop: 16, paddingTop: 14, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Net pay</div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>${fmtMoney(stub.net)}</div>
      </div>

      {/* YTD + leave */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr>
          <th style={th}>Year to date</th><th style={{ ...th, textAlign: 'right' }}>Amount</th>
        </tr></thead>
        <tbody>
          <tr><td style={td}>Gross earnings</td><td style={num}>{fmtMoney(stub.ytdGross)}</td></tr>
          <tr><td style={td}>Total deductions</td><td style={num}>{fmtMoney(stub.ytdDeductions)}</td></tr>
          <tr><td style={td}>Net pay</td><td style={num}>{fmtMoney(stub.ytdNet)}</td></tr>
          {vac && <tr><td style={td}>Vacation balance</td><td style={num}>{vac.balance.toFixed(2)} hrs</td></tr>}
          {sick && <tr><td style={td}>Sick leave balance</td><td style={num}>{sick.balance.toFixed(2)} hrs</td></tr>}
        </tbody>
      </table>

      {stub.holidays.length > 0 && (
        <div style={{ fontSize: 11, color: '#888', marginTop: 16 }}>Holidays in this period: {stub.holidays.join(', ')}</div>
      )}
    </div>
  );
}
