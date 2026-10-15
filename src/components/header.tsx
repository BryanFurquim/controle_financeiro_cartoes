
import { Building2 } from "lucide-react";
import styles from "../styles/header.module.css";

export default function Header() {
  return (

    <header className={styles.header}>
      <div className={styles.empresa}>
        <Building2 size={22} />
        <div className={styles.nomeEmpresa}>
          <span className={styles.label}>Unidade / Empresa</span>
          <strong>Matriz São Paulo</strong>
        </div>
      </div>

      <div className={styles.usuario}>
        <div className={styles.perfil}>EA</div>

        <div className={styles.userInfo}>
          <strong>Eduardo Amaral</strong>
          <span className={styles.setor}>Compras</span>
        </div>

        <span className={styles.UserType}>Administrador</span>
      </div>
    </header>
  );
}
