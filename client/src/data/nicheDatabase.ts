/**
 * BNE Niche Intelligence Database
 * 1,000+ real niche keywords compiled from:
 * - Tumblr 400+ Kinks & Tropes master list (5ummit)
 * - OnlyFans/Fansly platform category data
 * - Creator agency research (OnlyGems, Aruna Talent, Star Model)
 * - Pornhub/ManyVids category taxonomies
 * - Adult creator community research (Reddit r/onlyfansadvice, r/CreatorsAdvice)
 * - Physical attribute / identity niche research
 * - BDSM community category standards (NCSF, FetLife taxonomy)
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import type { NicheProfile, DimensionVector } from "@/data/psychDimensions";
import { MICRO_NICHES_2026 } from "./nicheMicroNiches2026";

export type NicheCategory =
  | "Sex Acts"
  | "BDSM & Power Exchange"
  | "Fetish & Kink"
  | "Body Types & Physical"
  | "Ethnicity & Identity"
  | "Roleplay & Fantasy"
  | "Content Format"
  | "Relationship Dynamic"
  | "Clothing & Aesthetics"
  | "Sensation & Stimulation"
  | "Fluid & Bodily"
  | "Toys & Equipment"
  | "Occupation Fantasy"
  | "Age & Demographic"
  | "Lifestyle & Subculture"
  | "Audio & ASMR"
  | "Visual Style"
  | "Niche Crossover";

export interface Niche {
  keyword: string;
  category: NicheCategory;
  searchVolume: "very-high" | "high" | "medium" | "low" | "micro";
  competitionLevel: "very-high" | "high" | "medium" | "low" | "micro";
  earningPotential: "very-high" | "high" | "medium" | "low";
  tags?: string[];
  /** Full "Niche Profile Card" intelligence (strategic, demographic, inventory). */
  profile?: NicheProfile;
  /** Optional per-niche psychological signature override (10-dim vector). Falls back to category affinity. */
  psych?: DimensionVector;
}

