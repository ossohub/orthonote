-- ============================================================
-- OssoHub — Banco de Questões (múltipla escolha A-E + ranking)
-- Execute no Supabase SQL Editor DEPOIS do schema.sql
-- ============================================================
--
-- Resumo da segurança:
--   - Qualquer usuário autenticado pode criar questões (author_id = auth.uid()).
--   - A resposta certa (correct_option) e o comentário (explanation) NUNCA podem
--     ser lidos via select direto na tabela `questions` — as colunas são
--     revogadas do role `authenticated` (ver REVOKE/GRANT abaixo). Só a função
--     answer_question_item() enxerga essas colunas, e só devolve a resposta ao
--     cliente depois que ele já respondeu aquela questão específica.
--   - question_tests / question_test_items não têm policy de INSERT/UPDATE:
--     só podem ser criados/alterados pelas funções SECURITY DEFINER abaixo, o
--     que impede o usuário de forjar o próprio placar editando o banco direto
--     (mesmo padrão já usado em award_self_xp/unlock_badge neste projeto).
--   - question_stats (usado no ranking público) só é escrito pela função
--     answer_question_item(), nunca pelo cliente.

-- ============================================================
-- TABELA: questions
-- ============================================================
CREATE TABLE public.questions (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  area            TEXT        NOT NULL,
  source          TEXT,
  statement       TEXT        NOT NULL,
  image_url       TEXT,
  option_a        TEXT        NOT NULL,
  option_b        TEXT        NOT NULL,
  option_c        TEXT        NOT NULL,
  option_d        TEXT        NOT NULL,
  option_e        TEXT        NOT NULL,
  correct_option  CHAR(1)     NOT NULL CHECK (correct_option IN ('A','B','C','D','E')),
  explanation     TEXT,
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
  times_answered  INT         NOT NULL DEFAULT 0,
  times_correct   INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_questions_area     ON public.questions(area);
CREATE INDEX idx_questions_author   ON public.questions(author_id);
CREATE INDEX idx_questions_active   ON public.questions(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_questions_created  ON public.questions(created_at DESC);

-- ============================================================
-- TABELA: question_tests (uma sessão de teste/simulado)
-- ============================================================
CREATE TABLE public.question_tests (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  area           TEXT,       -- NULL = todas as áreas
  num_questions  INT         NOT NULL CHECK (num_questions BETWEEN 1 AND 50),
  correct_count  INT         NOT NULL DEFAULT 0,
  wrong_count    INT         NOT NULL DEFAULT 0,
  status         TEXT        NOT NULL DEFAULT 'em_andamento' CHECK (status IN ('em_andamento','concluido')),
  started_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at    TIMESTAMPTZ
);

CREATE INDEX idx_qtests_user ON public.question_tests(user_id);

-- ============================================================
-- TABELA: question_test_items (questões sorteadas + resposta dada)
-- ============================================================
CREATE TABLE public.question_test_items (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id          UUID        NOT NULL REFERENCES public.question_tests(id) ON DELETE CASCADE,
  question_id      UUID        NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  order_index      INT         NOT NULL,
  selected_option  CHAR(1)     CHECK (selected_option IN ('A','B','C','D','E')),
  is_correct       BOOLEAN,
  answered_at      TIMESTAMPTZ,
  UNIQUE (test_id, order_index),
  UNIQUE (test_id, question_id)
);

CREATE INDEX idx_qtitems_test     ON public.question_test_items(test_id);
CREATE INDEX idx_qtitems_question ON public.question_test_items(question_id);

-- ============================================================
-- TABELA: question_stats (cache agregado — ranking público rápido)
-- ============================================================
CREATE TABLE public.question_stats (
  user_id         UUID        PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_correct   INT         NOT NULL DEFAULT 0,
  total_wrong     INT         NOT NULL DEFAULT 0,
  total_answered  INT         NOT NULL DEFAULT 0,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questões ativas visíveis para autenticados"
  ON public.questions FOR SELECT
  USING (auth.role() = 'authenticated' AND (is_active = TRUE OR author_id = auth.uid()));

CREATE POLICY "Qualquer autor autenticado cria questões"
  ON public.questions FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autor edita sua própria questão"
  ON public.questions FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autor apaga sua própria questão"
  ON public.questions FOR DELETE
  USING (auth.uid() = author_id);

ALTER TABLE public.question_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário vê seus próprios testes"
  ON public.question_tests FOR SELECT
  USING (auth.uid() = user_id);
-- Sem policy de INSERT/UPDATE: só start_question_test()/finish_question_test() escrevem aqui.

ALTER TABLE public.question_test_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário vê os itens dos seus próprios testes"
  ON public.question_test_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.question_tests qt
    WHERE qt.id = question_test_items.test_id AND qt.user_id = auth.uid()
  ));
-- Sem policy de INSERT/UPDATE: só start_question_test()/answer_question_item() escrevem aqui.

ALTER TABLE public.question_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Estatísticas visíveis para todos autenticados (ranking público)"
  ON public.question_stats FOR SELECT
  USING (auth.role() = 'authenticated');
-- Sem policy de INSERT/UPDATE: só answer_question_item() escreve aqui.

-- ============================================================
-- Proteção da resposta certa: revoga SELECT geral e regrante
-- apenas as colunas seguras. correct_option/explanation ficam
-- ilegíveis via select direto para qualquer usuário (inclusive
-- o autor da questão) — só a função abaixo enxerga essas colunas.
-- ============================================================
REVOKE SELECT ON public.questions FROM authenticated, anon;
GRANT SELECT (
  id, author_id, area, source, statement, image_url,
  option_a, option_b, option_c, option_d, option_e,
  is_active, times_answered, times_correct, created_at, updated_at
) ON public.questions TO authenticated;

-- ============================================================
-- FUNÇÃO: start_question_test — sorteia N questões e cria o teste
-- ============================================================
CREATE OR REPLACE FUNCTION public.start_question_test(p_area TEXT DEFAULT NULL, p_num_questions INT DEFAULT 10)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_test_id UUID;
  v_count   INT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  IF p_num_questions IS NULL OR p_num_questions < 1 OR p_num_questions > 50 THEN
    RAISE EXCEPTION 'Número de questões deve ser entre 1 e 50';
  END IF;

  INSERT INTO public.question_tests (user_id, area, num_questions)
  VALUES (auth.uid(), NULLIF(p_area, ''), p_num_questions)
  RETURNING id INTO v_test_id;

  INSERT INTO public.question_test_items (test_id, question_id, order_index)
  SELECT v_test_id, q.id, (row_number() OVER ()) - 1
  FROM (
    SELECT id FROM public.questions
    WHERE is_active = TRUE
      AND (p_area IS NULL OR p_area = '' OR area = p_area)
    ORDER BY random()
    LIMIT p_num_questions
  ) q;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count = 0 THEN
    DELETE FROM public.question_tests WHERE id = v_test_id;
    RAISE EXCEPTION 'Ainda não há questões cadastradas para essa área';
  END IF;

  -- ajusta para a quantidade realmente sorteada (caso existam menos questões que o pedido)
  UPDATE public.question_tests SET num_questions = v_count WHERE id = v_test_id;

  RETURN v_test_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.start_question_test(TEXT, INT) TO authenticated;

-- ============================================================
-- FUNÇÃO: answer_question_item — corrige a resposta no servidor
-- e atualiza teste + estatísticas de forma atômica
-- ============================================================
CREATE OR REPLACE FUNCTION public.answer_question_item(p_item_id UUID, p_selected CHAR(1))
RETURNS TABLE(is_correct BOOLEAN, correct_option CHAR(1), explanation TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_test_id     UUID;
  v_question_id UUID;
  v_already     CHAR(1);
  v_correct     CHAR(1);
  v_explanation TEXT;
  v_is_correct  BOOLEAN;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  IF p_selected IS NULL OR p_selected NOT IN ('A','B','C','D','E') THEN
    RAISE EXCEPTION 'Alternativa inválida';
  END IF;

  SELECT qti.test_id, qti.question_id, qti.selected_option
    INTO v_test_id, v_question_id, v_already
  FROM public.question_test_items qti
  JOIN public.question_tests qt ON qt.id = qti.test_id
  WHERE qti.id = p_item_id AND qt.user_id = auth.uid()
  FOR UPDATE;

  IF v_test_id IS NULL THEN
    RAISE EXCEPTION 'Item de teste não encontrado';
  END IF;

  IF v_already IS NOT NULL THEN
    RAISE EXCEPTION 'Essa questão já foi respondida';
  END IF;

  SELECT q.correct_option, q.explanation INTO v_correct, v_explanation
  FROM public.questions q WHERE q.id = v_question_id;

  v_is_correct := (v_correct = p_selected);

  UPDATE public.question_test_items
  SET selected_option = p_selected, is_correct = v_is_correct, answered_at = NOW()
  WHERE id = p_item_id;

  UPDATE public.question_tests
  SET correct_count = correct_count + CASE WHEN v_is_correct THEN 1 ELSE 0 END,
      wrong_count   = wrong_count   + CASE WHEN v_is_correct THEN 0 ELSE 1 END
  WHERE id = v_test_id;

  UPDATE public.questions
  SET times_answered = times_answered + 1,
      times_correct  = times_correct + CASE WHEN v_is_correct THEN 1 ELSE 0 END
  WHERE id = v_question_id;

  INSERT INTO public.question_stats (user_id, total_correct, total_wrong, total_answered, updated_at)
  VALUES (
    auth.uid(),
    CASE WHEN v_is_correct THEN 1 ELSE 0 END,
    CASE WHEN v_is_correct THEN 0 ELSE 1 END,
    1,
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_correct  = public.question_stats.total_correct  + CASE WHEN v_is_correct THEN 1 ELSE 0 END,
    total_wrong    = public.question_stats.total_wrong    + CASE WHEN v_is_correct THEN 0 ELSE 1 END,
    total_answered = public.question_stats.total_answered + 1,
    updated_at     = NOW();

  RETURN QUERY SELECT v_is_correct, v_correct, v_explanation;
END;
$$;

GRANT EXECUTE ON FUNCTION public.answer_question_item(UUID, CHAR) TO authenticated;

-- ============================================================
-- FUNÇÃO: finish_question_test — encerra a sessão de teste
-- ============================================================
CREATE OR REPLACE FUNCTION public.finish_question_test(p_test_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  UPDATE public.question_tests
  SET status = 'concluido', finished_at = NOW()
  WHERE id = p_test_id AND user_id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.finish_question_test(UUID) TO authenticated;

-- ============================================================
-- STORAGE: bucket para imagens das questões
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('question-images', 'question-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imagens de questões públicas para leitura"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'question-images');

CREATE POLICY "Autenticado faz upload de imagem de questão"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'question-images' AND auth.role() = 'authenticated');

-- ============================================================
-- REALTIME (opcional — habilitar no dashboard se quiser
-- atualização automática do ranking):
-- Database > Replication > habilitar para: question_stats
-- ============================================================
