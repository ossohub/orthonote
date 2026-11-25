// Aba "Infiltrações e procedimentos minimamente invasivos".
// Resumos práticos com palavras próprias a partir da literatura enviada pelo Dr. Roberto (lista em FONTES_INJ).
// Figuras dos livros ficam só para administradores (tabela injection_images; bucket privado).

export type SecaoInj =
  | "principios" | "ombro" | "cotovelo" | "mao" | "quadril" | "joelho" | "pe" | "coluna" | "regenerativas" | "outros";

/** Como guiar a agulha. */
export type GuiaInj = "palpacao" | "us" | "fluoro" | "na";

export interface EtapaInj { t: string; passos: string[] }

export interface Infiltracao {
  id: string;
  titulo: string;
  secao: SecaoInj;
  resumo: string;
  guia: GuiaInj;
  /** Observação curta sobre o guia (ex.: "US melhora a precisão"). */
  guiaNota?: string;
  indicacoes: string[];
  contraindicacoes?: string[];
  /** Agulha, seringa e outros materiais. */
  material?: string[];
  /** Medicação, dose e volume. */
  medicacao?: string[];
  posicao?: string[];
  etapas: EtapaInj[];
  posop?: string[];
  complicacoes?: string[];
  perolas?: string[];
  evitar?: string[];
  /** Ex.: "SAUNDERS p. 57–58" (páginas do PDF). */
  fontes: string[];
  tags?: string[];
}

export const SECOES_INJ: { id: SecaoInj; titulo: string; curto: string; desc: string }[] = [
  { id: "principios", titulo: "Princípios e segurança", curto: "Princípios", desc: "Medicamentos e doses, técnica, aspiração, imagem, situações especiais e aspectos médico-legais." },
  { id: "ombro", titulo: "Ombro", curto: "Ombro", desc: "Glenoumeral, subacromial, acromioclavicular, bíceps, manguito e bloqueio supraescapular." },
  { id: "cotovelo", titulo: "Cotovelo", curto: "Cotovelo", desc: "Articulação, epicondilites, bursa do olécrano e inserção do bíceps." },
  { id: "mao", titulo: "Punho e mão", curto: "Punho e mão", desc: "Radiocarpal, RUD, rizartrose, IF/MCF, De Quervain, dedo em gatilho, túnel do carpo e cistos." },
  { id: "quadril", titulo: "Quadril e pelve", curto: "Quadril", desc: "Intra-articular, peritrocantérica, isquioglútea, iliopsoas, meralgia e banda iliotibial." },
  { id: "joelho", titulo: "Joelho", curto: "Joelho", desc: "Aspiração e infiltração, pata de ganso, bursas, ligamentos e Baker." },
  { id: "pe", titulo: "Tornozelo e pé", curto: "Pé e tornozelo", desc: "Tibiotalar, subtalar, seio do tarso, fáscia plantar, Morton, MTF, túnel do tarso e tendões." },
  { id: "coluna", titulo: "Coluna (guiada por imagem)", curto: "Coluna", desc: "Epidurais, facetárias, ramo medial, sacroilíaca, gânglio ímpar, blood patch e bloqueios simpáticos." },
  { id: "regenerativas", titulo: "Regenerativas e alternativas", curto: "Regenerativas", desc: "PRP, ácido hialurônico, proloterapia, células, ondas de choque e outras opções." },
  { id: "outros", titulo: "Outros sítios", curto: "Outros", desc: "ATM, nervo occipital maior, pontos-gatilho e parede torácica." },
];

export const GUIA_INJ: Record<GuiaInj, { rotulo: string; cor: string }> = {
  palpacao: { rotulo: "Por palpação", cor: "#6EE7B7" },
  us: { rotulo: "Guiada por ultrassom", cor: "#7FE7EE" },
  fluoro: { rotulo: "Guiada por fluoroscopia", cor: "#FBBF24" },
  na: { rotulo: "Conceitos", cor: "#A3B1C6" },
};

export const FONTES_INJ: Record<string, string> = {
  SAUNDERS: "Saunders S, Longworth S. Injection Techniques in Orthopaedics and Sports Medicine: a practical manual. 3ª ed. Churchill Livingstone/Elsevier; 2006.",
  SILVER: "Silver D (ed.). Silver's Joint and Soft Tissue Injection: Injecting with Confidence. 6ª ed. CRC Press; 2019.",
  FISCHER: "Fischer J. Atlas of Injection Therapy in Pain Management. Thieme.",
  MSK: "Bhatia M (ed.). Musculoskeletal Injections and Alternative Options: a practical guide to 'what, when, and how?'. CRC Press; 2019.",
  EASY: "Easy Injections. Butterworth-Heinemann/Elsevier; 2007.",
  CARM: "Wang LH, McKenzie-Brown AM, Hord AH. The Handbook of C-Arm Fluoroscopy-Guided Spinal Injections. CRC Press; 2006.",
  POCKET: "Sinha A, Kothari G (eds.). Pocket Handbook of Spinal Injections. Demos Medical; 2014.",
  MASSOUD: "Massoud M (org.). Joints & Spine Injections — notas. 2023.",
  REGEN: "Trebinjac S, Nair MK. Regenerative Injections in Sports Medicine: an evidence-based approach. Springer.",
  LEGAL: "Channey RS, Channey RS (eds.). Medico-Legal Pain Management Injection Techniques: concerns, aspects & considerations — vol. 1 (cabeça, pescoço e ombro).",
};
