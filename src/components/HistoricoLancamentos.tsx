"use client";

import { useState } from "react";
import { Filter, TextSearch, Utensils, Fuel, Printer, BedDouble, FileText, Pencil, Trash2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Lancamento } from "../types/lancamento";
import styles from "../styles/historicoLancamentos.module.css";
import { filtrarLancamentos, type FiltrosLancamentos, } from "../lib/filtrosLancamentos";

type HistoricoLancamentosProps = {
  lancamentos: Lancamento[];
  responsavel: string;
};

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function HistoricoLancamentos({lancamentos, responsavel}: HistoricoLancamentosProps) {

  const [filtros, setFiltros] = useState<FiltrosLancamentos>({
    dataInicial: "2026-10-01",
    dataFinal: "2026-10-31",
    categoria: "",
    solicitante: "",
  });
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosLancamentos>({
    dataInicial: "2026-10-01",
    dataFinal: "2026-10-31",
    categoria: "",
    solicitante: "",
  });

  const lancamentosFiltrados = filtrarLancamentos(
    lancamentos,
    filtrosAplicados,
  );

  const totalLancamentos = lancamentosFiltrados.reduce(
    (total, lancamento) => total + lancamento.valor,
    0,
  );

  return (
    <div className={styles.container}>
      <section className={styles.historicoCartao}>
        <div className={styles.cabecalhoHistorico}>
          <div className={styles.tituloHistorico}>
            <div className={styles.iconeHistorico}>
              <TextSearch size={13} />
            </div>
            <h2>Histórico de Lançamentos do Cartão</h2>
            <span className={styles.contadorLancamentos}>
              {lancamentosFiltrados.length} lançamentos
            </span>
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
            <input
              type="date"
              value={filtros.dataInicial}
              onChange={(data) =>
                setFiltros({ ...filtros, dataInicial: data.target.value })
              }
            />
          </label>

          <label className={styles.campoFiltro}>
            <span>Data final</span>
            <input
              type="date"
              value={filtros.dataFinal}
              onChange={(data) =>
                setFiltros({ ...filtros, dataFinal: data.target.value })
              }
            />
          </label>

          <label className={styles.campoFiltro}>
            <span>Categoria</span>
            <select
              value={filtros.categoria}
              onChange={(categoria) =>
                setFiltros({ ...filtros, categoria: categoria.target.value })
              }
            >
              <option value="">Todas as categorias</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Combustível">Combustível</option>
              <option value="Material de escritório">Material de escritório</option>
              <option value="Hospedagem">Hospedagem</option>
            </select>
          </label>

          <label className={styles.campoFiltro}>
            <span>Responsável / Solicitante</span>
            <select
              value={filtros.solicitante}
              onChange={(solicitante) =>
                setFiltros({
                  ...filtros,
                  solicitante: solicitante.target.value,
                })
              }
            >
              <option value="">Todos os colaboradores</option>
              <option value="Eduardo Amaral">Eduardo Amaral</option>
              <option value="Mariana Costa">Mariana Costa</option>
              <option value="Carlos Henrique">Carlos Henrique</option>
              <option value="Beatriz Mendes">Beatriz Mendes</option>
            </select>
          </label>

          <div className={styles.acoesFiltro}>
            <button
              type="button"
              className={styles.botaoFiltrar}
              onClick={() => setFiltrosAplicados(filtros)}
            >
              <Filter size={11} /> Filtrar
            </button>
            <button
              type="button"
              className={styles.botaoLimpar}
              onClick={() => {
                const filtrosLimpos: FiltrosLancamentos = {
                  dataInicial: "",
                  dataFinal: "",
                  categoria: "",
                  solicitante: "",
                };
                setFiltros(filtrosLimpos);
                setFiltrosAplicados(filtrosLimpos);
              }}
            >
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
              {lancamentosFiltrados.length === 0 ? (
                <tr>
                    <td colSpan={8} className={styles.semResultados}>Nenhum lançamento encontrado.</td>
                </tr>) : (
                lancamentosFiltrados.map((lancamento) => (
                    <tr key={lancamento.id}>
                        <td className={styles.dataCompra}>{lancamento.data}</td>
                        <td>
                            <div className={styles.descricaoLancamento}>
                                <div className={`${styles.iconeCategoria} ${styles[lancamento.tipo]}`}>
                                    {lancamento.tipo === "alimentacao" && (
                                         <Utensils size={12} />
                                    )}
                                    {lancamento.tipo === "combustivel" && (
                                        <Fuel size={12} />
                                    )}
                                    {lancamento.tipo === "material" && (
                                        <Printer size={12} />
                                    )}
                                    {lancamento.tipo === "hospedagem" && (
                                         <BedDouble size={12} />
                                    )}
                                </div>

                                <div>
                                    <strong>{lancamento.descricao}</strong>
                                    <small>{lancamento.estabelecimento}</small>
                                </div>
                            </div>
                        </td>
                  <td>
                    <span className={`${styles.categoria} ${styles[`categoria_${lancamento.tipo}`]}`}> <span /> {lancamento.categoria}</span>
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
                      <strong>{responsavel}</strong>
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
                      <button
                        type="button"
                        className={styles.editar}
                        aria-label="Editar lançamento"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        type="button"
                        className={styles.excluir}
                        aria-label="Excluir lançamento"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.rodapeTabela}>
          <div className={styles.totalConsolidado}>
            <span>Total consolidado do período:</span>
            <strong>{formatarMoeda(totalLancamentos)}</strong>
            <span>•</span>
            <span>{lancamentosFiltrados.length} despesas auditadas</span>
          </div>

          <div className={styles.paginacao}>
            <button type="button">
              <ChevronLeft size={11} />
              Anterior
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
    </div>
  );
}
