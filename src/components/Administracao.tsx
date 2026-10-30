
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreditCard, Shapes, UsersRound} from "lucide-react";
import styles from "../styles/cartoes.module.css";

type AdministracaoProps = {
  children: ReactNode;
};

export default function Administracao({children}: AdministracaoProps) {

  const pathname = usePathname();
  const paginaAtual = pathname === "/cartoes" ? "Cartões" : pathname === "/categorias" ? "Categoria de gastos" : "Usuários do sistema"

  return (
    <div className={styles.pagina}>

      <header className={styles.topoPagina}>

        <div className={styles.introducao}>

          <div className={styles.pgAtual}>
            <span>CONTROLE INTERNO</span>
            <span className={styles.separador}>/</span>
            <span>ADMINISTRAÇÃO</span>
            <span className={styles.separador}>/</span>
            <span>{paginaAtual.toUpperCase()}</span>

          </div>

          <h1>Painel de Administração</h1>
          <p>
            Gerenciamento de cartões corporativos,
            categorias de despesas e usuários autorizados
          </p>

        </div>

        <div className={styles.statusHeader}>
          <div className={styles.infoAuditoria}>
            <span className={styles.auditoria}><span className={styles.pontoVerde}></span>Auditoria Ativa</span>
            <span className={styles.sincronizacao}> Última sincronização: <strong> Hoje 14:51</strong></span>
          </div>
        </div>
      </header>

      <nav className={styles.abas}>

        <Link href="/cartoes" className={`${styles.aba} ${pathname === "/cartoes" ? styles.abaAtiva : ""}`}>
          <CreditCard size={15} />
          <span>Cartões</span> <span className={styles.contador}>4</span>
        </Link>

        <Link href="/categorias" className={`${styles.aba} ${pathname === "/categorias" ?styles.abaAtiva : ""}`}>
          <Shapes size={15} /><span>Categoria de gastos</span><span className={styles.contador}>5</span>
        </Link>

        <Link href="/usuarios" className={`${styles.aba} ${pathname === "/usuarios" ? styles.abaAtiva : ""}`}>
          <UsersRound size={15} /> <span>Usuários do sistema</span> <span className={styles.contador}>8</span>
        </Link>

      </nav>

      <main>
        {children}
      </main>

    </div>
  );
}
