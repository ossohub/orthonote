# Validação de hardening do banco — 23/11/2026

## Resultado

A proposta de hardening foi aplicada e verificada **somente** no Supabase de desenvolvimento `ossohub-development` (project ref `jcotcvxopmlwzkopmply`). Nenhuma alteração foi aplicada ao banco de produção `tgmnyhwcvhoatwxwidlq`.

A branch recebeu a migração `ossohub_security_performance_hardening`, registrada no banco de desenvolvimento em `20261123030744`.

## Correções aplicadas

1. Removida a policy `orthonote_assets_temp_upload`, que permitia INSERT anônimo no bucket `orthonote-assets`. A policy pública de SELECT do bucket foi preservada.
2. Endurecida `public.is_team_active_resident(uuid, uuid)`: só retorna verdadeiro quando o chamador é o próprio residente ou o preceptor da equipe e o vínculo está ativo.
3. Criado o índice `rx_images_created_by_idx` para a FK `rx_images.created_by`.
4. Reorganizadas as policies SELECT de `procedure_images`: `anon` só lê imagens públicas e não ocultas; `authenticated` lê essas imagens ou todas quando `app_private.is_admin()` autoriza. A policy SELECT duplicada de admin foi removida.

## Verificações realizadas

- `orthonote_assets_temp_upload` não aparece mais em `pg_policies`.
- `orthonote_assets_public_read` permanece, sem alteração.
- `procedure_images` tem duas policies SELECT separadas por papel: uma para `anon`, outra para `authenticated`.
- `rx_images_created_by_idx` e `procedure_images_created_by_idx` existem.
- RLS continua habilitado em `teams`, `team_members`, `procedure_images` e `rx_images`.
- `anon` não tem EXECUTE em `is_team_active_resident`; `authenticated` mantém EXECUTE para uso pelas policies.
- Teste direto da função sem sessão e com IDs não relacionados retornou `false`.
- Advisors foram executados após as alterações. O alerta de RLS sem policy em `vh_conexao` permanece intencionalmente sem alteração até existir modelo de acesso aprovado. Alertas de SECURITY DEFINER para authenticated foram mantidos para RPCs que fazem parte do fluxo da aplicação e exigem revisão individual; não houve revogação em massa.
- O advisor de performance não reporta mais ausência de índice para `rx_images.created_by`.

## Divergência entre produção e branch de desenvolvimento

A branch de desenvolvimento não pôde ser sincronizada integralmente pelo rebase automático. A investigação encontrou migrações históricas que pressupõem objetos criados fora do histórico versionado (incluindo funções auxiliares e tabelas do módulo de residências). A branch foi recuperada apenas o suficiente para validar o escopo desta migração, com estrutura de desenvolvimento sem dados de produção.

O desenvolvimento não contém cópia dos dados de produção. A tabela de imagens de mensuração foi recriada sem os registros de conteúdo; a validação foi estrutural e de políticas, não uma validação visual de ativos.

Por essa razão, esta entrega fecha a correção específica de segurança/performance em desenvolvimento, mas **não declara paridade integral de schema entre produção e desenvolvimento**. Antes de novas migrações que dependam do módulo de provas/questões, deve-se versionar e reconciliar os scripts legados `migration_banco_questoes.sql`, `migration_desempenho.sql` e `migration_residencias_salas_provas.sql` com o histórico real.

## Produção e publicação

- Nenhum SQL foi executado em produção.
- Nenhum merge foi realizado.
- Nenhuma implantação de produção foi disparada.
- A migração está versionada na branch `feature/audit-baseline` e aguarda revisão no PR #1.
- O Preview de aplicação permanece: https://ossohub-mh7b9ml0z-ossohub-s-projects.vercel.app

## Controle de custo

Após concluir e verificar os testes, solicitei a pausa do projeto de desenvolvimento para interromper o consumo contínuo de compute. A API de gerenciamento confirmou a solicitação; a última consulta ainda mostrava o estado transitório `PAUSING`. O banco pode ser retomado quando for necessário continuar a homologação. O custo já incorrido durante as horas ativas permanece no ciclo de faturamento.

## Próxima etapa

Revisar e aprovar o PR #1. A aplicação em produção deve ocorrer somente após backup/revisão, validação dos consumidores do bucket e janela de implantação autorizada.
