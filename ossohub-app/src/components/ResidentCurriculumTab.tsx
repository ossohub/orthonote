"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Star, GraduationCap, Users2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { listEvaluationsForResident, createEvaluation } from "@/lib/evaluations";
import { listMyTeamsAsPreceptor } from "@/lib/teams";
import { formatRelativeDate } from "@/lib/utils";
import type { Profile, ResidentEvaluation, Team } from "@/lib/types";

// "Currículo" do residente — histórico de equipes/avaliações recebidas
// dos preceptores, no estilo de um Lattes simplificado. Se quem está
// vendo o perfil for preceptor de uma equipe onde este residente está
// ativo, aparece também um formulário rápido pra registrar uma avaliação.
export function ResidentCurriculumTab({ profile }: { profile: Profile }) {
  const [evaluations, setEvaluations] = useState<ResidentEvaluation[]>([]);
  const [teamsToEvaluate, setTeamsToEvaluate] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [score, setScore] = useState(8);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [evals, myTeams] = await Promise.all([
        listEvaluationsForResident(profile.id),
        listMyTeamsAsPreceptor(),
      ]);
      setEvaluations(evals);
      const eligible = myTeams.filter((t) => (t.members ?? []).some((m) => m.resident_id === profile.id && m.status === "active"));
      setTeamsToEvaluate(eligible);
      if (eligible.length > 0) setSelectedTeamId((prev) => prev || eligible[0].id);
    } catch {
      // silencioso — currículo é informativo, não crítico
    } finally {
      setLoading(false);
    }
  }, [profile.id]);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit() {
    if (!selectedTeamId) return;
    setSubmitting(true);
    try {
      await createEvaluation(selectedTeamId, profile.id, score, comment);
      toast.success("Avaliação registrada!");
      setComment("");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao registrar avaliação");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-ossohub-green" /></div>;
  }

  const avg = evaluations.length > 0 ? (evaluations.reduce((s, e) => s + e.score, 0) / evaluations.length).toFixed(1) : null;

  return (
    <div className="space-y-4">
      <div className="ossohub-card p-5 flex items-center gap-4">
        <GraduationCap className="h-8 w-8 text-ossohub-green shrink-0" />
        <div>
          <p className="text-sm font-semibold text-ossohub-navy">
            {profile.residency_year ? `Ano de residência: ${profile.residency_year}` : "Ano de residência não informado"}
          </p>
          {avg && (
            <p className="text-xs text-ossohub-slate flex items-center gap-1 mt-0.5">
              <Star className="h-3.5 w-3.5 text-amber-500" /> Média das avaliações: {avg}/10 ({evaluations.length})
            </p>
          )}
        </div>
      </div>

      {teamsToEvaluate.length > 0 && (
        <div className="ossohub-card p-5">
          <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
            <Users2 className="h-4 w-4 text-ossohub-green" /> Avaliar residente
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px] gap-2 mb-2">
            <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ossohub-green">
              {teamsToEvaluate.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <input type="number" min={0} max={10} value={score} onChange={(e) => setScore(Number(e.target.value))}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ossohub-green" />
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2}
            placeholder="Comentário (opcional)"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ossohub-green resize-none mb-2" />
          <Button size="sm" onClick={handleSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrar avaliação"}
          </Button>
        </div>
      )}

      <div className="ossohub-card p-5">
        <p className="text-sm font-semibold text-ossohub-navy mb-3">Avaliações recebidas</p>
        {evaluations.length === 0 ? (
          <p className="text-xs text-ossohub-slate">Nenhuma avaliação registrada ainda.</p>
        ) : (
          <div className="space-y-2">
            {evaluations.map((ev) => (
              <div key={ev.id} className="rounded-lg border border-slate-100 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ossohub-navy">{ev.score}/10 — {ev.team?.name}</span>
                  <span className="text-xs text-ossohub-slate">{formatRelativeDate(ev.created_at)}</span>
                </div>
                {ev.comment && <p className="text-sm text-ossohub-slate mt-1">{ev.comment}</p>}
                <p className="text-xs text-ossohub-slate mt-1">Por {ev.preceptor?.full_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
