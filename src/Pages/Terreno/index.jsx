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
import { useLocation } from 'react-router-dom';

// Components
import Geral from '../../Components/TerrenoOptions/Geral'
import Clima from '../../Components/TerrenoOptions/Clima'
import NDVI from '../../Components/TerrenoOptions/NDVI'
import UV from '../../Components/TerrenoOptions/UV'

// Apis
import { getWeather } from '../../API/getWeather'

export default function Terreno() {
    const navigate = useNavigate()
    const [aba, setAba] = useState('Geral')

    const { id } = useParams()
    const { state: { terreno } } = useLocation();


    return (
        <div className={styles.content}>
            <nav className={styles.header}>
                <div className={styles.textHeader}>
                    <h1> <TbArrowBack className={styles.icon} onClick={() => navigate('/')} /> {terreno.name} </h1>
                </div>
                <ul className={styles.options}>
                    <li className={styles.geral} onClick={() => setAba('Geral')}>Geral</li>
                    <li className={styles.clima} onClick={() => setAba('Clima')}>Clima</li>
                    <li className={styles.ndvi} onClick={() => setAba('NDVI')}>NDVI</li>
                    <li className={styles.uv} onClick={() => setAba('UV')}>UV</li>
                </ul>
            </nav>
            <div className={styles.mainContent}>
                {
                    aba === 'Geral' ? <Geral terreno={terreno} /> :
                        aba === 'Clima' ? <Clima terreno={terreno} /> :
                            aba === 'NDVI' ? <NDVI terreno={terreno} /> :
                                <UV terreno={terreno} />
                }




                {/* <img src={terreno.imagem} className={styles.imagem}/>
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
                </div> */}
            </div>
        </div>
    )
}
