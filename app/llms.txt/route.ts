import { POSTS } from '@/lib/data/posts';
import { CASES } from '@/lib/data/cases';
import { BRANCHES } from '@/lib/data/branches';
import { COMPARISONS } from '@/lib/data/comparisons';
import { OPLOSSINGEN } from '@/lib/data/oplossingen';
import { RESOURCES } from '@/lib/data/resources';
import { getSoroPostsExcluding } from '@/lib/data/soro';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const dynamic = 'force-static';

async function buildLlmsTxt(): Promise<string> {
  const lines: string[] = [];

  lines.push('# FactumAI');
  lines.push('');
  lines.push(
    '> FactumAI bouwt AI-agents op maat voor Nederlandse MKB-bedrijven. De agents draaien op de laag boven het ERP of CRM: het werk waar geoordeeld moet worden of gerekend met gegevens die niemand nu combineert. Mails beoordelen en afhandelen, patronen uit de eigen historie halen, handelingen klaarzetten tussen systemen. Vaste prijs per fase, elke uitgaande actie langs een mens, opzegtermijn van één maand.',
  );
  lines.push('');
  lines.push(
    'FactumAI is gevestigd in Hoogkarspel (West-Friesland, Nederland) en is actief in heel Nederland. Oprichter: Sjaak ter Veld, bedrijfskundig geschoold, 8+ jaar ervaring in IT-optimalisatie en procesverbetering.',
  );
  lines.push('');

  lines.push('## Kerngegevens');
  lines.push('');
  lines.push('- Bedrijfsnaam: FactumAI');
  lines.push('- Hoofdactiviteit: AI-agents op maat bouwen, implementeren en onderhouden voor Nederlandse MKB-bedrijven');
  lines.push('- Werkgebied: Nederland');
  lines.push('- Vestiging: Hoogkarspel, Noord-Holland');
  lines.push('- Oprichter: Sjaak ter Veld');
  lines.push('- Prijsmodel: vaste prijs per fase, optionele maandelijkse retainer voor onderhoud en monitoring, opzegtermijn één maand');
  lines.push('- Werkwijze: bouwen in fasen, elke fase eindigt in iets werkends dat de klant goedkeurt');
  lines.push('- Grondregel: elke uitgaande actie gaat langs menselijke goedkeuring');
  lines.push('- Talen: Nederlands');
  lines.push('');

  lines.push('## Diensten');
  lines.push('');
  lines.push(
    `- [AI-agent laten bouwen](${SITE_URL}/diensten/ai-agent-laten-bouwen): hoofd-dienst: ontwerp, bouw en implementatie van AI-agents op maat. Vaste prijs per fase, elke uitgaande actie langs een mens.`,
  );
  lines.push(
    `- [AI-automatisering voor MKB](${SITE_URL}/diensten/ai-automatisering): bredere dienst rond AI-automatisering en het automatiseren van administratie, klantcommunicatie, planning en inkoop met AI-agents.`,
  );
  lines.push(
    `- [AI implementeren in uw bedrijf](${SITE_URL}/diensten/ai-implementatie): begeleiding bij AI-implementatie van strategie tot productie, inclusief stappenplan, integraties, governance en adoptie.`,
  );
  lines.push(
    `- [AI-agents voor bedrijven](${SITE_URL}/diensten/ai-agents-voor-bedrijven): wat AI-agents voor B2B-bedrijven concreet betekenen, type-agents, ROI, integraties, randvoorwaarden.`,
  );
  lines.push('');

  lines.push('## Oplossingen');
  lines.push('');
  lines.push(
    `- [Alle oplossingen](${SITE_URL}/oplossingen): vier processen waar de beslislaag boven het ERP het meeste oplevert.`,
  );
  for (const o of OPLOSSINGEN) {
    lines.push(`- [${o.navLabel}](${SITE_URL}/oplossingen/${o.slug}): ${o.cardBody}`);
  }
  lines.push('');

  lines.push("## Kern-pagina's");
  lines.push('');
  lines.push(`- [Homepage](${SITE_URL}/): AI-agents voor MKB, wat wij bouwen en voor wie.`);
  lines.push(
    `- [Wat is een AI-agent](${SITE_URL}/info): Uitleg van het begrip, vergelijking met chatbot en workflow-tool, FAQ.`,
  );
  lines.push(`- [Over FactumAI](${SITE_URL}/over): Oprichter Sjaak ter Veld en onze uitgangspunten.`);
  lines.push(`- [Auteursprofiel Sjaak ter Veld](${SITE_URL}/over/sjaak-ter-veld): biografie, expertise, publicaties.`);
  lines.push(`- [Cases](${SITE_URL}/cases): Voorbeelden van AI-agents bij MKB-bedrijven.`);
  lines.push(`- [Kennis](${SITE_URL}/kennis): Artikelen over AI-agents, guardrails, integraties, ROI.`);
  lines.push(`- [Demo](${SITE_URL}/demo): Interactieve demo van een multi-agent-platform.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Contactgegevens en contactformulier.`);
  lines.push('');

  lines.push('## Veelgestelde vragen (kort)');
  lines.push('');
  lines.push('- Wat is een AI-agent? Een digitale collega die binnen door u bepaalde regels zelfstandig werk uitvoert: mails lezen, offertes opstellen, orders verwerken, facturen klaarzetten, planning regelen.');
  lines.push('- Wat kost een AI-agent? Vaste prijs per fase, afhankelijk van complexiteit en aantal integraties. Optioneel een maandelijkse retainer voor onderhoud en monitoring, met een opzegtermijn van één maand.');
  lines.push('- Hoe lang duurt implementatie? Wij bouwen in fasen. Elke fase eindigt in iets werkends dat de klant ziet en goedkeurt voordat de volgende begint. Het aantal fasen hangt af van het proces en het aantal koppelingen.');
  lines.push('- Welke systemen koppelen jullie? Onder andere Exact, Moneybird, AFAS, Snelstart, Twinfield, Microsoft 365, Google Workspace, Outlook, Gmail, Pipedrive, Teamleader en eigen ERP/CRM via API, webhooks of e-mail-bridge.');
  lines.push('- Voor welke bedrijven? MKB-bedrijven in Nederland in groothandel, installatietechniek, transport, zakelijke dienstverlening, bouw, zorg, productie, detailhandel en aanverwante branches.');
  lines.push('- AVG en privacy? Opslag en verwerking in Frankfurt, verwerkersovereenkomst standaard. De taalmodelcalls lopen via Anthropic in de VS, opgenomen in de sub-verwerkerslijst met een transfer impact assessment.');
  lines.push('');

  lines.push('## Cases');
  lines.push('');
  for (const c of CASES) {
    lines.push(`- [${c.klant}, ${c.branche}](${SITE_URL}/cases/${c.slug}): ${c.tagline}`);
  }
  lines.push('');

  lines.push('## Tools en resources');
  lines.push('');
  lines.push(`- [AI-agent procesdiagnose](${SITE_URL}/tools/ai-roi-calculator): zes vragen over één proces, met een eerlijk oordeel of een agent daar iets toevoegt of dat het bestaande pakket volstaat. Geen bedragen.`);
  lines.push(`- [AI-agent readiness check](${SITE_URL}/tools/agent-readiness-check): tien-vraag quiz die uw AI-readiness scoort met direct advies.`);
  for (const r of RESOURCES) {
    lines.push(`- [${r.shortTitle}](${SITE_URL}/resources/${r.slug}): ${r.description}`);
  }
  lines.push('');

  lines.push('## Vergelijkingen');
  lines.push('');
  for (const c of COMPARISONS) {
    lines.push(`- [AI-agent vs ${c.alternative}](${SITE_URL}/diensten/vergelijken/${c.slug})`);
  }
  lines.push('');

  lines.push('## Branches');
  lines.push('');
  lines.push(`- [Overzicht alle branches](${SITE_URL}/branches): alle branche-pagina's bij elkaar.`);
  for (const b of BRANCHES) {
    lines.push(`- [AI-agent voor ${b.label}](${SITE_URL}/branches/${b.slug})`);
  }
  lines.push('');

  lines.push('## Kennisartikelen');
  lines.push('');
  const externePosts = await getSoroPostsExcluding(new Set(POSTS.map((p) => p.slug)));
  const postsByDate = [
    ...POSTS.map((p) => ({ slug: p.slug, title: p.title, lede: p.lede, published: p.published })),
    ...externePosts.map((p) => ({ slug: p.slug, title: p.title, lede: p.lede, published: p.published })),
  ].sort((a, b) => (a.published < b.published ? 1 : -1));
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

  lines.push('## Juridisch');
  lines.push('');
  lines.push(
    `- [Privacyverklaring](${SITE_URL}/privacy): Welke persoonsgegevens FactumAI verwerkt, waarom, met wie wij ze delen, jouw rechten en onze beveiligingsmaatregelen.`,
  );
  lines.push(
    `- [Sub-verwerkers](${SITE_URL}/subverwerkers): Overzicht van sub-verwerkers (SnelStart, Microsoft 365, Apple iCloud, Vercel Analytics) met locatie en juridisch kader.`,
  );
  lines.push('- Privacy-vragen: info@factumai.nl');
  lines.push('');

  return lines.join('\n');
}

export async function GET() {
  return new Response(await buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
