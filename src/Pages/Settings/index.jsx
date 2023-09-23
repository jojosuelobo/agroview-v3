/* eslint-disable no-unused-vars */
import styles from './Settings.module.sass'

import { useState } from 'react';

export default function Settings() {

  const [isOn, setIsOn] = useState(
    { a: false, b: false, c: false }
  );

  const handleInputA = () => {
    setIsOn({ ...isOn, a: !isOn.a });
  }

  const handleInputB = (inputLabel) => {
    setIsOn({ ...isOn, b: !isOn.b });
  }

  const handleInputC = (inputLabel) => {
    setIsOn({ ...isOn, c: !isOn.c });
  }

  return (
    <div className={styles.section}>
      <h1>Configurações</h1>
      <div className={styles.options}>
        <ul className={styles.list}>
          <li>
            <div className={styles.desc}>
              <h2>Notificações no desktop</h2>
              <p>Receba notificação e alertas na sua área de trabalho</p>
            </div>
            <div className={styles.button}>
              <button>Ativar</button>
            </div>
          </li>
          <li>
            <div className={styles.desc}>
              <h2>Notificações por E-mail</h2>
              <p>Receba notificação e alertas via E-mail</p>
            </div>
            <div className={styles.button}>
              <button>Ativar</button>
            </div>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <div className={styles.desc}>
              <h2>Idioma</h2>
              <select>
                <option>Português</option>
                <option >Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
