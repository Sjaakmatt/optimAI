# FactumAI · Control Room

Een multi-agent demo voor sales-gesprekken. Simuleert de operatie van een fictieve MKB-groothandel (**Nordveld Groothandel**) met één orchestrator en zeven gespecialiseerde sub-agents.

**Volledig gescript. Geen externe API calls. Werkt offline.**

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Schermen

- **`/` — Control Room.** Events-feed, netwerkvisualisatie, live reasoning stream, ROI-teller.
- **`/dashboard` — KPI’s.** Uren bespaard, taken, € equivalent, charts per agent.
- **`/policy` — Policy editor.** Guardrails per agent aan/uit zetten (blijft bewaard in localStorage).

## Modes

- **Handmatig** — jij kiest via “Trigger” welk scenario speelt.
- **Autonoom** — elke 15–25 seconden komt er automatisch een nieuw event binnen.

## De 8 scenario’s

1. Nieuwe order Bouwbedrijf Jansma
2. Offerteaanvraag Gemeente Hoorn (aanbesteding)
3. Klacht Aannemer De Boer (beschadigde levering)
4. Voorraad laag — Isolatiewol 100mm
5. Leverancier vertraging — Saint-Gobain
6. Technische vraag brandwerende platen
7. Factuur overdue — Klusbedrijf Molenaar
8. Verzending probleem — ongeluk A7

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · motion · recharts · lucide-react.

Geen backend, geen database, geen auth. Alles draait client-side.

---

## Demo-script voor een klantgesprek

**Setup (30 sec):** open laptop, `/` pagina. Mode op **Handmatig**. Reset een keer voor een schone start.

**Act 1 — “Zo ziet uw organisatie er straks uit” (1 min).**
Wijs op het netwerk. *“Dit zijn uw afdelingen. In het midden de orchestrator — dat is geen agent die werk doet, die verdeelt werk. Eromheen: sales, inkoop, voorraad, orders, facturatie, klantservice, verzending.”*

**Act 2 — “Nieuwe order” (90 sec).**
Trigger scenario 1. Laat het lopen en lees mee. Wijs daarna op de ROI-teller: *“Hier: 54 minuten menselijk werk bespaard in één order. Dit kostte normaal een halve ochtend bij drie mensen.”*

**Act 3 — “Wat als er iets fout gaat?” (90 sec).**
Trigger scenario 3 (klacht De Boer). *“Let op hoe de agent de toon oppikt, de transport-log checkt, maar toch kiest voor coulance omdat dit een trouwe klant is.”* Wijs op de laatste regel: *“Dát is waar het verschil zit met domme automatisering.”*

**Act 4 — “Maar u houdt de knoppen” (60 sec).**
Ga naar `/policy`. Open Orders. Zet een regel uit. *“U bepaalt wat automatisch gaat en wat langs u komt. De agent past zich aan.”*

**Act 5 — “Dit gaat de hele dag door” (60 sec).**
Terug naar `/`, schakel naar **Autonoom**. Laat 1–2 events binnenkomen. *“Dit loopt ook als u thuis bent, ook om 23:00, ook in het weekend.”*

**Close (30 sec).**
Naar `/dashboard`. *“Dit is fictieve data, maar de formule is reëel: €29,57 per uur MKB-loon. Bij ú worden dit straks echte cijfers.”*

**Totaal: 6–7 minuten.** Dan is het tijd voor hún verhaal.

---

## Projectstructuur

```
app/                Next.js pages (Control Room, Dashboard, Policy)
components/         UI componenten
  ui/               primitives (Button, Toggle, ModeSwitch)
lib/
  agents/           agent definities + default policies
  data/             scenarios, scripts, mock history
  store.ts          Zustand + playScript engine
  types.ts          type definities
  utils.ts          sleep, formatters
public/grain.svg    subtiele noise overlay
```

## Tips

- **Reset-knop** in de TopBar gooit alle messages, events en ROI schoon (policies blijven via localStorage bewaard).
- **Scripts aanpassen?** Alle tekst staat in `lib/data/scripts.ts`. Een regel aanpassen = één file wijzigen.
- Timing (denk-pauzes, typesnelheid, leesteken-pauzes) staat in `lib/store.ts` → `playScript`.
