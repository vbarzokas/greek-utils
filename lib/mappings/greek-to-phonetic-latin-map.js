'use strict';

const greekVowels = 'αεηιουω',
	greekConsonants = 'βγδζθκλμνξπρςστφχψ',
	greekToPhoneticLatinMap = [
		{ find: 'ηυ', replace: 'if' },
		{ find: '(αυ)(?=[' + greekConsonants + '])', replace: 'af' },
		{ find: '(αυ)(?=[' + greekVowels + '])', replace: 'av' },
		{ find: '(ευ)(?=[' + greekConsonants + '])', replace: 'ef' },
		{ find: '(ευ)(?=[' + greekVowels + '])', replace: 'ev' },
		{ find: 'ου', replace: 'ou' },

		{ find: '(Αυ)(?=[' + greekConsonants + '])', replace: 'Af' },
		{ find: '(Αυ)(?=[' + greekVowels + '])', replace: 'Av' },
		{ find: '(Ευ)(?=[' + greekConsonants + '])', replace: 'Ef' },
		{ find: '(Ευ)(?=[' + greekVowels + '])', replace: 'Ev' },
		{ find: 'Ηυ', replace: 'If' },
		{ find: 'Ου', replace: 'Ou' },

		{ find: 'ηύ', replace: 'íf' },
		{ find: '(αύ)(?=[' + greekConsonants + '])', replace: 'áf' },
		{ find: '(αύ)(?=[' + greekVowels + '])', replace: 'áv' },
		{ find: '(εύ)(?=[' + greekConsonants + '])', replace: 'éf' },
		{ find: '(εύ)(?=[' + greekVowels + '])', replace: 'éf' },
		{ find: 'ού', replace: 'oú' },

		{ find: '(Αύ)(?=[' + greekConsonants + '])', replace: 'Áf' },
		{ find: '(Αύ)(?=[' + greekVowels + '])', replace: 'Áv' },
		{ find: '(Εύ)(?=[' + greekConsonants + '])', replace: 'Éf' },
		{ find: '(Εύ)(?=[' + greekVowels + '])', replace: 'Év' },
		{ find: 'Ηύ', replace: 'Íf' },
		{ find: 'Ού', replace: 'Oú' },

		{ find: 'αι', replace: 'e' },
		{ find: 'ει', replace: 'i' },
		{ find: 'οι', replace: 'i' },

		{ find: 'αί', replace: 'é' },
		{ find: 'εί', replace: 'í' },
		{ find: 'οί', replace: 'í' },

		{ find: 'Αι|ΑΙ', replace: 'E' },
		{ find: 'Ει|ΕΙ', replace: 'I' },
		{ find: 'Οι|ΟΙ', replace: 'I' },

		{ find: 'Αί', replace: 'É' },
		{ find: 'Εί', replace: 'Í' },
		{ find: 'Οί', replace: 'Í' },

		{ find: 'γε', replace: 'ye' },
		{ find: 'γι', replace: 'yi' },
		{ find: 'γυ', replace: 'yi' },

		{ find: 'Γε', replace: 'Ye' },
		{ find: 'Γι', replace: 'Yi' },
		{ find: 'Γυ', replace: 'Yi' },

		{ find: 'μπ', replace: 'b' },
		{ find: 'ντ', replace: 'd' },
		{ find: 'γκ', replace: 'g' },

		{ find: 'Μπ|ΜΠ', replace: 'B' },
		{ find: 'Ντ|ΝΤ', replace: 'D' },
		{ find: 'Γκ|ΓΚ', replace: 'G' },

		{ find: 'α', replace: 'a' },
		{ find: 'β', replace: 'v' },
		{ find: 'γ', replace: 'g' },
		{ find: 'δ', replace: 'd' },
		{ find: 'ε', replace: 'e' },
		{ find: 'ζ', replace: 'z' },
		{ find: 'η', replace: 'i' },
		{ find: 'θ', replace: 'th' },
		{ find: 'ι', replace: 'i' },
		{ find: 'κ', replace: 'k' },
		{ find: 'λ', replace: 'l' },
		{ find: 'μ', replace: 'm' },
		{ find: 'ν', replace: 'n' },
		{ find: 'ξ', replace: 'x' },
		{ find: 'ο', replace: 'o' },
		{ find: 'π', replace: 'p' },
		{ find: 'ρ', replace: 'r' },
		{ find: 'ς', replace: 's' },
		{ find: 'σ', replace: 's' },
		{ find: 'τ', replace: 't' },
		{ find: 'υ', replace: 'i' },
		{ find: 'φ', replace: 'ph' },
		{ find: 'χ', replace: 'kh' },
		{ find: 'ψ', replace: 'ps' },
		{ find: 'ω', replace: 'o' },

		{ find: 'ά', replace: 'á' },
		{ find: 'έ', replace: 'é' },
		{ find: 'ή', replace: 'í' },
		{ find: 'ί', replace: 'í' },
		{ find: 'ό', replace: 'ó' },
		{ find: 'ύ', replace: 'í' },
		{ find: 'ώ', replace: 'ó' },
		{ find: 'ΰ', replace: 'ï' },
		{ find: 'ΐ', replace: 'ï' },
		{ find: 'ϊ', replace: 'ï' },
		{ find: 'ϋ', replace: 'ï' },

		{ find: 'Α', replace: 'A' },
		{ find: 'Β', replace: 'V' },
		{ find: 'Γ', replace: 'G' },
		{ find: 'Δ', replace: 'D' },
		{ find: 'Ε', replace: 'E' },
		{ find: 'Ζ', replace: 'Z' },
		{ find: 'Η', replace: 'I' },
		{ find: 'Θ', replace: 'Th' },
		{ find: 'Ι', replace: 'I' },
		{ find: 'Κ', replace: 'K' },
		{ find: 'Λ', replace: 'L' },
		{ find: 'Μ', replace: 'M' },
		{ find: 'Ν', replace: 'N' },
		{ find: 'Ξ', replace: 'X' },
		{ find: 'Ο', replace: 'O' },
		{ find: 'Π', replace: 'P' },
		{ find: 'Ρ', replace: 'R' },
		{ find: 'Σ', replace: 'S' },
		{ find: 'Τ', replace: 'T' },
		{ find: 'Υ', replace: 'I' },
		{ find: 'Φ', replace: 'Ph' },
		{ find: 'Χ', replace: 'Kh' },
		{ find: 'Ψ', replace: 'Ps' },
		{ find: 'Ω', replace: 'O' },

		{ find: 'Ά', replace: 'Á' },
		{ find: 'Έ', replace: 'É' },
		{ find: 'Ή', replace: 'Í' },
		{ find: 'Ί', replace: 'Í' },
		{ find: 'Ό', replace: 'Ó' },
		{ find: 'Ύ', replace: 'Í' },
		{ find: 'Ώ', replace: 'Ó' },
		{ find: 'ΰ', replace: 'Ï' },
		{ find: 'ΐ', replace: 'Ï' },
		{ find: 'Ϊ', replace: 'Ï' },
		{ find: 'Ϋ', replace: 'Ï' }
	];

module.exports = greekToPhoneticLatinMap;
