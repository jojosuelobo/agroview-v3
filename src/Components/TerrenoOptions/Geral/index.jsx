/* eslint-disable react/prop-types */
import styles from './Geral.module.sass'

// Icons
import { BiSolidSun } from 'react-icons/bi'

import axios from 'axios'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Geral() {
    const {id} = useParams()

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
            <img src={terreno.imagem} className={styles.imagem} />
            <div className={styles.info}>
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
                <div className={styles.solo}>
                    <h1>Informações do Solo</h1>
                    <ul className={styles.info}>
                        <li>

                        </li>
                    </ul>
                </div>
                <div className={styles.historico}>
                    <p>HISTORICO</p>
                </div>
            </div>
        </div>
    )
}
