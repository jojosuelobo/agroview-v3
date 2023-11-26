import styles from './UV.module.sass'

// Icons
import { AiFillCalendar } from 'react-icons/ai'

// Axios
import axios from 'axios'

// React
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Apis
import { getUV } from '../../../API/getUV'
import { getUV2 } from '../../../API/getUV2'
import { getUVweek } from '../../../API/getUVweek'

// Map
import Map, { Source, Layer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css"

// Graph
import Chart from 'chart.js/auto'

import 'balloon-css';

export default function UV({ terreno }) {
  const { id } = useParams()

  const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
  mapboxgl.accessToken = TOKEN_MAPBOX;

  const [uv, setUV] = useState([])
  const [uvData, setUVdata] = useState([])

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
      'fill-color': '#00ff77',
      'fill-opacity': 0.8,
    }
  };

  useEffect(() => {
    const fetchUV = async () => {
      try {
        const uvData = await getUV(terreno.id);
        setUV(uvData);
        return uvData;
      } catch (error) {
        console.error('Erros de fetch UV:', error);
        throw error; // Propague o erro para interromper a execução
      }
    }
    const fetchUV2 = async () => {
      try {
        const uvData = await getUV2(terreno.center);
        setUVdata(uvData);
        return uvData;
      } catch (error) {
        console.error('Erros de fetch UV:', error);
        throw error; // Propague o erro para interromper a execução
      }
    }
    fetchUV()
      //.then(fetchUV2)
      .catch(error => console.error('Erro durante o encadeamento:', error));
  }, [])

  function formatAsPercentage(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  }

  console.log(uv)
  console.log(uvData)

  return (
    <div className={styles.mainContent}>

      <div className={styles.info}>

        <div className={styles.uv}>
          <div id='DEUSFIEL'>
            <Map id='mapaGeral'
              mapLib={import('mapbox-gl')}
              initialViewState={{
                longitude: terreno.center[0],
                latitude: terreno.center[1],
                zoom: 15
              }}
              mapStyle="mapbox://styles/mapbox/satellite-v9"
            >
              <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
              </Source>
            </Map>
          </div>
          <div className={styles.dados}>
            <div className={styles.data}>
              <p
                aria-label="Medida dos níveis da radiação solar ultravioleta que efetivamente contribui para a formação de uma queimadura na pele"
                data-balloon-pos="up"
              >
                Nível UVI: {formatAsPercentage(uv.uvi)}
              </p>
              <p
                aria-label="Medida dos níveis da radiação solar ultravioleta que efetivamente contribui para a formação de uma queimadura na pele"
                data-balloon-pos="up"
              >
                Nível UV: {uvData?.result?.uv ? uvData?.result?.uv : 2.65}
              </p>
              {
                (uvData?.result?.uv < 3) ? <p>Nível Baixo</p> :
                  (uvData?.result?.uv < 6) ? <p>Nível Moderado</p> :
                    (uvData?.result?.uv < 8) ? <p>Nível Alto</p> :
                      (uvData?.result?.uv < 11) ? <p>Nível Muito Alto</p> :
                        (uvData?.result?.uv > 11) ? <p>Nível Muito Alto</p> :
                          <p>Nível Baixo</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
