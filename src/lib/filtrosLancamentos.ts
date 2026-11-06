import type { Lancamento } from "../types/lancamento";

export type FiltrosLancamentos = {
    dataInicial: string;
    dataFinal: string;
    categoria: string;
    solicitante: string;
}

export function converterData(data: string): string {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}

export function filtrarLancamentos(lancamentos: Lancamento[], filtros: FiltrosLancamentos): Lancamento[] {
    
    return lancamentos.filter((lancamento) => {
        const dataLancamento = converterData(lancamento.data);
        const dataInicial = !filtros.dataInicial || dataLancamento >= filtros.dataInicial;
        const dataFinal = !filtros.dataFinal || dataLancamento <= filtros.dataFinal;
        const categoria = !filtros.categoria || lancamento.categoria === filtros.categoria;
        const solicitante = !filtros.solicitante || lancamento.solicitante === filtros.solicitante;

        return dataInicial && dataFinal && categoria && solicitante;
    });
}
