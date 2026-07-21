"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { SignupForm } from "@/lib/types";

const SPECIALTIES = [
  "Ombro e Cotovelo", "Joelho", "Coluna", "Quadril",
  "Mão e Punho", "Pé e Tornozelo", "Tumor Ósseo",
  "Ortopedia Pediátrica", "Trauma", "Medicina Esportiva",
];

const schema = z.object({
  full_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  crm: z.string().min(4, "CRM inválido"),
  rqe: z.string().optional(),
  specialties: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
  city_state: z.string().optional(),
  bio: z.string().max(280, "Bio deve ter no máximo 280 caracteres").optional(),
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { specialties: [] },
  });

  const selectedSpecialties = watch("specialties") ?? [];

  function toggleSpecialty(s: string) {
    const current = selectedSpecialties;
    if (current.includes(s)) {
      setValue("specialties", current.filter((x) => x !== s));
    } else {
      setValue("specialties", [...current, s]);
    }
  }

  async function onSubmit(data: FormData) {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          crm: data.crm,
        },
      },
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    // 2. Atualizar perfil com dados extras (o trigger já criou o registro básico)
    if (authData.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          rqe: data.rqe ?? null,
          specialties: data.specialties,
          city_state: data.city_state ?? null,
          bio: data.bio ?? null,
        })
        .eq("id", authData.user.id);

      if (profileError) {
        console.error("Erro ao atualizar perfil:", profileError);
      }
    }

    if (!authData.session) {
      // Confirmação de email exigida — ainda não há sessão ativa.
      toast.success("Conta criada! Confira seu email para confirmar antes de entrar.");
      router.push("/login");
      return;
    }

    toast.success("Conta criada! Bem-vindo ao OssoHub 🦴");
    router.push("/feed");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <div className="flex items-center rounded-xl bg-ossohub-navy px-3 py-2">
              <img src="/logo.png" alt="OssoHub" className="h-8 w-auto" />
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-ossohub-navy">Criar sua conta</h1>
          <p className="mt-1 text-sm text-ossohub-slate">
            Exclusivo para ortopedistas brasileiros verificados
          </p>
        </div>

        <div className="ossohub-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nome completo */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
                Nome completo *
              </label>
              <input
                {...register("full_name")}
                placeholder="Dr. João Silva"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              />
              {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Email *</label>
              <input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Senha *</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-11 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* CRM + RQE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ossohub-navy mb-1.5">CRM *</label>
                <input
                  {...register("crm")}
                  placeholder="12345/SP"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
                />
                {errors.crm && <p className="mt-1 text-xs text-red-500">{errors.crm.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
                  RQE <span className="text-slate-400">(opcional)</span>
                </label>
                <input
                  {...register("rqe")}
                  placeholder="12345"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
                />
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-2">
                Especialidades *
              </label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((s) => {
                  const selected = selectedSpecialties.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpecialty(s)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        selected
                          ? "border-ossohub-green bg-ossohub-green text-white"
                          : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green"
                      }`}
                    >
                      {selected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      {s}
                    </button>
                  );
                })}
              </div>
              {errors.specialties && (
                <p className="mt-1 text-xs text-red-500">{errors.specialties.message}</p>
              )}
            </div>

            {/* Cidade/Estado */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
                Cidade/Estado <span className="text-slate-400">(opcional)</span>
              </label>
              <input
                {...register("city_state")}
                placeholder="São Paulo, SP"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-ossohub-navy mb-1.5">
                Bio curta <span className="text-slate-400">(opcional)</span>
              </label>
              <textarea
                {...register("bio")}
                rows={2}
                placeholder="Ortopedista especialista em Joelho. Hospital..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition resize-none"
              />
              {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Criando conta...</>
              ) : (
                "Criar conta gratuita"
              )}
            </Button>

            <p className="text-center text-xs text-slate-400">
              Ao criar sua conta você concorda com os{" "}
              <Link href="/terms" className="underline">Termos de Uso</Link>{" "}
              e a{" "}
              <Link href="/privacy" className="underline">Política de Privacidade</Link>.
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ossohub-slate">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-ossohub-green hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
