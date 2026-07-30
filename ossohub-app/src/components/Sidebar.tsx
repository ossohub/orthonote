"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil, Pill, FileText, StickyNote, LayoutGrid, Route,
  HandMetal, Calculator, GitBranch, FileType, ClipboardList, ShieldCheck, Baby,
  CalendarClock, PieChart, Users2, MessagesSquare,
} from "lucide-react";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

// Só aparece pro admin — os demais usuários nem sabem que este link existe.
// A segurança de verdade é a RPC moderate_post no banco (checa auth.uid()),
// isto aqui é só conveniência de navegação.
const ADMIN_ID = "9010125e-bee3-4101-8e0d-e5bd4d691659";

// Desempenho — agrupa Banco de Questões, Cronograma, Gráficos e a
// gestão de equipe (preceptor↔residente). Fica com destaque próprio,
// separado das ferramentas clínicas (não são "ferramentas", são
// recursos de estudo/acompanhamento).
const DESEMPENHO_LINKS = [
  { href: "/questions",              label: "Banco de Questões", icon: ClipboardList },
  { href: "/desempenho/cronograma",  label: "Cronograma",        icon: CalendarClock },
  { href: "/desempenho/graficos",    label: "Gráficos",          icon: PieChart },
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

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="hidden md:block w-56 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)]">
      <nav className="py-5 px-3 space-y-5 sticky top-16">
        {TOOL_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ossohub-slate">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ slug, label }) => {
                const Icon = ICONS[slug];
                const href = `/tools/${slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={slug}
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium border-l-2 transition-colors",
                      active
                        ? "border-l-ossohub-green-dark bg-ossohub-green-dark/8 text-ossohub-green-dark"
                        : "border-l-transparent text-ossohub-slate hover:bg-slate-50 hover:text-ossohub-navy"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Desempenho — destaque próprio, separado das ferramentas
            clínicas (são recursos de estudo/acompanhamento, não ferramentas). */}
        <div className="pt-1 border-t border-slate-100">
          <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ossohub-green-dark">
            Desempenho
          </p>
          <div className="space-y-0.5">
            {DESEMPENHO_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "border-ossohub-green-dark/40 bg-ossohub-green-dark/10 text-ossohub-green-dark"
                      : "border-ossohub-green-dark/20 bg-ossohub-green-dark/5 text-ossohub-green-dark hover:bg-ossohub-green-dark/10"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Moderação — só visível pro admin */}
        {user?.id === ADMIN_ID && (
          <Link
            href="/moderacao"
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
              pathname.startsWith("/moderacao")
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-red-200 bg-red-50/50 text-red-600 hover:bg-red-50"
            )}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="truncate">Moderação</span>
          </Link>
        )}
      </nav>
    </aside>
  );
}
