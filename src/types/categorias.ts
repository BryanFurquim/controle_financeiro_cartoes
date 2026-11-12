export type Categoria = {
    valor: "alimentacao" | "combustivel" | "material" | "hospedagem"
    nome: string;
}

export const categorias = [
    { valor: "alimentacao", nome: "Alimentação"},
    { valor: "combustivel", nome: "Combustível"},
    { valor: "material", nome: "Material de escritório"},
    { valor: "hospedagem", nome: "Hospedagem"}
]