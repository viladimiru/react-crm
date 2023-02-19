import { useGetCatsQuery, catsUtil } from '../../store/cats/cats.api';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import CatCard from './components/CatCard';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { selectFavouriteCats } from '../../store/cats/cats.slice';

const limit = 10;

function Cats() {
	const [page, setPage] = useState(1);
	const { isLoading, data, isFetching } = useGetCatsQuery({
		page,
		limit,
	});

	const increment = () => setPage(page + 1);
	const decrement = () => setPage(page - 1);

	const isDecrementLocked = useMemo(() => page === 1, [page]);

	const dispatch = useDispatch();

	function deleteCat(catId: string): void {
		const call = catsUtil.updateQueryData(
			'getCats',
			{
				page,
				limit,
			},
			(value) => value.filter((cat) => cat.id !== catId)
		);
		dispatch(call);
	}

	const { addFavourite, removeFavourite } = useActions();
	const { favourites } = useAppSelector(selectFavouriteCats);

	function likeCat(catId: string) {
		if (favourites.includes(catId)) {
			removeFavourite(catId);
		} else {
			addFavourite(catId);
		}
	}

	const catsClass = classnames({
		cats: true,
		'cats--disabled': isFetching,
	});

	if (isLoading) return <div className="loader"></div>;
	if (!data?.length) return <span>list is empty</span>;

	return (
		<>
			<div className={catsClass}>
				{data.map((cat) => (
					<CatCard
						key={cat.id}
						cat={cat}
						onDelete={deleteCat}
						onLike={likeCat}
					/>
				))}
			</div>
			<div className="cats__controls">
				<button
					className="button"
					disabled={isDecrementLocked}
					onClick={decrement}
				>
					<FontAwesomeIcon icon={solid('arrow-left')} />
				</button>
				<button className="button" onClick={increment}>
					<FontAwesomeIcon icon={solid('arrow-right')} />
				</button>
			</div>
		</>
	);
}

export default Cats;
