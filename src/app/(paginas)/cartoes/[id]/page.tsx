import { notFound } from "next/navigation";
import Link from "next/link";
import { Utensils, Fuel, Printer, BedDouble, Pencil, Trash2, FileText, ChevronLeft, LayoutDashboard, ChevronRight, ShieldCheck, CalendarDays, CreditCard, Wallet, Download, ArrowRightLeft, CirclePlus, Filter, TextSearch, CircleCheck, CalendarSync, User} from "lucide-react";
import { cartoes } from "../../../../types/cartoes";
import Card from "../../../../components/card";
import styles from "../../../../styles/detalhesCartao.module.css";
import { lancamentos } from "../../../../types/lancamento";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default async function DetalhesCartao({ params }: PageProps) {
  const { id } = await params;

  const cartao = cartoes.find((item) => item.id === id);

  if (!cartao) {
    notFound();
  }

  const saldoDisponivel = cartao.limite - cartao.gasto;
  const percentualUtilizado =cartao.limite > 0 ? (cartao.gasto / cartao.limite) * 100 : 0;
  const percentualLivre = 100 - percentualUtilizado;

  const totalLancamentos = lancamentos.reduce(
    (total, lancamento) => total + lancamento.valor,
    0,
  );

  return (

    <main className={styles.paginaCartao}>
      <div className={styles.flexTopo}>

        <nav className={styles.caminho}>
          <Link href="/dashboard"><LayoutDashboard size={13} /> Dashboard</Link><ChevronRight size={13} />
          <Link href="/cartoes"><CreditCard size={13} /> Cartões</Link><ChevronRight size={13} />
          <span className={styles.flexCaminho}><CreditCard className={styles.iconeAzul} size={13} />{cartao.bandeira === "mastercard" ? "Mastercard" : "Visa"} •••• { "  "}{cartao.final}
          </span>
        </nav>

        <div className={styles.acoesTopo}>

          <button className={styles.botao}>
            <Download size={13} />
            Exportar extrato
          </button>
          <button className={styles.botao}>
            <ArrowRightLeft size={13} />
            Registrar retirada
          </button>
          <button className={styles.botaoLancamento}>
            <CirclePlus size={13} />
            Novo lançamento
          </button>

        </div>
      </div>

      <section className={styles.resumoCartao}>

        <div className={styles.colunaCartao}>
          <Card cartao={cartao} />
        </div>

        <div className={styles.colunaConteudo}>
          <div className={styles.cabecalhoResumo}>
            <div>

              <div className={styles.tituloLinha}>
                <h1>{cartao.bandeira === "mastercard" ? "Mastercard Corporativo " : "Visa Corporativo "}• • • • {cartao.final}</h1>

                <span className={`${styles.Disponivel} ${cartao.emUso ? styles.EmUso : ""}`}><span className={styles.ponto} />{cartao.emUso ? "Em uso" : "Disponível na Tesouraria"}</span>
              </div>

              <div className={styles.infoCartao}>
                <span><User size={13} /> Responsável: <strong>{cartao.responsavel} ({cartao.departamento})</strong></span>
                <span> <CalendarDays size={13} /> Ciclo Atual: <strong>01/10 a 31/10/2026</strong></span>
              </div>

            </div>

            <div className={styles.custodia}>
              <ShieldCheck size={15} />
              Custódia Verificada
            </div>

          </div>

          <div className={styles.indicadores}>
            <div className={styles.indicador}>

              <div className={styles.indicadorTopo}>
                <span>LIMITE MENSAL</span>
                <div className={styles.iconeCaixa}>
                  <CreditCard size={13} />
                </div>
              </div>

              <strong>{formatarMoeda(cartao.limite)}{" "}</strong>
              <small> <CalendarSync size={10}/> Renova em 01/11/2026</small>
            </div>

            <div className={styles.indicadorGasto}>

              <div className={styles.indicadorTopo}>
                <span>TOTAL UTILIZADO</span>
                <div className={styles.iconeCaixa}>
                  <Wallet size={13} />
                </div>
              </div>
              <strong className={styles.azul}>{formatarMoeda(cartao.gasto)}</strong>
              <div className={styles.infoCartao}>
                <small className={styles.flexAzul}>{(percentualUtilizado.toFixed(1))}% do limite comprometido <span className={styles.azul}>{lancamentos.length} lançamentos</span></small>
              </div>

            </div>

            <div className={styles.indicadorDisponivel}>

              <div className={styles.indicadorTopo}>
                <span>SALDO DISPONÍVEL</span>
                <span className={styles.porcentagemLivre}>{percentualLivre.toFixed(1)}% livre</span>
              </div>
              <strong>{formatarMoeda(saldoDisponivel)}</strong>
              <small> <CircleCheck className={styles.check} size={10}/> Liberado para novas requisições</small>
            </div>
          </div>

          <div className={styles.consumo}>
            <div className={styles.textoConsumo}>
              <span>Consumo operacional do limite aprovado</span>
              <div>
                <strong>{percentualUtilizado.toFixed(1)}%</strong>
                <small>({formatarMoeda(cartao.gasto)} de{" "}{formatarMoeda(cartao.limite)})</small>
              </div>
            </div>

            <div className={styles.barra}>
              <div className={styles.preenchimento} style={{width: `${percentualUtilizado.toFixed(1)}%`}}/>
            </div>
          </div>

        </div>

      </section>

      <section className={styles.historicoCartao}>

        <div className={styles.cabecalhoHistorico}>

          <div className={styles.tituloHistorico}>
            <div className={styles.iconeHistorico}>
              <TextSearch size={13} />
            </div>
            <h2>Histórico de Lançamentos do Cartão</h2>
            <span className={styles.contadorLancamentos}>{lancamentos.length} lançamentos</span>
          </div>

          <div className={styles.statusAuditoria}>
            <span />
            Filtros sincronizados com auditoria
          </div>

        </div>

        <div className={styles.hr} />

        <div className={styles.filtrosHistorico}>
          <label className={styles.campoFiltro}>
            <span>Data inicial</span>
            <input type="date" defaultValue="2026-10-01" />
          </label>

          <label className={styles.campoFiltro}>
            <span>Data final</span>
            <input type="date" defaultValue="2026-10-31" />
          </label>

          <label className={styles.campoFiltro}>
            <span>Categoria</span>
            <select>
              <option >Todas as categorias</option>
              <option>Alimentação</option>
              <option>Combustível</option>
              <option>Material de escritório</option>
              <option>Hospedagem</option>
            </select>
          </label>

          <label className={styles.campoFiltro}>
            <span>Responsável / Solicitante</span>
            <select>
              <option >Todos os colaboradores</option>
              <option >Eduardo Amaral</option>
              <option >Mariana Costa</option>
              <option >Carlos Henrique</option>
              <option >Beatriz Mendes</option>
            </select>
          </label>

          <div className={styles.acoesFiltro}>
            <button type="button" className={styles.botaoFiltrar}>
              <Filter size={11} /> Filtrar
            </button>
            <button type="button" className={styles.botaoLimpar}>
              Limpar
            </button>
          </div>

        </div>

      </section>

      <section className={styles.tabelaCartao}>

        <div className={styles.tabelaScroll}>

          <table className={styles.tabelaLancamentos}>

            <thead>
              <tr>
                <th>DATA COMPRA</th>
                <th>DESCRIÇÃO & ESTABELECIMENTO</th>
                <th>CATEGORIA</th>
                <th>VALOR (BRL)</th>
                <th>SOLICITADO POR</th>
                <th>LANÇADO POR / DATA</th>
                <th>COMPROVANTE FISCAL</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((lancamento) => (
                <tr key={lancamento.id}>

                  <td className={styles.dataCompra}>{lancamento.data}</td>
                  <td>
                    <div className={styles.descricaoLancamento}>
                      <div className={`${styles.iconeCategoria} ${styles[lancamento.tipo]}`}>
                        {lancamento.tipo === "alimentacao" && (<Utensils size={12} />)}
                        {lancamento.tipo === "combustivel" && (<Fuel size={12} />)}
                        {lancamento.tipo === "material" && (<Printer size={12} />)}
                        {lancamento.tipo === "hospedagem" && (<BedDouble size={12} />)}
                      </div>

                      <div>
                        <strong>{lancamento.descricao}</strong>
                        <small>{lancamento.estabelecimento}</small>
                      </div>

                    </div>
                  </td>
                  <td>
                    <span className={`${styles.categoria} ${styles[`categoria_${lancamento.tipo}`]}`}><span/>{lancamento.categoria}</span>
                  </td>
                  <td className={styles.valorLancamento}>
                    - {formatarMoeda(lancamento.valor)}
                  </td>
                  <td>
                    <div className={styles.solicitante}>
                      <div className={styles.avatarSolicitante}>
                        {lancamento.iniciais}
                      </div>
                      <div>
                        <strong>{lancamento.solicitante}</strong>
                        <small>{lancamento.departamento}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.responsavelLancamento}>
                      <strong>{cartao.responsavel}</strong>
                      <small>{lancamento.dataLancamento}</small>
                    </div>
                  </td>
                  <td>
                    <button type="button" className={styles.comprovante}>
                      <FileText size={11} />
                      {lancamento.comprovante}
                    </button>
                  </td>
                  <td>
                    <div className={styles.acoesTabela}>
                      <button type="button" className={styles.editar} aria-label="Editar lançamento">
                        <Pencil size={12} />
                      </button>
                      <button type="button" className={styles.excluir} aria-label="Excluir lançamento">
                        <Trash2 size={12} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.rodapeTabela}>

          <div className={styles.totalConsolidado}>
            <span>Total consolidado do período:</span>
            <strong>{formatarMoeda(totalLancamentos)}</strong><span>•</span>
            <span>{lancamentos.length} despesas auditadas</span>
          </div>

          <div className={styles.paginacao}>
            <button type="button">
              <ChevronLeft size={11} />Anterior
            </button>
            <button className={styles.paginaAtual} type="button">
              1
            </button>
            <button type="button">
              Próxima <ChevronRight size={11} />
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
