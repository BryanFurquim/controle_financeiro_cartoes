"use client"

import { useState } from "react"
import { validarComprovante  } from "../lib/validarComprovante"
import styles from "../styles/comprovante.module.css"
import { CloudUpload, FileText, CheckCircle2, Trash2, Eye, EyeOff} from "lucide-react";

type ComprovanteProps = {
    onChange: (arquivo: File | null) => void;
}
export default function Comprovante({onChange}: ComprovanteProps) {

    const [arquivo, setArquivo] = useState <File | null>(null)
    const [ erro, setErro] = useState("")
    const [arrastando, setArrastando] = useState(false)
    const [mostrarInfos, setMotrarInfos] = useState(false)
    const [comprovante, setComprovante] = useState <File | null>(null)

    function selecionarArquivo(arquivoSelecionado: File){
        const mensagemErro = validarComprovante(arquivoSelecionado)

        if(mensagemErro){
            setErro(mensagemErro)
            setArquivo(null)
            return;
        }

        setErro("")
        setArquivo(arquivoSelecionado)
        setMotrarInfos(true)
        onChange(arquivoSelecionado)
    }

    function removerArquivo(){
        setArquivo(null)
        setErro("")
        setMotrarInfos(true)
        onChange(null)
    }
    

    function soltarArquivo(evento: React.DragEvent<HTMLDivElement>){
        evento.preventDefault()

        const arquivoSelecionado = evento.dataTransfer.files[0]

        if(arquivoSelecionado){
            selecionarArquivo(arquivoSelecionado)
        }
    }


return (
    <>
        <div
            className={`${styles.areaUpload} ${arrastando ? styles.arrastando : ""}`}
            onDrop={(evento) => {
                soltarArquivo(evento);
                setArrastando(false);
            }}
            onDragOver={(evento) => {
                evento.preventDefault();
                setArrastando(true);
            }}
            onDragLeave={() => setArrastando(false)}
        >
            <input
                id="arquivoComprovante"
                className={styles.inputArquivo}
                type="file"
                accept=".pdf,.jpg,.png"
                onClick={(evento) => {
                    evento.currentTarget.value = "";
                }}
                onChange={(evento) => {
                    const arquivoSelecionado = evento.target.files?.[0];

                    if (arquivoSelecionado) {
                        selecionarArquivo(arquivoSelecionado);
                    }
                }}
            />

            <div className={styles.iconeUpload}>
                <CloudUpload size={22} />
            </div>

            <strong>
                Arraste e solte o comprovante aqui ou{" "}
                <label
                    htmlFor="arquivoComprovante"
                    className={styles.selecionarArquivo}
                >
                    clique para selecionar do computador
                </label>
            </strong>
            <small>Formatos permitidos: PDF, JPG e PNG (tamanho máximo 10MB)</small>
        </div>

        {arquivo && (
            <div className={styles.arquivoAnexado}>
                <div className={styles.iconeArquivo}>
                    <FileText size={20} />
                </div>

                <div className={styles.dadosArquivo}>
                    <div className={styles.nomeArquivo}>
                        <strong>{mostrarInfos ? arquivo.name : "••••••••••••••••" }</strong>
                        <span className={styles.statusArquivo}><CheckCircle2 size={10} />Anexado com sucesso</span>
                    </div>

                    <small>
                        {mostrarInfos ? `${(arquivo.size / (1024 * 1024)).toFixed(2)} MB` : "••••"}</small>
                </div>

                <div className={styles.acoesArquivo}>
                    <button
                        className={styles.ver}
                        type="button"
                        onClick={() => setMotrarInfos(!mostrarInfos)}
                    >
                        {mostrarInfos ? <Eye size={16}/> : <EyeOff size={16}/> }
                    </button>
                    <button
                        className={styles.excluir}
                        type="button"
                        onClick={removerArquivo}
                    >
                        <Trash2 size={16} />
                    </button>
                    
                </div>
            </div>
        )}

        {erro && <p>{erro}</p>}
    </>
);
}