// ============================================================
// Ferramenta Clínica (index.html/algoritmos.html/pdf-master.html)
// — arquivos estáticos servidos pela pasta public/ deste mesmo
// projeto (mesma origem), embutidos via iframe na sidebar.
// ============================================================
// Vazio = mesma origem (relativo). Só preencha via env var se um dia
// a ferramenta clínica voltar a morar num domínio/projeto separado.
export const CLINICAL_TOOL_BASE_URL =
  process.env.NEXT_PUBLIC_CLINICAL_TOOL_URL || "";

export type ToolSlug =
  | "anamnese"
  | "medicamentos"
  | "documentos"
  | "texto-salvo"
  | "classificacoes"
  | "vias-acesso"
  | "exame-fisico"
  | "calculadora"
  | "algoritmos"
  | "pdf";

// Mapeia cada ferramenta para a URL correta a embutir no iframe.
// Anamnese/Medicamentos/Documentos/Texto Salvo/Classificações/Vias/Exame
// Físico/Calculadora vivem como abas dentro do index.html (usam ?tool=).
// Algoritmos e PDF são arquivos próprios, standalone.
export function getToolIframeUrl(slug: ToolSlug): string {
  switch (slug) {
    case "anamnese":       return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=anam`;
    case "medicamentos":   return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=med`;
    case "documentos":     return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=doc`;
    case "texto-salvo":    return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=nota`;
    case "classificacoes": return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=class`;
    case "vias-acesso":    return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=via`;
    case "exame-fisico":   return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=pe`;
    case "calculadora":    return `${CLINICAL_TOOL_BASE_URL}/index.html?tool=calc`;
    case "algoritmos":     return `${CLINICAL_TOOL_BASE_URL}/algoritmos.html`;
    case "pdf":            return `${CLINICAL_TOOL_BASE_URL}/pdf-master.html`;
  }
}

export interface ToolMeta {
  slug: ToolSlug;
  label: string;
}

export interface ToolGroup {
  label: string;
  items: ToolMeta[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "Clínica",
    items: [
      { slug: "anamnese",   label: "Anamnese" },
      { slug: "medicamentos", label: "Medicamentos" },
      { slug: "documentos", label: "Documentos Médicos" },
    ],
  },
  {
    label: "Pessoal",
    items: [{ slug: "texto-salvo", label: "Texto Salvo" }],
  },
  {
    label: "Referência",
    items: [
      { slug: "classificacoes", label: "Classificações" },
      { slug: "vias-acesso",    label: "Vias de Acesso" },
      { slug: "exame-fisico",   label: "Exame Físico" },
    ],
  },
  {
    label: "Calculadoras",
    items: [{ slug: "calculadora", label: "Calculadora Ortopédica" }],
  },
  {
    label: "Ferramentas",
    items: [
      { slug: "algoritmos", label: "Algoritmos" },
      { slug: "pdf",        label: "PDF" },
    ],
  },
];
