import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface Auth {
	isAuthed: boolean
}

const initialState: Auth = {
	isAuthed: false
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuthed = action.payload
		}
	}
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions

export const selectAuth = (state: RootState) => state.isAuthed