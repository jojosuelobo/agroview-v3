/* eslint-disable react/prop-types */
import styles from './Geral.module.sass'
import image from '../../../../public/image.png'

// Icons
import { BiSolidSun } from 'react-icons/bi'
import { AiFillCalendar } from 'react-icons/ai'

// Axios
import axios from 'axios'

// React
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Apis
import { getWeather } from '../../../API/getWeather'
import { getLocalization } from '../../../API/getLocalization'

// Map
import Map, { Source, Layer } from 'react-map-gl';
//import { CircleLayer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css"

export default function Geral({ terreno }) {
    const { id } = useParams()
    const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
    mapboxgl.accessToken = TOKEN_MAPBOX;

    const [climaTerreno, setClimaTerreno] = useState([])
    const [endereco, setEndereco] = useState([])
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: terreno.geo_json.geometry.coordinates
                }
            }
        ]
    };

    const layerStyle = {
        id: 'maine',
        type: 'fill',
        source: 'maine',
        paint: {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherData = await getWeather(terreno.center);
                setClimaTerreno(weatherData);
                return weatherData;
            } catch (error) {
                console.error('Erros de fetch weather:', error);
                throw error; // Propague o erro para interromper a execução
            }
        }
        const fetchLocalization = async () => {
            try {
                const localizationData = await getLocalization(terreno.center)
                setEndereco(localizationData)
                setCidade(localizationData.features[0].properties.city)
                setEstado(localizationData.features[0].properties.county)
                return localizationData
            } catch (error) {
                console.error('Erros de fetch weather:', error);
                throw error; // Propague o erro para interromper a execução
            }
        }

        fetchWeather()
            .then(fetchLocalization)
            .catch(error => console.error('Erro durante o encadeamento:', error));
    }, [])

    //console.log(`${terreno.center}`)
    //console.log(climaTerreno)
    //console.log(endereco)

    const celsius = parseInt((climaTerreno?.main?.temp - 273.15).toFixed(2));

    return (
        <div className={styles.mainContent} id='DEUSFIEL'>
            {/* <img src={image} className={styles.imagem} /> */}
            <div className={styles.imagem} >
                <Map id='mapaGeral'
                    mapLib={import('mapbox-gl')}
                    initialViewState={{
                        longitude: terreno.center[0],
                        latitude: terreno.center[1],
                        zoom: 16
                    }}
                    mapStyle="mapbox://styles/mapbox/satellite-v9"
                >
                    <Source id="my-data" type="geojson" data={geojson}>
                        <Layer {...layerStyle} />
                    </Source>
                </Map>
            </div>
            <div className={styles.info}>
                <div className={styles.clima}>
                    <div className={styles.climaHoje}>
                        <div className={styles.climaText}>
                            <p>Hoje</p>
                            <p className={styles.temperatura}> {celsius} ºC</p>
                        </div>
                        <BiSolidSun className={styles.icon} />
                    </div>
                    <p>{cidade}, {estado}</p>
                </div>
                <div className={styles.solo}>
                    <h1>Informações do Solo</h1>
                    <ul className={styles.info}>
                        <li>
                            <p>Temperatura na superfície</p>
                            <h2>{terreno?.clima?.temperaturaSuperficie} ºC</h2>
                        </li>
                        <li>
                            <p>Temperatura na 10cm abaixo</p>
                            <h2>{terreno?.clima?.temperaturaSoloAbaixo} ºC</h2>
                        </li>
                        <li>
                            <p>Umidade do solo</p>
                            <h2>{terreno?.clima?.umidadeSolo} ºC</h2>
                        </li>
                    </ul>
                </div>
                <div className={styles.historico}>
                    <h1>Calendário</h1>
                    <AiFillCalendar className={styles.icon} />
                </div>
            </div>
        </div>
    )
}
