export type Lancamento = {
  id: number;
  data: string;
  descricao: string;
  estabelecimento: string;
  categoria: string;
  valor: number;
  solicitante: string;
  iniciais: string;
  departamento: string;
  dataLancamento: string;
  comprovante: string;
  tipo: "alimentacao" | "combustivel" | "material" | "hospedagem";
};

export const lancamentos: Lancamento[] = [
  {
    id: 1,
    data: "22/10/2026",
    descricao: "Almoço técnico com cliente",
    estabelecimento: "Restaurante Figão São Paulo",
    categoria: "Alimentação",
    valor: 120.00,
    solicitante: "João Silva",
    iniciais: "JS",
    departamento: "Comercial",
    dataLancamento: "22/10/2026 14:32",
    comprovante: "NFSe_restaurante.pdf",
    tipo: "alimentacao",
  },
  {
    id: 2,
    data: "18/10/2026",
    descricao: "Abastecimento viagem regional",
    estabelecimento: "Posto Shell Rodovia Anhanguera",
    categoria: "Combustível",
    valor: 285.50,
    solicitante: "Marcos Lima",
    iniciais: "ML",
    departamento: "Logística",
    dataLancamento: "19/10/2026 09:05",
    comprovante: "Cupom_posto.pdf",
    tipo: "combustivel",
  },
  {
    id: 3,
    data: "15/10/2026",
    descricao: "Resma de papel e toner",
    estabelecimento: "Kalunga Papelaria Corporativa",
    categoria: "Material de escritório",
    valor: 410.00,
    solicitante: "Camila Rocha",
    iniciais: "CR",
    departamento: "Operações",
    dataLancamento: "15/10/2026 16:20",
    comprovante: "DANFE_0491.pdf",
    tipo: "material",
  },
  {
    id: 4,
    data: "10/10/2026",
    descricao: "Hospedagem 2 diárias Feira Comercial",
    estabelecimento: "Hotel Ibis Paulista São Paulo",
    categoria: "Hospedagem",
    valor: 434.50,
    solicitante: "Roberto Dias",
    iniciais: "RD",
    departamento: "Diretoria",
    dataLancamento: "11/10/2026 10:20",
    comprovante: "Reserva_hotel.pdf",
    tipo: "hospedagem",
  },
];