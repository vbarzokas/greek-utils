import type { ReplacementMap } from './types';

// Voiced context: when αυ/ευ/ηυ precede any of these characters they transliterate to
// av/ev/iv (voiced) rather than af/ef/if (voiceless). Voiced consonants: β γ δ ζ λ μ ν ρ
// plus all vowels (with or without accents/dialytika).
const VOICED_FOLLOW = 'αεηιουωάέήίόύώϊϋΐΰΑΕΗΙΟΥΩΆΈΉΊΌΎΏΪΫβγδζλμνρΒΓΔΖΛΜΝΡ';
const V = '(?=[' + VOICED_FOLLOW + '])';

const greekToIso843Map: ReplacementMap = [
	// ────────────────────────────────────────────────────────────
	// Context-sensitive diphthongs (αυ, ευ, ηυ).
	// Order: all-caps → mixed-case → lowercase, voiced before voiceless.
	// ────────────────────────────────────────────────────────────

	{ find: 'Α[ΥΎ]' + V, replace: 'AV' },
	{ find: 'Α[ΥΎ]', replace: 'AF' },
	{ find: 'Α[υύ]' + V, replace: 'Av' },
	{ find: 'Α[υύ]', replace: 'Af' },
	{ find: '[αά][υύ]' + V, replace: 'av' },
	{ find: '[αά][υύ]', replace: 'af' },

	{ find: 'Ε[ΥΎ]' + V, replace: 'EV' },
	{ find: 'Ε[ΥΎ]', replace: 'EF' },
	{ find: 'Ε[υύ]' + V, replace: 'Ev' },
	{ find: 'Ε[υύ]', replace: 'Ef' },
	{ find: '[εέ][υύ]' + V, replace: 'ev' },
	{ find: '[εέ][υύ]', replace: 'ef' },

	{ find: 'Η[ΥΎ]' + V, replace: 'IV' },
	{ find: 'Η[ΥΎ]', replace: 'IF' },
	{ find: 'Η[υύ]' + V, replace: 'Iv' },
	{ find: 'Η[υύ]', replace: 'If' },
	{ find: '[ηή][υύ]' + V, replace: 'iv' },
	{ find: '[ηή][υύ]', replace: 'if' },

	// ────────────────────────────────────────────────────────────
	// Simple diphthongs (αι, ει, οι, ου) — no context sensitivity.
	// ────────────────────────────────────────────────────────────

	{ find: 'Α[ΙΊ]', replace: 'AI' },
	{ find: 'Α[ιί]', replace: 'Ai' },
	{ find: '[αά][ιί]', replace: 'ai' },

	{ find: 'Ε[ΙΊ]', replace: 'EI' },
	{ find: 'Ε[ιί]', replace: 'Ei' },
	{ find: '[εέ][ιί]', replace: 'ei' },

	{ find: 'Ο[ΙΊ]', replace: 'OI' },
	{ find: 'Ο[ιί]', replace: 'Oi' },
	{ find: '[οό][ιί]', replace: 'oi' },

	{ find: 'Ο[ΥΎ]', replace: 'OU' },
	{ find: 'Ο[υύ]', replace: 'Ou' },
	{ find: '[οό][υύ]', replace: 'ou' },

	// ────────────────────────────────────────────────────────────
	// Consonant digraphs (γγ, γκ, γξ, γχ, μπ, ντ).
	// ELOT 743 type 2 uses always-medial forms for unambiguity.
	// ────────────────────────────────────────────────────────────

	{ find: 'ΓΓ', replace: 'NG' },
	{ find: 'Γγ', replace: 'Ng' },
	{ find: 'γγ', replace: 'ng' },

	{ find: 'ΓΚ', replace: 'GK' },
	{ find: 'Γκ', replace: 'Gk' },
	{ find: 'γκ', replace: 'gk' },

	{ find: 'ΓΞ', replace: 'NX' },
	{ find: 'Γξ', replace: 'Nx' },
	{ find: 'γξ', replace: 'nx' },

	{ find: 'ΓΧ', replace: 'NCH' },
	{ find: 'Γχ', replace: 'Nch' },
	{ find: 'γχ', replace: 'nch' },

	{ find: 'ΜΠ', replace: 'MP' },
	{ find: 'Μπ', replace: 'Mp' },
	{ find: 'μπ', replace: 'mp' },

	{ find: 'ΝΤ', replace: 'NT' },
	{ find: 'Ντ', replace: 'Nt' },
	{ find: 'ντ', replace: 'nt' },

	// ────────────────────────────────────────────────────────────
	// Multi-letter single-character mappings.
	// ────────────────────────────────────────────────────────────

	// Multi-letter capitals: produce all-caps when surrounded by Greek capitals,
	// title case otherwise. Lookahead checks the next Greek letter only.
	{ find: 'Θ(?=[Α-Ω])', replace: 'TH' },
	{ find: 'Θ', replace: 'Th' },
	{ find: 'θ', replace: 'th' },
	{ find: 'Χ(?=[Α-Ω])', replace: 'CH' },
	{ find: 'Χ', replace: 'Ch' },
	{ find: 'χ', replace: 'ch' },
	{ find: 'Ψ(?=[Α-Ω])', replace: 'PS' },
	{ find: 'Ψ', replace: 'Ps' },
	{ find: 'ψ', replace: 'ps' },

	// ────────────────────────────────────────────────────────────
	// Single characters (accents absorbed via character classes).
	// ────────────────────────────────────────────────────────────

	{ find: '[ΑΆ]', replace: 'A' },
	{ find: '[αά]', replace: 'a' },
	{ find: 'Β', replace: 'V' },
	{ find: 'β', replace: 'v' },
	{ find: 'Γ', replace: 'G' },
	{ find: 'γ', replace: 'g' },
	{ find: 'Δ', replace: 'D' },
	{ find: 'δ', replace: 'd' },
	{ find: '[ΕΈ]', replace: 'E' },
	{ find: '[εέ]', replace: 'e' },
	{ find: 'Ζ', replace: 'Z' },
	{ find: 'ζ', replace: 'z' },
	{ find: '[ΗΉ]', replace: 'I' },
	{ find: '[ηή]', replace: 'i' },
	{ find: '[ΙΊΪ]', replace: 'I' },
	{ find: '[ιίϊΐ]', replace: 'i' },
	{ find: 'Κ', replace: 'K' },
	{ find: 'κ', replace: 'k' },
	{ find: 'Λ', replace: 'L' },
	{ find: 'λ', replace: 'l' },
	{ find: 'Μ', replace: 'M' },
	{ find: 'μ', replace: 'm' },
	{ find: 'Ν', replace: 'N' },
	{ find: 'ν', replace: 'n' },
	{ find: 'Ξ', replace: 'X' },
	{ find: 'ξ', replace: 'x' },
	{ find: '[ΟΌ]', replace: 'O' },
	{ find: '[οό]', replace: 'o' },
	{ find: 'Π', replace: 'P' },
	{ find: 'π', replace: 'p' },
	{ find: 'Ρ', replace: 'R' },
	{ find: 'ρ', replace: 'r' },
	{ find: 'Σ', replace: 'S' },
	{ find: '[σς]', replace: 's' },
	{ find: 'Τ', replace: 'T' },
	{ find: 'τ', replace: 't' },
	{ find: '[ΥΎΫ]', replace: 'Y' },
	{ find: '[υύϋΰ]', replace: 'y' },
	{ find: 'Φ', replace: 'F' },
	{ find: 'φ', replace: 'f' },
	{ find: '[ΩΏ]', replace: 'O' },
	{ find: '[ωώ]', replace: 'o' }
];

export default greekToIso843Map;
