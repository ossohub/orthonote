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

export interface Post {
  id: string;
  user_id: string;
  type: PostType;
  title: string;
  content: string;
  structured_data?: ClinicalCaseData | null;
  image_urls: string[];
  tags: string[];
  likes_count: number;
  comments_count: number;
  xp_awarded: number;
  is_featured: boolean;
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
// Form types
// ============================================================
export interface CreatePostForm {
  type: PostType;
  title: string;
  content: string;
  tags: string[];
  images?: File[];
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
export interface Database {
  public: {
    Tables: {
      profiles:      { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      posts:         { Row: Post; Insert: Partial<Post>; Update: Partial<Post> };
      comments:      { Row: Comment; Insert: Partial<Comment>; Update: Partial<Comment> };
      likes:         { Row: Like; Insert: Partial<Like>; Update: Partial<Like> };
      follows:       { Row: Follow; Insert: Partial<Follow>; Update: Partial<Follow> };
      achievements:  { Row: Achievement; Insert: Partial<Achievement>; Update: Partial<Achievement> };
      xp_logs:       { Row: XpLog; Insert: Partial<XpLog>; Update: Partial<XpLog> };
      notifications: { Row: Notification; Insert: Partial<Notification>; Update: Partial<Notification> };
    };
  };
}
