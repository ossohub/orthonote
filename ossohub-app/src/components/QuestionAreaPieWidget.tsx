"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, PieChart as PieChartIcon, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAreaBreakdown, type AreaBreakdownItem } from "@/lib/performance";

function colorForAccuracy(accuracy: number | null): string {
  if (accuracy === null) return "#e2e8f0";
  if (accuracy < 50) return "#ef4444";
  if (accuracy < 75) return "#f59e0b";
  return "#10b981";
}

// Widget compacto de acertos/erros por área — usado na aba Estatísticas
// do perfil do residente. Só busca dados do próprio usuário logado
// (userId), no mesmo padrão de leitura usado em /desempenho/graficos.
export function QuestionAreaPieWidget({ userId }: { userId: string }) {
  const [breakdown, setBreakdown] = useState<AreaBreakdownItem[] | null>(null);

  useEffect(() => {
    let active = true;
    getAreaBreakdown(userId)
      .then((data) => { if (active) setBreakdown(data); })
      .catch(() => { if (active) setBreakdown([]); });
    return () => { active = false; };
  }, [userId]);

  if (breakdown === null) {
    return (
      <div className="ossohub-card p-6 flex justify-center col-span-2 sm:col-span-4">
        <Loader2 className="h-5 w-5 animate-spin text-ossohub-green" />
      </div>
    );
  }

  const answered = breakdown.filter((a) => a.total > 0);
  if (answered.length === 0) {
    return (
      <div className="ossohub-card p-6 text-center col-span-2 sm:col-span-4">
        <p className="text-sm text-ossohub-slate">
          Responda questões no <Link href="/questions" className="text-ossohub-green font-medium hover:underline">Banco de Questões</Link> para ver seu desempenho por área aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="ossohub-card p-5 col-span-2 sm:col-span-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-ossohub-navy flex items-center gap-2">
          <PieChartIcon className="h-4 w-4 text-ossohub-green" /> Desempenho por área
        </p>
        <Link href="/desempenho/graficos" className="text-xs text-ossohub-green font-medium hover:underline flex items-center gap-1">
          Ver detalhes e projeção <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={answered} dataKey="total" nameKey="area" cx="50%" cy="50%" outerRadius={90}
              label={(entry) => `${entry.area} (${entry.accuracy}%)`}>
              {answered.map((entry) => (
                <Cell key={entry.area} fill={colorForAccuracy(entry.accuracy)} />
              ))}
            </Pie>
            <Tooltip
              formatter={(_value, _name, item) => {
                const p = item.payload as AreaBreakdownItem;
                return [`${p.correct} acertos · ${p.wrong} erros (${p.accuracy}%)`, p.area];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
