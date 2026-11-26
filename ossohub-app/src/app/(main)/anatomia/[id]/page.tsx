import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Zap, Activity, Lightbulb, ChevronLeft, ChevronRight, Waves, GitBranch } from "lucide-react";
import { MUSCULOS, acharMusculo } from "@/data/musculos";
import { cn } from "@/lib/utils";
import { DiagramaMusculo } from "./DiagramaMusculo";

export function generateStaticParams() {
  return MUSCULOS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = acharMusculo(id);
  return m ? { title: `${m.nome} — Anatomia Muscular` } : { title: "Anatomia Muscular" };
}

function Bloco({ titulo, icone: Icone, children, className }: {
  titulo: string; icone: React.ElementType; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-4 sm:p-5", className)}>
      <h2 className="mb-3 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wide text-[#EADFC8]">
        <Icone className="h-4 w-4" /> {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function MusculoDetalhe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = MUSCULOS.findIndex((x) => x.id === id);
  if (idx < 0) notFound();
  const m = MUSCULOS[idx];
  const ant = MUSCULOS[idx - 1];
  const prox = MUSCULOS[idx + 1];

  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-5xl">
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[12.5px]" aria-label="Trilha">
        <Link href="/anatomia" className="oh-eyebrow">Anatomia Muscular</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#8C9AB0]" />
        <span className="oh-eyebrow">{m.grupo}</span>
      </nav>

      <header className="mb-5">
        <h1 className="text-[26px] font-bold leading-tight text-white sm:text-3xl">{m.nome}</h1>
        <p className="oh-mono mt-1 text-[12px] text-[#8C9AB0]">{m.latim}</p>
      </header>

      <Bloco titulo="Passo a passo animado" icone={Zap} className="mb-4 border-[#38D5E0]/25">
        <DiagramaMusculo m={m} />
      </Bloco>

      <div className="grid gap-4 md:grid-cols-2">
        <Bloco titulo="Origem" icone={CheckCircle2}>
          <ul className="space-y-1.5">{m.origem.map((t, i) => <li key={i} className="text-[14px] leading-relaxed text-[#DCE3EE]">• {t}</li>)}</ul>
        </Bloco>
        <Bloco titulo="Inserção" icone={CheckCircle2}>
          <ul className="space-y-1.5">{m.insercao.map((t, i) => <li key={i} className="text-[14px] leading-relaxed text-[#DCE3EE]">• {t}</li>)}</ul>
        </Bloco>
        <Bloco titulo="Ação" icone={Activity}>
          <p className="text-[14px] leading-relaxed text-[#DCE3EE]">{m.acao}</p>
        </Bloco>
        <Bloco titulo="Inervação" icone={GitBranch}>
          <p className="text-[14px] leading-relaxed text-[#DCE3EE]">{m.inervacao}</p>
        </Bloco>
        <Bloco titulo="Vascularização" icone={Waves} className="md:col-span-2">
          <ul className="space-y-1.5">{m.vascularizacao.map((t, i) => <li key={i} className="text-[14px] leading-relaxed text-[#DCE3EE]">• {t}</li>)}</ul>
        </Bloco>
        {m.dica && (
          <Bloco titulo="Pérola clínica" icone={Lightbulb} className="md:col-span-2 border-[#EADFC8]/25 bg-[#EADFC8]/[0.03]">
            <p className="text-[14px] leading-relaxed text-[#DCE3EE]">{m.dica}</p>
          </Bloco>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ant ? (
          <Link href={`/anatomia/${ant.id}`} className="group flex min-w-0 items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 hover:border-white/20">
            <ChevronLeft className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
            <span className="block truncate text-[13.5px] font-medium text-white">{ant.nome}</span>
          </Link>
        ) : <span />}
        {prox && (
          <Link href={`/anatomia/${prox.id}`} className="group flex min-w-0 items-center justify-end gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 text-right hover:border-white/20">
            <span className="block truncate text-[13.5px] font-medium text-white">{prox.nome}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
          </Link>
        )}
      </div>

      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo baseado em anatomia padrão, sem reprodução de figuras de livros. Os desenhos são esquemáticos;
        confirme origens, inserções, inervação e vascularização em atlas de referência.
      </p>
    </div>
  );
}
