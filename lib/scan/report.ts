// Bouwt het uitgebreidere rapport dat per e-mail wordt verstuurd nadat de
// bezoeker om het volledige rapport heeft gevraagd. Bevat alles van het
// scherm plus een concreet stappenplan en per geavanceerd voorstel een
// duiding — de echte meerwaarde t.o.v. de scanpagina zelf.

import type { ScanAnalysis } from './types';

const LABEL_TEXT: Record<ScanAnalysis['label'], string> = {
  hoog: 'Hoog AI-potentieel',
  gemiddeld: 'Duidelijke AI-kansen',
  beperkt: 'Beperkt zichtbaar potentieel',
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Vaste, merkgetrouwe volgorde waarin FactumAI een agent invoert. */
const STAPPENPLAN = [
  {
    kop: '1 · Klein beginnen',
    body: 'We kiezen samen één afgebakend proces met de meeste tijdwinst en het minste risico. Daar bouwen we de eerste agent omheen, binnen uw eigen regels.',
  },
  {
    kop: '2 · Productieklaar opleveren',
    body: 'De eerste versie draait binnen één tot twee weken live mee, met u aan het stuur: wat automatisch mag en wat langs u komt, bepaalt u.',
  },
  {
    kop: '3 · Uitbreiden op bewijs',
    body: 'Werkt de eerste agent, dan breiden we uit naar aangrenzende stappen en, waar zinvol, naar een samenwerkend team van agents met menselijke controle op twijfelgevallen.',
  },
];

export function buildReportText(naam: string, a: ScanAnalysis): string {
  const lines: string[] = [];
  lines.push(`Uitgebreid AI-rapport voor ${naam}`);
  lines.push('='.repeat(48));
  lines.push('');
  lines.push(`AI-potentieel: ${a.score}/100 — ${LABEL_TEXT[a.label]}`);
  lines.push('');
  lines.push(a.samenvatting);
  if (a.websiteAnalyse) lines.push('', a.websiteAnalyse);

  const p = a.companyProfile;
  const profielRegels = [
    ['Sector', p.sector],
    ['Activiteiten', p.activiteiten],
    ['Omvang', p.omvang],
    ['Doelgroep', p.doelgroep],
    ['Locatie', p.locatie],
  ].filter(([, v]) => v) as [string, string][];
  if (profielRegels.length) {
    lines.push('', 'WAT WE ZAGEN', '-'.repeat(24));
    for (const [k, v] of profielRegels) lines.push(`${k}: ${v}`);
  }

  if (a.brancheKansen) {
    lines.push('', 'WAT ER IN UW BRANCHE GEBEURT', '-'.repeat(24), a.brancheKansen);
  }

  if (a.aiOpportunities.length) {
    lines.push('', 'SNEL TE AUTOMATISEREN', '-'.repeat(24));
    for (const k of a.aiOpportunities) lines.push(`• ${k}`);
  }

  if (a.advancedSolutions.length) {
    lines.push('', 'EEN STAP VERDER: GEAVANCEERDE AGENTS', '-'.repeat(24));
    for (const s of a.advancedSolutions) {
      lines.push('', `${s.titel} (${s.categorie})`);
      lines.push(`Complexiteit: ${s.complexiteit} · Impact: ${s.impact}`);
      lines.push(s.beschrijving);
      if (s.voorbeeld) lines.push(`Voorbeeld: ${s.voorbeeld}`);
      if (s.dataBronnen.length) lines.push(`Databronnen: ${s.dataBronnen.join(', ')}`);
    }
  }

  lines.push('', 'ZO PAKKEN WE HET AAN', '-'.repeat(24));
  for (const stap of STAPPENPLAN) lines.push('', stap.kop, stap.body);

  lines.push('', '-'.repeat(48));
  lines.push('Dit rapport is een automatische analyse op basis van openbare');
  lines.push('website-informatie — een eerste beeld, geen offerte. In een gesprek');
  lines.push('van 30 minuten maken we het concreet en rekenen we het met u door.');
  lines.push(`Plan een gesprek: ${SITE_URL}/plan`);
  lines.push('');
  lines.push('FactumAI · AI-agents voor MKB · factumai.nl');
  return lines.join('\n');
}

export function buildReportHtml(naam: string, a: ScanAnalysis): string {
  const p = a.companyProfile;
  const profielRegels = [
    ['Sector', p.sector],
    ['Activiteiten', p.activiteiten],
    ['Omvang', p.omvang],
    ['Doelgroep', p.doelgroep],
    ['Locatie', p.locatie],
  ].filter(([, v]) => v) as [string, string][];

  const blok = (inner: string) =>
    `<div style="margin:0 0 28px 0">${inner}</div>`;
  const kop = (t: string) =>
    `<div style="font:600 12px/1.4 -apple-system,Segoe UI,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:#7d5e24;margin:0 0 10px 0">${esc(t)}</div>`;

  const parts: string[] = [];

  parts.push(
    blok(
      `<div style="font:600 12px/1.4 -apple-system,Segoe UI,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:#8a8070">Uitgebreid AI-rapport</div>` +
        `<h1 style="font:400 30px/1.2 Georgia,'Times New Roman',serif;color:#2a2420;margin:8px 0 0 0">${esc(naam)}</h1>` +
        `<div style="margin-top:14px;font:400 15px/1 -apple-system,Segoe UI,Arial,sans-serif;color:#2a2420"><span style="font:400 40px/1 Georgia,serif;color:#7d5e24">${a.score}</span><span style="color:#8a8070">/100</span> &nbsp; ${esc(LABEL_TEXT[a.label])}</div>`,
    ),
  );

  parts.push(
    blok(
      `<p style="font:400 15px/1.7 -apple-system,Segoe UI,Arial,sans-serif;color:#5c5248;margin:0">${esc(a.samenvatting)}</p>` +
        (a.websiteAnalyse
          ? `<p style="font:400 14px/1.7 -apple-system,Segoe UI,Arial,sans-serif;color:#8a8070;margin:10px 0 0 0">${esc(a.websiteAnalyse)}</p>`
          : ''),
    ),
  );

  if (profielRegels.length) {
    const rows = profielRegels
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;font:600 11px/1.5 -apple-system,Segoe UI,Arial,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#8a8070;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:4px 0;font:400 14px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#2a2420">${esc(v)}</td></tr>`,
      )
      .join('');
    parts.push(blok(kop('Wat we zagen') + `<table style="border-collapse:collapse">${rows}</table>`));
  }

  if (a.brancheKansen) {
    parts.push(
      blok(
        kop('Wat er in uw branche gebeurt') +
          `<p style="font:400 15px/1.7 -apple-system,Segoe UI,Arial,sans-serif;color:#5c5248;margin:0">${esc(a.brancheKansen)}</p>`,
      ),
    );
  }

  if (a.aiOpportunities.length) {
    const items = a.aiOpportunities
      .map(
        (k) =>
          `<li style="font:400 14px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#2a2420;margin:0 0 6px 0">${esc(k)}</li>`,
      )
      .join('');
    parts.push(blok(kop('Snel te automatiseren') + `<ul style="margin:0;padding-left:18px">${items}</ul>`));
  }

  if (a.advancedSolutions.length) {
    const cards = a.advancedSolutions
      .map(
        (s) =>
          `<div style="border:1px solid #ddd1b8;border-radius:3px;padding:16px;margin:0 0 12px 0;background:#f7ecd6">` +
          `<div style="font:600 10px/1.4 -apple-system,Segoe UI,Arial,sans-serif;letter-spacing:0.12em;text-transform:uppercase;color:#7d5e24">${esc(s.categorie)}</div>` +
          `<div style="font:400 18px/1.3 Georgia,serif;color:#2a2420;margin:6px 0 0 0">${esc(s.titel)}</div>` +
          `<p style="font:400 14px/1.65 -apple-system,Segoe UI,Arial,sans-serif;color:#5c5248;margin:8px 0 0 0">${esc(s.beschrijving)}</p>` +
          (s.voorbeeld
            ? `<p style="font:italic 13px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#8a8070;margin:8px 0 0 0;border-left:2px solid #a8803a;padding-left:10px">${esc(s.voorbeeld)}</p>`
            : '') +
          `<div style="font:400 11px/1.5 -apple-system,Segoe UI,Arial,sans-serif;color:#8a8070;margin:10px 0 0 0">Complexiteit: ${esc(s.complexiteit)} · Impact: ${esc(s.impact)}${s.dataBronnen.length ? ` · ${esc(s.dataBronnen.join(' · '))}` : ''}</div>` +
          `</div>`,
      )
      .join('');
    parts.push(blok(kop('Een stap verder: geavanceerde agents') + cards));
  }

  const stappen = STAPPENPLAN.map(
    (s) =>
      `<div style="margin:0 0 12px 0"><div style="font:400 15px/1.3 Georgia,serif;color:#2a2420">${esc(s.kop)}</div><p style="font:400 14px/1.65 -apple-system,Segoe UI,Arial,sans-serif;color:#5c5248;margin:4px 0 0 0">${esc(s.body)}</p></div>`,
  ).join('');
  parts.push(blok(kop('Zo pakken we het aan') + stappen));

  parts.push(
    `<div style="border-top:1px solid #ddd1b8;padding-top:20px;margin-top:8px">` +
      `<p style="font:400 13px/1.7 -apple-system,Segoe UI,Arial,sans-serif;color:#8a8070;margin:0">Dit rapport is een automatische analyse op basis van openbare website-informatie: een eerste beeld, geen offerte. In een gesprek van 30 minuten maken we het concreet en rekenen we het met u door.</p>` +
      `<a href="${SITE_URL}/plan" style="display:inline-block;margin-top:14px;background:#a15842;color:#f4ede0;text-decoration:none;font:400 14px/1 -apple-system,Segoe UI,Arial,sans-serif;padding:12px 20px;border-radius:2px">Plan een gesprek →</a>` +
      `</div>`,
  );

  return (
    `<div style="max-width:640px;margin:0 auto;padding:32px 24px;background:#f4ede0">` +
    parts.join('') +
    `<div style="margin-top:28px;font:400 11px/1.5 -apple-system,Segoe UI,Arial,sans-serif;color:#8a8070">FactumAI · AI-agents voor MKB · <a href="${SITE_URL}" style="color:#7d5e24;text-decoration:none">factumai.nl</a></div>` +
    `</div>`
  );
}
