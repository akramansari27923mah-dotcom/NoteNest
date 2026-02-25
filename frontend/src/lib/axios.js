import axios from "axios";
const SER = import.meta.env.VITE_API_URL
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001/api' : `${SER}/api`
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default axiosInstance

