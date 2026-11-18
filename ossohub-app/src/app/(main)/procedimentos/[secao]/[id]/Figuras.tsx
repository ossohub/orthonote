"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X, ChevronLeft, ChevronRight, Pencil, Eye, EyeOff, Trash2, Plus, Upload, Loader2, Lock, Globe, ZoomIn, ZoomOut,
  ArrowLeft, ArrowRight, Settings2, PackageOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import type { Procedimento } from "@/data/cirurgia/types";
import {
  carregarFiguras, incluirFigura, substituirArquivo, atualizarFigura, excluirFigura, type FiguraComUrl,
} from "@/lib/procedureImages";

// ---------------------------------------------------------------------------
// Estado das figuras de um procedimento
// ---------------------------------------------------------------------------
export function useFiguras(p: Procedimento) {
  const { user, profile, loading } = useUser();
  const isAdmin = profile?.app_role === "admin";
  const [todas, setTodas] = useState<FiguraComUrl[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);
  const refs = useMemo(() => Array.from(new Set(p.etapas.flatMap((e) => e.figs ?? []))), [p]);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    try { setTodas(await carregarFiguras(p.id, refs)); } finally { setCarregando(false); }
  }, [p.id, refs]);

  useEffect(() => { if (!loading) void recarregar(); }, [loading, user?.id, recarregar]);

  // Fora do modo edição, figuras ocultas não aparecem nem para o administrador.
  const visiveis = useMemo(() => todas.filter((f) => f.url && (editando || !f.hidden)), [todas, editando]);

  /** Figuras de cada etapa (por número de figura citado na etapa ou por etapa escolhida no upload). */
  // Etapa escolhida pelo administrador vale mais; senão, o nº da figura citado na etapa.
  const porEtapa = useMemo(() => p.etapas.map((e, i) => visiveis.filter((f) => {
    if (f.procedure_id === p.id && f.step_index !== null && f.step_index !== undefined) return f.step_index === i;
    return !!f.fig_ref && !!e.figs?.includes(f.fig_ref);
  })), [p, visiveis]);

  const outras = useMemo(() => {
    const usadas = new Set(porEtapa.flat().map((f) => f.id));
    return visiveis.filter((f) => f.procedure_id === p.id && !usadas.has(f.id));
  }, [p.id, porEtapa, visiveis]);

  /** Ordem do visualizador: etapa por etapa, depois as outras (sem repetir). */
  const sequencia = useMemo(() => {
    const vistos = new Set<string>(); const seq: FiguraComUrl[] = [];
    for (const f of [...porEtapa.flat(), ...outras]) if (!vistos.has(f.id)) { vistos.add(f.id); seq.push(f); }
    return seq;
  }, [porEtapa, outras]);

  const porRef = useMemo(() => {
    const m = new Map<string, FiguraComUrl>();
    for (const f of sequencia) if (f.fig_ref && !m.has(f.fig_ref)) m.set(f.fig_ref, f);
    return m;
  }, [sequencia]);

  return { isAdmin, editando, setEditando, carregando, porEtapa, outras, sequencia, porRef, recarregar, total: todas.length };
}

export type Figuras = ReturnType<typeof useFiguras>;

