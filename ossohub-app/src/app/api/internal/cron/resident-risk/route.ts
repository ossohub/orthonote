import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { recomputeAllResidentsRisk } from "@/lib/residentRisk";

// ============================================================
// POST /api/internal/cron/resident-risk
// ============================================================
// Recalcula o risk_score de TODOS os residentes elegíveis
// (profiles.professional_role = 'medico_residente') e grava um novo
// snapshot em resident_features para hoje. Pensado pra rodar 1x/dia via
// Vercel Cron (ver "crons" em vercel.json) — mas também pode ser
// chamado manualmente durante teste com o mesmo header de autenticação.
//
// Autenticação: header "Authorization: Bearer <CRON_SECRET>" — usa o
// nome de variável CRON_SECRET de propósito (não um nome customizado)
// porque é a convenção reconhecida pela Vercel: se essa env var estiver
// configurada no projeto, a Vercel injeta esse header automaticamente
// em toda chamada disparada pelo Cron Jobs (ver "crons" em vercel.json),
// sem precisar de nenhuma configuração extra de header por job.
// https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
// Comparação em tempo constante, mesmo padrão de
// src/app/api/automation/posts/route.ts. Também aceita ?secret=... na
// querystring como fallback pra chamada manual durante teste.
//
// Esse endpoint NUNCA deve ser exposto sem segredo: ele dispara N
// leituras/escritas usando a service_role key (via
// recomputeAllResidentsRisk, que já usa createAdminClient() por dentro).
export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;

  const header = req.headers.get("authorization") ?? "";
  const fromHeader = header.startsWith("Bearer ") ? header.slice(7) : "";
  const fromQuery = req.nextUrl.searchParams.get("secret") ?? "";
  const provided = fromHeader || fromQuery;
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function run(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await recomputeAllResidentsRisk();
    return NextResponse.json({
      ok: true,
      processed: result.processed,
      failed_count: result.failed.length,
      failed: result.failed,
      ran_at: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "internal_error", message: err instanceof Error ? err.message : "Falha ao recalcular riscos." },
      { status: 500 }
    );
  }
}

// POST para chamadas server-to-server "de verdade" (automação/teste manual).
export async function POST(req: NextRequest) {
  return run(req);
}

// GET também aceito: Vercel Cron faz requisições GET nos jobs configurados
// em vercel.json — ver a seção "crons" adicionada lá.
export async function GET(req: NextRequest) {
  return run(req);
}
