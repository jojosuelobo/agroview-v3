import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getSoil = async (polygonId) => {
    try { 
      const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygonId}&appid=${TokenAgroMonitoring}`
      const response = await axios.get(soilUrl);
      //const tipoImagem = Object.keys(response.data)[0];
      //return { [tipoImagem]: response.data[tipoImagem].url };
      return response.data;
    } catch (error) {
      console.error('Erro ao obter dados do solo:', error);
      console.log('ERRO')
      throw error;
    }
  };