import Link from "next/link";
import { ArrowLeft, Trophy, Medal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getInitials } from "@/lib/utils";
import { RankingFilters } from "./RankingFilters";
import type { Profile, QuestionStats } from "@/lib/types";

type RankRow = QuestionStats & { profile: Profile };

interface Props { searchParams: Promise<{ team?: string; year?: string }> }

export default async function QuestionRankingPage({ searchParams }: Props) {
  const { team: teamFilter, year: yearFilter } = await searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Equipes do usuário (como preceptor ou residente ativo) — populam o filtro
  const teamOptions: { id: string; name: string }[] = [];
  if (user) {
    const [{ data: preceptorTeams }, { data: myMemberships }] = await Promise.all([
      supabase.from("teams").select("id, name").eq("preceptor_id", user.id),
      supabase.from("team_members").select("team:teams(id, name)").eq("resident_id", user.id).eq("status", "active"),
    ]);
    for (const t of preceptorTeams ?? []) teamOptions.push({ id: t.id, name: t.name });
    for (const m of (myMemberships ?? []) as unknown as { team: { id: string; name: string } | null }[]) {
      if (m.team && !teamOptions.some((t) => t.id === m.team!.id)) teamOptions.push({ id: m.team.id, name: m.team.name });
    }
  }

  // Se filtrando por equipe, restringe aos residentes ativos dessa equipe
  let residentIds: string[] | null = null;
  if (teamFilter) {
    const { data: members } = await supabase
      .from("team_members")
      .select("resident_id")
      .eq("team_id", teamFilter)
      .eq("status", "active");
    residentIds = (members ?? []).map((m) => m.resident_id);
  }

  let query = supabase
    .from("question_stats")
    .select(
      yearFilter
        ? "*, profile:profiles!question_stats_user_id_fkey!inner(*)"
        : "*, profile:profiles!question_stats_user_id_fkey(*)"
    )
    .order("total_correct", { ascending: false })
    .limit(100);

  if (yearFilter) query = query.eq("profile.residency_year", yearFilter);
  if (residentIds) {
    query = residentIds.length > 0 ? query.in("user_id", residentIds) : query.in("user_id", ["00000000-0000-0000-0000-000000000000"]);
  }

  const { data: rows } = await query;

  const ranking = (rows ?? []) as unknown as RankRow[];

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-2xl">
        <Link href="/questions"
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Banco de Questões
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Ranking do Banco de Questões</h1>
        </div>

        {teamOptions.length > 0 && <RankingFilters teams={teamOptions} />}

        {ranking.length === 0 ? (
          <div className="ossohub-card p-8 text-center">
            <p className="text-sm text-ossohub-slate">
              Ninguém respondeu questões ainda nesse filtro. Tente ajustar os filtros acima.
            </p>
          </div>
        ) : (
          <div className="ossohub-card overflow-hidden">
            {ranking.map((row, index) => {
              const accuracy = row.total_answered > 0 ? Math.round((row.total_correct / row.total_answered) * 100) : 0;
              const isMe = user?.id === row.user_id;
              const position = index + 1;

              return (
                <Link
                  key={row.user_id}
                  href={`/profile/${row.user_id}`}
                  className={`flex items-center gap-4 px-5 py-3.5 border-b border-slate-100 last:border-b-0 transition-colors hover:bg-slate-50 ${
                    isMe ? "bg-emerald-50/60" : ""
                  }`}
                >
                  <div className="w-8 text-center shrink-0">
                    {position <= 3 ? (
                      <Medal className={`h-5 w-5 mx-auto ${
                        position === 1 ? "text-amber-500" : position === 2 ? "text-slate-400" : "text-amber-700"
                      }`} />
                    ) : (
                      <span className="text-sm font-semibold text-ossohub-slate">{position}º</span>
                    )}
                  </div>

                  <div className="h-9 w-9 shrink-0 rounded-full bg-ossohub-navy text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
                    {row.profile?.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={row.profile.photo_url} alt={row.profile.full_name} className="h-full w-full object-cover" />
                    ) : (
                      getInitials(row.profile?.full_name ?? "U")
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ossohub-navy truncate">
                      {row.profile?.full_name ?? "Usuário"} {isMe && <span className="text-xs text-ossohub-green font-normal">(você)</span>}
                      {row.profile?.residency_year && (
                        <span className="ml-1.5 text-[10px] rounded-full border border-slate-200 px-1.5 py-0.5 text-ossohub-slate font-normal">
                          {row.profile.residency_year}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ossohub-slate truncate">{row.profile?.city_state ?? ""}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-600">{row.total_correct} acertos</p>
                    <p className="text-xs text-ossohub-slate">{row.total_answered} respondidas · {accuracy}%</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
