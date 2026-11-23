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

### P0 — leitura pública irrestrita em `public.rx_images`

A policy ativa `rx_images_select_all` permite SELECT com expressão `true` para `anon` e `authenticated`. O nome da tabela indica imagens relacionadas a prescrições. Se houver imagens clínicas, prescrições ou identificadores pessoais armazenados nela, qualquer visitante pode consultá-las pela API pública do Supabase.

A classificação P0 é preventiva, baseada no caráter potencialmente sensível dos dados e na policy efetiva. É necessário confirmar finalidade, conteúdo e uso da tabela. Não foi feita leitura dos registros nem alteração da policy.

**Ação recomendada:** interromper novas gravações de dados pessoais nessa tabela até validar o conteúdo; inventariar URLs e consumidores; definir acesso autenticado e ownership explícito; migrar dados/arquivos se necessário. Não revogar acesso sem plano de compatibilidade e autorização.

### P1 — upload anônimo no bucket `orthonote-assets`

Bucket marcado como público, sem limite de tamanho ou MIME configurado no cadastro consultado. A policy `orthonote_assets_temp_upload` permite INSERT ao papel `anon` para qualquer objeto desse bucket (`bucket_id = 'orthonote-assets'`), sem condição de pasta/usuário.

A leitura pública pode ser intencional para assets estáticos; o upload anônimo amplo, porém, abre possibilidade de abuso de armazenamento, conteúdo indevido e custos.

**Ação recomendada:** identificar fluxo consumidor e objetos existentes; mover upload para endpoint autenticado/assinado; limitar tipo, tamanho, prefixo e frequência; remover a permissão anônima somente após validar o fluxo substituto.

### P1 — segredo de cron aceito em query string

`src/app/api/internal/cron/resident-risk/route.ts` aceita `?secret=...` como alternativa ao header Bearer. Segredos em URL podem aparecer em logs, histórico, observabilidade e sistemas intermediários.

**Ação recomendada:** aceitar somente `Authorization: Bearer`, manter comparação em tempo constante e rotacionar o segredo após remover a compatibilidade, se houver uso anterior de query string.

### P1 — superfície de privilégio de funções SECURITY DEFINER

Foram identificadas 21 funções SECURITY DEFINER no schema `public`, todas com owner `postgres` e `search_path=public`. Exemplos incluem `moderate_post`, `get_pending_posts`, `award_self_xp`, `start_question_test`, `answer_question_item`, `invite_resident_to_team` e `start_conversation`.

O owner privilegiado e SECURITY DEFINER não constituem, isoladamente, uma vulnerabilidade. Entretanto, cada função precisa ser revisada quanto a validação de `auth.uid()`, autorização por papel/ownership, SQL dinâmico, objetos qualificados e EXECUTE grants. `search_path=public` merece endurecimento com schema confiável e referências qualificadas.

**Ação recomendada:** auditar individualmente as 21 definições e grants antes de qualquer mudança. Não foram revogados privilégios.

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

Foram localizados seis arquivos SQL versionados em `ossohub-app/supabase/`: `schema.sql` e cinco arquivos `migration_*.sql`. Eles documentam a estrutura de perfis/comunidade, questões, flashcards, desempenho/equipes e análise preditiva.

A inspeção inicial confirma que há migrações com `DROP CONSTRAINT` seguido de recriação de CHECK, triggers e policies. Antes de automatizar deploy de schema, comparar cada arquivo com o catálogo real do banco, identificar ordem/dependências e confirmar quais scripts foram efetivamente aplicados. Não executar esses arquivos diretamente: alguns não são idempotentes e o histórico real de aplicação ainda precisa ser reconciliado.

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
