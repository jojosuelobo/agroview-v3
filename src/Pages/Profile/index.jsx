/* eslint-disable no-unused-vars */
import styles from './Profile.module.sass'
import PIC from '../../../public/profile2.jpg'
import { useState } from 'react'

export default function Profile() {

  const [isDisabled, setisDisabled] = useState(true)
  const [email, setEmail] = useState('joaoClaudio@gmail.com')
  const [phone, setPhone] = useState('27988486350')
  const [password, setPassword] = useState('password')

  return (
    <div className={styles.section}>
      <div className={styles.form_header}>
        <img src={PIC} alt="profile" />
        <h1>JOÃO CLÁUDIO</h1>
        {isDisabled === true &&
          <button onClick={() => setisDisabled(false)} className={styles.edit}>Editar Perfil</button>
        }
      </div>
      <div className={styles.form}>
        <label>
          Email
          {isDisabled === true ? <input type="email" placeholder={email} disabled />
            : <input type="text" placeholder={email} />
          }
        </label>
        <label>
          Telefone
          {isDisabled === true ? <input type="text" placeholder={phone} disabled />
            : <input type="text" placeholder={phone} />
          }
        </label>
        <label>
          Senha
          {isDisabled === true ? <input type="password" placeholder='********' disabled />
            : <input type="password" placeholder={password} />
          }
        </label>
        {isDisabled === false &&
          <button className={styles.save} onClick={() => setisDisabled(true)}>Salvar</button>
        }

      </div>
    </div>
  )
}
