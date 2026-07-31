"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2, Layers, Plus, Compass, Sparkles, Trash2, Globe2, Lock, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlashcardFlip } from "@/components/FlashcardFlip";
import { useUser } from "@/hooks/useUser";
import {
  listMyFlashcards, groupFlashcardsByArea, deleteFlashcard, updateFlashcard,
  generateFlashcardsFromQuestions, generateFlashcardsFromClassifications,
} from "@/lib/flashcards";
import { QUESTION_AREAS } from "@/lib/types";
import type { Flashcard } from "@/lib/types";

const COUNT_OPTIONS = [5, 10, 15, 20];

export default function FlashcardsHubPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);

  const [genSource, setGenSource] = useState<"questions" | "classifications">("questions");
  const [genArea, setGenArea] = useState<string>("");
  const [genCount, setGenCount] = useState<number>(10);
  const [generating, setGenerating] = useState(false);

  const [openAreas, setOpenAreas] = useState<Set<string>>(new Set());

  const loadCards = useCallback(async () => {
    if (!user) return;
    setLoadingCards(true);
    try {
      const data = await listMyFlashcards(user.id);
      setCards(data);
    } catch {
      toast.error("Erro ao carregar seus flashcards");
    } finally {
      setLoadingCards(false);
    }
  }, [user]);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const grouped = useMemo(() => groupFlashcardsByArea(cards), [cards]);
  const orderedAreas = useMemo(() => {
    const known = QUESTION_AREAS.filter((a) => grouped.has(a));
    const extra = [...grouped.keys()].filter((a) => !(QUESTION_AREAS as readonly string[]).includes(a));
    return [...known, ...extra];
  }, [grouped]);

  function toggleArea(area: string) {
    setOpenAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) next.delete(area);
      else next.add(area);
      return next;
    });
  }

  async function handleGenerate() {
    if (!user) return;
    setGenerating(true);
    try {
      const created =
        genSource === "questions"
          ? await generateFlashcardsFromQuestions(genArea || null, genCount)
          : await generateFlashcardsFromClassifications(user.id, genArea || null, genCount);

      toast.success(`${created.length} flashcard${created.length === 1 ? "" : "s"} gerado${created.length === 1 ? "" : "s"} e salvo${created.length === 1 ? "" : "s"} no seu perfil!`);
      setOpenAreas((prev) => {
        const next = new Set(prev);
        created.forEach((c) => next.add(c.area));
        return next;
      });
      await loadCards();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao gerar flashcards");
    } finally {
      setGenerating(false);
    }
  }

  async function handleTogglePublic(card: Flashcard) {
    try {
      const updated = await updateFlashcard(card.id, { is_public: !card.is_public });
      setCards((prev) => prev.map((c) => (c.id === card.id ? updated : c)));
      toast.success(updated.is_public ? "Flashcard agora é público (aparece no Explorar)" : "Flashcard agora é privado");
    } catch {
      toast.error("Erro ao atualizar visibilidade");
    }
  }

  async function handleDelete(card: Flashcard) {
    if (!confirm("Apagar este flashcard? Essa ação não pode ser desfeita.")) return;
    try {
      await deleteFlashcard(card.id);
      setCards((prev) => prev.filter((c) => c.id !== card.id));
      toast.success("Flashcard apagado");
    } catch {
      toast.error("Erro ao apagar flashcard");
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-ossohub-green" />
            <h1 className="text-2xl font-bold text-ossohub-navy">Flashcards</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/flashcards/explorar"><Compass className="h-4 w-4" /> Explorar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/flashcards/new"><Plus className="h-4 w-4" /> Criar flashcard</Link>
            </Button>
          </div>
        </div>

        {/* Gerar automaticamente */}
        <div className="ossohub-card p-5 mb-5">
          <p className="text-sm font-semibold text-ossohub-navy mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ossohub-green" /> Gerar flashcards automaticamente
          </p>
          <p className="text-xs text-ossohub-slate mb-4">
            Sorteia conteúdo já existente no site e salva os flashcards direto no seu perfil, categorizados por área.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-ossohub-slate mb-1">Fonte</label>
              <select
                value={genSource}
                onChange={(e) => setGenSource(e.target.value as "questions" | "classifications")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
              >
                <option value="questions">Banco de Questões</option>
                <option value="classifications">Banco de Classificações</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ossohub-slate mb-1">Área / Tema</label>
              <select
                value={genArea}
                onChange={(e) => setGenArea(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
              >
                <option value="">Todas as áreas</option>
                {QUESTION_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ossohub-slate mb-1">Quantidade</label>
              <select
                value={genCount}
                onChange={(e) => setGenCount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green-dark focus:ring-4 focus:ring-ossohub-green/10 transition"
              >
                {COUNT_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n} flashcards</option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={generating} size="lg" className="w-full">
            {generating ? (<><Loader2 className="h-4 w-4 animate-spin" /> Gerando...</>) : (<><Sparkles className="h-4 w-4" /> Gerar e salvar no meu perfil</>)}
          </Button>
        </div>

        {/* Meus flashcards, organizados por área */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-ossohub-navy">Meus Flashcards</p>
          <p className="text-xs text-ossohub-slate">{cards.length} no total</p>
        </div>

        {loadingCards ? (
          <div className="ossohub-card p-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-ossohub-green" />
          </div>
        ) : cards.length === 0 ? (
          <div className="ossohub-card p-8 text-center">
            <Layers className="h-8 w-8 text-ossohub-green mx-auto mb-2" />
            <p className="text-sm text-ossohub-navy font-medium">Você ainda não tem flashcards</p>
            <p className="text-xs text-ossohub-slate mt-1">Crie o seu primeiro ou gere alguns automaticamente acima.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderedAreas.map((area) => {
              const areaCards = grouped.get(area) ?? [];
              const isOpen = openAreas.has(area);
              return (
                <div key={area} className="ossohub-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleArea(area)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left"
                  >
                    <span className="text-sm font-semibold text-ossohub-navy">{area}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs rounded-full bg-ossohub-green-light px-2.5 py-0.5 text-ossohub-green-dark font-medium">
                        {areaCards.length}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-ossohub-slate transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      {areaCards.map((card) => (
                        <div key={card.id}>
                          <FlashcardFlip front={card.front} back={card.back} />
                          <div className="flex items-center justify-between mt-2">
                            <button
                              type="button"
                              onClick={() => handleTogglePublic(card)}
                              className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                                card.is_public ? "text-ossohub-green-dark" : "text-ossohub-slate hover:text-ossohub-navy"
                              }`}
                            >
                              {card.is_public ? <Globe2 className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                              {card.is_public ? "Público" : "Privado"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(card)}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Apagar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
