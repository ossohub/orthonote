-- ============================================================
-- OssoHub — Schema Completo do Banco de Dados
-- Execute no Supabase SQL Editor
-- ============================================================

-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABELA: profiles (estende auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT        NOT NULL,
  crm             TEXT        NOT NULL UNIQUE,
  rqe             TEXT,
  photo_url       TEXT,
  bio             TEXT,
  specialties     TEXT[]      DEFAULT '{}',
  city_state      TEXT,
  current_level   INT         NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 5),
  total_xp        INT         NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
  verified        BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger para criar perfil automaticamente no cadastro
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, crm)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'crm', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TABELA: posts
-- ============================================================
CREATE TYPE post_type AS ENUM ('clinical_case', 'scientific_article', 'experience', 'question');

CREATE TABLE public.posts (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type             post_type   NOT NULL,
  title            TEXT        NOT NULL,
  content          TEXT        NOT NULL,
  structured_data  JSONB,      -- campos extras para caso clínico
  image_urls       TEXT[]      DEFAULT '{}',
  tags             TEXT[]      DEFAULT '{}',
  likes_count      INT         NOT NULL DEFAULT 0,
  comments_count   INT         NOT NULL DEFAULT 0,
  xp_awarded       INT         NOT NULL DEFAULT 0,
  is_featured      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Índices de performance
CREATE INDEX idx_posts_user_id    ON public.posts(user_id);
CREATE INDEX idx_posts_type       ON public.posts(type);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_tags       ON public.posts USING GIN(tags);
CREATE INDEX idx_posts_featured   ON public.posts(is_featured) WHERE is_featured = TRUE;

-- ============================================================
-- TABELA: comments
-- ============================================================
CREATE TABLE public.comments (
  id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id           UUID        NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id           UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content           TEXT        NOT NULL,
  parent_comment_id UUID        REFERENCES public.comments(id) ON DELETE CASCADE,
  likes_count       INT         NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_post_id    ON public.comments(post_id);
CREATE INDEX idx_comments_user_id    ON public.comments(user_id);
CREATE INDEX idx_comments_parent_id  ON public.comments(parent_comment_id);

-- Trigger para incrementar comments_count no post
CREATE OR REPLACE FUNCTION increment_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_comment_insert
  AFTER INSERT ON public.comments
  FOR EACH ROW EXECUTE FUNCTION increment_comments_count();

CREATE OR REPLACE FUNCTION decrement_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET comments_count = GREATEST(0, comments_count - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_comment_delete
  AFTER DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION decrement_comments_count();

-- ============================================================
-- TABELA: likes
-- ============================================================
CREATE TABLE public.likes (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID        NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);

-- Triggers para sincronizar likes_count
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_like_insert
  AFTER INSERT ON public.likes
  FOR EACH ROW EXECUTE FUNCTION increment_likes_count();

CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_like_delete
  AFTER DELETE ON public.likes
  FOR EACH ROW EXECUTE FUNCTION decrement_likes_count();

-- ============================================================
-- TABELA: follows
-- ============================================================
CREATE TABLE public.follows (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id <> following_id)
);

CREATE INDEX idx_follows_follower  ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);

-- ============================================================
-- TABELA: achievements (badges conquistados)
-- ============================================================
CREATE TABLE public.achievements (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_key   TEXT        NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_key)
);

CREATE INDEX idx_achievements_user_id ON public.achievements(user_id);

-- ============================================================
-- TABELA: xp_logs (histórico de XP)
-- ============================================================
CREATE TYPE xp_action AS ENUM (
  'post_clinical_case',
  'post_article',
  'post_experience',
  'post_question',
  'comment',
  'like_received',
  'featured_bonus'
);

CREATE TABLE public.xp_logs (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type  xp_action   NOT NULL,
  xp_gained    INT         NOT NULL,
  reference_id UUID,       -- post_id ou comment_id
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_xp_logs_user_id    ON public.xp_logs(user_id);
CREATE INDEX idx_xp_logs_created_at ON public.xp_logs(created_at DESC);

-- ============================================================
-- TABELA: notifications
-- ============================================================
CREATE TYPE notification_type AS ENUM (
  'new_comment', 'new_like', 'new_follower', 'badge_unlocked', 'post_featured'
);

CREATE TABLE public.notifications (
  id           UUID              PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID              NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type         notification_type NOT NULL,
  actor_id     UUID              REFERENCES public.profiles(id) ON DELETE SET NULL,
  reference_id UUID,
  message      TEXT              NOT NULL,
  read         BOOLEAN           NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id    ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread     ON public.notifications(user_id, read) WHERE read = FALSE;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis são visíveis para todos autenticados"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário edita apenas seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts visíveis para todos autenticados"
  ON public.posts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário cria seus próprios posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário edita seus próprios posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário deleta seus próprios posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = user_id);

-- comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comentários visíveis para todos autenticados"
  ON public.comments FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário cria seus próprios comentários"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário edita seus próprios comentários"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuário deleta seus próprios comentários"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

-- likes
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes visíveis para todos autenticados"
  ON public.likes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário gerencia seus próprios likes"
  ON public.likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário remove seus próprios likes"
  ON public.likes FOR DELETE
  USING (auth.uid() = user_id);

-- follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Follows visíveis para todos autenticados"
  ON public.follows FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário gerencia quem segue"
  ON public.follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Usuário para de seguir"
  ON public.follows FOR DELETE
  USING (auth.uid() = follower_id);

-- achievements
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements visíveis para todos autenticados"
  ON public.achievements FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas sistema insere achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- xp_logs
ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário vê seu próprio histórico de XP"
  ON public.xp_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Apenas sistema insere XP logs"
  ON public.xp_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário vê suas próprias notificações"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuário marca suas notificações como lidas"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKETS (execute separadamente no dashboard)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- Storage RLS policies (avatars)
-- CREATE POLICY "Avatar público para leitura"
--   ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
-- CREATE POLICY "Usuário faz upload do próprio avatar"
--   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage RLS policies (post-images)
-- CREATE POLICY "Imagens de posts públicas"
--   ON storage.objects FOR SELECT USING (bucket_id = 'post-images');
-- CREATE POLICY "Usuário faz upload de imagens do seu post"
--   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');

-- ============================================================
-- REALTIME (habilitar nas tabelas necessárias)
-- ============================================================
-- No dashboard: Database > Replication > habilitar para:
-- posts, comments, likes, notifications
