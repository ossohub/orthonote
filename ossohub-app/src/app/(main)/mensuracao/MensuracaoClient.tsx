"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  Search, ChevronDown, Copy, Check, Baby, Ruler, Bone, Wrench, ArrowUpRight, Lightbulb, Link2, X,
  ChevronLeft, ChevronRight, Image as ImageIcon, Pencil, Plus, Trash2, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MEDIDAS, MEDIDAS_POR_REGIAO, REGIOES_RX, TIPOS_RX, tituloRegiao,
  type Medida, type RegiaoRx, type TipoRx, type Tom,
} from "@/data/radiologia";
import { useUser } from "@/hooks/useUser";
import { carregarImagensRx, incluirImagemRx, salvarLegendaRx, excluirImagemRx, type RxImagem } from "@/lib/rxImages";

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const TOM: Record<Tom, { dot: string; txt: string; box: string }> = {
  n: { dot: "bg-[#10B981]", txt: "text-[#6EE7B7]", box: "border-[#10B981]/30 bg-[#10B981]/[0.06]" },
  l: { dot: "bg-amber-400", txt: "text-amber-200", box: "border-amber-400/35 bg-amber-400/[0.07]" },
  a: { dot: "bg-[#F87171]", txt: "text-[#FCA5A5]", box: "border-[#F87171]/35 bg-[#F87171]/[0.07]" },
  i: { dot: "bg-[#38D5E0]", txt: "text-[#7FE7EE]", box: "border-[#38D5E0]/30 bg-[#38D5E0]/[0.06]" },
};

const ICONE_TIPO: Record<TipoRx, React.ElementType> = { medida: Ruler, fratura: Bone, cirurgia: Wrench };
const ROTULO_TIPO: Record<TipoRx, string> = { medida: "Medida", fratura: "Fratura", cirurgia: "Cirurgia" };

function textoMedida(m: Medida) {
  const l: string[] = [`${m.nome}${m.inc ? ` (${m.inc})` : ""}`, m.resumo];
  if (m.valores?.length) l.push("", ...m.valores.map((v) => `• ${v.r}: ${v.v}`));
  if (m.tabela) {
    l.push("", m.tabela.cab.join(" | "), ...m.tabela.linhas.map((r) => r.join(" | ")));
    if (m.tabela.nota) l.push(m.tabela.nota);
  }
  if (m.como?.length) l.push("", "Como medir:", ...m.como.map((c, i) => `${i + 1}. ${c}`));
  if (m.obs?.length) l.push("", ...m.obs.map((o) => `Obs.: ${o}`));
  return l.join("\n");
}

function alvoBusca(m: Medida) {
  return semAcento([
    m.nome, m.resumo, m.grupo, m.inc ?? "", ...(m.tags ?? []),
    ...(m.valores ?? []).flatMap((v) => [v.r, v.v]), ...(m.como ?? []), ...(m.obs ?? []),
    ...(m.tabela ? [...m.tabela.cab, ...m.tabela.linhas.flat()] : []),
  ].join(" "));
}

function BotaoCopiar({ m }: { m: Medida }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button"
      onClick={async (e) => {
        e.stopPropagation();
        try { await navigator.clipboard.writeText(textoMedida(m)); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* sem permissão */ }
      }}
      className={cn("inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors",
        ok ? "border-[#10B981]/50 bg-[#10B981]/10 text-[#6EE7B7]" : "border-[var(--line)] text-[#C9D3E1] hover:border-white/20 hover:text-white")}>
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? "Copiado" : "Copiar"}
    </button>
  );
}

function Valores({ m, max }: { m: Medida; max?: number }) {
  if (!m.valores?.length) return null;
  const lista = max ? m.valores.slice(0, max) : m.valores;
  return (
    <ul className="space-y-1">
      {lista.map((v, i) => {
        const T = TOM[v.t ?? "i"];
        return (
          <li key={i} className="flex gap-2 text-[13.5px] leading-snug">
            <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", T.dot)} />
            <span className="min-w-0">
              <span className="text-[#A3B1C6]">{v.r}: </span>
              <span className={cn("font-semibold", T.txt)}>{v.v}</span>
            </span>
          </li>
        );
      })}
      {max && m.valores.length > max && <li className="pl-3.5 text-[12px] text-[#8C9AB0]">+ {m.valores.length - max} valor(es)</li>}
    </ul>
  );
}

