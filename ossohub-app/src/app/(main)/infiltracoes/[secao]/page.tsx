import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECOES_INJ, INJ_POR_SECAO, type SecaoInj } from "@/data/infiltracoes";
import { cn } from "@/lib/utils";
import { InfiltracoesClient } from "../InfiltracoesClient";

export function generateStaticParams() {
  return SECOES_INJ.map((s) => ({ secao: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secao: string }> }): Promise<Metadata> {
  const { secao } = await params;
  const s = SECOES_INJ.find((x) => x.id === secao);
  return { title: s ? `${s.titulo} — Infiltrações` : "Infiltrações" };
}

export default async function InfiltracoesSecao({ params }: { params: Promise<{ secao: string }> }) {
  const { secao } = await params;
  const atual = SECOES_INJ.find((x) => x.id === secao);
  if (!atual) notFound();
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-5xl">
      <header className="mb-4">
        <Link href="/infiltracoes" className="oh-eyebrow">Infiltrações</Link>
        <h1 className="mt-2 text-3xl font-bold text-white">{atual.titulo}</h1>
        <p className="mt-1 text-[14px] text-[#A3B1C6]">{atual.desc} · {INJ_POR_SECAO[atual.id].length} tópicos</p>
      </header>
      <nav className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Seções">
        {SECOES_INJ.map((s) => (
          <Link key={s.id} href={`/infiltracoes/${s.id}`} aria-current={s.id === secao ? "page" : undefined}
            className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-[13px] font-semibold",
              s.id === secao ? "border-[#38D5E0]/45 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#A3B1C6] hover:text-white")}>
            {s.curto}
          </Link>
        ))}
      </nav>
      <InfiltracoesClient secao={atual.id as SecaoInj} />
    </div>
  );
}
