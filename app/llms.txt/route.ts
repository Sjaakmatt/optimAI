import { POSTS } from '@/lib/data/posts';
import { CASES } from '@/lib/data/cases';
import { BRANCHES } from '@/lib/data/branches';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push('# FactumAI');
  lines.push('');
  lines.push(
    '> FactumAI bouwt AI-agents op maat voor Nederlandse MKB-bedrijven. Een AI-agent is een digitale medewerker die zelf beslissingen neemt binnen door u bepaalde grenzen: mails lezen, offertes opstellen, orders verwerken, facturen klaarzetten, planning regelen. Vaste bouwprijs, eerste agent live in 1 tot 2 weken. Optionele maandelijkse retainer voor onderhoud, monitoring en model-updates — of alleen implementatie, u kiest zelf.',
  );
  lines.push('');
  lines.push(
    'FactumAI is gevestigd in Hoogkarspel (West-Friesland, Nederland) en is actief in heel Nederland. Oprichter: Sjaak ter Veld, bedrijfskundig geschoold, 8+ jaar ervaring in IT-optimalisatie en procesverbetering.',
  );
  lines.push('');

  lines.push('## Kern-pagina\'s');
  lines.push('');
  lines.push(`- [Homepage](${SITE_URL}/): AI-agents voor MKB — wat wij bouwen en voor wie.`);
  lines.push(
    `- [AI-agent laten bouwen](${SITE_URL}/diensten/ai-agent-laten-bouwen): Transactionele landing — proces, vaste prijs, voorbeelden, FAQ.`,
  );
  lines.push(
    `- [Wat is een AI-agent](${SITE_URL}/info): Uitleg van het begrip, vergelijking met chatbot en workflow-tool, FAQ.`,
  );
  lines.push(`- [Over FactumAI](${SITE_URL}/over): Oprichter Sjaak ter Veld en onze uitgangspunten.`);
  lines.push(`- [Cases](${SITE_URL}/cases): Voorbeelden van AI-agents bij MKB-bedrijven.`);
  lines.push(`- [Kennis](${SITE_URL}/kennis): Artikelen over AI-agents, guardrails, integraties, ROI.`);
  lines.push(`- [Demo](${SITE_URL}/demo): Interactieve demo van een multi-agent-platform.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Contactgegevens en contactformulier.`);
  lines.push('');

  lines.push('## Cases');
  lines.push('');
  for (const c of CASES) {
    lines.push(`- [${c.klant} — ${c.branche}](${SITE_URL}/cases/${c.slug}): ${c.tagline}`);
  }
  lines.push('');

  lines.push('## Branches');
  lines.push('');
  for (const b of BRANCHES) {
    lines.push(`- [AI-agent voor ${b.label}](${SITE_URL}/branches/${b.slug})`);
  }
  lines.push('');

  lines.push('## Kennisartikelen');
  lines.push('');
  const postsByDate = [...POSTS].sort((a, b) => (a.published < b.published ? 1 : -1));
  for (const p of postsByDate) {
    lines.push(`- [${p.title}](${SITE_URL}/kennis/${p.slug}): ${p.lede}`);
  }
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  lines.push('- E-mail: info@factumai.nl');
  lines.push('- Telefoon: +31 6 10 55 56 58');
  lines.push('- Locatie: Hoogkarspel, West-Friesland, Nederland');
  lines.push('- Werkgebied: heel Nederland');
  lines.push('');

  return lines.join('\n');
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
