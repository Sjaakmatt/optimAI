import type { Script } from '@/lib/types';

// Social · publieke klacht op Instagram. De agent reageert kort en menselijk in
// het openbaar (zonder gegevens te delen), zoekt intussen de order op in het
// ERP + PostNL, en lost het daarna op in een DM met een herzending en tegoed.
export const script_social_complaint: Script = {
  id: 'script_social_complaint',
  eventTitle: 'Social — Publieke klacht op Instagram',
  eventContext: 'Openbare klacht · reputatierisico · order zoekgeraakt bij PostNL',
  minutesSaved: 48,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'De Dirigent ziet een openbare klacht', delay: 600 },
    { kind: 'pickup', by: 'orchestrator', delay: 600 },
    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Publieke reactie bij een account met bereik: reputatierisico. Social reageert binnen 30 min in het openbaar en verhuist naar DM; Bestellingen zoekt intussen de order en de track & trace op.',
        by: 'orchestrator',
      },
    },

    { kind: 'status.update', statusText: 'Social beoordeelt de zichtbaarheid', delay: 700 },
    { kind: 'pickup', by: 'verzending', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Beleid #ver-2',
        value: 'Geen order- of klantgegevens in de openbare reactie · alleen kort erkennen en naar DM',
        by: 'verzending',
        tone: 'policy',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen zoekt de order op in het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · order gekoppeld',
        value: 'VNK-2026-08712 · verzonden 15 juli · PostNL 3SVNK0281120',
        by: 'voorraad',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 900,
      check: {
        label: 'PostNL Track & Trace',
        value: 'Sinds 16 juli geen scan meer · PostNL bevestigt: zending vermoedelijk zoekgeraakt',
        by: 'voorraad',
        tone: 'log',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Het pakket is echt kwijtgeraakt bij de vervoerder. Niet verdedigen maar oplossen: publiek kort en warm reageren, in de DM een nieuwe zending (express) plus tegoed regelen.',
        by: 'verzending',
      },
    },

    { kind: 'status.update', statusText: 'Social plaatst een openbare reactie', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'whatsapp',
      meta: {
        channelLabel: 'Instagram · openbare reactie',
        customer: '@merel.woont',
        phone: 'Openbaar zichtbaar · 11.4k volgers',
        reasoning: [
          'Kort, menselijk en niet defensief — meelezers zien hoe we het oppakken',
          'Geen ordernummer of adres in het openbaar, dat gaat naar de DM',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Nu al 8 dagen wachten en helemaal niks gehoord. Betaald is wél meteen gelukt 🙄',
        time: '11:02',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Hoi Merel, wat vervelend en terecht dat je baalt. Dit klopt niet en we duiken er meteen in. Ik stuur je nu een DM zodat we het direct voor je oplossen. 🙏',
        time: '11:08',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Openbaar geplaatst · 8 min werk bespaard',
      minutesSaved: 8,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { routesPlanned: 1 } },

    { kind: 'status.update', statusText: 'Social lost het op in een DM', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'whatsapp',
      meta: {
        channelLabel: 'Instagram · DM',
        customer: '@merel.woont',
        phone: 'Direct message',
        reasoning: [
          'Eerlijk vertellen wat er misging (PostNL), dat neemt de klant serieus',
          'Meteen een concrete oplossing bieden: nieuwe zending express + tegoed',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a2',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Hoi Merel! Ik heb je bestelling opgezocht. Je pakket is helaas zoekgeraakt bij PostNL, daar baal ik ook van. We sturen vandaag nog een nieuwe zending met spoed (morgen in huis) en zetten € 10 tegoed op je account voor het wachten.',
        time: '11:11',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a2',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Oh, dat wist ik niet. Fijn dat het nu wél snel gaat. Bedankt voor de eerlijkheid!',
        time: '11:13',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a2',
      target: 'message',
      message: {
        from: 'us',
        text: 'Graag gedaan. Je krijgt zo de nieuwe track & trace. Fijn weekend alvast! 🌿',
        time: '11:13',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Opgelost in DM · 14 min werk bespaard',
      minutesSaved: 14,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { revenue: 340 } },

    { kind: 'status.update', statusText: 'Retouren zet de herzending + tegoed klaar', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Mandaat #fac-1',
        value: 'Kosteloze herzending + € 10 tegoed · binnen mandaat (€ 150) · geen goedkeuring nodig',
        by: 'facturatie',
        tone: 'credit',
      },
    },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Herzending VNK-2026-08712 · vervanging zoekgeraakt pakket',
        date: 'Vandaag · 11:15',
        reasoning: [
          'Zoekgeraakt bij PostNL: kosten claimen we los bij de vervoerder',
          'Klant mag daar niet op wachten, dus herzending gaat vandaag de deur uit',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1400,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Wat',
        items: [
          'Nieuwe zending VNK-2026-08712 met spoedlevering (PostNL express)',
          '€ 10 tegoed op het account van de klant',
          'Claim indienen bij PostNL voor de zoekgeraakte zending',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1400,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Effect',
        items: [
          'Publieke klacht in 13 minuten omgebogen naar een tevreden reactie',
          'Klant met 11.4k volgers behouden — reputatie beschermd',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a3',
      footer: 'Klaargezet · 7 min werk bespaard',
      minutesSaved: 7,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a3',
        department: 'voorraad',
        kind: 'followup',
        title: 'Herzending @merel klaarzetten (express)',
        subtitle: 'Vervanging zoekgeraakt pakket · vandaag verzenden',
        reference: 'VNK-2026-08712',
        actionLabel: 'Verzonden',
        systemTarget: 'ERP + PostNL',
      },
    },

    { kind: 'status.update', statusText: 'Reviews bewaakt de relatie', delay: 700 },
    { kind: 'pickup', by: 'sales', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a4',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Boze klant die net gerustgesteld is: even nachecken bindt de relatie',
          'Bij een goede afloop kan een vriendelijk verzoek om een update-review veel goedmaken',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a4',
      target: 'slot',
      slot: {
        wanneer: 'Over 2 dagen · 11:00',
        duur: '10 min',
        voor: 'Reviews & retentie',
        onderwerp: 'Nacheck @merel.woont · herzending goed aangekomen?',
        details: [
          'Track & trace herzending controleren in PostNL',
          'Goed aangekomen? Vriendelijk vragen of ze de reactie wil bijwerken',
          'Niet pushen — relatie staat voorop',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a4',
      footer: 'In agenda gezet · 5 min werk bespaard',
      minutesSaved: 5,
    },

    { kind: 'complete', delay: 700, totalMinutes: 48 },
  ],
};
