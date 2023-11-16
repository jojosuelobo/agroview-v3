import axios from 'axios';

/* eslint-disable no-unused-vars */
const TOKEN = import.meta.env.VITE_TOKEN_GEOAPIFY

export const getLocalization = async (coord) => {
      var requestOptions = {
        method: 'GET',
      }
      const lat = coord[1]
      const lon = coord[0]
      const urlGeoApify = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${TOKEN}`                    
      try{
        const response = await axios.get(urlGeoApify, requestOptions)
        return response.data
      } catch(error) {
        console.error('Error para fetch de localização:', error);
        throw error;
      }
}

