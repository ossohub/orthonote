import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2, XCircle, Wrench, Syringe, BedDouble, BookOpen, HeartPulse, TriangleAlert, Lightbulb, Ban,
  ChevronLeft, ChevronRight, Library,
} from "lucide-react";
import { INFILTRACOES, secaoInjInfo } from "@/data/infiltracoes";
import { citarFonte } from "@/data/infiltracoes/texto";
import { cn } from "@/lib/utils";
import { SeloGuia } from "../../InfiltracoesClient";
import { AcoesInj, TecnicaInj } from "./FigurasInj";

export function generateStaticParams() {
  return INFILTRACOES.map((p) => ({ secao: p.secao, id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secao: string; id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = INFILTRACOES.find((x) => x.id === id);
  return p ? { title: `${p.titulo} — Infiltrações`, description: p.resumo } : { title: "Infiltrações" };
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

export default async function InfiltracaoDetalhe({ params }: { params: Promise<{ secao: string; id: string }> }) {
  const { secao, id } = await params;
  const idx = INFILTRACOES.findIndex((x) => x.id === id && x.secao === secao);
  if (idx < 0) notFound();
  const p = INFILTRACOES[idx];
  const s = secaoInjInfo(p.secao)!;
  const ant = INFILTRACOES[idx - 1];
  const prox = INFILTRACOES[idx + 1];
  const temMaterial = !!(p.material?.length || p.medicacao?.length);
  const atalhos = [
    { href: "#indicacoes", label: "Indicações" },
    ...(temMaterial ? [{ href: "#material", label: "Material e dose" }] : []),
    { href: "#tecnica", label: "Técnica" },
    ...(p.posop?.length || p.complicacoes?.length ? [{ href: "#pos", label: "Pós e complicações" }] : []),
    ...(p.perolas?.length ? [{ href: "#perolas", label: "Pérolas" }] : []),
    { href: "#fontes", label: "Fontes" },
  ];

  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-4xl">
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[12.5px]" aria-label="Trilha">
        <Link href="/infiltracoes" className="oh-eyebrow">Infiltrações</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#8C9AB0]" />
        <Link href={`/infiltracoes/${s.id}`} className="oh-eyebrow">{s.titulo}</Link>
      </nav>

      <header className="mb-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <SeloGuia guia={p.guia} />
          {p.guiaNota && <span className="text-[12px] text-[#8C9AB0]">{p.guiaNota}</span>}
        </div>
        <h1 className="text-[26px] font-bold leading-tight text-white sm:text-3xl">{p.titulo}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#C9D3E1]">{p.resumo}</p>
        <div className="mt-4"><AcoesInj p={p} /></div>
      </header>

      <nav className="sticky top-16 z-10 -mx-1 mb-4 flex gap-1.5 overflow-x-auto bg-[var(--film-0)]/95 px-1 py-2 backdrop-blur [scrollbar-width:none]" aria-label="Seções">
        {atalhos.map((a) => (
          <a key={a.href} href={a.href}
            className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1 text-[12.5px] font-medium text-[#C9D3E1] hover:border-[#38D5E0]/40 hover:text-white">
            {a.label}
          </a>
        ))}
      </nav>

      <div className="space-y-4">
        <div id="indicacoes" className={cn("grid scroll-mt-32 gap-4", p.contraindicacoes?.length && "md:grid-cols-2")}>
          <Bloco titulo="Indicações" icone={CheckCircle2}><Lista itens={p.indicacoes} cor="bg-[#10B981]" /></Bloco>
          {p.contraindicacoes?.length ? (
            <Bloco titulo="Contraindicações" icone={XCircle}><Lista itens={p.contraindicacoes} cor="bg-[#F87171]" /></Bloco>
          ) : null}
        </div>

        {temMaterial && (
          <div id="material" className={cn("grid scroll-mt-32 gap-4", p.material?.length && p.medicacao?.length && "md:grid-cols-2")}>
            {p.material?.length ? <Bloco titulo="Material" icone={Wrench}><Lista itens={p.material} cor="bg-[#A3B1C6]" /></Bloco> : null}
            {p.medicacao?.length ? (
              <Bloco titulo="Medicação e dose" icone={Syringe} className="border-[#38D5E0]/25">
                <Lista itens={p.medicacao} cor="bg-[#38D5E0]" />
              </Bloco>
            ) : null}
          </div>
        )}

        {p.posicao?.length ? (
          <Bloco titulo="Posição" icone={BedDouble}><Lista itens={p.posicao} cor="bg-[#A3B1C6]" /></Bloco>
        ) : null}

        <Bloco id="tecnica" titulo="Técnica" icone={BookOpen} className="border-[#38D5E0]/25">
          <TecnicaInj p={p} />
        </Bloco>

        {(p.posop?.length || p.complicacoes?.length) ? (
          <div id="pos" className={cn("grid scroll-mt-32 gap-4", p.posop?.length && p.complicacoes?.length && "md:grid-cols-2")}>
            {p.posop?.length ? <Bloco titulo="Pós-procedimento" icone={HeartPulse}><Lista itens={p.posop} cor="bg-[#10B981]" /></Bloco> : null}
            {p.complicacoes?.length ? (
              <Bloco titulo="Complicações" icone={TriangleAlert} className="border-[#F87171]/25 bg-[#F87171]/[0.03]">
                <Lista itens={p.complicacoes} cor="bg-[#F87171]" />
              </Bloco>
            ) : null}
          </div>
        ) : null}

        {(p.perolas?.length || p.evitar?.length) ? (
          <div id="perolas" className={cn("grid scroll-mt-32 gap-4", p.perolas?.length && p.evitar?.length && "md:grid-cols-2")}>
            {p.perolas?.length ? (
              <Bloco titulo="Pérolas" icone={Lightbulb} className="border-[#EADFC8]/25 bg-[#EADFC8]/[0.03]">
                <Lista itens={p.perolas} cor="bg-[#EADFC8]" />
              </Bloco>
            ) : null}
            {p.evitar?.length ? (
              <Bloco titulo="O que evitar" icone={Ban} className="border-[#F87171]/25 bg-[#F87171]/[0.03]">
                <Lista itens={p.evitar} cor="bg-[#F87171]" />
              </Bloco>
            ) : null}
          </div>
        ) : null}

        <Bloco id="fontes" titulo="Fontes" icone={Library}>
          <ul className="space-y-1.5">
            {p.fontes.map((f) => (
              <li key={f} className="text-[13px] leading-relaxed text-[#A3B1C6]">{citarFonte(f)}</li>
            ))}
          </ul>
        </Bloco>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ant ? (
          <Link href={`/infiltracoes/${ant.secao}/${ant.id}`} className="group flex min-w-0 items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 hover:border-white/20">
            <ChevronLeft className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
            <span className="min-w-0">
              <span className="block text-[11px] text-[#8C9AB0]">{secaoInjInfo(ant.secao)?.curto}</span>
              <span className="block truncate text-[13.5px] font-medium text-white">{ant.titulo}</span>
            </span>
          </Link>
        ) : <span />}
        {prox && (
          <Link href={`/infiltracoes/${prox.secao}/${prox.id}`} className="group flex min-w-0 items-center justify-end gap-2 rounded-xl border border-[var(--line)] px-3 py-2.5 text-right hover:border-white/20">
            <span className="min-w-0">
              <span className="block text-[11px] text-[#8C9AB0]">{secaoInjInfo(prox.secao)?.curto}</span>
              <span className="block truncate text-[13.5px] font-medium text-white">{prox.titulo}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#8C9AB0]" />
          </Link>
        )}
      </div>

      <p className="mt-8 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-[#8C9AB0]">
        Conteúdo educativo para profissionais de saúde, resumido com palavras próprias. Doses são referências para adultos de
        porte médio — ajuste ao paciente e siga bula e regulamentação vigentes. As figuras dos livros aparecem só para
        administradores, por direito autoral.
      </p>
    </div>
  );
}
