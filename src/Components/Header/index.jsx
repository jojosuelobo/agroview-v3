import logo from '../../../public/logoDark.svg'

// Imports
import { Link } from 'react-router-dom'

// Styles
import styles from './Header.module.sass'

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.div_image}>
        <Link to={'/'}><img className={styles.image} src={logo} alt="logo" /></Link>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder='Procurar' className={styles.SearchInput}/>
      </div>
      <div className={styles.logout}>
        <Link className={styles.logText} to={'/register'}>Sair</Link>
      </div>
    </nav>
  )
}
