import { Sidebar } from "@/components/Sidebar";
import { ClinicalToolFrame } from "@/components/ClinicalToolFrame";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {children}
        {/* Iframe da ferramenta clínica: fica sempre montado (só escondido
            fora de /tools/*) para preservar o login automático ao trocar
            de ferramenta ou navegar para outras páginas e voltar. */}
        <ClinicalToolFrame />
      </div>
    </div>
  );
}
