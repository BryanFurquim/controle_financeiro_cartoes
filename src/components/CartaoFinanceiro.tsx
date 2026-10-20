
import styles from "../styles/cartaoFinanceiro.module.css";
import {Nfc, User, Building, ChevronRight} from "lucide-react";

type CartaoFinanceiroProps = {
  cartao: {
    id: string;
    emUso: boolean;
    bandeira: "mastercard" | "visa";
    final: string;
    validade: string;
    responsavel: string;
    departamento: string;
    limite: number;
    gasto: number;
    retiradoPor?: string;
  };
};

export default function CartaoFinanceiro({cartao}: CartaoFinanceiroProps) {
  const saldoDisponivel = cartao.limite - cartao.gasto;

  const valorEmReais = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <article className={styles.cartao}>

    <header className={styles.cabecalhoCartao}>
        <img src={`/bandeiras/${cartao.bandeira}.png`} className={styles.bandeira}/>

        <span className={`${styles.status} ${ cartao.emUso ? styles.statusEmUso: styles.statusDisponivel}`}>

        <span className={styles.pontoStatus}/>{cartao.emUso ? "Em uso" : "Disponível"}</span>
    </header>

      <div className={`${styles.frenteCartao} ${cartao.final === "8912" ? styles.cartaoGrafite : styles.cartaoAzul}`}>

        <div className={styles.topoFrenteCartao}>
          <span className={styles.simboloCartao}><Nfc className={styles.nfc}/></span>
          <span className={styles.identificacaoCartao}>CORPORATE</span>
        </div>

        <div className={styles.numeroCartao}>
          •••• {cartao.final}
        </div>

        <div className={styles.rodapeFrenteCartao}>
          <span>{cartao.responsavel.toUpperCase()}</span>
          <div className={styles.designCard}><span>{cartao.validade}</span></div>
        </div>  

      </div>

      <div className={styles.informacoesCartao}>

        <div className={styles.dadosResponsavel}>
          <span className={styles.rotulo}>Responsável</span>
          <strong>{cartao.responsavel}</strong>
          <span className={styles.departamento}> <Building className={styles.iconeDepartamento} size={12}/> {cartao.departamento}</span>
        </div>

        {cartao.retiradoPor && (<p className={styles.informacaoRetirada}><span><User size={10}/></span>
            Retirado por {cartao.retiradoPor}
          </p>
        )}

        <div className={styles.resumoFinanceiro}>

          <div className={styles.linhaFinanceira}>
            <span>Limite mensal</span>
            <strong>{valorEmReais(cartao.limite)}</strong>
          </div>

          <div className={styles.linhaFinanceira}>
            <span>Total gasto</span>
            <strong className={styles.valorGasto}>{valorEmReais(cartao.gasto)}
            </strong>
          </div>

          <div className={styles.linhaFinanceira}>
            <span>Disponível</span>
            <strong className={styles.valorDisponivel}>
              {valorEmReais(saldoDisponivel)}
            </strong>
          </div>
        </div>

        <button type="button" className={styles.botaoDetalhes}>Ver detalhes <ChevronRight size={14}/></button>
      </div>
    </article>
  );
}
