import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getPolygonById = async (polygonId) => {
    const urlApiMonitoring = `http://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${TokenAgroMonitoring}`;                    
    try {
        const response = await axios.get(urlApiMonitoring);
        return response.data;
      } catch (error) {
        console.error('Error fetching polygon:', error);
        throw error;
      }
}