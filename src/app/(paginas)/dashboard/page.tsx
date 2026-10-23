"use client"
import styles from "../../../styles/dashboard.module.css"
import {FileText, ImageIcon, Server, Fuel, ArrowRight, ArrowUp, CircleCheck, CreditCard, Download, LucideIcon, PiggyBank, Plus, TrendingUp, Wallet, Utensils, Printer} from "lucide-react"
import CartaoFinanceiro from "../../../components/CartaoFinanceiro";
import Link from "next/link"
type TipoIndicador = "limite" | "gasto" | "saldo" | "cartoes";

function formatarMoeda(valor: number): string{
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}
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

type Cartao = {
    id: string,
    emUso: boolean;
    bandeira: "mastercard" | "visa";
    final: string;
    validade: string;
    responsavel: string;
    departamento: string;
    limite: number;
    gasto: number;
    retiradoPor?: string;

}

const cartoesCorporativos: Cartao[] = [
    {
        id: "cartão 4587",
        emUso: false,
        bandeira: "mastercard",
        final:"4587",
        validade: "12/28",
        responsavel: "Eduardo Amaral",
        departamento: "Compras",
        limite: 5000,
        gasto: 1250,
    },
    {
        id: "cartão 8912",
        emUso: true,
        bandeira: "visa",
        final:"8912",
        validade: "09/27",
        responsavel: "Mariana Costa",
        departamento: "Marketing",
        limite: 4000,
        gasto: 1620,
        retiradoPor: "João Silva"
    },
    {
        id: "cartão 3140",
        emUso: true,
        bandeira: "visa",
        final:"3140",
        validade: "04/29",
        responsavel: "Carlos Henrique",
        departamento: "TI",
        limite: 3500,
        gasto: 580,
        retiradoPor: "Felipe Souza"
    },
    {
        id: "cartão 7621",
        emUso: false,
        bandeira: "mastercard",
        final:"7621",
        validade: "01/30",
        responsavel: "Beatriz Mendes",
        departamento: "Diretora Operacional",
        limite: 2500,
        gasto: 0,
    },
]

type LancamentoFinanceiro = {
    id: string;
    data: string;
    estabelecimento: string;
    descricao: string;
    icone: LucideIcon;
    bandeira: "mastercard" | "visa";
    finalCartao: string;
    portador: string;
    centro: string;
    comprovante: string;
    tipoComprovante: "pdf" | "imagem";
    valor: number;
}

const lancamentosRecentes: LancamentoFinanceiro[] = [
    {
        id: "LNC-8921",
        data: "24/10/2024",
        estabelecimento: "Posto Ipiranga Rodoanel",
        descricao: "Combustível frota regional",
        icone: Fuel,
        bandeira: "mastercard",
        finalCartao: "4587",
        portador: "Eduardo Amaral",
        centro: "compras",
        comprovante: "NFCe_8921.pdf",
        tipoComprovante: "pdf",
        valor: 200,
    },
    {
        id: "LNC-8918",
        data: "23/10/2024",
        estabelecimento: "Restaurante Fogo Nativo",
        descricao: "Almoço executivo com parceiro de mídia",
        icone: Utensils,
        bandeira: "visa",
        finalCartao: "8912",
        portador: "João Silva",
        centro: "Marketing",
        comprovante: "Cupom_452.jpg",
        tipoComprovante: "imagem",
        valor: 412.5,
    },
    {
        id: "LNC-8910",
        data: "22/10/2024",
        estabelecimento: "Amazon Web Services BR",
        descricao: "Créditos de infraestrutura de desenvolvimento",
        icone: Server,
        bandeira: "visa",
        finalCartao: "3140",
        portador: "Felipe Souza",
        centro: "TI",
        comprovante: "AWS_lnv_10.pdf",
        tipoComprovante: "pdf",
        valor: 580,
    },
    {
        id: "LNC-8902",
        data: "21/10/2024",
        estabelecimento: "Kalunga Papelaria Corp",
        descricao: "Suprimentos de escritório e impressão de crachás",
        icone: Printer,
        bandeira: "mastercard",
        finalCartao: "4587",
        portador: "Eduardo Amaral",
        centro: "compras",
        comprovante: "DANFE_0029.pdf",
        tipoComprovante: "pdf",
        valor: 970,
    }
]

