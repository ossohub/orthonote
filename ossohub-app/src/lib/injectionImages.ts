// Figuras da aba Infiltrações e procedimentos minimamente invasivos.
// Tabela public.injection_images + bucket PRIVADO "infiltracao-figuras" no Supabase.
// O banco decide quem vê o quê: as figuras dos livros são só para administradores;
// visitantes só recebem imagens marcadas como públicas e não ocultas.
import { createClient } from "@/lib/supabase/client";
import type { InjectionImage } from "@/lib/types";
import { prepararImagem } from "@/lib/procedureImages";

export const BUCKET_INFILTRACAO = "infiltracao-figuras";
const VALIDADE_LINK = 60 * 60 * 6; // 6 h

export type FiguraInj = InjectionImage & { url: string | null; thumbUrl: string | null };

/** Busca as figuras de uma infiltração já com links assinados. */
export async function carregarFigurasInj(injectionId: string): Promise<FiguraInj[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("injection_images")
    .select("*")
    .eq("injection_id", injectionId)
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data?.length) return [];
  const linhas = data as InjectionImage[];
  const caminhos = Array.from(new Set(linhas.flatMap((l) => [l.storage_path, l.thumb_path].filter(Boolean) as string[])));
  const { data: assinados } = await supabase.storage.from(BUCKET_INFILTRACAO).createSignedUrls(caminhos, VALIDADE_LINK);
  const mapa = new Map<string, string>();
  for (const a of assinados ?? []) if (a.path && a.signedUrl) mapa.set(a.path, a.signedUrl);
  return linhas.map((l) => ({
    ...l,
    url: mapa.get(l.storage_path) ?? null,
    thumbUrl: (l.thumb_path && mapa.get(l.thumb_path)) || mapa.get(l.storage_path) || null,
  }));
}

const novoId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

async function enviarArquivos(injectionId: string, arquivo: File) {
  const supabase = createClient();
  const img = await prepararImagem(arquivo);
  const base = `upload/${injectionId}/${novoId()}`;
  const storage_path = `${base}.${img.ext}`;
  const thumb_path = `${base}-t.${img.ext}`;
  const st = supabase.storage.from(BUCKET_INFILTRACAO);
  const a = await st.upload(storage_path, img.full, { contentType: img.tipo, cacheControl: "31536000" });
  if (a.error) throw new Error(a.error.message);
  const b = await st.upload(thumb_path, img.thumb, { contentType: img.tipo, cacheControl: "31536000" });
  if (b.error) { await st.remove([storage_path]); throw new Error(b.error.message); }
  return { storage_path, thumb_path, width: img.width, height: img.height, st };
}

/** Envia uma imagem nova (só administrador — o banco bloqueia os demais). */
export async function incluirFiguraInj(arquivo: File, dados: { injection_id: string; step_index: number | null; caption?: string; sort?: number }) {
  const env = await enviarArquivos(dados.injection_id, arquivo);
  const { error } = await createClient().from("injection_images").insert({
    injection_id: dados.injection_id, step_index: dados.step_index, caption: dados.caption ?? "",
    sort: dados.sort ?? Date.now() % 1_000_000, source: "upload", visibility: "admin",
    storage_path: env.storage_path, thumb_path: env.thumb_path, width: env.width, height: env.height,
  });
  if (error) { await env.st.remove([env.storage_path, env.thumb_path]); throw new Error(error.message); }
}

/** Troca o arquivo de uma figura existente, mantendo legenda e posição. */
export async function substituirArquivoInj(fig: InjectionImage, arquivo: File) {
  const env = await enviarArquivos(fig.injection_id, arquivo);
  const { error } = await createClient().from("injection_images")
    .update({ storage_path: env.storage_path, thumb_path: env.thumb_path, width: env.width, height: env.height }).eq("id", fig.id);
  if (error) { await env.st.remove([env.storage_path, env.thumb_path]); throw new Error(error.message); }
  await env.st.remove([fig.storage_path, fig.thumb_path].filter(Boolean) as string[]);
}

export async function atualizarFiguraInj(id: string, campos: Partial<Pick<InjectionImage, "caption" | "step_index" | "visibility" | "hidden" | "sort">>) {
  const { error } = await createClient().from("injection_images").update(campos).eq("id", id);
  if (error) throw new Error(error.message);
}

/** Exclui de vez: apaga o registro e os arquivos. */
export async function excluirFiguraInj(fig: InjectionImage) {
  const supabase = createClient();
  const { error } = await supabase.from("injection_images").delete().eq("id", fig.id);
  if (error) throw new Error(error.message);
  await supabase.storage.from(BUCKET_INFILTRACAO).remove([fig.storage_path, fig.thumb_path].filter(Boolean) as string[]);
}
