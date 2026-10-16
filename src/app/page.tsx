"use client";
import {useRouter} from "next/navigation";
import { useState } from "react";
import {Landmark, Mail, LockKeyhole, Eye, EyeOff, LogIn, ShieldCheck,
} from "lucide-react";

import styles from "../styles/page.module.css";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarAcesso, setLembrarAcesso] = useState(false);
  const router = useRouter();

  function entrar(){
    router.push('/dashboard')
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <div className={styles.logo}>
            <Landmark size={25} />
          </div>

          <span className={styles.titulo}>
            <span className={styles.greenDot} />
            PORTAL CORPORATIVO
          </span>

          <h1>Sistema de Controle de Gastos</h1>
          <p>Acesso restrito a colaboradores autorizados</p>
        </header>

        <form className={styles.formulario} onSubmit={(abrir) =>{
              abrir.preventDefault();
              entrar()
            }}>
            <div className={styles.tituloInput}>
              <label htmlFor="email">E-mail Corporativo</label>
            </div>

            <div className={styles.input} >
              <Mail size={20} />
              <input id="email" type="email" placeholder="exemplo@empresa.com.br"autoComplete="username"required
              />
            </div>

            <div className={styles.tituloInput}>
              <label htmlFor="senha">Credencial / Senha</label>
            </div>

            <div className={styles.input}>
              <LockKeyhole size={22} />
              <input id="senha" type={mostrarSenha ? "text" : "password"} placeholder="••••••••••" required/>

              <button type="button" className={styles.password} onClick={() => setMostrarSenha(!mostrarSenha)} aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                {mostrarSenha ? (<EyeOff size={16} />) : (<Eye size={16} />)}
              </button>
            </div>

          <label className={styles.salvarAcesso}>
            <input type="checkbox" checked={lembrarAcesso} onChange={(acesso) => setLembrarAcesso(acesso.target.checked)}/>
            Lembrar acesso neste computador
          </label>

          <button type="submit" className={styles.btnEntrar}>
            <LogIn size={16} />
          </button>
        </form>

        <button type="button" className={styles.recuperarSenha}>
          Esqueceu sua senha? Contate o Administrador
        </button>

        <footer className={styles.protocolo}>
          <ShieldCheck size={15} />
          <span>Protocolo TLS 1.3 Criptografado</span>
        </footer>
      </section>

      <p className={styles.footer}> Ambiente Corporativo Seguro • Gestão Interna de Despesas • Versão 2.4.0 </p>
    </main>
  );
}
