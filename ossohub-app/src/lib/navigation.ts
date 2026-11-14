// ============================================================
// Navegação única do OssoHub — a barra lateral (computador), o menu do
// celular e as páginas-resumo (/ortopedia, /pediatria, /estudos) leem
// TODAS daqui. Para incluir, renomear ou mover um item, mude só este
// arquivo e o site inteiro acompanha.
// ============================================================
import {
  Home, Compass, Users, Bell,
  Pencil, Pill, FileText, StickyNote, FileType,
  LayoutGrid, Route, HandMetal, Calculator, GitBranch, BookOpen, Bone,
  Baby, BookText, ClipboardList, Layers, CalendarClock, PieChart, Brain,
  MessagesSquare, Users2, ShieldCheck, Wrench, Stethoscope, GraduationCap, Siren, Calculator as CalcIcon, Activity, Apple, HeartPulse, Dumbbell, Footprints,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Frase curta usada nos cartões das páginas-resumo. */
  desc?: string;
}

export type NavTone = "cyan" | "bone" | "sky" | "green" | "red";

export interface NavSection {
  id: string;
  label: string;
  /** Marcador estilo filme de raio-X (ex.: "AD", "PD"). */
  marker: string;
  icon: LucideIcon;
  tone: NavTone;
  /** Página-resumo da seção (quando existe). */
  hub?: string;
  adminOnly?: boolean;
  items: NavItem[];
}

// Links da rede social — ficam no topo (computador) e no menu do celular.
export const SOCIAL_LINKS: NavItem[] = [
  { href: "/feed",          label: "Início",       icon: Home },
  { href: "/explore",       label: "Explorar",     icon: Compass },
  { href: "/network",       label: "Minha Rede",   icon: Users },
  { href: "/notifications", label: "Notificações", icon: Bell },
];

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "ps",
    label: "Pronto-Socorro",
    marker: "PS",
    icon: Siren,
    tone: "red",
    items: [
      { href: "/pronto-socorro/adulto",        label: "Prescrições — Adulto",    icon: Stethoscope, desc: "Manejo e prescrição pronta das principais urgências do adulto." },
      { href: "/pronto-socorro/pediatria",     label: "Prescrições — Pediatria", icon: Baby,        desc: "Condutas pediátricas com dose calculada pelo peso." },
      { href: "/pronto-socorro/calculadoras",  label: "Calculadoras do PS",      icon: CalcIcon,    desc: "Hidratação, vasoativas, IOT, sódio, clearance e escores." },
    ],
  },
  {
    id: "consultorio",
    label: "Consultório",
    marker: "CX",
    icon: Stethoscope,
    tone: "sky",
    items: [
      { href: "/tools/anamnese",    label: "Anamnese",           icon: Pencil,     desc: "Roteiro de anamnese ortopédica para o atendimento." },
      { href: "/tools/documentos",  label: "Documentos Médicos", icon: FileText,   desc: "Atestados, laudos, receitas e pedidos prontos." },
      { href: "/tools/texto-salvo", label: "Texto Salvo",        icon: StickyNote, desc: "Seus textos e modelos pessoais guardados." },
      { href: "/tools/pdf",         label: "PDF",                icon: FileType,   desc: "Junte, recorte e edite arquivos PDF." },
    ],
  },
  {
    id: "ortopedia",
    label: "Ortopedia Adulto",
    marker: "AD",
    icon: Bone,
    tone: "cyan",
    hub: "/ortopedia",
    items: [
      { href: "/tools/classificacoes",          label: "Classificações",         icon: LayoutGrid, desc: "Classificações de fraturas e lesões do adulto." },
      { href: "/tools/vias-acesso",             label: "Vias de Acesso",         icon: Route,      desc: "Vias cirúrgicas passo a passo." },
      { href: "/tools/exame-fisico",            label: "Exame Físico",           icon: HandMetal,  desc: "Manobras e testes especiais por região." },
      { href: "/tools/calculadora",             label: "Calculadora Ortopédica", icon: Calculator, desc: "Escores e cálculos do dia a dia." },
      { href: "/tools/algoritmos",              label: "Algoritmos",             icon: GitBranch,  desc: "Fluxogramas de conduta." },
      { href: "/referencia/ortopedia-adulto",   label: "Conteúdo Adulto",        icon: BookOpen,   desc: "Material de estudo de ortopedia do adulto." },
      { href: "/visualizador-3d.html",          label: "Anatomia 3D",            icon: Bone,       desc: "Modelos anatômicos em 3D para girar e estudar." },
    ],
  },
  {
    id: "pediatria",
    label: "Pediatria",
    marker: "PD",
    icon: Baby,
    tone: "bone",
    hub: "/pediatria",
    items: [
      { href: "/tools/medicamentos",       label: "Prescrição Pediátrica",      icon: Pill,       desc: "Doses por peso, nomes comerciais e diluições EV." },
      { href: "/tools/pediatria",          label: "Ferramentas Pediátricas",    icon: Baby,       desc: "Referências rápidas de ortopedia pediátrica." },
      { href: "/pediatria/classificacoes", label: "Classificações Pediátricas", icon: LayoutGrid, desc: "Classificações próprias da criança." },
      { href: "/pediatria/conteudo",       label: "Conteúdo Pediatria",         icon: BookText,   desc: "Material de estudo de ortopedia pediátrica." },
    ],
  },
  {
    id: "esporte",
    label: "Medicina Esportiva",
    marker: "ME",
    icon: Activity,
    tone: "green",
    hub: "/esporte",
    items: [
      { href: "/esporte/lesoes",       label: "Lesões no esporte",   icon: HeartPulse, desc: "Mecanismo, exame, imagem, conduta e retorno ao esporte." },
      { href: "/esporte/reabilitacao", label: "Reabilitação",        icon: Footprints, desc: "Protocolos em fases com critérios para avançar." },
      { href: "/esporte/fisioterapia", label: "Fisioterapia e treino", icon: Dumbbell, desc: "Exercício terapêutico, força, periodização e recursos." },
      { href: "/esporte/biomecanica",  label: "Biomecânica",         icon: Activity,   desc: "Forças, corrida, salto, arremesso e coluna." },
      { href: "/esporte/anatomia",     label: "Anatomia funcional",  icon: Bone,       desc: "Músculos, ações, inervação e testes por região." },
      { href: "/esporte/nutricao",     label: "Nutrição esportiva",  icon: Apple,      desc: "Energia, macros, hidratação, suplementos e RED-S." },
      { href: "/esporte/calculadoras", label: "Calculadoras do esporte", icon: CalcIcon, desc: "Gasto energético, macros, 1RM, FC, sudorese e carga." },
    ],
  },
  {
    id: "estudos",
    label: "Estudos & Desempenho",
    marker: "ED",
    icon: GraduationCap,
    tone: "green",
    hub: "/estudos",
    items: [
      { href: "/questions",             label: "Banco de Questões", icon: ClipboardList,  desc: "Monte simulados e acompanhe o ranking." },
      { href: "/flashcards",            label: "Flashcards",        icon: Layers,         desc: "Revisão espaçada com cartões." },
      { href: "/desempenho/cronograma", label: "Cronograma",        icon: CalendarClock,  desc: "Plano de estudos organizado." },
      { href: "/desempenho/graficos",   label: "Gráficos",          icon: PieChart,       desc: "Seu desempenho por área." },
      { href: "/desempenho/preditivo",  label: "Análise Preditiva", icon: Brain,          desc: "Onde focar para melhorar." },
      { href: "/desempenho/salas",      label: "Salas",             icon: MessagesSquare, desc: "Estude junto com colegas." },
      { href: "/desempenho/equipe",     label: "Minha Equipe",      icon: Users2,         desc: "Acompanhe sua equipe." },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    marker: "AX",
    icon: ShieldCheck,
    tone: "red",
    adminOnly: true,
    items: [
      { href: "/moderacao",   label: "Moderação",           icon: ShieldCheck },
      { href: "/tools/admin", label: "Painel de Sugestões", icon: Wrench },
    ],
  },
];

