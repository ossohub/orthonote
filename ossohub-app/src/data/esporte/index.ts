import type { AreaEsp, Topico } from "./types";
import { LESOES } from "./lesoes";
import { REABILITACAO } from "./reabilitacao";
import { FISIOTERAPIA } from "./fisioterapia";
import { BIOMECANICA } from "./biomecanica";
import { ANATOMIA } from "./anatomia";
import { NUTRICAO } from "./nutricao";
import { NOTAS, NOVOS } from "./revisao";
import { NOTAS_SRIP, NOVOS_SRIP } from "./revisao-srip";
import { NOTAS_READ, NOVOS_READ } from "./revisao-read";
import { NOTAS_DIARIA, NOVOS_DIARIA } from "./revisao-diaria";
import type { Nota } from "./types";

// Todas as revisões por fonte adicional (ordem = ordem de exibição das notas).
const REVISOES: { notas: Record<string, Nota[]>; novos: Topico[] }[] = [
  { notas: NOTAS, novos: NOVOS },
  { notas: NOTAS_SRIP, novos: NOVOS_SRIP },
  { notas: NOTAS_READ, novos: NOVOS_READ },
  { notas: NOTAS_DIARIA, novos: NOVOS_DIARIA },
];
const NOVOS_TODOS = REVISOES.flatMap((r) => r.novos);
export const NOVOS_IDS = new Set(NOVOS_TODOS.map((n) => n.id));
const notasDe = (id: string) => REVISOES.flatMap((r) => r.notas[id] ?? []);

export * from "./types";

// Aplica a revisão com as fontes adicionais: notas de comparação + temas novos.
function revisar(lista: Topico[], area: AreaEsp): Topico[] {
  const juntar = (t: Topico): Topico => {
    const extra = notasDe(t.id);
    if (!extra.length) return t;
    return { ...t, notas: [...(t.notas ?? []), ...extra], fontes: Array.from(new Set([...t.fontes, ...extra.map((n) => n.fonte)])) };
  };
  return [...lista.map(juntar), ...NOVOS_TODOS.filter((n) => n.area === area).map(juntar)];
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
