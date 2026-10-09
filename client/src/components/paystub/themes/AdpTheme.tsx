/** THEME 1 — ADP "Classic Check Stub". Monochrome, typewriter mono, check voucher. */
import type { StubRenderProps } from '../themeUtils';
import { fmtDate, fmtMoney, maskedSsn, amountInWords, freqLabel } from '../themeUtils';

const mono = { fontFamily: '"Courier New", Courier, monospace' } as const;

export default function AdpTheme(p: StubRenderProps) {
  const { stub } = p;
  const statutory = stub.deductions;
  const vac = stub.leave.find((l) => l.label === 'Vacation');
  const sick = stub.leave.find((l) => l.label === 'Sick Leave');

  const cell: React.CSSProperties = { ...mono, fontSize: 10, padding: '2px 6px', verticalAlign: 'top' };
  const label: React.CSSProperties = { ...mono, fontSize: 9, color: '#333' };

  return (
    <div style={{ ...mono, background: '#fff', color: '#000', padding: 24, fontSize: 11, lineHeight: 1.45 }}>
      {/* CO. FILE DEPT. CLOCK header */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4 }}>
        <tbody>
          <tr style={label}>
            <td style={cell}>CO.</td><td style={cell}>FILE</td><td style={cell}>DEPT.</td><td style={cell}>CLOCK</td><td style={cell}>NUMBER</td>
          </tr>
          <tr>
            <td style={cell}>001</td><td style={cell}>7{p.stub.checkNumber}</td><td style={cell}>310</td><td style={cell}>0000</td><td style={cell}>{String(p.stub.checkNumber).padStart(8, '0')}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, letterSpacing: 2, margin: '6px 0' }}>
        Earnings Statement
      </div>

      {/* Company / period block */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <tbody>
          <tr>
            <td style={{ ...cell, width: '60%' }}>
              <div style={{ fontWeight: 'bold' }}>{p.businessName.toUpperCase()}</div>
              <div>{p.businessAddress}</div>
            </td>
            <td style={{ ...cell, textAlign: 'right' }}>
              <div>Period ending: {fmtDate(stub.periodEnd)}</div>
              <div>Pay date: {fmtDate(stub.payDate)}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Employee block */}
      <div style={{ borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '6px 0', marginBottom: 8 }}>
        <div style={label}>Social Security Number: {maskedSsn(p.employeeName)} &nbsp;&nbsp; Taxable Marital Status: Single</div>
        <div style={{ fontWeight: 'bold', marginTop: 4 }}>{p.employeeName.toUpperCase()}</div>
        <div>{p.employeeAddress}</div>
        <div style={{ ...label, marginTop: 4 }}>Exemptions/Allowances: &nbsp;Federal: 1 &nbsp;&nbsp; State: 1 &nbsp;&nbsp; Local: 0</div>
        <div style={label}>{p.jobTitle.toUpperCase()} &nbsp;&nbsp;|&nbsp;&nbsp; PAY FREQUENCY: {freqLabel(p.frequency).toUpperCase()}</div>
      </div>

      {/* Earnings */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <thead>
          <tr style={{ ...label, borderBottom: '1px solid #000' }}>
            <td style={cell}>Earnings</td><td style={cell}>rate</td><td style={cell}>hours</td>
            <td style={{ ...cell, textAlign: 'right' }}>this period</td><td style={{ ...cell, textAlign: 'right' }}>year to date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cell}>Regular</td>
            <td style={cell}>{fmtMoney(stub.gross)}</td>
            <td style={cell}>Salary</td>
            <td style={{ ...cell, textAlign: 'right' }}>{fmtMoney(stub.gross)}</td>
            <td style={{ ...cell, textAlign: 'right' }}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
          <tr style={{ fontWeight: 'bold' }}>
            <td style={cell}>Gross Pay</td><td style={cell} /><td style={cell} />
            <td style={{ ...cell, textAlign: 'right' }}>$ {fmtMoney(stub.gross)}</td>
            <td style={{ ...cell, textAlign: 'right' }}>{fmtMoney(stub.ytdGross)}</td>
          </tr>
        </tbody>
      </table>

      {/* Deductions */}
      <div style={{ ...label, fontWeight: 'bold', marginBottom: 2 }}>Deductions &nbsp;&nbsp; Statutory</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <tbody>
          {statutory.map((d) => (
            <tr key={d.label}>
              <td style={{ ...cell, width: '60%' }}>{d.label}</td>
              <td style={{ ...cell, textAlign: 'right' }}>-{fmtMoney(d.current)}</td>
              <td style={{ ...cell, textAlign: 'right' }}>-{fmtMoney(d.ytd)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: 'bold', borderTop: '1px solid #000' }}>
            <td style={cell}>Total Deductions</td>
            <td style={{ ...cell, textAlign: 'right' }}>-{fmtMoney(stub.totalDeductions)}</td>
            <td style={{ ...cell, textAlign: 'right' }}>-{fmtMoney(stub.ytdDeductions)}</td>
          </tr>
        </tbody>
      </table>

      {/* Other Benefits and Information */}
      <div style={{ border: '1px solid #000', padding: 6, marginBottom: 8 }}>
        <div style={{ ...label, fontWeight: 'bold', marginBottom: 4 }}>Other Benefits and Information</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={label}>
              <td style={cell} /><td style={{ ...cell, textAlign: 'right' }}>this period</td><td style={{ ...cell, textAlign: 'right' }}>total to date</td>
            </tr>
            {vac && (
              <tr><td style={cell}>Vac Hrs</td><td style={{ ...cell, textAlign: 'right' }}>{vac.accruedThisPeriod.toFixed(2)}</td><td style={{ ...cell, textAlign: 'right' }}>{vac.balance.toFixed(2)}</td></tr>
            )}
            {sick && (
              <tr><td style={cell}>Sick Hrs</td><td style={{ ...cell, textAlign: 'right' }}>{sick.accruedThisPeriod.toFixed(2)}</td><td style={{ ...cell, textAlign: 'right' }}>{sick.balance.toFixed(2)}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Important Notes */}
      <div style={{ border: '1px solid #000', padding: 6, marginBottom: 8 }}>
        <div style={{ ...label, fontWeight: 'bold' }}>Important Notes</div>
        <div style={{ ...mono, fontSize: 9 }}>YOUR FEDERAL WAGES THIS PERIOD ARE ${fmtMoney(stub.gross)}. STATE WAGES ARE SUBJECT TO {p.stateName.toUpperCase()} WITHHOLDING REQUIREMENTS.</div>
      </div>

      <div style={{ fontWeight: 'bold', fontSize: 13, margin: '8px 0' }}>
        Net Pay: &nbsp;$ {fmtMoney(stub.net)}
      </div>

      {/* Check */}
      <div style={{ position: 'relative', border: '2px solid #000', padding: 12, marginTop: 12, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '38%', left: '8%', transform: 'rotate(-18deg)', fontSize: 34, fontWeight: 'bold', color: 'rgba(0,0,0,0.12)', letterSpacing: 6, pointerEvents: 'none' }}>
          NON-NEGOTIABLE
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', position: 'relative' }}>
          <tbody>
            <tr>
              <td style={{ ...cell, width: '65%' }}>
                <div style={{ fontWeight: 'bold' }}>{p.businessName.toUpperCase()}</div>
                <div style={label}>{p.businessAddress}</div>
              </td>
              <td style={{ ...cell, textAlign: 'right' }}>
                <div>Payroll check number: {String(stub.checkNumber).padStart(10, '0')}</div>
                <div>Pay date: {fmtDate(stub.payDate)}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ ...cell, marginTop: 8 }}>Pay to the order of: <span style={{ fontWeight: 'bold' }}>{p.employeeName.toUpperCase()}</span></div>
        <div style={{ ...cell, border: '1px solid #000', margin: '6px 0', padding: 4 }}>{amountInWords(stub.net)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...cell }}>
          <span>Social Security No.: {maskedSsn(p.employeeName)}</span>
          <span style={{ fontWeight: 'bold', fontSize: 14 }}>$ {fmtMoney(stub.net)}</span>
        </div>
      </div>
    </div>
  );
}
