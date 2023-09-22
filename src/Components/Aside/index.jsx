import styles from './Aside.module.sass'

// Imports
import { Link } from 'react-router-dom'

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
                    <li><BiHomeAlt className={styles.icon}/><Link to={'/'}>Dashboard</Link></li>
                    <li><PiNoteBold className={styles.icon}/><Link to={'/log'}>Log</Link></li>
                </ul>
                <div className={styles.other_options}>
                    <a><GrAddCircle className={styles.icon}/>Cadastro terreno</a>
                </div>
            </div>
            <div className={styles.down}>
                <ul className={styles.down}>
                    <li><AiOutlineUser className={styles.icon}/><Link to={'/profile'}>Perfil</Link></li>
                    <li><GrNotification className={styles.icon}/><Link to={'/notifications'}>Notificações</Link></li>
                    <li><AiOutlineSetting className={styles.icon}/><Link to={'/settings'}>Configurações</Link></li>
                </ul>
            </div>
        </aside>
    )
}
