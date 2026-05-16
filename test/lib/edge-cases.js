'use strict';

const assert = require('assert');
const greekUtils = require('../../lib/index.js');

describe('Greek Utils — edge cases:', function () {
	const allMethods = [
		'toGreek',
		'toGreeklish',
		'toPhoneticLatin',
		'toTransliteratedLatin',
		'sanitizeDiacritics',
		'removeStopWords'
	];

	describe('Non-string / empty inputs:', function () {
		allMethods.forEach(function (method) {
			it(method + ' returns empty string unchanged', function () {
				assert.strictEqual(greekUtils[method](''), '');
			});

			it(method + ' returns non-string inputs unchanged', function () {
				assert.strictEqual(greekUtils[method](null), null);
				assert.strictEqual(greekUtils[method](undefined), undefined);
				assert.strictEqual(greekUtils[method](42), 42);
			});
		});
	});

	describe('Pass-through of non-Greek text:', function () {
		it('toGreeklish leaves plain ASCII intact', function () {
			assert.strictEqual(greekUtils.toGreeklish('hello world 123'), 'hello world 123');
		});

		it('sanitizeDiacritics leaves text without diacritics intact', function () {
			assert.strictEqual(greekUtils.sanitizeDiacritics('αβγδε'), 'αβγδε');
		});

		it('toGreek leaves Greek text intact', function () {
			assert.strictEqual(greekUtils.toGreek('καλημερα'), 'καλημερα');
		});
	});

	describe('ignoreCharacters escaping (security regression):', function () {
		// Regex special chars inside [...] would previously corrupt the lookahead.
		// Verify these no longer throw and behave as plain literals.

		it('treats `]` in ignoreCharacters as a literal', function () {
			assert.doesNotThrow(function () {
				greekUtils.toGreeklish('αβγ', ']');
			});
		});

		it('treats `\\` in ignoreCharacters as a literal', function () {
			assert.doesNotThrow(function () {
				greekUtils.toGreeklish('αβγ', '\\');
			});
		});

		it('treats `^` in ignoreCharacters as a literal', function () {
			// Without escaping, leading ^ in [^...] inverts the class — would skip *everything but* ^.
			// With escaping, only the literal ^ should be skipped.
			assert.strictEqual(greekUtils.toGreeklish('α^β', '^'), 'a^b');
		});

		it('treats `-` in ignoreCharacters as a literal', function () {
			assert.doesNotThrow(function () {
				greekUtils.toGreeklish('αβγ', '-');
			});
		});

		it('ignores single Greek char correctly across the string', function () {
			assert.strictEqual(greekUtils.toGreeklish('αβα', 'α'), 'αbα');
		});

		it('empty ignoreCharacters works (precompiled fast path)', function () {
			assert.strictEqual(greekUtils.toGreeklish('αβγ', ''), 'abg');
		});
	});

	describe('Idempotency:', function () {
		it('sanitizeDiacritics is idempotent (running twice = once)', function () {
			const input = 'Ἐξ οὗ καὶ δῆλον';
			const once = greekUtils.sanitizeDiacritics(input);
			const twice = greekUtils.sanitizeDiacritics(once);
			assert.strictEqual(once, twice);
		});

		it('toGreeklish output contains no Greek letters', function () {
			const out = greekUtils.toGreeklish('Καλημέρα, πώς είστε σήμερα;');
			assert.ok(!/[Α-Ωα-ω]/.test(out), 'expected no Greek letters in: ' + out);
		});
	});

	describe('Determinism across repeated calls:', function () {
		// Guards against accidental shared state in precompiled regexes (e.g. lastIndex leaks).
		it('toGreek produces same output for repeated calls', function () {
			const input = 'kalhmera, pws eiste?';
			const first = greekUtils.toGreek(input);
			const second = greekUtils.toGreek(input);
			const third = greekUtils.toGreek(input);
			assert.strictEqual(first, second);
			assert.strictEqual(second, third);
		});

		it('sanitizeDiacritics produces same output for repeated calls', function () {
			const input = 'Αρνάκι άσπρο και παχύ';
			assert.strictEqual(
				greekUtils.sanitizeDiacritics(input),
				greekUtils.sanitizeDiacritics(input)
			);
		});
	});

	describe('Long-input handling:', function () {
		it('handles a long string without throwing', function () {
			const long = 'kalhmera '.repeat(1000);
			const out = greekUtils.toGreek(long);
			assert.strictEqual(out.length, long.length);
			assert.ok(out.startsWith('καλημερα'));
		});
	});

	describe('removeStopWords:', function () {
		it('defaults to preserving whitespace when flag is omitted', function () {
			// Stopwords between non-stopwords should leave double spaces when flag omitted.
			const result = greekUtils.removeStopWords('σκύλος και γάτα');
			assert.ok(result.includes('  '), 'expected double space when flag omitted, got: ' + JSON.stringify(result));
		});

		it('trims leading and trailing whitespace', function () {
			const result = greekUtils.removeStopWords('αυτή είναι μια απλή');
			assert.strictEqual(result, 'μια απλή');
		});

		it('preserves non-stopword text intact', function () {
			assert.strictEqual(greekUtils.removeStopWords('σκύλος γάτα', true), 'σκύλος γάτα');
		});
	});

	describe('Mixed scripts:', function () {
		it('toGreeklish preserves Latin chars and converts Greek', function () {
			assert.strictEqual(greekUtils.toGreeklish('hello καλημέρα'), 'hello kalhmera');
		});

		it('sanitizeDiacritics preserves non-Greek characters', function () {
			assert.strictEqual(greekUtils.sanitizeDiacritics('café αρνάκι'), 'café αρνακι');
		});
	});
});
