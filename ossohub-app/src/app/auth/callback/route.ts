import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================
// GET /auth/callback
// ============================================================
// Ponto de retorno do fluxo OAuth (login/cadastro com Google). O
// Supabase redireciona o navegador pra cá com um `code` na URL depois
// que o usuário aprova o acesso no Google — aqui a gente troca esse
// code por uma sessão de verdade (cookies httpOnly, mesmo mecanismo
// usado por email/senha).
//
// Como o mesmo botão "Continuar com Google" serve tanto pra criar
// conta quanto pra entrar (o Supabase decide sozinho se é signup ou
// login, com base em já existir ou não um auth.users com aquele
// email), depois de autenticar a gente checa se o perfil ainda não
// tem CRM preenchido — se não tiver, é sinal de conta nova vinda do
// Google (o gatilho no banco só usa nome/foto do Google, não CRM,
// que não existe lá) e mandamos a pessoa completar o cadastro antes
// de seguir pro feed.
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirect") ?? "/feed";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Leitura via admin client só por conveniência de tipos (bug
        // pré-existente do cliente de sessão do @supabase/ssr que
        // resolve .from() como "never" em vários pontos do projeto) —
        // não concede acesso a dado de outra pessoa, é sempre o
        // próprio user.id que acabou de autenticar.
        const admin = createAdminClient();
        const { data: profile } = await admin
          .from("profiles")
          .select("crm")
          .eq("id", user.id)
          .maybeSingle();

        if (profile && !profile.crm) {
          return NextResponse.redirect(`${origin}/profile/edit?bemvindo=1`);
        }
      }

      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?erro=oauth`);
}