export const NICHE_DATABASE: Niche[] = [
  // ─── SEX ACTS ────────────────────────────────────────────────────────────────
  { keyword: "Anal Sex", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Blowjob / BJ", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Cunnilingus", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Deep Throat", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Double Penetration (DP)", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Face Fucking", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Face Sitting / Queening", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Facials", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Fingering", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Fisting", category: "Sex Acts", searchVolume: "medium", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Handjob / HJ", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Masturbation / Solo", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Pegging", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Rimming / Analingus", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Scissoring", category: "Sex Acts", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Threesome / MMF", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Threesome / FFM", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Vaginal Sex / PIV", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "69 / Mutual Oral", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Titty Fucking / Paizuri", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Intercrural / Thigh Fucking", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Spitroasting", category: "Sex Acts", searchVolume: "medium", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Creampie", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cum Play / Cum Swap", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Snowballing", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Footjob", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Frottage / Grinding", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Cockwarming", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Orgasm on Command", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Squirting / Female Ejaculation", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Multiple Orgasms", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Overstimulation", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Edging / Ruined Orgasm", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Orgasm Denial", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Forced Orgasm", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cock Milking / Prostate Milking", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sounding", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Barebacking", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Gangbang", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bukakke", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Swallowing", category: "Sex Acts", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Nipple Play", category: "Sex Acts", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Toy Insertion (Dildo)", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Toy Insertion (Plug)", category: "Sex Acts", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Vibrator Use", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Anal Gaping", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Object Insertion", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Enema Play", category: "Sex Acts", searchVolume: "low", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Oviposition", category: "Sex Acts", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Inflation Fantasy", category: "Sex Acts", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },

  // ─── BDSM & POWER EXCHANGE ───────────────────────────────────────────────────
  { keyword: "BDSM (General)", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Dominatrix / Female Dom (FemDom)", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Male Dom (MaleDom)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Submissive Female", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Submissive Male", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bondage (Light)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bondage (Heavy / Strict)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Shibari / Japanese Rope Bondage", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Spanking", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Whipping / Flogging", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Caning", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Riding Crop", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Paddling", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Collaring / Owned", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Leash & Collar", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Master / Slave Dynamic", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Daddy Dom / Little Girl (DDLG)", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Mommy Domme / Little Boy", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Brat / Brat Taming", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Discipline & Punishment", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Humiliation (Private)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Humiliation (Public)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Degradation", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Praise Kink", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Begging", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Breathplay / Choking", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Blindfolds / Sensory Deprivation", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Gag (Ball Gag)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Gag (Ring Gag / Spider Gag)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Gag (Tape Gag)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Handcuffs / Restraints", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Spreader Bar", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Suspension Bondage", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Harness (Body)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Chastity Device / Cage", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cock Ring", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Nipple Clamps", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anal Hook", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Electric Stimulation / E-Stim", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Temperature Play (Ice / Wax)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Wax Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Fire Play", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Knife Play / Edge Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bloodplay", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Sensation Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tickling / Tickle Torture", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pet Play", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pony Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Puppy Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Kitten Play", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Human Furniture / Objectification", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Harem Fantasy", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Slave Training", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bathroom Permission / Control", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Free Use", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Consensual Non-Consent (CNC)", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Aftercare Content", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Kink Negotiation / Consent Play", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Financial Domination (FinDom)", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cuckolding", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cuckquean", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Hotwife / Stag & Vixen", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Strapon / Strap-On Play", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Sissification / Feminization", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Forced Feminization", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Verbal Feminization", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Orgasm Control", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Mummification", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Straightjacket", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Hoods / Masks", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Cages / Confinement", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Fucking Machine", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Kneeling / Worship Posture", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Hand Feeding / Feeding Kink", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pain Play (Moderate)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pain Play (Extreme)", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sadism / Masochism (S&M)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "CBT (Cock & Ball Torture)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Figging", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Branding / Marking", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Gunplay (Fantasy)", category: "BDSM & Power Exchange", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Interrogation Fantasy", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Kidnapping / Abduction Fantasy", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Mind Control / Hypno", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Somnophilia (Consensual)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stuck & Fucked / Kabeshiri", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Fuck or Die Scenario", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sex Pollen / Aphrodisiac Fantasy", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Power Imbalance", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dub-Con / Reluctance Fantasy", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },

  // ─── FETISH & KINK ───────────────────────────────────────────────────────────
  { keyword: "Foot Fetish", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Feet (Bare)", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Feet (Dirty / Soles)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Feet (Stockinged / Nylons)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Feet (Heeled)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Feet (Toe Sucking)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Armpit Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Belly Button Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Navel / Belly Worship", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Neck / Throat Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Hands / Fingers Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Mouth / Lips Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Tongue Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Ear Fetish", category: "Fetish & Kink", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Hair Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Hair Pulling", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Hair Cutting Fetish", category: "Fetish & Kink", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Body Hair Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sweat Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Scent Kink / Olfactophilia", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Used Panties / Underwear", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Used Socks", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Worn Shoes / Boots", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Spitting / Spit Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Drooling Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Watersports / Golden Shower", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Scat / Toilet Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Lactation / Breastfeeding Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pregnancy Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Breeding Kink / Impregnation Fantasy", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Feeding / Stuffing / Feederism", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Weight Gain Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Vore (Soft)", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Macro / Micro / Size Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Belly / Throat Bulge", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Piercings Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Tattoo Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Scars / Body Modification Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Shaving Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Hickies / Bite Marks", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Scratching / Nail Marks", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Bruising Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Biting Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Licking Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Massage Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Oral Fixation", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Fingers in Mouth", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Smoking Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Shotgunning (Smoke Sharing)", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Food Play / Sploshing", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Wet & Messy (WAM)", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Mud Play", category: "Fetish & Kink", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Oil Wrestling / Oiled Body", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Balloon Fetish / Looner", category: "Fetish & Kink", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Furry / Yiff", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anthro / Kemono", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Monster Fucking", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Tentacle Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Xenophilia / Alien Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Vampire Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Werewolf Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Alpha / Omega (A/B/O)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Knotting Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Claiming / Marking", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Jealousy / Possessiveness Kink", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Voyeurism", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Exhibitionism", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Public Sex / Outdoor", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Public Groping", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Glory Hole", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lapdance", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stripping / Striptease", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Erotic Dancing", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Twerking", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Dirty Talk", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "JOI (Jerk Off Instructions)", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "CEI (Cum Eating Instructions)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "SPH (Small Penis Humiliation)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "BBC Worship", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Size Queen", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Size Difference Kink", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Age Gap / Age Difference", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Sugar Daddy / Sugar Baby", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Promiscuity / Slut Shaming", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Infidelity / Cheating Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Watching Porn Together", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sex Tape / Hidden Cam Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Wet Dreams / Sleep Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Coming in Pants / Clothed Orgasm", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Coming Untouched", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sloppy Seconds", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Competence Kink", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Fighting / Wrestling Kink", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Drug Use Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Drunk Sex Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Aphrodisiac Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Teasing / Edging (Non-BDSM)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Incest Fantasy (Taboo)", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Step-Family Fantasy", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Prostitution / Escort Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Casting Couch Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Porn Star Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Camgirl / Streamer Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Open Relationship / Polyamory", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Swinging / Swinger Lifestyle", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Orgies", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "First Time / Virginity Fantasy", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Sexual Inexperience Kink", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Praise / Good Girl / Good Boy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pet Names (Kitten, Slut, etc.)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Cuckolding (Verbal)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Objectification Fantasy", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dehumanization", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pissing / Outdoor Pissing", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Menstrual Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tears / Crying Fetish", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Exhaustion / Sleepy Kink", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Cuddling / Intimacy Kink", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Bathing / Washing Together", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Mirror Sex", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Car Sex", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Shower Sex", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Pool / Hot Tub Sex", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Angry Sex / Hate Fucking", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Rough Sex", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Gentle / Soft Sex", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Sleepy / Somnambulism Fantasy", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Distant / Distracted Sex", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sex Against a Wall", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },

  // ─── BODY TYPES & PHYSICAL ───────────────────────────────────────────────────
  { keyword: "BBW (Big Beautiful Women)", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "SSBBW (Super Size BBW)", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Chubby / Curvy", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Thick / Thicc", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Petite / Small Frame", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Tall Women", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Short Women", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Athletic / Fit / Muscular", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Bodybuilder / Muscle Women", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Slim / Skinny", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Hourglass Figure", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pear Shape", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Big Boobs / Busty", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Natural Big Tits", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Fake / Augmented Breasts", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Small Boobs / Flat Chest", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Perky Breasts", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Big Ass / Phat Booty", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Bubble Butt", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Flat Ass / No Ass", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Thick Thighs", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Thigh Gap", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Thunder Thighs", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Long Legs", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Toned Abs / Six Pack", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Soft Belly / Tummy", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Nerdy / Glasses", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Girl Next Door", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Natural / No Makeup", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Heavily Tattooed", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pierced (Multiple)", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Redhead / Ginger", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Blonde", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Brunette", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Black Hair", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Colored / Dyed Hair", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Curly Hair", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Long Hair", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Short Hair / Pixie Cut", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Shaved Head", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Blue Eyes", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Green Eyes", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Brown Eyes", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Freckles", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dimples", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Mature / MILF (40s+)", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "GILF (50s+)", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Teen (18-19)", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "College Age (18-22)", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "20-Something", category: "Body Types & Physical", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "30-Something", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Disabled / Amputee Fetish", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Plus Size / Fat Acceptance", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pregnant", category: "Body Types & Physical", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Postpartum / Mom Body", category: "Body Types & Physical", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── ETHNICITY & IDENTITY ────────────────────────────────────────────────────
  { keyword: "Asian", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Japanese", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Korean / K-Pop", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Chinese", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Filipina", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Thai", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Vietnamese", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Indian / South Asian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pakistani", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Arab / Middle Eastern", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Persian / Iranian", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Turkish", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Latina / Hispanic", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Mexican", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Colombian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Brazilian", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Venezuelan", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Puerto Rican", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cuban", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Ebony / Black", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "African American", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "African", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Nigerian", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Caucasian / White", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Eastern European", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Russian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Ukrainian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Polish", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Czech", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "German", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "French", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Italian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Spanish", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "British", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Australian", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Canadian", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Scandinavian / Nordic", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Mixed Race", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Biracial", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Native American / Indigenous", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Trans Woman (MtF)", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Trans Man (FtM)", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Non-Binary / Enby", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Intersex", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Lesbian", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Gay / Male-Male", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Bisexual", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pansexual", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Queer", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Crossdresser / CD", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Drag Queen", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Femboy", category: "Ethnicity & Identity", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Tomboy", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Gender Fluid", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Disabled Creator", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Neurodivergent Creator", category: "Ethnicity & Identity", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "BBG (Big Beautiful Girl)", category: "Ethnicity & Identity", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "ABG (Asian Baby Girl)", category: "Ethnicity & Identity", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },

  // ─── ROLEPLAY & FANTASY ──────────────────────────────────────────────────────
  { keyword: "Girlfriend Experience (GFE)", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Boyfriend Experience (BFE)", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Wife Experience", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nurse / Doctor Roleplay", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Teacher / Student Roleplay", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Boss / Secretary Roleplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Police / Prisoner Roleplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Military / Soldier Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Cheerleader Fantasy", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Maid / Servant Roleplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Babysitter Fantasy", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Nanny Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Librarian / Bookworm Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Yoga Instructor Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Personal Trainer Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stripper / Exotic Dancer Fantasy", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Escort / Call Girl Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Masseuse Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Plumber / Repairman Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Pizza Delivery Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Neighbor Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Roommate Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stepsister / Stepbrother", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Stepmom / Stepdad", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Aunt / Uncle Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Royalty / Princess Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Villain / Supervillain Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Superhero Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Cosplay (General)", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Anime Cosplay", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Video Game Cosplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lewd Cosplay / Lewds", category: "Roleplay & Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Waifu / Hentai Cosplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Halloween / Horror Cosplay", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Fantasy / Medieval Roleplay", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sci-Fi / Space Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Vampire Roleplay", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Werewolf Roleplay", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Witch / Sorceress Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Angel / Demon Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Elf / Fantasy Creature", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Mermaid Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Adult Baby / ABDL", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Age Play (Legal Adults)", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Medical Roleplay", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Therapy / Psychiatrist Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Prison / Warden Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Spy / Secret Agent Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Hunter / Prey Dynamic", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Enemies to Lovers", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Rivals / Competition Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Arranged Marriage Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Forbidden Love Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Bodyguard Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Rockstar / Celebrity Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Athlete / Sports Star Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Billionaire / CEO Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Photographer / Model Fantasy", category: "Roleplay & Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bartender / Waitress Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Flight Attendant Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Cowgirl / Western Fantasy", category: "Roleplay & Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Pirate Fantasy", category: "Roleplay & Fantasy", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Alien Abduction Fantasy", category: "Roleplay & Fantasy", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Apocalypse / Survival Fantasy", category: "Roleplay & Fantasy", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Dystopian Fantasy", category: "Roleplay & Fantasy", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Historical / Period Fantasy", category: "Roleplay & Fantasy", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },

  // ─── CONTENT FORMAT ──────────────────────────────────────────────────────────
  { keyword: "Amateur / POV", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "POV (Point of View)", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Solo Play", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Couples Content", category: "Content Format", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Lesbian Content (F/F)", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Gay Content (M/M)", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Bisexual Content", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Interracial (IR)", category: "Content Format", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Faceless / Anonymous", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Masked / Hooded", category: "Content Format", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Nude / Nudity", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Topless Only", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Lingerie / Boudoir", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Implied Nude", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Softcore", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Hardcore", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Explicit / XXX", category: "Content Format", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Photo Sets", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Short Clips (Under 5 min)", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Long Videos (20+ min)", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Full Scene (30+ min)", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Live Streaming", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Custom Videos", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pay-Per-View (PPV)", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Sexting / DM Interaction", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Phone Sex / Audio Call", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Video Call / Cam Session", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Vlog Style", category: "Content Format", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Behind the Scenes", category: "Content Format", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Reaction Content", category: "Content Format", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Unboxing / Toy Review", category: "Content Format", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Try-On Haul", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Outfit of the Day (OOTD)", category: "Content Format", searchVolume: "high", competitionLevel: "high", earningPotential: "medium" },
  { keyword: "Tease / Slow Strip", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Countdown / Reveal", category: "Content Format", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Compilation", category: "Content Format", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Bloopers / Outtakes", category: "Content Format", searchVolume: "low", competitionLevel: "low", earningPotential: "medium" },
  { keyword: "Q&A / Fan Interaction", category: "Content Format", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Subscriber Challenges", category: "Content Format", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Polls / Interactive Content", category: "Content Format", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── RELATIONSHIP DYNAMIC ────────────────────────────────────────────────────
  { keyword: "GFE (Girlfriend Experience)", category: "Relationship Dynamic", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "BFE (Boyfriend Experience)", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dom / Sub Dynamic", category: "Relationship Dynamic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Switch (Dom & Sub)", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Daddy / Little Dynamic", category: "Relationship Dynamic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Mommy / Boy Dynamic", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Master / Pet Dynamic", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Owner / Slave Dynamic", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Mentor / Protégé", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Friends with Benefits", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Fuck Buddies / Casual", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Established Couple", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Strangers / One Night Stand", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Enemies with Benefits", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Forbidden Relationship", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Jealous Partner", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Possessive / Obsessive Partner", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Polyamory / Polycule", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Throuple", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Hotwife Arrangement", category: "Relationship Dynamic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cuckolding Arrangement", category: "Relationship Dynamic", searchVolume: "very-high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Online-Only Relationship", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Long Distance Fantasy", category: "Relationship Dynamic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── CLOTHING & AESTHETICS ───────────────────────────────────────────────────
  { keyword: "Latex / PVC", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Leather", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lingerie (General)", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Thong / G-String", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Stockings / Thigh Highs", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pantyhose / Nylons", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Corset", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Schoolgirl Outfit", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Nurse Outfit", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Maid Outfit", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bunny Suit", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Catsuit", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bodysuit", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Swimsuit / Bikini", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Micro Bikini", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "High Heels / Stilettos", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Platform Boots", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Thigh High Boots", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Sneakers / Athletic Shoes", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Gloves (Long)", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Formal Wear / Evening Gown", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Military Uniform", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Slutty Clothes / Revealing", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Oversized Clothes / Cozy", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Jeans / Denim", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Leggings / Yoga Pants", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Crossdressing Outfits", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Goth / Dark Aesthetic", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "E-Girl Aesthetic", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Soft Girl / Pastel", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Dark Academia Aesthetic", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Cottagecore Aesthetic", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Y2K / Retro Aesthetic", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Punk / Alt Aesthetic", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bimbo Aesthetic", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Clown / Circus Aesthetic", category: "Clothing & Aesthetics", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Jewelry / Accessories Focus", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "medium" },
  { keyword: "Makeup / Heavy Glam", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "No Makeup / Natural", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },

  // ─── SENSATION & STIMULATION ─────────────────────────────────────────────────
  { keyword: "ASMR (Erotic)", category: "Audio & ASMR", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "ASMR (Ear Licking)", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "ASMR (Whispering)", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "ASMR (Mouth Sounds)", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "ASMR (Tapping / Scratching)", category: "Audio & ASMR", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Binaural Audio (3Dio)", category: "Audio & ASMR", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Audio Only Content", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Moaning / Vocal", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dirty Talk Audio", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "JOI Audio", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Guided Masturbation Audio", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Erotic Hypnosis Audio", category: "Audio & ASMR", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Roleplay Audio", category: "Audio & ASMR", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Breathing / Panting Audio", category: "Audio & ASMR", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Orgasm Sounds / Authentic Moaning", category: "Audio & ASMR", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },

  // ─── TOYS & EQUIPMENT ────────────────────────────────────────────────────────
  { keyword: "Dildo Play", category: "Toys & Equipment", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Vibrator / Wand", category: "Toys & Equipment", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Butt Plug", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anal Beads", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Prostate Massager", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Suction Cup Dildo", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Double-Ended Dildo", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Strap-On", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Remote Control Toy (Lovense)", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Interactive Toy (Fan-Controlled)", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Fucking Machine", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Sybian", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Nipple Clamps / Suction", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cock Ring", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Chastity Cage", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Urethral Sounding Toys", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Electro Sex Toys (E-Stim)", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bondage Kit", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Rope (Shibari)", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Paddle / Flogger", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Riding Crop", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Spreader Bar", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Blindfold", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Handcuffs", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Ball Gag", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Collar & Leash", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Wax Candles (BDSM)", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Ice Play", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Massage Wand", category: "Toys & Equipment", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Lube / Oil Play", category: "Toys & Equipment", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },

  // ─── OCCUPATION FANTASY ──────────────────────────────────────────────────────
  { keyword: "Nurse Fantasy", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Doctor Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Teacher Fantasy", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Professor Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Police Officer Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Firefighter Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Soldier / Military Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Lawyer Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Secretary / Office Fantasy", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "CEO / Boss Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Athlete / Sports Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cheerleader Fantasy", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Yoga Instructor", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Personal Trainer", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stripper / Dancer", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Escort / Prostitute Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Masseuse Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Maid / Housekeeper", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Babysitter Fantasy", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Nanny Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Librarian Fantasy", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Scientist / Lab Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Gamer Girl", category: "Occupation Fantasy", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Streamer / Content Creator", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Photographer / Model", category: "Occupation Fantasy", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bartender Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Waitress Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Flight Attendant Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Mechanic Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Plumber Fantasy", category: "Occupation Fantasy", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── AGE & DEMOGRAPHIC ───────────────────────────────────────────────────────
  { keyword: "MILF (Mature I'd Like to F***)", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "GILF (Grandma I'd Like to F***)", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cougar", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Teen (18+)", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "College Girl", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Mature Woman (40s)", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Mature Woman (50s+)", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Older Man / Younger Woman", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Younger Man / Older Woman", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Newlywed / Honeymoon Fantasy", category: "Age & Demographic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Divorced / Single Mom", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Housewife / Stay-at-Home Mom", category: "Age & Demographic", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Working Mom", category: "Age & Demographic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sorority Girl", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Frat Boy", category: "Age & Demographic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Jock / Athlete", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Nerd / Geek", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Introvert / Shy", category: "Age & Demographic", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Extrovert / Confident", category: "Age & Demographic", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── LIFESTYLE & SUBCULTURE ──────────────────────────────────────────────────
  { keyword: "Goth / Alternative", category: "Lifestyle & Subculture", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Punk / Hardcore", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Metal / Heavy Metal", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Emo / Scene", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anime / Weeb", category: "Lifestyle & Subculture", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Gamer", category: "Lifestyle & Subculture", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Stoner / Cannabis", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Hippie / Boho", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Spiritual / Witchy", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Fitness / Gym Rat", category: "Lifestyle & Subculture", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Yoga / Wellness", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Outdoor / Adventurer", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Surfer / Beach Lifestyle", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Biker / Motorcycle", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Country / Southern Belle", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Redneck / Rural", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Preppy / Sorority", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Hipster", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Crypto / Tech Bro", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Luxury / Glam Lifestyle", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cottagecore / Domestic", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Kink Lifestyle / 24/7 TPE", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Swinger Lifestyle", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nudist / Naturist", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Polyamorous Lifestyle", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "BDSM Lifestyle / Kinkster", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Leather Community", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Furry Community", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cosplay Community", category: "Lifestyle & Subculture", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Otaku / Weeaboo", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Skater / Skateboard", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sneakerhead", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Foodie / Chef", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Bookworm / Reader", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Artist / Creative", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Musician / Band", category: "Lifestyle & Subculture", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Dancer / Performer", category: "Lifestyle & Subculture", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },

  // ─── VISUAL STYLE ────────────────────────────────────────────────────────────
  { keyword: "Cinematic / Film Quality", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Amateur / Raw / Authentic", category: "Visual Style", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Professional Studio", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Outdoor / Nature", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Urban / City", category: "Visual Style", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Luxury / High-End", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dark / Moody Lighting", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bright / Pastel Aesthetic", category: "Visual Style", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Black & White / Monochrome", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Vintage / Retro Style", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Neon / Cyberpunk Aesthetic", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Minimalist", category: "Visual Style", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Artsy / Erotic Art", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Slow Motion Video", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "4K / Ultra HD", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "VR / 360 Content", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Deepfake-Style (Consensual)", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "AI-Enhanced Content", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Drone / Aerial Shots", category: "Visual Style", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Hidden Camera Style", category: "Visual Style", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Mirror Selfie / Self-Shot", category: "Visual Style", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Selfie / Phone Camera", category: "Visual Style", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "high" },
  { keyword: "Tripod / Hands-Free", category: "Visual Style", searchVolume: "medium", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "GoPro / Action Cam", category: "Visual Style", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },

  // ─── NICHE CROSSOVER ─────────────────────────────────────────────────────────
  { keyword: "Goth + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Fitness + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cosplay + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "BBW + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Petite + Anal", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "MILF + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Trans + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Latina + Squirting", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Asian + Cosplay", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Ebony + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Femboy + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Gamer + Cosplay", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Stoner + Solo", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Foot Fetish + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "ASMR + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Breeding + BBW", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Squirting + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pegging + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "FinDom + Humiliation", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "CNC + Petite", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Latex + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Furry + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Monster + Breeding", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Hypno + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cuckolding + BBC", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Sissification + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Watersports + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Lactation + BBW", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pregnant + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Smoking + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Scat + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Vore + Macro", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Feederism + BBW", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tickling + Bondage", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Shibari + Nude", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Wax Play + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Age Gap + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Interracial + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lesbian + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Gay + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bi + Threesome", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Goth + Foot Fetish", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "E-Girl + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anime + Tentacle", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Schoolgirl + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nurse + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Teacher + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cheerleader + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Maid + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Latex + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Leather + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Stockings + Foot Fetish", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Heels + Foot Fetish", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Boots + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Corset + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bikini + Outdoor", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Yoga Pants + Fitness", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Leggings + Ass Worship", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lingerie + GFE", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Thigh Highs + Foot Fetish", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Bunny + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Catsuit + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bodysuit + Solo", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Glasses + Nerd Kink", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Freckles + Natural", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Redhead + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Blonde + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Brunette + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Tattoos + Goth", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Piercings + Alt", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Curly Hair + Latina", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Natural Hair + Ebony", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Colored Hair + E-Girl", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Thick + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Athletic + Squirting", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Petite + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "BBW + Squirting", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "MILF + GFE", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "MILF + Anal", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "MILF + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Teen + Anal", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "Teen + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "very-high", earningPotential: "very-high" },
  { keyword: "College + Threesome", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Sorority + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Housewife + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Housewife + Anal", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cougar + BBC", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Divorced Mom + Younger Man", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Sugar Baby + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "FinDom + Foot Fetish", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bimbo + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bimbo + Interracial", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Goth + Squirting", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Punk + Anal", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Stoner + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Hippie + Outdoor", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Country Girl + Outdoor", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Biker + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Luxury + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Luxury + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Crypto / Tech + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Gamer + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anime + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anime + Foot Fetish", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Weeaboo + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Otaku + Cosplay", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nerd + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nerd + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Shy + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Shy + GFE", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Introvert + Solo", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Confident + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tomboy + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tomboy + GFE", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Femboy + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Non-Binary + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Trans + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Trans + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Crossdresser + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Drag + Performance", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Queer + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bisexual + Threesome", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pansexual + Orgy", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Polyamory + Gangbang", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Swinger + Interracial", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Hotwife + BBC", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cuckold + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cuckold + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Voyeur + Public", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Exhibitionist + Public", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Outdoor + Squirting", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Car Sex + Outdoor", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Pool + Outdoor", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Shower + Solo", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "Mirror + Solo", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "4K + Amateur", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "VR + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "VR + GFE", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "ASMR + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "ASMR + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Audio + Hypno", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "JOI + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "JOI + ASMR", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "CEI + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "SPH + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "SPH + Cuckold", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "BBC + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Size Queen + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Dirty Talk + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Dirty Talk + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Praise Kink + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Praise Kink + DDLG", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Brat + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Brat + DDLG", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pet Play + DDLG", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pet Play + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Kitten Play + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Puppy Play + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pony Play + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "ABDL + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "ABDL + DDLG", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Age Play + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Medical + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Interrogation + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Kidnapping + CNC", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "CNC + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Free Use + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Free Use + Harem", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Somnophilia + CNC", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Stuck + CNC", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sex Pollen + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Enemies + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Forbidden + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Bodyguard + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Billionaire + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Rockstar + GFE", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Celebrity + GFE", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Casting Couch + Amateur", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Porn Star + GFE", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Camgirl + Interactive", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Lovense + Live", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Fucking Machine + Solo", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Fucking Machine + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Sybian + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Dildo + Squirting", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Vibrator + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anal Plug + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Chastity + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Chastity + Cuckold", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Electro + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "CBT + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nipple Clamps + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Anal Hook + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sounding + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Prostate Milking + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Strap-On + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pegging + Cuckold", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Double Penetration + Gangbang", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Gangbang + Interracial", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bukakke + Interracial", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Creampie + Breeding", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Creampie + Interracial", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cum Swap + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Snowballing + Lesbian", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Squirting + Lesbian", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Scissoring + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Tribbing + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Strap-On + Lesbian", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Fisting + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Rimming + Lesbian", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Face Sitting + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Ass Worship + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Foot Worship + Femdom", category: "Niche Crossover", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Armpit + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Spitting + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Degradation + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Humiliation + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Objectification + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Human Furniture + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Slave Training + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bathroom Control + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Orgasm Control + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Edging + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Ruined Orgasm + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Forced Orgasm + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Overstimulation + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Multiple Orgasms + Solo", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Orgasm on Command + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Breathplay + BDSM", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Knife Play + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Fire Play + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Bloodplay + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Mummification + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Suspension + Shibari", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Cage + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Hood + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Straightjacket + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Figging + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Branding + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Gunplay + CNC", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Oviposition + Monster", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Tentacle + Monster", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Alien + Breeding", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Vampire + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Werewolf + Breeding", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Alpha/Omega + Breeding", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Knotting + Breeding", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Claiming + Alpha/Omega", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Jealousy + Possessiveness", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Vore + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Macro + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Inflation + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Balloon + Femdom", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Feederism + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Weight Gain + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Lactation + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Pregnancy + Breeding", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Menstrual + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tears + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Sweat + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Scent + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Used Panties + Femdom", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Used Socks + Foot Fetish", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Worn Shoes + Foot Fetish", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Smoking + Foot Fetish", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Food Play + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "WAM + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Oil + Massage", category: "Niche Crossover", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Oil + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Mud + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Looner + BDSM", category: "Niche Crossover", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Furry + Breeding", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Kemono + BDSM", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Anthro + Femdom", category: "Niche Crossover", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },

  // ─── ADDITIONAL FETISH & SPECIALTY ──────────────────────────────────────────
  { keyword: "Anal Training", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Ass Worship", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Pussy Worship", category: "Sex Acts", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Cock Worship", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Body Worship", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Tribbing / Grinding (F/F)", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Dry Humping", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Orgasm Competition", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Mutual Masturbation", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Tantric / Slow Sex", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Quickie / Fast Sex", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Morning Sex", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Hate Sex", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Makeup Sex", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Revenge Sex", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Soaking (Mormon Loophole)", category: "Sex Acts", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Sensual Massage", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Prostate Play", category: "Sex Acts", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Cock Cage Removal", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Tease & Denial", category: "BDSM & Power Exchange", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Consensual Blackmail", category: "BDSM & Power Exchange", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Brat Punishment", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Reward & Punishment", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Impact Play (General)", category: "BDSM & Power Exchange", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Consensual Voyeurism", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Wet T-Shirt", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Topless Sunbathing", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Nude Beach", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Upskirt / No Panties", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Camel Toe", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Nip Slip", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Wardrobe Malfunction", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Accidental Exposure", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Shrinkage / Flaccid", category: "Fetish & Kink", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Erection Tease", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Bulge Fetish", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Camel Toe (Clothed)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Wet Panties", category: "Fetish & Kink", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Squirt Through Panties", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Clothed Female Nude Male (CFNM)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Clothed Male Nude Female (CMNF)", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Fully Clothed Sex", category: "Fetish & Kink", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Uniform Fetish (General)", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Apron Only", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Crop Top", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Mini Skirt", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "high" },
  { keyword: "Booty Shorts", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "high" },
  { keyword: "See-Through / Sheer", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Wet Clothes", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Ripped Clothes", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Torn Stockings", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Ankle Socks", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Knee Socks", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Suspenders / Garter Belt", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Pasties", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Body Paint", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Zentai / Full Body Suit", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "very-high" },
  { keyword: "Gasmask Fetish", category: "Clothing & Aesthetics", searchVolume: "low", competitionLevel: "micro", earningPotential: "very-high" },
  { keyword: "Spandex / Lycra", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Wetsuit", category: "Clothing & Aesthetics", searchVolume: "low", competitionLevel: "micro", earningPotential: "high" },
  { keyword: "Fur Coat", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Trench Coat / Flasher", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Overalls", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "medium" },
  { keyword: "Sundress", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "medium", earningPotential: "medium" },
  { keyword: "Kimono / Traditional Dress", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Saree / Indian Traditional", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Hijab Fetish", category: "Clothing & Aesthetics", searchVolume: "high", competitionLevel: "medium", earningPotential: "very-high" },
  { keyword: "Nun Costume", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Devil / Demon Costume", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Angel Costume", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Santa / Holiday Costume", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  { keyword: "Lingerie + Heels Only", category: "Clothing & Aesthetics", searchVolume: "very-high", competitionLevel: "high", earningPotential: "very-high" },
  { keyword: "Apron + Heels Only", category: "Clothing & Aesthetics", searchVolume: "medium", competitionLevel: "low", earningPotential: "high" },
  // ─── 2026 HIGH-INCOME MICRO-NICHES (optimized for the current adult market) ──
  ...MICRO_NICHES_2026,
];

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────

export const NICHE_CATEGORIES = Array.from(
  new Set(NICHE_DATABASE.map((n) => n.category))
) as NicheCategory[];

export function searchNiches(query: string): Niche[] {
  const q = query.toLowerCase();
  return NICHE_DATABASE.filter(
    (n) =>
      n.keyword.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      (n.tags && n.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export function getNichesByCategory(category: NicheCategory): Niche[] {
  return NICHE_DATABASE.filter((n) => n.category === category);
}

export function getTopNiches(
  limit = 50,
  filter?: Partial<Pick<Niche, "earningPotential" | "competitionLevel">>
): Niche[] {
  let niches = [...NICHE_DATABASE];
  if (filter?.earningPotential) {
    niches = niches.filter((n) => n.earningPotential === filter.earningPotential);
  }
  if (filter?.competitionLevel) {
    niches = niches.filter((n) => n.competitionLevel === filter.competitionLevel);
  }
  // Sort by earning potential desc, competition asc
  const epOrder = { "very-high": 4, high: 3, medium: 2, low: 1 };
  const compOrder = { micro: 5, low: 4, medium: 3, high: 2, "very-high": 1 };
  return niches
    .sort(
      (a, b) =>
        epOrder[b.earningPotential] - epOrder[a.earningPotential] ||
        compOrder[a.competitionLevel] - compOrder[b.competitionLevel]
    )
    .slice(0, limit);
}

export function getHiddenGems(limit = 20): Niche[] {
  return NICHE_DATABASE.filter(
    (n) =>
      (n.earningPotential === "very-high" || n.earningPotential === "high") &&
      (n.competitionLevel === "micro" || n.competitionLevel === "low")
  ).slice(0, limit);
}

function slugifyText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const NICHE_SLUG_INDEX = new Map<string, Niche>();
const NICHE_TO_SLUG = new Map<Niche, string>();

(() => {
  const slugCounts = new Map<string, number>();

  for (const niche of NICHE_DATABASE) {
    const baseSlug = slugifyText(niche.keyword) || "niche";
    const nextCount = (slugCounts.get(baseSlug) ?? 0) + 1;
    slugCounts.set(baseSlug, nextCount);

    const slug = nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`;
    NICHE_SLUG_INDEX.set(slug, niche);
    NICHE_TO_SLUG.set(niche, slug);
  }
})();

export function slugifyNicheKeyword(value: string): string {
  return slugifyText(value);
}

export function getNicheSlug(niche: Niche): string {
  return NICHE_TO_SLUG.get(niche) ?? slugifyText(niche.keyword);
}

export function getNichePath(niche: Niche): string {
  return `/niche-matcher/${getNicheSlug(niche)}`;
}

export function getNicheBySlug(slug: string): Niche | undefined {
  return NICHE_SLUG_INDEX.get(slugifyText(slug));
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): Set<string> {
  return new Set(normalizeText(value).split(" ").filter(Boolean));
}

function buildQuizTraits(answers: {
  contentType?: string[];
  bodyType?: string;
  dynamic?: string;
  format?: string;
  audience?: string;
}): Set<string> {
  const traits = new Set<string>();

  const addTrait = (value?: string, prefix?: string) => {
    if (!value) return;
    const normalized = normalizeText(value);
    if (!normalized) return;

    if (prefix) {
      traits.add(`${prefix}:${normalized}`);
    } else {
      traits.add(normalized);
    }

    for (const token of Array.from(tokenize(normalized))) {
      if (prefix) {
        traits.add(`${prefix}:${token}`);
      }
      traits.add(token);
    }
  };

  answers.contentType?.forEach((value) => addTrait(value));
  addTrait(answers.bodyType, "bodyType");
  addTrait(answers.dynamic, "dynamic");
  addTrait(answers.format, "format");
  addTrait(answers.audience, "audience");

  return traits;
}

function scoreNicheForQuiz(niche: Niche, traits: Set<string>): number {
  const keywordText = normalizeText(`${niche.keyword} ${niche.category} ${niche.tags?.join(" ") ?? ""}`);
  const textTokens = tokenize(keywordText);
  let score = 0;

  for (const trait of Array.from(traits)) {
    const traitLabel = trait.includes(":") ? trait.split(":").slice(1).join(":") : trait;

    if (textTokens.has(traitLabel)) {
      score += 4;
    } else if (keywordText.includes(traitLabel)) {
      score += 2;
    }

    if (trait.startsWith("bodyType:") && ["Body Types & Physical", "Ethnicity & Identity"].includes(niche.category)) {
      score += 2;
    }

    if (trait.startsWith("dynamic:") && ["BDSM & Power Exchange", "Relationship Dynamic"].includes(niche.category)) {
      score += 2;
    }

    if (trait.startsWith("format:") && niche.category === "Content Format") {
      score += 1;
    }

    if (trait.startsWith("audience:") && ["Roleplay & Fantasy", "Content Format", "Fetish & Kink"].includes(niche.category)) {
      score += 1;
    }
  }

  const epBonus: Record<string, number> = {
    "very-high": 2,
    high: 1,
    medium: 0,
    low: -1,
  };
  const compBonus: Record<string, number> = {
    micro: 3,
    low: 2,
    medium: 1,
    high: 0,
    "very-high": -1,
  };

  score += epBonus[niche.earningPotential] ?? 0;
  score += compBonus[niche.competitionLevel] ?? 0;

  return score;
}

export function matchNichesByQuiz(answers: {
  contentType?: string[];
  bodyType?: string;
  dynamic?: string;
  format?: string;
  audience?: string;
}): Niche[] {
  const traits = buildQuizTraits(answers);

  return NICHE_DATABASE.map((niche) => ({
    niche,
    score: scoreNicheForQuiz(niche, traits),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 16)
    .map((entry) => entry.niche);
}

export const TOTAL_NICHE_COUNT = NICHE_DATABASE.length;
