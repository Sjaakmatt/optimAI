"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import type { SiteVideo, VideoCategorie } from "@/lib/data/videos";
import { vergrendelScroll } from "@/lib/site/scrollLock";

/**
 * De video's komen sinds de koppeling met het dashboard als prop binnen in
 * plaats van uit een geïmporteerde array: ze worden op de server opgehaald (met
 * ISR) en hierheen doorgegeven. Deze component blijft puur weergave.
 */
export function VideoCarousel({
  videos,
  categorieen = [],
  library = false,
}: {
  videos: SiteVideo[];
  categorieen?: VideoCategorie[];
  library?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [categorie, setCategorie] = useState<string>("alle");
  const Heading = library ? "h1" : "h2";

  const visibleVideos = useMemo(
    () =>
      videos
        .map((video, index) => ({ video, index }))
        .filter(
          ({ video }) =>
            (categorie === "alle" || video.categorySlug === categorie) &&
            `${video.title} ${video.category ?? ""}`
              .toLocaleLowerCase("nl")
              .includes(query.trim().toLocaleLowerCase("nl")),
        ),
    [videos, query, categorie],
  );

  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [failed, setFailed] = useState(false);
  const measure = useCallback(() => {
    const el = rail.current;
    if (el)
      setEdges({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 3,
      });
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (active === null) return;
    const modal = dialog.current;
    if (!modal) return;
    modal.showModal();
    const unlock = vergrendelScroll();
    return () => {
      modal.close();
      unlock();
      trigger.current?.focus({ preventScroll: true });
    };
  }, [active]);

  function move(direction: number) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-video-card]");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left:
        direction *
        ((card?.offsetWidth ?? 300) +
          (parseFloat(getComputedStyle(el).columnGap) || 0)),
      behavior: reduced ? "instant" : "smooth",
    });
  }

  const clip = active === null ? null : (videos[active] ?? null);

  if (videos.length === 0) return null;

  return (
    <section
      className={`video-stories${library ? " video-library" : ""}`}
      aria-labelledby="video-heading"
    >
      <div className="band video-heading-row">
        <div>
          <p className="editorial-label">
            {library ? "Alle video’s" : "Social media video’s"}
          </p>
          <Heading id="video-heading">
            AI wordt helder
            <br />
            <em>door het te laten zien.</em>
          </Heading>
        </div>
        <div className="video-intro">
          <p>
            In de video’s vertellen we over het werk, de mogelijkheden en waar
            wij voor staan.
          </p>
          {!library && (
            <Link className="video-all" href="/videos">
              Alle video’s <ArrowRight size={17} />
            </Link>
          )}
          {!library && (
            <div className="video-arrows">
              <button
                onClick={() => move(-1)}
                disabled={edges.start}
                aria-label="Vorige video's"
              >
                <ArrowLeft size={19} />
              </button>
              <button
                onClick={() => move(1)}
                disabled={edges.end}
                aria-label="Volgende video's"
              >
                <ArrowRight size={19} />
              </button>
              <span>Scroll of swipe om te ontdekken</span>
            </div>
          )}
        </div>
      </div>
      {library && (
        <div className="band video-library-toolbar">
          <label>
            Zoek een video
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bijvoorbeeld: mailbox of AI"
            />
          </label>
          <p role="status">
            {visibleVideos.length}{" "}
            {visibleVideos.length === 1 ? "video" : "video’s"}
          </p>
        </div>
      )}
      {library && categorieen.length > 0 && (
        <div
          className="band video-filters"
          role="group"
          aria-label="Filter op categorie"
        >
          <button
            type="button"
            className="video-filter"
            aria-pressed={categorie === "alle"}
            onClick={() => setCategorie("alle")}
          >
            Alles
          </button>
          {categorieen.map((c) => (
            <button
              key={c.slug}
              type="button"
              className="video-filter"
              aria-pressed={categorie === c.slug}
              onClick={() => setCategorie(c.slug)}
            >
              {c.naam}
            </button>
          ))}
        </div>
      )}
      <div
        ref={rail}
        className={library ? "band video-library-grid" : "video-rail"}
        onScroll={measure}
        aria-label="Video's van Sjaak"
        tabIndex={library ? undefined : 0}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {visibleVideos.map(({ video, index: i }) => (
          <button
            key={video.id}
            data-video-card
            className="video-card"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setFailed(false);
              setActive(i);
            }}
            aria-label={
              video.duration
                ? `Speel video: ${video.title} (${video.duration})`
                : `Speel video: ${video.title}`
            }
          >
            {/* Een video zonder poster krijgt een egaal vlak in plaats van een
                gebroken afbeelding — posters zijn in het dashboard optioneel. */}
            {video.poster ? (
              <Image
                src={video.poster}
                alt=""
                fill
                sizes="(max-width: 767px) 78vw, 340px"
                className="video-poster"
              />
            ) : (
              <span className="video-poster video-poster-leeg" aria-hidden="true" />
            )}
            <span className="video-card-shade" />
            <span className="video-topline">
              <span>{String(i + 1).padStart(2, "0")} / IN GESPREK</span>
              {video.duration && <span>{video.duration}</span>}
            </span>
            <span className="video-play">
              <Play size={23} fill="currentColor" strokeWidth={1} />
            </span>
            <span className="video-card-copy">
              {video.category && <small>{video.category}</small>}
              <strong>{video.title}</strong>
              <span>
                Bekijk de video <ArrowRight size={15} />
              </span>
            </span>
          </button>
        ))}
      </div>
      {library && visibleVideos.length === 0 && (
        <p className="band video-empty">
          Geen video’s gevonden. Probeer een andere zoekterm of categorie.
        </p>
      )}
      {clip && (
        <dialog
          ref={dialog}
          className="video-dialog"
          aria-label={clip.title}
          onCancel={() => setActive(null)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <div className="video-dialog-content">
            <button
              className="video-close"
              onClick={() => setActive(null)}
              aria-label="Video sluiten"
              autoFocus
            >
              <X size={22} />
            </button>
            <video
              key={clip.id}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={clip.poster ?? undefined}
              onError={() => setFailed(true)}
            >
              <source src={clip.src} />
            </video>
            {failed && (
              <p className="video-error">
                De video kon niet laden.{" "}
                <a href={clip.src}>Open de video rechtstreeks</a>.
              </p>
            )}
            <p>{clip.title}</p>
          </div>
        </dialog>
      )}
    </section>
  );
}
