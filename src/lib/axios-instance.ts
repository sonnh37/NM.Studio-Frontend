import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE, 
    //timeout: 10000, 
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        config.headers['ngrok-skip-browser-warning'] = 'true';

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
