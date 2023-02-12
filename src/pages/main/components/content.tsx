import { useSearchUsersQuery } from '../../../store/github/github.api';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/debounce';
import List from './list';

namespace Main {
	export function Users({ search }: { search: string }) {
		const { isLoading, data, isError } = useSearchUsersQuery(search, {
			skip: search.length === 0,
			refetchOnMountOrArgChange: false,
			refetchOnFocus: false,
			refetchOnReconnect: false,
		});
		if (isLoading) {
			return <div data-testid='loader' className='loader'></div>;
		}
		if (isError) {
			return <span data-testid='error'>error</span>;
		}
		return <List data={data} />;
	}

	export function Search({ onSearch }: { onSearch: (arg: string) => any }) {
		const [search, setSearch] = useState<string>('vlad');
		const debouncedState = useDebounce(search, 500);
		useEffect(() => {
			onSearch(debouncedState);
		}, [debouncedState, onSearch]);
		return (
			<input
				placeholder='Search'
				className='app-input mb-2'
				type='text'
				value={search}
				onChange={(v) => setSearch(v.target.value)}
			/>
		);
	}

	export const Header = () => {
		return <div className='form-field'>Поиск | Найдется всЁ</div>;
	};
}

function Content() {
	const [search, setSearch] = useState('vlad');
	return (
		<>
			<Main.Header />
			<Main.Search onSearch={setSearch} />
			<Main.Users search={search} />
		</>
	);
}

export default Content;
