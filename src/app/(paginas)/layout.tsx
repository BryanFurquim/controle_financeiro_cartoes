import Header from "../../components/header"
import Sidebar from "../../components/sidebar"
import type { Metadata } from "next";
import styles from "../../styles/paginas.module.css";

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
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.areaPrincipal}>
        <Header />
        <main className={styles.conteudo}>
          {children}
        </main>
      </div>
    </div>
    
     
   
  );
}
