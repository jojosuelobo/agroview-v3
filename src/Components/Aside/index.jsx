import styles from './Aside.module.sass'

// Icons
import {BiHomeAlt} from 'react-icons/bi'
import {PiNoteBold} from 'react-icons/pi'
import {GrAddCircle, GrNotification} from 'react-icons/gr'
import {AiOutlineUser, AiOutlineSetting} from 'react-icons/ai'

export default function Aside() {
    return (
        <aside className={styles.aside}>
            <div className={styles.upper}>
                <ul className={styles.options_uppper}>
                    <li><BiHomeAlt className={styles.icon}/> Dashboard</li>
                    <li><PiNoteBold className={styles.icon}/> Log</li>
                </ul>
                <div className={styles.other_options}>
                    <a><GrAddCircle className={styles.icon}/> Cadastro terreno</a>
                </div>
            </div>
            <div className={styles.down}>
                <ul className={styles.down}>
                    <li><AiOutlineUser className={styles.icon}/> Perfil</li>
                    <li><GrNotification className={styles.icon}/> Notificações</li>
                    <li><AiOutlineSetting className={styles.icon}/> Configurações</li>
                </ul>
            </div>
        </aside>
    )
}
