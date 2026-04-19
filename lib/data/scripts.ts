import type { Script } from '@/lib/types';

export const SCRIPTS: Record<string, Script> = {
  // =========================================================
  // SCENARIO 1: Nieuwe order Bouwbedrijf Jansma
  // =========================================================
  script_order_new: {
    id: 'script_order_new',
    steps: [
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Binnengekomen order van Jansma BV, €4.280, drie regels, levering in 3 werkdagen. Geen spoedindicatie. Bekende klant sinds 2021 — kredietstatus groen. Ik zet Orders en Voorraad parallel in, daarna Verzending en Klantservice.',
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'orders',
        kind: 'delegate',
        text: 'Order ORD-2026-0431 verwerken. Bevestiging naar klant. Coördineer met Voorraad.',
      },
      {
        delayBefore: 200,
        parallel: true,
        from: 'orchestrator',
        to: 'voorraad',
        kind: 'delegate',
        text: 'Beschikbaarheid checken voor 3 artikelen. Meld tekort direct terug.',
      },
      {
        delayBefore: 900,
        from: 'voorraad',
        to: 'orchestrator',
        kind: 'report',
        text: 'Gipsplaten: 120 op locatie A-12, ruim voldoende. Metal stud: 340 op B-04, OK. Isolatiewol 100mm: slechts 18 rollen op C-02 — order vraagt 25. Tekort van 7 rollen.',
        minutesSaved: 8,
      },
      {
        delayBefore: 700,
        from: 'orders',
        to: 'orchestrator',
        kind: 'report',
        text: 'Order aangemaakt in systeem. Kredietcheck OK. Wacht op voorraadbevestiging voordat picking-instructie uitgaat.',
        minutesSaved: 12,
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'inkoop',
        kind: 'delegate',
        text: 'Spoedaanvulling Isolatiewol 100mm — 40 rollen bij Rockwool Benelux. Levering gewenst binnen 2 werkdagen.',
      },
      {
        delayBefore: 1100,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'report',
        text: 'Rockwool heeft rechtstreekse levering in 1 werkdag beschikbaar à €57,80/rol. Bestelling INK-2026-0132 klaargezet. Levert exact op tijd voor Jansma-order. Marge binnen normen.',
        minutesSaved: 15,
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'verzending',
        kind: 'delegate',
        text: 'Plan levering Enkhuizen over 3 werkdagen. Combineer met andere ritten regio West-Friesland indien mogelijk.',
      },
      {
        delayBefore: 950,
        from: 'verzending',
        to: 'orchestrator',
        kind: 'report',
        text: 'Rit-combinatie gevonden: dinsdag ochtend met ORD-2026-0428 (Hoorn) en ORD-2026-0429 (Medemblik). Eigen bakwagen 12-ton, chauffeur Van der Meer. Planning bevestigd 09:30–11:00 Enkhuizen.',
        minutesSaved: 10,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Bevestigingsmail naar Jansma. Vermeld levermoment en dat isolatiewol extern is bijbesteld (transparant).',
      },
      {
        delayBefore: 1000,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Mail verstuurd naar inkoop@jansma-bouw.nl. Opgenomen: ordernummer, drie regels, levermoment dinsdag 09:30, opmerking dat Rockwool rechtstreeks aanvult voor tijdige levering. Vriendelijke maar strakke toon, zoals bij deze klant gebruikelijk.',
        minutesSaved: 9,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Keten compleet. 5 agents betrokken, totaal 54 minuten menselijk werk bespaard. Geen handmatige tussenkomst nodig. Status: afgehandeld.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 2: Offerteaanvraag Gemeente Hoorn
  // =========================================================
  script_inquiry: {
    id: 'script_inquiry',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Offerteaanvraag gemeente Hoorn voor renovatie Westfries Lyceum fase 2, indicatie €28.000. Aanbesteding, 48u deadline. Dit is overheids-inkoop — Sales neemt de lead, Inkoop checkt marges, Facturatie borgt betaalvoorwaarden.',
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'sales',
        kind: 'delegate',
        text: 'Offerte opstellen binnen 24u. Afstemming met Inkoop over materiaalmarges. Rekening houden met aanbestedingseisen.',
      },
      {
        delayBefore: 1200,
        from: 'sales',
        to: 'orchestrator',
        kind: 'reasoning',
        text: 'Bestek doorgelezen. Vraagt om 340 m² gipsplaten brandwerend EI 60, 180 m² isolatie, metal stud frame-werk. Gelijksoortig project Purmerend afgelopen jaar — daar 12% marge, gewonnen op prijs en levertijd.',
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'inkoop',
        kind: 'delegate',
        text: 'Actuele inkoopprijzen brandwerende gipsplaten en isolatie. Marge-advies voor aanbesteding Gemeente Hoorn.',
      },
      {
        delayBefore: 1100,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'report',
        text: 'Saint-Gobain heeft nieuwe prijslijst per 1 april — brandwerende platen 3,2% goedkoper dan vorig kwartaal. Rockwool stabiel. Bij 12% marge landen we op €26.850, onder indicatie. Aanbevolen: 13% marge voor buffer, eindprijs €27.140.',
        minutesSaved: 25,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'facturatie',
        kind: 'delegate',
        text: 'Betaalvoorwaarden voor overheidsklant. Check Gemeente Hoorn historiek.',
      },
      {
        delayBefore: 900,
        from: 'facturatie',
        to: 'orchestrator',
        kind: 'report',
        text: 'Gemeente Hoorn: 3 projecten sinds 2022, betalingsgedrag gemiddeld 28 dagen (overheidsstandaard 30). Voorstel: standaard 30 dagen netto, geen aanbetaling, factuur na oplevering per fase.',
        minutesSaved: 8,
      },
      {
        delayBefore: 900,
        from: 'sales',
        to: 'orchestrator',
        kind: 'action',
        text: 'Offerte opgesteld en klaar voor review. Prijs €27.140 excl. BTW, levering in 2 tranches, betaaltermijn 30 dagen. Concept-mail klaar voor directie-akkoord voordat verzending. Doorlooptijd tot nu: 9 minuten.',
        minutesSaved: 45,
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Offerte wacht op akkoord directie (escalatie conform policy bij bedragen boven €25.000). 3 agents ingezet, 78 minuten bespaard. Normaal pad: 1,5 dag doorlooptijd — nu 9 minuten plus goedkeuring.',
      },
    ],
  },
};
