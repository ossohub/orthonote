// ============================================================
// OssoHub — Análise Preditiva de Desempenho
// Service de cálculo de risco — SERVER-ONLY
// ============================================================
// Aberto para QUALQUER perfil (não só médico_residente) — os nomes
// "resident"/"residentRisk"/resident_features são históricos (o módulo
// começou pensado só pra residentes) mas hoje qualquer usuário logado
// pode ver a própria análise. Nada na lógica abaixo depende de
// profissão; onde havia um filtro fixo em 'medico_residente' (grupo de
// pares e a lista do cron), foi trocado por "mesma profissão do próprio
// usuário, com fallback pra todos os perfis ativos".
//
// Este arquivo usa o Supabase admin client (service_role — ver
// src/lib/supabase/admin.ts), então NUNCA pode ser importado por um
// componente "use client". Ele é chamado apenas por:
//   - GET /api/v1/resident/[user_id]/risk  (sob demanda, quando o
//     snapshot do dia ainda não existe — ver src/app/api/v1/resident/
//     [user_id]/risk/route.ts)
//   - /api/internal/cron/resident-risk     (em lote, 1x/dia — ver
//     src/app/api/internal/cron/resident-risk/route.ts)
//
// O que este service faz, em ordem:
//   1. Busca as features de engajamento do usuário nas janelas de
//      7/30/90 dias (XP, casos publicados, comentários, dias ativos).
//   2. Busca o mesmo dado agregado (só XP de 30d) de um grupo de pares
//      (mesma profissão; se não houver pares suficientes, usa todos os
//      perfis ativos da plataforma) para calcular um z-score.
//   3. Absorve a lógica de tendência de acerto do banco de questões que
//      já existia em lib/performance.ts (mesmas funções puras, agora em
//      lib/predictive/trendMath.ts) — só que aqui agregada por TODAS as
//      áreas juntas, pra virar um único sinal de "piora de desempenho em
//      quizzes" em vez de um resultado por área.
//   4. Combina os três sinais acima (queda de XP, z-score de engajamento
//      vs pares, tendência de quiz) em um risk_score 0-1 por regras
//      (MVP — ver o bloco PONTO DE EXTENSÃO abaixo pra trocar por ML).
//   5. Grava tudo (1 linha) em public.resident_features, com upsert por
//      (user_id, date) — o histórico dessas linhas é o que alimenta tanto
//      a resposta da API quanto o gráfico de 90 dias no dashboard.
//
// Nenhuma função aqui deve ser chamada a partir do browser: elas leem/
// escrevem com a service_role key, que ignora RLS.

import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeQuestionArea, type ResidencyYear, type ProfessionalRole } from "@/lib/types";
import {
  isoWeekStart,
  linearRegression,
  classifyTrendRisk,
  zScore,
  percentChange,
  clamp,
  MIN_ANSWERED_FOR_TREND,
  MIN_WEEKS_FOR_TREND,
  type TrendRisk,
} from "@/lib/predictive/trendMath";

// ============================================================
// Tipos
// ============================================================

export type RiskLevel = "baixo" | "médio" | "alto";

// Mesmo shape da tabela public.resident_features (snake_case de propósito
// — é o que o endpoint GET /api/v1/resident/[user_id]/risk devolve quase
// sem tradução, e o que o frontend lê diretamente via browser client pra
// montar o gráfico de 90 dias).
export interface ResidentFeaturesRow {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  xp_gain_7d: number;
  xp_gain_30d: number;
  xp_gain_90d: number;
  cases_published_30d: number;
  comments_30d: number;
  login_days_30d: number;
  engagement_score: number;
  risk_score: number;
  risk_level: RiskLevel;
  top_reasons: string[];
  recommendations: string[];
  peer_group_size: number | null;
  model_version: string;
  created_at: string;
  updated_at: string;
}

interface EngagementFeatures {
  xpGain7d: number;
  xpGain30d: number;
  xpGain90d: number;
  casesPublished30d: number;
  comments30d: number;
  loginDays30d: number;
  engagementScore: number;
}

interface RiskComputation {
  riskScore: number;
  riskLevel: RiskLevel;
  topReasons: string[];
  recommendations: string[];
  peerGroupSize: number | null;
}

