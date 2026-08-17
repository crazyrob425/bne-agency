/**
 * ComparisonTable — semantic HTML table optimized for Google table snippets.
 *
 * Usage:
 * <ComparisonTable
 *   headers={["Feature", "BNE Studio", "Competitor A", "Competitor B"]}
 *   rows={[
 *     ["Niche Intelligence", "Proprietary quiz + AI", "Generic survey", "Manual research"],
 *     ...
 *   ]}
 * />
 */

export default function ComparisonTable({
  headers,
  rows,
  caption,
  className = "",
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`my-8 overflow-x-auto ${className}`}>
      {caption && (
        <p className="mb-2 text-sm font-semibold text-slate-400">{caption}</p>
      )}
      <table className="min-w-full divide-y divide-slate-700 overflow-hidden rounded-xl border border-slate-700">
        <thead>
          <tr className="bg-slate-800/80">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-slate-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/40">
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/20"}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="whitespace-pre-wrap px-4 py-3 text-sm text-slate-200"
                >
                  {ci === 0 ? (
                    <span className="font-semibold text-slate-100">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
