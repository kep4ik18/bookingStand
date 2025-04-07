import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testApi } from "../api/testApi";
import { RootState } from "../../../app/store/store";

interface TestState {
  rackId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
  rackId: null,
  loading: false,
  error: null,
};

// Создаём санку для отправки запроса
export const sendTestRequest = createAsyncThunk<
  string, // Возвращаемое значение (rackId)
  { name: string }, // Аргумент (данные для запроса)
  { state: RootState; rejectValue: string }
>("test/sendTestRequest", async (data, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  if (!token) {
    return rejectWithValue("Вы не авторизованы");
  }

  try {
    const response = await testApi(data, token);
    return response.rackId;
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка при выполнении запроса");
  }
});

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    resetTestState(state) {
      state.rackId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTestRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendTestRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.rackId = action.payload;
      })
      .addCase(sendTestRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTestState } = testSlice.actions;
export default testSlice.reducer;