// ============================================================
// Configuração — alvos usados para normalizar cada componente do
// engagement_score em 0-100. Números arbitrários mas documentados;
// calibrar com dados reais assim que houver volume suficiente.
// ============================================================
const XP_30D_TARGET = 300; // XP/mês de um residente "engajado" (heurística)
const CASES_30D_TARGET = 4; // casos/artigos publicados por mês
const COMMENTS_30D_TARGET = 10; // comentários por mês
const LOGIN_DAYS_30D_TARGET = 30; // dias ativos nos últimos 30 dias

const ENGAGEMENT_WEIGHTS = {
  xp: 0.35,
  cases: 0.2,
  comments: 0.15,
  loginDays: 0.3,
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export const DEFAULT_MODEL_VERSION = "rules-v1";

// ============================================================
// Ponto de entrada principal
// ============================================================

// Calcula o risco atual do residente e grava (upsert) em
// resident_features na data de hoje. É a única função que ESCREVE no
// banco — getResidentRisk() abaixo só lê e delega pra cá quando precisa
// recalcular.
export async function computeAndSaveResidentRisk(userId: string): Promise<ResidentFeaturesRow> {
  const admin = createAdminClient();
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);

  const profile = await fetchResidentProfile(admin, userId);
  const engagement = await fetchEngagementFeatures(admin, userId, today);
  const quizTrend = await fetchQuizTrend(admin, userId, today);
  const risk = await computeRisk(admin, userId, profile, engagement, quizTrend);

  const { data, error } = await admin
    .from("resident_features")
    .upsert(
      {
        user_id: userId,
        date: dateStr,
        xp_gain_7d: engagement.xpGain7d,
        xp_gain_30d: engagement.xpGain30d,
        xp_gain_90d: engagement.xpGain90d,
        cases_published_30d: engagement.casesPublished30d,
        comments_30d: engagement.comments30d,
        login_days_30d: engagement.loginDays30d,
        engagement_score: engagement.engagementScore,
        risk_score: risk.riskScore,
        risk_level: risk.riskLevel,
        top_reasons: risk.topReasons,
        recommendations: risk.recommendations,
        peer_group_size: risk.peerGroupSize,
        model_version: DEFAULT_MODEL_VERSION,
      },
      { onConflict: "user_id,date" }
    )
    .select("*")
    .single();

  if (error) throw new Error(`Falha ao gravar resident_features: ${error.message}`);
  return data as ResidentFeaturesRow;
}

// Lê o snapshot de hoje se ele já existir; senão, calcula e grava um novo
// na hora (primeira visita do dia do residente ao dashboard, ou primeira
// chamada da API no dia). `maxAgeHours` permite forçar recálculo mesmo
// dentro do mesmo dia se um dia o produto quiser refresh mais frequente.
export async function getResidentRisk(userId: string, opts?: { maxAgeHours?: number }): Promise<ResidentFeaturesRow> {
  const admin = createAdminClient();
  const todayStr = new Date().toISOString().slice(0, 10);

  const { data, error } = await admin
    .from("resident_features")
    .select("*")
    .eq("user_id", userId)
    .eq("date", todayStr)
    .maybeSingle();

  if (error) throw new Error(`Falha ao ler resident_features: ${error.message}`);

  if (data) {
    if (!opts?.maxAgeHours) return data as ResidentFeaturesRow;
    const ageMs = Date.now() - new Date(data.updated_at).getTime();
    if (ageMs < opts.maxAgeHours * 60 * 60 * 1000) return data as ResidentFeaturesRow;
  }

  return computeAndSaveResidentRisk(userId);
}

// Histórico dos últimos `days` dias — é o que alimenta o gráfico de
// evolução de 90 dias no dashboard. Chamado pelo endpoint
// GET /api/v1/resident/[user_id]/risk (que já validou que quem pediu é
// o próprio residente) — por isso pode usar o admin client livremente
// aqui, sem precisar que o frontend acesse resident_features direto via
// browser client (evita depender de nenhuma policy adicional de SELECT
// além da que já existe, e mantém toda leitura de dado sensível atrás
// do mesmo ponto de autorização).
export async function getResidentRiskHistory(userId: string, days = 90): Promise<ResidentFeaturesRow[]> {
  const admin = createAdminClient();
  const cutoff = new Date(Date.now() - days * DAY_MS).toISOString().slice(0, 10);

  const { data, error } = await admin
    .from("resident_features")
    .select("*")
    .eq("user_id", userId)
    .gte("date", cutoff)
    .order("date", { ascending: true });

  if (error) throw new Error(`Falha ao ler histórico de resident_features: ${error.message}`);
  return (data ?? []) as ResidentFeaturesRow[];
}

