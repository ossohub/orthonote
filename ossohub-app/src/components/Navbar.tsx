"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Compass, Users, Bell, User, Menu, X, LogOut, Pencil, ClipboardList, CalendarClock, PieChart, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn, getInitials } from "@/lib/utils";
import { TOOL_GROUPS } from "@/lib/clinicalTool";

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
  { href: "/desempenho/equipe",      label: "Minha Equipe",      icon: Users2 },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, profile, signOut } = useUser();

  const isLanding = pathname === "/" || pathname === "/login" || pathname === "/signup";
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-ossohub-navy">
      <div className="ossohub-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={isAuthenticated ? "/feed" : "/"} className="flex items-center">
            <img src="/logo.png" alt="OssoHub" className="ossohub-logo h-7 w-auto" />
          </Link>

          {/* Nav links — autenticado */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
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

          {/* Direita */}
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
                  <Link href="/post/new">+ Publicar</Link>
                </Button>

                {/* Avatar dropdown */}
                <div className="relative">
                  <button onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border-2 border-transparent hover:border-ossohub-green/50 transition-colors p-0.5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.photo_url ?? undefined} />
                      <AvatarFallback className="text-xs">{getInitials(profile?.full_name ?? "U")}</AvatarFallback>
                    </Avatar>
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg z-20 py-1">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-ossohub-navy truncate">{profile?.full_name}</p>
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

      {/* Mobile Nav */}
      {isAuthenticated && mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname.startsWith(href)
                    ? "bg-ossohub-green-light text-ossohub-green-dark"
                    : "text-ossohub-slate hover:bg-slate-100"
                )}>
                <Icon className="h-4 w-4" />{label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-1 space-y-1">
              <Button size="sm" className="w-full" asChild>
                <Link href="/post/new" onClick={() => setMobileOpen(false)}>+ Publicar</Link>
              </Button>
            </div>

            {/* Desempenho — destaque próprio, igual à sidebar desktop */}
            <div className="pt-3 border-t border-slate-100 mt-1">
              <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-ossohub-green">
                Desempenho
              </p>
              {DESEMPENHO_LINKS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2.5 mb-1 text-sm font-semibold transition-colors",
                    pathname.startsWith(href)
                      ? "border-ossohub-green bg-ossohub-green/10 text-ossohub-green"
                      : "border-ossohub-green/30 bg-ossohub-green/5 text-ossohub-green hover:bg-ossohub-green/10"
                  )}>
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              ))}
            </div>

            {/* Ferramentas — a sidebar fixa só aparece em telas maiores, então no
                mobile as ferramentas clínicas ficam listadas aqui dentro do menu. */}
            <div className="pt-3 border-t border-slate-100 mt-1">
              {TOOL_GROUPS.map((group) => (
                <div key={group.label} className="mb-2">
                  <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-ossohub-slate">
                    {group.label}
                  </p>
                  {group.items.map(({ slug, label }) => (
                    <Link key={slug} href={`/tools/${slug}`} onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        pathname === `/tools/${slug}`
                          ? "bg-ossohub-green-light text-ossohub-green-dark"
                          : "text-ossohub-slate hover:bg-slate-100"
                      )}>
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
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
