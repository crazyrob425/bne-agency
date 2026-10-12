/**
 * UniversityCrest — the Blacklisted University collegiate seal.
 * Hand-drawn SVG line art in gold: mortarboard, shield with B.U. monogram,
 * laurel branches, and the school motto ribbon.
 */
export default function UniversityCrest({ className = "w-40 h-auto" }: { className?: string }) {
  const gold = "#d4af37";
  const goldDim = "#a8842c";
  return (
    <svg viewBox="0 0 260 310" className={className} role="img" aria-label="Blacklisted University crest">
      {/* Laurel branches */}
      <g stroke={goldDim} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M52 268 C34 228 36 178 66 138" />
        <path d="M208 268 C226 228 224 178 194 138" />
      </g>
      <g fill={goldDim}>
        {/* left leaves */}
        <ellipse cx="52" cy="252" rx="11" ry="4.5" transform="rotate(-58 52 252)" />
        <ellipse cx="45" cy="228" rx="11" ry="4.5" transform="rotate(-48 45 228)" />
        <ellipse cx="43" cy="203" rx="11" ry="4.5" transform="rotate(-38 43 203)" />
        <ellipse cx="47" cy="179" rx="11" ry="4.5" transform="rotate(-28 47 179)" />
        <ellipse cx="56" cy="157" rx="11" ry="4.5" transform="rotate(-18 56 157)" />
        {/* right leaves */}
        <ellipse cx="208" cy="252" rx="11" ry="4.5" transform="rotate(58 208 252)" />
        <ellipse cx="215" cy="228" rx="11" ry="4.5" transform="rotate(48 215 228)" />
        <ellipse cx="217" cy="203" rx="11" ry="4.5" transform="rotate(38 217 203)" />
        <ellipse cx="213" cy="179" rx="11" ry="4.5" transform="rotate(28 213 179)" />
        <ellipse cx="204" cy="157" rx="11" ry="4.5" transform="rotate(18 204 157)" />
      </g>

      {/* Mortarboard */}
      <g>
        <polygon points="130,14 198,42 130,70 62,42" fill={gold} stroke={goldDim} strokeWidth="1.5" />
        <path d="M104 52 v14 c0 10 52 10 52 0 v-14" fill="none" stroke={gold} strokeWidth="3" />
        <line x1="198" y1="42" x2="198" y2="76" stroke={gold} strokeWidth="2.5" />
        <circle cx="198" cy="80" r="5" fill={gold} />
      </g>

      {/* Shield */}
      <path
        d="M130 82 L184 102 V152 C184 198 159 224 130 242 C101 224 76 198 76 152 V102 Z"
        fill="#0b0b10"
        stroke={gold}
        strokeWidth="3.5"
      />
      <path
        d="M130 92 L174 108 V151 C174 190 153 212 130 227 C107 212 86 190 86 151 V108 Z"
        fill="none"
        stroke={goldDim}
        strokeWidth="1.25"
      />
      {/* Monogram */}
      <text
        x="130"
        y="158"
        textAnchor="middle"
        fill={gold}
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="46"
        letterSpacing="2"
      >
        B.U.
      </text>
      <line x1="104" y1="172" x2="156" y2="172" stroke={goldDim} strokeWidth="1.25" />
      <text
        x="130"
        y="192"
        textAnchor="middle"
        fill={goldDim}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="13"
        letterSpacing="4"
      >
        UNIVERSITY
      </text>

      {/* Motto ribbon */}
      <g>
        <polygon points="30,258 48,258 48,286 30,286 40,272" fill={goldDim} />
        <polygon points="230,258 212,258 212,286 230,286 220,272" fill={goldDim} />
        <rect x="44" y="254" width="172" height="34" rx="3" fill={gold} />
        <rect x="44" y="254" width="172" height="34" rx="3" fill="none" stroke={goldDim} strokeWidth="1.5" />
        <text
          x="130"
          y="276"
          textAnchor="middle"
          fill="#0b0b10"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="10.5"
          letterSpacing="1.5"
        >
          MISBEHAVING PAYS THE BILLS
        </text>
      </g>

      <text
        x="130"
        y="304"
        textAnchor="middle"
        fill={goldDim}
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="9"
        letterSpacing="3"
      >
        EST. MMXXVI
      </text>
    </svg>
  );
}
