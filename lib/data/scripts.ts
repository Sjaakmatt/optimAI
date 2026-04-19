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

  // =========================================================
  // SCENARIO 3: Klacht Aannemersbedrijf De Boer
  // =========================================================
  script_complaint: {
    id: 'script_complaint',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Klacht binnen van De Boer over ORD-2026-0418: 6 van 40 gipsplaten met hoekschade. Toon geïrriteerd maar redelijk. Dit moet snel en netjes. Klantservice opent lijn, Verzending checkt transport-log, Facturatie bereidt creditregeling voor.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Ontvangstbevestiging binnen 15 min. Empathische toon. Nog géén toezeggingen — wacht op Verzending-analyse.',
      },
      {
        delayBefore: 900,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Antwoord verstuurd: excuus, klacht genoteerd onder KL-2026-0087, terugkoppeling binnen 4u. Klant-dossier vermeldt 18 orders in 2 jaar, nul eerdere klachten. Goede relatie — niet laten escaleren.',
        minutesSaved: 7,
      },
      {
        delayBefore: 800,
        parallel: true,
        from: 'orchestrator',
        to: 'verzending',
        kind: 'delegate',
        text: "Transport-log ORD-2026-0418 opzoeken. Was laadveiligheid in orde? Foto's bij laden/lossen?",
      },
      {
        delayBefore: 1000,
        from: 'verzending',
        to: 'orchestrator',
        kind: 'report',
        text: "Laad-foto's tonen platen correct afgedekt en gezekerd. Chauffeur Bakker heeft bij aflevering twee platen met zichtbare hoekschade vastgelegd — dat matcht deels, maar klant meldt zes. Mogelijk ontstaan bij lossen door eigen bouwvakkers. Niet 100% onze schuld, maar lastig te bewijzen.",
        minutesSaved: 14,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'facturatie',
        kind: 'delegate',
        text: 'Creditnota klaarzetten voor 6 platen à €12,40 = €74,40. Nog niet versturen.',
      },
      {
        delayBefore: 700,
        from: 'facturatie',
        to: 'orchestrator',
        kind: 'report',
        text: 'Creditnota CN-2026-0021 concept klaar. Bedrag €74,40 excl. BTW. Wacht op go.',
        minutesSaved: 5,
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Beleidsregel: bij klanten met >10 orders en 0 eerdere klachten coulance toepassen zonder discussie over schuldvraag. Kost €74 maar behoudt relatie.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Antwoord naar De Boer: we nemen de 6 platen volledig voor eigen rekening. Creditnota onderweg. Nieuwe platen morgen mee met rit richting Medemblik — eerste ronde. Vraag: 1 vervangende levering of alleen credit?',
      },
      {
        delayBefore: 1100,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Mail verstuurd — toon warm maar zakelijk, geen schuldvraag aangekaart, oplossing voorop. Keuzeoptie voorgelegd. Klant-reactie verwacht binnen 1u. Credit staat al klaar in systeem.',
        minutesSaved: 11,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Afhandeling strak: 4 agents, 37 minuten bespaard, escalatie voorkomen. Zonder ons: gemiddelde klacht-doorlooptijd in branche is 2,5 dag.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 4: Voorraad laag
  // =========================================================
  script_stock_low: {
    id: 'script_stock_low',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Voorraadsignaal: isolatiewol 100mm op 18 rollen, minimum 30. 25 rollen gereserveerd in lopende orders — dekking krap. Voorraad en Inkoop samen oplossen.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'voorraad',
        kind: 'delegate',
        text: 'Verbruiksanalyse laatste 30 dagen. Welke verwachting komende 2 weken?',
      },
      {
        delayBefore: 1000,
        from: 'voorraad',
        to: 'orchestrator',
        kind: 'report',
        text: 'Afgelopen 30 dagen: gemiddeld 4,2 rollen per werkdag. Trend stijgend (voorjaarsseizoen). Verwachting 2 weken: ±50 rollen. Huidige dekking: 4 werkdagen. Aanbevolen bestelhoeveelheid: 80 rollen (6 weken voorraad).',
        minutesSaved: 12,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'inkoop',
        kind: 'delegate',
        text: 'Bestelling 80 rollen Isolatiewol 100mm bij Rockwool Benelux. Check eventueel 2e leverancier voor prijsvergelijk.',
      },
      {
        delayBefore: 1200,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'reasoning',
        text: 'Rockwool standaard €58/rol, levertijd 2 werkdagen. Knauf Insulation alternatief: €56,20 maar 5 werkdagen. Verschil: €144 korting versus 3 dagen langer. Gezien krappe dekking: Rockwool kiezen ondanks hogere prijs.',
      },
      {
        delayBefore: 900,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'action',
        text: 'Inkooporder INK-2026-0133 verstuurd naar Rockwool. 80 rollen à €58, totaal €4.640 excl. BTW. Bevestiging binnen kantoortijd verwacht. Levering vrijdag voor 12u.',
        minutesSaved: 18,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Voorraad veiliggesteld. Geen orders in gevaar gekomen. 2 agents, 30 minuten bespaard. Dit type signaal bleef vroeger soms 2 dagen liggen voordat iemand het oppakte.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 5: Leverancier vertraging
  // =========================================================
  script_supplier_delay: {
    id: 'script_supplier_delay',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: "Saint-Gobain meldt 3 dagen vertraging op INK-2026-0089. Dit raakt 2 lopende orders: ORD-2026-0421 en 0424. Moet snel gekeken wie er geraakt wordt en hoe we 't oplossen voordat de klanten het ontdekken.",
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'orders',
        kind: 'delegate',
        text: 'Impact-analyse: welke orders, welke artikelen, welke lever-afspraken staan er met klanten?',
      },
      {
        delayBefore: 1100,
        from: 'orders',
        to: 'orchestrator',
        kind: 'report',
        text: 'ORD-2026-0421: Bouwcombinatie Hoogkarspel, 80 gipsplaten, levering beloofd woensdag. ORD-2026-0424: Timmerbedrijf Koopmans Wervershoof, 45 gipsplaten, levering beloofd donderdag. Beide kunnen zonder vertragingsimpact landen als we vrijdag leveren in plaats van wo/do.',
        minutesSaved: 10,
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'voorraad',
        kind: 'delegate',
        text: 'Check alternatief: kunnen we vanuit eigen voorraad deels dekken zonder andere orders in gevaar te brengen?',
      },
      {
        delayBefore: 1000,
        from: 'voorraad',
        to: 'orchestrator',
        kind: 'report',
        text: 'Eigen voorraad 120 gipsplaten. Koopmans kan volledig uit voorraad (45 platen), Hoogkarspel deels (50 van 80). Totaal 95 platen uit voorraad lost 1 klant volledig op en andere 62%.',
        minutesSaved: 14,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Optimale route: Koopmans helemaal uit voorraad op originele datum, Hoogkarspel 50 platen op datum en 30 platen in tweede levering zodra Saint-Gobain aanlevert. Pro-actief communiceren — klanten horen liever vooraf dan achteraf.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Twee mails: Koopmans (geen wijziging, rustige bevestiging), Hoogkarspel (uitleg + voorstel splitsing in 2 ritten, geen meerkosten).',
      },
      {
        delayBefore: 1200,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Beide mails verstuurd. Hoogkarspel-mail stelt voor: 50 platen woensdag (voldoende om te starten met scheidingswanden begane grond), 30 platen vrijdag rechtstreeks op locatie. Geen extra kosten. Eerdere communicatie van deze klant suggereert dat splitsing werkbaar is.',
        minutesSaved: 16,
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'inkoop',
        kind: 'delegate',
        text: 'Noteer vertragings-incident bij Saint-Gobain. Derde dit kwartaal. Escalatie naar accountmanager voorstellen.',
      },
      {
        delayBefore: 800,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'action',
        text: 'Incident genoteerd (patroon zichtbaar). Interne notitie voor kwartaal-review klaargezet. Handmatige follow-up met accountmanager Saint-Gobain aanbevolen — te strategisch voor automatisch.',
        minutesSaved: 6,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Klanten pro-actief geïnformeerd voordat ze het zelf ontdekten. 4 agents, 46 minuten bespaard. Vertragings-incident gesignaleerd voor strategische opvolging.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 6: Technische vraag
  // =========================================================
  script_question: {
    id: 'script_question',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Technische vraag van Visser over brandwerende gipsplaat EI 60 voor woningscheidende wand. Niet urgent qua klacht of order, maar wel omzetkans. Klantservice beantwoordt, Voorraad checkt direct beschikbaarheid.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Vraag beantwoorden met onderbouwing uit productdatabase. Niet te technisch, wel accuraat. Afsluiten met aanbod voor offerte.',
      },
      {
        delayBefore: 1300,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'reasoning',
        text: 'Voor EI 60 woningscheidende wand: dubbele beplating vereist. Saint-Gobain PlatiMa 12,5 fire — 2x per zijde = EI 60 volgens attest. Alternatief Rigips Duripanel 12,5 — ook gecertificeerd. Visser is renovatiebedrijf, pragmatisch — ik geef beide opties met prijs.',
      },
      {
        delayBefore: 900,
        parallel: true,
        from: 'orchestrator',
        to: 'voorraad',
        kind: 'delegate',
        text: 'Voorraadstatus PlatiMa 12,5 fire en Rigips Duripanel 12,5.',
      },
      {
        delayBefore: 800,
        from: 'voorraad',
        to: 'orchestrator',
        kind: 'report',
        text: 'PlatiMa fire: 240 platen op voorraad, locatie A-16. Rigips Duripanel: 85 platen, A-18. Beide direct leverbaar.',
        minutesSaved: 4,
      },
      {
        delayBefore: 900,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Antwoord verstuurd: technische uitleg in 3 zinnen, beide productopties met prijs per m², bevestiging direct leverbaar. Afgesloten met "als je de m² doorgeeft zet ik een offerte klaar". Stijl: collegiaal, zoals Visser-mails terugkomen.',
        minutesSaved: 15,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Klein scenario, maar typisch. 2 agents, 19 minuten bespaard. Dit type vraag werd vroeger vaak door de commerciële binnendienst tussen andere zaken door beantwoord, met soms dagen doorlooptijd. Nu binnen enkele minuten.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 7: Factuur overdue
  // =========================================================
  script_invoice_overdue: {
    id: 'script_invoice_overdue',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Factuur F-2026-0312 Klusbedrijf Molenaar 42 dagen overdue, €1.840. Al 2 herinneringen geweest. Dit moet nu door iets anders opgevolgd worden — telefonisch of stopzetting leverantie.',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'facturatie',
        kind: 'delegate',
        text: 'Klantprofiel Molenaar. Eerdere betalingen, openstaande facturen, kredietlimiet.',
      },
      {
        delayBefore: 1100,
        from: 'facturatie',
        to: 'orchestrator',
        kind: 'report',
        text: 'Molenaar: klant sinds 2019, normaal betaalgedrag 25 dagen. Dit is afwijkend. Geen andere openstaande facturen. Kredietlimiet €5.000, huidig gebruikt €1.840. Geen lopende orders. Patroon duidt op tijdelijk probleem, niet op wanbetalen.',
        minutesSaved: 10,
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Policy: bij trouwe klanten met afwijkend gedrag eerst persoonlijk contact voordat derde herinnering (toon wordt juridisch). Escalatie naar mens — dit is geen agent-taak.',
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: 'Bereid belnotitie voor voor finance-medewerker. Inclusief klantgeschiedenis, toon-advies, mogelijke opening-vraag.',
      },
      {
        delayBefore: 1000,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: 'Belnotitie klaar in takenlijst voor Saskia (finance). Kernpunten: vriendelijk vragen of er iets aan de hand is, geen verwijtende toon, betalingsregeling aanbieden als nodig. Relatiewaarde klant is hoog — niet stuk maken.',
        minutesSaved: 8,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'facturatie',
        kind: 'delegate',
        text: 'Nieuwe leveringen aan Molenaar on hold zetten tot gesprek gevoerd. Zachte hold — geen mail hierover.',
      },
      {
        delayBefore: 700,
        from: 'facturatie',
        to: 'orchestrator',
        kind: 'action',
        text: 'On hold gezet in systeem. Reden: "betaaltermijn in gesprek". Zodra Saskia groen licht geeft wordt hold automatisch opgeheven.',
        minutesSaved: 5,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Escalatie naar mens — zoals het hoort. Agent heeft de voorbereiding gedaan, Saskia hoeft alleen maar te bellen. 3 agents, 23 minuten bespaard op voorbereiding alleen.',
      },
    ],
  },

  // =========================================================
  // SCENARIO 8: Verzending probleem
  // =========================================================
  script_shipment_issue: {
    id: 'script_shipment_issue',
    steps: [
      {
        delayBefore: 500,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Van Dijk meldt vertraging rit VD-4418 door ongeluk A7 richting Sneek. 4 leveringen geraakt. Eerste prioriteit: welke klanten zijn dit, hoe laat werden ze verwacht, wie moet ik bellen?',
      },
      {
        delayBefore: 700,
        from: 'orchestrator',
        to: 'verzending',
        kind: 'delegate',
        text: 'Rit VD-4418 uitsplitsen. Welke 4 klanten, welke tijden, welke alternatieven?',
      },
      {
        delayBefore: 1200,
        from: 'verzending',
        to: 'orchestrator',
        kind: 'report',
        text: 'Rit 4418: Bouw Friesland (Drachten 10:30), Timmerwerk NO (Joure 11:30), Van der Zwaag (Sneek 12:30), Bouwbedrijf Postma (Bolsward 13:30). Huidige vertraging ±90 minuten. Alternatief bestaat: tweede wagen van Bakker Transport kan Bolsward en Sneek overnemen, dan is vertraging beperkt tot Drachten en Joure.',
        minutesSaved: 18,
      },
      {
        delayBefore: 900,
        from: 'orchestrator',
        to: 'inkoop',
        kind: 'delegate',
        text: 'Stuur opdracht naar Bakker Transport voor overname 2 leveringen. Acceptabel meerkosten-scenario tot €200.',
      },
      {
        delayBefore: 1100,
        from: 'inkoop',
        to: 'orchestrator',
        kind: 'action',
        text: 'Bakker bevestigt: €165 meerkosten, ophalen over 20 minuten bij distributiecentrum, leveringen binnen originele slot. Opdracht OK-gegeven onder mandaat-limiet.',
        minutesSaved: 12,
      },
      {
        delayBefore: 800,
        from: 'orchestrator',
        to: 'klantservice',
        kind: 'delegate',
        text: '4 klanten pro-actief informeren. Tweetal krijgen vertragingsbericht, andere twee krijgen bericht dat alternatieve wagen komt (op tijd). Toon duidelijk en zakelijk.',
      },
      {
        delayBefore: 1400,
        from: 'klantservice',
        to: 'orchestrator',
        kind: 'action',
        text: '4 mails + 2 belafspraken. Drachten en Joure: vertraging circa 90 min, excuus, ongeluk buiten onze controle. Sneek en Bolsward: geen wijziging in planning, afleverwagen veranderd. Bolsward belde terug ter bevestiging — tevreden met snelle actie.',
        minutesSaved: 22,
      },
      {
        delayBefore: 600,
        from: 'orchestrator',
        to: 'broadcast',
        kind: 'reasoning',
        text: 'Impact beperkt: 2 van 4 leveringen op tijd, andere 2 met 90 min vertraging maar pro-actief gecommuniceerd. €165 extra transportkosten voor behoud van klanttevredenheid bij 2 klanten. 3 agents, 52 minuten bespaard, en belangrijker: geen klachten te verwachten.',
      },
    ],
  },
};
