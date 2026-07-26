"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2, Plus, X, AlertTriangle, Stethoscope, BookOpen,
  MessageCircle, HelpCircle, Image as ImageIcon, Video as VideoIcon, ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { awardSelfXP, checkPostBadges } from "@/lib/xp";
import type { PostType, ClinicalCaseData } from "@/lib/types";

const TAGS_SUGGESTIONS = [
  "Fratura", "Ombro", "Joelho", "Coluna", "Quadril", "Pé",
  "Mão", "Artroscopia", "Artroplastia", "Trauma", "Pediátrico",
  "Tumor", "Infecção", "Revisão", "Urgência",
];

const POST_TYPES: { type: PostType; label: string; icon: React.ElementType; color: string; xp: number }[] = [
  { type: "clinical_case",      label: "Caso Clínico",  icon: Stethoscope,   color: "border-purple-400 bg-purple-50 text-purple-700", xp: 60 },
  { type: "scientific_article", label: "Artigo",         icon: BookOpen,      color: "border-blue-400 bg-blue-50 text-blue-700",       xp: 80 },
  { type: "experience",         label: "Experiência",   icon: MessageCircle, color: "border-teal-400 bg-teal-50 text-teal-700",        xp: 40 },
  { type: "question",           label: "Pergunta",      icon: HelpCircle,   color: "border-amber-400 bg-amber-50 text-amber-700",     xp: 40 },
];

// Mídia (fotos/vídeo) só faz sentido pra estes tipos — pergunta é um
// texto rápido, então não oferecemos upload ali.
const MEDIA_ENABLED_TYPES: PostType[] = ["clinical_case", "scientific_article", "experience"];

const MAX_IMAGES = 6;
const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 100;
const MAX_VIDEO_SECONDS = 180; // 3 minutos

