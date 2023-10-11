import styles from './Geral.module.sass'

// Icons
import { BiSolidSun } from 'react-icons/bi'

export default function Geral( {terreno} ) {
    return (
        <div className={styles.mainContent}>
            <img src={terreno.imagem} className={styles.imagem} />
            <div className={styles.info}>
                <div className={styles.clima}>
                    <div className={styles.climaHoje}>
                        <div className={styles.climaText}>
                            <p>Hoje</p>
                            <p className={styles.temperatura}>{terreno.hectares} ºC</p>
                        </div>
                        <BiSolidSun className={styles.icon} />
                    </div>
                    <p>{terreno.cidade}, {terreno.estado}</p>
                </div>
                <div className={styles.solo}>
                    <p>SOLO</p>
                </div>
                <div className={styles.historico}>
                    <p>HISTORICO</p>
                </div>
            </div>
        </div>
    )
}
