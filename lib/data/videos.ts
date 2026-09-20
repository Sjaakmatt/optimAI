/**
 * De videobibliotheek van de site.
 *
 * Tot voor kort stond deze lijst hier hardgecodeerd: een nieuwe video kostte
 * een commit en een deploy. De bron van waarheid is nu het FactumAI-dashboard
 * (`/agency/marketing/videos`), dat ze via een publieke, cachebare route
 * uitlevert. Sjaak uploadt en rangschikt daar; de site pikt het binnen een paar
 * minuten op.
 *
 * De oude lijst staat hieronder als **fallback**. Dat is geen dode code: is het
 * dashboard onbereikbaar of de bibliotheek nog leeg, dan toont de site gewoon
 * de video's die in `public/videos` staan, in plaats van een lege pagina.
 */

export type SiteVideo = {
  id: string;
  title: string;
  /** Weergavenaam van de rubriek; `null` = video zonder categorie. */
  category: string | null;
  /** URL-sleutel van de rubriek, voor het filter op /videos. */
  categorySlug: string | null;
  /** "1:38" — leeg als de duur onbekend is. */
  duration: string;
  src: string;
  poster: string | null;
  description: string | null;
  /** Meelopen in de carrousel op de homepage. */
  uitgelicht: boolean;
};

export type VideoCategorie = {
  naam: string;
  slug: string;
};

/** Zelfde venster als `revalidate` op de dashboardroute — houd ze gelijk. */
const REVALIDATE_SECONDS = 300;

/** "98" → "1:38". */
function formatteerDuur(seconden: number | null): string {
  if (seconden === null || !Number.isFinite(seconden) || seconden <= 0) return "";
  const m = Math.floor(seconden / 60);
  const s = Math.floor(seconden % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const FALLBACK_VIDEOS: SiteVideo[] = [
  {
    id: "kennismaken",
    title: "De bouwer achter uw systemen.",
    category: "Even kennismaken",
    categorySlug: "even-kennismaken",
    duration: "1:38",
    src: "/videos/kennismaken.mp4",
    poster: "/videos/kennismaken-cover.jpg",
    description: null,
    uitgelicht: true,
  },
  {
    id: "mail-automation",
    title: "Uw mailbox, ondersteund door een agent.",
    category: "In de praktijk",
    categorySlug: "in-de-praktijk",
    duration: "0:59",
    src: "/videos/mail-automation.mp4",
    poster: "/videos/mail-automation-cover.jpg",
    description: null,
    uitgelicht: true,
  },
  {
    id: "audit-pilots",
    title: "Begin met het juiste proces.",
    category: "Van idee naar uitvoering",
    categorySlug: "van-idee-naar-uitvoering",
    duration: "0:52",
    src: "/videos/audit-pilots.mp4",
    poster: "/videos/audit-pilots-cover.jpg",
    description: null,
    uitgelicht: true,
  },
  {
    id: "ai-angst",
    title: "AI ondersteunt. AI vervangt niks.",
    category: "Nuchter over AI",
    categorySlug: "nuchter-over-ai",
    duration: "0:58",
    src: "/videos/ai-angst.mp4",
    poster: "/videos/ai-angst-cover.jpg",
    description: null,
    uitgelicht: true,
  },
];

/**
 * Vorm die het dashboard teruggeeft (`/api/v1/public/site-videos`).
 * Dit is het koppelvlak tussen de twee repo's — wijzig het hier niet los van
 * `src/lib/site-videos/queries.ts::listPublishedVideos()` daar.
 */
type DashboardAntwoord = {
  videos?: Array<{
    id?: unknown;
    titel?: unknown;
    slug?: unknown;
    omschrijving?: unknown;
    durationSec?: unknown;
    src?: unknown;
    poster?: unknown;
    uitgelicht?: unknown;
    categorie?: { naam?: unknown; slug?: unknown } | null;
  }>;
  categorieen?: Array<{ naam?: unknown; slug?: unknown }>;
};

function tekst(waarde: unknown): string | null {
  return typeof waarde === "string" && waarde.trim() ? waarde : null;
}

/**
 * Zet het antwoord om naar de vorm die de componenten gebruiken, en gooit weg
 * wat onbruikbaar is. Een video zonder `src` is geen video; die overslaan is
 * beter dan een kaart die bij het aanklikken niets doet.
 */
function normaliseer(payload: DashboardAntwoord): SiteVideo[] {
  return (payload.videos ?? []).flatMap((rauw) => {
    const src = tekst(rauw.src);
    const title = tekst(rauw.titel);
    if (!src || !title) return [];

    return [
      {
        id: tekst(rauw.slug) ?? tekst(rauw.id) ?? src,
        title,
        category: tekst(rauw.categorie?.naam),
        categorySlug: tekst(rauw.categorie?.slug),
        duration: formatteerDuur(
          typeof rauw.durationSec === "number" ? rauw.durationSec : null,
        ),
        src,
        poster: tekst(rauw.poster),
        description: tekst(rauw.omschrijving),
        uitgelicht: rauw.uitgelicht === true,
      } satisfies SiteVideo,
    ];
  });
}

/** Rubrieken afleiden uit de video's zelf, met behoud van hun volgorde. */
function categorieenUit(videos: SiteVideo[]): VideoCategorie[] {
  const gezien = new Map<string, VideoCategorie>();
  for (const video of videos) {
    if (video.category && video.categorySlug && !gezien.has(video.categorySlug)) {
      gezien.set(video.categorySlug, {
        naam: video.category,
        slug: video.categorySlug,
      });
    }
  }
  return [...gezien.values()];
}

let gewaarschuwd = false;

/**
 * Haalt de bibliotheek op bij het dashboard. Faalt dat — geen env, dashboard
 * plat, database die hikt — dan komt de fallback terug. Er staat bewust geen
 * `throw` in: een haperend dashboard hoort de publieke site niet om te trekken.
 */
export async function getVideos(): Promise<{
  videos: SiteVideo[];
  categorieen: VideoCategorie[];
  bron: "dashboard" | "fallback";
}> {
  const basis = process.env.FACTUMAI_DASHBOARD_URL?.replace(/\/+$/, "");

  if (basis) {
    try {
      const res = await fetch(`${basis}/api/v1/public/site-videos`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const videos = normaliseer((await res.json()) as DashboardAntwoord);
        // Een lege bibliotheek is geen fout, maar wél een reden om de oude
        // video's te blijven tonen: anders is /videos leeg zodra iemand in het
        // dashboard de laatste video op Concept zet.
        if (videos.length > 0) {
          return {
            videos,
            categorieen: categorieenUit(videos),
            bron: "dashboard",
          };
        }
      } else if (!gewaarschuwd) {
        gewaarschuwd = true;
        console.warn(
          `[videos] dashboard gaf status ${res.status}, oude lijst gebruikt`,
        );
      }
    } catch (error) {
      if (!gewaarschuwd) {
        gewaarschuwd = true;
        console.warn("[videos] dashboard niet bereikbaar, oude lijst gebruikt", error);
      }
    }
  }

  return {
    videos: FALLBACK_VIDEOS,
    categorieen: categorieenUit(FALLBACK_VIDEOS),
    bron: "fallback",
  };
}
