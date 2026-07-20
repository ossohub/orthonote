"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, X, Upload, AlertTriangle, Stethoscope, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { awardXP, checkPostBadges } from "@/lib/xp";
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
  { type: "question",           label: "Pergunta",      icon: HelpCircle,    color: "border-amber-400 bg-amber-50 text-amber-700",     xp: 40 },
];

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

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [postType, setPostType] = useState<PostType>("clinical_case");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [anonConfirmed, setAnonConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function addTag(tag: string) {
    const clean = tag.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, "").trim();
    if (clean && !tags.includes(clean) && tags.length < 10) {
      setTags((t) => [...t, clean]);
    }
    setTagInput("");
  }

  async function onSubmit(data: FormData) {
    if (postType === "clinical_case" && !anonConfirmed) {
      toast.error("Confirme que o caso está anonimizado antes de publicar");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

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
        user_id:         user.id,
        type:            postType,
        title:           data.title,
        content:         data.content,
        structured_data: structured_data ?? null,
        tags,
        image_urls:      [],
      })
      .select()
      .single();

    if (error || !post) {
      toast.error("Erro ao publicar. Tente novamente.");
      return;
    }

    // XP + badges
    const { newXP, leveledUp, newLevel } = await awardXP(user.id, xpActionMap[postType], post.id);
    await checkPostBadges(user.id, postType, tags);

    const xpAmount = { post_clinical_case: 60, post_article: 80, post_experience: 40, post_question: 40 }[xpActionMap[postType]];
    toast.success(`Post publicado! +${xpAmount} XP 🎉`);

    if (leveledUp) {
      setTimeout(() => toast.success(`⬆️ Subiu para o nível ${newLevel}!`), 1000);
    }

    router.push(`/post/${post.id}`);
  }

  const selectedTypeConfig = POST_TYPES.find((t) => t.type === postType)!;

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
                  Não inclua nome do paciente, hospital específico, datas exatas ou qualquer dado que identifique o caso. Respeite o sigilo profissional e a LGPD.
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
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Publicando...</>
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
