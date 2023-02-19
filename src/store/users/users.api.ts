import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'users/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + 'api/users/',
  }),
  endpoints: (build) => ({
    list: build.query<any[], void>({
      query: () => 'list',
    }),
  }),
});

export const { useListQuery } = usersApi;
