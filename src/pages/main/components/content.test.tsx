import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Content from './content';
import { store } from '../../../store/index';

test('check content render', async () => {
  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  const textbox = screen.getByRole('textbox');

  expect(textbox).toBeInTheDocument();
  expect(textbox).toHaveValue('vlad');

  expect(screen.getByText('Поиск | Найдется всЁ')).toBeInTheDocument();
  expect(screen.getByTestId('loader')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByTestId('result')).toBeInTheDocument();
  });

  fireEvent.change(textbox, {
    target: { value: 'somebigtextwithnoresultonthefinish' },
  });

  await waitFor(() => {
    expect(textbox).toHaveValue('somebigtextwithnoresultonthefinish');
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('List is empty')).toHaveTextContent(
      'List is empty'
    );
  });
});
