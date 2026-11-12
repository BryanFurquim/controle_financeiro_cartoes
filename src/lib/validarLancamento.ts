type DadosLancamento = {
    cartaoSelecionadoId: string;
    categoriaSelecionada: string;
    valorCompra: string;
    dataDespesa: string;
    beneficiarioSelecionado: string;
    finalidade: string;
    saldoDisponivel: number;
}

export function validarLancamento(dados: DadosLancamento): string | null {

    if (!dados.cartaoSelecionadoId) {
        return "Selecione um cartão."
    }

    if (!dados.categoriaSelecionada) {
    return "Selecione uma categoria."
    }

    if (!dados.valorCompra.trim()) {
    return "Informe o valor da despesa."
    }

    if (!dados.dataDespesa) {
    return "Informe a data da despesa."
    }

    if (!dados.beneficiarioSelecionado) {
    return "Selecione um solicitante/beneficiário."
    }

    if (!dados.finalidade.trim()) {
    return "Descreva a finalidade da despesa."
    }
    
    const valor = Number(dados.valorCompra)

    if (!Number.isFinite(valor) || valor <= 0){
        return "Informe um valor maior que zero "
    }
    if (valor > dados.saldoDisponivel) {
        return "O valor digitado é maior que o disponível no cartão " 
    }

    return null
}