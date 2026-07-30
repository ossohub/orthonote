"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { awardSelfXP } from "@/lib/xp";
import { QUESTION_AREAS } from "@/lib/types";
import type { QuestionOption } from "@/lib/types";

const schema = z.object({
  area:        z.string().min(1, "Selecione uma área"),
  source:      z.string().optional(),
  statement:   z.string().min(20, "O enunciado deve ter pelo menos 20 caracteres"),
  option_a:    z.string().min(1, "Preencha a alternativa A"),
  option_b:    z.string().min(1, "Preencha a alternativa B"),
  option_c:    z.string().min(1, "Preencha a alternativa C"),
  option_d:    z.string().min(1, "Preencha a alternativa D"),
  option_e:    z.string().min(1, "Preencha a alternativa E"),
  explanation: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const OPTION_LETTERS: QuestionOption[] = ["A", "B", "C", "D", "E"];

export default function NewQuestionPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [correctOption, setCorrectOption] = useState<QuestionOption | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 8MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(data: FormData) {
    if (!correctOption) {
      toast.error("Marque qual alternativa é a correta");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    let imageUrl: string | null = null;

    if (imageFile) {
      setUploadingImage(true);
      const ext = imageFile.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase
        .storage.from("question-images")
        .upload(path, imageFile, { cacheControl: "3600", upsert: true });

      setUploadingImage(false);

      if (uploadError) {
        toast.error("Erro ao enviar a imagem da questão");
        return;
      }

      const { data: publicUrlData } = supabase.storage.from("question-images").getPublicUrl(path);
      imageUrl = publicUrlData.publicUrl;
    }

    const { data: question, error } = await supabase
      .from("questions")
      .insert({
        author_id:      user.id,
        area:           data.area,
        source:         data.source || null,
        statement:      data.statement,
        image_url:      imageUrl,
        option_a:       data.option_a,
        option_b:       data.option_b,
        option_c:       data.option_c,
        option_d:       data.option_d,
        option_e:       data.option_e,
        correct_option: correctOption,
        explanation:    data.explanation || null,
      })
      .select("id")
      .single();

    if (error || !question) {
      toast.error("Erro ao criar a questão. Tente novamente.");
      return;
    }

    const result = await awardSelfXP("post_question", question.id);
    toast.success("Questão criada e publicada no banco! +40 XP 🎉");
    if (result?.leveledUp) {
      setTimeout(() => toast.success(`⬆️ Subiu para o nível ${result.newLevel}!`), 1000);
    }

    router.push("/questions");
  }

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-2xl">
        <Link href="/questions"
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Banco de Questões
        </Link>

        <h1 className="text-2xl font-bold text-ossohub-navy mb-1">Criar questão</h1>
        <p className="text-sm text-ossohub-slate mb-6">
          Múltipla escolha (A-E), apenas uma alternativa correta. Sua questão ficará disponível para toda a comunidade responder.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Área e fonte */}
          <div className="ossohub-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Área / Tema *</label>
              <select {...register("area")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition">
                <option value="">Selecionar</option>
                {QUESTION_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Fonte (opcional)</label>
              <input {...register("source")} placeholder="Ex: TEOT 2023"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
            </div>
          </div>

          {/* Enunciado */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Enunciado *</label>
            <textarea {...register("statement")} rows={5} placeholder="Digite o enunciado da questão..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition resize-none" />
            {errors.statement && <p className="mt-1 text-xs text-red-500">{errors.statement.message}</p>}
          </div>

          {/* Imagem */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-2">Figura (opcional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Prévia" className="max-h-56 rounded-xl border border-slate-200" />
                <button type="button" onClick={removeImage}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-6 text-sm text-ossohub-slate hover:border-ossohub-green hover:text-ossohub-green transition-colors w-full justify-center">
                <ImageIcon className="h-5 w-5" /> Enviar imagem (raio-X, RM, foto clínica...)
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            <p className="text-xs text-ossohub-slate mt-1.5">JPG ou PNG, até 8MB</p>
          </div>

          {/* Alternativas */}
          <div className="ossohub-card p-5 space-y-3">
            <label className="block text-sm font-medium text-ossohub-navy mb-1">Alternativas *</label>
            <p className="text-xs text-ossohub-slate mb-2">Marque o círculo à esquerda da alternativa correta.</p>
            {OPTION_LETTERS.map((letter) => {
              const field = `option_${letter.toLowerCase()}` as keyof FormData;
              return (
                <div key={letter} className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setCorrectOption(letter)}
                    aria-label={`Marcar ${letter} como correta`}
                    className={`mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                      correctOption === letter
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 text-slate-400 hover:border-ossohub-green"
                    }`}
                  >
                    {correctOption === letter ? <CheckCircle2 className="h-4 w-4" /> : letter}
                  </button>
                  <div className="flex-1">
                    <input
                      {...register(field)}
                      placeholder={`Alternativa ${letter}`}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
                    />
                    {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]?.message}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comentário/explicação */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Comentário da resposta (opcional)</label>
            <textarea {...register("explanation")} rows={3} placeholder="Explique por que essa é a alternativa correta..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition resize-none" />
            <p className="text-xs text-ossohub-slate mt-1">
              Exibido para quem responder, logo após a correção — nunca antes.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting || uploadingImage} size="lg">
              {isSubmitting || uploadingImage ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Publicando...</>
              ) : (
                <>Publicar questão · +40 XP</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
