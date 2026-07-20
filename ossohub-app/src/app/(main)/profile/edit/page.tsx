"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const SPECIALTIES = [
  "Ombro e Cotovelo", "Joelho", "Coluna", "Quadril",
  "Mão e Punho", "Pé e Tornozelo", "Tumor Ósseo",
  "Ortopedia Pediátrica", "Trauma", "Medicina Esportiva",
];

const schema = z.object({
  full_name:  z.string().min(3),
  bio:        z.string().max(280).optional(),
  city_state: z.string().optional(),
  rqe:        z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles").select("*").eq("id", user.id).single();

      if (profile) {
        reset({
          full_name:  profile.full_name,
          bio:        profile.bio ?? "",
          city_state: profile.city_state ?? "",
          rqe:        profile.rqe ?? "",
        });
        setSpecialties(profile.specialties ?? []);
      }
      setLoading(false);
    }
    loadProfile();
  }, [router, supabase, reset]);

  function toggleSpecialty(s: string) {
    setSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function onSubmit(data: FormData) {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name:   data.full_name,
        bio:         data.bio || null,
        city_state:  data.city_state || null,
        rqe:         data.rqe || null,
        specialties,
      })
      .eq("id", userId);

    if (error) { toast.error("Erro ao salvar perfil"); return; }
    toast.success("Perfil atualizado com sucesso!");
    router.push(`/profile/${userId}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-lg">
        <Link href={`/profile/${userId}`}
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao perfil
        </Link>

        <h1 className="text-2xl font-bold text-ossohub-navy mb-6">Editar perfil</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nome */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Nome completo *</label>
            <input {...register("full_name")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
            {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>}
          </div>

          {/* RQE + Cidade */}
          <div className="ossohub-card p-5 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">RQE</label>
              <input {...register("rqe")} placeholder="12345"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Cidade/Estado</label>
              <input {...register("city_state")} placeholder="São Paulo, SP"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
            </div>
          </div>

          {/* Bio */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
              Bio <span className="text-ossohub-slate font-normal">(máx. 280 caracteres)</span>
            </label>
            <textarea {...register("bio")} rows={3} placeholder="Conte brevemente sobre você..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition resize-none" />
            {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>}
          </div>

          {/* Especialidades */}
          <div className="ossohub-card p-5">
            <label className="block text-sm font-medium text-ossohub-navy mb-3">Especialidades</label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => {
                const selected = specialties.includes(s);
                return (
                  <button key={s} type="button" onClick={() => toggleSpecialty(s)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      selected
                        ? "border-ossohub-green bg-ossohub-green text-white"
                        : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green"
                    }`}>
                    {selected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</> : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
