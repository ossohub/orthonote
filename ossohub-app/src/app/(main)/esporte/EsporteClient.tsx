"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowLeft, ChevronRight, BookMarked, Flag, Link2, Dumbbell, Scale, CheckCircle2, AlertTriangle, PlusCircle, Copy, Check, Share2, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOVOS } from "@/data/esporte/revisao";
import { TOPICOS, FONTES_ESP, AREAS_ESP, acharTopico, type AreaEsp, type Topico, type Nota, type Fase } from "@/data/esporte";

const TIPO: Record<Nota["tipo"], { l: string; cls: string; Icon: React.ElementType }> = {
  concorda:   { l: "Concorda",   cls: "border-[#10B981]/35 bg-[#10B981]/[0.07] text-[#6EE7B7]", Icon: CheckCircle2 },
  diverge:    { l: "Diverge",    cls: "border-amber-400/40 bg-amber-400/[0.08] text-amber-200",   Icon: AlertTriangle },
  acrescenta: { l: "Acrescenta", cls: "border-[#38D5E0]/35 bg-[#38D5E0]/[0.07] text-[#7FE7EE]",  Icon: PlusCircle },
};

const NOVOS_IDS = new Set(NOVOS.map((n) => n.id));

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// ── Prescrição de reabilitação pronta para copiar/enviar ao paciente ──
function textoFase(f: Fase, i: number) {
  const linhas = [`FASE ${i + 1} — ${f.nome.replace(/^((Fase|Estágio)\s*)?\d+\s*—\s*/i, "")}${f.tempo ? ` (${f.tempo})` : ""}`];
  if (f.objetivos.length) linhas.push(`Objetivos: ${f.objetivos.join("; ")}.`);
  if (f.exercicios.length) {
    linhas.push("Exercícios:");
    f.exercicios.forEach((e, k) => linhas.push(`  ${k + 1}. ${e}`));
  }
  if (f.criterios.length && f.criterios[0] !== "—") linhas.push(`Avançar para a próxima fase quando: ${f.criterios.join("; ")}.`);
  return linhas.join("\n");
}

// Cabeçalho, rótulo do botão e orientações de cada aba.
const MODELO: Record<AreaEsp, { titulo: string; botao: string; paciente: boolean; dica: string; orient: string[] }> = {
  reabilitacao: {
    titulo: "PRESCRIÇÃO DE REABILITAÇÃO", botao: "Copiar prescrição", paciente: true,
    dica: "Copie o protocolo completo já formatado para o paciente",
    orient: [
      "Dor leve durante o exercício (até 3 de 10) é aceitável se voltar ao normal em até 24 h.",
      "Se a dor piorar no dia seguinte, reduza a carga/repetições na próxima sessão.",
      "Procure atendimento se houver inchaço importante, perda de força súbita, falseio ou dor que não melhora.",
      "Avance de fase somente quando atingir os critérios e com liberação do seu médico/fisioterapeuta.",
    ],
  },
  fisioterapia: {
    titulo: "PRESCRIÇÃO DE EXERCÍCIOS", botao: "Copiar prescrição", paciente: true,
    dica: "Copie as orientações de treino já formatadas para o paciente",
    orient: [
      "Aqueça 5–10 minutos antes e progrida a carga aos poucos.",
      "Interrompa e procure atendimento se houver dor no peito, falta de ar desproporcional, tontura ou dor articular forte.",
      "Respeite pelo menos um dia de intervalo entre treinos intensos do mesmo grupo muscular.",
    ],
  },
  lesoes: {
    titulo: "ORIENTAÇÕES AO PACIENTE", botao: "Copiar orientações", paciente: true,
    dica: "Copie as orientações sobre a lesão já formatadas para o paciente",
    orient: [
      "Siga as orientações de repouso relativo e de carga combinadas na consulta.",
      "Retorne antes do previsto se houver piora da dor, inchaço importante, falseio, dormência ou febre.",
      "Volte ao esporte somente após liberação, cumprindo os critérios de retorno.",
    ],
  },
  nutricao: {
    titulo: "ORIENTAÇÃO NUTRICIONAL", botao: "Copiar orientações", paciente: true,
    dica: "Copie as orientações já formatadas para o paciente",
    orient: [
      "Valores por kg de peso corporal; ajuste com nutricionista conforme objetivo e rotina de treino.",
      "Suplementos: preferir produtos com certificação de terceira parte; atletas federados devem consultar a lista antidoping.",
    ],
  },
  biomecanica: { titulo: "RESUMO — BIOMECÂNICA", botao: "Copiar resumo", paciente: false, dica: "Copie o resumo para seu estudo ou para explicar ao paciente", orient: [] },
  anatomia: { titulo: "RESUMO — ANATOMIA FUNCIONAL", botao: "Copiar resumo", paciente: false, dica: "Copie o resumo para seu estudo ou para explicar ao paciente", orient: [] },
};

