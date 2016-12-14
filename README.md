# Greek Utilities

[![Build Status](https://travis-ci.org/vbarzokas/greek-utils.svg?branch=master)](https://travis-ci.org/vbarzokas/greek-utils)

A JavaScript library for Greek language with utilities such as replacement of accented and other diacritics characters, conversion from greek to latin (a.k.a. greeklish) and more.

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
Convert a latin characters (a.k.a. greeklish) text to Greek equivalent

Example:
```javascript
var sanitized = greekUtils.toGreek('kalhmera, pws eiste?');
console.log(greek); //καλημερα, πως ειστε;
```

### - toGreeklish()
Convert a Greek characters text to greeklish equivalent

Example:
```javascript
var greeklish = greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή');
console.log(greeklish); //To kallos einai h kalyterh systatikh epistolh.
```
