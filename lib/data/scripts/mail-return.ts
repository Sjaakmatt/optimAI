import type { Script } from '@/lib/types';

// E-mail · retour van een beschadigd artikel. De agent zoekt de order op in het
// ERP, toetst het retourbeleid, regelt de creditering via de betaalprovider en
// reserveert vervangende borden in het voorraadsysteem.
export const script_mail_return: Script = {
  id: 'script_mail_return',
  eventTitle: 'E-mail — Retour beschadigd servies',
  eventContext: 'Beschadigd geleverd · ERP + retourbeleid + creditering via de betaalprovider',
  minutesSaved: 44,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'E-mail leest de retouraanvraag', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Klantdossier',
        value: 'Mark Bosma · 7 orders sinds 2022 · 0 eerdere klachten',
        by: 'klantservice',
        tone: 'dossier',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen zoekt de order op in het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · order opgezocht',
        value: 'VNK-2026-08790 · bezorgd 21 juli · Serviesset Aare 16-delig · € 79',
        by: 'voorraad',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Beleid #fac-2',
        value: 'Bezorgd 1 dag geleden · ruim binnen de retourtermijn van 30 dagen',
        by: 'klantservice',
        tone: 'policy',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Het was een cadeau en er zijn 2 borden gebroken. Snelste oplossing: meteen 2 vervangende borden opsturen en de keuze voor terugbetaling openhouden. Breuk hoeft niet retour.',
        by: 'klantservice',
      },
    },

    { kind: 'status.update', statusText: 'E-mail schrijft het antwoord', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@vonk.nl',
        to: 'm.bosma@ziggo.nl',
        subject: 'Re: Beschadigd servies — order VNK-2026-08790',
        date: 'Vandaag · 09:52',
        reasoning: [
          'Toon: warm, geen schuldvraag over de breuk',
          'Direct een oplossing bieden en de keuze bij de klant laten',
          'Gedoe wegnemen: gebroken borden hoeven niet retour',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Beste Mark,',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Dank je wel voor je bericht, en wat vervelend dat twee borden gebroken zijn aangekomen. Zeker als het als cadeau bedoeld is, dat hoort natuurlijk niet.',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'We sturen je vandaag nog twee nieuwe borden op, kosteloos. Die zijn morgen bij je. De gebroken borden hoef je niet terug te sturen, die mag je gerust weggooien.',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Heb je liever het bedrag van de twee borden terug in plaats van vervanging? Laat het even weten, dan storten we dat direct terug op je iDEAL-betaling.',
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Hartelijke groet,\n\nLisa · Vonk Klantenservice\nklantenservice@vonk.nl',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Verstuurd · 09:52 · 11 min werk bespaard',
      minutesSaved: 11,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Retouren zet de creditering klaar via de betaalprovider', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Betaalprovider · iDEAL',
        value: 'Deelterugbetaling van 2 borden mogelijk op de oorspronkelijke betaling · klaar om te vuren',
        by: 'facturatie',
        tone: 'credit',
      },
    },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a2',
      artifactType: 'invoice',
      meta: {
        afzender: 'VONK',
        afzenderSub: 'Online woonwinkel',
        invoiceKind: 'credit',
        invoiceNumber: 'CN-2026-0442',
        customer: 'Mark Bosma',
        to: 'order VNK-2026-08790',
        date: 'Vandaag · 09:53',
        terms: 'Klaar voor terugbetaling · alleen bij keuze voor geld terug',
        reasoning: [
          'Creditnota vast klaarzetten zodat terugbetalen één klik is als Mark dat kiest',
          'Bedrag onder mandaat: Retouren handelt zelf af',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a2',
      target: 'line',
      line: { omschrijving: 'Serviesset Aare · los bord (breuk)', aantal: 2, prijs: 4.95, totaal: 9.90 },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Klaargezet · 6 min werk bespaard',
      minutesSaved: 6,
    },

    { kind: 'status.update', statusText: 'Bestellingen reserveert 2 vervangende borden', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'ERP · voorraad',
        value: 'Losse borden Aare · 46 op voorraad · 2 reserveren voor herzending Bosma',
        by: 'voorraad',
        tone: 'inventory',
      },
    },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'stock-mutation',
      meta: {
        reasoning: [
          'Reservering in het ERP zodat de borden niet aan iemand anders verkocht worden',
          'Herzending gaat vandaag mee met de reguliere verzendronde',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 700,
      artifactId: 'a3',
      target: 'stock-delta',
      stockDelta: {
        artikel: 'Bord Aare (los)',
        was: 46,
        wordt: 44,
        unit: 'stuks',
        reden: '2 gereserveerd voor herzending Bosma (VNK-2026-08790)',
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'Reservering geboekt · 5 min werk bespaard',
      minutesSaved: 5,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { stockMutations: 1 } },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a3',
        department: 'voorraad',
        kind: 'picking',
        title: '2 vervangende borden verzenden',
        subtitle: 'Herzending Bosma · gaat mee met de verzendronde vandaag',
        reference: 'VNK-2026-08790',
        actionLabel: 'Verzonden',
        systemTarget: 'ERP + PostNL',
      },
    },

    { kind: 'complete', delay: 700, totalMinutes: 44 },
  ],
};
