import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getUV = async (polygonId) => {
    try {
        const uvUrl = `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polygonId}&appid=${TokenAgroMonitoring}`
        const response = await axios.get(uvUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do UV:', error);
        console.log('ERRO')
        throw error;
    }
};