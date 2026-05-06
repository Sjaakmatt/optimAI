export interface Resource {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  pages: number;
  audience: string;
  hoofdstukken: string[];
  voorbeelden: string[];
  cta: string;
}

export const RESOURCES: Resource[] = [
  {
    slug: 'ai-implementatie-stappenplan',
    title: 'AI-implementatie stappenplan voor het Nederlandse MKB',
    shortTitle: 'AI-implementatie stappenplan',
    description:
      'Praktisch werkboek dat u stap voor stap door een AI-implementatie leidt — van eerste proceskeuze tot live agent. Bedoeld voor MKB-ondernemers die AI willen invoeren zonder eindeloos pilot-traject.',
    metaDescription:
      'Download het AI-implementatie stappenplan: praktisch werkboek voor MKB-bedrijven die hun eerste AI-agent willen invoeren. Vijf fasen, checklists, valkuilen, beleidsregel-templates.',
    pages: 28,
    audience: 'MKB-ondernemers en directeuren operations / IT / finance.',
    hoofdstukken: [
      'Welk proces is geschikt? Drie filters om mee te beginnen',
      'Procesinventarisatie — checklist en interviewleidraad',
      'Beleidsregels formuleren — templates per type agent',
      'Integratie-keuzes — API, webhook of e-mail-bridge',
      'Stille modus — wat te controleren in week 1 en 2',
      'Live met logboek en escalatie — wat te monitoren',
      'Onderhoud en doorontwikkeling — maandritueel',
      'Valkuilen die we steeds terugzien (en hoe ze te vermijden)',
    ],
    voorbeelden: [
      'Beleidsregel-templates voor 6 type-agents',
      'Checklist procesinventarisatie',
      'Interviewleidraad voor binnendienst',
      'Sjabloon escalatiematrix',
    ],
    cta: 'Download de gids',
  },
  {
    slug: 'guardrails-werkboek',
    title: 'Guardrails-werkboek voor AI-agents',
    shortTitle: 'Guardrails-werkboek',
    description:
      'Concreet werkboek dat helpt bij het opstellen van expliciete beleidsregels voor uw AI-agent. Van mandaatbedragen tot klantgroep-uitzonderingen — invulvelden en voorbeelden uit de praktijk.',
    metaDescription:
      'Download het Guardrails-werkboek: leg expliciet vast wat uw AI-agent automatisch mag en wat niet. Templates, voorbeelden en valkuilen uit de FactumAI-praktijk.',
    pages: 18,
    audience: 'Operationeel verantwoordelijken die het AI-beleid moeten formuleren.',
    hoofdstukken: [
      'Wat zijn guardrails en waarom werken ze',
      'Mandaatbedragen vastleggen',
      'Klantgroep-beleid (overheid, trouwe klanten, debiteuren)',
      'Communicatie-toon per kanaal',
      'Escalatie-paden en uitzonderingen',
      'Onderhoud — wanneer beleid bijstellen',
    ],
    voorbeelden: [
      'Templates voor 5 standaard-mandaten',
      'Voorbeeld-toonregels per kanaal',
      'Escalatiematrix voor 3 branches',
    ],
    cta: 'Download het werkboek',
  },
];

export const RESOURCE_BY_SLUG = RESOURCES.reduce<Record<string, Resource>>((acc, r) => {
  acc[r.slug] = r;
  return acc;
}, {});
