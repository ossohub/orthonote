import type { AreaEsp, Topico } from "./types";
import { LESOES } from "./lesoes";
import { REABILITACAO } from "./reabilitacao";
import { FISIOTERAPIA } from "./fisioterapia";
import { BIOMECANICA } from "./biomecanica";
import { ANATOMIA } from "./anatomia";
import { NUTRICAO } from "./nutricao";
import { NOTAS, NOVOS } from "./revisao";

export * from "./types";

// Aplica a revisão com as fontes adicionais: notas de comparação + temas novos.
function revisar(lista: Topico[], area: AreaEsp): Topico[] {
  const base = lista.map((t) => {
    const notas = NOTAS[t.id];
    if (!notas) return t;
    const fontes = Array.from(new Set([...t.fontes, ...notas.map((n) => n.fonte)]));
    return { ...t, notas: [...(t.notas ?? []), ...notas], fontes };
  });
  return [...base, ...NOVOS.filter((n) => n.area === area)];
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
