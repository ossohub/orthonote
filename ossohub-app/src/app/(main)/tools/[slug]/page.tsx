import { notFound } from "next/navigation";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";

interface Props { params: Promise<{ slug: string }> }

const ALL_SLUGS = TOOL_GROUPS.flatMap((g) => g.items.map((i) => i.slug));

// "admin" é uma rota escondida — não aparece na Sidebar, só quem sabe o
// endereço (/tools/admin) chega nela. A segurança de verdade é o login do
// Firebase Auth + regras do Firestore dentro do index.html, não isto aqui.
const HIDDEN_SLUGS = ["admin"];

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  if (!ALL_SLUGS.includes(slug as ToolSlug) && !HIDDEN_SLUGS.includes(slug)) notFound();

  // O conteúdo real (iframe da ferramenta clínica) é renderizado de forma
  // persistente em (main)/layout.tsx via <ClinicalToolFrame />. Isso é o
  // que permite trocar de ferramenta sem recarregar o iframe e sem pedir
  // login de novo — aqui só validamos que o slug existe (404 se não).
  return null;
}
