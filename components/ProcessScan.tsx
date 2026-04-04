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

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    backgroundColor: "var(--white)",
    color: "var(--ink)",
    fontSize: "0.97rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="scan" className="section" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="container">
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Gratis procescan
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1rem" }}>
              Ontdek waar AI voor jou het meeste oplevert
            </h2>
            <p style={{ color: "var(--ink-light)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
              6 vragen. Direct een analyse van je pijnpunten en wat AI daarvoor kan doen.
            </p>
          </div>

          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>

            {stage === "form" && (
              <div style={{ height: "3px", backgroundColor: "var(--cream-dark)" }}>
                <div style={{ height: "100%", backgroundColor: "var(--green)", width: `${((currentQ + 1) / questions.length) * 100}%`, transition: "width 0.3s ease" }} />
              </div>
            )}

            <div style={{ padding: "2.5rem 3rem" }}>

              {/* FORM */}
              {stage === "form" && (
                <div>
                  <div style={{ marginBottom: "0.5rem", fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                    Vraag {currentQ + 1} van {questions.length}
                  </div>
                  <label style={{ display: "block", fontFamily: "'Lora', serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.3 }}>
                    {current.label}
                  </label>

                  {current.type === "select" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {current.options?.map(opt => (
                        <button key={opt} onClick={() => setAnswers(a => ({ ...a, [current.id]: opt }))} style={{
                          padding: "0.85rem 1.25rem",
                          border: `1px solid ${answers[current.id] === opt ? "var(--green)" : "var(--border)"}`,
                          borderRadius: "6px",
                          backgroundColor: answers[current.id] === opt ? "var(--green-light)" : "var(--white)",
                          color: answers[current.id] === opt ? "var(--green)" : "var(--ink)",
                          fontSize: "0.95rem", fontFamily: "'DM Sans', sans-serif",
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
                    <textarea rows={4} placeholder={current.placeholder} value={answers[current.id] ?? ""}
                      onChange={e => setAnswers(a => ({ ...a, [current.id]: e.target.value }))}
                      style={{ ...inputBase, resize: "vertical" }}
                      onFocus={e => (e.target.style.borderColor = "var(--green)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  )}

                  {current.type === "text" && (
                    <input type="text" placeholder={current.placeholder} value={answers[current.id] ?? ""}
                      onChange={e => setAnswers(a => ({ ...a, [current.id]: e.target.value }))}
                      style={inputBase}
                      onFocus={e => (e.target.style.borderColor = "var(--green)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                    {currentQ > 0
                      ? <button onClick={() => setCurrentQ(q => q - 1)} style={{ background: "none", border: "none", color: "var(--ink-muted)", fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Vorige</button>
                      : <div />
                    }
                    <button onClick={handleNext} disabled={!canNext} style={{
                      backgroundColor: canNext ? "var(--green)" : "var(--border)",
                      color: canNext ? "var(--white)" : "var(--ink-muted)",
                      padding: "0.85rem 2rem", borderRadius: "4px", border: "none",
                      fontSize: "0.97rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                      cursor: canNext ? "pointer" : "not-allowed", transition: "background-color 0.2s",
                    }}>
                      {isLast ? "Analyseer mijn processen →" : "Volgende →"}
                    </button>
                  </div>
                </div>
              )}

              {/* LOADING */}
              {stage === "loading" && (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "3px solid var(--green-light)", borderTop: "3px solid var(--green)", margin: "0 auto 1.5rem", animation: "spin 0.8s linear infinite" }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: "1.2rem" }}>Processen worden geanalyseerd...</p>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Even geduld, dit duurt 10–20 seconden.</p>
                </div>
              )}

              {/* RESULT */}
              {stage === "result" && (
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--green-light)", color: "var(--green)", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500, marginBottom: "1.5rem" }}>
                    ✓ Analyse compleet
                  </div>

                  <div style={{ whiteSpace: "pre-wrap", fontSize: "0.97rem", lineHeight: 1.75, color: "var(--ink)", backgroundColor: "var(--cream)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.75rem 2rem", marginBottom: "2.5rem" }}>
                    {result}
                  </div>

                  <div style={{ backgroundColor: "var(--green)", borderRadius: "8px", padding: "2rem" }}>
                    <h3 style={{ fontFamily: "'Lora', serif", color: "var(--white)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                      Wil je dit verder uitwerken?
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.93rem", marginBottom: "1.5rem" }}>
                      Plan een gratis gesprek van 45 minuten. Geen verkoopverhaal — gewoon kijken wat er mogelijk is.
                    </p>

                    {contactStatus === "done" ? (
                      <p style={{ color: "var(--white)", fontWeight: 500 }}>✓ Ontvangen. Ik neem binnen 2 werkdagen contact op.</p>
                    ) : (
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <input type="text" placeholder="Jouw naam" value={contact.name}
                          onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                          style={{ ...inputBase, flex: 1, minWidth: "150px", backgroundColor: "rgba(255,255,255,0.95)" }}
                        />
                        <input type="email" placeholder="E-mailadres" value={contact.email}
                          onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                          style={{ ...inputBase, flex: 2, minWidth: "200px", backgroundColor: "rgba(255,255,255,0.95)" }}
                        />
                        <button onClick={handleContact}
                          disabled={!contact.name || !contact.email || contactStatus === "loading"}
                          style={{
                            backgroundColor: "var(--accent)", color: "var(--white)",
                            padding: "0.85rem 1.5rem", borderRadius: "4px", border: "none",
                            fontSize: "0.95rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                            cursor: "pointer", whiteSpace: "nowrap",
                            opacity: (!contact.name || !contact.email) ? 0.6 : 1,
                          }}>
                          {contactStatus === "loading" ? "Versturen..." : "Plan een gesprek →"}
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