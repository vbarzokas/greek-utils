'use strict';

var assert = require('assert'),
	path = require('path'),
	greekUtils = require(path.join(__dirname.replace('test', ''), 'index.js'));

describe('Greek Utils:', function () {
	describe('Methods:', function () {
		describe('toGreek', function () {
			it('converts a string of Latin characters to the equivalent modern Greek characters.', function (done) {
				assert.equal(greekUtils.toGreek('To kallos einai h kalyterh systatikh epistolh'),
					'Το καλλος ειναι η καλυτερη συστατικη επιστολη');

				assert.equal(greekUtils.toGreek('kalhmera, pws eiste?'), 'καλημερα, πως ειστε;');

				assert.equal(greekUtils.toGreek('kalhmera, pws eiste?', '?p'), 'καλημερα, pως ειστε?');

				done();
			});
		});

		describe('toGreeklish', function () {
			it('converts a string of modern Greek characters to the equivalent greeklish characters.', function (done) {
				assert.equal(greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή'),
					'To kallos einai h kalyterh systatikh epistolh');

				assert.equal(greekUtils.toGreeklish('καλημερα, πως ειστε;'), 'kalhmera, pws eiste?');

				assert.equal(greekUtils.toGreeklish('Εύηχο: αυτό που ακούγεται ωραία.'),
					'Euhxo: auto pou akougetai wraia.');

				assert.equal(greekUtils.toGreeklish('καλημερα, πως ειστε;', ';λ'), 'kaλhmera, pws eiste;');

				done();
			});
		});

		describe('toPhoneticLatin', function () {
			it('Convert a modern Greek characters text to its phonetically equivalent Latin.', function (done) {
				assert.equal(greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.'),
					'Évikho: aftó pou akoúyete oréa.');

				assert.equal(greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'χ'),
					'Éviχo: aftó pou akoúyete oréa.');

				done();
			});
		});

		describe('toTransliteratedLatin', function () {
			it('Convert a modern Greek characters text to its transliterated equivalent Latin.', function (done) {
				assert.equal(greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.'),
					'Eúēkho: autó pou akoúgetai ōraía.');

				assert.equal(greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'αύ'),
					'Eύēkho: αutó pou αkoύgetαi ōrαíα.');

				done();
			});
		});

		describe('sanitizeDiacritics', function () {
			it('converts a string of modern Greek characters with diacritics to their simple equivalent.', function (done) {
				assert.equal(greekUtils.sanitizeDiacritics('Αρνάκι άσπρο και παχύ'), 'Αρνακι ασπρο και παχυ');

				assert.equal(greekUtils.sanitizeDiacritics('Αρνάκι άσπρο και παχύ', 'άύ'), 'Αρνάκι άσπρο και παχύ');

				done();
			});

			it('converts a string of ancient Greek characters with diacritics to their simple equivalent.', function (done) {
				assert.equal(greekUtils.sanitizeDiacritics('Ἐξ οὗ καὶ δῆλον ὅτι οὐδεμία τῶν ἠθικῶν ἀρετῶν φύσει ἡμῖν ἐγγίνεται'),
					'Εξ ου και δηλον οτι ουδεμια των ηθικων αρετων φυσει ημιν εγγινεται');

				assert.equal(greekUtils.sanitizeDiacritics('Ἐξ οὗ καὶ δῆλον ὅτι οὐδεμία τῶν ἠθικῶν ἀρετῶν φύσει ἡμῖν ἐγγίνεται', 'Ἐ'),
					'Ἐξ ου και δηλον οτι ουδεμια των ηθικων αρετων φυσει ημιν εγγινεται');

				done();
			});
		});
	});
});