// Usado pelo cron diário (/api/internal/cron/resident-risk) — recalcula
// TODOS os perfis ativos (qualquer profissão, não só médico_residente).
// Sequencial de propósito: o volume atual da plataforma é pequeno e isso
// evita sobrecarregar o Postgres/Supabase com N queries em paralelo. Se
// a base de usuários crescer muito, trocar por um `Promise.allSettled`
// em lotes de ~10.
export async function recomputeAllResidentsRisk(): Promise<{
  processed: number;
  failed: { userId: string; message: string }[];
}> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .eq("account_active", true);

  if (error) throw new Error(`Falha ao listar perfis ativos: ${error.message}`);

  const failed: { userId: string; message: string }[] = [];
  let processed = 0;

  for (const row of data ?? []) {
    try {
      await computeAndSaveResidentRisk(row.id);
      processed += 1;
    } catch (err) {
      failed.push({ userId: row.id, message: err instanceof Error ? err.message : String(err) });
    }
  }

  return { processed, failed };
}

// ============================================================
// Features de engajamento
// ============================================================

async function fetchResidentProfile(admin: ReturnType<typeof createAdminClient>, userId: string) {
  const { data, error } = await admin
    .from("profiles")
    .select("id, professional_role, residency_year, account_active")
    .eq("id", userId)
    .single();

  if (error) throw new Error(`Perfil não encontrado: ${error.message}`);
  return {
    residencyYear: (data.residency_year as ResidencyYear | null) ?? null,
    professionalRole: data.professional_role as ProfessionalRole,
    accountActive: data.account_active as boolean,
  };
}

type ResidentProfile = Awaited<ReturnType<typeof fetchResidentProfile>>;

async function fetchEngagementFeatures(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  now: Date
): Promise<EngagementFeatures> {
  const cutoff90 = new Date(now.getTime() - 90 * DAY_MS);
  const cutoff30 = new Date(now.getTime() - 30 * DAY_MS);
  const cutoff7 = new Date(now.getTime() - 7 * DAY_MS);

  // Uma única query de xp_logs cobrindo os 90 dias — os buckets de
  // 7/30 dias são derivados em memória a partir dela.
  const { data: xpRows, error: xpErr } = await admin
    .from("xp_logs")
    .select("xp_gained, created_at")
    .eq("user_id", userId)
    .gte("created_at", cutoff90.toISOString());
  if (xpErr) throw new Error(`Falha ao ler xp_logs: ${xpErr.message}`);

  let xpGain7d = 0;
  let xpGain30d = 0;
  let xpGain90d = 0;
  const activeDays = new Set<string>();
  for (const row of xpRows ?? []) {
    const createdAt = new Date(row.created_at as string);
    const gained = (row.xp_gained as number) ?? 0;
    xpGain90d += gained;
    if (createdAt >= cutoff30) xpGain30d += gained;
    if (createdAt >= cutoff7) xpGain7d += gained;
    if (createdAt >= cutoff30) activeDays.add((row.created_at as string).slice(0, 10));
  }

  // casos/artigos publicados nos últimos 30 dias — conta qualquer tipo de
  // post (caso clínico, artigo, experiência), independente do status de
  // moderação: o que importa aqui é esforço/participação, não se o post
  // foi aprovado.
  const { count: casesCount, error: postsErr } = await admin
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", cutoff30.toISOString());
  if (postsErr) throw new Error(`Falha ao ler posts: ${postsErr.message}`);

  const { count: commentsCount, error: commentsErr } = await admin
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", cutoff30.toISOString());
  if (commentsErr) throw new Error(`Falha ao ler comments: ${commentsErr.message}`);

  // login_days_30d — proxy: não existe tabela de sessão/login no banco
  // hoje, então aproximamos "dia ativo" por dias distintos com QUALQUER
  // atividade que gere XP (post, comentário, like recebido, etc. — já
  // capturado acima via xp_logs) OU com um teste de questões iniciado
  // (que não gera XP hoje, então precisa de uma query própria).
  // TODO(login-tracking): se um dia existir uma tabela real de sessões/
  // último-acesso, trocar esta aproximação por dias distintos de login
  // de verdade — a assinatura de fetchEngagementFeatures não muda.
  const { data: testRows, error: testsErr } = await admin
    .from("question_tests")
    .select("started_at")
    .eq("user_id", userId)
    .gte("started_at", cutoff30.toISOString());
  if (testsErr) throw new Error(`Falha ao ler question_tests: ${testsErr.message}`);
  for (const row of testRows ?? []) {
    if (row.started_at) activeDays.add((row.started_at as string).slice(0, 10));
  }

  const casesPublished30d = casesCount ?? 0;
  const comments30d = commentsCount ?? 0;
  const loginDays30d = activeDays.size;

  const xpComponent = clamp((xpGain30d / XP_30D_TARGET) * 100, 0, 100);
  const casesComponent = clamp((casesPublished30d / CASES_30D_TARGET) * 100, 0, 100);
  const commentsComponent = clamp((comments30d / COMMENTS_30D_TARGET) * 100, 0, 100);
  const loginComponent = clamp((loginDays30d / LOGIN_DAYS_30D_TARGET) * 100, 0, 100);

  const engagementScore =
    xpComponent * ENGAGEMENT_WEIGHTS.xp +
    casesComponent * ENGAGEMENT_WEIGHTS.cases +
    commentsComponent * ENGAGEMENT_WEIGHTS.comments +
    loginComponent * ENGAGEMENT_WEIGHTS.loginDays;

  return {
    xpGain7d,
    xpGain30d,
    xpGain90d,
    casesPublished30d,
    comments30d,
    loginDays30d,
    engagementScore: Math.round(engagementScore * 100) / 100,
  };
}

