-- ============================================================
-- OssoHub — Desempenho (Equipes/Cronograma/Gráficos)
-- Execute no Supabase SQL Editor DEPOIS de schema.sql e
-- migration_banco_questoes.sql
-- ============================================================
--
-- Resumo:
--   - "Equipe" = programa de residência: um preceptor cria a equipe
--     e convida residentes (por CRM ou e-mail). O convite fica
--     'pending' até o residente aceitar/recusar. Só membros 'active'
--     contam para as permissões de visualização abaixo.
--   - Cronograma é auto-cadastrado pelo próprio residente
--     (resident_id = auth.uid()); o preceptor de uma equipe onde o
--     residente é membro 'active' só enxerga (SELECT), nunca edita.
--   - Gráficos de desempenho por área usam os dados que já existem
--     em question_tests/question_test_items (Banco de Questões) —
--     por isso as policies de SELECT dessas duas tabelas são
--     estendidas aqui para também liberar leitura ao preceptor.
--   - Convites e respostas nunca são escritos direto pelo cliente:
--     passam por invite_resident_to_team()/respond_team_invite()
--     (SECURITY DEFINER), no mesmo padrão de award_self_xp/
--     answer_question_item já usado neste projeto.

-- ============================================================
-- ENUM: novos tipos de notificação (convite de equipe)
-- Executado antes do restante para já estar "commitado" quando as
-- funções abaixo tentarem inserir notifications com esses valores.
-- ============================================================
ALTER TYPE notification_type ADD VALUE IF NOT EXISTS 'team_invite';
ALTER TYPE notification_type ADD VALUE IF NOT EXISTS 'team_invite_response';

-- ============================================================
-- TABELA: teams (equipe/programa de residência)
-- ============================================================
CREATE TABLE public.teams (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  preceptor_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  institution   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_teams_preceptor ON public.teams(preceptor_id);

-- ============================================================
-- TABELA: team_members (vínculo preceptor↔residente)
-- ============================================================
CREATE TABLE public.team_members (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id       UUID        NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  resident_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status        TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','declined')),
  invited_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at  TIMESTAMPTZ,
  UNIQUE (team_id, resident_id)
);

CREATE INDEX idx_team_members_team     ON public.team_members(team_id);
CREATE INDEX idx_team_members_resident ON public.team_members(resident_id);

-- ============================================================
-- TABELA: schedule_entries (Cronograma — auto-cadastrado pelo residente)
-- ============================================================
CREATE TABLE public.schedule_entries (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  location     TEXT,
  starts_at    TIMESTAMPTZ NOT NULL,
  ends_at      TIMESTAMPTZ NOT NULL,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE TRIGGER schedule_entries_updated_at
  BEFORE UPDATE ON public.schedule_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_schedule_resident ON public.schedule_entries(resident_id);
CREATE INDEX idx_schedule_starts   ON public.schedule_entries(starts_at);

-- ============================================================
-- ROW LEVEL SECURITY: teams
-- ============================================================
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Preceptor e membros ativos veem a equipe"
  ON public.teams FOR SELECT
  USING (
    preceptor_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.team_members tm
      WHERE tm.team_id = teams.id AND tm.resident_id = auth.uid() AND tm.status = 'active'
    )
  );

CREATE POLICY "Preceptor cria equipe"
  ON public.teams FOR INSERT
  WITH CHECK (preceptor_id = auth.uid());

CREATE POLICY "Preceptor edita sua equipe"
  ON public.teams FOR UPDATE
  USING (preceptor_id = auth.uid())
  WITH CHECK (preceptor_id = auth.uid());

CREATE POLICY "Preceptor apaga sua equipe"
  ON public.teams FOR DELETE
  USING (preceptor_id = auth.uid());

-- ============================================================
-- ROW LEVEL SECURITY: team_members
-- Sem policy de INSERT/UPDATE: só invite_resident_to_team() e
-- respond_team_invite() (SECURITY DEFINER) escrevem/alteram aqui —
-- impede o preceptor de se "auto-aceitar" e o residente de entrar
-- numa equipe sem convite.
-- ============================================================
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Preceptor ou residente vê a membership"
  ON public.team_members FOR SELECT
  USING (
    resident_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.preceptor_id = auth.uid())
  );

CREATE POLICY "Preceptor remove membro ou residente sai da equipe"
  ON public.team_members FOR DELETE
  USING (
    resident_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.preceptor_id = auth.uid())
  );

-- ============================================================
-- ROW LEVEL SECURITY: schedule_entries
-- ============================================================
ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Residente vê o próprio cronograma; preceptor vê o da equipe"
  ON public.schedule_entries FOR SELECT
  USING (
    resident_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.teams t ON t.id = tm.team_id
      WHERE tm.resident_id = schedule_entries.resident_id
        AND tm.status = 'active'
        AND t.preceptor_id = auth.uid()
    )
  );

CREATE POLICY "Residente cria seu cronograma"
  ON public.schedule_entries FOR INSERT
  WITH CHECK (resident_id = auth.uid());

CREATE POLICY "Residente edita seu cronograma"
  ON public.schedule_entries FOR UPDATE
  USING (resident_id = auth.uid())
  WITH CHECK (resident_id = auth.uid());

CREATE POLICY "Residente apaga seu cronograma"
  ON public.schedule_entries FOR DELETE
  USING (resident_id = auth.uid());

