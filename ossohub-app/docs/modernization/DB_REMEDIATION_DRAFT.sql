-- PROPOSTA DE HARDENING — NÃO EXECUTADA
-- Projeto: tgmnyhwcvhoatwxwidlq
-- Revisar em ambiente Supabase de desenvolvimento antes de aplicar em produção.
-- O bucket orthonote-assets tem 0 objetos e nenhuma referência no código pesquisado.
-- A remoção preserva a leitura pública do bucket e remove apenas upload anônimo.
-- A função limita a consulta de associação ao próprio residente ou ao preceptor da equipe.

begin;

drop policy if exists orthonote_assets_temp_upload on storage.objects;

-- A função é usada por uma policy de INSERT de resident_evaluations.
-- Restringe o booleano ao próprio residente ou ao preceptor da equipe.
create or replace function public.is_team_active_resident(
  p_team_id uuid,
  p_resident_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $function$
  select
    (auth.uid() = p_resident_id or public.is_team_preceptor(p_team_id))
    and exists (
      select 1
      from public.team_members
      where team_id = p_team_id
        and resident_id = p_resident_id
        and status = 'active'
    );
$function$;

-- Cobertura da FK created_by (advisor de performance).
create index if not exists rx_images_created_by_idx
  on public.rx_images (created_by);

-- Evita duas policies permissivas de SELECT sobrepostas para authenticated.
-- anon continua vendo somente as imagens explicitamente públicas.
drop policy if exists procedure_images_select_admin on public.procedure_images;
drop policy if exists procedure_images_select_public on public.procedure_images;

create policy procedure_images_select_public
  on public.procedure_images
  for select
  to anon
  using (visibility = 'public' and not hidden);

create policy procedure_images_select_authenticated
  on public.procedure_images
  for select
  to authenticated
  using (
    (visibility = 'public' and not hidden)
    or (select app_private.is_admin())
  );

commit;

-- Verificações pós-aplicação esperadas:
-- 1) anon não consegue INSERT em storage.objects para bucket orthonote-assets.
-- 2) authenticated que seja o próprio residente pode consultar sua associação.
-- 3) authenticated que seja preceptor da equipe pode validar membros da equipe.
-- 4) authenticated fora da equipe recebe false para qualquer combinação alheia.
-- 5) INSERT em resident_evaluations continua funcionando para o preceptor legítimo.
-- 6) SELECT público de orthonote-assets permanece inalterado; validar se realmente desejado.

-- Notas de cautela:
-- - Não remover índices marcados como unused sem observar um período de carga representativo.
-- - Não remover a policy RLS de public.vh_conexao sem definir o modelo de acesso; atualmente RLS sem policy bloqueia clientes comuns.
-- - A proteção contra senhas vazadas deve ser habilitada em Supabase Auth > Security and Protection após validar impacto no cadastro/recuperação.
