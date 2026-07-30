"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PieChart as PieChartIcon, Users2, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useUser } from "@/hooks/useUser";
import { listMyActiveResidents } from "@/lib/teams";
import { getAreaBreakdown, getPerformanceTrend, type AreaBreakdownItem, type AreaTrendResult, type PerformanceRisk } from "@/lib/performance";
import type { TeamMember } from "@/lib/types";

const ACCURACY_COLORS = { alto: "#ef4444", medio: "#f59e0b", bom: "#10b981", vazio: "#e2e8f0" } as const;

function colorForAccuracy(accuracy: number | null): string {
  if (accuracy === null) return ACCURACY_COLORS.vazio;
  if (accuracy < 50) return ACCURACY_COLORS.alto;
  if (accuracy < 75) return ACCURACY_COLORS.medio;
  return ACCURACY_COLORS.bom;
}

const RISK_LABEL: Record<PerformanceRisk, string> = {
  alto: "Risco alto",
  atencao: "Atenção",
  estavel: "Estável",
  dados_insuficientes: "Dados insuficientes",
};

const RISK_STYLE: Record<PerformanceRisk, string> = {
  alto: "bg-red-50 border-red-200 text-red-600",
  atencao: "bg-amber-50 border-amber-200 text-amber-600",
  estavel: "bg-emerald-50 border-emerald-200 text-emerald-600",
  dados_insuficientes: "bg-slate-50 border-slate-200 text-slate-400",
};

function RiskIcon({ risk }: { risk: PerformanceRisk }) {
  if (risk === "alto") return <TrendingDown className="h-3.5 w-3.5" />;
  if (risk === "atencao") return <AlertTriangle className="h-3.5 w-3.5" />;
  if (risk === "estavel") return <TrendingUp className="h-3.5 w-3.5" />;
  return <HelpCircle className="h-3.5 w-3.5" />;
}

export default function GraficosPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [residents, setResidents] = useState<TeamMember[]>([]);
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");
  const [breakdown, setBreakdown] = useState<AreaBreakdownItem[]>([]);
  const [trend, setTrend] = useState<AreaTrendResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  useEffect(() => {
    if (!user) return;
    listMyActiveResidents().then(setResidents).catch(() => {});
  }, [user]);

  const load = useCallback(async (residentId: string) => {
    setLoading(true);
    try {
      const [b, t] = await Promise.all([getAreaBreakdown(residentId), getPerformanceTrend(residentId)]);
      setBreakdown(b);
      setTrend(t);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar os gráficos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    load(selectedResidentId || user.id);
  }, [user, selectedResidentId, load]);

  if (userLoading || !user) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  const answeredAreas = breakdown.filter((a) => a.total > 0);
  const totalAnswered = breakdown.reduce((s, a) => s + a.total, 0);
  const totalCorrect = breakdown.reduce((s, a) => s + a.correct, 0);
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  const riskAreas = trend.filter((t) => t.risk === "alto" || t.risk === "atencao");

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-4xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <PieChartIcon className="h-6 w-6 text-ossohub-green" />
            <h1 className="text-2xl font-bold text-ossohub-navy">Gráficos de Desempenho</h1>
          </div>
        </div>

        {residents.length > 0 && (
          <div className="ossohub-card p-4 mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-ossohub-navy mb-1.5">
              <Users2 className="h-4 w-4 text-ossohub-green" /> Visualizar desempenho de
            </label>
            <select
              value={selectedResidentId}
              onChange={(e) => setSelectedResidentId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
            >
              <option value="">Meu próprio desempenho</option>
              {residents.map((m) => (
                <option key={m.id} value={m.resident_id}>
                  {m.resident?.full_name ?? m.resident_id} — {m.team?.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-14"><Loader2 className="h-6 w-6 animate-spin text-ossohub-green" /></div>
        ) : totalAnswered === 0 ? (
          <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
            Ainda não há questões respondidas para gerar os gráficos.
          </div>
        ) : (
          <>
            {/* Resumo geral */}
            <div className="ossohub-card p-5 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-ossohub-navy">{totalAnswered}</p>
                <p className="text-xs text-ossohub-slate">Respondidas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{totalCorrect}</p>
                <p className="text-xs text-ossohub-slate">Acertos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">{totalAnswered - totalCorrect}</p>
                <p className="text-xs text-ossohub-slate">Erros</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ossohub-navy">{overallAccuracy}%</p>
                <p className="text-xs text-ossohub-slate">Aproveitamento</p>
              </div>
            </div>

            {/* Pizza por área */}
            <div className="ossohub-card p-5 mb-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-1">Distribuição por área de estudo</p>
              <p className="text-xs text-ossohub-slate mb-3">
                Tamanho da fatia = volume de questões respondidas · cor = aproveitamento (verde ≥75%, amarelo 50–74%, vermelho &lt;50%)
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={answeredAreas}
                      dataKey="total"
                      nameKey="area"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.area} (${entry.accuracy}%)`}
                    >
                      {answeredAreas.map((entry) => (
                        <Cell key={entry.area} fill={colorForAccuracy(entry.accuracy)} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(_value, _name, item) => {
                        const p = item.payload as AreaBreakdownItem;
                        return [`${p.correct} acertos · ${p.wrong} erros (${p.accuracy}%)`, p.area];
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerta preditivo */}
            <div className="ossohub-card p-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-1 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-ossohub-green" /> Alerta preditivo por área
              </p>
              <p className="text-xs text-ossohub-slate mb-4">
                Projeção com base na tendência semanal de aproveitamento — para antecipar quedas de rendimento e apontar onde reforçar o estudo.
              </p>

              {riskAreas.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 mb-4">
                  <CheckCircle2 className="h-4 w-4" /> Nenhuma área em risco no momento.
                </div>
              )}

              <div className="space-y-3">
                {trend.map((t) => (
                  <div key={t.area} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <p className="text-sm font-medium text-ossohub-navy">{t.area}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${RISK_STYLE[t.risk]}`}>
                        <RiskIcon risk={t.risk} /> {RISK_LABEL[t.risk]}
                      </span>
                    </div>

                    {t.risk === "dados_insuficientes" ? (
                      <p className="text-xs text-ossohub-slate">
                        Responda mais questões nessa área, em pelo menos duas semanas diferentes, para gerar a projeção.
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-ossohub-slate mb-2">
                          Tendência: {t.slopePerWeek! >= 0 ? "+" : ""}{t.slopePerWeek} p.p./semana · Projeção em 4 semanas: <strong>{t.projectedAccuracy4w}%</strong>
                        </p>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={t.points}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                              <XAxis dataKey="weekStart" tick={{ fontSize: 10 }} tickFormatter={(v: string) => v.slice(5)} />
                              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} width={30} />
                              <Tooltip formatter={(value: number) => `${value}%`} labelFormatter={(label: string) => `Semana de ${label}`} />
                              <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
