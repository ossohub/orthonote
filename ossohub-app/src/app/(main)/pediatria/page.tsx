import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";

export const metadata: Metadata = { title: "Pediatria" };

export default function PediatriaHub() {
  return (
    <HubPage
      sectionId="pediatria"
      intro="Prescrição pediátrica por peso, ferramentas, classificações e conteúdo de ortopedia pediátrica — tudo da criança num só lugar."
      aviso="Ferramenta de apoio. Confira sempre doses, contraindicações e faixa etária antes de prescrever; a decisão final é do médico responsável."
    />
  );
}
