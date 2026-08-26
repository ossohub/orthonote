"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil, Pill, FileText, StickyNote, LayoutGrid, Route,
  HandMetal, Calculator, GitBranch, FileType, ClipboardList, ShieldCheck, Baby,
  CalendarClock, PieChart, Users2, MessagesSquare, Layers, Wrench, Brain,
  BookOpen, BookText,
} from "lucide-react";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

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

// Cada grupo com cor de identidade — adaptada para tema dark
const GROUP_STYLES: Record<string, { icon: string; activeIcon: string }> = {
  "Clínica":      { icon: "bg-sky-900/40 text-sky-400",         activeIcon: "bg-sky-500/20 text-sky-300" },
  "Pessoal":      { icon: "bg-violet-900/40 text-violet-400",   activeIcon: "bg-violet-500/20 text-violet-300" },
  "Referência":   { icon: "bg-amber-900/40 text-amber-400",     activeIcon: "bg-amber-500/20 text-amber-300" },
  "Calculadoras": { icon: "bg-indigo-900/40 text-indigo-400",   activeIcon: "bg-indigo-500/20 text-indigo-300" },
  "Ferramentas":  { icon: "bg-cyan-900/40 text-cyan-400",       activeIcon: "bg-cyan-500/20 text-cyan-300" },
};
const DEFAULT_GROUP_STYLE = { icon: "bg-white/5 text-slate-400", activeIcon: "bg-white/10 text-slate-300" };

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUser();

  return (
    <aside
      className="hidden md:block w-60 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain"
      style={{
        background: "#0A1628",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <nav className="py-5 px-3 space-y-5">
        {TOOL_GROUPS.map((group) => {
          const style = GROUP_STYLES[group.label] ?? DEFAULT_GROUP_STYLE;
          return (
            <div key={group.label}>
              <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
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
                        "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150",
                        active
                          ? "text-sky-300"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      )}
                      style={active ? {
                        background: "rgba(14,165,233,0.1)",
                        border: "1px solid rgba(14,165,233,0.25)",
                      } : {
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                          active ? style.activeIcon : style.icon
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

        {/* Referência — conteúdo didático */}
        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-amber-400/70">
            Referência
          </p>
          <div className="space-y-1">
            {[
              { href: "/referencia/ortopedia-adulto", label: "Ortopedia Adulto", Icon: BookOpen },
            ].map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150",
                    active
                      ? "text-amber-300"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                  style={active ? {
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  } : {
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active ? "bg-amber-500/20 text-amber-300" : "bg-amber-900/40 text-amber-400"
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pediatria — conteúdo didático */}
        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-indigo-400/70">
            Pediatria
          </p>
          <div className="space-y-1">
            {[
              { href: "/pediatria/classificacoes", label: "Classificações Pediátricas", Icon: LayoutGrid },
              { href: "/pediatria/conteudo",       label: "Conteúdo Pediatria",         Icon: BookText },
            ].map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150",
                    active
                      ? "text-indigo-300"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                  style={active ? {
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.3)",
                  } : {
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-900/40 text-indigo-400"
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desempenho */}
        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/70">
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
                    "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                    active
                      ? "text-emerald-300"
                      : "text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-900/20"
                  )}
                  style={active ? {
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  } : {
                    border: "1px solid rgba(16,185,129,0.12)",
                  }}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-emerald-900/40 text-emerald-400"
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

        {/* Admin */}
        {profile?.app_role === "admin" && (
          <div className="pt-4 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-red-400/70">
              Admin
            </p>
            {[
              { href: "/moderacao", label: "Moderação", Icon: ShieldCheck },
              { href: "/tools/admin", label: "Painel de Sugestões", Icon: Wrench },
            ].map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                    active
                      ? "text-red-300"
                      : "text-red-400/80 hover:text-red-300 hover:bg-red-900/20"
                  )}
                  style={active ? {
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.3)",
                  } : {
                    border: "1px solid rgba(239,68,68,0.12)",
                  }}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-red-500/20 text-red-300"
                        : "bg-red-900/40 text-red-400"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
