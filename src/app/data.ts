export const USER_XP = 0, USER_DONE = 0;

export const RANKS = [
  { level:"01", title:"Novice",                xp:0    },
  { level:"02", title:"Apprentice",            xp:100  },
  { level:"03", title:"Practicing",            xp:200  },
  { level:"04", title:"Journeyman",            xp:350  },
  { level:"05", title:"Artisan",               xp:500  },
  { level:"06", title:"Skilled Calligrapher",  xp:700  },
  { level:"07", title:"Master",                xp:900  },
  { level:"08", title:"Grand Calligrapher",    xp:1000 },
  { level:"09", title:"Distinguished Khattāt", xp:1300 },
  { level:"10", title:"Elite Khattāt",         xp:1700 },
  { level:"11", title:"Legendary Khattāt",     xp:2400 },
];

export const LESSONS = [
  { num:"01", title:"Introduction to Arabic Calligraphy",  desc:"Discover the history and beauty of Arabic script",                         xp:20 },
  { num:"02", title:"Fundamental Strokes of Thuluth",      desc:"Master the fundamental strokes used in Thuluth calligraphy",               xp:30 },
  { num:"03", title:"Group 1: Alif, Ba, Ta, Tha",         desc:"Learn the first family of letters sharing the same base form",             xp:30 },
  { num:"04", title:"Group 2: Jeem, Ha, Kha",             desc:"Master the bowl-shaped letters with their deep curves",                    xp:35 },
  { num:"05", title:"Group 3: Dal, Dhal, Ra, Zay",        desc:"Learn the non-connecting letters with elegant simplicity",                 xp:30 },
  { num:"06", title:"Group 4: Seen, Sheen, Saad, Dhad",   desc:"Tackle the toothed and looped letters",                                   xp:40 },
  { num:"07", title:"Group 5: Tah, Dhah, Ain, Ghain",     desc:"Master letters with vertical ascenders and deep bowls",                   xp:40 },
  { num:"08", title:"Group 6: Fa, Qaf, Kaf",              desc:"Learn the circular-headed letters and tall Kaf",                          xp:35 },
  { num:"09", title:"Group 7: Lam, Meem, Noon, Ha",       desc:"Practice elegant verticals, circles, and curves",                         xp:35 },
  { num:"10", title:"Group 8: Waw & Ya",                  desc:"Complete the alphabet with the final two letters",                        xp:30 },
];

export const STYLES_DATA = [
  { name:"Thuluth",  arabic:"ثُلُث",        origin:"Ottoman, 13th c.",   desc:"The most revered and technically demanding classical style. Sweeping strokes and elongated letterforms set it apart.",   sample:"بِسْمِ اللَّهِ",      color:"#E85020" },
  { name:"Naskh",    arabic:"نَسْخ",        origin:"Abbasid, 10th c.",   desc:"Foundation of all printed Arabic text. Clean, readable, and universally taught across the Islamic world.",              sample:"الْحَمْدُ لِلَّه",    color:"#5B8DB8" },
  { name:"Diwani",   arabic:"دِيوَانِي",    origin:"Ottoman, 16th c.",   desc:"Fluid and ornamental, developed in the imperial chancery. Curves and ligatures interlock in elaborate compositions.",    sample:"مَاشَاء اللَّه",     color:"#9B6B8B" },
  { name:"Ruq'ah",  arabic:"رُقْعَة",      origin:"Ottoman, 19th c.",   desc:"The everyday handwriting script. Fast, compact, and practical — the script of daily written life.",                    sample:"كَيفَ حَالُك",       color:"#5B9B6B" },
  { name:"Kufic",    arabic:"كُوفِي",       origin:"Kufa, Iraq, 7th c.", desc:"The oldest Arabic script. Angular, geometric, and architecturally bold — carved into stone and woven into textiles.",   sample:"اللَّه أَكْبَر",      color:"#C4813A" },
  { name:"Nastaliq", arabic:"نَسْتَعْلِيق", origin:"Persia, 14th c.",   desc:"Persian classical form with a descending diagonal flow. The script of poets and scholars.",                             sample:"إِنَّ اللَّه جَمِيل", color:"#8B7BAB" },
];

export const PRACTICE_TIPS = [
  "Use a reed pen (qalam) or calligraphy nib held at a 30–45° angle to the paper — this creates the natural thick-thin contrast of Arabic scripts",
  "Rest your wrist lightly on the paper and pull strokes toward you; never push the nib or it will catch",
  "Use smooth, slightly absorbent paper (e.g. layout paper or traditional ahar paper) — rough paper will fray your nib",
  "Follow the stroke order shown in the Learn tab exactly; lift the pen between strokes as indicated",
  "Practice each stroke slowly until it feels consistent — speed and flow come naturally with muscle memory",
];

export function getRank(xp: number) {
  let curr = RANKS[0], next = RANKS[1];
  for (let i = 0; i < RANKS.length - 1; i++) {
    if (xp >= RANKS[i].xp && xp < RANKS[i + 1].xp) { curr = RANKS[i]; next = RANKS[i + 1]; break; }
  }
  if (xp >= RANKS[RANKS.length - 1].xp) curr = next = RANKS[RANKS.length - 1];
  return { curr, next, pct: next.xp > curr.xp ? ((xp - curr.xp) / (next.xp - curr.xp)) * 100 : 100 };
}
