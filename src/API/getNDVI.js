import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getNDVI = async (polygonId) => {
    const currentTimestamp = Date.now()/1000;
    
    const end = currentTimestamp - 86400 // 1 dia antes
    const start = end - 2629743 //30 dias antes
    try {
        //const ndvilUrl = `https://samples.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polygonId}&start=${start}&end=${end}&appid=${TokenAgroMonitoring}`
        const ndvilUrl = `http://api.agromonitoring.com/agro/1.0/ndvi/history?start=${start}&end=${end}&polyid=${polygonId}&appid=${TokenAgroMonitoring}`
        const response = await axios.get(ndvilUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do NDVI:', error);
        console.log('ERRO')
        throw error;
    }
};