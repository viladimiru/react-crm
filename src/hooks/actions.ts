import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth/auth.slice';
import { catsActions } from '../store/cats/cats.slice';

const actions = {
	...catsActions,
	...authActions,
};

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
};
