-- PROPOSTA DE HARDENING — NÃO EXECUTADA
-- Projeto: tgmnyhwcvhoatwxwidlq
-- Revisar em ambiente Supabase de desenvolvimento antes de aplicar em produção.
-- O bucket orthonote-assets tem 0 objetos e nenhuma referência no código pesquisado.
-- A remoção preserva a leitura pública do bucket e remove apenas upload anônimo.
-- A função limita a consulta de associação ao próprio residente ou ao preceptor da equipe.

begin;

drop policy if exists orthonote_assets_temp_upload on storage.objects;

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

commit;

-- Verificações pós-aplicação esperadas:
-- 1) anon não consegue INSERT em storage.objects para bucket orthonote-assets.
-- 2) authenticated que seja o próprio residente pode consultar sua associação.
-- 3) authenticated que seja preceptor da equipe pode validar membros da equipe.
-- 4) authenticated fora da equipe recebe false para qualquer combinação alheia.
-- 5) INSERT em resident_evaluations continua funcionando para o preceptor legítimo.
-- 6) SELECT público de orthonote-assets permanece inalterado; validar se realmente desejado.
