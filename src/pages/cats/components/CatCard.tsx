import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from '../../../hooks/redux';
import { useMemo } from 'react';
import classnames from 'classnames';
import { Cat } from '../../../store/cats/ICats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { selectFavouriteCats } from '../../../store/cats/cats.slice';

function CatCard({
	cat,
	onDelete,
	onLike,
}: {
	cat: Cat;
	onDelete: (arg: string) => void;
	onLike: (arg: string) => void;
}) {
	const { favourites } = useAppSelector(selectFavouriteCats);
	const isCatLiked = useMemo(() => {
		return favourites.includes(cat.id);
	}, [favourites, cat.id]);

	const likeBtnClass = classnames({
		cats__like: true,
		'cats__like--liked': isCatLiked,
	});

	return (
		<div className="cats__card">
			<div className="cats__wrapper">
				<div className="cats__actions">
					<button className={likeBtnClass} onClick={() => onLike(cat.id)}>
						{isCatLiked ? (
							<FontAwesomeIcon icon={solid('heart')} size="2x" />
						) : (
							<FontAwesomeIcon icon={regular('heart')} size="2x" />
						)}
					</button>
					<button onClick={() => onDelete(cat.id)} className="cats__delete">
						<FontAwesomeIcon icon={solid('xmark')} size="2x" />
					</button>
				</div>
				<div className="cats__image">
					<LazyLoadImage
						placeholder={<div className="loader loader--white"></div>}
						effect="opacity"
						src={cat.url}
						alt={cat.id}
					/>
				</div>
			</div>
		</div>
	);
}

export default CatCard;
