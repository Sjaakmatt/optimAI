# design-sync notes (FactumAI site)

Repo-specific gotchas for syncing this Next.js app to claude.ai/design. Read before every sync.

## Shape and build
- This is a Next.js 15 app, not a component library: no `dist/`, no `.d.ts`, no Storybook. Package shape with an explicit entry (`.design-sync/entry.ts`) listing the synced components; keep it in step with the scope.
- `buildCmd` (`node .design-sync/build.mjs`) compiles Tailwind v4 CSS (`app/globals.css` + `app/home.css` via `.design-sync/ds-styles.css`) into `.design-sync/.cache/compiled.css` and emits `.d.ts` files with `tsc` into `types/` plus a root `index.d.ts` re-export (both gitignored). The converter reads `<repo>/index.d.ts` because package.json has no `types` field. tsc reports 4 pre-existing app type errors (`window.gtag`); declarations still emit.
- Next-only modules are shimmed via `.design-sync/tsconfig.json` paths: `next/link` -> `<a>`, `next/image` -> `<img>` (root-relative `src` is prefixed with `https://factumai.nl`), `next/navigation` (`usePathname` from `window.location`), `next/dynamic` (React.lazy). `lib/data/scripts` exists both as a file and a directory: the exact alias rule for it must come before `@/*`.
- `process.env.NEXT_PUBLIC_*` is read at module level in `lib/analytics/gtag.ts` and `components/booking/config.ts`; `.design-sync/shims/process-env.ts` (first import of the entry) defines an empty `process.env` so the bundle loads outside Next.
- Fonts: Geist and IBM Plex Mono come from `next/font/google` in the app; for the sync the latin woff2 files live in `.design-sync/fonts/` (SIL OFL, fetched from Google Fonts, user-approved) with `--font-geist` / `--font-plex-mono` defined in `ds-styles.css`.
- Guidelines: only `docs/immersive-redesign.md` and `docs/redesign-plan.md` are design guidance; the other `docs/*.md` are project/SEO plans and are excluded via `guidelinesGlob`.

## Rendering
- The whole style leans on `html, body { background: var(--bg); color: var(--fg) }`. The card template forces a white body, so `SiteDoek` (`.design-sync/shims/SiteDoek.tsx`, exported from the entry) is the `cfg.provider`: it wraps every card cell in the dark ground. Designs must do the same (wrap in `SiteDoek` or set the root background).
- `SiteDoek` is grouped via its doc stub category (`.design-sync/docs/SiteDoek.md`); pinning its src path would put it under a `shims` group. Same mechanism regroups `MailAgent` (dir name == component name -> `general` otherwise).
- Responsive breakpoints are viewport-based: a cell constrained to 390px still gets `lg:`/`md:` styles. Don't author "mobile" cells by narrowing a wrapper.
- State reachable only by a click (TerugbelKaart's form) is shown by an effect that clicks the button after mount; see `.design-sync/previews/TerugbelKaart.tsx`.
- Previews may import repo data through the `@/` alias (e.g. `CASES` from `@/lib/data/cases`); the preview compiler uses the same tsconfig paths.
- Hooks exported from the entry (e.g. `useMuisParallax`) are on `window.FactumAI` and importable from `'factumai-demo'` in previews.

- Logostrook renders a plain `<img src="/pavo-hr.svg">` (not next/image); the next-image shim installs a capture-phase `error` listener that retries root-relative `<img>` sources once from `https://factumai.nl`. Previews may also pass full URLs.
- Only utilities that occur in repo sources OR in the `@source inline(...)` safelist in `ds-styles.css` compile; a class outside that set is a silent no-op. Check with `grep -c -F '.pt-32' ds-bundle/_ds_bundle.css` and extend the safelist rather than the preview.
- `SiteHeader` is sticky in-flow (reserves its own height). `SectieOnthulling` (mounted by `SitePage` when `lucht`) hides `main > section`s that start below the viewport until they intersect and toggles `js-onthul` on `<html>`: keep SitePage preview sections near the top.
- Capture is per cell at a fixed 900x700 (`fullPage:false`); tall compositions need `overrides.<Name>.viewport` (SiteFooter 1280x1000, SitePage 1280x1400) and are re-keyed for grading when it changes.
- States that need a server response (ContactForm submit/result, TerugbelKaart submit, chat replies, agenda availability) are not previewed.

## Playwright
- The container caches chromium-1194 at `/opt/pw-browsers`; that build is pinned by `playwright@1.56.0` (installed in `.ds-sync/`). The repo's own `@playwright/test` 1.62 pins a different build and does not work with the cache.

## Known render warns
(none yet)

## Re-sync risks
- `ASSET_BASE` in `.design-sync/shims/next-image.tsx` hard-codes `https://factumai.nl`; images in cards and designs load from the live site. If the domain or `public/` paths change, cards silently lose images.
- `.design-sync/entry.ts` is a hand-maintained scope list: a new component under `components/` is not synced until it is added there (and re-exported names must stay PascalCase).
- Fonts are a snapshot of Google Fonts' latin subset; a font change in `app/layout.tsx` needs a manual refresh of `.design-sync/fonts/`.
- The sandbox proxy's TLS certificate is not trusted by headless Chromium, so image loads from factumai.nl fail during local capture; graded sheets show image areas empty unless the CA is trusted (see the capture notes below).
