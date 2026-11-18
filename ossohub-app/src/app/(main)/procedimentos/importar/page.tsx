import type { Metadata } from "next";
import Link from "next/link";
import { ImportarClient } from "./ImportarClient";

export const metadata: Metadata = { title: "Importar figuras — Procedimentos Cirúrgicos", robots: { index: false } };

export default function ImportarFiguras() {
  return (
    <div className="px-1 sm:px-2 lg:px-6 py-5 sm:py-8 max-w-2xl">
      <header className="mb-4">
        <Link href="/procedimentos" className="oh-eyebrow">Procedimentos Cirúrgicos</Link>
        <h1 className="mt-2 text-3xl font-bold text-white">Importar pacote de figuras</h1>
        <p className="mt-1 text-[14px] leading-relaxed text-[#A3B1C6]">
          Envia de uma vez um pacote de imagens para as etapas dos procedimentos. As figuras do livro entram como
          “só administradores” — visitantes não as veem.
        </p>
      </header>
      <ImportarClient />
    </div>
  );
}
