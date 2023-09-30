/* eslint-disable no-unused-vars */
import axios from "axios";

export function getNotifications(url)
{
    axios.get(url)
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error))
}
