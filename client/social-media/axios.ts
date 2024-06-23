import axios from 'axios';

export const makeRequest = axios.create({
    // baseURL: 'http://localhost:8001/api/', //Local server
    baseURL: "https://next-my-sql-57iw.vercel.app/api/", //Vercel server
    withCredentials: true, //Libera uso de cookies entre páginas diferentes,
})