// ---------------------------------------------------------------------------
// Barra do administrador (fica no topo da técnica)
// ---------------------------------------------------------------------------
export function BarraAdmin({ f }: { f: Figuras }) {
  if (!f.isAdmin) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#A78BFA]/30 bg-[#A78BFA]/[0.06] px-3 py-2.5">
      <Settings2 className="h-4 w-4 text-[#C4B5FD]" />
      <span className="text-[12.5px] text-[#DDD6FE]">Administrador · {f.total} {f.total === 1 ? "imagem" : "imagens"}</span>
      <button type="button" onClick={() => f.setEditando(!f.editando)} aria-pressed={f.editando}
        className={cn("ml-auto inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold",
          f.editando ? "border-[#A78BFA] bg-[#A78BFA]/20 text-white" : "border-[#A78BFA]/40 text-[#DDD6FE]")}>
        <Pencil className="h-3.5 w-3.5" /> {f.editando ? "Concluir edição" : "Editar imagens"}
      </button>
      {f.editando && (
        <Link href="/procedimentos/importar" className="inline-flex items-center gap-1.5 rounded-lg border border-[#A78BFA]/40 px-3 py-1.5 text-[12.5px] font-semibold text-[#DDD6FE]">
          <PackageOpen className="h-3.5 w-3.5" /> Importar pacote
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Faixa de miniaturas de uma etapa
// ---------------------------------------------------------------------------
export function FaixaFiguras({ itens, f, abrir, etapa, procedureId, onEditar }: {
  itens: FiguraComUrl[]; f: Figuras; abrir: (id: string) => void; etapa: number | null; procedureId: string;
  onEditar: (fig: FiguraComUrl) => void;
}) {
  if (!itens.length && !f.editando) return null;
  return (
    <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
      {itens.map((fig) => (
        <div key={fig.id} className={cn("relative shrink-0", fig.hidden && "opacity-45")}>
          <button type="button" onClick={() => abrir(fig.id)}
            className="block overflow-hidden rounded-lg border border-[var(--line)] bg-white transition-transform active:scale-[0.98]"
            aria-label={`Abrir ${rotulo(fig)}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fig.thumbUrl ?? undefined} alt={rotulo(fig)} loading="lazy" decoding="async"
              className="h-28 w-auto max-w-[220px] object-contain sm:h-32" />
          </button>
          <span className="oh-mono mt-1 flex items-center gap-1 text-[10.5px] text-[#8C9AB0]">
            {fig.visibility === "admin" ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3 text-[#6EE7B7]" />}
            {rotulo(fig)}{fig.hidden ? " · oculta" : ""}
          </span>
          {f.editando && (
            <button type="button" onClick={() => onEditar(fig)} aria-label="Editar imagem"
              className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-[#1E1B4B]/90 text-white shadow ring-1 ring-[#A78BFA]/60">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ))}
      {f.editando && <BotaoIncluir f={f} procedureId={procedureId} etapa={etapa} />}
    </div>
  );
}

function rotulo(fig: FiguraComUrl) {
  if (fig.fig_ref) return `Fig. ${fig.fig_ref}${fig.part ? fig.part : ""}`;
  return fig.caption?.trim() ? fig.caption.slice(0, 28) : "Imagem";
}

function BotaoIncluir({ f, procedureId, etapa }: { f: Figuras; procedureId: string; etapa: number | null }) {
  const entrada = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  return (
    <div className="shrink-0">
      <button type="button" onClick={() => entrada.current?.click()} disabled={enviando > 0}
        className="grid h-28 w-28 place-items-center rounded-lg border border-dashed border-[#A78BFA]/60 text-[#DDD6FE] sm:h-32 sm:w-32">
        {enviando > 0 ? (
          <span className="flex flex-col items-center gap-1 text-[11px]"><Loader2 className="h-5 w-5 animate-spin" /> enviando {enviando}</span>
        ) : (
          <span className="flex flex-col items-center gap-1 text-[11.5px] font-medium"><Plus className="h-5 w-5" /> Incluir imagem</span>
        )}
      </button>
      {erro && <p className="mt-1 max-w-[8rem] text-[10.5px] text-[#FCA5A5]">{erro}</p>}
      <input ref={entrada} type="file" accept="image/*" multiple hidden
        onChange={async (e) => {
          const arquivos = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (!arquivos.length) return;
          setErro(null);
          let falhas = 0;
          for (let i = 0; i < arquivos.length; i++) {
            setEnviando(arquivos.length - i);
            try { await incluirFigura(arquivos[i], { procedure_id: procedureId, step_index: etapa, sort: Date.now() % 1_000_000 + i }); }
            catch { falhas++; }
          }
          setEnviando(0);
          if (falhas) setErro(`${falhas} não enviada(s)`);
          await f.recarregar();
        }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Visualizador em tela cheia
// ---------------------------------------------------------------------------
export function Visualizador({ f, atual, setAtual, onEditar }: {
  f: Figuras; atual: string | null; setAtual: (id: string | null) => void; onEditar: (fig: FiguraComUrl) => void;
}) {
  const seq = f.sequencia;
  const idx = atual ? seq.findIndex((x) => x.id === atual) : -1;
  const fig = idx >= 0 ? seq[idx] : null;
  const [zoom, setZoom] = useState(false);
  const toque = useRef<number | null>(null);

  const ir = useCallback((d: number) => {
    if (idx < 0 || !seq.length) return;
    setZoom(false);
    setAtual(seq[(idx + d + seq.length) % seq.length].id);
  }, [idx, seq, setAtual]);

  useEffect(() => {
    if (!fig) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAtual(null);
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", tecla);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", tecla); document.body.style.overflow = overflow; };
  }, [fig, ir, setAtual]);

  if (!fig || typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex flex-col bg-[#02060D]" role="dialog" aria-modal="true" aria-label={rotulo(fig)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5" style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top))" }}>
        <button type="button" onClick={() => setAtual(null)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label="Fechar">
          <X className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-white">{rotulo(fig)}{fig.caption && fig.fig_ref ? ` · ${fig.caption}` : ""}</p>
          <p className="oh-mono text-[11px] text-[#8C9AB0]">{idx + 1} de {seq.length}{fig.page ? ` · p. ${fig.page}` : ""}{fig.hidden ? " · oculta" : ""}</p>
        </div>
        <button type="button" onClick={() => setZoom((z) => !z)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label={zoom ? "Reduzir" : "Ampliar"}>
          {zoom ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>
        {f.isAdmin && (
          <button type="button" onClick={() => onEditar(fig)} className="grid h-9 w-9 place-items-center rounded-full bg-[#A78BFA]/25 text-white" aria-label="Editar imagem">
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className={cn("relative min-h-0 flex-1", zoom ? "overflow-auto" : "grid place-items-center overflow-hidden p-2")}
        onTouchStart={(e) => { if (!zoom) toque.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (zoom || toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          toque.current = null;
          if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fig.url ?? undefined} alt={rotulo(fig)} onClick={() => setZoom((z) => !z)}
          className={cn("bg-white", zoom ? "max-w-none" : "max-h-full max-w-full rounded-md object-contain")}
          style={zoom ? { width: Math.max(fig.width ?? 1600, 1200) } : undefined} />
      </div>

      {seq.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-2.5" style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}>
          <button type="button" onClick={() => ir(-1)} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white"><ChevronLeft className="h-4 w-4" /> Anterior</button>
          <span className="text-[11.5px] text-[#8C9AB0]">Deslize para os lados · toque para ampliar</span>
          <button type="button" onClick={() => ir(1)} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white">Próxima <ChevronRight className="h-4 w-4" /></button>
        </div>
      )}
    </div>,
    document.body,
  );
}

// ---------------------------------------------------------------------------
// Painel de edição (administrador)
// ---------------------------------------------------------------------------
export function PainelEdicao({ fig, p, f, fechar, aoExcluir }: {
  fig: FiguraComUrl | null; p: Procedimento; f: Figuras; fechar: () => void; aoExcluir: (id: string) => void;
}) {
  const [legenda, setLegenda] = useState("");
  const [ref, setRef] = useState("");
  const [etapa, setEtapa] = useState<string>("");
  const [publica, setPublica] = useState(false);
  const [salvando, setSalvando] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmar, setConfirmar] = useState(false);
  const troca = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fig) return;
    setLegenda(fig.caption ?? "");
    setRef(fig.fig_ref ?? "");
    setEtapa(fig.step_index === null || fig.step_index === undefined ? "" : String(fig.step_index));
    setPublica(fig.visibility === "public");
    setErro(null); setConfirmar(false); setSalvando(null);
  }, [fig]);

  if (!fig || typeof document === "undefined") return null;
  const doLivro = fig.source === "stern2001";

  const executar = async (rotuloAcao: string, acao: () => Promise<void>, fecharDepois = true) => {
    setSalvando(rotuloAcao); setErro(null);
    try { await acao(); await f.recarregar(); if (fecharDepois) fechar(); }
    catch (e) { setErro((e as Error).message || "Falhou"); }
    finally { setSalvando(null); }
  };

  const mover = (d: number) => executar("Movendo", async () => {
    const irmas = f.sequencia;
    const i = irmas.findIndex((x) => x.id === fig.id);
    const outra = irmas[i + d];
    if (!outra) return;
    await atualizarFigura(fig.id, { sort: outra.sort });
    await atualizarFigura(outra.id, { sort: fig.sort === outra.sort ? fig.sort + d : fig.sort });
  }, false);

  return createPortal(
    <div className="fixed inset-0 z-[1010] flex items-end justify-center bg-black/60 sm:items-center" role="dialog" aria-modal="true" aria-label="Editar imagem"
      onClick={(e) => { if (e.target === e.currentTarget && !salvando) fechar(); }}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-[var(--line)] bg-[var(--film-1,#0B1526)] p-4 sm:rounded-2xl" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <div className="mb-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fig.thumbUrl ?? undefined} alt="" className="h-16 w-auto max-w-[110px] rounded border border-[var(--line)] bg-white object-contain" />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-white">Editar imagem</p>
            <p className="oh-mono text-[11px] text-[#8C9AB0]">{doLivro ? "Figura do livro (Stern 2001)" : "Imagem enviada"}{fig.hidden ? " · oculta" : ""}</p>
          </div>
          <button type="button" onClick={fechar} disabled={!!salvando} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label="Fechar"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[12px] font-semibold text-[#A3B1C6]">Legenda</span>
            <textarea value={legenda} onChange={(e) => setLegenda(e.target.value)} rows={2}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--film-3)] px-3 py-2 text-[14px] text-white outline-none focus:border-[#A78BFA]" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-[12px] font-semibold text-[#A3B1C6]">Nº da figura (opcional)</span>
              <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="ex.: 26–3"
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--film-3)] px-3 py-2 text-[14px] text-white outline-none focus:border-[#A78BFA]" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12px] font-semibold text-[#A3B1C6]">Etapa</span>
              <select value={etapa} onChange={(e) => setEtapa(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--film-3)] px-2 py-2 text-[14px] text-white outline-none focus:border-[#A78BFA]">
                <option value="">Automática / outras</option>
                {p.etapas.map((e, i) => <option key={i} value={i}>{i + 1}. {e.t}</option>)}
              </select>
            </label>
          </div>
          <fieldset>
            <legend className="mb-1 text-[12px] font-semibold text-[#A3B1C6]">Quem pode ver</legend>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setPublica(false)} aria-pressed={!publica}
                className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px]", !publica ? "border-[#A78BFA] bg-[#A78BFA]/15 text-white" : "border-[var(--line)] text-[#C9D3E1]")}>
                <Lock className="h-4 w-4" /> Só administradores
              </button>
              <button type="button" onClick={() => setPublica(true)} aria-pressed={publica}
                className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px]", publica ? "border-[#10B981] bg-[#10B981]/15 text-white" : "border-[var(--line)] text-[#C9D3E1]")}>
                <Globe className="h-4 w-4" /> Todos
              </button>
            </div>
            {publica && doLivro && (
              <p className="mt-2 rounded-lg border border-amber-400/40 bg-amber-400/[0.08] px-3 py-2 text-[12px] leading-relaxed text-amber-100">
                Figura do livro: deixar pública exige autorização da editora (Thieme). Sem autorização, mantenha só para administradores.
              </p>
            )}
            {publica && !doLivro && (
              <p className="mt-2 text-[12px] leading-relaxed text-[#A3B1C6]">Confira que a imagem não identifica paciente (rosto, nome, prontuário).</p>
            )}
          </fieldset>

          {erro && <p className="rounded-lg border border-[#F87171]/40 bg-[#F87171]/10 px-3 py-2 text-[12.5px] text-[#FCA5A5]">{erro}</p>}

          <button type="button" disabled={!!salvando}
            onClick={() => executar("Salvando", () => atualizarFigura(fig.id, {
              caption: legenda.trim(), fig_ref: ref.trim() || null,
              step_index: etapa === "" ? null : Number(etapa), visibility: publica ? "public" : "admin",
            }))}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A78BFA] px-4 py-2.5 text-[14px] font-semibold text-[#1E1B4B] disabled:opacity-60">
            {salvando === "Salvando" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />} Salvar alterações
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" disabled={!!salvando} onClick={() => mover(-1)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] text-[#C9D3E1]">
              <ArrowLeft className="h-4 w-4" /> Mover antes
            </button>
            <button type="button" disabled={!!salvando} onClick={() => mover(1)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] text-[#C9D3E1]">
              Mover depois <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" disabled={!!salvando} onClick={() => executar(fig.hidden ? "Mostrando" : "Ocultando", () => atualizarFigura(fig.id, { hidden: !fig.hidden }))}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] text-[#C9D3E1]">
              {fig.hidden ? <><Eye className="h-4 w-4" /> Mostrar de novo</> : <><EyeOff className="h-4 w-4" /> Retirar (ocultar)</>}
            </button>
            <button type="button" disabled={!!salvando} onClick={() => troca.current?.click()}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] text-[#C9D3E1]">
              {salvando === "Trocando" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Trocar arquivo
            </button>
          </div>
          <input ref={troca} type="file" accept="image/*" hidden
            onChange={(e) => {
              const a = e.target.files?.[0]; e.target.value = "";
              if (a) void executar("Trocando", () => substituirArquivo(fig, a), false);
            }} />

          {!confirmar ? (
            <button type="button" disabled={!!salvando} onClick={() => setConfirmar(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#F87171]/40 px-3 py-2 text-[13px] font-medium text-[#FCA5A5]">
              <Trash2 className="h-4 w-4" /> Excluir imagem
            </button>
          ) : (
            <div className="rounded-lg border border-[#F87171]/50 bg-[#F87171]/10 p-3">
              <p className="text-[12.5px] leading-relaxed text-[#FECACA]">Excluir apaga o arquivo de vez — não dá para desfazer. Para só tirar do site, use “Retirar (ocultar)”.</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setConfirmar(false)} className="rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] text-[#C9D3E1]">Cancelar</button>
                <button type="button" disabled={!!salvando}
                  onClick={() => executar("Excluindo", async () => { await excluirFigura(fig); aoExcluir(fig.id); })}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#DC2626] px-3 py-2 text-[13px] font-semibold text-white">
                  {salvando === "Excluindo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Excluir de vez
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
