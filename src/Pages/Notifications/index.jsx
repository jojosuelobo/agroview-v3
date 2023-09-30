/* eslint-disable no-unused-vars */
import styles from './Notifications.module.sass'
// URL: http://localhost:3000/notificacoes

// Axios 
import { getNotifications } from '../../axios/config.js'
import axios from "axios";

// Hooks
import { useState, useEffect } from 'react'

// Icons
import { AiOutlineWarning } from 'react-icons/ai'

export default function Notifications() {
  const url = 'http://localhost:3000/notificacoes'
  const [notifications, setNotifications] = useState([])

  const handleClick = () => {
    console.log(notifications)
  }

  useEffect(() => {
    const url = 'http://localhost:3000/notificacoes'
    axios.get(url)
      .then(response => {
        setNotifications((response.data))
      })
      .catch(error => console.log(error)) 
  }, [])


  return (
    <div className={styles.section}>
      <button onClick={handleClick}>oi</button>
      <h1>Log de registro</h1>
      <div className={styles.error_list}>
        <ul className={styles.list}>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Temperatura do terreno “TERRENO #01” está 3 ºC acima do esperado </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> O planteio do terreno “Plantação de café Venda Nova” está quase pronto para colheita </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
          <li>
            <p><AiOutlineWarning className={styles.icon} /> Níveis UV do terreno “Plantação de café Venda Nova” estão acima da média </p>
            <p>13:22 15/05</p>
            <p className={styles.text}>Descrição detalhada do erro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
