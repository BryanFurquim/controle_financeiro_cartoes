import Header from "../../components/header"
import Sidebar from "../../components/sidebar"
import type { Metadata } from "next";
import "../globals.css";

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
      <body>
        <Header></Header>
        <Sidebar></Sidebar>
      {children}
        
      </body>
    </html>
  );
}
