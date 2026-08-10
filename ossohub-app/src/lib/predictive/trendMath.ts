// ============================================================
// OssoHub — Matemática compartilhada de tendência/risco
// ============================================================
// Funções puras (sem I/O, sem Supabase) extraídas de src/lib/performance.ts
// para serem reaproveitadas tanto:
//   - pelo lado cliente (performance.ts, gráfico de acerto por área/semana
//     em /desempenho/graficos, usa o Supabase client do navegador), quanto
//   - pelo lado servidor (src/lib/residentRisk.ts, módulo de Análise
//     Preditiva de Desempenho, usa o Supabase admin/service-role).
// Mantendo a regressão linear e a classificação de risco num único lugar,
// os dois módulos concordam sempre sobre "o que é tendência de queda" —
// não existem duas lógicas de risco divergentes no app.
//
// Nada aqui depende de Supabase, DOM ou variáveis de ambiente — só
// aritmética. Isso deixa a função fácil de testar isoladamente e fácil de
// trocar depois por um modelo de ML sem tocar em quem a chama.

export type TrendRisk = "alto" | "atencao" | "estavel" | "dados_insuficientes";

export const MIN_ANSWERED_FOR_TREND = 6;
export const MIN_WEEKS_FOR_TREND = 2;

// Segunda-feira (UTC) da semana ISO em que `dateStr` cai — usado para
// agrupar respostas em buckets semanais antes da regressão.
export function isoWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = (d.getUTCDay() + 6) % 7; // segunda = 0
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

// Regressão linear simples (mínimos quadrados) de ys vs xs (ex: accuracy %
// vs índice da semana, ou XP semanal vs índice da semana).
export function linearRegression(xs: number[], ys: number[]): { slope: number; intercept: number } {
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - meanX) * (ys[i] - meanY);
    den += (xs[i] - meanX) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

// Classificação de risco (MVP baseado em regras) a partir da tendência de
// acerto (%) projetada 4 semanas à frente. Mesmos limiares usados
// historicamente em performance.ts — preservados aqui para não mudar o
// comportamento do gráfico de Desempenho existente.
export function classifyTrendRisk(
  slope: number | null,
  projected: number | null,
  weeksOfData: number,
  totalAnswered: number
): TrendRisk {
  if (slope === null || projected === null || weeksOfData < MIN_WEEKS_FOR_TREND || totalAnswered < MIN_ANSWERED_FOR_TREND) {
    return "dados_insuficientes";
  }
  if (projected < 50 || slope <= -5) return "alto";
  if (projected < 65 || slope <= -2) return "atencao";
  return "estavel";
}

// Z-score simples: quantos desvios-padrão `value` está da média de `peers`
// (que já deve incluir ou não o próprio residente, a critério de quem
// chama). Retorna 0 quando não há variância ou não há pares suficientes —
// nesse caso o chamador deve tratar o z-score como "sem sinal" em vez de
// "sem risco".
export function zScore(value: number, peers: number[]): number | null {
  if (peers.length < 3) return null; // amostra pequena demais pra comparação ser confiável
  const mean = peers.reduce((a, b) => a + b, 0) / peers.length;
  const variance = peers.reduce((sum, p) => sum + (p - mean) ** 2, 0) / peers.length;
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

// Variação percentual entre duas janelas (ex: XP dos últimos 30d vs XP dos
// 30d anteriores). Retorna null quando a base é 0 e não há como calcular
// uma % (evita divisão por zero silenciosa virando Infinity/NaN).
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

// Clamp genérico — usado tanto para 0-1 (risk_score) quanto 0-100 (%).
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
