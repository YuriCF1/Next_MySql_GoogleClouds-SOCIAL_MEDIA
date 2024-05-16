import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'http://localhost:8001/api/',
    withCredentials: true //Libera uso de cookies entre páginas diferentes
})