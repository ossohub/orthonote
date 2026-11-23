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

**Ação executada em desenvolvimento:** removida a policy anônima de INSERT; a policy pública de SELECT foi preservada. A mudança foi testada no projeto de desenvolvimento e não foi aplicada em produção.

### P1 — segredo de cron aceito em query string

`src/app/api/internal/cron/resident-risk/route.ts` aceitava `?secret=...` como alternativa ao header Bearer. Segredos em URL podem aparecer em logs, histórico, observabilidade e sistemas intermediários.

**Ação executada na branch:** o endpoint aceita somente `Authorization: Bearer`. A correção está no Preview, sem publicação em produção.

### P1 — superfície de privilégio de funções SECURITY DEFINER

Foram identificadas 21 funções SECURITY DEFINER no schema `public`, todas com owner `postgres`, `search_path=public` e EXECUTE concedido a `authenticated`; a verificação efetiva confirmou EXECUTE negado a `anon` nas 21. Nenhuma das 21 usa SQL dinâmico. A maioria valida `auth.uid()` diretamente ou delega a helpers que o fazem. `get_pending_posts` e `moderate_post` usam `app_private.is_admin()`.

Foi identificado um caso específico: `is_team_active_resident(p_team_id, p_resident_id)` retornava apenas se o residente estava ativo na equipe, sem restringir quem podia consultar esse booleano. A função é usada pela policy de INSERT de `resident_evaluations`, que também exige `preceptor_id = auth.uid()` e `is_team_preceptor(team_id)`.

**Ação executada em desenvolvimento:** a função agora só retorna verdadeiro quando o chamador é o próprio residente ou o preceptor da equipe e o vínculo está ativo. A verificação de privilégios confirmou que `anon` não pode executar a função e `authenticated` mantém EXECUTE para uso pelas policies. Os demais RPCs SECURITY DEFINER não foram revogados em massa.

### P2 — middleware e autenticação por cliente

O middleware inicial usava `pathname.startsWith()` para os seis prefixos listados e não cobria explicitamente todas as rotas privadas. O layout principal não validava sessão no servidor. Páginas como edição de perfil e moderação faziam checagem client-side; no caso de moderação, o próprio código documentava que a RPC `moderate_post` é a barreira real.

**Ação executada na branch:** `src/middleware.ts` foi substituído por `src/proxy.ts`, protegendo as rotas do grupo `(main)` com comparação por segmento. O callback OAuth valida o destino de redirecionamento e rejeita destinos externos e caminhos com barras invertidas. A matriz completa de rotas ainda exige revisão individual.

## 3. APIs inspecionadas

| Endpoint | Controle observado | Observação |
|---|---|---|
| `POST /api/automation/posts` | Bearer `AUTOMATION_API_KEY`, comparação timing-safe, payload Zod, autor fixo em env | Usa service_role; manter segredo fora do cliente e validar URLs de mídia conforme política de conteúdo |
| `GET/POST /api/internal/cron/resident-risk` | Bearer `CRON_SECRET` | Fallback por query string removido na branch |
| `GET /api/v1/resident/[user_id]/risk` | `auth.getUser()`, comparação do ID com sessão, consentimento antes do admin client | Fluxo de autorização explícito; monitorar exposição/retorno de inferências sensíveis |
| `GET/POST /api/v1/resident/consent` | identidade derivada da sessão; escrita com service_role filtrada por user.id | Validar versionamento do termo e evitar aceitar versão arbitrária do cliente |
| `GET /auth/callback` | troca code por sessão; lê CRM do próprio user.id | Redirect agora validado contra destinos externos |

## 4. Storage — estado consultado

Buckets públicos: `mensuracao-figuras`, `orthonote-assets`, `post-images`, `post-videos`, `question-images`, `site-assets`.

Buckets privados: `post-media`, `procedimento-figuras`, `room-images`.

A policy `question-images` permite INSERT apenas quando `auth.role() = authenticated`; leitura pública é coerente com o bucket público. A policy `procedure_images_select_public` restringe a leitura às imagens marcadas como públicas e não ocultas. A policy anônima de `orthonote-assets` foi removida apenas em desenvolvimento.

A classificação pública do bucket e a policy SQL são controles distintos: ambos precisam ser considerados. Não foram testadas URLs individuais nem baixados objetos.

## 5. RLS — leitura de metadados

Na consulta inicial foram retornadas 105 policies em `public` e 19 em `storage`. Há policies atribuídas ao papel PostgreSQL `public`, o que inclui solicitações anon e authenticated; isso não significa acesso irrestrito quando a expressão usa `auth.uid()` ou `auth.role()`. As condições efetivas precisam ser avaliadas por tabela.

Exceção concreta identificada: `rx_images_select_all` usa `USING (true)` para `anon` e `authenticated`, comportamento mantido para as figuras de mensuração.

## 6. Migrações e integridade do histórico

Foram localizados scripts SQL legados em `ossohub-app/supabase/`, incluindo `schema.sql` e arquivos `migration_*.sql`. Eles não representam o histórico real do projeto. O Supabase registra 60 migrações aplicadas entre 2026-07-16 e 2026-11-20. Não havia diretório `supabase/migrations/` no repositório.

