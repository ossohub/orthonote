import { createClient } from "@/lib/supabase/client";
import type { QuestionOption, QuestionTestItem } from "@/lib/types";

// ============================================================
// Banco de Questões — helpers
// ============================================================
// Toda a lógica que afeta placar/ranking roda em funções SECURITY
// DEFINER no banco (start_question_test / answer_question_item /
// finish_question_test), no mesmo padrão de award_self_xp: o
// cliente nunca escreve diretamente em question_tests,
// question_test_items ou question_stats, então não dá pra forjar
// acertos chamando a API direto. A resposta certa (correct_option)
// e o comentário (explanation) de cada questão também não podem
// ser lidos via select direto — só voltam no retorno de
// answer_question_item(), e só depois que a questão foi respondida.

export async function startQuestionTest(area: string | null, numQuestions: number): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("start_question_test", {
    p_area: area,
    p_num_questions: numQuestions,
  });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function answerQuestionItem(itemId: string, selected: QuestionOption) {
  const supabase = createClient();
  const { data, error } = await supabase
    .rpc("answer_question_item", { p_item_id: itemId, p_selected: selected })
    .single();
  if (error) throw new Error(error.message);
  return data as { is_correct: boolean; correct_option: QuestionOption; explanation: string | null };
}

export async function finishQuestionTest(testId: string) {
  const supabase = createClient();
  const { error } = await supabase.rpc("finish_question_test", { p_test_id: testId });
  if (error) throw new Error(error.message);
}

export async function getTestItems(testId: string): Promise<QuestionTestItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("question_test_items")
    .select(
      "id, test_id, question_id, order_index, selected_option, is_correct, answered_at, question:questions(id, author_id, area, source, statement, image_url, option_a, option_b, option_c, option_d, option_e, is_active, times_answered, times_correct, created_at, updated_at)"
    )
    .eq("test_id", testId)
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as QuestionTestItem[];
}
