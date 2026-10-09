/** Frontier Bank — classic serif ledger statement, western red + gold. */
import type { StatementRenderProps } from '../themeUtils';
import { fmtCents, fmtDate, LogoMark, SampleBanner, VerificationPanel, StatementFooter } from '../themeUtils';

export default function FrontierTheme(p: StatementRenderProps) {
  const { bank, statement } = p;
  const font = 'Georgia, "Times New Roman", serif';
  const th: React.CSSProperties = { background: bank.tableHeaderBg, color: bank.tableHeaderText, fontSize: 10, fontWeight: 700, textAlign: 'left', padding: '7px 10px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: 0.4 };
  const td: React.CSSProperties = { fontSize: 10.5, padding: '6px 10px', borderBottom: '1px solid #E7E0D0' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', fontFamily: 'Arial, Helvetica, sans-serif' };

  return (
    <div style={{ background: '#FFFEF9', color: '#1F2937', fontFamily: font, fontSize: 11 }}>
      <SampleBanner />
      <div style={{ background: bank.headerBg, color: bank.headerText, padding: '20px 28px', borderBottom: `4px solid ${bank.accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LogoMark bank={bank} size={48} />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>{bank.name}</div>
            <div style={{ fontSize: 11, fontStyle: 'italic', opacity: 0.9 }}>{bank.tagline}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Everyday Checking — Statement</div>
            <div style={{ fontSize: 10, opacity: 0.9 }}>{fmtDate(p.periodStart)} to {fmtDate(p.periodEnd)}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{p.holderName}</div>
            <div style={{ fontSize: 10, fontFamily: 'Arial, Helvetica, sans-serif', color: '#6B7280' }}>{p.holderAddress}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 10, fontFamily: 'Arial, Helvetica, sans-serif', color: '#6B7280' }}>
            <div>Account ending in <b style={{ color: '#111827' }}>{p.accountLast4}</b></div>
            <div>Statement date <b style={{ color: '#111827' }}>{fmtDate(p.periodEnd)}</b></div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18, border: `1px solid ${bank.primary}` }}>
          <tbody>
            {[
              ['Beginning balance on ' + fmtDate(p.periodStart), statement.startingBalanceCents],
              ['Deposits and other credits', statement.totalDepositsCents],
              ['Withdrawals and other debits', statement.totalWithdrawalsCents],
              ['Ending balance on ' + fmtDate(p.periodEnd), statement.endingBalanceCents],
            ].map(([label, cents], i) => (
              <tr key={i} style={{ background: i === 3 ? bank.summaryBg : '#fff' }}>
                <td style={{ fontSize: 11, padding: '8px 12px', fontWeight: i === 3 ? 700 : 400 }}>{label}</td>
                <td style={{ fontSize: 13, padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'Arial, Helvetica, sans-serif', color: bank.primary }}>
                  ${fmtCents(cents as number)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, borderBottom: `2px solid ${bank.accent}`, paddingBottom: 4 }}>Transaction History</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Date</th><th style={th}>Description</th>
            <th style={{ ...th, textAlign: 'right' }}>Amount</th>
            <th style={{ ...th, textAlign: 'right' }}>Balance</th>
          </tr></thead>
          <tbody>
            {statement.transactions.map((t, i) => (
              <tr key={i} style={{ background: i % 2 ? '#FAF7EE' : 'transparent' }}>
                <td style={{ ...td, whiteSpace: 'nowrap', fontFamily: 'Arial, Helvetica, sans-serif' }}>{fmtDate(t.date)}</td>
                <td style={td}>{t.description}</td>
                <td style={{ ...num, color: t.debitCents ? '#991B1B' : '#166534' }}>
                  {t.debitCents ? `−$${fmtCents(t.debitCents)}` : `+$${fmtCents(t.creditCents)}`}
                </td>
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
