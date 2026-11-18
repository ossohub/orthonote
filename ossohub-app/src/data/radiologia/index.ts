import type { Medida, RegiaoRx } from "./types";
import { GERAL, MEMBRO_INFERIOR } from "./membro-inferior";
import { PELVE_QUADRIL, QUADRIL_INFANTIL } from "./quadril";
import { JOELHO } from "./joelho";
import { TORNOZELO, PE } from "./pe-tornozelo";
import { OMBRO, COTOVELO, PUNHO_MAO } from "./membro-superior";
import { COLUNA_CERVICAL, COLUNA_TORACOLOMBAR } from "./coluna";
import { REGIOES_RX } from "./types";

export * from "./types";

export const MEDIDAS: Medida[] = [
  ...MEMBRO_INFERIOR, ...PELVE_QUADRIL, ...QUADRIL_INFANTIL, ...JOELHO, ...TORNOZELO, ...PE,
  ...OMBRO, ...COTOVELO, ...PUNHO_MAO, ...COLUNA_CERVICAL, ...COLUNA_TORACOLOMBAR, ...GERAL,
];

export const MEDIDAS_POR_REGIAO: Record<RegiaoRx, Medida[]> = Object.fromEntries(
  REGIOES_RX.map((r) => [r.id, MEDIDAS.filter((m) => m.regiao === r.id)]),
) as Record<RegiaoRx, Medida[]>;

export function acharMedida(id: string): Medida | undefined {
  return MEDIDAS.find((m) => m.id === id);
}

export const tituloRegiao = (id: RegiaoRx) => REGIOES_RX.find((r) => r.id === id)?.titulo ?? id;
