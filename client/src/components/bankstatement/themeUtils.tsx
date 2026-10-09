import type { StatementResult } from '@/lib/bankStatement/engine';
import { fmtCents, fmtDate } from '@/lib/bankStatement/engine';
import type { BankProfile } from '@/lib/bankStatement/banks';

export interface StatementRenderProps {
  bank: BankProfile;
  statement: StatementResult;
  holderName: string;
  holderAddress: string;
  accountLast4: string;
  periodStart: Date;
  periodEnd: Date;
}

export { fmtCents, fmtDate };

/** Original geometric logo mark rendered in pure CSS. */
export function LogoMark({ bank, size = 40 }: { bank: BankProfile; size?: number }) {
  const s = size;
  const base: React.CSSProperties = {
    width: s, height: s, borderRadius: s * 0.18, background: bank.primary,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 900, flexShrink: 0,
    fontFamily: 'Arial, Helvetica, sans-serif', fontSize: s * 0.42,
  };
  return <span style={base}>{bank.code.slice(0, 1)}</span>;
}

export function SampleBanner() {
  return (
    <div style={{
      background: '#FEF3C7', border: '1px dashed #D97706', color: '#92400E',
      fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textAlign: 'center',
      padding: '6px 8px', fontFamily: 'Arial, Helvetica, sans-serif',
    }}>
      GENERATED SAMPLE STATEMENT — NOT ISSUED BY ANY BANK — FOR DEMONSTRATION ONLY
    </div>
  );
}

export function VerificationPanel({ statement }: { statement: StatementResult }) {
  const v = statement.verification;
  const allOk = v.chronological && v.balancesRecomputed && v.totalsReconcile;
  return (
    <div style={{ border: '1px solid #D1D5DB', borderRadius: 6, padding: 12, marginTop: 16, background: '#F9FAFB', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 6, color: allOk ? '#047857' : '#B91C1C' }}>
        {allOk ? '✓ STATEMENT VERIFIED — TRIPLE-CHECKED' : '✗ VERIFICATION FAILED'}
      </div>
      {v.messages.map((m, i) => (
        <div key={i} style={{ fontSize: 10, color: '#374151', marginBottom: 3 }}>• {m}</div>
      ))}
    </div>
  );
}

export function StatementFooter({ bank }: { bank: BankProfile }) {
  return (
    <div style={{ marginTop: 20, paddingTop: 10, borderTop: '2px solid ' + bank.primary, fontSize: 9, color: '#6B7280', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.5 }}>
      <p style={{ margin: '0 0 4px' }}>
        This is a computer-generated sample statement created for demonstration and software-testing purposes only.
        It was not issued by {bank.name} or any financial institution and does not represent a real account.
      </p>
      <p style={{ margin: 0 }}>Questions about this sample? It is not a real statement — no action is needed.</p>
    </div>
  );
}
