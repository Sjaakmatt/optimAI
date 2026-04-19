import type { Script } from '@/lib/types';

export const script_question: Script = {
  id: 'script_question',
  eventTitle: 'Vraag — Schildersbedrijf Visser',
  eventContext: 'Technische specs brandwerende gipsplaat EI 60 voor woningscheidende wand',
  minutesSaved: 19,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Klantservice beantwoordt de vraag', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'bart@visser-bouw.nl',
        subject: 'Re: Brandwerende gipsplaat EI 60 — wat adviseer je?',
        date: 'Vandaag · 15:58',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Hoi Bart,',
      delay: 800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Voor een EI 60 woningscheidende wand werkt een dubbele beplating het eenvoudigst. Twee goede opties waar we zelf dagelijks mee werken:',
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        '— Saint-Gobain PlatiMa 12,5 fire, 2× per zijde → EI 60 volgens attest. € 18,90 per m².\n— Rigips Duripanel 12,5, 2× per zijde → ook gecertificeerd EI 60. € 19,60 per m².',
      delay: 2000,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Beide liggen hier op voorraad (A-16 en A-18), dus direct leverbaar. Voor een pragmatische renovatie zou ik voor de PlatiMa gaan — iets soepeler te verwerken en iets scherper in prijs.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Als je de m² doorgeeft zet ik meteen een offerte klaar met bijpassende profielen en kitwerk.',
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nSjoerd · Nordveld\nklantenservice@nordveld.nl · 0228-554100',
      delay: 1200,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Verstuurd · 15:58 · 19 min werk bespaard',
      minutesSaved: 19,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 19, delay: 600 },
  ],
};
