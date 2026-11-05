import styles from "../styles/card.module.css";
import { Nfc } from "lucide-react";
import type { Cartao } from "../types/cartao";
import Image from "next/image";

type CardProps = {
  cartao: Cartao;
};

export default function Card({ cartao }: CardProps) {
  const cartaoPreto = cartao.final === "8912";

  return (
    <div className={`${styles.cartaoCorporativo} ${cartaoPreto ? styles.cartaoPreto : styles.cartaoAzul}`}>

      <div className={styles.cartaoTopo}>

        <div>
          <span className={styles.cartaoRotulo}>CARTÃO CORPORATIVO</span><strong>{cartao.responsavel}</strong>
        </div>
        <div className={styles.nfc}>
          <Nfc size={17} />
        </div>

      </div>


      <div className={styles.flexChip}>
          <div className={styles.chipCartao}>
            <Image src="/chip.png" alt="Chip" width={34} height={48} />
          <div />
        </div> 
        <p>CUSTÓDIA FÍSICA</p>
      </div>

      <div className={styles.numeroCartao}>
        <span>• • • •</span> <span> • • • •</span> <span> • • • •</span> {cartao.final}
      </div>

      <div className={styles.cartaoRodape}>

        <div>
          <span>PORTADOR REGISTRADO</span> <strong>{cartao.responsavel}</strong>
        </div>

        <div className={styles.validadeCartao}>
          <span>VALIDADE</span> <strong>{cartao.validade}</strong>
        </div>

        <div className={styles.bandeiraCartao}>

          {cartao.bandeira === "mastercard" ? (
            <Image src="/bandeiras/master.png" alt="Mastercard" width={40} height={25}/>) : (
            <Image src="/bandeiras/visa.png" alt="Visa" width={40} height={25}/>)}

        </div>

      </div>
    </div>
  );
}
