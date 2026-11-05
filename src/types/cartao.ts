export type Cartao = {
  id: string;
  final: string;
  bandeira: "mastercard" | "visa";
  responsavel: string;
  departamento: string;
  limite: number;
  gasto: number;
  validade: string;
  emUso: boolean;
  retiradoPor?: string;
};