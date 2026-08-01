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
  | 'post_featured'
  | 'team_invite'
  | 'team_invite_response'
  | 'join_request'
  | 'join_request_response';

// Estados do Brasil (para filtrar programas de residência e equipes por UF)
export const BRAZIL_STATES = [
  { uf: 'AC', name: 'Acre' }, { uf: 'AL', name: 'Alagoas' }, { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' }, { uf: 'BA', name: 'Bahia' }, { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' }, { uf: 'ES', name: 'Espírito Santo' }, { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' }, { uf: 'MT', name: 'Mato Grosso' }, { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' }, { uf: 'PA', name: 'Pará' }, { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' }, { uf: 'PE', name: 'Pernambuco' }, { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' }, { uf: 'RN', name: 'Rio Grande do Norte' }, { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' }, { uf: 'RR', name: 'Roraima' }, { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' }, { uf: 'SE', name: 'Sergipe' }, { uf: 'TO', name: 'Tocantins' },
] as const;

export type ResidencyYear = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export const RESIDENCY_YEARS: ResidencyYear[] = ['R1', 'R2', 'R3', 'R4', 'R5'];

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
  residency_year?: ResidencyYear | null;
  app_role?: "member" | "moderator" | "admin";
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
// Taxonomia usada tanto para criar/filtrar questões quanto para
// agrupar o gráfico de pizza de Desempenho por área.
export const QUESTION_AREAS = [
  'Ombro e Cotovelo',
  'Joelho',
  'Mão',
  'Pé e Tornozelo',
  'Quadril',
  'Coluna',
  'Pediátrica',
  'Trauma Pediátrico',
  'Trauma Geral',
  'Tumor',
  'Miscelânea',
] as const;

export type QuestionArea = (typeof QUESTION_AREAS)[number];
export type QuestionOption = 'A' | 'B' | 'C' | 'D' | 'E';

// Questões criadas antes da taxonomia acima usavam nomes diferentes
// (ex: "Mão e Punho", "Tumor Ósseo"). Em vez de reescrever o histórico
// no banco, normalizamos aqui na hora de montar o gráfico/estatísticas
// — assim as questões antigas continuam contando para a área certa.
const LEGACY_AREA_MAP: Record<string, QuestionArea> = {
  'Ombro e Cotovelo':      'Ombro e Cotovelo',
  'Joelho':                'Joelho',
  'Mão e Punho':           'Mão',
  'Mão':                   'Mão',
  'Pé e Tornozelo':        'Pé e Tornozelo',
  'Quadril':               'Quadril',
  'Coluna':                'Coluna',
  'Ortopedia Pediátrica':  'Pediátrica',
  'Pediátrica':            'Pediátrica',
  'Trauma Pediátrico':     'Trauma Pediátrico',
  'Trauma':                'Trauma Geral',
  'Trauma Geral':          'Trauma Geral',
  'Tumor Ósseo':           'Tumor',
  'Tumor':                 'Tumor',
  'Medicina Esportiva':    'Miscelânea',
  'Geral':                 'Miscelânea',
  'Miscelânea':            'Miscelânea',
};

export function normalizeQuestionArea(rawArea: string | null | undefined): QuestionArea {
  if (!rawArea) return 'Miscelânea';
  return LEGACY_AREA_MAP[rawArea] ?? 'Miscelânea';
}

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

// ============================================================
// Flashcards
// ============================================================
// Reaproveita a mesma taxonomia de área do Banco de Questões —
// todo flashcard (manual ou gerado automaticamente) é salvo já
// categorizado por área de estudo, para manter a organização
// consistente em todo o site.
export type FlashcardOrigin = 'manual' | 'auto_question' | 'auto_classification';

export interface Flashcard {
  id: string;
  author_id: string;
  area: string;
  front: string;
  back: string;
  source?: string | null;
  origin: FlashcardOrigin;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  // join
  author?: Profile;
}

