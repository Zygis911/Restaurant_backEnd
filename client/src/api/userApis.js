import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/library/';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const registerUser = (userData) => {
  return apiClient.post('/users/register', userData)
};