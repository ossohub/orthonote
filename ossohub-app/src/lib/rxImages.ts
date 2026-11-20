// Imagens da aba Mensuração Radiográfica.
// Tabela public.rx_images (todos leem; só administrador inclui, edita e exclui)
// + bucket público "mensuracao-figuras" para as imagens enviadas pelo site.
import { createClient } from "@/lib/supabase/client";
import { prepararImagem } from "@/lib/procedureImages";
import type { RxImage } from "@/lib/types";

const BUCKET = "mensuracao-figuras";

export type RxImagem = RxImage & { url: string };

export async function carregarImagensRx(): Promise<Record<string, RxImagem[]>> {
  const supabase = createClient();
  const { data, error } = await supabase.from("rx_images").select("*")
    .order("sort", { ascending: true }).order("created_at", { ascending: true }).limit(5000);
  if (error || !data) return {};
  const st = supabase.storage.from(BUCKET);
  const mapa: Record<string, RxImagem[]> = {};
  for (const r of data as RxImage[]) {
    const url = r.src_static ?? (r.storage_path ? st.getPublicUrl(r.storage_path).data.publicUrl : "");
    if (!url) continue;
    (mapa[r.medida_id] ??= []).push({ ...r, url });
  }
  return mapa;
}

const novoId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

export async function incluirImagemRx(medidaId: string, arquivo: File, sort: number) {
  const supabase = createClient();
  const img = await prepararImagem(arquivo);
  const storage_path = `${medidaId}/${novoId()}.${img.ext}`;
  const up = await supabase.storage.from(BUCKET).upload(storage_path, img.full, { contentType: img.tipo, cacheControl: "31536000" });
  if (up.error) throw new Error(up.error.message);
  const { error } = await supabase.from("rx_images").insert({
    medida_id: medidaId, storage_path, caption: "", width: img.width, height: img.height, sort,
  });
  if (error) { await supabase.storage.from(BUCKET).remove([storage_path]); throw new Error(error.message); }
}

export async function salvarLegendaRx(id: string, caption: string) {
  const { error } = await createClient().from("rx_images").update({ caption }).eq("id", id);
  if (error) throw new Error(error.message);
}

/** Exclui a imagem do site. Se foi enviada pelo site, apaga também o arquivo. */
export async function excluirImagemRx(img: RxImage) {
  const supabase = createClient();
  const { error } = await supabase.from("rx_images").delete().eq("id", img.id);
  if (error) throw new Error(error.message);
  if (img.storage_path) await supabase.storage.from(BUCKET).remove([img.storage_path]);
}
