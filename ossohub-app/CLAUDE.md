# OssoHub App — Contexto do Projeto

## O que é este projeto

Rede social profissional para cirurgiões ortopedistas brasileiros. Funciona como LinkedIn + gamificação, onde médicos compartilham casos clínicos, interagem com colegas e acumulam XP/badges por contribuições.

## Stack técnica

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Estilo**: Tailwind CSS + shadcn/ui
- **Banco de dados**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Deploy**: Vercel (projeto: ossohub-app)
- **Domínio**: ossohub-app.vercel.app

## Estrutura de pastas

```
src/
  app/
    globals.css          ← Design tokens + Tailwind
    layout.tsx           ← Root layout (Navbar + Toaster)
    page.tsx             ← Landing page
    (auth)/
      login/page.tsx
      signup/page.tsx
    (main)/
      feed/              ← Feed de posts com realtime
      post/new/          ← Criação de posts (4 tipos)
      post/[id]/         ← Visualização de post + comentários
      profile/[id]/      ← Perfil + conquistas + XP
      profile/edit/      ← Edição de perfil
      explore/           ← Busca + usuários sugeridos
      notifications/     ← Notificações
      network/           ← Seguindo/seguidores
  components/
    Navbar.tsx           ← Header responsivo com dropdown
    PostCard.tsx         ← Card de post com like otimista
    UserLevelBadge.tsx   ← Nível do usuário (1-5)
    XPProgressBar.tsx    ← Barra de progresso de XP
    AchievementBadge.tsx ← Badge com tooltip
    ui/                  ← Componentes shadcn/ui
  lib/
    types/index.ts       ← Interfaces TypeScript
    supabase/
      client.ts          ← createBrowserClient
      server.ts          ← createServerClient (cookies)
    xp.ts                ← Sistema de XP, níveis e badges
    utils.ts             ← cn(), formatRelativeDate(), getInitials()
  hooks/
    useUser.ts           ← Hook de autenticação com estado
  middleware.ts          ← Proteção de rotas (Next.js 16)
supabase/
  schema.sql             ← Schema completo (8 tabelas + RLS + triggers)
```

## Design system

- **Cor primária**: `#0F172A` (navy) → `ossohub-navy`
- **Cor de destaque**: `#10B981` (verde) → `ossohub-green`
- **Fundo**: `#F8FAFC` → `ossohub-bg-light`
- **Classe container**: `.ossohub-container` (max-w-6xl)
- **Classe card**: `.ossohub-card` (rounded-xl + border + shadow)

## Sistema de gamificação

| Nível | Nome | XP mínimo |
|-------|------|-----------|
| 1 | Aprendiz | 0 |
| 2 | Residente | 100 |
| 3 | Especialista | 500 |
| 4 | Mestre | 1500 |
| 5 | Lenda | 5000 |

**XP por ação**: Post (+30), Caso Clínico (+50), Comentário (+10), Like recebido (+5), Primeiro post (+20), Badge desbloqueado (+25)

**11 badges**: primeiro_post, caso_clinico, comentarista, popular, explorador, colaborador, mentor, especialista_trauma, mestre_joelho, guru_coluna, lenda

## Banco de dados — tabelas principais

- `profiles` — dados do médico (CRM, especialidades, XP, nível, bio)
- `posts` — publicações (4 tipos: caso_clinico, discussao, duvida, material)
- `comments` — comentários com contadores
- `likes` — likes de posts
- `follows` — seguir/parar de seguir
- `achievements` — badges desbloqueados por usuário
- `xp_logs` — histórico de XP
- `notifications` — notificações de interação

## Variáveis de ambiente necessárias

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Comandos úteis

```bash
npm run dev              # Servidor local em http://localhost:3000
npm run build            # Build de produção
npx vercel deploy --prod # Deploy para Vercel
```

## Status atual

- MVP completo com 13 etapas implementadas
- Deploy feito no Vercel (ossohub-app.vercel.app)
- Aguardando configuração das variáveis de ambiente do Supabase no Vercel
- Após configurar env vars → fazer redeploy para ativar autenticação e banco
