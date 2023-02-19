import { memo } from 'react';

function ListItem({ item }: any) {
	return (
		<li data-testid="listItem" className="users-list__item">
			<img
				data-testid="listItemImg"
				width={'140px'}
				height={'150px'}
				src={item.avatar_url}
				alt={item.login}
			/>
			<div className="users-list__desc">
				<span data-testid="listItemLogin">{item.login}</span>
				<small data-testid="listItemRole">Role: {item.type}</small>
				<small>
					<a
						data-testid="listItemLink"
						className="text-link"
						href={item.html_url}
						target="_blank"
					>
						Profile
					</a>
				</small>
			</div>
		</li>
	);
}

function compareProps(prev: object, next: object) {
	return JSON.stringify(prev) === JSON.stringify(next);
}

export default memo(ListItem, compareProps);
