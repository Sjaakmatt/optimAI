import type { Agent, AgentId } from '@/lib/types';

// De Werkbank van Vonk, een online woonwinkel. Eén klantenservice die over
// drie kanalen werkt (website-chat, e-mail, social) en die voor elk antwoord
// de interne systemen raadpleegt: het ERP/ordersysteem, de vervoerder voor
// track & trace, de PIM-productdatabase en de betaalprovider.
//
// De AgentId-namen zijn historisch (bouw-groothandel) maar hier hergebruikt
// voor de klantenservice-rollen. De id's blijven gelijk zodat de engine niet
// hoeft te wijzigen; alleen betekenis, naam en beleid veranderen.
export const AGENT_DEFINITIONS: Record<AgentId, Agent> = {
  orchestrator: {
    id: 'orchestrator',
    name: 'De Dirigent',
    role: 'Triage, leest chat, mail en social en routeert naar het juiste team',
    status: 'idle',
    color: '#d4a857',
    minutesSavedPerTask: 0,
    policies: [
      { id: 'orc-1', rule: 'Chat < 1 min · social < 30 min · e-mail < 2 uur reageren', enabled: true },
      { id: 'orc-2', rule: 'Bij dreiging of juridische toon binnen 5 min een mens erbij', enabled: true },
      { id: 'orc-3', rule: 'Kanalen parallel afhandelen wanneer ze los van elkaar staan', enabled: true },
      { id: 'orc-4', rule: 'Bij twijfel over de toon: kiezen voor coulance', enabled: true },
    ],
  },
  orders: {
    id: 'orders',
    name: 'Website-chat',
    role: 'Live chat op vonk.nl, WISMO, adreswijziging, snelle vragen',
    status: 'idle',
    color: '#a87cc4',
    minutesSavedPerTask: 14,
    policies: [
      { id: 'ord-1', rule: 'Eerste reactie in de chat binnen 60 seconden', enabled: true },
      { id: 'ord-2', rule: 'Identiteit verifiëren met ordernummer + postcode voor wijzigingen', enabled: true },
      { id: 'ord-3', rule: 'Adreswijziging alleen vóór verzending, anders via de vervoerder', enabled: true },
      { id: 'ord-4', rule: 'Onbekende of complexe vraag doorzetten naar een mens', enabled: false },
    ],
  },
  klantservice: {
    id: 'klantservice',
    name: 'E-mail',
    role: 'Klantenservice-inbox, retouren, klachten en vragen',
    status: 'idle',
    color: '#e0a24f',
    minutesSavedPerTask: 16,
    policies: [
      { id: 'kls-1', rule: 'Ontvangstbevestiging binnen 15 min', enabled: true },
      { id: 'kls-2', rule: 'Klanten >5 orders, 0 klachten: coulance zonder discussie', enabled: true },
      { id: 'kls-3', rule: 'Toon afstemmen op de klant-historiek', enabled: true },
      { id: 'kls-4', rule: 'Pro-actief informeren bij vertraging', enabled: true },
    ],
  },
  verzending: {
    id: 'verzending',
    name: 'Social',
    role: 'Instagram, Facebook en TikTok, reacties en DM’s, publieke toon',
    status: 'idle',
    color: '#5a9bd4',
    minutesSavedPerTask: 18,
    policies: [
      { id: 'ver-1', rule: 'Publieke klacht binnen 30 min beantwoorden, daarna naar DM', enabled: true },
      { id: 'ver-2', rule: 'Nooit klant- of ordergegevens in een openbare reactie', enabled: true },
      { id: 'ver-3', rule: 'Negatieve toon niet spiegelen: rustig en menselijk blijven', enabled: true },
    ],
  },
  voorraad: {
    id: 'voorraad',
    name: 'Bestellingen',
    role: 'Zoekt orders op in het ERP en track & trace bij de vervoerder',
    status: 'idle',
    color: '#b6a26a',
    minutesSavedPerTask: 12,
    policies: [
      { id: 'vor-1', rule: 'Orderstatus altijd uit ERP + vervoerder-API halen, niet gokken', enabled: true },
      { id: 'vor-2', rule: 'Bij vertraging bij de vervoerder direct een nieuwe ETA ophalen', enabled: true },
      { id: 'vor-3', rule: 'Eerste bestelling van een nieuwe klant: kredietcheck', enabled: true },
    ],
  },
  facturatie: {
    id: 'facturatie',
    name: 'Retouren',
    role: 'Retouren, creditering en terugbetaling via de betaalprovider',
    status: 'idle',
    color: '#c4634a',
    minutesSavedPerTask: 13,
    policies: [
      { id: 'fac-1', rule: 'Terugbetaling tot € 150 zonder goedkeuring', enabled: true },
      { id: 'fac-2', rule: 'Retour binnen 30 dagen: altijd akkoord', enabled: true },
      { id: 'fac-3', rule: 'Terugbetalen via de oorspronkelijke betaalmethode', enabled: true },
      { id: 'fac-4', rule: 'Bij dubbele afschrijving direct terugstorten', enabled: true },
    ],
  },
  inkoop: {
    id: 'inkoop',
    name: 'Kennisbank',
    role: 'Productinformatie (PIM), maatvoering, materiaal en voorraad-ETA',
    status: 'idle',
    color: '#9cb380',
    minutesSavedPerTask: 11,
    policies: [
      { id: 'ink-1', rule: 'Productadvies altijd uit de PIM, nooit gokwerk', enabled: true },
      { id: 'ink-2', rule: 'Bij uitverkocht: verwachte binnenkomst uit het inkoopsysteem geven', enabled: true },
      { id: 'ink-3', rule: 'Alternatief voorstellen als een artikel uit het assortiment is', enabled: true },
    ],
  },
  sales: {
    id: 'sales',
    name: 'Reviews',
    role: 'Reviews en NPS, herstelaanbod en opvolging',
    status: 'idle',
    color: '#7fb685',
    minutesSavedPerTask: 20,
    policies: [
      { id: 'sal-1', rule: 'Reactie op een review binnen 24 uur', enabled: true },
      { id: 'sal-2', rule: 'Bij 1–2 sterren: persoonlijk contact + herstelaanbod', enabled: true },
      { id: 'sal-3', rule: 'Tevreden klant uitnodigen om een review te plaatsen', enabled: true },
      { id: 'sal-4', rule: 'Follow-up na 5 dagen bij een openstaande belofte', enabled: false },
    ],
  },
};

// Volgorde: de drie frontlinie-kanalen eerst, daarna de backoffice-teams die
// de systemen raadplegen.
export const AGENT_ORDER: AgentId[] = [
  'orders',
  'klantservice',
  'verzending',
  'voorraad',
  'facturatie',
  'inkoop',
  'sales',
];

export const ALL_AGENTS: AgentId[] = ['orchestrator', ...AGENT_ORDER];
