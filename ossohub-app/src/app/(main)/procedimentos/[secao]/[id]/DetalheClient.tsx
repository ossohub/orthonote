"use client";

import { useState } from "react";
import { Copy, Check, FileText, ListChecks, RotateCcw, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Procedimento } from "@/data/cirurgia/types";
import { textoRoteiro, textoModeloDescricao } from "@/data/cirurgia/texto";
import type { FiguraComUrl } from "@/lib/procedureImages";
import { useFiguras, BarraAdmin, FaixaFiguras, Visualizador, PainelEdicao } from "./Figuras";

function BotaoCopiar({ texto, rotulo, icone: Icone }: { texto: () => string; rotulo: string; icone: React.ElementType }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(texto()); setOk(true); setTimeout(() => setOk(false), 1800); } catch { /* sem permissão */ }
      }}
      className={cn("inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors",
        ok ? "border-[#10B981]/50 bg-[#10B981]/10 text-[#6EE7B7]" : "border-[var(--line)] text-[#C9D3E1] hover:border-white/20 hover:text-white")}>
      {ok ? <Check className="h-4 w-4" /> : <Icone className="h-4 w-4" />}
      {ok ? "Copiado" : rotulo}
    </button>
  );
}

export function AcoesCopiar({ p }: { p: Procedimento }) {
  return (
    <div className="flex flex-wrap gap-2">
      <BotaoCopiar texto={() => textoRoteiro(p)} rotulo="Copiar roteiro" icone={Copy} />
      <BotaoCopiar texto={() => textoModeloDescricao(p)} rotulo="Copiar modelo de descrição cirúrgica" icone={FileText} />
    </div>
  );
}

/** Etapas da técnica com passos que podem ser marcados (revisão pré-operatória / estudo). */
export function Tecnica({ p }: { p: Procedimento }) {
  const [feitos, setFeitos] = useState<Set<string>>(new Set());
  const f = useFiguras(p);
  const [aberta, setAberta] = useState<string | null>(null);
  const [editar, setEditar] = useState<FiguraComUrl | null>(null);
  const total = p.etapas.reduce((n, e) => n + e.passos.length, 0);
  const alternar = (k: string) => setFeitos((s) => {
    const n = new Set(s);
    if (n.has(k)) n.delete(k); else n.add(k);
    return n;
  });

  return (
    <div>
      <BarraAdmin f={f} />
      <div className="mb-3 flex items-center justify-between gap-3 text-[12.5px]">
        <span className="inline-flex items-center gap-1.5 text-[#8C9AB0]">
          <ListChecks className="h-4 w-4" /> Toque num passo para marcar · {feitos.size}/{total}
        </span>
        {feitos.size > 0 && (
          <button type="button" onClick={() => setFeitos(new Set())} className="inline-flex items-center gap-1 font-medium text-[#7FE7EE] hover:underline">
            <RotateCcw className="h-3.5 w-3.5" /> Limpar
          </button>
        )}
      </div>
      <ol className="relative space-y-5 border-l border-[var(--line)] pl-5 sm:pl-6">
        {p.etapas.map((e, i) => (
          <li key={i} className="relative">
            <span className="oh-mono absolute -left-[33px] top-0 grid h-6 w-6 place-items-center rounded-full border border-[#38D5E0]/40 bg-[var(--film-0)] text-[11px] font-semibold text-[#7FE7EE] sm:-left-[37px]">
              {i + 1}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-[16px] font-semibold leading-snug text-white">{e.t}</h3>
              {e.figs?.map((r) => {
                const fig = f.porRef.get(r);
                return fig ? (
                  <button key={r} type="button" onClick={() => setAberta(fig.id)}
                    className="oh-mono inline-flex items-center gap-1 rounded border border-[#38D5E0]/40 bg-[#38D5E0]/10 px-1.5 text-[11px] text-[#7FE7EE]">
                    <ImageIcon className="h-3 w-3" /> Fig. {r}
                  </button>
                ) : (
                  <span key={r} title="Figura do livro (arquivo de imagens)"
                    className="oh-mono inline-flex items-center gap-1 rounded border border-[#EADFC8]/25 px-1.5 text-[11px] text-[#EADFC8]">
                    <ImageIcon className="h-3 w-3" /> Fig. {r}
                  </span>
                );
              })}
            </div>
            <ul className="mt-2 space-y-1.5">
              {e.passos.map((s, j) => {
                const k = `${i}-${j}`;
                const ok = feitos.has(k);
                return (
                  <li key={k}>
                    <button type="button" onClick={() => alternar(k)} aria-pressed={ok}
                      className={cn("flex w-full gap-2.5 rounded-lg px-2 py-1.5 text-left text-[14.5px] leading-relaxed transition-colors -mx-2",
                        ok ? "text-[#8C9AB0] line-through decoration-[#10B981]/60" : "text-[#DCE3EE] hover:bg-white/[0.03]")}>
                      <span className={cn("mt-[5px] grid h-4 w-4 shrink-0 place-items-center rounded border",
                        ok ? "border-[#10B981] bg-[#10B981]/20 text-[#6EE7B7]" : "border-[var(--line)]")}>
                        {ok && <Check className="h-3 w-3" />}
                      </span>
                      <span>{s}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <FaixaFiguras itens={f.porEtapa[i] ?? []} f={f} abrir={setAberta} etapa={i} procedureId={p.id} onEditar={setEditar} />
          </li>
        ))}
      </ol>
      {(f.outras.length > 0 || f.editando) && (
        <section className="mt-6 border-t border-[var(--line)] pt-4">
          <h3 className="oh-eyebrow">Outras figuras do capítulo</h3>
          <FaixaFiguras itens={f.outras} f={f} abrir={setAberta} etapa={null} procedureId={p.id} onEditar={setEditar} />
        </section>
      )}
      <Visualizador f={f} atual={aberta} setAtual={setAberta} onEditar={setEditar} />
      <PainelEdicao fig={editar ? (f.sequencia.find((x) => x.id === editar.id) ?? editar) : null} p={p} f={f} fechar={() => setEditar(null)}
        aoExcluir={(id) => { if (aberta === id) setAberta(null); }} />
    </div>
  );
}
