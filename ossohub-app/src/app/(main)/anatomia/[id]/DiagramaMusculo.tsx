"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Musculo, Vista } from "@/data/musculos";

const PASSOS = [
  { id: "origem", rotulo: "Origem", cor: "#60A5FA" },
  { id: "insercao", rotulo: "Inserção", cor: "#34D399" },
  { id: "acao", rotulo: "Ação", cor: "#F87171" },
  { id: "inervacao", rotulo: "Inervação", cor: "#FBBF24" },
  { id: "vascularizacao", rotulo: "Vascularização", cor: "#C084FC" },
] as const;

const TEMPO_PASSO_MS = 3200;

/** Silhueta de apoio de cada vista (traço neutro, só para situar o músculo). */
function Base({ vista }: { vista: Vista }) {
  const cor = "#2A3A55";
  const estilo = { fill: "none", stroke: cor, strokeWidth: 2, strokeLinejoin: "round" as const };
  if (vista === "tronco-posterior" || vista === "tronco-anterior") {
    return (
      <g {...estilo}>
        <path d="M95 20 Q150 6 205 20 L215 150 Q220 250 205 330 L95 330 Q80 250 85 150 Z" />
        <path d="M205 40 Q245 50 255 130 L250 240 Q240 260 225 245 L215 130 Z" />
        {vista === "tronco-posterior"
          ? <path d="M150 20 L150 330" strokeDasharray="4 6" />
          : <path d="M110 50 Q150 38 190 50" />}
      </g>
    );
  }
  if (vista === "braco-anterior" || vista === "braco-posterior") {
    return <path {...estilo} d="M110 0 H190 V190 Q190 215 150 220 Q110 215 110 190 Z" />;
  }
  return (
    <g {...estilo}>
      <path d="M100 0 H200 Q210 150 190 280 Q185 300 150 310 Q115 300 110 280 Q90 150 100 0 Z" />
      <ellipse cx="150" cy="335" rx="28" ry="24" />
    </g>
  );
}

export function DiagramaMusculo({ m }: { m: Musculo }) {
  const [passo, setPasso] = useState(0);
  const [tocando, setTocando] = useState(true);

  useEffect(() => {
    if (!tocando) return;
    const t = setTimeout(() => setPasso((p) => (p + 1) % PASSOS.length), TEMPO_PASSO_MS);
    return () => clearTimeout(t);
  }, [passo, tocando]);

  const atual = PASSOS[passo];
  const [ox, oy] = m.origemPonto;
  const [ix, iy] = m.insercaoPonto;
  const mostraInsercao = passo >= 1;
  const mostraAcao = passo >= 2;
  const mostraLinha = passo >= 1;
  const ativo = passo >= 0;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
        <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-[var(--line)] bg-[#0B1526] p-3">
          <svg viewBox="0 0 300 360" className="w-full" role="img" aria-label={`Desenho esquemático de ${m.nome}`}>
            <style>{`
              @keyframes ohPulso { 0%,100% { r: 6; opacity: 1 } 50% { r: 10; opacity: .55 } }
              @keyframes ohPreenche { from { opacity: 0 } to { opacity: .55 } }
              @keyframes ohDesenha { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
              @keyframes ohSurge { from { opacity: 0; transform: scale(.4) } to { opacity: 1; transform: scale(1) } }
              .oh-pulso { animation: ohPulso 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
              .oh-preenche { animation: ohPreenche .6s ease-out both; }
              .oh-desenha { stroke-dasharray: 1; animation: ohDesenha .9s ease-out both; }
              .oh-surge { animation: ohSurge .5s ease-out both; transform-box: fill-box; transform-origin: center; }
              @media (prefers-reduced-motion: reduce) { .oh-pulso, .oh-preenche, .oh-desenha, .oh-surge { animation: none; } }
            `}</style>
            <Base vista={m.vista} />

            {/* Músculo: aparece pronto a partir do passo 1 (origem) */}
            {ativo && (
              <ellipse key={`m-${m.id}`} cx={m.forma.cx} cy={m.forma.cy} rx={m.forma.rx} ry={m.forma.ry}
                transform={m.forma.rot ? `rotate(${m.forma.rot} ${m.forma.cx} ${m.forma.cy})` : undefined}
                fill="#60A5FA" stroke="#93C5FD" strokeWidth={1.5} className="oh-preenche" />
            )}

            {/* Linha de origem até inserção (desenha no passo 2) */}
            {mostraLinha && (
              <line key={`l-${m.id}`} x1={ox} y1={oy} x2={ix} y2={iy} pathLength={1}
                stroke="#E2E8F0" strokeWidth={2.5} strokeLinecap="round" className="oh-desenha" />
            )}

            {/* Origem */}
            <g>
              <circle cx={ox} cy={oy} r={6} fill="#60A5FA" stroke="#fff" strokeWidth={1.5}
                className={cn(passo === 0 && "oh-pulso")} />
            </g>

            {/* Inserção */}
            {mostraInsercao && (
              <g className="oh-surge" key={`i-${m.id}`}>
                <circle cx={ix} cy={iy} r={6} fill="#34D399" stroke="#fff" strokeWidth={1.5}
                  className={cn(passo === 1 && "oh-pulso")} />
              </g>
            )}

            {/* Seta de ação no sentido da inserção */}
            {mostraAcao && (
              <g key={`a-${m.id}`} className="oh-surge">
                <path d={`M${ix} ${iy} l-7 -10 M${ix} ${iy} l9 -6`} stroke="#F87171" strokeWidth={3} strokeLinecap="round" fill="none" />
              </g>
            )}
          </svg>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-[#8C9AB0]">
            <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" />Origem</span>
            <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />Inserção</span>
            <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />Ação</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Etapas">
            {PASSOS.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={i === passo}
                onClick={() => { setPasso(i); setTocando(false); }}
                className={cn("rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors",
                  i === passo ? "border-transparent text-[#0B1526]" : "border-[var(--line)] text-[#C9D3E1] hover:text-white")}
                style={i === passo ? { background: p.cor } : undefined}>
                {i + 1}. {p.rotulo}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-4 sm:p-5" aria-live="polite">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide" style={{ color: atual.cor }}>
              {passo + 1}. {atual.rotulo}
            </p>
            {atual.id === "origem" && <Lista itens={m.origem} />}
            {atual.id === "insercao" && <Lista itens={m.insercao} />}
            {atual.id === "acao" && <p className="text-[15px] leading-relaxed text-[#DCE3EE]">{m.acao}</p>}
            {atual.id === "inervacao" && <p className="text-[15px] leading-relaxed text-[#DCE3EE]">{m.inervacao}</p>}
            {atual.id === "vascularizacao" && <Lista itens={m.vascularizacao} />}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button type="button" onClick={() => setTocando((t) => !t)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] font-medium text-[#C9D3E1] hover:text-white">
              {tocando ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {tocando ? "Pausar" : "Reproduzir"}
            </button>
            <button type="button" onClick={() => { setPasso(0); setTocando(true); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[13px] font-medium text-[#C9D3E1] hover:text-white">
              <RotateCcw className="h-4 w-4" /> Repetir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="space-y-1.5">
      {itens.map((t, i) => (
        <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-[#DCE3EE]">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9D3E1]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
