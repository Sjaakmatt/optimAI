import type { Script } from '@/lib/types';

export const script_question: Script = {
  id: 'script_question',
  eventTitle: 'Vraag — Schildersbedrijf Visser',
  eventContext: 'Technische specs brandwerende gipsplaat EI 60 voor woningscheidende wand',
  minutesSaved: 32,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Klantservice zoekt productdata op', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Productdatabase EI 60',
        value: 'PlatiMa 12,5 fire (Saint-Gobain) · Duripanel 12,5 (Rigips) · beide attest-gecertificeerd',
        by: 'klantservice',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Voorraad PlatiMa 12,5 fire',
        value: 'A-16 · 240 platen · direct leverbaar',
        by: 'voorraad',
        tone: 'inventory',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Voorraad Duripanel 12,5',
        value: 'A-18 · 85 platen · direct leverbaar',
        by: 'voorraad',
        tone: 'inventory',
      },
    },

    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          'Visser is renovatiebedrijf, pragmatisch. PlatiMa adviseren — soepeler te verwerken, scherper geprijsd, ruime voorraad.',
        by: 'klantservice',
      },
    },

    { kind: 'status.update', statusText: 'Klantservice schrijft het antwoord', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'bart@visser-bouw.nl',
        subject: 'Re: Brandwerende gipsplaat EI 60 · wat adviseer je?',
        date: 'Vandaag · 15:58',
        reasoning: [
          'Korte technische uitleg, geen woordenbrij',
          'Twee opties met prijs zodat Visser zelf kan kiezen',
          'Afsluiten met aanbod offerte zodat omzetkans niet weglekt',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Hoi Bart,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Voor een EI 60 woningscheidende wand werkt een dubbele beplating het eenvoudigst. Twee goede opties waar we zelf dagelijks mee werken:',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        '— Saint-Gobain PlatiMa 12,5 fire, 2× per zijde → EI 60 volgens attest. € 18,90 per m².\n— Rigips Duripanel 12,5, 2× per zijde → ook gecertificeerd EI 60. € 19,60 per m².',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Beide liggen hier op voorraad (A-16 en A-18), dus direct leverbaar. Voor een pragmatische renovatie zou ik voor de PlatiMa gaan — soepeler te verwerken en scherper in prijs.',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Als je de m² doorgeeft zet ik direct een offerte klaar met bijpassende profielen en kitwerk.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nSjoerd · Nordveld\nklantenservice@nordveld.nl · 0228-554100',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Verstuurd · 15:58 · 19 min werk bespaard',
      minutesSaved: 19,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Sales krijgt opvolg-actie', delay: 700 },
    { kind: 'pickup', by: 'sales', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a2',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Lead niet laten liggen · 5 dagen is de optimale follow-up termijn',
          'Sales krijgt context mee: welk product geadviseerd, hoeveel m² beschikbaar',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'slot',
      slot: {
        wanneer: 'Over 5 werkdagen · 14:00 – 14:10',
        duur: '10 min',
        voor: 'Sales (Martijn)',
        onderwerp: 'Follow-up Visser · EI 60 advies',
        details: [
          'Geen reactie? Even bellen of project nog loopt',
          'Voorraad PlatiMa nog ruim · prijs is stabiel',
          'Bij m² inschatting: direct offerte bouwen',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Geblokkeerd in agenda · 5 min werk bespaard',
      minutesSaved: 5,
    },

    { kind: 'status.update', statusText: 'CRM krijgt notitie voor accountmanager', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'memo',
      meta: {
        memoSubject: 'CRM-notitie · Visser interesse EI 60',
        date: 'Vandaag · 16:00',
        reasoning: [
          'Vraag impliceert nieuw project · accountmanager wil dat weten',
          'Past bij categorie "renovatie scheidingswand" — interessante marge',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Lead-context',
        items: [
          'Visser vraagt EI 60 oplossing · type woningscheidende wand',
          'Geadviseerd: PlatiMa fire (€ 18,90/m²)',
          'Wachten op m² · follow-up over 5 werkdagen',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'In CRM Visser-dossier · 8 min werk bespaard',
      minutesSaved: 8,
    },

    { kind: 'complete', delay: 700, totalMinutes: 32 },
  ],
};
