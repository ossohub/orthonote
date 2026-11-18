import type { Metadata } from "next";
import { Suspense } from "react";
import { MEDIDAS, FONTE_RX } from "@/data/radiologia";
import { MensuracaoClient } from "./MensuracaoClient";

export const metadata: Metadata = { title: "Mensuração Radiográfica" };

export default function MensuracaoHub() {
  const ped = MEDIDAS.filter((m) => m.ped).length;
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: "radial-gradient(600px 220px at 85% 0%, rgba(56,213,224,0.16), transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">RX</span>
          <span className="oh-eyebrow">{MEDIDAS.length} itens · {ped} pediátricos</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Mensuração Radiográfica</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">
          Linhas, ângulos, índices e critérios por região anatômica — com valores normais e alterados, como medir,
          desvio aceitável de fraturas e referências de implantes.
        </p>
      </header>
      <Suspense fallback={null}>
        <MensuracaoClient />
      </Suspense>
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Base: {FONTE_RX} Valores de
        referência variam entre autores — confirme na fonte quando a decisão depender do limite exato.
      </p>
    </div>
  );
}
