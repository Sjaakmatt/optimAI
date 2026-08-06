import type { Script } from '@/lib/types';

// E-mail · dubbele afschrijving. De agent zoekt de order op in het ERP,
// controleert de transacties bij de betaalprovider, stort de dubbele betaling
// direct terug en bevestigt dat naar de klant.
export const script_mail_payment: Script = {
  id: 'script_mail_payment',
  eventTitle: 'E-mail, Twee keer afgeschreven',
  eventContext: 'Betaalvraag · transacties checken bij de betaalprovider en terugstorten',
  minutesSaved: 34,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'E-mail leest de betaalvraag', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },

    { kind: 'status.update', statusText: 'Bestellingen zoekt de order op in het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · order opgezocht',
        value: 'VNK-2026-08902 · € 149 · Bijzettafel Lume walnoot · 1 order, 1 betaling verwacht',
        by: 'voorraad',
        tone: 'dossier',
      },
    },

    { kind: 'status.update', statusText: 'Retouren controleert de betaalprovider', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'check',
      delay: 900,
      check: {
        label: 'Betaalprovider · transacties',
        value: 'Twee geslaagde afschrijvingen van € 149 · eerste poging leek te mislukken, klant probeerde opnieuw · beide zijn gecaptured',
        by: 'facturatie',
        tone: 'credit',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Beleid #fac-4',
        value: 'Dubbele afschrijving bevestigd · direct terugstorten op de oorspronkelijke methode',
        by: 'facturatie',
        tone: 'policy',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Priya heeft gelijk: er staan twee captures voor één order. De tweede betaling gaat vandaag terug via haar eigen betaalmethode. Meteen bevestigen met een concreet termijn neemt de zorg weg.',
        by: 'facturatie',
      },
    },

    { kind: 'status.update', statusText: 'Retouren stort de dubbele betaling terug', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'invoice',
      meta: {
        afzender: 'VONK',
        afzenderSub: 'Online woonwinkel',
        invoiceKind: 'credit',
        invoiceNumber: 'CN-2026-0448',
        customer: 'Priya Nair',
        to: 'order VNK-2026-08902',
        date: 'Vandaag · 13:41',
        terms: 'Terugbetaling via de oorspronkelijke betaalmethode',
        reasoning: [
          'Volledige dubbele afschrijving terug: € 149 inclusief BTW',
          'Via de betaalprovider op dezelfde methode, geen handmatige overboeking',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Terugbetaling dubbele afschrijving · order VNK-2026-08902',
        aantal: 1,
        prijs: 123.14,
        totaal: 123.14,
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a1',
      footer: 'Terugbetaling gestart · 7 min werk bespaard',
      minutesSaved: 7,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a1',
        department: 'facturatie',
        kind: 'payment-out',
        title: 'Terugbetaling € 149 bevestigen',
        subtitle: 'Dubbele afschrijving Priya Nair · via betaalprovider',
        reference: 'CN-2026-0448 · VNK-2026-08902',
        amount: '€ 149,00',
        actionLabel: 'Terugbetaling voltooid',
        systemTarget: 'Betaalprovider',
      },
    },

    { kind: 'status.update', statusText: 'E-mail bevestigt naar de klant', delay: 700 },
    { kind: 'pickup', by: 'klantservice', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@vonk.nl',
        to: 'priya.nair@gmail.com',
        subject: 'Re: Dubbel betaald voor order VNK-2026-08902',
        date: 'Vandaag · 13:42',
        reasoning: [
          'Bevestigen dat we het gezien hebben en al geregeld is',
          'Kort uitleggen wat er gebeurde zodat het geen zorg blijft',
          'Concreet termijn noemen (2 tot 3 werkdagen)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste Priya,',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Je hebt helemaal gelijk: er stonden twee betalingen van € 149 voor je bestelling. Bij de eerste poging leek de betaling te mislukken, waardoor er per ongeluk een tweede is gedaan. Beide zijn uiteindelijk gelukt.',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'We hebben de dubbele afschrijving van € 149 zojuist teruggestort op je eigen betaalmethode. Afhankelijk van je bank staat het bedrag binnen 2 tot 3 werkdagen weer op je rekening.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Je bestelling zelf blijft gewoon staan en wordt geleverd zoals gepland. Excuses voor de schrik.',
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Hartelijke groet,\n\nLisa · Vonk Klantenservice\nklantenservice@vonk.nl',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Verstuurd · 13:42 · 9 min werk bespaard',
      minutesSaved: 9,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'complete', delay: 700, totalMinutes: 34 },
  ],
};
