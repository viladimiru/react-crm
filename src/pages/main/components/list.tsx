import ListItem from './listItem';

function List({ data }: any) {
	if (!data?.items.length) {
		return <span>List is empty</span>;
	}
	return (
		<ul data-testid="result" className="users-list">
			{data.items.map((item: any) => (
				<ListItem item={item} key={item.login} />
			)) || <span>list is empty</span>}
		</ul>
	);
}

export default List;
