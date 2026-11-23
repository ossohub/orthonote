// Estrutura da base de prescrições do Pronto-Socorro.
// Conteúdo escrito com palavras próprias a partir de doses e condutas
// padronizadas, conferidas com as referências listadas em FONTES.

export type Area = "adulto" | "pediatria";

/** Cálculo automático por peso (só na pediatria ou em doses mg/kg). */
export interface PorPeso {
  /** dose em unidade/kg — número ou faixa [mín, máx] */
  d: number | [number, number];
  /** unidade da dose (padrão mg) */
  u?: "mg" | "mcg" | "UI" | "mL" | "g";
  /** "dose" = por tomada (padrão); "dia" = total diário, dividido em n tomadas */
  por?: "dose" | "dia";
  n?: number;
  /** dose máxima por tomada, na mesma unidade */
  max?: number;
  /** concentração da apresentação (unidade por mL) para converter em volume */
  c?: number;
  /** como mostrar o volume */
  f?: "mL" | "gotas";
  /** gotas por mL (padrão 20) */
  gpm?: number;
}

export interface Item {
  /** medicamento + apresentação (ex.: "Dipirona 500 mg/mL — ampola 2 mL") */
  m: string;
  /** posologia por extenso: dose, via, diluição, frequência, duração */
  p: string;
  /** observação curta (ajuste renal, contraindicação, nome comercial...) */
  o?: string;
  /** cálculo pelo peso */
  k?: PorPeso;
}

export interface Bloco {
  /** "No PS", "Alta — receita", "Internação", "Opção 2"... */
  t: string;
  itens: Item[];
}

export interface Condicao {
  id: string;
  titulo: string;
  area: Area;
  sistema: string;
  /** palavras extras para a busca */
  tags?: string[];
  /** uma linha: quando pensar / objetivo */
  resumo: string;
  manejo: string[];
  alarme?: string[];
  rx: Bloco[];
  /** comparação com as referências (revisão diária): concorda, diverge ou acrescenta */
  notas?: NotaPS[];
  fontes: FonteId[];
}

/** Nota de revisão: como uma referência se posiciona em relação ao conteúdo. */
export interface NotaPS {
  fonte: FonteId;
  tipo: "concorda" | "diverge" | "acrescenta";
  texto: string;
}

export type FonteId = "PSZ" | "PRV" | "GPP" | "MPP" | "HGWA" | "MDR";

export const FONTES: Record<FonteId, string> = {
  PSZ: "Guia de Prescrições da Emergência — PS Zerado (2ª ed., 2025; e 1ª ed.)",
  PRV: "Prescrição no Pronto-Socorro — Paciente Adulto, Ficha Verde (Prescrevendo, 2024)",
  GPP: "Guia do Plantonista — Pediatria",
  MPP: "Manuais de Prescrição Pediátrica (Oliveira Aguiar 2024; Guia Rápido de Medicamentos em Pediatria)",
  HGWA: "HGWA — Medicamentos mais utilizados em Pediatria (tabela de diluição)",
  MDR: "Guia do Plantonista 2013 — Medicações e posologias em pediatria (MedResumos)",
};
