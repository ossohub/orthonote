"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil, Pill, FileText, StickyNote, LayoutGrid, Route,
  HandMetal, Calculator, GitBranch, FileType, ClipboardList, ShieldCheck, Baby,
  CalendarClock, PieChart, Users2, MessagesSquare, Layers, Wrench, Brain,
} from "lucide-react";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

// Só aparece pro admin — os demais usuários nem sabem que este link existe.
// A segurança de verdade é a RPC moderate_post no banco (checa
// app_private.is_admin() via auth.uid()), isto aqui é só conveniência de
// navegação, lida do próprio perfil (profiles.app_role) em vez de um
// UUID fixo no código.

// Desempenho — agrupa Banco de Questões, Cronograma, Gráficos e a
// gestão de equipe (preceptor↔residente). Fica com destaque próprio,
// separado das ferramentas clínicas (não são "ferramentas", são
// recursos de estudo/acompanhamento).
const DESEMPENHO_LINKS = [
  { href: "/questions",              label: "Banco de Questões", icon: ClipboardList },
  { href: "/flashcards",             label: "Flashcards",        icon: Layers },
  { href: "/desempenho/cronograma",  label: "Cronograma",        icon: CalendarClock },
  { href: "/desempenho/graficos",    label: "Gráficos",          icon: PieChart },
  { href: "/desempenho/preditivo",   label: "Análise Preditiva", icon: Brain },
  { href: "/desempenho/salas",       label: "Salas",             icon: MessagesSquare },
  { href: "/desempenho/equipe",      label: "Minha Equipe",      icon: Users2 },
];

const ICONS: Record<ToolSlug, React.ElementType> = {
  anamnese: Pencil,
  medicamentos: Pill,
  documentos: FileText,
  "texto-salvo": StickyNote,
  classificacoes: LayoutGrid,
  pediatria: Baby,
  "vias-acesso": Route,
  "exame-fisico": HandMetal,
  calculadora: Calculator,
  algoritmos: GitBranch,
  pdf: FileType,
};

// Cada grupo de ferramentas ganha uma cor de identidade própria no badge
// do ícone (estado inativo) — dá hierarquia visual sem perder consistência,
// já que o estado ativo/hover sempre convergem pro verde da marca.
const GROUP_STYLES: Record<string, { icon: string; hover: string }> = {
  "Clínica":      { icon: "bg-sky-50 text-sky-600 ring-sky-100",         hover: "hover:border-sky-200 hover:bg-sky-50/60" },
  "Pessoal":      { icon: "bg-violet-50 text-violet-600 ring-violet-100", hover: "hover:border-violet-200 hover:bg-violet-50/60" },
  "Referência":   { icon: "bg-amber-50 text-amber-600 ring-amber-100",   hover: "hover:border-amber-200 hover:bg-amber-50/60" },
  "Calculadoras": { icon: "bg-indigo-50 text-indigo-600 ring-indigo-100", hover: "hover:border-indigo-200 hover:bg-indigo-50/60" },
  "Ferramentas":  { icon: "bg-cyan-50 text-cyan-600 ring-cyan-100",      hover: "hover:border-cyan-200 hover:bg-cyan-50/60" },
};
const DEFAULT_GROUP_STYLE = { icon: "bg-slate-100 text-ossohub-slate ring-slate-200", hover: "hover:border-slate-300 hover:bg-slate-50" };

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUser();

  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
      <nav className="py-5 px-3 space-y-5">
        {TOOL_GROUPS.map((group) => {
          const style = GROUP_STYLES[group.label] ?? DEFAULT_GROUP_STYLE;
          return (
            <div key={group.label}>
              <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-ossohub-slate/70">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(({ slug, label }) => {
                  const Icon = ICONS[slug];
                  const href = `/tools/${slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-medium transition-all duration-150",
                        active
                          ? "border-ossohub-green-dark/40 bg-ossohub-green-light/70 text-ossohub-green-dark shadow-sm"
                          : cn("border-slate-200/80 text-ossohub-slate", style.hover)
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                          active
                            ? "bg-ossohub-green-dark text-white ring-ossohub-green-dark"
                            : cn(style.icon, "group-hover:ring-transparent")
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Desempenho — destaque próprio, separado das ferramentas
            clínicas (são recursos de estudo/acompanhamento, não ferramentas). */}
        <div className="pt-4 border-t border-slate-100">
          <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-ossohub-green-dark">
            Desempenho
          </p>
          <div className="space-y-1">
            {DESEMPENHO_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                    active
                      ? "border-ossohub-green-dark bg-ossohub-green-dark text-white shadow-sm"
                      : "border-ossohub-green-dark/25 bg-ossohub-green-light/50 text-ossohub-green-dark hover:border-ossohub-green-dark/50 hover:bg-ossohub-green-light"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                      active
                        ? "bg-white/15 text-white ring-white/20"
                        : "bg-white text-ossohub-green-dark ring-ossohub-green-dark/10 shadow-sm"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Moderação e Painel de Sugestões — só visíveis pro admin. A
            segurança de verdade continua nas regras do banco (RPC
            moderate_post / Firestore + Firebase Auth); isto aqui é só
            conveniência de navegação, lida do próprio perfil
            (profiles.app_role) em vez de link escondido. */}
        {profile?.app_role === "admin" && (
          <div className="pt-4 border-t border-slate-100 space-y-1">
            <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-red-500">
              Admin
            </p>
            <Link
              href="/moderacao"
              className={cn(
                "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                pathname.startsWith("/moderacao")
                  ? "border-red-500 bg-red-500 text-white shadow-sm"
                  : "border-red-200 bg-red-50/60 text-red-600 hover:border-red-300 hover:bg-red-50"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                  pathname.startsWith("/moderacao")
                    ? "bg-white/15 text-white ring-white/20"
                    : "bg-white text-red-500 ring-red-100 shadow-sm"
                )}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">Moderação</span>
            </Link>
            <Link
              href="/tools/admin"
              className={cn(
                "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                pathname.startsWith("/tools/admin")
                  ? "border-red-500 bg-red-500 text-white shadow-sm"
                  : "border-red-200 bg-red-50/60 text-red-600 hover:border-red-300 hover:bg-red-50"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                  pathname.startsWith("/tools/admin")
                    ? "bg-white/15 text-white ring-white/20"
                    : "bg-white text-red-500 ring-red-100 shadow-sm"
                )}
              >
                <Wrench className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">Painel de Sugestões</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}