A branch de desenvolvimento recém-criada não reproduziu integralmente o schema de produção porque existem objetos criados fora do histórico versionado. A recuperação controlada foi suficiente para testar o escopo desta migração, mas **não estabelece paridade integral de schema**. Antes de novas migrações que dependam do módulo de provas/questões, deve-se versionar e reconciliar os scripts legados `migration_banco_questoes.sql`, `migration_desempenho.sql` e `migration_residencias_salas_provas.sql` com o histórico real.

## 7. Plano de correção remanescente

1. Inspecionar visualmente os ativos de mensuração em ambiente controlado e confirmar a classificação pública.
2. Completar matriz de 47 rotas, layouts, Server Actions e Route Handlers.
3. Revisar as demais funções SECURITY DEFINER e seus grants individualmente; não revogar em massa.
4. Reconciliar os scripts SQL legados com o catálogo e o histórico real de migrations.
5. Adicionar testes automatizados de autorização/RLS e fluxos críticos.
6. Gerar e revisar `package-lock.json` para builds reproduzíveis.

## 8. Garantias e limites

- Nenhuma escrita no banco ou Storage de produção.
- Nenhuma policy, função, tabela ou bucket alterado em produção.
- Nenhuma variável de ambiente, segredo, domínio ou alias de produção alterado.
- Nenhum merge realizado; nenhuma implantação de produção disparada.
- Este documento é uma auditoria técnica, não um pentest completo; não foram executados testes de exploração nem acessados dados pessoais de pacientes.

## 9. Correções de código na branch e Preview

- `src/middleware.ts` foi substituído por `src/proxy.ts`, conforme a convenção do Next.js 16.
- O Proxy protege as rotas do grupo `(main)` e usa comparação por segmento (`/rota` ou `/rota/...`) para evitar falsos positivos como `/profile-public`.
- O callback OAuth valida o destino de redirecionamento e rejeita destinos externos e caminhos com barras invertidas.
- O endpoint de cron não aceita segredo pela query string; somente `Authorization: Bearer`.
- O advisory HIGH `GHSA-mrhx-c7xc-m3w5` em Zod < 4.6.6 foi corrigido com Zod 4.6.7 e `@hookform/resolvers` 7.0.8.
- `npm audit --audit-level=high` reportou 0 vulnerabilidades.
- ESLint foi fixado em `9.39.5`, compatível com os plugins atuais. O lint permanece não bloqueante e ainda mostra warnings legados de imagens `<img>`, variáveis não utilizadas e regras do React Compiler; não é um lint limpo.
- `tsc --noEmit` e `next build` concluíram com sucesso no Preview do commit `a9b81fca6f4718f163720ef5c15d1aa3ac7843cd`.
- Next.js 16.4.6 sinaliza que React 18 está depreciado e será removido no Next 17. A migração para React 19 deve ser uma etapa separada, com regressão de formulários, auth e componentes Radix.
- O repositório continua sem lockfile; gerar e revisar `package-lock.json` permanece pendente.

## 10. Validação final de hardening no banco de desenvolvimento — 23/11/2026

A proposta de hardening foi aplicada e verificada somente no Supabase `ossohub-development` (project ref `jcotcvxopmlwzkopmply`). A migração `ossohub_security_performance_hardening` foi registrada como `20261123030744` e também foi versionada no repositório em `supabase/migrations/20261123030744_ossohub_security_performance_hardening.sql`.

Verificações:
- `orthonote_assets_temp_upload` não aparece mais em `pg_policies`; `orthonote_assets_public_read` permanece.
- `procedure_images` tem policy SELECT separada para `anon` (somente pública e não oculta) e `authenticated` (pública ou admin).
- `rx_images_created_by_idx` existe.
- RLS está habilitado em `teams`, `team_members`, `procedure_images` e `rx_images`.
- `anon` não tem EXECUTE em `is_team_active_resident`; `authenticated` mantém EXECUTE para uso pelas policies.
- Advisors foram executados após a mudança. O alerta de RLS sem policy em `vh_conexao` permaneceu sem alteração por falta de modelo de acesso aprovado. Alertas de SECURITY DEFINER para authenticated e índices não utilizados foram preservados para revisão individual; nenhum privilégio ou índice foi removido em massa.
- O advisor de performance não reporta mais ausência de índice para `rx_images.created_by`.

A branch não tem paridade integral de schema com produção. Objetos do módulo de residências/questões foram criados fora do histórico de migrações e a sincronização automática falhou ao tentar reconstruí-los. A validação usou estrutura mínima de desenvolvimento sem dados de produção para os objetos necessários ao escopo desta correção. A tabela `rx_images` foi recriada sem os 58 registros de referência; a validação foi estrutural e de políticas, não visual.

**Produção permanece intacta.** Nenhuma migração foi aplicada ao projeto `tgmnyhwcvhoatwxwidlq`, nenhum merge foi realizado e nenhuma implantação de produção foi disparada.

Relatório complementar: `DATABASE_VALIDATION_2026-11-23.md`.
