'use strict';

var diacriticsMap = require('./mappings/diacritics-map'),
	greeklishToGreekMap = require('./mappings/greeklish-to-greek-map'),
	greekTogreeklishMap = require('./mappings/greek-to-greeklish-map'),
	greekUtils;

/**
 * A collection of utilities for the Greek language such as replacement of accented and other diacritics characters,
 * conversion from greek to latin (a.k.a. greeklish) and more.
 *
 */
greekUtils = {
	/**
	 * Convert a latin characters text to its greek equivalent.
	 *
	 * @method toGreek
	 * @static
	 * @param {String} text
	 * @returns {String}
	 */
	toGreek: function (text) {
		return replaceText(text, greeklishToGreekMap, true);
	},

	/**
	 * Convert a greek characters text to its latin equivalent.
	 *
	 * @method toGreeklish
	 * @static
	 * @param {String} text
	 * @returns {String}
	 */
	toGreeklish: function (text) {
		return replaceText(text, greekTogreeklishMap, true);
	},

	/**
	 * Convert a modern/ancient greek characters text containing diacritics to its simple equivalent without diacritics.
	 *
	 * @method sanitizeDiacritics
	 * @static
	 * @param {String} text
	 * @returns {String}
	 */
	sanitizeDiacritics: function (text) {
		return replaceText(text, diacriticsMap, false);
	}
};

//Private Functions
/**
 *
 * @param {String} text
 * @param {Array} characterMap
 * @param {Boolean} exactMatch
 * @returns {String}
 */
function replaceText(text, characterMap, exactMatch) {
	var characters,
		regexString,
		regex;

	exactMatch = exactMatch || false;

	if (typeof text === 'string' && text.length > 0) {
		for (characters of characterMap) {
			regexString = exactMatch ? characters.find : '[' + characters.find + ']';
			regex = new RegExp(regexString, 'g');
			text = text.replace(regex, characters.replace);
		}
	}

	return text;
}

module.exports = greekUtils;
