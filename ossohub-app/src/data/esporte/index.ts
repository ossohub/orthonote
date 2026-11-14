import type { AreaEsp, Topico } from "./types";
import { LESOES } from "./lesoes";
import { REABILITACAO } from "./reabilitacao";
import { FISIOTERAPIA } from "./fisioterapia";
import { BIOMECANICA } from "./biomecanica";
import { ANATOMIA } from "./anatomia";
import { NUTRICAO } from "./nutricao";

export * from "./types";

export const TOPICOS: Record<AreaEsp, Topico[]> = {
  lesoes: LESOES,
  reabilitacao: REABILITACAO,
  fisioterapia: FISIOTERAPIA,
  biomecanica: BIOMECANICA,
  anatomia: ANATOMIA,
  nutricao: NUTRICAO,
};

export const TODOS_TOPICOS: Topico[] = Object.values(TOPICOS).flat();

export function acharTopico(id: string): Topico | undefined {
  return TODOS_TOPICOS.find((t) => t.id === id);
}
