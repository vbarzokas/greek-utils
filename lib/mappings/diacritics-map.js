"use strict";

const diacriticsMap = [
  { find: "άἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ", replace: "α" },
  { find: "ΆἈἉἊἋἌἍἎἏᾈᾉᾊᾋᾌᾍᾎᾏᾸᾹᾺΆᾼ", replace: "Α" },
  { find: "έἐἑἒἓἔἕὲέ", replace: "ε" },
  { find: "ΈἘἙἚἛἜἝ", replace: "Ε" },
  { find: "ήἠἡἢἣἤἥἦἧῆὴῇῃᾗᾐᾔᾖῄᾑ", replace: "η" },
  { find: "ΉἨἩἪἫἬἭἮἯ", replace: "Η" },
  { find: "ίἰἱἲἳἴἵὶῖ", replace: "ι" },
  { find: "ΊἶἷἸἹἺἻἼἽἾἿIῒ", replace: "Ι" },
  { find: "όὀὁὂὃὄὅὸ", replace: "ο" },
  { find: "ΌὈὉὊὋὌὍ", replace: "Ο" },
  { find: "ύὐὑὒὓὔὕὖὗῦὺῢ", replace: "υ" },
  { find: "ΎὙὛὝὟ", replace: "Υ" },
  { find: "ώὠὡὢὣὤὥὦὧῶῳῷᾠῴᾤὼᾧ", replace: "ω" },
  { find: "ΏὨὩὪὫὬὭὮὯ", replace: "Ω" },
  { find: "ῥ", replace: "ρ" },
];

module.exports = diacriticsMap;
