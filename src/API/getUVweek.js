import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getUVweek = async (polygonId) => {
    const currentTimestamp = Date.now();

    const end = currentTimestamp - 24 * 60 * 60 * 1000; // 1 dia antes
    const start = end - 7 * 24 * 60 * 60 * 1000; // 7 dias antes
    const days = 7
    try {
        //const uvUrl = `http://api.agromonitoring.com/agro/1.0/uvi/history?polyid=${polygonId}&appid=${TokenAgroMonitoring}&start=${start}&end=${end}`
        const uvUrl = `http://api.agromonitoring.com/agro/1.0/uvi/forecast?polyid=${polygonId}&cnt=${days}&appid=${TokenAgroMonitoring}`
        const response = await axios.get(uvUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do UV Historico:', error);
        console.log('ERRO')
        throw error;
    }
};