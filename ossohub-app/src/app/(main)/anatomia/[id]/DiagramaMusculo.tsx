"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import type { Musculo, Vista } from "@/data/musculos";

const PASSOS = [
  { id: "origem", rotulo: "Origem", cor: "#60A5FA" },
  { id: "insercao", rotulo: "Inserção", cor: "#34D399" },
  { id: "acao", rotulo: "Ação", cor: "#F87171" },
  { id: "inervacao", rotulo: "Inervação", cor: "#FBBF24" },
  { id: "vascularizacao", rotulo: "Vascularização", cor: "#C084FC" },
] as const;

const TEMPO_PASSO_MS = 3800;

/** Silhuetas anatômicas simplificadas (contorno de apoio, não é atlas). */
const SILHUETA: Record<Vista, string[]> = {
  "tronco-posterior": [
    "M100 14 Q150 2 200 14 Q214 62 210 128 Q208 196 216 262 Q220 318 204 346 L96 346 Q80 318 84 262 Q92 196 90 128 Q86 62 100 14 Z",
    "M198 38 Q238 56 248 128 Q252 188 238 240 Q226 252 216 236 Q212 180 206 118 Z",
  ],
  "tronco-anterior": [
    "M100 14 Q150 2 200 14 Q214 62 210 128 Q208 196 216 262 Q220 318 204 346 L96 346 Q80 318 84 262 Q92 196 90 128 Q86 62 100 14 Z",
    "M198 38 Q238 56 248 128 Q252 188 238 240 Q226 252 216 236 Q212 180 206 118 Z",
  ],
  "braco-anterior": [
    "M120 0 Q150 -6 180 0 Q196 40 190 110 Q188 170 176 204 Q150 218 124 204 Q112 170 110 110 Q104 40 120 0 Z",
  ],
  "braco-posterior": [
    "M120 0 Q150 -6 180 0 Q196 40 190 110 Q188 170 176 204 Q150 218 124 204 Q112 170 110 110 Q104 40 120 0 Z",
  ],
  "antebraco-anterior": [
    "M108 0 Q150 -4 192 0 Q200 60 196 130 Q190 200 186 250 Q180 290 172 300 Q150 310 128 300 Q120 290 114 250 Q110 200 104 130 Q100 60 108 0 Z",
    "M128 300 Q150 312 172 300 Q188 322 182 348 Q172 368 150 368 Q128 368 118 348 Q112 322 128 300 Z",
  ],
  "antebraco-posterior": [
    "M108 0 Q150 -4 192 0 Q200 60 196 130 Q190 200 186 250 Q180 290 172 300 Q150 310 128 300 Q120 290 114 250 Q110 200 104 130 Q100 60 108 0 Z",
    "M128 300 Q150 312 172 300 Q188 322 182 348 Q172 368 150 368 Q128 368 118 348 Q112 322 128 300 Z",
  ],
};

/** Ossos de referência (linhas finas) por vista. */
const OSSOS: Record<Vista, string[]> = {
  "tronco-posterior": ["M150 14 L150 340", "M120 70 Q150 56 176 84 Q168 120 128 128 Z"],
  "tronco-anterior": ["M108 52 Q150 38 192 52", "M150 60 L150 330"],
  "braco-anterior": ["M150 4 L150 200"],
  "braco-posterior": ["M150 4 L150 200"],
  "antebraco-anterior": ["M138 0 L138 300", "M162 0 L162 300"],
  "antebraco-posterior": ["M138 0 L138 300", "M162 0 L162 300"],
};

