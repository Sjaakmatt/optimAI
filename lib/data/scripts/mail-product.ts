import type { Script } from '@/lib/types';

// E-mail · aankoopvraag vóór de bestelling. De agent haalt de productdata en
// maatvoering uit de PIM en de voorraad uit het ERP, geeft een eerlijk advies
// en zet een opvolging klaar zodat de omzetkans niet wegloopt.
export const script_mail_product: Script = {
  id: 'script_mail_product',
  eventTitle: 'E-mail, Vraag over eettafel',
  eventContext: 'Aankoopvraag · PIM voor maat en materiaal, ERP voor voorraad',
  minutesSaved: 30,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'E-mail leest de aankoopvraag', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },

    { kind: 'status.update', statusText: 'Kennisbank raadpleegt de PIM', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'PIM · materiaal',
        value: 'Eettafel Sunde · blad van massief eiken (geen fineer) · geolied afgewerkt',
        by: 'inkoop',
        tone: 'inventory',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'PIM · maatvoering',
        value: 'Blad 220×95 cm · geschikt voor 6 stoelen · bij eethoek 2,20 m krap maar passend',
        by: 'inkoop',
        tone: 'inventory',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · voorraad',
        value: 'Sunde 220 eiken · 8 op voorraad · levertijd 2–3 werkdagen',
        by: 'voorraad',
        tone: 'inventory',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Eerlijk zijn: 6 stoelen passen, maar bij precies 2,20 m wordt het aan de kop krap. Dat benoemen wekt vertrouwen. Materiaal (massief eiken) en levertijd geven de klant genoeg om te beslissen.',
        by: 'klantservice',
      },
    },

    { kind: 'status.update', statusText: 'E-mail schrijft het advies', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@vonk.nl',
        to: 'julia.vermeer@outlook.com',
        subject: 'Re: Past de eettafel Sunde in mijn ruimte?',
        date: 'Vandaag · 11:20',
        reasoning: [
          'Antwoord op elke vraag: maat, materiaal én voorraad',
          'Eerlijk over de krappe kant zodat er geen teleurstelling volgt',
          'Afsluiten met een concreet hulpaanbod, geen harde verkoop',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Hoi Julia,',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Leuk dat je naar de Sunde kijkt. Het blad is 220 bij 95 cm en van massief eiken, dus geen fineer maar echt hout, geolied afgewerkt.',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Zes stoelen passen er prima omheen: twee aan elke lange zijde en één aan elke kop. Bij een eethoek van precies 2,20 m wordt het aan de koppen wel wat krap om de stoel helemaal aan te schuiven. Werkbaar, maar dat wilde ik je eerlijk meegeven.',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'De tafel ligt op voorraad, met een levertijd van 2 tot 3 werkdagen. Voor volgende week red je het dus ruim.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Twijfel je nog over de maat? Stuur me gerust de afmetingen van je ruimte, dan denk ik even mee. Ik help je graag.',
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
      footer: 'Verstuurd · 11:20 · 14 min werk bespaard',
      minutesSaved: 14,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Reviews & retentie plant een opvolging', delay: 700 },
    { kind: 'pickup', by: 'sales', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a2',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Warme aankoopvraag: als er over 4 dagen niets besteld is, even helpen',
          'Context meegeven zodat de opvolging persoonlijk voelt, niet als spam',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'slot',
      slot: {
        wanneer: 'Over 4 werkdagen · 15:00',
        duur: '10 min',
        voor: 'Reviews & retentie',
        onderwerp: 'Opvolging Julia · eettafel Sunde',
        details: [
          'Nog geen bestelling? Kort mailen of ze eruit is gekomen',
          'Aanbieden om de maat samen te checken',
          'Voorraad Sunde nog ruim · levertijd stabiel',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'In agenda gezet · 6 min werk bespaard',
      minutesSaved: 6,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a2',
        department: 'sales',
        kind: 'followup',
        title: 'Opvolging Julia · eettafel Sunde',
        subtitle: 'Advies gestuurd · over 4 dagen checken of ze eruit is',
        reference: 'Lead Julia Vermeer',
        actionLabel: 'Opgevolgd',
        systemTarget: 'CRM-lead',
      },
    },

    { kind: 'complete', delay: 700, totalMinutes: 30 },
  ],
};
