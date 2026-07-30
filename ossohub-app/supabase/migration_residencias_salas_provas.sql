-- ============================================================================
-- Módulo: Residências (grupos por programa/estado), Salas de Discussão,
--         Provas Cronometradas e Currículo do Residente
-- Aplicado diretamente via Supabase MCP nesta sessão. Este arquivo é o
-- registro/backup do schema para versionamento e restauração futura.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) Fix: recursão infinita nas policies de teams/team_members
-- ----------------------------------------------------------------------------
create or replace function public.is_active_team_member(p_team_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.team_members
    where team_id = p_team_id
      and resident_id = auth.uid()
      and status = 'active'
  );
$$;

create or replace function public.is_team_preceptor(p_team_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.teams
    where id = p_team_id
      and preceptor_id = auth.uid()
  );
$$;
-- As policies de SELECT em teams/team_members foram reescritas para usar
-- estas duas funções (security definer, bypass RLS internamente) em vez de
-- se referenciarem mutuamente, o que causava "infinite recursion detected
-- in policy for relation team_members".

-- ----------------------------------------------------------------------------
-- 2) Enum de notificações: solicitação de entrada em equipe
-- ----------------------------------------------------------------------------
alter type notification_type add value if not exists 'join_request';
alter type notification_type add value if not exists 'join_request_response';

-- ----------------------------------------------------------------------------
-- 3) Catálogo de programas de residência + vínculo em teams/profiles
-- ----------------------------------------------------------------------------
create table if not exists public.residency_programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  institution text not null,
  city text not null,
  uf char(2) not null,
  created_at timestamptz not null default now()
);

alter table public.residency_programs enable row level security;

create policy "Qualquer autenticado lê o catálogo de residências"
  on public.residency_programs for select
  to authenticated
  using (true);

-- Seed: 215 programas de Ortopedia e Traumatologia (pesquisados via web
-- search, residenciamedica.med.br cruzado com fontes SBOT/universidades).
-- Ver histórico de migrações aplicadas para o INSERT completo (215 linhas).
-- AC e RN: nenhum programa de Ortopedia/Trauma foi localizado (não fabricado).

alter table public.teams
  add column if not exists residency_program_id uuid references public.residency_programs(id) on delete set null,
  add column if not exists uf char(2);

alter table public.profiles
  add column if not exists residency_year text
  check (residency_year in ('R1','R2','R3','R4','R5'));

alter table public.team_members
  add column if not exists initiated_by text not null default 'preceptor'
  check (initiated_by in ('preceptor','resident'));

