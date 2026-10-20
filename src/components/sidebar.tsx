"use client";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import {LayoutDashboard,CreditCard,ScrollText,Shapes,Users,LogOut} from "lucide-react";

import styles from "../styles/sidebar.module.css";

const menu = [
  { 
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Cartões",
    href: "/cartoes",
    icon: CreditCard,
  },
  {
    label: "Lançamentos",
    href: "/lancamentos",
    icon: ScrollText,
  },
  {
    label: "Categorias",
    href: "/categorias",
    icon: Shapes,
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Image src="/logo.png"alt="Logo Controle Gastos"width={180}height={47}/>
                </div>
            </div>

      <nav className={styles.navigation}>
        {menu.map((item) => {
          const Icon = item.icon;
          const itemSelecionado = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className={`${styles.menuItem} ${itemSelecionado ? styles.selecionado : ""}`}>
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={styles.footer}>
        <Link href="/" className={styles.sair}>
        <LogOut size={18} />
        <span>Sair</span>
        </Link>
     </div>
    </aside>
  );
}
