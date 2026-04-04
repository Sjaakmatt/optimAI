"use client";
import { useState, useEffect, useRef } from "react";

type NodeType = "trigger" | "action" | "ai" | "output" | "condition";

interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  sublabel: string;
  icon: string;
  x: number;
  y: number;
}

interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
}

interface WorkflowStep {
  nodeId: string;
  description: string;
}

interface Workflow {
  id: string;
  title: string;
  description: string;
  tag: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  steps: WorkflowStep[];
}

const workflows: Workflow[] = [
  {
    id: "invoice",
    title: "Factuur verwerking",
    description: "Inkomende facturen worden automatisch uitgelezen, gecontroleerd op regels, en verwerkt in Exact Online — zonder handmatige invoer.",
    tag: "Administratie",
    nodes: [
      { id: "t1",  type: "trigger",   label: "E-mail ontvangen",       sublabel: "Outlook / Gmail",         icon: "✉️", x: 30,  y: 140 },
      { id: "a1",  type: "action",    label: "PDF bijlage extraheren",  sublabel: "Attachment parser",        icon: "📎", x: 190, y: 140 },
      { id: "ai1", type: "ai",        label: "AI leest factuur uit",    sublabel: "Leverancier · bedrag · datum", icon: "🤖", x: 350, y: 140 },
      { id: "c1",  type: "condition", label: "Bedrag > €500?",          sublabel: "Goedkeuringsregel",        icon: "⚖️", x: 510, y: 140 },
      { id: "a2",  type: "action",    label: "Stuur ter goedkeuring",   sublabel: "Slack notificatie",        icon: "🔔", x: 670, y: 80  },
      { id: "a3",  type: "action",    label: "Automatisch goedgekeurd", sublabel: "Binnen regelbeleid",       icon: "✅", x: 670, y: 200 },
      { id: "o1",  type: "output",    label: "Boek in Exact Online",    sublabel: "Juiste kostenplaats",      icon: "📊", x: 830, y: 140 },
    ],
    edges: [
      { from: "t1",  to: "a1"  },
      { from: "a1",  to: "ai1" },
      { from: "ai1", to: "c1"  },
      { from: "c1",  to: "a2",  label: "Ja" },
      { from: "c1",  to: "a3",  label: "Nee" },
      { from: "a2",  to: "o1"  },
      { from: "a3",  to: "o1"  },
    ],
    steps: [
      { nodeId: "t1",  description: "Een leverancier stuurt een factuur naar jullie e-mailadres." },
      { nodeId: "a1",  description: "De agent detecteert een PDF-bijlage en extraheert de inhoud automatisch." },
      { nodeId: "ai1", description: "AI leest de factuurgegevens uit: leverancier, bedrag, vervaldatum en omschrijving." },
      { nodeId: "c1",  description: "De agent controleert of het bedrag boven de goedkeuringsgrens van €500 ligt." },
      { nodeId: "a2",  description: "Bij een hoog bedrag krijgt de verantwoordelijke een Slack-bericht met één klik om goed te keuren." },
      { nodeId: "a3",  description: "Kleinere facturen binnen het beleid worden direct doorgestuurd zonder menselijke tussenkomst." },
      { nodeId: "o1",  description: "De factuur wordt automatisch geboekt op de juiste kostenplaats in Exact Online." },
    ],
  },
  {
    id: "email",
    title: "E-mail routing & opvolging",
    description: "Inkomende e-mails worden geclassificeerd, naar de juiste persoon gerouteerd, en automatisch opgevolgd als er geen reactie komt.",
    tag: "Communicatie",
    nodes: [
      { id: "t1",  type: "trigger",   label: "E-mail binnenkomst",    sublabel: "Gedeelde inbox",              icon: "📬", x: 30,  y: 160 },
      { id: "a1",  type: "action",    label: "Extraheer context",     sublabel: "Afzender · onderwerp · toon", icon: "🔍", x: 190, y: 160 },
      { id: "ai1", type: "ai",        label: "AI classificeert",      sublabel: "Type & urgentie bepalen",     icon: "🤖", x: 350, y: 160 },
      { id: "a2",  type: "action",    label: "Klantvraag",            sublabel: "→ Support team",              icon: "💬", x: 510, y: 80  },
      { id: "a3",  type: "action",    label: "Orderverzoek",          sublabel: "→ Sales team",                icon: "🛒", x: 510, y: 160 },
      { id: "a4",  type: "action",    label: "Klacht",                sublabel: "→ Manager + hoge prio",       icon: "⚠️", x: 510, y: 240 },
      { id: "ai2", type: "ai",        label: "AI schrijft auto-reply", sublabel: "Gepersonaliseerd antwoord",  icon: "✍️", x: 670, y: 160 },
      { id: "o1",  type: "output",    label: "Taak + bevestiging",    sublabel: "CRM bijgewerkt",              icon: "✅", x: 830, y: 160 },
    ],
    edges: [
      { from: "t1",  to: "a1"  },
      { from: "a1",  to: "ai1" },
      { from: "ai1", to: "a2"  },
      { from: "ai1", to: "a3"  },
      { from: "ai1", to: "a4"  },
      { from: "a2",  to: "ai2" },
      { from: "a3",  to: "ai2" },
      { from: "a4",  to: "ai2" },
      { from: "ai2", to: "o1"  },
    ],
    steps: [
      { nodeId: "t1",  description: "Een nieuwe e-mail komt binnen in de gedeelde inbox." },
      { nodeId: "a1",  description: "De agent leest afzender, onderwerp en toon uit om context op te bouwen." },
      { nodeId: "ai1", description: "AI bepaalt het type e-mail (vraag, order, klacht) en de urgentie." },
      { nodeId: "a2",  description: "Klantvragen worden doorgestuurd naar het support team met relevante context." },
      { nodeId: "a3",  description: "Orderverzoeken gaan direct naar sales, inclusief klanthistorie." },
      { nodeId: "a4",  description: "Klachten krijgen hoge prioriteit en worden geëscaleerd naar de manager." },
      { nodeId: "ai2", description: "AI schrijft een gepersonaliseerde auto-reply op basis van de inhoud." },
      { nodeId: "o1",  description: "Een taak wordt aangemaakt in het CRM en de klant krijgt een bevestiging." },
    ],
  },
  {
    id: "onboarding",
    title: "Klant onboarding",
    description: "Nieuwe klanten vullen één formulier in. De agent maakt automatisch een dossier aan, stuurt welkomstmails, en koppelt alles aan het CRM.",
    tag: "Sales",
    nodes: [
      { id: "t1",  type: "trigger",   label: "Formulier ingevuld",     sublabel: "Website intake",           icon: "📝", x: 30,  y: 140 },
      { id: "ai1", type: "ai",        label: "AI valideert gegevens",  sublabel: "Volledigheid & kwaliteit", icon: "🤖", x: 190, y: 140 },
      { id: "c1",  type: "condition", label: "Gegevens compleet?",     sublabel: "Verplichte velden check",  icon: "⚖️", x: 350, y: 140 },
      { id: "a1",  type: "action",    label: "Aanvulling aanvragen",   sublabel: "Automatische terugkoppeling", icon: "↩️", x: 510, y: 80  },
      { id: "a2",  type: "action",    label: "Dossier aanmaken",       sublabel: "Google Drive / SharePoint", icon: "📁", x: 510, y: 160 },
      { id: "a3",  type: "action",    label: "Welkomstmail sturen",    sublabel: "Gepersonaliseerd",          icon: "📧", x: 670, y: 100 },
      { id: "a4",  type: "action",    label: "CRM bijwerken",          sublabel: "HubSpot / Exact",           icon: "🔄", x: 670, y: 200 },
      { id: "o1",  type: "output",    label: "Klant actief",           sublabel: "Onboarding compleet",       icon: "✅", x: 830, y: 140 },
    ],
    edges: [
      { from: "t1",  to: "ai1" },
      { from: "ai1", to: "c1"  },
      { from: "c1",  to: "a1",  label: "Nee" },
      { from: "c1",  to: "a2",  label: "Ja" },
      { from: "a2",  to: "a3"  },
      { from: "a2",  to: "a4"  },
      { from: "a3",  to: "o1"  },
      { from: "a4",  to: "o1"  },
    ],
    steps: [
      { nodeId: "t1",  description: "Een nieuwe klant vult het onboardingformulier in op de website." },
      { nodeId: "ai1", description: "AI controleert of alle gegevens aanwezig en logisch zijn (bijv. geldig KVK-nummer)." },
      { nodeId: "c1",  description: "Zijn de gegevens compleet? Zo niet, volgt automatisch een terugkoppeling." },
      { nodeId: "a1",  description: "De klant krijgt een vriendelijk bericht met het verzoek de ontbrekende info aan te vullen." },
      { nodeId: "a2",  description: "Een klantdossier wordt automatisch aangemaakt in Google Drive of SharePoint." },
      { nodeId: "a3",  description: "De klant ontvangt een gepersonaliseerde welkomstmail met relevante informatie." },
      { nodeId: "a4",  description: "Het CRM wordt bijgewerkt met alle klantgegevens en de status 'actief'." },
      { nodeId: "o1",  description: "De onboarding is compleet. Geen handmatig werk, geen vergeten stappen." },
    ],
  },
  {
    id: "offerte",
    title: "Offerte generatie",
    description: "Een verkoopkans in het CRM triggert automatisch een op maat gemaakte offerte — inclusief prijsberekening, klantspecifieke tekst en verzending.",
    tag: "Sales",
    nodes: [
      { id: "t1",  type: "trigger",   label: "Deal aangemaakt",        sublabel: "CRM / HubSpot",              icon: "💼", x: 30,  y: 140 },
      { id: "a1",  type: "action",    label: "Klantdata ophalen",      sublabel: "Historiek & voorkeuren",     icon: "🔍", x: 190, y: 140 },
      { id: "ai1", type: "ai",        label: "AI schrijft offerte",    sublabel: "Gepersonaliseerde tekst",    icon: "✍️", x: 350, y: 140 },
      { id: "a2",  type: "action",    label: "Prijsberekening",        sublabel: "Tarieven & kortingsregels",  icon: "🧮", x: 510, y: 140 },
      { id: "c1",  type: "condition", label: "Korting > 15%?",         sublabel: "Goedkeuringsregel",          icon: "⚖️", x: 670, y: 140 },
      { id: "a3",  type: "action",    label: "Manager accordeert",     sublabel: "Slack goedkeuring",          icon: "🔔", x: 830, y: 80  },
      { id: "o1",  type: "output",    label: "Offerte verstuurd",      sublabel: "PDF per e-mail + CRM log",   icon: "📤", x: 830, y: 200 },
    ],
    edges: [
      { from: "t1",  to: "a1"  },
      { from: "a1",  to: "ai1" },
      { from: "ai1", to: "a2"  },
      { from: "a2",  to: "c1"  },
      { from: "c1",  to: "a3",  label: "Ja"  },
      { from: "c1",  to: "o1",  label: "Nee" },
      { from: "a3",  to: "o1"  },
    ],
    steps: [
      { nodeId: "t1",  description: "Een verkoper maakt een nieuwe deal aan in het CRM of een klant vraagt een offerte aan via de website." },
      { nodeId: "a1",  description: "De agent haalt klanthistoriek, eerdere aankopen en voorkeuren op uit het CRM." },
      { nodeId: "ai1", description: "AI schrijft een gepersonaliseerde offertetekst op basis van de klantgegevens en het gevraagde product of dienst." },
      { nodeId: "a2",  description: "De agent berekent de prijs automatisch op basis van actuele tarieven en eventuele klantspecifieke kortingsafspraken." },
      { nodeId: "c1",  description: "Is de korting hoger dan 15%? Dan is goedkeuring van een manager vereist." },
      { nodeId: "a3",  description: "De manager krijgt een Slack-bericht met de offerte en kan met één klik accorderen of aanpassen." },
      { nodeId: "o1",  description: "De definitieve offerte wordt als PDF per e-mail verstuurd en automatisch gelogd in het CRM." },
    ],
  },
  {
    id: "rapportage",
    title: "Rapportage automatisering",
    description: "Wekelijkse of maandelijkse rapporten worden automatisch samengesteld uit meerdere bronnen, geanalyseerd door AI, en verstuurd naar de juiste personen.",
    tag: "Rapportage",
    nodes: [
      { id: "t1",  type: "trigger",   label: "Geplande trigger",        sublabel: "Elke maandag 07:00",        icon: "⏰", x: 30,  y: 60  },
      { id: "a1",  type: "action",    label: "Data ophalen",            sublabel: "Exact · CRM · Sheets",      icon: "📥", x: 210, y: 60  },
      { id: "a2",  type: "action",    label: "Data samenvoegen",        sublabel: "Normaliseren & valideren",  icon: "🔄", x: 390, y: 60  },
      { id: "ai1", type: "ai",        label: "AI analyseert trends",    sublabel: "Afwijkingen & inzichten",   icon: "🤖", x: 570, y: 60  },
      { id: "a3",  type: "action",    label: "Rapport opmaken",         sublabel: "PDF / Google Slides",       icon: "📊", x: 750, y: 60  },
      { id: "c1",  type: "condition", label: "Afwijking gesignaleerd?", sublabel: "> 10% van forecast",        icon: "⚖️", x: 570, y: 190 },
      { id: "a4",  type: "action",    label: "Alert sturen",            sublabel: "E-mail directie",           icon: "🚨", x: 390, y: 190 },
      { id: "o1",  type: "output",    label: "Rapport verstuurd",       sublabel: "Naar vaste ontvangers",     icon: "✅", x: 750, y: 190 },
    ],
    edges: [
      { from: "t1",  to: "a1"  },
      { from: "a1",  to: "a2"  },
      { from: "a2",  to: "ai1" },
      { from: "ai1", to: "a3"  },
      { from: "a3",  to: "c1"  },
      { from: "c1",  to: "a4",  label: "Ja"  },
      { from: "c1",  to: "o1",  label: "Nee" },
      { from: "a4",  to: "o1"  },
    ],
    steps: [
      { nodeId: "t1",  description: "Elke maandag om 07:00 start de agent automatisch — geen handmatige actie nodig." },
      { nodeId: "a1",  description: "De agent haalt actuele data op uit alle gekoppelde bronnen: Exact Online, het CRM en Google Sheets." },
      { nodeId: "a2",  description: "Alle data wordt samengevoegd, genormaliseerd en gecontroleerd op ontbrekende of afwijkende waarden." },
      { nodeId: "ai1", description: "AI analyseert de cijfers, signaleert trends en formuleert concrete inzichten in begrijpelijke taal." },
      { nodeId: "a3",  description: "Het rapport wordt automatisch opgemaakt als PDF of Google Slide in de huisstijl van het bedrijf." },
      { nodeId: "c1",  description: "Wijken de cijfers meer dan 10% af van de forecast? Dan volgt een extra alert naar de directie." },
      { nodeId: "a4",  description: "De directie ontvangt een e-mail met de specifieke afwijking en een aanbeveling voor actie." },
      { nodeId: "o1",  description: "Het volledige rapport wordt verstuurd naar alle vaste ontvangers. Klaar voor de weekstart." },
    ],
  },
];

