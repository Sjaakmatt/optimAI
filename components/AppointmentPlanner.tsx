"use client";
import { useState, useMemo } from "react";

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function getWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start from tomorrow
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const dayNames = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
const monthNames = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

export default function AppointmentPlanner() {
  const days = useMemo(() => getWeekdays(10), []);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const canSubmit = selectedDay !== null && selectedTime && name.trim() && email.trim();

  const handleSubmit = async () => {
    if (!canSubmit || selectedDay === null) return;
    setStatus("loading");

    const day = days[selectedDay];
    const dateStr = `${day.getDate()} ${monthNames[day.getMonth()]} ${day.getFullYear()}`;

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company: "",
        employees: "",
        process: `[Afspraakverzoek]\n\nDatum: ${dateStr}\nTijd: ${selectedTime}\n\n${message ? `Bericht: ${message}` : "Geen extra bericht."}`,
      }),
    });

    setStatus("done");
  };

  return (
    <section id="afspraak" className="section" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="container">
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-tag">Plan een gesprek</p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Liever direct praten?
            </h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "0 auto" }}>
              Kies een moment dat je uitkomt. Een gesprek van 30 minuten,
              vrijblijvend en concreet over jouw situatie.
            </p>
          </div>

          <div className="card card-solid" style={{ padding: 0, overflow: "hidden" }}>
            {status === "done" ? (
              <div style={{ padding: "3rem", textAlign: "center" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  backgroundColor: "var(--accent-subtle)", color: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", fontSize: "1.5rem",
                }}>
                  &#10003;
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.3rem",
                  fontWeight: 600, marginBottom: "0.75rem",
                }}>
                  Afspraak aangevraagd
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  Ik neem binnen 1 werkdag contact op om de afspraak te bevestigen.
                </p>
              </div>
            ) : (
              <>
                {/* Date picker */}
                <div style={{
                  padding: "1.75rem 2rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <p style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
                  }}>
                    Kies een datum
                  </p>
                  <div style={{
                    display: "flex", gap: "0.5rem", overflowX: "auto",
                    paddingBottom: "0.25rem",
                  }}>
                    {days.map((day, i) => (
                      <button key={i} onClick={() => setSelectedDay(i)} style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: "0.25rem", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)",
                        border: `1px solid ${selectedDay === i ? "var(--accent)" : "var(--border)"}`,
                        backgroundColor: selectedDay === i ? "var(--accent-subtle)" : "transparent",
                        cursor: "pointer", minWidth: "60px", fontFamily: "var(--font-body)",
                        transition: "all 0.15s",
                      }}>
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 500,
                          color: selectedDay === i ? "var(--accent)" : "var(--text-muted)",
                          textTransform: "uppercase",
                        }}>
                          {dayNames[day.getDay()]}
                        </span>
                        <span style={{
                          fontSize: "1.2rem", fontWeight: 600,
                          color: selectedDay === i ? "var(--accent)" : "var(--text)",
                        }}>
                          {day.getDate()}
                        </span>
                        <span style={{
                          fontSize: "0.65rem",
                          color: selectedDay === i ? "var(--accent)" : "var(--text-muted)",
                        }}>
                          {monthNames[day.getMonth()]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time picker */}
                <div style={{
                  padding: "1.75rem 2rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <p style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
                  }}>
                    Kies een tijdstip
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {timeSlots.map((time) => (
                      <button key={time} onClick={() => setSelectedTime(time)} style={{
                        padding: "0.6rem 1.2rem", borderRadius: "var(--radius-sm)",
                        border: `1px solid ${selectedTime === time ? "var(--accent)" : "var(--border)"}`,
                        backgroundColor: selectedTime === time ? "var(--accent-subtle)" : "transparent",
                        color: selectedTime === time ? "var(--accent)" : "var(--text-secondary)",
                        fontSize: "0.9rem", fontFamily: "var(--font-body)", fontWeight: 500,
                        cursor: "pointer", transition: "all 0.15s",
                      }}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div style={{ padding: "1.75rem 2rem" }}>
                  <p style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
                  }}>
                    Jouw gegevens
                  </p>
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem", marginBottom: "0.75rem",
                  }} className="form-row">
                    <input type="text" placeholder="Naam" value={name}
                      onChange={e => setName(e.target.value)} className="input" />
                    <input type="email" placeholder="E-mailadres" value={email}
                      onChange={e => setEmail(e.target.value)} className="input" />
                  </div>
                  <textarea rows={2} placeholder="Optioneel: waar wil je het over hebben?"
                    value={message} onChange={e => setMessage(e.target.value)}
                    className="input" style={{ resize: "vertical", marginBottom: "1.25rem" }}
                  />
                  <button onClick={handleSubmit} disabled={!canSubmit}
                    className="btn btn-primary" style={{
                      width: "100%", opacity: canSubmit ? 1 : 0.4,
                      cursor: canSubmit ? "pointer" : "not-allowed",
                    }}>
                    {status === "loading" ? "Aanvraag versturen..." : "Afspraak aanvragen"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
