// ============================================================
// OssoHub — Types TypeScript
// ============================================================

export type PostType = 'clinical_case' | 'scientific_article' | 'experience' | 'question';

export type XpAction =
  | 'post_clinical_case'
  | 'post_article'
  | 'post_experience'
  | 'post_question'
  | 'comment'
  | 'like_received'
  | 'featured_bonus';

export type NotificationType =
  | 'new_comment'
  | 'new_like'
  | 'new_follower'
  | 'badge_unlocked'
  | 'post_featured';

// ============================================================
// Profile
// ============================================================
export interface Profile {
  id: string;
  full_name: string;
  crm: string;
  rqe?: string | null;
  photo_url?: string | null;
  bio?: string | null;
  specialties: string[];
  city_state?: string | null;
  current_level: 1 | 2 | 3 | 4 | 5;
  total_xp: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileWithStats extends Profile {
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
}

// ============================================================
// Post
// ============================================================
export interface ClinicalCaseData {
  age_range?: string;          // ex: "35-45 anos"
  sex?: 'M' | 'F' | 'outro';
  mechanism?: string;          // mecanismo de trauma / queixa principal
  physical_exam?: string;      // exame físico relevante
  diagnosis?: string;          // diagnóstico principal
  treatment?: string;          // abordagem terapêutica
  discussion?: string;         // pontos de discussão / lições aprendidas
}

export type ModerationStatus = 'approved' | 'pending' | 'rejected';

export interface Post {
  id: string;
  user_id: string;
  type: PostType;
  title: string;
  content: string;
  structured_data?: ClinicalCaseData | null;
  image_urls: string[];
  video_url?: string | null;
  video_duration_seconds?: number | null;
  tags: string[];
  likes_count: number;
  comments_count: number;
  xp_awarded: number;
  is_featured: boolean;
  moderation_status: ModerationStatus;
  created_at: string;
  updated_at: string;
  // joins
  author?: Profile;
  is_liked_by_me?: boolean;
}

// ============================================================
// Comment
// ============================================================
export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string | null;
  likes_count: number;
  created_at: string;
  // joins
  author?: Profile;
  replies?: Comment[];
}

// ============================================================
// Like
// ============================================================
export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

// ============================================================
// Follow
// ============================================================
export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

// ============================================================
// Achievement (Badge)
// ============================================================
export type BadgeKey =
  | 'first_post'
  | 'case_publisher'       // 5 casos clínicos
  | 'article_publisher'    // publicou artigo
  | 'active_commenter'     // 20 comentários
  | 'mentor'               // 50 likes em comentários
  | 'social_connector'     // 10 conexões
  | 'specialist_shoulder'  // 5 posts tag ombro
  | 'specialist_knee'      // 5 posts tag joelho
  | 'specialist_spine'     // 5 posts tag coluna
  | 'featured_author'      // post em destaque
  | 'xp_master';           // 1000+ XP

export interface Achievement {
  id: string;
  user_id: string;
  badge_key: BadgeKey;
  unlocked_at: string;
}

// ============================================================
// XP Log
// ============================================================
export interface XpLog {
  id: string;
  user_id: string;
  action_type: XpAction;
  xp_gained: number;
  reference_id?: string | null;
  created_at: string;
}

// ============================================================
// Notification
// ============================================================
export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  actor_id?: string | null;
  reference_id?: string | null;
  message: string;
  read: boolean;
  created_at: string;
  // joins
  actor?: Profile;
}

// ============================================================
// Banco de Questões
// ============================================================
export const QUESTION_AREAS = [
  'Ombro e Cotovelo',
  'Joelho',
  'Coluna',
  'Quadril',
  'Mão e Punho',
  'Pé e Tornozelo',
  'Tumor Ósseo',
  'Ortopedia Pediátrica',
  'Trauma',
  'Medicina Esportiva',
  'Geral',
] as const;

export type QuestionArea = (typeof QUESTION_AREAS)[number];
export type QuestionOption = 'A' | 'B' | 'C' | 'D' | 'E';

// Campos públicos de uma questão — nunca inclui correct_option/explanation
// (essas colunas são bloqueadas no banco para select direto; só chegam ao
// cliente através do retorno da função answer_question_item, depois de
// respondida).
export interface Question {
  id: string;
  author_id: string;
  area: string;
  source?: string | null;
  statement: string;
  image_url?: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  is_active: boolean;
  times_answered: number;
  times_correct: number;
  created_at: string;
  updated_at: string;
  // joins
  author?: Profile;
}

// Formato usado só para o INSERT de uma nova questão — ao contrário de
// `Question` (que é o que volta num SELECT e nunca traz essas colunas),
// aqui incluímos correct_option/explanation porque são obrigatórias na
// criação (o banco recusa a linha sem elas).
export interface QuestionInsert {
  author_id: string;
  area: string;
  source?: string | null;
  statement: string;
  image_url?: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: QuestionOption;
  explanation?: string | null;
}

export interface QuestionTest {
  id: string;
  user_id: string;
  area?: string | null;
  num_questions: number;
  correct_count: number;
  wrong_count: number;
  status: 'em_andamento' | 'concluido';
  started_at: string;
  finished_at?: string | null;
}

export interface QuestionTestItem {
  id: string;
  test_id: string;
  question_id: string;
  order_index: number;
  selected_option?: QuestionOption | null;
  is_correct?: boolean | null;
  answered_at?: string | null;
  // join (sem correct_option/explanation até responder)
  question?: Question;
}

export interface QuestionStats {
  user_id: string;
  total_correct: number;
  total_wrong: number;
  total_answered: number;
  updated_at: string;
  // join
  profile?: Profile;
}

