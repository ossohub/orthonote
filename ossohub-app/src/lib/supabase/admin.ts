import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types";

// ============================================================
// Cliente Supabase "admin" — SÓ pode ser importado em código que
// roda no servidor (API routes, Server Actions). Usa a
// service_role key, que ignora TODAS as políticas de RLS.
//
// NUNCA importe este arquivo em um Client Component ("use client")
// nem exponha SUPABASE_SERVICE_ROLE_KEY com o prefixo NEXT_PUBLIC_ —
// isso vazaria a chave mestra do banco para o navegador.
// ============================================================
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "createAdminClient: faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY nas variáveis de ambiente do servidor."
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
