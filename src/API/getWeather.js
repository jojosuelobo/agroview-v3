import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

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
      console.error('Erro ao obter URLs das imagens:', error);
      console.log('ERRO')
      throw error;
    }
  };