"use client";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import {LayoutDashboard,CreditCard,ScrollText,Shapes,Users,LogOut,Settings2, ChevronDown} from "lucide-react";

import styles from "../styles/sidebar.module.css";
import {  useState } from "react";

const menu = [
  { 
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Lançamentos",
    href: "/lancamentos",
    icon: ScrollText,
  },
];

const menuAdministracao = [
  {
    label:"Cartões",
    href: "/cartoes",
    icon: CreditCard,
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
  {
    label: "Categorias de gastos",
    href: "/categorias",
    icon: Shapes,
  }
]

export default function Sidebar() {
  const pathname = usePathname();

  const rotaAdministracao = menuAdministracao.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))

  const [adminAberta, setAdminAberta] = useState<boolean |  null>(null);

  const submenuVisivel = adminAberta ?? rotaAdministracao

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Image src="/logo.png"alt="Logo Controle Gastos"width={173}height={47}/>
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

              <button type="button" onClick={() => setAdminAberta((aberta) => !(aberta ?? rotaAdministracao))}className={`${styles.menuItem} ${styles.adminToggle} ${rotaAdministracao ? styles.selecionado : ""}`}>
                <Settings2 size={16}/>
                <span>Administração</span>
                <ChevronDown size={16} className={`${styles.setaAdmin} ${submenuVisivel ? styles.setaAberta: ""}`}/>

              </button>

                {submenuVisivel && (
                  <div className={styles.submenu}>
                {menuAdministracao.map((item) =>{
                  const Icon = item.icon;
                  const itemSelecionado = pathname === item.href || pathname.startsWith(`${item.href}/`)

                  return(
                    <Link key={item.href} href={item.href} className={`${styles.submenuItem} ${itemSelecionado ? styles.submenuSelecionado : ""}`}>
                      <Icon size={15}/>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                
                </div>
                )}
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
