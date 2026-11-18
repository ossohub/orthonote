"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search, ArrowLeft, Copy, Check, AlertTriangle, Stethoscope, Baby, Calculator, Siren, ChevronRight, BookMarked,
  Scale, CheckCircle2, PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ADULTO, PEDIATRIA, FONTES, NOVOS_PS_IDS, calcularDose, SISTEMAS, type Area, type Bloco, type Condicao, type NotaPS,
} from "@/data/ps";
import { Calculadoras } from "./Calculadoras";

export type Aba = Area | "calculadoras";

const ABAS: { v: Aba; l: string; icon: React.ElementType }[] = [
  { v: "adulto", l: "Adulto", icon: Stethoscope },
  { v: "pediatria", l: "Pediatria", icon: Baby },
  { v: "calculadoras", l: "Calculadoras", icon: Calculator },
];

const TIPO: Record<NotaPS["tipo"], { l: string; cls: string; Icon: React.ElementType }> = {
  concorda:   { l: "Concorda",   cls: "border-[#10B981]/35 bg-[#10B981]/[0.07] text-[#6EE7B7]", Icon: CheckCircle2 },
  diverge:    { l: "Diverge",    cls: "border-amber-400/40 bg-amber-400/[0.08] text-amber-200",   Icon: AlertTriangle },
  acrescenta: { l: "Acrescenta", cls: "border-[#38D5E0]/35 bg-[#38D5E0]/[0.07] text-[#7FE7EE]",  Icon: PlusCircle },
};

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function lerPeso(chave: string) {
  try { return localStorage.getItem(chave) ?? ""; } catch { return ""; }
}
function gravarPeso(chave: string, v: string) {
  try { localStorage.setItem(chave, v); } catch { /* ok */ }
}

/** Texto da prescrição pronto para colar no prontuário. */
function textoBloco(c: Condicao, b: Bloco, peso: number) {
  const linhas = b.itens.map((it, i) => {
    const r = it.k && peso > 0 ? calcularDose(it.k, peso) : null;
    const calc = r ? ` [${peso} kg: ${r.dose}${r.volume ? ` = ${r.volume}` : ""}]` : "";
    return `${i + 1}. ${it.m} — ${it.p}${calc}`;
  });
  return `${c.titulo} — ${b.t}\n${linhas.join("\n")}`;
}

function BotaoCopiar({ texto }: { texto: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(texto); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* sem permissão */ }
      }}
      className={cn("inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors",
        ok ? "border-[#10B981]/50 bg-[#10B981]/10 text-[#6EE7B7]" : "border-[var(--line)] text-[#C9D3E1] hover:text-white hover:border-white/20")}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? "Copiado" : "Copiar"}
    </button>
  );
}

