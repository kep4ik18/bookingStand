import axios from 'axios';
// import { store } from '../../store/store';
import { store } from '../../app/store/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': ' application/x-www-form-urlencoded',
  },
});

// Добавляем токен в заголовки всех запросов
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Функция для авторизации через Keycloak
// export const loginWithKeycloak = async (username: string, password: string, clientSecret: string) => {
//   const params = new URLSearchParams();
//   params.append('grant_type', 'password');
//   params.append('client_id', 'rack-reservation-service');
//   params.append('client_secret', clientSecret);
//   params.append('username', username);
//   params.append('password', password);

//   const response = await axiosInstance.post('/token', params);
//   return response.data;
// };

// // API для работы со стойками
// export const standApi = axios.create({
//   baseURL: 'https://gl.1440.space/empaas/go/projects/rack-reservation-service/api', // Замени на реальный URL API стоек
// });


// standApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Если токен истек, разлогиниваем пользователя
//       store.dispatch(logout());
//       // Перенаправляем на страницу логина
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );