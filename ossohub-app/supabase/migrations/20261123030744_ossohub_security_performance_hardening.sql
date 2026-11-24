-- OssoHub — hardening de segurança e performance
-- Validada em desenvolvimento e revisada contra o schema atual de produção.
-- Alterações restritas a políticas, função de autorização e índice; sem DML ou exclusão de dados.

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
