"use client";

import { useState } from "react";

// Imagem de postagem resistente a falhas: carrega sob demanda, não envia o
// endereço do OssoHub para sites externos (alguns bloqueiam "hotlink") e, se
// mesmo assim a imagem não abrir, mostra um aviso discreto em vez do ícone
// de imagem quebrada.
export function PostImage({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div
        className={`flex items-center justify-center text-xs text-slate-400 bg-slate-800/40 ${className}`}
        style={{ minHeight: 120 }}
        role="img"
        aria-label="Imagem indisponível"
      >
        Imagem indisponível
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFalhou(true)}
    />
  );
}
