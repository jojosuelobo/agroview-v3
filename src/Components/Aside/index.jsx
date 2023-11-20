import styles from './Aside.module.sass'

// Imports
import { Link } from 'react-router-dom'

// Icons
import { BiHomeAlt } from 'react-icons/bi'
import { PiNoteBold } from 'react-icons/pi'
import { GrAddCircle, GrNotification } from 'react-icons/gr'
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai'

// Components
import CadastrarTerreno from '../CadastrarTerreno'

export default function Aside() {
    return (
        <aside className={styles.aside}>
            <div className={styles.upper}>
                <ul className={styles.options_uppper}>
                    <Link to={'/'}>
                        <li><BiHomeAlt className={styles.icon} />Dashboard</li>
                    </Link>
                    <Link to={'/log'}>
                        <li><PiNoteBold className={styles.icon} />Log</li>
                    </Link>
                </ul>
                <div className={styles.other_options}>
                    <a>
                        <GrAddCircle className={styles.icon} />
                        <CadastrarTerreno /> </a>
                </div>
            </div>
            <div className={styles.down}>
                <ul className={styles.down}>
                    <Link to={'/profile'}>
                        <li><AiOutlineUser className={styles.icon} />Perfil</li>
                    </Link>
                    <Link to={'/notifications'}>
                        <li><GrNotification className={styles.icon} />Notificações</li>
                    </Link>
                    <Link to={'/settings'}>
                        <li><AiOutlineSetting className={styles.icon} />Configurações</li>
                    </Link>
                </ul>
            </div>
        </aside>
    )
}