export interface CreateQuestionForm {
  area: string;
  source?: string;
  statement: string;
  image?: File;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: QuestionOption;
  explanation?: string;
}

// ============================================================
// Form types
// ============================================================
export interface CreatePostForm {
  type: PostType;
  title: string;
  content: string;
  tags: string[];
  images?: File[];
  video?: File;
  structured_data?: ClinicalCaseData;
}

export interface SignupForm {
  full_name: string;
  email: string;
  password: string;
  crm: string;
  rqe?: string;
  specialties: string[];
  city_state?: string;
  bio?: string;
  photo?: File;
}

// ============================================================
// Supabase Database type (generated manually)
// ============================================================
// Interfaces don't get an implicit string index signature in TypeScript,
// so they don't structurally satisfy Record<string, unknown> on their own.
// This mapped type creates a plain object type from each interface so the
// Database shape below is compatible with Supabase's GenericSchema constraint.
type Loose<T> = { [K in keyof T]: T[K] };

// Foreign-key relationships (mirrors supabase/schema.sql) so embedded
// selects like `.select("*, author:profiles!posts_user_id_fkey(*)")`
// resolve to real types instead of `never`.
type Rel<Name extends string, Cols extends string[], Ref extends string, RefCols extends string[]> = {
  foreignKeyName: Name;
  columns: Cols;
  isOneToOne: boolean;
  referencedRelation: Ref;
  referencedColumns: RefCols;
};

export interface Database {
  public: {
    Tables: {
      profiles:      { Row: Loose<Profile>; Insert: Partial<Loose<Profile>>; Update: Partial<Loose<Profile>>; Relationships: [] };
      posts:         { Row: Loose<Post>; Insert: Partial<Loose<Post>>; Update: Partial<Loose<Post>>; Relationships: [
        Rel<"posts_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
      comments:      { Row: Loose<Comment>; Insert: Partial<Loose<Comment>>; Update: Partial<Loose<Comment>>; Relationships: [
        Rel<"comments_user_id_fkey", ["user_id"], "profiles", ["id"]>,
        Rel<"comments_post_id_fkey", ["post_id"], "posts", ["id"]>,
        Rel<"comments_parent_comment_id_fkey", ["parent_comment_id"], "comments", ["id"]>
      ] };
      likes:         { Row: Loose<Like>; Insert: Partial<Loose<Like>>; Update: Partial<Loose<Like>>; Relationships: [
        Rel<"likes_post_id_fkey", ["post_id"], "posts", ["id"]>,
        Rel<"likes_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
      follows:       { Row: Loose<Follow>; Insert: Partial<Loose<Follow>>; Update: Partial<Loose<Follow>>; Relationships: [
        Rel<"follows_follower_id_fkey", ["follower_id"], "profiles", ["id"]>,
        Rel<"follows_following_id_fkey", ["following_id"], "profiles", ["id"]>
      ] };
      achievements:  { Row: Loose<Achievement>; Insert: Partial<Loose<Achievement>>; Update: Partial<Loose<Achievement>>; Relationships: [
        Rel<"achievements_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
      xp_logs:       { Row: Loose<XpLog>; Insert: Partial<Loose<XpLog>>; Update: Partial<Loose<XpLog>>; Relationships: [
        Rel<"xp_logs_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
      notifications: { Row: Loose<Notification>; Insert: Partial<Loose<Notification>>; Update: Partial<Loose<Notification>>; Relationships: [
        Rel<"notifications_user_id_fkey", ["user_id"], "profiles", ["id"]>,
        Rel<"notifications_actor_id_fkey", ["actor_id"], "profiles", ["id"]>
      ] };
      questions:     { Row: Loose<Question>; Insert: Partial<Loose<QuestionInsert>>; Update: Partial<Loose<Question>>; Relationships: [
        Rel<"questions_author_id_fkey", ["author_id"], "profiles", ["id"]>
      ] };
      question_tests: { Row: Loose<QuestionTest>; Insert: Partial<Loose<QuestionTest>>; Update: Partial<Loose<QuestionTest>>; Relationships: [
        Rel<"question_tests_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
      question_test_items: { Row: Loose<QuestionTestItem>; Insert: Partial<Loose<QuestionTestItem>>; Update: Partial<Loose<QuestionTestItem>>; Relationships: [
        Rel<"question_test_items_test_id_fkey", ["test_id"], "question_tests", ["id"]>,
        Rel<"question_test_items_question_id_fkey", ["question_id"], "questions", ["id"]>
      ] };
      question_stats: { Row: Loose<QuestionStats>; Insert: Partial<Loose<QuestionStats>>; Update: Partial<Loose<QuestionStats>>; Relationships: [
        Rel<"question_stats_user_id_fkey", ["user_id"], "profiles", ["id"]>
      ] };
    };
    Views: Record<string, never>;
    Functions: {
      award_self_xp: {
        Args: { p_action: XpAction; p_reference_id?: string | null };
        Returns: { new_xp: number; new_level: number; leveled_up: boolean }[];
      };
      unlock_badge: {
        Args: { p_badge_key: string };
        Returns: boolean;
      };
      start_question_test: {
        Args: { p_area?: string | null; p_num_questions: number };
        Returns: string;
      };
      answer_question_item: {
        Args: { p_item_id: string; p_selected: QuestionOption };
        Returns: { is_correct: boolean; correct_option: QuestionOption; explanation: string | null }[];
      };
      finish_question_test: {
        Args: { p_test_id: string };
        Returns: void;
      };
    };
  };
}
