import { BREEDTE, HOOGTE, den, glooiing, heuvelPad, loof, prng } from './prng';

/**
 * Het bos: drie rijen bomen op glooiende heuvels, van ver (licht, paars-grijs
 * in de nevel) naar dichtbij (bijna zwart). Elke rij is één SVG, zodat de
 * parallax per laag kan bewegen.
 */

export interface Laag {
  id: string;
  diepte: number; // 0 = staat stil, 1 = beweegt het meest
  kleur: string;
  svg: React.ReactNode;
}

function rij(zaad: number, basis: number, amplitude: number, spacing: number, hoogte: [number, number], breedte: [number, number], loofKans: number, kleur: string) {
  const r = prng(zaad);
  const lijn = glooiing(zaad + 11, basis, amplitude);
  const paden: string[] = [];
  const kruinen: { cx: number; cy: number; rx: number; ry: number }[] = [];
  for (let x = -20; x <= BREEDTE + 20; x += spacing * (0.6 + r() * 0.8)) {
    const voet = lijn(x) + 3;
    const h = hoogte[0] + r() * (hoogte[1] - hoogte[0]);
    const w = breedte[0] + r() * (breedte[1] - breedte[0]);
    if (r() < loofKans) {
      const boom = loof(x, voet, h * 0.8, w * 1.3, r);
      kruinen.push(...boom.kruinen);
      paden.push(boom.stam);
    } else {
      paden.push(den(x, voet, h, w, 4 + Math.floor(r() * 3)));
    }
  }
  return (
    <svg viewBox={`0 0 ${BREEDTE} ${HOOGTE}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden focusable="false">
      <g fill={kleur}>
        <path d={heuvelPad(lijn)} />
        <path d={paden.join(' ')} />
        {kruinen.map((k, i) => (
          <ellipse key={i} cx={k.cx.toFixed(1)} cy={k.cy.toFixed(1)} rx={k.rx.toFixed(1)} ry={k.ry.toFixed(1)} />
        ))}
      </g>
    </svg>
  );
}

export const BOS_LAGEN: Laag[] = [
  {
    id: 'ver',
    diepte: 0.18,
    kleur: '#2a2030',
    svg: rij(3, 280, 26, 22, [34, 70], [16, 30], 0.15, '#2a2030'),
  },
  {
    id: 'midden',
    diepte: 0.42,
    kleur: '#171219',
    svg: rij(17, 340, 30, 34, [70, 130], [30, 54], 0.22, '#171219'),
  },
  {
    id: 'dichtbij',
    diepte: 0.75,
    kleur: '#09090b',
    svg: rij(41, 420, 22, 58, [130, 230], [56, 96], 0.2, '#09090b'),
  },
];
