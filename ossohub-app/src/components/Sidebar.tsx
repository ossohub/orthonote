"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import {
  NAV_SECTIONS, TONES, isActive, sectionForPath, type NavSection,
} from "@/lib/navigation";

/** Lista de links de uma seção — usada na barra lateral e no menu do celular. */
export function SectionLinks({
  section, pathname, onNavigate, dense = false,
}: { section: NavSection; pathname: string; onNavigate?: () => void; dense?: boolean }) {
  const tone = TONES[section.tone];
  const links = section.hub
    ? [{ href: section.hub, label: "Visão geral", icon: LayoutDashboard }, ...section.items]
    : section.items;

  return (
    <ul className={cn("space-y-0.5", dense ? "pl-0" : "pl-2")}>
      {links.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                active
                  ? cn("bg-white/[0.06]", tone.text)
                  : "text-[#C9D3E1] hover:bg-white/[0.04] hover:text-white"
              )}
            >
              {/* filete de luz à esquerda — como a borda acesa do negatoscópio */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full transition-opacity",
                  active ? "opacity-100" : "opacity-0"
                )}
                style={{ background: "currentColor", boxShadow: `0 0 10px ${tone.glow}` }}
              />
              <Icon className={cn("h-4 w-4 shrink-0", active ? "" : "text-[#8C9AB0] group-hover:text-[#C9D3E1]")} />
              <span className="truncate">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUser();
  const isAdmin = profile?.app_role === "admin";
  const current = sectionForPath(pathname);

  // Estado local evita leitura síncrona do navegador durante a hidratação.
  // A seção correspondente à rota atual permanece sempre aberta.
  const [open, setOpen] = useState<string[]>(["consultorio"]);

  function toggle(id: string) {
    setOpen((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  return (
    <aside
      className="oh-sidebar hidden md:block w-64 shrink-0 sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
      aria-label="Ferramentas e conteúdos"
    >
      <nav className="py-5 pl-1 pr-3 space-y-1">
        {NAV_SECTIONS.filter((s) => !s.adminOnly || isAdmin).map((section) => {
          const tone = TONES[section.tone];
          const isCurrent = current?.id === section.id;
          const isOpen = isCurrent || open.includes(section.id);
          return (
            <div key={section.id} className="pb-1">
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-white/[0.03]"
              >
                <span className={cn("oh-marker", tone.chip)}>{section.marker}</span>
                <span className={cn(
                  "flex-1 truncate text-[12px] font-semibold uppercase tracking-[0.1em]",
                  isCurrent ? tone.text : "text-[#A3B1C6] group-hover:text-[#DCE3EE]"
                )}>
                  {section.label}
                </span>
                <ChevronDown
                  className={cn("h-3.5 w-3.5 text-[#6B7A90] transition-transform", isOpen ? "" : "-rotate-90")}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="mt-0.5 mb-2">
                  <SectionLinks section={section} pathname={pathname} />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
