// AI-analyse voor de publieke scan. Zelfde aanpak als de AI-verrijking in het
// FactumAI-dashboard (ai-enrichment.ts): het model classificeert de al
// opgehaalde website-content en levert naast simpele automatiseringskansen
// ("aiOpportunities") ook complexere agent-voorstellen ("advancedSolutions").
//
// Verschillen met de dashboard-variant, omdat dit een publieke tool is:
// - géén contactgegevens/beslissers verzamelen (AVG);
// - géén server-side web-search (kosten + snelheid);
// - publieksvriendelijke labels (hoog/gemiddeld/beperkt i.p.v. HOT/WARM/COLD);
// - extra veld `brancheKansen`: wat er in de branche met AI gebeurt.

import Anthropic from '@anthropic-ai/sdk';
import type { ScanScrape } from './scraper';
import {
  labelFromScore,
  type AdvancedSolution,
  type Complexiteit,
  type Impact,
  type ScanAnalysis,
} from './types';

export const DEFAULT_SCAN_MODEL = 'claude-sonnet-5';

const SYSTEM_PROMPT = `Je bent een senior AI-consultant van FactumAI, een Nederlands bureau dat AI-agents en procesautomatisering bouwt voor het MKB. FactumAI bouwt agents die terugkerend werk overnemen: sales-opvolging, klantenservice, offerte- en facturatieprocessen, planning, order- en voorraadbeheer, HR- en finance-administratie.

Een ondernemer heeft zojuist zijn/haar eigen bedrijfswebsite ingevuld op factumai.nl om te zien wat AI-agents voor het bedrijf kunnen betekenen. Jouw taak: analyseer het bedrijf op basis van de meegegeven website-content en lever een eerlijk, concreet en enthousiasmerend beeld van de mogelijkheden.

WERKWIJZE:
- De WEBSITE-CONTENT hieronder is je enige bron. Die is al voor je opgehaald (homepage + relevante pagina's). Lees die grondig: diensten, doelgroep, omvang, processen.
- Verzin GEEN feiten die je niet in de content terugvindt. Onzeker → voorzichtiger formuleren.
- De lezer is het bedrijf ZELF. Schrijf dus in de u-vorm, direct aan het bedrijf gericht ("uw offerteproces", "uw klanten"). Toon: nuchter-Nederlands, concreet, geen buzzword-bingo.
- Verzamel GEEN persoonsgegevens: geen namen, e-mailadressen of telefoonnummers in je antwoord.

SCORE (0-100, "AI-potentieel"):
Weeg vooral het zichtbare volume aan terugkerend, automatiseerbaar werk: offerte- en ordertrajecten, planning/roostering, klantcontact, facturatie, intake/aanvragen, voorraad, administratie. Hoe meer herhaalbaar werk agents kunnen overnemen, hoe hoger.
- 70-100: duidelijk veel herhaalbare processen — AI-agents kunnen hier direct waarde leveren.
- 40-69: concrete kansen zichtbaar, maar beperkter volume of nog onduidelijke processen.
- 0-39: weinig zichtbaar automatiseerbaar volume of te weinig informatie op de website.
Wees eerlijk maar constructief: ook bij een lagere score benoem je wat wél kan.

BRANCHEKANSEN ("brancheKansen"):
2-4 zinnen over wat er in déze branche speelt met AI en agents: welke processen worden bij vergelijkbare bedrijven al geautomatiseerd, waar loopt de branche tegenaan. Baseer de branche op wat je op de website ziet; generiek als de branche onduidelijk is.

SIMPELE KANSEN ("aiOpportunities"):
4-6 voor de hand liggende standaard-automatiseringen voor dít bedrijf (orderverwerking, offertes, facturatie, planning, basis-klantcontact, intake). Eén zin per kans, concreet en herkenbaar.

GEAVANCEERDE VOORSTELLEN ("advancedSolutions"):
3-5 complexere, creatievere AI-agent-oplossingen die specifiek bij dit bedrijf passen en de standaardprocessen overstijgen. Kies wat past uit: voorspellend (vraag/uitval/no-show/churn), kennis- & RAG-agents (interne kennisbank, offerte-/contract-assistent), klant- & marktintelligentie (leadscoring, concurrentie-/prijsmonitoring), autonome monitoring & research (tenders, nieuws, regelgeving, leveranciers), multi-agent workflows (afdelingen/systemen verbinden met menselijke goedkeuring op kantelpunten), optimalisatie (dynamische prijsstelling, route-/capaciteit, supply chain) en compliance & risk. Herhaal de simpele kansen NIET. Maak elk voorstel concreet en toegespitst.

Geef je EINDANTWOORD uitsluitend als één JSON-object (geen markdown, geen tekst eromheen) met exact deze structuur:
{
  "score": <geheel getal 0-100>,
  "samenvatting": "<2-3 zinnen: het beeld in één alinea, direct aan het bedrijf gericht>",
  "companyProfile": {
    "sector": <string|null>,
    "activiteiten": <string|null>,
    "omvang": <string|null>,
    "doelgroep": <string|null>,
    "locatie": <string|null>
  },
  "websiteAnalyse": <string|null — 2-4 zinnen: wat doet dit bedrijf en welke processen zie je>,
  "brancheKansen": <string|null>,
  "aiOpportunities": ["<concrete standaard-automatiseringskans>", ...],
  "advancedSolutions": [
    {
      "titel": "<korte naam>",
      "categorie": "<Voorspellend | Kennis & RAG | Klantintelligentie | Autonome monitoring | Multi-agent | Optimalisatie | Compliance & risk>",
      "beschrijving": "<2-4 zinnen, concreet en toegespitst op dit bedrijf>",
      "complexiteit": "<gemiddeld | hoog | zeer hoog>",
      "impact": "<laag | middel | hoog>",
      "dataBronnen": ["<benodigde data/systeem>", ...],
      "voorbeeld": "<één concreet scenario bij dit bedrijf|null>"
    }
  ]
}`;

