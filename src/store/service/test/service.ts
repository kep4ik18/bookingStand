import { baseApi } from "../api";

export const testService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentsList: builder.query<any, void>({
      query: () => ({
        url: `/v1/agents`,
      }),
    }),
  }),
});

export const { useGetAgentsListQuery } = testService;
