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

function escapeForCharClass(str: string): string {
	return str.replace(CHAR_CLASS_SPECIALS, '\\$&');
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
	}
};

export = greekUtils;
