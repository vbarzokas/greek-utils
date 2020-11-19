'use strict';

const diacriticsMap = [
	{ find: 'άἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ', replace: 'α' },
	{ find: 'ΆἈἉἊἋἌἍἎἏᾈᾉᾊᾋᾌᾍᾎᾏᾸᾹᾺΆᾼ', replace: 'Α' },
	{ find: 'έἐἑἒἓἔἕὲέ', replace: 'ε' },
	{ find: 'ΈἘἙἚἛἜἝ', replace: 'Ε' },
	{ find: 'ήἠἡἢἣἤἥἦἧῆὴῇ', replace: 'η' },
	{ find: 'ΉἨἩἪἫἬἭἮἯ', replace: 'Η' },
	{ find: 'ίἰἱἲἳἴἵὶῖ', replace: 'ι' },
	{ find: 'ΊἶἷἸἹἺἻἼἽἾἿ', replace: 'Ι' },
	{ find: 'όὀὁὂὃὄὅὸ', replace: 'ο' },
	{ find: 'ΌὈὉὊὋὌὍ', replace: 'Ο' },
	{ find: 'ύὐὑὒὓὔὕὖὗ', replace: 'υ' },
	{ find: 'ΎὙὛὝὟ', replace: 'Υ' },
	{ find: 'ώὠὡὢὣὤὥὦὧῶ', replace: 'ω' },
	{ find: 'ΏὨὩὪὫὬὭὮὯ', replace: 'Ω' }
];

module.exports = diacriticsMap;
