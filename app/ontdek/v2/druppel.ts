/**
 * De padstaten van de inktdruppel, het protagonist-object van /ontdek.
 * Eén blob, zeven gedaanten; GSAP MorphSVG morpht ertussen op scroll.
 * ViewBox 0 0 400 400, zwaartepunt rond (200, 220).
 *
 * De vulling blijft inkt tot en met hoofdstuk 6; pas bij hoofdstuk 7
 * wordt de druppel goud (het enige goudmoment van het verhaal).
 */

export interface DruppelStaat {
  d: string;
  fill: string;
  x: number;
  y: number;
  scale: number;
}

const INKT = 'var(--ink)';
const GOUD = 'var(--oker)';

// onregelmatige vlek: het werk stroomt ongeordend binnen
const CHAOS =
  'M204 128 C 246 118 282 142 292 180 C 302 216 336 224 330 258 C 324 292 282 288 262 310 C 242 332 210 344 182 326 C 154 308 112 318 96 286 C 80 254 108 232 100 200 C 92 168 122 138 158 140 C 176 141 186 132 204 128 Z';

// kalme druppel: de collega
const DRUPPEL =
  'M200 108 C 230 158 264 200 264 246 C 264 296 234 328 200 328 C 166 328 136 296 136 246 C 136 200 170 158 200 108 Z';

// compacte kern: het denken, met satellieten eromheen (in de laag)
const KERN =
  'M200 172 C 227 172 248 193 248 220 C 248 247 227 268 200 268 C 173 268 152 247 152 220 C 152 193 173 172 200 172 Z';

// document: het werk zelf
const DOCUMENT =
  'M116 152 L 284 152 C 293 152 300 159 300 168 L 300 272 C 300 281 293 288 284 288 L 116 288 C 107 288 100 281 100 272 L 100 168 C 100 159 107 152 116 152 Z';

// tegen de grens gedrukt: hij stopt netjes
const GRENS =
  'M212 152 C 246 160 264 190 264 222 C 264 254 246 284 212 290 C 174 296 138 266 138 220 C 138 176 176 144 212 152 Z';

// stilte: bijna een perfecte cirkel
const STIL =
  'M200 162 C 232 162 258 188 258 220 C 258 252 232 278 200 278 C 168 278 142 252 142 220 C 142 188 168 162 200 162 Z';

// het zegel: goud, iets voller
const ZEGEL =
  'M200 148 C 240 148 272 180 272 220 C 272 260 240 292 200 292 C 160 292 128 260 128 220 C 128 188 160 148 200 148 Z';

export const DRUPPEL_STATEN: DruppelStaat[] = [
  { d: CHAOS, fill: INKT, x: 0, y: 0, scale: 1.12 },
  { d: DRUPPEL, fill: INKT, x: 0, y: 0, scale: 1 },
  { d: KERN, fill: INKT, x: -20, y: -10, scale: 0.9 },
  { d: DOCUMENT, fill: INKT, x: -74, y: 0, scale: 0.72 },
  { d: GRENS, fill: INKT, x: -36, y: 0, scale: 0.95 },
  { d: STIL, fill: INKT, x: 0, y: 0, scale: 0.8 },
  { d: ZEGEL, fill: GOUD, x: 0, y: -14, scale: 0.92 },
];
