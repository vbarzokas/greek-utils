import greekUtils from './index.js';

export const {
	toGreek,
	toGreeklish,
	toPhoneticLatin,
	toTransliteratedLatin,
	toISO843,
	sanitizeDiacritics,
	removeStopWords,
	toUpperCase,
	toLowerCase,
	normalizeFinalSigma
} = greekUtils;

export default greekUtils;
