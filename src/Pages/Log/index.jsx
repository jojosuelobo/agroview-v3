// eslint-disable-next-line no-unused-vars
import styles from './Log.module.sass'

// Icons
import { AiOutlineWarning } from 'react-icons/ai'

export default function Log() {
  return (
    <div className={styles.section}>
      <h1>Log de registro</h1>
      <div className={styles.error_list}>
        <ul className={styles.list}>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> “TERRENO #01”: Título do terreno alterado de “TERRENO PRIMEIRO” para “TERRENO #01” </p>
            <p>13:22 15/05</p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Plano alterado de Básico para Corporativo </p>
            <p>13:22 15/05</p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Novo terreno “Plantação Venda Nova” cadastrado </p>
            <p>13:22 15/05</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
