import axios from "axios"

const api = axios.create({
    baseURL: 'https://vpack-ecomerce.onrender.com',
});

export default api;