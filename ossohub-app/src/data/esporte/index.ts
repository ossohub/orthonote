import type { AreaEsp, Topico } from "./types";
import { LESOES } from "./lesoes";
import { REABILITACAO } from "./reabilitacao";
import { FISIOTERAPIA } from "./fisioterapia";
import { BIOMECANICA } from "./biomecanica";
import { ANATOMIA } from "./anatomia";
import { NUTRICAO } from "./nutricao";
import { NOTAS, NOVOS } from "./revisao";
import { NOTAS_SRIP, NOVOS_SRIP } from "./revisao-srip";

export * from "./types";

// Aplica a revisão com as fontes adicionais: notas de comparação + temas novos.
function revisar(lista: Topico[], area: AreaEsp): Topico[] {
  const base = lista.map((t) => {
    const notas = [...(NOTAS[t.id] ?? []), ...(NOTAS_SRIP[t.id] ?? [])];
    if (!notas.length) return t;
    const fontes = Array.from(new Set([...t.fontes, ...notas.map((n) => n.fonte)]));
    return { ...t, notas: [...(t.notas ?? []), ...notas], fontes };
  });
  const novos = [...NOVOS, ...NOVOS_SRIP].filter((n) => n.area === area).map((n) => {
    const extra = NOTAS_SRIP[n.id] ?? [];
    return extra.length ? { ...n, notas: [...(n.notas ?? []), ...extra], fontes: Array.from(new Set([...n.fontes, ...extra.map((x) => x.fonte)])) } : n;
  });
  return [...base, ...novos];
}

export const TOPICOS: Record<AreaEsp, Topico[]> = {
  lesoes: revisar(LESOES, "lesoes"),
  reabilitacao: revisar(REABILITACAO, "reabilitacao"),
  fisioterapia: revisar(FISIOTERAPIA, "fisioterapia"),
  biomecanica: revisar(BIOMECANICA, "biomecanica"),
  anatomia: revisar(ANATOMIA, "anatomia"),
  nutricao: revisar(NUTRICAO, "nutricao"),
};

export const TODOS_TOPICOS: Topico[] = Object.values(TOPICOS).flat();

export function acharTopico(id: string): Topico | undefined {
  return TODOS_TOPICOS.find((t) => t.id === id);
}
