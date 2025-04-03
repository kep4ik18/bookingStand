import axios from 'axios';
import { store } from '../../store/store';
import { logout } from '../../features/auth/model/authSlice';

const BASE_URL = 'https://auth.stg.corp.1440.space/realms/empaas/protocol/openid-connect';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Функция для авторизации через Keycloak
export const loginWithKeycloak = async (username: string, password: string, clientSecret: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', 'rack-reservation-service');
  params.append('client_secret', clientSecret);
  params.append('username', username);
  params.append('password', password);

  const response = await api.post('/token', params);
  return response.data;
};

// API для работы со стойками
export const standApi = axios.create({
  baseURL: 'https://gl.1440.space/empaas/go/projects/rack-reservation-service/api', // Замени на реальный URL API стоек
});

// Добавляем токен в заголовки всех запросов
standApi.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

standApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен истек, разлогиниваем пользователя
      store.dispatch(logout());
      // Перенаправляем на страницу логина
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);