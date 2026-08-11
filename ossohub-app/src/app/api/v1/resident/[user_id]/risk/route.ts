import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResidentRisk, getResidentRiskHistory } from "@/lib/residentRisk";

// ============================================================
// GET /api/v1/resident/[user_id]/risk
// ============================================================
// Endpoint de leitura da Análise Preditiva de Desempenho de UM usuário.
// Aberto pra qualquer perfil (não só médico_residente) — o nome
// "resident"/"residentRisk" no código é histórico (o módulo começou
// pensado só pra residentes) mas a regra de acesso nunca dependeu de
// profissão, só de identidade: "só o próprio dono dos dados vê" — não
// existe bypass de preceptor nem de admin aqui, porque risk_score é uma
// inferência sensível sobre a pessoa, não um resultado de prova.
//
// Autenticação: sessão de navegador normal (cookies), igual ao resto
// do app — createClient() de lib/supabase/server.ts. Nada de service
// role aqui na camada de autorização; a service role só é usada DEPOIS
// que já confirmamos que quem está pedindo é o próprio dono do dado.
//
// Fluxo de erros, nessa ordem:
//   401 unauthorized    — sem sessão válida
//   403 forbidden        — sessão válida, mas de outra pessoa
//   404 not_found        — user_id não corresponde a um perfil
//   403 consent_required — perfil existe mas ainda não aceitou o termo
//                          de consentimento (consent_logs)
//   200                  — shape pedido na spec do módulo (risk_score,
//                          risk_level, top_reasons, recommendations,
//                          last_updated) + um campo `history` aditivo
//                          com os últimos 90 dias, usado pelo gráfico
//                          de evolução do dashboard.
export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ user_id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { user_id: userId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "unauthorized", message: "Faça login para acessar sua Análise Preditiva de Desempenho." },
      { status: 401 }
    );
  }

  if (user.id !== userId) {
    return NextResponse.json(
      { error: "forbidden", message: "Você só pode acessar a sua própria Análise Preditiva de Desempenho." },
      { status: 403 }
    );
  }

  // A partir daqui já confirmamos que é o próprio dono do dado — o resto
  // das leituras usa o admin client só por conveniência (evita depender
  // de policies de SELECT extras em profiles/consent_logs pro próprio
  // usuário), nunca para dar acesso a dado de outra pessoa.
  const admin = createAdminClient();

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "not_found", message: "Perfil não encontrado." }, { status: 404 });
  }

  const { data: consent, error: consentError } = await admin
    .from("consent_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("consent_type", "analise_preditiva")
    .limit(1)
    .maybeSingle();

  if (consentError) {
    return NextResponse.json({ error: "internal_error", message: consentError.message }, { status: 500 });
  }

  if (!consent) {
    return NextResponse.json(
      {
        error: "consent_required",
        message: "É necessário aceitar o termo de consentimento (LGPD) para ver sua Análise Preditiva de Desempenho.",
      },
      { status: 403 }
    );
  }

  try {
    const [row, history] = await Promise.all([getResidentRisk(userId), getResidentRiskHistory(userId, 90)]);
    return NextResponse.json({
      risk_score: row.risk_score,
      risk_level: row.risk_level,
      top_reasons: row.top_reasons,
      recommendations: row.recommendations,
      last_updated: row.updated_at,
      // Campo adicional (fora da spec original, mas aditivo — não quebra
      // quem espera só os 5 campos acima): histórico de 90 dias pro
      // gráfico de evolução do dashboard, evita uma segunda chamada/
      // endpoint só pra isso.
      history: history.map((h) => ({
        date: h.date,
        engagement_score: h.engagement_score,
        risk_score: h.risk_score,
        xp_gain_30d: h.xp_gain_30d,
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "internal_error", message: err instanceof Error ? err.message : "Falha ao calcular risco." },
      { status: 500 }
    );
  }
}
