/** Evergreen Bank — friendly green community-bank statement. */
import type { StatementRenderProps } from '../themeUtils';
import { fmtCents, fmtDate, LogoMark, SampleBanner, VerificationPanel, StatementFooter } from '../themeUtils';

export default function EvergreenTheme(p: StatementRenderProps) {
  const { bank, statement } = p;
  const font = 'Arial, Helvetica, sans-serif';
  const th: React.CSSProperties = { background: bank.tableHeaderBg, color: bank.tableHeaderText, fontSize: 10, fontWeight: 700, textAlign: 'left', padding: '8px 10px' };
  const td: React.CSSProperties = { fontSize: 10.5, padding: '7px 10px', borderBottom: '1px solid #D1E7D6' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };

  return (
    <div style={{ background: '#fff', color: '#1F2937', fontFamily: font, fontSize: 11 }}>
      <SampleBanner />
      <div style={{ background: bank.headerBg, color: bank.headerText, padding: '20px 26px', borderBottom: `5px solid ${bank.accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            width: 46, height: 46, borderRadius: '50%', background: '#fff', color: bank.primary,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 20, flexShrink: 0,
          }}>{bank.code.slice(0, 1)}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{bank.name}</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>{bank.tagline}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Simple Checking Statement</div>
            <div style={{ fontSize: 10, opacity: 0.9 }}>{fmtDate(p.periodStart)} – {fmtDate(p.periodEnd)}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 10, color: '#4B5563' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{p.holderName}</div>
            <div>{p.holderAddress}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>Account number <b style={{ color: '#111827' }}>******{p.accountLast4}</b></div>
            <div>Questions? This is a sample — no action needed.</div>
          </div>
        </div>

        <div style={{ background: bank.summaryBg, borderRadius: 12, padding: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18, border: `1px solid ${bank.primary}44` }}>
          {[
            ['Beginning balance', statement.startingBalanceCents],
            ['Deposits', statement.totalDepositsCents],
            ['Withdrawals', statement.totalWithdrawalsCents],
            ['Ending balance', statement.endingBalanceCents],
          ].map(([label, cents]) => (
            <div key={label as string} style={{ background: '#fff', borderRadius: 8, padding: '10px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, color: '#6B7280' }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: bank.primary }}>${fmtCents(cents as number)}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 800, color: bank.primary, marginBottom: 8 }}>Transactions</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Date</th><th style={th}>Description</th>
            <th style={{ ...th, textAlign: 'right' }}>Withdrawal</th>
            <th style={{ ...th, textAlign: 'right' }}>Deposit</th>
            <th style={{ ...th, textAlign: 'right' }}>Balance</th>
          </tr></thead>
          <tbody>
            {statement.transactions.map((t, i) => (
              <tr key={i} style={{ background: i % 2 ? '#F0FAF3' : '#fff' }}>
                <td style={{ ...td, whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                <td style={td}>{t.description}</td>
                <td style={num}>{t.debitCents ? `$${fmtCents(t.debitCents)}` : ''}</td>
                <td style={{ ...num, color: bank.primary, fontWeight: 600 }}>{t.creditCents ? `$${fmtCents(t.creditCents)}` : ''}</td>
                <td style={num}>${fmtCents(t.balanceCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <VerificationPanel statement={statement} />
        <StatementFooter bank={bank} />
      </div>
    </div>
  );
}
