"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Compass, Download, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlashcardFlip } from "@/components/FlashcardFlip";
import { useUser } from "@/hooks/useUser";
import { listPublicFlashcards, importFlashcard } from "@/lib/flashcards";
import { QUESTION_AREAS } from "@/lib/types";
import type { Flashcard } from "@/lib/types";

export default function ExplorarFlashcardsPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [area, setArea] = useState<string>("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [importingId, setImportingId] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listPublicFlashcards(area || null);
      setCards(data);
    } catch {
      toast.error("Erro ao carregar o feed público");
    } finally {
      setLoading(false);
    }
  }, [area]);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  async function handleImport(card: Flashcard) {
    if (!user) return;
    setImportingId(card.id);
    try {
      await importFlashcard(user.id, card);
      toast.success("Flashcard importado para o seu perfil (como privado)!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao importar flashcard");
    } finally {
      setImportingId(null);
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
        <Link href="/flashcards"
          className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar aos meus Flashcards
        </Link>

        <div className="flex items-center gap-2 mb-1">
          <Compass className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Explorar Flashcards</h1>
        </div>
        <p className="text-sm text-ossohub-slate mb-6">
          Flashcards que a comunidade tornou públicos. Importe para o seu perfil para estudar com os seus.
        </p>

        <div className="ossohub-card p-4 mb-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setArea("")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              area === "" ? "border-ossohub-green bg-ossohub-green text-white" : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green"
            }`}
          >
            Todas as áreas
          </button>
          {QUESTION_AREAS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                area === a ? "border-ossohub-green bg-ossohub-green text-white" : "border-slate-300 bg-white text-slate-600 hover:border-ossohub-green"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="ossohub-card p-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-ossohub-green" />
          </div>
        ) : cards.length === 0 ? (
          <div className="ossohub-card p-8 text-center">
            <Compass className="h-8 w-8 text-ossohub-green mx-auto mb-2" />
            <p className="text-sm text-ossohub-navy font-medium">Nenhum flashcard público ainda{area ? ` em ${area}` : ""}</p>
            <p className="text-xs text-ossohub-slate mt-1">Seja o primeiro a compartilhar um flashcard dessa área.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id}>
                <FlashcardFlip front={card.front} back={card.back} areaLabel={card.area} />
                <div className="flex items-center justify-between mt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ossohub-slate truncate max-w-[60%]">
                    <UserRound className="h-3.5 w-3.5 shrink-0" />
                    {card.author?.full_name ?? "Usuário OssoHub"}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={importingId === card.id}
                    onClick={() => handleImport(card)}
                  >
                    {importingId === card.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    Importar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
