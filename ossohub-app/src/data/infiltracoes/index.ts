import type { Infiltracao, SecaoInj } from "./types";
import { SECOES_INJ } from "./types";
import { PRINCIPIOS } from "./principios";
import { OMBRO } from "./ombro";
import { COTOVELO } from "./cotovelo";
import { MAO } from "./mao";
import { QUADRIL } from "./quadril";
import { JOELHO } from "./joelho";
import { PE } from "./pe";
import { COLUNA } from "./coluna";
import { REGENERATIVAS } from "./regenerativas";
import { OUTROS } from "./outros";

export * from "./types";

export const INFILTRACOES: Infiltracao[] = [
  ...PRINCIPIOS, ...OMBRO, ...COTOVELO, ...MAO, ...QUADRIL, ...JOELHO, ...PE, ...COLUNA, ...REGENERATIVAS, ...OUTROS,
];

export const INJ_POR_SECAO: Record<SecaoInj, Infiltracao[]> = Object.fromEntries(
  SECOES_INJ.map((s) => [s.id, INFILTRACOES.filter((p) => p.secao === s.id)]),
) as Record<SecaoInj, Infiltracao[]>;

export function acharInfiltracao(id: string): Infiltracao | undefined {
  return INFILTRACOES.find((p) => p.id === id);
}

export const secaoInjInfo = (id: SecaoInj) => SECOES_INJ.find((s) => s.id === id);