function Tabela({ m }: { m: Medida }) {
  if (!m.tabela) return null;
  const { cab, linhas, nota } = m.tabela;
  return (
    <div>
      {/* celular: cada linha vira um cartão (mais fácil de ler que tabela larga) */}
      <ul className="space-y-2 sm:hidden">
        {linhas.map((l, i) => (
          <li key={i} className="rounded-lg border border-[var(--line)] bg-white/[0.02] px-3 py-2.5">
            <p className="text-[14px] font-semibold leading-snug text-white">{l[0]}</p>
            <dl className="mt-1.5 space-y-1">
              {l.slice(1).map((c, j) => c === "—" ? null : (
                <div key={j} className="text-[13.5px] leading-snug">
                  <dt className="inline text-[#8C9AB0]">{cab[j + 1]}: </dt>
                  <dd className="inline text-[#DCE3EE]">{c}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="-mx-1 hidden overflow-x-auto px-1 sm:block">
        <table className="w-full min-w-[420px] border-collapse text-left text-[13px]">
          <thead>
            <tr>
              {cab.map((c) => (
                <th key={c} className="border-b border-[var(--line)] px-2.5 py-2 text-[11.5px] font-semibold uppercase tracking-wide text-[#EADFC8]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr key={i} className="odd:bg-white/[0.02]">
                {l.map((c, j) => (
                  <td key={j} className={cn("border-b border-[var(--line)] px-2.5 py-2 align-top leading-snug", j === 0 ? "font-medium text-white" : "text-[#DCE3EE]")}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {nota && <p className="mt-2 text-[12.5px] leading-relaxed text-[#A3B1C6]">{nota}</p>}
    </div>
  );
}

type CtxImagens = { porMedida: Record<string, RxImagem[]>; isAdmin: boolean; recarregar: () => Promise<void> };
const ImagensCtx = createContext<CtxImagens>({ porMedida: {}, isAdmin: false, recarregar: async () => {} });

/** Imagens com os traçados da medida; toque abre em tela cheia. Administrador inclui, edita legenda e exclui. */
function Imagens({ medidaId }: { medidaId: string }) {
  const { porMedida, isAdmin, recarregar } = useContext(ImagensCtx);
  const itens = porMedida[medidaId] ?? [];
  const [aberta, setAberta] = useState<number | null>(null);
  const [editando, setEditando] = useState(false);
  const atual = aberta === null ? null : itens[aberta];
  const ir = (d: number) => setAberta((i) => (i === null || !itens.length ? null : (i + d + itens.length) % itens.length));
  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", tecla);
    const ov = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", tecla); document.body.style.overflow = ov; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberta]);

  if (!itens.length && !isAdmin) return null;
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <h4 className="oh-eyebrow flex items-center gap-1.5"><ImageIcon className="h-3.5 w-3.5" /> {itens.length === 1 ? "Imagem" : "Imagens"}</h4>
        {isAdmin && (
          <button type="button" onClick={() => setEditando((e) => !e)} aria-pressed={editando}
            className={cn("ml-auto inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[12px] font-semibold",
              editando ? "border-[#A78BFA] bg-[#A78BFA]/20 text-white" : "border-[#A78BFA]/40 text-[#DDD6FE]")}>
            <Pencil className="h-3.5 w-3.5" /> {editando ? "Concluir" : "Editar imagens"}
          </button>
        )}
      </div>

      {editando ? (
        <ul className="space-y-3">
          {itens.map((im) => <ItemEdicao key={im.id} im={im} recarregar={recarregar} />)}
          <li><BotaoIncluir medidaId={medidaId} proximo={(itens[itens.length - 1]?.sort ?? 0) + 10} recarregar={recarregar} /></li>
        </ul>
      ) : (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {itens.map((im, i) => (
            <button key={im.id} type="button" onClick={() => setAberta(i)} className="shrink-0 text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.url} alt={im.caption || "Imagem radiográfica"} loading="lazy" decoding="async"
                width={im.width ?? undefined} height={im.height ?? undefined}
                className="h-36 w-auto max-w-[260px] rounded-lg border border-[var(--line)] bg-black object-contain sm:h-44" />
              {im.caption && <span className="mt-1 block max-w-[260px] text-[11.5px] leading-snug text-[#A3B1C6]">{im.caption}</span>}
            </button>
          ))}
          {!itens.length && <p className="text-[12.5px] text-[#8C9AB0]">Nenhuma imagem. Toque em “Editar imagens” para incluir.</p>}
        </div>
      )}

      {atual && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[1000] flex flex-col bg-[#02060D]" role="dialog" aria-modal="true" aria-label={atual.caption || "Imagem"}>
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5" style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top))" }}>
            <button type="button" onClick={() => setAberta(null)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label="Fechar">
              <X className="h-5 w-5" />
            </button>
            <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">{atual.caption}</p>
            {itens.length > 1 && <span className="oh-mono text-[11px] text-[#8C9AB0]">{(aberta ?? 0) + 1}/{itens.length}</span>}
          </div>
          <div className="grid min-h-0 flex-1 place-items-center overflow-auto p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={atual.url} alt={atual.caption || "Imagem radiográfica"} className="max-h-full max-w-full object-contain" />
          </div>
          {itens.length > 1 && (
            <div className="flex items-center justify-between border-t border-white/10 px-3 py-2.5" style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}>
              <button type="button" onClick={() => ir(-1)} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white"><ChevronLeft className="h-4 w-4" /> Anterior</button>
              <button type="button" onClick={() => ir(1)} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white">Próxima <ChevronRight className="h-4 w-4" /></button>
            </div>
          )}
        </div>,
        document.body,
      )}
    </section>
  );
}

function ItemEdicao({ im, recarregar }: { im: RxImagem; recarregar: () => Promise<void> }) {
  const [legenda, setLegenda] = useState(im.caption ?? "");
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [confirmar, setConfirmar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  useEffect(() => { setLegenda(im.caption ?? ""); }, [im.caption]);
  const executar = async (rotulo: string, acao: () => Promise<void>) => {
    setOcupado(rotulo); setErro(null);
    try { await acao(); await recarregar(); } catch (e) { setErro((e as Error).message || "Falhou"); } finally { setOcupado(null); }
  };
  const mudou = legenda.trim() !== (im.caption ?? "").trim();
  return (
    <li className="flex gap-3 rounded-lg border border-[#A78BFA]/30 bg-[#A78BFA]/[0.04] p-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={im.url} alt="" className="h-20 w-20 shrink-0 rounded border border-[var(--line)] bg-black object-contain" />
      <div className="min-w-0 flex-1 space-y-2">
        <input value={legenda} onChange={(e) => setLegenda(e.target.value)} placeholder="Legenda (opcional)"
          className="w-full rounded-lg border border-[var(--line)] bg-[var(--film-3)] px-2.5 py-1.5 text-[13.5px] text-white outline-none focus:border-[#A78BFA]" />
        <div className="flex flex-wrap gap-1.5">
          <button type="button" disabled={!!ocupado || !mudou} onClick={() => executar("legenda", () => salvarLegendaRx(im.id, legenda.trim()))}
            className="inline-flex items-center gap-1 rounded-lg bg-[#A78BFA] px-2.5 py-1 text-[12px] font-semibold text-[#1E1B4B] disabled:opacity-40">
            {ocupado === "legenda" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Salvar legenda
          </button>
          {(im.caption ?? "") !== "" && (
            <button type="button" disabled={!!ocupado} onClick={() => executar("apagar", async () => { setLegenda(""); await salvarLegendaRx(im.id, ""); })}
              className="rounded-lg border border-[var(--line)] px-2.5 py-1 text-[12px] text-[#C9D3E1]">Apagar legenda</button>
          )}
          {!confirmar ? (
            <button type="button" disabled={!!ocupado} onClick={() => setConfirmar(true)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#F87171]/40 px-2.5 py-1 text-[12px] text-[#FCA5A5]">
              <Trash2 className="h-3.5 w-3.5" /> Excluir imagem
            </button>
          ) : (
            <>
              <button type="button" onClick={() => setConfirmar(false)} className="rounded-lg border border-[var(--line)] px-2.5 py-1 text-[12px] text-[#C9D3E1]">Cancelar</button>
              <button type="button" disabled={!!ocupado} onClick={() => executar("excluir", () => excluirImagemRx(im))}
                className="inline-flex items-center gap-1 rounded-lg bg-[#DC2626] px-2.5 py-1 text-[12px] font-semibold text-white">
                {ocupado === "excluir" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} Confirmar exclusão
              </button>
            </>
          )}
        </div>
        {erro && <p className="text-[12px] text-[#FCA5A5]">{erro}</p>}
      </div>
    </li>
  );
}

function BotaoIncluir({ medidaId, proximo, recarregar }: { medidaId: string; proximo: number; recarregar: () => Promise<void> }) {
  const entrada = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  return (
    <div>
      <button type="button" disabled={enviando > 0} onClick={() => entrada.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#A78BFA]/60 px-3 py-3 text-[13px] font-medium text-[#DDD6FE]">
        {enviando > 0 ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando {enviando}…</> : <><Plus className="h-4 w-4" /> Incluir imagem</>}
      </button>
      <p className="mt-1 text-[11.5px] text-[#8C9AB0]">Fica visível para todos. Confira que a imagem não identifica o paciente.</p>
      {erro && <p className="mt-1 text-[12px] text-[#FCA5A5]">{erro}</p>}
      <input ref={entrada} type="file" accept="image/*" multiple hidden
        onChange={async (e) => {
          const arquivos = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (!arquivos.length) return;
          setErro(null);
          let falhas = 0;
          for (let i = 0; i < arquivos.length; i++) {
            setEnviando(arquivos.length - i);
            try { await incluirImagemRx(medidaId, arquivos[i], proximo + i * 10); } catch { falhas++; }
          }
          setEnviando(0);
          if (falhas) setErro(`${falhas} imagem(ns) não enviada(s).`);
          await recarregar();
        }} />
    </div>
  );
}

function SeloImagens({ id }: { id: string }) {
  const n = useContext(ImagensCtx).porMedida[id]?.length ?? 0;
  if (!n) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded border border-[#EADFC8]/30 px-1 text-[10.5px] font-semibold text-[#EADFC8]">
      <ImageIcon className="h-3 w-3" /> {n}
    </span>
  );
}

function Cartao({ m, aberto, alternar, mostrarRegiao }: { m: Medida; aberto: boolean; alternar: () => void; mostrarRegiao?: boolean }) {
  const tipo = m.tipo ?? "medida";
  const Icone = ICONE_TIPO[tipo];
  return (
    <li id={`m-${m.id}`} className={cn("scroll-mt-40 rounded-xl border transition-colors",
      aberto ? "border-[#38D5E0]/40 bg-[var(--film-2)]" : "border-[var(--line)] bg-[var(--film-2)] hover:border-white/15")}>
      <button type="button" onClick={alternar} aria-expanded={aberto} className="flex w-full items-start gap-3 px-3.5 py-3 text-left">
        <span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg",
          tipo === "fratura" ? "bg-[#EADFC8]/10 text-[#EADFC8]" : tipo === "cirurgia" ? "bg-[#A78BFA]/10 text-[#C4B5FD]" : "bg-[#38D5E0]/10 text-[#7FE7EE]")}>
          <Icone className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[15px] font-semibold leading-snug text-white">{m.nome}</span>
            {m.ped && (
              <span className="inline-flex items-center gap-1 rounded border border-[#38D5E0]/35 px-1 text-[10.5px] font-semibold text-[#7FE7EE]">
                <Baby className="h-3 w-3" /> ped
              </span>
            )}
            <SeloImagens id={m.id} />
          </span>
          {(m.inc || mostrarRegiao) && (
            <span className="oh-mono mt-0.5 block text-[11.5px] text-[#8C9AB0]">
              {mostrarRegiao ? `${tituloRegiao(m.regiao)}${m.inc ? " · " : ""}` : ""}{m.inc}
            </span>
          )}
          <span className="mt-1 block text-[13.5px] leading-snug text-[#C9D3E1]">{m.resumo}</span>
          {!aberto && m.valores && <span className="mt-2 block"><Valores m={m} max={3} /></span>}
        </span>
        <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-[#8C9AB0] transition-transform", aberto && "rotate-180")} />
      </button>

      {aberto && (
        <div className="space-y-4 border-t border-[var(--line)] px-3.5 pb-4 pt-3.5 sm:pl-[3.4rem]">
          {m.valores && (
            <section>
              <h4 className="oh-eyebrow mb-2">Valores</h4>
              <Valores m={m} />
            </section>
          )}
          {m.tabela && <section><Tabela m={m} /></section>}
          <Imagens medidaId={m.id} />
          {m.como && (
            <section>
              <h4 className="oh-eyebrow mb-2">Como medir</h4>
              <ol className="space-y-1.5">
                {m.como.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#DCE3EE]">
                    <span className="oh-mono mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-white/[0.06] text-[11px] text-[#A3B1C6]">{i + 1}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {m.obs && (
            <section className="rounded-lg border border-[#EADFC8]/20 bg-[#EADFC8]/[0.04] p-3">
              <h4 className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#EADFC8]"><Lightbulb className="h-3.5 w-3.5" /> Na prática</h4>
              <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-[#DCE3EE]">
                {m.obs.map((o, i) => <li key={i}>• {o}</li>)}
              </ul>
            </section>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <BotaoCopiar m={m} />
            {mostrarRegiao && (
              <Link href={`/mensuracao/${m.regiao}?m=${m.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[12px] font-medium text-[#C9D3E1] hover:text-white">
                <Link2 className="h-3.5 w-3.5" /> Ver na região
              </Link>
            )}
            <span className="ml-auto text-[11.5px] text-[#8C9AB0]">{ROTULO_TIPO[tipo]} · {m.grupo}</span>
          </div>
        </div>
      )}
    </li>
  );
}

function agrupar(lista: Medida[], chave: (m: Medida) => string) {
  const mapa = new Map<string, Medida[]>();
  for (const m of lista) {
    const k = chave(m);
    if (!mapa.has(k)) mapa.set(k, []);
    mapa.get(k)!.push(m);
  }
  return Array.from(mapa.entries());
}

export function MensuracaoClient({ regiao }: { regiao?: RegiaoRx }) {
  const params = useSearchParams();
  const alvoInicial = params.get("m");
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<TipoRx | null>(null);
  const [soPed, setSoPed] = useState(false);
  const [abertos, setAbertos] = useState<Set<string>>(() => new Set(alvoInicial ? [alvoInicial] : []));
  const { profile, loading: carregandoUsuario } = useUser();
  const [porMedida, setPorMedida] = useState<Record<string, RxImagem[]>>({});
  const recarregar = useCallback(async () => { setPorMedida(await carregarImagensRx()); }, []);
  useEffect(() => { void recarregar(); }, [recarregar]);
  const ctxImagens = useMemo<CtxImagens>(() => ({
    porMedida, isAdmin: !carregandoUsuario && profile?.app_role === "admin", recarregar,
  }), [porMedida, carregandoUsuario, profile?.app_role, recarregar]);

  useEffect(() => {
    if (!alvoInicial) return;
    setAbertos((s) => new Set(s).add(alvoInicial));
    const t = setTimeout(() => document.getElementById(`m-${alvoInicial}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
    return () => clearTimeout(t);
  }, [alvoInicial]);

  const q = semAcento(busca.trim());
  const global = !regiao || q.length > 0;
  const base = regiao && !q ? MEDIDAS_POR_REGIAO[regiao] : MEDIDAS;
  const filtrada = useMemo(() => base.filter((m) => {
    if (tipo && (m.tipo ?? "medida") !== tipo) return false;
    if (soPed && !m.ped) return false;
    if (!q) return true;
    const alvo = alvoBusca(m);
    return q.split(/\s+/).every((p) => alvo.includes(p));
  }), [base, tipo, soPed, q]);

  const filtrando = q.length > 0 || tipo !== null || soPed;
  const mostrarGrade = !regiao && !filtrando;
  const grupos = agrupar(filtrada, (m) => (global ? tituloRegiao(m.regiao) : m.grupo));

  const alternar = (id: string) => setAbertos((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  const todosAbertos = filtrada.length > 0 && filtrada.every((m) => abertos.has(m.id));

  return (
    <ImagensCtx.Provider value={ctxImagens}>
    <div>
      <div className="sticky top-16 z-10 -mx-1 mb-4 space-y-2.5 bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur">
        <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--film-3)] px-3 focus-within:border-[#38D5E0]">
          <Search className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)}
            placeholder={regiao ? "Buscar em todas as regiões (ex.: Insall, Cobb, sindesmose)…" : "Buscar medida, ângulo ou sinal…"}
            className="oh-bare w-full min-w-0 py-2.5 text-[15px] text-white outline-none" />
          {busca && (
            <button type="button" onClick={() => setBusca("")} aria-label="Limpar busca" className="text-[#8C9AB0] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
          {[null, ...TIPOS_RX.map((t) => t.id)].map((t) => (
            <button key={t ?? "todos"} type="button" onClick={() => setTipo(t)}
              className={cn("shrink-0 rounded-full border px-3 py-1 text-[12.5px] font-medium",
                tipo === t ? "border-[#38D5E0]/50 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#C9D3E1]")}>
              {t ? TIPOS_RX.find((x) => x.id === t)!.titulo : "Todos"}
            </button>
          ))}
          <button type="button" onClick={() => setSoPed((v) => !v)}
            className={cn("inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[12.5px] font-medium",
              soPed ? "border-[#38D5E0]/50 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#C9D3E1]")}>
            <Baby className="h-3.5 w-3.5" /> Pediatria
          </button>
        </div>
      </div>

      {mostrarGrade ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {REGIOES_RX.map((r) => (
            <li key={r.id}>
              <Link href={`/mensuracao/${r.id}`} className="group oh-hub-card h-full">
                <div className="flex items-center justify-between">
                  <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">{r.curto}</span>
                  <span className="oh-mono text-[11px] text-[#8C9AB0]">{MEDIDAS_POR_REGIAO[r.id].length} itens</span>
                </div>
                <div>
                  <h2 className="flex items-center gap-1.5 text-base font-semibold text-white">
                    {r.titulo}
                    <ArrowUpRight className="h-4 w-4 text-[#8C9AB0] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#A3B1C6]">{r.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[12.5px] text-[#8C9AB0]">
              {filtrada.length} {filtrada.length === 1 ? "item" : "itens"}{global && regiao ? " em todas as regiões" : ""}
            </p>
            {filtrada.length > 0 && (
              <button type="button"
                onClick={() => setAbertos(todosAbertos ? new Set() : new Set(filtrada.map((m) => m.id)))}
                className="text-[12.5px] font-medium text-[#7FE7EE] hover:underline">
                {todosAbertos ? "Recolher tudo" : "Abrir tudo"}
              </button>
            )}
          </div>
          {filtrada.length === 0 && <p className="py-10 text-center text-[14px] text-[#A3B1C6]">Nada encontrado.</p>}
          <div className="space-y-6">
            {grupos.map(([g, itens]) => (
              <section key={g}>
                <h3 className="oh-eyebrow mb-2.5">{g} <span className="text-[#8C9AB0]">· {itens.length}</span></h3>
                <ul className="space-y-2">
                  {itens.map((m) => (
                    <Cartao key={m.id} m={m} aberto={abertos.has(m.id)} alternar={() => alternar(m.id)} mostrarRegiao={global} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
    </ImagensCtx.Provider>
  );
}
