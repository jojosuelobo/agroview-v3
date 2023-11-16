import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getNDVI = async (polygonId) => {
    const currentTimestamp = Date.now();

    const end = currentTimestamp - 24 * 60 * 60 * 1000; // 1 dia antes
    const start = end - 7 * 24 * 60 * 60 * 1000; // 7 dias antes
    try {
        const ndvilUrl = `https://samples.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polygonId}&start=${start}&end=${end}&appid=${TokenAgroMonitoring}`
        console.group(ndvilUrl)

        const response = await axios.get(ndvilUrl);
        //const tipoImagem = Object.keys(response.data)[0];
        //return { [tipoImagem]: response.data[tipoImagem].url };
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do NDVI:', error);
        console.log('ERRO')
        throw error;
    }
};