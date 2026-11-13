type DadosLancamento = {
    cartaoSelecionadoId: string;
    categoriaSelecionada: string;
    valorCompra: string;
    dataDespesa: string;
    beneficiarioSelecionado: string;
    finalidade: string;
    saldoDisponivel: number;
    comprovante: File | null;
}

export function validarLancamento(dados: DadosLancamento): string | null {
    
const valor = Number(dados.valorCompra)

    if (!dados.cartaoSelecionadoId) {
        return "Selecione um cartão."
    }

    if (!dados.categoriaSelecionada) {
    return "Selecione uma categoria."
    }

    if (!dados.valorCompra.trim()) {
    return "Informe o valor da despesa."
    }

    if (!Number.isFinite(valor) || valor <= 0){
        return "Informe um valor maior que zero "
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

    if (valor > dados.saldoDisponivel) {
        return "O valor digitado é maior que o disponível no cartão " 
    }
    if (!dados.comprovante){
        return "Anexe um comprovante fiscal para cadastrar o gasto"
    }

    return null
}