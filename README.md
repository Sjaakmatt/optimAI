# FactumAI · De Werkbank

Een digitale werkbank voor MKB-operatie. Gebaseerd op een fictieve bouwmaterialengroothandel (**Nordveld**). Wanneer er een event binnenkomt — order, klacht, offerte-aanvraag — pakken meerdere afdelingen het op: data wordt opgezocht, beleid wordt toegepast, en alle documenten verschijnen zichtbaar op de werkbank: mails, facturen, belnotities, offertes, pakbonnen, voorraad-mutaties, transportplannen, agenda-items.

Live cockpit-strip bovenaan telt mee terwijl het werk loopt: orders, voorraad-mutaties, ritten, mails, omzet.

**Volledig gescript. Geen externe API calls. Werkt offline.**

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Één scherm

De demo draait op één pagina. Geen dashboard-route, geen policy-route, geen tabs.

- **Cockpit-strip** — bovenaan, vijf realtime tellers (orders / voorraad-mutaties / ritten / mails / omzet) die mee-animeren met het werk.
- **Werkbank** — centraal gebied: werkbon → dossier-strip → check-cards → reasoning-regels → artefacten.
- **Vandaag-paneel** — rechtsonder; drie regels met afgehandeld / bespaard / €.
- **Beleidsregels** — tandwiel rechtsboven opent een slide-over met policies per afdeling.
- **↻-menu** — modus-toggle (Handmatig / Autonoom) + reset.
- **Statusstrip** — onderaan, rustig; laat zien wie er nu bezig is.

## Wat ziet de klant

