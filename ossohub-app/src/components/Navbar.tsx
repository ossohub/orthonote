"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell, User, Menu, X, LogOut, Pencil, Plus, Home, Bone, Baby, Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn, getInitials } from "@/lib/utils";
import {
  NAV_SECTIONS, SOCIAL_LINKS, TONES, isActive, sectionForPath,
} from "@/lib/navigation";
import { SectionLinks } from "@/components/Sidebar";

// Barra inferior do celular — atalhos para as 4 áreas + menu completo.
const TAB_ITEMS = [
  { href: "/feed",      label: "Início",    icon: Home,          section: null },
  { href: "/ortopedia", label: "Adulto",    icon: Bone,          section: "ortopedia" },
  { href: "/pediatria", label: "Pediatria", icon: Baby,          section: "pediatria" },
  { href: "/pronto-socorro/adulto", label: "PS",  icon: Siren,         section: "ps" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const { user, profile, signOut } = useUser();

  const isAuthenticated = !!user;
  const isAdmin = profile?.app_role === "admin";
  const currentSection = sectionForPath(pathname);

  // "Dr." sempre na frente do nome, sem duplicar se o cadastro já tiver.
  const doctorName = profile?.full_name
    ? /^dr\.?\s/i.test(profile.full_name.trim())
      ? profile.full_name
      : `Dr. ${profile.full_name}`
    : null;

  // Fecha o menu do celular ao trocar de página.
  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [pathname]);

  // Avisa o CSS que a barra inferior está visível (reserva espaço embaixo).
  useEffect(() => {
    document.body.classList.toggle("oh-has-tabbar", isAuthenticated);
    return () => document.body.classList.remove("oh-has-tabbar");
  }, [isAuthenticated]);

  // Trava a rolagem do fundo enquanto o menu do celular está aberto.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  // Acessibilidade do menu: foco inicial, tecla Esc e navegação por Tab contida na gaveta.
  useEffect(() => {
    if (!mobileOpen) return;

    drawerCloseRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = document.querySelector<HTMLElement>("[data-oh-drawer]");
      const focusable = drawer?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className="oh-header sticky top-0 z-50 w-full">
        <div className={isAuthenticated ? "ossohub-shell" : "ossohub-container"}>
          <div className={cn(
            "flex h-16 items-center justify-between gap-3",
            isAuthenticated && "md:grid md:grid-cols-[auto_1fr_auto] md:gap-4"
          )}>
            <Link href={isAuthenticated ? "/feed" : "/"} className="flex items-center shrink-0" aria-label="OssoHub — início">
              <Image
                src="/logo.webp"
                alt="OssoHub"
                width={600}
                height={272}
                priority
                className="ossohub-logo h-9 w-auto"
              />
            </Link>

            {isAuthenticated && (
              <nav className="hidden md:flex items-center justify-center gap-1" aria-label="Rede">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => {
                  const active = isActive(pathname, href);
                  return (
                    <Link key={href} href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-white" : "text-[#A3B1C6] hover:text-white hover:bg-white/[0.05]"
                      )}>
                      <Icon className="h-4 w-4" />
                      {label}
                      {active && <span aria-hidden className="oh-underglow" />}
                    </Link>
                  );
                })}
              </nav>
            )}

            <div className="flex items-center gap-1.5 sm:gap-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" className="text-[#DCE3EE] hover:bg-white/10 hover:text-white" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button size="sm" asChild><Link href="/signup">Criar conta</Link></Button>
                </>
              ) : (
                <>
                  <Button size="sm" className="hidden sm:flex" asChild>
                    <Link href="/post/new"><Plus className="h-4 w-4" /> Publicar</Link>
                  </Button>

                  {/* Celular: atalhos rápidos no topo */}
                  <Link href="/post/new" aria-label="Publicar"
                    className="sm:hidden grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Plus className="h-4 w-4" />
                  </Link>
                  <Link href="/notifications" aria-label="Notificações"
                    className={cn(
                      "md:hidden grid h-9 w-9 place-items-center rounded-full hover:bg-white/10",
                      isActive(pathname, "/notifications") ? "text-[#FFD477]" : "text-[#DCE3EE]"
                    )}>
                    <Bell className="h-[18px] w-[18px]" />
                  </Link>

                  <div className="relative">
                    <button onClick={() => setDropdownOpen((v) => !v)}
                      aria-haspopup="menu" aria-expanded={dropdownOpen}
                      className="flex items-center gap-2.5 rounded-full border border-transparent hover:border-white/15 hover:bg-white/[0.04] transition-colors py-0.5 pl-0.5 sm:pr-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.photo_url ?? undefined} />
                        <AvatarFallback className="text-xs">{getInitials(profile?.full_name ?? "U")}</AvatarFallback>
                      </Avatar>
                      {doctorName && (
                        <span className="hidden sm:inline max-w-[160px] truncate text-sm font-medium text-[#DCE3EE]">
                          {doctorName}
                        </span>
                      )}
                    </button>

                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                        <div role="menu" className="oh-popover absolute right-0 top-full mt-2 w-56 z-20 py-1">
                          <div className="px-4 py-3 border-b border-white/[0.07]">
                            <p className="text-sm font-semibold text-white truncate">{doctorName}</p>
                            <p className="oh-mono text-[11px] text-[#A3B1C6]">CRM {profile?.crm}</p>
                          </div>
                          <Link href={`/profile/${user.id}`} role="menuitem"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#C9D3E1] hover:bg-white/[0.06] hover:text-white">
                            <User className="h-4 w-4" /> Meu Perfil
                          </Link>
                          <Link href="/profile/edit" role="menuitem"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#C9D3E1] hover:bg-white/[0.06] hover:text-white">
                            <Pencil className="h-4 w-4" /> Editar Perfil
                          </Link>
                          <div className="mt-1 pt-1 border-t border-white/[0.07]">
                            <button onClick={signOut} role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#FCA5A5] hover:bg-red-500/10">
                              <LogOut className="h-4 w-4" /> Sair
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Celular: barra inferior fixa ─────────────────────────── */}
      {isAuthenticated && (
        <nav className="oh-tabbar md:hidden" aria-label="Navegação principal">
          {TAB_ITEMS.map(({ href, label, icon: Icon, section }) => {
            const active = section ? currentSection?.id === section : isActive(pathname, href);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={cn("oh-tab", active && "is-active")}>
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
          <button type="button" onClick={() => setMobileOpen(true)}
            className={cn("oh-tab", mobileOpen && "is-active")} aria-label="Abrir menu completo"
            aria-expanded={mobileOpen} aria-controls="ossohub-mobile-drawer">
            <Menu className="h-5 w-5" />
            <span>Menu</span>
          </button>
        </nav>
      )}

      {/* ── Celular: menu completo (gaveta) ──────────────────────── */}
      {isAuthenticated && mobileOpen && (
        <div id="ossohub-mobile-drawer" data-oh-drawer className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="oh-drawer absolute inset-y-0 right-0 w-[min(88vw,360px)] flex flex-col">
            <div className="flex h-16 items-center justify-between px-4 border-b border-white/[0.07]">
              <span className="oh-mono text-[11px] uppercase tracking-[0.18em] text-[#A3B1C6]">Menu</span>
              <button ref={drawerCloseRef} type="button" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"
                className="grid h-9 w-9 place-items-center rounded-full text-[#DCE3EE] hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-5">
              <div>
                <p className="px-2 mb-1.5 oh-mono text-[11px] uppercase tracking-[0.14em] text-[#A3B1C6]">Rede</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => {
                    const active = isActive(pathname, href);
                    return (
                      <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium",
                          active ? "border-[#E9AE3B]/40 bg-[#E9AE3B]/10 text-[#FFD477]" : "border-white/[0.07] text-[#DCE3EE]"
                        )}>
                        <Icon className="h-4 w-4" /> {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {NAV_SECTIONS.filter((s) => !s.adminOnly || isAdmin).map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 px-2 mb-1">
                    <span className={cn("oh-marker", TONES[section.tone].chip)}>{section.marker}</span>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#A3B1C6]">{section.label}</p>
                  </div>
                  <SectionLinks section={section} pathname={pathname} onNavigate={() => setMobileOpen(false)} dense />
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.07] p-3">
              <button onClick={signOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#FCA5A5] hover:bg-red-500/10">
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
