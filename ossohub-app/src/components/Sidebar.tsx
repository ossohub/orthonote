"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil, Pill, FileText, StickyNote, LayoutGrid, Route,
  HandMetal, Calculator, GitBranch, FileType, ClipboardList, ShieldCheck,
} from "lucide-react";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

// Só aparece pro admin — os demais usuários nem sabem que este link existe.
// A segurança de verdade é a RPC moderate_post no banco (checa auth.uid()),
// isto aqui é só conveniência de navegação.
const ADMIN_ID = "9010125e-bee3-4101-8e0d-e5bd4d691659";

const ICONS: Record<ToolSlug, React.ElementType> = {
  anamnese: Pencil,
  medicamentos: Pill,
  documentos: FileText,
  "texto-salvo": StickyNote,
  classificacoes: LayoutGrid,
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
                        ? "border-l-ossohub-green bg-ossohub-green/10 text-ossohub-green"
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

        {/* Banco de Questões — destaque próprio, separado das ferramentas
            clínicas (é um recurso de quiz/ranking, não uma ferramenta). */}
        <div className="pt-1 border-t border-slate-100">
          <Link
            href="/questions"
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
              pathname.startsWith("/questions")
                ? "border-ossohub-green bg-ossohub-green/10 text-ossohub-green"
                : "border-ossohub-green/30 bg-ossohub-green/5 text-ossohub-green hover:bg-ossohub-green/10"
            )}
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            <span className="truncate">Banco de Questões</span>
          </Link>
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
