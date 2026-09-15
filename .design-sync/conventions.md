## FactumAI site conventions (read before composing)

**This is the factumai.nl marketing site, not a generic kit.** Dutch UI, one dark theme only: slate-grey ground, warm-white text, soft copper accent. Every component assumes that ground.

### 1. Ground first
Wrap each page (or each design root) in `SiteDoek` (`vol` for a full page), or give the root `style={{ background: 'var(--bg)', color: 'var(--fg)' }}`. Without it the components render on white and their warm-white text disappears. There is no theme provider, no router: links are plain anchors (`href`), images are plain `<img>`; `SiteHeader`, `SiteFooter` and `SitePage` (header + footer + main around `children`) are the page chrome.

Fonts ship in `fonts/fonts.css`: body text is Geist (inherited from the ground), headings add `font-display` (Geist 500, tight tracking), small labels use `eyebrow` or `font-mono` (IBM Plex Mono).

### 2. Styling idiom: named site classes + tokens + a precompiled Tailwind set
Use, in this order of preference:

- **Site classes** (all in `_ds_bundle.css`): `band` (page container, max 1180px), `eyebrow` (mono uppercase copper label), `chip` + `chip-punt` (pill tag with glowing dot), `knop` with `knop-primair` (white pill, the CTA), `knop-glas` (glass) or `knop-accent` (copper), `site-card` (glass card with hover glow), `venster` (dark product window), `lijn` (fading hairline), `ornament-divider`, `ink-highlight` (amber underline for a span), `lift-on-hover`, `drop-cap` (article lead), `artifact-card`.
- **Tokens** via `var(--*)`: ground `--bg`, `--bg-2`, `--bg-3`; layers `--surface`, `--surface-2`; lines `--border`, `--border-strong`; text `--fg`, `--fg-dim`, `--fg-faint`, `--fg-soft`; accent `--accent`, `--accent-text` (AA on the ground), `--accent-soft`, `--copper`, `--sage`; radii `--radius-sm` (8) `--radius` (14) `--radius-lg` (22) `--radius-pill`; shadows `--shadow-soft`, `--shadow-lift`, `--shadow-hover`. Legacy aliases `--paper*`, `--ink*`, `--oker*`, `--terra`, `--mos`, `--steen` point at the same colours and appear in older components.
- **Tailwind v4 utilities**, precompiled: layout (`flex`, `grid`, `grid-cols-1..6`, `md:grid-cols-2..4`, `items-center`, `justify-between`, `gap-1..12`), spacing (`p/px/py/m/mt/mb-0..32`, `space-y-*`), sizing (`w-full`, `max-w-xs..7xl`, `w-1/2`), type (`text-xs..7xl`, `font-medium/semibold`, `leading-tight/relaxed`, `tracking-tight`), radius/shadow (`rounded-lg..3xl`, `shadow-lg`), and the theme colours `text-ink`, `text-ink-dim`, `text-ink-faint`, `text-oker`, `text-oker-deep`, `text-terra`, `bg-paper`, `bg-paper-deep`, `bg-paper-warm`, `border-paper-edge`, plus token classes seen in the source such as `text-[var(--fg-dim)]`, `text-[var(--accent-text)]`, `bg-[var(--surface)]`, `border-[var(--border)]`. A Tailwind class outside this set does not exist in the stylesheet: fall back to inline `style` with the tokens.

Do not invent class names (BEM, `.btn`, `.card`) and do not restyle components with overrides; compose with their props and the classes above.

### 3. Where the truth lives
`styles.css` -> `_ds_bundle.css` (tokens in the `:root` block near the top, then the site classes, then the compiled utilities); `fonts/fonts.css`; per component `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`; visual direction in `guidelines/docs/immersive-redesign.md`.

### 4. Idiomatic page
```jsx
const { SitePage, Breadcrumbs, ContactForm } = window.FactumAI;
<SitePage>
  <div className="band pt-24 pb-20">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />
    <div className="eyebrow mt-8">Kennismaken</div>
    <h1 className="font-display mt-3 text-5xl leading-tight">Vertel wat u wilt automatiseren.</h1>
    <p className="mt-4 max-w-2xl text-lg text-[var(--fg-dim)]">We reageren binnen een werkdag.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="site-card p-6"><ContactForm /></div>
      <a href="/plan" className="knop knop-primair self-start">Plan een gesprek</a>
    </div>
  </div>
</SitePage>
```
