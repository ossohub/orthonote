import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PostType } from "@/lib/types";

// ============================================================
// POST /api/automation/posts
// ============================================================
// Endpoint server-to-server (sem sessão de navegador) que faz o
// mesmo trabalho do botão "Publicar" do app — pensado para ser
// chamado pelo Claude a partir de uma atividade programada
// (mcp__scheduled-tasks), usando uma API key própria em vez de
// login interativo.
//
// Autenticação: header "Authorization: Bearer <AUTOMATION_API_KEY>".
// A chave é comparada em tempo constante (timingSafeEqual) pra não
// vazar informação por diferença de tempo de resposta.
//
// O post é sempre publicado em nome de AUTOMATION_AUTHOR_ID (o
// próprio médico dono do site) — a chave de API não escolhe autor.
// A moderação segue a mesma regra do app: o trigger do banco
// (trg_set_post_moderation_status) marca como "pending" sozinho se
// vier foto/vídeo.
//
// Fora do escopo (de propósito, por enquanto):
// - Upload de arquivo binário (a chamada recebe URLs já hospedadas
//   em image_urls/video_url, se quiser incluir mídia).
// - Concessão de XP/badges: a RPC award_self_xp exige auth.uid()
//   de uma sessão de usuário real, que não existe aqui (chamada é
//   feita com a service_role key). Posts automatizados não geram
//   XP — é intencional, não um bug.
// ============================================================

export const runtime = "nodejs";

const POST_TYPES: PostType[] = ["clinical_case", "scientific_article", "experience", "question"];

const bodySchema = z.object({
  type: z.enum(["clinical_case", "scientific_article", "experience", "question"]),
  title: z.string().min(10).max(200),
  content: z.string().min(50),
  tags: z.array(z.string()).max(10).optional().default([]),
  structured_data: z
    .object({
      age_range: z.string().optional(),
      sex: z.enum(["M", "F", "outro"]).optional(),
      mechanism: z.string().optional(),
      physical_exam: z.string().optional(),
      diagnosis: z.string().optional(),
      treatment: z.string().optional(),
      discussion: z.string().optional(),
    })
    .optional(),
  image_urls: z.array(z.string().url()).max(6).optional().default([]),
  video_url: z.string().url().optional(),
});

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.AUTOMATION_API_KEY;
  if (!expected) return false;

  const header = req.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const authorId = process.env.AUTOMATION_AUTHOR_ID;
  if (!authorId) {
    return NextResponse.json(
      { error: "server misconfigured: AUTOMATION_AUTHOR_ID não definido" },
      { status: 500 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "corpo da requisição não é um JSON válido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validação falhou", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { type, title, content, tags, structured_data, image_urls, video_url } = parsed.data;

  if (!POST_TYPES.includes(type)) {
    return NextResponse.json({ error: "type inválido" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      user_id: authorId,
      type,
      title,
      content,
      structured_data: structured_data ?? null,
      tags,
      image_urls,
      video_url: video_url ?? null,
    })
    .select("id, moderation_status")
    .single();

  if (error || !post) {
    return NextResponse.json({ error: error?.message ?? "falha ao criar post" }, { status: 500 });
  }

  return NextResponse.json(
    {
      id: post.id,
      url: `https://ossohub.com/post/${post.id}`,
      moderation_status: post.moderation_status,
    },
    { status: 201 }
  );
}
