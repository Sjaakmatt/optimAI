"use client";
import { useState } from "react";

const questions = [
  {
    id: "sector",
    label: "In welke sector zit je bedrijf?",
    type: "select",
    options: ["Bouw & installatie", "Logistiek & transport", "Groothandel & retail", "Zakelijke dienstverlening", "Zorg & welzijn", "Productie & industrie", "Anders"],
  },
  {
    id: "employees",
    label: "Hoeveel medewerkers heeft je bedrijf?",
    type: "select",
    options: ["10–25", "25–50", "50–100", "100–200"],
  },
  {
    id: "pain1",
    label: "Waar verlies je de meeste tijd? Beschrijf het concreet.",
    type: "textarea",
    placeholder: "Bijv: elke maandag kopieer ik ordergegevens uit ons systeem naar Excel om een rapport te maken...",
  },
  {
    id: "pain2",
    label: "Is er een tweede proces dat je energie kost?",
    type: "textarea",
    placeholder: "Bijv: klantintakes gaan nog via e-mail, iemand typt alles handmatig over in ons CRM...",
  },
  {
    id: "tools",
    label: "Welke software gebruik je dagelijks?",
    type: "text",
    placeholder: "Bijv: Exact Online, Salesforce, Microsoft 365, eigen systeem...",
  },
  {
    id: "goal",
    label: "Wat zou je willen dat er over 3 maanden anders is?",
    type: "textarea",
    placeholder: "Bijv: dat ik die maandagse rapportage niet meer hoef te doen...",
  },
];

type Answers = Record<string, string>;
type Stage = "form" | "loading" | "result" | "contact_done";

