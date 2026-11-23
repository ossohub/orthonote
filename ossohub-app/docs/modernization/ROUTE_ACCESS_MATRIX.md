# Matriz de acesso — OssoHUB

Data: 2026-11-22  
Branch de revisão: `feature/audit-baseline`

## Regra aplicada na branch

Todas as páginas do grupo Next.js `(main)` exigem sessão autenticada antes da navegação. O controle foi centralizado em `src/proxy.ts`, usando correspondência por segmento de rota. O Proxy é apenas a barreira de navegação: RLS, verificações server-side, autorização das RPCs e validação de sessão nas APIs continuam sendo os controles efetivos para dados e operações.

## Páginas privadas — 40

| Prefixo | Páginas cobertas |
|---|---|
| `/desempenho` | cronograma, equipe, gráficos, preditivo, salas e salas/[id] |
| `/esporte` | índice e /[area] |
| `/estudos` | página principal |
| `/explore` | exploração |
| `/feed` | feed |
| `/flashcards` | índice, explorar e new |
| `/mensuracao` | índice e /[regiao] |
| `/moderacao` | moderação |
| `/network` | rede |
| `/notifications` | notificações |
| `/ortopedia` | página principal |
| `/pediatria` | índice, classificações e conteúdo |
| `/post` | /[id] e /new |
| `/procedimentos` | índice, /[secao], /[secao]/[id] e importar |
| `/profile` | índice, /[id] e edit |
| `/pronto-socorro` | índice e /[aba] |
| `/questions` | índice, new, ranking e test/[id] |
| `/referencia` | ortopedia-adulto |
| `/tools` | /[slug] |

## Páginas públicas — 5

| Rota | Motivo |
|---|---|
| `/` | Landing/home pública |
| `/login` | Autenticação |
| `/signup` | Cadastro |
| `/forgot-password` | Recuperação de acesso |
| `/reset-password` | Redefinição de senha |

## Route Handlers — 5

| Endpoint | Método(s) | Controle de acesso |
|---|---|---|
| `/api/automation/posts` | POST | Bearer `AUTOMATION_API_KEY`; autor fixo em variável de ambiente; payload validado por Zod; usa service role |
| `/api/internal/cron/resident-risk` | GET, POST | Bearer `CRON_SECRET`; branch removeu fallback de query string; usa service role por meio do serviço de cálculo |
| `/api/v1/resident/[user_id]/risk` | GET | `auth.getUser()`, comparação com `user_id` da URL e consentimento LGPD antes de leitura privilegiada |
| `/api/v1/resident/consent` | GET, POST | `auth.getUser()`; identidade sempre derivada da sessão |
| `/auth/callback` | GET | Troca OAuth code por sessão; destino de redirect validado contra open redirect |

## Limitações e testes pendentes

- O Proxy não substitui autorização de dados. APIs, RPCs, Server Actions e consultas diretas devem manter RLS e checagem de ownership/role.
- A matriz é baseada na árvore de rotas e no código observado; ainda é necessário testar cada rota com sessão anônima, usuário comum e administrador.
- Confirmar se alguma página dentro de `(main)` deve ser publicamente acessível. A classificação atual segue o modelo atual de RLS, no qual perfis/posts e a maior parte dos dados são acessíveis a usuários autenticados.
- Revisar as chamadas client-side às APIs e RPCs diretamente, sem depender do bloqueio de interface.
