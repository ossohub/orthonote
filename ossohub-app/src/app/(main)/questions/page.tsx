"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ClipboardList, Trophy, Plus, PlayCircle, Target, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { startQuestionTest } from "@/lib/questions";
import { QUESTION_AREAS } from "@/lib/types";
import type { QuestionStats } from "@/lib/types";

const NUM_OPTIONS = [5, 10, 20, 30, 50];

export default function QuestionsHubPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();

  const [area, setArea] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [starting, setStarting] = useState(false);
  const [stats, setStats] = useState<QuestionStats | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const [{ data: myStats }, { count }] = await Promise.all([
        supabase.from("question_stats").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("questions").select("*", { count: "exact", head: true }).eq("is_active", true),
      ]);
      setStats(myStats as QuestionStats | null);
      setTotalQuestions(count ?? 0);
    }
    loadData();
  }, [user, supabase]);

  async function handleStart() {
    setStarting(true);
    try {
      const testId = await startQuestionTest(area || null, numQuestions);
      router.push(`/questions/test/${testId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao iniciar o teste");
    } finally {
      setStarting(false);
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  const accuracy =
    stats && stats.total_answered > 0 ? Math.round((stats.total_correct / stats.total_answered) * 100) : null;

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-ossohub-green" />
            <h1 className="text-2xl font-bold text-ossohub-navy">Banco de Questões</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/questions/ranking"><Trophy className="h-4 w-4" /> Ranking</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/questions/new"><Plus className="h-4 w-4" /> Criar questão</Link>
            </Button>
          </div>
        </div>

        {/* Minhas estatísticas */}
        <div className="ossohub-card p-5 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-ossohub-navy">{stats?.total_answered ?? 0}</p>
            <p className="text-xs text-ossohub-slate">Respondidas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">{stats?.total_correct ?? 0}</p>
            <p className="text-xs text-ossohub-slate">Acertos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-500">{stats?.total_wrong ?? 0}</p>
            <p className="text-xs text-ossohub-slate">Erros</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-ossohub-navy">{accuracy !== null ? `${accuracy}%` : "—"}</p>
            <p className="text-xs text-ossohub-slate">Aproveitamento</p>
          </div>
        </div>

        {/* Iniciar teste */}
        <div className="ossohub-card p-5 mb-5">
          <p className="text-sm font-semibold text-ossohub-navy mb-1 flex items-center gap-2">
            <Target className="h-4 w-4 text-ossohub-green" /> Montar um teste
          </p>
          <p className="text-xs text-ossohub-slate mb-4">
            {totalQuestions !== null ? `${totalQuestions} questões ativas no banco` : "Carregando..."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-ossohub-slate mb-1">Área / Tema</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              >
                <option value="">Todas as áreas</option>
                {QUESTION_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ossohub-slate mb-1">Número de questões</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              >
                {NUM_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n} questões</option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={handleStart} disabled={starting} size="lg" className="w-full">
            {starting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sorteando questões...</>
            ) : (
              <><PlayCircle className="h-4 w-4" /> Iniciar teste</>
            )}
          </Button>
        </div>

        {/* Áreas disponíveis */}
        <div className="ossohub-card p-5">
          <p className="text-sm font-semibold text-ossohub-navy mb-3">Áreas</p>
          <div className="flex flex-wrap gap-2">
            {QUESTION_AREAS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setArea(a)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  area === a
                    ? "border-ossohub-green bg-ossohub-green text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-ossohub-slate">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          Sua pontuação é calculada e validada pelo servidor — não é possível fraudar o ranking.
        </div>
      </div>
    </div>
  );
}
