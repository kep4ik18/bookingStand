import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/react';

export function authRedirectQuery(
  baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    any,
    FetchBaseQueryMeta
  >,
) {
  const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (
      result.error &&
      // @ts-ignore
      (result.error.status === 401 || result.error.originalStatus === 401) &&
      result.meta?.response?.headers.has('x-gateway-auth-redirect')
    )
      window.location.replace(
        `${result.meta?.response?.headers.get('x-gateway-auth-redirect')}`,
      );
    return result;
  };
  return baseQueryWithAuth;
}
