import { Sidebar } from "@/components/Sidebar";
import { ClinicalToolFrame } from "@/components/ClinicalToolFrame";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ossohub-shell (max-w-[1600px] mx-auto) alinha esta linha com o
    // conteúdo do Navbar — em telas largas o app inteiro (sidebar +
    // conteúdo) fica centralizado, em vez da sidebar grudada na borda
    // esquerda enquanto o resto do vão fica todo sobrando à direita.
    <div className="ossohub-shell flex">
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
