import axios from 'axios';

/* eslint-disable no-unused-vars */
const TOKEN = import.meta.env.VITE_TOKEN_OPENUV

export const getUV2 = async (coords) => {
    const lat = coords[1]
    const lon = coords[0]

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", `${TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}g&alt=0&dt=`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    try {
        const uvUrl = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}g&alt=0&dt=`
        const response = await axios.get(uvUrl, {
            headers: {
                'x-access-token': TOKEN,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do UV em OpenUV:', error);
        console.log('ERRO')
        throw error;
    }
};