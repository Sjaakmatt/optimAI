import { BREEDTE, HOOGTE, glooiing, heuvelPad, loof, prng } from './prng';
import { SCHEMER_PALET, type Laag, type LandschapPalet } from './Bos';

/**
 * De polder: een vlakke horizon met een molen, een kerktoren en een boerderij
 * in de verte; een dijk met knotwilgen in het midden; water met de weerspiegeling
 * van de lucht en riet op de voorgrond.
 */

function molen(x: number, voet: number, h: number): React.ReactNode {
  const romp = h * 0.62;
  const kap = h * 0.16;
  const as = { x, y: voet - romp - kap * 0.35 };
  const wiek = h * 0.55;
  const wieken = [20, 110, 200, 290].map((graden, i) => (
    <g key={i} transform={`rotate(${graden} ${as.x} ${as.y})`}>
      <rect x={as.x - 1.2} y={as.y - wiek} width={2.4} height={wiek} />
      <rect x={as.x - h * 0.06} y={as.y - wiek} width={h * 0.06} height={wiek * 0.72} opacity={0.75} />
    </g>
  ));
  return (
    <g>
      <path d={`M${x - h * 0.16},${voet} L${x - h * 0.1},${voet - romp} L${x + h * 0.1},${voet - romp} L${x + h * 0.16},${voet} Z`} />
      <path d={`M${x - h * 0.13},${voet - romp} Q${x},${voet - romp - kap * 1.4} ${x + h * 0.13},${voet - romp} Z`} />
      {wieken}
    </g>
  );
}

function kerk(x: number, voet: number, h: number): React.ReactNode {
  return (
    <g>
      <rect x={x - h * 0.09} y={voet - h * 0.62} width={h * 0.18} height={h * 0.62} />
      <path d={`M${x - h * 0.11},${voet - h * 0.62} L${x},${voet - h} L${x + h * 0.11},${voet - h * 0.62} Z`} />
      <rect x={x + h * 0.09} y={voet - h * 0.34} width={h * 0.5} height={h * 0.34} />
      <path d={`M${x + h * 0.06},${voet - h * 0.34} L${x + h * 0.34},${voet - h * 0.5} L${x + h * 0.62},${voet - h * 0.34} Z`} />
    </g>
  );
}

function boerderij(x: number, voet: number, h: number): React.ReactNode {
  return (
    <g>
      <path d={`M${x - h * 1.1},${voet} L${x - h * 1.1},${voet - h * 0.45} L${x},${voet - h} L${x + h * 1.1},${voet - h * 0.45} L${x + h * 1.1},${voet} Z`} />
      <rect x={x + h * 0.5} y={voet - h * 1.15} width={h * 0.14} height={h * 0.3} />
    </g>
  );
}

