import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center rounded-xl bg-ossohub-navy px-4 py-3 opacity-40">
            <img src="/logo.png" alt="OssoHub" className="h-10 w-auto" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-ossohub-navy mb-2">404</h1>
        <p className="text-ossohub-slate mb-6">Página não encontrada</p>
        <Button asChild>
          <Link href="/feed">Voltar ao feed</Link>
        </Button>
      </div>
    </div>
  );
}
