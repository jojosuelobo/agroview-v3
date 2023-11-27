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

// Components
import Deletar from '../../Components/DeletarTerreno';

// Map
import Map, { Source, Layer } from 'react-map-gl';
//import { CircleLayer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css"

//APIs
import { getPolygons } from '../../API/getPolygons';
import { getImages } from '../../API/getImagens';
import { getLocalization } from '../../API/getLocalization';
import { getWeather } from '../../API/getWeather';

export default function Dashboard() {

  const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
  mapboxgl.accessToken = TOKEN_MAPBOX;

  const [urlImagemTerreno, setUrlImagemTerreno] = useState('')

  const [terrenos, setPolygons] = useState([])
  const [imagemTerrenos, setImagemTerrenos] = useState([])
  const [mapas, setMapas] = useState([])
  const [loc, setLoc] = useState([])

  const [climaTerreno, setClimaTerreno] = useState([])
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    const fetchDataPolygons = async () => {
      try {
        const polygonsData = await getPolygons();
        setPolygons(polygonsData);
        return polygonsData; // Retorne os dados para encadear o then
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propague o erro para interromper a execução
      }
    }

    const fetchDataImages = async (polygonsData) => {
      const mapasPromise = () => {
        const novosMapas = polygonsData.map(terreno => {
          
          return {
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
          }
        });
        setMapas(novosMapas);
      };

      const tempPromise = async () => {
        for (const terrenoItem of terrenos) {
          const center = terrenoItem.center;
          const weatherData = await getWeather(center)

          setClimaTerreno(weatherData)
          console.log(climaTerreno)
        }
      }

      mapasPromise();
      tempPromise()
    };

    fetchDataPolygons()
      .then(fetchDataImages)
      .catch(error => console.error('Erro durante o encadeamento:', error));

  }, []);

  const navigate = useNavigate()
  console.log(climaTerreno)

  const layerStyle = {
    id: 'maine',
    type: 'fill',
    source: 'maine',
    paint: {
      'fill-color': '#0080ff',
      'fill-opacity': 0.5
    }
  };

  return (
    <div className={styles.dashboard}>

      <div className={styles.list}>
        {terrenos.length === 0 ? (
          <img src={vazio} />
        ) : (
          terrenos.map((terreno, index) =>
            <div className={styles.terreno} key={terreno.id} id='DEUSFIEL'>
              <nav>
                <HiOutlineArrowsExpand className={styles.icon} />
                <h1>{terreno.name}</h1>
                <div className={styles.crud}>
                  {/*<TiDeleteOutline className={styles.icon_delete} />*/}
                  <Deletar terreno={terreno} />
                  <AiOutlineEdit className={styles.icon_edit} />
                </div>
              </nav>
              <div className={styles.content}>

                <Map id='mapDash'
                  mapLib={import('mapbox-gl')}
                  initialViewState={{
                    longitude: terreno.center[0],
                    latitude: terreno.center[1],
                    zoom: 15
                  }}
                  mapStyle="mapbox://styles/mapbox/satellite-v9"
                >
                  <Source id="my-data" type="geojson" data={mapas[index]}>
                    <Layer {...layerStyle} />
                  </Source>
                </Map>

                <div className={styles.info}>
                  <p>Hectares: {parseInt(terreno.area)} ha</p>
                  {/* <p>Temperatura: {climaTerreno[index]} ºC</p>
                  <p>{cidade}, {estado}</p> */}
                  <button className={styles.buttonOpen} onClick={() => navigate(`/terreno/${terreno.id}`, { state: { terreno } })}>Exibir</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )

}
