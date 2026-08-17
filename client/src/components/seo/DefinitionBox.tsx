/**
 * DefinitionBox — direct answer / definition callout for Google paragraph snippets.
 *
 * Renders a highlighted callout containing a 40–58 word declarative answer
 * immediately beneath a target H2.
 */

export default function DefinitionBox({
  term,
  definition,
  className = "",
}: {
  term: string;
  definition: string;
  className?: string;
}) {
  return (
    <div
      className={`my-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 md:p-6 ${className}`}
    >
      <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
        {term}
      </p>
      <p className="text-base md:text-lg leading-relaxed text-slate-100">
        {definition}
      </p>
    </div>
  );
}