export default function ProcessScan() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stage, setStage] = useState<Stage>("form");
  const [result, setResult] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [contact, setContact] = useState({ name: "", email: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "done">("idle");

  const current = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const canNext = (answers[current.id] ?? "").trim().length > 0;

  const handleNext = () => {
    if (isLast) runScan();
    else setCurrentQ(q => q + 1);
  };

  const runScan = async () => {
    setStage("loading");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setResult(data.result || "Er ging iets mis. Probeer het opnieuw.");
    } catch {
      setResult("Er ging iets mis. Probeer het opnieuw.");
    }
    setStage("result");
  };

  const handleContact = async () => {
    setContactStatus("loading");
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        company: "",
        employees: answers.employees ?? "",
        process: `[Via procescan]\n\n${Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join("\n\n")}\n\nAI analyse:\n${result}`,
      }),
    });
    setContactStatus("done");
  };

  return (
    <section id="scan" className="section" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-tag">Gratis procescan</p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Ontdek waar AI voor jou het meeste oplevert
            </h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "0 auto" }}>
              6 vragen. Direct een analyse van je pijnpunten en wat AI daarvoor kan doen.
            </p>
          </div>

          <div className="card card-solid" style={{
            borderRadius: "var(--radius-lg)", overflow: "hidden", padding: 0,
          }}>
            {/* Progress bar */}
            {stage === "form" && (
              <div style={{ height: "3px", backgroundColor: "var(--bg-alt)" }}>
                <div style={{
                  height: "100%", backgroundColor: "var(--accent)",
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 8px var(--accent-glow)",
                }} />
              </div>
            )}

            <div className="scan-inner" style={{ padding: "2.5rem 3rem" }}>

              {/* FORM */}
              {stage === "form" && (
                <div>
                  <div style={{ marginBottom: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Vraag {currentQ + 1} van {questions.length}
                  </div>
                  <label style={{
                    display: "block", fontFamily: "var(--font-heading)",
                    fontSize: "1.3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.3,
                  }}>
                    {current.label}
                  </label>

                  {current.type === "select" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {current.options?.map(opt => (
                        <button key={opt} onClick={() => setAnswers(a => ({ ...a, [current.id]: opt }))} style={{
                          padding: "0.85rem 1.25rem",
                          border: `1px solid ${answers[current.id] === opt ? "var(--accent)" : "var(--border)"}`,
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: answers[current.id] === opt ? "var(--accent-subtle)" : "transparent",
                          color: answers[current.id] === opt ? "var(--accent)" : "var(--text)",
                          fontSize: "0.95rem", fontFamily: "var(--font-body)",
                          cursor: "pointer", textAlign: "left",
                          fontWeight: answers[current.id] === opt ? 500 : 400,
                          transition: "all 0.15s",
                        }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {current.type === "textarea" && (
                    <textarea rows={4} placeholder={current.placeholder}
                      value={answers[current.id] ?? ""}
                      onChange={e => setAnswers(a => ({ ...a, [current.id]: e.target.value }))}
                      className="input" style={{ resize: "vertical" }}
                    />
                  )}

                  {current.type === "text" && (
                    <input type="text" placeholder={current.placeholder}
                      value={answers[current.id] ?? ""}
                      onChange={e => setAnswers(a => ({ ...a, [current.id]: e.target.value }))}
                      className="input"
                    />
                  )}

                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginTop: "2rem",
                  }}>
                    {currentQ > 0
                      ? <button onClick={() => setCurrentQ(q => q - 1)} className="btn btn-ghost">
                          &larr; Vorige
                        </button>
                      : <div />
                    }
                    <button onClick={handleNext} disabled={!canNext} className="btn btn-primary" style={{
                      opacity: canNext ? 1 : 0.4,
                      cursor: canNext ? "pointer" : "not-allowed",
                    }}>
                      {isLast ? "Analyseer mijn processen" : "Volgende"}
                    </button>
                  </div>
                </div>
              )}

              {/* LOADING */}
              {stage === "loading" && (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    border: "3px solid var(--accent-subtle)",
                    borderTop: "3px solid var(--accent)",
                    margin: "0 auto 1.5rem",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                    Processen worden geanalyseerd...
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Even geduld, dit duurt 10–20 seconden.
                  </p>
                </div>
              )}

              {/* RESULT */}
              {stage === "result" && (
                <div>
                  <span className="badge badge-accent" style={{ marginBottom: "1.5rem" }}>
                    &#10003; Analyse compleet
                  </span>

                  <div style={{
                    whiteSpace: "pre-wrap", fontSize: "0.95rem", lineHeight: 1.75,
                    color: "var(--text)", backgroundColor: "var(--bg-alt)",
                    border: "1px solid var(--border)", borderRadius: "var(--radius-md)",
                    padding: "1.75rem 2rem", marginBottom: "2.5rem",
                    maxHeight: "500px", overflowY: "auto",
                  }}>
                    {result}
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                    borderRadius: "var(--radius-md)", padding: "2rem",
                  }}>
                    <h3 style={{
                      fontFamily: "var(--font-heading)", color: "#fff",
                      fontSize: "1.3rem", marginBottom: "0.5rem",
                    }}>
                      Wil je dit verder uitwerken?
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.93rem", marginBottom: "1.5rem" }}>
                      Plan een gratis gesprek van 45 minuten. Geen verkoopverhaal — gewoon kijken wat er mogelijk is.
                    </p>

                    {contactStatus === "done" ? (
                      <p style={{ color: "#fff", fontWeight: 500 }}>
                        &#10003; Ontvangen. Ik neem binnen 2 werkdagen contact op.
                      </p>
                    ) : (
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <input type="text" placeholder="Jouw naam" value={contact.name}
                          onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                          className="input" style={{ flex: 1, minWidth: "150px", backgroundColor: "rgba(255,255,255,0.95)", color: "#111" }}
                        />
                        <input type="email" placeholder="E-mailadres" value={contact.email}
                          onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                          className="input" style={{ flex: 2, minWidth: "200px", backgroundColor: "rgba(255,255,255,0.95)", color: "#111" }}
                        />
                        <button onClick={handleContact}
                          disabled={!contact.name || !contact.email || contactStatus === "loading"}
                          className="btn" style={{
                            backgroundColor: "#fff", color: "var(--accent-hover)",
                            fontWeight: 600,
                            opacity: (!contact.name || !contact.email) ? 0.6 : 1,
                          }}>
                          {contactStatus === "loading" ? "Versturen..." : "Plan een gesprek"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
