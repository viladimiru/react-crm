import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.slice';
import { catsApi } from './cats/cats.api';
import { catsReducer } from './cats/cats.slice';
import { githubApi } from './github/github.api';

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
		[catsApi.reducerPath]: catsApi.reducer,
		favouriteCats: catsReducer,
		isAuthed: authReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat([githubApi.middleware, catsApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>