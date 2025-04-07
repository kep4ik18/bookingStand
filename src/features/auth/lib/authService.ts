import  keycloak  from '../../../shared/config/keycloak';
import { store } from '../../../app/store/store';
import { loginSuccess, logout } from '../model/authSlice';

// Инициализация аутентификации
export const initAuth = async () => {
  try {
    const authenticated = await keycloak.init({ onLoad: 'login-required' });
    if (authenticated) {
      store.dispatch(loginSuccess(keycloak.token!));
    }
  } catch (error) {
    console.error('Auth error:', error);
  }
};


setInterval(() => {
    if (keycloak.isTokenExpired()) {
      keycloak.updateToken(30).then(() => {
        store.dispatch(loginSuccess(keycloak.token!));
      });
    }
  }, 300000);

// Выход из системы
export const handleLogout = () => {
  keycloak.logout();
  store.dispatch(logout());
};