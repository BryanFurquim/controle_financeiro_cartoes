"use client";

import Image from "next/image"
import { CreditCard, Wallet, Plus, Pencil, Ban, ShieldCheck} from "lucide-react"
import Administracao from "../../../components/Administracao"
import styles from "../../../styles/cartoes.module.css";

type Cartao = {
  id: number;
  final: string;
  bandeira: "Mastercard" | "Visa" ;
  responsavel: string;
  departamento: string;
  limite: number;
  saldo:number;
  status: "Disponível" | "Em uso";
  bloqueado: boolean;
}
const cartoes: Cartao[] = [
  {
    id: 1,
    final: "4587",
    bandeira: "Mastercard",
    responsavel: "Eduardo Amaral",
    departamento: "Compras",
    limite: 5000,
    saldo: 3750,
    status: "Disponível",
    bloqueado: false,
  },
  {
    id: 2,
    final: "8912",
    bandeira: "Visa",
    responsavel: "Mariana Costa",
    departamento: "Marketing",
    limite: 4000,
    saldo: 2380,
    status: "Em uso",
    bloqueado: false,
  },
  {
    id: 3,
    final: "3140",
    bandeira: "Visa",
    responsavel: "Carlos Henrique",
    departamento: "TI ",
    limite: 3500,
    saldo: 2920,
    status: "Em uso",
    bloqueado: false,
  },
  {
    id: 4,
    final: "7621",
    bandeira: "Mastercard",
    responsavel: "Beatriz Mendes",
    departamento: "Diretoria",
    limite: 2500,
    saldo: 2500,
    status: "Disponível",
    bloqueado: false,
  },
];

function moeda(valor: number): string{
  return valor.toLocaleString
  ("pt-BR", {style: "currency", currency: "BRL"})
}

export default function Cartoes(){
  const totalCartoes = cartoes.length;
  const totalLimites = cartoes.reduce((total,cartao) => total + cartao.limite,0)
  return(
    <Administracao>
    

      <section className={styles.painel}>
        <div className={styles.cabecalhoPainel}>
          <div className={styles.tituloPainel}>
            <div className={styles.iconeTitulo}>
              <Wallet size={19}/>
            </div>

            <div>
              <h2>Cartões Corporativos Emitidos</h2>
              <p>Controle de limites operacionais e responsabilidade fiduciária</p>
            </div>
          </div>
          <button type="button" className={styles.botaoNovoCard}>
            <Plus/> Novo cartão
          </button>
        </div>

        <div className={styles.tabelaCartoes}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>CARTÃO</th>
                <th>BANDEIRA</th>
                <th>RESPONSÁVEL</th>
                <th>DEPARTAMENTO</th>
                <th>LIMITE MENSAL</th>
                <th>SALDO ATUAL</th>
                <th>STATUS</th>
                <th className={styles.colunaAcoes}>AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              {cartoes.map((cartao) => (
                <tr key={cartao.id}>

                  <td>
                    <div className={styles.identificacaoCartao}>
                      <CreditCard className={styles.iconeCartaoLinha} size={14}/> <span className={styles.marcadoresCartao}>••••</span> <strong>{cartao.final}</strong>
                    </div>
                  </td>

                 <td>
                    <Image src={cartao.bandeira === "Visa" ? "/bandeiras/visa.png" : "/bandeiras/master.png"} alt={cartao.bandeira} width={55} height={35} className={cartao.bandeira === "Visa" ? styles.Visa : styles.Master}/>
                </td>

                  <td>
                    <span className={styles.responsavel}>{cartao.responsavel}</span>
                  </td>

                  <td>
                    <span className={styles.departamento}>{cartao.departamento}</span>
                  </td>

                  <td className={styles.valor}>
                    {moeda(cartao.limite)}
                  </td>

                  <td>
                    <strong className={styles.saldoValor}>{moeda(cartao.saldo)}</strong>
                  </td>

                  <td>
                    <span className={`${styles.status} ${cartao.bloqueado ? styles.statusBloqueado: cartao.status === "Disponível" ? styles.statusDisponivel : styles.statusEmUso}`}>
                      <span className={styles.pontoStatus}/> {cartao.bloqueado ? "Bloqueado" : cartao.status}
                    </span>
                    
                  </td>

                  <td>

                    <div className={styles.acoes}>

                      <button className={`${styles.botaoAcao} ${styles.editar}`}>
                        <Pencil size={14}/>
                      </button>

                      <button className={`${styles.botaoAcao} ${styles.bloquear}`}>
                        <Ban size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className={styles.rodapePainel}>
          <div className={styles.resumo}>
              <span>Total cadastrados: <strong> {totalCartoes} cartões </strong></span>
              <span className={styles.pontoResumoo}>•</span>
              <span>Teto mensal global: <strong className={styles.totalGlobal}> {moeda(totalLimites)}</strong></span>
          </div>
          <div className={styles.conformidade}>
            <ShieldCheck size={12}/> <span>Políticas de conformidade PCI-DSS aplicadas</span>
          </div>
        </footer>
      </section>
    </Administracao>
  )
}
