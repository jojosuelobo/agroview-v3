/* eslint-disable no-unused-vars */
import styles from './Clima.module.sass'
// Icons
import { BiSolidSun } from 'react-icons/bi'

import axios from 'axios'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Clima() {
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
      <img src={terreno.imagem} className={styles.imagem} />
        <div className={styles.clima}>
          <div className={styles.climaHoje}>
            <div className={styles.climaText}>
              <p>Hoje</p>
              <p className={styles.temperatura}> {terreno?.clima?.temperaturaHoje} ºC</p>
            </div>
            <BiSolidSun className={styles.icon} />
          </div>
          <p>{terreno.cidade}, {terreno.estado}</p>
        </div>

      </div>
    </div>
  )
}
