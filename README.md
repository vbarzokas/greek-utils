# Greek Utilities

[![Build Status](https://travis-ci.org/vbarzokas/greek-utils.svg?branch=master)](https://travis-ci.org/vbarzokas/greek-utils)

A JavaScript library for Greek language with utilities such as replacement of accented and other diacritics characters,
conversion from Greek to phonetic, transliterated or [greeklish](https://en.wikipedia.org/wiki/Greeklish) Latin and more.

[![NPM](https://nodei.co/npm/greek-utils.png)](https://nodei.co/npm/greek-utils/)

Installation
----------
```javascript
npm install --save greek-utils
````

Usage
-----

### Node.js
```javascript
var greekUtils = require('greek-utils');
```

### - sanitizeDiacritics()
Convert all diacritics symbols to their simple equivalent

Example 1 (modern Greek):
```javascript
var sanitized = greekUtils.sanitizeDiacritics('Αρνάκι άσπρο και παχύ');
console.log(sanitized); //Αρνακι ασπρο και παχυ
```
Example 2 (ancient Greek):
```javascript
var sanitized = greekUtils.sanitizeDiacritics('Ἐξ οὗ καὶ δῆλον ὅτι οὐδεμία τῶν ἠθικῶν ἀρετῶν φύσει ἡμῖν ἐγγίνεται');
console.log(sanitized); //Εξ ου και δηλον οτι ουδεμια των ηθικων αρετων φυσει ημιν εγγινεται
```

### - toGreek()
Convert a Latin characters text to its modern Greek equivalent

Example:
```javascript
var greek = greekUtils.toGreek('kalhmera, pws eiste?');
console.log(greek); //καλημερα, πως ειστε;
```

### - toGreeklish()
Convert a modern Greek characters text to its [greeklish](https://en.wikipedia.org/wiki/Greeklish) equivalent

Example:
```javascript
var greeklish = greekUtils.toGreeklish('Εύηχο: αυτό που ακούγεται ωραία.');
console.log(greeklish); //Euhxo: auto pou akougetai wraia.
```

### - toPhoneticLatin()
Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).

Example:
```javascript
var phoneticLatin = greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.');
console.log(phoneticLatin); //Évikho: aftó pou akoúyete oréa.
```

### - toTransliteratedLatin()
Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).

Example:
```javascript
var transliteratedLatin = greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.');
console.log(transliteratedLatin); //Eúēkho: autó pou akoúgetai ōraía.
```

#### Ignoring characters
All functions accept an optional second parameter as a string with characters you don't wish to be converted.

Example:
```javascript
var greeklish = greekUtils.toGreeklish('καλημερα, πως ειστε;', ';');
console.log(greeklish); //kalhmera, pws eiste;
```
