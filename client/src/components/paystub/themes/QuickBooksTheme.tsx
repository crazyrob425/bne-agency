/** THEME 3 — QuickBooks Payroll "Intuit Voucher Stub". Dense, utilitarian, company info top AND bottom. */
import type { StubRenderProps } from '../themeUtils';
import { fmtDate, fmtMoney, maskedSsn, freqLabel } from '../themeUtils';

export default function QuickBooksTheme(p: StubRenderProps) {
  const { stub } = p;
  const arial = { fontFamily: 'Arial, Helvetica, sans-serif' } as const;
  const td: React.CSSProperties = { ...arial, fontSize: 11, padding: '3px 6px', borderBottom: '1px solid #ddd' };
  const th: React.CSSProperties = { ...td, fontWeight: 'bold', background: '#f0f0f0', borderBottom: '1px solid #999' };
  const num: React.CSSProperties = { ...td, textAlign: 'right' };

  const vac = stub.leave.find((l) => l.label === 'Vacation');
  const sick = stub.leave.find((l) => l.label === 'Sick Leave');

  const companyBlock = (
    <div style={{ ...arial, fontSize: 12, marginBottom: 10 }}>
      <div style={{ fontWeight: 'bold' }}>{p.businessName}</div>
      <div>{p.businessAddress}</div>
    </div>
  );

  return (
    <div style={{ ...arial, background: '#fff', color: '#000', padding: 28, fontSize: 11 }}>
      {companyBlock}

      <div style={{ fontSize: 16, fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: 4, marginBottom: 10 }}>
        Pay Stub
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
        <tbody>
          <tr>
            <td style={{ ...td, width: '55%', border: 'none' }}>
              <div style={{ fontWeight: 'bold' }}>{p.employeeName}</div>
              <div>{p.employeeAddress}</div>
              <div style={{ color: '#555' }}>SSN: {maskedSsn(p.employeeName)}</div>
            </td>
            <td style={{ ...td, border: 'none', verticalAlign: 'top' }}>
              <div><b>Pay period:</b> {fmtDate(stub.periodStart)} - {fmtDate(stub.periodEnd)}</div>
              <div><b>Pay date:</b> {fmtDate(stub.payDate)}</div>
              <div><b>Pay frequency:</b> {freqLabel(p.frequency)}</div>
              <div><b>Check no:</b> {stub.checkNumber}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
        <thead><tr>
          <th style={th}>Payroll Item</th><th style={th}>Rate</th><th style={th}>Hours</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style={td}>Regular Pay — {p.jobTitle}</td><td style={td}>{fmtMoney(stub.gross)}</td><td style={td}>Salary</td>
            <td style={num}>{fmtMoney(stub.gross)}</td><td style={num}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
          <tr>
            <td style={{ ...td, fontWeight: 'bold' }} colSpan={3}>Gross Pay</td>
            <td style={{ ...num, fontWeight: 'bold' }}>{fmtMoney(stub.gross)}</td>
            <td style={{ ...num, fontWeight: 'bold' }}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
        <thead><tr>
          <th style={th}>Taxes &amp; Deductions</th>
          <th style={{ ...th, textAlign: 'right' }}>Current</th><th style={{ ...th, textAlign: 'right' }}>YTD</th>
        </tr></thead>
        <tbody>
          {stub.deductions.map((d) => (
            <tr key={d.label}><td style={td}>{d.label}</td><td style={num}>({fmtMoney(d.current)})</td><td style={num}>({fmtMoney(d.ytd)})</td></tr>
          ))}
          <tr>
            <td style={{ ...td, fontWeight: 'bold' }}>Total Taxes &amp; Deductions</td>
            <td style={{ ...num, fontWeight: 'bold' }}>({fmtMoney(stub.totalDeductions)})</td>
            <td style={{ ...num, fontWeight: 'bold' }}>({fmtMoney(stub.ytdDeductions)})</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
        <tbody>
          <tr>
            <td style={{ ...td, fontWeight: 'bold', fontSize: 13, border: 'none' }}>Net Pay</td>
            <td style={{ ...num, fontWeight: 'bold', fontSize: 13, border: 'none' }}>{fmtMoney(stub.net)}</td>
            <td style={{ ...num, fontWeight: 'bold', fontSize: 13, border: 'none' }}>{fmtMoney(stub.ytdNet)}</td>
          </tr>
        </tbody>
      </table>

      {(vac || sick) && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
          <thead><tr>
            <th style={th}>Leave</th><th style={{ ...th, textAlign: 'right' }}>Accrued</th><th style={{ ...th, textAlign: 'right' }}>Balance</th>
          </tr></thead>
          <tbody>
            {vac && <tr><td style={td}>Vacation</td><td style={num}>{vac.accruedThisPeriod.toFixed(2)}</td><td style={num}>{vac.balance.toFixed(2)}</td></tr>}
            {sick && <tr><td style={td}>Sick</td><td style={num}>{sick.accruedThisPeriod.toFixed(2)}</td><td style={num}>{sick.balance.toFixed(2)}</td></tr>}
          </tbody>
        </table>
      )}

      {stub.holidays.length > 0 && (
        <div style={{ ...arial, fontSize: 10, color: '#555', marginBottom: 10 }}>
          Paid holidays in this period: {stub.holidays.join(', ')}
        </div>
      )}

      {/* Company info repeated at the bottom — signature QuickBooks voucher trait */}
      <div style={{ borderTop: '2px solid #000', paddingTop: 10, marginTop: 14 }}>
        {companyBlock}
        <div style={{ ...arial, fontSize: 10, color: '#555' }}>
          Filing Status: Single &nbsp;·&nbsp; This voucher was generated by {p.businessName} payroll.
        </div>
      </div>
    </div>
  );
}
