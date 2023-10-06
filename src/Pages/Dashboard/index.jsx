import styles from './Dashboard.module.sass'
import image from '../../../public/image.png'

// Icons
import {HiOutlineArrowsExpand} from 'react-icons/hi'
import {TiDeleteOutline} from 'react-icons/ti'
import {AiOutlineEdit} from 'react-icons/ai'

// Components
import Button from '../../Components/Button'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.list}>
        <div className={styles.terreno}>
          <nav>
            <HiOutlineArrowsExpand className={styles.icon}/>
            <h1>Terreno #01</h1>
            <div className={styles.crud}>
              <TiDeleteOutline className={styles.icon_delete}/>
              <AiOutlineEdit className={styles.icon_edit}/>
            </div>
          </nav>
          <div className={styles.content}>
            <img src={image}/>
            <div className={styles.info}>
              <p>Hectares: 42ha</p>
              <p>Temperatura: 28 ºC</p>
              <p>Sorriso, Mato Grosso</p>
              <button>Exibir</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
