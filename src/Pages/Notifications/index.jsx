/* eslint-disable no-unused-vars */
import styles from './Notifications.module.sass'

// Icons
import { AiOutlineWarning } from 'react-icons/ai'

export default function Notifications() {
  return (
    <div className={styles.section}>
      <h1>Log de registro</h1>
      <div className={styles.error_list}>
        <ul className={styles.list}>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Temperatura do terreno “TERRENO #01” está 3 ºC acima do esperado </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> O planteio do terreno “Plantação de café Venda Nova” está quase pronto para colheita </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Níveis UV do terreno “Plantação de café Venda Nova” estão acima da média </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
