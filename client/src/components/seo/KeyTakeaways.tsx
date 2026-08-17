/**
 * KeyTakeaways — TL;DR summary block.
 *
 * Usage:
 * <KeyTakeaways>
 *   <li>First key takeaway...</li>
 *   <li>Second key takeaway...</li>
 * </KeyTakeaways>
 */

export default function KeyTakeaways({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`my-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 md:p-8 ${className}`}
    >
      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-violet-400">
        Key Takeaways
      </h3>
      <ul className="space-y-3 text-slate-200">{children}</ul>
    </div>
  );
}
