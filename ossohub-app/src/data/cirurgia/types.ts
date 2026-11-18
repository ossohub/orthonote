// Procedimentos cirúrgicos — técnica passo a passo, resumida com palavras próprias a
// partir de Stern SH (ed.). Key Techniques in Orthopaedic Surgery. Thieme; 2001.
// Não reproduz texto nem ilustrações do livro; as figuras são citadas pelo número.

export type SecaoCir =
  | "ombro" | "cotovelo" | "mao" | "quadril" | "joelho" | "pe" | "coluna" | "pediatria" | "diversos";

export interface Etapa {
  /** nome da etapa (ex.: "Acesso", "Acromioplastia", "Fechamento") */
  t: string;
  passos: string[];
  /** figuras do livro que ilustram a etapa (ex.: "1–2") */
  figs?: string[];
}

export interface Procedimento {
  id: string;
  /** número do capítulo no livro */
  cap: number;
  titulo: string;
  /** título original em inglês */
  original: string;
  secao: SecaoCir;
  autores: string;
  /** páginas do capítulo no livro */
  paginas: string;
  resumo: string;
  indicacoes: string[];
  contraindicacoes: string[];
  preparo: string[];
  material: string[];
  posicao: string[];
  anestesia?: string[];
  etapas: Etapa[];
  perolas: string[];
  evitar: string[];
  posop: string[];
  tags?: string[];
}

export const SECOES_CIR: { id: SecaoCir; titulo: string; curto: string; desc: string }[] = [
  { id: "ombro", titulo: "Ombro e braço", curto: "Ombro", desc: "Acromioplastia, manguito, instabilidade, artroscopia e fraturas do úmero." },
  { id: "cotovelo", titulo: "Cotovelo e antebraço", curto: "Cotovelo", desc: "Cabeça do rádio, olécrano, úmero distal, antebraço e fasciotomia." },
  { id: "mao", titulo: "Punho e mão", curto: "Mão", desc: "Túnel do carpo, Bennett, rádio distal, tendões e 5º metacarpo." },
  { id: "quadril", titulo: "Quadril e fêmur", curto: "Quadril", desc: "Artroplastia total, fixação e hemiartroplastia do colo, haste femoral." },
  { id: "joelho", titulo: "Joelho e perna", curto: "Joelho", desc: "Artroscopia, LCA, ATJ, osteotomias, platô, haste tibial, patela e fasciotomia." },
  { id: "pe", titulo: "Tornozelo e pé", curto: "Pé", desc: "Artroscopia, fraturas do tornozelo, Aquiles, hálux valgo, dedos, Morton e Jones." },
  { id: "coluna", titulo: "Coluna", curto: "Coluna", desc: "Discectomia lombar, cervical anterior, artrodese e descompressão lombar." },
  { id: "pediatria", titulo: "Pediatria", curto: "Pediatria", desc: "Epifisiólise, pé torto, supracondiliana, punção do quadril e escoliose." },
  { id: "diversos", titulo: "Diversos", curto: "Diversos", desc: "Tração esquelética femoral e tibial." },
];

export const FONTE_CIR =
  "Stern SH (ed.). Key Techniques in Orthopaedic Surgery. New York: Thieme; 2001.";