-- ============================================================
-- Estende a visibilidade de question_tests/question_test_items
-- para o preceptor conseguir montar o gráfico/alerta do residente
-- (só leitura; nada muda nas regras de escrita, que continuam
-- exclusivas das funções SECURITY DEFINER do Banco de Questões).
-- ============================================================
DROP POLICY IF EXISTS "Usuário vê seus próprios testes" ON public.question_tests;

CREATE POLICY "Usuário vê os próprios testes; preceptor vê os da equipe"
  ON public.question_tests FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.teams t ON t.id = tm.team_id
      WHERE tm.resident_id = question_tests.user_id
        AND tm.status = 'active'
        AND t.preceptor_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuário vê os itens dos seus próprios testes" ON public.question_test_items;

CREATE POLICY "Usuário vê os itens dos próprios testes; preceptor vê os da equipe"
  ON public.question_test_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.question_tests qt
    WHERE qt.id = question_test_items.test_id
      AND (
        qt.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.team_members tm
          JOIN public.teams t ON t.id = tm.team_id
          WHERE tm.resident_id = qt.user_id
            AND tm.status = 'active'
            AND t.preceptor_id = auth.uid()
        )
      )
  ));

-- ============================================================
-- FUNÇÃO: invite_resident_to_team — preceptor convida por CRM ou e-mail
-- ============================================================
CREATE OR REPLACE FUNCTION public.invite_resident_to_team(p_team_id UUID, p_identifier TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_resident_id    UUID;
  v_membership_id  UUID;
  v_team_name      TEXT;
  v_preceptor_name TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  IF p_identifier IS NULL OR trim(p_identifier) = '' THEN
    RAISE EXCEPTION 'Informe o CRM ou e-mail do residente';
  END IF;

  SELECT name INTO v_team_name FROM public.teams WHERE id = p_team_id AND preceptor_id = auth.uid();
  IF v_team_name IS NULL THEN
    RAISE EXCEPTION 'Equipe não encontrada ou você não é o preceptor responsável';
  END IF;

  -- procura por CRM primeiro; se não achar, procura por e-mail em
  -- auth.users (só é visível aqui por a função ser SECURITY DEFINER —
  -- o cliente nunca tem select direto em auth.users).
  SELECT p.id INTO v_resident_id FROM public.profiles p WHERE p.crm = trim(p_identifier);

  IF v_resident_id IS NULL THEN
    SELECT u.id INTO v_resident_id FROM auth.users u WHERE lower(u.email) = lower(trim(p_identifier));
  END IF;

  IF v_resident_id IS NULL THEN
    RAISE EXCEPTION 'Nenhum ortopedista encontrado com esse CRM ou e-mail';
  END IF;

  IF v_resident_id = auth.uid() THEN
    RAISE EXCEPTION 'Você não pode se convidar para a própria equipe';
  END IF;

  INSERT INTO public.team_members (team_id, resident_id, status)
  VALUES (p_team_id, v_resident_id, 'pending')
  ON CONFLICT (team_id, resident_id) DO UPDATE SET
    status       = CASE WHEN public.team_members.status = 'active' THEN 'active' ELSE 'pending' END,
    invited_at   = CASE WHEN public.team_members.status = 'active' THEN public.team_members.invited_at ELSE NOW() END,
    responded_at = CASE WHEN public.team_members.status = 'active' THEN public.team_members.responded_at ELSE NULL END
  RETURNING id INTO v_membership_id;

  SELECT full_name INTO v_preceptor_name FROM public.profiles WHERE id = auth.uid();

  INSERT INTO public.notifications (user_id, type, actor_id, reference_id, message)
  VALUES (
    v_resident_id,
    'team_invite',
    auth.uid(),
    p_team_id,
    COALESCE(v_preceptor_name, 'Um preceptor') || ' convidou você para a equipe "' || v_team_name || '" em Desempenho'
  );

  RETURN v_membership_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.invite_resident_to_team(UUID, TEXT) TO authenticated;

-- ============================================================
-- FUNÇÃO: respond_team_invite — residente aceita/recusa o convite
-- ============================================================
CREATE OR REPLACE FUNCTION public.respond_team_invite(p_membership_id UUID, p_accept BOOLEAN)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_team_id       UUID;
  v_preceptor_id  UUID;
  v_team_name     TEXT;
  v_resident_name TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  SELECT tm.team_id, t.preceptor_id, t.name
    INTO v_team_id, v_preceptor_id, v_team_name
  FROM public.team_members tm
  JOIN public.teams t ON t.id = tm.team_id
  WHERE tm.id = p_membership_id AND tm.resident_id = auth.uid() AND tm.status = 'pending';

  IF v_team_id IS NULL THEN
    RAISE EXCEPTION 'Convite não encontrado ou já respondido';
  END IF;

  UPDATE public.team_members
  SET status = CASE WHEN p_accept THEN 'active' ELSE 'declined' END,
      responded_at = NOW()
  WHERE id = p_membership_id;

  SELECT full_name INTO v_resident_name FROM public.profiles WHERE id = auth.uid();

  INSERT INTO public.notifications (user_id, type, actor_id, reference_id, message)
  VALUES (
    v_preceptor_id,
    'team_invite_response',
    auth.uid(),
    v_team_id,
    COALESCE(v_resident_name, 'Um residente') || (CASE WHEN p_accept THEN ' aceitou' ELSE ' recusou' END) || ' o convite para a equipe "' || v_team_name || '"'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.respond_team_invite(UUID, BOOLEAN) TO authenticated;
