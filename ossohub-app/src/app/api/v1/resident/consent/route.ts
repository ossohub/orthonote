import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================
// POST /api/v1/resident/consent
// ============================================================
// Registra o consentimento LGPD do residente para o módulo de Análise
// Preditiva de Desempenho. Reaproveita a tabela public.consent_logs que
// já existia no banco (mesma usada para termos_de_uso/cookies) — só
// grava uma linha nova com consent_type = 'analise_preditiva'.
//
// A identidade vem SEMPRE da sessão (createClient()/auth.getUser()) —
// nunca de um body/param que o cliente poderia forjar. Depois de
// resolvida a identidade, a leitura/escrita em si usa o admin client
// (service_role) só por conveniência de tipos (o client de sessão do
// @supabase/ssr tem uma inferência de tabela quebrada neste projeto —
// mesmo problema pré-existente em vários outros arquivos que usam
// createClient() para tabelas, não algo introduzido aqui). A policy
// "consent_logs_insert_own" já garantiria o mesmo isolamento por
// auth.uid() mesmo se usássemos o client de sessão; aqui reforçamos o
// isolamento manualmente filtrando/gravando sempre por `user.id`.
//
// GET devolve se o residente logado já consentiu (usado pelo dashboard
// pra decidir se mostra o gate de consentimento ou o conteúdo).
export const runtime = "nodejs";

const CONSENT_TYPE = "analise_preditiva" as const;
const CURRENT_POLICY_VERSION = "1.0";

const bodySchema = z.object({
  policy_version: z.string().min(1).max(20).optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "unauthorized", message: "Faça login para continuar." }, { status: 401 });
  }

  const rawBody = await request.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body", message: parsed.error.message }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("consent_logs").insert({
    user_id: user.id,
    consent_type: CONSENT_TYPE,
    policy_version: parsed.data.policy_version ?? CURRENT_POLICY_VERSION,
  });

  if (error) {
    return NextResponse.json({ error: "internal_error", message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "unauthorized", message: "Faça login para continuar." }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("consent_logs")
    .select("accepted_at, policy_version")
    .eq("user_id", user.id)
    .eq("consent_type", CONSENT_TYPE)
    .order("accepted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "internal_error", message: error.message }, { status: 500 });
  }

  return NextResponse.json({ consented: !!data, accepted_at: data?.accepted_at ?? null });
}
