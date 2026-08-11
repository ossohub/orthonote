"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[a-zA-Z]/, "A senha precisa ter pelo menos uma letra")
    .regex(/[0-9]/, "A senha precisa ter pelo menos um número"),
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPass, setShowPass] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // Quem chega aqui vindo do link de "esqueci minha senha" já tem uma
    // sessão temporária de recuperação (trocada em /auth/callback). Sem
    // essa sessão, não tem como trocar a senha com segurança.
    supabase.auth.getUser().then(({ data: { user } }) => {
      setHasSession(!!user);
      setChecking(false);
    });
  }, [supabase]);

  async function onSubmit(data: FormData) {
    const { error } = await supabase.auth.updateUser({ password: data.password });

    if (error) {
      toast.error(error.message || "Não foi possível trocar a senha. Tente pedir um novo link.");
      return;
    }

    toast.success("Senha atualizada com sucesso!");
    router.push("/feed");
    router.refresh();
  }

  if (checking) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
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
          <h1 className="mt-6 text-2xl font-bold text-ossohub-navy">Criar nova senha</h1>
        </div>

        <div className="ossohub-card p-8">
          {!hasSession ? (
            <div className="text-center py-4">
              <p className="text-sm text-ossohub-slate mb-4">
                Esse link de redefinição é inválido ou já expirou. Peça um novo abaixo.
              </p>
              <Button asChild className="w-full">
                <Link href="/forgot-password">Pedir novo link</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ossohub-navy mb-1.5">Nova senha</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-11 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar nova senha"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
