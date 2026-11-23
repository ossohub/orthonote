# OssoHUB — baseline da modernização

**Data da auditoria:** 2026-11-23  
**Repositório:** `ossohub/orthonote`  
**Aplicação principal:** `ossohub-app/`  
**Estratégia aprovada:** Hub central de produtos · identidade visual preservada · migração gradual.

## 1. Limites e proteção da produção

Esta auditoria é somente leitura em relação à Vercel e ao Supabase. Nenhuma variável de ambiente, domínio, deployment, dado, schema, policy, bucket ou configuração de produção foi alterado.

- Branch de produção do Vercel: `main`.
- Deployment de produção verificado: `dpl_4Fz5L42CTMzn746L3Bj4EFYYpTZ9`.
- SHA atualmente publicado em produção: `4a3dc38fc293a5736a961dd0ede13828087e99e2`.
- HEAD de `main` no início da modernização: `27faad401ad2405d591cac29588f574bc66b44d5`.
- A branch `main` está sem proteção de branch no GitHub (API retornou `protected: false`).
- Nenhum Pull Request de modernização estava aberto no momento da verificação.

**Observação de release:** o HEAD de `main` está um commit à frente do SHA publicado no deployment de produção. O novo commit é uma revisão de conteúdo pediátrico. Isso precisa ser tratado como diferença entre código-fonte e release publicado; não realizar deploy automático como parte desta auditoria.

## 2. Estrutura e stack identificadas

- Next.js 16.2.x, App Router e TypeScript estrito.
- React 18.3.x.
- Tailwind CSS 3.4.x e componentes Radix/shadcn-style.
- Supabase: PostgreSQL, Auth, Storage e Realtime.
- Vercel: deploy em região GRU (São Paulo).
- 154 arquivos sob `ossohub-app/src/`.
- 47 páginas/rotas de página e 5 Route Handlers identificados na árvore atual.
- 6 arquivos SQL de schema/migrations no diretório `ossohub-app/supabase/`.
- Não foram encontrados testes automatizados, configuração de Playwright/Vitest ou lockfile no pacote da aplicação durante a inspeção da árvore.

## 3. Achados técnicos prioritários

### P0 — Integridade do fluxo de release

1. A branch `main` não está protegida. Não há exigência de Pull Request nem status checks obrigatórios configurados.
2. A produção está no SHA `4a3dc38`, enquanto `main` está no SHA `27faad4`.
3. A configuração atual do projeto Vercel instala com `npm install`; não foi localizado lockfile da aplicação para instalação reprodutível.

**Ação:** manter a produção congelada durante a modernização; propor proteção de `main`, checks obrigatórios e deploy de produção somente após aprovação explícita.

### P1 — Segurança de Storage e dados clínicos

