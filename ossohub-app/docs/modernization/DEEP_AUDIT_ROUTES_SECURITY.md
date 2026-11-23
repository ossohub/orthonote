# Auditoria aprofundada — rotas, autorização e Supabase

Data da inspeção: 2026-11-22  
Branch: `feature/audit-baseline`  
Escopo: inspeção read-only de código e metadados do Supabase. Nenhuma política, tabela, bucket, função, variável ou deployment foi alterado.

## 1. Inventário de rotas

Foram identificadas 47 entradas `page.tsx` / `route.ts` em `src/app`, incluindo cinco Route Handlers de API/autenticação.

O middleware em `src/middleware.ts` exige sessão apenas para prefixos:
`/feed`, `/explore`, `/network`, `/notifications`, `/profile`, `/post/new`.
O grupo de layout `(main)` não aplica autenticação: `src/app/(main)/layout.tsx` apenas monta Sidebar e ClinicalToolFrame.

Consequência: o middleware não é uma barreira global para o conjunto de páginas do grupo principal. Algumas páginas implementam verificação no cliente; isso melhora a experiência, mas não substitui autorização no servidor/RLS. É necessária uma matriz individual completa para cada página e cada operação de escrita antes de considerar a cobertura fechada.

## 2. Achados prioritários

### Revisão de `public.rx_images` — leitura pública aparentemente intencional

A primeira leitura classificou incorretamente a tabela como imagens de prescrições. A inspeção do schema e da migração `20261120201029_rx_images_mensuracao` mostrou que ela armazena figuras de referência para o módulo de mensuração: `medida_id`, `src_static`, `storage_path`, `caption`, dimensões, ordenação e `created_by`. O banco contém 58 registros. Não foram lidos os valores das linhas nem baixados arquivos.

A policy `rx_images_select_all` permite SELECT público (`USING true`). Dado o modelo de dados e o contexto de mensuração, essa leitura pode ser necessária para exibir figuras de referência e não há evidência atual de dados de pacientes. **Retirar a classificação P0:** não alterar essa policy sem inspeção visual controlada das figuras e confirmação funcional. Se alguma figura contiver paciente identificável, mover o ativo e restringir acesso individualmente.

### P1 — upload anônimo no bucket `orthonote-assets`

Bucket público, sem limite de tamanho ou MIME configurado; a policy `orthonote_assets_temp_upload` permite INSERT para `anon` sem prefixo ou ownership. A inspeção do catálogo encontrou **zero objetos** no bucket, e a busca de código no repositório não encontrou referência a `orthonote-assets`. Isso sugere que a permissão é legada e atualmente sem uso, mas não prova que não existam clientes externos.

**Ação recomendada:** remover a policy anônima após confirmar que nenhuma integração externa depende dela. Preservar o bucket e sua leitura pública até verificar consumidores. O SQL de remoção foi preparado como proposta, não executado.

### P1 — segredo de cron aceito em query string

`src/app/api/internal/cron/resident-risk/route.ts` aceita `?secret=...` como alternativa ao header Bearer. Segredos em URL podem aparecer em logs, histórico, observabilidade e sistemas intermediários.

**Ação recomendada:** aceitar somente `Authorization: Bearer`, manter comparação em tempo constante e rotacionar o segredo após remover a compatibilidade, se houver uso anterior de query string.

### P1 — superfície de privilégio de funções SECURITY DEFINER

Foram identificadas 21 funções SECURITY DEFINER no schema `public`, todas com owner `postgres`, `search_path=public` e EXECUTE concedido a `authenticated`; a verificação efetiva confirmou EXECUTE negado a `anon` nas 21. Nenhuma das 21 usa SQL dinâmico. A maioria valida `auth.uid()` diretamente ou delega a helpers que o fazem. `get_pending_posts` e `moderate_post` usam `app_private.is_admin()`.