function knotwilg(x: number, voet: number, h: number, r: () => number): React.ReactNode {
  const top = voet - h * 0.5;
  const takken: string[] = [];
  const n = 9 + Math.floor(r() * 5);
  for (let i = 0; i < n; i++) {
    const hoek = -80 + (i / (n - 1)) * 160 + (r() - 0.5) * 14;
    const lengte = h * (0.35 + r() * 0.35);
    const rad = (hoek * Math.PI) / 180;
    const ex = x + Math.sin(rad) * lengte;
    const ey = top - Math.cos(rad) * lengte;
    const cx = x + Math.sin(rad) * lengte * 0.5 + (r() - 0.5) * 8;
    const cy = top - Math.cos(rad) * lengte * 0.55;
    takken.push(`M${x},${top} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
  }
  return (
    <g>
      <path d={`M${x - h * 0.11},${voet + 2} L${x - h * 0.08},${top + 4} Q${x},${top - 6} ${x + h * 0.08},${top + 4} L${x + h * 0.11},${voet + 2} Z`} />
      <path d={takken.join(' ')} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

function verreLaag(kleur: string) {
  const r = prng(7);
  const lijn = glooiing(7, 318, 3);
  const bomen: React.ReactNode[] = [];
  for (let x = 40; x < BREEDTE; x += 26 + r() * 40) {
    if (x > 380 && x < 560) continue;
    if (x > 980 && x < 1180) continue;
    const h = 14 + r() * 16;
    const boom = loof(x, lijn(x) + 2, h, h * 1.2, r);
    bomen.push(
      <g key={x}>
        {boom.kruinen.map((k, i) => (
          <ellipse key={i} cx={k.cx.toFixed(1)} cy={k.cy.toFixed(1)} rx={k.rx.toFixed(1)} ry={k.ry.toFixed(1)} />
        ))}
      </g>,
    );
  }
  return (
    <svg viewBox={`0 0 ${BREEDTE} ${HOOGTE}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden focusable="false">
      <g fill={kleur} color={kleur}>
        <path d={heuvelPad(lijn)} />
        {bomen}
        {kerk(470, lijn(470) + 2, 74)}
        {boerderij(760, lijn(760) + 2, 26)}
        {molen(1085, lijn(1085) + 2, 96)}
      </g>
    </svg>
  );
}

function dijkLaag(kleur: string, water: [string, string], id: string) {
  const r = prng(23);
  const lijn = glooiing(23, 392, 6);
  const wilgen: React.ReactNode[] = [];
  for (let x = 120; x < BREEDTE; x += 150 + r() * 120) {
    wilgen.push(<g key={x}>{knotwilg(x, lijn(x) + 1, 48 + r() * 22, r)}</g>);
  }
  const paaltjes: React.ReactNode[] = [];
  for (let x = 60; x < BREEDTE; x += 44 + r() * 20) {
    paaltjes.push(<rect key={x} x={x} y={lijn(x) - 12} width={2.2} height={13} />);
  }
  return (
    <svg viewBox={`0 0 ${BREEDTE} ${HOOGTE}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <linearGradient id={`polder-water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={water[0]} stopOpacity="0.32" />
          <stop offset="0.55" stopColor={water[1]} stopOpacity="0.1" />
          <stop offset="1" stopColor="#0a0a0c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="330" width={BREEDTE} height="190" fill={`url(#polder-water-${id})`} />
      <g fill={kleur} color={kleur}>
        <path d={heuvelPad(lijn)} />
        {paaltjes}
        {wilgen}
      </g>
    </svg>
  );
}

function rietLaag(kleur: string) {
  const r = prng(59);
  const halmen: string[] = [];
  const pluimen: React.ReactNode[] = [];
  for (let x = -10; x < BREEDTE + 10; x += 5 + r() * 9) {
    const h = 60 + r() * 130;
    const buig = (r() - 0.5) * 40;
    const top = HOOGTE - h;
    halmen.push(`M${x},${HOOGTE + 10} Q${(x + buig * 0.4).toFixed(1)},${(HOOGTE - h * 0.55).toFixed(1)} ${(x + buig).toFixed(1)},${top.toFixed(1)}`);
    if (r() < 0.45) {
      pluimen.push(
        <ellipse key={x} cx={(x + buig).toFixed(1)} cy={(top - 6).toFixed(1)} rx={2.6} ry={9 + r() * 6} transform={`rotate(${(buig / 2).toFixed(1)} ${(x + buig).toFixed(1)} ${(top - 6).toFixed(1)})`} />,
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${BREEDTE} ${HOOGTE}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden focusable="false">
      <rect x="0" y={HOOGTE - 34} width={BREEDTE} height="60" fill={kleur} />
      <path d={halmen.join(' ')} fill="none" stroke={kleur} strokeWidth={2.2} strokeLinecap="round" />
      <g fill={kleur}>{pluimen}</g>
    </svg>
  );
}

export function maakPolderLagen(palet: LandschapPalet, id = 'schemer'): Laag[] {
  return [
    { id: 'ver', diepte: 0.16, kleur: palet.ver, svg: verreLaag(palet.ver) },
    { id: 'dijk', diepte: 0.4, kleur: palet.midden, svg: dijkLaag(palet.midden, palet.water ?? ['#f0b27a', '#c9744a'], id) },
    { id: 'riet', diepte: 0.78, kleur: palet.dichtbij, svg: rietLaag(palet.dichtbij) },
  ];
}

export const POLDER_LAGEN: Laag[] = maakPolderLagen(SCHEMER_PALET);
