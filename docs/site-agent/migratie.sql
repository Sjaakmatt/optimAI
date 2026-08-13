-- Site-agent, datamodel. Toegepast op de dashboard-database (Supabase project
-- factumai-dashboard, ref zaifgoujlpcwvrxjkhzy) via de Supabase-MCP op
-- 13 augustus 2026, in drie stappen:
--
--   site_agent_leadbron_website_agent
--   site_agent_conversations
--   site_agent_counters
--
-- Additief: er wordt niets gedropt of gewijzigd aan bestaande objecten. Dit
-- bestand is de kopie voor de dashboard-repo, zodat Prisma de migratie als
-- toegepast kan markeren (`prisma migrate resolve --applied`). Zie
-- schema-voorstel.prisma voor de instructie.
--
-- De ALTER TYPE hoort in een eigen migratie: een nieuwe enum-waarde mag in
-- Postgres niet gebruikt worden in dezelfde transactie waarin hij is
-- toegevoegd.

-- ---------------------------------------------------------------------------
-- 1. Eigen leadbron, los van WEBSITE_FORM, zodat meetbaar blijft of de agent
--    leads oplevert.
-- ---------------------------------------------------------------------------

ALTER TYPE "LeadBron" ADD VALUE IF NOT EXISTS 'WEBSITE_AGENT';

-- ---------------------------------------------------------------------------
-- 2. Gesprekken en berichten.
--    De website schrijft via de service-role (zoals bij ScanLead); RLS staat
--    aan als vangnet voor alle andere rollen.
-- ---------------------------------------------------------------------------

CREATE TABLE "SiteConversation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "paginaPad" TEXT NOT NULL,
    "playbook" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgentHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "score" "LeadScore",
    "scoreReason" TEXT,
    "samenvatting" TEXT,
    "afspraakGeboekt" BOOLEAN NOT NULL DEFAULT false,
    "leadId" TEXT,
    "totaalTokens" INTEGER NOT NULL DEFAULT 0,
    "kostenUsd" DECIMAL(10,4),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SiteConversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SiteMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "inhoud" TEXT NOT NULL,
    "toolCalls" JSONB,
    "geblokkeerd" BOOLEAN NOT NULL DEFAULT false,
    "blokReden" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SiteConversation_sessionId_key" ON "SiteConversation"("sessionId");
CREATE INDEX "SiteConversation_organizationId_createdAt_idx" ON "SiteConversation"("organizationId", "createdAt");
CREATE INDEX "SiteConversation_expiresAt_idx" ON "SiteConversation"("expiresAt");
CREATE INDEX "SiteConversation_leadId_idx" ON "SiteConversation"("leadId");
CREATE INDEX "SiteMessage_conversationId_createdAt_idx" ON "SiteMessage"("conversationId", "createdAt");

ALTER TABLE "SiteConversation" ADD CONSTRAINT "SiteConversation_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SiteConversation" ADD CONSTRAINT "SiteConversation_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SiteMessage" ADD CONSTRAINT "SiteMessage_conversationId_fkey"
    FOREIGN KEY ("conversationId") REFERENCES "SiteConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

COMMENT ON TABLE "SiteConversation" IS 'Gesprekken met de site-agent op factumai.nl. Server-only writes via service-role. expiresAt draagt het retentiebeleid (90 dagen).';
COMMENT ON TABLE "SiteMessage" IS 'Berichten binnen een SiteConversation. geblokkeerd/blokReden leggen vast wanneer de outputcontrole heeft ingegrepen.';

ALTER TABLE "SiteConversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteMessage" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_conversation_select" ON "SiteConversation" FOR SELECT
    USING (is_super_admin_v2() OR ("organizationId" = current_organization_id_v2()));
CREATE POLICY "site_conversation_write" ON "SiteConversation" FOR ALL
    USING (is_super_admin_v2() OR ("organizationId" = current_organization_id_v2()));

CREATE POLICY "site_message_select" ON "SiteMessage" FOR SELECT
    USING (is_super_admin_v2() OR EXISTS (
        SELECT 1 FROM "SiteConversation" c
        WHERE c."id" = "SiteMessage"."conversationId"
          AND c."organizationId" = current_organization_id_v2()
    ));
CREATE POLICY "site_message_write" ON "SiteMessage" FOR ALL
    USING (is_super_admin_v2() OR EXISTS (
        SELECT 1 FROM "SiteConversation" c
        WHERE c."id" = "SiteMessage"."conversationId"
          AND c."organizationId" = current_organization_id_v2()
    ));

-- ---------------------------------------------------------------------------
-- 3. Tellers voor rate limiting en het dagelijkse kostenplafond.
-- ---------------------------------------------------------------------------

CREATE TABLE "SiteAgentCounter" (
    "id" TEXT NOT NULL,
    "soort" TEXT NOT NULL,
    "sleutel" TEXT NOT NULL,
    "vensterStart" TIMESTAMP(3) NOT NULL,
    "aantal" INTEGER NOT NULL DEFAULT 0,
    "kostenUsd" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteAgentCounter_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SiteAgentCounter_soort_sleutel_vensterStart_key"
    ON "SiteAgentCounter"("soort", "sleutel", "vensterStart");
CREATE INDEX "SiteAgentCounter_expiresAt_idx" ON "SiteAgentCounter"("expiresAt");

COMMENT ON TABLE "SiteAgentCounter" IS 'Tellers voor rate limiting en kostenplafond van de site-agent. Sleutels zijn gehasht (IP) of opaque (sessie); geen persoonsgegevens. expiresAt ruimt op.';

ALTER TABLE "SiteAgentCounter" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_agent_counter_select" ON "SiteAgentCounter" FOR SELECT
    USING (is_super_admin_v2());
CREATE POLICY "site_agent_counter_write" ON "SiteAgentCounter" FOR ALL
    USING (is_super_admin_v2());

CREATE OR REPLACE FUNCTION site_agent_tel(
    p_soort TEXT,
    p_sleutel TEXT,
    p_venster TIMESTAMP(3),
    p_ttl_seconden INTEGER,
    p_aantal INTEGER DEFAULT 1,
    p_kosten DECIMAL(10,4) DEFAULT 0
)
RETURNS TABLE ("aantal" INTEGER, "kostenUsd" DECIMAL(10,4))
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO "SiteAgentCounter" AS c (
        "id", "soort", "sleutel", "vensterStart", "aantal", "kostenUsd", "expiresAt", "updatedAt"
    )
    VALUES (
        gen_random_uuid()::text, p_soort, p_sleutel, p_venster, p_aantal, p_kosten,
        p_venster + make_interval(secs => p_ttl_seconden), CURRENT_TIMESTAMP
    )
    ON CONFLICT ("soort", "sleutel", "vensterStart") DO UPDATE
    SET "aantal" = c."aantal" + EXCLUDED."aantal",
        "kostenUsd" = c."kostenUsd" + EXCLUDED."kostenUsd",
        "updatedAt" = CURRENT_TIMESTAMP
    RETURNING c."aantal", c."kostenUsd";
END;
$$;

COMMENT ON FUNCTION site_agent_tel IS 'Hoogt een teller atomair op en geeft de nieuwe stand terug. Gebruikt door de rate limiting en het kostenplafond van de site-agent.';