function textoPrescricao(t: Topico, fase?: number) {
  const m = MODELO[t.area];
  const hoje = new Date().toLocaleDateString("pt-BR");
  const partes: string[] = [`${m.titulo} — ${t.titulo.toUpperCase()}`];
  if (m.paciente) partes.push(`Paciente: ______________________________   Data: ${hoje}`);
  partes.push("", t.resumo);
  if (t.fases?.length) {
    const lista = fase != null ? [[t.fases[fase], fase] as const] : t.fases.map((f, i) => [f, i] as const);
    for (const [f, i] of lista) partes.push("", textoFase(f, i));
  }
  if (fase == null) {
    for (const s of t.secoes) {
      partes.push("", `${s.t.toUpperCase()}:`);
      s.itens.forEach((x) => partes.push(`• ${x}`));
    }
    if (t.tabela) {
      partes.push("", t.tabela.cab.join(" | "));
      t.tabela.linhas.forEach((l) => partes.push(l.join(" | ")));
    }
  }
  if (m.orient.length) {
    partes.push("", "ORIENTAÇÕES GERAIS:");
    m.orient.forEach((o) => partes.push(`• ${o}`));
  }
  if (m.paciente) partes.push("", "_______________________________", "Médico(a) — CRM");
  return partes.join("\n");
}

function AcoesPrescricao({ texto, rotulo = "Copiar prescrição", compacto = false }: { texto: string; rotulo?: string; compacto?: boolean }) {
  const [ok, setOk] = useState(false);
  const [podeEnviar, setPodeEnviar] = useState(false);
  useEffect(() => { setPodeEnviar(typeof navigator.share === "function"); }, []);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // iPhone antigo / sem permissão: seleciona via campo temporário
      const ta = document.createElement("textarea");
      ta.value = texto; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch { /* ignora */ } ta.remove();
    }
    setOk(true); setTimeout(() => setOk(false), 1800);
  }
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copiar}
        className={cn("inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-colors",
          compacto ? "px-2.5 py-1 text-[12px]" : "px-3.5 py-2 text-[13.5px]",
          ok ? "border-[#10B981]/50 bg-[#10B981]/12 text-[#6EE7B7]" : "border-[#10B981]/40 bg-[#10B981]/[0.08] text-[#6EE7B7] hover:bg-[#10B981]/15")}>
        {ok ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {ok ? "Copiado!" : rotulo}
      </button>
      {podeEnviar && !compacto && (
        <button type="button" onClick={() => navigator.share({ text: texto }).catch(() => {})}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3.5 py-2 text-[13.5px] font-semibold text-[#C9D3E1] hover:text-white">
          <Share2 className="h-4 w-4" /> Enviar
        </button>
      )}
    </div>
  );
}