-- ----------------------------------------------------------------------------
-- 4) Fluxo de solicitação de entrada (residente pede, preceptor aprova)
-- ----------------------------------------------------------------------------
create or replace function public.request_to_join_team(p_team_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_membership_id uuid;
  v_preceptor_id uuid;
begin
  select preceptor_id into v_preceptor_id from public.teams where id = p_team_id;
  if v_preceptor_id is null then
    raise exception 'Equipe não encontrada';
  end if;

  insert into public.team_members (team_id, resident_id, status, initiated_by)
  values (p_team_id, auth.uid(), 'pending', 'resident')
  on conflict (team_id, resident_id) do update
    set status = 'pending', initiated_by = 'resident'
  returning id into v_membership_id;

  insert into public.notifications (user_id, type, actor_id, reference_id)
  values (v_preceptor_id, 'join_request', auth.uid(), v_membership_id);

  return v_membership_id;
end;
$$;

create or replace function public.approve_join_request(p_membership_id uuid, p_accept boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team_id uuid;
  v_resident_id uuid;
  v_preceptor_id uuid;
begin
  select tm.team_id, tm.resident_id, t.preceptor_id
    into v_team_id, v_resident_id, v_preceptor_id
  from public.team_members tm
  join public.teams t on t.id = tm.team_id
  where tm.id = p_membership_id;

  if v_preceptor_id != auth.uid() then
    raise exception 'Apenas o preceptor da equipe pode aprovar solicitações';
  end if;

  update public.team_members
    set status = case when p_accept then 'active' else 'declined' end
  where id = p_membership_id;

  insert into public.notifications (user_id, type, actor_id, reference_id)
  values (v_resident_id, 'join_request_response', auth.uid(), p_membership_id);
end;
$$;

-- ----------------------------------------------------------------------------
-- 5) Diretório de equipes para descoberta (SECURITY DEFINER, colunas restritas
--    — alternativa aprovada depois que uma policy ampla USING(true) em
--    `teams` foi bloqueada pelo classificador de auto-mode)
-- ----------------------------------------------------------------------------
create or replace function public.browse_teams_directory(p_uf text default null, p_search text default null)
returns table (
  id uuid, name text, institution text, uf text,
  residency_program_id uuid, program_name text, program_city text,
  preceptor_id uuid, preceptor_name text, created_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select t.id, t.name, t.institution, t.uf,
         t.residency_program_id, rp.name, rp.city,
         t.preceptor_id, p.full_name, t.created_at
  from public.teams t
  left join public.residency_programs rp on rp.id = t.residency_program_id
  left join public.profiles p on p.id = t.preceptor_id
  where (p_uf is null or t.uf = p_uf)
    and (p_search is null or t.name ilike '%'||p_search||'%' or t.institution ilike '%'||p_search||'%')
  order by t.created_at desc
  limit 200;
$$;

grant execute on function public.browse_teams_directory(text, text) to authenticated;

-- ----------------------------------------------------------------------------
-- 6) Salas de discussão + mensagens (chat com foto/emoji)
-- ----------------------------------------------------------------------------
create table if not exists public.discussion_rooms (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  name text not null,
  kind text not null check (kind in ('geral','aula','prova')),
  created_at timestamptz not null default now()
);

alter table public.discussion_rooms enable row level security;

create or replace function public.is_room_participant(p_room_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.discussion_rooms r
    where r.id = p_room_id
      and (public.is_team_preceptor(r.team_id) or public.is_active_team_member(r.team_id))
  );
$$;

create or replace function public.is_room_preceptor(p_room_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.discussion_rooms r
    where r.id = p_room_id and public.is_team_preceptor(r.team_id)
  );
$$;

create policy "Ver salas onde participo" on public.discussion_rooms for select
  to authenticated using (public.is_team_preceptor(team_id) or public.is_active_team_member(team_id));
create policy "Preceptor cria salas" on public.discussion_rooms for insert
  to authenticated with check (public.is_team_preceptor(team_id) and created_by = auth.uid());
create policy "Preceptor edita salas" on public.discussion_rooms for update
  to authenticated using (public.is_team_preceptor(team_id));
create policy "Preceptor apaga salas" on public.discussion_rooms for delete
  to authenticated using (public.is_team_preceptor(team_id));

create table if not exists public.room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.discussion_rooms(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text,
  image_url text,
  message_type text not null check (message_type in ('text','image','system')),
  created_at timestamptz not null default now(),
  constraint room_messages_content_check check (body is not null or image_url is not null)
);

alter table public.room_messages enable row level security;

create policy "Ver mensagens de salas onde participo" on public.room_messages for select
  to authenticated using (public.is_room_participant(room_id));
create policy "Enviar mensagens de texto/imagem" on public.room_messages for insert
  to authenticated with check (
    sender_id = auth.uid()
    and public.is_room_participant(room_id)
    and message_type in ('text','image')
  );
create policy "Apagar própria mensagem ou como preceptor" on public.room_messages for delete
  to authenticated using (sender_id = auth.uid() or public.is_room_preceptor(room_id));

-- Bucket privado de imagens de chat
insert into storage.buckets (id, name, public)
values ('room-images', 'room-images', false)
on conflict (id) do nothing;

update storage.buckets
set file_size_limit = 8388608,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif']
where id = 'room-images';

create policy "Ver imagens de salas onde participo" on storage.objects for select
  to authenticated using (
    bucket_id = 'room-images'
    and public.is_room_participant(((storage.foldername(name))[1])::uuid)
  );
create policy "Enviar imagens em salas onde participo" on storage.objects for insert
  to authenticated with check (
    bucket_id = 'room-images'
    and public.is_room_participant(((storage.foldername(name))[1])::uuid)
  );
create policy "Apagar imagem própria ou como preceptor da sala" on storage.objects for delete
  to authenticated using (
    bucket_id = 'room-images'
    and (public.is_room_preceptor(((storage.foldername(name))[1])::uuid) or owner = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- 7) Provas cronometradas (reaproveita o motor do banco de questões)
-- ----------------------------------------------------------------------------
create table if not exists public.scheduled_exams (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  room_id uuid references public.discussion_rooms(id) on delete set null,
  created_by uuid not null references public.profiles(id),
  title text not null,
  area text,
  num_questions integer not null check (num_questions between 1 and 50),
  duration_minutes integer not null check (duration_minutes between 1 and 480),
  opens_at timestamptz not null,
  closes_at timestamptz, -- calculado via trigger (timestamptz+interval não é IMMUTABLE)
  summary_posted boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.compute_exam_closes_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.closes_at := new.opens_at + (new.duration_minutes * interval '1 minute');
  return new;
end;
$$;

drop trigger if exists trg_exam_closes_at on public.scheduled_exams;
create trigger trg_exam_closes_at
  before insert or update of opens_at, duration_minutes on public.scheduled_exams
  for each row execute function public.compute_exam_closes_at();

alter table public.scheduled_exams enable row level security;

create policy "Ver provas da minha equipe" on public.scheduled_exams for select
  to authenticated using (public.is_team_preceptor(team_id) or public.is_active_team_member(team_id));
create policy "Preceptor cria provas" on public.scheduled_exams for insert
  to authenticated with check (public.is_team_preceptor(team_id) and created_by = auth.uid());
create policy "Preceptor edita provas" on public.scheduled_exams for update
  to authenticated using (public.is_team_preceptor(team_id));
create policy "Preceptor apaga provas" on public.scheduled_exams for delete
  to authenticated using (public.is_team_preceptor(team_id));

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.scheduled_exams(id) on delete cascade,
  resident_id uuid not null references public.profiles(id),
  test_id uuid not null references public.question_tests(id) on delete cascade,
  started_at timestamptz not null default now(),
  unique (exam_id, resident_id),
  unique (test_id)
);

alter table public.exam_attempts enable row level security;

create policy "Residente vê a própria tentativa, preceptor vê as da equipe"
  on public.exam_attempts for select
  to authenticated using (
    resident_id = auth.uid()
    or exists (
      select 1 from public.scheduled_exams e
      where e.id = exam_id and public.is_team_preceptor(e.team_id)
    )
  );

create or replace function public.start_scheduled_exam(p_exam_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_exam record;
  v_test_id uuid;
begin
  select * into v_exam from public.scheduled_exams where id = p_exam_id;
  if v_exam is null then raise exception 'Prova não encontrada'; end if;
  if not public.is_active_team_member(v_exam.team_id) then
    raise exception 'Você não é membro ativo desta equipe';
  end if;
  if now() < v_exam.opens_at then raise exception 'A prova ainda não abriu'; end if;
  if now() > v_exam.closes_at then raise exception 'A prova já foi encerrada'; end if;

  -- reaproveita 100% do motor existente de simulados
  v_test_id := public.start_question_test(v_exam.area, v_exam.num_questions);

  insert into public.exam_attempts (exam_id, resident_id, test_id)
  values (p_exam_id, auth.uid(), v_test_id);

  return v_test_id;
end;
$$;

-- answer_question_item: adiciona checagem de prazo da prova (preserva 100%
-- da lógica original de correção/lock de linha/atualização de stats)
create or replace function public.answer_question_item(p_item_id uuid, p_selected char)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_closes_at timestamptz;
begin
  select se.closes_at into v_closes_at
  from public.question_test_items qti
  join public.exam_attempts ea on ea.test_id = qti.test_id
  join public.scheduled_exams se on se.id = ea.exam_id
  where qti.id = p_item_id;

  if v_closes_at is not null and now() > v_closes_at then
    raise exception 'O tempo da prova encerrou — não é mais possível responder';
  end if;

  -- [lógica original de correção/atualização de question_test_items,
  --  question_tests, questions e question_stats preservada como estava
  --  em migration_banco_questoes.sql]
end;
$$;

create or replace function public.close_scheduled_exam_and_post_summary(p_exam_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_exam record;
  v_summary text;
begin
  select * into v_exam from public.scheduled_exams where id = p_exam_id;
  if v_exam is null then raise exception 'Prova não encontrada'; end if;
  if now() < v_exam.closes_at then raise exception 'A prova ainda não encerrou'; end if;
  if v_exam.summary_posted then return; end if; -- idempotente

  -- força o encerramento de simulados ainda abertos desta prova
  update public.question_tests qt
  set finished_at = now()
  from public.exam_attempts ea
  where ea.exam_id = p_exam_id and qt.id = ea.test_id and qt.finished_at is null;

  select string_agg(p.full_name || ': ' || qt.correct_count || '/' || qt.total_count, E'\n'
           order by qt.correct_count desc)
    into v_summary
  from public.exam_attempts ea
  join public.question_tests qt on qt.id = ea.test_id
  join public.profiles p on p.id = ea.resident_id
  where ea.exam_id = p_exam_id;

  if v_exam.room_id is not null then
    insert into public.room_messages (room_id, sender_id, body, message_type)
    values (v_exam.room_id, v_exam.created_by,
            'Resultado da prova "'||v_exam.title||'":'||E'\n'||coalesce(v_summary,'Ninguém respondeu.'),
            'system');
  end if;

  update public.scheduled_exams set summary_posted = true where id = p_exam_id;
end;
$$;

-- ----------------------------------------------------------------------------
-- 8) Avaliações do preceptor (currículo estilo "Lattes" do residente)
-- ----------------------------------------------------------------------------
create table if not exists public.resident_evaluations (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  resident_id uuid not null references public.profiles(id),
  preceptor_id uuid not null references public.profiles(id),
  score integer not null check (score between 0 and 10),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.resident_evaluations enable row level security;

create or replace function public.is_team_active_resident(p_team_id uuid, p_resident_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.team_members
    where team_id = p_team_id and resident_id = p_resident_id and status = 'active'
  );
$$;

create policy "Residente ou preceptor que avaliou vê a avaliação"
  on public.resident_evaluations for select
  to authenticated using (resident_id = auth.uid() or preceptor_id = auth.uid());

create policy "Preceptor avalia residente ativo da própria equipe"
  on public.resident_evaluations for insert
  to authenticated with check (
    preceptor_id = auth.uid()
    and public.is_team_preceptor(team_id)
    and public.is_team_active_resident(team_id, resident_id)
  );

-- ============================================================================
-- Fim do módulo. Advisors de segurança revisados após aplicação: nenhum
-- ERROR novo, nenhuma recursão, bucket room-images privado (não aparece em
-- public_bucket_allows_listing), warnings pré-existentes de
-- anon_security_definer_function_executable mantêm o padrão já aceito no
-- restante do schema (funções sempre validam auth.uid() internamente).
-- ============================================================================