function Detalhe({ c, peso, onVoltar }: { c: Condicao; peso: number; onVoltar: () => void }) {
  return (
    <article className="pb-10">
      <button onClick={onVoltar} className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#7FE7EE] lg:hidden">
        <ArrowLeft className="h-4 w-4" /> Voltar à lista
      </button>

      <header className="mb-5">
        <span className="oh-mono text-[11px] uppercase tracking-[0.14em] text-[#8C9AB0]">{c.sistema}</span>
        <h2 className="mt-1 text-2xl sm:text-[28px] font-bold leading-tight text-white">{c.titulo}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#C9D3E1]">{c.resumo}</p>
      </header>

      <section className="mb-5">
        <h3 className="oh-eyebrow mb-3">Manejo</h3>
        <ol className="space-y-2">
          {c.manejo.map((m, i) => (
            <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-[#DCE3EE]">
              <span className="oh-mono mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-white/[0.06] text-[11px] text-[#A3B1C6]">{i + 1}</span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
      </section>

      {c.alarme && c.alarme.length > 0 && (
        <section className="mb-5 rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-amber-200">
            <AlertTriangle className="h-4 w-4" /> Atenção
          </h3>
          <ul className="space-y-1.5 text-[14px] leading-relaxed text-amber-50">
            {c.alarme.map((a, i) => <li key={i}>• {a}</li>)}
          </ul>
        </section>
      )}

      <section>
        <h3 className="oh-eyebrow mb-3">Prescrição</h3>
        <div className="space-y-4">
          {c.rx.map((b) => (
            <div key={b.t} className="ossohub-card overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-2.5">
                <h4 className="text-[13px] font-semibold uppercase tracking-wide text-[#EADFC8]">{b.t}</h4>
                <BotaoCopiar texto={textoBloco(c, b, peso)} />
              </div>
              <ol className="divide-y divide-[var(--line)]">
                {b.itens.map((it, i) => {
                  const r = it.k && peso > 0 ? calcularDose(it.k, peso) : null;
                  return (
                    <li key={i} className="px-4 py-3">
                      <p className="text-[14.5px] font-semibold text-white">
                        <span className="oh-mono mr-1.5 text-[#8C9AB0]">{i + 1}.</span>{it.m}
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed text-[#C9D3E1]">{it.p}</p>
                      {r && (
                        <p className="mt-2 inline-flex flex-wrap items-center gap-x-2 rounded-lg border border-[#38D5E0]/30 bg-[#38D5E0]/[0.08] px-2.5 py-1.5 text-[13px]">
                          <span className="text-[#A3B1C6]">{peso} kg →</span>
                          <span className="oh-mono font-bold text-[#7FE7EE]">{r.dose}</span>
                          {r.volume && <span className="oh-mono font-bold text-[#7FE7EE]">= {r.volume}</span>}
                          {r.teto && <span className="text-[12px] text-amber-200">(dose máxima)</span>}
                        </p>
                      )}
                      {it.k && !(peso > 0) && (
                        <p className="mt-1.5 text-[12px] text-[#8C9AB0]">Informe o peso no topo para calcular a dose.</p>
                      )}
                      {it.o && <p className="mt-1.5 text-[12.5px] leading-relaxed text-amber-100/90">⚠ {it.o}</p>}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {c.notas && c.notas.length > 0 && (
        <section className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--film-1)] p-4">
          <h3 className="mb-1 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#EADFC8]">
            <Scale className="h-4 w-4" /> Comparação entre fontes
          </h3>
          <p className="mb-3 text-[12.5px] text-[#8C9AB0]">Como as referências se posicionam em relação ao conteúdo acima.</p>
          <ul className="space-y-2.5">
            {(["diverge", "acrescenta", "concorda"] as const).flatMap((tipo) =>
              c.notas!.filter((n) => n.tipo === tipo).map((n, i) => {
                const T = TIPO[n.tipo];
                return (
                  <li key={tipo + i} className="text-[14px] leading-relaxed text-[#DCE3EE]">
                    <span className={cn("mr-2 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 align-middle text-[11px] font-semibold", T.cls)}>
                      <T.Icon className="h-3 w-3" /> {T.l}
                    </span>
                    {n.texto}
                    <span className="mt-0.5 block text-[12px] text-[#8C9AB0]">{FONTES[n.fonte]}</span>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      )}

      <footer className="mt-6 flex items-start gap-2 text-[12px] leading-relaxed text-[#8C9AB0]">
        <BookMarked className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>Baseado em: {c.fontes.map((f) => FONTES[f]).join("; ")}. Conferir apresentação disponível, alergias, função renal/hepática e gestação.</span>
      </footer>
    </article>
  );
}

export function PSClient({ aba }: { aba: Aba }) {
  const router = useRouter();
  const params = useSearchParams();
  const selId = params.get("c");

  const [busca, setBusca] = useState("");
  const [sistema, setSistema] = useState<string | null>(null);
  const [pesoTxt, setPesoTxt] = useState("");

  const chavePeso = aba === "pediatria" ? "ossohub.ps.peso.ped" : "ossohub.ps.peso.adulto";
  useEffect(() => { setPesoTxt(lerPeso(chavePeso)); setSistema(null); }, [chavePeso]);
  const peso = parseFloat(pesoTxt.replace(",", ".")) || 0;

  const lista = aba === "pediatria" ? PEDIATRIA : ADULTO;
  const sistemas = useMemo(() => SISTEMAS(lista), [lista]);

  const filtrada = useMemo(() => {
    const q = semAcento(busca.trim());
    return lista.filter((c) => {
      if (sistema && c.sistema !== sistema) return false;
      if (!q) return true;
      const alvo = semAcento([c.titulo, c.sistema, c.resumo, ...(c.tags ?? []), ...c.rx.flatMap((b) => b.itens.map((i) => i.m))].join(" "));
      return q.split(/\s+/).every((p) => alvo.includes(p));
    });
  }, [lista, busca, sistema]);

  const selecionada = selId ? lista.find((c) => c.id === selId) : undefined;

  function ir(next: { aba?: Aba; c?: string | null }) {
    if (next.aba) { router.push(`/pronto-socorro/${next.aba}`); return; }
    const sp = new URLSearchParams(params.toString());
    if (next.c) sp.set("c", next.c); else sp.delete("c");
    const q = sp.toString();
    router.push(`/pronto-socorro/${aba}${q ? `?${q}` : ""}`, { scroll: false });
    if (next.c) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8">
      {/* Cabeçalho */}
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="oh-eyebrow">Pronto-Socorro</span>
          <h1 className="mt-2 flex items-center gap-2.5 text-3xl font-bold text-white">
            <Siren className="h-7 w-7 text-[#FCA5A5]" /> Prescrições do PS
          </h1>
          <p className={cn("mt-1.5 max-w-2xl text-[14px] text-[#A3B1C6]", selecionada && "hidden sm:block")}>
            {ADULTO.length} condutas adultas, {PEDIATRIA.length} pediátricas e calculadoras — manejo, prescrição pronta para copiar e doses pelo peso.
          </p>
        </div>
      </header>

      {/* Abas */}
      <div role="tablist" className="mb-5 grid grid-cols-3 gap-1 rounded-xl border border-[var(--line)] bg-[var(--film-1)] p-1 sm:inline-grid sm:w-auto">
        {ABAS.map(({ v, l, icon: Icon }) => (
          <button key={v} role="tab" aria-selected={aba === v} onClick={() => ir({ aba: v })}
            className={cn("flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-[13.5px] font-semibold transition-colors",
              aba === v ? "bg-[#38D5E0]/12 text-[#7FE7EE] shadow-[inset_0_0_0_1px_rgba(56,213,224,0.35)]" : "text-[#A3B1C6] hover:text-white")}>
            <Icon className="h-4 w-4" /> {l}
          </button>
        ))}
      </div>

      {aba === "calculadoras" ? (
        <Calculadoras />
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(300px,380px)_1fr] lg:gap-6">
          {/* Lista */}
          <div className={cn(selecionada && "hidden lg:block")}>
            <div className="sticky top-16 z-10 -mx-1 mb-3 space-y-2.5 bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur">
              <div className="flex gap-2">
                <label className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--film-3)] px-3 focus-within:border-[#38D5E0]">
                  <Search className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
                  <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar doença ou remédio…"
                    className="oh-bare w-full min-w-0 py-2.5 text-[15px] text-white outline-none" />
                </label>
                <label className={cn("flex w-[112px] shrink-0 items-center rounded-xl border bg-[var(--film-3)] focus-within:border-[#38D5E0]",
                  aba === "pediatria" && !peso ? "border-amber-400/50" : "border-[var(--line)]")}>
                  <input inputMode="decimal" value={pesoTxt} placeholder="Peso"
                    onChange={(e) => { setPesoTxt(e.target.value); gravarPeso(chavePeso, e.target.value); }}
                    aria-label="Peso do paciente em kg"
                    className="oh-bare w-full min-w-0 py-2.5 pl-3 text-[15px] text-white outline-none" />
                  <span className="oh-mono pr-3 text-[12px] text-[#8C9AB0]">kg</span>
                </label>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                {[null, ...sistemas].map((s) => (
                  <button key={s ?? "todos"} onClick={() => setSistema(s)}
                    className={cn("shrink-0 rounded-full border px-3 py-1 text-[12.5px] font-medium",
                      sistema === s ? "border-[#38D5E0]/50 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#C9D3E1]")}>
                    {s ?? "Todos"}
                  </button>
                ))}
              </div>
            </div>

            {aba === "pediatria" && !peso && (
              <p className="mb-3 rounded-lg border border-amber-400/25 bg-amber-400/[0.06] px-3 py-2 text-[12.5px] text-amber-100">
                Informe o peso da criança para ver as doses calculadas em mg, mL e gotas.
              </p>
            )}

            <ul className="space-y-2">
              {filtrada.map((c) => (
                <li key={c.id}>
                  <button onClick={() => ir({ c: c.id })}
                    className={cn("group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
                      selecionada?.id === c.id ? "border-[#38D5E0]/45 bg-[#38D5E0]/[0.07]" : "border-[var(--line)] bg-[var(--film-2)] hover:border-white/15")}>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[14.5px] font-semibold text-white">{c.titulo}</span>
                        {c.notas?.some((n) => n.tipo === "diverge") && (
                          <span className="shrink-0 rounded border border-amber-400/40 px-1 text-[10px] font-semibold text-amber-200">diverge</span>
                        )}
                        {!c.notas?.some((n) => n.tipo === "diverge") && NOVOS_PS_IDS.has(c.id) && (
                          <span className="shrink-0 rounded border border-[#38D5E0]/40 px-1 text-[10px] font-semibold text-[#7FE7EE]">novo</span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-[#A3B1C6]">{c.sistema} · {c.resumo}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0] group-hover:text-white" />
                  </button>
                </li>
              ))}
              {filtrada.length === 0 && <li className="py-8 text-center text-[14px] text-[#A3B1C6]">Nada encontrado.</li>}
            </ul>
          </div>

          {/* Detalhe */}
          <div className={cn(!selecionada && "hidden lg:block")}>
            {selecionada ? (
              <Detalhe c={selecionada} peso={peso} onVoltar={() => ir({ c: null })} />
            ) : (
              <div className="ossohub-card grid min-h-[320px] place-items-center p-8 text-center">
                <div>
                  <Siren className="mx-auto mb-3 h-8 w-8 text-[#8C9AB0]" />
                  <p className="text-[15px] text-[#C9D3E1]">Escolha uma condição na lista.</p>
                  <p className="mt-1 text-[13px] text-[#8C9AB0]">Manejo, sinais de alerta e prescrição pronta para copiar.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Ferramenta de apoio à decisão para médicos. Conteúdo resumido com palavras próprias a partir das referências citadas em cada conduta;
        não substitui o julgamento clínico. Confira dose, via, diluição, alergias, idade mínima, função renal e gestação antes de prescrever.
      </p>
    </div>
  );
}
