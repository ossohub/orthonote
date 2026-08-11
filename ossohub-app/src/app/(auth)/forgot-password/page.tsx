"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const origin = window.location.origin;

    // Sempre mostramos a mesma mensagem de sucesso, exista ou não uma
    // conta com esse email — evita que alguém use este formulário pra
    // descobrir quais emails estão cadastrados na plataforma.
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent("/reset-password")}`,
    });

    setSent(true);
  }

  return (
    <div className="min-h-screen ossohub-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <div className="flex items-center rounded-xl bg-ossohub-navy px-3 py-2">
              <img src="/logo.png" alt="OssoHub" className="ossohub-logo h-8 w-auto" />
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-ossohub-navy">Recuperar senha</h1>
          <p className="mt-1 text-sm text-ossohub-slate">
            Informe seu email para receber o link de redefinição
          </p>
        </div>

        <div className="ossohub-card p-8">
          {sent ? (
            <div className="text-center py-4">
              <MailCheck className="h-10 w-10 text-ossohub-green mx-auto mb-3" />
              <p className="text-sm font-semibold text-ossohub-navy mb-1">Email enviado!</p>
              <p className="text-sm text-ossohub-slate">
                Se houver uma conta com esse email, você vai receber um link para criar uma
                nova senha. Confira sua caixa de entrada (e o spam).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar link de redefinição"}
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ossohub-slate">
          <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-ossohub-green hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
