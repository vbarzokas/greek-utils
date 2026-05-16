'use strict';

const assert = require('assert');
const greekUtils = require('../../lib/index.js');

describe('Greek Utils — toISO843:', function () {
	describe('Real-world names (the canonical use case):', function () {
		it('passport name examples', function () {
			assert.strictEqual(greekUtils.toISO843('Άγγελος'), 'Angelos');
			assert.strictEqual(greekUtils.toISO843('Γιώργος'), 'Giorgos');
			assert.strictEqual(greekUtils.toISO843('Δημήτρης'), 'Dimitris');
			assert.strictEqual(greekUtils.toISO843('Παπαδόπουλος'), 'Papadopoulos');
			assert.strictEqual(greekUtils.toISO843('Αθήνα'), 'Athina');
		});

		it('Greek place names', function () {
			assert.strictEqual(greekUtils.toISO843('Θεσσαλονίκη'), 'Thessaloniki');
			assert.strictEqual(greekUtils.toISO843('Πάτρα'), 'Patra');
			assert.strictEqual(greekUtils.toISO843('Ηράκλειο'), 'Irakleio');
		});
	});

	describe('Context-sensitive αυ/ευ/ηυ:', function () {
		it('αυ before voiceless consonant → af', function () {
			assert.strictEqual(greekUtils.toISO843('αυτός'), 'aftos');
			assert.strictEqual(greekUtils.toISO843('αυτοκίνητο'), 'aftokinito');
			assert.strictEqual(greekUtils.toISO843('παύση'), 'pafsi');
		});

		it('αυ before vowel or voiced consonant → av', function () {
			assert.strictEqual(greekUtils.toISO843('αυγό'), 'avgo');
			assert.strictEqual(greekUtils.toISO843('αύριο'), 'avrio');
		});

		it('ευ before voiceless → ef', function () {
			assert.strictEqual(greekUtils.toISO843('ευχαριστώ'), 'efcharisto');
			assert.strictEqual(greekUtils.toISO843('ευτυχία'), 'eftychia');
		});

		it('ευ before vowel or voiced → ev', function () {
			assert.strictEqual(greekUtils.toISO843('ευγενικός'), 'evgenikos');
			assert.strictEqual(greekUtils.toISO843('ευλογία'), 'evlogia');
		});

		it('case-aware: ΑΥ/Αυ/αυ', function () {
			assert.strictEqual(greekUtils.toISO843('ΑΥΤΟΣ'), 'AFTOS');
			assert.strictEqual(greekUtils.toISO843('Αυτός'), 'Aftos');
			assert.strictEqual(greekUtils.toISO843('αυτός'), 'aftos');
		});
	});

	describe('Simple diphthongs:', function () {
		it('αι → ai', function () {
			assert.strictEqual(greekUtils.toISO843('παιδί'), 'paidi');
			assert.strictEqual(greekUtils.toISO843('καλημέρα'), 'kalimera');
		});

		it('ει → ei', function () {
			assert.strictEqual(greekUtils.toISO843('είμαι'), 'eimai');
		});

		it('οι → oi', function () {
			assert.strictEqual(greekUtils.toISO843('οικογένεια'), 'oikogeneia');
		});

		it('ου → ou', function () {
			assert.strictEqual(greekUtils.toISO843('μου'), 'mou');
			assert.strictEqual(greekUtils.toISO843('Πούλος'), 'Poulos');
		});

		it('caps diphthongs', function () {
			assert.strictEqual(greekUtils.toISO843('ΑΙΓΑΙΟ'), 'AIGAIO');
			assert.strictEqual(greekUtils.toISO843('ΟΥΖΟ'), 'OUZO');
		});
	});

	describe('Consonant digraphs:', function () {
		it('γγ → ng', function () {
			assert.strictEqual(greekUtils.toISO843('Άγγελος'), 'Angelos');
			assert.strictEqual(greekUtils.toISO843('αγγούρι'), 'angouri');
		});

		it('γκ → gk', function () {
			assert.strictEqual(greekUtils.toISO843('γκάζι'), 'gkazi');
		});

		it('γχ → nch', function () {
			assert.strictEqual(greekUtils.toISO843('έλεγχος'), 'elenchos');
		});

		it('μπ → mp', function () {
			assert.strictEqual(greekUtils.toISO843('μπύρα'), 'mpyra');
		});

		it('ντ → nt', function () {
			assert.strictEqual(greekUtils.toISO843('ντομάτα'), 'ntomata');
		});
	});

	describe('Multi-letter single chars:', function () {
		it('θ → th', function () {
			assert.strictEqual(greekUtils.toISO843('θάλασσα'), 'thalassa');
			assert.strictEqual(greekUtils.toISO843('Θάλασσα'), 'Thalassa');
			assert.strictEqual(greekUtils.toISO843('ΘΑΛΑΣΣΑ'), 'THALASSA');
		});

		it('χ → ch', function () {
			assert.strictEqual(greekUtils.toISO843('χάος'), 'chaos');
		});

		it('ψ → ps', function () {
			assert.strictEqual(greekUtils.toISO843('ψυχή'), 'psychi');
		});
	});

	describe('Final sigma and other plain characters:', function () {
		it('final ς → s (same as σ)', function () {
			assert.strictEqual(greekUtils.toISO843('φως'), 'fos');
			assert.strictEqual(greekUtils.toISO843('κόσμος'), 'kosmos');
		});
	});

	describe('Accents are dropped:', function () {
		it('drops tonos on vowels', function () {
			assert.strictEqual(greekUtils.toISO843('άσπρο'), 'aspro');
			assert.strictEqual(greekUtils.toISO843('Έλληνας'), 'Ellinas');
			assert.strictEqual(greekUtils.toISO843('Ώρα'), 'Ora');
		});

		it('drops dialytika', function () {
			assert.strictEqual(greekUtils.toISO843('Νϊκος'), 'Nikos');
		});
	});

	describe('ignoreCharacters parameter:', function () {
		it('respects ignoreCharacters', function () {
			// γ in ignore list → neither single γ nor γγ digraph is replaced.
			assert.strictEqual(greekUtils.toISO843('Άγγελος', 'γ'), 'Aγγelos');
		});
	});

	describe('Edge cases:', function () {
		it('handles empty and non-string inputs', function () {
			assert.strictEqual(greekUtils.toISO843(''), '');
			assert.strictEqual(greekUtils.toISO843(null), null);
			assert.strictEqual(greekUtils.toISO843(undefined), undefined);
		});

		it('passes Latin text through unchanged', function () {
			assert.strictEqual(greekUtils.toISO843('hello world'), 'hello world');
		});

		it('handles mixed Greek and Latin', function () {
			assert.strictEqual(greekUtils.toISO843('Hello Άγγελε'), 'Hello Angele');
		});

		it('is idempotent on plain Latin output', function () {
			const out = greekUtils.toISO843('Παπαδόπουλος');
			assert.strictEqual(greekUtils.toISO843(out), out);
		});

		it('punctuation passes through', function () {
			assert.strictEqual(greekUtils.toISO843('Καλημέρα, κόσμε!'), 'Kalimera, kosme!');
		});
	});
});
