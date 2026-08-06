import type { Script } from '@/lib/types';

// Systeem · negatieve review binnengekomen op het reviewplatform. De agent
// haalt de orderhistorie uit het ERP, plaatst een persoonlijke openbare
// reactie met herstelaanbod en koppelt de verpakkingsfeedback terug naar het
// magazijn.
export const script_review_negative: Script = {
  id: 'script_review_negative',
  eventTitle: 'Review, 2 sterren over verpakking',
  eventContext: '2-sterrenreview · orderhistorie uit ERP, herstelaanbod en interne feedback',
  minutesSaved: 40,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'De Dirigent leest de review', delay: 600 },
    { kind: 'pickup', by: 'orchestrator', delay: 600 },
    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          '2 sterren van een trouwe klant om een terechte reden. Reviews handelt af met een persoonlijke reactie en een herstelaanbod; Bestellingen haalt de orderhistorie erbij.',
        by: 'orchestrator',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen haalt de orderhistorie op uit het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · orderhistorie',
        value: 'VNK-2026-08655 · Ladekast Norra · klant H. Willemsen · 5 orders sinds 2023 · nooit eerder een lage review',
        by: 'voorraad',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Verzendlog · DHL',
        value: 'Bezorgd 20 juli · geen schademelding bij aflevering · verpakking = standaard doos zonder extra opvulling',
        by: 'voorraad',
        tone: 'log',
      },
    },

    { kind: 'status.update', statusText: 'Reviews stelt een reactie op', delay: 700 },
    { kind: 'pickup', by: 'sales', delay: 600 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Beleid #sal-2',
        value: 'Bij 1–2 sterren: persoonlijk contact + herstelaanbod',
        by: 'sales',
        tone: 'policy',
      },
    },
    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Trouwe klant, oprechte klacht. Openbaar persoonlijk reageren (geen standaardzin), excuses maken en een herstelaanbod doen. Intern de verpakking van de Norra-serie laten aanpassen zodat dit niet terugkomt.',
        by: 'sales',
      },
    },

    { kind: 'status.update', statusText: 'Reviews plaatst een openbare reactie', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'Vonk · reactie op je review',
        to: 'Openbaar zichtbaar op het reviewplatform',
        subject: 'Reactie op je review · order VNK-2026-08655',
        date: 'Vandaag · 14:30',
        reasoning: [
          'Persoonlijk en concreet, geen copy-paste standaardreactie',
          'Verantwoordelijkheid nemen voor de verpakking, niet de klant',
          'Meelezers zien dat we een klacht serieus oppakken',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Beste meneer Willemsen,',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Dank voor uw eerlijke review, en onze excuses voor de ingedeukte doos en het deukje in de kast. U heeft gelijk: voor een ladekast hoort de verpakking steviger te zijn dan dit.',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'We nemen dit serieus en passen de verpakking van deze serie aan. U bent al jaren klant bij ons, dus ik stuur u zo persoonlijk een bericht om het goed te maken.',
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Met vriendelijke groet,\n\nSanne · Vonk',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Openbaar geplaatst · 12 min werk bespaard',
      minutesSaved: 12,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { revenue: 180 } },

    { kind: 'status.update', statusText: 'Reviews stuurt een persoonlijk herstelaanbod', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@vonk.nl',
        to: 'h.willemsen@planet.nl',
        subject: 'Persoonlijk · onze excuses voor uw ladekast',
        date: 'Vandaag · 14:33',
        reasoning: [
          'Herstelaanbod hoort privé, niet in de openbare reactie',
          'Kortingscode als gebaar, plus de keuze voor vervanging als de schade groter is',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste meneer Willemsen,',
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Nogmaals excuses voor de verpakking van uw ladekast Norra. Ik wil dat graag goedmaken: u ontvangt van ons een kortingscode van € 15 voor uw volgende bestelling (code VONK-HERSTEL).',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Valt het deukje in de kast tegen bij nader inzien? Stuur me dan een foto, dan regelen we kosteloos een vervangend paneel of de hele kast. U hoeft daar niets voor terug te sturen.',
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Hartelijke groet,\n\nSanne · Vonk Klantenservice\nklantenservice@vonk.nl',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Verstuurd · 14:33 · 10 min werk bespaard',
      minutesSaved: 10,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Kennisbank legt de verpakkingsfeedback vast', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Verpakkingsfeedback · Norra-serie voor magazijn en inkoop',
        date: 'Vandaag · 14:35',
        reasoning: [
          'Eén review kan een structureel verpakkingsprobleem verraden',
          'Vastleggen zodat het magazijn de opvulling aanpast, niet blijft hangen bij deze klant',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Signaal',
        items: [
          'Ladekast Norra kwam ingedeukt aan · standaarddoos zonder extra opvulling',
          'Klant meldt deukje in de zijkant · risico op meer beschadigingen bij deze serie',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voorstel magazijn',
        items: [
          'Norra-serie voortaan met hoekprofielen en dubbele bodem verpakken',
          'Inkoop: steviger doosformaat aanvragen bij de verpakkingsleverancier',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a3',
      footer: 'Doorgezet naar magazijn · 6 min werk bespaard',
      minutesSaved: 6,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a3',
        department: 'inkoop',
        kind: 'review',
        title: 'Verpakking Norra-serie aanpassen',
        subtitle: 'Hoekprofielen + steviger doos · voorkomt herhaling',
        reference: 'Feedback n.a.v. review VNK-2026-08655',
        actionLabel: 'Opgepakt',
        systemTarget: 'Magazijn + inkoop',
      },
    },

    { kind: 'complete', delay: 700, totalMinutes: 40 },
  ],
};
