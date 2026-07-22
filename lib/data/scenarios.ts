import type { DemoEvent } from '@/lib/types';

// De klantenservice van Vonk (online woonwinkel) krijgt de hele dag vragen
// binnen over drie kanalen: de live chat op vonk.nl, de e-mailinbox en social
// (Instagram/Facebook). Elk scenario laat zien hoe de agents de interne
// systemen raadplegen — ERP/ordersysteem, de vervoerder voor track & trace,
// de PIM-productdatabase en de betaalprovider — voordat ze antwoorden.

export const SCENARIOS: DemoEvent[] = [
  {
    id: 's1',
    scriptId: 'script_chat_wismo',
    type: 'chat.wismo',
    label: 'Website-chat — Waar blijft mijn bestelling?',
    context: 'Klant wacht al 5 dagen op een hanglamp, vraagt het na in de live chat',
    channel: 'chat',
    from: 'Chat · Sanne de Wit',
    body: [
      'Hoi! Ik heb vorige week een hanglamp besteld (order VNK-2026-08841) maar ik heb nog niets ontvangen.',
      'Kunnen jullie kijken waar die blijft? Ik zou hem dit weekend graag ophangen.',
    ],
    extra: [
      { label: 'Order', value: 'VNK-2026-08841 · besteld 17 juli · Hanglamp Fenn zwart' },
      { label: 'Klanthistorie', value: '4 orders sinds 2024 · 0 klachten' },
      { label: 'Kanaal', value: 'Live chat vonk.nl · 14:12' },
    ],
    payload: {
      klant: 'Sanne de Wit',
      order: 'VNK-2026-08841',
      artikel: 'Hanglamp Fenn zwart',
      kanaal: 'website-chat',
    },
    timestamp: 0,
  },
  {
    id: 's2',
    scriptId: 'script_mail_return',
    type: 'mail.return',
    label: 'E-mail — Retour beschadigd servies',
    context: 'Serviesset aangekomen met 2 gebroken borden, klant wil het opgelost',
    channel: 'email',
    from: 'Mark Bosma · m.bosma@ziggo.nl',
    subject: 'Beschadigd servies — order VNK-2026-08790',
    body: [
      'Beste Vonk,',
      'Gisteren is mijn serviesset (order VNK-2026-08790) bezorgd, maar bij het uitpakken bleken twee borden gebroken. Ik heb foto\'s bijgevoegd.',
      'Vervelend, want het was een cadeau. Kunnen jullie twee nieuwe borden sturen, of anders het bedrag terugstorten?',
      'Groet, Mark',
    ],
    extra: [
      { label: 'Order', value: 'VNK-2026-08790 · bezorgd 21 juli · Serviesset Aare 16-delig' },
      { label: 'Klanthistorie', value: '7 orders sinds 2022 · 0 eerdere klachten' },
      { label: 'Toon', value: 'Teleurgesteld maar netjes' },
    ],
    payload: {
      klant: 'Mark Bosma',
      order: 'VNK-2026-08790',
      probleem: '2 van de 16 borden gebroken aangekomen',
      toon: 'teleurgesteld maar netjes',
    },
    timestamp: 0,
  },
  {
    id: 's3',
    scriptId: 'script_social_complaint',
    type: 'social.complaint',
    label: 'Social — Publieke klacht op Instagram',
    context: 'Openbare reactie onder een post: 8 dagen wachten en geen enkel bericht',
    channel: 'social',
    from: 'Instagram · @merel.woont',
    body: [
      '@vonk nu al 8 dagen wachten op mijn bestelling en helemaal niks gehoord. Betaald is wél meteen gelukt 🙄',
      'Kan iemand me eindelijk vertellen waar mijn pakket is??',
    ],
    extra: [
      { label: 'Zichtbaarheid', value: 'Openbare reactie · account 11.4k volgers' },
      { label: 'Gekoppelde order', value: 'VNK-2026-08712 · besteld 14 juli' },
      { label: 'Toon', value: 'Boos en publiek — reputatierisico' },
    ],
    payload: {
      klant: '@merel.woont',
      order: 'VNK-2026-08712',
      probleem: 'geen update na 8 dagen, publiek geuit',
      kanaal: 'instagram',
    },
    timestamp: 0,
  },
  {
    id: 's4',
    scriptId: 'script_mail_product',
    type: 'mail.product',
    label: 'E-mail — Vraag over eettafel',
    context: 'Maatvoering en materiaal van de eettafel Sunde, en of die leverbaar is',
    channel: 'email',
    from: 'Julia Vermeer · julia.vermeer@outlook.com',
    subject: 'Past de eettafel Sunde in mijn ruimte?',
    body: [
      'Hallo,',
      'Ik twijfel over de eettafel Sunde. Mijn eethoek is ongeveer 2,20 meter breed. Passen daar zes stoelen omheen bij deze tafel?',
      'En waar is het blad van gemaakt — is dat massief hout of fineer? Ik wil hem graag volgende week in gebruik nemen, dus is hij op voorraad?',
      'Alvast bedankt, Julia',
    ],
    extra: [
      { label: 'Interesse', value: 'Eettafel Sunde 220 cm · eiken' },
      { label: 'Type vraag', value: 'Aankoopvraag met omzetkans' },
      { label: 'Klant', value: 'Nog geen bestelling · nieuwsbrief-inschrijving' },
    ],
    payload: {
      klant: 'Julia Vermeer',
      product: 'Eettafel Sunde 220 cm',
      vraag: 'maatvoering, materiaal en beschikbaarheid',
    },
    timestamp: 0,
  },
  {
    id: 's5',
    scriptId: 'script_chat_address',
    type: 'chat.address',
    label: 'Website-chat — Bezorgadres wijzigen',
    context: 'Klant bestelde vanochtend, wil de levering naar het werkadres',
    channel: 'chat',
    from: 'Chat · Thomas Peters',
    body: [
      'Hey, ik heb vanochtend een wandplank besteld (VNK-2026-08918).',
      'Ik ben overdag niet thuis — kan het pakket naar mijn werkadres in plaats van huis? Het is nog niet verzonden hoop ik.',
    ],
    extra: [
      { label: 'Order', value: 'VNK-2026-08918 · besteld vandaag 09:04 · Wandplank Rise eiken' },
      { label: 'Status', value: 'Betaald · nog niet verzonden' },
      { label: 'Kanaal', value: 'Live chat vonk.nl · 10:47' },
    ],
    payload: {
      klant: 'Thomas Peters',
      order: 'VNK-2026-08918',
      verzoek: 'bezorgadres wijzigen naar werkadres',
      kanaal: 'website-chat',
    },
    timestamp: 0,
  },
  {
    id: 's6',
    scriptId: 'script_social_restock',
    type: 'social.restock',
    label: 'Social — DM: komt dit terug op voorraad?',
    context: 'Instagram-DM over het uitverkochte vloerkleed Vinga',
    channel: 'social',
    from: 'Instagram · @home.by.lot',
    body: [
      'Hoi! Het vloerkleed Vinga (160x230, oker) is overal uitverkocht 😍 komt die nog terug?',
      'Zo ja, wanneer ongeveer? Dan wacht ik daar wel op.',
    ],
    extra: [
      { label: 'Interesse', value: 'Vloerkleed Vinga 160×230 · oker' },
      { label: 'Status artikel', value: 'Uitverkocht in webshop' },
      { label: 'Kanaal', value: 'Instagram · DM' },
    ],
    payload: {
      klant: '@home.by.lot',
      product: 'Vloerkleed Vinga 160x230 oker',
      vraag: 'verwachte herbevoorrading',
      kanaal: 'instagram-dm',
    },
    timestamp: 0,
  },
  {
    id: 's7',
    scriptId: 'script_mail_payment',
    type: 'mail.payment',
    label: 'E-mail — Twee keer afgeschreven',
    context: 'Klant ziet twee afschrijvingen voor één bestelling en wil geld terug',
    channel: 'email',
    from: 'Priya Nair · priya.nair@gmail.com',
    subject: 'Dubbel betaald voor order VNK-2026-08902',
    body: [
      'Beste klantenservice,',
      'Ik heb gisteren een bijzettafel besteld (VNK-2026-08902). Op mijn rekening zie ik nu twee afschrijvingen van € 149 voor dezelfde order.',
      'Ik neem aan dat er iets misging bij het betalen? Kunnen jullie er één terugstorten? Ik zie het graag bevestigd.',
      'Met vriendelijke groet, Priya Nair',
    ],
    extra: [
      { label: 'Order', value: 'VNK-2026-08902 · € 149 · Bijzettafel Lume walnoot' },
      { label: 'Klanthistorie', value: '2 orders sinds 2025 · nette betaler' },
      { label: 'Signaal', value: 'Betaalvraag — snel en zeker afhandelen' },
    ],
    payload: {
      klant: 'Priya Nair',
      order: 'VNK-2026-08902',
      probleem: 'twee afschrijvingen van € 149 voor één order',
      bedrag: 149.0,
    },
    timestamp: 0,
  },
  {
    id: 's8',
    scriptId: 'script_review_negative',
    type: 'review.negative',
    label: 'Review — 2 sterren over verpakking',
    context: 'Nieuwe review op het reviewplatform: slordige verpakking, deukje in de kast',
    channel: 'system',
    from: 'Reviewplatform · automatische melding',
    subject: '2-sterrenreview · order VNK-2026-08655',
    body: [
      'Nieuwe review binnengekomen (2 van 5 sterren) voor order VNK-2026-08655.',
      'Reviewtekst: "Mooi kastje, maar de doos was helemaal ingedeukt en er zat een deukje in de zijkant. Voor dit geld verwacht ik betere verpakking."',
      'Klantprofiel: 5 eerdere bestellingen, nooit eerder een lage beoordeling. Beleidsregel #sal-2 schrijft bij 1–2 sterren persoonlijk contact met een herstelaanbod voor.',
      'Aanbevolen: persoonlijke, openbare reactie + herstelaanbod voorbereiden.',
    ],
    extra: [
      { label: 'Beoordeling', value: '2 van 5 sterren · openbaar zichtbaar' },
      { label: 'Order', value: 'VNK-2026-08655 · Ladekast Norra 3-laden' },
      { label: 'Klanthistorie', value: '5 orders sinds 2023 · eerste lage review' },
    ],
    payload: {
      klant: 'H. Willemsen',
      order: 'VNK-2026-08655',
      probleem: 'ingedeukte verpakking en licht beschadigde kast',
      sterren: 2,
    },
    timestamp: 0,
  },
];

export const SCENARIO_BY_ID = SCENARIOS.reduce<Record<string, DemoEvent>>((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});
