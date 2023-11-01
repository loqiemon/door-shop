import axios from 'axios';
import { API_URL } from '../shared/const/constants';

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log(error, 'originalRequest')
    if (originalRequest.url !== `${API_URL}Auth/login` && err.response) {
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                console.log('_isRetry')
                const response = await axios.post(`${API_URL}Auth/refreshtoken`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                    accessToken: localStorage.getItem('accessToken')
                })
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }
    }
    throw error;
})

export default $api;