"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { TOOL_GROUPS, type ToolSlug } from "@/lib/clinicalTool";

const ALL_SLUGS = TOOL_GROUPS.flatMap((g) => g.items.map((i) => i.slug));

// "admin" é uma rota escondida (não aparece na Sidebar, mas /tools/admin
// funciona) — usa o próprio nome "admin" como código de aba (showTab('admin')
// no index.html), por isso não precisa de entrada em SLUG_TO_TOOL_CODE.
const HIDDEN_SLUGS = ["admin"];

// Mapeia o slug da URL (/tools/anamnese) para o código interno que o
// index.html da ferramenta clínica usa na função showTab(...).
const SLUG_TO_TOOL_CODE: Record<ToolSlug, string> = {
  anamnese: "anam",
  medicamentos: "med",
  documentos: "doc",
  "texto-salvo": "nota",
  classificacoes: "class",
  "vias-acesso": "via",
  "exame-fisico": "pe",
  calculadora: "calc",
  algoritmos: "algoritmos",
  pdf: "pdf",
};

// Senha da "sala" derivada automaticamente do usuário logado no OssoHub —
// assim o médico só precisa de UM login (o do OssoHub) e nunca vê uma tela
// pedindo sala/senha separada. Os dados continuam criptografados no
// Firestore como antes, só que a chave passa a vir da conta autenticada em
// vez de ser digitada toda vez.
function derivedRoomPassword(userId: string) {
  return `ossohub-clinical-${userId}`;
}

// Mantém a ferramenta clínica (index.html) montada em UM único iframe
// durante toda a navegação dentro do app — ele só fica escondido (não
// desmontado) quando o usuário sai de /tools/*. Isso evita que trocar de
// ferramenta na sidebar derrube a sessão e peça login de novo.
export function ClinicalToolFrame() {
  const pathname = usePathname();
  const { user } = useUser();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeLoaded = useRef(false);

  const match = pathname.match(/^\/tools\/([^/]+)/);
  const slug = match?.[1] as ToolSlug | undefined;
  const isToolsRoute =
    !!slug && (ALL_SLUGS.includes(slug) || HIDDEN_SLUGS.includes(slug));

  // Pra slugs "escondidos" (ex: admin) o código da aba é o próprio slug —
  // só as ferramentas normais precisam do mapeamento em SLUG_TO_TOOL_CODE.
  function toolCodeFor(s: string): string {
    return (SLUG_TO_TOOL_CODE as Record<string, string>)[s] ?? s;
  }

  function postAutoLogin() {
    const win = iframeRef.current?.contentWindow;
    if (!user || !win) return;
    win.postMessage(
      {
        type: "ossohub-auto-login",
        room: user.id,
        pwd: derivedRoomPassword(user.id),
        tool: isToolsRoute && slug ? toolCodeFor(slug) : undefined,
      },
      window.location.origin
    );
  }

  // Dispara o auto-login assim que (a) o iframe já carregou e (b) o usuário
  // do Supabase já foi resolvido — o que acontecer por último dispara aqui.
  useEffect(() => {
    if (iframeLoaded.current) postAutoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Troca de ferramenta pela sidebar não recarrega o iframe — só manda uma
  // mensagem pedindo pra trocar de aba internamente.
  useEffect(() => {
    if (!isToolsRoute || !slug || !iframeLoaded.current) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "ossohub-show-tool", tool: toolCodeFor(slug) },
      window.location.origin
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isToolsRoute]);

  function handleLoad() {
    iframeLoaded.current = true;
    postAutoLogin();
  }

  return (
    <iframe
      ref={iframeRef}
      src="/index.html"
      onLoad={handleLoad}
      title="Ferramenta Clínica"
      className="w-full border-0 block"
      style={{ height: "calc(100vh - 4rem)", display: isToolsRoute ? "block" : "none" }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-downloads"
    />
  );
}
