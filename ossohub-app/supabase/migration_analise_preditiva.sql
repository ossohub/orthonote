-- ============================================================
-- OssoHub — Análise Preditiva de Desempenho (Residentes)
-- Execute no Supabase SQL Editor DEPOIS de todas as migrações
-- anteriores (schema.sql, migration_banco_questoes.sql,
-- migration_desempenho.sql, migration_residencias_salas_provas.sql).
-- ============================================================
--
-- Resumo:
--   - resident_features: snapshot diário (1 linha por residente por
--     dia) com as métricas de engajamento/XP e o risk_score já
--     calculado. É esse histórico que alimenta tanto a resposta da
--     API quanto o gráfico de evolução de 90 dias no dashboard —
--     não existe uma tabela de histórico separada.
--   - O cálculo do risco NÃO roda dentro do banco (nenhuma função
--     PL/pgSQL de regra de negócio aqui) — roda em
--     src/lib/residentRisk.ts (server-only, Node/TypeScript),
--     chamado sob demanda pelo endpoint
--     GET /api/v1/resident/[user_id]/risk (quando o snapshot do dia
--     ainda não existe) e em lote pelo cron diário
--     (/api/internal/cron/resident-risk). Só esse código, usando a
--     service_role key, escreve nesta tabela — por isso não existe
--     nenhuma policy de INSERT/UPDATE para o papel 'authenticated'
--     abaixo (RLS nega por padrão pra quem não tem policy; o
--     service_role sempre ignora RLS).
--   - Consentimento LGPD reaproveita a tabela consent_logs que já
--     existe no banco (mesmo padrão usado para termos_de_uso /
--     politica_privacidade), só adicionando 'analise_preditiva' como
--     novo consent_type permitido — evita criar uma segunda
--     estrutura de consentimento paralela.
--   - Elegibilidade pro módulo: profiles.professional_role =
--     'medico_residente'. É o gate usado tanto no frontend quanto no
--     endpoint da API.

-- ============================================================
-- 1. Consentimento — estende o CHECK de consent_logs.consent_type
-- ============================================================
ALTER TABLE public.consent_logs
  DROP CONSTRAINT IF EXISTS consent_logs_consent_type_check;

ALTER TABLE public.consent_logs
  ADD CONSTRAINT consent_logs_consent_type_check
  CHECK (consent_type = ANY (ARRAY[
    'termos_de_uso'::text,
    'politica_privacidade'::text,
    'termo_dados_pacientes'::text,
    'cookies'::text,
    'analise_preditiva'::text
  ]));

-- ============================================================
-- 2. resident_features — snapshot diário de features + risco
-- ============================================================
CREATE TABLE IF NOT EXISTS public.resident_features (
  id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date                 DATE         NOT NULL DEFAULT CURRENT_DATE,

  -- Features de engajamento — janelas móveis terminando em `date`
  xp_gain_7d           INT          NOT NULL DEFAULT 0,
  xp_gain_30d          INT          NOT NULL DEFAULT 0,
  xp_gain_90d          INT          NOT NULL DEFAULT 0,
  cases_published_30d  INT          NOT NULL DEFAULT 0,
  comments_30d         INT          NOT NULL DEFAULT 0,
  login_days_30d       INT          NOT NULL DEFAULT 0,
  engagement_score     NUMERIC(5,2) NOT NULL DEFAULT 0,  -- 0-100

  -- Saída do modelo de risco (regras no MVP; XGBoost/Random Forest
  -- no futuro — ver bloco marcado em src/lib/residentRisk.ts)
  risk_score           NUMERIC(4,3) NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 1),
  risk_level           TEXT         NOT NULL DEFAULT 'baixo' CHECK (risk_level IN ('baixo', 'médio', 'alto')),
  top_reasons          JSONB        NOT NULL DEFAULT '[]'::jsonb,
  recommendations      JSONB        NOT NULL DEFAULT '[]'::jsonb,

  -- Metadados de depuração/auditoria do modelo
  peer_group_size      INT,                              -- nº de residentes usados na comparação de z-score
  model_version        TEXT         NOT NULL DEFAULT 'rules-v1',  -- troca pra "xgboost-v1" quando o modelo de ML entrar

  created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_resident_features_user_date
  ON public.resident_features (user_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_resident_features_date
  ON public.resident_features (date);

DROP TRIGGER IF EXISTS resident_features_updated_at ON public.resident_features;
CREATE TRIGGER resident_features_updated_at
  BEFORE UPDATE ON public.resident_features
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

COMMENT ON TABLE public.resident_features IS
  'Snapshot diário de engajamento/risco por residente (módulo Análise Preditiva de Desempenho). Só gravado pelo service_role (endpoint on-demand + cron) — nunca direto pelo cliente.';

-- RLS: só o próprio residente lê o próprio histórico. Nenhuma
-- policy de INSERT/UPDATE/DELETE pra 'authenticated' de propósito —
-- garante que o cliente nunca consegue forjar/alterar o próprio
-- risk_score, só o service_role grava.
ALTER TABLE public.resident_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Residente vê apenas seu próprio histórico de risco"
  ON public.resident_features FOR SELECT
  USING (auth.uid() = user_id);
