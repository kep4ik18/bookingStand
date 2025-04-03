import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithKeycloak } from "../../../shared/api";

// Определяем тип состояния
interface AuthState {
  token: string | null; // Токен авторизации
  isAuthenticated: boolean; // Авторизован ли пользователь
  loading: boolean; // Идет ли запрос
  error: string | null; // Ошибка, если что-то пошло не так
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Асинхронный thunk для авторизации
export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
      clientSecret,
    }: { username: string; password: string; clientSecret: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginWithKeycloak(username, password, clientSecret);
      return data.access_token; // Возвращаем только access_token
    } catch (error: any) {
      // Если ошибка, возвращаем её текст
      return rejectWithValue(
        error.response?.data?.error_description || "Ошибка авторизации"
      );
    }
  }
);

// Создаем слайс
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Действие для выхода из системы
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Когда запрос начинается
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Когда запрос успешен
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Сохраняем токен
        state.isAuthenticated = true; // Пользователь авторизован
      })
      // Когда запрос завершился с ошибкой
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем ошибку
      });
  },
});

// Экспортируем действия и редьюсер
export const { logout } = authSlice.actions;
export default authSlice.reducer;
