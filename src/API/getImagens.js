import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getImages = async (terrenoId) => {
    try {
      const start = '1483218000';  
      const end = '1700066763'; 
      const imageUrl = `http://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${terrenoId}&appid=${TokenAgroMonitoring}`;
      const response = await axios.get(imageUrl);
      //const tipoImagem = Object.keys(response.data)[0];
      //return { [tipoImagem]: response.data[tipoImagem].url };
      return response.data[(response.data).length - 1];
    } catch (error) {
      console.error('Erro ao obter URLs das imagens:', error);
      console.log('ERRO')
      throw error;
    }
  };