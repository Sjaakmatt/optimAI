// Aanroepen van een FactumAI-MCP vanaf de server.
//
// De MCP's draaien als Cloudflare Workers met Streamable HTTP op /mcp. Ze zijn
// stateless: `initialize` levert meestal geen sessie-id op, en dat hoeft ook
// niet. Wat wél moet:
//
//   - `tenantContext` als genest object binnen `params.arguments`. Een platte
//     organizationId valt buiten het schema en levert een validatiefout op.
//   - de auth-header op élke call, ook op `initialize`.
//   - een mislukte tool komt terug als `result.isError`, niet als JSON-RPC
//     `error`. Beide moeten dus afgevangen worden.
//
// Dit is bewust een eigen, kleine client en geen import uit `@factumai/shared`:
// die kern hoort bij de MCP-repo en wordt aan deze kant gevendord (zie
// factumai-mcps/docs/AGENT-ARCHITECTURE.md §B.2).

const INIT_TIMEOUT_MS = 5_000;
const STANDAARD_TIMEOUT_MS = 30_000;

export class McpFout extends Error {
  constructor(
    message: string,
    readonly mcp: string,
    readonly tool: string,
  ) {
    super(message);
    this.name = 'McpFout';
  }
}

/** Bearer-secret plus, bij een MCP achter een eigen domein, het Access-token. */
export function mcpAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const secret = process.env.FACTUMAI_MCP_INBOUND_SECRET;
  if (secret) headers.Authorization = `Bearer ${secret}`;
  const cfId = process.env.CF_ACCESS_CLIENT_ID;
  const cfSecret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (cfId && cfSecret) {
    headers['CF-Access-Client-Id'] = cfId;
    headers['CF-Access-Client-Secret'] = cfSecret;
  }
  return headers;
}

/**
 * Streamable HTTP geeft óf een SSE-stream óf gewone JSON terug. Bij SSE is het
 * laatste data-event het antwoord.
 */
export function parseStreamableHttpResponse(text: string): unknown {
  const sseMatches = text.matchAll(/^data:\s*(.+)$/gm);
  let lastJson: unknown | null = null;
  for (const match of sseMatches) {
    try {
      lastJson = JSON.parse(match[1]);
    } catch {
      // volgende event proberen
    }
  }
  if (lastJson !== null) return lastJson;
  return JSON.parse(text);
}

let mcpRequestId = 0;

export interface McpAanroep {
  /** Volledige URL van de MCP, inclusief /mcp. */
  baseUrl: string;
  tool: string;
  argumenten: Record<string, unknown>;
  /** Wie er aanroept; komt in de tool-call-logs van de MCP terecht. */
  agentId: string;
  organizationId?: string;
  timeoutMs?: number;
}

/**
 * Roept één tool aan en geeft de geparste JSON uit het tekstblok terug. Gooit
 * een `McpFout` bij transport-, protocol- én toolfouten, zodat de aanroeper
 * maar één ding hoeft af te vangen.
 */
export async function roepMcpTool<T>(aanroep: McpAanroep): Promise<T> {
  const { baseUrl, tool, argumenten, agentId } = aanroep;
  const timeoutMs = aanroep.timeoutMs ?? STANDAARD_TIMEOUT_MS;
  const mcpNaam = mcpNaamUitUrl(baseUrl);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    ...mcpAuthHeaders(),
  };

  const initRes = await fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'factumai-website', version: '1.0.0' },
      },
      id: ++mcpRequestId,
    }),
    signal: AbortSignal.timeout(INIT_TIMEOUT_MS),
  });
  if (!initRes.ok) {
    throw new McpFout(`initialize gaf HTTP ${initRes.status}`, mcpNaam, tool);
  }
  const sessionId = initRes.headers.get('mcp-session-id') ?? '';
  await initRes.text();

  const toolCallId = `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: sessionId ? { ...headers, 'Mcp-Session-Id': sessionId } : headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: tool,
        arguments: {
          ...argumenten,
          tenantContext: {
            organizationId:
              aanroep.organizationId ?? process.env.FACTUMAI_MCP_ORG_ID ?? 'factumai-website',
            agentId,
            toolCallId,
          },
        },
      },
      id: ++mcpRequestId,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    throw new McpFout(`tools/call gaf HTTP ${res.status}`, mcpNaam, tool);
  }

  const payload = parseStreamableHttpResponse(await res.text()) as {
    error?: { message: string };
    result?: { isError?: boolean; content?: Array<{ type: string; text?: string }> };
  };
  if (payload.error) throw new McpFout(payload.error.message, mcpNaam, tool);

  const textBlock = payload.result?.content?.find((c) => c.type === 'text');
  if (payload.result?.isError) {
    throw new McpFout(textBlock?.text ?? 'tool gaf een fout terug', mcpNaam, tool);
  }
  if (!textBlock?.text) throw new McpFout('tool gaf geen inhoud terug', mcpNaam, tool);

  try {
    return JSON.parse(textBlock.text) as T;
  } catch {
    throw new McpFout('tool gaf geen geldige JSON terug', mcpNaam, tool);
  }
}

/** Alleen voor logregels: 'factumai-mcp-scheduling' uit de worker-URL. */
function mcpNaamUitUrl(baseUrl: string): string {
  try {
    return new URL(baseUrl).hostname.split('.')[0];
  } catch {
    return baseUrl;
  }
}
