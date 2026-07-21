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
// A concessão de XP roda inteiramente no banco (função
// SECURITY DEFINER `award_self_xp`), validada contra as regras
// oficiais — o cliente não tem mais permissão para escrever
// diretamente em profiles.total_xp/current_level nem em
// xp_logs, então não dá pra forjar XP chamando a API direto.
// Só concede XP para o próprio usuário autenticado (auth.uid());
// XP por curtida recebida é creditado automaticamente por um
// trigger no banco quando alguém curte um post de outra pessoa.
export async function awardSelfXP(
  action: Exclude<XpAction, "like_received">,
  referenceId?: string
): Promise<{ newXP: number; newLevel: Level; leveledUp: boolean } | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("award_self_xp", { p_action: action, p_reference_id: referenceId ?? null })
    .single();

  if (error || !data) return null;

  const result = data as { new_xp: number; new_level: number; leveled_up: boolean };

  if (result.leveled_up) {
    await checkAndUnlockBadges(result.new_xp);
  }

  return { newXP: result.new_xp, newLevel: result.new_level as Level, leveledUp: result.leveled_up };
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

async function checkAndUnlockBadges(totalXP: number) {
  if (totalXP >= 1000) {
    await unlockBadge("xp_master");
  }
}

// Desbloqueio de badge roda via função SECURITY DEFINER no banco
// (`unlock_badge`), que valida a chave contra a lista oficial e
// já cria a notificação — sempre para o próprio usuário logado.
export async function unlockBadge(badgeKey: BadgeKey) {
  const supabase = createClient();
  await supabase.rpc("unlock_badge", { p_badge_key: badgeKey });
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
    await unlockBadge("first_post");
  }

  // 5 casos clínicos
  if (postType === "clinical_case") {
    const { count: caseCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("type", "clinical_case");
    if ((caseCount ?? 0) >= 5 && !existingKeys.has("case_publisher")) {
      await unlockBadge("case_publisher");
    }
  }

  // Artigo científico
  if (postType === "scientific_article" && !existingKeys.has("article_publisher")) {
    await unlockBadge("article_publisher");
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
      await unlockBadge("specialist_shoulder");
    }
  }
}