// ============================================================
// Tendência de acerto no banco de questões — absorve a mesma lógica de
// lib/performance.ts (via lib/predictive/trendMath.ts), mas agregada por
// TODAS as áreas juntas: aqui o objetivo é um único sinal de "o
// desempenho em quizzes está piorando?" pro risk_score geral, não um
// resultado por área (isso continua existindo, sem mudanças, na página
// /desempenho/graficos).
// ============================================================

async function fetchQuizTrend(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  now: Date
): Promise<TrendRisk> {
  // Mesma janela usada implicitamente em performance.ts (não há corte de
  // data lá — usa o histórico todo). Aqui limitamos a ~16 semanas pra não
  // deixar o cálculo sensível demais ao desempenho de anos atrás.
  const cutoff = new Date(now.getTime() - 16 * 7 * DAY_MS);

  const { data, error } = await admin
    .from("question_test_items")
    .select("is_correct, answered_at, question_tests!inner(user_id)")
    .eq("question_tests.user_id", userId)
    .not("is_correct", "is", null)
    .not("answered_at", "is", null)
    .gte("answered_at", cutoff.toISOString());

  if (error) throw new Error(`Falha ao ler question_test_items: ${error.message}`);

  type Row = { is_correct: boolean | null; answered_at: string | null };
  const grouped = new Map<string, { correct: number; total: number }>();
  for (const row of (data ?? []) as Row[]) {
    if (row.is_correct === null || !row.answered_at) continue;
    const weekStart = isoWeekStart(row.answered_at);
    const bucket = grouped.get(weekStart) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (row.is_correct) bucket.correct += 1;
    grouped.set(weekStart, bucket);
  }

  const weeks = [...grouped.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  const totalAnswered = weeks.reduce((sum, [, w]) => sum + w.total, 0);

  if (weeks.length < MIN_WEEKS_FOR_TREND || totalAnswered < MIN_ANSWERED_FOR_TREND) {
    return "dados_insuficientes";
  }

  const xs = weeks.map((_, i) => i);
  const ys = weeks.map(([, w]) => (w.correct / w.total) * 100);
  const { slope, intercept } = linearRegression(xs, ys);
  const projectedRaw = intercept + slope * (xs.length - 1 + 4);
  const projected = clamp(Math.round(projectedRaw), 0, 100);

  return classifyTrendRisk(slope, projected, weeks.length, totalAnswered);
}

// ============================================================
// Comparação com pares (z-score de XP de 30 dias)
// ============================================================

async function fetchPeerXpGain30d(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  profile: { residencyYear: ResidencyYear | null; professionalRole: ProfessionalRole },
  now: Date
): Promise<{ scores: number[]; groupSize: number }> {
  let peerIds: string[] = [];

  // Grupo mais específico: mesma profissão + mesmo ano de residência
  // (só existe pra médico_residente; pra qualquer outra profissão
  // residencyYear é null e este bloco é pulado direto pro próximo).
  if (profile.residencyYear) {
    const { data, error } = await admin
      .from("profiles")
      .select("id")
      .eq("professional_role", profile.professionalRole)
      .eq("residency_year", profile.residencyYear)
      .neq("id", userId);
    if (error) throw new Error(`Falha ao buscar pares (profissão + ano): ${error.message}`);
    peerIds = (data ?? []).map((p) => p.id as string);
  }

  // Fallback 1: mesma profissão, sem filtrar por ano — cobre todo mundo
  // que não é médico_residente (ou é, mas o grupo por ano era pequeno
  // demais pro z-score ser confiável, mesmo limiar de
  // lib/predictive/trendMath.zScore).
  if (peerIds.length < 3) {
    const { data, error } = await admin
      .from("profiles")
      .select("id")
      .eq("professional_role", profile.professionalRole)
      .neq("id", userId);
    if (error) throw new Error(`Falha ao buscar pares (mesma profissão): ${error.message}`);
    peerIds = (data ?? []).map((p) => p.id as string);
  }

  // Fallback 2: ainda pequeno demais (ex: profissão rara na base) — usa
  // todos os perfis ativos da plataforma, independente de profissão.
  if (peerIds.length < 3) {
    const { data, error } = await admin
      .from("profiles")
      .select("id")
      .eq("account_active", true)
      .neq("id", userId);
    if (error) throw new Error(`Falha ao buscar pares (todos os perfis ativos): ${error.message}`);
    peerIds = (data ?? []).map((p) => p.id as string);
  }

  if (peerIds.length === 0) return { scores: [], groupSize: 0 };

  const cutoff30 = new Date(now.getTime() - 30 * DAY_MS);
  const { data: xpRows, error: xpErr } = await admin
    .from("xp_logs")
    .select("user_id, xp_gained, created_at")
    .in("user_id", peerIds)
    .gte("created_at", cutoff30.toISOString());
  if (xpErr) throw new Error(`Falha ao buscar XP dos pares: ${xpErr.message}`);

  const byPeer = new Map<string, number>(peerIds.map((id) => [id, 0]));
  for (const row of xpRows ?? []) {
    const id = row.user_id as string;
    byPeer.set(id, (byPeer.get(id) ?? 0) + ((row.xp_gained as number) ?? 0));
  }

  return { scores: [...byPeer.values()], groupSize: peerIds.length };
}

// ============================================================
// Combinação de sinais em risk_score (MVP baseado em regras)
// ============================================================
//
// >>> PONTO DE EXTENSÃO PARA MODELO DE ML (XGBoost / Random Forest) <<<
// A função computeRisk() abaixo é o modelo MVP (model_version =
// "rules-v1", ver DEFAULT_MODEL_VERSION no topo do arquivo). Quando
// houver dados históricos suficientes em resident_features para treinar
// um modelo de verdade:
//   1. Use as linhas acumuladas de resident_features como dataset — cada
//      linha já tem as features (xp_gain_7d/30d/90d, cases_published_30d,
//      comments_30d, login_days_30d, engagement_score) e pode ser
//      rotulada com o outcome real observado nas semanas seguintes
//      (ex: residente realmente teve queda de desempenho confirmada?).
//   2. Treine offline (ex: XGBoost/Random Forest em Python) e sirva o
//      modelo via um endpoint próprio ou exporte para um formato que dê
//      pra rodar em Node (ex: ONNX Runtime).
//   3. Crie uma função `computeRiskWithMlModel(features, quizTrend)` com
//      a MESMA assinatura de retorno de `computeRisk()` abaixo
//      (RiskComputation: riskScore, riskLevel, topReasons, recommendations,
//      peerGroupSize) e troque a chamada em computeAndSaveResidentRisk().
//   4. Atualize DEFAULT_MODEL_VERSION para "xgboost-v1" (ou a versão
//      apropriada) — o restante do pipeline (endpoint, cron, tabela,
//      frontend) não precisa mudar, porque todos consomem só o output
//      RiskComputation/ResidentFeaturesRow, nunca a lógica interna.
async function computeRisk(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  profile: ResidentProfile,
  engagement: EngagementFeatures,
  quizTrend: TrendRisk
): Promise<RiskComputation> {
  const { scores: peerScores, groupSize } = await fetchPeerXpGain30d(admin, userId, profile, new Date());

  // Média móvel simples: XP médio mensal dos últimos 3 meses, usado como
  // "linha de base" pra comparar com o mês mais recente.
  const avgMonthlyXp90d = engagement.xpGain90d / 3;
  const xpDropPct = percentChange(engagement.xpGain30d, avgMonthlyXp90d);
  const zEngagementXp = zScore(engagement.xpGain30d, peerScores);

  let score = 0;
  const topReasons: string[] = [];
  const recommendations: string[] = [];

  // Sinal 1 — queda de XP vs média móvel dos últimos 3 meses.
  if (xpDropPct !== null && xpDropPct <= -30) {
    score += 0.35;
    topReasons.push(
      `Queda de ${Math.abs(Math.round(xpDropPct))}% no ganho de XP nos últimos 30 dias em relação à média dos últimos 3 meses.`
    );
    recommendations.push("Retome uma rotina de estudo regular — mesmo sessões curtas de questões já ajudam a reverter a queda de XP.");
  } else if (xpDropPct !== null && xpDropPct <= -15) {
    score += 0.15;
    topReasons.push(`Ganho de XP ${Math.abs(Math.round(xpDropPct))}% abaixo da média dos últimos 3 meses.`);
  }

  // Sinal 2 — z-score de XP de 30d vs pares (mesma profissão + ano de
  // residência quando aplicável, com fallback pra mesma profissão e
  // depois pra todos os perfis ativos).
  if (zEngagementXp !== null && zEngagementXp <= -1.5) {
    score += 0.25;
    topReasons.push("Engajamento (XP) significativamente abaixo da média dos colegas do mesmo grupo.");
    recommendations.push("Considere publicar um caso clínico ou comentar nas discussões da equipe para aumentar sua participação.");
  } else if (zEngagementXp !== null && zEngagementXp <= -1) {
    score += 0.12;
    topReasons.push("Engajamento (XP) um pouco abaixo da média dos colegas do mesmo grupo.");
  }

  // Sinal 3 — tendência de acerto no banco de questões (absorvido de
  // lib/performance.ts via lib/predictive/trendMath.ts).
  if (quizTrend === "alto") {
    score += 0.25;
    topReasons.push("Tendência de queda acentuada na taxa de acerto do banco de questões.");
    recommendations.push("Foque a revisão nas áreas com queda de acerto — confira o detalhamento em Desempenho > Gráficos.");
  } else if (quizTrend === "atencao") {
    score += 0.12;
    topReasons.push("Leve tendência de queda na taxa de acerto do banco de questões.");
  }

  // Sinal 4 — dias ativos nos últimos 30 dias (proxy de login).
  if (engagement.loginDays30d <= 2) {
    score += 0.15;
    topReasons.push(`Apenas ${engagement.loginDays30d} dia(s) ativo(s) na plataforma nos últimos 30 dias.`);
    recommendations.push("Reserve um horário fixo na semana para acessar a plataforma — consistência importa mais que volume.");
  } else if (engagement.loginDays30d <= 5) {
    score += 0.07;
    topReasons.push(`Poucos dias ativos (${engagement.loginDays30d}) na plataforma nos últimos 30 dias.`);
  }

  const riskScore = Math.round(clamp(score, 0, 1) * 1000) / 1000;
  const riskLevel: RiskLevel = riskScore >= 0.6 ? "alto" : riskScore >= 0.3 ? "médio" : "baixo";

  if (topReasons.length === 0) {
    topReasons.push("Nenhum sinal de risco identificado — engajamento e desempenho estáveis.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Continue assim! Seu engajamento está estável em relação aos seus colegas.");
  }

  return {
    riskScore,
    riskLevel,
    topReasons,
    recommendations,
    peerGroupSize: groupSize > 0 ? groupSize : null,
  };
}

// Reexportado só por conveniência de quem quiser normalizar áreas ao
// exibir o motivo "tendência de queda" com mais detalhe no futuro (ex:
// dizer QUAL área caiu, não só que caiu). Não usado internamente ainda.
export { normalizeQuestionArea };
