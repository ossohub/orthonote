import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Activity, Apple, Bone, HeartPulse, Dumbbell, Footprints, Calculator } from "lucide-react";
import { AREAS_ESP, TOPICOS } from "@/data/esporte";

export const metadata: Metadata = { title: "Medicina Esportiva" };

const ICONES = { lesoes: HeartPulse, reabilitacao: Footprints, fisioterapia: Dumbbell, biomecanica: Activity, anatomia: Bone, nutricao: Apple } as const;

export default function EsporteHub() {
  const total = Object.values(TOPICOS).reduce((s, l) => s + l.length, 0);
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: "radial-gradient(600px 220px at 85% 0%, rgba(16,185,129,0.16), transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="oh-marker bg-[#10B981]/15 text-[#6EE7B7]">ME</span>
          <span className="oh-eyebrow">{total} temas · 7 calculadoras</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Medicina Esportiva</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">
          Lesões, reabilitação em fases, fisioterapia e treino, biomecânica, anatomia funcional e nutrição esportiva — com calculadoras para o dia a dia do atleta.
        </p>
      </header>

      <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {AREAS_ESP.map((a) => {
          const Icon = ICONES[a.id];
          return (
            <li key={a.id}>
              <Link href={`/esporte/${a.id}`} className="group oh-hub-card h-full">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#10B981]/15 text-[#6EE7B7]"><Icon className="h-5 w-5" /></span>
                  <span className="oh-mono text-[11px] text-[#8C9AB0]">{TOPICOS[a.id].length} temas</span>
                </div>
                <div>
                  <h2 className="flex items-center gap-1.5 text-base font-semibold text-white">
                    {a.titulo}
                    <ArrowUpRight className="h-4 w-4 text-[#8C9AB0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#A3B1C6]">{a.desc}</p>
                </div>
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/esporte/calculadoras" className="group oh-hub-card h-full">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#38D5E0]/10 text-[#7FE7EE]"><Calculator className="h-5 w-5" /></span>
              <span className="oh-mono text-[11px] text-[#8C9AB0]">7 ferramentas</span>
            </div>
            <div>
              <h2 className="flex items-center gap-1.5 text-base font-semibold text-white">Calculadoras do esporte <ArrowUpRight className="h-4 w-4 text-[#8C9AB0]" /></h2>
              <p className="mt-1 text-sm leading-relaxed text-[#A3B1C6]">Gasto energético, macros, % de gordura, sudorese, 1RM, zonas de FC e carga de treino.</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
