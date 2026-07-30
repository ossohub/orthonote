"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RESIDENCY_YEARS } from "@/lib/types";

interface TeamOption { id: string; name: string; }

export function RankingFilters({ teams }: { teams: TeamOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`/questions/ranking?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <select
        defaultValue={searchParams.get("team") ?? ""}
        onChange={(e) => setParam("team", e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green-dark"
      >
        <option value="">Todas as equipes</option>
        {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <select
        defaultValue={searchParams.get("year") ?? ""}
        onChange={(e) => setParam("year", e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green-dark"
      >
        <option value="">Todos os anos de residência</option>
        {RESIDENCY_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}
