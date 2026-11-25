import type { Infiltracao } from "./types";
import { GUIA_INJ, FONTES_INJ } from "./types";

const lista = (t: string, itens?: string[]) => (itens?.length ? `\n${t}:\n${itens.map((x) => `- ${x}`).join("\n")}` : "");

/** Resumo em texto simples para colar no prontuário, WhatsApp ou notas. */
export function textoResumoInj(p: Infiltracao): string {
  const etapas = p.etapas.map((e, i) => `${i + 1}. ${e.t}\n${e.passos.map((s) => `   - ${s}`).join("\n")}`).join("\n");
  return [
    `${p.titulo} (${GUIA_INJ[p.guia].rotulo})`,
    p.resumo,
    lista("Indicações", p.indicacoes),
    lista("Contraindicações", p.contraindicacoes),
    lista("Material", p.material),
    lista("Medicação e dose", p.medicacao),
    lista("Posição", p.posicao),
    `\nTécnica:\n${etapas}`,
    lista("Pós-procedimento", p.posop),
    lista("Pérolas", p.perolas),
    `\nFontes: ${p.fontes.join("; ")}`,
  ].join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Modelo curto de registro do procedimento no prontuário. */
export function textoRegistroInj(p: Infiltracao): string {
  return [
    `Procedimento: ${p.titulo} — lado: ____`,
    `Indicação: ____`,
    `Consentimento: riscos, benefícios e alternativas explicados; paciente de acordo.`,
    `Guia: ${GUIA_INJ[p.guia].rotulo}. Antissepsia com ____. Agulha ____.`,
    `Medicação: ____ (lote ____, validade ____).`,
    `Aspiração: ____. Intercorrências: nenhuma / ____.`,
    `Orientações: sinais de alerta (dor progressiva, calor, febre), cuidados e retorno em ____.`,
  ].join("\n");
}

export const citarFonte = (f: string) => {
  const chave = f.split(" ")[0];
  return FONTES_INJ[chave] ? `${FONTES_INJ[chave]} ${f.slice(chave.length).trim()}`.trim() : f;
};
