"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users2, Plus, Trash2, Check, X, Mail, Search, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import {
  createTeam, listMyTeamsAsPreceptor, listMyMemberships,
  inviteResidentToTeam, respondTeamInvite, removeTeamMember, deleteTeam,
  listResidencyPrograms, browseTeamsToJoin, requestToJoinTeam, approveJoinRequest,
  type TeamDirectoryEntry,
} from "@/lib/teams";
import { BRAZIL_STATES, type Team, type TeamMember, type TeamMemberStatus, type ResidencyProgram } from "@/lib/types";

const STATUS_LABEL: Record<TeamMemberStatus, string> = {
  pending: "Pendente",
  active: "Ativo",
  declined: "Recusado",
};

const STATUS_STYLE: Record<TeamMemberStatus, string> = {
  pending: "bg-amber-50 border-amber-200 text-amber-600",
  active: "bg-emerald-50 border-emerald-200 text-emerald-600",
  declined: "bg-slate-50 border-slate-200 text-slate-400",
};

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

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Users2 className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Minha Equipe</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-14"><Loader2 className="h-6 w-6 animate-spin text-ossohub-green" /></div>
        ) : (
          <>
            {/* Convites recebidos do preceptor */}
            {receivedInvites.length > 0 && (
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-3">Convites recebidos</p>
                <div className="space-y-2">
                  {receivedInvites.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate">
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
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-3">Minhas solicitações pendentes</p>
                <div className="space-y-2">
                  {myPendingRequests.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate">Aguardando aprovação de {m.team?.preceptor?.full_name}</p>
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
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-3">Equipes que participo</p>
                <div className="space-y-2">
                  {myActiveTeams.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate">Preceptor: {m.team?.preceptor?.full_name}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}>
                        {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Sair da equipe"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buscar equipe existente por estado/nome e pedir entrada */}
            <div className="ossohub-card p-5 mb-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-ossohub-green" /> Encontrar minha equipe de residência
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] gap-2 mb-3">
                <select value={browseUf} onChange={(e) => setBrowseUf(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green">
                  <option value="">Todos os estados</option>
                  {BRAZIL_STATES.map((s) => <option key={s.uf} value={s.uf}>{s.uf} — {s.name}</option>)}
                </select>
                <input value={browseSearch} onChange={(e) => setBrowseSearch(e.target.value)}
                  placeholder="Nome da equipe/hospital"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green" />
                <Button size="sm" onClick={handleBrowse} disabled={browsing}>
                  {browsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Buscar
                </Button>
              </div>

              {browseResults.length > 0 && (
                <div className="space-y-1.5">
                  {browseResults.map((t) => {
                    const already = requestedTeamIds.has(t.id);
                    return (
                      <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                        <div className="min-w-0">
                          <p className="text-sm text-ossohub-navy font-medium truncate">{t.name}</p>
                          <p className="text-xs text-ossohub-slate flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {t.uf ?? "—"}{t.program_city ? ` · ${t.program_city}` : ""} · Preceptor: {t.preceptor_name}
                          </p>
                        </div>
                        <Button size="sm" variant={already ? "outline" : "default"} disabled={already || requestingId === t.id}
                          onClick={() => handleRequestJoin(t.id)}>
                          {requestingId === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : already ? "Já solicitado" : "Solicitar entrada"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Criar equipe (preceptor) */}
            <div className="ossohub-card p-5 mb-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-ossohub-green" /> Criar equipe (programa de residência)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Ex: Residência de Ortopedia — Hospital X"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
                <input value={newTeamInstitution} onChange={(e) => setNewTeamInstitution(e.target.value)}
                  placeholder="Instituição (opcional)"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <select value={newTeamUf} onChange={(e) => { setNewTeamUf(e.target.value); setNewTeamProgramId(""); }}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green">
                  <option value="">Estado (opcional)</option>
                  {BRAZIL_STATES.map((s) => <option key={s.uf} value={s.uf}>{s.uf} — {s.name}</option>)}
                </select>
                <select value={newTeamProgramId} onChange={(e) => setNewTeamProgramId(e.target.value)}
                  disabled={!newTeamUf || programsForUf.length === 0}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green disabled:opacity-50">
                  <option value="">
                    {!newTeamUf ? "Selecione o estado primeiro" : programsForUf.length === 0 ? "Nenhum programa cadastrado — use o nome livre acima" : "Programa (opcional)"}
                  </option>
                  {programsForUf.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {p.city}</option>
                  ))}
                </select>
              </div>
              <Button size="sm" onClick={handleCreateTeam} disabled={creatingTeam}>
                {creatingTeam ? <><Loader2 className="h-4 w-4 animate-spin" /> Criando...</> : <><Plus className="h-4 w-4" /> Criar equipe</>}
              </Button>
            </div>

            {/* Minhas equipes como preceptor */}
            {teams.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
                Você ainda não criou nenhuma equipe.
              </div>
            ) : (
              <div className="space-y-4">
                {teams.map((team) => {
                  const joinRequests = (team.members ?? []).filter((m) => m.status === "pending" && m.initiated_by === "resident");
                  const otherMembers = (team.members ?? []).filter((m) => !(m.status === "pending" && m.initiated_by === "resident"));
                  return (
                    <div key={team.id} className="ossohub-card p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-ossohub-navy">{team.name}</p>
                          {(team.institution || team.uf) && (
                            <p className="text-xs text-ossohub-slate">{team.institution}{team.uf ? ` · ${team.uf}` : ""}</p>
                          )}
                        </div>
                        <button onClick={() => handleDeleteTeam(team.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <input
                          value={inviteInputs[team.id] ?? ""}
                          onChange={(e) => setInviteInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                          placeholder="CRM ou e-mail do residente"
                          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
                        />
                        <Button size="sm" onClick={() => handleInvite(team.id)} disabled={invitingTeamId === team.id}>
                          {invitingTeamId === team.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Convidar
                        </Button>
                      </div>

                      {joinRequests.length > 0 && (
                        <div className="mb-3 space-y-1.5">
                          <p className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Solicitações de entrada</p>
                          {joinRequests.map((m) => (
                            <div key={m.id} className="flex items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                              <span className="text-sm text-ossohub-navy">{m.resident?.full_name ?? m.resident_id}</span>
                              <div className="flex gap-1.5">
                                <Button size="sm" onClick={() => handleApproveJoin(m.id, true)} disabled={respondingId === m.id}>
                                  {respondingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleApproveJoin(m.id, false)} disabled={respondingId === m.id}>
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {otherMembers.length > 0 ? (
                        <div className="space-y-1.5">
                          {otherMembers.map((m) => (
                            <div key={m.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                              <span className="text-sm text-ossohub-navy">{m.resident?.full_name ?? m.resident_id}</span>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs rounded-full border px-2 py-0.5 ${STATUS_STYLE[m.status]}`}>
                                  {STATUS_LABEL[m.status]}
                                </span>
                                <button onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}
                                  className="text-slate-300 hover:text-red-500 transition-colors p-1">
                                  {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : joinRequests.length === 0 ? (
                        <p className="text-xs text-ossohub-slate">Nenhum residente convidado ainda.</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
