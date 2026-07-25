import { notFound } from "next/navigation";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";

interface Props { params: Promise<{ slug: string }> }

const ALL_SLUGS = TOOL_GROUPS.flatMap((g) => g.items.map((i) => i.slug));

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  if (!ALL_SLUGS.includes(slug as ToolSlug)) notFound();

  // O conteúdo real (iframe da ferramenta clínica) é renderizado de forma
  // persistente em (main)/layout.tsx via <ClinicalToolFrame />. Isso é o
  // que permite trocar de ferramenta sem recarregar o iframe e sem pedir
  // login de novo — aqui só validamos que o slug existe (404 se não).
  return null;
}
