"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X, ArrowUpRight, ChevronRight, ListOrdered } from "lucide-react";
import {
  INFILTRACOES, INJ_POR_SECAO, SECOES_INJ, GUIA_INJ, secaoInjInfo, type Infiltracao, type SecaoInj,
} from "@/data/infiltracoes";

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function alvoBusca(p: Infiltracao) {
  return semAcento([
    p.titulo, p.resumo, GUIA_INJ[p.guia].rotulo, secaoInjInfo(p.secao)?.titulo ?? "", ...(p.tags ?? []),
    ...p.indicacoes, ...(p.contraindicacoes ?? []), ...(p.material ?? []), ...(p.medicacao ?? []),
    ...p.etapas.flatMap((e) => [e.t, ...e.passos]), ...(p.perolas ?? []),
  ].join(" "));
}

export function SeloGuia({ guia }: { guia: Infiltracao["guia"] }) {
  const g = GUIA_INJ[guia];
  return (
    <span className="oh-mono inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold"
      style={{ color: g.cor, borderColor: `${g.cor}55`, background: `${g.cor}14` }}>
      {g.rotulo}
    </span>
  );
}

export function CartaoInfiltracao({ p, mostrarSecao }: { p: Infiltracao; mostrarSecao?: boolean }) {
  return (
    <li>
      <Link href={`/infiltracoes/${p.secao}/${p.id}`}
        className="group flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--film-2)] px-3.5 py-3 transition-colors hover:border-[#38D5E0]/40">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-white">{p.titulo}</span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            <SeloGuia guia={p.guia} />
            {mostrarSecao && <span className="oh-mono text-[11px] text-[#8C9AB0]">{secaoInjInfo(p.secao)?.curto}</span>}
          </span>
          <span className="mt-1.5 block text-[13.5px] leading-snug text-[#C9D3E1]">{p.resumo}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-[11.5px] text-[#8C9AB0]">
            <ListOrdered className="h-3.5 w-3.5" /> {p.etapas.length} {p.etapas.length === 1 ? "etapa" : "etapas"}
          </span>
        </span>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#8C9AB0] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}

export function InfiltracoesClient({ secao }: { secao?: SecaoInj }) {
  const [busca, setBusca] = useState("");
  const q = semAcento(busca.trim());
  const base = secao && !q ? INJ_POR_SECAO[secao] : INFILTRACOES;
  const lista = useMemo(() => {
    if (!q) return base;
    return base.filter((p) => {
      const alvo = alvoBusca(p);
      return q.split(/\s+/).every((t) => alvo.includes(t));
    });
  }, [base, q]);
  const mostrarGrade = !secao && !q;

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-1 mb-4 bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur">
        <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--film-3)] px-3 focus-within:border-[#38D5E0]">
          <Search className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)}
            placeholder={secao ? "Buscar em todas (ex.: De Quervain, PRP, caudal)…" : "Buscar infiltração, droga ou estrutura…"}
            className="oh-bare w-full min-w-0 py-2.5 text-[15px] text-white outline-none" />
          {busca && (
            <button type="button" onClick={() => setBusca("")} aria-label="Limpar busca" className="text-[#8C9AB0] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
      </div>

      {mostrarGrade ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SECOES_INJ.map((s) => (
            <li key={s.id}>
              <Link href={`/infiltracoes/${s.id}`} className="group oh-hub-card h-full">
                <div className="flex items-center justify-between">
                  <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">{s.curto}</span>
                  <span className="oh-mono text-[11px] text-[#8C9AB0]">{INJ_POR_SECAO[s.id].length} {INJ_POR_SECAO[s.id].length === 1 ? "tópico" : "tópicos"}</span>
                </div>
                <div>
                  <h2 className="flex items-center gap-1.5 text-base font-semibold text-white">
                    {s.titulo}
                    <ArrowUpRight className="h-4 w-4 text-[#8C9AB0] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#A3B1C6]">{s.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="mb-3 text-[12.5px] text-[#8C9AB0]">
            {lista.length} {lista.length === 1 ? "resultado" : "resultados"}{q && secao ? " em todas as regiões" : ""}
          </p>
          {lista.length === 0 && <p className="py-10 text-center text-[14px] text-[#A3B1C6]">Nada encontrado.</p>}
          <ul className="space-y-2">
            {lista.map((p) => <CartaoInfiltracao key={p.id} p={p} mostrarSecao={!secao || !!q} />)}
          </ul>
        </>
      )}
    </div>
  );
}
