import diacriticsMap from './mappings/diacritics-map';
import greeklishToGreekMap from './mappings/greeklish-to-greek-map';
import greekTogreeklishMap from './mappings/greek-to-greeklish-map';
import greekToPhoneticLatinMap from './mappings/greek-to-phonetic-latin-map';
import greekToTransliteratedLatinMap from './mappings/greek-to-transliterated-latin-map';
import stopWordsMap from './mappings/stopwords-map';
import type { ReplacementMap } from './mappings/types';

interface CompiledRule {
	rawFind: string;
	regex: RegExp;
	replace: string;
}

type CompiledMap = ReadonlyArray<CompiledRule>;

const CHAR_CLASS_SPECIALS = /[\]\\^-]/g;

// Greek-typographic uppercase: tonos is dropped on uppercase vowels (dialytika preserved).
// Precomposed forms are replaced; combining tonos (U+0301) is stripped — V8 decomposes
// precomposed dialytika+tonos (e.g. ΐ→Ϊ́) when uppercasing, leaving the tonos as a combining mark.
const UPPERCASE_TONOS_MAP: Readonly<Record<string, string>> = {
	'Ά': 'Α',
	'Έ': 'Ε',
	'Ή': 'Η',
	'Ί': 'Ι',
	'Ό': 'Ο',
	'Ύ': 'Υ',
	'Ώ': 'Ω',
	'́': ''
};
const UPPERCASE_TONOS_REGEX = /[ΆΈΉΊΌΎΏ́]/g;

// Final sigma: σ at end of a Greek word should be ς; ς inside a Greek word should be σ.
const FINAL_SIGMA_REGEX = /σ(?!\p{Script=Greek})/gu;
const MEDIAL_SIGMA_REGEX = /ς(?=\p{Script=Greek})/gu;

function escapeForCharClass(str: string): string {
	return str.replace(CHAR_CLASS_SPECIALS, '\\$&');
}

function normalizeFinalSigmaImpl(text: string): string {
	return text.replace(FINAL_SIGMA_REGEX, 'ς').replace(MEDIAL_SIGMA_REGEX, 'σ');
}

function buildPattern(rawFind: string, isExactMatch: boolean): string {
	return isExactMatch ? rawFind : '[' + rawFind + ']';
}

function compileMap(replacementMap: ReplacementMap, isExactMatch: boolean, regExOptions: string): CompiledMap {
	return replacementMap.map((item) => ({
		rawFind: item.find,
		regex: new RegExp(buildPattern(item.find, isExactMatch), regExOptions),
		replace: item.replace
	}));
}

const compiled = {
	diacritics: compileMap(diacriticsMap, false, 'g'),
	greeklishToGreek: compileMap(greeklishToGreekMap, true, 'g'),
	greekTogreeklish: compileMap(greekTogreeklishMap, true, 'g'),
	greekToPhoneticLatin: compileMap(greekToPhoneticLatinMap, true, 'g'),
	greekToTransliteratedLatin: compileMap(greekToTransliteratedLatinMap, true, 'g'),
	stopWords: compileMap(stopWordsMap, true, 'gi')
};

function replaceText(
	text: unknown,
	compiledMap: CompiledMap,
	isExactMatch: boolean,
	ignoreCharacters: string = '',
	regExOptions: string = 'g'
): string | unknown {
	if (typeof text !== 'string' || text.length === 0) {
		return text;
	}

	let out = text;
	if (!ignoreCharacters) {
		for (const item of compiledMap) {
			out = out.replace(item.regex, item.replace);
		}
		return out;
	}

	const ignoreLookahead = '(?![' + escapeForCharClass(ignoreCharacters) + '])';
	for (const item of compiledMap) {
		const regex = new RegExp(ignoreLookahead + buildPattern(item.rawFind, isExactMatch), regExOptions);
		out = out.replace(regex, item.replace);
	}
	return out;
}

const greekUtils = {
	toGreek(text: string, ignoreCharacters?: string): string {
		return replaceText(text, compiled.greeklishToGreek, true, ignoreCharacters) as string;
	},

	toGreeklish(text: string, ignoreCharacters?: string): string {
		return replaceText(text, compiled.greekTogreeklish, true, ignoreCharacters) as string;
	},

	toPhoneticLatin(text: string, ignoreCharacters?: string): string {
		return replaceText(text, compiled.greekToPhoneticLatin, true, ignoreCharacters) as string;
	},

	toTransliteratedLatin(text: string, ignoreCharacters?: string): string {
		return replaceText(text, compiled.greekToTransliteratedLatin, true, ignoreCharacters) as string;
	},

	sanitizeDiacritics(text: string, ignoreCharacters?: string): string {
		return replaceText(text, compiled.diacritics, false, ignoreCharacters) as string;
	},

	removeStopWords(text: string, shouldRemoveMultipleWhiteSpaces: boolean = false): string {
		if (typeof text !== 'string' || text.length === 0) {
			return text;
		}

		const cleanText = (replaceText(text, compiled.stopWords, true, '', 'gi') as string).trim();

		if (shouldRemoveMultipleWhiteSpaces === true) {
			return cleanText.replace(/\s{2,}/g, ' ');
		}

		return cleanText;
	},

	/**
	 * Greek-typographic uppercase: drops tonos on vowels (Άκης → ΑΚΗΣ), preserves dialytika.
	 */
	toUpperCase(text: string): string {
		if (typeof text !== 'string' || text.length === 0) {
			return text;
		}
		return text.toUpperCase().replace(UPPERCASE_TONOS_REGEX, (ch) => UPPERCASE_TONOS_MAP[ch]).normalize('NFC');
	},

	/**
	 * Greek-aware lowercase: applies native lowercasing then normalizes σ at end of word to ς.
	 */
	toLowerCase(text: string): string {
		if (typeof text !== 'string' || text.length === 0) {
			return text;
		}
		return normalizeFinalSigmaImpl(text.toLowerCase());
	},

	/**
	 * Normalizes sigma in Greek text: σ at end of a Greek word becomes ς; ς mid-word becomes σ.
	 */
	normalizeFinalSigma(text: string): string {
		if (typeof text !== 'string' || text.length === 0) {
			return text;
		}
		return normalizeFinalSigmaImpl(text);
	}
};

export = greekUtils;
