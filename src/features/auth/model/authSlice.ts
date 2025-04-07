import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, setError, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginWithKeycloak } from "../../../shared/api";

// interface AuthState {
//   token: string | null; // Токен авторизации
//   isAuthenticated: boolean; // Авторизован ли пользователь
//   loading: boolean; // Идет ли запрос
//   error: string | null; // Ошибка, если что-то пошло не так
// }

// const initialState: AuthState = {
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Асинхронный thunk для авторизации
// export const login = createAsyncThunk(
//   "auth/login",
//   async (
//     {
//       username,
//       password,
//       clientSecret,
//     }: { username: string; password: string; clientSecret: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await loginWithKeycloak(username, password, clientSecret);
//       return data.access_token; // Возвращаем только access_token
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.error_description || "Ошибка авторизации"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Действие для выхода из системы
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload; // Сохраняем токен
//         state.isAuthenticated = true; // Пользователь авторизован
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Экспортируем действия и редьюсер
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
