import axios from 'axios';

/* eslint-disable no-unused-vars */
const TokenAgroMonitoring = import.meta.env.VITE_TOKEN_AGROMONITORING

export const getPolygons = async () => {
    const urlApiMonitoring = `http://api.agromonitoring.com/agro/1.0/polygons?appid=${TokenAgroMonitoring}`;
    try {
        const response = await axios.get(urlApiMonitoring);
        return response.data;
      } catch (error) {
        console.error('Error fetching polygons:', error);
        throw error;
      }
}