import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Todas as páginas do grupo (main) dependem de uma sessão autenticada.
// A autorização real de dados continua sendo aplicada por RLS e pelas
// verificações das APIs/RPCs; o Proxy é uma primeira barreira de navegação.
const PROTECTED = [
  "/feed",
  "/explore",
  "/network",
  "/notifications",
  "/profile",
  "/post",
  "/desempenho",
  "/esporte",
  "/estudos",
  "/flashcards",
  "/infiltracoes",
  "/mensuracao",
  "/moderacao",
  "/ortopedia",
  "/pediatria",
  "/procedimentos",
  "/pronto-socorro",
  "/questions",
  "/referencia",
  "/tools",
];
const AUTH_ROUTES = ["/login", "/signup"];

function matchesPath(pathname: string, root: string): boolean {
  return pathname === root || pathname.startsWith(`${root}/`);
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED.some((root) => matchesPath(pathname, root));
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  const isAuthRoute = AUTH_ROUTES.some((root) => matchesPath(pathname, root));
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/feed";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
