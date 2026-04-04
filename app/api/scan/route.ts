import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const answers = await req.json();

    const prompt = `Je bent een no-nonsense AI implementatie adviseur voor MKB-bedrijven. Een ondernemer heeft een korte procescan ingevuld. Analyseer de antwoorden en geef een directe, eerlijke analyse.

ANTWOORDEN VAN DE ONDERNEMER:
Sector: ${answers.sector || "niet opgegeven"}
Aantal medewerkers: ${answers.employees || "niet opgegeven"}
Grootste tijdverlies: ${answers.pain1 || "niet opgegeven"}
Tweede pijnpunt: ${answers.pain2 || "niet opgegeven"}
Gebruikte software: ${answers.tools || "niet opgegeven"}
Doel over 3 maanden: ${answers.goal || "niet opgegeven"}

Schrijf een analyse in deze structuur (gebruik geen markdown koppen met #, gebruik gewone tekst met witregels tussen secties):

WAT WE ZIEN
[2-3 zinnen over de kern van het probleem, direct en concreet. Benoem specifiek wat ze beschreven hebben.]

WAT AI HIER KAN DOEN
[Beschrijf 2-3 concrete AI-toepassingen die direct aansluiten op hun situatie. Wees specifiek: geen "AI kan processen verbeteren" maar "Een AI-koppeling tussen [hun systeem] en [output] elimineert de handmatige stap die nu X tijd kost."]

AANPAK DIE PAST
[Advies over of dit meer een configuratie/consulting traject is of dat custom bouwen zinvol is. Geef een realistische tijdsinschatting.]

VOLGENDE STAP
[1 concrete zin wat ze morgen al kunnen doen of wat een gesprek zou opleveren.]

Schrijf in jij-vorm, direct en zakelijk. Geen buzzwords. Geen vage beloftes. Max 300 woorden totaal.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error("Anthropic API error:", await res.text());
      return NextResponse.json({ error: "API error" }, { status: 500 });
    }

    const data = await res.json();
    const result = data.content?.[0]?.text || "";

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}