export interface FlashcardInsert {
  author_id: string;
  area: string;
  front: string;
  back: string;
  source?: string | null;
  origin?: FlashcardOrigin;
  is_public?: boolean;
}

// ============================================================
// Desempenho — Equipes (preceptor ↔ residente), Cronograma
// ============================================================
export interface ResidencyProgram {
  id: string;
  name: string;
  institution?: string | null;
  city: string;
  uf: string;
  created_at: string;
}

export interface Team {
  id: string;
  preceptor_id: string;
  name: string;
  institution?: string | null;
  residency_program_id?: string | null;
  uf?: string | null;
  created_at: string;
  updated_at: string;
  // joins
  preceptor?: Profile;
  members?: TeamMember[];
  residency_program?: ResidencyProgram;
}

export type TeamMemberStatus = 'pending' | 'active' | 'declined';
export type TeamMemberInitiator = 'preceptor' | 'resident';

export interface TeamMember {
  id: string;
  team_id: string;
  resident_id: string;
  status: TeamMemberStatus;
  initiated_by: TeamMemberInitiator;
  invited_at: string;
  responded_at?: string | null;
  // joins
  team?: Team;
  resident?: Profile;
}

export interface ScheduleEntry {
  id: string;
  resident_id: string;
  title: string;
  location?: string | null;
  starts_at: string;
  ends_at: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  // join
  resident?: Profile;
}

// ============================================================
// Salas de discussão e provas cronometradas
// ============================================================
export type RoomKind = 'geral' | 'aula' | 'prova';

export interface DiscussionRoom {
  id: string;
  team_id: string;
  created_by: string;
  name: string;
  kind: RoomKind;
  created_at: string;
  // joins
  creator?: Profile;
}

export type RoomMessageType = 'text' | 'image' | 'system';

export interface RoomMessage {
  id: string;
  room_id: string;
  sender_id: string;
  body?: string | null;
  image_url?: string | null;
  message_type: RoomMessageType;
  created_at: string;
  // join
  sender?: Profile;
}

export interface ScheduledExam {
  id: string;
  team_id: string;
  room_id?: string | null;
  created_by: string;
  title: string;
  area?: string | null;
  num_questions: number;
  duration_minutes: number;
  opens_at: string;
  closes_at: string;
  summary_posted: boolean;
  created_at: string;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  resident_id: string;
  test_id: string;
  started_at: string;
  // joins
  resident?: Profile;
  test?: QuestionTest;
}