1. O bucket `orthonote-assets` está público para leitura e possui policy de INSERT para role `anon`. Confirmar finalidade, origem e abuso potencial antes de qualquer mudança.
2. Buckets com leitura pública incluem `post-images`, `post-videos`, `question-images) e `orthonote-assets`. A classificação de dados e a possibilidade de mídia clínica identificável devem ser revisadas.
3. Buckets privados incluem `post-media`, `procedimento-figuras` e `room-images`; validar policies de leitura, upload, atualização e remoção por papel e vínculo.
4. RLS está habilitado nas tabelas públicas inspecionadas, mas isso não comprova a correção das policies. Algumas tabelas têm somente uma policy; revisar cada operação e relações entre usuário, equipe, preceptor e proprietário.
5. Existem funções PostgreSQL com `SECURITY DEFINER`. Auditar owner, `search_path`, grants de EXECUTE e validação de identidade/ownership.

**Ação:** produzir matriz de acesso por tabela e bucket; não alterar policies ou arquivos existentes antes de testes de regressão e classificação de dados.

### P1 — Autenticação e autorização

1. `src/middleware.ts` usa `middleware()` e protege explicitamente apenas os prefixos `/feed`, `/explore`, `/network`, `/notifications`, `/profile` e `/post/new`.
2. Há páginas que fazem verificação server-side com `auth.getUser()`; a cobertura das demais páginas e APIs ainda precisa ser inventariada.
3. O callback OAuth usa cliente administrativo para ler o CRM do próprio usuário autenticado. A justificativa está documentada, mas a leitura deve preferir cliente de sessão se possível.
4. O hook `useUser` registra listener de auth e faz consulta ao perfil; avaliar estabilidade do client, tratamento de erros, loading e condições de corrida.

**Ação:** matriz de rotas públicas/privadas e testes de acesso anônimo, usuário comum, administrador, preceptor e usuário de outra equipe.

### P1 — Dependências e build reproduzível

1. `@supabase/ssr` está declarado como `latest`, o que permite mudanças não determinísticas.
2. `eslint-config-next` está em 15.0.3 enquanto Next.js está em 16.x.
3. O script `lint` usa `next lint`; verificar compatibilidade com Next 16 e migrar para ESLint CLI com configuração explícita.
4. Não foi encontrado lockfile dentro de `ossohub-app/`; o deploy usa `npm install`.
5. A existência e o impacto das vulnerabilidades do npm precisam ser confirmados com relatório atualizado no ambiente isolado antes de atualizar dependências.

**Ação:** fixar versões, gerar lockfile, alinhar ESLint/Next, validar Node e executar build/typecheck/lint em CI. Atualizações em lotes pequenos.

### P2 — Arquitetura e experiência de produto

1. O código atual combina rede profissional, ferramentas clínicas, conteúdo educacional, desempenho de residentes, gamificação e consultório.
2. O design atual usa tema escuro “Negatoscópio”, com tokens e componentes globais em `globals.css`; preservar esta identidade e extrair tokens/componentes compartilhados sem reescrita visual abrupta.
3. Há sinais de legado misturado no repositório raiz e em configurações CSP distintas. Mapear páginas estáticas, ferramentas incorporadas e dependências externas antes de reorganizar.
4. O projeto precisa de fronteiras de domínio claras para que o OssoHUB funcione como hub e os produtos possam ser desacoplados gradualmente.

**Ação:** inventário de módulos, mapa de dependências, contratos de integração e arquitetura-alvo sem migração de dados na primeira etapa.

## 4. Plano de trabalho

### Etapa A — Baseline (esta branch)
- Registrar estado de branches, deploy e stack.
- Inventariar rotas, APIs, componentes, migrations, tabelas, policies e buckets.
- Definir comandos de qualidade e CI.
- Produzir matriz de risco e plano de regressão.

### Etapa B — Fundação técnica
- Lockfile e dependências fixadas.
- Lint, typecheck, testes unitários e E2E mínimos.
- Proteção de branches e CI obrigatório (após aprovação).
- Observabilidade e logs sem dados sensíveis.

### Etapa C — Hub e design system
- Dashboard de entrada e navegação central.
- Tokens e componentes reutilizáveis preservando a identidade atual.
- Responsividade e acessibilidade.

### Etapa D — Migração por módulo
- Comunidade.
- Ortopedia e pediatria.
- Educação (questões/flashcards).
- Desempenho e equipes.
- Consultório e demais produtos.

Cada módulo será migrado com testes e comparação funcional antes de avançar.

## 5. Critérios de aceite

- Nenhuma mudança em produção sem autorização explícita.
- Nenhuma perda de conteúdo, conta, histórico ou arquivo.
- Build, lint, typecheck e testes aprovados na branch de desenvolvimento.
- Acesso validado por perfil e ownership.
- Rotas principais testadas em desktop, tablet e celular.
- Pull Requests pequenos, revisáveis e com plano de rollback.
- Migração de dados apenas com backup, dry-run e validação.

## 6. Próximos itens de auditoria

- Percorrer todas as páginas e Route Handlers e registrar controles de autorização.
- Revisar o conteúdo integral das 6 migrations SQL e policies relacionadas.
- Revisar todas as funções `SECURITY DEFINER` e seus grants.
- Verificar as configurações de Auth, URLs de redirect e provedores sem revelar segredos.
- Executar auditoria de dependências e build em ambiente isolado.
- Confirmar configuração Vercel Preview para que branches de trabalho nunca recebam aliases de produção.

---
**Status:** baseline inicial registrada; nenhuma mudança funcional ou de banco aplicada.
