import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MUSCULOS, GRUPOS_MUSCULOS } from "@/data/musculos";

export const metadata: Metadata = { title: "Anatomia Muscular" };

export default function AnatomiaHub() {
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-6 sm:py-10 max-w-6xl">
      <header className="mb-6 rounded-3xl border border-[var(--line)] p-6 sm:p-8"
        style={{ background: "radial-gradient(600px 220px at 85% 0%, rgba(56,213,224,0.16), transparent 70%), linear-gradient(180deg, rgba(19,34,57,0.7), rgba(8,17,31,0.9))" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">MUS</span>
          <span className="oh-eyebrow">{MUSCULOS.length} músculos · piloto: membro superior</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Anatomia Muscular</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#A3B1C6]">
          Para cada músculo: origem, inserção, ação, inervação e vascularização, com um desenho animado que mostra
          essas etapas em sequência.
        </p>
      </header>

      <div className="space-y-6">
        {GRUPOS_MUSCULOS.map((g) => {
          const itens = MUSCULOS.filter((m) => m.grupo === g);
          if (!itens.length) return null;
          return (
            <section key={g}>
              <h2 className="oh-eyebrow mb-2">{g}</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {itens.map((m) => (
                  <li key={m.id}>
                    <Link href={`/anatomia/${m.id}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--film-2)] px-4 py-3 hover:border-[#38D5E0]/40">
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium text-white">{m.nome}</span>
                        <span className="oh-mono block truncate text-[11.5px] text-[#8C9AB0]">{m.latim}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para estudo, baseado em anatomia padrão. Os desenhos são esquemáticos, não substituem atlas.
        Confira origens, inserções, inervação e vascularização em um atlas de referência antes de usar em prova ou prática.
      </p>
    </div>
  );
}
