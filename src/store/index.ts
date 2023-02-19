import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.slice';
import { catsApi } from './cats/cats.api';
import { catsReducer } from './cats/cats.slice';
import { feedbackApi } from './feedback/feedback.api';
import { githubApi } from './github/github.api';
import { usersApi } from './users/users.api';

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
		[catsApi.reducerPath]: catsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[feedbackApi.reducerPath]: feedbackApi.reducer,
		favouriteCats: catsReducer,
		isAuthed: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			githubApi.middleware,
			catsApi.middleware,
			usersApi.middleware,
			feedbackApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
