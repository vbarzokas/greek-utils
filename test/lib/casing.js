'use strict';

const assert = require('assert');
const greekUtils = require('../../lib/index.js');

describe('Greek Utils — casing:', function () {
	describe('toUpperCase:', function () {
		it('drops tonos on uppercase vowels', function () {
			assert.strictEqual(greekUtils.toUpperCase('Άκης'), 'ΑΚΗΣ');
			assert.strictEqual(greekUtils.toUpperCase('Καλημέρα'), 'ΚΑΛΗΜΕΡΑ');
			assert.strictEqual(greekUtils.toUpperCase('εύηχο'), 'ΕΥΗΧΟ');
		});

		it('preserves dialytika', function () {
			assert.strictEqual(greekUtils.toUpperCase('Νϊκος'), 'ΝΪΚΟΣ');
		});

		it('drops tonos but keeps dialytika on combined characters', function () {
			// ΐ (iota with dialytika AND tonos) → Ϊ (capital iota with dialytika only)
			assert.strictEqual(greekUtils.toUpperCase('ταΐζω'), 'ΤΑΪΖΩ');
			// ΰ (upsilon with dialytika AND tonos) → Ϋ
			assert.strictEqual(greekUtils.toUpperCase('μυΰς'), 'ΜΥΫΣ');
		});

		it('converts final sigma to Σ', function () {
			assert.strictEqual(greekUtils.toUpperCase('άνθρωπος'), 'ΑΝΘΡΩΠΟΣ');
		});

		it('passes Latin text through native toUpperCase', function () {
			assert.strictEqual(greekUtils.toUpperCase('hello'), 'HELLO');
		});

		it('handles empty and non-string inputs', function () {
			assert.strictEqual(greekUtils.toUpperCase(''), '');
			assert.strictEqual(greekUtils.toUpperCase(null), null);
			assert.strictEqual(greekUtils.toUpperCase(undefined), undefined);
		});

		it('handles mixed Greek and Latin', function () {
			assert.strictEqual(greekUtils.toUpperCase('Hello Άκη'), 'HELLO ΑΚΗ');
		});

		it('is idempotent', function () {
			const input = 'Άγγελος και Ελένη';
			const once = greekUtils.toUpperCase(input);
			const twice = greekUtils.toUpperCase(once);
			assert.strictEqual(once, twice);
		});
	});

	describe('toLowerCase:', function () {
		it('converts σ at end of word to ς', function () {
			// 'ΑΓΓΕΛΟΣ' → 'αγγελο' + ς
			assert.strictEqual(greekUtils.toLowerCase('ΑΓΓΕΛΟΣ'), 'αγγελος');
		});

		it('handles multiple final sigmas across words', function () {
			assert.strictEqual(greekUtils.toLowerCase('ΚΑΛΟΣ ΑΝΘΡΩΠΟΣ'), 'καλος ανθρωπος');
		});

		it('leaves σ inside word alone', function () {
			assert.strictEqual(greekUtils.toLowerCase('ΣΥΣΤΗΜΑ'), 'συστημα');
		});

		it('passes Latin text through native toLowerCase', function () {
			assert.strictEqual(greekUtils.toLowerCase('HELLO'), 'hello');
		});

		it('handles empty and non-string inputs', function () {
			assert.strictEqual(greekUtils.toLowerCase(''), '');
			assert.strictEqual(greekUtils.toLowerCase(null), null);
			assert.strictEqual(greekUtils.toLowerCase(undefined), undefined);
		});

		it('handles mixed Greek and Latin', function () {
			assert.strictEqual(greekUtils.toLowerCase('Hello ΑΝΘΡΩΠΟΣ'), 'hello ανθρωπος');
		});

		it('is idempotent', function () {
			const input = 'ΑΝΘΡΩΠΟΣ ΚΑΙ ΖΩΟ';
			const once = greekUtils.toLowerCase(input);
			const twice = greekUtils.toLowerCase(once);
			assert.strictEqual(once, twice);
		});
	});

	describe('normalizeFinalSigma:', function () {
		// σ = U+03C3 (regular/medial sigma); ς = U+03C2 (final sigma)
		const σ = 'σ';
		const ς = 'ς';

		it('converts σ at end of word to ς', function () {
			assert.strictEqual(greekUtils.normalizeFinalSigma('καλο' + σ), 'καλο' + ς);
		});

		it('converts ς in middle of word to σ', function () {
			assert.strictEqual(greekUtils.normalizeFinalSigma('π' + ς + 'αρι'), 'π' + σ + 'αρι');
		});

		it('leaves correctly-placed sigmas alone', function () {
			const correct = σ + 'πίτι';
			assert.strictEqual(greekUtils.normalizeFinalSigma(correct), correct);
			const alsoCorrect = 'καλο' + ς;
			assert.strictEqual(greekUtils.normalizeFinalSigma(alsoCorrect), alsoCorrect);
		});

		it('handles σ before punctuation and spaces', function () {
			const input = 'καλο' + σ + ', ανθρωπο' + σ + '.';
			const expected = 'καλο' + ς + ', ανθρωπο' + ς + '.';
			assert.strictEqual(greekUtils.normalizeFinalSigma(input), expected);
		});

		it('handles empty and non-string inputs', function () {
			assert.strictEqual(greekUtils.normalizeFinalSigma(''), '');
			assert.strictEqual(greekUtils.normalizeFinalSigma(null), null);
			assert.strictEqual(greekUtils.normalizeFinalSigma(undefined), undefined);
		});

		it('is idempotent', function () {
			const input = 'ο καλος ανθρωπος';
			const once = greekUtils.normalizeFinalSigma(input);
			const twice = greekUtils.normalizeFinalSigma(once);
			assert.strictEqual(once, twice);
		});

		it('does not touch non-Greek text', function () {
			assert.strictEqual(greekUtils.normalizeFinalSigma('hello world'), 'hello world');
		});
	});
});
