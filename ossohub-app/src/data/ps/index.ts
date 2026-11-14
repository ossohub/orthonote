import type { Condicao, PorPeso } from "./types";
import { ADULTO_1 } from "./adulto-1";
import { ADULTO_2 } from "./adulto-2";
import { ADULTO_3 } from "./adulto-3";
import { ADULTO_4 } from "./adulto-4";
import { PEDIATRIA } from "./pediatria";

export * from "./types";

export const ADULTO: Condicao[] = [...ADULTO_1, ...ADULTO_2, ...ADULTO_3, ...ADULTO_4];
export { PEDIATRIA };

const fmt = (n: number, casas = 1) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: casas, minimumFractionDigits: 0 });

/** Converte uma dose por peso em texto ("300–500 mg = 12–20 gotas"). */
export function calcularDose(k: PorPeso, peso: number): { dose: string; volume?: string; teto: boolean } | null {
  if (!peso || peso <= 0) return null;
  const u = k.u ?? "mg";
  const [a, b] = Array.isArray(k.d) ? k.d : [k.d, k.d];
  const div = k.por === "dia" ? k.n ?? 1 : 1;
  let lo = (a * peso) / div;
  let hi = (b * peso) / div;
  let teto = false;
  if (k.max != null) {
    if (hi > k.max) { hi = k.max; teto = true; }
    if (lo > k.max) lo = k.max;
  }
  const casas = u === "UI" ? 0 : lo < 1 ? 2 : lo < 10 ? 1 : 0;
  const faixa = (x: number, y: number, c: number) => (Math.abs(x - y) < 1e-9 ? fmt(x, c) : `${fmt(x, c)}–${fmt(y, c)}`);
  const dose = `${faixa(lo, hi, casas)} ${u}${k.por === "dia" && div > 1 ? " por dose" : ""}`;
  let volume: string | undefined;
  if (k.c && u !== "mL") {
    const vlo = lo / k.c, vhi = hi / k.c;
    if (k.f === "gotas") {
      const g = k.gpm ?? 20;
      volume = `${faixa(Math.round(vlo * g), Math.round(vhi * g), 0)} gotas`;
    } else {
      volume = `${faixa(vlo, vhi, vlo < 1 ? 2 : 1)} mL`;
    }
  }
  return { dose, volume, teto };
}

export const SISTEMAS = (lista: Condicao[]) => Array.from(new Set(lista.map((c) => c.sistema)));
