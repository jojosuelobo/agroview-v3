/* eslint-disable no-unused-vars */
import styles from './Terreno.module.sass'

// Icons
import { TbArrowBack } from 'react-icons/tb'

// Axios
import axios from "axios";

// Hooks
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Terreno() {
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
                    <h1> <TbArrowBack className={styles.icon} /> {terreno.nome} </h1>
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
            </div>
        </div>
    )
}
