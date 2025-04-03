import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { applicationFilterSliceReducer } from "./slices/application-filter-slice/slice";
import { testService } from "./service/test/service";
export const store = configureStore({
  reducer: {
    applicationFilterSliceReducer,
    [testService.reducerPath]: testService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([testService.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