export function DiagramaMusculo({ m }: { m: Musculo }) {
  const [passo, setPasso] = useState(0);
  const [tocando, setTocando] = useState(true);
  const [ciclo, setCiclo] = useState(0);
  const { profile, loading } = useUser();
  const isAdmin = profile?.app_role === "admin";

  useEffect(() => {
    if (!tocando) return;
    const t = setTimeout(() => {
      setPasso((p) => {
        const n = (p + 1) % PASSOS.length;
        if (n === 0) setCiclo((c) => c + 1);
        return n;
      });
    }, TEMPO_PASSO_MS);
    return () => clearTimeout(t);
  }, [passo, tocando]);

  // Reinicia animações do passo quando o músculo muda
  useEffect(() => { setPasso(0); setCiclo(0); }, [m.id]);

  const atual = PASSOS[passo];
  const [ox, oy] = m.origemPonto;
  const [ix, iy] = m.insercaoPonto;
  const { cx, cy } = m.forma;
  const rot = m.forma.rot ? `rotate(${m.forma.rot} ${cx} ${cy})` : undefined;
  const caminho = `M${ox} ${oy} Q${(ox + ix) / 2 + (ix > ox ? -12 : 12)} ${(oy + iy) / 2} ${ix} ${iy}`;
  const k = `${m.id}-${ciclo}`;

  // Animação só para administradores
  if (loading || !isAdmin) return null;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border border-[var(--line)] bg-[#0B1526] p-3">
          <svg viewBox="0 0 300 360" className="w-full" role="img" aria-label={`Desenho esquemático de ${m.nome}`}>
            <defs>
              <radialGradient id="musc" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="100%" stopColor="#B91C1C" />
              </radialGradient>
              <filter id="brilho" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <style>{`
              @keyframes ohContorno { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
              @keyframes ohPreenche { from { opacity: 0 } to { opacity: 1 } }
              @keyframes ohSurge { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
              @keyframes ohPulso { 0%,100% { r: 6 } 50% { r: 10 } }
              @keyframes ohCorre { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
              @keyframes ohViaja { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
              .oh-contorno { stroke-dasharray: 1; animation: ohContorno 1.1s ease-out both; }
              .oh-preenche { animation: ohPreenche .7s ease-out .6s both; }
              .oh-surge { animation: ohSurge .5s ease-out both; }
              .oh-pulso { animation: ohPulso 1.2s ease-in-out infinite; }
              .oh-corre { stroke-dasharray: 1; animation: ohCorre 1.2s ease-out both; }
              .oh-viaja { offset-path: var(--caminho); animation: ohViaja 1.6s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
            `}</style>

            {/* Silhueta e ossos de referência */}
            <g fill="#13223A" stroke="#33507A" strokeWidth={1.6} strokeLinejoin="round">
              {SILHUETA[m.vista].map((d, i) => <path key={i} d={d} />)}
            </g>
            <g fill="none" stroke="#3F5B86" strokeWidth={1.2} strokeDasharray="3 4">
              {OSSOS[m.vista].map((d, i) => <path key={i} d={d} />)}
            </g>

            {/* Músculo: contorno desenha, depois preenche */}
            <ellipse key={`e-${k}`} cx={cx} cy={cy} rx={m.forma.rx} ry={m.forma.ry} transform={rot}
              fill="none" stroke="#FCA5A5" strokeWidth={2.5} pathLength={1} className="oh-contorno" filter="url(#brilho)" />
            <ellipse key={`f-${k}`} cx={cx} cy={cy} rx={m.forma.rx} ry={m.forma.ry} transform={rot}
              fill="url(#musc)" stroke="none" className="oh-preenche" opacity={0.85} />

            {/* Passo 2: linha de tração origem → inserção com ponto correndo */}
            {passo >= 1 && (
              <g key={`l-${k}`}>
                <path d={caminho} fill="none" stroke="#E2E8F0" strokeWidth={2} strokeDasharray="4 4" className="oh-corre" pathLength={1} />
                {passo === 1 && (
                  <circle r={4} fill="#E2E8F0" style={{ offsetPath: `path("${caminho}")`, animation: "ohViaja 1.6s ease-in-out infinite" } as React.CSSProperties} />
                )}
              </g>
            )}

            {/* Callout de origem */}
            <g key={`o-${k}`} className="oh-surge" style={{ animationDelay: "0.2s" }}>
              <line x1={ox} y1={oy} x2={24} y2={Math.max(24, oy - 10)} stroke="#60A5FA" strokeWidth={1.3} />
              <circle cx={ox} cy={oy} r={6} fill="#60A5FA" stroke="#fff" strokeWidth={1.5} className={cn(passo === 0 && "oh-pulso")} />
              <rect x={6} y={Math.max(14, oy - 22)} width={66} height={20} rx={5} fill="#60A5FA" />
              <text x={39} y={Math.max(28, oy - 8)} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0B1526">ORIGEM</text>
            </g>

            {/* Callout de inserção */}
            {passo >= 1 && (
              <g key={`i-${k}`} className="oh-surge">
                <line x1={ix} y1={iy} x2={232} y2={Math.min(330, iy + 14)} stroke="#34D399" strokeWidth={1.3} />
                <circle cx={ix} cy={iy} r={6} fill="#34D399" stroke="#fff" strokeWidth={1.5} className={cn(passo === 1 && "oh-pulso")} />
                <rect x={228} y={Math.min(322, iy + 4)} width={68} height={20} rx={5} fill="#34D399" />
                <text x={262} y={Math.min(336, iy + 18)} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#0B1526">INSERÇÃO</text>
              </g>
            )}

            {/* Ação: seta curva animada no sentido da inserção */}
            {passo >= 2 && (
              <g key={`a-${k}`} className="oh-surge">
                <path d={`M${ix - 26} ${iy - 6} Q${ix - 6} ${iy - 34} ${ix + 22} ${iy - 18}`} fill="none" stroke="#F87171" strokeWidth={3}
                  strokeLinecap="round" pathLength={1} className="oh-corre" />
                <path d={`M${ix + 22} ${iy - 18} l-9 -2 M${ix + 22} ${iy - 18} l-2 9`} stroke="#F87171" strokeWidth={3} strokeLinecap="round" />
                <rect x={100} y={6} width={92} height={20} rx={5} fill="#F87171" className="oh-surge" />
                <text x={146} y={20} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0B1526">AÇÃO</text>
              </g>
            )}

            {/* Inervação: nervo tracejado amarelo até o músculo */}
            {passo >= 3 && (
              <g key={`n-${k}`} className="oh-surge">
                <path d={`M150 300 Q190 280 ${cx + 4} ${cy + 10}`} fill="none" stroke="#FBBF24" strokeWidth={2.2} strokeDasharray="5 3" />
                <rect x={6} y={322} width={88} height={20} rx={5} fill="#FBBF24" />
                <text x={50} y={336} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0B1526">NERVO</text>
              </g>
            )}

            {/* Vascularização: artéria tracejada lilás até o músculo */}
            {passo >= 4 && (
              <g key={`v-${k}`} className="oh-surge">
                <path d={`M270 300 Q230 280 ${cx - 4} ${cy + 16}`} fill="none" stroke="#C084FC" strokeWidth={2.2} strokeDasharray="2 3" />
                <rect x={196} y={322} width={96} height={20} rx={5} fill="#C084FC" />
                <text x={244} y={336} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#0B1526">ARTÉRIA</text>
              </g>
            )}
          </svg>
          <p className="mt-2 text-center text-[11px] text-[#8C9AB0]">Desenho esquemático · {m.nome}</p>
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
            <button type="button" onClick={() => { setPasso(0); setCiclo((c) => c + 1); setTocando(true); }}
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
