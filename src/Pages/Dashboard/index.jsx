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

export default function Dashboard() {

  const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
  mapboxgl.accessToken = TOKEN_MAPBOX;

  const [terrenosFiltrados, setTerrenosFiltrados] = useState([
    {
      id: '',
      nome: '',
      center: ['', ''],
      area: ''
    }
  ])

  const [urlImagemTerreno, setUrlImagemTerreno] = useState('')

  const [terrenos, setPolygons] = useState([])
  const [imagemTerrenos, setImagemTerrenos] = useState([])
  const [mapas, setMapas] = useState([])

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
    };

    const fetchDataImages = async (polygonsData) => {
      // try {
      //   const imagensPromises = polygonsData.map(terreno => getImages(terreno.id));
      //   const imagensResponses = await Promise.all(imagensPromises);

      //   const novoImagemTerrenos = imagensResponses.reduce((acc, imagemResponse, index) => {
      //     acc = { ...acc, ...imagemResponse };
      //     return acc;
      //   }, {});

      //   setImagemTerrenos(novoImagemTerrenos);
      // } catch (error) {
      //   console.error('Erro ao buscar dados:', error);
      // }

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
            ;
        });
        setMapas(novosMapas);
      };

      mapasPromise();

    };
    fetchDataPolygons()
      .then(fetchDataImages)
      .catch(error => console.error('Erro durante o encadeamento:', error));
  }, []);

  const navigate = useNavigate()

  console.log(mapas)

  // Abordagem 1
  // const geojson = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {
  //       type: 'Feature', geometry: {
  //         type: 'Polygon', coordinates: [
  //           [
  //             [-67.13734, 45.13745],
  //             [-66.96466, 44.8097],
  //             [-68.03252, 44.3252],
  //             [-69.06, 43.98],
  //             [-70.11617, 43.68405],
  //             [-70.64573, 43.09008],
  //             [-70.75102, 43.08003],
  //             [-70.79761, 43.21973],
  //             [-70.98176, 43.36789],
  //             [-70.94416, 43.46633],
  //             [-71.08482, 45.30524],
  //             [-70.66002, 45.46022],
  //             [-70.30495, 45.91479],
  //             [-70.00014, 46.69317],
  //             [-69.23708, 47.44777],
  //             [-68.90478, 47.18479],
  //             [-68.2343, 47.35462],
  //             [-67.79035, 47.06624],
  //             [-67.79141, 45.70258],
  //             [-67.13734, 45.13745]
  //           ]
  //         ]
  //       }
  //     }
  //   ]
  // };

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
                    <Layer {...layerStyle}/>
                  </Source>
                </Map>

                <div className={styles.info}>
                  <p>Hectares: {terreno.area} ha</p>
                  <p>Temperatura:  ºC</p>
                  <p>{terreno.cidade}, {terreno.estado}</p>
                  <button className={styles.buttonOpen} onClick={() => navigate(`/terreno/${terreno.id}`, { state: { terreno } } )}>Exibir</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )

}
