"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Compass, Users, Bell, User, Menu, X, LogOut, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn, getInitials } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/feed",          label: "Início",       icon: Home },
  { href: "/explore",       label: "Explorar",     icon: Compass },
  { href: "/network",       label: "Minha Rede",   icon: Users },
  { href: "/notifications", label: "Notificações", icon: Bell },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, profile, signOut } = useUser();

  const isLanding = pathname === "/" || pathname === "/login" || pathname === "/signup";
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="ossohub-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={isAuthenticated ? "/feed" : "/"}
            className="flex items-center hover:opacity-80 transition-opacity">
            <div className="flex items-center rounded-lg bg-ossohub-navy px-2.5 py-1.5">
              <img src="/logo.png" alt="OssoHub" className="h-6 w-auto" />
            </div>
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
                      : "text-ossohub-slate hover:bg-slate-100 hover:text-ossohub-navy"
                  )}>
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Direita */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
              <a href="https://ossohub.com" target="_blank" rel="noopener noreferrer">
                Ferramenta Clínica <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>

            {!isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild><Link href="/login">Entrar</Link></Button>
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
                    className="flex items-center gap-2 rounded-full border-2 border-transparent hover:border-ossohub-green/30 transition-colors p-0.5">
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
                <button className="md:hidden p-2 rounded-lg hover:bg-slate-100"
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
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="https://ossohub.com" target="_blank" rel="noopener noreferrer">
                  Ferramenta Clínica <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
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
