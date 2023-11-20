/* eslint-disable no-unused-vars */
import styles from './NDVI.module.sass'

// Icons
import { AiFillCalendar } from 'react-icons/ai'

// Axios
import axios from 'axios'

// React
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Moment
import moment from 'moment';

// Apis
import { getNDVI } from '../../../API/getNDVI'

// Map
import Map, { Source, Layer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css"

// Graficos
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

export default function NDVI({ terreno }) {
  const { id } = useParams()
  const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
  mapboxgl.accessToken = TOKEN_MAPBOX;

  const [ndvi, setNDVI] = useState([])

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
    const fetchNDVI = async () => {
      try {
        const ndviData = await getNDVI(terreno.id);
        setNDVI(ndviData);
        return ndviData;
      } catch (error) {
        console.error('Erros de fetch fetchNDVI:', error);
        throw error; // Propague o erro para interromper a execução
      }
    }

    const createGraph = () => {
      const ctx = document.getElementById('myChart')
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      // Criação do gráfico
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    fetchNDVI()
      .then(createGraph)
      .catch(error => console.error('Erro durante o encadeamento:', error));
  }, [])

  const dataAtual = moment().format('DD/MM/YYYY');

  console.log(ndvi)

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.info}>
          <div className={styles.ndvi}>
            <div className={styles.image} id='DEUSFIEL'>
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
            <div className={styles.data}>
              <h3 className={styles.date}>{dataAtual}</h3>
              <ul className={styles.list}>
                <li>
                  <p>Max</p>
                  <p>{(ndvi[0]?.data?.max)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Mean</p>
                  <p>{(ndvi[0]?.data?.mean)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Média</p>
                  <p>{(ndvi[0]?.data?.median)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Min</p>
                  <p>{(ndvi[0]?.data?.min)?.toFixed(2)}</p>
                </li>
              </ul>

              <h3 className={styles.date}>{dataAtual}</h3>
              <ul className={styles.list}>
                <li>
                  <p>Max</p>
                  <p>{(ndvi[0]?.data?.max)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Mean</p>
                  <p>{(ndvi[0]?.data?.mean)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Média</p>
                  <p>{(ndvi[0]?.data?.median)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Min</p>
                  <p>{(ndvi[0]?.data?.min)?.toFixed(2)}</p>
                </li>
              </ul>

              <h3 className={styles.date}>{dataAtual}</h3>
              <ul className={styles.list}>
                <li>
                  <p>Max</p>
                  <p>{(ndvi[0]?.data?.max)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Mean</p>
                  <p>{(ndvi[0]?.data?.mean)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Média</p>
                  <p>{(ndvi[0]?.data?.median)?.toFixed(2)}</p>
                </li>
                <li>
                  <p>Min</p>
                  <p>{(ndvi[0]?.data?.min)?.toFixed(2)}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.graficos}>
        <div>
          <canvas id="myChart" width="600" height="600"></canvas>
        </div>
      </div>
    </>
  )
}
