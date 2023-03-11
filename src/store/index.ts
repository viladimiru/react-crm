import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.slice';
import { feedbackApi } from './feedback/feedback.api';
import { usersApi } from './users/users.api';

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[feedbackApi.reducerPath]: feedbackApi.reducer,
		isAuthed: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			usersApi.middleware,
			feedbackApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
