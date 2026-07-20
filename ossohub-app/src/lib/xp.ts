import { createClient } from "@/lib/supabase/client";
import type { BadgeKey, XpAction } from "@/lib/types";

// ============================================================
// Regras de XP
// ============================================================
export const XP_RULES: Record<XpAction, number> = {
  post_clinical_case: 60,
  post_article:       80,
  post_experience:    40,
  post_question:      40,
  comment:            15,
  like_received:       5,
  featured_bonus:    150,
};

// ============================================================
// Níveis
// ============================================================
export type Level = 1 | 2 | 3 | 4 | 5;

export const LEVELS: Record<Level, { name: string; emoji: string; minXP: number; maxXP: number | null }> = {
  1: { name: "Aprendiz",     emoji: "🦴", minXP: 0,    maxXP: 150  },
  2: { name: "Residente",    emoji: "🩺", minXP: 151,  maxXP: 400  },
  3: { name: "Especialista", emoji: "⚕️", minXP: 401,  maxXP: 800  },
  4: { name: "Mestre",       emoji: "🏆", minXP: 801,  maxXP: 1500 },
  5: { name: "Lenda",        emoji: "⭐", minXP: 1501, maxXP: null },
};

export function getLevelFromXP(xp: number): Level {
  if (xp >= 1501) return 5;
  if (xp >=  801) return 4;
  if (xp >=  401) return 3;
  if (xp >=  151) return 2;
  return 1;
}

export function getProgressToNextLevel(xp: number) {
  const level = getLevelFromXP(xp);
  const config = LEVELS[level];
  if (config.maxXP === null) return { current: 0, needed: 0, percent: 100, isMax: true };
  const current = xp - config.minXP;
  const needed = config.maxXP - config.minXP;
  const percent = Math.min(100, Math.round((current / needed) * 100));
  return { current, needed, percent, isMax: false };
}

// ============================================================
// Adicionar XP
// ============================================================
export async function awardXP(
  userId: string,
  action: XpAction,
  referenceId?: string
): Promise<{ newXP: number; newLevel: Level; leveledUp: boolean }> {
  const supabase = createClient();
  const xpGained = XP_RULES[action];

  // 1. Buscar XP atual
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp, current_level")
    .eq("id", userId)
    .single();

  const oldXP = profile?.total_xp ?? 0;
  const oldLevel = getLevelFromXP(oldXP);
  const newXP = oldXP + xpGained;
  const newLevel = getLevelFromXP(newXP);
  const leveledUp = newLevel > oldLevel;

  // 2. Atualizar XP e nível
  await supabase
    .from("profiles")
    .update({ total_xp: newXP, current_level: newLevel })
    .eq("id", userId);

  // 3. Registrar log
  await supabase.from("xp_logs").insert({
    user_id: userId,
    action_type: action,
    xp_gained: xpGained,
    reference_id: referenceId ?? null,
  });

  // 4. Verificar badges
  await checkAndUnlockBadges(userId, newXP);

  return { newXP, newLevel, leveledUp };
}

// ============================================================
// Badges
// ============================================================
export const BADGES: Record<BadgeKey, { name: string; description: string; emoji: string; color: string }> = {
  first_post:        { name: "Primeiro Post",        emoji: "📝", color: "bg-blue-100 text-blue-700",    description: "Publicou seu primeiro conteúdo no OssoHub" },
  case_publisher:    { name: "Publisher de Casos",   emoji: "🔬", color: "bg-purple-100 text-purple-700", description: "Publicou 5 casos clínicos" },
  article_publisher: { name: "Cientista",            emoji: "📚", color: "bg-indigo-100 text-indigo-700", description: "Publicou um artigo científico" },
  active_commenter:  { name: "Comentarista Ativo",   emoji: "💬", color: "bg-yellow-100 text-yellow-700", description: "Fez 20 comentários construtivos" },
  mentor:            { name: "Mentor",               emoji: "🎓", color: "bg-orange-100 text-orange-700", description: "Recebeu 50 likes em comentários" },
  social_connector:  { name: "Conector",             emoji: "🤝", color: "bg-teal-100 text-teal-700",    description: "Fez 10 conexões na rede" },
  specialist_shoulder:{ name: "Especialista em Ombro",emoji: "💪", color: "bg-cyan-100 text-cyan-700",  description: "5 publicações sobre Ombro e Cotovelo" },
  specialist_knee:   { name: "Especialista em Joelho",emoji: "🦵", color: "bg-lime-100 text-lime-700",   description: "5 publicações sobre Joelho" },
  specialist_spine:  { name: "Especialista em Coluna",emoji: "🦴", color: "bg-rose-100 text-rose-700",   description: "5 publicações sobre Coluna" },
  featured_author:   { name: "Destaque",             emoji: "⭐", color: "bg-amber-100 text-amber-700",  description: "Teve um post em destaque na plataforma" },
  xp_master:         { name: "Mestre do XP",         emoji: "🏆", color: "bg-emerald-100 text-emerald-700", description: "Acumulou 1000+ XP" },
};

async function checkAndUnlockBadges(userId: string, totalXP: number) {
  const supabase = createClient();

  // Badges que podem ser verificados por XP total
  const badgesToCheck: BadgeKey[] = [];
  if (totalXP >= 1000) badgesToCheck.push("xp_master");

  // Buscar badges já conquistados
  const { data: existing } = await supabase
    .from("achievements")
    .select("badge_key")
    .eq("user_id", userId);

  const existingKeys = new Set(existing?.map((a) => a.badge_key) ?? []);

  for (const key of badgesToCheck) {
    if (!existingKeys.has(key)) {
      await unlockBadge(userId, key);
    }
  }
}

export async function unlockBadge(userId: string, badgeKey: BadgeKey) {
  const supabase = createClient();
  const badge = BADGES[badgeKey];

  const { error } = await supabase.from("achievements").insert({
    user_id: userId,
    badge_key: badgeKey,
  });

  if (!error) {
    // Notificar o usuário
    await supabase.from("notifications").insert({
      user_id: userId,
      type: "badge_unlocked",
      message: `Você conquistou o badge "${badge.name}" ${badge.emoji}`,
    });
  }
}

// Verificar badges baseados em ações específicas
export async function checkPostBadges(userId: string, postType: string, tags: string[]) {
  const supabase = createClient();

  // Buscar contagem de posts
  const { count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const totalPosts = count ?? 0;
  const { data: existing } = await supabase
    .from("achievements")
    .select("badge_key")
    .eq("user_id", userId);
  const existingKeys = new Set(existing?.map((a) => a.badge_key) ?? []);

  // Primeiro post
  if (totalPosts === 1 && !existingKeys.has("first_post")) {
    await unlockBadge(userId, "first_post");
  }

  // 5 casos clínicos
  if (postType === "clinical_case") {
    const { count: caseCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("type", "clinical_case");
    if ((caseCount ?? 0) >= 5 && !existingKeys.has("case_publisher")) {
      await unlockBadge(userId, "case_publisher");
    }
  }

  // Artigo científico
  if (postType === "scientific_article" && !existingKeys.has("article_publisher")) {
    await unlockBadge(userId, "article_publisher");
  }

  // Especialidades por tags
  const tagLower = tags.map((t) => t.toLowerCase());
  if (tagLower.some((t) => t.includes("ombro") || t.includes("cotovelo"))) {
    const { count: c } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .contains("tags", ["ombro"]);
    if ((c ?? 0) >= 5 && !existingKeys.has("specialist_shoulder")) {
      await unlockBadge(userId, "specialist_shoulder");
    }
  }
}
