import styles from './TelaCadastro.module.sass'
import image from '../../../../public/image.png'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

// Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'

// Axios
import axios from "axios"

// Map draw
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

export default function Cadastro() {
    const navigate = useNavigate()
    const TOKEN = 'pk.eyJ1Ijoiamdsb2JvIiwiYSI6ImNsb3gwMHA0MDEzNnMyaW8xcDY5cjQyZDUifQ.eA1zxvIi2SxQW6obP29Apg'

    // Temporário para pegar o ultimo ID de terrenos
    const url = 'http://localhost:3000/terreno'
    const [terrenos, setTerrenos] = useState([])
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTerrenos((response.data))
            })
            .catch(error => console.log(error))
    }, [terrenos])
    const id = terrenos.length + 1
    const nome = `Terreno #${terrenos.length + 1}`

    const handleSave = () => {
        axios.post('http://localhost:3000/terreno', {
            id: id,
            nome: nome,
            hectares: 42,
            cidade: 'Sorriso',
            estado: 'Mato Grosso',
            pais: 'Brasil',
            imagem: 'https://cataas.com/cat',
            latitude: '-20.329511',
            longitude: '-40.287098',
            clima: {
                temperaturaHoje: 28,
                temperaturaSuperficie: 22,
                temperaturaSoloAbaixo: 20,
                umidadeSolo: 0.1
            },
            ndvi: {
                max: 0.78,
                mean: 0.28,
                median: 0.20,
                min: 0.06,
                deviation: 0.21,
                num: 46773
            },
            uv: {
                max: 0.9,
                mean: 0.6,
                median: 0.58,
                min: 0.32,
                deviation: 0.21,
                num: 1238
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    mapboxgl.accessToken = 'pk.eyJ1Ijoiamdsb2JvIiwiYSI6ImNsb3gwMHA0MDEzNnMyaW8xcDY5cjQyZDUifQ.eA1zxvIi2SxQW6obP29Apg';
    setTimeout(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    }, 100);


    return (
        <div className={styles.main}>
            <h1>Novo Terreno</h1>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={image} className={styles.map}/>
                    {/* <div id='map' className={styles.map}></div> */}
                </div>
                <div className={styles.form}>
                    <input type="text" placeholder='Nome' />
                    <input type="number" placeholder='Aréa (Em hectares)' />
                    <AlertDialog.Action>
                        <Button onClick={() => handleSave()}>Salvar</Button>
                    </AlertDialog.Action>
                </div>
            </div>
        </div>
    )
}
