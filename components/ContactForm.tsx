"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    employees: "",
    process: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", employees: "", process: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
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

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "var(--ink-light)",
    marginBottom: "0.4rem",
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: "var(--cream)" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}>
          {/* Left */}
          <div>
            <p style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}>
              Gratis procescan
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "1.5rem" }}>
              Laten we kijken waar jij tijd verliest
            </h2>
            <p style={{ color: "var(--ink-light)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Vul het formulier in. Ik neem binnen twee werkdagen contact op voor een eerste gesprek — zonder verkooppraatje.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                "Gesprek van 45–60 minuten",
                "Concrete bevindingen, geen vage conclusies",
                "Geen verplichtingen achteraf",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: "var(--green-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    color: "var(--green)",
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: "0.95rem", color: "var(--ink-light)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{
            backgroundColor: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "2.5rem",
          }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1.4rem", marginBottom: "0.75rem", color: "var(--green)" }}>
                  Aanvraag ontvangen
                </h3>
                <p style={{ color: "var(--ink-light)", fontSize: "0.97rem" }}>
                  Ik neem binnen twee werkdagen contact op.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Naam</label>
                    <input
                      type="text"
                      placeholder="Jan de Vries"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "var(--green)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Bedrijf</label>
                    <input
                      type="text"
                      placeholder="Jouw BV"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "var(--green)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>E-mailadres</label>
                  <input
                    type="email"
                    placeholder="jan@jouwbedrijf.nl"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--green)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Aantal medewerkers</label>
                  <select
                    value={form.employees}
                    onChange={e => setForm({ ...form, employees: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={e => (e.target.style.borderColor = "var(--green)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  >
                    <option value="">Selecteer...</option>
                    <option value="10-25">10–25</option>
                    <option value="25-50">25–50</option>
                    <option value="50-100">50–100</option>
                    <option value="100-200">100–200</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Welk proces wil je aanpakken?</label>
                  <textarea
                    placeholder="Beschrijf kort het proces dat je efficiënter wilt maken..."
                    value={form.process}
                    onChange={e => setForm({ ...form, process: e.target.value })}
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => (e.target.style.borderColor = "var(--green)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#c0392b", fontSize: "0.88rem" }}>
                    Er ging iets mis. Probeer het opnieuw of mail direct.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || !form.name || !form.email || !form.process}
                  style={{
                    backgroundColor: "var(--green)",
                    color: "var(--white)",
                    padding: "0.9rem",
                    borderRadius: "4px",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: status === "loading" ? "wait" : "pointer",
                    transition: "background-color 0.2s, opacity 0.2s",
                    opacity: (!form.name || !form.email || !form.process) ? 0.6 : 1,
                  }}
                  onMouseEnter={e => {
                    if (form.name && form.email && form.process)
                      e.currentTarget.style.backgroundColor = "var(--green-mid)";
                  }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--green)")}
                >
                  {status === "loading" ? "Versturen..." : "Procescan aanvragen →"}
                </button>

                <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textAlign: "center" }}>
                  Geen spam. Geen CRM. Gewoon een gesprek.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
