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
      { value: "2u \u2192 25m", label: "Doorlooptijd" },
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
      "Het overgrote deel van de facturen loopt nu straight-through. E\u00e9n FTE is vrijgespeeld voor crediteurenbeheer en leveranciersrelaties, waar eerder simpelweg geen tijd voor was.",
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
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "var(--hero-grad)",
        paddingTop: "8rem", paddingBottom: "5rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "30%", right: "15%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div className="container">
          <div ref={addRef} className="reveal" style={{ maxWidth: "720px" }}>
            <p className="section-tag">Cases</p>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
              lineHeight: 1.15, marginBottom: "1.5rem",
            }}>
              Geen theorie.{" "}
              <span className="gradient-text" style={{ fontStyle: "italic" }}>
                Werkende oplossingen.
              </span>
            </h1>
            <p style={{
              fontSize: "1.1rem", color: "var(--text-secondary)",
              lineHeight: 1.7, maxWidth: "620px",
            }}>
              Een paar voorbeelden van wat we in de praktijk bouwen voor
              MKB-bedrijven. Namen zijn op verzoek van klanten weggelaten — de
              cijfers en de aanpak niet.
            </p>

            <div className="stats-row" style={{
              marginTop: "2.5rem", paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              display: "flex", gap: "3rem", flexWrap: "wrap",
            }}>
              {[
                { num: "3+", label: "MKB-cases" },
                { num: "2–4 wk", label: "Tot eerste livegang" },
                { num: "MKB", label: "10–200 medewerkers" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.4rem",
                    fontWeight: 700, color: "var(--accent)",
                  }}>
                    {item.num}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases list */}
      <section className="section" style={{ backgroundColor: "var(--bg-alt)", paddingTop: "4rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {cases.map((c, i) => (
              <article key={i} ref={addRef}
                className="reveal case-card card card-solid"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  display: "grid", gridTemplateColumns: "1.3fr 1fr",
                  gap: "3rem", alignItems: "start",
                }}
              >
                {/* Narrative */}
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    <span className="badge badge-accent">{c.tag}</span>
                    <span className="badge badge-outline">{c.sector} &middot; {c.size}</span>
                  </div>

                  <h2 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
                    fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.25,
                  }}>
                    {c.title}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    {[
                      { label: "De uitdaging", body: c.challenge },
                      { label: "Onze aanpak", body: c.solution },
                      { label: "Het resultaat", body: c.result },
                    ].map(block => (
                      <div key={block.label}>
                        <p style={{
                          fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
                          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem",
                        }}>
                          {block.label}
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                          {block.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics + stack */}
                <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                    color: "#fff", borderRadius: "var(--radius-md)",
                    padding: "1.75rem 1.5rem",
                    display: "flex", flexDirection: "column", gap: "1.25rem",
                  }}>
                    <p style={{
                      fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                    }}>
                      Resultaten
                    </p>
                    {c.metrics.map((m, j) => (
                      <div key={j} style={{
                        paddingBottom: j < c.metrics.length - 1 ? "1.1rem" : 0,
                        borderBottom: j < c.metrics.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                      }}>
                        <div style={{
                          fontFamily: "var(--font-heading)", fontSize: "1.6rem",
                          fontWeight: 700, lineHeight: 1.1,
                        }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginTop: "0.25rem" }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: "var(--bg-card)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)", padding: "1.25rem 1.5rem",
                  }}>
                    <p style={{
                      fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem",
                    }}>
                      Wat we gebruikt hebben
                    </p>
                    <ul style={{
                      listStyle: "none", padding: 0, margin: 0,
                      display: "flex", flexDirection: "column", gap: "0.45rem",
                    }}>
                      {c.stack.map((s, j) => (
                        <li key={j} style={{
                          fontSize: "0.85rem", color: "var(--text-secondary)",
                          paddingLeft: "1rem", position: "relative",
                        }}>
                          <span style={{
                            position: "absolute", left: 0, top: "0.1em",
                            color: "var(--accent)", fontSize: "0.7rem",
                          }}>
                            &#10003;
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
      <section className="section" style={{ backgroundColor: "var(--bg)" }}>
        <div className="container">
          <div ref={addRef} className="reveal card card-solid" style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "1.75rem",
            borderColor: "var(--accent)", borderWidth: "1px",
            boxShadow: "0 0 40px var(--accent-glow)",
          }}>
            <div style={{ maxWidth: "560px" }}>
              <p className="section-tag" style={{ marginBottom: "0.75rem" }}>
                Jouw case als volgende?
              </p>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)",
                fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.25,
              }}>
                Benieuwd wat AI voor jouw processen kan doen?
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem", lineHeight: 1.6 }}>
                Begin met de gratis procescan. Binnen een week weet je waar de
                winst zit, hoe groot die is en wat de logische eerste stap is.
              </p>
            </div>
            <a href="/#scan" className="btn btn-primary btn-lg">
              Start gratis procescan
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
