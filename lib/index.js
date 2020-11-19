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
	 * @param {String} ignoreCharacters
	 * @returns {String}
	 */
	toGreek: function (text, ignoreCharacters) {
		return replaceText(text, greeklishToGreekMap, true, ignoreCharacters);
	},

	/**
	 * Convert a modern Greek characters text to its greeklish equivalent.
	 *
	 * @method toGreeklish
	 * @static
	 * @param {String} text
	 * @param {String} ignoreCharacters
	 * @returns {String}
	 */
	toGreeklish: function (text, ignoreCharacters) {
		return replaceText(text, greekTogreeklishMap, true, ignoreCharacters);
	},

	/**
	 * Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).
	 *
	 * @method toPhoneticLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignoreCharacters
	 * @returns {String}
	 */
	toPhoneticLatin: function (text, ignoreCharacters) {
		return replaceText(text, greekToPhoneticLatinMap, true, ignoreCharacters);
	},

	/**
	 * Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).
	 *
	 * @method toTransliteratedLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignoreCharacters
	 * @returns {String}
	 */
	toTransliteratedLatin: function (text, ignoreCharacters) {
		return replaceText(text, greekToTransliteratedLatinMap, true, ignoreCharacters);
	},

	/**
	 * Convert a modern/ancient Greek characters text containing diacritics to its simple equivalent without diacritics.
	 *
	 * @method sanitizeDiacritics
	 * @static
	 * @param {String} text
	 * @param {String} ignoreCharacters
	 * @returns {String}
	 */
	sanitizeDiacritics: function (text, ignoreCharacters) {
		return replaceText(text, diacriticsMap, false, ignoreCharacters);
	},

	/**
	 * Removes all Greek stop words from a text.
	 *
	 * @method removeStopWords
	 * @static
	 * @param {String} text
	 * @param {Boolean} shouldRemoveMultipleWhiteSpaces If true will remove all multiple white space characters from the returned text.
	 * @returns {String}
	 */
	removeStopWords: function (text, shouldRemoveMultipleWhiteSpaces = false) {
		const cleanText = replaceText(text, stopWordsMap, true, '', 'gi').trim();

		if (shouldRemoveMultipleWhiteSpaces === true) {
			return cleanText.replace(/\s{2,}/g, ' ');
		}

		return cleanText;
	}
};

// Private Functions
/**
 *
 * @param {String} text
 * @param {Array} replacementMap
 * @param {Boolean} isExactMatch
 * @param {String} ignoreCharacters
 * @param {String} regExOptions
 * @returns {String}
 */
function replaceText(text, replacementMap, isExactMatch = false, ignoreCharacters = '', regExOptions = 'g') {
	let regexString,
		regex;

	if (typeof text === 'string' && text.length > 0) {
		replacementMap.forEach(function (replacementItem) {
			if (isExactMatch) {
				regexString = replacementItem.find;
			} else {
				regexString = '[' + replacementItem.find + ']';
			}

			if (ignoreCharacters !== '') {
				regexString = '(?![' + ignoreCharacters + '])' + regexString;
			}

			regex = new RegExp(regexString, regExOptions);

			text = text.replace(regex, replacementItem.replace);
		});
	}

	return text;
}

module.exports = greekUtils;
