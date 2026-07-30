"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CalendarClock, Plus, Trash2, MapPin, Users2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import {
  listMySchedule, listSchedule, createScheduleEntry, deleteScheduleEntry,
} from "@/lib/schedule";
import { listMyActiveResidents } from "@/lib/teams";
import type { ScheduleEntry, TeamMember } from "@/lib/types";

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

function formatTimeRange(startsAt: string, endsAt: string) {
  const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  return `${new Date(startsAt).toLocaleTimeString("pt-BR", opts)} – ${new Date(endsAt).toLocaleTimeString("pt-BR", opts)}`;
}

export default function CronogramaPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [residents, setResidents] = useState<TeamMember[]>([]);
  const [selectedResidentId, setSelectedResidentId] = useState<string>(""); // "" = eu mesmo
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [notes, setNotes] = useState("");

  const readOnly = selectedResidentId !== "";

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const loadEntries = useCallback(async (residentId: string) => {
    setLoadingEntries(true);
    try {
      const data = residentId ? await listSchedule(residentId) : await listMySchedule();
      setEntries(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar o cronograma");
    } finally {
      setLoadingEntries(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadEntries(selectedResidentId);
  }, [user, selectedResidentId, loadEntries]);

  useEffect(() => {
    if (!user) return;
    listMyActiveResidents().then(setResidents).catch(() => {});
  }, [user]);

  async function handleCreate() {
    if (!title.trim() || !startsAt || !endsAt) {
      toast.error("Preencha título, início e fim");
      return;
    }
    if (new Date(endsAt) <= new Date(startsAt)) {
      toast.error("O horário final deve ser depois do inicial");
      return;
    }
    setSaving(true);
    try {
      await createScheduleEntry({
        title: title.trim(),
        location: location.trim() || null,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: new Date(endsAt).toISOString(),
        notes: notes.trim() || null,
      });
      toast.success("Adicionado ao cronograma");
      setTitle(""); setLocation(""); setStartsAt(""); setEndsAt(""); setNotes("");
      loadEntries(selectedResidentId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteScheduleEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover");
    } finally {
      setDeletingId(null);
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  // Agrupa por dia (YYYY-MM-DD local)
  const groups = new Map<string, ScheduleEntry[]>();
  for (const e of entries) {
    const key = new Date(e.starts_at).toDateString();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(e);
  }
  const sortedKeys = Array.from(groups.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-ossohub-green" />
            <h1 className="text-2xl font-bold text-ossohub-navy">Cronograma</h1>
          </div>
        </div>

        {residents.length > 0 && (
          <div className="ossohub-card p-4 mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-ossohub-navy mb-1.5">
              <Users2 className="h-4 w-4 text-ossohub-green" /> Visualizar cronograma de
            </label>
            <select
              value={selectedResidentId}
              onChange={(e) => setSelectedResidentId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
            >
              <option value="">Meu próprio cronograma</option>
              {residents.map((m) => (
                <option key={m.id} value={m.resident_id}>
                  {m.resident?.full_name ?? m.resident_id} — {m.team?.name}
                </option>
              ))}
            </select>
            {readOnly && (
              <p className="text-xs text-ossohub-slate mt-1.5">
                Somente leitura — o cronograma é cadastrado pelo próprio residente.
              </p>
            )}
          </div>
        )}

        {!readOnly && (
          <div className="ossohub-card p-5 mb-5">
            <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4 text-ossohub-green" /> Adicionar ao meu cronograma
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-ossohub-slate mb-1">Título / rodízio</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Ambulatório de Joelho, Plantão Trauma..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-1 text-xs font-medium text-ossohub-slate mb-1">
                  <MapPin className="h-3.5 w-3.5" /> Local / setor (opcional)
                </label>
                <input value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Hospital X — Bloco Cirúrgico"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ossohub-slate mb-1">Início</label>
                <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ossohub-slate mb-1">Fim</label>
                <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-ossohub-slate mb-1">Observações (opcional)</label>
                <input value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: cobrindo Dr. Fulano"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition" />
              </div>
            </div>
            <Button onClick={handleCreate} disabled={saving} size="sm">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</> : <><Plus className="h-4 w-4" /> Adicionar</>}
            </Button>
          </div>
        )}

        {loadingEntries ? (
          <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-ossohub-green" /></div>
        ) : entries.length === 0 ? (
          <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
            Nenhum compromisso cadastrado ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedKeys.map((key) => (
              <div key={key} className="ossohub-card p-4">
                <p className="text-sm font-semibold text-ossohub-navy mb-2 capitalize">{formatDay(groups.get(key)![0].starts_at)}</p>
                <div className="space-y-2">
                  {groups.get(key)!.map((entry) => (
                    <div key={entry.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{entry.title}</p>
                        <p className="text-xs text-ossohub-slate">{formatTimeRange(entry.starts_at, entry.ends_at)}</p>
                        {entry.location && (
                          <p className="text-xs text-ossohub-slate flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" /> {entry.location}
                          </p>
                        )}
                        {entry.notes && <p className="text-xs text-slate-400 mt-0.5">{entry.notes}</p>}
                      </div>
                      {!readOnly && (
                        <button onClick={() => handleDelete(entry.id)} disabled={deletingId === entry.id}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1">
                          {deletingId === entry.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
