import { render, screen, within } from '@testing-library/react'
import List from './list'
import Login from '../../login/index';

const mockList = {
	items: [
		{
			avatar_url: 'test1',
			login: 'test2',
			type: 'test3',
			html_url: 'test4'
		},
		{
			avatar_url: 'test11',
			login: 'test22',
			type: 'test33',
			html_url: 'test44'
		},
		{
			avatar_url: 'test111',
			login: 'test222',
			type: 'test333',
			html_url: 'test444'
		}
	]
}

describe('check list view', () => {
	it ('should render list', () => {
		render(<List data={mockList} />)
		
		const resultBlock = screen.getByTestId('result')
		const listItems = within(resultBlock).getAllByTestId('listItem')

		expect(listItems.length).toEqual(3)
	})
})