const schema = z.object({
  title:   z.string().min(10, "Título deve ter pelo menos 10 caracteres").max(200),
  content: z.string().min(50, "Conteúdo deve ter pelo menos 50 caracteres"),
  // Caso clínico
  age_range:     z.string().optional(),
  sex:           z.enum(["M", "F", "outro"]).optional(),
  mechanism:     z.string().optional(),
  physical_exam: z.string().optional(),
  diagnosis:     z.string().optional(),
  treatment:     z.string().optional(),
  discussion:    z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error("Não foi possível ler o vídeo"));
    };
    video.src = URL.createObjectURL(file);
  });
}

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [postType, setPostType] = useState<PostType>("clinical_case");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [anonConfirmed, setAnonConfirmed] = useState(false);
  const [contentPolicyConfirmed, setContentPolicyConfirmed] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [checkingVideo, setCheckingVideo] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mediaEnabled = MEDIA_ENABLED_TYPES.includes(postType);
  const hasMedia = images.length > 0 || !!video;

  function addTag(tag: string) {
    const clean = tag.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, "").trim();
    if (clean && !tags.includes(clean) && tags.length < 10) {
      setTags((t) => [...t, clean]);
    }
    setTagInput("");
  }

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`Máximo de ${MAX_IMAGES} fotos por publicação`);
      return;
    }

    const valid: File[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} não é uma imagem`);
        continue;
      }
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        toast.error(`${file.name} passa de ${MAX_IMAGE_MB}MB`);
        continue;
      }
      valid.push(file);
    }

    setImages((prev) => [...prev, ...valid]);
    setImagePreviews((prev) => [...prev, ...valid.map((f) => URL.createObjectURL(f))]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleVideoSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Selecione um arquivo de vídeo");
      return;
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      toast.error(`O vídeo deve ter no máximo ${MAX_VIDEO_MB}MB`);
      return;
    }

    setCheckingVideo(true);
    try {
      const duration = await readVideoDuration(file);
      if (duration > MAX_VIDEO_SECONDS) {
        toast.error(`O vídeo deve ter no máximo 3 minutos (duração atual: ${Math.ceil(duration / 60)} min)`);
        return;
      }
      setVideo(file);
      setVideoDuration(Math.round(duration));
      setVideoPreview(URL.createObjectURL(file));
    } catch {
      toast.error("Não foi possível verificar a duração do vídeo");
    } finally {
      setCheckingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  }

  function removeVideo() {
    setVideo(null);
    setVideoPreview(null);
    setVideoDuration(null);
  }

  async function onSubmit(data: FormData) {
    if (postType === "clinical_case" && !anonConfirmed) {
      toast.error("Confirme que o caso está anonimizado antes de publicar");
      return;
    }

    if (hasMedia && !contentPolicyConfirmed) {
      toast.error("Confirme que o conteúdo enviado segue as diretrizes antes de publicar");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    let image_urls: string[] = [];
    let video_url: string | null = null;

    if (hasMedia) {
      setUploadingMedia(true);
      const stamp = Date.now();

      try {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const ext = file.name.split(".").pop() ?? "jpg";
          const path = `${user.id}/${stamp}-${i}.${ext}`;
          const { error } = await supabase.storage.from("post-images").upload(path, file, { cacheControl: "3600", upsert: true });
          if (error) throw error;
          const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
          image_urls.push(pub.publicUrl);
        }

        if (video) {
          const ext = video.name.split(".").pop() ?? "mp4";
          const path = `${user.id}/${stamp}.${ext}`;
          const { error } = await supabase.storage.from("post-videos").upload(path, video, { cacheControl: "3600", upsert: true });
          if (error) throw error;
          const { data: pub } = supabase.storage.from("post-videos").getPublicUrl(path);
          video_url = pub.publicUrl;
        }
      } catch {
        toast.error("Erro ao enviar as fotos/vídeo. Tente novamente.");
        setUploadingMedia(false);
        return;
      }
      setUploadingMedia(false);
    }

    const structured_data: ClinicalCaseData | undefined =
      postType === "clinical_case"
        ? {
            age_range:     data.age_range,
            sex:           data.sex,
            mechanism:     data.mechanism,
            physical_exam: data.physical_exam,
            diagnosis:     data.diagnosis,
            treatment:     data.treatment,
            discussion:    data.discussion,
          }
        : undefined;

    const xpActionMap: Record<PostType, "post_clinical_case" | "post_article" | "post_experience" | "post_question"> = {
      clinical_case:      "post_clinical_case",
      scientific_article: "post_article",
      experience:         "post_experience",
      question:           "post_question",
    };

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        user_id:                 user.id,
        type:                    postType,
        title:                   data.title,
        content:                 data.content,
        structured_data:         structured_data ?? null,
        tags,
        image_urls,
        video_url,
        video_duration_seconds:  videoDuration,
      })
      .select()
      .single();

    if (error || !post) {
      toast.error("Erro ao publicar. Tente novamente.");
      return;
    }

    // XP + badges
    const result = await awardSelfXP(xpActionMap[postType], post.id);
    await checkPostBadges(user.id, postType, tags);

    const xpAmount = { post_clinical_case: 60, post_article: 80, post_experience: 40, post_question: 40 }[xpActionMap[postType]];

    if (post.moderation_status === "pending") {
      toast.success(`Publicado! Como tem foto/vídeo, ficará visível no feed após revisão rápida da moderação. +${xpAmount} XP 🎉`);
    } else {
      toast.success(`Post publicado! +${xpAmount} XP 🎉`);
    }

    if (result?.leveledUp) {
      setTimeout(() => toast.success(`⬆️ Subiu para o nível ${result.newLevel}!`), 1000);
    }

    router.push(`/post/${post.id}`);
  }

  const selectedTypeConfig = POST_TYPES.find((t) => t.type === postType)!;
  const busy = isSubmitting || uploadingMedia;

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-2xl">
        <h1 className="text-2xl font-bold text-ossohub-navy mb-6">Nova publicação</h1>

        {/* Tipo de post */}
        <div className="ossohub-card p-5 mb-5">
          <p className="text-sm font-medium text-ossohub-navy mb-3">Tipo de publicação</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {POST_TYPES.map(({ type, label, icon: Icon, color, xp }) => (
              <button
                key={type}
                type="button"
                onClick={() => setPostType(type)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-medium transition-all ${
                  postType === type ? color : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
                <span className="text-xs opacity-70">+{xp} XP</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Aviso de anonimização para caso clínico */}
          {postType === "clinical_case" && (
            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Atenção: Anonimização obrigatória</p>
                <p className="text-xs text-amber-700 mb-3">
                  Não inclua nome do paciente, hospital específico, datas exatas ou qualquer dado que identifique o caso. Se enviar fotos, cubra ou recorte rostos, tatuagens ou qualquer elemento identificável. Respeite o sigilo profissional e a LGPD.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonConfirmed}
                    onChange={(e) => setAnonConfirmed(e.target.checked)}
                    className="h-4 w-4 rounded accent-ossohub-green"
                  />
                  <span className="text-xs font-medium text-amber-800">
                    Confirmo que o caso está devidamente anonimizado
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Título */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Título *</label>
            <input
              {...register("title")}
              placeholder="Ex: Fratura de clavícula medial — caso incomum com desfecho cirúrgico"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>

          {/* Template para caso clínico */}
          {postType === "clinical_case" && (
            <div className="ossohub-card p-5 space-y-4">
              <p className="text-sm font-semibold text-ossohub-navy border-b border-slate-100 pb-3">
                📋 Template do Caso Clínico
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ossohub-slate mb-1">Faixa etária</label>
                  <input {...register("age_range")} placeholder="Ex: 35-45 anos"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ossohub-slate mb-1">Sexo</label>
                  <select {...register("sex")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition">
                    <option value="">Selecionar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              {[
                { field: "mechanism"    as const, label: "Mecanismo de trauma / Queixa principal", placeholder: "Queda de moto a 60km/h, trauma direto no ombro..." },
                { field: "physical_exam"as const, label: "Exame físico relevante", placeholder: "Dor à palpação, crepitação, limitação de amplitude..." },
                { field: "diagnosis"   as const, label: "Diagnóstico principal", placeholder: "Fratura diafisária de úmero (AO 12-A2)..." },
                { field: "treatment"   as const, label: "Abordagem terapêutica", placeholder: "Optamos por tratamento cirúrgico com haste intramedular..." },
                { field: "discussion"  as const, label: "Pontos de discussão / Lições aprendidas", placeholder: "O principal desafio foi... Aprendemos que..." },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-ossohub-slate mb-1">{label}</label>
                  <textarea {...register(field)} rows={3} placeholder={placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition resize-none" />
                </div>
              ))}
            </div>
          )}

          {/* Conteúdo geral */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
              {postType === "clinical_case" ? "Descrição adicional / Contexto" : "Conteúdo *"}
            </label>
            <textarea
              {...register("content")}
              rows={6}
              placeholder={
                postType === "clinical_case"
                  ? "Adicione qualquer contexto extra não contemplado acima..."
                  : "Escreva o conteúdo da sua publicação..."
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition resize-none"
            />
            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
          </div>

          {/* Fotos e vídeo */}
          {mediaEnabled && (
            <div className="ossohub-card p-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-ossohub-navy mb-1">Fotos e vídeo (opcional)</p>
                <p className="text-xs text-ossohub-slate">
                  Ajuda a ilustrar o caso/artigo/experiência. Vídeo com no máximo 3 minutos. Publicações com mídia passam por uma revisão rápida da moderação antes de aparecer no feed público.
                </p>
              </div>

              {/* Fotos */}
              <div>
                <label className="block text-xs font-medium text-ossohub-slate mb-2">Fotos (até {MAX_IMAGES}, {MAX_IMAGE_MB}MB cada)</label>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length < MAX_IMAGES && (
                  <button type="button" onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-ossohub-slate hover:border-ossohub-green hover:text-ossohub-green transition-colors w-full justify-center">
                    <ImageIcon className="h-4 w-4" /> Adicionar foto(s)
                  </button>
                )}
                <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
              </div>

              {/* Vídeo */}
              <div>
                <label className="block text-xs font-medium text-ossohub-slate mb-2">Vídeo (máx. 3 min, {MAX_VIDEO_MB}MB)</label>
                {videoPreview ? (
                  <div className="relative inline-block w-full">
                    <video src={videoPreview} controls className="max-h-56 w-full rounded-xl border border-slate-200 bg-black" />
                    <button type="button" onClick={removeVideo}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                    {videoDuration !== null && (
                      <p className="mt-1 text-xs text-ossohub-slate">Duração: {Math.floor(videoDuration / 60)}:{String(videoDuration % 60).padStart(2, "0")}</p>
                    )}
                  </div>
                ) : (
                  <button type="button" disabled={checkingVideo} onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-ossohub-slate hover:border-ossohub-green hover:text-ossohub-green transition-colors w-full justify-center disabled:opacity-50">
                    {checkingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <VideoIcon className="h-4 w-4" />}
                    {checkingVideo ? "Verificando vídeo..." : "Adicionar vídeo"}
                  </button>
                )}
                <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={handleVideoSelect} />
              </div>

              {/* Declaração de conteúdo — só aparece se tiver mídia anexada */}
              {hasMedia && (
                <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-red-700 mb-2">
                      Só envie fotos/vídeos de natureza clínica/ortopédica (exames, radiografias, procedimentos, materiais educativos). É proibido conteúdo sexual, ofensivo ou sem relação com a prática médica — publicações fora dessas diretrizes serão rejeitadas na moderação.
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contentPolicyConfirmed}
                        onChange={(e) => setContentPolicyConfirmed(e.target.checked)}
                        className="h-4 w-4 rounded accent-ossohub-green"
                      />
                      <span className="text-xs font-medium text-red-800">
                        Confirmo que este conteúdo segue as diretrizes acima
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-3">Tags</label>

            {/* Tags selecionadas */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-ossohub-green text-white px-3 py-1 text-xs font-medium">
                    #{tag}
                    <button type="button" onClick={() => setTags((t) => t.filter((x) => x !== tag))}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input de tag */}
            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); }}}
                placeholder="Digite uma tag e pressione Enter"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => addTag(tagInput)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Sugestões */}
            <div className="flex flex-wrap gap-1.5">
              {TAGS_SUGGESTIONS.filter((s) => !tags.includes(s)).slice(0, 10).map((s) => (
                <button key={s} type="button" onClick={() => addTag(s)}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500 hover:border-ossohub-green hover:text-ossohub-green transition-colors">
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* Botão publicar */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={busy} size="lg">
              {busy ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> {uploadingMedia ? "Enviando mídia..." : "Publicando..."}</>
              ) : (
                <>Publicar · +{selectedTypeConfig.xp} XP</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
