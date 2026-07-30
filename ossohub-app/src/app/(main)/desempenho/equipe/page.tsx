"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Users2, Plus, Trash2, Check, X, Mail, Search, MapPin,
  UserPlus, Building2, ShieldCheck, Sparkles, Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import {
  createTeam, listMyTeamsAsPreceptor, listMyMemberships,
  inviteResidentToTeam, respondTeamInvite, removeTeamMember, deleteTeam,
  listResidencyPrograms, browseTeamsToJoin, requestToJoinTeam, approveJoinRequest,
  type TeamDirectoryEntry,
} from "@/lib/teams";
import { BRAZIL_STATES, type Team, type TeamMember, type TeamMemberStatus, type ResidencyProgram } from "@/lib/types";

const STATUS_LABEL: Record<TeamMemberStatus, string> = {
  pending: "Convite pendente",
  active: "Ativo",
  declined: "Recusado",
};

const STATUS_STYLE: Record<TeamMemberStatus, string> = {
  pending: "bg-amber-50 border-amber-200/80 text-amber-700",
  active: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
  declined: "bg-slate-50 border-slate-200 text-slate-400",
};

const STATUS_DOT: Record<TeamMemberStatus, string> = {
  pending: "bg-amber-500",
  active: "bg-emerald-500",
  declined: "bg-slate-300",
};

// ============================================================
// Pequenos blocos visuais reutilizados nesta página
// ============================================================

