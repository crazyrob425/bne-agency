/** Apex Bank — modern dark fintech-style statement. */
import type { StatementRenderProps } from '../themeUtils';
import { fmtCents, fmtDate, LogoMark, SampleBanner, StatementFooter } from '../themeUtils';

export default function ApexTheme(p: StatementRenderProps) {
  const { bank, statement } = p;
  const font = '"Inter", "SF Pro Display", Arial, sans-serif';
  const th: React.CSSProperties = { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#9CA3AF', textAlign: 'left', padding: '10px 8px', borderBottom: `2px solid ${bank.accent}` };
  const td: React.CSSProperties = { fontSize: 10.5, padding: '9px 8px', borderBottom: '1px solid #1F2937', color: '#E5E7EB' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };

  return (
    <div style={{ background: '#0F1420', color: '#F3F4F6', fontFamily: font, fontSize: 11 }}>
      <SampleBanner />
      <div style={{ padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid #1F2937' }}>
        <LogoMark bank={{ ...bank, primary: bank.accent }} size={44} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>{bank.name}</div>
          <div style={{ fontSize: 10, color: '#9CA3AF' }}>{bank.tagline}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: bank.accent }}>360 Checking Statement</div>
          <div style={{ fontSize: 10, color: '#9CA3AF' }}>{fmtDate(p.periodStart)} — {fmtDate(p.periodEnd)}</div>
        </div>
      </div>

      <div style={{ padding: '20px 26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, fontSize: 10, color: '#9CA3AF' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.holderName}</div>
            <div>{p.holderAddress}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>Account <span style={{ color: '#fff', fontWeight: 700 }}>•••{p.accountLast4}</span></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            ['Starting', statement.startingBalanceCents],
            ['Money in', statement.totalDepositsCents],
            ['Money out', statement.totalWithdrawalsCents],
            ['Ending', statement.endingBalanceCents],
          ].map(([label, cents], i) => (
            <div key={i} style={{
              background: i === 3 ? bank.accent : '#1A2233', borderRadius: 10, padding: '12px 14px',
              color: i === 3 ? '#fff' : '#E5E7EB',
            }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.75 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>${fmtCents(cents as number)}</div>
            </div>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Date</th><th style={th}>Description</th>
            <th style={{ ...th, textAlign: 'right' }}>Amount</th>
            <th style={{ ...th, textAlign: 'right' }}>Balance</th>
          </tr></thead>
          <tbody>
            {statement.transactions.map((t, i) => (
              <tr key={i}>
                <td style={{ ...td, whiteSpace: 'nowrap', color: '#9CA3AF' }}>{fmtDate(t.date)}</td>
                <td style={td}>{t.description}</td>
                <td style={{ ...num, color: t.debitCents ? '#FCA5A5' : '#6EE7B7', fontWeight: 600 }}>
                  {t.debitCents ? `−$${fmtCents(t.debitCents)}` : `+$${fmtCents(t.creditCents)}`}
                </td>
                <td style={num}>${fmtCents(t.balanceCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ border: '1px solid #374151', borderRadius: 8, padding: 12, marginTop: 16, background: '#1A2233' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 6, color: '#6EE7B7' }}>
            ✓ STATEMENT VERIFIED — TRIPLE-CHECKED
          </div>
          {statement.verification.messages.map((m, i) => (
            <div key={i} style={{ fontSize: 10, color: '#D1D5DB', marginBottom: 3 }}>• {m}</div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 9, color: '#6B7280', lineHeight: 1.5 }}>
          <p style={{ margin: '0 0 4px' }}>
            This is a computer-generated sample statement for demonstration and software-testing purposes only.
            It was not issued by {bank.name} or any financial institution and does not represent a real account.
          </p>
        </div>
      </div>
    </div>
  );
}
