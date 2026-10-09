/** Liberty Trust — red/blue bank with white header and flag-stripe accent. */
import type { StatementRenderProps } from '../themeUtils';
import { fmtCents, fmtDate, LogoMark, SampleBanner, VerificationPanel, StatementFooter } from '../themeUtils';

export default function LibertyTheme(p: StatementRenderProps) {
  const { bank, statement } = p;
  const font = 'Arial, Helvetica, sans-serif';
  const th: React.CSSProperties = { background: bank.tableHeaderBg, color: bank.tableHeaderText, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, textAlign: 'left', padding: '8px' };
  const td: React.CSSProperties = { fontSize: 10, padding: '7px 8px', borderBottom: '1px solid #E5E7EB' };
  const num: React.CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };

  return (
    <div style={{ background: '#fff', color: '#111827', fontFamily: font, fontSize: 11 }}>
      <SampleBanner />
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <LogoMark bank={bank} size={44} />
        <div>
          <div style={{ fontSize: 21, fontWeight: 800, color: bank.accent }}>{bank.name}</div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>{bank.tagline}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 10, color: '#4B5563' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: bank.primary }}>Personal Checking Statement</div>
          <div>{fmtDate(p.periodStart)} through {fmtDate(p.periodEnd)}</div>
        </div>
      </div>
      {/* flag stripe */}
      <div style={{ display: 'flex', height: 6, marginTop: 12 }}>
        <div style={{ flex: 3, background: bank.primary }} />
        <div style={{ flex: 1, background: bank.accent }} />
      </div>

      <div style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 10 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12 }}>{p.holderName}</div>
            <div style={{ color: '#4B5563' }}>{p.holderAddress}</div>
          </div>
          <div style={{ textAlign: 'right', color: '#4B5563' }}>
            <div>Account: <b style={{ color: '#111827' }}>XXXXXX{p.accountLast4}</b></div>
            <div>Routing: <b style={{ color: '#111827' }}>026009593</b> (sample)</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1px solid ${bank.accent}`, borderRadius: 6, overflow: 'hidden', marginBottom: 18 }}>
          {[
            ['Beginning Balance', statement.startingBalanceCents, bank.accent],
            ['Total Credits', statement.totalDepositsCents, '#047857'],
            ['Total Debits', statement.totalWithdrawalsCents, bank.primary],
            ['Ending Balance', statement.endingBalanceCents, bank.accent],
          ].map(([label, cents, color]) => (
            <div key={label as string} style={{ padding: '12px', background: '#fff', borderRight: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.7, color: '#6B7280' }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: color as string }}>${fmtCents(cents as number)}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 800, color: bank.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Account Activity</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Post Date</th><th style={th}>Transaction Description</th>
            <th style={{ ...th, textAlign: 'right' }}>Debit</th>
            <th style={{ ...th, textAlign: 'right' }}>Credit</th>
            <th style={{ ...th, textAlign: 'right' }}>Running Balance</th>
          </tr></thead>
          <tbody>
            {statement.transactions.map((t, i) => (
              <tr key={i}>
                <td style={{ ...td, whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                <td style={td}>{t.description}</td>
                <td style={num}>{t.debitCents ? `(${fmtCents(t.debitCents)})` : '—'}</td>
                <td style={{ ...num, color: '#047857', fontWeight: 600 }}>{t.creditCents ? fmtCents(t.creditCents) : '—'}</td>
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
