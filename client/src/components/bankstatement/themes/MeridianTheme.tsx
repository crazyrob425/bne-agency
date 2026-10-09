/** Meridian National — classic deep-blue national bank statement. */
import type { StatementRenderProps } from '../themeUtils';
import { fmtCents, fmtDate, LogoMark, SampleBanner, VerificationPanel, StatementFooter } from '../themeUtils';

export default function MeridianTheme(p: StatementRenderProps) {
  const { bank, statement } = p;
  const font = 'Arial, Helvetica, sans-serif';
  const th: React.CSSProperties = { background: bank.tableHeaderBg, color: bank.tableHeaderText, fontSize: 10, fontWeight: 700, textAlign: 'left', padding: '7px 8px', letterSpacing: 0.5 };
  const td: React.CSSProperties = { fontSize: 10, padding: '6px 8px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'top' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };

  return (
    <div style={{ background: '#fff', color: '#111827', fontFamily: font, fontSize: 11 }}>
      <SampleBanner />
      {/* Header band */}
      <div style={{ background: bank.headerBg, color: bank.headerText, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <LogoMark bank={bank} size={46} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{bank.name}</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>{bank.tagline}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Checking Account Statement</div>
          <div style={{ fontSize: 10, opacity: 0.85 }}>{fmtDate(p.periodStart)} – {fmtDate(p.periodEnd)}</div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* Holder + account */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{p.holderName}</div>
            <div style={{ fontSize: 10, color: '#4B5563' }}>{p.holderAddress}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 10, color: '#4B5563' }}>
            <div>Account number: <b style={{ color: '#111827' }}>••••{p.accountLast4}</b></div>
            <div>Statement period: <b style={{ color: '#111827' }}>{fmtDate(p.periodStart)} – {fmtDate(p.periodEnd)}</b></div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: bank.summaryBg, border: `1px solid ${bank.primary}33`, borderRadius: 8, padding: 14, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
          {[
            ['Beginning balance', statement.startingBalanceCents],
            ['Deposits / Credits', statement.totalDepositsCents],
            ['Withdrawals / Debits', statement.totalWithdrawalsCents],
            ['Ending balance', statement.endingBalanceCents],
          ].map(([label, cents]) => (
            <div key={label as string}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, color: '#4B5563' }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: bank.primary }}>${fmtCents(cents as number)}</div>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 8, color: bank.primary }}>Transaction Detail</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Date</th><th style={th}>Description</th>
              <th style={{ ...th, textAlign: 'right' }}>Withdrawals</th>
              <th style={{ ...th, textAlign: 'right' }}>Deposits</th>
              <th style={{ ...th, textAlign: 'right' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {statement.transactions.map((t, i) => (
              <tr key={i} style={{ background: i % 2 ? '#F8FAFC' : '#fff' }}>
                <td style={{ ...td, whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                <td style={td}>{t.description}</td>
                <td style={num}>{t.debitCents ? `$${fmtCents(t.debitCents)}` : ''}</td>
                <td style={num}>{t.creditCents ? `$${fmtCents(t.creditCents)}` : ''}</td>
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
