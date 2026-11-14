import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";

export const metadata: Metadata = { title: "Estudos & Desempenho" };

export default function EstudosHub() {
  return (
    <HubPage
      sectionId="estudos"
      intro="Banco de questões, flashcards, cronograma, gráficos de desempenho, análise preditiva e salas de estudo em grupo."
    />
  );
}
