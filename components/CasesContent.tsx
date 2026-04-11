"use client";
import { useEffect, useRef } from "react";

type Case = {
  tag: string;
  sector: string;
  size: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

// NB: geanonimiseerde voorbeeldcases. Vervang de inhoud door echte klantcases
// zodra die beschikbaar zijn (bij voorkeur met toestemming van de klant).
const cases: Case[] = [
  {
    tag: "Offerte-automatisering",
    sector: "Installatiebedrijf",
    size: "25 medewerkers",
    title: "Van 2 uur naar 25 minuten per offerte",
    challenge:
      "Het verkoopteam was per offerte 1,5 tot 3 uur kwijt aan navraag, prijsopbouw en opmaak. Offertes gingen daardoor laat de deur uit, en verkopers zaten meer achter Excel dan bij de klant.",
    solution:
      "We hebben een AI-offerteassistent gebouwd die op basis van projectdetails en de eigen prijzenbibliotheek automatisch een conceptofferte genereert. De verkoper controleert en verstuurt — in plaats van bouwt.",
    result:
      "Offertes gaan binnen een dag de deur uit, verkopers houden tijd over voor klantcontact en de opvolging is consistenter. Na twee maanden kreeg het team de tool niet meer uit handen.",
    metrics: [
      { value: "75%", label: "Minder tijd per offerte" },
      { value: "2u → 25m", label: "Doorlooptijd" },
      { value: "1 dag", label: "Reactietijd naar klant" },
    ],
    stack: ["GPT-4", "Eigen prijzenbibliotheek", "Integratie met CRM"],
  },
  {
    tag: "Factuurverwerking",
    sector: "Groothandel bouwmaterialen",
    size: "60 medewerkers",
    title: "80% van leveranciersfacturen straight-through",
    challenge:
      "Twee medewerkers waren fulltime bezig met het handmatig inlezen van leveranciersfacturen, matchen met inkooporders en boeken in het ERP. Fouten sluipen er makkelijk in, en drukke periodes liepen structureel achter.",
    solution:
      "Een document-AI leest facturen automatisch uit, matcht regels met openstaande inkooporders en plaatst ze klaar in het ERP. Afwijkingen worden apart gezet voor menselijke check — de rest gaat er zonder tussenkomst doorheen.",
    result:
      "Het overgrote deel van de facturen loopt nu straight-through. Eén FTE is vrijgespeeld voor crediteurenbeheer en leveranciersrelaties, waar eerder simpelweg geen tijd voor was.",
    metrics: [
      { value: "80%", label: "Automatisch verwerkt" },
      { value: "1 FTE", label: "Tijd vrijgespeeld" },
      { value: "< 24u", label: "Doorlooptijd factuur" },
    ],
    stack: ["Document AI", "ERP-koppeling", "Approval workflow"],
  },
  {
    tag: "Klantsupport",
    sector: "SaaS-dienstverlener",
    size: "35 medewerkers",
    title: "65% van tickets afgehandeld zonder mens",
    challenge:
      "Het supportteam werd overspoeld door terugkerende vragen. Wachttijden liepen op, klanten werden ongeduldig en het team kwam niet toe aan de complexere issues waar ze juist verschil konden maken.",
    solution:
      "Een AI-assistent draait op de eigen kennisbank en handelt eerstelijnsvragen direct af via chat en e-mail. Wat niet betrouwbaar opgelost kan worden, gaat automatisch door naar de juiste specialist met context erbij.",
    result:
      "Reactietijden zijn teruggebracht van uren naar minuten. Het team kan zich richten op complexere vragen en klantretentie is meetbaar verbeterd sinds de livegang.",
    metrics: [
      { value: "65%", label: "Zonder menselijke tussenkomst" },
      { value: "minuten", label: "Eerste reactietijd" },
      { value: "+12%", label: "CSAT-score" },
    ],
    stack: ["RAG op kennisbank", "Zendesk-integratie", "Menselijke fallback"],
  },
];

export default function CasesContent() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--cream)",
          paddingTop: "8rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="container">
          <div ref={addRef} className="reveal" style={{ maxWidth: "720px" }}>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Cases
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Geen theorie.{" "}
              <em style={{ color: "var(--green)", fontStyle: "italic" }}>
                Werkende oplossingen.
              </em>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-light)",
                lineHeight: 1.7,
                maxWidth: "620px",
              }}
            >
              Een paar voorbeelden van wat we in de praktijk bouwen voor
              MKB-bedrijven. Namen zijn op verzoek van klanten weggelaten — de
              cijfers en de aanpak niet.
            </p>

            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
              }}
              className="badges-row"
            >
              {[
                { num: "3+", label: "MKB-cases" },
                { num: "2–4 wk", label: "Tot eerste livegang" },
                { num: "MKB", label: "10–200 medewerkers" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--green)",
                    }}
                  >
                    {item.num}
                  </div>
                  <div
                    style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases list */}
      <section
        className="section"
        style={{ backgroundColor: "var(--white)", paddingTop: "4rem" }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {cases.map((c, i) => (
              <article
                key={i}
                ref={addRef}
                className="reveal case-card"
                style={{
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "2.5rem",
                  transitionDelay: `${i * 0.08}s`,
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr",
                  gap: "3rem",
                  alignItems: "start",
                }}
              >
                {/* Left: narrative */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        color: "var(--white)",
                        backgroundColor: "var(--green)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "20px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {c.tag}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        color: "var(--ink-muted)",
                        backgroundColor: "var(--white)",
                        border: "1px solid var(--border)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "20px",
                      }}
                    >
                      {c.sector} · {c.size}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)",
                      fontWeight: 600,
                      marginBottom: "1.5rem",
                      lineHeight: 1.25,
                      color: "var(--ink)",
                    }}
                  >
                    {c.title}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.1rem",
                    }}
                  >
                    {[
                      { label: "De uitdaging", body: c.challenge },
                      { label: "Onze aanpak", body: c.solution },
                      { label: "Het resultaat", body: c.result },
                    ].map((block) => (
                      <div key={block.label}>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 500,
                            color: "var(--accent)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: "0.35rem",
                          }}
                        >
                          {block.label}
                        </p>
                        <p
                          style={{
                            fontSize: "0.97rem",
                            color: "var(--ink-light)",
                            lineHeight: 1.7,
                          }}
                        >
                          {block.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: metrics + stack */}
                <aside
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--green)",
                      color: "var(--white)",
                      borderRadius: "10px",
                      padding: "1.75rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      Resultaten
                    </p>
                    {c.metrics.map((m, j) => (
                      <div
                        key={j}
                        style={{
                          paddingBottom: j < c.metrics.length - 1 ? "1.1rem" : 0,
                          borderBottom:
                            j < c.metrics.length - 1
                              ? "1px solid rgba(255,255,255,0.15)"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Lora', serif",
                            fontSize: "1.6rem",
                            fontWeight: 600,
                            lineHeight: 1.1,
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            color: "rgba(255,255,255,0.75)",
                            marginTop: "0.25rem",
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Wat we gebruikt hebben
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.45rem",
                      }}
                    >
                      {c.stack.map((s, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--ink-light)",
                            paddingLeft: "1rem",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.1em",
                              color: "var(--accent)",
                              fontSize: "0.7rem",
                            }}
                          >
                            ✓
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ backgroundColor: "var(--cream)" }}>
        <div className="container">
          <div
            ref={addRef}
            className="reveal"
            style={{
              backgroundColor: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "3rem 2.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.75rem",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Jouw case als volgende?
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                Benieuwd wat AI voor jouw processen kan doen?
              </h2>
              <p
                style={{
                  color: "var(--ink-light)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                Begin met de gratis procescan. Binnen een week weet je waar de
                winst zit, hoe groot die is en wat de logische eerste stap is.
              </p>
            </div>
            <a
              href="/#scan"
              style={{
                display: "inline-block",
                backgroundColor: "var(--green)",
                color: "var(--white)",
                padding: "0.95rem 1.9rem",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "1rem",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--green-mid)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--green)")
              }
            >
              Start gratis procescan →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
