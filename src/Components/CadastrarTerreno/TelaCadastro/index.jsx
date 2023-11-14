/* eslint-disable no-unused-vars */
import styles from './TelaCadastro.module.sass'
import image from '../../../../public/image.png'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

// Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'

// Axios
import axios from "axios"

// Componets
import Mapa from '../../Mapa'

// Mapa
// Map draw
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from 'turf'
import "mapbox-gl/dist/mapbox-gl.css"


export default function Cadastro() {
    const navigate = useNavigate()
    const [nomeTerreno, setNomeTerreno] = useState('')
    const [coordsTerreno, setCoordsTerreno] = useState([])

    // Temporário para pegar o ultimo ID de terrenos
    const url = 'http://localhost:3000/terreno'
    const [terrenos, setTerrenos] = useState([])
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTerrenos((response.data))
            })
            .catch(error => console.log(error))
    }, [])
    const id = terrenos.length + 1
    const nome = `Terreno #${terrenos.length + 1}`

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoiamdsb2JvIiwiYSI6ImNsb3gwMHA0MDEzNnMyaW8xcDY5cjQyZDUifQ.eA1zxvIi2SxQW6obP29Apg';

        const existingMap = new mapboxgl.Map({ container: 'map' });
        if (existingMap) {
            existingMap.remove();
        }



        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 12, // starting zoom
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                polygon: true,
                trash: true
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon'
        });
        map.addControl(draw);

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        function updateArea(e) {
            const data = draw.getAll();
            const answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                const coords = JSON.stringify(data.features[0].geometry.coordinates[0])
                //console.log(coords)
                setCoordsTerreno(coords)
                //console.log(`DATA AQUI: ${JSON.stringify(data.features[0].geometry.coordinates[0])}`);
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        }

        return () => {
            map.removeControl(draw);
        }

    }, []);

    const terrenoCadastrado = {
        "name": nomeTerreno,
        "geo_json": {
            "type": "Feature",
            "properties": {

            },
            "geometry": {
                "type": "Polygon",
                "coordinates": coordsTerreno
            }
        }
    }

    //console.log(terrenoCadastrado)

    const handleSave = () => {
        console.log(terrenoCadastrado)
        // axios.post('http://localhost:3000/terreno', {
        //     id: id,
        //     nome: nome,
        //     hectares: 42,
        //     cidade: 'Sorriso',
        //     estado: 'Mato Grosso',
        //     pais: 'Brasil',
        //     imagem: 'https://cataas.com/cat',
        //     latitude: '-20.329511',
        //     longitude: '-40.287098',
        //     clima: {
        //         temperaturaHoje: 28,
        //         temperaturaSuperficie: 22,
        //         temperaturaSoloAbaixo: 20,
        //         umidadeSolo: 0.1
        //     },
        //     ndvi: {
        //         max: 0.78,
        //         mean: 0.28,
        //         median: 0.20,
        //         min: 0.06,
        //         deviation: 0.21,
        //         num: 46773
        //     },
        //     uv: {
        //         max: 0.9,
        //         mean: 0.6,
        //         median: 0.58,
        //         min: 0.32,
        //         deviation: 0.21,
        //         num: 1238
        //     }
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    return (
        <div className={styles.main} >
            <h1>Novo Terreno</h1>
            <div className={styles.content}>
                {/* <Mapa /> */}
                <div id='map' className='Mapa' />
                <div className={styles.form}>
                    <input type="text" placeholder='Nome' onChange={(e) => setNomeTerreno(e.target.value)} />
                    <AlertDialog.Action>
                        <Button onClick={() => handleSave()}>Salvar</Button>
                    </AlertDialog.Action>
                </div>
            </div>
        </div >
    )
}