function SectionLabel({
  icon: Icon,
  children,
  tone = "slate",
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  tone?: "slate" | "green";
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          tone === "green" ? "bg-ossohub-green/10 text-ossohub-green-dark" : "bg-slate-100 text-ossohub-slate"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-[15px] font-semibold text-ossohub-navy tracking-tight">{children}</p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-ossohub-slate mb-1.5">{children}</label>;
}

function MemberAvatar({ name, photoUrl }: { name: string; photoUrl?: string | null }) {
  return (
    <Avatar className="h-8 w-8 shrink-0 border border-slate-200">
      <AvatarImage src={photoUrl ?? undefined} />
      <AvatarFallback className="bg-slate-100 text-[11px] font-semibold text-ossohub-slate">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default function EquipePage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [teams, setTeams] = useState<Team[]>([]);
  const [memberships, setMemberships] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamInstitution, setNewTeamInstitution] = useState("");
  const [newTeamUf, setNewTeamUf] = useState("");
  const [newTeamProgramId, setNewTeamProgramId] = useState("");
  const [programsForUf, setProgramsForUf] = useState<ResidencyProgram[]>([]);
  const [creatingTeam, setCreatingTeam] = useState(false);

  const [inviteInputs, setInviteInputs] = useState<Record<string, string>>({});
  const [invitingTeamId, setInvitingTeamId] = useState<string | null>(null);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Buscar/solicitar entrada numa equipe existente
  const [browseUf, setBrowseUf] = useState("");
  const [browseSearch, setBrowseSearch] = useState("");
  const [browseResults, setBrowseResults] = useState<TeamDirectoryEntry[]>([]);
  const [browsing, setBrowsing] = useState(false);
  const [requestingId, setRequestingId] = useState<string | null>(null);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [t, m] = await Promise.all([listMyTeamsAsPreceptor(), listMyMemberships()]);
      setTeams(t);
      setMemberships(m);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar equipes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadAll();
  }, [user, loadAll]);

  useEffect(() => {
    if (!newTeamUf) { setProgramsForUf([]); return; }
    listResidencyPrograms(newTeamUf).then(setProgramsForUf).catch(() => setProgramsForUf([]));
  }, [newTeamUf]);

  async function handleCreateTeam() {
    if (!newTeamName.trim()) {
      toast.error("Dê um nome para a equipe");
      return;
    }
    setCreatingTeam(true);
    try {
      await createTeam(
        newTeamName.trim(),
        newTeamInstitution.trim() || undefined,
        newTeamProgramId || null,
        newTeamUf || null
      );
      toast.success("Equipe criada!");
      setNewTeamName(""); setNewTeamInstitution(""); setNewTeamUf(""); setNewTeamProgramId("");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar equipe");
    } finally {
      setCreatingTeam(false);
    }
  }

  async function handleInvite(teamId: string) {
    const identifier = (inviteInputs[teamId] ?? "").trim();
    if (!identifier) {
      toast.error("Informe o CRM ou e-mail do residente");
      return;
    }
    setInvitingTeamId(teamId);
    try {
      await inviteResidentToTeam(teamId, identifier);
      toast.success("Convite enviado!");
      setInviteInputs((prev) => ({ ...prev, [teamId]: "" }));
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao convidar residente");
    } finally {
      setInvitingTeamId(null);
    }
  }

  // Convite que EU recebi do preceptor (initiated_by = 'preceptor')
  async function handleRespond(membershipId: string, accept: boolean) {
    setRespondingId(membershipId);
    try {
      await respondTeamInvite(membershipId, accept);
      toast.success(accept ? "Convite aceito!" : "Convite recusado");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao responder convite");
    } finally {
      setRespondingId(null);
    }
  }

  // Solicitação que UM RESIDENTE fez pra entrar numa equipe minha (initiated_by = 'resident')
  async function handleApproveJoin(membershipId: string, accept: boolean) {
    setRespondingId(membershipId);
    try {
      await approveJoinRequest(membershipId, accept);
      toast.success(accept ? "Residente adicionado à equipe!" : "Solicitação recusada");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao responder solicitação");
    } finally {
      setRespondingId(null);
    }
  }

  async function handleRemoveMember(membershipId: string) {
    setRemovingId(membershipId);
    try {
      await removeTeamMember(membershipId);
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover");
    } finally {
      setRemovingId(null);
    }
  }

  async function handleDeleteTeam(teamId: string) {
    try {
      await deleteTeam(teamId);
      toast.success("Equipe removida");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover equipe");
    }
  }

  async function handleBrowse() {
    setBrowsing(true);
    try {
      const results = await browseTeamsToJoin(browseUf || undefined, browseSearch || undefined);
      setBrowseResults(results);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao buscar equipes");
    } finally {
      setBrowsing(false);
    }
  }

  async function handleRequestJoin(teamId: string) {
    setRequestingId(teamId);
    try {
      await requestToJoinTeam(teamId);
      toast.success("Solicitação enviada! Aguarde a aprovação do preceptor.");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao solicitar entrada");
    } finally {
      setRequestingId(null);
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  // Convites que EU recebi do preceptor (respondo eu, aceitar/recusar)
  const receivedInvites = memberships.filter((m) => m.status === "pending" && m.initiated_by === "preceptor");
  // Solicitações que EU enviei e ainda aguardam o preceptor
  const myPendingRequests = memberships.filter((m) => m.status === "pending" && m.initiated_by === "resident");
  const myActiveTeams = memberships.filter((m) => m.status === "active");
  const requestedTeamIds = new Set(memberships.map((m) => m.team_id));

  const totalActiveResidents = teams.reduce(
    (acc, t) => acc + (t.members ?? []).filter((m) => m.status === "active").length,
    0
  );

  return (
    <div className="ossohub-canvas min-h-screen py-10">
      <div className="ossohub-container max-w-4xl">
        {/* Cabeçalho */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ossohub-navy text-white shadow-sm">
              <Users2 className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-[22px] font-bold text-ossohub-navy tracking-tight leading-tight">Minha Equipe</h1>
              <p className="text-sm text-ossohub-slate mt-0.5 max-w-md">
                Crie sua equipe de residência, convide residentes por CRM ou e-mail e acompanhe o vínculo entre preceptor e residentes.
              </p>
            </div>
          </div>

          {!loading && teams.length > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="text-right">
                <p className="text-sm font-bold text-ossohub-navy leading-none">{teams.length}</p>
                <p className="text-[11px] text-ossohub-slate mt-0.5">{teams.length === 1 ? "equipe" : "equipes"}</p>
              </div>
              <div className="h-7 w-px bg-slate-200" />
              <div className="text-right">
                <p className="text-sm font-bold text-ossohub-navy leading-none">{totalActiveResidents}</p>
                <p className="text-[11px] text-ossohub-slate mt-0.5">residentes ativos</p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-ossohub-green" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Convites recebidos do preceptor */}
            {receivedInvites.length > 0 && (
              <div className="ossohub-card-premium p-5">
                <SectionLabel icon={Inbox} tone="green">Convites recebidos</SectionLabel>
                <div className="space-y-2">
                  {receivedInvites.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ossohub-navy truncate">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate mt-0.5">
                          Preceptor: {m.team?.preceptor?.full_name}{m.team?.institution ? ` · ${m.team.institution}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" onClick={() => handleRespond(m.id, true)} disabled={respondingId === m.id}>
                          {respondingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Aceitar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRespond(m.id, false)} disabled={respondingId === m.id}>
                          <X className="h-3.5 w-3.5" /> Recusar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Minhas solicitações pendentes (enviadas por mim) */}
            {myPendingRequests.length > 0 && (
              <div className="ossohub-card-premium p-5">
                <SectionLabel icon={Loader2}>Minhas solicitações pendentes</SectionLabel>
                <div className="space-y-2">
                  {myPendingRequests.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ossohub-navy truncate">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate mt-0.5">Aguardando aprovação de {m.team?.preceptor?.full_name}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}>
                        {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Cancelar"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipes das quais participo como residente */}
            {myActiveTeams.length > 0 && (
              <div className="ossohub-card-premium p-5">
                <SectionLabel icon={ShieldCheck} tone="green">Equipes que participo</SectionLabel>
                <div className="space-y-2">
                  {myActiveTeams.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ossohub-navy truncate">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate mt-0.5">Preceptor: {m.team?.preceptor?.full_name}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}>
                        {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Sair da equipe"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Criar equipe + Buscar equipe existente, lado a lado */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Criar equipe (preceptor) — ação primária, mais destaque */}
              <div className="lg:col-span-3 ossohub-card-premium p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-ossohub-green/5 pointer-events-none" />
                <div className="relative">
                  <SectionLabel icon={Sparkles} tone="green">Criar equipe de residência</SectionLabel>
                  <p className="text-xs text-ossohub-slate -mt-3 mb-5 max-w-sm">
                    Como preceptor, crie sua equipe para convidar residentes e acompanhar o desempenho de cada um.
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <FieldLabel>Nome da equipe</FieldLabel>
                      <input
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        placeholder="Ex: Residência de Ortopedia — Hospital X"
                        className="ossohub-input"
                      />
                    </div>
                    <div>
                      <FieldLabel>Instituição <span className="text-slate-300 font-normal">(opcional)</span></FieldLabel>
                      <input
                        value={newTeamInstitution}
                        onChange={(e) => setNewTeamInstitution(e.target.value)}
                        placeholder="Ex: Hospital Metropolitano"
                        className="ossohub-input"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Estado <span className="text-slate-300 font-normal">(opcional)</span></FieldLabel>
                        <select
                          value={newTeamUf}
                          onChange={(e) => { setNewTeamUf(e.target.value); setNewTeamProgramId(""); }}
                          className="ossohub-input appearance-none"
                        >
                          <option value="">Selecione</option>
                          {BRAZIL_STATES.map((s) => <option key={s.uf} value={s.uf}>{s.uf} — {s.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Programa <span className="text-slate-300 font-normal">(opcional)</span></FieldLabel>
                        <select
                          value={newTeamProgramId}
                          onChange={(e) => setNewTeamProgramId(e.target.value)}
                          disabled={!newTeamUf || programsForUf.length === 0}
                          className="ossohub-input appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            {!newTeamUf ? "Escolha o estado" : programsForUf.length === 0 ? "Use o nome livre acima" : "Selecione"}
                          </option>
                          {programsForUf.map((p) => (
                            <option key={p.id} value={p.id}>{p.name} — {p.city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleCreateTeam} disabled={creatingTeam} className="w-full sm:w-auto">
                    {creatingTeam ? <><Loader2 className="h-4 w-4 animate-spin" /> Criando equipe...</> : <><Plus className="h-4 w-4" /> Criar equipe</>}
                  </Button>
                </div>
              </div>

              {/* Buscar equipe existente — ação secundária */}
              <div className="lg:col-span-2 ossohub-card-premium p-6">
                <SectionLabel icon={Search}>Encontrar minha equipe</SectionLabel>
                <p className="text-xs text-ossohub-slate -mt-3 mb-4">
                  Já existe uma equipe cadastrada pelo seu preceptor? Procure por estado ou nome do hospital.
                </p>

                <div className="space-y-2.5 mb-3">
                  <select
                    value={browseUf}
                    onChange={(e) => setBrowseUf(e.target.value)}
                    className="ossohub-input appearance-none"
                  >
                    <option value="">Todos os estados</option>
                    {BRAZIL_STATES.map((s) => <option key={s.uf} value={s.uf}>{s.uf} — {s.name}</option>)}
                  </select>
                  <input
                    value={browseSearch}
                    onChange={(e) => setBrowseSearch(e.target.value)}
                    placeholder="Nome da equipe ou hospital"
                    className="ossohub-input"
                  />
                  <Button size="sm" onClick={handleBrowse} disabled={browsing} className="w-full">
                    {browsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Buscar
                  </Button>
                </div>

                {browseResults.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    {browseResults.map((t) => {
                      const already = requestedTeamIds.has(t.id);
                      return (
                        <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2.5 mt-2">
                          <div className="min-w-0">
                            <p className="text-sm text-ossohub-navy font-medium truncate">{t.name}</p>
                            <p className="text-xs text-ossohub-slate flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{t.uf ?? "—"}{t.program_city ? ` · ${t.program_city}` : ""} · {t.preceptor_name}</span>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant={already ? "outline" : "default"}
                            disabled={already || requestingId === t.id}
                            onClick={() => handleRequestJoin(t.id)}
                            className="shrink-0"
                          >
                            {requestingId === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : already ? "Solicitado" : "Solicitar"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Minhas equipes como preceptor */}
            <div>
              <div className="flex items-center justify-between mb-4 px-0.5">
                <h2 className="text-sm font-semibold text-ossohub-navy tracking-tight">
                  {teams.length > 0 ? "Equipes que coordeno" : "Suas equipes"}
                </h2>
              </div>

              {teams.length === 0 ? (
                <div className="ossohub-card-premium flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ossohub-green/10 text-ossohub-green-dark">
                    <Users2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ossohub-navy">Você ainda não criou nenhuma equipe</p>
                    <p className="text-xs text-ossohub-slate mt-1 max-w-xs mx-auto">
                      Preencha o formulário acima para criar sua primeira equipe e começar a convidar residentes.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {teams.map((team) => {
                    const joinRequests = (team.members ?? []).filter((m) => m.status === "pending" && m.initiated_by === "resident");
                    const otherMembers = (team.members ?? []).filter((m) => !(m.status === "pending" && m.initiated_by === "resident"));
                    const activeCount = otherMembers.filter((m) => m.status === "active").length;

                    return (
                      <div key={team.id} className="ossohub-card-premium overflow-hidden">
                        {/* Cabeçalho da equipe */}
                        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/70 to-transparent">
                          <div className="min-w-0 flex items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ossohub-navy/5 text-ossohub-navy">
                              <Building2 className="h-4.5 w-4.5" />
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                                <h3 className="text-base font-bold text-ossohub-navy tracking-tight truncate">{team.name}</h3>
                                <span className="shrink-0 rounded-full border border-ossohub-green/20 bg-ossohub-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ossohub-green-dark">
                                  Preceptor
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5">
                                {(team.institution || team.uf) && (
                                  <p className="text-xs text-ossohub-slate flex items-center gap-1">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {team.institution}{team.uf ? ` · ${team.uf}` : ""}
                                  </p>
                                )}
                                <span className="text-xs text-ossohub-slate">
                                  {activeCount === 0 ? "Sem residentes ainda" : `${activeCount} residente${activeCount > 1 ? "s" : ""} ativo${activeCount > 1 ? "s" : ""}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteTeam(team.id)}
                            title="Excluir equipe"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="p-6 pt-5">
                          {/* Convidar residente */}
                          <FieldLabel>Convidar residente por CRM ou e-mail</FieldLabel>
                          <div className="flex flex-col sm:flex-row gap-2 mb-5">
                            <div className="relative flex-1">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                              <input
                                value={inviteInputs[team.id] ?? ""}
                                onChange={(e) => setInviteInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                                placeholder="Ex: 123456-SP ou nome@email.com"
                                className="ossohub-input pl-10"
                                onKeyDown={(e) => { if (e.key === "Enter") handleInvite(team.id); }}
                              />
                            </div>
                            <Button onClick={() => handleInvite(team.id)} disabled={invitingTeamId === team.id} className="shrink-0">
                              {invitingTeamId === team.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Convidar
                            </Button>
                          </div>

                          {/* Solicitações de entrada */}
                          {joinRequests.length > 0 && (
                            <div className="mb-5">
                              <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide mb-2">
                                Solicitações de entrada · {joinRequests.length}
                              </p>
                              <div className="space-y-1.5">
                                {joinRequests.map((m) => (
                                  <div key={m.id} className="flex items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <MemberAvatar name={m.resident?.full_name ?? "?"} photoUrl={m.resident?.photo_url} />
                                      <span className="text-sm text-ossohub-navy font-medium truncate">{m.resident?.full_name ?? m.resident_id}</span>
                                    </div>
                                    <div className="flex gap-1.5 shrink-0">
                                      <button
                                        onClick={() => handleApproveJoin(m.id, true)}
                                        disabled={respondingId === m.id}
                                        title="Aprovar"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50"
                                      >
                                        {respondingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                                      </button>
                                      <button
                                        onClick={() => handleApproveJoin(m.id, false)}
                                        disabled={respondingId === m.id}
                                        title="Recusar"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Lista de membros / estado vazio */}
                          {otherMembers.length > 0 ? (
                            <div>
                              <p className="text-[11px] font-semibold text-ossohub-slate uppercase tracking-wide mb-2">
                                Residentes
                              </p>
                              <div className="space-y-1.5">
                                {otherMembers.map((m) => (
                                  <div
                                    key={m.id}
                                    className="group flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2.5 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <MemberAvatar name={m.resident?.full_name ?? "?"} photoUrl={m.resident?.photo_url} />
                                      <span className="text-sm text-ossohub-navy font-medium truncate">{m.resident?.full_name ?? m.resident_id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className={`flex items-center gap-1.5 text-xs rounded-full border px-2.5 py-1 ${STATUS_STYLE[m.status]}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[m.status]}`} />
                                        {STATUS_LABEL[m.status]}
                                      </span>
                                      <button
                                        onClick={() => handleRemoveMember(m.id)}
                                        disabled={removingId === m.id}
                                        title="Remover"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
                                      >
                                        {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : joinRequests.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-8 px-4 text-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400">
                                <UserPlus className="h-5 w-5" />
                              </div>
                              <p className="text-sm font-medium text-ossohub-navy">Nenhum residente convidado ainda</p>
                              <p className="text-xs text-ossohub-slate max-w-xs">
                                Use o campo acima para convidar o primeiro residente pelo CRM ou e-mail.
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
