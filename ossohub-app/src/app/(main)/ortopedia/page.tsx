import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";

export const metadata: Metadata = { title: "Ortopedia Adulto" };

export default function OrtopediaHub() {
  return (
    <HubPage
      sectionId="ortopedia"
      intro="Classificações, vias de acesso, exame físico, calculadoras, algoritmos, material de estudo e anatomia 3D — tudo da ortopedia do adulto reunido aqui."
    />
  );
}
