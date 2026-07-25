import Link from "next/link";
import { ArrowLeft, Trophy, Medal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getInitials } from "@/lib/utils";
import type { Profile, QuestionStats } from "@/lib/types";

type RankRow = QuestionStats & { profile: Profile };

export default async function QuestionRankingPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: rows } = await supabase
    .from("question_stats")
    .select("*, profile:profiles!question_stats_user_id_fkey(*)")
    .order("total_correct", { ascending: false })
    .limit(100);

  const ranking = (rows ?? []) as unknown as RankRow[];

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-2xl">
        <Link href="/questions"
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Banco de Questões
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <Trophy className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Ranking do Banco de Questões</h1>
        </div>

        {ranking.length === 0 ? (
          <div className="ossohub-card p-8 text-center">
            <p className="text-sm text-ossohub-slate">
              Ninguém respondeu questões ainda. Seja o primeiro a aparecer no ranking!
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
