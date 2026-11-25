import type { Metadata } from "next";
import { INFILTRACOES, SECOES_INJ } from "@/data/infiltracoes";
import { InfiltracoesClient } from "./InfiltracoesClient";

export const metadata: Metadata = { title: "Infiltrações e Procedimentos Minimamente Invasivos" };

export default function InfiltracoesHub() {
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: "radial-gradient(600px 220px at 85% 0%, rgba(56,213,224,0.16), transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">INF</span>
          <span className="oh-eyebrow">{INFILTRACOES.length} tópicos · {SECOES_INJ.length} seções</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Infiltrações e Procedimentos Minimamente Invasivos</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">
          Resumos práticos para o dia a dia: indicação, material, droga e dose, posição, técnica passo a passo,
          cuidados e pérolas — das articulações periféricas à coluna guiada por imagem e às terapias regenerativas.
        </p>
      </header>
      <InfiltracoesClient />
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias a partir da literatura citada em cada
        tópico. Doses são referências para adultos de porte médio — ajuste ao paciente e siga as bulas e a regulamentação
        vigentes. As figuras dos livros aparecem só para administradores (direito autoral).
      </p>
    </div>
  );
}