Per event:
1. **Werkbon** verschijnt met klantvraag.
2. **Dossier-strip** vult zich met afdelingen die meedoen.
3. **Check-cards** verschijnen wanneer er data wordt opgezocht of beleid toegepast (klantdossier, voorraad, krediet, transport-log, beleid #xxx).
4. **Reasoning-regels** tonen de korte besluiten ("we kiezen Rockwool ondanks € 144 prijsverschil — tijd weegt zwaarder").
5. **Artefacten** vouwen open en vullen zich regel voor regel: mails, facturen, pakbonnen, voorraad-mutaties, transportplannen, agenda-items, belnotities.
6. Elke artefact toont **wie het schreef** (byline) + heeft een **"waarom?"** uitklap voor reasoning.

## De 8 scenario's

| # | Event | Wat er gebeurt |
|---|---|---|
| 1 | Order — Bouwbedrijf Jansma | Kredietcheck → 3× voorraadcheck → orderbevestiging → voorraadmutatie → Rockwool-bestelling → pakbon → transportplan → klant-email → concept-factuur |
| 2 | Offerte — Gemeente Hoorn | Klant- en project-historie → leveranciersprijzen → marge-beleid → 7-regel offerte → begeleidende mail → directie-akkoord-agenda |
| 3 | Klacht — Aannemer De Boer | Klantdossier + beleid → transport-log → klant-email → creditnota → voorraad-reservering → transportplan-update → CRM-memo voor sales |
| 4 | Voorraadsignaal — Isolatiewol | Verbruiksanalyse → leveranciersvergelijking → memo → inkoop-email → voorraad-mutatie (in transit) → ontvangst-agenda magazijn |
| 5 | Vertraging — Saint-Gobain | Impact-analyse → eigen voorraad-check → 2× klant-email → voorraad-reservering → incident-memo → gesplitst transportplan |
| 6 | Vraag — Schilder Visser | Productdatabase → 2× voorraadcheck → klant-email → follow-up-agenda → CRM-notitie |
| 7 | Factuur overdue — Molenaar | Klantdossier + krediet → beleid persoonlijk contact → belnotitie voor finance → agenda-item → hold-memo → heads-up sales |
| 8 | Verzending — A7 | Rit-analyse → mandaat-check Bakker → opdracht-memo → herplant transportplan → 3× klant-email → WhatsApp Bolsward |

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · motion · lucide-react.

Geen backend, geen database, geen auth. Alles draait client-side.

---

## Demo-script voor een sales-gesprek

**Setup (20 sec):** laptop open, `/` pagina. Alles rustig en wit. *"Dit is de werkbank. Hier komt al het werk langs dat normaal bij uw mensen op het bureau komt."*

**Scene 1 — Klacht (90 sec).**
Trigger scenario 3. *"Stel, er komt een klacht binnen."* — werkbon verschijnt. *"Klantservice pakt 'm op."* — mail-artefact vouwt open. Laat de mail zin-voor-zin verschijnen. *"Dit is de daadwerkelijke mail die de klant krijgt. Toon, inhoud, excuses, oplossing — alles erin."*
Als de creditnota eronder verschijnt: *"En hier, de creditnota staat ook al klaar. Normaal: twee afdelingen, minstens een halve dag. Nu: drie minuten."*

**Scene 2 — Offerte (60 sec).**
Trigger scenario 2. Offerte-artefact verschijnt. *"Een aanbesteding van de Gemeente. Kijk mee hoe de offerte wordt opgebouwd, regel voor regel, met de juiste marge op basis van actuele inkoopprijzen."* Wijs onderaan: *"En als het boven uw mandaat zit — hier: 'wacht op akkoord directie'. U houdt de knoppen."*

**Scene 3 — Molenaar (belnotitie, 60 sec).**
Trigger scenario 7. Belnotitie-artefact verschijnt. *"Dit is anders. Factuur van 42 dagen oud. Daar stuurt geen automaat een boze herinnering op — die bereidt een belnotitie voor Saskia op finance. Klantgeschiedenis erbij, toon-advies, openingsvraag. Saskia hoeft alleen nog maar te bellen."*

**Scene 4 — Policies (40 sec).**
Klik tandwiel rechtsboven. Slide-over opent. *"Per afdeling stelt u in: wat mag ze zelf, wat komt langs u."* Toggle één iets. *"Klaar. Vanaf het volgende moment past ze zich aan."*

**Close (30 sec).**
Wijs op Vandaag-panel rechtsonder. *"X minuten bespaard vandaag. € Y aan werktijd. Die getallen worden bij u straks geen demo meer, maar uw maandrapport."*

**Totaal: ~5 minuten.** Rustig, zonder overbluffen.

---

## Projectstructuur

```
app/
  page.tsx             enige route — de Werkbank
  layout.tsx           fonts (Fraunces, Lora, IBM Plex Mono)
  globals.css          papier-palet + design tokens
components/
  Workbench.tsx        shell: header, stage, completed list, status strip
  WorkbenchHeader.tsx  kop met merknaam + tandwiel + reset
  ActiveTicket.tsx     werkbon-kaart bovenaan
  PickupLine.tsx       "wordt opgepakt door X" tussenregel
  StatusStrip.tsx      onderste regel met wie er werkt
  TodayPanel.tsx       klein paneel met afgehandeld/bespaard/€
  CompletedList.tsx    inklapbare lijst van vandaag afgehandeld
  EventTrigger.tsx     dropdown met 8 scenarios
  FloatingTrigger.tsx  zwevende trigger als er al iets liep
  PolicyPanel.tsx      slide-over met beleidsregels per agent
  artifacts/
    ArtifactStage.tsx      dispatcher per artefact-type
    EmailArtifact.tsx      mail-artefact
    InvoiceArtifact.tsx    factuur/creditnota
    CallNoteArtifact.tsx   belnotitie (gele notitie)
    OrderConfirmationArtifact.tsx
    InternalMemoArtifact.tsx
    QuoteArtifact.tsx
    WhatsAppThreadArtifact.tsx
lib/
  agents/definitions.ts  agent-definities + default policies
  data/
    scenarios.ts         8 triggers (label + context + payload)
    scripts.ts           index van 8 scripts
    scripts/             één file per scenario
    mockHistory.ts       baseline ROI
  store.ts               Zustand + step-based playback
  types.ts               StepKind, ArtifactType, Artifact, etc.
  utils.ts               formatters, sleep, uid
public/paper-grain.svg   zachte papier-vezel overlay
```

## Tips

- **Scripts aanpassen?** Elk scenario heeft z'n eigen file in `lib/data/scripts/`. Open één, pas een paragraaf aan, klaar.
- **Toon / stijl van een mail?** Alle tekst staat in die scenario-files — geen template-engine, gewoon Nederlands.
- **Policies** blijven via `localStorage` bewaard tussen refreshes.
- **Reset-knop** rechtsboven gooit werkbon, artefacten en Vandaag-teller schoon.
