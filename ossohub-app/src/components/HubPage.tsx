import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSection, TONES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Página-resumo de uma área (Ortopedia Adulto, Pediatria, Estudos):
// reúne num só lugar todas as ferramentas e conteúdos daquela área.
export function HubPage({ sectionId, intro, aviso }: { sectionId: string; intro: string; aviso?: string }) {
  const section = getSection(sectionId);
  const tone = TONES[section.tone];
  const SectionIcon = section.icon;

  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: `radial-gradient(600px 220px at 85% 0%, ${tone.glow}, transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))` }}>
        <div className="flex items-center gap-3 mb-4">
          <span className={cn("oh-marker", tone.chip)}>{section.marker}</span>
          <span className="oh-eyebrow">{section.items.length} itens nesta área</span>
        </div>
        <div className="flex items-start gap-4">
          <span className={cn("hidden sm:grid h-14 w-14 shrink-0 place-items-center rounded-2xl border", tone.ring, tone.chip)}>
            <SectionIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{section.label}</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">{intro}</p>
          </div>
        </div>
        {aviso && (
          <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-4 py-3 text-[13px] leading-relaxed text-amber-100">
            {aviso}
          </p>
        )}
      </header>

      <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {section.items.map(({ href, label, icon: Icon, desc }, i) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl", tone.chip)}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="oh-mono text-[11px] text-[#8C9AB0]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2 className="flex items-center gap-1.5 text-base font-semibold text-white">
                  {label}
                  <ArrowUpRight className="h-4 w-4 text-[#8C9AB0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h2>
                {desc && <p className="mt-1 text-sm leading-relaxed text-[#A3B1C6]">{desc}</p>}
              </div>
            </>
          );
          return (
            <li key={href}>
              {href.endsWith(".html") ? (
                <a href={href} className="group oh-hub-card h-full">{inner}</a>
              ) : (
                <Link href={href} className="group oh-hub-card h-full">{inner}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
