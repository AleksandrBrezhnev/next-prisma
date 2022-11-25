import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_HOST,
});

  axiosInstance.interceptors.request.use((config) => {

    config.params = config.params || {};
    config.params['api_key'] = 'ZQDbXxjOxUYk2UzxNmGobucLsLO7ZdGkgHAdEXB1';
    return config;
});

  export default axiosInstance;