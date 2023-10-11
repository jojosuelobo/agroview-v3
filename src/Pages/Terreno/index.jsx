/* eslint-disable no-unused-vars */
import styles from './Terreno.module.sass'

// Icons
import { TbArrowBack } from 'react-icons/tb'
import { BiSolidSun } from 'react-icons/bi'

// Axios
import axios from "axios";

// Hooks
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Router
import { Link, useNavigate } from 'react-router-dom'

export default function Terreno() {
    const navigate = useNavigate()

    const { id } = useParams()

    const url = `http://localhost:3000/terreno/${id}`
    const [terreno, setTerreno] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTerreno((response.data))
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className={styles.content}>
            <nav className={styles.header}>
                <div className={styles.textHeader}>
                    <h1> <TbArrowBack className={styles.icon} onClick={() => navigate('/')}/> {terreno.nome} </h1>
                    <p>Criado em: 16/05/2023</p>
                </div>
                <ul className={styles.options}>
                    <li className={styles.geral}>Geral</li>
                    <li className={styles.clima}>Clima</li>
                    <li className={styles.ndvi}>NDVI</li>
                    <li className={styles.uv}>UV</li>
                </ul>
            </nav>
            <div className={styles.mainContent}>
                <img src={terreno.imagem} className={styles.imagem}/>
                <div className={styles.info}>
                    <div className={styles.clima}>
                        <div className={styles.climaHoje}>
                            <div className={styles.climaText}>
                                <p>Hoje</p>
                                <p className={styles.temperatura}>{terreno.hectares} ºC</p>
                            </div>
                            <BiSolidSun className={styles.icon}/>
                        </div>
                        <p>{terreno.cidade}, {terreno.estado}</p>
                    </div>
                    <div className={styles.solo}>
                        <p>SOLO</p>
                    </div>
                    <div className={styles.historico}>
                        <p>HISTORICO</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
