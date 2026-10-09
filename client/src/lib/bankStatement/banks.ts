/**
 * Bank visual profiles for statement themes.
 *
 * These are ORIGINAL fictional brands whose color schemes are inspired by the
 * familiar look of major US banks — they do not reproduce any real bank's
 * name, logo, or trademarked trade dress.
 */

export interface BankProfile {
  id: string;
  name: string;
  tagline: string;
  /** Primary brand color (headers, logo mark). */
  primary: string;
  /** Secondary accent. */
  accent: string;
  /** Header background. */
  headerBg: string;
  /** Header text color. */
  headerText: string;
  /** Table header row background. */
  tableHeaderBg: string;
  /** Table header text. */
  tableHeaderText: string;
  /** Summary box background. */
  summaryBg: string;
  /** Font stack hint: 'serif' | 'sans' | 'modern' */
  fontFeel: 'serif' | 'sans' | 'modern';
  /** Short code printed on the statement. */
  code: string;
}

export const BANKS: BankProfile[] = [
  {
    id: 'meridian',
    name: 'Meridian National Bank',
    tagline: 'Clarity for every dollar',
    primary: '#0B3D91',
    accent: '#2E7CF6',
    headerBg: '#0B3D91',
    headerText: '#FFFFFF',
    tableHeaderBg: '#0B3D91',
    tableHeaderText: '#FFFFFF',
    summaryBg: '#EAF1FD',
    fontFeel: 'sans',
    code: 'MNB',
  },
  {
    id: 'liberty',
    name: 'Liberty Trust Bank',
    tagline: 'Your money, moving forward',
    primary: '#C41230',
    accent: '#012169',
    headerBg: '#FFFFFF',
    headerText: '#012169',
    tableHeaderBg: '#012169',
    tableHeaderText: '#FFFFFF',
    summaryBg: '#FDEEF0',
    fontFeel: 'sans',
    code: 'LTB',
  },
  {
    id: 'frontier',
    name: 'Frontier Bank',
    tagline: 'Rooted where you are',
    primary: '#B31B22',
    accent: '#F5A800',
    headerBg: '#B31B22',
    headerText: '#FFFFFF',
    tableHeaderBg: '#7A1216',
    tableHeaderText: '#FFFFFF',
    summaryBg: '#FDF3E3',
    fontFeel: 'serif',
    code: 'FRB',
  },
  {
    id: 'apex',
    name: 'Apex Bank',
    tagline: 'Banking without the maze',
    primary: '#1A1A2E',
    accent: '#E63946',
    headerBg: '#1A1A2E',
    headerText: '#FFFFFF',
    tableHeaderBg: '#1A1A2E',
    tableHeaderText: '#FFFFFF',
    summaryBg: '#F1F1F5',
    fontFeel: 'modern',
    code: 'APX',
  },
  {
    id: 'evergreen',
    name: 'Evergreen Bank',
    tagline: 'Grow with confidence',
    primary: '#007A33',
    accent: '#8CC63F',
    headerBg: '#007A33',
    headerText: '#FFFFFF',
    tableHeaderBg: '#007A33',
    tableHeaderText: '#FFFFFF',
    summaryBg: '#E9F6EC',
    fontFeel: 'sans',
    code: 'EVG',
  },
];

export function getBank(id: string): BankProfile {
  return BANKS.find((b) => b.id === id) ?? BANKS[0];
}