export default function Dashboard(){

    const cartoesEmUso = cartoesCorporativos.filter((cartao)=> cartao.emUso).length
    const cartoesDisponiveis = cartoesCorporativos.length - cartoesEmUso

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

            <section className={styles.cartoes}>

                <div className={styles.cabecalhoCartoes}>
                    <h2>Cartões corporativos <span className={styles.quantidadeCartoes}> {cartoesCorporativos.length} Ativos</span></h2>
                    <p className={styles.uso}> <span className={styles.legendaDisponiveis}> {cartoesDisponiveis}   Disponiveis</span> <span className={styles.legendaEmUso}>{cartoesEmUso} Em uso</span></p>
                </div>
                <div className={styles.listaCartoes}>
                    {cartoesCorporativos.map((cartao)=>(
                        <CartaoFinanceiro key={cartao.id} cartao={cartao}/>
                    ))}
                </div>
            </section>

            <section className={styles.tabelaLançamentos}>

                    <header className={styles.cabecalhoTabela}>
                        <span className={styles.iconeLancamentos}><CircleCheck size={16}/></span>

                        <div className={styles.informacoesTabela}>
                            <h2>Ultimos Lançamentos aprovados</h2>
                            <p>Despesas validadas pela controladoria com comprovantes anexos</p>
                        </div>

                        <Link href="/lancamentos" className={styles.linkTodosLancamentos}>Acessar todos os lançamentos <ArrowRight size={13}/></Link>
                    </header>

                    <div className={styles.areaRolagemTabela}>

                        <div className={styles.conteudoTabela} role="table">

                            <div className={`${styles.linhaTabela} ${styles.cabecalhoColunas}`} role="row">
                                <span>Data / ID</span>
                                <span>Estabelecimento & descrição</span>
                                <span>Cartão utilizado</span>
                                <span>Portador / centro</span>
                                <span>Comprovante fiscal</span>
                                <span className={styles.alinhamentoDireita}>Valor total</span>
                            </div>
                            {lancamentosRecentes.map((lancamento) =>{
                                const IconeEstabelecimento = lancamento.icone;
                                const IconeComprovante = lancamento.tipoComprovante === "pdf" ? FileText : ImageIcon;

                                return(
                                    <div key={lancamento.id} className={styles.linhaTabela} role="row">
                                        <span><strong>{lancamento.data}</strong> <small>#{lancamento.id}</small></span>
                                         
                                        <span className={styles.estabelecimentoLancamento}>
                                            <span className={styles.iconeEstabelecimento}> <IconeEstabelecimento size={14}/></span>
                                            <span><strong>{lancamento.estabelecimento}</strong> <small>{lancamento.descricao}</small></span>
                                        </span>

                                        <span className={styles.cartaoLancamento}><i className={lancamento.bandeira === "visa" ? styles.indicadorCartaoVisa : styles.indicadorCartaoMastercard}/>{lancamento.bandeira === "visa" ? "Visa" : "Mastercard"}{"••••"} {lancamento.finalCartao}</span>

                                        <span> <strong>{lancamento.portador}</strong> <small>{lancamento.centro}</small></span>
                                        
                                        <span><a href="#" className={styles.linkComprovante} onClick={(evento) => evento.preventDefault()}> <IconeComprovante size={11}/> {lancamento.comprovante}</a></span>

                                        <span className={`${styles.alinhamentoDireita} ${styles.valorLancamento}`}>{formatarMoeda(lancamento.valor)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <footer className={styles.rodapeTabela}>
                        <span className={styles.statusAuditoria}>Auditoria automática concluída sem pendências de conformidade fiscal.</span>
                        <span>Ultima sincronização: há 4 minutos</span>
                    </footer>
            </section>
        </div>
    )
}