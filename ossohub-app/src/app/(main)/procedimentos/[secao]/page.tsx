import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECOES_CIR, POR_SECAO, FONTE_CIR, type SecaoCir } from "@/data/cirurgia";
import { cn } from "@/lib/utils";
import { ProcedimentosClient } from "../ProcedimentosClient";

export function generateStaticParams() {
  return SECOES_CIR.map((s) => ({ secao: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secao: string }> }): Promise<Metadata> {
  const { secao } = await params;
  const s = SECOES_CIR.find((x) => x.id === secao);
  return { title: s ? `${s.titulo} — Procedimentos Cirúrgicos` : "Procedimentos Cirúrgicos" };
}

export default async function ProcedimentosSecao({ params }: { params: Promise<{ secao: string }> }) {
  const { secao } = await params;
  const atual = SECOES_CIR.find((x) => x.id === secao);
  if (!atual) notFound();
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-5xl">
      <header className="mb-4">
        <Link href="/procedimentos" className="oh-eyebrow">Procedimentos Cirúrgicos</Link>
        <h1 className="mt-2 text-3xl font-bold text-white">{atual.titulo}</h1>
        <p className="mt-1 text-[14px] text-[#A3B1C6]">{atual.desc} · {POR_SECAO[atual.id].length} técnicas</p>
      </header>
      <nav className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Regiões">
        {SECOES_CIR.map((s) => (
          <Link key={s.id} href={`/procedimentos/${s.id}`} aria-current={s.id === secao ? "page" : undefined}
            className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-[13px] font-semibold",
              s.id === secao ? "border-[#38D5E0]/45 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#A3B1C6] hover:text-white")}>
            {s.curto}
          </Link>
        ))}
      </nav>
      <ProcedimentosClient secao={atual.id as SecaoCir} />
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Base: {FONTE_CIR}
      </p>
    </div>
  );
}
