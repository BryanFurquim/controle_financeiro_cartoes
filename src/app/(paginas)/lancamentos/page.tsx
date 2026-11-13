"use client";

import { CheckCircle2, ChevronDown, CircleHelp, Clock3, CloudUpload, CreditCard, ExternalLink, Eye, FileText, LockKeyhole, ChevronRight, ShieldCheck, Trash2, UserRound, Wallet, LayoutDashboard,} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {cartoes} from "../../../types/cartoes"
import { categorias } from "../../../types/categorias"
import styles from "../../../styles/lancamentos.module.css";
import { validarLancamento } from "../../../lib/validarLancamento"
import Image from "next/image";
import Comprovante from "../../../components/comprovantes"

export default function LancamentosPage() {

  const [cartaoSelecionadoId, setCartaoSelecionadoId] = useState(cartoes[0].id)
  const cartaoSelecionado = cartoes.find((cartao) => cartao.id === cartaoSelecionadoId) ?? cartoes[0]
  const [beneficiarioSelecionado, setBeneficiarioSelecionado] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("")
  const [dataDespesa, setDataDespesa] = useState("")
  const [valorCompra, setValorCompra] = useState("")
  const [finalidade, setFinalidade] = useState("")
  const valorNumerico = Number(valorCompra)
  const dentroDoLimite = valorNumerico > 0 && valorNumerico <= cartaoSelecionado.limite - cartaoSelecionado.gasto
  const [ mensagemValidacao, setMensagemValidacao] = useState("")
  const [ comprovante, setComprovante] = useState <File | null>(null)
 
  function validacao(){
    const erro = validarLancamento({
      cartaoSelecionadoId,
      categoriaSelecionada,
      valorCompra,
      dataDespesa,
      beneficiarioSelecionado,
      finalidade,
      saldoDisponivel: cartaoSelecionado.limite - cartaoSelecionado.gasto,
      comprovante
      })
    
    setMensagemValidacao(erro ?? "")
  }

  return (
    <div className={styles.paginaLancamentos}>

      <nav className={styles.caminho}>
        <Link href="/dashboard">
          <LayoutDashboard size={13} />Dashboard
        </Link><ChevronRight size={13} />

       <span>Lançamentos</span><ChevronRight size={13} />

      <span className={styles.caminhoAtual}>Novo Lançamento</span>

      <div className={styles.statusModulo}>
        <span />MÓDULO DE TESOURARIA ATIVO
      </div>
    </nav>

      <div className={styles.conteudoLancamento}>

        <div className={styles.topoFormulario}>

          <div>
            <span className={styles.identificacao}>AUDITORIA DE DESPESA</span>
            <h1>Novo Lançamento</h1>
          </div>

          <div className={styles.aprovacao}>
            <ShieldCheck size={13} />Fluxo de Pré-Aprovação Contábil
          </div>

        </div>

        <div className={styles.seletorCartao}>
          <label htmlFor="cartao">Selecione o cartão para fazer um novo lançamento <span>*</span></label>
            <select id="cartao" value={cartaoSelecionadoId} onChange={(evento)=> setCartaoSelecionadoId(evento.target.value)}>
                {cartoes.map((cartao) => (
                  <option key={cartao.id} value={cartao.id}>
                    {cartao.bandeira === "mastercard" ? "Mastercard" : "Visa"} •••• {cartao.final}
                  </option>))}
            </select>
        </div>

        <section className={styles.cartaoSelecionado}>
          
          <div className={styles.iconeCartao}>
            <CreditCard size={22} />
          </div>

          <div className={styles.dadosCartao}>
            
            <div className={styles.linhaCartao}>
              <strong>Cartão em uso : </strong>  
              <Image width={40} height={25} src={ cartaoSelecionado.bandeira === "mastercard" ? "/bandeiras/master.png": "/bandeiras/visa.png"} alt={cartaoSelecionado.bandeira} className={styles.bandeiraCartao}/>
              <strong> •••• {cartaoSelecionado.final}</strong>
              <span className={styles.tipoCartao}>Físico Corporativo</span>
            </div>
            <span className={styles.responsavelCartao}><UserRound size={12} /> Responsável: {cartaoSelecionado.responsavel} -- {cartaoSelecionado.departamento}
            </span>

          </div>

          <div className={styles.saldoDisponivel}>
            <div>
              <span>SALDO DISPONÍVEL</span>
              <strong>{(cartaoSelecionado.limite - cartaoSelecionado.gasto).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}</strong>
            </div>

            <div className={styles.iconeSaldo}>
              <Wallet size={19} />
            </div>
          </div>

        </section>

        <div className={styles.formulario}>

          <div className={styles.caixasResposta}>

            <div className={styles.caixa}>
              <label>Categoria contábil <span>*</span> </label>

              <div className={styles.caixaSelect}>

                <select value={categoriaSelecionada} onChange={(event) => setCategoriaSelecionada(event.target.value)}>
                  <option value="" disabled>
                    Selecione uma categoria...
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria.valor} value={categoria.valor}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>

                <ChevronDown size={16} />
              </div>


              <small>Classificação para dedução IRPJ/CSLL</small>
            </div>

            <div className={styles.caixa}>
              <label>Valor da compra (BRL) <span>*</span></label>

              <div className={styles.caixaValor}>
                <strong>R$</strong>
                <input type="number" min="0" step="0.01" placeholder="0,00" value={valorCompra} onChange={(event) => setValorCompra(event.target.value)}/>
              </div>

              {valorNumerico > 0 && (
                <small className={ dentroDoLimite ? styles.mensagemSucesso : styles.mensagemErro}>
                  {dentroDoLimite ? (
                    <>
                      <CheckCircle2 size={12} />
                      Dentro do limite disponível no cartão
                    </>
                  ) : (
                    <>
                      <CircleHelp size={12} />
                      Valor acima do saldo disponível no cartão
                    </>
                  )}
                </small>
              )}
            </div>

            <div className={styles.caixa}>
              <label> Data da despesa <span>*</span> </label>
              <div className={styles.caixaData}>
                <input type="date" value={dataDespesa} onChange={(event) => setDataDespesa(event.target.value)}/>
              </div>
              <small>Conforme cupom fiscal</small>
            </div>

          </div>
        
          <div className={styles.caixaSolicitante}>

            <div className={styles.tituloCampo}>
              <label>Solicitado / Beneficiário <span>*</span></label>
              <small>Identificação de portador ou centro de interesse</small>
            </div>

            <div className={styles.seletorSolicitante}>
              <UserRound size={15} />
              <select value={beneficiarioSelecionado} onChange={(event) => setBeneficiarioSelecionado(event.target.value)}>

                <option value="">Selecione um beneficiário...</option>
                {cartoes.map((cartao) => (
                  <option key={cartao.id} value={`${cartao.responsavel} — ${cartao.departamento}`}>
                    {cartao.responsavel} — {cartao.departamento}
                  </option>
                ))}

              </select>
            </div>

          </div>


          <div className={styles.campoFinalidade}>
            <div className={styles.tituloCampo}>
              <label>Finalidade corporativa da despesa <span>*</span></label>
              <small>{finalidade.length} / 500 caracteres</small>
            </div>

            <div className={styles.areaTexto}>
              <textarea value={finalidade} onChange={(event) => setFinalidade(event.target.value)} maxLength={500} placeholder="Descreva a finalidade desta despesa..."/>
            </div>
            <small className={styles.ajudaCampo}>Seja específico para auditorias internas e validação da conformidade fiscal (compliance).</small>
          </div>

          <div className={styles.secaoComprovante}>
            <div className={styles.tituloComprovante}>
              <label>Comprovante fiscal / Nota <span>*</span></label>
              <strong>Obrigatório para liquidação</strong>
            </div>

            <Comprovante onChange={setComprovante}/>
          </div>

          <div className={styles.avisoRegistro}>
            <div className={styles.informacaoHorario}>
              <Clock3 size={14} />
              <span> Data e hora do lançamento serão registradas automaticamente pelo sistema no fuso GMT-3. </span>
            </div>

            <div className={styles.informacaoUsuario}>
              <LockKeyhole size={14} />
              <span> <strong>Lançado por:</strong> {beneficiarioSelecionado} (sessão segura) </span>
            </div>
          </div>

          {mensagemValidacao && (<small className={styles.mensagemErro}> {mensagemValidacao}</small>)}

          <div className={styles.acoesFormulario}>
            <button type="button" className={styles.botaoCancelar}>
              Cancelar
            </button>

            <button type="button" className={styles.botaoCadastrar} onClick={validacao}>
              <CheckCircle2 size={14} />
              Cadastrar gasto
            </button>
          </div>

        </div>
      </div>

      <div className={styles.rodapeLancamento}>
        <div>
          <CircleHelp size={13} />
          Política de Reembolso e Despesas Corporativas v4.2 aprovada pela
          Diretoria Financeira.
        </div>

        <a> Consultar tabela de limites por centro de custo <ExternalLink size={12} /></a>
      </div>
    </div>
  )
}
