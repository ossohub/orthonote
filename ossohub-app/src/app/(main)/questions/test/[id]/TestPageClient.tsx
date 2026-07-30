"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { answerQuestionItem, finishQuestionTest } from "@/lib/questions";
import type { QuestionTest, QuestionTestItem, QuestionOption } from "@/lib/types";

interface Feedback {
  is_correct: boolean;
  correct_option: QuestionOption;
  explanation: string | null;
}

interface Props {
  test: QuestionTest;
  initialItems: QuestionTestItem[];
}

export function TestPageClient({ test, initialItems }: Props) {
  const router = useRouter();
  const [items] = useState(initialItems);

  const firstUnanswered = items.findIndex((it) => !it.selected_option);
  const [currentIndex, setCurrentIndex] = useState(
    firstUnanswered === -1 ? Math.max(items.length - 1, 0) : firstUnanswered
  );
  const [selected, setSelected] = useState<QuestionOption | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [correctCount, setCorrectCount] = useState(test.correct_count);
  const [wrongCount, setWrongCount] = useState(test.wrong_count);
  const [finished, setFinished] = useState(firstUnanswered === -1 && items.length > 0);

  const total = items.length;
  const currentItem = items[currentIndex];

  async function handleAnswer(option: QuestionOption) {
    if (feedback || submitting || !currentItem) return;
    setSelected(option);
    setSubmitting(true);
    try {
      const result = await answerQuestionItem(currentItem.id, option);
      setFeedback(result);
      if (result.is_correct) setCorrectCount((c) => c + 1);
      else setWrongCount((c) => c + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao responder a questão");
      setSelected(null);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleNext() {
    if (currentIndex + 1 >= total) {
      await finishQuestionTest(test.id).catch(() => {});
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected(null);
    setFeedback(null);
  }

  if (total === 0) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center px-4">
        <div className="ossohub-card p-8 text-center max-w-sm">
          <p className="text-sm text-ossohub-slate mb-4">Este teste não tem questões.</p>
          <Button asChild><Link href="/questions">Voltar ao Banco de Questões</Link></Button>
        </div>
      </div>
    );
  }

  if (finished) {
    const totalAnswered = correctCount + wrongCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center px-4 py-10">
        <div className="ossohub-card p-8 max-w-md w-full text-center">
          <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-ossohub-navy mb-1">Teste concluído!</h1>
          <p className="text-sm text-ossohub-slate mb-6">
            {test.area ? `Área: ${test.area}` : "Todas as áreas"} · {total} questões
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div>
              <p className="text-2xl font-bold text-emerald-600">{correctCount}</p>
              <p className="text-xs text-ossohub-slate">Acertos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{wrongCount}</p>
              <p className="text-xs text-ossohub-slate">Erros</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ossohub-navy">{accuracy}%</p>
              <p className="text-xs text-ossohub-slate">Aproveitamento</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => router.push("/questions")}>
              <RotateCcw className="h-4 w-4" /> Novo teste
            </Button>
            <Button variant="outline" asChild>
              <Link href="/questions/ranking"><Trophy className="h-4 w-4" /> Ver ranking</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = currentItem.question!;
  const options: { letter: QuestionOption; text: string }[] = [
    { letter: "A", text: question.option_a },
    { letter: "B", text: question.option_b },
    { letter: "C", text: question.option_c },
    { letter: "D", text: question.option_d },
    { letter: "E", text: question.option_e },
  ];

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/questions"
            className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy transition-colors">
            <ArrowLeft className="h-4 w-4" /> Sair do teste
          </Link>
          <span className="text-sm font-medium text-ossohub-slate">
            Questão {currentIndex + 1} de {total}
          </span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-slate-200 mb-6 overflow-hidden">
          <div className="h-full bg-ossohub-green transition-all" style={{ width: `${(currentIndex / total) * 100}%` }} />
        </div>

        <div className="ossohub-card p-6 mb-5">
          <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 mb-3">
            {question.area}
          </span>
          {question.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={question.image_url} alt="Figura da questão" className="max-h-72 w-auto rounded-xl border border-slate-200 mb-4" />
          )}
          <p className="text-sm text-ossohub-navy leading-relaxed whitespace-pre-wrap">{question.statement}</p>
        </div>

        <div className="space-y-2.5 mb-5">
          {options.map(({ letter, text }) => {
            const isSelected = selected === letter;
            const isCorrectAnswer = !!feedback && feedback.correct_option === letter;
            const isWrongSelected = !!feedback && isSelected && !feedback.is_correct;

            let style = "border-slate-300 bg-white hover:border-ossohub-green";
            if (feedback) {
              if (isCorrectAnswer) style = "border-emerald-500 bg-emerald-50";
              else if (isWrongSelected) style = "border-red-500 bg-red-50";
              else style = "border-slate-200 bg-white opacity-60";
            } else if (isSelected) {
              style = "border-ossohub-green bg-ossohub-green/5";
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={!!feedback || submitting}
                onClick={() => handleAnswer(letter)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left text-sm transition-colors ${style}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-400 text-xs font-bold text-ossohub-navy">
                  {letter}
                </span>
                <span className="flex-1 text-ossohub-navy">{text}</span>
                {isCorrectAnswer && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                {isWrongSelected && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`ossohub-card p-5 mb-5 border-l-4 ${feedback.is_correct ? "border-l-emerald-500" : "border-l-red-500"}`}>
            <p className={`text-sm font-semibold mb-1 ${feedback.is_correct ? "text-emerald-600" : "text-red-500"}`}>
              {feedback.is_correct ? "Você acertou!" : `Você errou. Resposta certa: ${feedback.correct_option}`}
            </p>
            {feedback.explanation && (
              <p className="text-sm text-ossohub-slate whitespace-pre-wrap">{feedback.explanation}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {submitting && <Loader2 className="h-5 w-5 animate-spin text-ossohub-green" />}
          {feedback && (
            <Button onClick={handleNext} size="lg">
              {currentIndex + 1 >= total ? "Ver resultado" : "Próxima questão"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
