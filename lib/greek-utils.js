"use strict";

const diacriticsMap = require('./diacritics-map');
const greeklishToGreekMap = require('./greeklish-to-greek-map');

module.exports = function (_text) {
    return {
        text: _text,

        toGreek: function () {
            for (var characters of greeklishToGreekMap) {
                const regex = new RegExp(characters.find, 'g');
                this.text = this.text.replace(regex, characters.replace);
            }
            return this;
        },

        sanitizeDiacritics: function () {
            for (var characters of diacriticsMap) {
                const regex = new RegExp('[' + characters.find + ']', 'g');
                this.text = this.text.replace(regex, characters.replace);
            }
            return this;
        }
    };
};

