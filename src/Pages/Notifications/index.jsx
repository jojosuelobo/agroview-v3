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

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setNotifications((response.data))
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <div className={styles.section}>
      <h1>Notificações</h1>
      <div className={styles.error_list}>
        <ul className={styles.list}>
          {notifications.map(notification => (
            <li key={notification.id}>
              <p><AiOutlineWarning className={styles.icon} /> {notification.titulo} </p>
              <p>{notification.data}</p>
              <p className={styles.text}>{notification.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
