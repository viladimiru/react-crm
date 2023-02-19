import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat, CatsArgs } from './ICats';

export const catsApi = createApi({
	reducerPath: 'cats/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.thecatapi.com/v1/',
		headers: {
			Authentication:
				'live_czBN36PSy9Cx1eLvSSGorbGsZktSMMwKsVCst9tSB7mi7xU8MpEYUO8C8H0avJsi',
		},
	}),
	endpoints: (build) => ({
		getCats: build.query<Cat[], CatsArgs>({
			query: (args: object) => ({
				url: 'images/search',
				params: args,
			}),
		}),
	}),
});

export const { useGetCatsQuery, util: catsUtil } = catsApi;
