import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body className={`${inter.variable} font-sans antialiased bg-ossohub-bg-light`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "Inter, system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
