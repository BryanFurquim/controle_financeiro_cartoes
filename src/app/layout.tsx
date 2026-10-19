import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta =  Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta"
});

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Sistema de controle financeiro de cartões corporativos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
    <body className={`${jakarta.className} ${jakarta.variable}`}>
        {children}
        
      </body>
    </html>
  );
}
