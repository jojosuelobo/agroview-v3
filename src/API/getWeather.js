import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING
const TokenOpenWeather = import.meta.env.VITE_TOKEN_OPENWEATHER

export const getWeather = async (terrenoCoord) => {
    try {
      const lat = terrenoCoord[1]  
      const lon = terrenoCoord[0]  
      const weatherUrl = `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${TokenAgroMonitoring}                                 `;
      const response = await axios.get(weatherUrl);
      //const tipoImagem = Object.keys(response.data)[0];
      //return { [tipoImagem]: response.data[tipoImagem].url };
      return response.data;
    } catch (error) {
      console.error('Erro ao obter Dados de clima do terreno:', error);
      console.log('ERRO')
      throw error;
    }
  }
  
  export const getWeatherForecast = async (terrenoCoord) => {
    try {
      const lat = terrenoCoord[1]  
      const lon = terrenoCoord[0]  
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${TokenOpenWeather}                                 `;
      const response = await axios.get(weatherUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter Dados de clima do terreno:', error);
      console.log('ERRO')
      throw error;
    }
  };