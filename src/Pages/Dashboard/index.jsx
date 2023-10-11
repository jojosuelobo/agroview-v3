/* eslint-disable no-unused-vars */
import styles from './Dashboard.module.sass'
import image from '../../../public/image.png'
import vazio from '../../../public/empty.svg'

// Axios
import axios from "axios";

// React
import { useState, useEffect } from 'react'

// Icons
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'

// Router
import { Link, useNavigate } from 'react-router-dom'


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

  const navigate = useNavigate()

  return (
    <div className={styles.dashboard}>
      <div className={styles.list}>
        {terrenos.length === 0 ? (
          <img src={vazio}/>
        ) : (
          terrenos.map((terreno) =>
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
                <img className={styles.imagem} src={terreno.imagem} />
                <div className={styles.info}>
                  <p>Hectares: {terreno.hectares}ha</p>
                  <p>Temperatura: {terreno.clima[0].temperaturaHoje} ºC</p>
                  <p>{terreno.cidade}, {terreno.estado}</p>
                  <button className={styles.buttonOpen} onClick={() => navigate(`/terreno/${terreno.id}`)}>Exibir</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}
