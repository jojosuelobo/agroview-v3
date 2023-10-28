/* eslint-disable no-unused-vars */
import styles from './NDVI.module.sass'

// Icons
import { AiFillCalendar } from 'react-icons/ai'

import axios from 'axios'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function NDVI() {
  const { id } = useParams()

  const url = `http://localhost:3000/terreno/${id}`
  const [terreno, setTerrenos] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTerrenos((response.data))
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className={styles.mainContent}>

      <div className={styles.info}>

        <div className={styles.ndvi}>
          <img src={terreno.imagem} className={styles.imagem} />
          <div className={styles.data}>
            INFOS AQUI
          </div>
        </div>

        <div>Gráficos vao ficar aqui</div>

      </div>
    </div>
  )
}
