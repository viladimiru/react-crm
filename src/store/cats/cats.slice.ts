import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const FAV_CATS = 'FAV_CATS'

interface CatsState {
	favourites: string[]
}

const initialState: CatsState = {
	favourites: JSON.parse(localStorage.getItem(FAV_CATS) || '[]')
}

export const catsSlice = createSlice({
	name: 'favouriteCats',
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<string>) {
			state.favourites.push(action.payload)
			localStorage.setItem(FAV_CATS, JSON.stringify(state.favourites))
		},
		removeFavourite(state, action: PayloadAction<string>) {
			state.favourites = state.favourites.filter(fav => fav !== action.payload)
			localStorage.setItem(FAV_CATS, JSON.stringify(state.favourites))
		}
	}
})

export const catsActions = catsSlice.actions
export const catsReducer = catsSlice.reducer