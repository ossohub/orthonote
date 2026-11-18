// Figuras da aba Procedimentos Cirúrgicos.
// Tabela public.procedure_images + bucket PRIVADO "procedimento-figuras" no Supabase.
// O banco decide quem vê o quê: visitante só recebe imagens públicas e não ocultas;
// administrador vê todas (inclusive as do livro, que são só para administradores).
import { createClient } from "@/lib/supabase/client";
import type { ProcedureImage } from "@/lib/types";

export const BUCKET_FIGURAS = "procedimento-figuras";
const VALIDADE_LINK = 60 * 60 * 6; // 6 h

export type FiguraComUrl = ProcedureImage & { url: string | null; thumbUrl: string | null };

/** Busca as figuras do procedimento (e as do livro citadas nas etapas) já com links assinados. */
export async function carregarFiguras(procedureId: string, refs: string[]): Promise<FiguraComUrl[]> {
  const supabase = createClient();
  const filtros = [`procedure_id.eq.${procedureId}`];
  if (refs.length) filtros.push(`fig_ref.in.(${refs.map((r) => `"${r}"`).join(",")})`);
  const { data, error } = await supabase
    .from("procedure_images")
    .select("*")
    .or(filtros.join(","))
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data?.length) return [];
  const linhas = data as ProcedureImage[];
  const caminhos = Array.from(new Set(linhas.flatMap((l) => [l.storage_path, l.thumb_path].filter(Boolean) as string[])));
  const { data: assinados } = await supabase.storage.from(BUCKET_FIGURAS).createSignedUrls(caminhos, VALIDADE_LINK);
  const mapa = new Map<string, string>();
  for (const a of assinados ?? []) if (a.path && a.signedUrl) mapa.set(a.path, a.signedUrl);
  return linhas.map((l) => ({
    ...l,
    url: mapa.get(l.storage_path) ?? null,
    thumbUrl: (l.thumb_path && mapa.get(l.thumb_path)) || mapa.get(l.storage_path) || null,
  }));
}

/** Reduz a imagem no próprio aparelho (foto do iPhone pode ter 4000 px) e devolve arquivo + miniatura. */
export async function prepararImagem(arquivo: File): Promise<{ full: Blob; thumb: Blob; ext: string; tipo: string; width: number; height: number }> {
  const bmp = await carregarBitmap(arquivo);
  const tipo = suportaWebp() ? "image/webp" : "image/jpeg";
  const ext = tipo === "image/webp" ? "webp" : "jpg";
  const full = await redimensionar(bmp, 1600, tipo, 0.85);
  const thumb = await redimensionar(bmp, 480, tipo, 0.72);
  return { full: full.blob, thumb: thumb.blob, ext, tipo, width: full.w, height: full.h };
}

async function carregarBitmap(arquivo: File): Promise<HTMLImageElement | ImageBitmap> {
  if (typeof createImageBitmap === "function") {
    try { return await createImageBitmap(arquivo); } catch { /* cai para <img> */ }
  }
  const url = URL.createObjectURL(arquivo);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

let webpOk: boolean | null = null;
function suportaWebp() {
  if (webpOk === null) {
    try { webpOk = document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp"); } catch { webpOk = false; }
  }
  return webpOk;
}

function redimensionar(src: HTMLImageElement | ImageBitmap, max: number, tipo: string, q: number): Promise<{ blob: Blob; w: number; h: number }> {
  const w0 = "naturalWidth" in src ? src.naturalWidth : src.width;
  const h0 = "naturalHeight" in src ? src.naturalHeight : src.height;
  const k = Math.min(1, max / Math.max(w0, h0));
  const w = Math.round(w0 * k), h = Math.round(h0 * k);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff"; // fundo branco (PNG transparente vira branco, não preto)
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, 0, 0, w, h);
  return new Promise((ok, erro) => c.toBlob((b) => (b ? ok({ blob: b, w, h }) : erro(new Error("Não consegui converter a imagem"))), tipo, q));
}

const novoId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Envia uma imagem nova (só administrador — o banco bloqueia os demais). */
export async function incluirFigura(arquivo: File, dados: { procedure_id: string; step_index: number | null; fig_ref?: string | null; caption?: string; sort?: number }) {
  const supabase = createClient();
  const img = await prepararImagem(arquivo);
  const base = `upload/${dados.procedure_id}/${novoId()}`;
  const storage_path = `${base}.${img.ext}`;
  const thumb_path = `${base}-t.${img.ext}`;
  const st = supabase.storage.from(BUCKET_FIGURAS);
  const a = await st.upload(storage_path, img.full, { contentType: img.tipo, cacheControl: "31536000" });
  if (a.error) throw new Error(a.error.message);
  const b = await st.upload(thumb_path, img.thumb, { contentType: img.tipo, cacheControl: "31536000" });
  if (b.error) { await st.remove([storage_path]); throw new Error(b.error.message); }
  const { error } = await supabase.from("procedure_images").insert({
    procedure_id: dados.procedure_id, step_index: dados.step_index, fig_ref: dados.fig_ref || null,
    caption: dados.caption ?? "", sort: dados.sort ?? Date.now() % 1_000_000, source: "upload", visibility: "admin",
    storage_path, thumb_path, width: img.width, height: img.height,
  });
  if (error) { await st.remove([storage_path, thumb_path]); throw new Error(error.message); }
}

/** Troca o arquivo de uma figura existente, mantendo legenda e posição. */
export async function substituirArquivo(fig: ProcedureImage, arquivo: File) {
  const supabase = createClient();
  const img = await prepararImagem(arquivo);
  const base = `upload/${fig.procedure_id}/${novoId()}`;
  const storage_path = `${base}.${img.ext}`;
  const thumb_path = `${base}-t.${img.ext}`;
  const st = supabase.storage.from(BUCKET_FIGURAS);
  const a = await st.upload(storage_path, img.full, { contentType: img.tipo, cacheControl: "31536000" });
  if (a.error) throw new Error(a.error.message);
  const b = await st.upload(thumb_path, img.thumb, { contentType: img.tipo, cacheControl: "31536000" });
  if (b.error) { await st.remove([storage_path]); throw new Error(b.error.message); }
  const { error } = await supabase.from("procedure_images")
    .update({ storage_path, thumb_path, width: img.width, height: img.height }).eq("id", fig.id);
  if (error) { await st.remove([storage_path, thumb_path]); throw new Error(error.message); }
  await st.remove([fig.storage_path, fig.thumb_path].filter(Boolean) as string[]);
}

export async function atualizarFigura(id: string, campos: Partial<Pick<ProcedureImage, "caption" | "fig_ref" | "step_index" | "visibility" | "hidden" | "sort" | "procedure_id">>) {
  const { error } = await createClient().from("procedure_images").update(campos).eq("id", id);
  if (error) throw new Error(error.message);
}

/** Exclui de vez: apaga o registro e os arquivos. */
export async function excluirFigura(fig: ProcedureImage) {
  const supabase = createClient();
  const { error } = await supabase.from("procedure_images").delete().eq("id", fig.id);
  if (error) throw new Error(error.message);
  await supabase.storage.from(BUCKET_FIGURAS).remove([fig.storage_path, fig.thumb_path].filter(Boolean) as string[]);
}
