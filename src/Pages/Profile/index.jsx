/* eslint-disable no-unused-vars */
import styles from './Profile.module.sass'
import PIC from '../../../public/profile.png'

export default function Profile() {

  return (
    <div className={styles.section}>
      <div className={styles.form_header}>
        <img src={PIC} alt="profile" />
        <h1>JOÃO CLÁUDIO</h1>
        <button onClick={() => console.log('click')}>Editar Perfil</button>
      </div>
      <div className={styles.form}>
        <label>
          Email
          <input type="text" />
        </label>
        <label>
          Telefone
          <input type="text" />
        </label>
        <label>
          Senha
          <input type="password" />
        </label>
      </div>
    </div>
  )
}
