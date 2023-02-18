import { render, screen, within } from '@testing-library/react';
import ListItem from './listItem';

const mockData = {
  avatar_url: 'test111',
  login: 'test222',
  type: 'test333',
  html_url: 'test444',
};

describe('check linkItem render', () => {
  it('should render item', () => {
    render(<ListItem item={mockData} />);

    const item = screen.getByTestId('listItem');
    const itemInner = within(item);

    expect(itemInner.getByAltText(mockData.login)).toBeInTheDocument();

    expect(itemInner.getByTestId('listItemImg')).toHaveAttribute(
      'src',
      mockData.avatar_url
    );
    expect(itemInner.getByTestId('listItemLogin')).toHaveTextContent(
      mockData.login
    );
    expect(itemInner.getByTestId('listItemRole')).toHaveTextContent(
      mockData.type
    );
    expect(itemInner.getByTestId('listItemLink')).toHaveAttribute(
      'href',
      mockData.html_url
    );
  });
});