Foi identificado um caso específico: `is_team_active_resident(p_team_id, p_resident_id)` retorna apenas se o residente está ativo na equipe, sem restringir quem pode consultar esse booleano. A função é usada pela policy de INSERT de `resident_evaluations`, que também exige `preceptor_id = auth.uid()` e `is_team_preceptor(team_id)`. A busca no repositório não encontrou chamadas diretas do frontend. Recomenda-se reforçar a função para só responder `true` quando o chamador for o próprio residente ou o preceptor da equipe; a mudança precisa ser testada contra a policy antes de aplicar.

As outras funções auxiliares sem `auth.uid()` direto (`browse_teams_directory`, `get_pending_posts`, `is_room_participant`, `is_room_preceptor`) têm gates/delegações específicos e não foram classificadas como vulneráveis apenas pela ausência textual de `auth.uid()`. `search_path=public` merece endurecimento, mas `anon` e `authenticated` não possuem CREATE em `public` nem em `app_private`, reduzindo o risco de shadowing por esses papéis.

**Ação recomendada:** corrigir `is_team_active_resident`, manter revisão de cada RPC e testar grants/ownership. Não foram alterados privilégios.

### P2 — middleware e autenticação por cliente

O middleware usa `pathname.startsWith()` para os seis prefixos listados e não cobre explicitamente todas as rotas privadas. O layout principal não valida sessão no servidor. Páginas como edição de perfil e moderação fazem checagem client-side; no caso de moderação, o próprio código documenta que a RPC `moderate_post` é a barreira real.

**Ação recomendada:** centralizar validação de sessão no servidor para áreas privadas, mantendo RLS/RPC como autorização final. Construir matriz por rota com estado anônimo/autenticado/autor/admin e testar acesso direto por URL e chamada direta de API.

## 3. APIs inspecionadas

| Endpoint | Controle observado | Observação |
|---|---|---|
| `POST /api/automation/posts` | Bearer `AUTOMATION_API_KEY`, comparação timing-safe, payload Zod, autor fixo em env | Usa service_role; manter segredo fora do cliente e validar URLs de mídia conforme política de conteúdo |
| `GET/POST /api/internal/cron/resident-risk` | Bearer `CRON_SECRET` + fallback query string | Remover fallback de query string |
| `GET /api/v1/resident/[user_id]/risk` | `auth.getUser()`, comparação do ID com sessão, consentimento antes do admin client | Fluxo de autorização explícito; monitorar exposição/retorno de inferências sensíveis |
| `GET/POST /api/v1/resident/consent` | identidade derivada da sessão; escrita com service_role filtrada por user.id | Validar versionamento do termo e evitar aceitar versão arbitrária do cliente |
| `GET /auth/callback` | troca code por sessão; lê CRM do próprio user.id | Validar allowlist de destinos de redirect e cobrir testes de OAuth |

## 4. Storage — estado consultado

Buckets públicos: `mensuracao-figuras`, `orthonote-assets`, `post-images`, `post-videos`, `question-images`, `site-assets`.

Buckets privados: `post-media`, `procedimento-figuras`, `room-images`.

A policy `question-images` permite INSERT apenas quando `auth.role() = authenticated`; leitura pública é coerente com o bucket público. `procedure_images_select_public` restringe a leitura às imagens marcadas como públicas e não ocultas. A policy anônima de `orthonote-assets` é o ponto de maior atenção.

A classificação pública do bucket e a policy SQL são controles distintos: ambos precisam ser considerados. Não foram testadas URLs individuais nem baixados objetos.

## 5. RLS — leitura de metadados

Na consulta atual foram retornadas 105 policies em `public` e 19 em `storage`. Há policies atribuídas ao papel PostgreSQL `public`, o que inclui solicitações anon e authenticated; isso não significa acesso irrestrito quando a expressão usa `auth.uid()` ou `auth.role()`. As condições efetivas precisam ser avaliadas por tabela.

Exceção concreta identificada: `rx_images_select_all` usa `USING (true)` para `anon` e `authenticated`.

A consulta anterior também indicou grants SQL amplos para os papéis de API. Grants não substituem RLS: a segurança depende da combinação de privilégios, RLS, policies e funções SECURITY DEFINER.

## 6. Migrações e integridade do histórico

