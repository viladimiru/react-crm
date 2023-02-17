import Login from './index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

test('should login', async () => {
	render(
		<Provider store={store}>
			<Login />
		</Provider>
	)
	const login = screen.getByTestId('login')
	const password = screen.getByTestId('password')
	const submit = screen.getByTestId('submit')

	fireEvent.change(login, {
		target: {
			value: 'vlad'
		}
	})

	fireEvent.change(password, {
		target: {
			value: 'dadada'
		}
	})
	
	await waitFor(() => {
		expect(submit).toBeDisabled()
	})

	fireEvent.change(password, {
		target: {
			value: '123123123'
		}
	})

	await waitFor(() => {
		expect(password).toHaveValue('123123123')
	})
	
	await waitFor(() => {
		expect(submit).not.toBeDisabled()
	})
})