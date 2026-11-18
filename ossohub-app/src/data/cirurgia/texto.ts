import type { Procedimento } from "./types";
import { FONTE_CIR } from "./types";

const lista = (titulo: string, itens: string[] | undefined) =>
  itens?.length ? ["", `${titulo.toUpperCase()}`, ...itens.map((i) => `• ${i}`)] : [];

/** Roteiro completo para estudo ou revisão pré-operatória. */
export function textoRoteiro(p: Procedimento) {
  const l: string[] = [
    `${p.titulo} (cap. ${p.cap})`,
    p.resumo,
    ...lista("Indicações", p.indicacoes),
    ...lista("Contraindicações", p.contraindicacoes),
    ...lista("Preparo", p.preparo),
    ...lista("Material", p.material),
    ...lista("Posição", p.posicao),
    ...lista("Anestesia", p.anestesia),
    "",
    "TÉCNICA",
  ];
  p.etapas.forEach((e, i) => {
    l.push(`${i + 1}. ${e.t}${e.figs?.length ? ` (Fig. ${e.figs.join(", ")})` : ""}`);
    e.passos.forEach((s) => l.push(`   - ${s}`));
  });
  l.push(...lista("Pérolas", p.perolas), ...lista("Evitar", p.evitar), ...lista("Pós-operatório", p.posop));
  l.push("", `Fonte: ${FONTE_CIR} Resumo com palavras próprias — OssoHub.`);
  return l.join("\n");
}

/** Esqueleto de descrição cirúrgica com as etapas do procedimento, para completar. */
export function textoModeloDescricao(p: Procedimento) {
  const l: string[] = [
    `DESCRIÇÃO CIRÚRGICA — ${p.titulo}`,
    "",
    "Paciente: ____________________   Prontuário: __________   Data: ___/___/______",
    "Lado: ( ) direito ( ) esquerdo",
    "Diagnóstico pré-operatório: ____________________",
    "Diagnóstico pós-operatório: ____________________",
    "Cirurgião: __________   Auxiliar(es): __________   Anestesista: __________",
    `Anestesia: ${p.anestesia?.length ? "__________ (opções: " + p.anestesia.join(" ") + ")" : "__________"}`,
    "Antibioticoprofilaxia: __________   Garrote: ( ) não ( ) sim — ____ mmHg, ____ min",
    `Posicionamento: ${p.posicao.join(" ")}`,
    "Antissepsia e colocação de campos estéreis.",
    "",
    "DESCRIÇÃO",
  ];
  p.etapas.forEach((e, i) => l.push(`${i + 1}. ${e.t}: ______________________________`));
  l.push(
    "",
    "Implantes / materiais (tipo, tamanho, lote): ____________________",
    "Enxerto: ____________   Drenos: ____________",
    "Controle radioscópico: ( ) não ( ) sim — ____________",
    "Sangramento estimado: ______ mL   Intercorrências: ____________",
    "Contagem de compressas e instrumentais conferida.",
    "Curativo / imobilização: ____________",
    "Paciente encaminhado à ____ em condições ____________.",
  );
  return l.join("\n");
}
