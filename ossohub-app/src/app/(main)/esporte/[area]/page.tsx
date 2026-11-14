import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AREAS_ESP, type AreaEsp } from "@/data/esporte";
import { cn } from "@/lib/utils";
import { EsporteClient } from "../EsporteClient";
import { CalcEsporte } from "../CalcEsporte";

type Aba = AreaEsp | "calculadoras";
const ABAS: { id: Aba; titulo: string }[] = [...AREAS_ESP.map((a) => ({ id: a.id as Aba, titulo: a.titulo })), { id: "calculadoras", titulo: "Calculadoras" }];

export function generateStaticParams() {
  return ABAS.map((a) => ({ area: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const a = ABAS.find((x) => x.id === area);
  return { title: a ? `${a.titulo} — Medicina Esportiva` : "Medicina Esportiva" };
}

export default async function EsporteArea({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const atual = ABAS.find((x) => x.id === area);
  if (!atual) notFound();
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8">
      <header className="mb-4">
        <Link href="/esporte" className="oh-eyebrow">Medicina Esportiva</Link>
        <h1 className="mt-2 text-3xl font-bold text-white">{atual.titulo}</h1>
      </header>
      <nav className="mb-5 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Áreas da medicina esportiva">
        {ABAS.map((a) => (
          <Link key={a.id} href={`/esporte/${a.id}`} aria-current={a.id === area ? "page" : undefined}
            className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-[13px] font-semibold",
              a.id === area ? "border-[#10B981]/45 bg-[#10B981]/12 text-[#6EE7B7]" : "border-[var(--line)] text-[#A3B1C6] hover:text-white")}>
            {a.titulo}
          </Link>
        ))}
      </nav>
      {area === "calculadoras" ? (
        <CalcEsporte />
      ) : (
        <Suspense fallback={null}>
          <EsporteClient area={area as AreaEsp} />
        </Suspense>
      )}
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias a partir das referências citadas em cada tema.
        Protocolos são orientativos: progrida por critérios clínicos e individualize para cada atleta.
      </p>
    </div>
  );
}
