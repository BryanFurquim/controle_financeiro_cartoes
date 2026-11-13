const tamanhoMaximo = 10 * 1024 * 1024;

export  function validarComprovante(
    arquivo: File
):  string | null {

    if(arquivo.size === 0) {
        return "O arquivo está vazio."
    }

    if(arquivo.size > tamanhoMaximo){
        return "O arquivo é maior que o máximo permitido de 10MB"
    }

    const nome = arquivo.name.toLowerCase()
    const extensaoPermitida = 
    nome.endsWith(".pdf") ||
    nome.endsWith(".jpg") ||
    nome.endsWith(".png")

    if(!extensaoPermitida) {
        return "Formato de arquivo inválido - Use pdf , png ou jpg"
    }

    return null
}