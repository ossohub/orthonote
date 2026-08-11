"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Brain, TrendingDown, TrendingUp, Minus,
  AlertTriangle, Lightbulb, Lock,
} from "lucide-react";
import { toast } from "sonner";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useUser } from "@/hooks/useUser";

// ============================================================
// /desempenho/preditivo — "Análise Preditiva de Desempenho"
// ============================================================
// Página PRIVADA — só o próprio usuário vê a própria análise (o endpoint
// por trás recusa qualquer user_id que não seja o da sessão logada).
// Disponível para QUALQUER perfil, não só médico residente. Fluxo:
//   1. Gate de consentimento LGPD: antes de qualquer dado aparecer, o
//      usuário precisa aceitar explicitamente (GET/POST
//      /api/v1/resident/consent). Sem isso, GET .../risk devolve
//      403 consent_required e mostramos o card de consentimento aqui.
//   2. Com consentimento, buscamos GET /api/v1/resident/[user_id]/risk
//      — risk_score/risk_level/top_reasons/recommendations/last_updated
//      + history (90 dias) pro gráfico.

type RiskLevel = "baixo" | "médio" | "alto";

interface RiskHistoryPoint {
  date: string;
  engagement_score: number;
  risk_score: number;
  xp_gain_30d: number;
}

interface RiskResponse {
  risk_score: number;
  risk_level: RiskLevel;
  top_reasons: string[];
  recommendations: string[];
  last_updated: string;
  history: RiskHistoryPoint[];
}

const RISK_STYLE: Record<RiskLevel, string> = {
  baixo: "bg-emerald-50 border-emerald-200 text-emerald-600",
  médio: "bg-amber-50 border-amber-200 text-amber-600",
  alto: "bg-red-50 border-red-200 text-red-600",
};

const RISK_LABEL: Record<RiskLevel, string> = {
  baixo: "Risco baixo",
  médio: "Risco médio",
  alto: "Risco alto",
};

function RiskIcon({ level }: { level: RiskLevel }) {
  if (level === "alto") return <TrendingDown className="h-4 w-4" />;
  if (level === "médio") return <Minus className="h-4 w-4" />;
  return <TrendingUp className="h-4 w-4" />;
}

type ViewState = "loading" | "consent_required" | "ready" | "error";

export default function AnalisePreditivaPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [view, setView] = useState<ViewState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [risk, setRisk] = useState<RiskResponse | null>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const loadRisk = useCallback(async (userId: string) => {
    setView("loading");
    try {
      const res = await fetch(`/api/v1/resident/${userId}/risk`);
      const body = await res.json();

      if (res.status === 403 && body.error === "consent_required") {
        setView("consent_required");
        return;
      }
      if (!res.ok) {
        setErrorMessage(body.message ?? "Falha ao carregar a Análise Preditiva de Desempenho.");
        setView("error");
        return;
      }

      setRisk(body as RiskResponse);
      setView("ready");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Falha ao carregar a Análise Preditiva de Desempenho.");
      setView("error");
    }
  }, []);

  useEffect(() => {
    if (!user || userLoading) return;
    loadRisk(user.id);
  }, [user, userLoading, loadRisk]);

  async function handleAcceptConsent() {
    if (!user) return;
    setAccepting(true);
    try {
      const res = await fetch("/api/v1/resident/consent", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Falha ao registrar consentimento.");
      }
      toast.success("Consentimento registrado.");
      await loadRisk(user.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao registrar consentimento.");
    } finally {
      setAccepting(false);
    }
  }

  if (userLoading || !user || view === "loading") {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Análise Preditiva de Desempenho</h1>
        </div>

        {view === "error" && (
          <div className="ossohub-card p-8 text-center text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {view === "consent_required" && (
          <div className="ossohub-card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-ossohub-green" />
              <p className="text-sm font-semibold text-ossohub-navy">Antes de continuar — consentimento (LGPD)</p>
            </div>
            <p className="text-sm text-ossohub-slate mb-3">
              Esta análise usa seus dados de engajamento na plataforma — XP, casos e artigos publicados,
              comentários, dias ativos e desempenho no banco de questões — para estimar um risco de queda de
              desempenho e sugerir ações. Os dados são só seus: nenhum preceptor, colega ou administrador tem
              acesso a esta análise além de você mesmo.
            </p>
            <p className="text-sm text-ossohub-slate mb-5">
              Você pode continuar usando o OssoHub normalmente sem aceitar — isso só libera esta tela
              específica. Ao aceitar, você consente com o uso desses dados para gerar a análise.
            </p>
            <button
              onClick={handleAcceptConsent}
              disabled={accepting}
              className="w-full rounded-xl bg-ossohub-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-ossohub-green-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {accepting && <Loader2 className="h-4 w-4 animate-spin" />}
              Aceitar e ver minha análise
            </button>
          </div>
        )}

        {view === "ready" && risk && (
          <>
            {/* Card de risco */}
            <div className="ossohub-card p-6 mb-5">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${RISK_STYLE[risk.risk_level]}`}>
                  <RiskIcon level={risk.risk_level} /> {RISK_LABEL[risk.risk_level]}
                </span>
                <p className="text-xs text-ossohub-slate">
                  Atualizado em {new Date(risk.last_updated).toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-ossohub-navy">{Math.round(risk.risk_score * 100)}%</p>
                <p className="text-xs text-ossohub-slate mb-1.5">score de risco (0–100%)</p>
              </div>
            </div>

            {/* Gráfico de evolução */}
            {risk.history.length >= 2 && (
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-1">Evolução do engajamento (90 dias)</p>
                <p className="text-xs text-ossohub-slate mb-3">Score de engajamento (0–100) ao longo do tempo.</p>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={risk.history}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v: string) => v.slice(5)} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} width={30} />
                      <Tooltip
                        formatter={(value: number) => `${value}`}
                        labelFormatter={(label: string) => `Dia ${label}`}
                      />
                      <Line type="monotone" dataKey="engagement_score" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} name="Engajamento" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Por que esse risco? */}
            <div className="ossohub-card p-5 mb-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-ossohub-green" /> Por que esse risco?
              </p>
              <ul className="space-y-2">
                {risk.top_reasons.map((reason, i) => (
                  <li key={i} className="text-sm text-ossohub-slate flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ossohub-green shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recomendações */}
            <div className="ossohub-card p-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-ossohub-green" /> O que fazer a seguir
              </p>
              <ul className="space-y-2">
                {risk.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-ossohub-slate flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ossohub-green shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
