import { notFound } from "next/navigation";
import { TOOL_GROUPS, getToolIframeUrl, type ToolSlug } from "@/lib/clinicalTool";

interface Props { params: Promise<{ slug: string }> }

const ALL_SLUGS = TOOL_GROUPS.flatMap((g) => g.items.map((i) => i.slug));

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  if (!ALL_SLUGS.includes(slug as ToolSlug)) notFound();

  const tool = TOOL_GROUPS.flatMap((g) => g.items).find((i) => i.slug === slug)!;
  const src = getToolIframeUrl(slug as ToolSlug);

  return (
    <iframe
      src={src}
      title={tool.label}
      className="w-full border-0 block"
      style={{ height: "calc(100vh - 4rem)" }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-downloads"
    />
  );
}
