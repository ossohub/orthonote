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

/** Comparação com fontes adicionais: concorda, diverge ou acrescenta. */
export interface Nota {
  fonte: FonteEsp;
  tipo: "concorda" | "diverge" | "acrescenta";
  texto: string;
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
  /** comparação com as fontes adicionais (revisão de nov/2026) */
  notas?: Nota[];
  fontes: FonteEsp[];
}

export type FonteEsp =
  | "HAFF" | "PRESTES" | "LIPPERT" | "SPBIO" | "SPINE" | "NUTRI" | "INTEG" | "METAB" | "ANTRO"
  | "CUT" | "REHAB" | "PTR" | "GARD" | "HODLER" | "WINNICK" | "BODYW" | "MORAN"
  | "ACL5" | "MOVBODY" | "PTRAIN" | "BIOBAS" | "WHITING" | "FANWANG" | "MCGINNIS" | "SPINESTAB" | "CORE50"
  | "WOMEN" | "EXSCI" | "SWIM" | "RUSIN" | "NUTSCI" | "SUPPAZ" | "PSM" | "BANDS" | "SPINJ" | "KAPOOR"
  | "SRIP" | "READ";

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
  ACL5: "University of Calgary Sport Medicine Centre — ACL Reconstruction Rehabilitation Program (5 estágios)",
  MOVBODY: "Anatomy of the Moving Body (2ª ed.)",
  PTRAIN: "Austin — Becoming a Personal Trainer For Dummies (2ª ed.)",
  BIOBAS: "Yanes — Biomechanic Basics: anatomy of lifting weights",
  WHITING: "Zernicke, Broglio & Whiting — Biomechanics of Injury (3ª ed.)",
  FANWANG: "Fan & Wang (eds.) — Biomechanics of Injury and Prevention",
  MCGINNIS: "McGinnis — Biomechanics of Sport and Exercise (4ª ed.)",
  SPINESTAB: "Biomechanics of Spine Stabilization: Self-Assessment and Review",
  CORE50: "Core Strength for 50+",
  WOMEN: "Developing Sport for Women and Girls",
  EXSCI: "Exercise Science For Dummies",
  SWIM: "Swimmer Strength — Foundations of Strength Training (natação)",
  RUSIN: "Rusin — Functional Hypertrophy Training",
  NUTSCI: "McGuire & Beerman — Nutritional Sciences: From Fundamentals to Food (4ª ed.)",
  SUPPAZ: "Castell et al. — Nutritional Supplements in Sport, Exercise and Health: An A–Z Guide",
  PSM: "Buratovich (ed.) — Principles of Sports Medicine & Exercise Science",
  BANDS: "Murray — Resistance Band Workout for Seniors",
  SPINJ: "Doral, Karlsson et al. (eds.) — Sports Injuries: Prevention, Diagnosis, Treatment and Rehabilitation",
  KAPOOR: "Kapoor — Textbook of Orthopedic Physiotherapy (2021)",
  SRIP: "Comfort & Abrahamson (eds.) — Sports Rehabilitation and Injury Prevention",
  READ: "Read & Wade — Sports Injuries: A Unique Guide to Self-Diagnosis and Rehabilitation (3ª ed., 2009)",
};

export const AREAS_ESP: { id: AreaEsp; titulo: string; desc: string }[] = [
  { id: "lesoes", titulo: "Lesões no esporte", desc: "Mecanismo, exame, imagem, conduta e retorno ao esporte." },
  { id: "reabilitacao", titulo: "Reabilitação", desc: "Protocolos em fases com critérios para avançar." },
  { id: "fisioterapia", titulo: "Fisioterapia e treino", desc: "Exercício terapêutico, força, periodização e modalidades." },
  { id: "biomecanica", titulo: "Biomecânica", desc: "Forças, cadeia cinética, corrida, salto, arremesso e coluna." },
  { id: "anatomia", titulo: "Anatomia funcional", desc: "Cinesiologia por região: músculos, ações, inervação e testes." },
  { id: "nutricao", titulo: "Nutrição esportiva", desc: "Energia, macronutrientes, hidratação, suplementos e RED-S." },
];