function Detalhe({ t, onVoltar }: { t: Topico; onVoltar: () => void }) {
  return (
    <article className="pb-10">
      <button onClick={onVoltar} className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#7FE7EE] lg:hidden">
        <ArrowLeft className="h-4 w-4" /> Voltar à lista
      </button>
      <header className="mb-5">
        <span className="oh-mono text-[11px] uppercase tracking-[0.14em] text-[#8C9AB0]">{t.grupo}</span>
        <h2 className="mt-1 text-2xl sm:text-[28px] font-bold leading-tight text-white">{t.titulo}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#C9D3E1]">{t.resumo}</p>
        <div className="mt-4 rounded-xl border border-[#10B981]/25 bg-[#10B981]/[0.05] p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[12.5px] text-[#A3B1C6]">
            <ClipboardList className="h-4 w-4 shrink-0 text-[#6EE7B7]" />
            {MODELO[t.area].dica}{t.fases?.length ? " — ou só a fase atual, no botão de cada fase" : ""}.
          </p>
          <AcoesPrescricao texto={textoPrescricao(t)} rotulo={MODELO[t.area].botao} />
        </div>
      </header>

      {t.secoes.map((s) => (
        <section key={s.t} className="mb-5">
          <h3 className="oh-eyebrow mb-3">{s.t}</h3>
          <ul className="space-y-2">
            {s.itens.map((i, k) => (
              <li key={k} className="flex gap-3 text-[14.5px] leading-relaxed text-[#DCE3EE]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#38D5E0]/70" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {t.tabela && (
        <section className="mb-5 overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[480px] text-left text-[13.5px]">
            <thead className="bg-white/[0.04]">
              <tr>{t.tabela.cab.map((c) => <th key={c} className="px-3 py-2 font-semibold text-[#EADFC8]">{c}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {t.tabela.linhas.map((l, i) => (
                <tr key={i}>{l.map((c, j) => <td key={j} className={cn("px-3 py-2 align-top", j === 0 ? "font-medium text-white" : "text-[#C9D3E1]")}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {t.fases && (
        <section className="mb-5">
          <h3 className="oh-eyebrow mb-3">Fases</h3>
          <ol className="relative space-y-4 border-l border-[#38D5E0]/25 pl-5">
            {t.fases.map((f, i) => (
              <li key={i} className="relative">
                <span className="oh-mono absolute -left-[31px] top-0 grid h-5 w-5 place-items-center rounded-full border border-[#38D5E0]/50 bg-[var(--film-0)] text-[10px] text-[#7FE7EE]">{i + 1}</span>
                <div className="ossohub-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-[15px] font-semibold text-white">{f.nome}</h4>
                    <span className="flex items-center gap-2">
                      {f.tempo && <span className="oh-mono text-[11.5px] text-[#8C9AB0]">{f.tempo}</span>}
                      <AcoesPrescricao texto={textoPrescricao(t, i)} rotulo="Copiar fase" compacto />
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {([["Objetivos", f.objetivos, Flag], ["Exercícios", f.exercicios, Dumbbell], ["Critérios para avançar", f.criterios, ChevronRight]] as const).map(([titulo, lista, Icon]) => (
                      <div key={titulo}>
                        <p className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-[#A3B1C6]"><Icon className="h-3.5 w-3.5" />{titulo}</p>
                        <ul className="space-y-1 text-[13.5px] leading-relaxed text-[#DCE3EE]">
                          {lista.map((x, k) => <li key={k}>• {x}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {t.notas && t.notas.length > 0 && (
        <section className="mb-5 rounded-xl border border-[var(--line)] bg-[var(--film-1)] p-4">
          <h3 className="mb-1 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#EADFC8]">
            <Scale className="h-4 w-4" /> Comparação entre fontes
          </h3>
          <p className="mb-3 text-[12.5px] text-[#8C9AB0]">Como as referências adicionais se posicionam em relação ao conteúdo acima.</p>
          <ul className="space-y-2.5">
            {(["diverge", "acrescenta", "concorda"] as const).flatMap((tipo) =>
              t.notas!.filter((n) => n.tipo === tipo).map((n, i) => {
                const T = TIPO[n.tipo];
                return (
                  <li key={tipo + i} className="text-[14px] leading-relaxed text-[#DCE3EE]">
                    <span className={cn("mr-2 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 align-middle text-[11px] font-semibold", T.cls)}>
                      <T.Icon className="h-3 w-3" /> {T.l}
                    </span>
                    {n.texto}
                    <span className="mt-0.5 block text-[12px] text-[#8C9AB0]">{FONTES_ESP[n.fonte]}</span>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      )}

      {t.ver && t.ver.length > 0 && (
        <section className="mb-5">
          <h3 className="oh-eyebrow mb-2">Veja também</h3>
          <div className="flex flex-wrap gap-2">
            {t.ver.map((id) => {
              const r = acharTopico(id);
              if (!r) return null;
              return (
                <Link key={id} href={`/esporte/${r.area}?t=${r.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#38D5E0]/30 bg-[#38D5E0]/[0.06] px-3 py-1.5 text-[13px] text-[#7FE7EE] hover:bg-[#38D5E0]/10">
                  <Link2 className="h-3.5 w-3.5" /> {r.titulo}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <footer className="mt-6 flex items-start gap-2 text-[12px] leading-relaxed text-[#8C9AB0]">
        <BookMarked className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>Referências: {t.fontes.map((f) => FONTES_ESP[f]).join("; ")}.</span>
      </footer>
    </article>
  );
}

export function EsporteClient({ area }: { area: AreaEsp }) {
  const router = useRouter();
  const params = useSearchParams();
  const selId = params.get("t");
  const [busca, setBusca] = useState("");
  const [grupo, setGrupo] = useState<string | null>(null);

  const lista = TOPICOS[area];
  const meta = AREAS_ESP.find((a) => a.id === area)!;
  const grupos = useMemo(() => Array.from(new Set(lista.map((t) => t.grupo))), [lista]);
  const filtrada = useMemo(() => {
    const q = semAcento(busca.trim());
    return lista.filter((t) => {
      if (grupo && t.grupo !== grupo) return false;
      if (!q) return true;
      const alvo = semAcento([t.titulo, t.grupo, t.resumo, ...(t.tags ?? [])].join(" "));
      return q.split(/\s+/).every((p) => alvo.includes(p));
    });
  }, [lista, busca, grupo]);
  const sel = selId ? lista.find((t) => t.id === selId) : undefined;

  function abrir(id: string | null) {
    router.push(id ? `/esporte/${area}?t=${id}` : `/esporte/${area}`, { scroll: false });
    if (id) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(300px,380px)_1fr] lg:gap-6">
      <div className={cn(sel && "hidden lg:block")}>
        <div className="sticky top-16 z-10 -mx-1 mb-3 space-y-2.5 bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur">
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--film-3)] px-3 focus-within:border-[#38D5E0]">
            <Search className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={`Buscar em ${meta.titulo.toLowerCase()}…`}
              className="oh-bare w-full min-w-0 py-2.5 text-[15px] text-white outline-none" />
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {[null, ...grupos].map((g) => (
              <button key={g ?? "todos"} onClick={() => setGrupo(g)}
                className={cn("shrink-0 rounded-full border px-3 py-1 text-[12.5px] font-medium",
                  grupo === g ? "border-[#38D5E0]/50 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#C9D3E1]")}>
                {g ?? "Todos"}
              </button>
            ))}
          </div>
        </div>
        <ul className="space-y-2">
          {filtrada.map((t) => (
            <li key={t.id}>
              <button onClick={() => abrir(t.id)}
                className={cn("group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
                  sel?.id === t.id ? "border-[#38D5E0]/45 bg-[#38D5E0]/[0.07]" : "border-[var(--line)] bg-[var(--film-2)] hover:border-white/15")}>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[14.5px] font-semibold text-white">{t.titulo}</span>
                    {t.notas?.some((n) => n.tipo === "diverge") && (
                      <span className="shrink-0 rounded border border-amber-400/40 px-1 text-[10px] font-semibold text-amber-200">diverge</span>
                    )}
                    {!t.notas?.some((n) => n.tipo === "diverge") && NOVOS_IDS.has(t.id) && (
                      <span className="shrink-0 rounded border border-[#38D5E0]/40 px-1 text-[10px] font-semibold text-[#7FE7EE]">novo</span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-[#A3B1C6]">{t.grupo} · {t.resumo}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0] group-hover:text-white" />
              </button>
            </li>
          ))}
          {filtrada.length === 0 && <li className="py-8 text-center text-[14px] text-[#A3B1C6]">Nada encontrado.</li>}
        </ul>
      </div>
      <div className={cn(!sel && "hidden lg:block")}>
        {sel ? <Detalhe t={sel} onVoltar={() => abrir(null)} /> : (
          <div className="ossohub-card grid min-h-[320px] place-items-center p-8 text-center">
            <div>
              <p className="text-[15px] text-[#C9D3E1]">Escolha um tema na lista.</p>
              <p className="mt-1 text-[13px] text-[#8C9AB0]">{meta.desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
