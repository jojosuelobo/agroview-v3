/* eslint-disable no-unused-vars */
import styles from './Log.module.sass'

// Axios 
import { getNotifications } from '../../axios/config.js'
import axios from "axios";

// Hooks
import { useState, useEffect } from 'react'

// Icons
import { AiOutlineWarning } from 'react-icons/ai'

// Balloon
import 'balloon-css';


export default function Log() {
  const url = 'http://localhost:3000/log'
  const [logs, setLogs] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setLogs((response.data))
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className={styles.section}>
      <h1>Log de registro</h1>
      <div className={styles.error_list}>
        <ul className={styles.list}>
          {logs.map(log => (
            <li key={log.id}>
            <p><AiOutlineWarning className={styles.icon} />{log.titulo}</p>
            <p>{log.data}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
