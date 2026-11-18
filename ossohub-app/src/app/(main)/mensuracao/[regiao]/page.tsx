import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { REGIOES_RX, FONTE_RX, MEDIDAS_POR_REGIAO, type RegiaoRx } from "@/data/radiologia";
import { cn } from "@/lib/utils";
import { MensuracaoClient } from "../MensuracaoClient";

export function generateStaticParams() {
  return REGIOES_RX.map((r) => ({ regiao: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ regiao: string }> }): Promise<Metadata> {
  const { regiao } = await params;
  const r = REGIOES_RX.find((x) => x.id === regiao);
  return { title: r ? `${r.titulo} — Mensuração Radiográfica` : "Mensuração Radiográfica" };
}

export default async function MensuracaoRegiao({ params }: { params: Promise<{ regiao: string }> }) {
  const { regiao } = await params;
  const atual = REGIOES_RX.find((x) => x.id === regiao);
  if (!atual) notFound();
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-5xl">
      <header className="mb-4">
        <Link href="/mensuracao" className="oh-eyebrow">Mensuração Radiográfica</Link>
        <h1 className="mt-2 text-3xl font-bold text-white">{atual.titulo}</h1>
        <p className="mt-1 text-[14px] text-[#A3B1C6]">{atual.desc} · {MEDIDAS_POR_REGIAO[atual.id].length} itens</p>
      </header>
      <nav className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Regiões anatômicas">
        {REGIOES_RX.map((r) => (
          <Link key={r.id} href={`/mensuracao/${r.id}`} aria-current={r.id === regiao ? "page" : undefined}
            className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-[13px] font-semibold",
              r.id === regiao ? "border-[#38D5E0]/45 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#A3B1C6] hover:text-white")}>
            {r.curto}
          </Link>
        ))}
      </nav>
      <Suspense fallback={null}>
        <MensuracaoClient regiao={atual.id as RegiaoRx} />
      </Suspense>
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Base: {FONTE_RX} Valores de
        referência variam entre autores — confirme na fonte quando a decisão depender do limite exato.
      </p>
    </div>
  );
}