const nodeColors: Record<NodeType, { bg: string; border: string; textColor: string }> = {
  trigger:   { bg: "#E8F0DF", border: "#2D5016", textColor: "#2D5016" },
  action:    { bg: "#F5F0E8", border: "#C4852A", textColor: "#C4852A" },
  ai:        { bg: "#1C1C1C", border: "#3D6B20", textColor: "#ffffff" },
  output:    { bg: "#2D5016", border: "#2D5016", textColor: "#ffffff" },
  condition: { bg: "#FDF3E7", border: "#C4852A", textColor: "#C4852A" },
};

function getNodeCenter(node: WorkflowNode) {
  return { x: node.x + 75, y: node.y + 40 };
}

function WorkflowCanvas({ workflow, activeNodeId }: { workflow: Workflow; activeNodeId: string | null }) {
  const svgWidth = 1000;
  const svgHeight = 340;

  const litNodes = new Set<string>();
  const litEdges = new Set<number>();

  if (activeNodeId) {
    // Light up all nodes and edges up to and including the active node
    const activeIdx = workflow.steps.findIndex(s => s.nodeId === activeNodeId);
    for (let i = 0; i <= activeIdx; i++) {
      litNodes.add(workflow.steps[i].nodeId);
    }
    workflow.edges.forEach((edge, i) => {
      if (litNodes.has(edge.from) && litNodes.has(edge.to)) litEdges.add(i);
    });
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: "100%", minWidth: "700px", height: "auto" }}>
        {/* Edges */}
        {workflow.edges.map((edge, i) => {
          const fromNode = workflow.nodes.find(n => n.id === edge.from)!;
          const toNode = workflow.nodes.find(n => n.id === edge.to)!;
          const from = getNodeCenter(fromNode);
          const to = getNodeCenter(toNode);
          const isLit = litEdges.has(i);
          const midX = (from.x + to.x) / 2;

          return (
            <g key={i}>
              <path
                d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                fill="none"
                stroke={isLit ? "var(--green)" : "#D8D0C0"}
                strokeWidth={isLit ? 2 : 1.5}
                strokeDasharray={isLit ? "none" : "4 3"}
                style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
              />
              {/* Arrow head */}
              <circle
                cx={to.x}
                cy={to.y}
                r={3}
                fill={isLit ? "var(--green)" : "#D8D0C0"}
                style={{ transition: "fill 0.4s ease" }}
              />
              {edge.label && (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 6}
                  fontSize={9}
                  fill={isLit ? "var(--green)" : "#8A8A8A"}
                  fontFamily="'DM Sans', sans-serif"
                  textAnchor="middle"
                  style={{ transition: "fill 0.4s ease" }}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {workflow.nodes.map((node) => {
          const colors = nodeColors[node.type];
          const isLit = litNodes.has(node.id);
          const isActive = node.id === activeNodeId;

          return (
            <g key={node.id}>
              <rect
                x={node.x} y={node.y} width={150} height={80}
                rx={8}
                fill={colors.bg}
                stroke={isLit ? colors.border : "#D8D0C0"}
                strokeWidth={isActive ? 2.5 : isLit ? 2 : 1}
                style={{
                  transition: "stroke 0.4s, stroke-width 0.3s",
                  filter: isActive ? `drop-shadow(0 3px 12px ${colors.border}60)` : isLit ? `drop-shadow(0 2px 6px ${colors.border}30)` : "none",
                }}
              />
              <text x={node.x + 10} y={node.y + 24} fontSize={16}>{node.icon}</text>
              <text
                x={node.x + 10} y={node.y + 44}
                fontSize={10.5} fontWeight={600}
                fill={isLit ? colors.textColor : "#8A8A8A"}
                fontFamily="'DM Sans', sans-serif"
                style={{ transition: "fill 0.4s" }}
              >{node.label}</text>
              <text
                x={node.x + 10} y={node.y + 60}
                fontSize={9}
                fill={node.type === "ai" || node.type === "output"
                  ? (isLit ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)")
                  : (isLit ? "#8A8A8A" : "#C0B8B0")}
                fontFamily="'DM Sans', sans-serif"
                style={{ transition: "fill 0.4s" }}
              >{node.sublabel}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function WorkflowShowcase() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const workflow = workflows[activeWorkflow];
  const currentStep = workflow.steps[activeStep];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep(s => {
        if (s >= workflow.steps.length - 1) { clearInterval(interval); return s; }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [activeWorkflow, started, workflow.steps.length]);

  const handleWorkflowChange = (i: number) => {
    setActiveWorkflow(i);
    setActiveStep(0);
    setStarted(true);
  };

  const handleReplay = () => {
    setActiveStep(0);
    setStarted(true);
  };

  return (
    <section id="workflows" className="section" style={{ backgroundColor: "var(--cream)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p style={{
            fontSize: "0.8rem", fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Voorbeelden</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1rem" }}>
            Zo ziet een AI agent eruit
          </h2>
          <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
            Elke stap wordt automatisch uitgevoerd. Mensen hoeven alleen in te grijpen waar het echt nodig is.
          </p>
        </div>

        {/* Tab selector */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {workflows.map((w, i) => (
            <button key={w.id} onClick={() => handleWorkflowChange(i)} style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "4px",
              border: `1px solid ${activeWorkflow === i ? "var(--green)" : "var(--border)"}`,
              backgroundColor: activeWorkflow === i ? "var(--green)" : "var(--white)",
              color: activeWorkflow === i ? "var(--white)" : "var(--ink-light)",
              fontSize: "0.9rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: activeWorkflow === i ? 500 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {w.title}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div ref={ref} style={{
          backgroundColor: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1.2rem", fontWeight: 600 }}>
                  {workflow.title}
                </h3>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 500, color: "var(--green)",
                  backgroundColor: "var(--green-light)", padding: "0.2rem 0.6rem", borderRadius: "20px",
                }}>
                  {workflow.tag}
                </span>
              </div>
              <p style={{ color: "var(--ink-light)", fontSize: "0.92rem", maxWidth: "560px" }}>
                {workflow.description}
              </p>
            </div>
            <button onClick={handleReplay} style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--green-light)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "var(--green)",
              fontSize: "0.82rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
              ▶ Opnieuw afspelen
            </button>
          </div>

          {/* Canvas */}
          <div style={{ padding: "2rem", backgroundColor: "var(--cream)" }}>
            <WorkflowCanvas workflow={workflow} activeNodeId={currentStep?.nodeId ?? null} />
          </div>

          {/* Step description */}
          <div style={{
            padding: "1.25rem 2rem",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--white)",
            minHeight: "72px",
            display: "flex", alignItems: "center", gap: "1.25rem",
          }}>
            {/* Step counter dots */}
            <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
              {workflow.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: i === activeStep ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: i === activeStep ? "var(--green)" : i < activeStep ? "var(--green-light)" : "var(--border)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <p style={{
              fontSize: "0.93rem", color: "var(--ink-light)", lineHeight: 1.6,
              transition: "opacity 0.3s",
            }}>
              <span style={{ fontWeight: 600, color: "var(--ink)", marginRight: "0.5rem" }}>
                Stap {activeStep + 1}/{workflow.steps.length}:
              </span>
              {currentStep?.description}
            </p>
          </div>

          {/* Legend */}
          <div style={{
            padding: "0.85rem 2rem",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--cream)",
            display: "flex", gap: "1.5rem", flexWrap: "wrap",
          }}>
            {(Object.entries(nodeColors) as [NodeType, typeof nodeColors[NodeType]][]).map(([type, colors]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "12px", height: "12px", borderRadius: "2px",
                  backgroundColor: colors.bg, border: `1.5px solid ${colors.border}`,
                }} />
                <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                  {type === "trigger" ? "Trigger" : type === "action" ? "Actie" : type === "ai" ? "AI stap" : type === "condition" ? "Conditie" : "Output"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}