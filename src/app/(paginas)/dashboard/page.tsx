import styles from "../../../styles/dashboard.module.css"
import {ArrowUp, CircleCheck, CreditCard, Download, LucideIcon, LucidePiggyBank, PiggyBank, PiggyBankIcon, Plus, TrendingUp, Wallet} from "lucide-react"

type TipoIndicador = "limite" | "gasto" | "saldo" | "cartoes";

type IndicadorFinanceiro = {
    titulo: string;
    valor: string;
    totalCartoes?: string;
    icone: LucideIcon;
    tipo: TipoIndicador;
    etiquetas?: string;
    etiquetaIcon?: LucideIcon;
    infoDireita?: string;
    infoEsquerda?: string;
    percentual: number;
}

const indicadores: IndicadorFinanceiro[] = [
    {
        titulo: "LIMITE TOTAL",
        valor: "R$ 15.000,00",
        icone: Wallet,
        tipo: "limite",
        infoDireita: "100%",
        infoEsquerda: "Plafound Global Ativo",
        percentual: 100
    },
    {
        titulo: "TOTAL GASTO",
        valor: "R$ 3.450,00",
        icone: TrendingUp,
        tipo: "gasto",
        etiquetas: "23% utilizado",
        etiquetaIcon: ArrowUp,
        infoDireita: "Limite: 85% alerta",
        percentual:23,
    },
    {
        titulo: "SALDO DISPONÍVEL",
        valor: "R$ 11.550,00",
        icone: PiggyBank,
        tipo: "saldo",
        etiquetas: "77% livre",
        etiquetaIcon: CircleCheck,
        infoDireita: "Seguro para compras",
        percentual:77,
    },
    {
        titulo: "CARTÕES EM USO",
        valor: "2",
        totalCartoes: "/ 4 cadastrados",
        icone: CreditCard,
        tipo: "cartoes",
        etiquetas: " • 2  Alocados com portador",
        infoDireita: "50%¨frota",
        percentual: 50,
    }
]
export default function Dashboard(){
    return(
        
        <div className={styles.dashboard}>           
            <section className={styles.cabecalho}>
                <div>
                    <p className={styles.info}>
                        <span className={styles.consolidado}>CONSOLIDADO FINANCEIRO</span>
                        <span className={styles.dot}>•</span>
                        <span> Ciclo vigente: Outubro 2024</span>
                    </p>
                    <h1 className={styles.titulo} >Visão Geral dos Gastos</h1>
                    <p className={styles.subtitulo}>Monitoramento em tempo real dos corporativos e orçamentos aprovados</p>
                </div>
            
                <div className={styles.acoes}>
                    <button type="button" className={styles.exportar}> <Download size={14}/> Exportar relatorio</button>
                    <button type="button" className={styles.lancamento}> <Plus size={14}/>Novo lançamento </button>
               </div>
        </section>
        <section className={styles.indicadores}>
            {indicadores.map((indicador) =>{
                const Icone = indicador.icone;
                const IconeEtiqueta = indicador.etiquetaIcon;

                const classesIndicadores = {
                    limite: styles.indicadorLimite,
                    gasto: styles.indicadorGasto,
                    saldo: styles.indicadorSaldo,
                    cartoes: styles.indicadorCartoes,
                }[indicador.tipo]
                
                return(
                <article key={indicador.titulo} className={`${styles.indicador} ${classesIndicadores}`}>

                    <header className={styles.cabecalhoIndicador}>
                        <span>{indicador.titulo}</span>
                        <span className={styles.iconeIndicador}><Icone size={15}/></span>
                    </header>

                    <p className={styles.valorIndicador}>{indicador.valor}<small>{indicador.totalCartoes}</small></p>

                    <div className={styles.rodapeIndicador}>
                        {indicador.etiquetas ? (
                        <span className={styles.etiquetaIndicador}>
                            {IconeEtiqueta && <IconeEtiqueta size={10} />}{indicador.etiquetas}
                        </span>) : (<span>{indicador.infoEsquerda}</span>)}
                        <span>{indicador.infoDireita}</span>
                    </div>

                    <div className={styles.barraProgresso}>
                        <span style={{width: `${indicador.percentual}%`}}/>
                    </div>
                </article>
                )
            })}
           
            
        </section>
        </div>
        
    )
}