export interface ResidentEvaluation {
  id: string;
  team_id: string;
  resident_id: string;
  preceptor_id: string;
  score: number;
  comment?: string | null;
  created_at: string;
  // joins
  preceptor?: Profile;
  team?: Team;
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
      teams: { Row: Loose<Team>; Insert: Partial<Loose<Team>>; Update: Partial<Loose<Team>>; Relationships: [
        Rel<"teams_preceptor_id_fkey", ["preceptor_id"], "profiles", ["id"]>
      ] };
      team_members: { Row: Loose<TeamMember>; Insert: Partial<Loose<TeamMember>>; Update: Partial<Loose<TeamMember>>; Relationships: [
        Rel<"team_members_team_id_fkey", ["team_id"], "teams", ["id"]>,
        Rel<"team_members_resident_id_fkey", ["resident_id"], "profiles", ["id"]>
      ] };
      schedule_entries: { Row: Loose<ScheduleEntry>; Insert: Partial<Loose<ScheduleEntry>>; Update: Partial<Loose<ScheduleEntry>>; Relationships: [
        Rel<"schedule_entries_resident_id_fkey", ["resident_id"], "profiles", ["id"]>
      ] };
      residency_programs: { Row: Loose<ResidencyProgram>; Insert: Partial<Loose<ResidencyProgram>>; Update: Partial<Loose<ResidencyProgram>>; Relationships: [] };
      discussion_rooms: { Row: Loose<DiscussionRoom>; Insert: Partial<Loose<DiscussionRoom>>; Update: Partial<Loose<DiscussionRoom>>; Relationships: [
        Rel<"discussion_rooms_team_id_fkey", ["team_id"], "teams", ["id"]>,
        Rel<"discussion_rooms_created_by_fkey", ["created_by"], "profiles", ["id"]>
      ] };
      room_messages: { Row: Loose<RoomMessage>; Insert: Partial<Loose<RoomMessage>>; Update: Partial<Loose<RoomMessage>>; Relationships: [
        Rel<"room_messages_room_id_fkey", ["room_id"], "discussion_rooms", ["id"]>,
        Rel<"room_messages_sender_id_fkey", ["sender_id"], "profiles", ["id"]>
      ] };
      scheduled_exams: { Row: Loose<ScheduledExam>; Insert: Partial<Loose<ScheduledExam>>; Update: Partial<Loose<ScheduledExam>>; Relationships: [
        Rel<"scheduled_exams_team_id_fkey", ["team_id"], "teams", ["id"]>,
        Rel<"scheduled_exams_room_id_fkey", ["room_id"], "discussion_rooms", ["id"]>,
        Rel<"scheduled_exams_created_by_fkey", ["created_by"], "profiles", ["id"]>
      ] };
      exam_attempts: { Row: Loose<ExamAttempt>; Insert: Partial<Loose<ExamAttempt>>; Update: Partial<Loose<ExamAttempt>>; Relationships: [
        Rel<"exam_attempts_exam_id_fkey", ["exam_id"], "scheduled_exams", ["id"]>,
        Rel<"exam_attempts_resident_id_fkey", ["resident_id"], "profiles", ["id"]>,
        Rel<"exam_attempts_test_id_fkey", ["test_id"], "question_tests", ["id"]>
      ] };
      resident_evaluations: { Row: Loose<ResidentEvaluation>; Insert: Partial<Loose<ResidentEvaluation>>; Update: Partial<Loose<ResidentEvaluation>>; Relationships: [
        Rel<"resident_evaluations_team_id_fkey", ["team_id"], "teams", ["id"]>,
        Rel<"resident_evaluations_resident_id_fkey", ["resident_id"], "profiles", ["id"]>,
        Rel<"resident_evaluations_preceptor_id_fkey", ["preceptor_id"], "profiles", ["id"]>
      ] };
      flashcards: { Row: Loose<Flashcard>; Insert: Partial<Loose<FlashcardInsert>>; Update: Partial<Loose<Flashcard>>; Relationships: [
        Rel<"flashcards_author_id_fkey", ["author_id"], "profiles", ["id"]>
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
      get_pending_posts: {
        Args: Record<string, never>;
        Returns: Loose<Post>[];
      };
      moderate_post: {
        Args: { p_post_id: string; p_decision: string };
        Returns: void;
      };
      invite_resident_to_team: {
        Args: { p_team_id: string; p_identifier: string };
        Returns: string;
      };
      respond_team_invite: {
        Args: { p_membership_id: string; p_accept: boolean };
        Returns: void;
      };
      browse_teams_directory: {
        Args: { p_uf?: string | null; p_search?: string | null };
        Returns: {
          id: string; name: string; institution: string | null; uf: string | null;
          residency_program_id: string | null; program_name: string | null; program_city: string | null;
          preceptor_id: string; preceptor_name: string; created_at: string;
        }[];
      };
      request_to_join_team: {
        Args: { p_team_id: string };
        Returns: string;
      };
      approve_join_request: {
        Args: { p_membership_id: string; p_accept: boolean };
        Returns: void;
      };
      start_scheduled_exam: {
        Args: { p_exam_id: string };
        Returns: string;
      };
      close_scheduled_exam_and_post_summary: {
        Args: { p_exam_id: string };
        Returns: void;
      };
      generate_flashcards_from_questions: {
        Args: { p_area?: string | null; p_count: number };
        Returns: Loose<Flashcard>[];
      };
    };
  };
}
