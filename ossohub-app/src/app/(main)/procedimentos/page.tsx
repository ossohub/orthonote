import type { Metadata } from "next";
import { PROCEDIMENTOS, SECOES_CIR, FONTE_CIR } from "@/data/cirurgia";
import { ProcedimentosClient } from "./ProcedimentosClient";

export const metadata: Metadata = { title: "Procedimentos Cirúrgicos" };

export default function ProcedimentosHub() {
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: "radial-gradient(600px 220px at 85% 0%, rgba(56,213,224,0.16), transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">CX</span>
          <span className="oh-eyebrow">{PROCEDIMENTOS.length} técnicas · {SECOES_CIR.length} regiões</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Procedimentos Cirúrgicos</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">
          Técnica passo a passo das cirurgias ortopédicas mais comuns — indicações, preparo, posição, etapas,
          pérolas, o que evitar e pós-operatório, com roteiro e modelo de descrição cirúrgica para copiar.
        </p>
      </header>
      <ProcedimentosClient />
      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Base: {FONTE_CIR} As
        ilustrações do livro ficam visíveis só para administradores (direito autoral); para os demais, as figuras
        são citadas pelo número original. A técnica de cada
        serviço e as instruções do fabricante do implante prevalecem.
      </p>
    </div>
  );
}
