import logo from '../../../public/logoDark.svg'

// Styles
import styles from './Header.module.sass'

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.div_image}>
        <img className={styles.image} src={logo} alt="logo" />
      </div>
      <div className={styles.search}>
        <input type="text" placeholder='Procurar' />
      </div>
      <div className={styles.logout}>
        <p>Sair</p>
      </div>
    </nav>
  )
}
