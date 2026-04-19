import type { Script } from '@/lib/types';

export const script_complaint: Script = {
  id: 'script_complaint',
  eventTitle: 'Klacht — Aannemersbedrijf De Boer',
  eventContext: '6 van 40 gipsplaten met hoekschade in order 2026-0418',
  minutesSaved: 37,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Klantservice leest de klacht', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 1000 },
    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'info@deboer-bouw.nl',
        subject: 'Uw melding over order 2026-0418 — dossier KL-0087',
        date: 'Vandaag · 11:43',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Geachte heer De Boer,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Dank voor uw melding. Vervelend dat zes van de geleverde gipsplaten beschadigd zijn aangekomen — dat hoort niet, en wij lossen dit voor u op.',
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'We nemen de zes beschadigde platen volledig voor onze rekening. Een creditnota van € 74,40 excl. BTW ontvangt u vandaag nog. Mocht u liever vervanging, dan rijden we morgen met een rit richting Medemblik — we kunnen zes nieuwe platen meenemen als u dat doorgeeft voor 16:00 vandaag.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Excuses voor het ongemak.',
      delay: 1400,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Met vriendelijke groet,\n\nSjoerd (namens Nordveld Groothandel)\nklantenservice@nordveld.nl · 0228-554100',
      delay: 1400,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Verstuurd · 11:43 · 11 min werk bespaard',
      minutesSaved: 11,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Facturatie bereidt creditnota voor', delay: 600 },
    { kind: 'pickup', by: 'facturatie', delay: 900 },
    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'invoice',
      meta: {
        invoiceKind: 'credit',
        invoiceNumber: 'CN-2026-0021',
        customer: 'Aannemersbedrijf De Boer',
        to: 'Westerdijk 14, 1671 HK Medemblik',
        date: 'Vandaag · 11:44',
        terms: 'Creditering; verrekend met eerstvolgende factuur',
      },
      delay: 800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'line',
      line: {
        omschrijving: 'Gipsplaten 12,5mm 260x120 (hoekschade)',
        aantal: 6,
        prijs: 12.40,
        totaal: 74.40,
      },
      delay: 1400,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Klaargezet · 11:44 · 5 min werk bespaard',
      minutesSaved: 5,
      delay: 600,
    },

    { kind: 'complete', totalMinutes: 37, delay: 600 },
  ],
};
