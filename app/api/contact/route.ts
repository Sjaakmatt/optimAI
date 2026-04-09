import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "jouw@email.nl";

    const body = await req.json();
    const { name, company, email, employees, process: processDescription } = body;

    if (!name || !email || !processDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FactumAI <noreply@factumai.nl>",
        to: [toEmail],
        subject: `Nieuwe procescan aanvraag van ${name}${company ? ` — ${company}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
            <h2 style="color: #2D5016; margin-bottom: 1.5rem;">Nieuwe procescan aanvraag</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem 0; color: #666; width: 140px; font-size: 14px;">Naam</td>
                <td style="padding: 0.75rem 0; font-weight: 500;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem 0; color: #666; font-size: 14px;">Bedrijf</td>
                <td style="padding: 0.75rem 0;">${company || "—"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem 0; color: #666; font-size: 14px;">E-mail</td>
                <td style="padding: 0.75rem 0;"><a href="mailto:${email}" style="color: #2D5016;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem 0; color: #666; font-size: 14px;">Medewerkers</td>
                <td style="padding: 0.75rem 0;">${employees || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0; color: #666; font-size: 14px; vertical-align: top;">Proces</td>
                <td style="padding: 0.75rem 0; line-height: 1.6;">${process}</td>
              </tr>
            </table>
            <div style="margin-top: 2rem; padding: 1rem; background: #E8F0DF; border-radius: 6px; font-size: 13px; color: #2D5016;">
              Reageer op: <a href="mailto:${email}" style="color: #2D5016; font-weight: 600;">${email}</a>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}