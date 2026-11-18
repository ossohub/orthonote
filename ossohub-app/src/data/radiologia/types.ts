// Mensuração radiográfica — linhas, ângulos, índices e critérios por região.
// Conteúdo resumido com palavras próprias a partir da compilação
// "Orthopaedic X-ray Measurements" (Dr. Gehad S. I. Bedda), que reúne Miller,
// Rockwood/Handbook of Fractures, Campbell, AO, Spinal Deformity Study Group,
// Measurements and Classifications in Musculoskeletal Radiology e outras.
// Não reproduz texto nem imagens das fontes.

export type RegiaoRx =
  | "geral" | "membro-inferior" | "pelve-quadril" | "quadril-infantil" | "joelho"
  | "tornozelo" | "pe" | "ombro" | "cotovelo" | "punho-mao"
  | "coluna-cervical" | "coluna-toracolombar";

/** medida = linha/ângulo/índice; fratura = desvio aceitável/critério; cirurgia = implantes, entradas, trações */
export type TipoRx = "medida" | "fratura" | "cirurgia";

/** n = normal · l = limítrofe · a = alterado · i = informativo */
export type Tom = "n" | "l" | "a" | "i";

export interface ValorRx { r: string; v: string; t?: Tom }
export interface TabelaRx { cab: string[]; linhas: string[][]; nota?: string }

export interface Medida {
  id: string;
  nome: string;
  regiao: RegiaoRx;
  /** subgrupo dentro da região (ex.: "Displasia e cobertura") */
  grupo: string;
  tipo?: TipoRx;
  /** incidência ou exame em que se mede */
  inc?: string;
  /** para que serve, em uma linha */
  resumo: string;
  valores?: ValorRx[];
  /** como medir, passo a passo */
  como?: string[];
  tabela?: TabelaRx;
  /** pérolas, armadilhas e conduta */
  obs?: string[];
  /** conteúdo pediátrico */
  ped?: boolean;
  tags?: string[];
}

export const REGIOES_RX: { id: RegiaoRx; titulo: string; curto: string; desc: string }[] = [
  { id: "membro-inferior", titulo: "Membro inferior — alinhamento", curto: "MMII", desc: "Eixos, ângulos de Paley, rotação, torção e diáfises." },
  { id: "pelve-quadril", titulo: "Pelve e quadril", curto: "Quadril", desc: "Linhas do acetábulo, displasia, impacto, colo, fraturas e artroplastia." },
  { id: "quadril-infantil", titulo: "Quadril infantil", curto: "Quadril inf.", desc: "DDH, epifisiólise, coxa vara e migração." },
  { id: "joelho", titulo: "Joelho", curto: "Joelho", desc: "Altura patelar, tróclea, slope, ligamentos e artroplastia." },
  { id: "tornozelo", titulo: "Tornozelo", curto: "Tornozelo", desc: "Sindesmose, espaço claro, tilt e trações." },
  { id: "pe", titulo: "Pé", curto: "Pé", desc: "Pé plano e cavo, hálux valgo, pé infantil e Lisfranc." },
  { id: "ombro", titulo: "Ombro e braço", curto: "Ombro", desc: "Glenoide, escápula, AC/CC e úmero." },
  { id: "cotovelo", titulo: "Cotovelo", curto: "Cotovelo", desc: "Carregamento, Baumann, linhas e ossificação." },
  { id: "punho-mao", titulo: "Punho e mão", curto: "Punho/mão", desc: "Rádio distal, carpo, instabilidades e mão." },
  { id: "coluna-cervical", titulo: "Coluna cervical", curto: "Cervical", desc: "Craniocervical, C1–C2, canal e instabilidade." },
  { id: "coluna-toracolombar", titulo: "Coluna toracolombar e equilíbrio", curto: "Toracolombar", desc: "Escoliose, sagital, espondilolistese, fraturas e pedículos." },
  { id: "geral", titulo: "Princípios gerais", curto: "Geral", desc: "Regras que valem para qualquer região." },
];

export const TIPOS_RX: { id: TipoRx; titulo: string }[] = [
  { id: "medida", titulo: "Medidas e linhas" },
  { id: "fratura", titulo: "Fraturas: desvio aceitável" },
  { id: "cirurgia", titulo: "Cirurgia e implantes" },
];

export const FONTE_RX =
  "Compilação \"Orthopaedic X-ray Measurements\" (Dr. Gehad S. I. Bedda), a partir de Miller's Review of Orthopaedics, Rockwood/Handbook of Fractures, Campbell, AO, Spinal Deformity Study Group, Measurements and Classifications in Musculoskeletal Radiology, McRae, Orthobullets e outras.";