export function getSection(id: string): NavSection {
  const s = NAV_SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`Seção de navegação desconhecida: ${id}`);
  return s;
}

/** Um link está ativo quando a rota atual é ele mesmo ou uma subpágina dele. */
export function isActive(pathname: string, href: string): boolean {
  if (href.endsWith(".html")) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

/** Seção que contém a rota atual (inclui a página-resumo da seção). */
export function sectionForPath(pathname: string): NavSection | undefined {
  return NAV_SECTIONS.find(
    (s) => (s.hub && isActive(pathname, s.hub)) || s.items.some((i) => isActive(pathname, i.href))
  );
}

// Cores de cada seção dentro do tema Negatoscópio.
export const TONES: Record<NavTone, { text: string; chip: string; ring: string; glow: string }> = {
  cyan:  { text: "text-[#7FE7EE]", chip: "bg-[#38D5E0]/10 text-[#7FE7EE]", ring: "border-[#38D5E0]/35", glow: "rgba(56,213,224,0.18)" },
  bone:  { text: "text-[#EADFC8]", chip: "bg-[#EADFC8]/10 text-[#EADFC8]", ring: "border-[#EADFC8]/30", glow: "rgba(234,223,200,0.14)" },
  sky:   { text: "text-[#93C5FD]", chip: "bg-[#60A5FA]/10 text-[#93C5FD]", ring: "border-[#60A5FA]/35", glow: "rgba(96,165,250,0.16)" },
  green: { text: "text-[#6EE7B7]", chip: "bg-[#10B981]/15 text-[#6EE7B7]", ring: "border-[#10B981]/35", glow: "rgba(16,185,129,0.16)" },
  red:   { text: "text-[#FCA5A5]", chip: "bg-[#EF4444]/10 text-[#FCA5A5]", ring: "border-[#EF4444]/35", glow: "rgba(239,68,68,0.14)" },
};
