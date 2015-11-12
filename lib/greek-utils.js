"use strict";

var diacriticsMap = require('./diacritics-map');
var greeklishToGreekMap = require('./greeklish-to-greek-map');

module.exports = function (_text) {
    return {
        text: _text,

        toGreek: function () {
            for (var characters of greeklishToGreekMap) {
                var regex = new RegExp(characters.find, 'g');
                this.text = this.text.replace(regex, characters.replace);
            }
            return this;
        },

        sanitizeDiacritics: function () {
            for (var characters of diacriticsMap) {
                var regex = new RegExp('[' + characters.find + ']', 'g');
                this.text = this.text.replace(regex, characters.replace);
            }
            return this;
        }
    };
};
