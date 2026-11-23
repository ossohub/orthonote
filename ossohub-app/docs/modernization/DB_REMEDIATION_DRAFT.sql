-- HARDENING VALIDADO EM DESENVOLVIMENTO — NÃO APLICADO EM PRODUÇÃO
-- Projeto de desenvolvimento: jcotcvxopmlwzkopmply
-- Produção: tgmnyhwcvhoatwxwidlq (inalterada)
-- Migração canônica versionada em:
-- supabase/migrations/20261123030744_ossohub_security_performance_hardening.sql
-- Relatório: DATABASE_VALIDATION_2026-11-23.md

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
  select coalesce(
    (auth.uid() = p_resident_id or public.is_team_preceptor(p_team_id))
    and exists (
      select 1
      from public.team_members
      where team_id = p_team_id
        and resident_id = p_resident_id
        and status = 'active'
    ),
    false
  );
$function$;

create index if not exists rx_images_created_by_idx
  on public.rx_images (created_by);

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

-- RESULTADOS VERIFICADOS NO BANCO DE DESENVOLVIMENTO:
-- 1) orthonote_assets_temp_upload removida; orthonote_assets_public_read preservada.
-- 2) is_team_active_resident: anon sem EXECUTE; authenticated com EXECUTE para policies.
-- 3) rx_images_created_by_idx existe.
-- 4) procedure_images tem SELECT separado para anon e authenticated/admin.
-- 5) RLS habilitado em teams, team_members, procedure_images e rx_images.
-- 6) Advisors executados; avisos preexistentes/fora do escopo documentados no relatório.

-- ATENÇÃO:
-- A branch de desenvolvimento ainda não tem paridade integral com produção.
-- Não executar esta proposta em produção sem revisão e aprovação do PR.
-- Não remover índices unused sem período de observação representativo.
-- Não remover a RLS sem policy de public.vh_conexao sem modelo de acesso aprovado.
