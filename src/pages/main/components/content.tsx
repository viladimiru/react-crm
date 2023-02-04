import { useSearchUsersQuery } from '../../../store/github/github.api';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/debounce';
import List from './list';
function Content() {
	const [search, setSearch] = useState<string>('vlad');
	const debouncedState = useDebounce(search, 500);
	const { isLoading, data, isError } = useSearchUsersQuery(debouncedState, {
		skip: search.length === 0,
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});
	if (isLoading) {
		return <div className='loader'></div>;
	}
	if (isError) {
		return <span>error</span>;
	}
	return (
		<>
			<div className='form-field'>
				Поиск | Найдется всЁ
				<input
					placeholder='Search'
					className='app-input mb-2'
					type='text'
					value={search}
					onChange={(v) => setSearch(v.target.value)}
				/>
			</div>
			<List data={data} />{' '}
		</>
	);
}

export default Content;
