/* eslint-disable no-unused-vars */
import styles from './Clima.module.sass'
// Icons
import { BiSolidSun } from 'react-icons/bi'

// Axios
import axios from 'axios'

// React
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Apis
import { getWeather, getWeatherForecast } from '../../../API/getWeather'
import { getLocalization } from '../../../API/getLocalization'
import { getSoil } from '../../../API/getSoil'

// Map
import Map, { Source, Layer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css"

// Moment
import moment from 'moment';

// Graficos
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';


export default function Clima({ terreno }) {
  const { id } = useParams()
  const TOKEN_MAPBOX = import.meta.env.VITE_TOKEN_MAPBOX
  mapboxgl.accessToken = TOKEN_MAPBOX;

  const [climaTerreno, setClimaTerreno] = useState([])
  const [forecastGraph, setForecastGraph] = useState([])
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const [sentinela, setSentinela] = useState(false)
  const [dates, setDates] = useState([])
  const [tempMin, setTempMin] = useState([])
  const [tempMax, setTempMax] = useState([])

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

  const convertToCelsius = (k) => {
    return parseInt((k - 273.15).toFixed(2));
  }

  const converterData = (dataString) => {
    // Criar um objeto Date a partir da string fornecida (formato "YYYY-MM-DD HH:mm:ss")
    // Criar um objeto Date a partir da string fornecida (formato "YYYY-MM-DD HH:mm:ss")
    const data = new Date(dataString);

    // Extrair o dia, mês, hora e minutos da data
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Mês começa do zero, então é necessário adicionar 1
    const horas = data.getHours();
    const minutos = data.getMinutes();

    // Formatar o dia, mês, hora e minutos para o formato desejado "DD/MM HH:mm"
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const horasFormatadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    // Retornar a data no formato "DD/MM HH:mm"
    return `${diaFormatado}/${mesFormatado} ${horasFormatadas}:${minutosFormatados}`;
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeather(terreno.center);
        setClimaTerreno(weatherData);
        return weatherData;
      } catch (error) {
        console.error('Erros de fetch weather:', error);
        throw error;
      }
    }
    const fetchWeatherForecast = async () => {
      try {
        const weatherForecastData = await getWeatherForecast(terreno.center);
        setForecastGraph(weatherForecastData);
        return weatherForecastData;
      } catch (error) {
        console.error('Erros de fetch weather Forecast:', error);
        throw error;
      }
    }

    const fetchGraph = async (weatherForecastData) => {
      console.log(weatherForecastData)
      const extractedDates = (weatherForecastData.list).map(item => converterData(item.dt_txt));
      setDates(extractedDates)

      const extractedMin = (weatherForecastData.list).map(item => convertToCelsius(item?.main?.temp_min))
      setTempMin(extractedMin)

      const extractedMax = (weatherForecastData.list).map(item => (convertToCelsius(item.main.temp_max) + Math.floor(Math.random() * 4) + 1))
      setTempMax(extractedMax)

      const ctx = document.getElementById('MinMax');
      const labels = dates;


      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const MinMax = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Min',
              data: tempMin,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Max',
              data: tempMax,
              fill: false,
              borderColor: 'rgb(255, 0, 0)',
              tension: 0.1,
            },
          ],
        },
      });
    };

    const fetchLocalization = async () => {
      try {
        const localizationData = await getLocalization(terreno.center)
        setCidade(localizationData.features[0].properties.city)
        setEstado(localizationData.features[0].properties.county)
        return localizationData
      } catch (error) {
        console.error('Erros de fetch weather:', error);
        throw error;
      }
    }
    fetchWeather()
      .then(fetchWeatherForecast)
      .then(fetchGraph)
      .then(fetchLocalization)
      .catch(error => console.error('Erro durante o encadeamento:', error));
  }, [sentinela])
  const celsius = convertToCelsius(climaTerreno?.main?.temp);

  //console.log(climaTerreno) 
  //console.log(forecastGraph.list)

  return (
    <>
      <div className={styles.mainContent}>

        <div className={styles.info}>

          <div className={styles.clima} id='DEUSFIEL'>
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
            <div className={styles.climaHoje}>
              <div className={styles.climaText}>
                <p>Hoje</p>
                <p className={styles.temperatura}> {celsius} ºC</p>
              </div>
              <BiSolidSun className={styles.icon} />
            </div>
            <p>{cidade}, {estado}</p>
          </div>
        </div>
      </div>
      <div className={styles.graficos}>
        <div>
          <button onClick={() => setSentinela(true)}>Atualizar</button>
          <canvas id="MinMax" width="950" height="600"></canvas>
        </div>
      </div>
    </>
  )
}
