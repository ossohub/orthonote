import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2, XCircle, ClipboardList, Wrench, BedDouble, Syringe, Lightbulb, TriangleAlert, HeartPulse,
  ChevronLeft, ChevronRight, BookOpen,
} from "lucide-react";
import { PROCEDIMENTOS, FONTE_CIR, secaoInfo } from "@/data/cirurgia";
import { cn } from "@/lib/utils";
import { AcoesCopiar, Tecnica } from "./DetalheClient";

export function generateStaticParams() {
  return PROCEDIMENTOS.map((p) => ({ secao: p.secao, id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secao: string; id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = PROCEDIMENTOS.find((x) => x.id === id);
  return p ? { title: `${p.titulo} — Procedimentos Cirúrgicos`, description: p.resumo } : { title: "Procedimentos Cirúrgicos" };
}

function Lista({ itens, cor }: { itens: string[]; cor: string }) {
  return (
    <ul className="space-y-1.5">
      {itens.map((t, i) => (
        <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-[#DCE3EE]">
          <span className={cn("mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full", cor)} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Bloco({ id, titulo, icone: Icone, children, className }: {
  id?: string; titulo: string; icone: React.ElementType; children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-32 rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-4 sm:p-5", className)}>
      <h2 className="mb-3 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wide text-[#EADFC8]">
        <Icone className="h-4 w-4" /> {titulo}
      </h2>
      {children}
    </section>
  );
}

const ATALHOS = [
  { href: "#indicacoes", label: "Indicações" },
  { href: "#preparo", label: "Preparo" },
  { href: "#tecnica", label: "Técnica" },
  { href: "#perolas", label: "Pérolas" },
  { href: "#posop", label: "Pós-op" },
];

export default async function ProcedimentoDetalhe({ params }: { params: Promise<{ secao: string; id: string }> }) {
  const { secao, id } = await params;
  const idx = PROCEDIMENTOS.findIndex((x) => x.id === id && x.secao === secao);
  if (idx < 0) notFound();
  const p = PROCEDIMENTOS[idx];
  const s = secaoInfo(p.secao)!;
  const ant = PROCEDIMENTOS[idx - 1];
  const prox = PROCEDIMENTOS[idx + 1];

  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-4xl">
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[12.5px]" aria-label="Trilha">
        <Link href="/procedimentos" className="oh-eyebrow">Procedimentos</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#8C9AB0]" />
        <Link href={`/procedimentos/${s.id}`} className="oh-eyebrow">{s.titulo}</Link>
      </nav>

      <header className="mb-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="oh-marker bg-[#38D5E0]/10 text-[#7FE7EE]">Cap. {p.cap}</span>
          <span className="oh-mono text-[11.5px] text-[#8C9AB0]">pp. {p.paginas} · {p.autores}</span>
        </div>
        <h1 className="text-[26px] font-bold leading-tight text-white sm:text-3xl">{p.titulo}</h1>
        <p className="oh-mono mt-1 text-[12px] text-[#8C9AB0]">{p.original}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#C9D3E1]">{p.resumo}</p>
        <div className="mt-4"><AcoesCopiar p={p} /></div>
      </header>

      <nav className="sticky top-16 z-10 -mx-1 mb-4 flex gap-1.5 overflow-x-auto bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur [scrollbar-width:none]" aria-label="Seções">
        {ATALHOS.map((a) => (
          <a key={a.href} href={a.href}
            className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1 text-[12.5px] font-medium text-[#C9D3E1] hover:border-[#38D5E0]/40 hover:text-white">
            {a.label}
          </a>
        ))}
      </nav>

      <div className="space-y-4">
        <div id="indicacoes" className="grid scroll-mt-32 gap-4 md:grid-cols-2">
          <Bloco titulo="Indicações" icone={CheckCircle2}><Lista itens={p.indicacoes} cor="bg-[#10B981]" /></Bloco>
          <Bloco titulo="Contraindicações" icone={XCircle}><Lista itens={p.contraindicacoes} cor="bg-[#F87171]" /></Bloco>
        </div>

        <Bloco id="preparo" titulo="Preparo pré-operatório" icone={ClipboardList}>
          <Lista itens={p.preparo} cor="bg-[#38D5E0]" />
        </Bloco>

        <div className="grid gap-4 md:grid-cols-2">
          <Bloco titulo="Material" icone={Wrench}><Lista itens={p.material} cor="bg-[#A3B1C6]" /></Bloco>
          <div className="space-y-4">
            <Bloco titulo="Posição" icone={BedDouble}><Lista itens={p.posicao} cor="bg-[#A3B1C6]" /></Bloco>
            {p.anestesia?.length ? (
              <Bloco titulo="Anestesia" icone={Syringe}><Lista itens={p.anestesia} cor="bg-[#A3B1C6]" /></Bloco>
            ) : null}
          </div>
        </div>

        <Bloco id="tecnica" titulo="Técnica operatória" icone={BookOpen} className="border-[#38D5E0]/25">
          <Tecnica p={p} />
        </Bloco>

        <div id="perolas" className="grid scroll-mt-32 gap-4 md:grid-cols-2">
          <Bloco titulo="Pérolas" icone={Lightbulb} className="border-[#EADFC8]/25 bg-[#EADFC8]/[0.03]">
            <Lista itens={p.perolas} cor="bg-[#EADFC8]" />
          </Bloco>
          <Bloco titulo="O que evitar" icone={TriangleAlert} className="border-[#F87171]/25 bg-[#F87171]/[0.03]">
            <Lista itens={p.evitar} cor="bg-[#F87171]" />
          </Bloco>
        </div>

        <Bloco id="posop" titulo="Pós-operatório" icone={HeartPulse}>
          <Lista itens={p.posop} cor="bg-[#10B981]" />
        </Bloco>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ant ? (
          <Link href={`/procedimentos/${ant.secao}/${ant.id}`} className="group flex min-w-0 items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 hover:border-white/20">
            <ChevronLeft className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
            <span className="min-w-0">
              <span className="block text-[11px] text-[#8C9AB0]">Cap. {ant.cap}</span>
              <span className="block truncate text-[13.5px] font-medium text-white">{ant.titulo}</span>
            </span>
          </Link>
        ) : <span />}
        {prox && (
          <Link href={`/procedimentos/${prox.secao}/${prox.id}`} className="group flex min-w-0 items-center justify-end gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 text-right hover:border-white/20">
            <span className="min-w-0">
              <span className="block text-[11px] text-[#8C9AB0]">Cap. {prox.cap}</span>
              <span className="block truncate text-[13.5px] font-medium text-white">{prox.titulo}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
          </Link>
        )}
      </div>

      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Base: {FONTE_CIR} (cap. {p.cap},
        pp. {p.paginas}). As figuras citadas (Fig. X–Y) são do livro e não são reproduzidas aqui; a numeração é a mesma
        do arquivo de figuras. A técnica do serviço e as instruções do fabricante do implante prevalecem.
      </p>
    </div>
  );
}
