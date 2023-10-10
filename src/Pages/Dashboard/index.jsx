/* eslint-disable no-unused-vars */
import styles from './Dashboard.module.sass'
import image from '../../../public/image.png'

// Axios
import axios from "axios";

// React
import { useState, useEffect } from 'react'

// Icons
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'

// Components
import Button from '../../Components/Button'

export default function Dashboard() {

  const url = 'http://localhost:3000/terreno'
  const [terrenos, setTerrenos] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTerrenos((response.data))
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.list}>
        {terrenos.map((terreno) =>
          <div className={styles.terreno} key={terreno.id}>
            <nav>
              <HiOutlineArrowsExpand className={styles.icon} />
              <h1>{terreno.nome}</h1>
              <div className={styles.crud}>
                <TiDeleteOutline className={styles.icon_delete} />
                <AiOutlineEdit className={styles.icon_edit} />
              </div>
            </nav>
            <div className={styles.content}>
              <img src={image} />
              <div className={styles.info}>
                <p>Hectares: {terreno.hectares}ha</p>
                <p>Temperatura: {terreno.clima.temperaturaHoje} ºC</p>
                <p>{terreno.cidade}, {terreno.estado}</p>
                <button className={styles.buttonOpen}>Exibir</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div> 

  )
}
