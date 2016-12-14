'use strict';

var assert = require('assert'),
	path = require('path'),
	greekUtils = require(path.join(__dirname.replace('test', ''), 'index.js'));

describe('Greek Utils:', function () {
	describe('Methods:', function() {
		describe('toGreek', function() {
			it('converts a string of latin characters to the equivalent greek characters.', function (done) {
				assert.equal(greekUtils.toGreek('kalhmera, pws eiste?'), 'καλημερα, πως ειστε;');

				done();
			});
		});

		describe('toGreeklish', function() {
			it('converts a string of greek characters to the equivalent greeklish characters.', function (done) {
				assert.equal(greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή'),
					'To kallos einai h kalyterh systatikh epistolh');

				done();
			});
		});

		describe('sanitizeDiacritics', function() {
			it('converts a string of modern greek characters with diacritics to their simple equivalent.', function (done) {
				assert.equal(greekUtils.sanitizeDiacritics('Αρνάκι άσπρο και παχύ'), 'Αρνακι ασπρο και παχυ');

				done();
			});

			it('converts a string of ancient greek characters with diacritics to their simple equivalent.', function (done) {
				assert.equal(greekUtils.sanitizeDiacritics('Ἐξ οὗ καὶ δῆλον ὅτι οὐδεμία τῶν ἠθικῶν ἀρετῶν φύσει ἡμῖν ἐγγίνεται'),
					'Εξ ου και δηλον οτι ουδεμια των ηθικων αρετων φυσει ημιν εγγινεται');

				done();
			});
		});
	});
});
