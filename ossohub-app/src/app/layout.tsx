import type { Metadata, Viewport } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";

// Fontes servidas pelo próprio site (sem pedir ao Google na hora de abrir):
// Inter = texto, Archivo = títulos, JetBrains Mono = rótulos/números.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050A14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "OssoHub — Rede Profissional de Ortopedistas",
    template: "%s | OssoHub",
  },
  description:
    "A rede social profissional para ortopedistas brasileiros. Compartilhe casos clínicos, artigos e experiências com colegas de todo o Brasil.",
  keywords: ["ortopedia", "ortopedista", "casos clínicos", "medicina", "brasil"],
  authors: [{ name: "OssoHub" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ossohub.com",
    siteName: "OssoHub",
    title: "OssoHub — Rede Profissional de Ortopedistas",
    description:
      "A rede social profissional para ortopedistas brasileiros.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${archivo.variable} ${mono.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
