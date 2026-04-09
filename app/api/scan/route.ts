import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const answers = await req.json();

    const prompt = `Je bent een no-nonsense AI implementatie adviseur voor MKB-bedrijven, gespecialiseerd in AI agents, custom builds en het slim inzetten van bestaande tools. Een ondernemer heeft een korte procescan ingevuld. Analyseer de antwoorden en geef een directe, eerlijke analyse.

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

AI AGENT OPLOSSING
[Beschrijf 1-2 concrete AI agents die dit proces kunnen overnemen. Wees specifiek: welke trigger start de agent, welke stappen voert hij uit, welke systemen koppelt hij aan elkaar. Denk aan agents die e-mails classificeren, facturen verwerken, data synchroniseren, rapporten genereren, etc. Benoem concrete tools uit hun stack waar de agent mee integreert.]

BESTAANDE TOOLS OF CUSTOM BUILD?
[Geef een eerlijk advies: kan dit met bestaande tools (zoals n8n workflows, Make, Zapier, of native integraties) of is een custom AI agent de betere route? Leg uit waarom. Als bestaande tools voldoende zijn, benoem welke. Als custom nodig is, leg uit wat dat inhoudt (bijv. een op maat gebouwde AI agent die met hun specifieke systemen praat). Geef een realistische tijdsinschatting.]

VOLGENDE STAP
[1 concrete zin wat ze morgen al kunnen doen of wat een gesprek zou opleveren. Focus op de quickest win: welke agent of tool levert het snelst resultaat?]

Schrijf in jij-vorm, direct en zakelijk. Geen buzzwords. Geen vage beloftes. Strict max 350 woorden totaal. Houd elke sectie kort.`;

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