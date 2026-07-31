-- ============================================================
-- OssoHub — Flashcards
-- Execute no Supabase SQL Editor DEPOIS de schema.sql e
-- migration_banco_questoes.sql (a geração automática a partir do
-- banco de questões lê a tabela public.questions).
-- ============================================================
--
-- Resumo:
--   - Todo flashcard é salvo já categorizado por área de estudo
--     (mesma taxonomia usada no Banco de Questões — QUESTION_AREAS
--     no front-end), tanto os criados manualmente quanto os gerados
--     automaticamente.
--   - `origin` registra a proveniência: 'manual' (o usuário escreveu),
--     'auto_question' (gerado a partir do Banco de Questões) ou
--     'auto_classification' (gerado a partir do banco de Classificações
--     — esse conteúdo-fonte é estático no front-end, então a inserção
--     em si acontece via INSERT comum, sem RPC).
--   - `is_public` controla o compartilhamento: TRUE aparece no feed
--     "Explorar" para qualquer usuário autenticado; FALSE só o dono vê.
--   - A geração automática a partir do Banco de Questões roda em uma
--     função SECURITY DEFINER (mesmo padrão de start_question_test):
--     ela lê correct_option/explanation (colunas bloqueadas para
--     select direto) e já grava os flashcards resultantes na conta do
--     usuário autenticado, então o cliente nunca vê a resposta certa
--     de uma questão que ele não respondeu.

-- ============================================================
-- Garante a função de updated_at (mesma de schema.sql) — recriada
-- aqui com CREATE OR REPLACE por segurança, caso este projeto
-- Supabase não tenha essa função no schema `public` ainda.
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABELA: flashcards
-- ============================================================
CREATE TABLE public.flashcards (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  area        TEXT        NOT NULL,
  front       TEXT        NOT NULL,
  back        TEXT        NOT NULL,
  source      TEXT,
  origin      TEXT        NOT NULL DEFAULT 'manual' CHECK (origin IN ('manual','auto_question','auto_classification')),
  is_public   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER flashcards_updated_at
  BEFORE UPDATE ON public.flashcards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_flashcards_author       ON public.flashcards(author_id);
CREATE INDEX idx_flashcards_area         ON public.flashcards(area);
CREATE INDEX idx_flashcards_author_area  ON public.flashcards(author_id, area);
CREATE INDEX idx_flashcards_public       ON public.flashcards(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_flashcards_created      ON public.flashcards(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dono vê os próprios flashcards, todos veem os públicos"
  ON public.flashcards FOR SELECT
  USING (auth.role() = 'authenticated' AND (is_public = TRUE OR author_id = auth.uid()));

CREATE POLICY "Usuário autenticado cria flashcard para si mesmo"
  ON public.flashcards FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Dono edita seu próprio flashcard"
  ON public.flashcards FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Dono apaga seu próprio flashcard"
  ON public.flashcards FOR DELETE
  USING (auth.uid() = author_id);

-- ============================================================
-- FUNÇÃO: generate_flashcards_from_questions
-- Sorteia N questões (opcionalmente filtradas por área) do Banco
-- de Questões, monta pergunta/resposta e já salva os flashcards
-- na conta do usuário autenticado (privados por padrão).
-- ============================================================
CREATE OR REPLACE FUNCTION public.generate_flashcards_from_questions(p_area TEXT DEFAULT NULL, p_count INT DEFAULT 10)
RETURNS SETOF public.flashcards
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Não autenticado';
  END IF;

  IF p_count IS NULL OR p_count < 1 OR p_count > 30 THEN
    p_count := 10;
  END IF;

  RETURN QUERY
  INSERT INTO public.flashcards (author_id, area, front, back, source, origin, is_public)
  SELECT
    auth.uid(),
    q.area,
    q.statement,
    'Resposta correta: ' || q.correct_option || ') ' ||
      (CASE q.correct_option
        WHEN 'A' THEN q.option_a
        WHEN 'B' THEN q.option_b
        WHEN 'C' THEN q.option_c
        WHEN 'D' THEN q.option_d
        WHEN 'E' THEN q.option_e
      END) ||
      COALESCE(E'\n\n' || NULLIF(q.explanation, ''), ''),
    'Banco de Questões' || COALESCE(' · ' || q.source, ''),
    'auto_question',
    FALSE
  FROM (
    SELECT * FROM public.questions
    WHERE is_active = TRUE
      AND (p_area IS NULL OR p_area = '' OR area = p_area)
    ORDER BY random()
    LIMIT p_count
  ) q
  RETURNING public.flashcards.*;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count = 0 THEN
    RAISE EXCEPTION 'Ainda não há questões cadastradas para essa área';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.generate_flashcards_from_questions(TEXT, INT) TO authenticated;