function buildUserTurn(bedrijfsnaam: string, scrape: ScanScrape): string {
  const facts = [`Bedrijfsnaam: ${bedrijfsnaam || 'onbekend'}`, `Website: ${scrape.url}`];
  const sections = [`BEDRIJFSGEGEVENS\n${facts.join('\n')}`];
  if (scrape.status === 'ok' && scrape.markdown) {
    const header = [`Bron-URL: ${scrape.url}`];
    if (scrape.title) header.push(`Titel: ${scrape.title}`);
    sections.push(`WEBSITE-CONTENT\n${header.join('\n')}\n\n---\n\n${scrape.markdown}`);
  } else {
    sections.push(
      'WEBSITE-CONTENT\n(niet beschikbaar — de website leverde geen leesbare content op. ' +
        'Baseer je op de bedrijfsnaam en wees expliciet terughoudend: lage zekerheid, generiekere kansen.)',
    );
  }
  return `Analyseer dit bedrijf op AI-agent-mogelijkheden.\n\n${sections.join('\n\n')}`;
}

/** Tolerante JSON-extractie: strip code-fences, pak het buitenste object. */
function extractJson(text: string): unknown {
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Geen JSON-object gevonden in modeluitvoer');
  }
  return JSON.parse(t.slice(start, end + 1));
}

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null;
}

const COMPLEX: Complexiteit[] = ['gemiddeld', 'hoog', 'zeer hoog'];
const IMPACT: Impact[] = ['laag', 'middel', 'hoog'];

function oneOf<T extends string>(v: unknown, allowed: T[], fallback: T): T {
  return typeof v === 'string' && (allowed as string[]).includes(v) ? (v as T) : fallback;
}

function normalizeAdvanced(raw: unknown): AdvancedSolution[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 6)
    .map((s) => {
      const c = (s ?? {}) as Record<string, unknown>;
      return {
        titel: asString(c.titel) ?? 'Naamloos voorstel',
        categorie: asString(c.categorie) ?? 'Overig',
        beschrijving: asString(c.beschrijving) ?? '',
        complexiteit: oneOf(c.complexiteit, COMPLEX, 'hoog'),
        impact: oneOf(c.impact, IMPACT, 'middel'),
        dataBronnen: Array.isArray(c.dataBronnen)
          ? (c.dataBronnen.filter((x) => typeof x === 'string') as string[]).slice(0, 6)
          : [],
        voorbeeld: asString(c.voorbeeld),
      };
    })
    .filter((s) => s.beschrijving.length > 0);
}

function normalize(raw: unknown): ScanAnalysis {
  const o = (raw ?? {}) as Record<string, unknown>;
  const rawScore = Number(o.score);
  const score = Number.isFinite(rawScore) ? Math.max(0, Math.min(100, Math.round(rawScore))) : 0;
  const profile = (o.companyProfile ?? {}) as Record<string, unknown>;
  return {
    score,
    label: labelFromScore(score),
    samenvatting: asString(o.samenvatting) ?? 'Geen samenvatting beschikbaar.',
    companyProfile: {
      sector: asString(profile.sector),
      activiteiten: asString(profile.activiteiten),
      omvang: asString(profile.omvang),
      doelgroep: asString(profile.doelgroep),
      locatie: asString(profile.locatie),
    },
    websiteAnalyse: asString(o.websiteAnalyse),
    brancheKansen: asString(o.brancheKansen),
    aiOpportunities: Array.isArray(o.aiOpportunities)
      ? (o.aiOpportunities.filter((x) => typeof x === 'string') as string[]).slice(0, 8)
      : [],
    advancedSolutions: normalizeAdvanced(o.advancedSolutions),
  };
}

export async function analyzeCompany(
  bedrijfsnaam: string,
  scrape: ScanScrape,
): Promise<ScanAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY ontbreekt in de omgeving');

  const client = new Anthropic({ apiKey });
  const model = process.env.SCAN_AI_MODEL ?? DEFAULT_SCAN_MODEL;

  const message = await client.messages.create({
    model,
    // Ruim genoeg voor de volledige JSON, ook met adaptieve thinking-tokens
    // (zie de vergelijkbare toelichting in het dashboard: een te krappe limiet
    // kapt de JSON af en breekt de parse).
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserTurn(bedrijfsnaam, scrape) }],
  });

  if (message.stop_reason === 'max_tokens') {
    throw new Error('De analyse werd afgekapt — probeer het opnieuw.');
  }
  const text = message.content
    .map((b) => (b.type === 'text' ? b.text : ''))
    .join('\n')
    .trim();
  if (!text) throw new Error('Geen tekstuele output van het model ontvangen');

  return normalize(extractJson(text));
}
