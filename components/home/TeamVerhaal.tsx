"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { TEAM_BY_SLUG } from "@/lib/data/team";
import { calPopupAttrs } from "@/components/booking/config";
import { useScrollSteps } from "./useScrollSteps";

const PEOPLE = [
  {
    member: TEAM_BY_SLUG["sjaak-ter-veld"],
    title: (
      <>
        Geen accountmanager.
        <br />
        <em>De bouwer zelf.</em>
      </>
    ),
    photo: "/sjaak-portrait-cutout.webp",
    text: "Ik zit aan tafel bij ondernemers om hun werkdag te begrijpen, en bouw mee aan de agents die wij opleveren. Dat houdt het werk eerlijk: ik beloof niets dat ik niet zelf zou kunnen waarmaken.",
  },
  {
    member: TEAM_BY_SLUG["danny-rossenaar"],
    title: (
      <>
        Van een goed gesprek.
        <br />
        <em>Naar een helder plan.</em>
      </>
    ),
    photo: "/danny-portrait-cutout.webp",
    text: "Danny luistert naar waar de werkdag stroef loopt en vertaalt dat naar een helder voorstel. Wat kan een agent overnemen, wat levert het op, en waar beginnen we? Hij houdt de lijnen kort en de belofte eerlijk.",
  },
];

export function TeamVerhaal() {
  const { track, scene, active, enabled, select } = useScrollSteps(
    PEOPLE.length,
  );
  return (
    <section className="team-story band" aria-label="De mensen achter FactumAI">
      <div
        ref={track}
        className="story-track team-track"
        data-scroll-enabled={enabled}
      >
        <div ref={scene} className="story-sticky">
          <div className="team-navigation">
            <p className="story-hint">
              {enabled ? "Scroll en ontmoet ons" : "Ontmoet ons"}
            </p>
            <div role="tablist" aria-label="Ons team">
              {PEOPLE.map(({ member }, i) => (
                <button
                  key={member.slug}
                  role="tab"
                  id={`team-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`team-panel-${i}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(event) => {
                    if (
                      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    )
                      return;
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? PEOPLE.length - 1
                          : (i +
                              (event.key === "ArrowRight"
                                ? 1
                                : PEOPLE.length - 1)) %
                            PEOPLE.length;
                    select(next);
                    document
                      .getElementById(`team-tab-${next}`)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  <span>0{i + 1}</span> {member.voornaam}
                </button>
              ))}
            </div>
          </div>
          <div className="team-slides">
            {PEOPLE.map(({ member, title, photo, text }, i) => (
              <div
                key={member.slug}
                className={`team-slide ${i === active ? "is-active" : ""}`}
                role="tabpanel"
                id={`team-panel-${i}`}
                aria-labelledby={`team-tab-${i}`}
                aria-hidden={i !== active}
                inert={i !== active}
              >
                <div className="team-photo team-cutout">
                  <Image
                    src={photo}
                    alt={`${member.voornaam} ${member.achternaam}, ${member.rol}`}
                    fill
                    sizes="(max-width: 767px) 180px, 480px"
                    className="object-contain object-bottom"
                  />
                </div>
                <div className="team-copy">
                  <h2>{title}</h2>
                  <p className="team-bio">{text}</p>
                  <p className="team-short-bio">{member.korteBio}</p>
                  <div className="team-meta">
                    <div>
                      <strong>
                        {member.voornaam} {member.achternaam}
                      </strong>
                      <span>{member.rol}</span>
                    </div>
                    <span className="team-location">
                      <MapPin size={13} />
                      {member.vestiging}
                    </span>
                  </div>
                  <div className="team-actions">
                    <Link
                      href="/plan"
                      {...calPopupAttrs}
                      className="knop knop-primair"
                    >
                      Plan een gesprek
                    </Link>
                    <Link
                      href={`/over/${member.slug}`}
                      className="knop knop-glas"
                    >
                      Meer over {member.voornaam}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
