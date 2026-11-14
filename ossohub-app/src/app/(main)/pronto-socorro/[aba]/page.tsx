import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PSClient, type Aba } from "../PSClient";

const ABAS: Aba[] = ["adulto", "pediatria", "calculadoras"];
const TITULOS: Record<Aba, string> = {
  adulto: "Prescrições do PS — Adulto",
  pediatria: "Prescrições do PS — Pediatria",
  calculadoras: "Calculadoras do PS",
};

export function generateStaticParams() {
  return ABAS.map((aba) => ({ aba }));
}

export async function generateMetadata({ params }: { params: Promise<{ aba: string }> }): Promise<Metadata> {
  const { aba } = await params;
  return { title: TITULOS[aba as Aba] ?? "Pronto-Socorro" };
}

export default async function ProntoSocorroAba({ params }: { params: Promise<{ aba: string }> }) {
  const { aba } = await params;
  if (!ABAS.includes(aba as Aba)) notFound();
  return (
    <Suspense fallback={null}>
      <PSClient aba={aba as Aba} />
    </Suspense>
  );
}
