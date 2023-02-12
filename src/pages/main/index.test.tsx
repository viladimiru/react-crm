import { render, screen } from '@testing-library/react';
import Main from './index';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

describe('render main page', () => {
	it('Main renders', () => {
		render(
			<Provider store={store}>
				<Main />
			</Provider>
		);

		const textbox = screen.getByRole('textbox')

		expect(screen.getByText('Поиск | Найдется всЁ')).toBeInTheDocument()
		expect(textbox).toBeInTheDocument()
		expect(textbox).toHaveValue('vlad')
	});
});
