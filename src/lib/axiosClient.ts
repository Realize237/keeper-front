import axios from 'axios';
import { env } from '../utils/env';
import { storage } from '../utils/storage';

export const axiosClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const language = storage.get<string>('i18nextLng', 'fr');
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.statusCode === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
