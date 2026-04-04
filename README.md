# FactimAI Website

Next.js landingspagina voor FactumAI — AI procesoptimalisatie voor MKB.

## Setup

### 1. Installeer dependencies
```bash
npm install
```

### 2. Environment variabelen
Kopieer `.env.local.example` naar `.env.local` en vul in:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx   # van resend.com
CONTACT_EMAIL=jouw@email.nl          # jouw e-mailadres
```

### 3. Resend instellen
1. Maak een account op [resend.com](https://resend.com)
2. Voeg je domein toe en verifieer het
3. Genereer een API key
4. Pas de `from` e-mail in `/app/api/contact/route.ts` aan naar jouw domein

### 4. Lokaal draaien
```bash
npm run dev
```

### 5. Deployen naar Vercel
```bash
npx vercel
```
Of koppel de GitHub repo in het Vercel dashboard.
Voeg de environment variabelen toe in Vercel > Project > Settings > Environment Variables.

## Aanpassen

| Wat | Waar |
|-----|------|
| Naam / branding | `components/Navbar.tsx`, `components/Footer.tsx`, `app/layout.tsx` |
| Hero tekst | `components/Hero.tsx` |
| Problemen | `components/Problem.tsx` |
| Processen lijst | `components/Processes.tsx` |
| Over mij tekst | `components/About.tsx` |
| Foto | `components/About.tsx` — vervang de placeholder div |
| Kleuren | `app/globals.css` — CSS variabelen bovenaan |

## Structuur
```
/app
  layout.tsx
  page.tsx
  globals.css
  /api/contact/route.ts
/components
  Navbar.tsx
  Hero.tsx
  Problem.tsx
  HowItWorks.tsx
  Processes.tsx
  About.tsx
  ContactForm.tsx
  Footer.tsx
```
