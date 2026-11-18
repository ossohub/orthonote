"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X, ArrowUpRight, ChevronRight, Image as ImageIcon, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROCEDIMENTOS, POR_SECAO, SECOES_CIR, secaoInfo, type Procedimento, type SecaoCir } from "@/data/cirurgia";

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function alvoBusca(p: Procedimento) {
  return semAcento([
    p.titulo, p.original, p.resumo, p.autores, `cap ${p.cap}`, ...(p.tags ?? []),
    ...p.indicacoes, ...p.contraindicacoes, ...p.material,
    ...p.etapas.flatMap((e) => [e.t, ...e.passos]), ...p.perolas, ...p.evitar,
  ].join(" "));
}

const nFiguras = (p: Procedimento) => new Set(p.etapas.flatMap((e) => e.figs ?? [])).size;

export function CartaoProcedimento({ p, mostrarSecao }: { p: Procedimento; mostrarSecao?: boolean }) {
  const figs = nFiguras(p);
  return (
    <li>
      <Link href={`/procedimentos/${p.secao}/${p.id}`}
        className="group flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--film-2)] px-3.5 py-3 transition-colors hover:border-[#38D5E0]/40">
        <span className="oh-mono mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#38D5E0]/10 text-[12px] font-semibold text-[#7FE7EE]">
          {p.cap}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-white">{p.titulo}</span>
          <span className="oh-mono mt-0.5 block text-[11.5px] text-[#8C9AB0]">
            {mostrarSecao ? `${secaoInfo(p.secao)?.curto} · ` : ""}{p.original}
          </span>
          <span className="mt-1 block text-[13.5px] leading-snug text-[#C9D3E1]">{p.resumo}</span>
          <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-[#8C9AB0]">
            <span className="inline-flex items-center gap-1"><ListOrdered className="h-3.5 w-3.5" /> {p.etapas.length} etapas</span>
            {figs > 0 && <span className="inline-flex items-center gap-1"><ImageIcon className="h-3.5 w-3.5" /> {figs} figuras</span>}
            <span>pp. {p.paginas}</span>
          </span>
        </span>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#8C9AB0] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}

export function ProcedimentosClient({ secao }: { secao?: SecaoCir }) {
  const [busca, setBusca] = useState("");
  const q = semAcento(busca.trim());
  const base = secao && !q ? POR_SECAO[secao] : PROCEDIMENTOS;
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
            placeholder={secao ? "Buscar em todos os procedimentos (ex.: LCA, haste, banda de tensão)…" : "Buscar procedimento, técnica ou implante…"}
            className="oh-bare w-full min-w-0 py-2.5 text-[15px] text-white outline-none" />
          {busca && (
            <button type="button" onClick={() => setBusca("")} aria-label="Limpar busca" className="text-[#8C9AB0] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
      </div>

      {mostrarGrade ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SECOES_CIR.map((s) => (
            <li key={s.id}>
              <Link href={`/procedimentos/${s.id}`} className="group oh-hub-card h-full">
                <div className="flex items-center justify-between">
                  <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">{s.curto}</span>
                  <span className="oh-mono text-[11px] text-[#8C9AB0]">{POR_SECAO[s.id].length} técnicas</span>
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
            {lista.length} {lista.length === 1 ? "procedimento" : "procedimentos"}{q && secao ? " em todas as regiões" : ""}
          </p>
          {lista.length === 0 && <p className="py-10 text-center text-[14px] text-[#A3B1C6]">Nada encontrado.</p>}
          <ul className="space-y-2">
            {lista.map((p) => <CartaoProcedimento key={p.id} p={p} mostrarSecao={!secao || !!q} />)}
          </ul>
        </>
      )}
    </div>
  );
}
