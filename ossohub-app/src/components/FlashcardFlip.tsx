"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

// Card de flashcard com animação de "virar" (flip 3D): mostra a
// pergunta na frente e, ao clicar/tocar ou pressionar Enter/Espaço,
// gira em Y revelando a resposta no verso. Usa transform inline em
// vez de classes utilitárias para as propriedades 3D (perspective,
// transform-style, backface-visibility) para garantir suporte
// consistente independente da configuração do Tailwind.
export function FlashcardFlip({
  front,
  back,
  areaLabel,
  className,
}: {
  front: string;
  back: string;
  areaLabel?: string;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((f) => !f);
  }

  return (
    <div
      className={`relative h-56 select-none ${className ?? ""}`}
      style={{ perspective: "1200px" }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? "Flashcard mostrando a resposta — toque para ver a pergunta" : "Flashcard mostrando a pergunta — toque para ver a resposta"}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="relative h-full w-full cursor-pointer outline-none"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente — pergunta */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl border border-ossohub-green/30 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ossohub-green-dark">
              Pergunta
            </span>
            {areaLabel && (
              <span className="text-[10px] rounded-full bg-ossohub-green-light px-2 py-0.5 text-ossohub-green-dark font-medium truncate max-w-[55%]">
                {areaLabel}
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto whitespace-pre-line text-sm text-ossohub-navy leading-relaxed">
            {front}
          </div>
          <span className="mt-2 flex items-center justify-center gap-1 text-[10px] text-ossohub-slate">
            <RotateCcw className="h-3 w-3" /> Toque para ver a resposta
          </span>
        </div>

        {/* Verso — resposta */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl border border-ossohub-green-dark bg-ossohub-green-dark/5 p-4 shadow-sm hover:shadow-md transition-shadow"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ossohub-green-dark mb-2">
            Resposta
          </span>
          <div className="flex-1 overflow-y-auto whitespace-pre-line text-sm text-ossohub-navy leading-relaxed">
            {back}
          </div>
          <span className="mt-2 flex items-center justify-center gap-1 text-[10px] text-ossohub-slate">
            <RotateCcw className="h-3 w-3" /> Toque para voltar
          </span>
        </div>
      </div>
    </div>
  );
}
