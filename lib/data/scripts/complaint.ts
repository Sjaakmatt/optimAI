import type { Script } from '@/lib/types';

export const script_complaint: Script = {
  id: 'script_complaint',
  eventTitle: 'Klacht — Aannemersbedrijf De Boer',
  eventContext: '6 van 40 gipsplaten met hoekschade in order 2026-0418',
  minutesSaved: 52,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Klantservice leest de klacht', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Klantdossier De Boer',
        value: '18 orders sinds 2024 · 0 eerdere klachten · gemiddeld 12 dagen betaaltijd',
        by: 'klantservice',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Beleid #kls-2',
        value: 'Klanten >10 orders, 0 klachten — coulance zonder discussie',
        by: 'klantservice',
        tone: 'policy',
      },
    },

    { kind: 'status.update', statusText: 'Verzending checkt transport-log', delay: 600 },
    { kind: 'pickup', by: 'verzending', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Transport-log VD-4382',
        value: 'Platen correct gezekerd · 2 hoekschades vastgelegd bij aflevering · klant meldt 6',
        by: 'verzending',
        tone: 'log',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Niet 100% bewijsbaar wie de schade veroorzaakte — relatiewaarde weegt zwaarder dan € 74. Coulance toepassen.',
        by: 'klantservice',
      },
    },

    { kind: 'status.update', statusText: 'Klantservice schrijft de mail', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'info@deboer-bouw.nl',
        subject: 'Uw melding over order 2026-0418 — dossier KL-0087',
        date: 'Vandaag · 11:43',
        reasoning: [
          'Toon: warm en zakelijk, geen schuldvraag aankaarten',
          'Direct oplossing voorop, keuze tussen credit of vervanging',
          'Beleidsregel #kls-2 (coulance bij trouwe klant) automatisch toegepast',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Geachte heer De Boer,',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Dank voor uw melding. Vervelend dat zes van de geleverde gipsplaten beschadigd zijn aangekomen — dat hoort niet, en wij lossen dit voor u op.',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'We nemen de zes beschadigde platen volledig voor onze rekening. Een creditnota van € 74,40 excl. BTW ontvangt u vandaag nog. Mocht u liever vervanging, dan rijden we morgen met een rit richting Medemblik — we kunnen zes nieuwe platen meenemen als u dat doorgeeft voor 16:00 vandaag.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Excuses voor het ongemak.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Met vriendelijke groet,\n\nSjoerd (namens Nordveld Groothandel)\nklantenservice@nordveld.nl · 0228-554100',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Verstuurd · 11:43 · 11 min werk bespaard',
      minutesSaved: 11,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Facturatie zet creditnota klaar', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Mandaat Facturatie #fac-1',
        value: '€ 74,40 onder mandaatlimiet (€ 100) — geen tussenkomst nodig',
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
        invoiceKind: 'credit',
        invoiceNumber: 'CN-2026-0021',
        customer: 'Aannemersbedrijf De Boer',
        to: 'Westerdijk 14, 1671 HK Medemblik',
        date: 'Vandaag · 11:44',
        terms: 'Creditering · verrekend met eerstvolgende factuur',
        reasoning: [
          'Bedrag onder mandaat: facturatie kan zelf afhandelen',
          'Verrekening i.p.v. uitbetaling: cashflow-vriendelijker, klant ervaart geen verschil',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a2',
      target: 'line',
      line: {
        omschrijving: 'Gipsplaten 12,5mm 260×120 (hoekschade)',
        aantal: 6,
        prijs: 12.40,
        totaal: 74.40,
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Klaargezet · 11:44 · 5 min werk bespaard',
      minutesSaved: 5,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a2',
        department: 'facturatie',
        kind: 'payment-out',
        title: 'Uitbetaling creditnota De Boer',
        subtitle: 'Klant wacht op creditering van 6 beschadigde platen',
        reference: 'CN-2026-0021',
        amount: '€ 74,40 excl. BTW',
        actionLabel: 'Uitbetalen',
        systemTarget: 'Boekhoudsysteem + bank',
      },
    },

    { kind: 'status.update', statusText: 'Voorraad reserveert vervangende platen', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Voorraad gipsplaten',
        value: 'Locatie A-12 · 120 platen op voorraad · 6 reserveren voor Medemblik-rit',
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
          'Reservering, geen afboeking — pas bij ophalen morgenochtend wordt afgeboekt',
          'Alvast vrijhouden zodat dezelfde rit zowel rit-leveringen als vervanging meeneemt',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 700,
      artifactId: 'a3',
      target: 'stock-delta',
      stockDelta: {
        artikel: 'Gipsplaten 12,5mm 260×120 (vrij)',
        was: 120,
        wordt: 114,
        unit: 'platen',
        reden: '6 vrijgehouden voor klant De Boer (rit Medemblik morgen)',
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'Reservering geboekt · 4 min werk bespaard',
      minutesSaved: 4,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { stockMutations: 1 } },

    { kind: 'status.update', statusText: 'Verzending past de rit aan', delay: 700 },
    { kind: 'pickup', by: 'verzending', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a4',
      artifactType: 'transport-plan',
      meta: {
        routeName: 'Rit West-Friesland · morgen ochtend',
        vehicle: 'Bakwagen 12-ton',
        driver: 'Van der Meer',
        totalKm: '47 km',
        reasoning: [
          'Bestaande rit bevat al een lossing in Medemblik — de Boer zit op 8 minuten omrijden',
          'Geen extra rit nodig: nul-meerkosten oplossing voor de klant',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a4',
      target: 'stop',
      stop: {
        tijd: '08:30',
        plaats: 'Distributiecentrum',
        klant: 'Vertrek',
        artikelen: 'Laden: 95 platen + 6 vervangende (De Boer)',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a4',
      target: 'stop',
      stop: {
        tijd: '09:30',
        plaats: 'Enkhuizen',
        klant: 'Bouwbedrijf Jansma',
        artikelen: 'Eerste levering ORD-2026-0431',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a4',
      target: 'stop',
      stop: {
        tijd: '10:25',
        plaats: 'Medemblik · Westerdijk 14',
        klant: 'Aannemersbedrijf De Boer',
        artikelen: '6 vervangende gipsplaten (KL-0087)',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a4',
      target: 'stop',
      stop: {
        tijd: '11:15',
        plaats: 'Hoorn',
        klant: 'ORD-2026-0429',
        artikelen: 'Reguliere levering',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a4',
      footer: 'Rit-update bevestigd · 8 min werk bespaard',
      minutesSaved: 8,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { routesPlanned: 0 } },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Nog een laatste actie: een korte interne notitie voor de eerstvolgende sales-rit, zodat de relatie persoonlijk wordt opgevolgd.',
        by: 'klantservice',
      },
    },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a5',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Persoonlijke opvolging De Boer · volgende sales-bezoek',
        date: 'Vandaag · 11:46',
        reasoning: [
          'Klant heeft nooit eerder geklaagd — relatie even bevestigen voorkomt churn',
          'Sjoerd of Jeroen langs op het bezoek dat al gepland staat (geen extra reis)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a5',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Context',
        items: [
          'Klacht KL-0087 afgehandeld met coulance · creditnota CN-2026-0021',
          '6 vervangende platen geleverd op de Medemblik-rit van morgen',
          'Klant tevreden gehouden, geen escalatie',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a5',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voor sales (Jeroen)',
        items: [
          'Bij volgend bezoek kort even persoonlijk navragen',
          'Niet uitgebreid uitleggen — De Boer hecht aan kort en zakelijk',
          'Eventueel: kleine attentie kerstpakket-niveau',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a5',
      footer: 'Genoteerd in CRM · 6 min werk bespaard',
      minutesSaved: 6,
    },

    { kind: 'complete', delay: 700, totalMinutes: 52 },
  ],
};
