"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { unzip, strFromU8, type Unzipped } from "fflate";
import { PackageOpen, Loader2, CheckCircle2, AlertTriangle, Lock } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { BUCKET_FIGURAS } from "@/lib/procedureImages";

// Pacote = .zip com manifest.json + os arquivos .webp nos caminhos indicados.
type ItemPacote = {
  procedure_id: string; fig_ref: string | null; part: string | null; sort: number; caption: string | null;
  legenda_original: string | null; page: number | null; width: number | null; height: number | null;
  storage_path: string; thumb_path: string; source: "stern2001" | "upload"; visibility: "admin" | "public";
};

const abrirZip = (dados: Uint8Array) => new Promise<Unzipped>((ok, erro) => unzip(dados, (e, r) => (e ? erro(e) : ok(r))));

export function ImportarClient() {
  const { user, profile, loading } = useUser();
  const isAdmin = profile?.app_role === "admin";
  const entrada = useRef<HTMLInputElement>(null);
  const pacote = useRef<{ arquivos: Unzipped; itens: ItemPacote[] } | null>(null);
  const [fase, setFase] = useState<"inicio" | "lendo" | "enviando" | "fim">("inicio");
  const [total, setTotal] = useState(0);
  const [feitas, setFeitas] = useState(0);
  const [puladas, setPuladas] = useState(0);
  const [falhas, setFalhas] = useState<string[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  if (loading) return <p className="py-10 text-center text-[#A3B1C6]"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></p>;
  if (!user || !isAdmin) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-6 text-center">
        <Lock className="mx-auto mb-2 h-6 w-6 text-[#8C9AB0]" />
        <p className="text-[15px] text-white">Área só para administradores.</p>
        <Link href="/login" className="mt-3 inline-block text-[13px] font-medium text-[#7FE7EE] hover:underline">Entrar</Link>
      </div>
    );
  }

  async function enviar(itens: ItemPacote[], arquivos: Unzipped) {
    const supabase = createClient();
    const st = supabase.storage.from(BUCKET_FIGURAS);
    setFase("enviando"); setFalhas([]); setFeitas(0); setPuladas(0); setTotal(itens.length);

    const { data: existentes } = await supabase.from("procedure_images").select("storage_path").limit(5000);
    const ja = new Set((existentes ?? []).map((x) => x.storage_path as string));

    let i = 0;
    const erros: string[] = [];
    const trabalhador = async () => {
      while (i < itens.length) {
        const it = itens[i++];
        if (ja.has(it.storage_path)) { setPuladas((n) => n + 1); setFeitas((n) => n + 1); continue; }
        try {
          const full = arquivos[it.storage_path];
          const thumb = arquivos[it.thumb_path];
          if (!full || !thumb) throw new Error("arquivo ausente no pacote");
          const tipo = it.storage_path.endsWith(".webp") ? "image/webp" : it.storage_path.endsWith(".png") ? "image/png" : "image/jpeg";
          const a = await st.upload(it.storage_path, new Blob([full as BlobPart], { type: tipo }), { contentType: tipo, upsert: true, cacheControl: "31536000" });
          if (a.error) throw new Error(a.error.message);
          const b = await st.upload(it.thumb_path, new Blob([thumb as BlobPart], { type: tipo }), { contentType: tipo, upsert: true, cacheControl: "31536000" });
          if (b.error) throw new Error(b.error.message);
          const { error } = await supabase.from("procedure_images").insert(it);
          if (error) throw new Error(error.message);
        } catch (e) {
          erros.push(`${it.fig_ref ?? it.storage_path}${it.part ?? ""}: ${(e as Error).message}`);
          setFalhas([...erros]);
        }
        setFeitas((n) => n + 1);
      }
    };
    await Promise.all([trabalhador(), trabalhador(), trabalhador(), trabalhador()]);
    setFase("fim");
  }

  async function escolher(arquivo: File) {
    setErro(null); setFase("lendo");
    try {
      const arquivos = await abrirZip(new Uint8Array(await arquivo.arrayBuffer()));
      const m = arquivos["manifest.json"];
      if (!m) throw new Error("Este .zip não é um pacote de figuras do OssoHub (falta o manifest.json).");
      const itens = JSON.parse(strFromU8(m)) as ItemPacote[];
      pacote.current = { arquivos, itens };
      await enviar(itens, arquivos);
    } catch (e) {
      setErro((e as Error).message || "Não consegui ler o arquivo.");
      setFase("inicio");
    }
  }

  const pct = total ? Math.round((feitas / total) * 100) : 0;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-5">
        <ol className="mb-4 space-y-1.5 text-[14px] leading-relaxed text-[#DCE3EE]">
          <li>1. Salve o pacote de figuras (.zip) no app Arquivos do iPhone.</li>
          <li>2. Toque em “Escolher pacote” e selecione o arquivo.</li>
          <li>3. Deixe esta tela aberta até terminar (alguns minutos).</li>
        </ol>
        <button type="button" disabled={fase === "lendo" || fase === "enviando"} onClick={() => entrada.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#A78BFA] px-4 py-2.5 text-[14px] font-semibold text-[#1E1B4B] disabled:opacity-60">
          {fase === "lendo" || fase === "enviando" ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageOpen className="h-4 w-4" />}
          {fase === "lendo" ? "Abrindo o pacote…" : fase === "enviando" ? "Enviando…" : "Escolher pacote"}
        </button>
        <input ref={entrada} type="file" accept=".zip,application/zip,application/x-zip-compressed" hidden
          onChange={(e) => { const a = e.target.files?.[0]; e.target.value = ""; if (a) void escolher(a); }} />
        {erro && <p className="mt-3 rounded-lg border border-[#F87171]/40 bg-[#F87171]/10 px-3 py-2 text-[13px] text-[#FCA5A5]">{erro}</p>}
      </div>

      {(fase === "enviando" || fase === "fim") && (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--film-2)] p-5">
          <div className="mb-2 flex items-center justify-between text-[13px]">
            <span className="text-white">{feitas} de {total}</span>
            <span className="text-[#8C9AB0]">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#A78BFA] transition-[width]" style={{ width: `${pct}%` }} />
          </div>
          {fase === "fim" && (
            <div className="mt-4 space-y-2 text-[14px]">
              <p className="flex items-center gap-2 text-[#6EE7B7]"><CheckCircle2 className="h-4 w-4" />
                Pronto: {total - puladas - falhas.length} enviadas{puladas ? `, ${puladas} já existiam` : ""}.</p>
              {falhas.length > 0 && (
                <>
                  <p className="flex items-center gap-2 text-amber-200"><AlertTriangle className="h-4 w-4" /> {falhas.length} falharam:</p>
                  <ul className="max-h-40 overflow-y-auto rounded-lg bg-black/20 p-2 text-[12px] text-[#FCA5A5]">
                    {falhas.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <button type="button" onClick={() => pacote.current && void enviar(pacote.current.itens, pacote.current.arquivos)}
                    className="rounded-lg border border-[#A78BFA]/50 px-3 py-2 text-[13px] font-medium text-[#DDD6FE]">Tentar de novo</button>
                </>
              )}
              <Link href="/procedimentos" className="inline-block text-[13px] font-medium text-[#7FE7EE] hover:underline">Ver os procedimentos</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
