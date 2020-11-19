'use strict';

const diacriticsMap = require('./mappings/diacritics-map'),
	greeklishToGreekMap = require('./mappings/greeklish-to-greek-map'),
	greekTogreeklishMap = require('./mappings/greek-to-greeklish-map'),
	greekToPhoneticLatinMap = require('./mappings/greek-to-phonetic-latin-map'),
	greekToTransliteratedLatinMap = require('./mappings/greek-to-transliterated-latin-map'),
	stopWordsMap = require('./mappings/stopwords-map');

/**
 * A collection of utilities for the Greek language such as replacement of accented and other diacritics characters,
 * conversion from Greek to phonetic, transliterated or greeklish Latin and more.
 *
 */
const greekUtils = {
	/**
	 * Convert a Latin/greeklish characters text to its modern Greek equivalent.
	 *
	 * @method toGreek
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toGreek: function (text, ignore) {
		return replaceText(text, greeklishToGreekMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its greeklish equivalent.
	 *
	 * @method toGreeklish
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toGreeklish: function (text, ignore) {
		return replaceText(text, greekTogreeklishMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).
	 *
	 * @method toPhoneticLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toPhoneticLatin: function (text, ignore) {
		return replaceText(text, greekToPhoneticLatinMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).
	 *
	 * @method toTransliteratedLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toTransliteratedLatin: function (text, ignore) {
		return replaceText(text, greekToTransliteratedLatinMap, true, ignore);
	},

	/**
	 * Convert a modern/ancient Greek characters text containing diacritics to its simple equivalent without diacritics.
	 *
	 * @method sanitizeDiacritics
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	sanitizeDiacritics: function (text, ignore) {
		return replaceText(text, diacriticsMap, false, ignore);
	},

	/**
	 * Removes all Greek stop words from a text.
	 *
	 * @method removeStopWords
	 * @static
	 * @param {String} text
	 * @param {Boolean} removeMultipleWhiteSpaces If true will remove all multiple white space characters from the returned text.
	 * @returns {String}
	 */
	removeStopWords: function (text, removeMultipleWhiteSpaces = false) {
		const cleanText = replaceText(text, stopWordsMap, true, '', 'gi').trim();

		if (removeMultipleWhiteSpaces === true) {
			return cleanText.replace(/\s{2,}/g, ' ');
		}

		return cleanText;
	}
};

// Private Functions
/**
 *
 * @param {String} text
 * @param {Array} characterMap
 * @param {Boolean} exactMatch
 * @param {String} ignore
 * @param {String} regExOptions
 * @returns {String}
 */
function replaceText(text, characterMap, exactMatch, ignore, regExOptions = 'g') {
	let regexString,
		regex;

	exactMatch = exactMatch || false;

	if (typeof text === 'string' && text.length > 0) {
		characterMap.forEach(function (characters) {
			regexString = exactMatch ? characters.find : '[' + characters.find + ']';
			if (ignore) { regexString = '(?![' + ignore + '])' + regexString; }
			regex = new RegExp(regexString, regExOptions);
			text = text.replace(regex, characters.replace);
		});
	}

	return text;
}

module.exports = greekUtils;
