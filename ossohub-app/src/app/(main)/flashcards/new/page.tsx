"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft, Globe2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlashcardFlip } from "@/components/FlashcardFlip";
import { useUser } from "@/hooks/useUser";
import { createFlashcard } from "@/lib/flashcards";
import { QUESTION_AREAS } from "@/lib/types";

const schema = z.object({
  area:  z.string().min(1, "Selecione uma área"),
  front: z.string().min(3, "Escreva a pergunta/frente do card"),
  back:  z.string().min(1, "Escreva a resposta/verso do card"),
});

type FormData = z.infer<typeof schema>;

export default function NewFlashcardPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [isPublic, setIsPublic] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { area: "", front: "", back: "" } });

  const front = watch("front");
  const back = watch("back");

  async function onSubmit(data: FormData) {
    if (!user) { router.push("/login"); return; }
    try {
      await createFlashcard({
        authorId: user.id,
        area: data.area,
        front: data.front,
        back: data.back,
        isPublic,
      });
      toast.success("Flashcard criado e salvo no seu perfil!");
      router.push("/flashcards");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar o flashcard");
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-2xl">
        <Link href="/flashcards"
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar aos Flashcards
        </Link>

        <h1 className="text-2xl font-bold text-ossohub-navy mb-1">Criar flashcard</h1>
        <p className="text-sm text-ossohub-slate mb-6">
          Escreva a pergunta (frente) e a resposta (verso). Ele fica salvo no seu perfil, organizado pela área escolhida.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Área de estudo *</label>
            <select {...register("area")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition">
              <option value="">Selecionar</option>
              {QUESTION_AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area.message}</p>}
            <p className="text-xs text-ossohub-slate mt-1.5">
              Todo flashcard fica categorizado por área — assim é mais fácil de encontrar e estudar por assunto depois.
            </p>
          </div>

          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Pergunta (frente) *</label>
            <textarea {...register("front")} rows={3} placeholder="Ex: Quais são os critérios da classificação de Garden?"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition resize-none" />
            {errors.front && <p className="mt-1 text-xs text-red-500">{errors.front.message}</p>}
          </div>

          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Resposta (verso) *</label>
            <textarea {...register("back")} rows={4} placeholder="Digite a resposta que deve aparecer ao virar o card..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition resize-none" />
            {errors.back && <p className="mt-1 text-xs text-red-500">{errors.back.message}</p>}
          </div>

          <div className="ossohub-card p-5">
            <p className="text-sm font-medium text-ossohub-navy mb-2">Visibilidade</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                  !isPublic
                    ? "border-ossohub-green-dark/40 bg-ossohub-green-dark/10 text-ossohub-green-dark"
                    : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green-dark/30"
                }`}
              >
                <Lock className="h-4 w-4" /> Só eu vejo
              </button>
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isPublic
                    ? "border-ossohub-green-dark/40 bg-ossohub-green-dark/10 text-ossohub-green-dark"
                    : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green-dark/30"
                }`}
              >
                <Globe2 className="h-4 w-4" /> Compartilhar (Explorar)
              </button>
            </div>
            <p className="text-xs text-ossohub-slate mt-2">
              {isPublic
                ? "Esse flashcard vai aparecer na aba Explorar para qualquer usuário — dá pra mudar isso depois."
                : "Esse flashcard fica visível só para você — dá pra torná-lo público depois."}
            </p>
          </div>

          {(front || back) && (
            <div>
              <p className="text-sm font-medium text-ossohub-navy mb-2">Prévia</p>
              <FlashcardFlip front={front || "Pergunta"} back={back || "Resposta"} className="max-w-sm" />
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</>) : "Salvar flashcard"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
