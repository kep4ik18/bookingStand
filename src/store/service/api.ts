import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { authRedirectQuery } from "../auth";

export const baseApi = createApi({
  baseQuery: authRedirectQuery(
    fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
      credentials: "include",
    })
  ),
  endpoints: () => ({}),
  reducerPath: "baseApi",
});
