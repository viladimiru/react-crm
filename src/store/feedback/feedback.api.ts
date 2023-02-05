import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
	reducerPath: 'users/api',
	baseQuery: fetchBaseQuery({ 
		baseUrl: 'https://www.flamingo-house.top/api/feedback/',
	}),
	endpoints: (build) => ({
		list: build.query<any[], void>({
			query: () => 'list'
		}),
	}),
});

export const {  useListQuery } = feedbackApi;
