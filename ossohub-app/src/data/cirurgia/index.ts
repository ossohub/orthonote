import type { Procedimento, SecaoCir } from "./types";
import { SECOES_CIR } from "./types";
import { OMBRO } from "./ombro";
import { COTOVELO } from "./cotovelo";
import { MAO } from "./mao";
import { QUADRIL } from "./quadril";
import { JOELHO } from "./joelho";
import { PE } from "./pe";
import { COLUNA } from "./coluna";
import { PEDIATRIA_CIR } from "./pediatria";
import { DIVERSOS } from "./diversos";

export * from "./types";

export const PROCEDIMENTOS: Procedimento[] = [
  ...OMBRO, ...COTOVELO, ...MAO, ...QUADRIL, ...JOELHO, ...PE, ...COLUNA, ...PEDIATRIA_CIR, ...DIVERSOS,
].sort((a, b) => a.cap - b.cap);

export const POR_SECAO: Record<SecaoCir, Procedimento[]> = Object.fromEntries(
  SECOES_CIR.map((s) => [s.id, PROCEDIMENTOS.filter((p) => p.secao === s.id)]),
) as Record<SecaoCir, Procedimento[]>;

export function acharProcedimento(id: string): Procedimento | undefined {
  return PROCEDIMENTOS.find((p) => p.id === id);
}

export const secaoInfo = (id: SecaoCir) => SECOES_CIR.find((s) => s.id === id);
