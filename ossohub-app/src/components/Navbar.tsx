"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home, Compass, Users, Bell, User, Menu, X, LogOut, Pencil, ClipboardList,
  CalendarClock, PieChart, Users2, MessagesSquare, Plus,
  Pill, FileText, StickyNote, LayoutGrid, Route, HandMetal, Calculator,
  GitBranch, FileType, Baby, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn, getInitials } from "@/lib/utils";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";

// Mesmos mapas de ícone/cor da Sidebar.tsx desktop — duplicados aqui (em
// vez de importados) porque o menu mobile precisa do mesmo visual de
// "retângulo com ícone" que a sidebar fixa tem, mas via dropdown do
// hambúrguer em vez de coluna lateral.
const TOOL_ICONS: Record<ToolSlug, React.ElementType> = {
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

const GROUP_STYLES: Record<string, { icon: string; hover: string }> = {
  "Clínica":      { icon: "bg-sky-50 text-sky-600 ring-sky-100",         hover: "hover:border-sky-200 hover:bg-sky-50/60" },
  "Pessoal":      { icon: "bg-violet-50 text-violet-600 ring-violet-100", hover: "hover:border-violet-200 hover:bg-violet-50/60" },
  "Referência":   { icon: "bg-amber-50 text-amber-600 ring-amber-100",   hover: "hover:border-amber-200 hover:bg-amber-50/60" },
  "Calculadoras": { icon: "bg-indigo-50 text-indigo-600 ring-indigo-100", hover: "hover:border-indigo-200 hover:bg-indigo-50/60" },
  "Ferramentas":  { icon: "bg-cyan-50 text-cyan-600 ring-cyan-100",      hover: "hover:border-cyan-200 hover:bg-cyan-50/60" },
};
const DEFAULT_GROUP_STYLE = { icon: "bg-slate-100 text-ossohub-slate ring-slate-200", hover: "hover:border-slate-300 hover:bg-slate-50" };

const NAV_LINKS = [
  { href: "/feed",          label: "Início",           icon: Home },
  { href: "/explore",       label: "Explorar",         icon: Compass },
  { href: "/network",       label: "Minha Rede",       icon: Users },
  { href: "/notifications", label: "Notificações",     icon: Bell },
];

// Mesma lista usada na Sidebar.tsx desktop — mantém as duas em sincronia.
const DESEMPENHO_LINKS = [
  { href: "/questions",              label: "Banco de Questões", icon: ClipboardList },
  { href: "/desempenho/cronograma",  label: "Cronograma",        icon: CalendarClock },
  { href: "/desempenho/graficos",    label: "Gráficos",          icon: PieChart },
  { href: "/desempenho/salas",       label: "Salas",             icon: MessagesSquare },
  { href: "/desempenho/equipe",      label: "Minha Equipe",      icon: Users2 },
];

// Só aparece pro próprio residente (professional_role === 'medico_residente')
// — mesma regra de Sidebar.tsx.
const RESIDENT_ONLY_LINK = { href: "/desempenho/preditivo", label: "Análise Preditiva", icon: Brain };

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, profile, signOut } = useUser();

  const isLanding = pathname === "/" || pathname === "/login" || pathname === "/signup";
  const isAuthenticated = !!user;

  // "Dr." fica sempre na frente do nome exibido na navbar — sem duplicar
  // caso o próprio full_name já comece com "Dr." (alguns cadastros antigos).
  const doctorName = profile?.full_name
    ? /^dr\.?\s/i.test(profile.full_name.trim())
      ? profile.full_name
      : `Dr. ${profile.full_name}`
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-ossohub-navy">
      <div className={isAuthenticated ? "ossohub-shell" : "ossohub-container"}>
        <div className={cn(
          "flex h-16 items-center justify-between",
          // Layout de 3 colunas em telas médias+: logo à esquerda, menu
          // superior centralizado no meio, ações (Publicar + perfil)
          // fixas na ponta direita — em vez de tudo agrupado à esquerda.
          isAuthenticated && "md:grid md:grid-cols-[auto_1fr_auto] md:gap-4"
        )}>
          {/* Logo — maior e mais nítida (fonte já é 972×441, só estava
              exibida pequena demais); fica sempre no início da barra. */}
          <Link href={isAuthenticated ? "/feed" : "/"} className="flex items-center shrink-0">
            <img src="/logo.png" alt="OssoHub" className="ossohub-logo h-10 w-auto" />
          </Link>

          {/* Nav links — autenticado. Coluna central do grid: os links
              ficam centralizados no meio da barra, entre a logo e as
              ações à direita. No mobile fica escondida mesmo (o menu
              aparece no hambúrguer). */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center justify-center gap-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname.startsWith(href)
                      ? "bg-ossohub-green-light text-ossohub-green-dark"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}>
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Direita — em telas médias+ fica logo em seguida da navegação
              (não mais empurrado lá pra ponta direita da barra); no mobile
              o justify-between do pai já cuida de deixá-la na ponta, onde
              fica o botão do menu hambúrguer. Deslogado sempre na ponta. */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button size="sm" asChild><Link href="/signup">Criar conta</Link></Button>
              </>
            ) : (
              <>
                <Button size="sm" className="hidden sm:flex" asChild>
                  <Link href="/post/new"><Plus className="h-4 w-4" /> Publicar</Link>
                </Button>

                {/* Avatar dropdown — círculo + nome do médico (com "Dr."
                    na frente) lado a lado, sempre na ponta direita da
                    barra graças ao layout de 3 colunas do header. */}
                <div className="relative">
                  <button onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2.5 rounded-full border-2 border-transparent hover:border-ossohub-green-dark/50 hover:bg-white/5 transition-colors py-0.5 pl-0.5 pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.photo_url ?? undefined} />
                      <AvatarFallback className="text-xs">{getInitials(profile?.full_name ?? "U")}</AvatarFallback>
                    </Avatar>
                    {doctorName && (
                      <span className="hidden sm:inline max-w-[160px] truncate text-sm font-medium text-white/90">
                        {doctorName}
                      </span>
                    )}
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <div
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200/70 bg-white z-20 py-1"
                        style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 16px 36px -16px rgba(15,23,42,0.22)" }}
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-ossohub-navy truncate">{doctorName}</p>
                          <p className="text-xs text-ossohub-slate">CRM {profile?.crm}</p>
                        </div>
                        <Link href={`/profile/${user.id}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-ossohub-slate hover:bg-slate-50 hover:text-ossohub-navy transition-colors">
                          <User className="h-4 w-4" /> Meu Perfil
                        </Link>
                        <Link href="/profile/edit"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-ossohub-slate hover:bg-slate-50 hover:text-ossohub-navy transition-colors">
                          <Pencil className="h-4 w-4" /> Editar Perfil
                        </Link>
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button onClick={signOut}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <LogOut className="h-4 w-4" /> Sair
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile menu */}
                <button className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
                  onClick={() => setMobileOpen((v) => !v)}>
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav — altura travada na tela menos a navbar, com rolagem
          própria (max-h + overflow-y-auto). Sem isso, em telas com muitos
          itens (Desempenho + todas as Ferramentas), o menu passava do
          tamanho da tela e não tinha como chegar até "Sair" no fim. */}
      {isAuthenticated && mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-medium transition-all duration-150",
                    active
                      ? "border-ossohub-green-dark/40 bg-ossohub-green-light/70 text-ossohub-green-dark shadow-sm"
                      : "border-slate-200/80 text-ossohub-slate hover:border-slate-300 hover:bg-slate-50"
                  )}>
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                    active
                      ? "bg-ossohub-green-dark text-white ring-ossohub-green-dark"
                      : "bg-slate-100 text-ossohub-slate ring-slate-200 group-hover:ring-transparent"
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 mt-1 space-y-1">
              <Button size="sm" className="w-full" asChild>
                <Link href="/post/new" onClick={() => setMobileOpen(false)}>+ Publicar</Link>
              </Button>
            </div>

            {/* Desempenho — destaque próprio, igual à sidebar desktop */}
            <div className="pt-3 border-t border-slate-100 mt-1">
              <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-ossohub-green-dark">
                Desempenho
              </p>
              <div className="space-y-1.5">
                {(profile?.professional_role === "medico_residente"
                  ? [...DESEMPENHO_LINKS, RESIDENT_ONLY_LINK]
                  : DESEMPENHO_LINKS
                ).map(({ href, label, icon: Icon }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all duration-150",
                        active
                          ? "border-ossohub-green-dark bg-ossohub-green-dark text-white shadow-sm"
                          : "border-ossohub-green-dark/25 bg-ossohub-green-light/50 text-ossohub-green-dark hover:border-ossohub-green-dark/50 hover:bg-ossohub-green-light"
                      )}>
                      <span className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                        active
                          ? "bg-white/15 text-white ring-white/20"
                          : "bg-white text-ossohub-green-dark ring-ossohub-green-dark/10 shadow-sm"
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Ferramentas — a sidebar fixa só aparece em telas maiores, então no
                mobile as ferramentas clínicas ficam listadas aqui dentro do menu,
                com o mesmo visual de retângulo + ícone da sidebar desktop. */}
            <div className="pt-3 border-t border-slate-100 mt-1 space-y-4">
              {TOOL_GROUPS.map((group) => {
                const style = GROUP_STYLES[group.label] ?? DEFAULT_GROUP_STYLE;
                return (
                  <div key={group.label}>
                    <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wider text-ossohub-slate/70">
                      {group.label}
                    </p>
                    <div className="space-y-1.5">
                      {group.items.map(({ slug, label }) => {
                        const Icon = TOOL_ICONS[slug];
                        const href = `/tools/${slug}`;
                        const active = pathname === href;
                        return (
                          <Link key={slug} href={href} onClick={() => setMobileOpen(false)}
                            className={cn(
                              "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-medium transition-all duration-150",
                              active
                                ? "border-ossohub-green-dark/40 bg-ossohub-green-light/70 text-ossohub-green-dark shadow-sm"
                                : cn("border-slate-200/80 text-ossohub-slate", style.hover)
                            )}>
                            <span className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                              active
                                ? "bg-ossohub-green-dark text-white ring-ossohub-green-dark"
                                : cn(style.icon, "group-hover:ring-transparent")
                            )}>
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
            </div>

            <div className="pt-2 border-t border-slate-100 mt-1">
              <button onClick={signOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
