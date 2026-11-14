// Medicina Esportiva — conteúdo escrito com palavras próprias, organizado a
// partir dos temas das referências em FONTES_ESP (não reproduz texto dos livros).

export type AreaEsp = "biomecanica" | "nutricao" | "anatomia" | "lesoes" | "fisioterapia" | "reabilitacao";

export interface Secao { t: string; itens: string[] }
export interface Tabela { cab: string[]; linhas: string[][] }
export interface Fase {
  nome: string;
  tempo?: string;
  objetivos: string[];
  exercicios: string[];
  criterios: string[];
}

export interface Topico {
  id: string;
  titulo: string;
  area: AreaEsp;
  /** agrupador da lista (região do corpo, tema...) */
  grupo: string;
  tags?: string[];
  resumo: string;
  secoes: Secao[];
  tabela?: Tabela;
  fases?: Fase[];
  /** id de outro tópico relacionado (ex.: lesão → protocolo de reabilitação) */
  ver?: string[];
  fontes: FonteEsp[];
}

export type FonteEsp =
  | "HAFF" | "PRESTES" | "LIPPERT" | "SPBIO" | "SPINE" | "NUTRI" | "INTEG" | "METAB" | "ANTRO"
  | "CUT" | "REHAB" | "PTR" | "GARD" | "HODLER" | "WINNICK" | "BODYW" | "MORAN";

export const FONTES_ESP: Record<FonteEsp, string> = {
  HAFF: "Haff & Triplett — Essentials of Strength Training and Conditioning (NSCA)",
  PRESTES: "Prestes et al. — Prescrição e Periodização do Treinamento de Força",
  LIPPERT: "Lippert — Clinical Kinesiology and Anatomy",
  SPBIO: "Sports Biomechanics: Reducing Injury Risk and Improving Sports Performance",
  SPINE: "Biomechanics of the Human Spine: Basic Concepts, Spinal Disorders",
  NUTRI: "Nutrition for Sport and Exercise (2022)",
  INTEG: "Integrative Sport and Exercise Nutrition",
  METAB: "McConell — Exercise Metabolism",
  ANTRO: "Anthropometry, Body Composition and Resting Energy Expenditure",
  CUT: "Océane — Cut: Training & Nutrition Guide",
  REHAB: "Rehab Science — série de protocolos (ombro, cotovelo/punho, cabeça e pescoço, coluna, quadril, joelho, tornozelo e pé)",
  PTR: "Physical Therapy and Rehabilitation: Research and Clinical Application",
  GARD: "Gardiner — The Principles of Exercise Therapy",
  HODLER: "Hodler et al. — Musculoskeletal Diseases 2026–2029: Diagnostic Imaging",
  WINNICK: "Winnick & Porretta — Adapted Physical Education and Sport",
  BODYW: "Contreras — Bodyweight Strength Training Anatomy",
  MORAN: "Moran — Strength Training Exercises",
};

export const AREAS_ESP: { id: AreaEsp; titulo: string; desc: string }[] = [
  { id: "lesoes", titulo: "Lesões no esporte", desc: "Mecanismo, exame, imagem, conduta e retorno ao esporte." },
  { id: "reabilitacao", titulo: "Reabilitação", desc: "Protocolos em fases com critérios para avançar." },
  { id: "fisioterapia", titulo: "Fisioterapia e treino", desc: "Exercício terapêutico, força, periodização e modalidades." },
  { id: "biomecanica", titulo: "Biomecânica", desc: "Forças, cadeia cinética, corrida, salto, arremesso e coluna." },
  { id: "anatomia", titulo: "Anatomia funcional", desc: "Cinesiologia por região: músculos, ações, inervação e testes." },
  { id: "nutricao", titulo: "Nutrição esportiva", desc: "Energia, macronutrientes, hidratação, suplementos e RED-S." },
];
