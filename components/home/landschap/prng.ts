/**
 * Deterministische toevalsgenerator (mulberry32). Het landschap wordt op de
 * server én in de browser getekend; met een vast zaad komt er twee keer
 * precies hetzelfde uit en klaagt React niet over een hydration-verschil.
 */
export function prng(zaad: number): () => number {
  let a = zaad >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const BREEDTE = 1600;
export const HOOGTE = 520;

/** Een glooiende lijn van links naar rechts, opgebouwd uit een paar sinussen. */
export function glooiing(zaad: number, basis: number, amplitude: number): (x: number) => number {
  const r = prng(zaad);
  const golven = [1, 2, 3].map((n) => ({
    f: (n * 0.7 + r() * 0.6) / BREEDTE,
    fase: r() * Math.PI * 2,
    amp: amplitude / n,
  }));
  return (x: number) => basis + golven.reduce((y, g) => y + Math.sin(x * g.f * Math.PI * 2 + g.fase) * g.amp, 0);
}

/** Gesloten pad: de lijn zelf, en dan dicht naar de onderrand. */
export function heuvelPad(lijn: (x: number) => number, stap = 24): string {
  const punten: string[] = [];
  for (let x = -40; x <= BREEDTE + 40; x += stap) {
    punten.push(`${x.toFixed(1)},${lijn(x).toFixed(1)}`);
  }
  return `M-40,${HOOGTE + 40} L${punten.join(' L')} L${BREEDTE + 40},${HOOGTE + 40} Z`;
}

/** Dennenboom: gestapelde driehoeken plus een stam, één pad. */
export function den(x: number, voet: number, hoogte: number, breedte: number, lagen: number): string {
  const top = voet - hoogte;
  const seg = (hoogte * 0.86) / lagen;
  let d = '';
  for (let i = 1; i <= lagen; i++) {
    const yTop = top + (i - 1) * seg - seg * 0.35;
    const yBot = top + i * seg;
    const hw = (breedte / 2) * (0.35 + (0.65 * i) / lagen);
    d += `M${x.toFixed(1)},${yTop.toFixed(1)} L${(x + hw).toFixed(1)},${yBot.toFixed(1)} L${(x - hw).toFixed(1)},${yBot.toFixed(1)} Z `;
  }
  const stam = Math.max(2, breedte * 0.08);
  d += `M${(x - stam).toFixed(1)},${(voet - hoogte * 0.16).toFixed(1)} h${(stam * 2).toFixed(1)} V${(voet + 2).toFixed(1)} h${(-stam * 2).toFixed(1)} Z`;
  return d;
}

/** Loofboom: een kruin van ellipsen op een stam. Cirkels als losse elementen. */
export function loof(x: number, voet: number, hoogte: number, breedte: number, r: () => number) {
  const kruinY = voet - hoogte * 0.62;
  const kruinen = [
    { cx: x, cy: kruinY - hoogte * 0.08, rx: breedte * 0.34, ry: hoogte * 0.3 },
    { cx: x - breedte * 0.26, cy: kruinY + hoogte * 0.04, rx: breedte * 0.3, ry: hoogte * 0.22 },
    { cx: x + breedte * 0.27, cy: kruinY + hoogte * 0.06, rx: breedte * 0.28, ry: hoogte * 0.2 },
    { cx: x + (r() - 0.5) * breedte * 0.3, cy: kruinY + hoogte * 0.18, rx: breedte * 0.36, ry: hoogte * 0.18 },
  ];
  const stamW = Math.max(2, breedte * 0.07);
  const stam = `M${(x - stamW).toFixed(1)},${(voet - hoogte * 0.45).toFixed(1)} h${(stamW * 2).toFixed(1)} V${(voet + 2).toFixed(1)} h${(-stamW * 2).toFixed(1)} Z`;
  return { kruinen, stam };
}
