import { createClient } from "@/lib/supabase/client";
import { QUESTION_AREAS, normalizeQuestionArea, type QuestionArea } from "@/lib/types";
import {
  isoWeekStart,
  linearRegression,
  classifyTrendRisk,
  MIN_ANSWERED_FOR_TREND,
  MIN_WEEKS_FOR_TREND,
  type TrendRisk,
} from "@/lib/predictive/trendMath";

// ============================================================
// Desempenho — Gráficos e alerta preditivo
// ============================================================
// Toda a leitura aqui passa pelas policies de question_tests /
// question_test_items (RLS): o próprio residente sempre enxerga os
// dados dele; um preceptor só enxerga os de um residente que seja
// membro ATIVO de uma equipe dele — então não precisamos reforçar
// permissão no cliente, o banco já filtra.

interface RawItemRow {
  is_correct: boolean | null;
  answered_at: string | null;
  question: { area: string } | { area: string }[] | null;
}

async function fetchAnsweredItems(residentId: string): Promise<{ area: QuestionArea; isCorrect: boolean; answeredAt: string }[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("question_test_items")
    .select("is_correct, answered_at, question:questions(area), question_tests!inner(user_id)")
    .eq("question_tests.user_id", residentId)
    .not("is_correct", "is", null)
    .not("answered_at", "is", null);

  if (error) throw new Error(error.message);

  return ((data ?? []) as unknown as RawItemRow[])
    .map((row) => {
      const q = Array.isArray(row.question) ? row.question[0] : row.question;
      if (!q || row.is_correct === null || !row.answered_at) return null;
      return {
        area: normalizeQuestionArea(q.area),
        isCorrect: row.is_correct,
        answeredAt: row.answered_at,
      };
    })
    .filter((x): x is { area: QuestionArea; isCorrect: boolean; answeredAt: string } => x !== null);
}

// ------------------------------------------------------------
// Gráfico de pizza: total de acertos/erros por área
// ------------------------------------------------------------
export interface AreaBreakdownItem {
  area: QuestionArea;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number | null; // 0-100, null se nunca respondeu nada na área
}

export async function getAreaBreakdown(residentId: string): Promise<AreaBreakdownItem[]> {
  const items = await fetchAnsweredItems(residentId);

  const byArea = new Map<QuestionArea, { correct: number; wrong: number }>();
  for (const area of QUESTION_AREAS) byArea.set(area, { correct: 0, wrong: 0 });

  for (const item of items) {
    const bucket = byArea.get(item.area)!;
    if (item.isCorrect) bucket.correct += 1;
    else bucket.wrong += 1;
  }

  return QUESTION_AREAS.map((area) => {
    const { correct, wrong } = byArea.get(area)!;
    const total = correct + wrong;
    return { area, correct, wrong, total, accuracy: total > 0 ? Math.round((correct / total) * 100) : null };
  });
}

// ------------------------------------------------------------
// Alerta preditivo: tendência semanal por área + projeção
// ------------------------------------------------------------
export interface AreaTrendPoint {
  weekStart: string; // ISO da segunda-feira daquela semana
  accuracy: number;  // 0-100
  answered: number;
}

// Alias mantido por compatibilidade — todo código existente que importa
// `PerformanceRisk` de performance.ts continua funcionando; o tipo em si
// agora vive em lib/predictive/trendMath.ts (compartilhado com
// lib/residentRisk.ts, que absorve esta mesma lógica de tendência no
// risk_score unificado da Análise Preditiva de Desempenho).
export type PerformanceRisk = TrendRisk;

export interface AreaTrendResult {
  area: QuestionArea;
  points: AreaTrendPoint[];
  slopePerWeek: number | null;         // pontos percentuais de acerto por semana
  projectedAccuracy4w: number | null;  // projeção de acerto (%) em 4 semanas
  risk: PerformanceRisk;
}

export async function getPerformanceTrend(residentId: string): Promise<AreaTrendResult[]> {
  const items = await fetchAnsweredItems(residentId);

  const byArea = new Map<QuestionArea, { weekStart: string; correct: number; total: number }[]>();
  for (const area of QUESTION_AREAS) byArea.set(area, []);

  // Agrupa por área + semana
  const grouped = new Map<string, { area: QuestionArea; weekStart: string; correct: number; total: number }>();
  for (const item of items) {
    const weekStart = isoWeekStart(item.answeredAt);
    const key = `${item.area}__${weekStart}`;
    const existing = grouped.get(key) ?? { area: item.area, weekStart, correct: 0, total: 0 };
    existing.total += 1;
    if (item.isCorrect) existing.correct += 1;
    grouped.set(key, existing);
  }

  for (const g of grouped.values()) {
    byArea.get(g.area)!.push({ weekStart: g.weekStart, correct: g.correct, total: g.total });
  }

  return QUESTION_AREAS.map((area) => {
    const weeks = (byArea.get(area) ?? []).sort((a, b) => (a.weekStart < b.weekStart ? -1 : 1));
    const totalAnswered = weeks.reduce((sum, w) => sum + w.total, 0);

    const points: AreaTrendPoint[] = weeks.map((w) => ({
      weekStart: w.weekStart,
      accuracy: Math.round((w.correct / w.total) * 100),
      answered: w.total,
    }));

    if (weeks.length < MIN_WEEKS_FOR_TREND || totalAnswered < MIN_ANSWERED_FOR_TREND) {
      return { area, points, slopePerWeek: null, projectedAccuracy4w: null, risk: "dados_insuficientes" as const };
    }

    const xs = weeks.map((_, i) => i);
    const ys = weeks.map((w) => (w.correct / w.total) * 100);
    const { slope, intercept } = linearRegression(xs, ys);
    const projectedRaw = intercept + slope * (xs.length - 1 + 4); // 4 semanas após a última
    const projected = Math.max(0, Math.min(100, Math.round(projectedRaw)));

    return {
      area,
      points,
      slopePerWeek: Math.round(slope * 10) / 10,
      projectedAccuracy4w: projected,
      risk: classifyTrendRisk(slope, projected, weeks.length, totalAnswered),
    };
  });
}