Foram localizados seis scripts SQL legados em `ossohub-app/supabase/`: `schema.sql` e cinco arquivos `migration_*.sql`. Eles não representam o histórico real do projeto. O Supabase registra **60 migrações aplicadas** entre 2026-07-16 e 2026-11-20, incluindo hardening de RLS, Storage, funções e módulos posteriores. Não há diretório `supabase/migrations/` no repositório atual.

Há divergência entre a documentação SQL legada e o estado real; alguns scripts antigos não são idempotentes. Não executar esses arquivos diretamente nem usá-los como fonte única de reconstrução. A modernização precisa primeiro estabelecer uma linha de base versionada e reconciliar o schema real com as 60 entradas do histórico.

## 7. Plano de correção — sem execução nesta etapa

1. Validar conteúdo e finalidade de `rx_images`; tratar como potencial dado sensível.
2. Planejar substituição do upload anônimo em `orthonote-assets`.
3. Remover segredo por query string no cron após confirmar consumidores e rotacionar credencial.
4. Revisar as 21 funções SECURITY DEFINER e grants de EXECUTE individualmente.
5. Completar matriz de 47 rotas, layouts, Server Actions e Route Handlers.
6. Reconciliar os seis SQL versionados com o catálogo e histórico real de migrations.
7. Adicionar testes automatizados de autorização/RLS e fluxos críticos antes de mudanças funcionais.

## 8. Garantias desta auditoria

- Nenhuma escrita no banco ou Storage.
- Nenhuma policy, função, tabela ou bucket alterado.
- Nenhuma variável de ambiente, segredo, domínio ou alias alterado.
- Nenhuma alteração na branch main ou deployment de produção.
- Este documento é uma análise técnica, não um pentest completo; não foram executados testes de exploração nem acessados dados pessoais de pacientes.


## 9. Correções aplicadas no código da branch (não publicadas)

- `src/middleware.ts` foi substituído por `src/proxy.ts`, conforme a convenção do Next.js 16.
- O Proxy agora protege as rotas do grupo `(main)` e usa comparação por segmento (`/rota` ou `/rota/...`) para evitar falsos positivos como `/profile-public`.
- O callback OAuth agora valida o destino de redirecionamento e rejeita destinos externos e caminhos com barras invertidas.
- O endpoint de cron não aceita mais segredo pela query string; somente `Authorization: Bearer`.

Essas alterações estão na branch de auditoria e devem passar pelo Preview/build antes de qualquer merge. Referência da migração de middleware para Proxy: https://nextjs.org/docs/app/api-reference/file-conventions/proxy.


## 11. Dependências e qualidade de build

- O Preview identificou o advisory HIGH `GHSA-mrhx-c7xc-m3w5` em Zod < 4.6.6. O advisory não possui correção na linha Zod 3; a correção disponível é Zod 4.6.6+. A branch foi atualizada para Zod 4.6.7 e `@hookform/resolvers` 7.0.8.
- A execução de `npm audit --audit-level=high` após a atualização reportou **0 vulnerabilidades** (build de Preview, sem publicação em produção).
- ESLint foi alinhado ao Next 16 com flat config e versão 10.15.0. O script `prebuild` passou a executar audit, lint e typecheck antes do build.
- A primeira lintagem encontrou 32 erros e 31 avisos, majoritariamente regras novas do React Compiler aplicadas a padrões antigos. As regras de sincronização de estado em effects, imutabilidade, pureza e bibliotecas incompatíveis foram mantidas como warnings transitórios. O uso de `watch()` no formulário de cadastro foi trocado por `useWatch()` para remover uma incompatibilidade concreta com o React Compiler.
- Permanecem warnings de variáveis não utilizadas, imagens `<img>` e padrões antigos de efeitos. Não foram silenciados globalmente.
- O repositório ainda não contém lockfile; o Vercel executa `npm install`. Gerar e revisar `package-lock.json` é pendência antes de exigir builds reproduzíveis com `npm ci`.

Advisory: https://github.com/advisories/GHSA-mrhx-c7xc-m3w5.
