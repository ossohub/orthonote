import { createClient } from "@/lib/supabase/client";
import { CLASSIFICATION_FLASHCARD_SOURCE } from "@/lib/classificationFlashcardSource";
import type { Flashcard, FlashcardInsert } from "@/lib/types";

// ============================================================
// Flashcards — helpers
// ============================================================
// A geração automática a partir do Banco de Questões roda inteiramente
// no banco (função SECURITY DEFINER generate_flashcards_from_questions),
// no mesmo padrão de start_question_test: o cliente nunca lê
// correct_option/explanation diretamente, então o flashcard gerado só
// existe depois que o servidor já validou e gravou o conteúdo.
//
// Já a geração a partir do banco de Classificações usa uma fonte
// estática do front-end (CLASSIFICATION_FLASHCARD_SOURCE, extraída da
// ferramenta clínica) — não há informação sensível ali, então a
// inserção acontece com um INSERT comum, protegido pela RLS normal
// (author_id = auth.uid()).

export async function listMyFlashcards(userId: string): Promise<Flashcard[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Flashcard[];
}

// Agrupa uma lista de flashcards por área de estudo — usado tanto em
// "Meus Flashcards" quanto no feed "Explorar", para manter a
// organização por área em qualquer listagem do módulo.
export function groupFlashcardsByArea(cards: Flashcard[]): Map<string, Flashcard[]> {
  const map = new Map<string, Flashcard[]>();
  for (const card of cards) {
    const list = map.get(card.area) ?? [];
    list.push(card);
    map.set(card.area, list);
  }
  return map;
}

export async function createFlashcard(input: {
  authorId: string;
  area: string;
  front: string;
  back: string;
  isPublic: boolean;
}): Promise<Flashcard> {
  const supabase = createClient();
  const payload: FlashcardInsert = {
    author_id: input.authorId,
    area: input.area,
    front: input.front,
    back: input.back,
    origin: "manual",
    is_public: input.isPublic,
  };
  const { data, error } = await supabase.from("flashcards").insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  return data as Flashcard;
}

export async function updateFlashcard(
  id: string,
  changes: Partial<Pick<Flashcard, "area" | "front" | "back" | "is_public">>
): Promise<Flashcard> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("flashcards")
    .update(changes)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Flashcard;
}

export async function deleteFlashcard(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("flashcards").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Gera flashcards a partir do Banco de Questões — a lógica (sorteio +
// leitura da resposta certa) roda no servidor; aqui só chamamos a RPC.
export async function generateFlashcardsFromQuestions(area: string | null, count: number): Promise<Flashcard[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("generate_flashcards_from_questions", {
    p_area: area,
    p_count: count,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as Flashcard[];
}

// Gera flashcards a partir do banco de Classificações (fonte estática,
// já categorizada por área) — sorteia `count` entradas (opcionalmente
// filtradas por área) e insere como flashcards privados do usuário.
export async function generateFlashcardsFromClassifications(
  authorId: string,
  area: string | null,
  count: number
): Promise<Flashcard[]> {
  const pool = area
    ? CLASSIFICATION_FLASHCARD_SOURCE.filter((c) => c.area === area)
    : CLASSIFICATION_FLASHCARD_SOURCE;

  if (pool.length === 0) {
    throw new Error("Ainda não há classificações cadastradas para essa área");
  }

  // Sorteio simples (Fisher-Yates parcial) sem repetição.
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0 && i >= shuffled.length - count; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picked = shuffled.slice(Math.max(0, shuffled.length - count));

  const supabase = createClient();
  const payload: FlashcardInsert[] = picked.map((c) => ({
    author_id: authorId,
    area: c.area,
    front: c.front,
    back: c.back,
    source: "Banco de Classificações",
    origin: "auto_classification",
    is_public: false,
  }));

  const { data, error } = await supabase.from("flashcards").insert(payload).select("*");
  if (error) throw new Error(error.message);
  return (data ?? []) as Flashcard[];
}

// Feed público "Explorar" — flashcards marcados como públicos por
// qualquer usuário, mais recentes primeiro, filtrável por área.
export async function listPublicFlashcards(area: string | null, limit = 60): Promise<Flashcard[]> {
  const supabase = createClient();
  let query = supabase
    .from("flashcards")
    .select("*, author:profiles(id, full_name, photo_url)")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (area) query = query.eq("area", area);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Flashcard[];
}

// "Importar" um flashcard público de outra pessoa para o próprio
// deck — cria uma cópia privada em nome do usuário atual.
export async function importFlashcard(authorId: string, card: Flashcard): Promise<Flashcard> {
  const supabase = createClient();
  const payload: FlashcardInsert = {
    author_id: authorId,
    area: card.area,
    front: card.front,
    back: card.back,
    source: card.source ?? undefined,
    origin: card.origin,
    is_public: false,
  };
  const { data, error } = await supabase.from("flashcards").insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  return data as Flashcard;
}
