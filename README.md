# Greek Utilities
-----

A JavaScript library for Greek language with utilities such as replacement of accented and other diacritics characters, conversion from greek to latin (a.k.a. greeklish) and more.

[![NPM](https://nodei.co/npm/greek-utils.png)](https://nodei.co/npm/greek-utils/)

Installation
----------
```javascript
npm install --save greek-utils
````

Usage
-----
### - sanitizeDiacritics()
Convert all diacritics symbols to their simple equivalent

Example 1 (modern Greek):
```javascript
var greekUtils = require('greek-utils');
var sanitized = greekUtils('Αρνάκι άσπρο και παχύ').sanitizeDiacritics();
console.log(sanitized.text); //Αρνακι ασπρο και παχυ
```
Example 2 (ancient Greek):
```javascript
var greekUtils = require('greek-utils');
var sanitized = greekUtils('Ἐξ οὗ καὶ δῆλον ὅτι οὐδεμία τῶν ἠθικῶν ἀρετῶν φύσει ἡμῖν ἐγγίνεται').sanitizeDiacritics();
console.log(sanitized.text); //Εξ ου και δηλον οτι ουδεμια των ηθικων αρετων φυσει ημιν εγγινεται
```

### - toGreek()
Convert a latin characters (a.k.a. greeklish) text to Greek equivalent

Example:
```javascript
var greekUtils = require('greek-utils');
var greek = greekUtils('kalhmera, pws eiste?').toGreek();
console.log(greek.text); //καλημερα, πως ειστε?
```
